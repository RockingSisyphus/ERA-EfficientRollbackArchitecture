/**
 * @file ERA 变量框架 - 变量写入模块
 * @description
 * 该模块是 ERA 框架的“执行引擎”，负责将消息内容中的变量修改指令应用到实际的 `chat` 变量中。
 *
 * **设计理念**:
 * 变量的写入是一个严谨的过程，必须确保所有变更都被正确记录，以便后续的回滚和同步。
 * 此模块的核心职责是：
 * 1. **解析指令**: 从 AI 消息中提取 `<VariableInsert>` 和 `<VariableEdit>` 块。
 * 2. **顺序执行**: 确保同一消息内的多个指令块按顺序执行，且后续指令能感知到前面指令的结果。
 * 3. **生成日志**: 在应用变更的同时，调用 `recursive.ts` 中的递归函数来生成精确的 `EditLog`。
 * 4. **覆盖式日志写入**: 确保每个消息密钥（MK）对应的 `EditLog` 严格反映其当前内容，
 *    即使内容中没有任何指令（此时会写入空日志），也要覆盖旧日志，这是防止 `swipe` 造成数据污染的关键。
 *
 * **职责边界**:
 * - 本模块**只负责读取 MK**，不负责创建。创建 MK 的职责由上游的 `message_key.ts` 承担。
 * - `ApplyVarChangeForMessage` 函数**只负责写入变量和 `EditLog`**，不负责更新 `SelectedMks`。
 *   更新 `SelectedMks` 的职责被移交给了更上层的调用者（如 `ApplyVarChange` 或同步函数），
 *   以避免在同步循环中修改正在被读取的状态，这是一种重要的并发控制策略。
 */

'use strict';

import { CHAT_SCOPE, LOGS_PATH, SEL_PATH } from './constants';
import { isUserMessage, readMessageKey } from './message_key';
import { applyEditAtLevel, applyInsertAtLevel } from './recursive';
import { extractBlocks, Logger, parseEditLog, parseJsonl } from './utils';

const logger = new Logger('write');

/**
 * **【核心实现】** 对指定的消息应用变量修改。
 * 这是变量写入流程的核心，处理单个消息。
 *
 * @param {TavernMessage} msg - 要处理的酒馆消息对象。
 * @returns {Promise<string | null>} 如果成功处理，返回该消息的 MK；如果消息无需处理或处理失败，返回 null。
 */
export const ApplyVarChangeForMessage = async (msg: any): Promise<string | null> => {
  try {
    if (!msg || typeof msg.message_id !== 'number') {
      logger.warn('ApplyVarChangeForMessage', '无效消息对象或缺少 message_id，退出');
      return null;
    }

    const messageId = msg.message_id;
    // 写入函数只负责读取 MK，不负责创建。创建的职责由上游的 `ensureMessageKey` 承担。
    const MK = readMessageKey(msg);

    // 如果消息没有 MK（可能是一个异常状态，如新消息还未被注入 MK），则跳过。
    // 同时，根据设计，用户消息自身不应包含变量修改指令，因此也跳过。
    if (!MK || isUserMessage(msg)) {
      logger.debug('ApplyVarChangeForMessage', `消息 (ID: ${messageId}) 不含 MK 或为用户消息，跳过变量写入。`);
      return null;
    }

    const rawContent = String(
      (msg?.message && msg.message.length
        ? msg.message
        : Array.isArray(msg?.swipes)
          ? msg.swipes[Number(msg?.swipe_id ?? 0)]
          : '') || '',
    );

    // 1. 从消息内容中解析出所有 insert 和 edit 指令块。
    const insertBlocks = extractBlocks(rawContent, 'VariableInsert');
    const editBlocks = extractBlocks(rawContent, 'VariableEdit');

    if (!insertBlocks.length && !editBlocks.length) {
      logger.debug('ApplyVarChangeForMessage', `消息 (ID: ${messageId}) 未检测到变量修改标签。`);
    }

    const allInserts = insertBlocks.flatMap(s => parseJsonl(s, logger));
    const allEdits = editBlocks.flatMap(s => parseJsonl(s, logger));

    const editLog: any[] = []; // 用于收集本轮操作产生的所有变更记录。

    // 2. --- 处理所有插入操作 (`<VariableInsert>`) ---
    if (allInserts.length > 0) {
      /*
       * N.B. 必须对每个 insertRoot 单独调用 updateVariablesWith，而不是将所有操作合并到一次调用中。
       * 这是为了确保在同一条消息内，前一个 <VariableInsert> 块中插入的模板或数据，
       * 可以被后一个 <VariableInsert> 或 <VariableEdit> 块访问和使用。
       * 每次 await updateVariablesWith 完成后，变量状态都会被刷新，从而使后续操作能看到最新的结果。
       */
      for (const insertRoot of allInserts) {
        if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
        try {
          await updateVariablesWith(v => {
            logger.debug('ApplyVarChangeForMessage', `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
            for (const topKey of Object.keys(insertRoot)) {
              const topPatch = (insertRoot as any)[topKey];
              if (topPatch == null) continue;
              // 调用递归函数，实际执行插入并填充 editLog。
              applyInsertAtLevel(v, topKey, topPatch, editLog, null, logger);
            }
            return v;
          }, CHAT_SCOPE);
        } catch (e: any) {
          logger.error('ApplyVarChangeForMessage', `处理 insertRoot 失败: ${e?.message || e}`, e);
        }
      }
      logger.log('ApplyVarChangeForMessage', '所有 VariableInsert 操作完成');
    }

    // 3. --- 处理所有编辑操作 (`<VariableEdit>`) ---
    if (allEdits.length > 0) {
      const intraMessageState = new Map<string, any>(); // 用于跟踪在**本消息内部**对变量的连续修改。
      // N.B. 同样，编辑操作也需要独立调用以确保能读取到同一消息中、此前已完成的插入或编辑操作的结果。
      for (const editRoot of allEdits) {
        if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot)) continue;
        try {
          await updateVariablesWith(async v => {
            logger.debug('ApplyVarChangeForMessage', `处理 editRoot: ${JSON.stringify(editRoot)}`);
            for (const topKey of Object.keys(editRoot)) {
              const topPatch = (editRoot as any)[topKey];
              if (topPatch == null) continue;
              // 调用递归函数，实际执行编辑并填充 editLog。
              await applyEditAtLevel(v, topKey, topPatch, editLog, logger, messageId, intraMessageState);
            }
            return v;
          }, CHAT_SCOPE);
        } catch (e: any) {
          logger.error('ApplyVarChangeForMessage', `处理 editRoot 失败: ${e?.message || e}`, e);
        }
      }
      logger.log('ApplyVarChangeForMessage', '所有 VariableEdit 操作完成');
    }

    // 4. --- 覆盖式写入 EditLog ---
    /*
     * 核心逻辑：无论本轮是否产生了有效的变量修改，都必须用当前的 editLog (哪怕是空数组) 覆盖旧的 EditLog。
     *
     * 为什么必须覆盖而不是在没有修改时跳过？
     *
     * 根本原因在于，必须确保每个 MK 对应的 EditLog，严格且唯一地反映其所属消息**当前内容**所产生的变量修改。
     *
     * 考虑一个场景：
     * 1. 消息A (MK_A) 的内容包含指令，生成了 EditLog_A。
     * 2. 用户对消息A进行 swipe，生成了消息B (MK_B)，其内容完全没有变量修改标签。
     *
     * 如果在处理消息B时，因为没有检测到指令就“跳过写入”，那么与 MK_B 关联的 EditLog 就会是空的或不存在的。
     * 这在当前是正确的。
     *
     * 但如果用户再次 swipe，从消息B切换回消息A。此时框架会重新处理消息A。
     * 如果我们不执行覆盖式写入，那么与 MK_A 关联的 EditLog 仍然是之前生成的 EditLog_A，这没有问题。
     *
     * 真正的问题在于状态的明确性。覆盖式写入确保了任何一个 MK 的日志，在任何时间点，
     * 都是其**当前可见内容**的直接产物，没有任何历史遗留。这使得整个系统的状态变迁变得清晰、可预测，
     * 极大地降低了在复杂操作（如多次 `swipe`、删除、编辑）中出现状态不一致的风险。
     *
     * 因此，正确的做法是：用本次解析消息内容生成的 editLog (在无指令的场景下是 `[]`) 去覆盖，
     * 从而斩断任何可能存在的历史关联，确保数据的一致性和纯粹性。
     */
    try {
      await updateVariablesWith(v => {
        const newArr = Array.isArray(editLog) ? editLog : parseEditLog(editLog);
        // 将本轮生成的日志数组，以当前消息的 MK 为键，存入 `EditLogs` 对象。
        _.set(v, [LOGS_PATH, MK], JSON.stringify(newArr));
        /*
         * N.B. 此函数不再负责更新 SelectedMks 数组。
         * 更新 SelectedMks 的职责已移交至上层调用者 (resyncStateOnHistoryChange 或 ApplyVarChange)，
         * 以避免在 resync 循环中意外修改正在被读取的 oldSelectedMks 状态。
         */
        return v;
      }, CHAT_SCOPE);
    } catch (e: any) {
      logger.error('ApplyVarChangeForMessage', `写入 EditLogs 失败: ${e?.message || e}`, e);
    }

    return MK;
  } catch (err: any) {
    logger.error('ApplyVarChangeForMessage', `变量写入器异常: ${err?.message || err}`, err);
    return null;
  }
};

/**
 * **【标准事件处理入口】**
 * 这是一个上层封装，用于处理最新消息的变量写入，并负责更新 `SelectedMks` 数组。
 * 它通常被绑定到“新消息生成”等事件上。
 */
export const ApplyVarChange = async () => {
  const msg = getChatMessages(-1, { include_swipes: true })?.[0];
  if (!msg || typeof msg.message_id !== 'number') return;

  const messageId = msg.message_id;

  // 调用核心实现来处理变量和 EditLog 的写入。
  const MK = await ApplyVarChangeForMessage(msg);

  // 在核心流程执行完毕后，在此处统一更新 SelectedMks，确保状态一致。
  try {
    await updateVariablesWith(v => {
      const selectedMks = _.get(v, SEL_PATH, []);
      // 将当前消息的 MK 记录在 SelectedMks 数组的相应位置。
      // 注意：如果 MK 为 null（例如，因为上游处理失败），这里可能会写入 null。
      // 这可能是您提到的 `SelectedMks` 中出现 null 的潜在原因之一。
      selectedMks[messageId] = MK;
      _.set(v, SEL_PATH, selectedMks);
      return v;
    }, CHAT_SCOPE);
  } catch (e: any) {
    logger.error('ApplyVarChange', `更新 SelectedMks 失败: ${e?.message || e}`, e);
  }
};

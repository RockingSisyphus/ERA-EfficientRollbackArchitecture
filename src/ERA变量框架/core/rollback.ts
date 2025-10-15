/**
 * @file ERA 变量框架 - 回滚与历史追溯模块
 * @description
 * 该模块提供了 ERA 框架“时间旅行”能力的核心实现。它负责根据 `EditLog` 精确地撤销变量修改，
 * 以及在需要时向上追溯历史以查找变量的旧值。
 *
 * **设计理念**:
 * - **可逆操作**: 所有的变量写入操作都必须是可逆的。`rollbackByMk` 函数通过读取 `EditLog`
 *   并执行反向操作（`insert` -> `unset`, `update` -> `set to value_old`）来保证这一点。
 * - **历史的权威性**: `EditLog` 是变量状态变迁的唯一真实记录。`findLatestNewValue` 函数
 *   体现了这一原则，它不信任任何临时的变量快照，而是通过回溯 `EditLog` 链来查找一个变量
 *   在特定时间点之前的真实值。
 */

'use strict';

import { CHAT_SCOPE, LOGS_PATH, META_DATA_PATH, STAT_DATA_PATH } from '../utils/constants';
import { readMessageKey } from './key/message_key';
import { getMessageContent, isUserMessage } from '../utils/message_utils';
import { getEraData } from '../utils/era_data';
import { J, parseEditLog } from '../utils/data';
import { Logger } from '../utils/log';

const logger = new Logger('rollback');

/**
 * **【回滚】**
 * 根据一个给定的消息密钥（MK），精确地撤销该消息所引入的所有变量变更。
 *
 * @param {string} MK - 要回滚的目标消息的密钥。
 * @param {boolean} [silent=false] - 是否为静默模式。在静默模式下，函数不会自己触发日志刷新，
 *   这在 `resyncStateOnHistoryChange` 等批量操作中非常有用，可以避免产生大量冗余日志。
 */
export async function rollbackByMk(MK: string, silent = false) {
  try {
    logger.log('rollbackByMk', `开始回滚, MK=${MK}`);
    await updateVariablesWith(v => {
      const meta = _.get(v, META_DATA_PATH, {});
      const stat = _.get(v, STAT_DATA_PATH, {});

      const raw = _.get(meta, [LOGS_PATH, MK]);
      const arr = parseEditLog(raw);
      if (!arr || !arr.length) {
        logger.debug('rollbackByMk', `EditLog 为空或无效，跳过回滚。`);
        return v;
      }

      // 关键：必须逆序遍历 EditLog 来执行回滚。
      // 这确保了对同一变量的多次修改能够被正确地、按相反的顺序撤销。
      for (let i = arr.length - 1; i >= 0; i--) {
        const e = arr[i];
        const op = String(e?.op || '').toLowerCase();
        const path = String(e?.path || '');
        if (!path) continue;

        if (op === 'insert') {
          // 对于“插入”操作，回滚即为“删除”。
          _.unset(stat, path);
          continue;
        }
        if (op === 'update' || op === 'delete') {
          // 对于“更新”或“删除”操作，回滚即为恢复到“旧值”。
          if (typeof e?.value_old === 'undefined') {
            // 如果日志中没有记录旧值，最安全的回滚方式是直接删除该路径。
            _.unset(stat, path);
          } else {
            _.set(stat, path, _.cloneDeep(e.value_old));
          }
        }
      }

      _.set(v, STAT_DATA_PATH, stat);
      return v;
    }, CHAT_SCOPE);
    logger.log('rollbackByMk', `回滚完成：MK=${MK}`);
  } catch (e: any) {
    logger.error('rollbackByMk', `回滚异常：MK=${MK} → ${e?.message || e}`, e);
  }
}

/**
 * **【历史追溯】**
 * 向上追溯聊天历史，查找某个变量路径在指定消息之前的最后一个值 (`value_new`)。
 * 这是为 `applyEditAtLevel` 函数提供支持的关键辅助函数，用于在生成 `update` 日志时，
 * 准确地记录下 `value_old`。
 *
 * @param {string} path - 要查找的变量的完整路径。
 * @param {number} startMessageId - 从此消息 ID 的**前一条**消息开始向上查找。
 * @param {Logger} [logger] - 可选的 Logger 实例，用于记录详细的追溯过程。
 * @returns {Promise<any>} 返回找到的 `value_new`。如果追溯到聊天记录的开头都未找到，则返回 `null`。
 */
export async function findLatestNewValue(path: string, startMessageId: number, logger?: Logger): Promise<any> {
  logger?.debug('findLatestNewValue', `开始为路径 <${path}> 从消息ID <${startMessageId}> 向上追溯历史值...`);
  const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
  if (!messages || messages.length < 1) {
    logger?.debug('findLatestNewValue', `消息历史为空，无法追溯。`);
    return null;
  }

  const startIndex = messages.findIndex(m => m.message_id === startMessageId);
  if (startIndex === -1) {
    logger?.warn('findLatestNewValue', `错误：在消息列表中未找到起始消息ID: ${startMessageId}`);
    return null;
  }

  // 从起始消息的前一条开始，向上（向旧）遍历历史消息。
  for (let i = startIndex - 1; i >= 0; i--) {
    const message = messages[i];
    const msgId = message?.message_id;
    logger?.debug(
      'findLatestNewValue',
      `[进度] 正在检查消息 (ID: ${msgId})，内容: "${(getMessageContent(message) || '').substring(0, 100)}..."`,
    );

    // 使用 isUserMessage 辅助函数，并检查 message_id
    if (isUserMessage(message) || typeof msgId !== 'number') {
      continue;
    }

    const mk = readMessageKey(message);
    if (!mk) {
      logger?.debug('findLatestNewValue', `[进度] 消息 (ID: ${msgId}) 无 MK，跳过。`);
      continue; // 跳过没有 MK 的 AI 消息。
    }

    const { meta: metaData } = getEraData();
    const editLogRaw = _.get(metaData, [LOGS_PATH, mk]);
    const editLog = parseEditLog(editLogRaw);

    if (!editLog || editLog.length === 0) {
      logger?.debug('findLatestNewValue', `[进度] MK ${mk} 的 EditLog 为空，跳过。`);
      continue; // 跳过 EditLog 为空的。
    }
    logger?.debug('findLatestNewValue', `[进度] 正在检查 MK ${mk} 的 EditLog...\n${J(editLog)}`);

    // 关键：从后向前遍历该消息的 EditLog，这样找到的第一个匹配项就是最新的。
    for (let j = editLog.length - 1; j >= 0; j--) {
      const logEntry = editLog[j];
      if (!logEntry || !logEntry.path) continue;

      // Case 1: 精确路径匹配。
      if (logEntry.path === path) {
        // 如果在历史追溯中找到了 delete 记录，这意味着状态可能不一致。
        // 因为 applyEditAtLevel 的前置检查应阻止对已删除变量的更新。
        // 记录一个错误以供调试，并返回 null，因为该变量在逻辑上是不存在的。
        if (logEntry.op === 'delete') {
          logger?.error(
            'findLatestNewValue',
            `>> 状态异常! 在消息(ID:${message.message_id}, MK:${mk})中为路径 <${path}> 找到了 'delete' 记录。这表明 update 操作可能正在尝试修改一个已被删除的变量。`,
          );
          return null;
        }

        logger?.debug(
          'findLatestNewValue',
          `>> 成功! 在消息(ID:${message.message_id}, MK:${mk})中找到精确路径 <${path}> 的值为: ${J(logEntry.value_new)}`,
        );
        return _.cloneDeep(logEntry.value_new);
      }

      // Case 2: 查找的路径是日志条目路径的子路径 (即 logEntry.path 是父级)。
      // 例如, 查找 "a.b.c", 而日志中有对 "a.b" 的修改。
      if (path.startsWith(logEntry.path + '.')) {
        const subPath = path.substring(logEntry.path.length + 1);
        const parentNewVal = logEntry.value_new;
        if (_.isPlainObject(parentNewVal) && _.has(parentNewVal, subPath)) {
          const foundVal = _.get(parentNewVal, subPath);
          logger?.debug(
            'findLatestNewValue',
            `>> 成功! 在消息(ID:${message.message_id}, MK:${mk})中找到父级路径 <${logEntry.path}>, 并从中提取子路径 <${subPath}> 的值为: ${J(foundVal)}`,
          );
          return _.cloneDeep(foundVal);
        }
      }
    }
  }

  // 如果追溯到聊天记录的开头都未找到，说明这是该变量的首次出现。
  logger?.debug('findLatestNewValue', `向上追溯未找到路径 ${path} 的任何历史值，将使用 null 作为旧值`);
  return null;
}

/*
 * 旧的 calibrate 函数，其核心思想已被吸收进 `resyncStateOnHistoryChange` 的保险机制中。
 * 此处的注释被保留，因为它极好地解释了 ERA 框架如何巧妙地应对 SillyTavern 的一个核心“怪癖”。
 *
 * ### 校准主流程：比较“当前消息”与“上次选中的消息”并利用酒馆的特性巧妙地修复变量状态。
 *
 * @description
 * 这是 ERA 变量框架最核心的函数之一，它解决了一个非常棘手的问题：**删除 swipe 时的变量状态自动修复**。
 *
 * **酒馆的奇特行为 (Feature, not a bug):**
 * 当删除一条 swipe (例如，带有变量 id=2 的消息) 时：
 * 1. **内容与变量错位**: 后一条 swipe (id=3) 的**内容**会“顶”到被删除的 swipe (id=2) 的位置上，但**变量**却保留了 id=2 的变量。
 * 2. **孤儿变量残留**: 原本的 swipe 3 消息虽然在界面上消失了，但它对应的**消息变量** (id=3) 仍然残留在聊天数据中，成为“孤儿变量”。
 * 3. **孤儿变量继承**: 如果用户此时再 swipe 一次，新生成的 swipe 3 将会**继承**这个残留的孤儿变量 (id=3)，导致新内容配旧变量，进一步加剧状态混乱。
 * 4. **结果**: 我们得到了一个内容是 id=3、变量是 id=2 的“混合”消息，并且还有一个 id=3 的孤儿变量随时可能被新消息继承，造成严重的状态不一致。
 * 5. **无特定事件**: 此外，这个操作不会触发任何独特的事件，只会触发 `chat_id_changed` 等通用事件。
 *
 * **本函数的校准巧计:**
 * 本函数精确地利用了上述“状态错位”来完成自动修复：
 * 1. `calibrate` 被 `chat_id_changed` 事件触发。
 * 2. 它检测到 `oldMK` 存在 (它记录了被删除消息的 MK，即 id=2 的 MK)。
 * 3. **执行回滚**: `applyRollbackByMK(oldMK)` 被调用，将 id=2 引入的变量修改全部撤销。
 * 4. **触发重写**: `eventEmit('rollback_done_reapply_var_start')` 被触发。
 * 5. `ApplyVarChange` 函数响应重写事件，读取**当前**消息的**内容** (现在是 id=3 的内容)，并根据它重新写入变量。
 *
 * **最终效果**: “回滚了旧的(id=2)，重写了新的(id=3)”，变量状态被完美地自动修复。
 */

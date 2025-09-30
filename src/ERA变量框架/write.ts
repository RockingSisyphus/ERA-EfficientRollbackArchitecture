'use strict';

import { CHAT_SCOPE, LOGS_PATH, SEL_PATH } from './constants';
import { isUserMessage, readMessageKey } from './message_key';
import { applyEditAtLevel, applyInsertAtLevel } from './recursive';
import { extractBlocks, Logger, parseEditLog, parseJsonl } from './utils';

/**
 * 对指定消息应用变量修改的核心实现
 * @param msg 消息对象
 * @returns 处理后的消息 MK，如果无需处理则返回 null
 */
export const ApplyVarChangeForMessage = async (msg: any): Promise<string | null> => {
  const logger = new Logger();
  try {
    logger.log(
      `[调试] 进入 ApplyVarChangeForMessage。当前消息列表: ${JSON.stringify(getChatMessages('0-{{lastMessageId}}', { include_swipes: true }))}`,
      '调试',
    );
    if (!msg) {
      logger.log('无效消息对象，退出', '变量写入');
      return null;
    }
    // 根据用户要求，任何用户消息都不应触发变量写入流程，以防止意外修改。
    const messageId = msg.message_id;
    if (typeof messageId !== 'number') {
      logger.log('无法读取消息ID，退出', '变量写入');
      return null;
    }
    const sid = Number(msg?.swipe_id ?? 0);
    // N.B. 写入函数只负责读取 MK，不负责创建。创建 MK 的职责由上游的 ensureMkForLatestMessage 承担。
    const MK = readMessageKey(msg);

    if (!MK || isUserMessage(msg)) {
      logger.log(`消息 (ID: ${messageId}) 不含 MK 或为用户消息，跳过变量写入。`, '变量写入');
      return null;
    }

    const raw = String(
      (msg?.message && msg.message.length ? msg.message : Array.isArray(msg?.swipes) ? msg.swipes[sid] : '') || '',
    );

    const insertBlocks = extractBlocks(raw, 'VariableInsert');
    const editBlocks = extractBlocks(raw, 'VariableEdit');
    if (!insertBlocks.length && !editBlocks.length) {
      logger.log(
        `消息 (ID: ${messageId}) 未检测到 <VariableInsert>/<VariableEdit> 标签：本轮写入空 EditLog 并更新选中`,
        '变量写入',
      );
    }

    const allInserts = insertBlocks.flatMap(s => parseJsonl(s, logger));
    const allEdits = editBlocks.flatMap(s => parseJsonl(s, logger));

    const editLog: any[] = [];

    // --- 处理所有插入操作 ---
    if (allInserts.length > 0) {
      for (const insertRoot of allInserts) {
        if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
        try {
          await updateVariablesWith(v => {
            logger.log(`处理 insertRoot: ${JSON.stringify(insertRoot)}`, '变量写入');
            for (const topKey of Object.keys(insertRoot)) {
              const topPatch = (insertRoot as any)[topKey];
              if (topPatch == null) continue;
              // 移除顶层路径检查，将逻辑完全交给 applyInsertAtLevel
              // applyInsertAtLevel 自身会处理路径存在与否的情况
              applyInsertAtLevel(v, topKey, topPatch, editLog, null, logger);
            }
            return v;
          }, CHAT_SCOPE);
        } catch (e: any) {
          logger.log(`处理 insertRoot 失败: ${e?.message || e}`, '变量写入');
        }
      }
      logger.log('所有 VariableInsert 操作完成', '变量写入');
    }

    // --- 处理所有编辑操作 ---
    if (allEdits.length > 0) {
      const intraMessageState = new Map<string, any>();
      for (const editRoot of allEdits) {
        if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot)) continue;
        try {
          await updateVariablesWith(async v => {
            logger.log(`处理 editRoot: ${JSON.stringify(editRoot)}`, '变量写入');
            for (const topKey of Object.keys(editRoot)) {
              const topPatch = (editRoot as any)[topKey];
              if (topPatch == null) continue;
              await applyEditAtLevel(v, topKey, topPatch, editLog, logger, messageId, intraMessageState);
            }
            return v;
          }, CHAT_SCOPE);
        } catch (e: any) {
          logger.log(`处理 editRoot 失败: ${e?.message || e}`, '变量写入');
        }
      }
      logger.log('所有 VariableEdit 操作完成', '变量写入');
    }

    // 核心逻辑：无论本轮是否产生了有效的变量修改，都必须用当前的 editLog (哪怕是空数组) 覆盖旧的 EditLog。
    //
    // 为什么必须覆盖而不是在没有修改时跳过？
    // 考虑一个场景：
    // 1. 用户发送一条消息，产生了 EditLog A。
    // 2. 用户对该消息进行 swipe，新生成的消息内容完全没有变量修改标签。
    //
    // 如果此时我们“跳过写入”，那么与当前消息关联的 MK，其 EditLog 仍然是旧的、不相关的 EditLog A。
    // 这会导致在未来的回滚操作中，错误地应用了 EditLog A，造成数据污染。
    //
    // 因此，正确的做法是：用本次生成的 editLog (在这个场景下是 `[]`) 去覆盖，
    // 确保每个 MK 的 EditLog 严格对应其当前消息内容所产生的变量修改。
    try {
      await updateVariablesWith(v => {
        const newArr = Array.isArray(editLog) ? editLog : parseEditLog(editLog);
        _.set(v, [LOGS_PATH, MK], JSON.stringify(newArr));
        // N.B. 此函数不再负责更新 SelectedMks 数组。
        // 更新 SelectedMks 的职责已移交至上层调用者 (resyncStateOnHistoryChange 或 ApplyVarChange)，
        // 以避免在 resync 循环中意外修改正在被读取的 oldSelectedMks 状态。
        return v;
      }, CHAT_SCOPE);
    } catch (e: any) {
      logger.log(`写入 EditLogs 失败: ${e?.message || e}`, '变量写入');
    }
    logger.log(
      `[调试] 退出 ApplyVarChangeForMessage。当前消息列表: ${JSON.stringify(getChatMessages('0-{{lastMessageId}}', { include_swipes: true }))}`,
      '调试',
    );
    return MK;
  } catch (err: any) {
    logger.log(`变量写入器异常: ${err?.message || err}`, '变量写入');
    return null;
  } finally {
    await logger.flush();
  }
};

/**
 * 统一的事件处理函数，用于处理最新消息
 * 这是标准的变量写入流程，它会负责更新 SelectedMks 数组。
 */
export const ApplyVarChange = async () => {
  const logger = new Logger();
  logger.log(
    `[调试] 进入 ApplyVarChange。当前消息列表: ${JSON.stringify(getChatMessages('0-{{lastMessageId}}', { include_swipes: true }))}`,
    '调试',
  );
  const _arr = getChatMessages(-1, { include_swipes: true });
  const msg: any = _arr && _arr[0];
  if (!msg) return;

  const messageId = msg.message_id;
  if (typeof messageId !== 'number') return;

  const MK = await ApplyVarChangeForMessage(msg);

  // ApplyVarChangeForMessage 执行完毕后，在此处统一更新 SelectedMks
  try {
    await updateVariablesWith(v => {
      const selectedMks = _.get(v, SEL_PATH, []);
      selectedMks[messageId] = MK;
      _.set(v, SEL_PATH, selectedMks);
      return v;
    }, CHAT_SCOPE);
  } catch (e: any) {
    const logger = new Logger();
    logger.log(`(ApplyVarChange) 更新 SelectedMks 失败: ${e?.message || e}`, '变量写入');
    await logger.flush();
  }
};

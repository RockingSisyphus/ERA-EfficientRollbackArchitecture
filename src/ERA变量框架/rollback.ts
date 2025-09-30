'use strict';

import { CHAT_SCOPE, LOGS_PATH } from './constants';
import { readMessageKey } from './message_key';
import { J, Logger, parseEditLog } from './utils';

/**
 * 回退：按 MK 把变量撤回（用原子更新，避免旧快照整包覆盖）
 * @param MK 消息键
 * @param silent 是否为静默模式。在静默模式下，函数不会自己触发日志刷新。
 */
// Formerly known as applyRollbackByMK
export async function rollbackByMk(MK: string, silent = false) {
  const logger = new Logger();
  try {
    logger.log(`[回退] rollbackByMk 开始, MK=${MK}`, '调试');
    await updateVariablesWith(v => {
      const raw = _.get(v, [LOGS_PATH, MK]);
      logger.log(`[回退] 读取到原始 EditLog: ${raw}`, '调试');
      const arr = parseEditLog(raw);
      if (!arr || !arr.length) {
        logger.log(`[回退] EditLog 为空或无效，跳过回退。`, '调试');
        return v;
      }
      logger.log(`[回退] 解析后 EditLog: ${J(arr)}`, '调试');
      // 必须逆序回退，以正确处理对同一变量的多次修改
      for (let i = arr.length - 1; i >= 0; i--) {
        const e = arr[i];
        const op = String(e?.op || '').toLowerCase();
        const path = String(e?.path || '');
        logger.log(`[回退] 处理条目 #${i}: op=${op}, path=${path}`, '调试');
        if (!path) {
          logger.log(`[回退] 条目 #${i} 路径为空，跳过。`, '调试');
          continue;
        }
        if (op === 'insert') {
          logger.log(`[回退] 执行 unset 操作, path=${path}`, '调试');
          _.unset(v, path);
          continue;
        }
        if (op === 'update' || op === 'delete') {
          if (typeof e?.value_old === 'undefined') {
            logger.log(`[回退] 执行 unset 操作 (因 value_old 未定义), path=${path}`, '调试');
            _.unset(v, path);
          } else {
            logger.log(`[回退] 执行 set 操作, path=${path}, value_old=${J(e.value_old)}`, '调试');
            _.set(v, path, _.cloneDeep(e.value_old));
          }
        }
      }
      logger.log(`[回退] 所有条目处理完毕。`, '调试');
      return v;
    }, CHAT_SCOPE);
    logger.log(`回退完成：MK=${MK}（原子更新）`, '变量回退');
  } catch (e: any) {
    logger.log(`回退异常：MK=${MK} → ${e?.message || e}`, '变量回退');
  } finally {
    if (!silent) {
      await logger.flush();
    }
  }
}

/**
 * 校准主流程：比较“当前消息”与“上次选中的消息”并利用酒馆的特性巧妙地修复变量状态。
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
 *
 * @param evTag 触发事件的标签, 用于日志追溯
 */
/*
export async function calibrate(evTag: string) {
  const logger = new Logger();
  try {
    logger.log(`开始校准：触发事件 ${evTag}，时间 ${new Date().toLocaleString()}`, '变量校准');

    const arr = getChatMessages(-1, { include_swipes: true });
    const msg = arr && arr[0];
    if (!msg) {
      logger.log('未取到当前消息，退出', '变量校准');
      return;
    }

    const mv = getVariables({ type: 'message', message_id: msg.message_id }) || {};
    const MK = String(_.get(mv, ['_keys', 'MK']) || '');
    const chat = getVariables(CHAT_SCOPE) || {};
    const oldMK = _.get(chat, [SEL_PATH]) || null;
    logger.log(`当前 MK=${MK || '<无>'} (role=${msg.role})，旧的 SelectedMK=${oldMK || '<无>'}`, '变量校准');
    // 核心逻辑：只要 oldMK 存在，就意味着上次选择了一个带变量的消息，现在可能发生了切换或删除，需要进行一次变量回退。
    if (oldMK) {
      logger.log(`检测到选中变化(oldMK存在)：oldMK=${oldMK} → curMK=${MK || '<无>'}`, '变量校准');
      await applyRollbackByMK(oldMK);
      // 回退后，用当前消息的 MK（可能为空）更新 SelectedMK 记录
      await updateVariablesWith(v => {
        _.set(v, [SEL_PATH], MK || null);
        return v;
      }, CHAT_SCOPE);
      logger.log(`已记录 SelectedMK=${MK || '<无>'}`, '变量校准');
      // 只有当新选中的消息有 MK 且不是用户消息时，才触发变量重写。
      // 这样可以避免在切换到用户消息或无 MK 消息时，错误地触发重写流程。
      if (MK && msg.role !== 'user') {
        logger.log('当前消息含有效 MK 且非用户消息，将触发变量重写', '变量校准');
        eventEmit('rollback_done_reapply_var_start');
      } else {
        const reason = !MK ? '当前消息无 MK' : '当前消息为用户消息';
        logger.log(`不触发变量重写，原因：${reason}`, '变量校准');
      }
      return;
    } else {
      // 如果 oldMK 不存在，说明是初次加载或状态已清空，此时只需记录当前消息的 MK 即可。
      // 这确保了在下一次消息切换时，`oldMK` 将有值，从而能触发上面的 `if (oldMK)` 校准逻辑。
      await updateVariablesWith(v => {
        _.set(v, [SEL_PATH], MK || null);
        return v;
      }, CHAT_SCOPE);
      logger.log(`首次记录 SelectedMK=${MK || '<无>'}`, '变量校准');
    }
  } catch (e: any) {
    logger.log(`校准异常：${e?.message || e}`, '变量校准');
  } finally {
// 在 calibrate 函数的 return 之前确保日志被刷新
    if (logger.length > 0) {
      await logger.flush();
    }
  }
}
*/

/**
 * 向上追溯历史，查找某个变量路径在最近的有效AI消息中的最终值(value_new)
 * @param path 要查找的变量的完整路径
 * @param startMessageId 从此消息ID的前一条消息开始向上查找
 * @param logger 一个 Logger 实例，用于记录追溯过程
 * @returns 返回找到的 value_new，如果追溯到顶都未找到则返回 null
 */
export async function findLatestNewValue(path: string, startMessageId: number, logger?: Logger): Promise<any> {
  logger?.log(`[findLatestNewValue] 开始为路径 <${path}> 从消息ID <${startMessageId}> 向上追溯历史值...`, '获取旧值');
  const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
  logger?.log(`[findLatestNewValue] 原始消息列表: ${J(messages)}`, '获取旧值');
  if (!messages || messages.length < 1) {
    logger?.log(`[findLatestNewValue] 消息历史为空，无法追溯。`, '获取旧值');
    return null;
  }

  const startIndex = messages.findIndex(m => m.message_id === startMessageId);
  if (startIndex === -1) {
    logger?.log(`[findLatestNewValue] 错误：在消息列表中未找到起始消息ID: ${startMessageId}`, '获取旧值');
    return null;
  }
  logger?.log(`[findLatestNewValue] 进入循环查找逻辑`, '获取旧值');
  // 从起始消息的前一条开始向上循环
  for (let i = startIndex - 1; i >= 0; i--) {
    const message = messages[i];
    const messageId = message?.message_id;
    logger?.log(
      `[findLatestNewValue] 开始检索消息:id=${messageId};消息内容message=${JSON.stringify(message)}`,
      '获取旧值',
    );
    // 跳过非AI消息或无效消息
    if (message?.role !== 'assistant' || typeof messageId !== 'number') {
      logger?.log(`[findLatestNewValue] 消息:id=${messageId},role=${message.role}不符合要求，跳过`, '获取旧值');
      continue;
    }

    const mk = readMessageKey(message);
    logger?.log(`[findLatestNewValue] 正在检查AI消息 ID=${messageId};mk=${mk}`, '获取旧值');
    // 跳过没有 messageKey 的AI消息
    if (!mk) {
      logger?.log(`[findLatestNewValue] -> 消息 (ID: ${messageId}) 没有MK，跳过。`, '获取旧值');
      continue;
    }

    const chatVars = getVariables(CHAT_SCOPE) || {};
    const editLogRaw = _.get(chatVars, [LOGS_PATH, mk]);
    const editLog = parseEditLog(editLogRaw);

    if (!editLog || editLog.length === 0) {
      logger?.log(`[findLatestNewValue] -> 消息 (ID: ${messageId}, MK: ${mk}) 的EditLog为空，跳过。`, '获取旧值');
      continue;
    }

    logger?.log(
      `[findLatestNewValue] -> 正在逆序扫描消息 (ID: ${messageId}, MK: ${mk}) 的 EditLog=${JSON.stringify(editLog)}`,
      '获取旧值',
    );
    // 从后向前遍历 editLog，找到的第一个就是最新的
    for (let j = editLog.length - 1; j >= 0; j--) {
      const logEntry = editLog[j];
      if (!logEntry || !logEntry.path) continue;

      // Case 1: 精确路径匹配
      if (logEntry.path === path) {
        logger?.log(
          `[findLatestNewValue] >> 成功! 在消息(ID:${messageId}, MK:${mk})中找到精确路径 <${path}> 的值为: ${J(logEntry.value_new)}`,
          '获取旧值',
        );
        return _.cloneDeep(logEntry.value_new);
      }

      // Case 2: 查找路径是 logEntry 路径的子路径 (即 logEntry.path 是父级)
      // 例如, path="a.b.c", logEntry.path="a.b"
      if (path.startsWith(logEntry.path + '.')) {
        const subPath = path.substring(logEntry.path.length + 1);
        const parentNewVal = logEntry.value_new;
        if (_.isPlainObject(parentNewVal) && _.has(parentNewVal, subPath)) {
          const foundVal = _.get(parentNewVal, subPath);
          logger?.log(
            `[findLatestNewValue] >> 成功! 在消息(ID:${messageId}, MK:${mk})中找到父级路径 <${logEntry.path}>, 并从中提取子路径 <${subPath}> 的值为: ${J(foundVal)}`,
            '获取旧值',
          );
          return _.cloneDeep(foundVal);
        }
      }
    }
    logger?.log(
      `[findLatestNewValue] -> 在消息 (ID: ${messageId}, MK: ${mk}) 的EditLog中未找到路径 <${path}> 或其有效父级，继续向上...`,
      '获取旧值',
    );
  }

  // 追溯到顶都没找到
  logger?.log(`[findLatestNewValue] 向上追溯未找到路径 ${path} 的任何历史值，将使用 null 作为旧值`, '获取旧值');
  return null;
}

'use strict';

import { CHAT_SCOPE, LOGS_PATH } from './constants';
import { Logger, parseEditLog } from './utils';

/**
 * 回退：按 MK 把变量撤回（用原子更新，避免旧快照整包覆盖）
 * @param MK 消息键
 * @param silent 是否为静默模式。在静默模式下，函数不会自己触发日志刷新。
 */
// Formerly known as applyRollbackByMK
export async function rollbackByMk(MK: string, silent = false) {
  const logger = new Logger();
  try {
    await updateVariablesWith(v => {
      const raw = _.get(v, [LOGS_PATH, MK]);
      const arr = parseEditLog(raw);
      if (!arr.length) return v;
      // 必须逆序回退，以正确处理对同一变量的多次修改
      for (let i = arr.length - 1; i >= 0; i--) {
        const e = arr[i];
        const op = String(e?.op || '').toLowerCase();
        const path = String(e?.path || '');
        if (!path) continue;
        if (op === 'insert') {
          _.unset(v, path);
          continue;
        }
        if (op === 'update' || op === 'delete') {
          if (typeof e?.value_old === 'undefined') _.unset(v, path);
          else _.set(v, path, _.cloneDeep(e.value_old));
        }
      }
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

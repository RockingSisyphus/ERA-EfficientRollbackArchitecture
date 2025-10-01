'use strict';

/**
 * @file 状态同步核心
 * @description 本文件中的 `resyncStateOnHistoryChange` 是 ERA 变量框架最核心的函数之一。
 * 它通过实现“逆序回滚，顺序重算”的逻辑，解决了因消息删除、切换分支 (swipe) 等操作导致的变量状态与消息历史不一致的棘手问题。
 *
 * ### 酒馆的奇特行为 (Feature, not a bug)
 *
 * 当删除一条 swipe (例如，带有变量 id=2 的消息) 时：
 * 1. **内容与变量错位**: 后一条 swipe (id=3) 的**内容**会“顶”到被删除的 swipe (id=2) 的位置上，但**变量**却保留了 id=2 的变量。
 * 2. **孤儿变量残留**: 原本的 swipe 3 消息虽然在界面上消失了，但它对应的**消息变量** (id=3) 仍然残留在聊天数据中，成为“孤儿变量”。
 * 3. **孤儿变量继承**: 如果用户此时再 swipe 一次，新生成的 swipe 3 将会**继承**这个残留的孤儿变量 (id=3)，导致新内容配旧变量，进一步加剧状态混乱。
 * 4. **结果**: 我们得到了一个内容是 id=3、变量是 id=2 的“混合”消息，并且还有一个 id=3 的孤儿变量随时可能被新消息继承，造成严重的状态不一致。
 *
 * ### 本函数的解决策略
 *
 * `resyncStateOnHistoryChange` 通过全面的状态比对来解决此问题：
 * 1. 在 `message_deleted`, `message_swiped` 等事件触发时被调用。
 * 2. 全面获取当前实际的消息列表，并与之前记录的 `SelectedMks` 序列进行比对。
 * 3. 精确找到第一个不一致的点（无论是删除、还是修改）。
 * 4. **逆序回滚**: 从后往前，将所有不一致的 `MK` 所引入的变量修改全部撤销。
 * 5. **顺序重算**: 从不一致点开始，根据当前消息的**实际内容**，重新计算并写入变量。
 *
 * **最终效果**: 无论历史记录发生何种变化，变量状态都能被完美地自动修复，确保数据一致性。
 */

import { CHAT_SCOPE, LOGS_PATH, SEL_PATH } from './constants';
import { readMessageKey } from './message_key';
import { rollbackByMk } from './rollback';
import { Logger, parseEditLog } from './utils';
import { ApplyVarChange, ApplyVarChangeForMessage } from './variable_change_processor';

const logger = new Logger('sync');

/**
 * 获取用于变量操作的MK。如果消息是用户消息，则返回null以跳过操作。
 * @param msg 消息对象
 * @returns MK 字符串或 null
 */
const getMkFromMsg = (msg: any): string | null => {
  const key = readMessageKey(msg);
  if (!key) return null;

  return key;
};

/**
 * 检查一组 MK 对应的 EditLog 是否都为空
 * @param mks MK 列表
 * @returns 如果所有 EditLog 都为空则返回 true
 */
const checkEditLogsAreEmpty = (mks: (string | null)[]): boolean => {
  const chatVars = getVariables(CHAT_SCOPE) || {};
  for (const mk of mks) {
    if (!mk) continue; // 跳过 null (用户消息)
    const editLogRaw = _.get(chatVars, [LOGS_PATH, mk]);
    const editLog = parseEditLog(editLogRaw);
    if (editLog.length > 0) {
      return false; // 发现一个非空 log，直接返回 false
    }
  }
  return true; // 所有 log 都为空
};

/**
 * 当聊天记录发生变化（删除、切换分支）时，重新同步状态的核心函数
 * 实现了“逆序回滚，顺序重算”的逻辑
 */
export const resyncStateOnHistoryChange = async () => {
  logger.log('resyncStateOnHistoryChange', '聊天记录变更，启动状态同步...');

  // 核心假设：getChatMessages 会重新生成 message_id，使其保持从 0 开始的连续序列。
  const allMessages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
  const oldSelectedMks: (string | null)[] = _.cloneDeep(getVariables(CHAT_SCOPE)?.[SEL_PATH] || []);

  if (!allMessages || allMessages.length === 0) {
    logger.log('resyncStateOnHistoryChange', '当前聊天记录为空，不执行任何操作，同步终止。');
    return;
  }

  let firstRecalcId = -1;

  // Case 1: 消息被删除 (新列表比旧列表短)
  if (allMessages.length < oldSelectedMks.length) {
    logger.log('resyncStateOnHistoryChange', '检测到消息删除。');
    // 从后往前，寻找第一个 "currentMk === oldMk_at_same_index" 的对齐点
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];

      if (currentMk === recordedMk) {
        firstRecalcId = i + 1;
        logger.log(
          'resyncStateOnHistoryChange',
          `找到对齐点于 message_id=${i} (MK=${currentMk})。将从 ID ${firstRecalcId} 开始检查。`,
        );
        break;
      }
    }
    if (firstRecalcId === -1) {
      firstRecalcId = 0;
      logger.log('resyncStateOnHistoryChange', '未找到任何对齐点，将从头开始检查。');
    }

    // 【优化】检查被删除的 MK 是否影响变量
    // 稳健地找出被删除的 MK：对比新旧 MK 序列的差异
    const currentMkSequence = allMessages.map(getMkFromMsg).filter(mk => mk);
    const oldMkSequence = oldSelectedMks.filter(mk => mk);
    const deletedMks = _.difference(oldMkSequence, currentMkSequence);

    logger.debug('resyncStateOnHistoryChange', `旧MK序列: [${oldMkSequence.join(', ')}]`);
    logger.debug('resyncStateOnHistoryChange', `新MK序列: [${currentMkSequence.join(', ')}]`);
    logger.debug('resyncStateOnHistoryChange', `计算出的被删除MK: [${deletedMks.join(', ')}]`);

    if (deletedMks.length > 0 && checkEditLogsAreEmpty(deletedMks)) {
      logger.log(
        'resyncStateOnHistoryChange',
        `检测到被删除的 ${deletedMks.length} 条消息均不含变量修改，执行快速同步。`,
      );
      const newSelectedMks: (string | null)[] = [];
      for (let i = 0; i < allMessages.length; i++) {
        newSelectedMks[i] = getMkFromMsg(allMessages[i]);
      }
      await updateVariablesWith(v => {
        _.set(v, SEL_PATH, newSelectedMks);
        return v;
      }, CHAT_SCOPE);
      logger.log('resyncStateOnHistoryChange', '快速同步完成，仅修正 SelectedMks 数组。');
      return;
    }
  }
  // Case 2: 消息被修改/切换 (长度不变)
  else if (allMessages.length === oldSelectedMks.length) {
    logger.log('resyncStateOnHistoryChange', '检测到消息长度不变，可能为修改或切换。');
    // 从后往前，寻找第一个不匹配的点
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
      if (currentMk !== recordedMk) {
        firstRecalcId = i;
      }
    }
    if (firstRecalcId === -1) {
      logger.log('resyncStateOnHistoryChange', '所有MK均匹配，无需重算。');
      // N.B. 即使所有 MK 看起来都匹配，也无法排除一种特殊情况：
      // 在最后一楼删除 swipe。此时消息内容改变，但消息变量（包括MK）不变。
      // 因此，即使此处检查通过，我们依然需要执行后续的“保险”逻辑。
    } else {
      logger.log('resyncStateOnHistoryChange', `找到最早的不匹配点于 message_id=${firstRecalcId}。将从该点开始重算。`);
    }
  }
  // Case 3: 消息被添加 (新列表比旧列表长)
  else {
    logger.log('resyncStateOnHistoryChange', '检测到消息添加。');
    // 只需处理新增部分，但为了逻辑统一，我们让 ApplyVarChange 自己处理
    // 这里我们认为不需要re-sync，直接返回
    logger.log('resyncStateOnHistoryChange', '新增消息由其他事件处理，本次同步终止。');
    return;
  }

  // 3. 收集需要回滚的 MK 列表，并执行逆序回滚
  if (firstRecalcId > -1) {
    const mksToRollback = oldSelectedMks.slice(firstRecalcId).filter(mk => mk) as string[];
    if (mksToRollback.length > 0) {
      logger.log('resyncStateOnHistoryChange', `准备回滚 ${mksToRollback.length} 个MK: [${mksToRollback.join(', ')}]`);
      for (const mk of mksToRollback.reverse()) {
        await rollbackByMk(mk, true); // true 表示只回滚，不重写
      }
      logger.log('resyncStateOnHistoryChange', '逆序回滚完成。');
    }
  }

  // 4. 从不匹配点开始，顺序重新应用变量修改，并构建新的 selectedMks
  logger.log('resyncStateOnHistoryChange', `从 ID ${firstRecalcId} 开始顺序重算...`);
  const newSelectedMks: (string | null)[] = oldSelectedMks.slice(0, firstRecalcId); // 继承匹配部分

  for (let i = firstRecalcId; i < allMessages.length; i++) {
    const msg = allMessages[i];
    const newMk = await ApplyVarChangeForMessage(msg);
    newSelectedMks[i] = newMk; // 使用重算后的新 message_id (即 i) 作为索引
  }
  logger.log('resyncStateOnHistoryChange', '顺序重算完成。');

  // 5. 更新 SelectedMks 数组
  await updateVariablesWith(v => {
    _.set(v, SEL_PATH, newSelectedMks);
    return v;
  }, CHAT_SCOPE);
  logger.log('resyncStateOnHistoryChange', '状态同步完成。');

  // ==================================================================
  // 【保险机制】
  // 无论上面的比对逻辑是否发现问题，都额外执行一次针对“最后一楼”的回滚和重写。
  //
  // **历史原因与现状**:
  // 这个机制最初是为了处理一种 `resync` 逻辑无法检测到的特殊情况：在最后一楼删除 swipe。
  // 在旧架构中，这会导致后一个 swipe 的内容“顶替”上来，但消息变量（包括其MK）却保持不变，
  // 从而造成“内容-变量错位”，`resync` 的 MK 序列比对无法发现任何差异，进而错误地跳过修复。
  //
  // 此处的逻辑直接复刻了旧 `calibrate` 函数的核心思想：无条件地回滚上一个状态，
  // 然后根据当前最后一楼的**实际内容**进行重写，从而强制修复这个错位问题。
  //
  // **当前架构下的情况**：在我们采用了将 MK 直接写入消息内容的策略后，内容与 MK 已经强绑定，
  // 上述的“内容-变量错位”问题理论上已不会发生。因此，这个保险机制在当前架构下可能已是冗余的。
  // 但我们暂时保留它，作为对历史设计决策的记录和一道额外的防线。
  // ==================================================================
  logger.log('resyncStateOnHistoryChange', '执行【保险机制】：无条件回滚并重写最后一楼...');
  const lastWrittenMk = [...oldSelectedMks].reverse().find(mk => mk);
  if (lastWrittenMk) {
    logger.log('resyncStateOnHistoryChange', `找到最后一个写入的MK: ${lastWrittenMk}，执行回滚...`);
    await rollbackByMk(lastWrittenMk, true);
    logger.log('resyncStateOnHistoryChange', '回滚完成，准备根据当前最后一楼内容重写...');
    await ApplyVarChange(); // ApplyVarChange 默认处理最后一楼
    logger.log('resyncStateOnHistoryChange', '保险性重写完成。');
  } else {
    logger.log('resyncStateOnHistoryChange', '未找到任何可供回滚的旧MK，跳过保险机制。');
  }
};

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

import { LOGS_PATH, SEL_PATH } from '../utils/constants';
import { readMessageKey } from './key/message_key';
import { findLastAiMessage } from '../utils/message_utils';
import { rollbackByMk } from './rollback';
import { getEraData, updateEraMetaData } from '../utils/era_data';
import { parseEditLog } from '../utils/data';
import { Logger } from '../utils/log';
import { ApplyVarChangeForMessage } from './crud/variable_change_processor';

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
  const { meta: metaData } = getEraData();
  for (const mk of mks) {
    if (!mk) continue; // 跳过 null (用户消息)
    const editLogRaw = _.get(metaData, [LOGS_PATH, mk]);
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
 * @param {boolean} [forceFullResync=false] - 如果为 true，则强制从头开始完全重算，忽略差异检测。
 */
export const resyncStateOnHistoryChange = async (forceFullResync = false) => {
  if (forceFullResync) {
    logger.warn('resyncStateOnHistoryChange', '强制完全重算模式已启动！');
  } else {
    logger.log('resyncStateOnHistoryChange', '聊天记录变更，启动状态同步...');
  }

  // 核心假设：getChatMessages 会重新生成 message_id，使其保持从 0 开始的连续序列。
  const allMessages = getChatMessages('0-{{lastMessageId}}', { include_swipes: true });
  logger.debug('resyncStateOnHistoryChange', '获取到的 allMessages:', allMessages);
  const { meta: oldMetaData } = getEraData();
  const oldSelectedMks: (string | null)[] = _.cloneDeep(_.get(oldMetaData, SEL_PATH, []));

  logger.debug(
    'resyncStateOnHistoryChange',
    `状态快照: oldSelectedMks.length=${oldSelectedMks.length}, allMessages.length=${allMessages?.length ?? 0}`,
  );

  if (!allMessages || allMessages.length === 0) {
    logger.log('resyncStateOnHistoryChange', '当前聊天记录为空，不执行任何操作，同步终止。');
    return;
  }

  let firstRecalcId = -1;

  if (forceFullResync) {
    firstRecalcId = 0;
    logger.log('resyncStateOnHistoryChange', '强制模式：设置重算起点为 0。');
  }
  // Case 1: 消息被删除 (新列表比旧列表短)
  else if (allMessages.length < oldSelectedMks.length) {
    logger.log('resyncStateOnHistoryChange', '检测到消息删除。');
    // 从后往前，寻找第一个 "currentMk === oldMk_at_same_index" 的对齐点
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
      logger.debug(
        'resyncStateOnHistoryChange',
        `[删除-对齐检查] i=${i}, currentMk=${currentMk}, recordedMk=${recordedMk}`,
      );

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
      await updateEraMetaData(meta => {
        _.set(meta, SEL_PATH, newSelectedMks);
        return meta;
      });
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
      logger.debug(
        'resyncStateOnHistoryChange',
        `[切换-对齐检查] i=${i}, currentMk=${currentMk}, recordedMk=${recordedMk}`,
      );
      if (currentMk !== recordedMk) {
        firstRecalcId = i;
      }
    }
    if (firstRecalcId === -1) {
      logger.log('resyncStateOnHistoryChange', '所有MK均匹配，无需重算。');
      // N.B. 在当前架构下，MK 已被直接写入消息内容，与内容强绑定。
      // 因此，任何导致内容变化的操作（如 swipe）也必然会导致 MK 的变化。
      // 这意味着，如果 MK 序列完全匹配，那么内容也必然完全匹配，无需进行任何重算或保险性检查。
      return; // 直接返回，终止同步。
    } else {
      logger.log('resyncStateOnHistoryChange', `找到最早的不匹配点于 message_id=${firstRecalcId}。将从该点开始重算。`);
    }
  }
  // Case 3: 消息被添加 (新列表比旧列表长)
  else {
    logger.log('resyncStateOnHistoryChange', '检测到消息添加。');
    // 将重算起点设置为新消息的起始索引，让同步流程统一处理
    firstRecalcId = oldSelectedMks.length;
    logger.log(
      'resyncStateOnHistoryChange',
      `新增消息的写入逻辑已由同步流程接管。将从新增消息 (ID: ${firstRecalcId}) 开始处理。`,
    );
  }

  // 3. 收集需要回滚的 MK 列表，并执行逆序回滚
  if (firstRecalcId > -1) {
    const mksToRollback = oldSelectedMks.slice(firstRecalcId).filter(mk => mk) as string[];
    if (mksToRollback.length > 0) {
      logger.log('resyncStateOnHistoryChange', `准备回滚 ${mksToRollback.length} 个MK: [${mksToRollback.join(', ')}]`);
      for (const mk of mksToRollback.reverse()) {
        logger.debug('resyncStateOnHistoryChange', `[回滚] 正在回滚 MK: ${mk}`);
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
    logger.debug('resyncStateOnHistoryChange', `[重算] 正在处理消息索引: ${i}`);
    const newMk = await ApplyVarChangeForMessage(msg);
    newSelectedMks[i] = newMk; // 使用重算后的新 message_id (即 i) 作为索引
  }
  logger.log('resyncStateOnHistoryChange', '顺序重算完成。');

  // 5. 更新 SelectedMks 数组
  await updateEraMetaData(meta => {
    _.set(meta, SEL_PATH, newSelectedMks);
    return meta;
  });
  logger.log('resyncStateOnHistoryChange', '状态同步完成。');

  // ==================================================================
  // 【保险机制】 - 已于 2025/10/02 移除
  //
  // **历史原因**:
  // 该机制最初是为了解决一个旧架构下的“内容-变量错位”问题。在旧架构中，当删除一条 swipe 时，
  // 后一条 swipe 的内容会“顶替”上来，但其底层的消息变量（及其 MK）却保持不变。
  // 这导致主同步逻辑的 MK 比对失效，无法发现状态变化。
  // 为此，保险机制被设计为：通过 `oldSelectedMks`（状态变更前的快照）找到被删除的旧 MK，
  // 强制回滚它，然后根据当前可见的新内容重新写入变量，从而修复错位。
  //
  // **当前架构下的情况与移除原因**:
  // 在当前架构中，MK 已被直接写入消息内容，与内容强绑定。当 swipe 导致内容变化时，MK 也会随之变化。
  // 这使得主同步逻辑（逆序回滚、顺序重算）已经能够完全、正确地处理 swipe 等场景，不再需要此保险机制。
  //
  // 继续保留该机制不仅是冗余的，而且会主动引发 Bug：
  // 它依然按照旧逻辑，使用 `oldSelectedMks` 回滚一个过时的、不相关的 MK，这会破坏主逻辑刚刚同步好的正确状态。
  // 随后，在被破坏的状态上进行的重写操作会失败或产生错误结果（例如，生成一个空的 EditLog），
  // 并覆盖掉之前由主逻辑正确生成的 EditLog，导致数据丢失。
  //
  // 综上，该机制已从“保险”变为“风险”，因此被完全注释掉。
  // ==================================================================
  // logger.log('resyncStateOnHistoryChange', '执行【保险机制】：无条件回滚并重写最后一楼...');
  // const lastWrittenMk = [...oldSelectedMks].reverse().find(mk => mk);
  // if (lastWrittenMk) {
  //   logger.log('resyncStateOnHistoryChange', `找到最后一个写入的MK: ${lastWrittenMk}，执行回滚...`);
  //   await rollbackByMk(lastWrittenMk, true);
  //   logger.log('resyncStateOnHistoryChange', '回滚完成，准备根据当前最后一楼内容重写...');
  //   await ApplyVarChange(); // ApplyVarChange 默认处理最后一楼
  //   logger.log('resyncStateOnHistoryChange', '保险性重写完成。');
  // } else {
  //   logger.log('resyncStateOnHistoryChange', '未找到任何可供回滚的旧MK，跳过保险机制。');
  // }
};

/**
 * **【强制同步最后一条AI消息】**
 * 这是一个用于特定场景的函数，例如由外部 API 触发，需要强制重算最后一条 AI 消息的变量。
 * 它解决了在消息内容被外部修改（但 MK 未变）时，状态无法自动更新的问题。
 *
 * **执行逻辑**:
 * 1. **定位**: 找到最后一条 AI 消息。
 * 2. **回滚**: 如果该消息存在且有 MK，则无条件回滚此 MK 引入的所有变量修改。
 * 3. **重算**: 立即根据该消息的**当前内容**重新计算变量，并生成新的 `EditLog`。
 * 4. **更新**: 将新的 MK 更新到 `SelectedMks` 数组的正确位置。
 *
 * **安全性**:
 * 此函数操作目标明确（最后一条 AI 消息），且回滚和重算在同一调用链中完成，
 * 避免了旧“保险机制”中因目标不明确而破坏 `resync` 状态的风险。
 */
export const forceSyncLastAiMessage = async () => {
  logger.log('forceSyncLastAiMessage', '启动强制同步最后一条 AI 消息...');

  // 1. 定位
  const msg = findLastAiMessage();
  if (!msg || typeof msg.message_id !== 'number') {
    logger.warn('forceSyncLastAiMessage', '未找到可供强制同步的 AI 消息。');
    return;
  }

  const messageId = msg.message_id;
  const MK = readMessageKey(msg);

  if (!MK) {
    logger.warn('forceSyncLastAiMessage', `消息 (ID: ${messageId}) 不含 MK，无法执行强制同步。将转为执行常规写入...`);
    // 如果没有 MK，说明是新消息，直接走标准写入流程即可
    await ApplyVarChangeForMessage(msg);
    return;
  }

  logger.log('forceSyncLastAiMessage', `目标消息 (ID: ${messageId}, MK: ${MK})。`);

  // 2. 回滚
  logger.debug('forceSyncLastAiMessage', `正在回滚 MK: ${MK}...`);
  await rollbackByMk(MK, true); // silent=true，避免不必要的日志刷新

  // 3. 重算
  logger.debug('forceSyncLastAiMessage', `回滚完成，正在根据当前内容重算 MK: ${MK}...`);
  const newMK = await ApplyVarChangeForMessage(msg);

  // 4. 更新 SelectedMks
  if (newMK) {
    try {
      await updateEraMetaData(meta => {
        const selectedMks = _.get(meta, SEL_PATH, []);
        selectedMks[messageId] = newMK;
        _.set(meta, SEL_PATH, selectedMks);
        return meta;
      });
      logger.log('forceSyncLastAiMessage', `强制同步完成，已更新 SelectedMks[${messageId}] = ${newMK}`);
    } catch (e: any) {
      logger.error('forceSyncLastAiMessage', `强制同步后更新 SelectedMks 失败: ${e?.message || e}`, e);
    }
  } else {
    logger.error('forceSyncLastAiMessage', `重算后未能获取新的 MK，SelectedMks 可能未更新。`);
  }
};

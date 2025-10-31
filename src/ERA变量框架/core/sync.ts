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
import { parseEditLog } from '../utils/data';
import { getEraData, updateEraMetaData, updateEraStatData } from '../utils/era_data';
import { Logger } from '../utils/log';
import { ApplyVarChangeForMessage } from './crud/patcher';
import { readMessageKey } from './key/mk';
import { rollbackStatToMK } from './timetravel';

const logger = new Logger();

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
 * @param metaData 要检查的元数据对象
 * @returns 如果所有 EditLog 都为空则返回 true
 */
const checkEditLogsAreEmpty = (mks: (string | null)[], metaData: any): boolean => {
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
 * 比较当前消息历史与最后已知状态，以找到分歧的第一个点。
 * 这决定了变量应从何处开始重新计算。
 * 它还包括一个优化，如果仅删除了没有变量更改的消息，则执行“快速同步”。
 *
 * @param allMessages 当前所有消息的列表。
 * @param oldSelectedMks 上次同步状态下的消息密钥 (MK) 列表。
 * @param initialMeta 上次同步状态下的元数据，用于检查 EditLogs。
 * @param forceFullResync 如果为 true，则强制从头开始重新计算。
 * @returns 一个描述所需操作的对象。
 */
const findDivergencePoint = (
  allMessages: any[],
  oldSelectedMks: (string | null)[],
  initialMeta: any,
  forceFullResync: boolean,
): { type: 'FULL_RECALC'; recalcId: number } | { type: 'FAST_SYNC'; newSelectedMks: (string | null)[] } => {
  if (forceFullResync) {
    logger.log('findDivergencePoint', '强制模式：设置重算起点为 0。');
    return { type: 'FULL_RECALC', recalcId: 0 };
  }

  const currentMks = allMessages.map(getMkFromMsg);

  // 1. 首先，无条件找到第一个分歧点
  let firstMismatch = -1;
  const minLength = Math.min(currentMks.length, oldSelectedMks.length);
  for (let i = 0; i < minLength; i++) {
    if (currentMks[i] !== oldSelectedMks[i]) {
      firstMismatch = i;
      break;
    }
  }
  if (firstMismatch === -1 && currentMks.length !== oldSelectedMks.length) {
    firstMismatch = minLength;
  }

  // 2. 处理“无分歧”的情况
  if (firstMismatch === -1) {
    const recalcId = allMessages.length > 0 ? allMessages.length - 1 : 0;
    logger.log('findDivergencePoint', `所有MK均匹配。启动模拟写入，强制重算最后一条消息 (ID: ${recalcId})。`);
    return { type: 'FULL_RECALC', recalcId };
  }

  // 3. 处理“有分歧”的情况
  const deletedMks = _.difference(oldSelectedMks, currentMks);
  const addedMks = _.difference(currentMks, oldSelectedMks);

  // 唯一的优化机会：纯粹的无害删除
  if (addedMks.length === 0 && deletedMks.length > 0 && checkEditLogsAreEmpty(deletedMks, initialMeta)) {
    logger.log('findDivergencePoint', '检测到纯粹的无害删除。建议执行快速同步。');
    return { type: 'FAST_SYNC', newSelectedMks: currentMks };
  }

  // 所有其他情况（有害删除、有新增、混合更改）都必须从最早的分歧点重算
  logger.log('findDivergencePoint', `检测到需要分歧点重算。将从最早的分歧点 (ID: ${firstMismatch}) 开始。`);
  return { type: 'FULL_RECALC', recalcId: firstMismatch };
};

/**
 * 当聊天记录发生变化（删除、切换分支）时，重新同步状态的核心函数
 * 实现了“逆序回滚，顺序重算”的逻辑。
 * 在没有检测到历史变化时，该函数还会自动回滚并重算最后一条消息，从而实现了“写入”操作的统一。
 * @param {boolean} [forceFullResync=false] - 如果为 true，则强制从头开始完全重算，忽略差异检测。
 */
export const resyncStateOnHistoryChange = async (forceFullResync = false) => {
  try {
    if (forceFullResync) {
      logger.warn('resyncStateOnHistoryChange', '强制完全重算模式已启动！');
    } else {
      logger.log('resyncStateOnHistoryChange', '聊天记录变更，启动状态同步...');
    }

    // 核心假设：getChatMessages 会重新生成 message_id，使其保持从 0 开始的连续序列。
    const allMessages = getChatMessages('0-{{lastMessageId}}', { include_swipes: true });
    logger.debug('resyncStateOnHistoryChange', '获取到的 allMessages:', allMessages);

    // 在函数开始时一次性获取所有数据
    const { stat: initialStat, meta: initialMeta } = getEraData();
    // oldSelectedMks 从 initialMeta 派生
    const oldSelectedMks: (string | null)[] = _.cloneDeep(_.get(initialMeta, SEL_PATH, []));

    logger.debug(
      'resyncStateOnHistoryChange',
      `状态快照: oldSelectedMks.length=${oldSelectedMks.length}, allMessages.length=${allMessages?.length ?? 0}`,
    );

    if (!allMessages || allMessages.length === 0) {
      logger.log('resyncStateOnHistoryChange', '当前聊天记录为空，不执行任何操作，同步终止。');
      return;
    }

    // 1. 找出分歧点
    const divergence = findDivergencePoint(allMessages, oldSelectedMks, initialMeta, forceFullResync);

    // 2. 处理分歧结果
    if (divergence.type === 'FAST_SYNC') {
      logger.log('resyncStateOnHistoryChange', '执行快速同步...');
      await updateEraMetaData(meta => {
        _.set(meta, SEL_PATH, divergence.newSelectedMks);
        return meta;
      });
      logger.log('resyncStateOnHistoryChange', '快速同步完成，仅修正 SelectedMks 数组。');
      return;
    }

    const firstRecalcId = divergence.recalcId;

    // 3. 执行逆序回滚（内存中）
    // 确定重算的起始状态。默认为初始状态。
    let statForRecalc = initialStat;
    if (firstRecalcId > -1 && firstRecalcId < oldSelectedMks.length) {
      const allLogs: { [mk: string]: string } = _.get(initialMeta, LOGS_PATH, {});
      const currentMK = oldSelectedMks[oldSelectedMks.length - 1];
      const targetMK = firstRecalcId > 0 ? oldSelectedMks[firstRecalcId - 1] : undefined;

      if (currentMK) {
        logger.log('resyncStateOnHistoryChange', `准备一次性回滚。从: ${currentMK}, 到: ${targetMK || '初始状态'}`);
        // 回滚结果作为重算的起点
        statForRecalc = rollbackStatToMK(targetMK, currentMK, initialStat, oldSelectedMks, allLogs);
        logger.log('resyncStateOnHistoryChange', '逆序回滚完成（内存中）。');
      }
    }

    // 4. 从不匹配点开始，顺序重新应用变量修改，并构建新的 selectedMks
    logger.log('resyncStateOnHistoryChange', `从 ID ${firstRecalcId} 开始顺序重算...`);
    const newSelectedMks: (string | null)[] = oldSelectedMks.slice(0, firstRecalcId); // 继承匹配部分

    // 为重算过程创建一个 meta 的可变副本
    const metaForRecalc = _.cloneDeep(initialMeta);

    for (let i = firstRecalcId; i < allMessages.length; i++) {
      const msg = allMessages[i];

      // --- 关键修复 ---
      // 为本次计算创建一个拥有正确历史范围的“上下文元数据”。
      // 1. 继承到目前为止已重算的所有日志。
      const contextMeta = _.cloneDeep(metaForRecalc);
      // 2. 关键：将上下文中的 selectedMks 严格限制为当前消息之前的部分。
      //    newSelectedMks 在每次循环开始时，都代表了从 0 到 i-1 的正确历史。
      _.set(contextMeta, SEL_PATH, newSelectedMks.slice(0, i));
      // --- 修复结束 ---

      // 使用这个有正确作用域的上下文来调用纯函数
      const { finalStat, finalEditLog, mk } = await ApplyVarChangeForMessage(msg, statForRecalc, contextMeta);

      newSelectedMks[i] = mk; // 记录当前消息的 MK
      logger.debug('resyncStateOnHistoryChange', `[重算] 正在处理消息索引: ${i}, MK: ${mk}`);

      if (!mk) {
        logger.debug('resyncStateOnHistoryChange', `消息 (ID: ${i}) 无 MK，跳过变量计算。`);
        continue; // 如果是用户消息等，则跳过
      }

      // 更新状态，为下一次循环做准备
      statForRecalc = finalStat;
      // 将新生成的日志写入主 metaForRecalc 对象，为下一次循环的 clone 做准备
      _.set(metaForRecalc, [LOGS_PATH, mk], finalEditLog);
    }
    logger.log('resyncStateOnHistoryChange', '顺序重算完成。');

    // 5. 循环结束后，一次性将最终计算出的状态写入全局
    // statForRecalc 已经是最终的 stat
    // metaForRecalc 包含了正确的日志，我们只需要更新 SEL_PATH
    _.set(metaForRecalc, SEL_PATH, newSelectedMks);

    await updateEraStatData(() => statForRecalc);
    await updateEraMetaData(() => metaForRecalc);
    logger.log('resyncStateOnHistoryChange', '状态同步完成。');
  } catch (error: any) {
    logger.error('resyncStateOnHistoryChange', `状态同步时发生严重错误: ${error?.message || error}`, {
      error,
      forceFullResync,
      eraData: getEraData(),
      allMessages: getChatMessages('0-{{lastMessageId}}', { include_swipes: true }),
    });
  }
};

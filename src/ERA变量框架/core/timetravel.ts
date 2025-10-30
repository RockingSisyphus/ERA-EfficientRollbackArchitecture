/**
 * @file ERA 变量框架 - 状态时间旅行模块
 * @description
 * 该模块提供了在不同时间点（由 MK 标记）之间移动变量状态（stat）的核心功能。
 * 它不直接与酒馆的 `variables` 交互，而是提供纯粹的、可测试的计算函数。
 *
 * **核心理念**:
 * - **状态的确定性**: 任何时刻的变量状态（stat）都是由一个初始状态（空对象）加上从头到该时刻的所有 `EditLog` 顺序应用而成的。
 * - **可逆操作**: 所有 `EditLog` 记录的操作都是可逆的。
 * - **顺序的重要性**: `EditLog` 本身是无序的（存储在以 MK 为键的对象中），必须依赖 `selectedMks` 数组提供的正确顺序来应用。
 */

'use strict';

import { parseEditLog } from '../utils/data';
import { Logger } from '../utils/log';

const logger = new Logger();

// ==================================================================
// 内部辅助函数 (复刻自 rollback.ts 和 sync.ts)
// ==================================================================

/**
 * 对一个 stat 对象应用反向的 EditLog。这是一个纯函数。
 * @param stat - 起始状态对象。
 * @param log - 要反向应用的 EditLog 数组。
 * @returns {object} - 应用了反向操作后的新 stat 对象。
 */
function applyRollback(stat: object, log: any[]): object {
  if (!log || !log.length) return stat;
  // 关键：必须逆序遍历 EditLog 来执行回滚。
  for (let i = log.length - 1; i >= 0; i--) {
    const entry = log[i];
    const op = String(entry?.op || '').toLowerCase();
    const path = String(entry?.path || '');
    if (!path) continue;

    if (op === 'insert') {
      // 对于“插入”操作，回滚即为“删除”。
      _.unset(stat, path);
    } else if (op === 'update' || op === 'delete') {
      // 对于“更新”或“删除”操作，回滚即为恢复到“旧值”。
      if (typeof entry.value_old === 'undefined') {
        _.unset(stat, path);
      } else {
        _.set(stat, path, _.cloneDeep(entry.value_old));
      }
    }
  }
  return stat;
}

/**
 * 对一个 stat 对象应用正向的 EditLog。这是一个纯函数。
 * @param stat - 起始状态对象。
 * @param log - 要正向应用的 EditLog 数组。
 * @returns {object} - 应用了正向操作后的新 stat 对象。
 */
function applyForward(stat: object, log: any[]): object {
  if (!log || !log.length) return stat;
  // 正序遍历 log
  for (const entry of log) {
    if (!entry || !entry.path) continue;
    const op = String(entry?.op || '').toLowerCase();

    if (op === 'insert' || op === 'update') {
      _.set(stat, entry.path, _.cloneDeep(entry.value_new));
    } else if (op === 'delete') {
      _.unset(stat, entry.path);
    }
  }
  return stat;
}

// ==================================================================
// 导出的核心函数
// ==================================================================

/**
 * **【函数一】**: 将一个 stat 从 currentMK 回滚到指定 targetMK 对应的状态。
 *
 * @param {string} targetMK - 你想回滚到的目标消息的 MK。
 * @param {string} currentMK - 当前状态所对应的 MK。
 * @param {object} currentStat - 当前的变量状态。
 * @param {string[]} selectedMks - 完整的、有序的 MK 序列。
 * @param {{ [mk: string]: string }} allLogs - 包含所有 EditLog 的对象。
 * @returns {object} - 回滚完成后的 stat 对象。
 */
export function rollbackStatToMK(
  targetMK: string | null | undefined,
  currentMK: string,
  currentStat: object,
  selectedMks: (string | null)[],
  allLogs: { [mk: string]: string },
): object {
  const currentIndex = selectedMks.indexOf(currentMK);
  // 允许 targetMK 为 null 或 undefined, 此时 targetIndex 为 -1
  const targetIndex = targetMK ? selectedMks.indexOf(targetMK) : -1;

  if (currentIndex === -1) {
    logger.error('rollbackStatToMK', `在序列中未找到当前MK: ${currentMK}`);
    throw new Error('在序列中未找到当前MK。');
  }
  if (targetMK && targetIndex === -1) {
    logger.error('rollbackStatToMK', `在序列中未找到目标MK: ${targetMK}`);
    throw new Error('在序列中未找到目标MK。');
  }

  if (targetIndex > currentIndex) {
    logger.warn('rollbackStatToMK', '目标MK不在过去，返回当前状态。');
    return _.cloneDeep(currentStat);
  }
  if (targetIndex === currentIndex) {
    return _.cloneDeep(currentStat);
  }

  let tempStat = _.cloneDeep(currentStat);

  // 从当前位置开始，回滚到目标位置的后一个
  // 如果 targetIndex 是 -1, 循环会一直执行到 i > -1, 即 i=0, 从而回滚所有历史
  for (let i = currentIndex; i > targetIndex; i--) {
    const mkToRollback = selectedMks[i];
    if (!mkToRollback) continue;
    const log = parseEditLog(allLogs[mkToRollback]);
    tempStat = applyRollback(tempStat, log);
  }

  return tempStat;
}

/**
 * **【函数二】**: 从一个已知的 stat 和 mk 开始，正向计算到目标 mk 的状态。
 *
 * @param {object} startStat - 起始的变量状态。
 * @param {string} startMK - 起始状态对应的 MK。
 * @param {string} targetMK - 目标状态对应的 MK。
 * @param {string[]} selectedMks - 完整的、有序的 MK 序列。
 * @param {{ [mk: string]: string }} allLogs - 包含所有 EditLog 的对象。
 * @returns {object} - 计算出的目标 MK 对应的 stat。
 */
export function calculateStatForward(
  startStat: object,
  startMK: string,
  targetMK: string,
  selectedMks: (string | null)[],
  allLogs: { [mk: string]: string },
): object {
  const startIndex = selectedMks.indexOf(startMK);
  const targetIndex = selectedMks.indexOf(targetMK);

  if (startIndex === -1 || targetIndex === -1) {
    logger.error('calculateStatForward', `在序列中未找到MK。起始MK: ${startMK}, 目标MK: ${targetMK}`);
    throw new Error('在序列中未找到MK。');
  }

  if (targetIndex < startIndex) {
    logger.warn('calculateStatForward', '目标MK不在未来，返回起始状态。');
    return _.cloneDeep(startStat);
  }
  if (targetIndex === startIndex) {
    return _.cloneDeep(startStat);
  }

  let tempStat = _.cloneDeep(startStat);

  // 从起始位置的下一个开始，正向应用到目标位置
  for (let i = startIndex + 1; i <= targetIndex; i++) {
    const mkToApply = selectedMks[i];
    if (!mkToApply) continue;
    const log = parseEditLog(allLogs[mkToApply]);
    tempStat = applyForward(tempStat, log);
  }

  return tempStat;
}

/**
 * **【函数三】**: 从零开始，计算出任意目标 MK 的状态。
 * 这是最稳健的实现，它通过从一个空的初始状态，再正向计算到目标状态来确保结果的准确性。
 *
 * @param {string} targetMK - 目标状态对应的 MK。
 * @param {string[]} selectedMks - 完整的、有序的 MK 序列。
 * @param {{ [mk: string]: string }} allLogs - 包含所有 EditLog 的对象。
 * @returns {object} - 计算出的目标 stat 对象。
 */
export function calculateStatAt(
  targetMK: string,
  selectedMks: (string | null)[],
  allLogs: { [mk: string]: string },
): object {
  const targetIndex = selectedMks.indexOf(targetMK);

  if (targetIndex === -1) {
    logger.error('calculateStatAt', `在序列中未找到目标MK: ${targetMK}`);
    throw new Error('在序列中未找到目标MK。');
  }

  let tempStat = {}; // 从绝对的初始状态开始

  // 从初始状态正向应用到 targetIndex
  for (let i = 0; i <= targetIndex; i++) {
    const mkToApply = selectedMks[i];
    if (!mkToApply) continue;
    const log = parseEditLog(allLogs[mkToApply]);
    tempStat = applyForward(tempStat, log);
  }

  return tempStat;
}

/**
 * **【函数四】**: 计算从 startMk 到 endMk 之间所有消息的 stat 快照。
 * 这是一个纯计算函数，返回一个包含每个步骤结果的数组。
 *
 * @param {string} startMk - 起始 MK。
 * @param {string} endMk - 结束 MK。
 * @param {(string | null)[]} selectedMks - 完整的、有序的 MK 序列。
 * @param {{ [mk: string]: string }} allLogs - 包含所有 EditLog 的对象。
 * @returns {{mk: string, message_id: number, stat: object}[]} - 包含每个快照及其元数据的数组。
 */
export function calculateAllStatsBetweenMks(
  startMk: string,
  endMk: string,
  selectedMks: (string | null)[],
  allLogs: { [mk: string]: string },
): { mk: string; message_id: number; stat: object }[] {
  const startIndex = selectedMks.indexOf(startMk);
  const endIndex = selectedMks.indexOf(endMk);

  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    logger.error('calculateAllStatsBetweenMks', '无效的 startMk 或 endMk。');
    return [];
  }

  // 1. 计算起始点的状态
  let currentStat = calculateStatAt(startMk, selectedMks, allLogs);
  const results: { mk: string; message_id: number; stat: object }[] = [
    {
      mk: startMk,
      message_id: startIndex,
      stat: _.cloneDeep(currentStat),
    },
  ];

  // 2. 从起始点的下一条开始，迭代计算后续状态
  for (let i = startIndex + 1; i <= endIndex; i++) {
    const mk = selectedMks[i];
    if (!mk) continue;

    const log = parseEditLog(allLogs[mk]);
    currentStat = applyForward(currentStat, log);
    results.push({
      mk: mk,
      message_id: i,
      stat: _.cloneDeep(currentStat),
    });
  }

  return results;
}

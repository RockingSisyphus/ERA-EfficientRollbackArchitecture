/**
 * @file ERA 变量框架 - 状态快照模块
 * @description
 * 提供一个高级接口，用于获取任意历史时间点（由 MK 标记）的变量状态（stat）快照。
 */

'use strict';

import { LOGS_PATH, SEL_PATH } from '../utils/constants';
import { getEraData } from '../utils/era_data';
import { Logger } from '../utils/log';
import { calculateAllStatsBetweenMks, calculateStatAt } from './timetravel';

const logger = new Logger();

/**
 * 获取指定 MK 时间点的变量状态（stat）快照。
 * 这是一个高级接口，它会自动获取全局数据并调用纯计算函数。
 *
 * @param {string} targetMK - 目标状态对应的消息密钥 (MK)。
 * @returns {object | null} - 计算出的目标 stat 对象。如果找不到 MK 或发生错误，则返回 null。
 */
export function getStatAtMK(targetMK: string): object | null {
  try {
    const { meta } = getEraData();
    const selectedMks: (string | null)[] = _.get(meta, SEL_PATH, []);
    const allLogs: { [mk: string]: string } = _.get(meta, LOGS_PATH, {});

    if (!targetMK) {
      logger.error('getStatAtMK', `目标 MK 不能为空。`);
      return null;
    }

    // 检查 targetMK 是否有效
    if (!selectedMks.includes(targetMK)) {
      logger.error('getStatAtMK', `提供的 targetMK "${targetMK}" 无效或不存在于 selectedMks 中。`);
      return null;
    }

    // 调用 timetravel 中的纯函数进行计算
    const statAtTarget = calculateStatAt(targetMK, selectedMks, allLogs);

    return statAtTarget;
  } catch (error: any) {
    logger.error('getStatAtMK', `计算状态快照时出错: ${error?.message || error}`, error);
    return null;
  }
}

/**
 * 获取两个 MK（包含）之间的所有 stat 快照。
 * 这是一个高级接口，它会自动处理边界情况并调用纯计算函数。
 * @param {string} [startMk] - 起始 MK。如果为空，则从第一条消息开始。
 * @param {string} [endMk] - 结束 MK。如果为空，则到最后一条消息结束。
 * @returns {{mk: string, message_id: number, stat: object}[] | null} - 包含每个快照及其元数据的数组，或在出错时返回 null。
 */
export function getStatsBetweenMKs(
  startMk?: string,
  endMk?: string,
): { mk: string; message_id: number; stat: object }[] | null {
  try {
    const { meta } = getEraData();
    const selectedMks: (string | null)[] = _.get(meta, SEL_PATH, []);
    const allLogs: { [mk: string]: string } = _.get(meta, LOGS_PATH, {});

    const validMks = selectedMks.filter((mk): mk is string => !!mk);
    if (validMks.length === 0) {
      return [];
    }

    // 检查 startMk 是否有效
    if (startMk && !validMks.includes(startMk)) {
      logger.error('getStatsBetweenMKs', `提供的 startMk "${startMk}" 无效或不存在于 selectedMks 中。`);
      return null;
    }

    // 检查 endMk 是否有效
    if (endMk && !validMks.includes(endMk)) {
      logger.error('getStatsBetweenMKs', `提供的 endMk "${endMk}" 无效或不存在于 selectedMks 中。`);
      return null;
    }

    const actualStartMk = startMk || validMks[0];
    const actualEndMk = endMk || validMks[validMks.length - 1];

    const results = calculateAllStatsBetweenMks(actualStartMk, actualEndMk, selectedMks, allLogs);
    return results;
  } catch (error: any) {
    logger.error('getStatsBetweenMKs', `计算批量快照时出错: ${error?.message || error}`, error);
    return null;
  }
}

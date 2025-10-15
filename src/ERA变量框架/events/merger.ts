'use strict';

import _ from 'lodash';
import { ERA_API_EVENTS, ERA_EVENT_EMITTER } from '../utils/constants';
import { Logger } from '../utils/log';

const logger = new Logger('events-merger');

/**
 * @description 定义需要监听的事件的分组
 */
export const EVENT_GROUPS = {
  WRITE: [
    //tavern_events.CHARACTER_MESSAGE_RENDERED,
    tavern_events.APP_READY,
    'manual_write',
    ERA_EVENT_EMITTER.API_WRITE,
    //tavern_events.MESSAGE_RECEIVED,
  ],
  SYNC: [
    tavern_events.MESSAGE_RECEIVED,
    tavern_events.MESSAGE_DELETED,
    tavern_events.MESSAGE_SWIPED,
    tavern_events.CHAT_CHANGED,
    'manual_sync',
    'manual_full_sync',
  ],
  API: Object.values(ERA_API_EVENTS),
  /** 仅更新MK的事件 */
  UPDATE_MK_ONLY: [tavern_events.MESSAGE_SENT],
  /** 仅用于对冲检测的事件，本身不触发逻辑 */
  COLLISION_DETECTORS: [tavern_events.GENERATION_STARTED],
};

/**
 * @constant {Map<string, string>} EVENT_COLLISION_MAP
 * @description
 * 定义了事件对冲规则。
 * 如果在事件队列的同一次批处理中，同时出现了 key 事件和 value 事件，
 * 则这两个事件都将被忽略。
 *
 * @example
 * // 当用户快速左滑然后点击生成时，会依次触发 `MESSAGE_SWIPED` 和 `GENERATION_STARTED`。
 * // 这条规则会捕获这种模式并同时忽略这两个事件，避免不必要的同步。
 * new Map([
 *   [tavern_events.MESSAGE_SWIPED, tavern_events.GENERATION_STARTED]
 * ])
 */
export const EVENT_COLLISION_MAP = new Map<string, string>([
  [tavern_events.MESSAGE_SWIPED, tavern_events.GENERATION_STARTED],
]);

/**
 * @interface EventJob
 * @description 定义了事件队列中每个任务对象的结构。
 */
export interface EventJob {
  type: string;
  detail?: any;
  timestamp: number;
}

/**
 * 根据事件类型，查找它属于哪个预定义的组。
 * @param {string} eventType - 要检查的事件类型。
 * @returns {string} 事件所属的组名 ('WRITE', 'SYNC', 'API', 'UPDATE_MK_ONLY', 'UNKNOWN')。
 */
export function getEventGroup(eventType: string): string {
  // 使用 as string[] 来解决 TypeScript 因 'as const' 推断出的过于严格的类型问题
  if ((EVENT_GROUPS.WRITE as string[]).includes(eventType)) return 'WRITE';
  if ((EVENT_GROUPS.SYNC as string[]).includes(eventType)) return 'SYNC';
  if ((EVENT_GROUPS.API as string[]).includes(eventType)) return 'API';
  if ((EVENT_GROUPS.UPDATE_MK_ONLY as string[]).includes(eventType)) return 'UPDATE_MK_ONLY';
  if ((EVENT_GROUPS.COLLISION_DETECTORS as string[]).includes(eventType)) return 'COLLISION_DETECTORS';
  return 'UNKNOWN';
}

/**
 * **【事件合并器】**
 * 对一批事件进行智能合并，包括处理事件对冲和合并同组可覆盖事件。
 * @param {EventJob[]} batchToProcess - 从队列中取出的一批原始事件。
 * @returns {EventJob[]} - 经过合并优化后的事件数组。
 */
export function mergeEventBatch(batchToProcess: EventJob[]): EventJob[] {
  const originalEvents = _.cloneDeep(batchToProcess);
  const finalJobs: EventJob[] = [];

  // 使用 for...of 循环，让逻辑更清晰
  for (const currentJob of batchToProcess) {
    // 如果是第一个事件，直接放入结果中
    if (finalJobs.length === 0) {
      finalJobs.push(currentJob);
      continue; // 继续处理下一个事件
    }

    const prevJob = finalJobs[finalJobs.length - 1];

    // 1. 检查事件对冲
    const expectedNextEvent = EVENT_COLLISION_MAP.get(prevJob.type);
    const timeDifference = currentJob.timestamp - prevJob.timestamp;
    if (expectedNextEvent && currentJob.type === expectedNextEvent && timeDifference <= 300) {
      logger.debug(
        'mergeEventBatch',
        `检测到相邻事件对冲: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms)。将忽略这两个事件。`,
      );
      finalJobs.pop(); // 移除前一个事件
      continue; // 跳过当前事件，从而忽略两者
    }

    // 2. 如果不对冲，则检查同组事件合并
    const prevGroup = getEventGroup(prevJob.type);
    const currentGroup = getEventGroup(currentJob.type);

    // 定义合并条件，让 if 判断的意图更清晰
    const areInSameGroup = prevGroup === currentGroup;
    const isMergeableGroup = prevGroup === 'WRITE' || prevGroup === 'SYNC';

    // 如果满足合并条件
    if (areInSameGroup && isMergeableGroup) {
      // 用当前事件覆盖掉结果数组中的最后一个事件
      finalJobs[finalJobs.length - 1] = currentJob;
    } else {
      // 否则，将当前事件追加到结果数组
      finalJobs.push(currentJob);
    }
  }
  // 最后，过滤掉所有单独存在的对冲检测器事件，因为它们已经完成了自己的使命
  const filteredJobs = finalJobs.filter(job => {
    const isDetector = getEventGroup(job.type) === 'COLLISION_DETECTORS';
    if (isDetector) {
      logger.debug('mergeEventBatch', `清理未配对的对冲检测器事件: ${job.type}`);
    }
    return !isDetector;
  });

  // 打印合并日志
  logger.debug('mergeEventBatch', `事件合并: ${originalEvents.length} -> ${filteredJobs.length}`, {
    before: originalEvents.map(e => e.type),
    after: filteredJobs.map(e => e.type),
  });

  return filteredJobs;
}

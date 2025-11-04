'use strict';

import { ERA_API_EVENTS, ERA_EVENT_EMITTER } from '../utils/constants';
import { Logger } from '../utils/log';

const logger = new Logger();

/**
 * @description 定义需要监听的事件的分组
 */
export const EVENT_GROUPS = {
  INIT: [tavern_events.APP_READY],
  SYNC: [
    'manual_write',
    ERA_EVENT_EMITTER.API_WRITE,
    tavern_events.MESSAGE_RECEIVED,
    tavern_events.MESSAGE_DELETED,
    tavern_events.MESSAGE_SWIPED,
    tavern_events.CHAT_CHANGED,
    'manual_sync',
    'manual_full_sync',
    /** 由 message_updated 和 generation_started 组合而成的“编辑并继续”事件 */
    'combo_edit_and_continue',
  ],
  API: Object.values(ERA_API_EVENTS),
  /** 仅更新MK的事件 */
  UPDATE_MK_ONLY: [tavern_events.MESSAGE_SENT],
  /** 仅用于对冲检测的事件，本身不触发逻辑 */
  COLLISION_DETECTORS: [tavern_events.GENERATION_STARTED],
  /** 用于组合事件的起始事件 */
  COMBO_STARTERS: [tavern_events.MESSAGE_UPDATED],
  /** 定向同步事件组，用于针对指定消息的重算 */
  DIRECTED_SYNC: [
    tavern_events.MESSAGE_EDITED,
    /** 由 swiped 和 generation_started 组合而成的“滑动并重新生成”事件 */
    'combo_swipe_and_regenerate',
  ],
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
 *   [tavern_events.MESSAGE_SWIPED, { next: tavern_events.GENERATION_STARTED, maxInterval: 500 }]
 * ])
 */
export const EVENT_COLLISION_MAP = new Map<string, { next: string; maxInterval: number }>([]);

/**
 * @constant {Map<string, { next: string; resultType: string; maxInterval: number }>} EVENT_COMBO_MAP
 * @description
 * 定义了事件组合规则。
 * 如果在事件队列的同一次批处理中，一个 key 事件紧跟着一个 `next` 事件，
 * 它们将被合并成一个新的 `resultType` 事件。
 *
 * @example
 * // 当用户消息被AI编辑后立刻开始生成下一条消息时，会依次触发 `MESSAGE_UPDATED` 和 `GENERATION_STARTED`。
 * // 这条规则会捕获这种模式并将它们合并为一个 `combo_sync` 事件，以确保数据一致性。
 * new Map([
 *   [tavern_events.MESSAGE_UPDATED, { next: tavern_events.GENERATION_STARTED, resultType: 'combo_sync', maxInterval: 2100 }]
 * ])
 */
export const EVENT_COMBO_MAP = new Map<string, { next: string; resultType: string; maxInterval: number }>([
  [
    tavern_events.MESSAGE_UPDATED,
    { next: tavern_events.GENERATION_STARTED, resultType: 'combo_edit_and_continue', maxInterval: 1600 },
  ],
  [
    tavern_events.MESSAGE_SWIPED,
    { next: tavern_events.GENERATION_STARTED, resultType: 'combo_swipe_and_regenerate', maxInterval: 600 },
  ],
]);

/**
 * @constant {Map<string, number>} EVENT_DEBOUNCE_MAP
 * @description
 * 为特定事件定义自定义的防抖时间（毫秒）。
 * 在事件队列处理器中，如果一个事件在此映射中定义了时间，
 * 将使用该时间代替默认的防抖时间。
 * 这对于那些需要更长窗口来捕获后续事件的“前置事件”特别有用。
 *
 * @example
 * // 为 MESSAGE_SWIPED 设置更长的等待时间，以确保能捕获到后续的 GENERATION_STARTED
 * new Map([
 *   [tavern_events.MESSAGE_SWIPED, 500]
 * ])
 */
export const EVENT_DEBOUNCE_MAP = new Map<string, number>([
  [tavern_events.MESSAGE_SWIPED, 500], // 组合事件的前置事件
  [tavern_events.MESSAGE_UPDATED, 1500], // 组合事件的前置事件
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
 * @returns {string} 事件所属的组名 ('INIT', 'SYNC', 'API', 'UPDATE_MK_ONLY', 'UNKNOWN')。
 */
export function getEventGroup(eventType: string): string {
  // 使用 as string[] 来解决 TypeScript 因 'as const' 推断出的过于严格的类型问题
  if ((EVENT_GROUPS.INIT as string[]).includes(eventType)) return 'INIT';
  if ((EVENT_GROUPS.SYNC as string[]).includes(eventType)) return 'SYNC';
  if ((EVENT_GROUPS.API as string[]).includes(eventType)) return 'API';
  if ((EVENT_GROUPS.UPDATE_MK_ONLY as string[]).includes(eventType)) return 'UPDATE_MK_ONLY';
  if ((EVENT_GROUPS.COLLISION_DETECTORS as string[]).includes(eventType)) return 'COLLISION_DETECTORS';
  if ((EVENT_GROUPS.COMBO_STARTERS as string[]).includes(eventType)) return 'COMBO_STARTERS';
  if ((EVENT_GROUPS.DIRECTED_SYNC as string[]).includes(eventType)) return 'DIRECTED_SYNC';
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
    const timeDifference = currentJob.timestamp - prevJob.timestamp;

    // 1. 检查事件组合
    const comboRule = EVENT_COMBO_MAP.get(prevJob.type);
    if (comboRule && currentJob.type === comboRule.next) {
      if (timeDifference <= comboRule.maxInterval) {
        logger.debug(
          'mergeEventBatch',
          `检测到事件组合: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms <= ${comboRule.maxInterval}ms)。将合并为 ${comboRule.resultType} 事件。`,
        );
        finalJobs.pop(); // 移除前一个事件
        finalJobs.push({ type: comboRule.resultType, timestamp: currentJob.timestamp, detail: currentJob.detail });
        continue;
      } else {
        logger.debug(
          'mergeEventBatch',
          `检测到潜在的事件组合，但因超时而失败: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms > ${comboRule.maxInterval}ms)。`,
        );
      }
    }

    // 2. 检查事件对冲
    const collisionRule = EVENT_COLLISION_MAP.get(prevJob.type);
    if (collisionRule && currentJob.type === collisionRule.next) {
      if (timeDifference <= collisionRule.maxInterval) {
        logger.debug(
          'mergeEventBatch',
          `检测到相邻事件对冲: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms <= ${collisionRule.maxInterval}ms)。将忽略这两个事件。`,
        );
        finalJobs.pop(); // 移除前一个事件
        continue; // 跳过当前事件，从而忽略两者
      } else {
        logger.debug(
          'mergeEventBatch',
          `检测到潜在的事件对冲，但因超时而失败: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms > ${collisionRule.maxInterval}ms)。`,
        );
      }
    }

    // 3. 如果不冲突或组合，则检查同组事件合并
    const prevGroup = getEventGroup(prevJob.type);
    const currentGroup = getEventGroup(currentJob.type);

    // 定义合并条件，让 if 判断的意图更清晰
    const areInSameGroup = prevGroup === currentGroup;
    const isMergeableGroup = prevGroup === 'SYNC';

    // 如果满足合并条件
    if (areInSameGroup && isMergeableGroup) {
      // 用当前事件覆盖掉结果数组中的最后一个事件
      finalJobs[finalJobs.length - 1] = currentJob;
    } else {
      // 否则，将当前事件追加到结果数组
      finalJobs.push(currentJob);
    }
  }
  // 最后，清理掉所有未配对的检测器和组合起始事件
  const filteredJobs = finalJobs.filter(job => {
    const group = getEventGroup(job.type);
    const isOrphanedDetector = group === 'COLLISION_DETECTORS';
    const isOrphanedComboStarter = group === 'COMBO_STARTERS';
    if (isOrphanedDetector || isOrphanedComboStarter) {
      logger.debug('mergeEventBatch', `清理未配对的事件: ${job.type}`);
    }
    return !isOrphanedDetector && !isOrphanedComboStarter;
  });

  // 打印合并日志
  logger.debug('mergeEventBatch', `事件合并: ${originalEvents.length} -> ${filteredJobs.length}`, {
    before: originalEvents.map((e: EventJob) => e.type),
    after: filteredJobs.map((e: EventJob) => e.type),
  });

  return filteredJobs;
}

/**
 * @file ERA 变量框架 - 事件队列与处理器模块
 * @description
 * 该模块是 ERA 框架的“神经中枢”，它通过一个事件队列机制，优雅地解决了因酒馆（SillyTavern）
 * 高频、并发事件（特别是 `character_message_rendered`）可能导致的状态竞争和逻辑错乱问题。
 *
 * **工作原理**:
 * 1. **事件入队**: 所有来自酒馆的、与 ERA 相关的事件以及来自 API 的调用，都不会立即执行，
 *    而是被封装成一个 `EventJob` 对象，推入一个先进先出的 `eventQueue` 队列中。
 * 2. **单线程处理**: 一个独立的、异步的 `processQueue` 函数作为唯一的处理器。它使用一个
 *    `isProcessing` 锁来确保在任何时刻，只有一个事件处理循环在运行，从而从根本上避免了并发问题。
 * 3. **智能批处理与合并**: 在每个处理循环的开始，处理器会一次性取出队列中的所有事件形成一个“批次”。
 *    然后对这个批次进行“智能合并”，例如，多个连续的、效果可覆盖的写入事件（如 `MESSAGE_RECEIVED`）
 *    可以被合并为一次，只保留最后一个，这极大地减少了不必要的重复计算。
 * 4. **顺序执行与任务分发**: 合并后的任务会按照严格的顺序被逐一执行。`switch` 语句根据事件类型，
 *    将任务分发给相应的核心处理函数（如 `ApplyVarChange`, `resyncStateOnHistoryChange` 等）。
 * 5. **保障与节流**:
 *    - 在处理每个任务**之前**，都会调用 `ensureMkForLatestMessage`，确保即将操作的消息有 MK。
 *    - 在处理每个任务**之后**，都会调用 `updateLatestSelectedMk`，校准 `SelectedMks` 的最新记录。
 *    - 每个任务处理后都有一个短暂的 `setTimeout` 节流，给予酒馆底层异步操作完成的时间。
 */

'use strict';

import _ from 'lodash';
import {
  deleteByObject,
  deleteByPath,
  emitWriteDoneEvent,
  insertByObject,
  insertByPath,
  updateByObject,
  updateByPath,
} from './api';
import {
  ERA_API_EVENTS,
  EVENT_COLLISION_MAP,
  EVENT_GROUPS,
  LOGS_PATH,
  RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION,
  SEL_PATH,
} from './constants';
import { ensureMkForLatestMessage, readMessageKey, updateLatestSelectedMk } from './message_key';
import { rollbackByMk } from './rollback';
import { resyncStateOnHistoryChange } from './sync';
import { getEraData, logContext, Logger, removeMetaFields } from './utils';
import { ApplyVarChange } from './variable_change_processor';

const logger = new Logger('event_queue');

/**
 * @interface EventJob
 * @description 定义了事件队列中每个任务对象的结构。
 */
interface EventJob {
  type: string;
  detail?: any;
  timestamp: number;
}

/**
 * @const {EventJob[]} eventQueue
 * @description 事件队列，存储所有待处理的事件任务。
 */
const eventQueue: EventJob[] = [];

/**
 * @let {boolean} isProcessing
 * @description 处理器锁。为 true 时表示 `processQueue` 正在运行，防止重入。
 */
let isProcessing = false;

/**
 * **【事件入口】**
 * 将一个事件推入队列，并尝试启动处理器。这是所有事件监听器的统一入口点。
 * @param {string} type - 事件类型 (e.g., `tavern_events.MESSAGE_DELETED`)。
 * @param {any} [detail] - 事件附带的数据。
 */
export function pushToQueue(type: string, detail?: any) {
  logger.debug('pushToQueue', `接收到事件: ${type}，已推入队列。`);
  eventQueue.push({ type, detail, timestamp: Date.now() });
  processQueue(); // 尝试启动处理器
}

/**
 * 根据事件类型，查找它属于哪个预定义的组。
 * @param {string} eventType - 要检查的事件类型。
 * @returns {string} 事件所属的组名 ('WRITE', 'SYNC', 'API', 'UPDATE_MK_ONLY', 'UNKNOWN')。
 */
function getEventGroup(eventType: string): string {
  // 使用 as string[] 来解决 TypeScript 因 'as const' 推断出的过于严格的类型问题
  if ((EVENT_GROUPS.WRITE as string[]).includes(eventType)) return 'WRITE';
  if ((EVENT_GROUPS.SYNC as string[]).includes(eventType)) return 'SYNC';
  if ((EVENT_GROUPS.API as string[]).includes(eventType)) return 'API';
  if ((EVENT_GROUPS.UPDATE_MK_ONLY as string[]).includes(eventType)) return 'UPDATE_MK_ONLY';
  if ((EVENT_GROUPS.COLLISION_DETECTORS as string[]).includes(eventType)) return 'COLLISION_DETECTORS';
  return 'UNKNOWN';
}

/**
 * **【核心事件处理器】**
 * 持续从队列中取出事件、合并、并按顺序执行。
 * 这是一个自驱动的异步函数，只要队列不为空就会一直运行，直到处理完所有任务。
 */
async function processQueue() {
  if (isProcessing) return; // 如果已在处理中，则直接返回，等待当前循环完成。
  isProcessing = true;

  logger.log('processQueue', '处理器启动...');

  // 用于存储由 ensureMkForLatestMessage 新注入的 MK，以忽略其触发的渲染事件。
  // 它定义在 while 循环外部，以在不同批次的事件处理之间保持状态。
  let mkToIgnore: { mk: string; ignoreCount: number } | null = null;

  while (eventQueue.length > 0) {
    // 【事件收集窗口】
    // 查看队列中的下一个事件，以决定是否需要防抖。
    const nextJob = eventQueue[0];
    const nextGroup = getEventGroup(nextJob.type);

    // 如果下一个事件不是需要立即响应的 API 事件，则进行防抖等待。
    // 这允许在第一个事件触发后、处理器实际开始工作前的瞬间，让任何紧随其后的、
    // 快速连续的事件（如多次 swipe）有机会进入队列，从而被纳入同一个批次进行合并。
    if (nextGroup !== 'API') {
      logger.log('processQueue', `下一个事件 (${nextJob.type}) 需要防抖，等待300毫秒...`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // --- 1. 事件批处理与合并 ---
    // 等待结束后，一次性取出队列中的所有事件进行批处理。
    const batchToProcess = eventQueue.splice(0, eventQueue.length);
    const originalEvents = _.cloneDeep(batchToProcess);

    // a. 合并相邻的同组事件
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
        logger.log(
          'processQueue',
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

    // b. 打印合并日志
    console.groupCollapsed(`[ERA] 事件队列处理: ${originalEvents.length} -> ${finalJobs.length}`);
    logger.log(
      '合并前',
      originalEvents.map(e => e.type),
    );
    logger.log(
      '合并后',
      finalJobs.map(e => e.type),
    );
    console.groupEnd();

    // --- 2. 严格按顺序执行合并后的任务 ---
    for (const job of finalJobs) {
      const { type: eventType, detail } = job;
      const eventGroup = getEventGroup(eventType);
      let message_id: number | null = null;

      // 在每轮任务开始时，初始化操作记录器
      const actionsTaken = { rollback: false, apply: false, resync: false };

      try {
        // **前置过滤**: 忽略单独存在的对冲检测器事件
        if (eventGroup === 'COLLISION_DETECTORS') {
          // 此类事件仅用于对冲，如果它单独存在（未被对冲掉），则不执行任何操作。
          logger.log('processQueue', `事件 ${eventType} 是一个对冲检测器，无独立操作，已忽略。`);
          continue;
        }

        // **前置保障**: 确保最新消息有 MK 并设置日志上下文。
        const { mk, message_id: msgId, isNewKey } = await ensureMkForLatestMessage();
        logContext.mk = mk;
        message_id = msgId;

        // 如果 ensureMkForLatestMessage 刚刚注入了一个新的 MK，就设置忽略规则。
        if (isNewKey && mk) {
          mkToIgnore = {
            mk: mk,
            ignoreCount: RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION,
          };
        }

        // **核心优化**: 忽略由 MK 注入自身触发的渲染事件
        if (mkToIgnore && eventType === tavern_events.CHARACTER_MESSAGE_RENDERED && mk === mkToIgnore.mk) {
          logger.log(
            'processQueue',
            `忽略由 MK (${mkToIgnore.mk}) 注入触发的冗余渲染事件。剩余忽略次数: ${mkToIgnore.ignoreCount - 1}`,
          );
          mkToIgnore.ignoreCount--;
          if (mkToIgnore.ignoreCount <= 0) {
            mkToIgnore = null; // 忽略次数用完，重置
            logger.log('processQueue', `忽略次数用完`);
          }
          continue; // 跳过此事件的处理
        }

        logger.log('processQueue', `执行任务: ${eventType} (分组: ${eventGroup})`);

        // **任务分发**
        if (eventGroup === 'WRITE') {
          // 关键：写入前先回滚，确保操作的幂等性。
          // 即使事件被意外触发多次，也只会产生一次有效写入。
          const msg = getChatMessages(-1, { include_swipes: true })?.[0];
          if (msg) {
            const MK = readMessageKey(msg);
            if (MK) {
              await rollbackByMk(MK, true);
              actionsTaken.rollback = true;
            }
          }
          await ApplyVarChange();
          actionsTaken.apply = true;
        } else if (eventGroup === 'SYNC') {
          logger.log('processQueue', `事件 ${eventType} 触发状态同步流程...`);
          const isFullSync = eventType === 'manual_full_sync';
          await resyncStateOnHistoryChange(isFullSync);
          actionsTaken.resync = true;
        } else if (eventGroup === 'API') {
          // API 事件是“即发即忘”的，同步调用处理器将任务推入 api.ts 的队列后立即返回，不阻塞事件队列。
          if (eventType === ERA_API_EVENTS.INSERT_BY_OBJECT) insertByObject(detail);
          else if (eventType === ERA_API_EVENTS.UPDATE_BY_OBJECT) updateByObject(detail);
          else if (eventType === ERA_API_EVENTS.INSERT_BY_PATH) insertByPath(detail.path, detail.value);
          else if (eventType === ERA_API_EVENTS.UPDATE_BY_PATH) updateByPath(detail.path, detail.value);
          else if (eventType === ERA_API_EVENTS.DELETE_BY_OBJECT) deleteByObject(detail);
          else if (eventType === ERA_API_EVENTS.DELETE_BY_PATH) deleteByPath(detail.path);
        } else if (eventGroup === 'UPDATE_MK_ONLY') {
          // 监听此事件仅用于为用户消息创建 MK。
          await updateLatestSelectedMk();
        }
      } catch (error) {
        logger.error('processQueue', `事件 ${eventType} 处理异常: ${error}`, error);
      } finally {
        // 仅当本轮处理中实际执行了 ERA 核心操作时，才校准并广播事件
        // --- 3. 触发写入完成事件 ---
        if (actionsTaken.rollback || actionsTaken.apply || actionsTaken.resync) {
          // **后置保障**: 强制校准 `SelectedMks` 的最新记录。
          await updateLatestSelectedMk();
          // 在所有操作（包括校准）完成后，获取最新状态并广播事件
          if (logContext.mk && message_id !== null) {
            const { meta: metaData, stat: statData } = getEraData();
            const selectedMks = _.get(metaData, SEL_PATH, []);
            const editLogs = _.get(metaData, LOGS_PATH, {});
            const statWithoutMeta = removeMetaFields(statData);

            emitWriteDoneEvent({
              mk: logContext.mk,
              message_id: message_id,
              actions: actionsTaken,
              selectedMks: selectedMks,
              editLogs: editLogs,
              stat: statData,
              statWithoutMeta: statWithoutMeta,
            });
          }
        }

        // 清理日志上下文，为下一个事件做准备
        logContext.mk = '';

        // **节流**: 在每个独立任务后都进行短暂等待，确保酒馆底层有时间完成其异步操作。
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    logger.debug('processQueue', '本轮批次处理完毕。');
  }

  // 队列处理完毕，释放锁，等待下一次事件入队。
  isProcessing = false;
  logger.log('processQueue', '处理器空闲，已释放锁。');
}

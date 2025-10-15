/**
 * @file ERA 变量框架 - 事件队列与总调度模块
 * @description
 * 该模块是 ERA 框架的“神经中枢”。它通过一个事件队列机制，将所有事件的接收、
 * 合并、分发和执行流程化，从根本上解决了并发和状态竞争问题。
 *
 * **工作原理**:
 * 1. **事件入队**: 所有事件（来自酒馆或 API）都被封装成 `EventJob` 对象，推入 `eventQueue`。
 * 2. **单线程处理**: `processQueue` 函数使用 `isProcessing` 锁确保同一时间只有一个处理循环在运行。
 * 3. **防抖与批处理**: 在处理前会进行短暂防抖，以收集短时间内连续触发的多个事件，形成一个“批次”。
 * 4. **委托合并**: 将整个批次交由 `event_merger.ts` 模块进行智能合并（对冲、覆盖）。
 * 5. **委托执行**: 循环遍历合并后的任务，将每个任务委托给 `task_dispatcher.ts` 模块进行独立、原子的执行。
 * 6. **状态传递**: 在不同任务的执行之间，传递和更新必要的上下文状态（如 `mkToIgnore` 和 `consecutiveMkState`）。
 */

'use strict';

import _ from 'lodash';
import { ConsecutiveMkState, dispatchAndExecuteTask, IgnoreRule } from './dispatcher';
import { EventJob, getEventGroup, mergeEventBatch } from './merger';
import { Logger } from '../utils/log';

const logger = new Logger('events-queue');

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
  logger.debug('pushToQueue', `接收到事件: ${type}，已推入队列。`, { detail });
  eventQueue.push({ type, detail, timestamp: Date.now() });
  processQueue(); // 尝试启动处理器
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

  // --- 状态初始化 ---
  // 这些状态变量定义在 while 循环外部，以在不同批次的事件处理之间保持连续性。
  let mkToIgnore: IgnoreRule | null = null;
  let consecutiveMkState: ConsecutiveMkState | null = null;

  while (eventQueue.length > 0) {
    // 【事件收集窗口与防抖】
    const nextJob = eventQueue[0];
    const nextGroup = getEventGroup(nextJob.type);
    if (nextGroup !== 'API') {
      logger.log('processQueue', `下一个事件 (${nextJob.type}) 需要防抖，等待300毫秒...`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // --- 1. 事件批处理与合并 ---
    const batchToProcess = eventQueue.splice(0, eventQueue.length);
    const finalJobs = mergeEventBatch(batchToProcess); // **委托合并**

    // --- 2. 严格按顺序执行合并后的任务 ---
    for (const job of finalJobs) {
      // **委托执行**
      // 将当前任务和上下文状态传递给执行器
      const { newIgnoreRule, newConsecutiveMkState } = await dispatchAndExecuteTask(
        job,
        mkToIgnore,
        consecutiveMkState,
      );

      // 更新上下文状态，为下一个任务做准备
      mkToIgnore = newIgnoreRule;
      consecutiveMkState = newConsecutiveMkState;
    }
    logger.debug('processQueue', '本轮批次处理完毕。');
  }

  // 队列处理完毕，释放锁，等待下一次事件入队。
  isProcessing = false;
  logger.log('processQueue', '处理器空闲，已释放锁。');
}

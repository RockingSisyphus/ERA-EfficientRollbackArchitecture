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

import { Logger } from '../utils/log';
import { dispatchAndExecuteTask } from './dispatcher';
import { EVENT_DEBOUNCE_MAP, EventJob, getEventGroup, hasImmediateCombo, mergeEventBatch } from './merger';

const logger = new Logger();

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
let isWaiting = false;
let unlockSignal: (() => void) | null = null;

/**
 * **【事件入口】**
 * 将一个事件推入队列，并尝试启动或排队等待处理器。
 * @param {string} type - 事件类型 (e.g., `tavern_events.MESSAGE_DELETED`)。
 * @param {any} [detail] - 事件附带的数据。
 */
export function pushToQueue(type: string, detail?: any) {
  logger.debug('pushToQueue', `接收到事件: ${type}，已推入队列。`, { detail });
  eventQueue.push({ type, detail, timestamp: Date.now() });
  processQueue();
}

/**
 * **【核心事件处理器】**
 * 采用“锁-等待-释放-通知”机制，确保事件处理的连续性。
 */
async function processQueue() {
  // 如果已经有一个调用在“排队等待”，则本次调用直接返回，防止多个等待者。
  if (isWaiting) {
    logger.debug('processQueue', '已有处理函数在排队等待，本次调用忽略。');
    return;
  }

  // 如果处理器正在忙碌，则进入“排队等待”状态。
  if (isProcessing) {
    logger.debug('processQueue', '处理器忙碌，进入排队等待状态...');
    isWaiting = true;
    // 等待当前处理器释放锁的信号
    await new Promise<void>(resolve => {
      unlockSignal = resolve;
    });
    isWaiting = false;
    logger.debug('processQueue', '等待结束，获取到处理权。');
  }

  // 获得处理权后，如果队列已经被前一个处理器清空，则无需做任何事。
  if (eventQueue.length === 0) {
    logger.debug('processQueue', '队列为空，无需处理。');
    return;
  }

  // 【加锁】
  // 正式开始处理，加锁以阻止其他调用进入。
  isProcessing = true;
  logger.debug('processQueue', '处理器启动');

  // 【防抖】
  const firstJob = eventQueue[0];
  const group = getEventGroup(firstJob.type);
  if (group !== 'API') {
    const debounceTime = EVENT_DEBOUNCE_MAP.get(firstJob.type) ?? 100;
    const checkInterval = 20; // 每20ms检查一次
    let elapsedTime = 0;

    logger.debug('processQueue', `启动事件收集窗口，最长等待 ${debounceTime}ms...`);

    while (elapsedTime < debounceTime) {
      // 检查是否存在需要立即处理的组合事件
      if (hasImmediateCombo(eventQueue)) {
        logger.debug('processQueue', '检测到紧急事件组合，立即结束等待。');
        break; // 如果有，立即跳出循环
      }

      // 等待一个检查间隔
      await new Promise(resolve => setTimeout(resolve, checkInterval));
      elapsedTime += checkInterval;
    }

    if (elapsedTime >= debounceTime) {
      logger.debug('processQueue', `等待时间达到 ${debounceTime}ms，正常结束等待。`);
    }
  }

  // 【调试日志】
  logger.debug('processQueue', '事件收集窗口关闭，准备处理的队列内容:', JSON.stringify(eventQueue.map(e => e.type)));

  // 【循环处理】
  // 只要队列不为空，就持续处理。这能确保在防抖期间新到达的事件也被纳入处理范围。
  // let mkToIgnore: IgnoreRule | null = null; // 已弃用
  while (eventQueue.length > 0) {
    const batchToProcess = eventQueue.splice(0, eventQueue.length);
    const finalJobs = mergeEventBatch(batchToProcess);

    logger.debug(
      'processQueue',
      `开始处理一个新批次，包含 ${batchToProcess.length} 个原始事件，合并后为 ${finalJobs.length} 个任务。`,
    );

    for (const job of finalJobs) {
      // const newIgnoreRule = await dispatchAndExecuteTask(job, mkToIgnore);
      // mkToIgnore = newIgnoreRule;
      await dispatchAndExecuteTask(job, null);
    }
    logger.debug('processQueue', '本轮批次处理完毕。');
  }

  // 【解锁并通知】
  isProcessing = false;
  logger.debug('processQueue', '处理器空闲，已释放锁。');

  // 如果有等待者，则发送解锁信号，让它立即开始。
  if (unlockSignal) {
    logger.debug('processQueue', '通知排队的处理器开始工作。');
    const signal = unlockSignal;
    unlockSignal = null;
    signal();
  }
}

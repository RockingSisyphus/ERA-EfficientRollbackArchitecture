'use strict';

import _ from 'lodash';
import { insertByObject, insertByPath, updateByObject, updateByPath } from './api';
import { ensureMkForLatestMessage, readMessageKey, updateLatestSelectedMk } from './message_key';
import { rollbackByMk } from './rollback';
import { resyncStateOnHistoryChange } from './sync';
import { Logger } from './utils';
import { ApplyVarChange } from './write';

// =================================================================
// 事件处理队列机制
// 解决了因高频、并发事件（如 character_message_rendered）导致的状态竞争和逻辑错乱问题。
//
// 工作原理：
// 1. 所有事件触发时，不直接执行逻辑，而是被推入一个先进先出的“事件队列”(eventQueue)。
// 2. 一个独立的、持续运行的“处理器”(processQueue)负责从队列中取出事件并执行。
// 3. 处理器使用一个“处理中”标志(isProcessing)来确保任何时候只有一个核心逻辑在运行，防止并发。
// 4. 在处理一批事件前，会进行“智能合并”，例如，多个连续的写入事件可以合并为一次，
//    而重要的同步事件（如删除消息）则拥有更高优先级。
// 5. 每次处理循环后，会有一个短暂的“节流”等待，确保酒馆底层的异步操作有时间完成。
// =================================================================

/**
 * @description 事件对象的接口定义
 */
interface EventJob {
  type: string;
  detail?: any;
}

/**
 * @description 事件队列，存储所有待处理的事件
 */
const eventQueue: EventJob[] = [];

/**
 * @description 处理中标志，为 true 时表示 processQueue 正在运行，防止重入
 */
let isProcessing = false;

// (移除优先级定义)

/**
 * @description 将事件推入队列，并尝试启动处理器
 * 这是所有事件监听器的统一入口。
 * @param type 事件类型
 * @param detail 事件数据
 */
export function pushToQueue(type: string, detail?: any) {
  const logger = new Logger();
  logger.log(`[队列] 接收到事件: ${type}，已推入队列。`, '调试');
  eventQueue.push({ type, detail });
  processQueue(); // 尝试启动处理器
}

/**
 * @description 核心事件处理器
 * 持续从队列中取出事件、合并、并执行最高优先级的任务。
 */
async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;

  const logger = new Logger();
  logger.log('[队列] 处理器启动...', '调试');

  while (eventQueue.length > 0) {
    // --- 1. 事件批处理与合并 ---
    let currentBatch = eventQueue.splice(0, eventQueue.length);
    logger.log(`[队列] 取出批次，包含 ${currentBatch.length} 个事件: ${currentBatch.map(e => e.type).join(', ')}`, '调试');

    // a. 合并 CHARACTER_MESSAGE_RENDERED, 只保留最后一个
    const lastRenderIndex = _.findLastIndex(currentBatch, { type: tavern_events.CHARACTER_MESSAGE_RENDERED });
    if (lastRenderIndex > -1) {
      currentBatch = currentBatch.filter(
        (job, index) => job.type !== tavern_events.CHARACTER_MESSAGE_RENDERED || index === lastRenderIndex,
      );
    }

    // b. 合并连续的 MESSAGE_RECEIVED
    // c. 合并连续的 MESSAGE_SWIPED
    // (为了简化，我们先实现一个更通用的合并逻辑：如果一个事件连续出现，只保留最后一个)
    const finalJobs: EventJob[] = [];
    if (currentBatch.length > 0) {
      finalJobs.push(currentBatch[0]);
      for (let i = 1; i < currentBatch.length; i++) {
        const prevJob = currentBatch[i - 1];
        const currentJob = currentBatch[i];
        // 如果当前事件和前一个事件类型相同，并且是可合并的类型，则跳过（相当于丢弃前一个，保留当前的）
        if (
          currentJob.type === prevJob.type &&
          (currentJob.type === tavern_events.MESSAGE_RECEIVED || currentJob.type === tavern_events.MESSAGE_SWIPED)
        ) {
          finalJobs[finalJobs.length - 1] = currentJob; // 替换掉最后一个
        } else {
          finalJobs.push(currentJob);
        }
      }
    }
    logger.log(`[队列] 合并后，剩余 ${finalJobs.length} 个任务: ${finalJobs.map(e => e.type).join(', ')}`, '调试');

    // --- 2. 严格按顺序执行合并后的任务 ---
    for (const job of finalJobs) {
      const { type: eventType, detail } = job;
      logger.log(`[队列] 执行任务: ${eventType}`, '调试');
      try {
        await ensureMkForLatestMessage();

        // 根据事件类型执行对应逻辑
        switch (eventType) {
          case 'rollback_done_reapply_var_start':
          case tavern_events.MESSAGE_RECEIVED:
          case tavern_events.CHARACTER_MESSAGE_RENDERED:
          case 'manual_write': {
            // 写入前先回滚，确保幂等性
            const msg = getChatMessages(-1, { include_swipes: true })?.[0];
            if (msg) {
              const MK = readMessageKey(msg);
              if (MK) await rollbackByMk(MK, true);
            }
            await ApplyVarChange();
            break;
          }

          case tavern_events.MESSAGE_DELETED:
          case tavern_events.MESSAGE_SWIPED:
          case tavern_events.CHAT_CHANGED:
          case 'manual_sync':
            await resyncStateOnHistoryChange();
            break;

          case 'era:insertByObject':
            if (detail && typeof detail === 'object') await insertByObject(detail);
            break;
          case 'era:updateByObject':
            if (detail && typeof detail === 'object') await updateByObject(detail);
            break;
          case 'era:insertByPath':
            if (detail && typeof detail.path === 'string') await insertByPath(detail.path, detail.value);
            break;
          case 'era:updateByPath':
            if (detail && typeof detail.path === 'string') await updateByPath(detail.path, detail.value);
            break;

          case tavern_events.MESSAGE_SENT:
            // 无需操作
            break;
        }
      } catch (error) {
        logger.log(`[队列] 事件 ${eventType} 处理异常: ${error}`, '错误');
      } finally {
        await updateLatestSelectedMk();
        // 在每个独立任务后都进行短暂节流
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    logger.log('[队列] 本轮批次处理完毕。', '调试');
  }

  // 队列处理完毕，释放锁
  isProcessing = false;
  logger.log('[队列] 处理器空闲，已释放锁。', '调试');
  await logger.flush();
}

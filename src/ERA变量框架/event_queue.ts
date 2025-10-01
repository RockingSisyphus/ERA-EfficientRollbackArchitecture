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
import { ERA_API_EVENTS, LOGS_PATH, SEL_PATH } from './constants';
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
  eventQueue.push({ type, detail });
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

  while (eventQueue.length > 0) {
    // 在每轮批处理开始时，初始化操作记录器
    const actionsTaken = {
      rollback: false,
      apply: false,
      resync: false,
    };

    // --- 1. 事件批处理与合并 ---
    let currentBatch = eventQueue.splice(0, eventQueue.length);
    logger.debug(
      'processQueue',
      `取出批次，包含 ${currentBatch.length} 个事件: ${currentBatch.map(e => e.type).join(', ')}`,
    );

    // a. 合并可覆盖的事件，只保留最后一个。
    // 例如，短时间内多次触发 `CHARACTER_MESSAGE_RENDERED`，实际上我们只关心最后一次渲染完成时的状态。
    const lastRenderIndex = _.findLastIndex(currentBatch, { type: tavern_events.CHARACTER_MESSAGE_RENDERED });
    if (lastRenderIndex > -1) {
      currentBatch = currentBatch.filter(
        (job, index) => job.type !== tavern_events.CHARACTER_MESSAGE_RENDERED || index === lastRenderIndex,
      );
    }

    // b. 合并连续的同类型事件，如 MESSAGE_RECEIVED, MESSAGE_SWIPED。
    const finalJobs: EventJob[] = [];
    if (currentBatch.length > 0) {
      finalJobs.push(currentBatch[0]);
      for (let i = 1; i < currentBatch.length; i++) {
        const prevJob = finalJobs[finalJobs.length - 1];
        const currentJob = currentBatch[i];
        // 如果当前事件和前一个事件类型相同，并且是可合并的类型，则用当前事件替换掉前一个。
        if (
          currentJob.type === prevJob.type &&
          (currentJob.type === tavern_events.MESSAGE_RECEIVED || currentJob.type === tavern_events.MESSAGE_SWIPED)
        ) {
          finalJobs[finalJobs.length - 1] = currentJob;
        } else {
          finalJobs.push(currentJob);
        }
      }
    }
    logger.debug('processQueue', `合并后，剩余 ${finalJobs.length} 个任务: ${finalJobs.map(e => e.type).join(', ')}`);

    // --- 2. 严格按顺序执行合并后的任务 ---
    for (const job of finalJobs) {
      const { type: eventType, detail } = job;
      let message_id: number | null = null;
      try {
        // **前置保障**: 确保最新消息有 MK 并设置日志上下文。
        const { mk, message_id: msgId } = await ensureMkForLatestMessage();
        logContext.mk = mk;
        message_id = msgId;

        logger.log('processQueue', `执行任务: ${eventType}`);

        // **任务分发**
        switch (eventType) {
          // --- 写入类事件 ---
          case 'rollback_done_reapply_var_start': // 内部事件，由同步流程触发
          case tavern_events.MESSAGE_RECEIVED:
          case tavern_events.CHARACTER_MESSAGE_RENDERED:
          case tavern_events.APP_READY:
          case 'manual_write': {
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
            break;
          }

          // --- 同步类事件 ---
          case tavern_events.MESSAGE_DELETED:
          case tavern_events.MESSAGE_SWIPED:
          case tavern_events.CHAT_CHANGED:
          case 'manual_sync':
            await resyncStateOnHistoryChange();
            actionsTaken.resync = true;
            break;

          // --- API 调用事件 ---
          case ERA_API_EVENTS.INSERT_BY_OBJECT:
            if (detail && typeof detail === 'object') await insertByObject(detail);
            break;
          case ERA_API_EVENTS.UPDATE_BY_OBJECT:
            if (detail && typeof detail === 'object') await updateByObject(detail);
            break;
          case ERA_API_EVENTS.INSERT_BY_PATH:
            if (detail && typeof detail.path === 'string') await insertByPath(detail.path, detail.value);
            break;
          case ERA_API_EVENTS.UPDATE_BY_PATH:
            if (detail && typeof detail.path === 'string') await updateByPath(detail.path, detail.value);
            break;
          case ERA_API_EVENTS.DELETE_BY_OBJECT:
            if (detail && typeof detail === 'object') await deleteByObject(detail);
            break;
          case ERA_API_EVENTS.DELETE_BY_PATH:
            if (detail && typeof detail.path === 'string') await deleteByPath(detail.path);
            break;

          // --- 忽略的事件 ---
          //case tavern_events.MESSAGE_SENT:
          // 用户发送消息的瞬间，AI 尚未回复，此时无需操作。
          //break;
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

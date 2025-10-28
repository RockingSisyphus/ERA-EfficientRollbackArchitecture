'use strict';

import { ensureMkForLatestMessage } from '../core/key/mk';
import { initializeExternalSettings } from '../initer/auto/settings';
import { ensurePlaceholder } from '../macro/placeholder';
import { getMessageContentWithRetry } from '../utils/message';
import { logContext, Logger } from '../utils/log';
import { handleApiEvent } from './handlers/api/dispatcher';
import { handleSyncEvent } from './handlers/sync';
import { handleUpdateMkOnlyEvent } from './handlers/updateMkOnly';
import { EventJob, getEventGroup } from './merger';
import { ActionsTaken, DispatcherPayload } from './types';

const logger = new Logger();

/**
 * @constant {number} RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION
 * @description 当 `ensureMessageKey` 注入一个新的 MK 后，需要忽略的由该操作触发的 `character_message_rendered` 事件的数量。
 * 通常设置为 1，因为一次消息内容更新通常只会触发一次渲染事件。
 */
const RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION = 1;

/**
 * @interface IgnoreRule
 * @description 定义了因 MK 注入而需要忽略后续渲染事件的规则。
 */
export interface IgnoreRule {
  mk: string;
  ignoreCount: number;
}

/**
 * @interface ConsecutiveMkState
 * @description 定义了用于追踪同一个 MK 被连续处理次数的状态。
 */
export interface ConsecutiveMkState {
  mk: string | null;
  count: number;
}

/**
 * @var {ConsecutiveMkState | null} consecutiveMkState
 * @description 追踪同一个 MK 被连续处理次数的状态。
 * **作用域**: 跨批次持久化。在整个脚本生命周期内，记录字面意义上的“上一次”执行的 MK。
 */
let consecutiveMkState: ConsecutiveMkState | null = null;

/**
 * **【辅助函数】处理由 MK 注入触发的冗余渲染事件**
 * @param eventType - 当前事件的类型。
 * @param currentMk - 当前消息的 MK。
 * @param mkToIgnore - 当前的忽略规则。
 * @returns {{ shouldSkip: boolean; newIgnoreRule: IgnoreRule | null }} - 返回是否应跳过此事件，以及更新后的忽略规则。
 */
function handleRedundantRenderEvent(
  eventType: string,
  currentMk: string | null,
  mkToIgnore: IgnoreRule | null,
): { shouldSkip: boolean; newIgnoreRule: IgnoreRule | null } {
  if (mkToIgnore && eventType === tavern_events.CHARACTER_MESSAGE_RENDERED && currentMk === mkToIgnore.mk) {
    logger.log(
      'handleRedundantRenderEvent',
      `忽略由 MK (${mkToIgnore.mk}) 注入触发的冗余渲染事件。剩余忽略次数: ${mkToIgnore.ignoreCount - 1}`,
    );
    mkToIgnore.ignoreCount--;
    if (mkToIgnore.ignoreCount <= 0) {
      mkToIgnore = null; // 忽略次数用完，重置
      logger.log('handleRedundantRenderEvent', `忽略次数用完`);
    }
    return { shouldSkip: true, newIgnoreRule: mkToIgnore };
  }
  return { shouldSkip: false, newIgnoreRule: mkToIgnore };
}

/**
 * **【辅助函数】更新连续处理计数**
 * @returns {number} - 返回更新后的连续处理次数。
 */
function updateConsecutiveMkCount(): number {
  const mk = logContext.mk;
  if (mk && consecutiveMkState && consecutiveMkState.mk === mk) {
    logger.debug(
      'updateConsecutiveMkCount',
      `连续处理写入/同步操作的 MK: ${mk}。旧计数: ${consecutiveMkState.count}，新计数: ${consecutiveMkState.count + 1}`,
    );
    consecutiveMkState.count++;
  } else {
    logger.debug(
      'updateConsecutiveMkCount',
      `新的写入/同步操作的 MK: ${mk}。重置计数为 1。前一个 MK 是: ${consecutiveMkState?.mk}`,
    );
    consecutiveMkState = { mk: mk, count: 1 };
  }
  return consecutiveMkState.count;
}

/**
 * **【任务执行器】**
 * 负责执行单个事件任务，包含所有前置、后置处理和错误捕获。
 * @param {EventJob} job - 要执行的事件任务。
 * @param {IgnoreRule | null} mkToIgnore - 当前的忽略规则。**作用域**: 仅在单次批处理 (event queue processing loop) 中生效。
 * @returns {Promise<IgnoreRule | null>} - 返回更新后的忽略规则。
 */
export async function dispatchAndExecuteTask(job: EventJob, mkToIgnore: IgnoreRule | null): Promise<IgnoreRule | null> {
  const { type: eventType } = job;
  const eventGroup = getEventGroup(eventType);
  let message_id: number | null = null;

  // 在每轮任务开始时，初始化操作记录器
  const actionsTaken: ActionsTaken = { rollback: false, apply: false, resync: false, api: false, apiWrite: false };

  try {
    // **入口保障**: 尝试获取最新消息内容，内置的重试和延迟机制可以应对酒馆消息更新延迟。
    // 即使最终失败，也继续执行，目的只是为了“等待”。
    await getMessageContentWithRetry();

    // **前置保障**: 确保最新消息有 MK 并设置日志上下文。
    const { mk, message_id: msgId, isNewKey } = await ensureMkForLatestMessage();
    if (!mk || msgId === null) {
      logger.warn('dispatchAndExecuteTask', '无法获取有效的 MK 或消息 ID，跳过任务执行。');
      return mkToIgnore;
    }
    logContext.mk = mk;
    message_id = msgId;

    // **前置保障**: 确保 AI 消息有占位符
    await ensurePlaceholder(message_id);

    // 如果 ensureMkForLatestMessage 刚刚注入了一个新的 MK，就创建或更新忽略规则。
    if (isNewKey && mk) {
      mkToIgnore = {
        mk: mk,
        ignoreCount: RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION,
      };
    }

    // **核心优化**: 检查并处理由 MK 注入触发的冗余渲染事件。
    const { shouldSkip, newIgnoreRule } = handleRedundantRenderEvent(eventType, mk, mkToIgnore);
    mkToIgnore = newIgnoreRule; // 更新忽略规则的状态
    if (shouldSkip) {
      // 如果事件被忽略，则直接返回，不更新连续处理计数
      return mkToIgnore;
    }

    logger.log('dispatchAndExecuteTask', `执行任务: ${eventType} (分组: ${eventGroup})`);

    // **任务分发**
    // v3.1 优化：payload 仅包含最核心的上下文，其他数据由下游函数自行获取。
    const payload: DispatcherPayload = {
      mk: mk,
      message_id: message_id,
      actions: actionsTaken,
      consecutiveProcessingCount: 1, // 初始值
    };

    switch (eventGroup) {
      case 'INIT':
        initializeExternalSettings();
        // 为了兼容旧版酒馆的swipe逻辑，这里也调用同步
        payload.consecutiveProcessingCount = updateConsecutiveMkCount();
        await handleSyncEvent(job, actionsTaken, payload);
        break;
      case 'SYNC':
        payload.consecutiveProcessingCount = updateConsecutiveMkCount();
        await handleSyncEvent(job, actionsTaken, payload);
        break;
      case 'API':
        handleApiEvent(job, actionsTaken, payload);
        break;
      case 'UPDATE_MK_ONLY':
        await handleUpdateMkOnlyEvent();
        break;
    }
  } catch (error) {
    logger.error('dispatchAndExecuteTask', `事件 ${eventType} 处理异常: ${error}`, error);
  } finally {
    // 清理日志上下文，为下一个事件做准备
    logContext.mk = '';

    // **节流**: 在每个独立任务后都进行短暂等待，确保酒馆底层有时间完成其异步操作。
    //暂时取消等待逻辑，提高即时性。
    //await new Promise(resolve => setTimeout(resolve, 50));
  }

  return mkToIgnore;
}

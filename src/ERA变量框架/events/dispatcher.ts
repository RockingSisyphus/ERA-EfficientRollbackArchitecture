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
} from '../api/command';
import { forceRenderRecentMessages } from '../api/macro/patch';
import { ApplyVarChange } from '../core/crud/patcher';
import { ensureMkForLatestMessage, readMessageKey, updateLatestSelectedMk } from '../core/key/mk';
import { rollbackByMk } from '../core/rollback';
import { resyncStateOnHistoryChange } from '../core/sync';
import { ERA_API_EVENTS, LOGS_PATH, SEL_PATH } from '../utils/constants';
import { getEraData, removeMetaFields } from '../utils/era_data';
import { logContext, Logger } from '../utils/log';
import { EventJob, getEventGroup } from './merger';

const logger = new Logger('events-dispatcher');

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
 * **【任务执行器】**
 * 负责执行单个事件任务，包含所有前置、后置处理和错误捕获。
 * @param {EventJob} job - 要执行的事件任务。
 * @param {IgnoreRule | null} mkToIgnore - 当前的忽略规则。
 * @param {ConsecutiveMkState | null} consecutiveMkState - 当前的连续处理计数状态。
 * @returns {Promise<{
 *   newIgnoreRule: IgnoreRule | null;
 *   newConsecutiveMkState: ConsecutiveMkState | null;
 * }>} - 返回更新后的状态。
 */
export async function dispatchAndExecuteTask(
  job: EventJob,
  mkToIgnore: IgnoreRule | null,
  consecutiveMkState: ConsecutiveMkState | null,
): Promise<{
  newIgnoreRule: IgnoreRule | null;
  newConsecutiveMkState: ConsecutiveMkState | null;
}> {
  const { type: eventType, detail } = job;
  const eventGroup = getEventGroup(eventType);
  let message_id: number | null = null;
  let currentConsecutiveCount = 1;

  // 在每轮任务开始时，初始化操作记录器
  const actionsTaken = { rollback: false, apply: false, resync: false, api: false };

  try {
    // **前置保障**: 确保最新消息有 MK 并设置日志上下文。
    const { mk, message_id: msgId, isNewKey } = await ensureMkForLatestMessage();
    logContext.mk = mk;
    message_id = msgId;

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
      return { newIgnoreRule: mkToIgnore, newConsecutiveMkState: consecutiveMkState };
    }

    // **只有在事件不被忽略时，才更新连续处理计数**
    if (mk && consecutiveMkState && consecutiveMkState.mk === mk) {
      consecutiveMkState.count++;
    } else {
      consecutiveMkState = { mk: mk, count: 1 };
    }
    currentConsecutiveCount = consecutiveMkState.count;

    logger.log('dispatchAndExecuteTask', `执行任务: ${eventType} (分组: ${eventGroup})`);

    // **任务分发**
    logger.debug('dispatchAndExecuteTask - task dispatch', `分发事件: ${eventType}`, { detail, eventGroup });
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

      // 在变量写入完成后，强制重新渲染消息以触发宏
      forceRenderRecentMessages();
    } else if (eventGroup === 'SYNC') {
      logger.debug('dispatchAndExecuteTask - task dispatch', `事件 ${eventType} 触发状态同步流程...`);
      const isFullSync = eventType === 'manual_full_sync';
      await resyncStateOnHistoryChange(isFullSync);
      actionsTaken.resync = true;
      // 在同步完成后，强制重新渲染消息以触发宏
      forceRenderRecentMessages();
    } else if (eventGroup === 'API') {
      actionsTaken.api = true;
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
    logger.error('dispatchAndExecuteTask', `事件 ${eventType} 处理异常: ${error}`, error);
  } finally {
    // 仅当本轮处理中实际执行了 ERA 核心操作时，才校准并广播事件
    // --- 3. 触发写入完成事件 ---
    if (actionsTaken.rollback || actionsTaken.apply || actionsTaken.resync || actionsTaken.api) {
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
          consecutiveProcessingCount: currentConsecutiveCount,
        });
      }
    }

    // 清理日志上下文，为下一个事件做准备
    logContext.mk = '';

    // **节流**: 在每个独立任务后都进行短暂等待，确保酒馆底层有时间完成其异步操作。
    //暂时取消等待逻辑，提高即时性。
    //await new Promise(resolve => setTimeout(resolve, 50));
  }

  return { newIgnoreRule: mkToIgnore, newConsecutiveMkState: consecutiveMkState };
}

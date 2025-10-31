'use strict';

import { resyncStateOnHistoryChange } from '../../core/sync';
import { forceRenderRecentMessages } from '../../ui/patch';
import { ERA_EVENT_EMITTER, WriteDonePayload } from '../../utils/constants';
import { emitWriteDoneEvent } from '../emitters/events';
import { EventJob } from '../merger';
import { ActionsTaken } from '../types';

export async function handleWriteEvent(
  job: EventJob,
  actionsTaken: ActionsTaken,
  payload: WriteDonePayload,
): Promise<void> {
  const { type: eventType } = job;

  // 通过调用 resyncStateOnHistoryChange 来统一处理写入逻辑。
  // 该函数在没有检测到历史变化时，会自动回滚并重算最后一条消息，
  // 从而实现了幂等的写入操作。
  await resyncStateOnHistoryChange();
  actionsTaken.apply = true; // 标记为已执行写入/同步操作

  // 如果是 API 触发的写入，则标记
  if (eventType === ERA_EVENT_EMITTER.API_WRITE) {
    actionsTaken.apiWrite = true;
  }

  // 在变量写入完成后，强制重新渲染消息以触发宏
  forceRenderRecentMessages();

  // 发送事件
  emitWriteDoneEvent(payload);
}

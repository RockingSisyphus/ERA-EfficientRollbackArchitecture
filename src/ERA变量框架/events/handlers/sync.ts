'use strict';

import { updateLatestSelectedMk } from '../../core/key/mk';
import { resyncStateOnHistoryChange } from '../../core/sync';
import { forceRenderRecentMessages } from '../../ui/patch';
import { Logger } from '../../utils/log';
import { emitWriteDoneEvent } from '../emitters/events';
import { EventJob } from '../merger';
import { ActionsTaken, DispatcherPayload } from '../types';

const logger = new Logger();

export async function handleSyncEvent(
  job: EventJob,
  actionsTaken: ActionsTaken,
  payload: DispatcherPayload,
): Promise<void> {
  const { type: eventType } = job;
  logger.debug('handleSyncEvent', `事件 ${eventType} 触发状态同步流程...`);
  const isFullSync = eventType === 'manual_full_sync';
  await resyncStateOnHistoryChange(isFullSync);
  actionsTaken.resync = true;
  // 在同步完成后，强制重新渲染消息以触发宏
  if (eventType != 'combo_sync') forceRenderRecentMessages();

  // 更新状态并发送事件
  await updateLatestSelectedMk();
  emitWriteDoneEvent(payload);
}

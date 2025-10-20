'use strict';

import { ApplyVarChange } from '../../core/crud/patcher';
import { readMessageKey, updateLatestSelectedMk } from '../../core/key/mk';
import { rollbackByMk } from '../../core/rollback';
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

  // 如果是 API 触发的写入，则标记
  if (eventType === ERA_EVENT_EMITTER.API_WRITE) {
    actionsTaken.apiWrite = true;
  }

  // 在变量写入完成后，强制重新渲染消息以触发宏
  forceRenderRecentMessages();

  // 更新状态并发送事件
  await updateLatestSelectedMk();
  emitWriteDoneEvent(payload);
}

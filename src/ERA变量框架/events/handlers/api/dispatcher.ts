'use strict';

import {
  deleteByObject,
  deleteByPath,
  handleGetCurrentVars,
  handleGetSnapshotAtMk,
  handleGetSnapshotsBetweenMks,
  insertByObject,
  insertByPath,
  updateByObject,
  updateByPath,
} from './handler';
import { ERA_API_EVENTS } from '../../../utils/constants';
import { EventJob } from '../../merger';
import { ActionsTaken, DispatcherPayload } from '../../types';

export function handleApiEvent(job: EventJob, actionsTaken: ActionsTaken, payload: DispatcherPayload): void {
  const { type: eventType, detail } = job;
  actionsTaken.api = true;

  // API 事件是“即发即忘”的，同步调用处理器将任务推入 api.ts 的队列后立即返回，不阻塞事件队列。
  if (eventType === ERA_API_EVENTS.INSERT_BY_OBJECT) insertByObject(detail);
  else if (eventType === ERA_API_EVENTS.UPDATE_BY_OBJECT) updateByObject(detail);
  else if (eventType === ERA_API_EVENTS.INSERT_BY_PATH) insertByPath(detail.path, detail.value);
  else if (eventType === ERA_API_EVENTS.UPDATE_BY_PATH) updateByPath(detail.path, detail.value);
  else if (eventType === ERA_API_EVENTS.DELETE_BY_OBJECT) deleteByObject(detail);
  else if (eventType === ERA_API_EVENTS.DELETE_BY_PATH) deleteByPath(detail.path);
  else if (eventType === ERA_API_EVENTS.GET_CURRENT_VARS) handleGetCurrentVars(detail);
  else if (eventType === ERA_API_EVENTS.GET_SNAPSHOT_AT_MK) handleGetSnapshotAtMk(detail);
  else if (eventType === ERA_API_EVENTS.GET_SNAPSHOTS_BETWEEN_MKS) handleGetSnapshotsBetweenMks(detail);
}

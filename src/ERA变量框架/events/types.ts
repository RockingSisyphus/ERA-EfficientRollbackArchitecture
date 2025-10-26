'use strict';

import { WriteDonePayload } from '../utils/constants';

export interface ActionsTaken {
  rollback: boolean;
  apply: boolean;
  resync: boolean;
  api: boolean;
  apiWrite: boolean;
}

/**
 * @interface DispatcherPayload
 * @description 在事件分发器（dispatcher）内部流转的载荷类型。
 * 这是 `WriteDonePayload` 的一个子集，仅包含最核心的上下文信息。
 */
export type DispatcherPayload = Omit<
  WriteDonePayload,
  'stat' | 'statWithoutMeta' | 'meta' | 'selectedMks' | 'editLogs'
>;

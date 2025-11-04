'use strict';

import type { ActionsTaken, WriteDonePayload } from '../utils/constants';

export type { ActionsTaken };

/**
 * @interface DispatcherPayload
 * @description 在事件分发器（dispatcher）内部流转的载荷类型。
 * 这是 `WriteDonePayload` 的一个子集，仅包含最核心的上下文信息。
 */
export type DispatcherPayload = Omit<
  WriteDonePayload,
  'stat' | 'statWithoutMeta' | 'meta' | 'selectedMks' | 'editLogs'
>;

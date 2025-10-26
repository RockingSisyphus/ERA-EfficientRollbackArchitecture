'use strict';

import { ERA_EVENT_EMITTER } from '../../utils/constants';
import { unescapeEraData } from '../../utils/data';
import { getEraData, removeMetaFields } from '../../utils/era_data';
import { Logger } from '../../utils/log';
import { DispatcherPayload } from '../types';

const logger = new Logger();

// ==================================================================
// API 事件广播器
// ==================================================================

/**
 * 使用 lodash.debounce 创建一个防抖函数来发送 API 写入事件。
 * 这个事件通知主循环，有一个由 API 触发的、需要处理的变量变更。
 */
export const debouncedEmitApiWrite = _.debounce(
  () => {
    eventEmit(ERA_EVENT_EMITTER.API_WRITE);
    logger.log('debouncedEmitApiWrite', `已触发合并后的 ${ERA_EVENT_EMITTER.API_WRITE} 事件。`);
  },
  50, // API 调用的防抖改成 50 毫秒，提高即时性
  { leading: false, trailing: true },
);

// ==================================================================
// 核心事件广播器
// ==================================================================

/**
 * **【广播器】** 触发 `era:writeDone` 事件。
 * 当一次完整的变量写入操作（包括增、删、改）成功完成后，应调用此函数。
 * 它向外部脚本广播一个事件，通知它们变量状态已发生改变，并提供详细的上下文。
 *
 * @param {DispatcherPayload} payload - 包含核心上下文信息的内部载荷。
 */
export function emitWriteDoneEvent(payload: DispatcherPayload) {
  // 在广播前，获取最新的全量 ERA 数据
  const { stat, meta } = getEraData();
  const statWithoutMeta = removeMetaFields(stat);
  const { selectedMks, editLogs } = meta;
  logger.debug('emitWriteDoneEvent', '获取了最新的 ERA 数据并生成了纯净版', { stat, meta, statWithoutMeta });

  // 动态构建完整的 WriteDonePayload
  const fullPayload = {
    ...payload,
    stat: unescapeEraData(stat),
    statWithoutMeta: unescapeEraData(statWithoutMeta),
    meta: meta,
    selectedMks: selectedMks || [],
    editLogs: editLogs || {},
  };

  logger.debug('emitWriteDoneEvent', '动态构建了完整的事件载荷', {
    inputPayload: payload,
    fullPayload: fullPayload,
  });

  eventEmit(ERA_EVENT_EMITTER.WRITE_DONE, fullPayload);
  logger.log(
    'emitWriteDoneEvent',
    `已触发 ${ERA_EVENT_EMITTER.WRITE_DONE} 事件。操作: ${JSON.stringify(
      payload.actions,
    )}, MK: ${payload.mk}, MsgID: ${payload.message_id}, 连续处理次数: ${payload.consecutiveProcessingCount}`,
  );
}

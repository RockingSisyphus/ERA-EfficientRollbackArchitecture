'use strict';

import { ERA_EVENT_EMITTER, WriteDonePayload } from '../../utils/constants';
import { unescapeEraData } from '../../utils/data';
import { Logger } from '../../utils/log';

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
 * @param {WriteDonePayload} payload - 包含写入操作关键信息的事件负载。
 */
export function emitWriteDoneEvent(payload: WriteDonePayload) {
  // 在广播前，对需要暴露给外部的数据进行反转义
  const unescapedPayload = {
    ...payload,
    stat: unescapeEraData(payload.stat),
    statWithoutMeta: unescapeEraData(payload.statWithoutMeta),
  };

  logger.debug('emitWriteDoneEvent', 'writeDone事件广播数据反转义', {
    before: { stat: payload.stat, statWithoutMeta: payload.statWithoutMeta },
    after: { stat: unescapedPayload.stat, statWithoutMeta: unescapedPayload.statWithoutMeta },
  });

  eventEmit(ERA_EVENT_EMITTER.WRITE_DONE, unescapedPayload);
  logger.log(
    'emitWriteDoneEvent',
    `已触发 ${ERA_EVENT_EMITTER.WRITE_DONE} 事件。操作: ${JSON.stringify(
      payload.actions,
    )}, MK: ${payload.mk}, MsgID: ${payload.message_id}, 连续处理次数: ${payload.consecutiveProcessingCount}`,
  );
}

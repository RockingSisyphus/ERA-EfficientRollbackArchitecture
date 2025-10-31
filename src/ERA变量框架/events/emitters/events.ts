'use strict';

import { ERA_EVENT_EMITTER, LOGS_PATH, QueryResultPayload, SEL_PATH, WriteDonePayload } from '../../utils/constants';
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
  logger.debug('emitWriteDoneEvent', '获取了最新的 ERA 数据并生成了纯净版', { stat, meta, statWithoutMeta });

  // 构建完整的 WriteDonePayload
  const fullPayload: WriteDonePayload = {
    ...payload,
    stat: unescapeEraData(stat),
    statWithoutMeta: unescapeEraData(statWithoutMeta),
    selectedMks: _.get(meta, SEL_PATH, []),
    editLogs: _.get(meta, LOGS_PATH, {}),
  };

  logger.debug('emitWriteDoneEvent', '构建了完整的事件载荷', {
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

/**
 * **【广播器】** 触发 `era:queryResult` 事件。
 * 用于响应所有 `GET_...` 系列的 API 请求。
 *
 * @param {QueryResultPayload['queryType']} queryType - 原始查询的类型。
 * @param {any} request - 原始查询的 `detail` 对象。
 * @param {any} result - 查询的结果（单个 QueryResultItem 或 QueryResultItem 数组）。
 */
export function emitQueryResultEvent(queryType: QueryResultPayload['queryType'], request: any, result: any) {
  const { meta } = getEraData();
  const payload: QueryResultPayload = {
    queryType,
    request,
    result,
    selectedMks: _.get(meta, SEL_PATH, []),
    editLogs: _.get(meta, LOGS_PATH, {}),
  };

  eventEmit(ERA_EVENT_EMITTER.VARS_QUERY_RESULT, payload);
  logger.log('emitQueryResultEvent', `已为查询 [${queryType}] 发送 ${ERA_EVENT_EMITTER.VARS_QUERY_RESULT} 事件。`);
}

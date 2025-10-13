/**
 * @file ERA 变量框架 - 外部事件 API 实现模块
 * @description
 * 该模块是 ERA 框架与外部脚本交互的接口层。它实现了一系列自定义事件的处理器。
 *
 * **设计理念**:
 * ERA 框架不直接向外暴露函数调用接口。外部脚本与 ERA 交互的**唯一**方式是通过酒馆的
 * `eventEmit(eventName, eventData)` 函数，发送特定格式的事件。
 *
 * `index.ts` 模块会监听这些 `era:*` 前缀的事件，并将其推入 `event_queue.ts` 中进行处理。
 * 事件队列最终会调用本文件中对应的处理器函数（如 `insertByObject`）。
 *
 * 本模块中的函数通过一种巧妙、解耦的方式工作：它们在最新的 AI 消息末尾动态注入
 * `<VariableInsert>` 或 `<VariableEdit>` 指令块，然后调用酒馆的 `setChatMessages` 更新消息。
 * 这次修改会触发 `character_message_rendered` 等事件，被 ERA 的主监听器捕获，
 * 从而将 API 调用无缝地整合到 ERA 的原生解析和同步流程中。
 */

import _ from 'lodash';
import { ERA_EVENT_EMITTER } from './constants';
import { findLastAiMessage, getMessageContent } from './message_utils';
import { J, Logger, unescapeEraData, updateMessageContent } from './utils';

const logger = new Logger('api');

// API 写入任务的接口定义
interface ApiWriteJob {
  blockTag: 'VariableInsert' | 'VariableEdit' | 'VariableDelete';
  blockContent: object;
}

// 使用 lodash.debounce 创建一个防抖函数来发送 API 写入事件
const debouncedEmitApiWrite = _.debounce(
  () => {
    eventEmit(ERA_EVENT_EMITTER.API_WRITE);
    logger.log('debouncedEmitApiWrite', `已触发合并后的 ${ERA_EVENT_EMITTER.API_WRITE} 事件。`);
  },
  700,
  { leading: false, trailing: true },
);

// ==================================================================
// API 事件参考
// (事件名称的常量定义见于 `constants.ts` 中的 `ERA_API_EVENTS` 对象)
// ==================================================================

/**
 * @section API Event: 'era:insertByObject'
 * @description 通过一个对象，非破坏性地插入新变量。只会写入不存在的路径。
 * @param {object} detail - 要插入的变量对象。
 * @example
 * eventEmit('era:insertByObject', {
 *   player: { name: "勇者", hp: 100, inventory: [] }
 * });
 */

/**
 * @section API Event: 'era:updateByObject'
 * @description 通过一个对象，修改已存在的变量。如果路径不存在，则忽略。
 * @param {object} detail - 要更新的变量对象。
 * @example
 * eventEmit('era:updateByObject', {
 *   player: { hp: 120, status: 'blessed' }
 * });
 */

/**
 * @section API Event: 'era:insertByPath'
 * @description 通过指定路径和值，非破坏性地插入一个新变量。
 * @param {object} detail - 包含路径和值的对象。
 * @param {string} detail.path - 变量的路径，使用点或方括号表示法。
 * @param {*} detail.value - 要插入的值。
 * @example
 * eventEmit('era:insertByPath', {
 *   path: 'player.inventory[0]',
 *   value: { name: '生命药水', count: 3 }
 * });
 */

/**
 * @section API Event: 'era:updateByPath'
 * @description 通过指定路径和值，修改一个已存在的变量。
 * @param {object} detail - 包含路径和值的对象。
 * @param {string} detail.path - 变量的路径。
 * @param {*} detail.value - 要设置的新值。可以是直接的值，也可以是运算表达式。
 * @example
 * eventEmit('era:updateByPath', {
 *   path: 'player.hp',
 *   value: '+=10'
 * });
 */

/**
 * @section API Event: 'era:deleteByObject'
 * @description 通过一个对象，删除已存在的变量。
 * @param {object} detail - 描述要删除路径的结构。值的结构决定了删除行为。
 * @example
 * // 准备删除 player.gold。指令中 gold 的值必须是空对象 {}
 * eventEmit('era:deleteByObject', { player: { gold: {} } });
 *
 * // 准备删除整个 player 对象。
 * eventEmit('era:deleteByObject', { player: {} });
 *
 * // **重要**: 如果 player 对象包含 gold 和 mana 两个属性，
 * // 以下指令只会删除 gold 和 mana，而 player 对象本身会被保留（变为空对象）。
 * // 这与 `eventEmit('era:deleteByObject', { player: {} })` 的效果是不同的。
 * eventEmit('era:deleteByObject', { player: { gold: {}, mana: {} } });
 */

/**
 * @section API Event: 'era:deleteByPath'
 * @description 通过指定路径，删除一个已存在的变量。
 * @param {object} detail - 包含路径的对象。
 * @param {string} detail.path - 要删除的变量的路径。
 * @example
 * eventEmit('era:deleteByPath', { path: 'player.inventory[0]' });
 */

// ==================================================================
// 内部核心函数
// ==================================================================

/**
 * 在聊天记录中查找并返回最后一条由 AI 发送的消息。
 * 这是注入变量修改指令的目标消息。
 * @returns {Promise<any | null>} 返回找到的消息对象，如果不存在 AI 消息则返回 null。
 */

/**
 * 执行一次 API 写入操作。
 * 它将指定的变量修改块追加到最后一条 AI 消息的末尾，然后调度一个 'era:apiWrite' 事件。
 * @param {ApiWriteJob} job - 要执行的写入任务。
 */
async function performApiWrite(job: ApiWriteJob) {
  // 1. 生成指令块
  const contentString = J(job.blockContent);
  const block = `\n<${job.blockTag}>\n${contentString}\n</${job.blockTag}>`;

  // 2. 查找目标消息并追加内容
  const lastAiMessage = await findLastAiMessage();
  if (!lastAiMessage) {
    logger.warn('performApiWrite', '找不到任何 AI 消息，无法执行 API 写入。');
    return;
  }

  const originalContent = getMessageContent(lastAiMessage) ?? '';
  const newContent = originalContent + block;

  logger.log('performApiWrite', `实时写入 API 任务 (${job.blockTag}) 到消息 ID ${lastAiMessage.message_id}...`);

  // 3. 实时更新消息内容
  await updateMessageContent(lastAiMessage, newContent);

  // 4. 调用防抖函数来调度写入事件的发送
  debouncedEmitApiWrite();
}

// ==================================================================
// 事件处理器实现 (由 event_queue.ts 调用)
// ==================================================================

/**
 * **【处理器】** 处理 `era:insertByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量对象。
 */
export function insertByObject(data: object) {
  performApiWrite({ blockTag: 'VariableInsert', blockContent: data });
}

/**
 * **【处理器】** 处理 `era:updateByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量对象。
 */
export function updateByObject(data: object) {
  performApiWrite({ blockTag: 'VariableEdit', blockContent: data });
}

/**
 * **【处理器】** 处理 `era:insertByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 * @param {*} value - 从事件 `detail` 的 `value` 属性获取。
 */
export function insertByPath(path: string, value: any) {
  const block = _.set({}, path, value);
  performApiWrite({ blockTag: 'VariableInsert', blockContent: block });
}

/**
 * **【处理器】** 处理 `era:updateByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 * @param {*} value - 从事件 `detail` 的 `value` 属性获取。
 */
export function updateByPath(path: string, value: any) {
  const block = _.set({}, path, value);
  performApiWrite({ blockTag: 'VariableEdit', blockContent: block });
}

/**
 * **【处理器】** 处理 `era:deleteByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量结构。
 */
export function deleteByObject(data: object) {
  performApiWrite({ blockTag: 'VariableDelete', blockContent: data });
}

/**
 * **【处理器】** 处理 `era:deleteByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 */
export function deleteByPath(path: string) {
  // 对于删除操作，我们用一个空对象作为值来表示删除该路径的意图
  const block = _.set({}, path, {});
  performApiWrite({ blockTag: 'VariableDelete', blockContent: block });
}

// ==================================================================
// 事件广播器实现 (由 variable_change_processor.ts 等内部模块调用)
// ==================================================================

/**
 * `era:writeDone` 事件的负载对象结构。它提供了关于一次成功写入操作的完整上下文。
 */
export interface WriteDonePayload {
  /**
   * 本轮事件处理循环中，最后操作的消息的**消息密钥 (Message Key)**。
   * 通常由 `ensureMkForLatestMessage` 在循环开始时确定。
   */
  mk: string;
  /**
   * 本轮事件处理循环中，最后操作的消息的**消息 ID**。
   */
  message_id: number;
  /**
   * 描述在本轮事件处理中，执行了哪些核心操作。
   * 这对于外部脚本理解状态变更的原因至关重要。
   */
  actions: {
    /** 是否执行了 `rollbackByMk` 操作 */
    rollback: boolean;
    /** 是否执行了 `ApplyVarChange` 操作 */
    apply: boolean;
    /** 是否执行了 `resyncStateOnHistoryChange` 操作 */
    resync: boolean;
  };
  /**
   * 事件处理完成**之后**，整个聊天会话的**已选择消息密钥链 (Selected Message Keys)** 的最新状态。
   * 这是一个稀疏数组，其索引约等于消息 ID，值是对应楼层消息的 MK。
   * 它代表了当前聊天记录的“主干”，是 ERA 判断同步状态的核心数据结构。
   */
  selectedMks: (string | null)[];
  /**
   * 事件处理完成**之后**，`chat` 变量中存储的**完整的编辑日志对象 (EditLogs)**。
   * 这是一个以 MK 为键，以变更记录数组为值的对象。
   */
  editLogs: { [key: string]: any[] };
  /**
   * 事件处理完成**之后**，整个聊天会话的**状态数据 (`stat_data`)** 的最新状态。
   * 这个版本**包含**所有内部使用的 `$meta` 字段。
   */
  stat: any;
  /**
   * 事件处理完成**之后**，一个**不包含**任何 `$meta` 字段的 `stat_data` 的深拷贝版本。
   * 适用于需要纯净数据进行展示或进一步处理的场景。
   */
  statWithoutMeta: any;
}

/**
 * **【广播器】** 触发 `era:writeDone` 事件。
 * 当一次完整的变量写入操作（包括增、删、改）在 `variable_change_processor.ts` 中成功完成后，
 * 应调用此函数。它向外部脚本广播一个事件，通知它们变量状态已发生改变，并提供详细的上下文。
 *
 * @param {WriteDonePayload} payload - 包含写入操作关键信息的事件负载。
 * @example
 * // 这是一个在外部脚本中监听此事件的示例：
 * eventOn('era:writeDone', (detail) => {
 *   const { mk, message_id, actions, selectedMks, editLogs, stat, statWithoutMeta } = detail;
 *   console.log(`ERA 变量已更新！消息 ID: ${message_id}, MK: ${mk}`);
 *   console.log('执行的操作:', actions);
 *
 *   // 你可以根据需要使用 stat (带 meta) 或 statWithoutMeta (不带 meta)
 *   console.log('最新的纯净状态数据:', statWithoutMeta);
 *
 *   // 此时可以根据最新的状态数据更新你自己的 UI 或执行其他逻辑
 * });
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
    )}, MK: ${payload.mk}, MsgID: ${payload.message_id}`,
  );
}

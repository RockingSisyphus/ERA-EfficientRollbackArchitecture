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
import { ERA_API_EVENTS } from './constants';
import { J, Logger } from './utils';

const logger = new Logger('api');

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
async function findLastAiMessage(): Promise<any | null> {
  const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
  if (!messages || messages.length === 0) {
    return null;
  }
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'assistant') {
      return messages[i];
    }
  }
  return null;
}

/**
 * 执行变量更新的核心逻辑。
 * 它找到最后一条 AI 消息，将指定的变量修改块追加到其内容末尾，然后通过酒馆 API 更新该消息。
 *
 * @param {object} blockContent - 要注入的变量修改内容，一个可被序列化为 JSON 的对象。
 * @param {'VariableInsert' | 'VariableEdit' | 'VariableDelete'} blockTag - 变量修改块的标签类型。
 */
async function performUpdate(blockContent: object, blockTag: 'VariableInsert' | 'VariableEdit' | 'VariableDelete') {
  const lastAiMessage = await findLastAiMessage();
  if (!lastAiMessage) {
    logger.warn('performUpdate', '找不到任何 AI 消息，无法执行变量更新。');
    return;
  }

  const originalMessage = lastAiMessage.message;
  const contentString = J(blockContent);
  const variableBlock = `\n<${blockTag}>\n${contentString}\n</${blockTag}>`;
  const newMessage = originalMessage + variableBlock;

  logger.log('performUpdate', `准备向消息 ID ${lastAiMessage.message_id} 注入 ${blockTag} 块...`);
  logger.debug('performUpdate', `注入内容: ${contentString}`);

  await setChatMessages([{ message_id: lastAiMessage.message_id, message: newMessage }]);
  logger.log('performUpdate', `已调用 setChatMessages，等待 ERA 框架自动处理...`);
}

// ==================================================================
// 事件处理器实现 (由 event_queue.ts 调用)
// ==================================================================

/**
 * **【处理器】** 处理 `era:insertByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量对象。
 */
export async function insertByObject(data: object) {
  await performUpdate(data, 'VariableInsert');
}

/**
 * **【处理器】** 处理 `era:updateByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量对象。
 */
export async function updateByObject(data: object) {
  await performUpdate(data, 'VariableEdit');
}

/**
 * **【处理器】** 处理 `era:insertByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 * @param {*} value - 从事件 `detail` 的 `value` 属性获取。
 */
export async function insertByPath(path: string, value: any) {
  const block = _.set({}, path, value);
  await performUpdate(block, 'VariableInsert');
}

/**
 * **【处理器】** 处理 `era:updateByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 * @param {*} value - 从事件 `detail` 的 `value` 属性获取。
 */
export async function updateByPath(path: string, value: any) {
  const block = _.set({}, path, value);
  await performUpdate(block, 'VariableEdit');
}

/**
 * **【处理器】** 处理 `era:deleteByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量结构。
 */
export async function deleteByObject(data: object) {
  await performUpdate(data, 'VariableDelete');
}

/**
 * **【处理器】** 处理 `era:deleteByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 */
export async function deleteByPath(path: string) {
  // 对于删除操作，我们用一个空对象作为值来表示删除该路径的意图
  const block = _.set({}, path, {});
  await performUpdate(block, 'VariableDelete');
}

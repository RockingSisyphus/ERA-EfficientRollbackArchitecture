/**
 * @file 通过代码修改变量的API
 */

import _ from 'lodash';
import { J, Logger } from './utils';

const MODULE_NAME = '变量API';

/**
 * 获取聊天记录中的最后一条 AI 消息
 * @returns 消息对象或 null
 */
async function findLastAiMessage() {
  // getChatMessages 由酒馆助手提供
  const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
  if (!messages || messages.length === 0) {
    return null;
  }

  // 从后往前找，第一个 assistant 角色的消息就是目标
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'assistant') {
      return messages[i];
    }
  }

  return null;
}

/**
 * 核心更新逻辑：找到最后一条 AI 消息，注入变量修改标签，然后替换消息内容。
 * @param blockContent 要注入的变量修改块的内容 (JSON 对象)
 * @param blockTag 块的标签名 ('VariableInsert' 或 'VariableEdit')
 * @param logger 日志记录器
 */
async function performUpdate(blockContent: object, blockTag: 'VariableInsert' | 'VariableEdit', logger: Logger) {
  const lastAiMessage = await findLastAiMessage();
  if (!lastAiMessage) {
    logger.log('找不到任何 AI 消息，无法执行变量更新。', MODULE_NAME);
    return;
  }

  const originalMessage = lastAiMessage.message;
  const contentString = J(blockContent);
  const variableBlock = `\n<${blockTag}>\n${contentString}\n</${blockTag}>`;
  const newMessage = originalMessage + variableBlock;

  logger.log(`准备向消息 ID ${lastAiMessage.message_id} 注入 ${blockTag} 块...`, MODULE_NAME);
  logger.log(`注入内容: ${contentString}`, MODULE_NAME);

  await setChatMessages([{ message_id: lastAiMessage.message_id, message: newMessage }]);
  logger.log(`已调用 setChatMessages，等待 ERA 框架自动处理...`, MODULE_NAME);
}

// ==================================================================
// API 函数
// ==================================================================

export async function insertByObject(data: object) {
  const logger = new Logger();
  try {
    await performUpdate(data, 'VariableInsert', logger);
  } finally {
    await logger.flush();
  }
}

export async function updateByObject(data: object) {
  const logger = new Logger();
  try {
    await performUpdate(data, 'VariableEdit', logger);
  } finally {
    await logger.flush();
  }
}

export async function insertByPath(path: string, value: any) {
  const logger = new Logger();
  try {
    const block = _.set({}, path, value);
    await performUpdate(block, 'VariableInsert', logger);
  } finally {
    await logger.flush();
  }
}

export async function updateByPath(path: string, value: any) {
  const logger = new Logger();
  try {
    const block = _.set({}, path, value);
    await performUpdate(block, 'VariableEdit', logger);
  } finally {
    await logger.flush();
  }
}

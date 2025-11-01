'use strict';

import { Logger } from '../utils/log';
import { settings } from '../utils/era_data';
import { isUserMessage, getMessageContent, updateMessageContent } from '../utils/message';

/**
 * @file ERA 变量框架 - 状态占位符宏
 * @description 监听消息接收事件，并确保消息中存在用于渲染状态UI的占位符。
 */

const logger = new Logger();

/**
 * **【占位符保障】**
 * 确保指定 ID 的 AI 消息末尾存在用于渲染状态 UI 的占位符。
 * 如果占位符不存在，则会自动添加。
 * @param {number} message_id - 要检查和处理的消息的 ID。
 */
export async function ensurePlaceholder(message_id: number) {
  const funcName = 'ensurePlaceholder';
  logger.debug(funcName, `执行占位符保障，消息 ID: ${message_id}`);

  if (!settings.value.在ai消息尾部生成特殊符号) {
    logger.debug(funcName, '功能未启用，已跳过。');
    return;
  }
  logger.debug(funcName, '功能已启用，继续执行。');

  const chat_message = getChatMessages(message_id, { include_swipes: true })[0];
  if (!chat_message) {
    logger.warn(funcName, `无法找到消息 ID: ${message_id} 对应的消息。`);
    return;
  }
  logger.debug(funcName, `获取到消息对象 (ID: ${message_id})`, chat_message);

  if (isUserMessage(chat_message)) {
    logger.debug(funcName, `消息 ${message_id} 是用户消息，已跳过。`);
    return;
  }
  logger.debug(funcName, `消息 ${message_id} 是 AI 消息，继续处理。`);

  const placeholder = settings.value.特殊符号值;
  const currentContent = getMessageContent(chat_message);
  logger.debug(funcName, '读取到消息内容:', { content: currentContent });
  logger.debug(funcName, '使用的占位符:', { placeholder });

  if (currentContent && currentContent.includes(placeholder)) {
    logger.debug(funcName, '消息已包含占位符，无需操作。');
    return;
  }

  const newMessage = (currentContent || '').trimEnd() + '\n' + placeholder;
  logger.debug(funcName, '准备更新消息，添加占位符。', { newMessage });

  try {
    await updateMessageContent(chat_message, newMessage, 'affected');
    logger.debug(funcName, '消息更新成功。');
  } catch (error) {
    logger.error(funcName, '更新消息时发生错误。', error);
  }
}

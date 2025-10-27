'use strict';

import { getScriptSettings } from '../utils/era_data';
import { isUserMessage, getMessageContent, updateMessageContent } from '../utils/message';

/**
 * @file ERA 变量框架 - 状态占位符宏
 * @description 监听消息接收事件，并确保消息中存在用于渲染状态UI的占位符。
 */

eventOn(tavern_events.MESSAGE_RECEIVED, async message_id => {
  const settings = getScriptSettings();
  if (!settings.在ai消息尾部生成特殊符号) {
    return;
  }

  const chat_message = getChatMessages(message_id, { include_swipes: true })[0];
  if (isUserMessage(chat_message)) {
    return;
  }

  const placeholder = settings.特殊符号值;
  const currentContent = getMessageContent(chat_message);

  if (currentContent && currentContent.includes(placeholder)) {
    return;
  }

  const newMessage = (currentContent || '').trimEnd() + '\n' + placeholder;
  await updateMessageContent(chat_message, newMessage);
});

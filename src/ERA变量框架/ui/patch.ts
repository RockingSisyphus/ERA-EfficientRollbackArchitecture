/**
 * @file 强制宏渲染模块
 * @description 通过模拟用户UI操作, 强制酒馆重新渲染消息, 以触发完整的宏替换。
 */

import _ from 'lodash';
import { Logger } from '../utils/log';
import { analyzeMessageUI } from './parser/analyzer';

const log = new Logger('ui-patch');

/*
 * 强制重新渲染单条消息 (UI事件模拟备份)。
 * @param messageId 要强制渲染的消息ID。
 * @returns 一个 Promise, 在模拟点击完成后 resolve。
 */
// function forceRenderMessage_backup_by_UI_event(messageId: number): Promise<void> {
//   return new Promise(resolve => {
//     const messageSelector = `div.mes[mesid="${messageId}"]`;
//     const $message = $(messageSelector);
//
//     if ($message.length === 0) {
//       log.warn('forceRenderMessage_backup_by_UI_event', `找不到消息ID为 ${messageId} 的div。`);
//       return resolve();
//     }
//
//     const { state, buttons } = analyzeMessageUI($message);
//
//     if (state === 'editing') {
//       // 如果已经是编辑状态，直接点击取消
//       buttons.cancelEdit?.trigger('click');
//       log.debug('forceRenderMessage_backup_by_UI_event', `消息 ${messageId} 处于编辑状态，已点击取消。`);
//       setTimeout(resolve, 50);
//     } else {
//       // 如果是常规状态，先点击编辑，再点击取消
//       buttons.edit?.trigger('click');
//       log.debug('forceRenderMessage_backup_by_UI_event', `消息 ${messageId} 处于常规状态，已点击编辑。`);
//       setTimeout(() => {
//         // 重新分析以获取新状态下的按钮
//         const { buttons: updatedButtons } = analyzeMessageUI($message);
//         updatedButtons.cancelEdit?.trigger('click');
//         log.debug('forceRenderMessage_backup_by_UI_event', `消息 ${messageId} 已点击取消。`);
//         resolve();
//       }, 50);
//     }
//   });
// }

/**
 * 强制重新渲染单条消息。
 * @param messageId 要强制渲染的消息ID。
 * @returns 一个 Promise, 在操作完成后 resolve。
 */
async function forceRenderMessage(messageId: number): Promise<void> {
  const messages = getChatMessages(messageId);

  if (!messages || messages.length === 0) {
    log.warn('forceRenderMessage', `找不到消息ID为 ${messageId} 的消息。`);
    return;
  }

  const message = messages[0];

  // 使用 setChatMessages 并传入原封不动的消息内容来触发刷新
  await setChatMessages([{ message_id: messageId, message: message.message }]);
  log.debug('forceRenderMessage', `已使用 setChatMessages 刷新消息 ${messageId}。`);
}

/**
 * 强制重新渲染最近的N条消息, 以确保宏被正确替换。
 * 是否执行以及渲染的数量由脚本变量控制。
 */
export async function forceRenderRecentMessages() {
  const scriptVars = getVariables({ type: 'script', script_id: getScriptId() });

  // 检查是否启用了强制重载功能
  const forceReload = _.get(scriptVars, '强制重载功能', false);
  if (!forceReload) {
    log.debug('forceRenderRecentMessages', '强制重载功能未启用, 跳过。');
    return; // 如果未启用，则不执行任何操作
  }

  // 获取要重载的消息数量，默认为1
  const messageCount = _.get(scriptVars, '强制重载消息数', 1);
  log.log('forceRenderRecentMessages', `开始强制重载, 数量: ${messageCount}`);

  // 等待一小段时间, 确保变量更新已经完成
  await new Promise(resolve => setTimeout(resolve, 1000));

  const allMessages = getChatMessages('0-{{lastMessageId}}');
  if (!allMessages || allMessages.length === 0) {
    log.warn('forceRenderRecentMessages', '无法获取到任何消息, 终止重载。');
    return;
  }

  // 根据脚本变量设置的数量来截取最近的消息
  const recentMessages = allMessages.slice(-messageCount);

  for (const message of recentMessages) {
    log.debug('forceRenderRecentMessages', `正在强制渲染消息: ${message.message_id}`);
    await forceRenderMessage(message.message_id);
    // 在每次操作之间短暂暂停, 避免操作过快导致UI问题。
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  log.log('forceRenderRecentMessages', '强制重载完成。');
}

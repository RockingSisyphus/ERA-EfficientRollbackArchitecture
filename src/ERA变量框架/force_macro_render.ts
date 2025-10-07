/**
 * @file 强制宏渲染模块
 * @description 通过模拟用户UI操作, 强制酒馆重新渲染消息, 以触发完整的宏替换管线。
 */

import _ from 'lodash';

/**
 * 强制重新渲染单条消息。
 * @param messageId 要强制渲染的消息ID。
 * @returns 一个 Promise, 在模拟点击完成后 resolve。
 */
function forceRenderMessage(messageId: number): Promise<void> {
  return new Promise(resolve => {
    const messageSelector = `div.mes[mesid="${messageId}"]`;
    const $message = $(messageSelector);

    // 模拟点击“编辑”
    $message.find('.mes_button.mes_edit').trigger('click');

    // 给予UI响应时间, 然后模拟点击“确认”
    setTimeout(() => {
      $message.find('.mes_edit_done.menu_button').trigger('click');
      resolve();
    }, 50);
  });
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
    return; // 如果未启用，则不执行任何操作
  }

  // 获取要重载的消息数量，默认为1
  const messageCount = _.get(scriptVars, '强制重载消息数', 1);

  // 等待一小段时间, 确保变量更新已经完成
  await new Promise(resolve => setTimeout(resolve, 1000));

  const allMessages = getChatMessages('0-{{lastMessageId}}');
  if (!allMessages || allMessages.length === 0) {
    return;
  }

  // 根据脚本变量设置的数量来截取最近的消息
  const recentMessages = allMessages.slice(-messageCount);

  for (const message of recentMessages) {
    await forceRenderMessage(message.message_id);
    // 在每次操作之间短暂暂停, 避免操作过快导致UI问题。
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

import { getMessageContent } from '../ERA变量框架/utils/message';

$(() => {
  console.log('日志测试脚本已加载。');

  // 监听消息滑动事件
  eventOn('message_swiped', async message_id => {
    // if (typeof message_id !== 'number') return;
    // console.log(`[logTest] "message_swiped" 事件触发, 消息ID: ${message_id}`);
    // 更新聊天变量
    // updateVariablesWith(
    //   vars => {
    //     const currentCount = _.get(vars, 'swipe_count', 0);
    //     _.set(vars, 'swipe_count', currentCount + 1);
    //     console.log(`[logTest] swipe_count 已更新为: ${currentCount + 1}`);
    //     return vars;
    //   },
    //   { type: 'chat' },
    // );
    // 1. 获取最新消息对象
    // const latestMessage = getChatMessages(-1, { include_swipes: true })?.[0];
    // if (!latestMessage) {
    //   console.error('[logTest] 无法获取最新消息。');
    //   return;
    // }
    // 2. 调用 ensureMkForLatestMessage
    //console.log('[logTest] 调用 ensureMkForLatestMessage...');
    //const { mk, isNewKey } = await ensureMkForLatestMessage(latestMessage);
    //console.log(`[logTest] ensureMkForLatestMessage 完成。MK: ${mk}, 是否是新Key: ${isNewKey}`);
    // 3. 调用 ensurePlaceholder
    //console.log('[logTest] 调用 ensurePlaceholder...');
    //await ensurePlaceholder(message_id);
    //console.log('[logTest] ensurePlaceholder 完成。');
    // 4. 调用 getMessageContentWithRetry
    // console.log('[logTest] 调用 getMessageContentWithRetry...');
    // const content = await getMessageContentWithRetry(message_id);
    // console.log('[logTest] getMessageContentWithRetry 完成。获取到的内容:', content);
    // const allMessages = getChatMessages('0-{{lastMessageId}}', { include_swipes: true });
    // console.debug('[logTest] "message_swiped" 事件处理完毕', '全处理结束后快照，所有消息:', allMessages);
  });

  // 监听新消息接收事件
  eventOn('message_received', async message_id => {
    // 3. 调用 ensurePlaceholder
    console.log('[logTest] 调用 ensurePlaceholder...');
    const chat_message = getChatMessages(message_id, { include_swipes: true })[0];
    console.log('[logTest] 拿到的chat_message...', chat_message);
    const placeholder = '<test>';
    const currentContent = getMessageContent(chat_message);

    if (currentContent && currentContent.includes(placeholder)) {
      console.debug('消息已包含占位符，无需操作。');
      return;
    }

    const newMessage = (currentContent || '').trimEnd() + '\n' + placeholder;

    try {
      //await updateMessageContent(chat_message, newMessage, 'affected');
      const updatePayload: { message_id: number; message?: string; swipes?: string[] } = {
        message_id: message_id,
      };

      if (Array.isArray(chat_message.swipes)) {
        const sid = Number(chat_message.swipe_id ?? 0);
        const newSwipes = [...chat_message.swipes];
        newSwipes[sid] = newMessage;
        updatePayload.swipes = newSwipes;
      } else {
        updatePayload.message = newMessage;
      }
      console.log('[logTest] 写入前的message...', updatePayload);
      await setChatMessages([updatePayload], { refresh: 'affected' });
    } catch (error) {
      console.error('更新消息时发生错误。', error);
    }
    console.log('[logTest] ensurePlaceholder 完成。');
  });
});

import { Logger } from './utils';

// ===============================
// 【事件监听器】全量日志（串行队列版 / 极简）
// - 监听 iframe_events + tavern_events 的所有事件
// - 任何事件触发时，把「事件名 + 参数」送入全局队列
// - 全局仅一个 Promise 链顺序消费，保证日志输出顺序 == 事件到达顺序
// - 日志写入：使用 Logger 输出到控制台
// ===============================
(() => {
  'use strict';

  /* =========================
   * 初始化
   * ========================= */
  const logger = new Logger('事件监听器');

  /* =========================
   * 通用工具
   * ========================= */
  // ——小工具：单调时钟与序号，便于肉眼校验顺序
  const now = () => (performance && performance.now ? performance.now() : Date.now());
  let SEQ = 0;
  let chain = Promise.resolve();
  let tavernHelperApiUnavailableWarned = false;

  // ——全局串行队列：将任务接到 chain 后面，保证先到先出
  const enqueue = (task: () => Promise<void>) => {
    chain = chain.then(task).catch(error => {
      logger.error('enqueue', `【监听错误】${error?.message || error}`, error);
    });
  };

  // ——通用注册器：把某个事件名挂到“串行打印”处理上
  const attach = (eventName: string) => {
    // 用固定的 handler 引用防止重复注册无效；并尽量抢到最前（eventMakeFirst）
    const handler = (...args: any[]) => {
      const id = ++SEQ;
      const t = now();
      // ——将“打印这次事件”的动作丢到全局队列，保证严格先到先出
      enqueue(async () => {
        const logMessage = `[#${id}] 触发事件「${eventName}」 @${t.toFixed ? t.toFixed(3) : t}`;
        const attachments: any[] = [];

        if (args.length > 0) {
          attachments.push({ eventArgs: args });
        }

        try {
          if (typeof TavernHelper !== 'undefined' && typeof TavernHelper.getChatMessages === 'function') {
            const lastMessageId =
              typeof TavernHelper.getLastMessageId === 'function'
                ? TavernHelper.getLastMessageId()
                : undefined;
            const range =
              typeof lastMessageId === 'number' && Number.isFinite(lastMessageId) && lastMessageId >= 0
                ? `0-${lastMessageId}`
                : '0-{{lastMessageId}}';
            const chatMessages = TavernHelper.getChatMessages(range, { include_swipes: true });
            attachments.push({ tavernMessages: chatMessages });
          } else if (!tavernHelperApiUnavailableWarned) {
            tavernHelperApiUnavailableWarned = true;
            logger.warn('handler', 'TavernHelper API 不可用，无法获取聊天消息列表。');
          }
        } catch (error: any) {
          logger.error('handler', `获取聊天消息列表时发生错误: ${error?.message || error}`, error);
        }

        logger.log('handler', logMessage, ...attachments);
      });
    };
    try {
      // 优先把我们的监听器插到最前，尽早抢到“到达顺序”
      eventMakeFirst(eventName, handler);
    } catch {
      // 某些环境可能没有 eventMakeFirst，就退回普通 on
      eventOn(eventName, handler);
    }
  };

  // ——收集所有可监听的事件名
  const iframeList = Object.values((typeof iframe_events !== 'undefined' && iframe_events) || {});
  const tavernList = Object.values((typeof tavern_events !== 'undefined' && tavern_events) || {});

  // ——全部挂上
  iframeList.forEach(attach);
  tavernList.forEach(attach);

  // ——启动提示
  enqueue(async () => {
    logger.log(
      'main',
      `【事件监听就绪】iframe=${iframeList.length}，tavern=${tavernList.length}（统一串行输出，保障顺序）`,
    );
  });

  // ——可选：如不希望刷屏，可对高频事件做采样（例：只记录每 50 次 STREAM_TOKEN_RECEIVED_INCREMENTALLY）
  // 使用方法：在上面的 attach 中判断 eventName 并自定义节流逻辑（此处省略，默认全量记录）
})();

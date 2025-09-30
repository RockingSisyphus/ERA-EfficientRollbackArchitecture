/**
 * @file ERA 变量框架 - 主入口与事件监听模块
 * @description
 * 该文件是整个 ERA 变量框架的起点。它的职责非常清晰和专一：
 * 1. **定义监听范围**: 声明框架所关心的所有事件类型。
 * 2. **注册监听器**: 为上述所有事件注册监听器。
 * 3. **统一派发**: 当任何一个被监听的事件触发时，它不进行任何逻辑处理，
 *    而是立即将该事件（包括事件类型和附带数据）原封不动地推入到 `event_queue.ts`
 *    中的事件处理队列中。
 *
 * 这种设计体现了良好的**关注点分离**原则：`index.ts` 只负责“听”，而 `event_queue.ts`
 * 负责“思考”和“行动”。这使得事件的来源和处理逻辑完全解耦，非常清晰且易于维护。
 */

'use strict';

import { ERA_API_EVENTS } from './constants';
import { pushToQueue } from './event_queue';

// ===============================
// 事件监听器注册
// ===============================

/**
 * @const {string[]} eventsToListen
 * @description 定义了所有需要被 ERA 框架监听的事件。
 */
const eventsToListen = [
  // 内部逻辑事件: 用于模块间的协调。
  'rollback_done_reapply_var_start',

  // 酒馆原生事件: 框架响应用户操作和 AI 输出的基础。
  tavern_events.MESSAGE_RECEIVED, // AI 消息流式输出完成
  tavern_events.MESSAGE_DELETED, // 消息被删除
  tavern_events.MESSAGE_SWIPED, // 消息被切换 (swipe)
  tavern_events.CHAT_CHANGED, // 切换到不同的聊天会话
  tavern_events.MESSAGE_SENT, // 用户发送消息
  tavern_events.CHARACTER_MESSAGE_RENDERED, // 每次消息渲染/重绘时触发，频率极高

  // 外部 API 事件: 允许其他脚本通过 `eventEmit` 与 ERA 交互。
  ...Object.values(ERA_API_EVENTS),
];

// 遍历事件列表，为每个事件注册一个回调函数。
// 这个回调函数是所有事件的统一入口。
eventsToListen.forEach(ev => {
  // `eventOn` 是酒馆助手提供的全局函数，用于注册事件监听。
  // 当事件 `ev` 触发时，回调函数被调用，并将事件类型 `ev` 和事件详情 `detail` 推入队列。
  eventOn(ev, (detail: any) => pushToQueue(ev, detail));
});

// 为酒馆助手脚本界面中的手动按钮注册监听器。
// 点击按钮时，同样是向队列中推入一个特定类型的事件。
eventOn(getButtonEvent('写入变量修改'), () => pushToQueue('manual_write'));
eventOn(getButtonEvent('手动同步状态'), () => pushToQueue('manual_sync'));

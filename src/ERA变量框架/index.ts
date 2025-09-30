'use strict';

import { pushToQueue } from './event_queue';

/**
 * @file 酒馆助手脚本 - ERA变量框架 (主入口)
 * @description 本文件负责注册所有事件监听器，并将事件统一派发到事件处理队列中。
 */

// ===============================
// 事件监听器注册
// ===============================

// 定义所有需要监听的事件
const eventsToListen = [
  // 内部逻辑事件
  'rollback_done_reapply_var_start',

  // 酒馆原生事件
  tavern_events.MESSAGE_RECEIVED,
  tavern_events.MESSAGE_DELETED,
  tavern_events.MESSAGE_SWIPED,
  tavern_events.CHAT_CHANGED,
  tavern_events.MESSAGE_SENT,
  tavern_events.CHARACTER_MESSAGE_RENDERED,

  // 外部 API 事件
  'era:insertByObject',
  'era:updateByObject',
  'era:insertByPath',
  'era:updateByPath',
];

// 遍历并为每个事件注册监听器，将其推入处理队列
eventsToListen.forEach(ev => {
  // 使用闭包传入事件类型字符串，并传递 detail
  eventOn(ev, (detail: any) => pushToQueue(ev, detail));
});

// 注册手动触发按钮
eventOn(getButtonEvent('写入变量修改'), () => pushToQueue('manual_write'));
eventOn(getButtonEvent('手动同步状态'), () => pushToQueue('manual_sync'));

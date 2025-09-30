'use strict';

import { ensureMkForLatestMessage, updateLatestSelectedMk } from './message_key';
import { resyncStateOnHistoryChange } from './sync';
import { ApplyVarChange } from './write';

/**
 * @file 酒馆助手脚本 - ERA变量框架
 * @description 集合了变量写入、回退、校准等多种功能。
 */

/**
 * 统一的中央事件处理器
 * @param eventType 事件类型字符串
 */
const handleEvent = async (eventType: string) => {
  try {
    // 步骤 1: 无论何种事件，都优先确保最新消息有 MK
    await ensureMkForLatestMessage();
    const debug = false;
    if (!debug) {
      // 步骤 2: 根据事件类型，分发到不同的处理逻辑
      switch (eventType) {
        // === 变量写入事件 ===
        case 'rollback_done_reapply_var_start':
        case tavern_events.MESSAGE_RECEIVED:
        case 'manual_write': // 手动写入按钮
          await ApplyVarChange();
          break;

        // === 变量回退与校准事件 ===
        case tavern_events.MESSAGE_DELETED:
        case tavern_events.MESSAGE_SWIPED:
        case tavern_events.CHAT_CHANGED:
        case 'manual_sync': // 手动同步按钮
          await resyncStateOnHistoryChange();
          break;

        // === 仅更新状态的事件 ===
        case tavern_events.MESSAGE_SENT:
          // 用户发送消息时，不需要写入或同步，但后续的 finally 块会确保 SelectedMks 被更新
          break;
      }
    }
  } finally {
    // 步骤 3 (保险机制): 任何事件处理结束后，都强制同步一次最新消息的 MK 记录
    await updateLatestSelectedMk();
  }
};

// ===============================
// 事件监听器注册
// ===============================

// 注册所有需要触发逻辑的事件到中央处理器
[
  'rollback_done_reapply_var_start',
  tavern_events.MESSAGE_RECEIVED,
  tavern_events.MESSAGE_DELETED,
  tavern_events.MESSAGE_SWIPED,
  tavern_events.CHAT_CHANGED,
  tavern_events.MESSAGE_SENT,
].forEach(ev => {
  // 使用闭包传入事件类型字符串
  eventOn(ev, () => handleEvent(ev));
});

// 注册手动触发按钮
eventOn(getButtonEvent('写入变量修改'), () => handleEvent('manual_write'));
eventOn(getButtonEvent('手动同步状态'), () => handleEvent('manual_sync'));

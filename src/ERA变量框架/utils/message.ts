/**
 * @file ERA 变量框架 - 消息处理模块
 * @description
 * 该文件提供了一系列用于处理、查询和更新酒馆消息对象的通用辅助函数。
 */

'use strict';

import { ERA_DATA_REGEX } from './constants';
import { escapeEraData, parseJsonl } from './data';
import { Logger } from './log';
import { createTagRegex, extractValidBlocks } from './string';
import { parseCharacterMacros } from './text';

const log = new Logger();

export function extractMessageIdFromDetail(detail: any): number | null {
  if (detail === null || detail === undefined) {
    log.debug('extractMessageIdFromDetail', 'detail 为空，无法解析 message_id。');
    return null;
  }

  if (typeof detail === 'number') {
    if (Number.isFinite(detail)) {
      log.debug('extractMessageIdFromDetail', '从 number detail 获取 message_id。', { message_id: detail });
      return detail;
    }
    log.debug('extractMessageIdFromDetail', 'number detail 非有限值，忽略。', { detail });
    return null;
  }

  if (typeof detail === 'string') {
    const parsed = Number(detail);
    if (Number.isFinite(parsed)) {
      log.debug('extractMessageIdFromDetail', '从 string detail 解析 message_id。', {
        raw: detail,
        message_id: parsed,
      });
      return parsed;
    }
    log.debug('extractMessageIdFromDetail', 'string detail 无法解析为有效数字，忽略。', { raw: detail });
    return null;
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const parsed = Number(detail[0]);
    if (Number.isFinite(parsed)) {
      log.debug('extractMessageIdFromDetail', '从数组 detail[0] 解析 message_id。', {
        raw: detail[0],
        message_id: parsed,
      });
      return parsed;
    }
    log.debug('extractMessageIdFromDetail', '数组 detail[0] 无法解析为有效数字，忽略。', { raw: detail[0] });
    return null;
  }

  if (typeof detail === 'object') {
    if (typeof detail.message_id === 'number') {
      if (Number.isFinite(detail.message_id)) {
        log.debug('extractMessageIdFromDetail', '从对象 detail.message_id(number) 获取 message_id。', {
          message_id: detail.message_id,
        });
        return detail.message_id;
      }
      log.debug('extractMessageIdFromDetail', '对象 detail.message_id(number) 不是有限值，忽略。', {
        message_id: detail.message_id,
      });
      return null;
    }
    if (typeof detail.message_id === 'string') {
      const parsed = Number(detail.message_id);
      if (Number.isFinite(parsed)) {
        log.debug('extractMessageIdFromDetail', '从对象 detail.message_id(string) 解析 message_id。', {
          raw: detail.message_id,
          message_id: parsed,
        });
        return parsed;
      }
      log.debug('extractMessageIdFromDetail', '对象 detail.message_id(string) 无法解析为有效数字，忽略。', {
        raw: detail.message_id,
      });
      return null;
    }
    if (Array.isArray(detail.eventArgs) && detail.eventArgs.length > 0) {
      const parsed = Number(detail.eventArgs[0]);
      if (Number.isFinite(parsed)) {
        log.debug('extractMessageIdFromDetail', '从对象 detail.eventArgs[0] 解析 message_id。', {
          raw: detail.eventArgs[0],
          message_id: parsed,
        });
        return parsed;
      }
      log.debug('extractMessageIdFromDetail', '对象 detail.eventArgs[0] 无法解析为有效数字，忽略。', {
        raw: detail.eventArgs[0],
      });
      return null;
    }
  }

  log.debug('extractMessageIdFromDetail', '未能从事件 detail 中解析出有效的 message_id。', { detail });
  return null;
}

/**
 * @type {EraData} - 定义了存储在 `<era_data>` 块中的元数据结构。
 */
type EraData = {
  'era-message-key': string;
  'era-message-type': 'user' | 'assistant';
};

// ==================================================================
// 消息读取与解析
// ==================================================================

/**
 * **【获取消息内容】** 从酒馆的消息对象中安全地提取当前激活（被选中）的消息内容字符串。
 * 这个函数是 ERA 中所有消息内容读取的唯一入口，以确保逻辑统一和健壮性。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {string | null} 当前激活的消息内容；如果无法获取，则返回 null。
 */
export function getMessageContent(msg: any): string | null {
  if (!msg) return null;

  let content: string | null = null;

  // 优先检查 .mes 属性，这是新版酒馆的规范
  if (typeof msg.mes === 'string') {
    content = msg.mes;
  }
  // 如果没有 .mes，则处理 swipes
  else if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    content = msg.swipes[sid] || null;
  }
  // 最后，作为兼容，检查旧版的 .message 属性
  else if (typeof msg.message === 'string') {
    content = msg.message;
  }

  if (content === null) {
    return null;
  }

  // 在返回内容前进行宏替换。
  // 这样做是因为酒馆自身的宏替换行为不一致：有时（如消息流式生成后）会替换，
  // 但有时（如聊天记录刚加载时）则不会，这会导致读取到的内容状态混乱。
  // 因此，我们统一在获取消息时手动执行一次宏替换，以确保数据的一致性。
  return parseCharacterMacros(content);
}

/**
 * 从消息内容字符串中解析出 `EraData` 对象。这是一个只读操作。
 * @param {string | null | undefined} messageContent - 消息的内容字符串。
 * @returns {EraData | null} 解析成功则返回 `EraData` 对象，否则返回 null。
 */
function parseEraData(messageContent: string | null | undefined): EraData | null {
  if (typeof messageContent !== 'string') {
    return null;
  }
  const match = messageContent.match(ERA_DATA_REGEX);
  if (!match || !match[1]) {
    return null;
  }
  try {
    // 由于 MK 块内部是自定义的 `{"key"="value"}` 格式，不能使用 JSON.parse。
    // 必须使用正则表达式进行宽松匹配来提取键值。
    const customFormatBlock = match[1];
    const keyMatch = customFormatBlock.match(/"era-message-key"\s*=\s*"(.*?)"/);
    const typeMatch = customFormatBlock.match(/"era-message-type"\s*=\s*"(.*?)"/);

    if (keyMatch?.[1] && typeMatch?.[1]) {
      const eraData = {
        'era-message-key': keyMatch[1],
        'era-message-type': typeMatch[1] as 'user' | 'assistant',
      };
      log.debug('parseEraData', '成功解析 EraData', eraData);
      return eraData;
    }
    log.debug('parseEraData', '未能在 EraData 块中找到完整的键值对', { customFormatBlock });
    return null;
  } catch (e) {
    log.warn('parseEraData', '解析 EraData 块时发生异常', e);
    return null;
  }
}

/**
 * **【判断消息类型】** 根据消息内容中的 `era-message-type` 元数据或 `role` 属性判断是否为用户消息。
 * 优先信任注入的元数据。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {boolean} 如果是用户消息，则返回 true。
 */
export function isUserMessage(msg: any): boolean {
  const content = getMessageContent(msg);
  const data = parseEraData(content);
  if (data) {
    return data['era-message-type'] === 'user';
  }
  // 回退到检查 role 属性
  return msg?.role === 'user';
}

/**
 * 从后向前查找并返回最后一条 AI 消息。
 * @returns {TavernMessage | null} 找到的 AI 消息对象，如果找不到则返回 null。
 */
export function findLastAiMessage(): any | null {
  const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: true });
  if (!messages || messages.length === 0) {
    log.debug('findLastAiMessage', '聊天记录为空, 未找到任何消息。');
    return null;
  }

  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (!isUserMessage(msg)) {
      log.debug('findLastAiMessage', `找到最后一条 AI 消息, ID: ${msg.message_id}`);
      return msg;
    }
  }

  log.debug('findLastAiMessage', '未在聊天记录中找到任何 AI 消息。');
  return null;
}

/**
 * **【带重试获取消息内容】**
 * 尝试获取指定或最新AI消息的内容，如果初次获取为空，则会进行指定次数和间隔的重试。
 * 这主要用于应对酒馆消息在事件触发后可能存在的更新延迟。
 * @param {TavernMessage | number} [messageOrId] - （可选）酒馆消息对象或消息 ID。如果未提供，则自动查找最新的 AI 消息。
 * @param {number} [retries=3] - 最大重试次数。
 * @param {number} [delay=50] - 每次重试之间的等待时间（毫秒）。
 * @returns {Promise<string | null>} 成功则返回消息内容，重试后仍然失败则返回 null。
 */
export async function getMessageContentWithRetry(
  messageOrId?: any | number,
  retries: number = 5,
  delay: number = 50,
): Promise<string | null> {
  let msg: any;

  if (messageOrId) {
    if (typeof messageOrId === 'number') {
      const messages = getChatMessages(messageOrId, { include_swipes: true });
      msg = messages ? messages[0] : null;
    } else {
      msg = messageOrId;
    }
  } else {
    msg = findLastAiMessage();
  }

  if (!msg) {
    log.warn('getMessageContentWithRetry', '找不到有效的消息对象', { messageOrId });
    return null;
  }

  for (let i = 0; i < retries; i++) {
    const content = getMessageContent(msg);
    if (content) {
      return content;
    }
    log.log('getMessageContentWithRetry', `获取消息内容失败，将在 ${delay}ms 后重试 (第 ${i + 1} 次)`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  log.warn('getMessageContentWithRetry', `重试 ${retries} 次后仍无法获取消息内容`, { message_id: msg.message_id });
  return getMessageContent(msg); // 返回最后一次尝试的结果 (可能为 null)
}

// ==================================================================
// 消息写入
// ==================================================================

/**
 * **【通用】** 更新指定消息的内容。
 * 这个辅助函数封装了处理 `swipes` 和普通 `message` 的逻辑，提供一个统一的写入接口。
 * @param {any} message - 要更新的消息对象。
 * @param {string} newContent - 全新的消息内容。
 * @param {'none' | 'affected' | 'all'} [refresh='none'] - 更新后是否刷新消息。
 */
export async function updateMessageContent(
  message: any,
  newContent: string,
  refresh: 'none' | 'affected' | 'all' = 'none',
) {
  const oldContent = getMessageContent(message);
  log.debug('updateMessageContent', '更新前的消息内容:', oldContent);
  log.debug('updateMessageContent', '更新后的消息内容:', newContent);

  const updatePayload: { message_id: number; message?: string; swipes?: string[] } = {
    message_id: message.message_id,
  };

  if (Array.isArray(message.swipes)) {
    const sid = Number(message.swipe_id ?? 0);
    const newSwipes = [...message.swipes];
    newSwipes[sid] = newContent;
    updatePayload.swipes = newSwipes;
  } else {
    updatePayload.message = newContent;
  }

  await setChatMessages([updatePayload], { refresh });
}

/**
 * 从消息对象中提取、解析并转义所有 ERA 指令块。
 *
 * @param {any} msg - 酒馆消息对象。
 * @param {boolean} [toSimplified=false] - 是否将提取的指令内容转换为简体中文。
 * @returns {{ allInserts: any[], allEdits: any[], allDeletes: any[] }} - 包含已转义指令数据的对象。
 */
export function extractAndParseCommands(
  msg: any,
  toSimplified: boolean = false,
): { allInserts: any[]; allEdits: any[]; allDeletes: any[] } {
  const rawContent = getMessageContent(msg) || '';

  // 1. 从消息内容中解析出所有指令块。
  const insertBlocks = extractValidBlocks(rawContent, createTagRegex('VariableInsert', 'exact'), toSimplified);
  const editBlocks = extractValidBlocks(rawContent, createTagRegex('VariableEdit', 'exact'), toSimplified);
  const deleteBlocks = extractValidBlocks(rawContent, createTagRegex('VariableDelete', 'exact'), toSimplified);

  log.debug('extractAndParseCommands', 'delete拿到的指令', deleteBlocks);

  if (!insertBlocks.length && !editBlocks.length && !deleteBlocks.length) {
    log.debug('extractAndParseCommands', `消息 (ID: ${msg.message_id}) 未检测到变量修改标签。`);
  }

  const rawInserts = insertBlocks.flatMap((s: string) => parseJsonl(s));
  const rawEdits = editBlocks.flatMap((s: string) => parseJsonl(s));
  const rawDeletes = deleteBlocks.flatMap((s: string) => parseJsonl(s));

  // 在这里对从消息中解析出的原始数据进行转义，确保所有后续处理都使用转义后的数据。
  const allInserts = escapeEraData(rawInserts);
  const allEdits = escapeEraData(rawEdits);
  const allDeletes = escapeEraData(rawDeletes);

  log.debug('extractAndParseCommands', '数据转义完成', {
    before: { inserts: rawInserts, edits: rawEdits, deletes: rawDeletes },
    after: { inserts: allInserts, edits: allEdits, deletes: allDeletes },
  });

  return { allInserts, allEdits, allDeletes };
}

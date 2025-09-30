/**
 * @file ERA 变量框架 - 消息密钥 (MK) 管理模块
 * @description
 * 这个模块是 ERA 框架的基石，负责管理“消息密钥”（Message Key, MK）。
 *
 * **设计理念**:
 * ERA 的核心优势在于其鲁棒性，它通过将变量状态与 SillyTavern 不稳定的消息变量（message variables）
 * 解耦来实现这一点。MK 正是实现解耦的关键。
 *
 * MK 是一个由 **ERA 框架自身** 动态生成并**注入到消息内容字符串顶部**的唯一标识符。
 * 它就像一个不可变的“锚点”，随消息内容本身一起存在。ERA 的所有核心逻辑，包括变量追踪、
 * 回滚和同步，都围绕着识别和操作这些锚点来进行，而不是依赖于可能发生错位或被错误继承的消息变量。
 *
 * **MK 格式**:
 * MK 被包裹在一个独特的、类似 XML 的 `<era_data>` 标签中，其内部是一种**非标准**的类 JSON 格式，
 * 使用 `=` 作为分隔符，以避免与 AI 可能生成的标准 JSON 混淆。
 * e.g., `<era_data>{"era-message-key"="era_mk_...","era-message-type"="user"}</era_data>`
 * 这种设计（而不是用 HTML 注释 `<!-- -->`）是为了防止 MK 被其他可能移除注释的脚本无意中破坏。
 *
 * **核心功能**:
 * 1. **生成与注入**: `ensureMessageKey` 函数确保任何需要追踪的消息都拥有一个 MK。如果不存在，
 *    它会生成一个新的 MK 并注入到消息内容的开头。
 * 2. **解析与读取**: `readMessageKey` 函数提供了一个只读的接口，用于从消息内容中解析出 MK。
 * 3. **同步保障**: `updateLatestSelectedMk` 等函数确保核心数据结构 `SelectedMks` 与最新的
 *    消息状态保持一致，是框架自愈能力的重要组成部分。
 */

'use strict';

import { SEL_PATH } from './constants';
import { Logger, rnd } from './utils';

/**
 * @constant {string} ERA_DATA_TAG - 用于包裹 MK 元数据的 XML 风格标签名。
 */
const ERA_DATA_TAG = 'era_data';

/**
 * @constant {RegExp} ERA_DATA_REGEX - 用于从消息内容中匹配和提取 `<era_data>` 块的正则表达式。
 */
const ERA_DATA_REGEX = new RegExp(`<${ERA_DATA_TAG}>({.*?})<\\/${ERA_DATA_TAG}>`);

/**
 * @type {EraData} - 定义了存储在 `<era_data>` 块中的元数据结构。
 */
type EraData = {
  'era-message-key': string;
  'era-message-type': 'user' | 'assistant';
};

// ==================================================================
// 内部辅助函数
// ==================================================================

/**
 * 从酒馆的消息对象中安全地提取当前激活（被选中）的消息内容字符串。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {string | null} 当前激活的消息内容；如果无法获取，则返回 null。
 */
function getMessageContent(msg: any): string | null {
  if (!msg) return null;
  // 对于没有 swipe 的消息，或 swipe 功能被禁用的情况，内容直接在 .message 属性中。
  if (typeof msg.message === 'string') {
    return msg.message;
  }
  // 对于有 swipe 的消息，内容存储在 .swipes 数组中，需要根据 .swipe_id 来获取当前选中的那一条。
  if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    return msg.swipes[sid] || null;
  }
  return null;
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
      return {
        'era-message-key': keyMatch[1],
        'era-message-type': typeMatch[1] as 'user' | 'assistant',
      };
    }
    return null;
  } catch {
    return null;
  }
}

// ==================================================================
// 导出的核心函数
// ==================================================================

/**
 * **【读取 MK】** 从一个消息对象中只读地提取其消息密钥（MK）。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {string} 找到的 MK；如果不存在，则返回空字符串。
 */
export function readMessageKey(msg: any): string {
  const content = getMessageContent(msg);
  return parseEraData(content)?.['era-message-key'] || '';
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
 * **【确保 MK 存在】**
 * 这是本模块最核心的函数。它检查一个消息是否已拥有 MK，如果尚未拥有，则为其生成一个新的 MK 并注入到消息内容中。
 * 这是解决“鸡生蛋/蛋生鸡”问题的关键：在对变量进行任何操作之前，必须先确保有一个可供依附的锚点（MK）。
 *
 * @param {TavernMessage} msg - 目标消息对象 (必须包含 `message_id`, `role`, 以及 `message` 或 `swipes`)。
 * @returns {Promise<string>} 返回该消息最终的 MK。如果操作失败，则返回空字符串。
 */
export async function ensureMessageKey(msg: any): Promise<string> {
  const logger = new Logger();
  try {
    if (!msg) {
      logger.log('无效的 null 消息对象，无法确保Key', 'ensureMessageKey');
      return '';
    }

    const messageId = msg.message_id;
    const role = msg.role;
    const messageContent = getMessageContent(msg);

    if (typeof messageId !== 'number' || typeof messageContent !== 'string' || !role) {
      logger.log(`无效的消息对象结构，无法确保Key。msg=${JSON.stringify(msg)}`, 'ensureMessageKey');
      return '';
    }

    // 1. 检查是否已存在 MK
    const existingMk = readMessageKey(msg);
    if (existingMk) {
      return existingMk; // 已存在，直接返回
    }

    // 2. 生成新的 MK 和自定义格式的元数据块
    const newMk = `era_mk_${Date.now()}_${rnd()}`;
    const messageType = role === 'user' ? 'user' : 'assistant';
    const dataString = `<${ERA_DATA_TAG}>{"era-message-key"="${newMk}","era-message-type"="${messageType}"}</${ERA_DATA_TAG}>`;
    // 注入到消息内容的顶部
    const newContent = dataString + messageContent;

    logger.log(`为消息 (ID: ${messageId}) 注入新的Key: ${newMk}`, 'ensureMessageKey');

    // 3. 构造更新负载，并调用酒馆 API 更新消息内容
    const updatePayload: { message_id: number; message?: string; swipes?: string[] } = { message_id: messageId };

    if (Array.isArray(msg.swipes)) {
      // 如果是 swipe 消息，只更新当前选中的 swipe
      const sid = Number(msg.swipe_id ?? 0);
      const newSwipes = [...msg.swipes];
      newSwipes[sid] = newContent;
      updatePayload.swipes = newSwipes;
    } else {
      // 否则，直接更新 message
      updatePayload.message = newContent;
    }

    await setChatMessages([updatePayload], { refresh: 'none' });
    return newMk;
  } finally {
    await logger.flush();
  }
}

/**
 * **【确保最新消息的 MK】**
 * 这是一个便捷函数，专门用于确保当前聊天记录中的最后一条消息拥有 MK。
 * 它通常在监听到新消息生成等事件时被调用，以确保新消息能被 ERA 系统正确追踪。
 */
export const ensureMkForLatestMessage = async () => {
  const logger = new Logger();
  try {
    const msg = getChatMessages(-1, { include_swipes: true })?.[0];

    if (!msg || typeof msg.message_id !== 'number') {
      logger.log('无法读取最新消息或其ID，退出', '确保MK');
      return;
    }

    // ensureMessageKey 内部会处理所有检查和注入逻辑
    await ensureMessageKey(msg);
    logger.log(`已为最新消息 ${msg.message_id} 确保 MK 存在。`, '确保MK');
  } catch (err: any) {
    logger.log(`确保MK时异常: ${err?.message || err}`, '确保MK');
  } finally {
    await logger.flush();
  }
};

/**
 * **【更新最新已选 MK】**
 * 这是一个“保险”函数，用于在每次事件处理的最后，强制校准 `SelectedMks` 数组中关于**最新消息**的记录。
 * 它确保即使在复杂的异步流程中，`SelectedMks` 的尾部也始终与实际的最新消息保持严格同步。
 * @returns {Promise<void>}
 */
export const updateLatestSelectedMk = async () => {
  const msg = getChatMessages(-1, { include_swipes: true })?.[0];
  if (!msg || typeof msg.message_id !== 'number') return;

  // 确保 MK 存在并获取它
  const MK = await ensureMessageKey(msg);
  if (!MK) return;

  // 更新 chat 变量中的 SelectedMks 数组
  await updateVariablesWith(
    v => {
      const selectedMks = _.get(v, SEL_PATH, []);
      // 只有在记录不一致时才执行写操作，以优化性能
      if (selectedMks[msg.message_id] !== MK) {
        selectedMks[msg.message_id] = MK;
        _.set(v, SEL_PATH, selectedMks);
      }
      return v;
    },
    { type: 'chat' },
  );
};

'use strict';

import { SEL_PATH } from './constants';
import { Logger, rnd } from './utils';

const ERA_DATA_TAG = 'era_data';
const ERA_DATA_REGEX = new RegExp(`<${ERA_DATA_TAG}>({.*?})<\\/${ERA_DATA_TAG}>`);

type EraData = {
  'era-message-key': string;
  'era-message-type': 'user' | 'assistant';
};

/**
 * 从消息对象中安全地提取当前选中的消息内容字符串
 * @param msg 消息对象
 * @returns 当前激活的消息内容，或 null
 */
function getMessageContent(msg: any): string | null {
  if (!msg) return null;
  // 优先使用 .message/.mes 属性
  if (typeof msg.message === 'string') {
    return msg.message;
  }
  // 否则，从 swipes 数组中根据 swipe_id 提取
  if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    return msg.swipes[sid] || null;
  }
  return null;
}

/**
 * 从消息内容字符串中解析出 EraData 对象 (只读)
 * @param messageContent 消息的 mes 字符串
 * @returns 解析后的 EraData 对象，或 null
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
    const jsonLike = match[1];
    const keyMatch = jsonLike.match(/"era-message-key"\s*=\s*"(.*?)"/);
    const typeMatch = jsonLike.match(/"era-message-type"\s*=\s*"(.*?)"/);

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

/**
 * 从消息内容中读取 era_mk (只读, 不会写入)
 * @param msg 消息对象
 * @returns 找到的mk，或空字符串
 */
export function readMessageKey(msg: any): string {
  const content = getMessageContent(msg);
  return parseEraData(content)?.['era-message-key'] || '';
}

/**
 * 根据消息对象判断是否为用户消息。
 * @param msg 消息对象
 * @returns boolean
 */
export function isUserMessage(msg: any): boolean {
  const content = getMessageContent(msg);
  const data = parseEraData(content);
  if (data) {
    return data['era-message-type'] === 'user';
  }
  return msg?.role === 'user';
}

/**
 * 确保消息拥有一个稳定唯一的Key，通过将其作为元数据注入消息内容中
 * @param msg 消息对象 (必须包含 message_id, role, 以及 message 或 swipes)
 * @returns 返回确保存在的 message key (mk)
 */
export async function ensureMessageKey(msg: any): Promise<string> {
  const logger = new Logger();
  if (!msg) {
    logger.log('无效的 null 消息对象，无法确保Key', 'ensureMessageKey');
    await logger.flush();
    return '';
  }

  const messageId = msg.message_id;
  const role = msg.role;
  const messageContent = getMessageContent(msg);

  if (typeof messageId !== 'number' || typeof messageContent !== 'string' || !role) {
    logger.log(`无效的消息对象，无法确保Key。msg=${JSON.stringify(msg)}`, 'ensureMessageKey');
    await logger.flush();
    return '';
  }

  const existingMk = readMessageKey(msg);
  if (existingMk) {
    return existingMk;
  }

  const newMk = `era_mk_${Date.now()}_${rnd()}`;
  const messageType = role === 'user' ? 'user' : 'assistant';
  const dataString = `<${ERA_DATA_TAG}>{"era-message-key"="${newMk}","era-message-type"="${messageType}"}</${ERA_DATA_TAG}>`;
  const newContent = dataString + messageContent;

  logger.log(`为消息 (ID: ${messageId}) 注入新的Key: ${newMk}`, 'ensureMessageKey');

  // 构造用于更新的对象
  const updatePayload: { message_id: number; message?: string; swipes?: string[] } = { message_id: messageId };

  if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    const newSwipes = [...msg.swipes];
    newSwipes[sid] = newContent;
    updatePayload.swipes = newSwipes;
  } else {
    updatePayload.message = newContent;
  }

  await setChatMessages([updatePayload], { refresh: 'none' });
  await logger.flush();

  return newMk;
}

/**
 * 确保最新消息楼层有 MK
 * @description 监听新消息事件，如果最新消息不是用户消息且没有 MK，则为其创建一个。
 * 这是为了解决“新生成的消息因为没有 MK 而无法触发变量写入”的鸡生蛋蛋生鸡问题。
 * 这个函数应该在 ApplyVarChange 之前被调用。
 */
export const ensureMkForLatestMessage = async () => {
  const logger = new Logger();
  try {
    logger.log(`[调试] 进入 ensureMkForLatestMessage。`, '调试');
    const _arr = getChatMessages(-1, { include_swipes: true });
    const msg: any = _arr && _arr[0];

    if (!msg) {
      logger.log('无法读取最新消息，退出', '确保MK');
      await logger.flush();
      return;
    }

    const messageId = msg.message_id;
    if (typeof messageId !== 'number') {
      logger.log('无法读取消息ID，退出', '确保MK');
      await logger.flush();
      return;
    }

    // ensureMessageKey 内部会检查是否存在，不存在则创建
    await ensureMessageKey(msg);
    logger.log(`已为消息 ${messageId} 确保 MK 存在。`, '确保MK');
    logger.log(`[调试] 退出 ensureMkForLatestMessage。`, '调试');
  } catch (err: any) {
    logger.log(`确保MK时异常: ${err?.message || err}`, '确保MK');
  } finally {
    await logger.flush();
  }
};

/**
 * 保险函数：在每次事件处理的最后，强制确保 SelectedMks 中关于“最新消息”的记录是正确的。
 */
export const updateLatestSelectedMk = async () => {
  const msg = getChatMessages(-1, { include_swipes: true })?.[0];
  if (!msg) return;

  const messageId = msg.message_id;
  if (typeof messageId !== 'number') return;

  const MK = await ensureMessageKey(msg);
  if (!MK) return;

  await updateVariablesWith(
    v => {
      const selectedMks = _.get(v, SEL_PATH, []);
      if (selectedMks[messageId] !== MK) {
        selectedMks[messageId] = MK;
        _.set(v, SEL_PATH, selectedMks);
      }
      return v;
    },
    { type: 'chat' },
  );
};

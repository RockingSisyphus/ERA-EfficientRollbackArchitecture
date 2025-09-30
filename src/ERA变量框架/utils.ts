'use strict';

import _ from 'lodash';
import { CHAT_SCOPE, LOGS_PATH } from './constants';

/**
 * 日志记录器，用于缓存日志并一次性刷入变量
 */
export class Logger {
  private buffer: string[] = [];

  /**
   * 记录一条日志到缓冲区
   * @param line 日志内容
   * @param module 日志模块
   */
  log(line: string, module: string) {
    const text = `《${module}》 ${String(line)}`;
    this.buffer.push(text);
  }

  /**
   * 将缓冲区中的所有日志刷入到聊天变量中
   */
  async flush() {
    if (this.buffer.length === 0) {
      return;
    }
    await updateVariablesWith(v => {
      const existingLogs = _.get(v, 'console');
      const newLogs = Array.isArray(existingLogs) ? [...existingLogs, ...this.buffer] : this.buffer;
      _.set(v, 'console', newLogs);
      return v;
    }, CHAT_SCOPE);
    // 清空缓冲区
    this.buffer = [];
  }

  /**
   * 获取当前缓冲区中的日志数量
   */
  get length() {
    return this.buffer.length;
  }
}

/**
 * 生成随机短码（确保同毫秒内也唯一区分）
 */
export function rnd() {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * 小工具：判断是否为“纯对象”（数组/日期/函数等都不是）
 */
export const isPO = (v: any) => _.isPlainObject(v);

/**
 * 小工具：按标签名提取 <Tag>…</Tag> 片段（极简正则，不处理嵌套）
 * @param text 待提取的文本
 * @param tag 标签名
 */
export function extractBlocks(text: string, tag: string) {
  const blocks: string[] = [];
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  let m;
  while ((m = re.exec(text))) {
    const rawBody = (m[1] || '').trim();
    const body = stripCodeFence(rawBody);
    if (body) blocks.push(body);
  }
  return blocks;
}

/**
 * 小工具：去掉 ```json / ``` / ~~~ 等代码围栏
 * @param s 待处理的字符串
 */
export function stripCodeFence(s: string) {
  if (!s) return s;
  let t = String(s).trim();
  t = t.replace(/^\s*(?:```|~~~)[a-zA-Z0-9_-]*\s*\r?\n/, '');
  t = t.replace(/\r?\n(?:```|~~~)\s*$/, '');
  return t.trim();
}

/**
 * 小工具：清洗值中的数组
 * @param v 待清洗的值
 */
export function sanitizeArrays(v: any): any {
  if (Array.isArray(v)) {
    return v.map(e => (Array.isArray(e) || _.isPlainObject(e) ? JSON.stringify(e) : e));
  } else if (_.isPlainObject(v)) {
    const o: { [key: string]: any } = {};
    for (const k in v) o[k] = sanitizeArrays(v[k]);
    return o;
  } else {
    return v;
  }
}

/**
 * 小工具：以“新数组覆盖旧数组”的深合并（用于 template 合并）
 * @param base 基础对象
 * @param patch 补丁对象
 */
export function mergeReplaceArray(base: any, patch: any) {
  return _.mergeWith(_.cloneDeep(base), _.cloneDeep(patch), (a: any, b: any) => {
    if (Array.isArray(a) || Array.isArray(b)) return b;
    return undefined;
  });
}

/**
 * 解析 EditLog（允许字符串/数组/对象；失败给空数组）
 * @param raw 原始数据
 */
export function parseEditLog(raw: any): any[] {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') return [raw];
  if (typeof raw === 'string') {
    const s = raw.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, '');
    try {
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * 解析包含多个串联 JSON 对象的字符串 (类 JSONL 格式)
 * @param str 待解析的字符串
 * @param logger 可选的日志记录器实例
 * @returns 解析出的对象数组
 */
export function parseJsonl(str: string, logger?: Logger): any[] {
  const objects: any[] = [];
  if (!str || typeof str !== 'string') {
    return objects;
  }

  // 移除各类注释：//, /* */, <!-- -->
  const strWithoutComments = str
    .replace(/\/\/.*/g, '') // 移除单行JS注释
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行JS注释
    .replace(/<!--[\s\S]*?-->/g, ''); // 移除XML/HTML注释
  const trimmedStr = strWithoutComments.trim();
  let braceCount = 0; // 花括号计数器，用于追踪 JSON 对象的边界
  let startIndex = -1; // 当前 JSON 对象字符串的起始索引
  let inString = false; // 标记是否在字符串内部

  for (let i = 0; i < trimmedStr.length; i++) {
    const char = trimmedStr[i];

    // 检查是否进入或退出字符串
    if (char === '"') {
      // 一个简单的检查，确保不是转义的双引号
      if (i === 0 || trimmedStr[i - 1] !== '\\') {
        inString = !inString;
      }
    }

    // 如果在字符串内部，则跳过所有逻辑，直到字符串结束
    if (inString) continue;

    if (char === '{') {
      if (braceCount === 0) {
        // 遇到第一个左花括号，标记为 JSON 对象的开始
        startIndex = i;
      }
      braceCount++;
    } else if (char === '}') {
      if (braceCount > 0) {
        braceCount--;
        if (braceCount === 0 && startIndex !== -1) {
          // 最后一个右花括号匹配完成，一个完整的 JSON 对象被找到
          const jsonString = trimmedStr.substring(startIndex, i + 1);
          try {
            const obj = JSON.parse(jsonString);
            objects.push(obj);
          } catch (e: any) {
            // 解析失败，记录错误并忽略这个片段
            logger?.log(`JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, 'JSONL解析');
          }
          // 重置起始索引，准备寻找下一个 JSON 对象
          startIndex = -1;
        }
      }
    }
  }
  return objects;
}

/**
 * 小工具：安全 JSON 序列化（失败也不抛）
 * @param o 待序列化的对象
 */
export const J = (o: any) => {
  try {
    return JSON.stringify(o, null, 2);
  } catch (e: any) {
    return `<<stringify失败: ${e?.message || e}>>`;
  }
};

/**
 * 向上追溯历史，查找某个变量路径在最近的有效AI消息中的最终值(value_new)
 * @param path 要查找的变量的完整路径
 * @param startMessageId 从此消息ID的前一条消息开始向上查找
 * @param logger 一个 Logger 实例，用于记录追溯过程
 * @returns 返回找到的 value_new，如果追溯到顶都未找到则返回 null
 */
export async function findLatestNewValue(path: string, startMessageId: number, logger?: Logger): Promise<any> {
  logger?.log(`[findLatestNewValue] 开始为路径 <${path}> 从消息ID <${startMessageId}> 向上追溯历史值...`, '获取旧值');
  const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
  logger?.log(`[findLatestNewValue] 原始消息列表: ${J(messages)}`, '获取旧值');
  if (!messages || messages.length < 1) {
    logger?.log(`[findLatestNewValue] 消息历史为空，无法追溯。`, '获取旧值');
    return null;
  }

  const startIndex = messages.findIndex(m => m.message_id === startMessageId);
  if (startIndex === -1) {
    logger?.log(`[findLatestNewValue] 错误：在消息列表中未找到起始消息ID: ${startMessageId}`, '获取旧值');
    return null;
  }
  logger?.log(`[findLatestNewValue] 进入循环查找逻辑`, '获取旧值');
  // 从起始消息的前一条开始向上循环
  for (let i = startIndex - 1; i >= 0; i--) {
    const message = messages[i];
    const messageId = message?.message_id;
    logger?.log(
      `[findLatestNewValue] 开始检索消息:id=${messageId};消息内容message=${JSON.stringify(message)}`,
      '获取旧值',
    );
    // 跳过非AI消息或无效消息
    if (message?.role !== 'assistant' || typeof messageId !== 'number') {
      logger?.log(`[findLatestNewValue] 消息:id=${messageId},role=${message.role}不符合要求，跳过`, '获取旧值');
      continue;
    }

    const messageVars = getVariables({ type: 'message', message_id: messageId }) || {};
    const mk = String(_.get(messageVars, ['_keys', 'MK']) || '');
    logger?.log(
      `[findLatestNewValue] 正在检查AI消息 ID=${messageId};messageVars=${JSON.stringify(messageVars)};mk=${mk}`,
      '获取旧值',
    );
    // 跳过没有 messageKey 的AI消息
    if (!mk) {
      logger?.log(`[findLatestNewValue] -> 消息 (ID: ${messageId}) 没有MK，跳过。`, '获取旧值');
      continue;
    }

    const chatVars = getVariables(CHAT_SCOPE) || {};
    const editLogRaw = _.get(chatVars, [LOGS_PATH, mk]);
    const editLog = parseEditLog(editLogRaw);

    if (!editLog || editLog.length === 0) {
      logger?.log(`[findLatestNewValue] -> 消息 (ID: ${messageId}, MK: ${mk}) 的EditLog为空，跳过。`, '获取旧值');
      continue;
    }

    logger?.log(
      `[findLatestNewValue] -> 正在逆序扫描消息 (ID: ${messageId}, MK: ${mk}) 的 EditLog=${JSON.stringify(editLog)}`,
      '获取旧值',
    );
    // 从后向前遍历 editLog，找到的第一个就是最新的
    for (let j = editLog.length - 1; j >= 0; j--) {
      const logEntry = editLog[j];
      if (!logEntry || !logEntry.path) continue;

      // Case 1: 精确路径匹配
      if (logEntry.path === path) {
        logger?.log(
          `[findLatestNewValue] >> 成功! 在消息(ID:${messageId}, MK:${mk})中找到精确路径 <${path}> 的值为: ${J(logEntry.value_new)}`,
          '获取旧值',
        );
        return _.cloneDeep(logEntry.value_new);
      }

      // Case 2: 查找路径是 logEntry 路径的子路径 (即 logEntry.path 是父级)
      // 例如, path="a.b.c", logEntry.path="a.b"
      if (path.startsWith(logEntry.path + '.')) {
        const subPath = path.substring(logEntry.path.length + 1);
        const parentNewVal = logEntry.value_new;
        if (_.isPlainObject(parentNewVal) && _.has(parentNewVal, subPath)) {
          const foundVal = _.get(parentNewVal, subPath);
          logger?.log(
            `[findLatestNewValue] >> 成功! 在消息(ID:${messageId}, MK:${mk})中找到父级路径 <${logEntry.path}>, 并从中提取子路径 <${subPath}> 的值为: ${J(foundVal)}`,
            '获取旧值',
          );
          return _.cloneDeep(foundVal);
        }
      }
    }
    logger?.log(
      `[findLatestNewValue] -> 在消息 (ID: ${messageId}, MK: ${mk}) 的EditLog中未找到路径 <${path}> 或其有效父级，继续向上...`,
      '获取旧值',
    );
  }

  // 追溯到顶都没找到
  logger?.log(`[findLatestNewValue] 向上追溯未找到路径 ${path} 的任何历史值，将使用 null 作为旧值`, '获取旧值');
  return null;
}

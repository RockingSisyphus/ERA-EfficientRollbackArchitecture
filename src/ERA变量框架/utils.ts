'use strict';

import _ from 'lodash';
import { CHAT_SCOPE } from './constants';

/**
 * 日志记录器，用于缓存日志并一次性刷入变量
 */
export class Logger {
  private buffer: string[] = [];

  /**
   * 记录一条日志到缓冲区，并立即输出到浏览器控制台
   * @param line 日志内容
   * @param module 日志模块
   */
  log(line: string, module: string) {
    const text = `《${module}》 ${String(line)}`;
    // 立即输出到浏览器控制台，并添加醒目的前缀
    console.log(`%c[ERA] ${text}`, 'color: #3498db; font-weight: bold;');
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

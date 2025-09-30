/**
 * @file ERA 变量框架 - 通用工具模块
 * @description
 * 该文件提供了一系列与业务逻辑无关的、高度可复用的辅助函数和类。
 * 它们是构建整个 ERA 框架的基石，涵盖了日志记录、字符串处理、数据解析、对象操作等基础功能。
 * 将这些通用功能集中在此处，有助于保持其他模块代码的简洁和专注。
 */

'use strict';

import _ from 'lodash';
import { CHAT_SCOPE } from './constants';

// ==================================================================
// 日志记录
// ==================================================================

/**
 * @class Logger
 * @description 一个强大的日志记录器，专为 ERA 框架设计。
 *
 * **核心功能**:
 * 1. **双重输出**: 日志会立即在浏览器控制台打印（带有醒目样式），方便实时调试。
 * 2. **持久化存储**: 日志同时被缓存，并通过 `flush` 方法批量写入到酒馆的 `chat` 变量中。
 *    这使得日志记录与聊天历史绑定，方便追溯问题和复盘框架行为。
 * 3. **性能优化**: 通过缓冲区和批量写入，避免了频繁的变量更新操作，降低了性能开销。
 */
export class Logger {
  private buffer: string[] = [];

  /**
   * 记录一条日志。
   * 日志内容会立即显示在浏览器控制台，并被添加到待刷新的缓冲区中。
   * @param {string} line - 要记录的日志内容。
   * @param {string} module - 产生该日志的模块名称，用于分类和追溯。
   */
  log(line: string, module: string) {
    const text = `《${module}》 ${String(line)}`;
    // 使用 `%c` 为控制台输出添加 CSS 样式，使其在众多日志中脱颖而出。
    console.log(`%c[ERA] ${text}`, 'color: #3498db; font-weight: bold;');
    this.buffer.push(text);
  }

  /**
   * 将缓冲区中的所有日志一次性刷入到 `chat` 变量的 `console` 字段中。
   * 这是一个异步操作，完成后会清空缓冲区。
   * @returns {Promise<void>}
   */
  async flush() {
    if (this.buffer.length === 0) {
      return;
    }
    // 使用酒馆助手提供的 `updateVariablesWith` 函数来安全地更新变量。
    await updateVariablesWith(v => {
      const existingLogs = _.get(v, 'console');
      // 优雅地处理首次写入和追加写入两种情况。
      const newLogs = Array.isArray(existingLogs) ? [...existingLogs, ...this.buffer] : this.buffer;
      _.set(v, 'console', newLogs);
      return v;
    }, CHAT_SCOPE);
    // 操作完成后清空缓冲区，为下一次日志记录做准备。
    this.buffer = [];
  }

  /**
   * 获取当前缓冲区中待刷新的日志数量。
   * @type {number}
   */
  get length() {
    return this.buffer.length;
  }
}

// ==================================================================
// 字符串与数据处理
// ==================================================================

/**
 * 生成一个指定长度的随机字符串，用作唯一标识符。
 * 基于 `Math.random()`，在同一毫秒内也能保证极高的唯一性。
 * @returns {string} 一个随机的、由数字和小写字母组成的字符串。
 */
export function rnd(): string {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * 判断一个值是否为“纯粹的对象”（Plain Object）。
 * 数组、null、函数、Date 对象等都会返回 false。
 * @param {*} v - 待检查的值。
 * @returns {boolean} 如果是纯粹的对象则返回 true，否则返回 false。
 */
export const isPO = (v: any): v is Record<string, any> => _.isPlainObject(v);

/**
 * 从文本中提取所有被特定 XML 风格标签包裹的内容块。
 * 使用非贪婪模式的正则表达式，但不处理嵌套标签。
 * @param {string} text - 包含标签的原始文本。
 * @param {string} tag - 要提取的标签名称（例如 'VariableEdit'）。
 * @returns {string[]} 包含所有提取并清理后（去除代码围栏和首尾空格）的内容块的数组。
 */
export function extractBlocks(text: string, tag: string): string[] {
  const blocks: string[] = [];
  // 正则表达式: /<tag>([\s\S]*?)<\/tag>/g
  // - <${tag}>: 匹配开标签。
  // - ([\s\S]*?): 非贪婪地捕获开闭标签之间的所有字符（包括换行符）。
  // - <\/${tag}>: 匹配闭标签。
  // - g: 全局匹配，以找到所有匹配项。
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  let m;
  while ((m = re.exec(text))) {
    const rawBody = (m[1] || '').trim();
    // 在存入前，先剥离AI可能生成的多余代码围栏。
    const body = stripCodeFence(rawBody);
    if (body) blocks.push(body);
  }
  return blocks;
}

/**
 * 从字符串中移除 AI 生成的 Markdown 代码块围栏（如 ```json ... ```）。
 * @param {string} s - 待处理的字符串。
 * @returns {string} 移除围栏并修剪首尾空格后的字符串。
 */
export function stripCodeFence(s: string): string {
  if (!s) return s;
  let t = String(s).trim();
  // 移除起始围栏，例如 ```json, ```, ~~~
  t = t.replace(/^\s*(?:```|~~~)[a-zA-Z0-9_-]*\s*\r?\n/, '');
  // 移除结束围栏
  t = t.replace(/\r?\n(?:```|~~~)\s*$/, '');
  return t.trim();
}

/**
 * 递归地“净化”一个对象，将其中的数组或对象值转换为字符串。
 * 主要用于准备数据以便在某些特定场景下展示或存储。
 * @param {*} v - 待净化的值。
 * @returns {*} 净化后的值。
 */
export function sanitizeArrays(v: any): any {
  if (Array.isArray(v)) {
    // 如果是数组，则遍历其元素。如果元素是数组或对象，则字符串化它。
    return v.map(e => (Array.isArray(e) || _.isPlainObject(e) ? JSON.stringify(e) : e));
  } else if (_.isPlainObject(v)) {
    // 如果是对象，则递归地对其每个属性值进行净化。
    const o: { [key: string]: any } = {};
    for (const k in v) o[k] = sanitizeArrays(v[k]);
    return o;
  } else {
    // 其他类型的值直接返回。
    return v;
  }
}

/**
 * 安全地将一个对象序列化为格式化的 JSON 字符串。
 * 如果序列化失败，不会抛出异常，而是返回一个包含错误信息的字符串。
 * @param {*} o - 待序列化的对象。
 * @returns {string} 成功则返回 JSON 字符串，失败则返回错误提示。
 */
export const J = (o: any): string => {
  try {
    return JSON.stringify(o, null, 2); // 使用 2 个空格进行缩进，提高可读性。
  } catch (e: any) {
    return `<<stringify失败: ${e?.message || e}>>`;
  }
};

// ==================================================================
// 对象与数据结构操作
// ==================================================================

/**
 * 使用“新数组覆盖旧数组”的策略来深度合并两个对象。
 * 这是 `_.merge` 的一个变体，专门用于处理模板合并等场景，
 * 在这些场景中，我们希望补丁对象中的数组能够完全替换基础对象中的数组，而不是合并它们。
 * @param {*} base - 基础对象。
 * @param {*} patch - 补丁对象。
 * @returns {*} 合并后的新对象。
 */
export function mergeReplaceArray(base: any, patch: any): any {
  // 使用 _.cloneDeep 确保不修改原始对象。
  return _.mergeWith(_.cloneDeep(base), _.cloneDeep(patch), (a: any, b: any) => {
    // 自定义合并逻辑：如果任一值为数组，则直接返回补丁值（b），从而实现覆盖。
    if (Array.isArray(a) || Array.isArray(b)) return b;
    // 对于非数组类型，返回 undefined 以使用 _.merge 的默认合并行为。
    return undefined;
  });
}

/**
 * 健壮地解析 `EditLog` 的原始数据。
 * `EditLog` 可能以多种格式存在（对象、数组、JSON字符串），此函数旨在统一处理它们。
 * @param {*} raw - 从变量中读取的原始 `EditLog` 数据。
 * @returns {any[]} 解析后的 `EditLog` 数组。如果解析失败或输入无效，则返回一个空数组。
 */
export function parseEditLog(raw: any): any[] {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') return [raw]; // 单个对象也视为有效日志
  if (typeof raw === 'string') {
    const s = raw.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, ''); // 移除代码围栏
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
 * 解析一个包含多个串联 JSON 对象的字符串（类似于 JSONL 格式）。
 * 这种格式有时会由 AI 生成。此函数能够逐个提取并解析它们。
 *
 * @param {string} str - 待解析的字符串。
 * @param {Logger} [logger] - 可选的日志记录器实例，用于记录解析错误。
 * @returns {any[]} 解析出的对象数组。
 */
export function parseJsonl(str: string, logger?: Logger): any[] {
  const objects: any[] = [];
  if (!str || typeof str !== 'string') {
    return objects;
  }

  // 在解析前，先移除所有类型的注释，以提高解析的鲁棒性。
  const strWithoutComments = str
    .replace(/\/\/.*/g, '') // 移除 // 风格的单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除 /* ... */ 风格的多行注释
    .replace(/<!--[\s\S]*?-->/g, ''); // 移除 <!-- ... --> 风格的 HTML/XML 注释
  const trimmedStr = strWithoutComments.trim();

  let braceCount = 0; // 花括号平衡计数器
  let startIndex = -1; // 当前 JSON 对象的起始索引
  let inString = false; // 标记是否处于双引号字符串内部

  for (let i = 0; i < trimmedStr.length; i++) {
    const char = trimmedStr[i];

    // 切换 inString 状态，忽略转义的双引号
    if (char === '"' && (i === 0 || trimmedStr[i - 1] !== '\\')) {
      inString = !inString;
    }

    // 如果在字符串内部，则跳过所有花括号的逻辑判断
    if (inString) continue;

    if (char === '{') {
      if (braceCount === 0) {
        // 发现一个新 JSON 对象的开始
        startIndex = i;
      }
      braceCount++;
    } else if (char === '}') {
      if (braceCount > 0) {
        braceCount--;
        if (braceCount === 0 && startIndex !== -1) {
          // 花括号平衡，一个完整的 JSON 对象被找到
          const jsonString = trimmedStr.substring(startIndex, i + 1);
          try {
            const obj = JSON.parse(jsonString);
            objects.push(obj);
          } catch (e: any) {
            // 如果解析失败，记录错误并继续，不中断整个过程
            logger?.log(`JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, 'JSONL解析');
          }
          // 重置状态，准备寻找下一个对象
          startIndex = -1;
        }
      }
    }
  }
  return objects;
}

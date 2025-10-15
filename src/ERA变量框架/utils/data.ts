/**
 * @file ERA 变量框架 - 通用数据处理模块
 */

'use strict';

import _ from 'lodash';

const ESCAPE_MAP: { [key: string]: string } = {
  '.': '__DOT__',
  '"': '__DQUOTE__',
  "'": '__SQUOTE__',
};

const UNESCAPE_MAP: { [key: string]: string } = _.invert(ESCAPE_MAP);

const escapeRegex = new RegExp(Object.keys(ESCAPE_MAP).map(_.escapeRegExp).join('|'), 'g');
const unescapeRegex = new RegExp(Object.values(ESCAPE_MAP).map(_.escapeRegExp).join('|'), 'g');

/**
 * 递归地转义对象或数组中所有字符串值和键的特殊字符。
 * @param data - 要处理的数据。
 * @returns - 转义后的数据。
 */
export function escapeEraData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(item => escapeEraData(item)) as any;
  }
  if (_.isPlainObject(data)) {
    const newObj: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const escapedKey = key.replace(escapeRegex, match => ESCAPE_MAP[match]);
        newObj[escapedKey] = escapeEraData((data as any)[key]);
      }
    }
    return newObj as any;
  }
  if (typeof data === 'string') {
    return data.replace(escapeRegex, match => ESCAPE_MAP[match]) as any;
  }
  return data;
}

/**
 * 递归地反转义对象或数组中所有字符串值和键的特殊字符。
 * @param data - 要处理的数据。
 * @returns - 反转义后的数据。
 */
export function unescapeEraData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(item => unescapeEraData(item)) as any;
  }
  if (_.isPlainObject(data)) {
    const newObj: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const unescapedKey = key.replace(unescapeRegex, match => UNESCAPE_MAP[match]);
        newObj[unescapedKey] = unescapeEraData((data as any)[key]);
      }
    }
    return newObj as any;
  }
  if (typeof data === 'string') {
    return data.replace(unescapeRegex, match => UNESCAPE_MAP[match]) as any;
  }
  return data;
}

/**
 * 判断一个值是否为“纯粹的对象”（Plain Object）。
 * 数组、null、函数、Date 对象等都会返回 false。
 * @param {*} v - 待检查的值。
 * @returns {boolean} 如果是纯粹的对象则返回 true，否则返回 false。
 */
export const isPO = (v: any): v is Record<string, any> => _.isPlainObject(v);

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
 * @returns {any[]} 解析出的对象数组。
 */
export function parseJsonl(str: string): any[] {
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
            // 如果解析失败，在控制台打印错误并继续，不中断整个过程
            console.error(`[ERA/utils/parseJsonl] JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, e);
          }
          // 重置状态，准备寻找下一个对象
          startIndex = -1;
        }
      }
    }
  }
  return objects;
}

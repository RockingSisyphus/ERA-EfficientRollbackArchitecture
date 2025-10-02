/**
 * @file ERA 变量框架 - 通用工具模块
 * @description
 * 该文件提供了一系列与业务逻辑无关的、高度可复用的辅助函数和类。
 * 它们是构建整个 ERA 框架的基石，涵盖了日志记录、字符串处理、数据解析、对象操作等基础功能。
 * 将这些通用功能集中在此处，有助于保持其他模块代码的简洁和专注。
 */

'use strict';

import _ from 'lodash';
import { CHAT_SCOPE, LOG_CONFIG, META_DATA_PATH, STAT_DATA_PATH } from './constants';

// ==================================================================
// 日志记录
// ==================================================================

/**
 * @class Logger
 * @description 一个为 ERA 框架设计的、支持日志分级的记录器。
 *
 * **核心功能**:
 * 1. **日志分级**: 提供 `debug`, `log`, `warn`, `error` 四个级别，方便过滤和定位问题。
 * 2. **统一格式**: 所有日志都遵循 `《ERA》「模块名」【函数名】日志内容` 的格式，清晰明了。
 * 3. **控制台输出**: 日志会根据级别使用不同颜色和样式的 `console` 方法输出，便于在浏览器中实时调试。
 * 4. **纯粹的控制台日志**: 日志系统不再向酒馆聊天变量中写入任何数据，避免了性能问题和数据污染。
 */
/**
 * @type {{mk: string}}
 * @description 一个用于在事件处理期间临时存储日志上下文（如 Message Key）的对象。
 */
export const logContext = {
  mk: '',
};

export class Logger {
  private moduleName: string;

  /**
   * 创建一个新的 Logger 实例。
   * @param {string} moduleName - 该 Logger 实例绑定的模块名称。
   */
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  /**
   * 格式化日志消息。
   * @param {string} funcName - 调用日志的函数名。
   * @param {any} message - 日志内容。
   * @returns {string} 格式化后的日志字符串。
   */
  private formatMessage(funcName: string, message: any): string {
    const mkString = logContext.mk ? `（${logContext.mk}）` : '';
    return `《ERA》${mkString}「${this.moduleName}」【${funcName}】${String(message)}`;
  }

  /**
   * 记录一条 debug 级别的日志。
   * @param {string} funcName - 函数名。
   * @param {any} message - 日志内容。
   * @param {any} [obj] - 可选的、附加到日志中的对象。
   */
  debug(funcName: string, message: any, obj?: any) {
    // 1. 全局级别检查
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.debug) return;
    // 2. 白名单检查 (仅对 debug 生效)
    if (LOG_CONFIG.currentLevel === LOG_CONFIG.levels.debug && !LOG_CONFIG.debugWhitelist.includes(this.moduleName)) {
      return;
    }

    const formattedMessage = this.formatMessage(funcName, message);
    if (obj) {
      console.debug(formattedMessage, obj);
    } else {
      console.debug(formattedMessage);
    }
  }

  /**
   * 记录一条 log 级别的日志。
   * @param {string} funcName - 函数名。
   * @param {any} message - 日志内容。
   * @param {any} [obj] - 可选的、附加到日志中的对象。
   */
  log(funcName: string, message: any, obj?: any) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.log) return;

    const formattedMessage = this.formatMessage(funcName, message);
    if (obj) {
      console.log(`%c${formattedMessage}`, 'color: #3498db;', obj);
    } else {
      console.log(`%c${formattedMessage}`, 'color: #3498db;');
    }
  }

  /**
   * 记录一条 warn 级别的日志。
   * @param {string} funcName - 函数名。
   * @param {any} message - 日志内容。
   * @param {any} [obj] - 可选的、附加到日志中的对象。
   */
  warn(funcName: string, message: any, obj?: any) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.warn) return;

    const formattedMessage = this.formatMessage(funcName, message);
    if (obj) {
      console.warn(`%c${formattedMessage}`, 'color: #f39c12;', obj);
    } else {
      console.warn(`%c${formattedMessage}`, 'color: #f39c12;');
    }
  }

  /**
   * 记录一条 error 级别的日志。
   * @param {string} funcName - 函数名。
   * @param {any} message - 日志内容。
   * @param {any} [errorObj] - 可选的、附加到日志中的错误对象。
   */
  error(funcName: string, message: any, errorObj?: any) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.error) return;

    const formattedMessage = this.formatMessage(funcName, message);
    if (errorObj) {
      console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;', errorObj);
    } else {
      console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;');
    }
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
            logger?.error('parseJsonl', `JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, e);
          }
          // 重置状态，准备寻找下一个对象
          startIndex = -1;
        }
      }
    }
  }
  return objects;
}

// ==================================================================
// ERA 变量读写
// ==================================================================

/**
 * 递归地从对象中移除所有以 `$` 开头的字段（如 `$meta`, `$template`）。
 * 此函数会创建一个对象的深拷贝，因此不会修改原始对象。
 * @param {any} obj - 待处理的对象或值。
 * @returns {any} 一个不包含 `$` 前缀字段的新对象或原始值。
 */
export function removeMetaFields(obj: any): any {
  // 对于非对象类型，直接返回原始值
  if (!_.isObject(obj)) {
    return obj;
  }

  // 创建深拷贝以避免修改原始对象
  const newObj = _.cloneDeep(obj);

  function recurse(current: any) {
    if (Array.isArray(current)) {
      // 如果是数组，则递归处理数组中的每个元素
      current.forEach(item => recurse(item));
    } else if (isPO(current)) {
      // 如果是纯粹的对象，遍历其所有键
      for (const key in current) {
        // 如果键以 '$' 开头，则删除该属性
        if (key.startsWith('$')) {
          delete current[key];
        } else {
          // 否则，递归处理该属性的值
          recurse(current[key]);
        }
      }
    }
  }

  recurse(newObj);
  return newObj;
}

/**
 * 获取并确保 ERA 的元数据和状态数据对象的存在。
 * @returns {{meta: object, stat: object}} 包含元数据和状态数据的对象。
 */
export function getEraData(): { meta: any; stat: any } {
  const chatVars = getVariables(CHAT_SCOPE) || {};
  const meta = _.get(chatVars, META_DATA_PATH, {});
  const stat = _.get(chatVars, STAT_DATA_PATH, {});
  return { meta, stat };
}

/**
 * 原子性地更新 ERA 的状态数据 (stat_data)。
 * @param {(currentStatData: any) => (any | Promise<any>)} updater - 一个接收当前 stat_data 并返回修改后 stat_data 的函数 (可以是 async)。
 */
export async function updateEraStatData(updater: (currentStatData: any) => any | Promise<any>) {
  await updateVariablesWith(async v => {
    const currentStat = _.get(v, STAT_DATA_PATH, {});
    const newStat = await updater(currentStat);
    _.set(v, STAT_DATA_PATH, newStat);
    return v;
  }, CHAT_SCOPE);
}

/**
 * 原子性地更新 ERA 的元数据 (ERAMetaData)。
 * @param {(currentMetaData: any) => (any | Promise<any>)} updater - 一个接收当前 ERAMetaData 并返回修改后 ERAMetaData 的函数 (可以是 async)。
 */
export async function updateEraMetaData(updater: (currentMetaData: any) => any | Promise<any>) {
  await updateVariablesWith(async v => {
    const currentMeta = _.get(v, META_DATA_PATH, {});
    const newMeta = await updater(currentMeta);
    _.set(v, META_DATA_PATH, newMeta);
    return v;
  }, CHAT_SCOPE);
}

/**
 * **【通用】** 更新指定消息的内容。
 * 这个辅助函数封装了处理 `swipes` 和普通 `message` 的逻辑，提供一个统一的写入接口。
 * @param {any} message - 要更新的消息对象。
 * @param {string} newContent - 全新的消息内容。
 */
export async function updateMessageContent(message: any, newContent: string) {
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

  await setChatMessages([updatePayload]);
}

/**
 * @file ERA 变量框架 - 日志记录模块 (V2 - 动态配置版)
 */

'use strict';

// --- 新的运行时调试配置系统 ---

/**
 * @constant {string} DEBUG_LS_KEY
 * @description 用于在 localStorage 中存储调试模式的键名。
 */
const DEBUG_LS_KEY = 'era_debug';

let activeNamespaces: RegExp[];
let skippedNamespaces: RegExp[];

/**
 * 将用户输入的调试模式字符串（支持通配符 *）转换为正则表达式数组。
 * @param {string} pattern - 例如 'core-*,events-*,-core-key'
 */
function parseDebugPattern(pattern: string) {
  const patterns = pattern.split(/[\s,]+/);
  activeNamespaces = [];
  skippedNamespaces = [];

  for (const p of patterns) {
    if (!p) continue;

    // 将通配符 * 转换为正则表达式的 .*?
    const regexPattern = p.replace(/\*/g, '.*?');

    if (regexPattern.startsWith('-')) {
      // 如果以 - 开头，表示排除该模式
      skippedNamespaces.push(new RegExp(`^${regexPattern.slice(1)}$`));
    } else {
      // 否则，为激活模式
      activeNamespaces.push(new RegExp(`^${regexPattern}$`));
    }
  }
}

/**
 * 检查给定的模块名是否应该输出 debug 日志。
 * @param {string} moduleName - 要检查的模块名。
 * @returns {boolean} - 如果允许输出则返回 true。
 */
function isDebugEnabled(moduleName: string): boolean {
  if (!moduleName) return false;
  // 如果模块名匹配任何一个“排除”模式，则禁用
  if (skippedNamespaces.some(re => re.test(moduleName))) {
    return false;
  }
  // 如果“激活”模式列表为空（即没有设置任何模式），则全部禁用
  if (activeNamespaces.length === 0) {
    return false;
  }
  // 如果模块名匹配任何一个“激活”模式，则启用
  // 如果设置了 'all' 或 '*'，则全部启用
  if (activeNamespaces.some(re => re.test('all') || re.test(moduleName))) {
    return true;
  }
  return false;
}

/**
 * 从 localStorage 加载并解析调试模式。
 */
function loadDebugConfig() {
  const pattern = globalThis.localStorage?.getItem(DEBUG_LS_KEY) || '';
  parseDebugPattern(pattern);
}

/**
 * 设置新的调试模式，并将其保存到 localStorage。
 * @param {string} pattern - 新的调试模式字符串。
 * @example
 * // 开启所有 core 和 ui 开头的模块
 * eraDebug('core-*,ui-*')
 * // 开启所有模块，但排除 core-key
 * eraDebug('*,-core-key')
 * // 关闭所有调试日志
 * eraDebug('')
 */
function setDebug(pattern: string) {
  globalThis.localStorage?.setItem(DEBUG_LS_KEY, pattern);
  loadDebugConfig();
  console.log(
    `%c《ERA-Log》调试模式已更新: %c${pattern || '(已禁用)'}%c。部分模块可能需刷新页面生效。`,
    'color: #3498db; font-weight: bold;',
    'color: #f39c12; font-style: italic;',
    'color: #3498db; font-weight: bold;',
  );
}

// 初始化配置
loadDebugConfig();

// 将设置函数暴露到全局，方便在浏览器控制台调用
if (typeof globalThis !== 'undefined') {
  (globalThis as any).eraDebug = setDebug;
}

// --- Logger 类 ---

/**
 * @class Logger
 * @description 一个为 ERA 框架设计的、支持动态配置的日志记录器。
 *
 * **核心功能**:
 * 1. **动态调试**: 可通过浏览器控制台 `eraDebug('...')` 命令在运行时开启/关闭指定模块的 `debug` 日志。
 * 2. **统一格式**: 所有日志都遵循 `《ERA》「模块名」【函数名】日志内容` 的格式。
 * 3. **自动模块名**: 自动从调用栈解析模块名，推荐在每个文件中创建独立的 logger 实例以保证准确性。
 *    例如: `const logger = new Logger();`
 */
export const logContext = {
  mk: '',
};

export class Logger {
  private moduleName: string;

  constructor(moduleName?: string) {
    if (moduleName) {
      this.moduleName = moduleName;
    } else {
      // 自动从调用栈获取模块名，能有效避免因实例共享导致的模块名不准问题
      this.moduleName = this._getModuleNameFromStack() || 'unknown';
    }
  }

  private _getModuleNameFromStack(): string | null {
    try {
      const stack = new Error().stack || '';
      const callerLine = stack.split('\n')[3]; // 调整栈深度以获取实例化 Logger 的位置
      if (!callerLine) return null;

      const match = callerLine.match(/\((?:webpack-internal:\/\/\/)?\.\/(.*)\)/);
      if (!match || !match[1]) return null;

      let path = match[1];
      path = path.split('?')[0];
      path = path.replace(/\.(vue|ts|js)$/, '');
      // 将 'src/ERA变量框架/' 替换为空，并用 '-' 替换 '/'
      return path
        .replace(/^src\/ERA变量框架\//, '')
        .replace(/\/index$/, '')
        .replace(/\//g, '-');
    } catch (e) {
      return null;
    }
  }

  private formatMessage(funcName: string, message: any): string {
    const mkString = logContext.mk ? `（${logContext.mk}）` : '';
    return `《ERA》${mkString}「${this.moduleName}」【${funcName}】${String(message)}`;
  }

  debug(funcName: string, message: any, obj?: any) {
    if (!isDebugEnabled(this.moduleName)) {
      return;
    }

    const formattedMessage = this.formatMessage(funcName, message);
    if (obj !== undefined) {
      console.debug(formattedMessage, obj);
    } else {
      console.debug(formattedMessage);
    }
  }

  log(funcName: string, message: any, obj?: any) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj !== undefined) {
      console.log(`%c${formattedMessage}`, 'color: #3498db;', obj);
    } else {
      console.log(`%c${formattedMessage}`, 'color: #3498db;');
    }
  }

  warn(funcName: string, message: any, obj?: any) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj !== undefined) {
      console.warn(`%c${formattedMessage}`, 'color: #f39c12;', obj);
    } else {
      console.warn(`%c${formattedMessage}`, 'color: #f39c12;');
    }
  }

  error(funcName: string, message: any, errorObj?: any) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (errorObj !== undefined) {
      console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;', errorObj);
    } else {
      console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;');
    }
  }
}

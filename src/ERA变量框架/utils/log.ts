/**
 * @file ERA 变量框架 - 日志记录模块 (V3 - 规则分离版)
 */

'use strict';

// --- 新的运行时调试配置系统 (V3) ---

/**
 * @constant {string} DEBUG_CONFIG_LS_KEY
 * @description 用于在 localStorage 中存储调试配置的键名。
 */
const DEBUG_CONFIG_LS_KEY = 'era_debug_config';

let enabledPatterns: RegExp[] = [];
let disabledPatterns: RegExp[] = [];

/**
 * @typedef {object} DebugConfig
 * @property {string[]} enabled - 启用的模式列表。
 * @property {string[]} disabled - 禁用的模式列表。
 */

/**
 * 从 localStorage 加载并解析调试配置。
 */
function loadDebugConfig() {
  try {
    const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
    /** @type {DebugConfig} */
    const config = JSON.parse(configStr);

    const toRegex = (p: string) => new RegExp(`^${p.replace(/\*/g, '.*?')}$`);
    enabledPatterns = (config.enabled || []).map(toRegex);
    disabledPatterns = (config.disabled || []).map(toRegex);
  } catch (e) {
    console.error('《ERA-Log》: 加载调试配置失败。', e);
    enabledPatterns = [];
    disabledPatterns = [];
  }
}

/**
 * 检查给定的模块名是否应该输出 debug 日志。
 * @param {string} moduleName - 要检查的模块名。
 * @returns {boolean} - 如果允许输出则返回 true。
 */
function isDebugEnabled(moduleName: string): boolean {
  if (!moduleName) return false;

  // 规则 1: 如果匹配任何一个“禁用”模式，则绝对禁用。
  if (disabledPatterns.some(re => re.test(moduleName))) {
    return false;
  }

  // 规则 2: 如果“启用”列表为空，则全部禁用。
  if (enabledPatterns.length === 0) {
    return false;
  }

  // 规则 3: 如果匹配任何一个“启用”模式，则启用。
  if (enabledPatterns.some(re => re.test(moduleName))) {
    return true;
  }

  return false;
}

/**
 * 更新并保存调试配置。
 * @param {{ enabled: string[], disabled: string[] }} newConfig
 */
function updateConfig(newConfig: { enabled: string[]; disabled: string[] }) {
  const uniqueConfig = {
    enabled: [...new Set(newConfig.enabled)],
    disabled: [...new Set(newConfig.disabled)],
  };
  globalThis.localStorage?.setItem(DEBUG_CONFIG_LS_KEY, JSON.stringify(uniqueConfig));
  loadDebugConfig();
  console.log(`%c《ERA-Log》调试模式已更新。`, 'color: #3498db; font-weight: bold;', {
    '启用 (Enabled)': uniqueConfig.enabled,
    '禁用 (Disabled)': uniqueConfig.disabled,
  });
}

// 初始化配置
loadDebugConfig();

// 将控制对象暴露到全局
if (typeof globalThis !== 'undefined') {
  const eraDebug = {
    /**
     * 将一个模式添加到“启用列表”，使其匹配的模块显示日志。
     * 这也会从“禁用列表”中移除该模式。
     * @param {string} pattern - 要启用的模式，支持 * 通配符。
     * @example
     * // 开启所有 core 开头的模块
     * eraDebug.add('core*')
     */
    add(pattern: string) {
      const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
      const config: { enabled: string[]; disabled: string[] } = JSON.parse(configStr);
      const enabled = new Set(config.enabled || []);
      const disabled = new Set(config.disabled || []);

      enabled.add(pattern);
      disabled.delete(pattern);

      updateConfig({ enabled: Array.from(enabled), disabled: Array.from(disabled) });
    },

    /**
     * 将一个模式添加到“禁用列表”，使其匹配的模块不显示日志。
     * 这也会从“启用列表”中移除该模式。
     * @param {string} pattern - 要禁用的模式，支持 * 通配符。
     * @example
     * // 禁用 core-key 模块
     * eraDebug.remove('core-key')
     */
    remove(pattern: string) {
      const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
      const config: { enabled: string[]; disabled: string[] } = JSON.parse(configStr);
      const enabled = new Set(config.enabled || []);
      const disabled = new Set(config.disabled || []);

      disabled.add(pattern);
      enabled.delete(pattern);

      updateConfig({ enabled: Array.from(enabled), disabled: Array.from(disabled) });
    },

    /**
     * 查看当前的调试配置。
     */
    status() {
      const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
      const config = JSON.parse(configStr);
      console.log(`%c《ERA-Log》当前调试配置:`, 'color: #3498db; font-weight: bold;', config);
    },

    /**
     * 清空所有调试规则。
     */
    clear() {
      updateConfig({ enabled: [], disabled: [] });
    },
  };

  (globalThis as any).eraDebug = eraDebug;
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

  constructor() {
    // 自动从调用栈获取模块名，能有效避免因实例共享导致的模块名不准问题
    this.moduleName = this._getModuleNameFromStack() || 'unknown';
  }

  private _getModuleNameFromStack(): string | null {
    try {
      const stack = new Error().stack || '';
      // 智能寻找调用者：遍历堆栈，找到第一个不属于 log.ts 的、包含项目路径的行
      const callerLine = stack
        .split('\n')
        .find(line => line.includes('/src/ERA变量框架/') && !line.includes('/utils/log.ts'));

      if (!callerLine) {
        // 如果找不到，优雅降级
        return null;
      }

      // 更鲁棒的正则，用于从不同格式的堆栈行中提取路径
      const match = callerLine.match(/src\/ERA变量框架\/([^?:\s)]+)/);

      if (!match || !match[1]) {
        // 如果正则匹配失败，优雅降级
        return null;
      }

      let path = match[1];

      // 移除文件扩展名
      path = path.replace(/\.(vue|ts|js)$/, '');
      // 将 'src/ERA变量框架/' 替换为空，并用 '-' 替换 '/'
      return path
        .replace(/^src\/ERA变量框架\//, '')
        .replace(/\/index$/, '')
        .replace(/\//g, '-');
    } catch (e) {
      console.error('《ERA-Log-Debug》: 解析模块名时发生意外错误。', e);
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

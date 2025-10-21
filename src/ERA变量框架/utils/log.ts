/**
 * @file ERA 变量框架 - 日志记录模块
 */

'use strict';

/**
 * @constant {object} LOG_CONFIG
 * @description
 * 用于控制日志输出的配置对象。
 */
export const LOG_CONFIG = {
  // 定义所有可用的日志级别及其权重。数字越小，级别越低。
  levels: {
    debug: 0,
    log: 1,
    warn: 2,
    error: 3,
  },

  // 设置当前全局日志级别。只有权重等于或高于此级别的日志才会被输出。
  currentLevel: 0, // 默认为 'debug'

  // 'debug' 级别的白名单。只有当 currentLevel 为 debug 时，此列表才生效。
  // 只有在此列表中的模块才会输出 debug 日志。
  debugWhitelist: [
    'index',
    'core-rollback',
    'core-sync',
    'core-crud-delete',
    'core-crud-patcher',
    'core-crud-update',
    'core-crud-insert-insert',
    'core-crud-insert-template',
    'core-key-mk',
    'events-dispatcher',
    'events-merger',
    'events-queue',
    'events-emitters-events',
    'events-handlers-sync',
    'events-handlers-api-handler',
    'macro-parser',
    'ui-index',
    'ui-patch',
    'ui-components-statusBar-index',
    'ui-components-statusBarContent-index',
    'ui-parser-analyzer',
    'utils-message',
  ] as string[],
};
// 初始化时将 currentLevel 设置为 debug 级别
LOG_CONFIG.currentLevel = LOG_CONFIG.levels.debug;

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
   * @param {string} [moduleName] - 可选。该 Logger 实例绑定的模块名称。如果未提供，将自动从调用栈中解析。
   */
  constructor(moduleName?: string) {
    if (moduleName) {
      this.moduleName = moduleName;
    } else {
      this.moduleName = this._getModuleNameFromStack() || 'unknown';
    }
  }

  /**
   * @private
   * 从 Error stack 中解析调用方的文件名作为模块名。
   * @returns {string | null} 解析出的模块名，或在失败时返回 null。
   */
  private _getModuleNameFromStack(): string | null {
    try {
      const stack = new Error().stack || '';
      // 栈的第二行通常是构造函数的直接调用者
      const callerLine = stack.split('\n')[2];
      if (!callerLine) return null;

      // 正则表达式匹配括号内的路径
      const match = callerLine.match(/\((?:webpack-internal:\/\/\/)?\.\/(.*)\)/);
      if (!match || !match[1]) return null;

      let path = match[1];
      // 移除路径中的查询参数 (如 ?vue&type=script&setup=true&lang=ts)
      path = path.split('?')[0];
      // 移除文件名后缀
      path = path.replace(/\.(vue|ts|js)$/, '');
      // 将 'src/ERA变量框架/' 替换为空，并用 '-' 替换 '/'
      return path.replace(/^src\/ERA变量框架\//, '').replace(/\//g, '-');
    } catch (e) {
      return null; // 解析失败则返回 null
    }
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

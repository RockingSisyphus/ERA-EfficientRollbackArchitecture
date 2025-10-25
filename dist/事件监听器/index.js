/******/ var __webpack_modules__ = ({

/***/ "./src/事件监听器/utils.ts":
/*!****************************!*\
  !*** ./src/事件监听器/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ J),
/* harmony export */   Logger: () => (/* binding */ Logger),
/* harmony export */   extractBlocks: () => (/* binding */ extractBlocks),
/* harmony export */   isPO: () => (/* binding */ isPO),
/* harmony export */   mergeReplaceArray: () => (/* binding */ mergeReplaceArray),
/* harmony export */   parseEditLog: () => (/* binding */ parseEditLog),
/* harmony export */   parseJsonl: () => (/* binding */ parseJsonl),
/* harmony export */   rnd: () => (/* binding */ rnd),
/* harmony export */   sanitizeArrays: () => (/* binding */ sanitizeArrays),
/* harmony export */   stripCodeFence: () => (/* binding */ stripCodeFence)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @file ERA 变量框架 - 通用工具模块
 * @description
 * 该文件提供了一系列与业务逻辑无关的、高度可复用的辅助函数和类。
 * 它们是构建整个 ERA 框架的基石，涵盖了日志记录、字符串处理、数据解析、对象操作等基础功能。
 * 将这些通用功能集中在此处，有助于保持其他模块代码的简洁和专注。
 */


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
class Logger {
    moduleName;
    /**
     * 创建一个新的 Logger 实例。
     * @param {string} moduleName - 该 Logger 实例绑定的模块名称。
     */
    constructor(moduleName) {
        this.moduleName = moduleName;
    }
    /**
     * 格式化日志消息。
     * @param {string} funcName - 调用日志的函数名。
     * @param {any} message - 日志内容。
     * @returns {string} 格式化后的日志字符串。
     */
    formatMessage(funcName, message) {
        return `《ERA-事件监听器》「${this.moduleName}」【${funcName}】${String(message)}`;
    }
    /**
     * 记录一条 debug 级别的日志。
     * @param {string} funcName - 函数名。
     * @param {any} message - 日志内容。
     */
    debug(funcName, message) {
        console.debug(this.formatMessage(funcName, message));
    }
    /**
     * 记录一条 log 级别的日志。
     * @param {string} funcName - 函数名。
     * @param {any} message - 日志内容。
     */
    log(funcName, message) {
        console.log(`%c${this.formatMessage(funcName, message)}`, 'color: #3498db;');
    }
    /**
     * 记录一条 warn 级别的日志。
     * @param {string} funcName - 函数名。
     * @param {any} message - 日志内容。
     */
    warn(funcName, message) {
        console.warn(`%c${this.formatMessage(funcName, message)}`, 'color: #f39c12;');
    }
    /**
     * 记录一条 error 级别的日志。
     * @param {string} funcName - 函数名。
     * @param {any} message - 日志内容。
     * @param {any} [errorObj] - 可选的、附加到日志中的错误对象。
     */
    error(funcName, message, errorObj) {
        const formattedMessage = this.formatMessage(funcName, message);
        if (errorObj) {
            console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;', errorObj);
        }
        else {
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
function rnd() {
    return Math.random().toString(36).slice(2, 8);
}
/**
 * 判断一个值是否为“纯粹的对象”（Plain Object）。
 * 数组、null、函数、Date 对象等都会返回 false。
 * @param {*} v - 待检查的值。
 * @returns {boolean} 如果是纯粹的对象则返回 true，否则返回 false。
 */
const isPO = (v) => lodash__WEBPACK_IMPORTED_MODULE_0___default().isPlainObject(v);
/**
 * 从文本中提取所有被特定 XML 风格标签包裹的内容块。
 * 使用非贪婪模式的正则表达式，但不处理嵌套标签。
 * @param {string} text - 包含标签的原始文本。
 * @param {string} tag - 要提取的标签名称（例如 'VariableEdit'）。
 * @returns {string[]} 包含所有提取并清理后（去除代码围栏和首尾空格）的内容块的数组。
 */
function extractBlocks(text, tag) {
    const blocks = [];
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
        if (body)
            blocks.push(body);
    }
    return blocks;
}
/**
 * 从字符串中移除 AI 生成的 Markdown 代码块围栏（如 ```json ... ```）。
 * @param {string} s - 待处理的字符串。
 * @returns {string} 移除围栏并修剪首尾空格后的字符串。
 */
function stripCodeFence(s) {
    if (!s)
        return s;
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
function sanitizeArrays(v) {
    if (Array.isArray(v)) {
        // 如果是数组，则遍历其元素。如果元素是数组或对象，则字符串化它。
        return v.map(e => (Array.isArray(e) || lodash__WEBPACK_IMPORTED_MODULE_0___default().isPlainObject(e) ? JSON.stringify(e) : e));
    }
    else if (lodash__WEBPACK_IMPORTED_MODULE_0___default().isPlainObject(v)) {
        // 如果是对象，则递归地对其每个属性值进行净化。
        const o = {};
        for (const k in v)
            o[k] = sanitizeArrays(v[k]);
        return o;
    }
    else {
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
const J = (o) => {
    try {
        return JSON.stringify(o, null, 2); // 使用 2 个空格进行缩进，提高可读性。
    }
    catch (e) {
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
function mergeReplaceArray(base, patch) {
    // 使用 _.cloneDeep 确保不修改原始对象。
    return lodash__WEBPACK_IMPORTED_MODULE_0___default().mergeWith(lodash__WEBPACK_IMPORTED_MODULE_0___default().cloneDeep(base), lodash__WEBPACK_IMPORTED_MODULE_0___default().cloneDeep(patch), (a, b) => {
        // 自定义合并逻辑：如果任一值为数组，则直接返回补丁值（b），从而实现覆盖。
        if (Array.isArray(a) || Array.isArray(b))
            return b;
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
function parseEditLog(raw) {
    if (Array.isArray(raw))
        return raw;
    if (raw && typeof raw === 'object')
        return [raw]; // 单个对象也视为有效日志
    if (typeof raw === 'string') {
        const s = raw.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, ''); // 移除代码围栏
        try {
            const arr = JSON.parse(s);
            return Array.isArray(arr) ? arr : [];
        }
        catch {
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
function parseJsonl(str, logger) {
    const objects = [];
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
        if (inString)
            continue;
        if (char === '{') {
            if (braceCount === 0) {
                // 发现一个新 JSON 对象的开始
                startIndex = i;
            }
            braceCount++;
        }
        else if (char === '}') {
            if (braceCount > 0) {
                braceCount--;
                if (braceCount === 0 && startIndex !== -1) {
                    // 花括号平衡，一个完整的 JSON 对象被找到
                    const jsonString = trimmedStr.substring(startIndex, i + 1);
                    try {
                        const obj = JSON.parse(jsonString);
                        objects.push(obj);
                    }
                    catch (e) {
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


/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/***/ ((module) => {

module.exports = _;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/事件监听器/index.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/事件监听器/utils.ts");

// ===============================
// 【事件监听 · 全量日志（串行队列版 / 极简）】
// - 监听 iframe_events + tavern_events 的所有事件
// - 任何事件触发时，把“事件名 + 参数”送入全局队列
// - 全局仅一个Promise链顺序消费，保证日志输出顺序 == 事件到达顺序
// - 日志写入：使用 Logger 输出到控制台
// ===============================
(() => {
    'use strict';
    /* =========================
     * 初始化
     * ========================= */
    const logger = new _utils__WEBPACK_IMPORTED_MODULE_0__.Logger('事件监听器');
    /* =========================
     * 通用工具
     * ========================= */
    // —— 小工具：单调时钟与序号，便于肉眼校验顺序
    const now = () => (performance && performance.now ? performance.now() : Date.now());
    let SEQ = 0;
    // —— 全局串行队列：将任务接到 chain 后面，保证先到先出
    let chain = Promise.resolve();
    const enqueue = (task) => {
        chain = chain.then(task).catch(e => {
            logger.error('enqueue', `【监听错误】${e?.message || e}`, e);
        });
    };
    // —— 安全字符串化（避免循环引用 / 过长文本刷屏）
    const safe = (v) => {
        try {
            return JSON.stringify(v, (k, val) => {
                if (typeof val === 'string' && val.length > 300)
                    return `${val.slice(0, 300)}…(${val.length})`;
                if (typeof val === 'function')
                    return `[Function ${val.name || 'anonymous'}]`;
                if (val && typeof Element !== 'undefined' && val instanceof Element)
                    return `[Element <${val.tagName}>]`;
                if (val && typeof val.jquery === 'string')
                    return `[jQuery ${val.length}]`;
                return val;
            });
        }
        catch {
            // 某些对象 stringify 仍可能失败，退回 toString
            try {
                return String(v);
            }
            catch {
                return '[Unserializable]';
            }
        }
    };
    // —— 通用注册器：把某个事件名挂到“串行打印”处理上
    const attach = (eventName) => {
        // 用固定的 handler 引用防止重复注册无效；并尽量抢到最前（eventMakeFirst）
        const handler = (...args) => {
            const id = ++SEQ;
            const t = now();
            // ★ 将“打印这次事件”的动作丢到全局队列，保证严格先后
            enqueue(async () => {
                let logMessage = `[#${id}] 触发事件：${eventName} @${t.toFixed ? t.toFixed(3) : t}`;
                if (args.length > 0) {
                    logMessage += ` | 数据：${args.map(a => safe(a)).join(' | ')}`;
                }
                logger.log('handler', logMessage);
            });
        };
        try {
            // 优先把我们的监听器插到最前，尽早抢到“到达顺序”
            eventMakeFirst(eventName, handler);
        }
        catch {
            // 某些环境可能没有 eventMakeFirst，就退回普通 on
            eventOn(eventName, handler);
        }
    };
    // —— 收集所有可监听的事件名
    const iframeList = Object.values((typeof iframe_events !== 'undefined' && iframe_events) || {});
    const tavernList = Object.values((typeof tavern_events !== 'undefined' && tavern_events) || {});
    // —— 全部挂上
    iframeList.forEach(attach);
    tavernList.forEach(attach);
    // —— 启动提示
    enqueue(async () => {
        logger.log('main', `【事件监听就绪】iframe=${iframeList.length}，tavern=${tavernList.length}（统一串行输出，保障顺序）`);
    });
    // —— 可选：如不希望刷屏，可对高频事件做采样（例：只记录每50次 STREAM_TOKEN_RECEIVED_INCREMENTALLY）
    // 使用方法：在上面的 attach 中判断 eventName 并自定义节流逻辑（此处省略，默认全量记录）
})();

})();


//# sourceMappingURL=index.js.map
/******/ var __webpack_modules__ = ({

/***/ "./src/ApiTest/utils.ts":
/*!******************************!*\
  !*** ./src/ApiTest/utils.ts ***!
  \******************************/
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
        return `《ERA-ApiTest》「${this.moduleName}」【${funcName}】${String(message)}`;
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
/*!******************************!*\
  !*** ./src/ApiTest/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/ApiTest/utils.ts");
/**
 * @file ERA 变量 API 分组测试脚本
 * @description 在酒馆助手脚本菜单中注册三个按钮，分别用于插入、更新和删除测试数据。
 * **使用说明**: 请按顺序点击按钮 (Insert -> Update/Delete) 以确保测试数据存在。
 */

const logger = new _utils__WEBPACK_IMPORTED_MODULE_0__.Logger('ApiTest');
// ==================================================================
// 测试用例组定义
// ==================================================================
/**
 * 插入测试组：
 * 建立一个完整的、包含多种数据类型的初始状态。
 */
const insertTestSuite = [
    {
        description: '1.1. 插入一个包含 user 和 items 的基础对象',
        event: 'era:insertByObject',
        data: {
            testData: {
                description: 'Initial state for testing',
                user: { name: 'Tester', level: 1 },
                items: ['apple', 'banana', 'cherry'],
                status: 'active',
            },
        },
    },
    {
        description: '1.2. 插入 inventory 对象',
        event: 'era:insertByPath',
        data: {
            path: 'testData.inventory',
            value: { gold: 100, slots: ['sword', 'shield'] },
        },
    },
    {
        description: '1.3. 插入 user.stats 对象',
        event: 'era:insertByPath',
        data: {
            path: 'testData.user.stats',
            value: { str: 10, dex: 8, int: 5 },
        },
    },
    {
        description: '1.4. 插入 metadata 对象',
        event: 'era:insertByObject',
        data: {
            testData: {
                metadata: { version: '1.0', author: 'Cline' },
            },
        },
    },
];
/**
 * 更新测试组：
 * 修改由 insertTestSuite 创建的数据。
 */
const updateTestSuite = [
    {
        description: '2.1. 更新 user.name',
        event: 'era:updateByPath',
        data: {
            path: 'testData.user.name',
            value: 'Advanced Tester',
        },
    },
    {
        description: '2.2. 通过对象合并更新 level 和 status',
        event: 'era:updateByObject',
        data: {
            testData: {
                user: { level: 5 },
                status: 'idle',
            },
        },
    },
    {
        description: '2.3. 直接赋值更新 gold',
        event: 'era:updateByPath',
        data: {
            path: 'testData.inventory.gold',
            value: 150,
        },
    },
];
/**
 * 删除测试组：
 * 删除由 insertTestSuite 创建的数据。
 */
const deleteTestSuite = [
    {
        description: '3.1. [ByPath] 删除 items 数组的第一个元素',
        event: 'era:deleteByPath',
        data: {
            path: 'testData.items[0]',
        },
    },
    {
        description: '3.2. [ByObject] 删除 user.stats 中的 int 属性',
        event: 'era:deleteByObject',
        data: {
            testData: {
                user: {
                    stats: {
                        int: {}, // 使用空对象表示删除'int'这个键
                    },
                },
            },
        },
    },
    {
        description: '3.3. [ByObject] 删除整个 metadata 对象',
        event: 'era:deleteByObject',
        data: {
            testData: {
                metadata: {}, // 使用空对象表示删除'metadata'这个键
            },
        },
    },
    {
        description: '3.4. [ByPath] 删除整个 inventory 对象',
        event: 'era:deleteByPath',
        data: {
            path: 'testData.inventory',
        },
    },
];
// ==================================================================
// 事件监听器注册
// ==================================================================
$(() => {
    logger.log('init', 'ERA API 分组测试脚本已加载');
    /**
     * 辅助函数：执行一个测试套件
     * @param suite 要执行的测试套件数组
     * @param delay 每个动作之间的延迟（毫秒）
     */
    function runTestSuite(suite, delay = 500) {
        suite.forEach((testCase, index) => {
            setTimeout(() => {
                logger.log('runTestSuite', `[${index + 1}/${suite.length}] ${testCase.description}`);
                eventEmit(testCase.event, testCase.data);
            }, index * delay);
        });
    }
    // 注册按钮
    eventOn(getButtonEvent('Run Insert Tests'), () => {
        runTestSuite(insertTestSuite);
    });
    eventOn(getButtonEvent('Run Update Tests'), () => {
        runTestSuite(updateTestSuite);
    });
    eventOn(getButtonEvent('Run Delete Tests'), () => {
        runTestSuite(deleteTestSuite);
    });
    eventOn(getButtonEvent('Get Current Vars'), () => {
        logger.log('runTestSuite', `[Get Current Vars] Triggering era:getCurrentVars`);
        eventEmit('era:getCurrentVars');
    });
    // 监听 ERA 框架的写入完成事件
    eventOn('era:writeDone', detail => {
        const { mk, message_id, actions, selectedMks, editLogs, stat, statWithoutMeta, consecutiveProcessingCount } = detail;
        const funcName = 'onWriteDone';
        // 如果是由 apiWrite 触发的，则跳过，避免循环
        if (detail?.actions?.apiWrite === true) {
            logger.log(funcName, '检测到 apiWrite 触发的事件，已跳过。');
            return;
        }
        logger.log(funcName, `接收到 era:writeDone 事件 (MK: ${mk}, MsgID: ${message_id}, Actions: ${JSON.stringify(actions)}, Consecutive: ${consecutiveProcessingCount})`);
        // 使用 logger.debug 输出详细信息，避免在常规日志中刷屏
        logger.debug(funcName, '--- Event Payload Details ---');
        logger.debug(funcName, `Message Key (mk): ${mk}`);
        logger.debug(funcName, `Message ID (message_id): ${message_id}`);
        logger.debug(funcName, `Consecutive Processing Count: ${consecutiveProcessingCount}`);
        logger.debug(funcName, `Actions: ${JSON.stringify(actions, null, 2)}`);
        // 对于大型对象，使用 JSON.stringify 配合 logger.debug
        logger.debug(funcName, `Selected MKs (selectedMks): ${JSON.stringify(selectedMks, null, 2)}`);
        logger.debug(funcName, `Edit Logs (editLogs): ${JSON.stringify(editLogs, null, 2)}`);
        logger.debug(funcName, `Stat (with meta): ${JSON.stringify(stat, null, 2)}`);
        logger.debug(funcName, `Stat (without meta): ${JSON.stringify(statWithoutMeta, null, 2)}`);
        logger.debug(funcName, '---------------------------');
    });
});

})();


//# sourceMappingURL=index.js.map
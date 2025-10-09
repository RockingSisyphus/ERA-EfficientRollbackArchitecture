/**
 * @file ERA 变量框架 - 核心常量模块
 * @description
 * 该文件集中定义了整个 ERA 框架所使用的关键常量。
 * 这些常量主要用作在酒馆 `chat` 变量中存储和检索 ERA 核心数据的路径（键名）。
 *
 * **核心数据结构**:
 * ERA 的数据被分为两部分，存储在 `chat` 变量下：
 * 1. **元数据 (ERAMetaData)**: 包含框架自身运行所需的核心数据，如 `EditLogs` 和 `SelectedMks`。
 * 2. **状态数据 (stat_data)**: 包含所有由用户和 AI 管理的游戏/故事变量，如 `player`、`world_state` 等。
 *
 * 其结构大致如下：
 * ```json
 * {
 *   "ERAMetaData": {
 *     "EditLogs": { ... },
 *     "SelectedMks": [ ... ]
 *   },
 *   "stat_data": {
 *     "player": { "hp": 100, "gold": 50 },
 *     "world_state": { ... }
 *   }
 * }
 * ```
 * 将这些路径定义为常量，有助于：
 * 1. **避免硬编码**：减少因拼写错误导致的 bug。
 * 2. **提高可维护性**：如果未来需要调整数据结构，只需修改此文件即可。
 * 3. **增强代码可读性**：常量的名称清晰地表达了其所指向的数据的含义。
 */

'use strict';

/**
 * @constant {object} CHAT_SCOPE
 * @description
 * 用于酒馆助手 `getVariables` 和 `replaceVariables` 系列函数的 `scope` 参数。
 * 它指定了操作的目标是当前**聊天（Chat）**级别的变量。
 * ERA 框架的所有核心数据和用户变量都存储在此作用域下。
 */
export const CHAT_SCOPE = { type: 'chat' as const };

/**
 * @constant {string} META_DATA_PATH
 * @description 在 `chat` 变量中，存储 ERA 框架**元数据**的根对象的键名。
 */
export const META_DATA_PATH = 'ERAMetaData';

/**
 * @constant {string} STAT_DATA_PATH
 * @description 在 `chat` 变量中，存储用户**状态数据**的根对象的键名。
 */
export const STAT_DATA_PATH = 'stat_data';

/**
 * @constant {string} LOGS_PATH
 * @description
 * 在 `ERAMetaData` 对象中，存储**编辑日志（Edit Logs）**的对象的键名，即 `"EditLogs"`。
 * `EditLogs` 是一个以**消息密钥（MK）**为键，以该消息引发的变量变更记录数组为值的对象。
 * 这是实现“逆序回滚”功能的基础数据。
 *
 * @example
 * // chat.ERAMetaData.EditLogs 的一个条目
 * "era_mk_1759246942209_jipmrj": [
 *   { "op": "insert", "path": "testData.inventory", "value_new": { "gold": 100, "slots": ["sword", "shield"] } },
 *   { "op": "update", "path": "player.hp", "value_old": 90, "value_new": 100 }
 * ]
 */
export const LOGS_PATH = 'EditLogs';

/**
 * @constant {string} SEL_PATH
 * @description
 * 在 `ERAMetaData` 对象中，存储**已选择消息密钥链（Selected Message Keys）**的数组的键名，即 `"SelectedMks"`。
 * `SelectedMks` 是一个稀疏数组，其**索引约等于消息 ID**，值是该楼层消息的 MK。
 * 这个数组是 ERA 框架的“脊梁”，是连接抽象变量状态与具体聊天历史的桥梁。
 * 框架通过比对 `SelectedMks` 与实际消息流中的 MK，来判断数据是否需要同步。
 *
 * @example
 * // chat.ERAMetaData.SelectedMks
 * [ , "era_mk_greeting", "era_mk_abc123", , "era_mk_xyz789"]
 */
export const SEL_PATH = 'SelectedMks';

/**
 * @constant {string} ERA_DATA_TAG
 * @description
 * 用于在消息内容中包裹 ERA 元数据（如消息密钥 MK）的 XML 风格标签名。
 * e.g., `<era_data>{...}</era_data>`
 */
export const ERA_DATA_TAG = 'era_data';

/**
 * @constant {RegExp} ERA_DATA_REGEX
 * @description
 * 用于从消息内容字符串中匹配和提取 `<era_data>` 块的正则表达式。
 * 这个常量被定义在这里，以避免 `message_key.ts` 和 `message_utils.ts` 之间的循环依赖。
 */
export const ERA_DATA_REGEX = new RegExp(`<${ERA_DATA_TAG}>({.*?})<\\/${ERA_DATA_TAG}>`);

/**
 * @constant {object} ERA_API_EVENTS
 * @description
 * 定义了所有供外部脚本通过 `eventEmit` 调用的自定义 API 事件名称。
 * 使用这些常量可以避免在代码中使用硬编码的字符串。
 */
export const ERA_API_EVENTS = {
  INSERT_BY_OBJECT: 'era:insertByObject',
  UPDATE_BY_OBJECT: 'era:updateByObject',
  INSERT_BY_PATH: 'era:insertByPath',
  UPDATE_BY_PATH: 'era:updateByPath',
  DELETE_BY_OBJECT: 'era:deleteByObject',
  DELETE_BY_PATH: 'era:deleteByPath',
} as const;

/**
 * @constant {object} ERA_EVENT_EMITTER
 * @description 定义了所有由 ERA 框架**向外发出**的事件。
 */
export const ERA_EVENT_EMITTER = {
  /** 当变量写入完成时触发 */
  WRITE_DONE: 'era:writeDone',
  /** 当API执行写入时触发 */
  API_WRITE: 'era:apiWrite',
} as const;

/**
 * @description 定义需要监听的事件的分组
 */
export const EVENT_GROUPS = {
  WRITE: [
    //tavern_events.CHARACTER_MESSAGE_RENDERED,
    tavern_events.APP_READY,
    'manual_write',
    ERA_EVENT_EMITTER.API_WRITE,
    //tavern_events.MESSAGE_RECEIVED,
  ],
  SYNC: [
    tavern_events.MESSAGE_RECEIVED,
    tavern_events.MESSAGE_DELETED,
    tavern_events.MESSAGE_SWIPED,
    tavern_events.CHAT_CHANGED,
    'manual_sync',
    'manual_full_sync',
  ],
  API: Object.values(ERA_API_EVENTS),
  /** 仅更新MK的事件 */
  UPDATE_MK_ONLY: [tavern_events.MESSAGE_SENT],
  /** 仅用于对冲检测的事件，本身不触发逻辑 */
  COLLISION_DETECTORS: [tavern_events.GENERATION_STARTED],
};

/**
 * @constant {Map<string, string>} EVENT_COLLISION_MAP
 * @description
 * 定义了事件对冲规则。
 * 如果在事件队列的同一次批处理中，同时出现了 key 事件和 value 事件，
 * 则这两个事件都将被忽略。
 *
 * @example
 * // 当用户快速左滑然后点击生成时，会依次触发 `MESSAGE_SWIPED` 和 `GENERATION_STARTED`。
 * // 这条规则会捕获这种模式并同时忽略这两个事件，避免不必要的同步。
 * new Map([
 *   [tavern_events.MESSAGE_SWIPED, tavern_events.GENERATION_STARTED]
 * ])
 */
export const EVENT_COLLISION_MAP = new Map<string, string>([
  [tavern_events.MESSAGE_SWIPED, tavern_events.GENERATION_STARTED],
]);

/**
 * @constant {number} RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION
 * @description 当 `ensureMessageKey` 注入一个新的 MK 后，需要忽略的由该操作触发的 `character_message_rendered` 事件的数量。
 * 通常设置为 1，因为一次消息内容更新通常只会触发一次渲染事件。
 */
export const RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION = 1;

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
    'sync',
    'rollback',
    'update',
    'event_queue',
    //'message_key',
    //'message_macro_processor',
    'write',
    'insert',
    'delete',
    'query',
    //'template',
    'force_macro_render',
    'message_utils',
  ] as string[],
};
// 初始化时将 currentLevel 设置为 debug 级别
LOG_CONFIG.currentLevel = LOG_CONFIG.levels.debug;

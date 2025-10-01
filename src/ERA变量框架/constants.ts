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

  /** 当变量写入完成时触发 */
  WRITE_DONE: 'era:writeDone',
} as const;

/**
 * @file ERA 变量框架 - 递归写入与日志生成模块
 * @description
 * 该模块提供了变量修改的核心递归逻辑，是 `write.ts` 的直接下游。
 * 它定义了 `applyInsertAtLevel` 和 `applyEditAtLevel` 两个函数，
 * 分别实现了 `<VariableInsert>` 和 `<VariableEdit>` 指令的详细行为，
 * 并在递归遍历指令对象的同时，生成用于回滚的精确 `EditLog`。
 *
 * **设计理念**:
 * - **职责单一**: 函数只关心如何根据指令修改变量状态并生成日志，不关心指令从何而来。
 * - **精确日志**: `EditLog` 的准确性是回滚功能的基础。此模块通过精巧的逻辑，
 *   特别是 `applyEditAtLevel` 中对“旧值”的追溯，确保了日志的绝对可靠。
 * - **原子性操作**: `applyInsertAtLevel` 实现了原子性的插入，确保了数据结构的完整性。
 * - **容错性**: 两个函数都具有容错能力。当遇到无效路径（如插入已存在的路径，或编辑不存在的路径）时，
 *   它们会跳过该条指令并继续处理其他有效指令，而不是中断整个写入过程。
 */

'use strict';

import { findLatestNewValue } from './rollback';
import { Logger, mergeReplaceArray, sanitizeArrays } from './utils';

/**
 * **【递归插入】**
 * 实现了 `<VariableInsert>` 的核心逻辑：**非破坏性地**递归插入值。
 *
 * **核心规则**:
 * 1. **只在路径不存在时写入**。如果路径已存在，则跳过该路径的写入。
 * 2. **原子性插入**。如果一个基础路径（如 `player.inventory`）不存在，它会将整个 `inventory`
 *    对象作为一整个单元一次性插入，并只记录一条 `insert` 日志。
 * 3. **递归补充**。如果基础路径已存在，它会递归地深入，尝试在其下补充插入新的子路径。
 * 4. **模板支持**。支持从 `$meta.template` 中继承模板，实现数据结构的复用。
 *
 * @param {any} rootVars - 根变量对象（通常是整个 `chat` 变量的快照）。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 从指令中解析出的、要应用于当前层级的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组（引用传递）。
 * @param {any} inheritedTpl - 从上层继承的模板对象。
 * @param {Logger} logger - 日志记录器实例。
 */
export function applyInsertAtLevel(
  rootVars: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  inheritedTpl: any,
  logger: Logger,
) {
  // 确定当前层级的模板：优先使用补丁自带的，其次是变量中已有的，最后是继承的。
  const tplFromPatch = _.get(patchObj, ['$meta', 'template']);
  const tplFromVars = basePath ? _.get(rootVars, `${basePath}.$meta.template`) : _.get(rootVars, `$meta.template`);
  const localTpl = _.isPlainObject(tplFromPatch)
    ? tplFromPatch
    : _.isPlainObject(tplFromVars)
      ? tplFromVars
      : inheritedTpl;

  // --- 原子性插入逻辑 ---
  if (basePath && !_.has(rootVars, basePath)) {
    let composed = patchObj;
    // 如果有模板，则先将补丁与模板合并。
    if (_.isPlainObject(patchObj) && _.isPlainObject(localTpl)) {
      composed = mergeReplaceArray(localTpl, patchObj);
    }
    composed = sanitizeArrays(composed); // 清理数据
    _.set(rootVars, basePath, composed); // 写入整个对象
    // 只记录一条日志，代表整个对象的插入。
    editLog.push({ op: 'insert', path: basePath, value_new: _.cloneDeep(composed) });
    return; // 原子性插入完成，无需再递归。
  }

  // --- 递归补充插入逻辑 ---
  // 如果 basePath 已存在，或 basePath 为空（即在根级别操作），则遍历补丁的键。
  for (const key of Object.keys(patchObj)) {
    // if (key === '$meta') continue; // 暂时注释掉，以允许在初始化时通过顶层插入 `$meta` 数据。
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];

    if (_.has(rootVars, fullPath)) {
      const valOld = _.get(rootVars, fullPath);
      // 如果新旧值都是对象，则递归下去，尝试补充插入。
      if (_.isPlainObject(valOld) && _.isPlainObject(valNew)) {
        applyInsertAtLevel(rootVars, fullPath, valNew, editLog, localTpl, logger);
      } else {
        // 否则，路径已存在且无法递归，记录失败并跳过。
        logger.warn('applyInsertAtLevel', `VariableInsert 失败：路径已存在 -> ${fullPath}`);
      }
    } else {
      // 在已存在的对象下，发现了一个全新的子路径，执行原子插入。
      let composed = valNew;
      if (_.isPlainObject(valNew) && _.isPlainObject(localTpl)) {
        composed = mergeReplaceArray(localTpl, valNew);
      }
      composed = sanitizeArrays(composed);
      _.set(rootVars, fullPath, composed);
      editLog.push({ op: 'insert', path: fullPath, value_new: _.cloneDeep(composed) });
    }
  }
}

/**
 * **【递归编辑】**
 * 实现了 `<VariableEdit>` 的核心逻辑：**只修改已存在的路径**。
 *
 * **核心规则**:
 * 1. **路径必须存在**。如果指令中指定的路径在当前变量状态中不存在，则跳过该操作。
 * 2. **叶子节点操作**。只在遇到指令对象中的叶子节点（非对象值）时才执行实际的修改和日志记录。
 * 3. **精确的旧值查找**。为了生成可供回滚的 `EditLog`，它需要找到变量在本次修改发生**之前**的“旧值”。
 *    查找顺序为：首先通过 `findLatestNewValue` 在历史 `EditLog` 中回溯；如果找不到，
 *    则从当前消息处理开始时的变量快照中获取。这是确保日志准确性的关键。
 *
 * @param {any} rootVars - 根变量对象。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 要应用的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {Logger} logger - 日志记录器实例。
 * @param {number} messageId - 当前正在处理的消息的 ID，用于历史追溯。
 * @param {Map<string, any>} intraMessageState - 用于跟踪在**同一条消息内部**对同一变量的连续修改。
 */
export async function applyEditAtLevel(
  rootVars: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  logger: Logger,
  messageId: number,
  intraMessageState: Map<string, any>,
) {
  for (const key of Object.keys(patchObj)) {
    // if (key === '$meta') continue; // 暂时注释掉，以允许 `$meta` 数据被修改。
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];

    // 如果值是对象，则继续递归，不在此层级处理。
    if (_.isPlainObject(valNew)) {
      if (!_.has(rootVars, fullPath)) {
        logger.warn('applyEditAtLevel', `VariableEdit 跳过：父路径不存在 -> ${fullPath}`);
        continue; // 跳过整个不存在的分支。
      }
      await applyEditAtLevel(rootVars, fullPath, valNew, editLog, logger, messageId, intraMessageState);
      continue;
    }

    // --- 只在遇到叶子节点 (非对象值) 时，才执行以下逻辑 ---

    if (!_.has(rootVars, fullPath)) {
      logger.warn('applyEditAtLevel', `VariableEdit 失败：路径非法，无法写入 -> ${fullPath}`);
      continue;
    }

    // 1. 查找旧值 (`valOld`)
    // 这是确保回滚准确性的核心。
    let valOld = await findLatestNewValue(fullPath, messageId, logger);
    /*
     * 由于我们已经在前面检查过 _.has(rootVars, fullPath)，
     * 所以如果 findLatestNewValue 返回 null，我们可以安全地从 rootVars 获取当前值。
     */
    if (valOld === null) {
      logger.debug('applyEditAtLevel', `历史追溯未找到 <${fullPath}>，从楼内初始状态获取...`);
      valOld = _.get(rootVars, fullPath);
      logger.debug('applyEditAtLevel', `成功从楼内初始状态获取 <${fullPath}> 的值为: ${JSON.stringify(valOld)}`);
    }

    const cleaned = sanitizeArrays(valNew); // 清理新值

    // 只有在新旧值确实不同的情况下，才执行写入和日志记录。
    if (!_.isEqual(valOld, cleaned)) {
      // 2. 实际写入变量
      _.set(rootVars, fullPath, cleaned);
      // 3. 生成并记录 `update` 类型的日志
      editLog.push({
        op: 'update',
        path: fullPath,
        value_old: _.cloneDeep(valOld),
        value_new: _.cloneDeep(cleaned),
      });
      // 4. 更新楼内状态 Map，以便同一消息内的后续操作能正确追溯到这个新值。
      intraMessageState.set(fullPath, _.cloneDeep(cleaned));
    }
  }
}

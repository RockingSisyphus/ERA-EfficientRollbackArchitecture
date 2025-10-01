/**
 * @file ERA 变量框架 - 变量插入模块
 * @description
 * 该模块负责处理 `<VariableInsert>` 指令，实现变量的非破坏性插入，并生成相应的 `EditLog`。
 *
 * **设计理念**:
 * - **职责单一**: 模块只关心如何根据指令修改变量状态并生成日志，不关心指令从何而来。
 * - **原子性操作**: `applyInsertAtLevel` 实现了原子性的插入，确保了数据结构的完整性。
 *   如果一个基础路径不存在，它会将整个对象作为一整个单元一次性插入。
 * - **容错性**: 当遇到无效路径（如尝试向已存在的路径插入）时，会跳过该条指令并继续处理其他有效指令，
 *   而不是中断整个写入过程。
 */
'use strict';

import { CHAT_SCOPE } from './constants';
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
 * 处理所有 `<VariableInsert>` 指令块。
 *
 * @param {any[]} allInserts - 从消息中解析出的所有 insert 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {Logger} logger - 日志记录器实例。
 */
export async function processInsertBlocks(allInserts: any[], editLog: any[], logger: Logger) {
  if (allInserts.length > 0) {
    /*
     * N.B. 必须对每个 insertRoot 单独调用 updateVariablesWith，而不是将所有操作合并到一次调用中。
     * 这是为了确保在同一条消息内，前一个 <VariableInsert> 块中插入的模板或数据，
     * 可以被后一个 <VariableInsert> 或 <VariableEdit> 块访问和使用。
     * 每次 await updateVariablesWith 完成后，变量状态都会被刷新，从而使后续操作能看到最新的结果。
     */
    for (const insertRoot of allInserts) {
      if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
      try {
        await updateVariablesWith(v => {
          logger.debug('processInsertBlocks', `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
          for (const topKey of Object.keys(insertRoot)) {
            const topPatch = (insertRoot as any)[topKey];
            if (topPatch == null) continue;
            // 调用递归函数，实际执行插入并填充 editLog。
            applyInsertAtLevel(v, topKey, topPatch, editLog, null, logger);
          }
          return v;
        }, CHAT_SCOPE);
      } catch (e: any) {
        logger.error('processInsertBlocks', `处理 insertRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log('processInsertBlocks', '所有 VariableInsert 操作完成');
  }
}

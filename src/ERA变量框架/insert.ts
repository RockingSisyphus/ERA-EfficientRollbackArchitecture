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

import { Logger, mergeReplaceArray, sanitizeArrays, updateEraStatData } from './utils';

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
 * @param {any} statData - 状态数据对象 (即 `stat_data`)。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 从指令中解析出的、要应用于当前层级的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组（引用传递）。
 * @param {any} inheritedTpl - 从上层继承的模板对象。
 * @param {Logger} logger - 日志记录器实例。
 */
export function applyInsertAtLevel(
  statData: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  inheritedTpl: any,
  logger: Logger,
) {
  // --- 1. 确定当前层级的模板 ---
  // 优先级: 变量中已有的 > 继承的 > 指令中提供的。
  // 这种优先级符合 insert 的“非破坏性”原则：已存在的结构定义（变量中的模板）不应被新指令轻易覆盖。
  const tplFromVars = basePath ? _.get(statData, `${basePath}.$meta.template`) : _.get(statData, `$meta.template`);
  const tplFromPatch = _.get(patchObj, ['$meta', 'template']);
  const localTpl = _.isPlainObject(tplFromVars)
    ? tplFromVars
    : _.isPlainObject(inheritedTpl)
      ? tplFromPatch
      : inheritedTpl;

  // --- 2. 检查路径存在性，决定执行策略 ---
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;

  // **策略一：原子性插入 (Atomic Insert)**
  // 如果当前路径在变量中不存在，则将整个补丁对象作为新值一次性插入，并停止此分支的递归。
  // 这是 insert 操作的核心，确保了新数据块的完整性。
  if (basePath && currentNodeInVars === undefined) {
    let composed = patchObj;
    // 如果模板有效，则先将补丁与模板合并，确保新插入的数据符合预设结构。
    if (_.isPlainObject(patchObj) && _.isPlainObject(localTpl)) {
      composed = mergeReplaceArray(localTpl, patchObj);
    }
    composed = sanitizeArrays(composed); // 清理数组中的 null 等无效值。
    _.set(statData, basePath, composed); // 执行插入。
    editLog.push({ op: 'insert', path: basePath, value_new: _.cloneDeep(composed) });
    logger.debug('applyInsertAtLevel', `原子性插入到新路径: ${basePath}`);
    return; // 插入完成，终止递归。
  }

  // **策略二：递归补充 (Recursive Supplement)**
  // 如果当前路径已存在，并且补丁和当前值都是对象，则深入递归，尝试补充插入子属性。
  // 这是 insert 实现“非破坏性”更新的关键。
  if (_.isPlainObject(currentNodeInVars) && _.isPlainObject(patchObj)) {
    for (const key of Object.keys(patchObj)) {
      // if (key === '$meta') continue; // 允许插入 $meta，用于初始化等场景。
      const subPath = basePath ? `${basePath}.${key}` : key;
      const subPatch = patchObj[key];
      // 递归调用，将当前层级最终确定的模板 (localTpl) 作为继承模板传递下去。
      applyInsertAtLevel(statData, subPath, subPatch, editLog, localTpl, logger);
    }
  } else if (basePath) {
    // **插入失败**
    // 如果路径已存在，但不是可递归补充的对象结构（例如，一个是对象，另一个是字符串），
    // 则记录警告。insert 不会覆盖已存在的值。
    logger.warn('applyInsertAtLevel', `VariableInsert 失败：路径已存在且无法递归补充 -> ${basePath}`);
  }
  // 如果 basePath 为空（在根级别）且 patch 不是对象，则不执行任何操作，因为根不能被非对象替换。
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
        await updateEraStatData(stat => {
          logger.debug('processInsertBlocks', `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
          // 从根路径 '' 开始统一递归入口，这使得逻辑与 delete/update 保持一致。
          applyInsertAtLevel(stat, '', insertRoot, editLog, null, logger);
          return stat;
        });
      } catch (e: any) {
        logger.error('processInsertBlocks', `处理 insertRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log('processInsertBlocks', '所有 VariableInsert 操作完成');
  }
}

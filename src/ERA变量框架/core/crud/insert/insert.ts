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

import { sanitizeArrays } from '../../../utils/data';
import { Logger } from '../../../utils/log';
import { applyTemplateToPatch, getInheritedTemplateContent, resolveTemplate } from './template';

const logger = new Logger();

/**
 * **【递归插入】**
 * 实现了 `<VariableInsert>` 的核心逻辑：**非破坏性地**递归插入值。
 *
 * **核心规则**:
 * 1. **只在路径不存在时写入**。如果路径已存在，则跳过该路径的写入。
 * 2. **原子性插入**。如果一个基础路径（如 `player.inventory`）不存在，它会将整个 `inventory`
 *    对象作为一整个单元一次性插入，并只记录一条 `insert` 日志。
 * 3. **递归补充**。如果基础路径已存在，它会递归地深入，尝试在其下补充插入新的子路径。
 * 4. **模板支持**。支持从 `$template` 中继承模板，实现数据结构的复用。
 *
 * @param {any} statData - 状态数据对象 (即 `stat_data`)。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 从指令中解析出的、要应用于当前层级的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组（引用传递）。
 * @param {any} inheritedContent - 从上层继承的、纯粹的模板“内容”对象。
 * @param {any} parentData - 当前节点的父节点在 `statData` 中的数据。
 */
export function applyInsertAtLevel(
  statData: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  inheritedContent: any,
  parentData: any, // 新增参数，直接传递父节点数据
) {
  // --- 1. 确定当前层级的模板内容 ---
  // 调用 resolveTemplate，它现在直接使用传入的 parentData
  const localTplContent = resolveTemplate(inheritedContent, parentData);
  logger.debug('applyInsertAtLevel', `[入口] basePath: "${basePath || 'root'}"`, {
    statData: _.cloneDeep(statData),
  });

  // --- 2. 检查路径存在性，决定执行策略 ---
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
  logger.debug(
    'applyInsertAtLevel',
    `[路径检查] at path: "${basePath || 'root'}". currentNodeInVars 的值:`,
    currentNodeInVars,
  );

  // **策略一：原子性插入 (Atomic Insert)**
  // 如果当前路径在变量中不存在，则将整个补丁对象作为新值一次性插入。
  if (basePath && currentNodeInVars === undefined) {
    // 调用 applyTemplateToPatch 函数，将合并后的模板内容应用到补丁上
    const composed = applyTemplateToPatch(localTplContent, patchObj);

    const finalValue = sanitizeArrays(composed); // 清理数组中的 null 等无效值。
    logger.debug('applyInsertAtLevel', `最终插入数据 at ${basePath}:\n${JSON.stringify(finalValue, null, 2)}`);
    _.set(statData, basePath, finalValue); // 执行插入。
    editLog.push({ op: 'insert', path: basePath, value_new: _.cloneDeep(finalValue) });
    logger.debug('applyInsertAtLevel', `原子性插入到新路径: ${basePath}`);
    return; // 插入完成，终止递归。
  }

  // **策略二：递归补充 (Recursive Supplement)**
  // 如果当前路径已存在，并且补丁和当前值都是对象，则深入递归。
  if (_.isPlainObject(currentNodeInVars) && _.isPlainObject(patchObj)) {
    logger.debug(
      'applyInsertAtLevel',
      `[递归补充] at path: "${basePath || 'root'}"
      - 当前层级模板 (localTplContent): ${JSON.stringify(localTplContent)}`,
    );
    for (const key of Object.keys(patchObj)) {
      const subPath = basePath ? `${basePath}.${key}` : key;
      const subPatch = patchObj[key];
      // 调用 getInheritedTemplateContent，从当前模板内容中为子节点查找其应继承的内容
      const subInheritedContent = getInheritedTemplateContent(localTplContent, key);
      logger.debug(
        'applyInsertAtLevel',
        `  - 准备递归子节点: "${key}"
      - 将传递给子节点的模板 (subInheritedContent): ${JSON.stringify(subInheritedContent)}`,
      );
      // 将当前节点数据 currentNodeInVars 作为下一层的 parentData 传递下去
      applyInsertAtLevel(statData, subPath, subPatch, editLog, subInheritedContent, currentNodeInVars);
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
 * **【纯函数】** 处理所有 `<VariableInsert>` 指令块。
 *
 * @param {any[]} allInserts - 从消息中解析出的所有 insert 指令对象。
 * @param {any} initialStat - 操作开始前的初始 `stat_data` 状态。
 * @returns {Promise<{ finalStat: any, editLog: any[] }>} - 返回一个包含操作完成后的最终状态和生成的编辑日志的对象。
 */
export async function processInsertBlocks(
  allInserts: any[],
  initialStat: any,
): Promise<{ finalStat: any; editLog: any[] }> {
  if (!allInserts || allInserts.length === 0) {
    return { finalStat: initialStat, editLog: [] };
  }

  logger.debug('processInsertBlocks', '[初始状态] 进入 processInsertBlocks 时的 statData:', _.cloneDeep(initialStat));

  const currentStat = _.cloneDeep(initialStat);
  const editLog: any[] = [];

  /*
   * 循环处理每个 insertRoot。
   * 在纯函数模式下，每个 insertRoot 都在上一个 insertRoot 修改后的 `currentStat` 基础上进行操作，
   * 从而确保了在同一消息内，前一个 <VariableInsert> 块中插入的数据，
   * 可以被后一个 <VariableInsert> 块访问和使用。
   */
  for (const insertRoot of allInserts) {
    if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
    try {
      logger.debug('processInsertBlocks', `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
      // 从根路径 '' 开始统一递归入口，顶层调用时，父节点为 null
      applyInsertAtLevel(currentStat, '', insertRoot, editLog, null, null);
    } catch (e: any) {
      logger.error('processInsertBlocks', `处理 insertRoot 失败: ${e?.message || e}`, e);
    }
  }

  logger.log('processInsertBlocks', '所有 VariableInsert 操作完成');
  return { finalStat: currentStat, editLog };
}

/**
 * @file ERA 变量框架 - 变量编辑模块
 * @description
 * 该模块负责处理 `<VariableEdit>` 指令，实现对已存在变量的修改，并生成用于回滚的精确 `EditLog`。
 *
 * **设计理念**:
 * - **职责单一**: 模块只关心如何根据指令修改变量状态并生成日志，不关心指令从何而来。
 * - **精确日志**: `EditLog` 的准确性是回滚功能的基础。`applyEditAtLevel` 通过精巧的逻辑，
 *   特别是对“旧值”的历史追溯，确保了日志的绝对可靠。
 * - **容错性**: 当遇到无效路径（如尝试编辑不存在的路径）时，会跳过该条指令并继续处理其他有效指令，
 *   而不是中断整个写入过程。
 */
'use strict';

import { findLatestNewValue } from '../rollback';
import { updateEraStatData } from '../../utils/era_data';
import { sanitizeArrays } from '../../utils/data';
import { Logger } from '../../utils/log';

const logger = new Logger('update');

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
 * @param {any} statData - 状态数据对象 (即 `stat_data`)。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 要应用的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {number} messageId - 当前正在处理的消息的 ID，用于历史追溯。
 * @param {Map<string, any>} intraMessageState - 用于跟踪在**同一条消息内部**对同一变量的连续修改。
 */
export async function applyEditAtLevel(
  statData: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  messageId: number,
  intraMessageState: Map<string, any>,
) {
  // --- 1. 路径和存在性检查 ---
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
  if (currentNodeInVars === undefined) {
    logger.warn('applyEditAtLevel', `VariableEdit 跳过：路径不存在 -> ${basePath || '(root)'}`);
    return;
  }

  // --- 2. 权限检查 (`updatable`) ---
  // 读取 updatable 标志，如果未定义，则默认为 true (允许更新)。
  const isUpdatable = _.get(currentNodeInVars, ['$meta', 'updatable'], true);

  // 定义豁免条件：只有当指令明确要将 updatable 从 false 改为 true 时，才允许操作。
  const isBypassingProtection =
    isUpdatable === false && // 当前是受保护的
    _.get(patchObj, ['$meta', 'updatable']) === true; // 且指令意图是明确地将其改为 true

  // 如果受保护且不满足豁免条件，则阻止整个子树的更新。
  if (isUpdatable === false && !isBypassingProtection) {
    logger.warn(
      'applyEditAtLevel',
      `VariableEdit 失败：路径 <${basePath}> 受 "$meta.updatable: false" 保护，无法被修改。`,
    );
    return; // 终止此分支的递归。
  }

  // --- 3. 递归或执行 ---
  // 遍历指令的键，以驱动递归。
  for (const key of Object.keys(patchObj)) {
    const subPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];

    // **策略一：递归深入**
    // 如果指令的值是对象，则继续向内递归。
    if (_.isPlainObject(valNew)) {
      await applyEditAtLevel(statData, subPath, valNew, editLog, messageId, intraMessageState);
      continue; // 继续处理下一个键。
    }

    // **策略二：执行更新 (叶子节点)**
    // 只有当指令的值不是对象时，才执行更新操作。

    // 路径合法性检查：确保要写入的完整路径是存在的。
    if (!_.has(statData, subPath)) {
      logger.warn('applyEditAtLevel', `VariableEdit 失败：路径非法，无法写入 -> ${subPath}`);
      continue;
    }

    // a. 查找旧值 (`valOld`)
    // 这是确保回滚准确性的核心。
    logger.debug('applyEditAtLevel', `[旧值查找] 准备为路径 <${subPath}> 从消息 ID <${messageId}> 向上追溯...`);
    let valOld = await findLatestNewValue(subPath, messageId, logger);
    if (valOld === null) {
      valOld = _.get(statData, subPath);
      logger.debug(
        'applyEditAtLevel',
        `[旧值查找] 追溯未找到历史值，从当前 stat_data 中获取到旧值: ${JSON.stringify(valOld)}`,
      );
    } else {
      logger.debug('applyEditAtLevel', `[旧值查找] 追溯成功，找到历史旧值: ${JSON.stringify(valOld)}`);
    }

    const cleaned = sanitizeArrays(valNew); // 清理新值

    // b. 记录编辑意图
    // 即使新旧值相同，也记录 EditLog，以完整反映作者的编辑意图。
    // 这对于调试和历史追溯非常有用。
    _.set(statData, subPath, cleaned);
    editLog.push({
      op: 'update',
      path: subPath,
      value_old: _.cloneDeep(valOld),
      value_new: _.cloneDeep(cleaned),
    });
    // c. 更新楼内状态 Map，以便同一消息内的后续操作能正确追溯到这个新值。
    intraMessageState.set(subPath, _.cloneDeep(cleaned));
  }
}

/**
 * 处理所有 `<VariableEdit>` 指令块。
 *
 * @param {any[]} allEdits - 从消息中解析出的所有 edit 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {number} messageId - 当前正在处理的消息的 ID。
 */
export async function processEditBlocks(allEdits: any[], editLog: any[], messageId: number) {
  if (allEdits.length > 0) {
    const intraMessageState = new Map<string, any>(); // 用于跟踪在**本消息内部**对变量的连续修改。
    // N.B. 同样，编辑操作也需要独立调用以确保能读取到同一消息中、此前已完成的插入或编辑操作的结果。
    for (const editRoot of allEdits) {
      if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot)) continue;
      try {
        await updateEraStatData(async stat => {
          logger.debug('processEditBlocks', `处理 editRoot: ${JSON.stringify(editRoot)}`);
          // 从根路径 '' 开始统一递归入口，保持逻辑一致性。
          await applyEditAtLevel(stat, '', editRoot, editLog, messageId, intraMessageState);
          return stat;
        });
      } catch (e: any) {
        logger.error('processEditBlocks', `处理 editRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log('processEditBlocks', '所有 VariableEdit 操作完成');
  }
}

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

import { CHAT_SCOPE } from './constants';
import { findLatestNewValue } from './rollback';
import { Logger, sanitizeArrays } from './utils';

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

/**
 * 处理所有 `<VariableEdit>` 指令块。
 *
 * @param {any[]} allEdits - 从消息中解析出的所有 edit 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {number} messageId - 当前正在处理的消息的 ID。
 * @param {Logger} logger - 日志记录器实例。
 */
export async function processEditBlocks(allEdits: any[], editLog: any[], messageId: number, logger: Logger) {
  if (allEdits.length > 0) {
    const intraMessageState = new Map<string, any>(); // 用于跟踪在**本消息内部**对变量的连续修改。
    // N.B. 同样，编辑操作也需要独立调用以确保能读取到同一消息中、此前已完成的插入或编辑操作的结果。
    for (const editRoot of allEdits) {
      if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot)) continue;
      try {
        await updateVariablesWith(async v => {
          logger.debug('processEditBlocks', `处理 editRoot: ${JSON.stringify(editRoot)}`);
          for (const topKey of Object.keys(editRoot)) {
            const topPatch = (editRoot as any)[topKey];
            if (topPatch == null) continue;
            // 调用递归函数，实际执行编辑并填充 editLog。
            await applyEditAtLevel(v, topKey, topPatch, editLog, logger, messageId, intraMessageState);
          }
          return v;
        }, CHAT_SCOPE);
      } catch (e: any) {
        logger.error('processEditBlocks', `处理 editRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log('processEditBlocks', '所有 VariableEdit 操作完成');
  }
}

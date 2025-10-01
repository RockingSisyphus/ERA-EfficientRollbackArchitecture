/**
 * @file ERA 变量框架 - 变量删除模块
 * @description
 * 该模块负责处理 `<VariableDelete>` 指令，实现对已存在变量的删除，并生成相应的 `EditLog`。
 *
 * **设计理念**:
 * - **指令驱动**: 递归行为由指令对象的结构驱动。空对象 `{}` 表示删除当前节点，非空对象表示递归删除子节点。
 * - **安全第一**: 删除是破坏性操作，因此引入了 `$meta.necessary` 权限机制来防止误删。
 * - **精确豁免**: `necessary` 的保护只有在删除指令明确指向 `necessary` 属性自身时才会被绕过。
 * - **原子性日志**: 为每一次删除生成单一、精确的 `EditLog`，确保操作可完全回滚。
 */
'use strict';

import { CHAT_SCOPE } from './constants';
import { Logger } from './utils';

/**
 * **【递归删除】**
 * 实现了 `<VariableDelete>` 的核心逻辑，其行为由指令 `patchObj` 的结构驱动。
 *
 * @param {any} rootVars - 根变量对象（即 chat 变量）。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 从指令中解析出的、与 `basePath` 对应的部分。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {Logger} logger - 日志记录器实例。
 */
function applyDeleteAtLevel(
  rootVars: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  logger: Logger,
) {
  // --- 1. 入口守卫和状态获取 ---
  const currentNodeInVars = basePath ? _.get(rootVars, basePath) : rootVars;

  if (currentNodeInVars === undefined) {
    logger.warn('applyDeleteAtLevel', `VariableDelete 跳过：路径不存在 -> ${basePath || '(root)'}`);
    return;
  }

  const necessary = _.get(currentNodeInVars, ['$meta', 'necessary']);
  
  // 精确判断豁免条件
  const metaPatch = _.get(patchObj, '$meta');
  const isBypassingProtection =
    // 场景1: 指令要删除整个 $meta 对象
    (_.isPlainObject(metaPatch) && _.isEmpty(metaPatch)) ||
    // 场景2: 指令明确要删除 $meta.necessary 键
    _.has(patchObj, ['$meta', 'necessary']);

  // --- 2. 判断意图：递归删除子节点 vs 删除当前节点 ---
  if (_.isPlainObject(patchObj) && !_.isEmpty(patchObj)) {
    // **意图：递归删除子节点**

    // 权限检查：如果节点受 'all' 保护，且指令不满足豁免条件，则禁止深入。
    if (necessary === 'all' && !isBypassingProtection) {
      logger.error('applyDeleteAtLevel', `VariableDelete 失败：路径 <${basePath}> 受 "necessary: all" 保护，其子节点无法被删除。`);
      return;
    }

    // 权限通过，或存在豁免，继续向内递归。
    for (const key of Object.keys(patchObj)) {
      const fullPath = basePath ? `${basePath}.${key}` : key;
      const subPatchObj = patchObj[key];
      applyDeleteAtLevel(rootVars, fullPath, subPatchObj, editLog, logger);
    }
    return; // 子节点处理完毕，返回。
  }

  // --- 3. 执行删除当前节点 ---
  // (能走到这里，说明 patchObj 是空对象、非对象或 null)
  // **意图：删除当前节点 `basePath`**

  // 权限检查：'self' 或 'all' 都会阻止当前节点的直接删除。
  // 直接删除节点的意图无法豁免保护，必须通过递归意图删除 '$meta' 来解除保护。
  if (necessary === 'self' || necessary === 'all') {
    logger.error('applyDeleteAtLevel', `VariableDelete 失败：路径 <${basePath}> 受 "necessary: ${necessary}" 保护，无法被直接删除。`);
    return;
  }

  // 根节点（basePath 为 ''）不应被删除。
  if (basePath === '') {
    logger.error('applyDeleteAtLevel', 'VariableDelete 失败：不允许删除根对象。');
    return;
  }

  // 执行原子性删除
  const valOld = _.cloneDeep(currentNodeInVars);
  _.unset(rootVars, basePath);
  editLog.push({ op: 'delete', path: basePath, value_old: valOld });
  logger.debug('applyDeleteAtLevel', `成功删除节点: ${basePath}`);
}


/**
 * 处理所有 `<VariableDelete>` 指令块。
 *
 * @param {any[]} allDeletes - 从消息中解析出的所有 delete 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {Logger} logger - 日志记录器实例。
 */
export async function processDeleteBlocks(allDeletes: any[], editLog: any[], logger: Logger) {
  if (allDeletes.length > 0) {
    for (const deleteRoot of allDeletes) {
      if (!_.isPlainObject(deleteRoot) || _.isEmpty(deleteRoot)) continue;
      try {
        await updateVariablesWith(v => {
          logger.debug('processDeleteBlocks', `处理 deleteRoot: ${JSON.stringify(deleteRoot)}`);
          // 从根路径开始递归
          applyDeleteAtLevel(v, '', deleteRoot, editLog, logger);
          return v;
        }, CHAT_SCOPE);
      } catch (e: any) {
        logger.error('processDeleteBlocks', `处理 deleteRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log('processDeleteBlocks', '所有 VariableDelete 操作完成');
  }
}

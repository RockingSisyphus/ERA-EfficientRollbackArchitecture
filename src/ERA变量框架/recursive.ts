'use strict';

import { findLatestNewValue, Logger, mergeReplaceArray, sanitizeArrays } from './utils';

/**
 * 只“插入”的递归：仅在键不存在时写入；可用 template；已存在的一律不改
 * @param rootVars 根变量对象
 * @param basePath 基础路径
 * @param patchObj 补丁对象
 * @param editLog 编辑日志
 * @param inheritedTpl 继承的模板
 * @param logger 日志记录器
 */
export function applyInsertAtLevel(
  rootVars: any,
  basePath: string,
  patchObj: any,
  editLog: any[],
  inheritedTpl: any,
  logger: Logger,
) {
  // 确定当前层级的模板
  const tplFromPatch = _.get(patchObj, ['$meta', 'template']);
  const tplFromVars = basePath ? _.get(rootVars, `${basePath}.$meta.template`) : _.get(rootVars, `$meta.template`);
  const localTpl = _.isPlainObject(tplFromPatch)
    ? tplFromPatch
    : _.isPlainObject(tplFromVars)
      ? tplFromVars
      : inheritedTpl;

  // 核心逻辑：首先检查 basePath 本身是否存在
  if (basePath && !_.has(rootVars, basePath)) {
    // 如果 basePath 不存在，则这是一个完整的、原子的插入操作
    let composed = patchObj;
    // 应用模板（如果适用）
    if (_.isPlainObject(patchObj) && _.isPlainObject(localTpl)) {
      composed = mergeReplaceArray(localTpl, patchObj);
    }
    composed = sanitizeArrays(composed);
    // 直接设置整个对象
    _.set(rootVars, basePath, composed);
    // 只记录一条日志
    editLog.push({ op: 'insert', path: basePath, value_new: _.cloneDeep(composed) });
    // 操作完成，直接返回
    return;
  }

  // 如果 basePath 已存在，或 basePath 为空，则进入补充插入逻辑，遍历 patchObj 的键
  for (const key of Object.keys(patchObj)) {
    if (key === '$meta') continue;
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];

    if (_.has(rootVars, fullPath)) {
      const valOld = _.get(rootVars, fullPath);
      if (_.isPlainObject(valOld) && _.isPlainObject(valNew)) {
        // 路径已存在且是对象，递归下去进行补充插入
        applyInsertAtLevel(rootVars, fullPath, valNew, editLog, localTpl, logger);
      } else {
        // 路径已存在但不是可递归的对象，记录失败
        logger.log(`VariableInsert 失败：路径已存在 -> ${fullPath}`, '插入');
      }
    } else {
      // 在已存在的对象下，发现了一个新的子路径，进行原子插入
      let composed = valNew;
      if (_.isPlainObject(valNew) && _.isPlainObject(localTpl)) {
        composed = mergeReplaceArray(localTpl, valNew);
      }
      composed = sanitizeArrays(composed);
      _.set(rootVars, fullPath, composed);
      // 为这个新的子路径记录一条日志
      editLog.push({ op: 'insert', path: fullPath, value_new: _.cloneDeep(composed) });
    }
  }
}

/**
 * 只“修改”的递归：路径必须已存在；不使用 template；不存在即报错
 * @param rootVars 根变量对象
 * @param basePath 基础路径
 * @param patchObj 补丁对象
 * @param editLog 编辑日志
 * @param logger 日志记录器
 * @param messageId 当前消息ID
 * @param intraMessageState 用于跟踪楼内值变化的Map
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
    if (key === '$meta') continue;
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];

    // 如果 valNew 是一个对象，我们只管递归下去，不在这里查找 oldVal
    if (_.isPlainObject(valNew)) {
      // 在递归之前，检查父路径是否存在
      if (!_.has(rootVars, fullPath)) {
        logger.log(`VariableEdit 跳过：父路径不存在 -> ${fullPath}`, '编辑');
        continue; // 跳过整个不存在的分支
      }
      await applyEditAtLevel(rootVars, fullPath, valNew, editLog, logger, messageId, intraMessageState);
      continue;
    }

    // --- 只有当 valNew 是叶子节点 (非对象) 时，才执行以下逻辑 ---

    // 首先检查路径是否存在于当前状态
    if (!_.has(rootVars, fullPath)) {
      logger.log(`VariableEdit 失败：路径非法，无法写入 -> ${fullPath}`, '编辑');
      continue; // 如果路径不存在，则直接跳过
    }

    // 1. 确定 oldVal 的查找顺序: 历史追溯 -> 楼内初始状态 -> null
    let valOld = await findLatestNewValue(fullPath, messageId, logger);

    // 由于我们已经在前面检查过 _.has(rootVars, fullPath)，
    // 所以如果 findLatestNewValue 返回 null，我们可以安全地从 rootVars 获取当前值。
    if (valOld === null) {
      logger.log(`历史追溯未找到 <${fullPath}>，从楼内初始状态获取...`, '获取旧值');
      valOld = _.get(rootVars, fullPath);
      logger.log(`成功从楼内初始状态获取 <${fullPath}> 的值为: ${JSON.stringify(valOld)}`, '获取旧值');
    }

    const cleaned = sanitizeArrays(valNew);
    if (!_.isEqual(valOld, cleaned)) {
      // 2. 更新 rootVars (实际写入)
      _.set(rootVars, fullPath, cleaned);
      // 3. 记录到 editLog
      editLog.push({
        op: 'update',
        path: fullPath,
        value_old: _.cloneDeep(valOld),
        value_new: _.cloneDeep(cleaned),
      });
      // 4. 更新楼内状态
      intraMessageState.set(fullPath, _.cloneDeep(cleaned));
    }
  }
}

'use strict';

import { Logger, mergeReplaceArray } from './utils';

/**
 * **【解析并合并模板内容】**
 *
 * 从继承的模板内容和父节点变量中定义的模板内容中，合并出当前层级可用的模板。
 *
 * @param inheritedContent - 从上上层继承的模板内容。
 * @param parentNodeData - 当前正在处理的节点的 **父节点** 在变量中的数据。
 * @param logger - 日志记录器实例。
 * @returns {any} - 合并后的单一内容对象，如果所有来源都无效，则返回 `null`。
 */
export function resolveTemplate(inheritedContent: any, parentNodeData: any, logger: Logger): any {
  // 1. 从父节点变量中，找到作为当前节点兄弟的 $template
  const varsContent = _.get(parentNodeData, '$template');

  logger.debug(
    'resolveTemplate',
    `解析出的模板内容:\n    - 继承: ${JSON.stringify(inheritedContent)}\n    - 父节点变量: ${JSON.stringify(
      varsContent,
    )}`,
  );

  // 2. 按优先级合并 (父节点变量 > 继承)
  let mergedContent: any = {};
  mergedContent = mergeReplaceArray(mergedContent, inheritedContent);
  mergedContent = mergeReplaceArray(mergedContent, varsContent);

  logger.debug('resolveTemplate', `合并后的最终模板内容: ${JSON.stringify(mergedContent)}`);

  if (_.isEmpty(mergedContent)) {
    return null;
  }

  return mergedContent;
}

/**
 * **【获取子节点要继承的模板内容】**
 *
 * 在一个给定的“父级模板内容”中，查找并合并其内部定义的“原型规则” (`$template`) 和“特异性规则” (`key`)，
 * 以生成供特定子节点 `key` 使用的最终模板内容。
 *
 * @example
 * // 输入:
 * const parentTplContent = {
 *   "$template": { "hp": 10, "mana": 100, "a": { "d": 1 } },
 *   "lili": { "hp": 15, "class": "warrior", "a": { "c": 1 } }
 * };
 * const key = "lili";
 * // 输出 (合并后的内容):
 * // { "hp": 15, "mana": 100, "class": "warrior", "a": { "c": 1, "d": 1 } }
 *
 * @param parentTplContent - 父级的模板内容，它本身可能包含 `$template` 和 `key` 作为子键。
 * @param key - 正在处理的子节点的键名。
 * @param logger - 日志记录器实例。
 * @returns {any} - 子节点应该继承的、已合并的模板内容，或 `undefined`。
 */
export function getInheritedTemplateContent(parentTplContent: any, key: string, logger: Logger): any {
  if (!parentTplContent) return undefined;

  // 步骤 1: 在父级模板内容中查找通用的原型规则
  const prototypeContent = _.get(parentTplContent, '$template');

  // 步骤 2: 在父级模板内容中查找给 key 的特异性规则
  const specificContent = _.get(parentTplContent, key);

  // 步骤 3: 根据查找结果决定最终模板内容
  if (_.isPlainObject(prototypeContent) && _.isPlainObject(specificContent)) {
    logger.debug(
      'getInheritedTemplateContent',
      `为子节点 "${key}" 同时找到原型和特异性内容。\n      - 原型: ${JSON.stringify(
        prototypeContent,
      )}\n      - 特异性: ${JSON.stringify(specificContent)}`,
    );
    // 直接使用 mergeReplaceArray 进行合并
    const merged = mergeReplaceArray(_.cloneDeep(prototypeContent), specificContent);
    logger.debug('getInheritedTemplateContent', `  - 合并后: ${JSON.stringify(merged)}`);
    return merged;
  } else if (_.isPlainObject(specificContent)) {
    logger.debug(
      'getInheritedTemplateContent',
      `为子节点 "${key}" 只找到特异性内容: ${JSON.stringify(specificContent)}`,
    );
    return specificContent;
  } else if (_.isPlainObject(prototypeContent)) {
    logger.debug(
      'getInheritedTemplateContent',
      `为子节点 "${key}" 只找到原型内容: ${JSON.stringify(prototypeContent)}`,
    );
    return prototypeContent;
  }

  logger.debug('getInheritedTemplateContent', `在父级模板内容中未为子节点 "${key}" 找到任何可继承的规则。`);
  return undefined;
}

/**
 * **【应用模板内容到补丁】**
 *
 * 将一个“模板内容”对象应用到一个“补丁”对象上，作为其默认值。
 *
 * @param tplContent - 当前层级合并后的模板内容。
 * @param patchObj - 要应用模板的补丁数据。
 * @param logger - 日志记录器实例。
 * @returns {any} - 应用了模板默认值之后，最终合成的数据对象。
 */
export function applyTemplateToPatch(tplContent: any, patchObj: any, logger: Logger): any {
  logger.debug(
    'applyTemplateToPatch',
    `[进入] 模板内容: ${JSON.stringify(tplContent)}, 补丁: ${JSON.stringify(patchObj)}`,
  );

  if (!_.isPlainObject(patchObj)) {
    logger.debug('applyTemplateToPatch', `[退出] 补丁不是一个普通对象，直接返回。`);
    return patchObj;
  }
  if (!tplContent) {
    logger.debug('applyTemplateToPatch', `[退出] 模板内容无效，直接返回补丁。`);
    return patchObj;
  }

  // 如果补丁是空对象，直接使用模板内容
  if (_.isEmpty(patchObj)) {
    logger.debug('applyTemplateToPatch', `补丁为空对象，完全使用模板内容。`);
    return _.cloneDeep(tplContent);
  }

  // 如果补丁非空，将模板内容作为默认值与补丁合并
  const composed = mergeReplaceArray(_.cloneDeep(tplContent), patchObj);
  logger.debug('applyTemplateToPatch', `合并模板与补丁后的结果: ${JSON.stringify(composed)}`);
  return composed;
}

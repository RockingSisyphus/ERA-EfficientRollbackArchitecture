import { ensureCharacterRegex } from '../../utils/regex';
import { HIDE_ERA_DATA_REGEX } from './regex_objects/hide_era_data';
import { REPLACE_PLACEHOLDER_REGEX } from './regex_objects/replace_placeholder';

/**
 * @file 手动初始化模块 - 正则表达式
 * @description 该模块负责在需要时手动触发 ERA 框架相关的正则表达式的初始化。
 */

/**
 * 初始化 ERA 框架所需的所有角色卡级别的正则表达式。
 * 目前主要是注入用于隐藏 ERA 数据标签的正则。
 */
export async function initEraCharacterRegexes() {
  await ensureCharacterRegex(HIDE_ERA_DATA_REGEX);
  await ensureCharacterRegex(REPLACE_PLACEHOLDER_REGEX);
}

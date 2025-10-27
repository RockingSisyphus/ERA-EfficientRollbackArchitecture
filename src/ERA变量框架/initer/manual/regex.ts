import { initEraCharacterRegexes } from '../../utils/regex';

/**
 * @file 手动初始化模块 - 正则表达式
 * @description 该模块负责在需要时手动触发 ERA 框架相关的正则表达式的初始化。
 */

/**
 * 手动初始化所有 ERA 相关的角色卡级别正则表达式。
 * 这通常用于调试或在特定时机确保正则规则被正确应用。
 */
export function manualInitRegexes() {
  initEraCharacterRegexes();
}

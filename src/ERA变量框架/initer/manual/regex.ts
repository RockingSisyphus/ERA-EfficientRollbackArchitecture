import { ensureCharacterRegex } from '../../utils/regex';
import { HIDE_ERA_DATA_REGEX } from './regex_objects/hide_era_data';
import { REPLACE_PLACEHOLDER_REGEX } from './regex_objects/replace_placeholder';
import { Logger } from '../../utils/log';

const logger = new Logger();

/**
 * @file 手动初始化模块 - 正则表达式
 * @description 该模块负责在需要时手动触发 ERA 框架相关的正则表达式的初始化。
 */

type InitRegexResult = {
  success: boolean;
  reason?: string;
  details: {
    regexName: string;
    status: 'injected' | 'exists' | 'failed' | 'skipped';
    reason?: string;
  }[];
};

/**
 * 初始化 ERA 框架所需的所有角色卡级别的正则表达式。
 * @returns {Promise<InitRegexResult>} 返回一个包含详细操作结果的对象。
 */
export async function initEraCharacterRegexes(): Promise<InitRegexResult> {
  if (!isCharacterTavernRegexesEnabled()) {
    const reason = '当前角色卡未开启局部正则，请先在角色卡设置中启用。';
    logger.warn('initEraCharacterRegexes', reason);
    return { success: false, reason, details: [] };
  }

  const regexesToInject = [HIDE_ERA_DATA_REGEX, REPLACE_PLACEHOLDER_REGEX];
  const results = [];
  let allSuccess = true;

  for (const regex of regexesToInject) {
    const result = await ensureCharacterRegex(regex);
    results.push({
      regexName: regex.script_name,
      status: result.status,
      reason: result.reason,
    });
    if (!result.success) {
      allSuccess = false;
    }
  }

  return { success: allSuccess, details: results };
}

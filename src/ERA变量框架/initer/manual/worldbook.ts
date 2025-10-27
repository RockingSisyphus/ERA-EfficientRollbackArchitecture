import { createAndBindPrimaryWorldbook, injectEntryToWorldbook } from '../../utils/worldbook';
import { Logger } from '../../utils/log';
import { eraVarOperationRuleEntry } from './worldbook_entries/era_var_operation_rule';
import { eraVarIntentEntry } from './worldbook_entries/era_var_intent';

const logger = new Logger();

type InitWorldbookResult = {
  success: boolean;
  reason?: string;
  details: {
    entryName: string;
    status: 'injected' | 'exists' | 'failed';
    reason?: string;
  }[];
};

/**
 * 初始化世界书，确保 ERA 相关条目存在于主世界书中。
 * @returns {Promise<InitWorldbookResult>} 返回一个包含详细操作结果的对象。
 */
export async function initEraWorldbookEntries(): Promise<InitWorldbookResult> {
  const funcName = 'initEraWorldbookEntries';
  logger.log(funcName, '开始世界书初始化...');

  let charWorldbooks = await getCharWorldbookNames('current');
  let primaryWorldbook = charWorldbooks.primary;

  if (!primaryWorldbook) {
    logger.warn(funcName, '当前角色卡未绑定主世界书，将创建并绑定一个新的世界书。');
    try {
      primaryWorldbook = await createAndBindPrimaryWorldbook();
    } catch (error) {
      const reason = '创建并绑定主世界书失败。';
      logger.error(funcName, reason, error);
      return { success: false, reason, details: [] };
    }
  } else {
    logger.log(funcName, `找到主世界书: 「${primaryWorldbook}」`);
  }

  const entriesToInject = [eraVarOperationRuleEntry, eraVarIntentEntry];
  const results = [];
  let allSuccess = true;

  for (const entry of entriesToInject) {
    if (!entry.name) {
      logger.warn(funcName, '发现一个没有名称的世界书条目，已跳过。', entry);
      continue;
    }
    const result = await injectEntryToWorldbook(primaryWorldbook, entry);
    results.push({
      entryName: entry.name,
      status: result.status,
      reason: result.reason,
    });
    if (!result.success) {
      allSuccess = false;
    }
  }

  logger.log(funcName, '世界书初始化完成。');
  return { success: allSuccess, details: results };
}

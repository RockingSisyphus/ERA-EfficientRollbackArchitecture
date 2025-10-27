import { createAndBindPrimaryWorldbook, injectEntryToWorldbook } from '../../utils/worldbook';
import { Logger } from '../../utils/log';
import { eraVarOperationRuleEntry } from './worldbook_entries/era_var_operation_rule';
import { eraVarIntentEntry } from './worldbook_entries/era_var_intent';

const logger = new Logger();

/**
 * 初始化世界书，确保'ERA 变量操作规则'存在于主世界书中
 */
export async function initWorldbook() {
  const funcName = 'initWorldbook';
  logger.log(funcName, '开始世界书初始化...');

  let charWorldbooks = await getCharWorldbookNames('current');
  let primaryWorldbook = charWorldbooks.primary;

  if (!primaryWorldbook) {
    logger.warn(funcName, '当前角色卡未绑定主世界书，将创建并绑定一个新的世界书。');
    primaryWorldbook = await createAndBindPrimaryWorldbook();
  } else {
    logger.log(funcName, `找到主世界书: 「${primaryWorldbook}」`);
  }

  await injectEntryToWorldbook(primaryWorldbook, eraVarOperationRuleEntry);
  await injectEntryToWorldbook(primaryWorldbook, eraVarIntentEntry);

  logger.log(funcName, '世界书初始化完成。');
}

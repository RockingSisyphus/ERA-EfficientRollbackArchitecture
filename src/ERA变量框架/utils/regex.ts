import { Logger } from './log';

const logger = new Logger();

/**
 * @file ERA 变量框架 - 正则表达式工具模块
 * @description 提供用于管理和同步酒馆正则表达式的实用函数。
 */

/**
 * 确保指定的正则表达式存在于当前角色的局部正则列表中。
 * 如果不存在，则会创建一个新的并添加到列表的末尾。
 *
 * @param regexData 一个不包含 `id` 和 `scope` 的 `TavernRegex` 对象。
 * 函数将根据 `script_name` 来检查正则是否存在。
 */
export async function ensureCharacterRegex(regexData: Omit<TavernRegex, 'id' | 'scope'>) {
  if (!isCharacterTavernRegexesEnabled()) {
    logger.log('ensureCharacterRegex', '局部正则未启用，跳过注入。');
    return;
  }

  const characterRegexes = getTavernRegexes({ scope: 'character' });
  const isAlreadyExists = characterRegexes.some(regex => regex.script_name === regexData.script_name);

  if (isAlreadyExists) {
    logger.log('ensureCharacterRegex', `名为 "${regexData.script_name}" 的正则已存在，无需注入。`);
    return;
  }

  logger.log('ensureCharacterRegex', `未找到名为 "${regexData.script_name}" 的正则，正在注入...`);
  await updateTavernRegexesWith(
    regexes => {
      // 在末尾添加新的正则表达式
      regexes.push({
        ...regexData,
        id: '', // id 会由酒馆自动生成
        scope: 'character',
      });
      return regexes;
    },
    { scope: 'character' },
  );
  logger.log('ensureCharacterRegex', '正则注入成功。');
}

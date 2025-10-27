import _ from 'lodash';
import type { PartialDeep } from 'type-fest';
import { Logger } from './log';

const logger = new Logger();

/**
 * 获取当前角色卡绑定的所有世界书名称
 * @returns 包含主世界书和附加世界书的数组
 */
export async function getBoundWorldbookNames(): Promise<string[]> {
  const funcName = 'getBoundWorldbookNames';
  logger.debug(funcName, '开始获取角色卡绑定的世界书...');
  const charWorldbooks = await getCharWorldbookNames('current');
  const worldbooks = [];
  if (charWorldbooks.primary) {
    worldbooks.push(charWorldbooks.primary);
  }
  worldbooks.push(...charWorldbooks.additional);
  const uniqueWorldbooks = _.uniq(worldbooks);
  logger.debug(funcName, '获取成功，绑定的世界书列表为：', uniqueWorldbooks);
  return uniqueWorldbooks;
}

/**
 * 检查指定名称的条目是否存在于某个世界书中
 * @param worldbookName - 世界书的名称
 * @param entryName - 要检查的条目的名称
 * @returns 如果存在则返回 true，否则返回 false
 */
export async function isEntryInWorldbook(worldbookName: string, entryName: string): Promise<boolean> {
  const funcName = 'isEntryInWorldbook';
  try {
    logger.debug(funcName, `正在检查世界书「${worldbookName}」中是否存在条目「${entryName}」...`);
    const entries = await getWorldbook(worldbookName);
    const exists = entries.some(entry => entry.name === entryName);
    logger.debug(funcName, `检查完成，世界书「${worldbookName}」中${exists ? '存在' : '不存在'}条目「${entryName}」。`);
    return exists;
  } catch (error) {
    logger.error(funcName, `获取世界书「${worldbookName}」时发生错误。`, error);
    return false;
  }
}

type InjectionResult = {
  success: boolean;
  status: 'injected' | 'exists' | 'failed';
  reason?: string;
};

/**
 * 向世界书注入一个新条目，如果同名条目已存在则不执行任何操作
 * @param worldbookName - 世界书的名称
 * @param newEntry - 要注入的新条目
 * @returns 一个包含操作结果的对象
 */
export async function injectEntryToWorldbook(
  worldbookName: string,
  newEntry: PartialDeep<WorldbookEntry>,
): Promise<InjectionResult> {
  const funcName = 'injectEntryToWorldbook';
  if (!newEntry.name) {
    const reason = '注入失败：新条目必须包含 name 字段。';
    logger.error(funcName, reason);
    return { success: false, status: 'failed', reason };
  }

  const entryExists = await isEntryInWorldbook(worldbookName, newEntry.name);
  if (entryExists) {
    logger.log(funcName, `条目「${newEntry.name}」已存在于世界书「${worldbookName}」中，无需注入。`);
    return { success: true, status: 'exists' };
  }

  try {
    logger.log(funcName, `正在向世界书「${worldbookName}」注入新条目「${newEntry.name}」...`);
    await createWorldbookEntries(worldbookName, [newEntry]);
    logger.log(funcName, `成功向世界书「${worldbookName}」注入新条目「${newEntry.name}」。`);
    return { success: true, status: 'injected' };
  } catch (error) {
    const reason = `向世界书「${worldbookName}」注入条目「${newEntry.name}」时发生错误。`;
    logger.error(funcName, reason, error);
    return { success: false, status: 'failed', reason };
  }
}

/**
 * 创建一个新的世界书并将其设置为主世界书
 * @returns 新创建的世界书的名称
 */
export async function createAndBindPrimaryWorldbook(): Promise<string> {
  const funcName = 'createAndBindPrimaryWorldbook';
  const worldbookName = 'ERA卡示例世界书';
  logger.log(funcName, `正在创建新的世界书「${worldbookName}」...`);
  await createWorldbook(worldbookName);

  const charWorldbooks = await getCharWorldbookNames('current');
  charWorldbooks.primary = worldbookName;

  logger.log(funcName, `正在将新世界书「${worldbookName}」绑定为当前角色卡的主世界书...`);
  await rebindCharWorldbooks('current', charWorldbooks);

  logger.log(funcName, '创建并绑定成功。');
  return worldbookName;
}

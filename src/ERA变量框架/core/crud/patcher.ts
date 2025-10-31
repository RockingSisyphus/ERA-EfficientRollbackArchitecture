/**
 * @file ERA 变量框架 - 变量写入模块
 * @description
 * 该模块是 ERA 框架的“执行引擎”，负责将消息内容中的变量修改指令应用到实际的 `chat` 变量中。
 *
 * **设计理念**:
 * 变量的写入是一个严谨的过程，必须确保所有变更都被正确记录，以便后续的回滚和同步。
 * 此模块的核心职责是：
 * 1. **解析指令**: 从 AI 消息中提取 `<VariableInsert>` 和 `<VariableEdit>` 块。
 * 2. **顺序执行**: 确保同一消息内的多个指令块按顺序执行，且后续指令能感知到前面指令的结果。
 * 3. **生成日志**: 在应用变更的同时，调用 `recursive.ts` 中的递归函数来生成精确的 `EditLog`。
 * 4. **覆盖式日志写入**: 确保每个消息密钥（MK）对应的 `EditLog` 严格反映其当前内容，
 *    即使内容中没有任何指令（此时会写入空日志），也要覆盖旧日志，这是防止 `swipe` 造成数据污染的关键。
 *
 * **职责边界**:
 * - 本模块**只负责读取 MK**，不负责创建。创建 MK 的职责由上游的 `message_key.ts` 承担。
 * - `ApplyVarChangeForMessage` 函数**只负责写入变量和 `EditLog`**，不负责更新 `SelectedMks`。
 *   更新 `SelectedMks` 的职责被移交给了更上层的调用者（如 `ApplyVarChange` 或同步函数），
 *   以避免在同步循环中修改正在被读取的状态，这是一种重要的并发控制策略。
 */

'use strict';

import { readMessageKey } from '../../core/key/mk';
import { EraConfig, LOGS_PATH, SEL_PATH } from '../../utils/constants';
import { parseEditLog } from '../../utils/data';
import { getEraData, updateEraMetaData, updateEraStatData } from '../../utils/era_data';
import { Logger } from '../../utils/log';
import { extractAndParseCommands, findLastAiMessage, isUserMessage } from '../../utils/message';
import { processDeleteBlocks } from './delete';
import { processInsertBlocks } from './insert/insert';
import { processEditBlocks } from './update';

const logger = new Logger();

/**
 * **【核心计算函数 - 纯粹】**
 *
 * **设计理念**:
 * 这是一个纯函数，是整个变量修改流程的计算核心。它遵循“输入决定输出”的原则，不执行任何读写全局状态的副作用。
 * 它的职责非常单一：接收一条消息和当前的状态，然后计算出这条消息会如何改变这个状态，并返回最终结果。
 *
 * **调用者职责**:
 * 调用此函数的外部代码（如 `ApplyVarChange` 或 `resyncStateOnHistoryChange`）必须负责：
 * 1. **准备输入**: 在调用前，获取有效的消息对象 `msg`、初始状态 `initialStat` 和元数据 `meta`。
 * 2. **处理输出**: 接收函数返回的 `{ finalStat, finalEditLog }`，并负责将这些结果写入到全局状态中
 *    （例如，通过 `updateEraStatData` 和 `updateEraMetaData`）。
 *
 * @param {any} msg - 要处理的酒馆消息对象。
 * @param {any} initialStat - 操作开始前的 `stat_data`。
 * @param {any} meta - 包含 `EditLogs` 和 `SelectedMks` 的元数据对象。
 * @returns {Promise<{ finalStat: any; finalEditLog: any[] }>} 返回计算出的最终状态和为该消息生成的 EditLog。
 */
export const ApplyVarChangeForMessage = async (
  msg: any,
  initialStat: any,
  meta: any,
  config: Partial<EraConfig> = {},
): Promise<{ finalStat: any; finalEditLog: any[]; mk: string | null }> => {
  logger.debug('ApplyVarChangeForMessage (Pure)', `开始计算消息 (ID: ${msg.message_id})...`);
  const mk = readMessageKey(msg);
  try {
    // 1. 从消息中提取、解析并转义所有指令。
    const { allInserts, allEdits, allDeletes } = extractAndParseCommands(msg, config.繁体转简体);

    // --- 纯函数处理流水线：insert -> edit -> delete ---

    // 2. 处理插入操作
    const { finalStat: statAfterInsert, editLog: insertLog } = await processInsertBlocks(allInserts, initialStat);

    // 3. 处理编辑操作
    const { finalStat: statAfterEdit, editLog: editBlockLog } = await processEditBlocks(
      allEdits,
      msg.message_id,
      statAfterInsert,
      meta,
    );

    // 4. 处理删除操作
    const { finalStat: statAfterDelete, editLog: deleteLog } = await processDeleteBlocks(allDeletes, statAfterEdit);

    // 5. 合并所有日志
    const finalEditLog = [...(insertLog || []), ...(editBlockLog || []), ...(deleteLog || [])];

    // 6. 返回计算结果
    return { finalStat: statAfterDelete, finalEditLog, mk };
  } catch (err: any) {
    logger.error('ApplyVarChangeForMessage (Pure)', `变量计算异常: ${err?.message || err}`, {
      error: err,
      message: msg,
      initialStat,
      meta,
    });
    // 在异常情况下，返回未修改的初始状态和空日志，以防止破坏后续流程。
    return { finalStat: initialStat, finalEditLog: [], mk };
  }
};

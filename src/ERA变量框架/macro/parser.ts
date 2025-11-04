import { ERA_EVENT_EMITTER, type WriteDonePayload } from '../utils/constants';
import { unescapeEraData } from '../utils/data';
import { getEraData, removeMetaFields } from '../utils/era_data';
import { Logger } from '../utils/log';
import { getStatAtMK } from '../core/snapshot';
import { readMessageKey } from '../core/key/mk';

const logger = new Logger('MacroParser');

/**
 * 解析字符串中的 ERA 宏, 并将其替换为对应的变量值。
 * 这是提供给其他模块调用的公共接口。
 * @param text - 包含宏的输入字符串。
 * @param stat_data - 可选的，用于宏替换的特定变量快照。如果未提供，则使用最新的全局状态。
 * @returns - 替换宏后的字符串。
 */
export function parseEraMacros(text: string, stat_data?: object | null): string {
  const macroRegex = /{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi;

  // 如果文本中不包含宏特征字符串, 直接返回以优化性能
  if (!text.includes('{{ERA')) {
    return text;
  }

  // 优先使用传入的 stat_data，否则获取最新的全局 stat
  const stat = stat_data ?? getEraData().stat;

  logger.debug('parseEraMacros', 'ERA宏模块，获取到用于替换的stat', stat);
  if (!stat) {
    logger.warn('parseEraMacros', '无法获取到 stat_data, 宏替换失败.');
    // 如果没有 stat_data, 任何宏都无法解析, 直接返回原文本
    return text;
  }

  return text.replace(macroRegex, (substring, withMeta, path) => {
    const funcName = 'parseEraMacros';
    const trimmedPath = path.trim();
    const includeMeta = !!withMeta;

    let data;
    if (trimmedPath === '$ALLDATA') {
      data = stat;
    } else {
      data = _.get(stat, trimmedPath);
    }

    if (data === undefined) {
      logger.warn(funcName, `在 stat_data 中未找到路径 "${trimmedPath}", 宏将替换为空字符串.`);
      return ''; // 路径未找到, 返回空字符串
    }

    // 根据 withMeta 标志决定是否移除 $meta 字段
    const dataBeforeUnescape = includeMeta ? data : removeMetaFields(data);

    // 在返回数据前进行反转义
    const finalData = unescapeEraData(dataBeforeUnescape);

    logger.debug('parseEraMacros', `宏替换数据反转义: ${trimmedPath}`, {
      before: dataBeforeUnescape,
      after: finalData,
    });

    // 如果是对象或数组, 转换为 JSON 字符串
    if (typeof finalData === 'object' && finalData !== null) {
      return JSON.stringify(finalData);
    }

    // 如果是原始类型, 直接转换为字符串
    return String(finalData);
  });
}

/**
 * 定义 `era:writeDone` 事件的处理函数。
 * 该函数会获取指定消息楼层的当前 HTML 内容，并重新解析其中的 ERA 宏。
 * @param payload - `era:writeDone` 事件的负载。
 */
const handleWriteDone = (payload: WriteDonePayload) => {
  // 在滑动回退操作后，不应触发宏的重新渲染，因为此时的消息内容是临时的。
  if (payload.actions.swipedRollback) {
    logger.debug('handleWriteDone', '检测到 swipedRollback，跳过宏刷新。');
    return;
  }

  const { message_id } = payload;

  if (typeof message_id !== 'number') {
    logger.warn('handleWriteDone', 'Event payload did not provide a valid message_id.');
    return;
  }

  try {
    const $messageDiv = retrieveDisplayedMessage(message_id);
    if (!$messageDiv.length) {
      // 消息可能不在当前可视区域内，这是正常情况，无需警告
      return;
    }

    const currentHtml = $messageDiv.html();

    // 如果当前 HTML 中不包含宏，则无需重新渲染
    if (!currentHtml.includes('{{ERA')) {
      return;
    }

    // 直接在当前已渲染的 HTML 上解析 ERA 宏
    const newHtml = parseEraMacros(currentHtml);

    // 仅当内容发生变化时才更新 DOM，以避免不必要的重绘
    if (newHtml !== currentHtml) {
      $messageDiv.html(newHtml);
      logger.debug('handleWriteDone', `Successfully re-rendered macros for message_id: ${message_id}`);
    }
  } catch (error) {
    logger.error('handleWriteDone', `Failed to re-render macros for message_id: ${message_id}`, error);
  }
};

/**
 * 设置一个监听器，用于在 `era:writeDone` 事件触发时自动刷新消息中的宏。
 */
function setupMacroAutoRefresh() {
  eventOn(ERA_EVENT_EMITTER.WRITE_DONE, handleWriteDone);
  logger.log('setupMacroAutoRefresh', '监听到writeDone,开始对消息中的宏进行替换.');
}

/**
 * 移除宏自动刷新监听器，用于清理。
 */
function removeMacroAutoRefresh() {
  eventRemoveListener(ERA_EVENT_EMITTER.WRITE_DONE, handleWriteDone);
  logger.log('removeMacroAutoRefresh', 'Macro auto-refresh listener has been removed.');
}

/**
 * 在发送到 AI 的数据准备好后，处理其中的 ERA 宏。
 * @param generate_data - 包含提示词的对象。
 * @param dry_run - 是否为演习运行。
 */
const handleGenerateAfterData = (
  generate_data: { prompt: SillyTavern.SendingMessage[] },
  dry_run: boolean,
) => {
  if (dry_run) {
    return;
  }

  // 1. 使用正确的 API 获取最后一条用户消息
  const userMessages = getChatMessages('0-{{lastMessageId}}', { role: 'user' });
  if (userMessages.length === 0) {
    logger.warn('handleGenerateAfterData', '未找到任何用户消息，无法确定宏替换的上下文，跳过。');
    return;
  }
  const lastUserMessage = userMessages[userMessages.length - 1];

  // 2. 获取该消息的快照
  const mk = readMessageKey(lastUserMessage);
  if (!mk) {
    logger.warn(
      'handleGenerateAfterData',
      `最后一条用户消息 (ID: ${lastUserMessage.message_id}) 没有有效的 MK，无法获取快照，跳过。`,
    );
    return;
  }

  const statSnapshot = getStatAtMK(mk);
  if (!statSnapshot) {
    logger.warn(
      'handleGenerateAfterData',
      `无法为 MK "${mk}" 获取变量快照，跳过宏替换。`,
    );
    return;
  }

  logger.debug('handleGenerateAfterData', '成功获取到基于最后一条用户消息的变量快照，准备替换宏。', {
    message_id: lastUserMessage.message_id,
    mk,
  });

  // 3. 使用快照替换所有消息中的宏
  for (const message of generate_data.prompt) {
    if (typeof message.content === 'string' && message.content.includes('{{ERA')) {
      const originalContent = message.content;
      message.content = parseEraMacros(originalContent, statSnapshot);
      if (originalContent !== message.content) {
        logger.log('handleGenerateAfterData', `成功替换了 role: ${message.role} 消息中的 ERA 宏。`);
      }
    }
  }
};

$(() => {
  /**
   * 注册 ERA 宏, 用于在发送给 AI 的消息中查询当前聊天的变量数据。
   * 根据用户需求，此宏仅在处理系统提示词（`role: 'system'`）时生效。
   *
   * - `{{ERA:path.to.data}}`: 查询并替换为**不含** `$meta` 的纯净数据。
   * - `{{ERA-withmeta:path.to.data}}`: 查询并替换为**包含** `$meta` 的原始数据。
   */
  /*
  registerMacroLike(/{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi, (context, substring) => {
    // 只在宏的上下文角色为 'system' 时才进行解析。
    // 这确保了宏只在构建系统提示词（如世界书、角色卡设定等）时被替换。
    if (context.role === 'system') {
      logger.debug('registerMacroLike', '在系统提示词 (role=system) 中解析ERA宏', { substring });
      return parseEraMacros(substring);
    }

    // 对于其他角色（如 'user', 'assistant'）或角色未定义的情况，
    // 不解析宏，直接返回原始宏字符串。
    // 聊天消息中显示的宏将由 `handleWriteDone` 事件监听器负责刷新。
    return substring;
  });
  */

  // 监听 `GENERATE_AFTER_DATA` 事件，在提示词发送前处理 ERA 宏
  eventOn(tavern_events.GENERATE_AFTER_DATA, handleGenerateAfterData);

  // 设置宏自动刷新监听器
  setupMacroAutoRefresh();

  // 在卸载时清理监听器。虽然酒馆助手会自动清理，但显式移除是好习惯。
  $(window).on('pagehide', () => {
    removeMacroAutoRefresh();
    eventRemoveListener(tavern_events.GENERATE_AFTER_DATA, handleGenerateAfterData);
  });
});

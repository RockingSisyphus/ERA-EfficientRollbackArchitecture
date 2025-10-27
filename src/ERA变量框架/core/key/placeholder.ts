'use strict';

import { getScriptSettings } from '../../utils/era_data';

/**
 * @file ERA 变量框架 - 状态占位符管理
 * @description 负责确保消息中存在用于渲染状态UI的占位符。
 */

/**
 * 确保消息内容中存在状态占位符。
 * 如果设置中 "在ai消息尾部生成特殊符号" 为 true，且占位符不存在，则会将其附加到内容的末尾。
 * 占位符的内容由设置中的 "特殊符号值" 决定。
 *
 * @param {string} content - 原始消息内容。
 * @returns {string} - 可能包含状态占位符的消息内容。
 */
export function ensureStatusPlaceholder(content: string): string {
  const settings = getScriptSettings();

  if (!settings.在ai消息尾部生成特殊符号) {
    return content;
  }

  const placeholder = settings.特殊符号值;

  if (typeof content !== 'string') {
    // 对于非字符串输入，直接返回占位符
    return placeholder;
  }

  if (content.includes(placeholder)) {
    return content;
  }

  // 在末尾添加占位符，并用换行符隔开以保持格式清晰
  return content.trimEnd() + '\n' + placeholder;
}

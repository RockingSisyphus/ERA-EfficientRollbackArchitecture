'use strict';

/**
 * @file ERA 变量框架 - 状态占位符管理
 * @description 负责确保消息中存在用于渲染状态UI的占位符。
 */

/**
 * 状态占位符的 HTML 标签。
 * @constant {string}
 */
export const STATUS_PLACEHOLDER_TAG = '<StatusPlaceHolderImpl/>';

/**
 * 确保消息内容中存在状态占位符 `<StatusPlaceHolderImpl/>`。
 * 如果占位符不存在，则会将其附加到内容的末尾。
 *
 * @param {string} content - 原始消息内容。
 * @returns {string} - 包含状态占位符的消息内容。
 */
export function ensureStatusPlaceholder(content: string): string {
  if (typeof content !== 'string') {
    // 对于非字符串输入，可以选择返回一个默认值或空字符串
    return STATUS_PLACEHOLDER_TAG;
  }

  if (content.includes(STATUS_PLACEHOLDER_TAG)) {
    return content;
  }

  // 在末尾添加占位符，并用换行符隔开以保持格式清晰
  return content.trimEnd() + '\n' + STATUS_PLACEHOLDER_TAG;
}

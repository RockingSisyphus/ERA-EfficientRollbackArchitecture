/**
 * @file ERA 变量框架 - 字符串处理模块
 */

'use strict';

import { Converter } from 'opencc-js';

/**
 * 生成一个指定长度的随机字符串，用作唯一标识符。
 * @returns {string} 一个随机的、由数字和小写字母组成的字符串。
 */
export function rnd(): string {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * 从字符串中移除 AI 生成的 Markdown 代码块围栏（如 ```json ... ```）。
 * @param {string} s - 待处理的字符串。
 * @returns {string} 移除围栏并修剪首尾空格后的字符串。
 */
export function stripCodeFence(s: string): string {
  if (!s) return s;
  let t = String(s).trim();
  t = t.replace(/^\s*(?:```|~~~)\[a-zA-Z0-9_-\]*\s*\r?\n/, '');
  t = t.replace(/\r?\n(?:```|~~~)\s*$/, '');
  return t.trim();
}

export type TagMatchMode = 'exact' | 'prefix' | 'suffix' | 'contains' | 'any';

/**
 * 辅助函数：根据关键字和模式创建用于匹配标签名的正则表达式。
 * @param {string} [keyword=''] - 标签关键字。
 * @param {TagMatchMode} [mode='exact'] - 匹配模式。
 * @returns {RegExp} 生成的正则表达式。
 */
export function createTagRegex(keyword: string = '', mode: TagMatchMode = 'exact'): RegExp {
  if (mode === 'any' || keyword === '*') {
    return /([a-zA-Z][a-zA-Z0-9_]*)/;
  }
  // 对 keyword 进行转义，防止特殊字符影响正则
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  switch (mode) {
    case 'exact':
      return new RegExp(`(${escapedKeyword})`);
    case 'prefix':
      return new RegExp(`(${escapedKeyword}[a-zA-Z0-9_]*)`);
    case 'suffix':
      return new RegExp(`([a-zA-Z0-9_]*${escapedKeyword})`);
    case 'contains':
    default:
      return new RegExp(`([a-zA-Z0-9_]*${escapedKeyword}[a-zA-Z0-9_]*)`);
  }
}

/**
 * 核心函数：从文本尾部开始，使用正则表达式反向查找第一个完整闭合的标签。
 * @param {string} text - 原始文本。
 * @param {RegExp} tagNameRegex - 用于匹配标签名的正则表达式，必须包含一个捕获组。
 * @param {number} [endIndex=text.length] - 开始搜索的位置。
 * @returns {{startIndex: number, endIndex: number, content: string, tagName: string} | null} 包含起止索引、内容和完整标签名的对象，或 null。
 */
function findTagFromEndByRegex(
  text: string,
  tagNameRegex: RegExp,
  endIndex: number = text.length,
): { startIndex: number; endIndex: number; content: string; tagName: string } | null {
  const closeTagRegex = new RegExp(`</${tagNameRegex.source}>`, 'g');
  let lastMatch = null;
  let currentMatch;

  // 1. 找到最后一个在 endIndex 之前的闭合标签
  while ((currentMatch = closeTagRegex.exec(text)) !== null) {
    if (currentMatch.index < endIndex) {
      lastMatch = currentMatch;
    } else {
      break;
    }
  }

  if (!lastMatch) {
    return null;
  }

  const tagName = lastMatch[1];
  const closeIndex = lastMatch.index;

  // 2. 用找到的完整标签名，反向查找对应的开标签
  const openTag = `<${tagName}>`;
  const openIndex = text.lastIndexOf(openTag, closeIndex);

  if (openIndex === -1) {
    // 如果找不到匹配的开标签，则从这个闭合标签前继续递归搜索
    return findTagFromEndByRegex(text, tagNameRegex, closeIndex);
  }

  return {
    startIndex: openIndex,
    endIndex: closeIndex + `</${tagName}>`.length,
    content: text.substring(openIndex + openTag.length, closeIndex),
    tagName: tagName,
  };
}

/**
 * 从文本中移除指定的 XML 标签及其内容，支持正则匹配。
 * @param {string} text - 原始文本。
 * @param {RegExp} tagNameRegex - 用于匹配要移除的标签名的正则表达式。
 * @returns {string} 移除标签后的文本。
 */
export function removeTagsByRegex(text: string, tagNameRegex: RegExp): string {
  let processedText = text;
  while (true) {
    const found = findTagFromEndByRegex(processedText, tagNameRegex);
    if (!found) {
      break;
    }
    processedText = processedText.slice(0, found.startIndex) + processedText.slice(found.endIndex);
  }
  return processedText;
}

/**
 * 检查字符串中是否包含 XML 风格的标签，支持正则匹配。
 * @param {string} text - 要检查的字符串。
 * @param {RegExp} [tagNameRegex] - 用于匹配标签名的正则表达式。如果未提供，则检查任何标签。
 * @returns {boolean} 如果包含则返回 true，否则返回 false。
 */
export function containsXMLTags(text: string, tagNameRegex?: RegExp): boolean {
  if (!text) {
    return false;
  }

  const tagRegex = tagNameRegex ? new RegExp(`</?${tagNameRegex.source}>`) : /<\/?\s*[a-zA-Z][a-zA-Z0-9_]*\s*>/;

  let inSingleQuote = false;
  let inDoubleQuote = false;
  let backslashRun = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === '\\') {
      backslashRun += 1;
      continue;
    }

    const isEscaped = backslashRun % 2 === 1;
    backslashRun = 0;

    if (ch === '"' && !isEscaped && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (ch === "'" && !isEscaped && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (ch === '<' && !isEscaped && !inSingleQuote && !inDoubleQuote) {
      let j = i + 1;
      let innerSingleQuote = false;
      let innerDoubleQuote = false;
      let innerBackslashRun = 0;

      for (; j < text.length; j++) {
        const innerCh = text[j];

        if (innerCh === '\\') {
          innerBackslashRun += 1;
          continue;
        }

        const innerEscaped = innerBackslashRun % 2 === 1;
        innerBackslashRun = 0;

        if (innerCh === '"' && !innerEscaped && !innerSingleQuote) {
          innerDoubleQuote = !innerDoubleQuote;
          continue;
        }

        if (innerCh === "'" && !innerEscaped && !innerDoubleQuote) {
          innerSingleQuote = !innerSingleQuote;
          continue;
        }

        if (innerCh === '>' && !innerEscaped && !innerSingleQuote && !innerDoubleQuote) {
          const rawTag = text.slice(i, j + 1);
          if (tagRegex.test(rawTag)) {
            return true;
          }
          break;
        }
      }

      i = j;
      backslashRun = 0;
    }
  }

  return false;
}

/**
 * 从文本尾部开始，反向提取所有被特定 XML 风格标签包裹的、完整闭合的内容块，支持正则匹配。
 * @param {string} text - 包含标签的原始文本。
 * @param {RegExp} tagNameRegex - 用于匹配要提取的标签名的正则表达式。
 * @returns {string[]} 包含所有提取内容的数组，顺序与在文本中出现的顺序一致。
 */
export function extractBlocksByRegex(text: string, tagNameRegex: RegExp): string[] {
  const blocks: string[] = [];
  let searchIndex = text.length;

  while (searchIndex > 0) {
    const found = findTagFromEndByRegex(text, tagNameRegex, searchIndex);
    if (!found) {
      break;
    }
    blocks.unshift(found.content); // 保持原始顺序
    searchIndex = found.startIndex;
  }

  return blocks;
}

/**
 * 从文本中安全地提取所有有效、闭合的特定标签内容块。
 * 这是推荐使用的主要提取函数。
 *
 * @param {string} text - 包含标签的原始文本。
 * @param {RegExp} targetTagNameRegex - 用于匹配目标标签名的正则表达式。
 * @param {boolean} [toSimplified=false] - 是否将提取的内容转换为简体中文。
 * @returns {string[]} 包含所有有效内容块的数组。
 */
export function extractValidBlocks(text: string, targetTagNameRegex: RegExp, toSimplified: boolean = false): string[] {
  // 1. 预处理：移除所有包含 "think" 的标签块
  const thinkRegex = createTagRegex('think', 'contains');
  const processedText = removeTagsByRegex(text, thinkRegex);

  // 2. 提取：从尾部开始查找目标 tag，确保标签闭合
  const extracted = extractBlocksByRegex(processedText, targetTagNameRegex);

  const validBlocks: string[] = [];
  for (const block of extracted) {
    // 3. 清理和校验
    const cleanedBlock = stripCodeFence(block.trim());

    // 校验：如果内部还包含任何XML标签，则丢弃
    if (containsXMLTags(cleanedBlock)) {
      continue;
    }

    if (cleanedBlock) {
      if (toSimplified) {
        const simplifiedBlock = traditionalToSimplified(cleanedBlock);
        validBlocks.push(simplifiedBlock);
      } else {
        validBlocks.push(cleanedBlock);
      }
    }
  }

  return validBlocks;
}

/**
 * 将字符串中的繁体中文字符转换为简体中文。
 * @param {string} text - 待转换的字符串。
 * @returns {string} 转换后的简体中文字符串。
 */
const converter = Converter({ from: 'tw', to: 'cn' });
export function traditionalToSimplified(text: string): string {
  return converter(text);
}

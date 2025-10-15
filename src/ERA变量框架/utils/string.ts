/**
 * @file ERA 变量框架 - 字符串处理模块
 */

'use strict';

/**
 * 生成一个指定长度的随机字符串，用作唯一标识符。
 * 基于 `Math.random()`，在同一毫秒内也能保证极高的唯一性。
 * @returns {string} 一个随机的、由数字和小写字母组成的字符串。
 */
export function rnd(): string {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * 从文本中提取所有被特定 XML 风格标签包裹的内容块。
 * 使用非贪婪模式的正则表达式，但不处理嵌套标签。
 * @param {string} text - 包含标签的原始文本。
 * @param {string} tag - 要提取的标签名称（例如 'VariableEdit'）。
 * @returns {string[]} 包含所有提取并清理后（去除代码围栏和首尾空格）的内容块的数组。
 */
export function extractBlocks(text: string, tag: string): string[] {
  const blocks: string[] = [];
  // 正则表达式: /<tag>([\s\S]*?)<\/tag>/g
  // - <${tag}>: 匹配开标签。
  // - ([\s\S]*?): 非贪婪地捕获开闭标签之间的所有字符（包括换行符）。
  // - <\/${tag}>: 匹配闭标签。
  // - g: 全局匹配，以找到所有匹配项。
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  let m;
  while ((m = re.exec(text))) {
    const rawBody = (m[1] || '').trim();
    // 在存入前，先剥离AI可能生成的多余代码围栏。
    const body = stripCodeFence(rawBody);
    if (body) blocks.push(body);
  }
  return blocks;
}

/**
 * 从字符串中移除 AI 生成的 Markdown 代码块围栏（如 ```json ... ```）。
 * @param {string} s - 待处理的字符串。
 * @returns {string} 移除围栏并修剪首尾空格后的字符串。
 */
export function stripCodeFence(s: string): string {
  if (!s) return s;
  let t = String(s).trim();
  // 移除起始围栏，例如 ```json, ```, ~~~
  t = t.replace(/^\s*(?:```|~~~)\[a-zA-Z0-9_-\]*\s*\r?\n/, '');
  // 移除结束围栏
  t = t.replace(/\r?\n(?:```|~~~)\s*$/, '');
  return t.trim();
}

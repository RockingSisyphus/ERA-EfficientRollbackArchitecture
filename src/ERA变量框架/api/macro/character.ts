/**
 * 解析字符串中的角色和用户宏, 并将其替换为对应的名称。
 * 这是提供给其他模块调用的公共接口。
 * @param text - 包含宏的输入字符串。
 * @returns - 替换宏后的字符串。
 */
export function parseCharacterMacros(text: string): string {
  // 如果文本中不包含宏特征字符串, 直接返回以优化性能
  if (!text.includes('{{')) {
    return text;
  }

  let result = text;
  // 使用全局不区分大小写的替换
  if (result.includes('{{user}}')) {
    result = result.replace(/{{user}}/gi, SillyTavern.name1);
  }
  if (result.includes('{{char}}')) {
    result = result.replace(/{{char}}/gi, SillyTavern.name2);
  }
  return result;
}

/**
 * 深度遍历数据, 对所有字符串类型的值应用 parseCharacterMacros 宏替换。
 * @param data - 任何类型的数据。
 * @returns - 经过宏替换后的数据。
 */
export const deepParseCharacterMacros = (data: any): any => {
  if (typeof data === 'string') {
    return parseCharacterMacros(data);
  }
  if (Array.isArray(data)) {
    return data.map((item) => deepParseCharacterMacros(item));
  }
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = deepParseCharacterMacros(value);
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return data;
};

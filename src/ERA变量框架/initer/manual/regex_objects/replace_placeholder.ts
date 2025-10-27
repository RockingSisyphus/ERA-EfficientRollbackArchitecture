import statusBarHtml from './status_bar.html?raw';

/**
 * 转义 HTML 字符串，以便安全地用于正则表达式的替换字符串。
 * @param {string} html - 原始 HTML 字符串。
 * @returns {string} - 转义后的字符串。
 */
function escapeHtmlForRegex(html: string): string {
  // 移除可能干扰的注释
  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, '');
  // 将字符串转换为 JSON 格式，这会自动处理大多数转义（如 \n, ", \）
  const jsonString = JSON.stringify(withoutComments);
  // 移除 JSON.stringify 添加的首尾引号
  return jsonString.slice(1, jsonString.length - 1);
}

/**
 * @constant {Omit<TavernRegex, 'id' | 'scope'>} REPLACE_PLACEHOLDER_REGEX
 * @description
 * 用于将消息中的状态栏占位符替换为实际的状态栏 HTML。
 */
export const REPLACE_PLACEHOLDER_REGEX: Omit<TavernRegex, 'id' | 'scope'> = {
  script_name: 'ERA 状态栏模板',
  enabled: true,
  run_on_edit: true,
  find_regex: `/<StatusPlaceHolderImpl\\/>/gsi`,
  replace_string: `\`\`\`html\n${statusBarHtml}\n\`\`\``,
  source: {
    user_input: false,
    ai_output: true,
    slash_command: false,
    world_info: false,
  },
  destination: {
    display: true,
    prompt: false,
  },
  min_depth: null,
  max_depth: null,
};

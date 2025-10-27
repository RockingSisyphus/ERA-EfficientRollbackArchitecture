import statusBarHtml from './status_bar.html?raw';

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
  replace_string: statusBarHtml,
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

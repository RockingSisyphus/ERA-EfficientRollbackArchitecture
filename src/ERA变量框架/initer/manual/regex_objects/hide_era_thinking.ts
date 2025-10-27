/**
 * @constant {Omit<TavernRegex, 'id' | 'scope'>} HIDE_ERA_THINKING_REGEX
 * @description
 * 用于隐藏发送给AI的ERA变量思考块
 * This regex is for hiding ERA variable thinking blocks sent to AI.
 *
 * - **find_regex**: 匹配 <thinking>...</thinking> 块。
 * - **replace_string**: 替换为空字符串，即删除匹配到的内容。
 * - **source**: 应用于 AI 输出。
 * - **destination**: 同时作用于“显示”和“提示词”两种场景。
 * - **run_on_edit**: 在编辑消息时也生效。
 */
export const HIDE_ERA_THINKING_REGEX: Omit<TavernRegex, 'id' | 'scope'> = {
  script_name: 'ERA 思考块隐藏正则',
  enabled: true,
  run_on_edit: true,
  find_regex: String.raw`/<variablethink>\s*(?=[\s\S]*?\S[\s\S]*?<\/variablethink>)((?:(?!<variablethink>)[\s\S])*?)\s*<\/variablethink>/gi`,
  replace_string: '',
  source: {
    user_input: true,
    ai_output: true,
    slash_command: false,
    world_info: false,
  },
  destination: {
    display: true,
    prompt: true,
  },
  min_depth: null,
  max_depth: null,
};

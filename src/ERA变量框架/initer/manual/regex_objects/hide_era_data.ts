/**
 * @constant {Omit<TavernRegex, 'id' | 'scope'>} HIDE_ERA_DATA_REGEX
 * @description
 * 用于隐藏消息中 ERA 数据标签的正则表达式对象。
 * 这个正则是为了从用户和 AI 的输出中移除 <era_data> 和 <variable...> 等标签，
 * 以免它们在最终显示或作为提示词时对用户或模型造成干扰。
 *
 * - **find_regex**: 匹配 <era_data>...</era_data> 或 <variable...>...</variable...> 块。
 * - **replace_string**: 替换为空字符串，即删除匹配到的内容。
 * - **source**: 应用于用户输入和 AI 输出。
 * - **destination**: 同时作用于“显示”和“提示词”两种场景。
 * - **run_on_edit**: 在编辑消息时也生效。
 */
export const HIDE_ERA_DATA_REGEX: Omit<TavernRegex, 'id' | 'scope'> = {
  script_name: 'ERA 数据隐藏正则',
  enabled: true,
  run_on_edit: true,
  find_regex: String.raw`/<(variable(?:insert|edit|delete))>\s*(?=[\s\S]*?\S[\s\S]*?<\/\1>)((?:(?!<(?:era_data|variable(?:think|insert|edit|delete))>|<\/\1>)[\s\S])*?)\s*<\/\1>/gi`,
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

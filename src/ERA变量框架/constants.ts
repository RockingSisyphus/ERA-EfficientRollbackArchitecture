'use strict';

// —— 小常量：固定作用到“最后一条 AI 楼层” ——
export const CHAT_SCOPE = { type: 'chat' as const }; // 聊天变量作用域，用于持久化在该 chat 下的变量
export const LOGS_PATH = 'EditLogs'; // —— 一维日志表：键=MK ——
export const SEL_PATH = 'SelectedMks'; // —— 保存“每一楼层”的 MK，数组形式，下标对应 message_id ——

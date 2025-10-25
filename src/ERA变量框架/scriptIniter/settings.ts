import { Logger } from '../utils/log';

const logger = new Logger();

/**
 * 定义外部设定的变量结构和默认值。
 */
const SettingsSchema = z.object({
  强制重载功能: z.boolean().default(false),
  强制重载消息数: z.number().default(2),
});

/**
 * 初始化脚本的外部设置变量。
 * 该函数会检查并创建缺失的脚本变量，如果已存在则不进行任何操作。
 * 同时，它会输出检查结果，报告哪些变量已存在，哪些缺失。
 */
export function initializeExternalSettings() {
  const scriptId = getScriptId();

  // 检查并初始化脚本变量
  const currentVars = getVariables({ type: 'script', script_id: scriptId }) ?? {};
  const defaultSettings = SettingsSchema.parse({}); // 从 Zod schema 获取一个包含所有默认值的对象

  const missingVars: { [key: string]: any } = {};
  const existingVarKeys: string[] = [];
  logger.debug('initializeExternalSettings', '当前脚本变量为:', currentVars);
  for (const key of Object.keys(defaultSettings)) {
    if (key in currentVars) {
      existingVarKeys.push(key);
    } else {
      missingVars[key] = defaultSettings[key as keyof typeof defaultSettings];
    }
  }

  // 报告检查结果
  if (existingVarKeys.length > 0) {
    logger.debug('initializeExternalSettings', '检测到以下现有变量:', existingVarKeys);
  }

  const missingVarKeys = Object.keys(missingVars);
  if (missingVarKeys.length > 0) {
    logger.debug('initializeExternalSettings', '检测到以下缺失变量:', missingVarKeys);
    // 创建缺失的变量
    insertVariables(missingVars, { type: 'script', script_id: scriptId });
    logger.log('initializeExternalSettings', '已初始化缺失的脚本变量。');
  }

  if (missingVarKeys.length === 0) {
    logger.log('initializeExternalSettings', '所有必需的外部变量均已存在，无需初始化。');
  }
}

// 导出函数，由事件分发器在 app_ready 事件时调用

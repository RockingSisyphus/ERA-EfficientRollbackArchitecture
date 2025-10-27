import { updateScriptSettings } from '../../utils/era_data';
import { Logger } from '../../utils/log';

const logger = new Logger();

/**
 * 初始化脚本的外部设置变量。
 * 该函数会确保所有设置都存在，如果不存在则使用默认值。
 */
export async function initializeExternalSettings() {
  logger.log('initializeExternalSettings', '开始初始化脚本设置...');
  await updateScriptSettings(async settings => {
    // updateScriptSettings 内部会处理默认值，所以这里我们只需要返回它
    logger.debug('initializeExternalSettings', '当前设置:', settings);
    return settings;
  });
  logger.log('initializeExternalSettings', '脚本设置初始化完成。');
}

// 导出函数，由事件分发器在 app_ready 事件时调用
$(() => {
  initializeExternalSettings();
});

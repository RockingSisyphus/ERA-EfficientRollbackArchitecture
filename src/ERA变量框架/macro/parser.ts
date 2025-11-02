import { unescapeEraData } from '../utils/data';
import { getEraData, removeMetaFields } from '../utils/era_data';
import { Logger } from '../utils/log';

const logger = new Logger();

/**
 * 解析字符串中的 ERA 宏, 并将其替换为对应的变量值。
 * 这是提供给其他模块调用的公共接口。
 * @param text - 包含宏的输入字符串。
 * @returns - 替换宏后的字符串。
 */
export function parseEraMacros(text: string): string {
  const macroRegex = /{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi;

  // 如果文本中不包含宏特征字符串, 直接返回以优化性能
  if (!text.includes('{{ERA')) {
    return text;
  }

  // 获取 stat_data
  const { stat } = getEraData();
  logger.debug('parseEraMacros', 'ERA宏模块，获取到当前最新的stat', stat);
  if (!stat) {
    logger.warn('parseEraMacros', '无法获取到 stat_data, 宏替换失败.');
    // 如果没有 stat_data, 任何宏都无法解析, 直接返回原文本
    return text;
  }

  return text.replace(macroRegex, (substring, withMeta, path) => {
    const funcName = 'parseEraMacros';
    const trimmedPath = path.trim();
    const includeMeta = !!withMeta;

    let data;
    if (trimmedPath === '$ALLDATA') {
      data = stat;
    } else {
      data = _.get(stat, trimmedPath);
    }

    if (data === undefined) {
      logger.warn(funcName, `在 stat_data 中未找到路径 "${trimmedPath}", 宏将替换为空字符串.`);
      return ''; // 路径未找到, 返回空字符串
    }

    // 根据 withMeta 标志决定是否移除 $meta 字段
    const dataBeforeUnescape = includeMeta ? data : removeMetaFields(data);

    // 在返回数据前进行反转义
    const finalData = unescapeEraData(dataBeforeUnescape);

    logger.debug('parseEraMacros', `宏替换数据反转义: ${trimmedPath}`, {
      before: dataBeforeUnescape,
      after: finalData,
    });

    // 如果是对象或数组, 转换为 JSON 字符串
    if (typeof finalData === 'object' && finalData !== null) {
      return JSON.stringify(finalData);
    }

    // 如果是原始类型, 直接转换为字符串
    return String(finalData);
  });
}

$(() => {
  /**
   * 注册 ERA 宏, 用于在发送给 AI 的消息中查询当前聊天的变量数据
   *
   * - `{{ERA:path.to.data}}`: 查询并替换为**不含** `$meta` 的纯净数据。
   *   - `{{ERA:$ALLDATA}}` 将返回整个移除 `$meta` 后的 `stat_data` 对象。
   * - `{{ERA-withmeta:path.to.data}}`: 查询并替换为**包含** `$meta` 的原始数据。
   *   - `{{ERA-withmeta:$ALLDATA}}` 将返回完整的 `stat_data` 对象。
   */
  registerMacroLike(/{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi, (context, substring, withMeta, path) => {
    // 直接复用 parseEraMacros 函数的逻辑。
    // substring 参数是匹配到的完整宏字符串, 如 "{{ERA:path.to.data}}"
    return parseEraMacros(substring);
  });
});

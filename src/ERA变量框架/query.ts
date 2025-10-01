import { getEraData, Logger, removeMetaFields } from './utils';

const logger = new Logger('宏查询');

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
    const funcName = 'registerMacroLike';
    const trimmedPath = path.trim();
    const includeMeta = !!withMeta;

    // 获取 stat_data
    const { stat } = getEraData();

    if (!stat) {
      logger.warn(funcName, '无法获取到 stat_data, 宏替换失败.');
      return ''; // 如果没有变量, 返回空字符串
    }

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
    const finalData = includeMeta ? data : removeMetaFields(data);

    // 如果是对象或数组, 转换为 JSON 字符串
    if (typeof finalData === 'object' && finalData !== null) {
      return JSON.stringify(finalData);
    }

    // 如果是原始类型, 直接转换为字符串
    return String(finalData);
  });
});

/**
 * @file ERA 变量框架 - ERA 核心变量读写模块
 */

'use strict';

import _ from 'lodash';
import { CHAT_SCOPE, META_DATA_PATH, STAT_DATA_PATH, SettingsSchema, EraConfig } from './constants';
import { ref, readonly, DeepReadonly, Ref } from 'vue';

declare function getScriptId(): string;

// --- 响应式配置中心 ---

/**
 * @description 存储全局脚本设置的响应式引用。
 * @internal
 */
const scriptSettingsRef: Ref<EraConfig> = ref(SettingsSchema.parse({}));

/**
 * @description 供外部模块使用的只读的脚本设置。
 * @example
 * import { settings } from './utils/era_data';
 * if (settings.value.调试模式) { ... }
 */
export const settings: DeepReadonly<Ref<EraConfig>> = readonly(scriptSettingsRef);

/**
 * @description 初始化脚本设置，从酒馆变量中读取并填充到响应式引用中。
 * 应在脚本启动时调用一次。
 */
export function initEraSettings() {
  const rawSettings = getVariables({ type: 'script', script_id: getScriptId() });
  scriptSettingsRef.value = SettingsSchema.parse(rawSettings ?? {});
}

/**
 * 递归地从对象中移除所有以 `$` 开头的字段（如 `$meta`, `$template`）。
 * 此函数会创建一个对象的深拷贝，因此不会修改原始对象。
 * @param {any} obj - 待处理的对象或值。
 * @returns {any} 一个不包含 `$` 前缀字段的新对象或原始值。
 */
export function removeMetaFields(obj: any): any {
  // 对于非对象类型，直接返回原始值
  if (!_.isObject(obj)) {
    return obj;
  }

  // 创建深拷贝以避免修改原始对象
  const newObj = _.cloneDeep(obj);

  function recurse(current: any) {
    if (Array.isArray(current)) {
      // 如果是数组，则递归处理数组中的每个元素
      current.forEach(item => recurse(item));
    } else if (_.isPlainObject(current)) {
      // 如果是纯粹的对象，遍历其所有键
      for (const key in current) {
        // 如果键以 '$' 开头，则删除该属性
        if (key.startsWith('$')) {
          delete current[key];
        } else {
          // 否则，递归处理该属性的值
          recurse(current[key]);
        }
      }
    }
  }

  recurse(newObj);
  return newObj;
}

/**
 * 获取并确保 ERA 的元数据和状态数据对象的存在。
 * @returns {{meta: object, stat: object}} 包含元数据和状态数据的对象。
 */
export function getEraData(): { meta: any; stat: any } {
  const chatVars = getVariables(CHAT_SCOPE) || {};
  const meta = _.get(chatVars, META_DATA_PATH, {});
  const stat = _.get(chatVars, STAT_DATA_PATH, {});
  return { meta, stat };
}

/**
 * 原子性地更新 ERA 的状态数据 (stat_data)。
 * @param {(currentStatData: any) => (any | Promise<any>)} updater - 一个接收当前 stat_data 并返回修改后 stat_data 的函数 (可以是 async)。
 */
export async function updateEraStatData(updater: (currentStatData: any) => any | Promise<any>) {
  await updateVariablesWith(async v => {
    const currentStat = _.get(v, STAT_DATA_PATH, {});
    const newStat = await updater(currentStat);
    _.set(v, STAT_DATA_PATH, newStat);
    return v;
  }, CHAT_SCOPE);
}

/**
 * 原子性地更新 ERA 的元数据 (ERAMetaData)。
 * @param {(currentMetaData: any) => (any | Promise<any>)} updater - 一个接收当前 ERAMetaData 并返回修改后 ERAMetaData 的函数 (可以是 async)。
 */
export async function updateEraMetaData(updater: (currentMetaData: any) => any | Promise<any>) {
  await updateVariablesWith(async v => {
    const currentMeta = _.get(v, META_DATA_PATH, {});
    const newMeta = await updater(currentMeta);
    _.set(v, META_DATA_PATH, newMeta);
    return v;
  }, CHAT_SCOPE);
}

/**
 * 原子性地更新脚本设置
 * @param {(currentSettings: EraConfig) => EraConfig | Promise<EraConfig>} updater
 * @returns {Promise<void>}
 */
export async function updateScriptSettings(
  updater: (currentSettings: EraConfig) => EraConfig | Promise<EraConfig>,
): Promise<void> {
  await updateVariablesWith(
    async rawSettings => {
      const currentSettings = SettingsSchema.parse(rawSettings ?? {});
      const newSettings = await updater(currentSettings);
      // 更新内存中的响应式引用
      scriptSettingsRef.value = newSettings;
      return newSettings;
    },
    { type: 'script', script_id: getScriptId() },
  );
}

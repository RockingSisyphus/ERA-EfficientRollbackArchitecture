/**
 * @file UI 主入口 (Vue-based)
 * @description
 * 该文件负责创建和挂载根 Vue 组件，以初始化整个 UI。
 */
import $ from 'jquery';
import { ref } from 'vue';
import { Logger } from '../utils/log';
import StatusBar from './components/statusBar/StatusBar.vue';
import { createToggleableVueApp, deteleportStyle, teleportStyle } from './utils';

const log = new Logger('ui-main');
const latestStatData = ref<any>(null);
const isExpanded = ref(false);
const vueMountPointId = `era-vue-mount-point-${getScriptId()}`;

const handleWriteDone = (detail: any) => {
  log.debug('handleWriteDone', '接收到 era:writeDone 事件，缓存全局数据。', detail);
  if (detail && detail.statWithoutMeta) {
    latestStatData.value = detail.statWithoutMeta;
    // 如果当前是展开状态，则强制重新挂载以更新视图
    if (isExpanded.value) {
      remountController.remount?.();
    }
  }
};

// remount 控制器的引用容器
const remountController: { remount?: () => void } = {};

function initUI() {
  log.debug('initUI', '注册 DOMContentLoaded 回调以挂载 Vue 应用...');
  $(() => {
    log.debug('initUI', 'DOM 已加载，开始创建 Vue 挂载点...');

    if ($(`#${vueMountPointId}`).length > 0) {
      log.warn('initUI', 'Vue 挂载点已存在，跳过初始化。');
      return;
    }

    const $mountPoint = $('<div>').attr('id', vueMountPointId);
    $('body').append($mountPoint);
    log.debug('initUI', '挂载点已添加到 body。');

    const { toggle, remount } = createToggleableVueApp(
      $mountPoint[0],
      StatusBar,
      currentIsToggled => {
        isExpanded.value = currentIsToggled; // 同步外部状态
        return {
          isExpanded: currentIsToggled,
          onToggle: toggle,
          initialData: latestStatData.value,
        };
      },
    );

    remountController.remount = remount; // 保存 remount 函数

    log.debug('initUI', '可切换的 Vue 应用已成功初始化。');

    teleportStyle();
    eventOn('era:writeDone', handleWriteDone);
  });
}

function cleanupUI() {
  log.debug('cleanupUI', '页面即将卸载，移除 UI 元素、样式和事件监听...');
  $(`#${vueMountPointId}`).remove();
  deteleportStyle();
  eventRemoveListener('era:writeDone', handleWriteDone);
  log.debug('cleanupUI', '清理完成。');
}

// --- Main Execution ---
initUI();
$(window).on('pagehide', cleanupUI);

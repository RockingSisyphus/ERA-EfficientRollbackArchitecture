import { createPinia } from 'pinia';
import { createApp, App as VueApp } from 'vue';
import { settings } from '../utils/era_data';
import { Logger } from '../utils/log';
import App from './App.vue';
import { useUiStore } from './store';
import { createMountPoint, destroyMountPoint, deteleportStyle, teleportStyle } from './utils/dom';

const logger = new Logger();
let vueApp: VueApp | null = null;
let mountPoint: JQuery<HTMLDivElement> | null = null;

/**
 * 切换视图的全局函数
 * @param viewName 要切换到的视图名称
 */
function switchView(viewName: 'FloatingBall' | 'ExpandedView') {
  logger.debug('switchView', `请求切换视图到: ${viewName}`);
  // 初始化后，store 实例将可用
  if ((window as any).eraUiStore) {
    (window as any).eraUiStore.switchView(viewName);
  } else {
    logger.warn('switchView', 'UI store尚未初始化');
  }
}

// 暴露切换函数到 window
(window as any).eraUiSwitchView = switchView;

function unmountVueApp() {
  if (vueApp) {
    logger.debug('unmountVueApp', '卸载 Vue 实例');
    vueApp.unmount();
    vueApp = null;
  }
}

function unloadUI() {
  logger.log('unloadUI', 'UI 脚本开始卸载');
  unmountVueApp();
  deteleportStyle();
  if (mountPoint) {
    logger.debug('unloadUI', '销毁挂载点');
    destroyMountPoint();
    mountPoint = null;
  }
  // 卸载时自我清理，防止内存泄漏
  window.removeEventListener('pagehide', unloadUI);
  logger.log('unloadUI', 'UI 脚本卸载完成');
}

// 在加载时执行
$(() => {
  if (settings.value['开启悬浮球'] === false) {
    logger.log('initialize', '悬浮球设置为关闭，开始卸载UI...');
    unloadUI();
    return;
  }
  logger.log('initialize', 'UI 脚本开始初始化');
  // 创建挂载点
  mountPoint = createMountPoint();
  logger.debug('$(document).ready', '创建挂载点', mountPoint);

  // 将挂载点添加到 body
  $('body').append(mountPoint);
  logger.debug('$(document).ready', '挂载点已添加到 body');

  // 创建并挂载 Vue 实例
  vueApp = createApp(App);
  const pinia = createPinia();
  vueApp.use(pinia);
  vueApp.mount(mountPoint[0]);

  // 获取 store 实例并暴露到 window，以便外部函数调用
  const uiStore = useUiStore(pinia);
  (window as any).eraUiStore = uiStore;

  // 传送样式，也只执行一次
  teleportStyle();
  logger.debug('initialize', 'Vue App 已挂载，样式已传送');

  // 监听 era:writeDone 事件
  eventOn('era:writeDone', (data: any) => {
    logger.log('era:writeDone', '接收到 era:writeDone 事件，更新 store', data);
    uiStore.setEventData(data); // 通过 store action 更新数据
  });
  logger.debug('$(document).ready', '已设置 era:writeDone 事件监听器');

  // 在卸载时执行，并确保只绑定一次
  window.removeEventListener('pagehide', unloadUI); // 先移除旧的
  window.addEventListener('pagehide', unloadUI); // 再添加新的
});

import { createPinia } from 'pinia';
import { createApp, App as VueApp } from 'vue';
import { getScriptSettings } from '../utils/era_data';
import { Logger } from '../utils/log';
import App from './App.vue';
import { createMountPoint, destroyMountPoint, deteleportStyle, teleportStyle } from './utils/dom';

const logger = new Logger();
let vueApp: VueApp | null = null;
let mountPoint: JQuery<HTMLDivElement> | null = null;
let currentView: 'FloatingBall' | 'ExpandedView' = 'FloatingBall';
let lastEventData: any = null;

/**
 * 渲染 App 组件
 * @param viewToShow 要在 App 内部初始显示的视图
 */
function renderApp(viewToShow: 'FloatingBall' | 'ExpandedView', dataToPass: any) {
  logger.debug('renderApp', `开始渲染 App，视图: ${viewToShow}`, { dataToPass });
  if (!mountPoint) {
    logger.warn('renderApp', '挂载点不存在，渲染中止');
    return;
  }

  // 1. 卸载当前 app
  unmountVueApp();

  // 2. 创建并挂载新的 app 实例，并通过 props 传递初始视图和数据
  vueApp = createApp(App, {
    initialView: viewToShow,
    eventData: dataToPass,
  });
  vueApp.use(createPinia());
  vueApp.mount(mountPoint[0]);

  // 3. 重新传送样式，以确保新组件的样式被加载
  teleportStyle();
  logger.debug('renderApp', '渲染完成');
}

/**
 * 切换视图的全局函数
 * @param viewName 要切换到的视图名称
 */
function switchView(viewName: 'FloatingBall' | 'ExpandedView') {
  logger.debug('switchView', `请求切换视图到: ${viewName}`);
  if (currentView !== viewName) {
    currentView = viewName;
    logger.log('switchView', `视图已切换，重新渲染 App`);
    renderApp(viewName, lastEventData);
  } else {
    logger.debug('switchView', `视图已经是 ${viewName}，无需切换`);
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
  logger.log('unloadUI', 'UI 脚本卸载完成');
}

// 在加载时执行
$(() => {
  const settings = getScriptSettings();
  if (settings['开启悬浮球'] === false) {
    logger.log('initialize', 'UI ahow ball disabled, attempting to unload...');
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

  // 初始加载 App
  renderApp(currentView, lastEventData);

  // 监听 era:writeDone 事件
  eventOn('era:writeDone', (data: any) => {
    logger.log('era:writeDone', '接收到 era:writeDone 事件，准备刷新 UI', data);
    lastEventData = data;
    // 无论当前视图是什么，都强制刷新
    renderApp(currentView, lastEventData);
  });
  logger.debug('$(document).ready', '已设置 era:writeDone 事件监听器');
});

// 在卸载时执行
$(window).on('pagehide', unloadUI);

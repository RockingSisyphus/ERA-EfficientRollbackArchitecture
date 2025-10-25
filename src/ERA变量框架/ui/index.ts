import { createPinia } from 'pinia';
import { createApp, App as VueApp } from 'vue';
import App from './App.vue';
import { createMountPoint, destroyMountPoint, deteleportStyle, teleportStyle } from './utils/dom';

let vueApp: VueApp | null = null;
let mountPoint: JQuery<HTMLDivElement> | null = null;
let currentView: 'FloatingBall' | 'ExpandedView' = 'FloatingBall';
let lastEventData: any = null;

/**
 * 渲染 App 组件
 * @param viewToShow 要在 App 内部初始显示的视图
 */
function renderApp(viewToShow: 'FloatingBall' | 'ExpandedView', dataToPass: any) {
  if (!mountPoint) return;

  // 1. 卸载当前 app
  if (vueApp) {
    vueApp.unmount();
  }

  // 2. 创建并挂载新的 app 实例，并通过 props 传递初始视图和数据
  vueApp = createApp(App, {
    initialView: viewToShow,
    eventData: dataToPass,
  });
  vueApp.use(createPinia());
  vueApp.mount(mountPoint[0]);

  // 3. 重新传送样式，以确保新组件的样式被加载
  teleportStyle();
}

/**
 * 切换视图的全局函数
 * @param viewName 要切换到的视图名称
 */
function switchView(viewName: 'FloatingBall' | 'ExpandedView') {
  if (currentView !== viewName) {
    currentView = viewName;
    renderApp(viewName, lastEventData);
  }
}

// 暴露切换函数到 window
(window as any).eraUiSwitchView = switchView;

// 在加载时执行
$(() => {
  // 创建挂载点
  mountPoint = createMountPoint();

  // 将挂载点添加到 body
  $('body').append(mountPoint);

  // 初始加载 App
  renderApp(currentView, lastEventData);

  // 监听 era:writeDone 事件
  eventOn('era:writeDone', (data: any) => {
    lastEventData = data;
    // 无论当前视图是什么，都强制刷新
    renderApp(currentView, lastEventData);
  });
});

// 在卸载时执行
$(window).on('pagehide', () => {
  if (vueApp) {
    vueApp.unmount();
  }
  deteleportStyle();
  if (mountPoint) {
    destroyMountPoint();
  }
});

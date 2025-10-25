import $ from 'jquery';
import { Logger } from '../utils/log';

const log = new Logger('ui-utils');

/**
 * 将当前 iframe 中的样式传送到主文档的 <head>
 * @see 脚本.mdc
 */
export function teleportStyle() {
  // 使用 requestAnimationFrame 确保在 Vue 挂载并注入样式后执行
  requestAnimationFrame(() => {
    const $styles = $('head > style', document).clone();
    const $styleContainer = $('<div>').attr('id', `era-style-container-${getScriptId()}`).append($styles);

    $('head').append($styleContainer);
    log.debug('teleportStyle', '样式已传送到主文档。');
  });
}

/**
 * 从主文档中移除传送的样式
 */
export function deteleportStyle() {
  $(`head > div[id^="era-style-container-"]`).remove();
  log.debug('deteleportStyle', '已从主文档移除样式。');
}

/**
 * 创建一个可切换状态的 Vue 应用实例，并提供一个 toggle 函数来销毁和重建它。
 * 这对于需要通过完全重新渲染来避免复杂状态管理或渲染问题的场景非常有用。
 *
 * @param container - Vue 应用将挂载到的 DOM 元素。
 * @param component - 要渲染的 Vue 组件。
 * @param propsFactory - 一个函数，接收当前的切换状态 (boolean) 并返回传递给组件的 props 对象。
 * @returns 返回一个包含 `toggle` 和 `remount` 方法的对象。
 */
export function createToggleableVueApp(
  container: HTMLElement,
  component: any,
  propsFactory: (isToggled: boolean) => Record<string, any>,
) {
  let appInstance: { app?: any } = {};
  let isToggled = false;

  const mount = () => {
    if (appInstance.app) {
      appInstance.app.unmount();
    }
    const props = propsFactory(isToggled);
    appInstance.app = createApp(component, props);
    appInstance.app.mount(container);
    log.debug('createToggleableVueApp', `组件已挂载，状态: ${isToggled}`, { props });
  };

  const toggle = () => {
    isToggled = !isToggled;
    log.debug('createToggleableVueApp', `触发 toggle，新状态: ${isToggled}`);
    mount();
  };

  const remount = () => {
    log.debug('createToggleableVueApp', `触发 remount，强制以当前状态重新挂载。`);
    mount();
  };

  // 初始挂载
  mount();

  // 返回控制器
  return { toggle, remount };
}

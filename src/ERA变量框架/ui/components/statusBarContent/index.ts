import { Logger } from '../../../utils/log';

const logger = new Logger('ui-components-statusBarContent');
let latestStatData: any = null; // 用于缓存最新的数据

function jsonToHtml(data: any): string {
  // 如果数据不是对象（是字符串、数字、布尔值等），直接返回值
  if (typeof data !== 'object' || data === null) {
    return `<span style="color: #98fb98;">${String(data)}</span>`;
  }

  // 如果是对象，则创建一个列表来展示其键值对
  let listHtml = '<ul style="list-style-type: none; padding-left: 20px; margin: 0;">';
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      listHtml += '<li>';
      // 显示键
      listHtml += `<strong style="color: #87ceeb;">${key}:</strong> `;
      // 递归调用以处理值
      listHtml += jsonToHtml(value);
      listHtml += '</li>';
    }
  }
  listHtml += '</ul>';
  return listHtml;
}

/**
 * 使用缓存的最新数据渲染状态栏内容。
 * @param $contentContainer - 内容区的 JQuery 对象。
 */
export function renderStatusBarContent($contentContainer: JQuery) {
  if (latestStatData) {
    const html = jsonToHtml(latestStatData);
    $contentContainer.html(html);
  } else {
    $contentContainer.html('数据加载中...');
  }
}

export function initStatusBarContent($contentContainer: JQuery) {
  renderStatusBarContent($contentContainer); // 初始渲染

  // 监听事件，更新缓存，并仅在状态栏展开时渲染
  eventOn('era:writeDone', detail => {
    // 核心问题：直接在隐藏的 DOM 元素（display: none）上执行复杂的 .html() 更新，
    // 可能会因浏览器的渲染优化或怪癖导致内容显示不全。
    //
    // 解决方案：采用延迟渲染机制。
    // 1. 数据到达时，不直接渲染 DOM，而是先存入 `latestStatData` 缓存。
    // 2. 仅当内容容器可见时（即状态栏是展开的），才立即从缓存渲染。
    // 3. 当状态栏从折叠态展开时，由 statusBar 组件负责调用 renderStatusBarContent 来确保渲染。
    logger.debug('initStatusBarContent', '接收到 era:writeDone 事件，缓存数据。', detail);
    if (detail && detail.statWithoutMeta) {
      latestStatData = detail.statWithoutMeta;
      // 如果状态栏当前是展开的，则立即更新
      if ($contentContainer.is(':visible')) {
        renderStatusBarContent($contentContainer);
      }
    }
  });
}

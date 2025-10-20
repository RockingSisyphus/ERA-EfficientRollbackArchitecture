import $ from 'jquery';
import { initStatusBarContent, renderStatusBarContent } from '../statusBarContent';

// 由于 jquery-ui-dist 不含 types, 我们需要手动声明 draggable
declare global {
  interface JQuery {
    draggable(options?: any): JQuery;
  }
}

const statusBarId = `era-status-bar-${getScriptId()}`;
let isExpanded = false; // 追踪展开/收缩状态

// 定义不同状态下的样式
const collapsedStyle = {
  width: '50px',
  height: '50px',
  'border-radius': '50%',
  bottom: '20px',
  left: '20px',
  top: '',
  right: '',
  cursor: 'pointer',
  'justify-content': 'center',
  'align-items': 'center',
  display: 'flex',
  overflow: 'hidden',
};

const expandedStyle = {
  width: '300px',
  height: '200px',
  'border-radius': '10px',
  cursor: 'default',
  padding: '12px',
  display: 'block',
};

function toggleExpand($statusBar: JQuery, $content: JQuery) {
  isExpanded = !isExpanded;
  if (isExpanded) {
    // 展开
    $statusBar.css(expandedStyle);
    $statusBar.find('span').hide();
    $content.show();
    // 调用渲染函数，以确保显示的是最新的数据。
    // 这是延迟渲染机制的一部分，用于解决在隐藏元素上更新 HTML 可能导致内容不全的问题。
    renderStatusBarContent($content);
  } else {
    // 收缩
    $statusBar.css(collapsedStyle);
    $statusBar.find('span').show();
    $content.hide();
  }
}

function createStatusBar() {
  if ($(`#${statusBarId}`).length > 0) {
    return;
  }

  const $statusBar = $('<div>')
    .attr('id', statusBarId)
    .css({
      position: 'fixed',
      'background-color': 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      'font-size': '14px',
      'z-index': '10000',
      'border-top': '1px solid #444',
      transition: 'all 0.3s ease-in-out',
      ...collapsedStyle,
    })
    .html('<span>ERA</span>');

  const $content = $('<div>').css({
    display: 'none',
    'overflow-y': 'auto',
    height: '100%',
  });

  $statusBar.append($content);
  $('body').append($statusBar);

  $statusBar.draggable({
    handle: `#${statusBarId}`,
    containment: 'window',
  });

  $statusBar.on('click', () => {
    setTimeout(() => {
      if ($statusBar.hasClass('ui-draggable-dragging')) {
        return;
      }
      toggleExpand($statusBar, $content);
    }, 50);
  });

  return $statusBar;
}

function removeStatusBar() {
  $(`#${statusBarId}`).remove();
}

// 导出初始化函数，由 ui/index.ts 调用
export function initStatusBar() {
  $(() => {
    const $statusBar = createStatusBar();
    if (!$statusBar) return;

    const $content = $statusBar.find('div');
    initStatusBarContent($content);
  });

  $(window).on('pagehide', () => {
    removeStatusBar();
  });
}

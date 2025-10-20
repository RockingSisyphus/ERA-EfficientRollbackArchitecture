/**
 * @file UI 主入口
 * @description
 * 该文件负责统一加载和初始化所有 UI 组件。
 * 它导入各个组件的初始化函数，并依次执行。
 */

import { initStatusBar } from './components/statusBar';

// 在这里可以继续添加其他 UI 组件的初始化函数
function initUI() {
  initStatusBar();
  // 以后可以添加例如 initControlPanel(), initCharacterSheet() 等
}

// 执行所有 UI 初始化
initUI();

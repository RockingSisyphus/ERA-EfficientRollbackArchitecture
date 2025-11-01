<template>
  <div class="era-app-container" :class="{ 'dark-theme': isDarkMode }">
    <ThemeManager ref="themeManager" />
    <FloatingBall v-show="currentComponent === 'FloatingBall'" @click="requestSwitchView('ExpandedView')" />
    <div v-show="currentComponent === 'ExpandedView'" class="era-expanded-layer">
      <!-- 视口级展开层：悬浮模态容器 -->
      <div class="era-shell">
        <!-- 新增横向壳容器：左面板 + 右侧栏 -->
        <EraPanel :data="dataRef" />
        <RightRail />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { settings } from '../utils/era_data';
import { Logger } from '../utils/log';
import EraPanel from './components/EraPanel.vue';
import FloatingBall from './components/FloatingBall.vue';
import RightRail from './components/RightRail.vue';
import ThemeManager from './components/ThemeManager.vue';
import { useUiStore } from './store';

const logger = new Logger();

// 从 Pinia store 获取状态和 action
const uiStore = useUiStore();
const { currentView: currentComponent, eventData: dataRef } = storeToRefs(uiStore);

// 主题状态管理
const themeManager = ref<InstanceType<typeof ThemeManager> | null>(null);
const isDarkMode = ref(false);

const loadThemeSetting = () => {
  try {
    const darkModeValue = settings.value?.['开启黑夜模式'] ?? false;
    isDarkMode.value = darkModeValue;
    if (themeManager.value) {
      themeManager.value.isDarkMode = darkModeValue;
    }
    logger.debug('loadThemeSetting', `主题已更新为: ${darkModeValue ? 'Dark' : 'Light'}`);
  } catch (e) {
    logger.error('loadThemeSetting', '加载主题设置失败', e);
    isDarkMode.value = false; // Fallback to light mode
  }
};

onMounted(() => {
  loadThemeSetting();
  window.addEventListener('era-settings-updated', loadThemeSetting);
});

onBeforeUnmount(() => {
  window.removeEventListener('era-settings-updated', loadThemeSetting);
});

const requestSwitchView = (viewName: 'FloatingBall' | 'ExpandedView') => {
  logger.debug('requestSwitchView', `请求切换视图到: ${viewName}`);
  uiStore.switchView(viewName);
};
</script>

<style>
/* App.vue 视口级悬浮容器（替换原有 .era-app-container） */
.era-app-container {
  /* 作为全局悬浮层根容器 */
  position: fixed; /* 固定在视口，不受外层布局影响 */
  inset: 0; /* 覆盖整个视口区域（top/right/bottom/left 全 0） */
  z-index: 2147483646; /* 超高层级，盖住站点其它层 */
  pointer-events: none; /* 默认不截获点击，避免阻挡页面 */
  isolation: isolate; /* 新建独立层叠上下文，防止被外层混合影响 */
  contain: layout style paint; /* 创建渲染封装，减少外界干扰 */
  width: 100svw; /* 适配移动端动态视口宽度 */
  height: 100svh; /* 适配移动端动态视口高度 */
}
</style>

<style scoped>
/* 从 EraDataPanel.vue 迁移过来的样式 */

/* ===[新增] 横向壳：左面板 + 右侧栏（按钮）=== */
.era-shell {
  /* 横向包裹容器 */ /* 中文注释：横向排列容器 */
  display: flex; /* 横向布局 */ /* 中文注释：flex 横排 */
  align-items: flex-start; /* 顶对齐 */ /* 中文注释：上缘对齐 */
  gap: 12px; /* 左右间距 */ /* 中文注释：元素间距 */
  flex-wrap: nowrap; /* 默认不换行 */ /* 中文注释：保持并排 */
}

/* 保持面板宽高（原样），但让它更好地在横向中自适应 */
:deep(.era-panel) {
  flex: 0 1 auto; /* 面板按自身宽度布局 */
}

/* 小屏回落：改为上下堆叠（按钮在下） */
@media (max-width: 992px) {
  /* 992px (平板) 以下回落 */
  .era-shell {
    flex-wrap: wrap; /* 允许换行 */
  }
  :deep(.era-panel),
  :deep(.right-rail) {
    width: 100%; /* 各占一行 */
    flex-basis: auto; /* 重置 flex-basis */
  }
  :deep(.right-rail) {
    position: static; /* 取消吸顶 */
    margin-top: 12px; /* 与上方留白 */
    height: auto; /* 高度自适应 */
    max-height: 40vh; /* 限制最大高度，避免过长 */
  }
}

/* ===[新增] 悬浮球：固定在右下角 + 开启点击 === */
:deep(.floating-ball) {
  /* 选中子组件根元素（scoped 下用 deep） */
  position: fixed; /* 固定定位到视口 */
  right: max(16px, env(safe-area-inset-right)); /* 右侧安全区 + 基础边距 */
  bottom: max(90px, env(safe-area-inset-bottom)); /* 底部安全区 + 基础边距 */
  z-index: 2147483647; /* 高于容器根，确保始终可点 */
  pointer-events: auto; /* 启用点击（父容器是 none） */
  touch-action: manipulation; /* 移动端减少点击延迟 */
  will-change: transform; /* 提前分层，避免站点 3D/滤镜影响 */
}

/* ===[新增] 展开层：视口级模态容器（只在 ExpandedView v-show 为 true 时存在） === */
.era-expanded-layer {
  /* 绑定在模板新增的 class */
  position: fixed; /* 固定在视口（不受外层布局约束） */
  inset: 0; /* 铺满视口 */
  display: grid; /* 用 grid 居中内容 */
  place-items: center; /* 水平垂直置中 */
  padding: clamp(12px, 2.5vw, 24px); /* 视口自适应内边距 */
  pointer-events: auto; /* 启用点击（与父容器的 none 区分） */
  z-index: 2147483646; /* 仅次于悬浮球，保证在最上层 */
  background: transparent; /* 如需半透明遮罩可改为 rgba(0,0,0,.25) */
  overflow: auto; /* 内容超出时，容器自身滚动，不被裁剪 */
}

/* ===[新增] 小屏适配：面板在移动端更“填充”可视区 === */
@media (max-width: 640px) {
  /* 针对手机宽度 */
  :deep(.era-panel) {
    /* 重设面板宽高更贴合手机 */
    width: min(92vw, 560px); /* 放宽到 92vw，避免 60vw 太窄 */
    height: min(88vh, calc(100svh - 32px)); /* 兼顾状态栏/地址栏动态高度 */
  }
  .panel-body {
    /* 主要内容区滚动容器 */
    overscroll-behavior: contain; /* 防止滚动牵动背景页面 */
  }
}
</style>

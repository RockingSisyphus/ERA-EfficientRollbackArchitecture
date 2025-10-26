<template>
  <!-- 右侧操作卡：外层自包含，不依赖父组件样式 -->
  <section class="action-buttons-card" role="complementary" aria-label="ERA 快捷操作">
    <!-- 中文注释：操作卡容器 -->
    <h4 class="card-title">快捷操作</h4>
    <!-- 中文注释：卡片标题 -->
    <div class="btns">
      <!-- 中文注释：按钮垂直栈 -->
      <button class="btn primary" title="重新计算所有变量" @click.stop="onFullSync">
        <!-- 中文注释：主按钮 -->
        <span class="ico" aria-hidden="true">🔄</span>
        <!-- 中文注释：图标 -->
        <span class="label">完全重算变量</span>
        <!-- 中文注释：文字 -->
      </button>
      <button class="btn subtle" title="只重算最新一楼的变量" @click.stop="onLastSync">
        <!-- 中文注释：次按钮 -->
        <span class="ico" aria-hidden="true">♻️</span>
        <!-- 中文注释：图标 -->
        <span class="label">重算最后一楼变量</span>
        <!-- 中文注释：文字 -->
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Logger } from '../../utils/log'; // 中文注释：日志工具

const logger = new Logger(); // 中文注释：实例化日志

function onFullSync() {
  // 中文注释：完全重算事件
  logger.log('onFullSync', '点击“完全重算变量”，发送 manual_full_sync 事件。'); // 中文注释：日志
  eventEmit('manual_full_sync'); // 中文注释：发送全量重算事件（保持不变）
}

function onLastSync() {
  // 中文注释：局部重算事件
  logger.log('onLastSync', '点击“重算最后一楼变量”，发送 manual_sync 事件。'); // 中文注释：日志
  eventEmit('manual_sync'); // 中文注释：发送单楼重算事件（保持不变）
}
</script>

<style scoped>
/* === 外层卡片：与左侧 ERA 面板同风格（玻璃卡 + 轻浮雕） === */
.action-buttons-card {
  /* 中文注释：卡片容器 */
  width: 100%; /* 占满侧栏 */ /* 中文注释：自适应宽度 */
  padding: 12px; /* 内边距 */ /* 中文注释：留白 */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62)); /* 中文注释：半透明渐变 */
  border: 1px solid rgba(255, 255, 255, 0.6); /* 中文注释：浅色描边 */
  border-radius: 16px; /* 中文注释：圆角 */
  backdrop-filter: blur(10px); /* 中文注释：毛玻璃效果 */
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.6); /* 中文注释：外投影 + 内高光 */
  display: flex; /* 中文注释：纵向布局 */
  flex-direction: column; /* 中文注释：垂直排列 */
  gap: 10px; /* 中文注释：元素间距 */
}

/* 标题：与面板标题权重接近但略轻 */
.card-title {
  /* 中文注释：卡片标题 */
  margin: 0 0 4px; /* 中文注释：底部留白 */
  font-size: 14px; /* 中文注释：字号 */
  font-weight: 800; /* 中文注释：加粗 */
  letter-spacing: 0.3px; /* 中文注释：字距 */
  color: #1f2937; /* 中文注释：深灰文字 */
}

/* 按钮栈：竖直排列 */
.btns {
  /* 中文注释：按钮容器 */
  display: flex; /* 中文注释：flex 布局 */
  flex-direction: column; /* 中文注释：垂直排列 */
  gap: 10px; /* 中文注释：上下间距 */
}

/* 通用按钮造型：大号、易点、可聚焦 */
.btn {
  /* 中文注释：通用按钮 */
  display: grid; /* 中文注释：网格方便对齐图标与文字 */
  grid-template-columns: 22px 1fr; /* 中文注释：左 22px 图标 + 右侧文字 */
  align-items: center; /* 中文注释：垂直居中 */
  column-gap: 8px; /* 中文注释：图标与文字间距 */
  padding: 10px 12px; /* 中文注释：触控友好尺寸 */
  border-radius: 12px; /* 中文注释：圆角 */
  border: 1px solid rgba(0, 0, 0, 0.06); /* 中文注释：浅描边 */
  background: linear-gradient(180deg, #fafafa, #f3f4f6); /* 中文注释：浅灰渐变 */
  color: #374151; /* 中文注释：文字颜色 */
  font-weight: 700; /* 中文注释：字重 */
  font-size: 13px; /* 中文注释：字号 */
  cursor: pointer; /* 中文注释：可点击 */
  box-shadow:
    inset 0 1px 0 #fff,
    0 2px 8px rgba(0, 0, 0, 0.08); /* 中文注释：内高光 + 轻投影 */
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background 0.2s ease; /* 中文注释：交互过渡 */
  text-align: left; /* 中文注释：靠左 */
}

/* 主按钮：略带品牌色调（蓝青） */
.btn.primary {
  /* 中文注释：主按钮 */
  background: linear-gradient(180deg, #e0f2fe, #bfdbfe); /* 中文注释：浅蓝渐变 */
  border-color: #93c5fd; /* 中文注释：描边蓝 */
  color: #0f172a; /* 中文注释：深色文字 */
}

/* 次按钮：更素雅 */
.btn.subtle {
  /* 中文注释：次按钮 */
  background: linear-gradient(180deg, #f9fafb, #f3f4f6); /* 中文注释：浅灰渐变 */
  border-color: #e5e7eb; /* 中文注释：浅灰描边 */
}

/* 悬停与按压反馈 */
.btn:hover {
  /* 中文注释：悬停态 */
  transform: translateY(-1px); /* 中文注释：轻浮起 */
  box-shadow:
    inset 0 1px 0 #fff,
    0 6px 16px rgba(0, 0, 0, 0.12); /* 中文注释：增强投影 */
}
.btn:active {
  /* 中文注释：按下态 */
  transform: translateY(0); /* 中文注释：回落 */
  box-shadow:
    inset 0 1px 0 #fff,
    0 2px 8px rgba(0, 0, 0, 0.1); /* 中文注释：回到轻投影 */
}

/* 焦点可见性（无障碍） */
.btn:focus-visible {
  /* 中文注释：键盘聚焦态 */
  outline: 2px solid #60a5fa; /* 中文注释：蓝色描边 */
  outline-offset: 2px; /* 中文注释：描边偏移 */
}

/* 图标与文字 */
.ico {
  /* 中文注释：图标框 */
  display: inline-grid; /* 中文注释：网格放置 */
  place-items: center; /* 中文注释：居中 */
  width: 22px; /* 中文注释：宽度 */
  height: 22px; /* 中文注释：高度 */
  filter: saturate(0.95); /* 中文注释：轻饱和 */
}
.label {
  /* 中文注释：文字 */
  white-space: nowrap; /* 中文注释：不换行（文字短） */
  overflow: hidden; /* 中文注释：溢出裁剪 */
  text-overflow: ellipsis; /* 中文注释：省略号 */
}
</style>

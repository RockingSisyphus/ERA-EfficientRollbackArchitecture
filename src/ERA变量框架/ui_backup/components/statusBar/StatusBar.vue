<template>
  <!-- 收缩状态：悬浮球 -->
  <div v-if="!isExpanded" :id="statusBarId" ref="statusBarRef" class="status-bar era-collapsed" @click="onToggle">
    <span>ERA</span>
  </div>

  <!-- 展开状态：面板 -->
  <div v-else :id="statusBarId" ref="statusBarRef" class="status-bar era-expanded">
    <div class="content-container" v-html="contentHtml"></div>
    <ActionButtons @close="onToggle" />
  </div>
</template>

<script setup lang="ts">
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import { Logger } from '../../../utils/log';
import ActionButtons from '../actionButtons/ActionButtons.vue';

const props = defineProps<{
  isExpanded: boolean;
  onToggle: () => void;
  initialData: any;
}>();

const log = new Logger('ui-StatusBar');

// --- State ---
const statusBarRef = ref<HTMLElement | null>(null);
// latestStatData 状态已被提升到 ui/index.ts
const statusBarId = `era-status-bar-${getScriptId()}`;

// --- Computed ---
const contentHtml = computed(() => {
  if (props.initialData) {
    return jsonToHtml(props.initialData);
  }
  return '数据加载中...';
});

// --- Methods ---
// toggleExpand 函数已被移除，逻辑提升到 ui/index.ts
function jsonToHtml(data: any): string {
  if (typeof data !== 'object' || data === null) {
    return `<span style="color: #98fb98;">${String(data)}</span>`;
  }

  let listHtml = '<ul style="list-style-type: none; padding-left: 20px; margin: 0;">';
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      listHtml += `<li><strong style="color: #87ceeb;">${key}:</strong> ${jsonToHtml(value)}</li>`;
    }
  }
  listHtml += '</ul>';
  return listHtml;
}

// --- Draggable & Positioning Logic ---
function initializeDraggable(el: HTMLElement) {
  if (!$(el).hasClass('ui-draggable')) {
    $(el).draggable({
      containment: 'document',
      start: function () {
        $(this).css('transform', 'none');
      },
    });
  }
}

function checkAndAdjustPosition(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const margin = 10;

  let newTop = rect.top;
  let newLeft = rect.left;

  if (rect.bottom > windowHeight) newTop -= rect.bottom - windowHeight + margin;
  if (rect.right > windowWidth) newLeft -= rect.right - windowWidth + margin;
  if (newTop < 0) newTop = margin;
  if (newLeft < 0) newLeft = margin;

  if (newTop !== rect.top || newLeft !== rect.left) {
    $(el).css({ top: `${newTop}px`, left: `${newLeft}px` });
    log.debug('checkAndAdjustPosition', `面板超出边界，自动调整位置到 top: ${newTop}, left: ${newLeft}`);
  }
}

// --- Watcher for DOM changes ---
watch(statusBarRef, newEl => {
  if (newEl) {
    nextTick(() => {
      // 确保元素在 DOM 中稳定后再操作
      initializeDraggable(newEl);
      if (props.isExpanded) {
        checkAndAdjustPosition(newEl);
      } else if (!newEl.style.top && !newEl.style.left) {
        // 如果是收缩状态且没有位置，设置初始位置
        $(newEl).css({ bottom: '120px', left: '20px' });
      }
    });
  }
});

// --- Lifecycle & Event Handling ---
// handleWriteDone 逻辑已被提升到 ui/index.ts

onMounted(() => {
  log.debug('onMounted', '组件已挂载。');
  // 如果是展开状态，并且没有初始数据，则主动请求一次
  if (props.isExpanded && !props.initialData) {
    log.debug('onMounted', '展开状态无初始数据，发送 era:getCurrentVars 事件请求数据。');
    eventEmit('era:getCurrentVars');
  }
});

onUnmounted(() => {
  log.debug('onUnmounted', '组件即将卸载。');
  // 事件监听的移除也已提升到 ui/index.ts
});
</script>

<style scoped>
.status-bar {
  position: fixed;
  z-index: 2147483647;
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  border-top: 1px solid #444;
  box-sizing: border-box;
  transition:
    width 0.3s ease-in-out,
    height 0.3s ease-in-out,
    border-radius 0.3s ease-in-out;
}

.era-collapsed {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.era-expanded {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  cursor: default;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.content-container {
  overflow-y: auto;
  flex-grow: 1;
}
</style>

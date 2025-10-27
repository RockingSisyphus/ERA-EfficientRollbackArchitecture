<template>
  <section class="acc">
    <!-- 折叠头：点击切换 -->
    <button class="acc-head" :aria-expanded="open ? 'true' : 'false'" @click="open = !open">
      <span class="caret" :class="{ open }">▸</span>
      <!-- 指示箭头 -->
      <span class="title">{{ title }}</span>
      <!-- 标题文本 -->
      <span class="spacer"></span>
      <!-- 弹性空隙 -->
      <span class="hint">{{ open ? '收起' : '展开' }}</span>
      <!-- 右侧提示 -->
    </button>

    <!-- 内容：高度过渡（使用 CSS Grid） -->
    <div class="acc-body" :class="{ open }">
      <div class="inner">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{ title: string; defaultOpen?: boolean }>(), {
  defaultOpen: false,
});

const open = ref<boolean>(props.defaultOpen);
</script>

<style scoped>
.acc {
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  background: var(--accordion-bg);
  overflow: hidden;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}

.acc-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--mk-pill-null-bg);
  border-bottom: 1px solid var(--border-soft);
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 800;
  color: var(--text-subtitle);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
.caret {
  transition: transform 0.18s ease;
}
.caret.open {
  transform: rotate(90deg);
}
.title {
  font-size: 13px;
}
.spacer {
  flex: 1;
}
.hint {
  font-size: 12px;
  color: var(--text-normal);
  transition: color 0.3s ease;
}

.acc-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.28s ease-in-out;
  background: var(--accordion-body-bg);
}
.acc-body.open {
  max-height: 600px; /* 为展开的内容提供一个更大的最大高度 */
  overflow-y: auto; /* 当内容超出最大高度时，显示滚动条 */
}

.inner {
  padding: 10px 12px;
}
</style>

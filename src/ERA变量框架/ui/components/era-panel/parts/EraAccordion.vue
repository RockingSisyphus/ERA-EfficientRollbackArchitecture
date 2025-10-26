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
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  background: linear-gradient(180deg, #fff, #fafafa);
  overflow: hidden;
}

.acc-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(180deg, #f9fafb, #f3f4f6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 800;
  color: #374151;
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
  color: #6b7280;
}

.acc-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
  background: rgba(255, 255, 255, 0.82);
}
.acc-body.open {
  grid-template-rows: 1fr;
}

.inner {
  overflow: hidden;
  /* Add transitions for padding and visibility */
  transition:
    padding 0.28s ease,
    visibility 0s 0.28s; /* Hide after the collapse transition ends */
  padding: 0 12px;
  visibility: hidden;
}
.acc-body.open .inner {
  padding: 10px 12px;
  visibility: visible;
  transition-delay: 0s; /* Show immediately when opening */
}
</style>

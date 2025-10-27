<template>
  <section class="tabs">
    <!-- 页签行 -->
    <div class="tab-bar" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab-btn"
        :class="{ active: t.key === innerActive }"
        role="tab"
        @click="setActive(t.key)"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- 内容区：根据活动键渲染对应插槽 -->
    <div class="tab-content">
      <div v-if="innerActive === 'pure'">
        <slot name="pure" />
        <!-- 纯净状态数据内容 -->
      </div>
      <div v-else>
        <slot name="full" />
        <!-- 完整状态数据内容 -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'; // 引入响应式工具
import { Logger } from '../../../../utils/log';

type TabItem = { key: 'pure' | 'full'; label: string }; // Tab 项类型

const logger = new Logger();
const props = defineProps<{ tabs: TabItem[]; active?: 'pure' | 'full' }>(); // 输入 tabs 与可选 active
const emit = defineEmits<{ 'update:active': ['pure' | 'full'] }>(); // v-model:active

const innerActive = ref<'pure' | 'full'>(props.active ?? 'pure'); // 内部活动键

watch(
  () => props.active,
  v => {
    if (v) {
      logger.debug('watch:active', `外部同步 active tab 为: ${v}`);
      innerActive.value = v;
    }
  },
); // 外部变更时同步
function setActive(k: 'pure' | 'full') {
  logger.log('setActive', `用户点击，切换 tab 到: ${k}`);
  innerActive.value = k;
  emit('update:active', k);
} // 切换并抛出

onMounted(() => {
  logger.log('onMounted', '组件已挂载', { props });
});
</script>

<style scoped>
.tabs {
  margin-top: 12px;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  overflow: hidden;
  background: var(--accordion-bg);
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}
.tab-bar {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid var(--border-soft);
  background: var(--mk-pill-null-bg);
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}
.tab-btn {
  padding: 8px 12px;
  font-weight: 800;
  font-size: 13px;
  color: var(--text-normal);
  background: var(--bg-solid);
  border: 1px solid var(--settings-border-input);
  border-radius: 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}
.tab-btn.active {
  color: var(--settings-text-input);
  border-color: var(--settings-border-btn-primary);
  box-shadow: var(--settings-shadow-inset), var(--tab-active-shadow);
}
.tab-content {
  padding: 10px 12px;
  background: var(--tab-content-bg);
  transition: background 0.3s ease;
}
</style>

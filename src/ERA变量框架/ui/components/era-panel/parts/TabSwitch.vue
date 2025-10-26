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

const logger = new Logger('ui-TabSwitch');
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
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, #fff, #fafafa);
}
.tab-bar {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, #f9fafb, #f3f4f6);
}
.tab-btn {
  padding: 8px 12px;
  font-weight: 800;
  font-size: 13px;
  color: #6b7280;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
}
.tab-btn.active {
  color: #111827;
  border-color: #93c5fd;
  box-shadow:
    inset 0 1px 0 #fff,
    0 0 0 3px rgba(147, 197, 253, 0.35);
}
.tab-content {
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.86);
}
</style>

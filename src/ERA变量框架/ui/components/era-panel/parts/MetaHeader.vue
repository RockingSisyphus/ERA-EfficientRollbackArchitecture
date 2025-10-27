<template>
  <section class="meta">
    <h4 class="meta-title">最新消息元数据</h4>
    <!-- 小节标题 -->
    <div class="kv">
      <div class="item">
        <span class="k">mk</span>
        <!-- 键：mk -->
        <span class="v" :title="mk">{{ mk || '—' }}</span>
        <!-- 值：mk -->
      </div>
      <div class="item">
        <span class="k">message_id</span>
        <!-- 键：message_id -->
        <span class="v">{{ messageId ?? '—' }}</span>
        <!-- 值：message_id -->
      </div>
    </div>
    <div class="glow"></div>
    <!-- 装饰：流光条 -->
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { Logger } from '../../../../utils/log';

const logger = new Logger();

// 接收父组件传入的两个字段
const props = defineProps<{ mk: string; messageId: number }>(); // 简单的只读展示

onMounted(() => {
  logger.log('onMounted', '组件已挂载', { props });
});

watch(
  () => props,
  newProps => {
    logger.debug('watch:props', 'Props 发生变化', { newProps });
  },
  { deep: true },
);
</script>

<style scoped>
.meta {
  position: relative;
  padding: 12px 12px 14px;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  background: var(--meta-bg);
  box-shadow: var(--meta-shadow), var(--settings-shadow-inset);
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}
.meta-title {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 800;
  color: var(--text-subtitle);
  transition: color 0.3s ease;
}

.kv {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 8px 12px;
}
.item {
  display: contents;
}
.k {
  justify-self: start;
  align-self: center;
  font-size: 12px;
  color: var(--text-normal);
  background: var(--meta-key-bg);
  border: 1px solid var(--settings-border-input);
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 700;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
.v {
  align-self: center;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 12px;
  color: var(--settings-text-input);
  background: var(--bg-solid);
  border: 1px solid var(--settings-border-input);
  padding: 6px 8px;
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

/* 顶部流光装饰 */
.glow {
  position: absolute;
  left: 12px;
  right: 12px;
  top: -1px;
  height: 3px;
  border-radius: 999px;
  background: var(--meta-glow-bg);
  filter: blur(0.4px);
}
</style>

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

    <!-- 内容：高度过渡 -->
    <div ref="bodyRef" class="acc-body" :style="{ maxHeight: bodyMaxHeight }">
      <div v-show="open" class="inner">
        <!-- v-show：不销毁子树，只隐藏 -->
        <slot />
        <!-- 插槽内容 -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'; // 引入生命周期与异步刷新

const props = withDefaults(defineProps<{ title: string; defaultOpen?: boolean }>(), {
  defaultOpen: false, // 默认收起
}); // props 定义
const open = ref<boolean>(props.defaultOpen); // 折叠状态
const bodyRef = ref<HTMLElement | null>(null); // 内容容器引用
const bodyMaxHeight = ref<string>('0px'); // 当前 maxHeight

// 重新测量内容高度并写入样式变量
async function recalc() {
  // 定义重测函数
  await nextTick(); // 等待 DOM 更新
  const el = bodyRef.value; // 取到容器
  if (!el) {
    bodyMaxHeight.value = '0px';
    return;
  } // 容器不存在则归零
  if (open.value) {
    // 若展开
    const h = el.scrollHeight; // 读取实际内容高度
    bodyMaxHeight.value = h + 'px'; // 应用到样式
  } else {
    bodyMaxHeight.value = '0px'; // 收起设为 0
  }
}

// 监听开合状态变化时重测
watch(open, () => recalc()); // 状态变化→重测
onMounted(() => {
  // 挂载后
  recalc(); // 立即测一次
  window.addEventListener('resize', recalc); // 监听窗口大小变化
});
onBeforeUnmount(() => window.removeEventListener('resize', recalc)); // 清理监听
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
  overflow: hidden;
  transition: max-height 0.28s ease; /* 略增时长更顺滑 */
  background: rgba(255, 255, 255, 0.82);
}

.inner {
  padding: 10px 12px;
}
</style>
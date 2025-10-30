<template>
  <!-- ★ 新增唯一 id：不改变任何逻辑，仅用于限制样式作用域 -->
  <div id="era-snapshot-ui" class="snapshot-manager">
    <div class="selector-wrapper">
      <!-- 外层容器：保留，改为纵向布局更协调 -->
      <div class="select-field" role="group" aria-labelledby="mk-label">
        <!-- 字段容器：用于浮动标题 -->
        <label id="mk-label" for="mk-selector" class="field-label">查看快照</label>
        <!-- 浮动小标题：不再占用水平空间 -->
        <div class="select-container">
          <!-- 下拉容器：保留右侧箭头与阴影效果 -->
          <select id="mk-selector" v-model="selectedMk" class="mk-selector" @change="handleSelectionChange">
            <option v-for="(mk, index) in reversedSelectedMks" :key="mk || `null-${index}`" :value="mk">
              {{ formatMkForDisplay(mk, index) }}
              <!-- 选项显示文本 -->
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-indicator">正在加载快照...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <template v-if="displayData">
      <EraAccordion title="消息元数据" :default-open="true">
        <MetaHeader :mk="displayData.mk" :message-id="displayData.message_id" />
      </EraAccordion>

      <TabSwitch v-model:active="activeTab" :tabs="tabs">
        <template #pure>
          <PrettyJsonViewer :value="displayData.statWithoutMeta" :default-collapsed="true" :max-depth="Infinity" />
        </template>
        <template #full>
          <PrettyJsonViewer :value="displayData.stat" :default-collapsed="true" :max-depth="Infinity" />
        </template>
      </TabSwitch>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { QueryResultItem, QueryResultPayload, WriteDonePayload } from '../../utils/constants';
import { Logger } from '../../utils/log';
import EraAccordion from '../template/EraAccordion.vue';
import PrettyJsonViewer from '../template/PrettyJsonViewer.vue';
import TabSwitch from '../template/TabSwitch.vue';
import MetaHeader from './EraPanelContent/MetaHeader.vue';

type DisplayData = Pick<WriteDonePayload, 'mk' | 'message_id' | 'stat' | 'statWithoutMeta'>;
type TabItem = { key: 'pure' | 'full'; label: string };

const props = defineProps<{
  latestData: WriteDonePayload | null;
}>();

const logger = new Logger();

const latestMkFromProps = computed(() => props.latestData?.mk ?? null);
const selectedMk = ref<string | null>(latestMkFromProps.value);
const historicalSnapshot = ref<QueryResultItem | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const tabs: TabItem[] = [
  { key: 'pure', label: '纯净状态数据' },
  { key: 'full', label: '完整状态数据' },
];
const activeTab = ref<'pure' | 'full'>('pure');

const reversedSelectedMks = computed(() => {
  return props.latestData?.selectedMks?.slice().reverse() ?? [];
});

const displayData = computed<DisplayData | null>(() => {
  if (selectedMk.value === latestMkFromProps.value) {
    return props.latestData;
  }
  return historicalSnapshot.value;
});

watch(
  () => latestMkFromProps.value,
  newLatestMk => {
    if (selectedMk.value !== newLatestMk) {
      selectedMk.value = newLatestMk;
      historicalSnapshot.value = null;
    }
    error.value = null;
    loading.value = false;
  },
);

const handleSelectionChange = () => {
  const mk = selectedMk.value;

  if (mk === latestMkFromProps.value) {
    historicalSnapshot.value = null;
    error.value = null;
    loading.value = false;
    return;
  }

  if (mk) {
    loading.value = true;
    error.value = null;
    historicalSnapshot.value = null;
    logger.debug('SnapshotManager', `请求快照，mk: ${mk}`);
    eventEmit('era:getSnapshotAtMk', { mk });
  }
};

const handleQueryResult = (detail: QueryResultPayload) => {
  if (detail.queryType === 'getSnapshotAtMk' && detail.request.mk === selectedMk.value) {
    loading.value = false;
    if (detail.result) {
      historicalSnapshot.value = detail.result as QueryResultItem;
      error.value = null;
    } else {
      error.value = `未找到与 mk "${selectedMk.value}" 相关的快照。`;
      historicalSnapshot.value = null;
    }
  }
};

const formatMkForDisplay = (mk: string | null, index: number): string => {
  const total = reversedSelectedMks.value.length;
  const msgId = total - 1 - index;
  const isLatest = mk === latestMkFromProps.value;

  if (!mk) return `消息 ${msgId} (无MK)`;

  const shortMk = mk.substring(mk.length - 6);
  const label = `消息 ${msgId} (...${shortMk})`;

  return isLatest ? `${label} (最新)` : label;
};

onMounted(() => {
  eventOn('era:queryResult', handleQueryResult);
});

onUnmounted(() => {
  eventRemoveListener('era:queryResult', handleQueryResult);
});
</script>

<!-- ★ 取消 scoped，统一以 #era-snapshot-ui 作为“伪作用域”根选择器 -->
<style>
/* =========================
   ERA Snapshot 下拉框主题（仅限本组件）
   通过唯一根选择器 #era-snapshot-ui 约束作用范围
   ========================= */

/* ---- 根容器：保留原布局，增强可读间距 ---- */
#era-snapshot-ui.snapshot-manager {
  /* 仅限本组件根容器 */
  display: flex; /* 弹性布局：竖向栈 */
  flex-direction: column; /* 纵向排列 */
  gap: 12px; /* 行距 */
}

/* ---- 选择器区域：标签与下拉并排 ---- */
#era-snapshot-ui .selector-wrapper {
  /* 选择器外层容器 */
  display: block; /* 纵向堆叠，标题在上，下拉在下 */
  margin-bottom: 4px; /* 底部留一点呼吸 */
}
#era-snapshot-ui .select-field {
  /* 字段容器 */
  position: relative; /* 作为浮动标题的定位上下文 */
  display: block; /* 独占一行，便于对齐其他控件 */
}

/* ---- 左侧标签：略提权重与对比度 ---- */
#era-snapshot-ui .selector-label {
  /* “查看快照:” 标签 */
  font-size: 14px; /* 字号 */
  font-weight: 700; /* 加粗，便于识别 */
  color: var(--text-title); /* 使用标题色 */
  flex-shrink: 0; /* 不随容器收缩 */
  letter-spacing: 0.2px; /* 微调字距，增强精致感 */
}

/* ---- 下拉容器：做“输入框卡片”视觉 ---- */
#era-snapshot-ui .select-container {
  /* 下拉容器 */
  position: relative; /* 用于放置内置箭头 */
  flex-grow: 1; /* 占满剩余宽度 */
  isolation: isolate; /* 防止子层混合到外部 */
}

/* ---- 自定义下拉箭头：跟随焦点旋转 ---- */
#era-snapshot-ui .select-container::after {
  /* 右侧箭头 */
  content: '▾'; /* 使用更纤细的三角字符 */
  position: absolute; /* 绝对定位到右侧 */
  top: 50%; /* 垂直居中基准 */
  right: 12px; /* 右侧内边距 */
  transform: translateY(-50%) rotate(0deg); /* 居中与初始角度 */
  font-size: 14px; /* 箭头字号 */
  color: var(--snapshot-muted); /* 箭头颜色 */
  pointer-events: none; /* 不遮挡点击 */
  transition:
    transform 0.18s ease,
    color 0.2s ease; /* 旋转与颜色过渡 */
  z-index: 1; /* 在下拉之上但仍在容器内 */
}

/* ---- 焦点时箭头旋转，提示“已激活” ---- */
#era-snapshot-ui .select-container:focus-within::after {
  /* 容器获焦 */
  transform: translateY(-50%) rotate(180deg); /* 箭头翻转 */
  color: var(--snapshot-accent); /* 用主色提示激活 */
}

/* ---- 下拉本体：做“半玻璃输入框 + 细描边 + 阴影” ---- */
#era-snapshot-ui .mk-selector {
  /* 原下拉元素 */
  width: 100%; /* 占满容器宽度 */
  padding: 10px 36px 10px 12px; /* 留出右侧箭头空间 */
  border-radius: 10px; /* 圆角输入框 */
  border: 1px solid var(--snapshot-stroke); /* 细描边 */
  background:
    var(--snapshot-bg-gradient),
    var(--snapshot-bg); /* 基底色（卡片色） */
  backdrop-filter: saturate(1.05) blur(2px); /* 轻玻璃效果（有支持的浏览器） */
  color: var(--snapshot-text); /* 文本颜色 */
  font-family: inherit; /* 继承字体 */
  font-size: 14px; /* 字号 */
  line-height: 1.2; /* 行高 */
  cursor: pointer; /* 指针形态 */
  -webkit-appearance: none; /* 去除默认外观：Safari/Chrome */
  -moz-appearance: none; /* 去除默认外观：Firefox */
  appearance: none; /* 标准去除默认外观 */
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.25s ease; /* 交互过渡 */
  box-shadow:
    var(--snapshot-inner-shadow),
    var(--snapshot-outer-shadow); /* 轻外阴影，浮起感 */
}

/* ---- 悬停：描边加深，提示可交互 ---- */
#era-snapshot-ui .mk-selector:hover {
  /* 悬停态 */
  border-color: color-mix(in oklab, var(--snapshot-stroke), var(--snapshot-accent) 22%); /* 混合一点主色 */
}

/* ---- 焦点/键盘访问：主色描边 + 柔光外环 ---- */
#era-snapshot-ui .mk-selector:focus {
  /* 焦点态（含鼠标） */
  outline: none; /* 移除系统外描边 */
  border-color: var(--snapshot-accent); /* 主色描边 */
  box-shadow:
    0 0 0 3px var(--snapshot-accent-soft),
    /* 柔光外环 */ var(--snapshot-focus-inner-shadow); /* 保留内高光 */
}
#era-snapshot-ui .mk-selector:focus-visible {
  /* 键盘可见焦点态 */
  outline: none; /* 保持一致 */
}

/* ---- 选项样式（可控性有限，不同系统略有差异） ---- */
#era-snapshot-ui .mk-selector option {
  /* 下拉列表项 */
  color: var(--snapshot-text); /* 文本色 */
  background: var(--snapshot-bg); /* 背景色 */
}

/* ---- 加载 / 错误块：统一卡片化观感 ---- */
#era-snapshot-ui .loading-indicator,
#era-snapshot-ui .error-message {
  /* 信息卡片 */
  padding: 18px; /* 内边距 */
  text-align: center; /* 居中展示 */
  border-radius: 12px; /* 圆角 */
  border: 1px dashed var(--line, rgba(0, 0, 0, 0.12)); /* 虚线边界 */
  background: var(--bg-empty, rgba(0, 0, 0, 0.03)); /* 空态背景 */
  color: var(--text-normal, #2a2a2a); /* 文字色 */
}

/* ---- 错误态：更醒目的红系提示，但保持柔和 ---- */
#era-snapshot-ui .error-message {
  /* 错误卡片 */
  color: var(--text-error, #a81818); /* 错误文字 */
  background: var(--bg-error-soft, rgba(235, 68, 90, 0.08)); /* 柔和底色 */
  border-color: var(--border-error, rgba(235, 68, 90, 0.45)); /* 错误描边 */
}

/* ---- 细节优化：在低运动偏好下关闭动画 ---- */
@media (prefers-reduced-motion: reduce) {
  #era-snapshot-ui .select-container::after,
  #era-snapshot-ui .mk-selector {
    transition: none; /* 关闭过渡 */
  }
}

/* ── 浮动标题：微型标签，悬停于输入框上边缘 ── */
#era-snapshot-ui .field-label {
  /* 浮动标题文本“查看快照” */
  position: absolute; /* 绝对定位到输入框之上 */
  top: 0; /* 贴近容器顶部 */
  left: 12px; /* 与输入框左内边距对齐 */
  transform: translateY(-50%); /* 上移半行，呈“贴边悬浮”效果 */
  padding: 0 6px; /* 小口袋背景，避免与输入框边线重叠 */
  font-size: 12px; /* 微小字号，作为字段名 */
  line-height: 1; /* 紧凑行高 */
  color: var(--snapshot-muted); /* 次要文字色 */
  background: var(--snapshot-bg); /* 背景同卡片色，营造“挖空”效果 */
  border-radius: 6px; /* 圆润角 */
  pointer-events: none; /* 不遮挡点击到 select */
  z-index: 1; /* 盖在输入框描边之上 */
}

/* ── 让下拉本体为浮动标题“腾位”：加上足够的上内边距 ── */
#era-snapshot-ui .mk-selector {
  /* 原生下拉 */
  padding-top: 22px; /* 原为 ~10px；增大以容纳浮动标题 */
  padding-right: 36px; /* 保持与箭头空间一致 */
  padding-bottom: 10px; /* 原下边距不变 */
  padding-left: 12px; /* 左边距对齐容器 */
}

/* ── 可选：当获得焦点时，标题颜色联动强调 ── */
#era-snapshot-ui .select-field:focus-within .field-label {
  /* 容器聚焦（select 获焦） */
  color: var(--snapshot-accent); /* 与高亮色一致 */
}

/* ── 箭头：保持你先前的右侧内置箭头样式不变（引用已有规则） ── */
#era-snapshot-ui .select-container::after {
  /* 已存在的右侧箭头 */
  content: '▾'; /* 保持 */
  position: absolute; /* 保持 */
  top: 50%; /* 保持 */
  right: 12px; /* 保持 */
  transform: translateY(-50%) rotate(0deg); /* 保持 */
  font-size: 14px; /* 保持 */
  color: var(--snapshot-muted); /* 与标题次色一致，更统一 */
  pointer-events: none; /* 保持 */
  transition:
    transform 0.18s ease,
    color 0.2s ease; /* 保持 */
}

/* ── 获焦时箭头联动旋转高亮（如果你之前已有此规则，可保留任一版本） ── */
#era-snapshot-ui .select-container:focus-within::after {
  transform: translateY(-50%) rotate(180deg); /* 旋转指示展开感 */
  color: var(--snapshot-accent); /* 与焦点高亮同步 */
}
</style>

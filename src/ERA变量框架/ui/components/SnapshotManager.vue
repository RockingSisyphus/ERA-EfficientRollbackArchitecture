<template>
  <!-- ★ 新增唯一 id：不改变任何逻辑，仅用于限制样式作用域 -->
  <div id="era-snapshot-ui" class="snapshot-manager">
    <div class="selector-wrapper">
      <!-- 外层容器：保留，改为纵向布局更协调 -->
      <div class="select-field" role="group" aria-labelledby="mk-label">
        <!-- 字段容器：用于浮动标题 -->
        <label id="mk-label" for="mk-selector" class="field-label">按消息密钥(MK)查看</label>
        <!-- 浮动小标题：不再占用水平空间 -->
        <div class="select-container">
          <!-- 下拉容器：保留右侧箭头与阴影效果 -->
          <select id="mk-selector" v-model="selectedMk" class="mk-selector" @change="handleSelectionChange">
            <option :value="null" disabled>-- 从列表中选择 --</option>
            <option v-for="(mk, index) in reversedSelectedMks" :key="mk || `null-${index}`" :value="mk">
              {{ formatMkForDisplay(mk, index) }}
              <!-- 选项显示文本 -->
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="selector-wrapper">
      <div class="select-field" role="group" aria-labelledby="mid-label">
        <label id="mid-label" for="mid-input" class="field-label">按消息ID查看</label>
        <div class="id-query-container">
          <input
            id="mid-input"
            v-model.number="messageIdInput"
            type="number"
            class="mk-selector id-input"
            placeholder="输入消息 ID..."
            @keyup.enter="queryByMId"
          />
          <button class="query-button" @click="queryByMId">查找</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-indicator">正在加载快照...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <template v-if="displayData">
      <EraAccordion title="消息元数据" :default-open="true">
        <MetaHeader :mk="displayData.mk" :message-id="displayData.message_id" :is-user="isUserMessageComputed" />
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
import { isUserMessage } from '../../utils/message';
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
const messageIdInput = ref<number | null>(null);
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
  // 优先显示查询到的历史快照
  if (historicalSnapshot.value) {
    return historicalSnapshot.value;
  }
  // 如果没有历史快照，且当前选中了最新的MK（或默认状态），则显示最新的数据
  if (selectedMk.value === latestMkFromProps.value) {
    return props.latestData;
  }
  // 其他情况（如列表选中了非最新项但还没返回结果）不显示
  return null;
});

const isUserMessageComputed = computed(() => {
  if (!displayData.value) return false;
  // 如果是历史快照(QueryResultItem)，它会包含 is_user 属性
  if ('is_user' in displayData.value) {
    return (displayData.value as QueryResultItem).is_user;
  }
  // 否则，这是最新数据(WriteDonePayload)，我们需要从消息中获取它
  const message = getChatMessages(displayData.value.message_id, { include_swipes: false })[0];
  return message ? isUserMessage(message) : false;
});

watch(
  () => latestMkFromProps.value,
  newLatestMk => {
    // 当外部数据更新时，重置UI到最新状态
    selectedMk.value = newLatestMk;
    historicalSnapshot.value = null;
    messageIdInput.value = null;
    error.value = null;
    loading.value = false;
  },
  { immediate: true },
);

const handleSelectionChange = () => {
  const mk = selectedMk.value;
  // 清理其他查询方式的状态
  messageIdInput.value = null;
  historicalSnapshot.value = null;
  error.value = null;

  if (!mk || mk === latestMkFromProps.value) {
    loading.value = false;
    return;
  }

  loading.value = true;
  logger.debug('SnapshotManager', `(MK Select) 请求快照, mk: ${mk}`);
  eventEmit('era:getSnapshotAtMk', { mk });
};

const queryByMId = () => {
  if (messageIdInput.value === null || messageIdInput.value < 0) {
    error.value = '请输入一个有效的、非负的消息 ID。';
    return;
  }
  // 清理其他查询方式的状态
  selectedMk.value = null; // 从下拉列表中取消选择
  historicalSnapshot.value = null;
  error.value = null;
  loading.value = true;

  logger.debug('SnapshotManager', `(ID Query) 请求快照, message_id: ${messageIdInput.value}`);
  eventEmit('era:getSnapshotAtMId', { message_id: messageIdInput.value });
};

const handleQueryResult = (detail: QueryResultPayload) => {
  loading.value = false;

  const handleResult = (result: QueryResultItem | null, errorMsg: string) => {
    if (result) {
      historicalSnapshot.value = result;
      // 同步下拉框的选中项
      selectedMk.value = result.mk;
      error.value = null;
    } else {
      historicalSnapshot.value = null;
      error.value = errorMsg;
    }
  };

  if (detail.queryType === 'getSnapshotAtMk' && detail.request.mk === selectedMk.value) {
    handleResult(detail.result as QueryResultItem | null, `未找到与 MK "${selectedMk.value}" 相关的快照。`);
  } else if (detail.queryType === 'getSnapshotAtMId' && detail.request.message_id === messageIdInput.value) {
    handleResult(detail.result as QueryResultItem | null, `未找到与消息 ID "${messageIdInput.value}" 相关的快照。`);
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
/* ───────── 局部主题变量映射：让本组件随全局明/暗主题自动变色 ───────── */
:where(#era-snapshot-ui) {
  /* 文本与背景（映射全局变量） */
  --snapshot-text: var(--text-normal); /* 常规文字色 */
  --snapshot-muted: var(--muted); /* 次级文字色 */
  --snapshot-bg: var(--paper); /* 控件/卡片底色 */
  --snapshot-bg-gradient: linear-gradient(to bottom, color-mix(in oklab, var(--paper), transparent 92%), transparent);

  /* 线条与描边 */
  --snapshot-stroke: var(--line); /* 统一描边色 */

  /* 品牌/强调色（优先使用 --primary；否则退回 --accent，再退回一个安全紫靛） */
  --snapshot-accent: var(--primary, var(--accent, #4f46e5));
  --on-accent: var(--on-accent, #ffffff); /* 强调底上的可读前景色 */

  /* 软光环/阴影（随主题微调） */
  --snapshot-accent-soft: color-mix(in oklab, var(--snapshot-accent), transparent 82%);
  --snapshot-outer-shadow: 0 6px 18px color-mix(in oklab, #000, transparent 90%);
  --snapshot-inner-shadow: inset 0 1px 0 color-mix(in oklab, #fff, transparent 92%);
  --snapshot-focus-inner-shadow: inset 0 1px 0 color-mix(in oklab, #fff, transparent 90%);

  /* 危险/错误色（映射全局 danger，没有则回退红色系） */
  --snapshot-danger: var(--danger, #e11d48);
  --snapshot-danger-soft: color-mix(in oklab, var(--snapshot-danger), transparent 88%);
}

/* （可选）若你的 ThemeToggle 通过 data-theme 切换，这段让暗色阴影层次更自然 */
:where(html[data-theme='dark'] #era-snapshot-ui),
:where(body[data-theme='dark'] #era-snapshot-ui) {
  --snapshot-outer-shadow: 0 8px 22px color-mix(in oklab, #000, transparent 70%);
  --snapshot-inner-shadow: inset 0 1px 0 color-mix(in oklab, #fff, transparent 94%);
}

/* （亦可选）系统级暗色偏好时的微调：双保险 */
@media (prefers-color-scheme: dark) {
  #era-snapshot-ui {
    --snapshot-outer-shadow: 0 8px 22px color-mix(in oklab, #000, transparent 72%);
    --snapshot-inner-shadow: inset 0 1px 0 color-mix(in oklab, #fff, transparent 94%);
  }
}

/* =========================
   ERA Snapshot 下拉框主题（仅限本组件）
   通过唯一根选择器 #era-snapshot-ui 约束作用范围
   ========================= */

/* ---- 根容器：保留原布局，增强可读间距 ---- */
#era-snapshot-ui.snapshot-manager {
  /* 仅限本组件根容器 */
  display: flex; /* 弹性布局：竖向栈 */
  flex-direction: column; /* 纵向排列 */
  gap: 16px; /* 行距 */
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
  background: var(--snapshot-bg-gradient), var(--snapshot-bg); /* 基底色（卡片色） */
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
  box-shadow: var(--snapshot-inner-shadow), var(--snapshot-outer-shadow); /* 轻外阴影，浮起感 */
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
  /* ❗三件套全部改为 snapshot danger 系列，自动随主题适配 */
  color: var(--snapshot-danger);
  background: var(--snapshot-danger-soft);
  border-color: color-mix(in oklab, var(--snapshot-danger), transparent 55%);
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
  padding-top: 22px;
}

/* ── 可选：当获得焦点时，标题颜色联动强调 ── */
#era-snapshot-ui .select-field:focus-within .field-label {
  color: var(--snapshot-accent);
}

/* ── 箭头：保持你先前的右侧内置箭头样式不变（引用已有规则） ── */
#era-snapshot-ui .select-container::after {
  content: '▾';
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--snapshot-muted);
  pointer-events: none;
  transition:
    transform 0.18s ease,
    color 0.2s ease;
}

/* ── 获焦时箭头联动旋转高亮（如果你之前已有此规则，可保留任一版本） ── */
#era-snapshot-ui .select-container:focus-within::after {
  transform: translateY(-50%) rotate(180deg);
  color: var(--snapshot-accent);
}

/* =========================
   ID 查询输入框与按钮
   ========================= */

/* 容器：实现无缝拼接和整体焦点效果 */
#era-snapshot-ui .id-query-container {
  display: flex;
  border-radius: 10px;
  transition: box-shadow 0.18s ease;
}
#era-snapshot-ui .id-query-container:focus-within {
  box-shadow: 0 0 0 3px var(--snapshot-accent-soft);
}

/* 输入框：继承 .mk-selector 样式，并调整拼接侧的圆角和边框 */
#era-snapshot-ui .id-input {
  flex-grow: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-width: 0;
}
/* 输入框获焦时，由父容器处理阴影 */
#era-snapshot-ui .id-input:focus {
  box-shadow: none;
  border-color: var(--snapshot-stroke);
}

/* 查询按钮：独立且完整的样式，确保高度一致 */
#era-snapshot-ui .query-button {
  flex-shrink: 0;
  padding: 22px 16px 10px; /* 统一垂直 padding 以对齐输入框 */
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: var(--snapshot-btn-bg);
  color: var(--snapshot-btn-text);
  border: 1px solid var(--snapshot-stroke);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
}
#era-snapshot-ui .query-button:hover {
  background-color: var(--snapshot-btn-hover-bg);
  border-color: color-mix(in oklab, var(--snapshot-stroke), var(--snapshot-text) 10%);
}
#era-snapshot-ui .query-button:active {
  transform: scale(0.97);
  background-color: var(--snapshot-btn-active-bg);
}
#era-snapshot-ui .query-button:focus-visible {
  outline: none;
  z-index: 1; /* 确保焦点阴影在最上层 */
  box-shadow: 0 0 0 3px var(--snapshot-accent-soft);
}
</style>

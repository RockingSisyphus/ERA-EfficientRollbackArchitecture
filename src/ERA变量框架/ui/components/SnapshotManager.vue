<template>
  <div class="snapshot-manager">
    <div class="selector-wrapper">
      <label for="mk-selector" class="selector-label">查看快照:</label>
      <div class="select-container">
        <select id="mk-selector" v-model="selectedMk" class="mk-selector" @change="handleSelectionChange">
          <option v-for="(mk, index) in reversedSelectedMks" :key="mk || `null-${index}`" :value="mk">
            {{ formatMkForDisplay(mk, index) }}
          </option>
        </select>
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
  (newLatestMk) => {
    // 如果当前选中的不是最新的，或者根本没选中，就自动更新到最新
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

<style scoped>
.snapshot-manager {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.selector-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.selector-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-title);
  flex-shrink: 0;
}
.select-container {
  position: relative;
  flex-grow: 1;
}
.select-container::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%) scale(0.6);
  color: var(--text-normal);
  pointer-events: none;
  transition: color 0.3s ease;
}
.mk-selector {
  width: 100%;
  padding: 8px 32px 8px 12px; /* 留出箭头空间 */
  border-radius: 8px;
  border: 1px solid var(--border-normal);
  background: var(--bg-solid);
  color: var(--text-normal);
  font-family: inherit;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.2s ease;
}
.mk-selector:hover {
  border-color: var(--border-strong);
}
.mk-selector:focus {
  outline: none;
  border-color: var(--border-accent);
  box-shadow: 0 0 0 2px var(--border-accent-soft);
}
.loading-indicator,
.error-message {
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  border: 1px dashed var(--border-dashed);
  background: var(--bg-empty);
  color: var(--text-normal);
}
.error-message {
  color: var(--text-error);
  background: var(--bg-error-soft);
  border-color: var(--border-error);
}
</style>

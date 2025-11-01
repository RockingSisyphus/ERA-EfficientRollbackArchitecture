<template>
  <div class="era-panel">
    <header class="panel-top">
      <h3 class="panel-title">ERA 数据面板</h3>
      <button class="btn-close" aria-label="关闭" @click="requestSwitchView('FloatingBall')">×</button>
    </header>
    <div class="panel-body">
      <div class="panel-content-wrapper">
        <template v-if="data">
          <EraAccordion title="最新消息元数据" :default-open="false">
            <MetaHeader :mk="data.mk" :message-id="data.message_id" :is-user="data.is_user" />
          </EraAccordion>

          <OperationDetails :data="data" />

          <SnapshotManager :latest-data="data" />
        </template>
        <template v-else>
          <div class="empty">等待 era:writeDone 事件数据…</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WriteDonePayload } from '../../utils/constants';
import { Logger } from '../../utils/log';
import EraAccordion from '../template/EraAccordion.vue';
import MetaHeader from './EraPanelContent/MetaHeader.vue';
import OperationDetails from './EraPanelContent/OperationDetails.vue';
import SnapshotManager from './SnapshotManager.vue';

type TabItem = { key: 'pure' | 'full'; label: string };

const logger = new Logger();

defineProps<{
  data: WriteDonePayload | null;
}>();

const requestSwitchView = (viewName: 'FloatingBall' | 'ExpandedView') => {
  logger.debug('requestSwitchView', `请求切换视图到: ${viewName}`);
  if ((window as any).eraUiSwitchView) {
    (window as any).eraUiSwitchView(viewName);
  } else {
    logger.warn('requestSwitchView', '全局切换函数 eraUiSwitchView 未找到');
  }
};
</script>

<style scoped>
.era-panel {
  flex: 2 1 600px;
  min-width: 320px;
  height: min(680px, 86vh);
  display: flex;
  flex-direction: column;
  background: var(--bg-blur-heavy);
  border: 1px solid var(--border-strong);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: var(--shadow-panel), var(--shadow-inset);
  overflow: hidden;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}

.panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft);
  background: var(--bg-blur-light);
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}
.panel-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--text-title);
  transition: color 0.3s ease;
}
.btn-close {
  width: 32px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid var(--border-normal);
  background: var(--bg-solid);
  cursor: pointer;
  font-size: 18px;
  color: var(--text-normal);
  box-shadow: var(--shadow-button);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.btn-close:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-button-hover);
}

.panel-body {
  padding: 0;
  overflow: hidden;
  flex-grow: 1;
  display: flex; /* 确保 wrapper 能撑满 */
  flex-direction: column;
}

.panel-content-wrapper {
  padding: 14px 14px 16px;
  overflow-y: auto; /* 内部滚动 */
  flex-grow: 1;
}

/* 用 margin 替代 gap */
.panel-content-wrapper > * + * {
  margin-top: 12px;
}

.empty {
  height: 100%; /* 撑满父容器 */
  display: grid;
  place-items: center;
  color: var(--text-normal);
  font-size: 14px;
  border: 1px dashed var(--border-dashed);
  border-radius: 12px;
  background: var(--bg-empty);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
</style>

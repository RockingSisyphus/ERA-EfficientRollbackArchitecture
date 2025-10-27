<template>
  <EraAccordion title="ERA 最新操作详情" :default-open="false">
    <template #default>
      <div class="details-wrapper">
        <div class="detail-block">
          <h4 class="detail-title">SelectedMks（数组）</h4>
          <PrettyJsonViewer :value="data.selectedMks" :default-collapsed="true" :max-depth="3" />
        </div>
        <div class="detail-block">
          <h4 class="detail-title">EditLogs（对象）</h4>
          <PrettyJsonViewer :value="data.editLogs" :default-collapsed="true" :max-depth="2" />
        </div>
      </div>
    </template>
  </EraAccordion>
</template>

<script setup lang="ts">
import type { WriteDonePayload } from '../../../utils/constants';
import EraAccordion from '../../template/EraAccordion.vue';
import PrettyJsonViewer from '../../template/PrettyJsonViewer.vue';

defineProps<{
  data: WriteDonePayload;
}>();
</script>

<style scoped>
.details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-block {
  padding: 10px 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border-soft);
  border-radius: 10px;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}

.detail-title {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 800;
  color: var(--text-subtitle);
  transition: color 0.3s ease;
}
</style>

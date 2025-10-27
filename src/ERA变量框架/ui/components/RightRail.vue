<template>
  <aside class="right-rail">
    <div class="right-rail-content-wrapper">
      <ActionButtons />
      <EraSettingsPanel />
      <AboutEra />
    </div>
  </aside>
</template>

<script setup lang="ts">
import AboutEra from './RightRailContent/AboutEra.vue';
import ActionButtons from './RightRailContent/ActionButtons.vue';
import EraSettingsPanel from './RightRailContent/EraSettingsPanel.vue';
</script>

<style scoped>
.right-rail {
  flex: 1 1 320px;
  min-width: 280px;
  height: min(680px, 86vh);
  position: sticky;
  top: 10px;
  align-self: flex-start;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.right-rail-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  flex-grow: 1;
}
</style>

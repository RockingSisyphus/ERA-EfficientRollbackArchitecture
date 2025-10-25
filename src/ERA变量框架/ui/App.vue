<template>
  <div class="era-app-container">
    <FloatingBall v-if="currentComponent === 'FloatingBall'" @click="requestSwitchView('ExpandedView')" />
    <template v-if="currentComponent === 'ExpandedView'">
      <!-- <ExpandedView :event-data="props.eventData" @close="requestSwitchView('FloatingBall')" /> -->
      <EraDataPanel :event-data="props.eventData" @close="requestSwitchView('FloatingBall')" />
      <ActionButtons />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FloatingBall from './components/FloatingBall.vue';
//import ExpandedView from './components/ExpandedView.vue';
import EraDataPanel from './components/era-panel/EraDataPanel.vue'; // 新路径

import ActionButtons from './components/ActionButtons.vue';

// 定义 props
const props = defineProps({
  initialView: {
    type: String,
    required: true,
    default: 'FloatingBall',
  },
  eventData: {
    type: Object,
    default: () => null,
  },
});

// 根据 prop 初始化当前组件状态
const currentComponent = ref(props.initialView);

// 请求切换视图的函数
const requestSwitchView = (viewName: 'FloatingBall' | 'ExpandedView') => {
  if ((window as any).eraUiSwitchView) {
    (window as any).eraUiSwitchView(viewName);
  }
};
</script>

<style>
.era-app-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 为子元素之间添加一些间距 */
}
</style>

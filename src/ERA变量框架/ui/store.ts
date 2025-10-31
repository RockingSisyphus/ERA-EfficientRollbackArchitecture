import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WriteDonePayload } from '../utils/constants';

export const useUiStore = defineStore('ui', () => {
  const currentView = ref<'FloatingBall' | 'ExpandedView'>('FloatingBall');
  const eventData = ref<WriteDonePayload | null>(null);

  function switchView(viewName: 'FloatingBall' | 'ExpandedView') {
    if (currentView.value !== viewName) {
      currentView.value = viewName;
    }
  }

  function setEventData(data: WriteDonePayload | null) {
    eventData.value = data;
  }

  return {
    currentView,
    eventData,
    switchView,
    setEventData,
  };
});

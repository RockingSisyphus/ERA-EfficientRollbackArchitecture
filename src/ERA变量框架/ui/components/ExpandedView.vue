<template>
  <div class="expanded-view">
    <div class="content-container" v-html="contentHtml"></div>
    <button @click="$emit('close')">关闭</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineEmits(['close']);

const props = defineProps({
  eventData: {
    type: Object,
    default: () => null,
  },
});

const contentHtml = computed(() => {
  if (props.eventData) {
    return jsonToHtml(props.eventData);
  }
  return '等待 era:writeDone 事件数据...';
});

function jsonToHtml(data: any): string {
  if (typeof data !== 'object' || data === null) {
    return `<span style="color: #98fb98;">${String(data)}</span>`;
  }

  let listHtml = '<ul style="list-style-type: none; padding-left: 15px; margin: 0;">';
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      listHtml += `<li><strong style="color: #87ceeb;">${key}:</strong> ${jsonToHtml(value)}</li>`;
    }
  }
  listHtml += '</ul>';
  return listHtml;
}
</script>

<style scoped>
.expanded-view {
  width: 350px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: monospace;
  font-size: 14px;
}

.content-container {
  overflow-y: auto;
  flex-grow: 1;
  margin-bottom: 10px;
}
</style>

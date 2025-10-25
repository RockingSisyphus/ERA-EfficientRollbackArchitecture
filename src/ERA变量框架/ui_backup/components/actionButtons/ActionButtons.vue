<template>
  <div class="action-buttons-container">
    <button @click.stop="onFullSync">完全重算变量</button>
    <button @click.stop="onLastSync">重算最后一楼变量</button>
    <button class="close-btn" @click.stop="onClose">收起</button>
  </div>
</template>

<script setup lang="ts">
import { Logger } from '../../../utils/log';

const emit = defineEmits(['close']);
const log = new Logger('ui-ActionButtons');

function onFullSync() {
  log.debug('onFullSync', '点击“完全重算变量”，发送 manual_full_sync 事件。');
  eventEmit('manual_full_sync');
}

function onLastSync() {
  log.debug('onLastSync', '点击“重算最后一楼变量”，发送 manual_sync 事件。');
  eventEmit('manual_sync');
}

function onClose() {
  log.debug('onClose', '点击“收起”，发送 close 事件。');
  emit('close');
}
</script>

<style scoped>
.action-buttons-container {
  display: flex;
  justify-content: center;
  padding: 5px 0;
  border-top: 1px solid #444;
  text-align: center;
}

button {
  background: #555;
  color: white;
  border: 1px solid #777;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 5px;
  cursor: pointer;
}

button:hover {
  background: #666;
}

.close-btn {
  background: #c0392b; /* A distinct red color for closing */
}

.close-btn:hover {
  background: #e74c3c;
}
</style>

<template>
  <div class="action-buttons-container">
    <button @click.stop="onFullSync">完全重算变量</button>
    <button @click.stop="onLastSync">重算最后一楼变量</button>
  </div>
</template>

<script setup lang="ts">
import { Logger } from '../../utils/log';

const logger = new Logger('ui-ActionButtons');

function onFullSync() {
  logger.log('onFullSync', '点击“完全重算变量”，发送 manual_full_sync 事件。');
  eventEmit('manual_full_sync');
}

function onLastSync() {
  logger.log('onLastSync', '点击“重算最后一楼变量”，发送 manual_sync 事件。');
  eventEmit('manual_sync');
}
</script>

<style scoped>
.action-buttons-container {
  display: flex;
  justify-content: center;
  padding-top: 10px;
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
  font-size: 12px;
}

button:hover {
  background: #666;
}
</style>

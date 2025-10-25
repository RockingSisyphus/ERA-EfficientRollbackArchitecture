<template>
  <!-- 根容器：大号可滚卡片 -->
  <div class="era-panel">
    <!-- 整体容器：玻璃卡片风格 -->
    <!-- 顶部栏：标题 + 关闭按钮 -->
    <header class="panel-top">
      <!-- 面板顶部区域 -->
      <h3 class="panel-title">ERA 数据面板</h3>
      <!-- 面板主标题 -->
      <button class="btn-close" aria-label="关闭" @click="$emit('close')">×</button>
      <!-- 关闭按钮 -->
    </header>

    <!-- 内容区：如果无数据，显示占位；有数据则按规格分区渲染 -->
    <div class="panel-body">
      <template v-if="dataRef">
        <!-- 1. 最新消息元数据 -->
        <MetaHeader :mk="dataRef.mk" :message-id="dataRef.message_id" />
        <!-- 仅展示 mk / message_id，两字段来自 props -->

        <!-- 2. 可折叠：ERA 最新操作详情（动作布尔 + 选择链 + 日志预览） -->
        <EraAccordion title="ERA 最新操作详情" :default-open="false">
          <template #default>
            <!-- 2.1 动作布尔：以彩色芯片展示 -->
            <!-- 2.2 SelectedMks：改成内层折叠 + JSON 视图（数组根） -->
            <EraAccordion title="SelectedMks（数组）" :default-open="false">
              <template #default>
                <PrettyJsonViewer :value="dataRef.selectedMks" :default-collapsed="true" :max-depth="3" />
              </template>
            </EraAccordion>

            <!-- 2.3 EditLogs：改成内层折叠 + JSON 视图（对象根） -->
            <EraAccordion title="EditLogs（对象）" :default-open="false">
              <template #default>
                <PrettyJsonViewer :value="dataRef.editLogs" :default-collapsed="true" :max-depth="2" />
              </template>
            </EraAccordion>
          </template>
        </EraAccordion>

        <!-- 3. Tab：状态数据主区（默认：纯净状态数据） -->
        <TabSwitch v-model:active="activeTab" :tabs="tabs">
          <!-- 通用 Tab 壳：仅管理切换与样式 -->
          <template #pure>
            <PrettyJsonViewer :value="dataRef.statWithoutMeta" :default-collapsed="true" :max-depth="Infinity" />
            <!-- 纯净状态数据：大 JSON 折叠浏览 -->
          </template>
          <template #full>
            <PrettyJsonViewer :value="dataRef.stat" :default-collapsed="true" :max-depth="Infinity" />
            <!-- 完整状态数据：大 JSON 折叠浏览 -->
          </template>
        </TabSwitch>
      </template>

      <!-- 无数据占位 -->
      <template v-else>
        <div class="empty">等待 era:writeDone 事件数据…</div>
        <!-- 空态提示 -->
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== 类型声明（独立于外部，保持高内聚） =====
type Actions = { rollback: boolean; apply: boolean; resync: boolean; api: boolean; apiWrite: boolean }; // 动作布尔类型定义
export interface WriteDonePayload {
  // 事件负载类型定义
  mk: string; // 消息密钥
  message_id: number; // 消息 ID
  actions: Actions; // 动作布尔集合
  selectedMks: (string | null)[]; // 选择链
  editLogs: Record<string, any[]>; // 编辑日志对象
  stat: any; // 完整状态
  statWithoutMeta: any; // 纯净状态
  consecutiveProcessingCount: number; // 连续处理计数（未在 UI 强调，但保留）
}

import { computed, ref } from 'vue'; // 引入响应式工具
import EraAccordion from './parts/EraAccordion.vue'; // 导入子组件：折叠面板壳
import MetaHeader from './parts/MetaHeader.vue'; // 导入子组件：元数据头
import PrettyJsonViewer from './parts/PrettyJsonViewer.vue'; // 导入子组件：JSON 查看器
import TabSwitch from './parts/TabSwitch.vue'; // 导入子组件：Tab 壳

defineEmits(['close']); // 声明 close 事件对外抛出

const props = defineProps<{ eventData: WriteDonePayload | null }>(); // 接收事件数据
const dataRef = computed(() => props.eventData || null); // 计算引用，便于模板判空

// Tab 壳需要的配置
const tabs = [
  { key: 'pure', label: '纯净状态数据' }, // 纯净页签
  { key: 'full', label: '完整状态数据' }, // 完整页签
]; // Tab 列表
const activeTab = ref<'pure' | 'full'>('pure'); // 默认激活纯净数据

// 将布尔转为“是/否”文本
function boolText(v: any) {
  return v ? '是' : '否';
} // 简单中文化布尔显示
</script>

<style scoped>
/* 根卡片（更大尺寸 + 玻璃光泽） */
.era-panel {
  width: min(960px, 60vw); /* 宽度更大但自适应 */
  height: min(680px, 86vh); /* 高度更大但自适应 */
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.65)); /* 玻璃白 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  overflow: hidden;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* 顶栏 */
.panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.45));
}
.panel-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #1f2937;
}
.btn-close {
  width: 32px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  cursor: pointer;
  font-size: 18px;
  color: #6b7280;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.btn-close:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* 内容区 */
.panel-body {
  padding: 14px 14px 16px;
  overflow: auto;
}

/* 分块标题与容器 */
.block {
  margin: 12px 0 4px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}
.block-title {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 800;
  color: #374151;
}

/* 芯片行 */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  font-size: 12px;
  padding: 6px 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 999px;
  background: linear-gradient(180deg, #fafafa, #f4f4f4);
  color: #6b7280;
  box-shadow: inset 0 1px 0 #fff;
}
.chip.ok {
  color: #065f46;
  background: linear-gradient(180deg, #ecfdf5, #d1fae5);
  border-color: #a7f3d0;
}

/* 选择链条幅 */
.mk-strip {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-height: 140px;
  overflow: auto;
}
.mk-pill {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 6px 8px;
  background: linear-gradient(180deg, #eef2ff, #e0e7ff);
  color: #4338ca;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  font-size: 12px;
}
.mk-pill.is-null {
  background: linear-gradient(180deg, #f9fafb, #f3f4f6);
  color: #6b7280;
  border-color: #e5e7eb;
}

/* 空态 */
.empty {
  height: 360px;
  display: grid;
  place-items: center;
  color: #6b7280;
  font-size: 14px;
  border: 1px dashed rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
}
</style>

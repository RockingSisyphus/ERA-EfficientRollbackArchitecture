<template>
  <div class="era-app-container">
    <FloatingBall v-show="currentComponent === 'FloatingBall'" @click="requestSwitchView('ExpandedView')" />
    <div v-show="currentComponent === 'ExpandedView'"> <!-- 仅在展开视图时显示 --> <!-- 中文注释：视图切换容器 -->
      <div class="era-shell"> <!-- 新增横向壳容器：左面板 + 右侧栏 --> <!-- 中文注释：横向布局容器 -->
        <div class="era-panel"> <!-- 保持面板原有结构不变 --> <!-- 中文注释：左侧 ERA 面板 -->
          <!-- 顶部栏：标题 + 关闭按钮 --> <!-- 中文注释：面板顶部 -->
          <header class="panel-top"> <!-- 中文注释：顶栏 -->
            <h3 class="panel-title">ERA 数据面板</h3> <!-- 中文注释：标题 -->
            <button class="btn-close" aria-label="关闭" @click="requestSwitchView('FloatingBall')">×</button> <!-- 中文注释：关闭按钮 -->
          </header>

          <!-- 内容区（原样保留） --> <!-- 中文注释：面板主体 -->
          <div class="panel-body"> <!-- 中文注释：可滚动内容 -->
            <template v-if="dataRef"> <!-- 中文注释：有数据则渲染 -->
              <MetaHeader :mk="dataRef.mk" :message-id="dataRef.message_id" /> <!-- 中文注释：最新消息元数据 -->

              <EraAccordion title="ERA 最新操作详情" :default-open="false"> <!-- 中文注释：外层折叠 -->
                <template #default> <!-- 中文注释：插槽 -->
                  <div style="display: flex; flex-direction: column; gap: 8px"> <!-- 中文注释：堆叠两个子折叠 -->
                    <EraAccordion title="SelectedMks（数组）" :default-open="false"> <!-- 中文注释：子折叠1 -->
                      <template #default> <!-- 中文注释：插槽 -->
                        <PrettyJsonViewer :value="dataRef.selectedMks" :default-collapsed="true" :max-depth="3" /> <!-- 中文注释：JSON 视图 -->
                      </template>
                    </EraAccordion>
                    <EraAccordion title="EditLogs（对象）" :default-open="false"> <!-- 中文注释：子折叠2 -->
                      <template #default> <!-- 中文注释：插槽 -->
                        <PrettyJsonViewer :value="dataRef.editLogs" :default-collapsed="true" :max-depth="2" /> <!-- 中文注释：JSON 视图 -->
                      </template>
                    </EraAccordion>
                  </div>
                </template>
              </EraAccordion>

              <TabSwitch v-model:active="activeTab" :tabs="tabs"> <!-- 中文注释：选项卡 -->
                <template #pure> <!-- 中文注释：纯净状态数据 -->
                  <PrettyJsonViewer :value="dataRef.statWithoutMeta" :default-collapsed="true" :max-depth="Infinity" /> <!-- 中文注释：JSON 视图 -->
                </template>
                <template #full> <!-- 中文注释：完整状态数据 -->
                  <PrettyJsonViewer :value="dataRef.stat" :default-collapsed="true" :max-depth="Infinity" /> <!-- 中文注释：JSON 视图 -->
                </template>
              </TabSwitch>
            </template>

            <template v-else> <!-- 中文注释：暂无数据占位 -->
              <div class="empty">等待 era:writeDone 事件数据…</div> <!-- 中文注释：占位提示 -->
            </template>
          </div>
        </div>

        <!-- 右侧固定栏：只改变“位置/外部结构”，不改按钮逻辑 -->
        <aside class="right-rail"> <!-- 中文注释：右侧栏容器 -->
          <ActionButtons /> <!-- 中文注释：操作按钮组件（事件保持不变） -->
        </aside>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Logger } from '../utils/log';
import ActionButtons from './components/ActionButtons.vue';
import FloatingBall from './components/FloatingBall.vue';

// 从 EraDataPanel 迁移过来的 imports
import EraAccordion from './components/era-panel/parts/EraAccordion.vue';
import MetaHeader from './components/era-panel/parts/MetaHeader.vue';
import PrettyJsonViewer from './components/era-panel/parts/PrettyJsonViewer.vue';
import TabSwitch from './components/era-panel/parts/TabSwitch.vue';

// 从 EraDataPanel 迁移过来的类型定义
type Actions = { rollback: boolean; apply: boolean; resync: boolean; api: boolean; apiWrite: boolean };
export interface WriteDonePayload {
  mk: string;
  message_id: number;
  actions: Actions;
  selectedMks: (string | null)[];
  editLogs: Record<string, any[]>;
  stat: any;
  statWithoutMeta: any;
  consecutiveProcessingCount: number;
}

// TabSwitch 需要的类型
type TabItem = { key: 'pure' | 'full'; label: string };

const logger = new Logger('ui-App');

// App.vue 原有的 props
const props = defineProps({
  initialView: {
    type: String,
    required: true,
    default: 'FloatingBall',
  },
  eventData: {
    type: Object as () => WriteDonePayload | null,
    default: () => null,
  },
});

// App.vue 原有的逻辑
const currentComponent = ref(props.initialView);
const requestSwitchView = (viewName: 'FloatingBall' | 'ExpandedView') => {
  logger.debug('requestSwitchView', `请求切换视图到: ${viewName}`);
  if ((window as any).eraUiSwitchView) {
    (window as any).eraUiSwitchView(viewName);
  } else {
    logger.warn('requestSwitchView', '全局切换函数 eraUiSwitchView 未找到');
  }
};

// 从 EraDataPanel 迁移过来的逻辑
const dataRef = computed(() => props.eventData || null);

const tabs: TabItem[] = [
  { key: 'pure', label: '纯净状态数据' },
  { key: 'full', label: '完整状态数据' },
];
const activeTab = ref<'pure' | 'full'>('pure');

onMounted(() => {
  logger.log('onMounted', 'App.vue 组件已挂载', { props: props });
});

watch(
  () => props.eventData,
  (newData, oldData) => {
    logger.debug('watch:eventData', 'eventData prop 发生变化', {
      newData,
      oldData,
    });
  },
  { deep: true },
);

watch(
  () => props.initialView,
  newView => {
    logger.debug('watch:initialView', `initialView prop 发生变化，新视图: ${newView}`);
    currentComponent.value = newView;
  },
);
</script>

<style>
/* App.vue 原有样式 */
.era-app-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 为子元素之间添加一些间距 */
}
</style>

<style scoped>
/* 从 EraDataPanel.vue 迁移过来的样式 */
.era-panel {
  width: min(960px, 60vw);
  height: min(680px, 86vh);
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.65));
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  overflow: hidden;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

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

.panel-body {
  padding: 14px 14px 16px;
  overflow: auto;
}

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

/* ===[新增] 折叠时把“按钮后紧邻的内容体”彻底压平并裁剪（通用规则） === */
/* 适配 EraAccordion：标题按钮有 aria-expanded，内容体是紧邻兄弟元素 */
:deep(button[aria-expanded='false'] + *) {
  height: 0 !important; /* 高度压到 0，彻底收起 */
  padding-top: 0 !important; /* 去掉上下内边距，防止露出一条边 */
  padding-bottom: 0 !important;
  margin-top: 0 !important; /* 去掉上下外边距，避免 margin 折叠穿出 */
  margin-bottom: 0 !important;
  border-top-width: 0 !important; /* 若内容体自身有分割线，折叠时去掉 */
  border-bottom-width: 0 !important;
  overflow: clip !important; /* 关键：裁剪一切子内容（含虚线/阴影） */
  contain: paint !important; /* 防止子级阴影/边框超出裁剪边界 */
}

/* 展开状态可恢复可见溢出（如悬浮提示），默认即可，可保守加一条： */
:deep(button[aria-expanded='true'] + *) {
  overflow: visible; /* 展开时恢复正常绘制 */
}













/* ===[新增] 横向壳：左面板 + 右侧栏（按钮）=== */
.era-shell { /* 横向包裹容器 */ /* 中文注释：横向排列容器 */
  display: flex; /* 横向布局 */ /* 中文注释：flex 横排 */
  align-items: flex-start; /* 顶对齐 */ /* 中文注释：上缘对齐 */
  gap: 12px; /* 左右间距 */ /* 中文注释：元素间距 */
  flex-wrap: nowrap; /* 默认不换行 */ /* 中文注释：保持并排 */
}

/* 保持面板宽高（原样），但让它更好地在横向中自适应 */
.era-panel { /* 已存在：此处只说明语义，不做覆盖 */ /* 中文注释：保留原样式 */
  flex: 0 1 auto; /* 面板按自身宽度布局 */ /* 中文注释：不强行拉伸 */
}

/* 右侧栏外框：与左面板视觉统一（玻璃卡片风） */
.right-rail { /* 右侧区域容器 */ /* 中文注释：侧栏 */
  width: min(320px, 34vw); /* 宽度自适应，桌面约 280-320px 体验最佳 */ /* 中文注释：侧栏宽度 */
  position: sticky; /* 粘附在视口内滚动 */ /* 中文注释：吸附在视口顶部 */
  top: 10px; /* 与顶部留白 */ /* 中文注释：吸顶间距 */
  align-self: flex-start; /* 与左侧面板顶部对齐 */ /* 中文注释：自身对齐顶部 */
  z-index: 1; /* 避免被面板阴影覆盖 */ /* 中文注释：提升层级 */
}

/* 小屏回落：改为上下堆叠（按钮在下） */
@media (max-width: 1100px) { /* 1100px 下回落 */ /* 中文注释：响应式断点 */
  .era-shell { /* 横向容器 */ /* 中文注释：容器 */
    flex-wrap: wrap; /* 允许换行 */ /* 中文注释：允许堆叠 */
  }
  .right-rail { /* 侧栏 */ /* 中文注释：侧栏 */
    width: 100%; /* 占满一行 */ /* 中文注释：全宽 */
    position: static; /* 取消吸顶，避免窄屏遮挡 */ /* 中文注释：不吸顶 */
    margin-top: 8px; /* 与上方留白 */ /* 中文注释：间距 */
  }
}

</style>

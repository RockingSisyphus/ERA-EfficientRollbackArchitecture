import * as __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_pinia_esm_b723a504__ from "https://testingcf.jsdelivr.net/npm/pinia/+esm";
/******/ var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.era-app-container{display:flex;flex-direction:column;gap:10px}
`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/App.vue"],"names":[],"mappings":"AAqJA,mBACE,YAAa,CACb,qBAAsB,CACtB,QACF","sourcesContent":["<template>\n  <div class=\"era-app-container\">\n    <FloatingBall v-show=\"currentComponent === 'FloatingBall'\" @click=\"requestSwitchView('ExpandedView')\" />\n    <div v-show=\"currentComponent === 'ExpandedView'\"> <!-- 仅在展开视图时显示 --> <!-- 中文注释：视图切换容器 -->\n      <div class=\"era-shell\"> <!-- 新增横向壳容器：左面板 + 右侧栏 --> <!-- 中文注释：横向布局容器 -->\n        <div class=\"era-panel\"> <!-- 保持面板原有结构不变 --> <!-- 中文注释：左侧 ERA 面板 -->\n          <!-- 顶部栏：标题 + 关闭按钮 --> <!-- 中文注释：面板顶部 -->\n          <header class=\"panel-top\"> <!-- 中文注释：顶栏 -->\n            <h3 class=\"panel-title\">ERA 数据面板</h3> <!-- 中文注释：标题 -->\n            <button class=\"btn-close\" aria-label=\"关闭\" @click=\"requestSwitchView('FloatingBall')\">×</button> <!-- 中文注释：关闭按钮 -->\n          </header>\n\n          <!-- 内容区（原样保留） --> <!-- 中文注释：面板主体 -->\n          <div class=\"panel-body\"> <!-- 中文注释：可滚动内容 -->\n            <template v-if=\"dataRef\"> <!-- 中文注释：有数据则渲染 -->\n              <MetaHeader :mk=\"dataRef.mk\" :message-id=\"dataRef.message_id\" /> <!-- 中文注释：最新消息元数据 -->\n\n              <EraAccordion title=\"ERA 最新操作详情\" :default-open=\"false\"> <!-- 中文注释：外层折叠 -->\n                <template #default> <!-- 中文注释：插槽 -->\n                  <div style=\"display: flex; flex-direction: column; gap: 8px\"> <!-- 中文注释：堆叠两个子折叠 -->\n                    <EraAccordion title=\"SelectedMks（数组）\" :default-open=\"false\"> <!-- 中文注释：子折叠1 -->\n                      <template #default> <!-- 中文注释：插槽 -->\n                        <PrettyJsonViewer :value=\"dataRef.selectedMks\" :default-collapsed=\"true\" :max-depth=\"3\" /> <!-- 中文注释：JSON 视图 -->\n                      </template>\n                    </EraAccordion>\n                    <EraAccordion title=\"EditLogs（对象）\" :default-open=\"false\"> <!-- 中文注释：子折叠2 -->\n                      <template #default> <!-- 中文注释：插槽 -->\n                        <PrettyJsonViewer :value=\"dataRef.editLogs\" :default-collapsed=\"true\" :max-depth=\"2\" /> <!-- 中文注释：JSON 视图 -->\n                      </template>\n                    </EraAccordion>\n                  </div>\n                </template>\n              </EraAccordion>\n\n              <TabSwitch v-model:active=\"activeTab\" :tabs=\"tabs\"> <!-- 中文注释：选项卡 -->\n                <template #pure> <!-- 中文注释：纯净状态数据 -->\n                  <PrettyJsonViewer :value=\"dataRef.statWithoutMeta\" :default-collapsed=\"true\" :max-depth=\"Infinity\" /> <!-- 中文注释：JSON 视图 -->\n                </template>\n                <template #full> <!-- 中文注释：完整状态数据 -->\n                  <PrettyJsonViewer :value=\"dataRef.stat\" :default-collapsed=\"true\" :max-depth=\"Infinity\" /> <!-- 中文注释：JSON 视图 -->\n                </template>\n              </TabSwitch>\n            </template>\n\n            <template v-else> <!-- 中文注释：暂无数据占位 -->\n              <div class=\"empty\">等待 era:writeDone 事件数据…</div> <!-- 中文注释：占位提示 -->\n            </template>\n          </div>\n        </div>\n\n        <!-- 右侧固定栏：只改变“位置/外部结构”，不改按钮逻辑 -->\n        <aside class=\"right-rail\"> <!-- 中文注释：右侧栏容器 -->\n          <ActionButtons /> <!-- 中文注释：操作按钮组件（事件保持不变） -->\n        </aside>\n      </div>\n    </div>\n\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { computed, onMounted, ref, watch } from 'vue';\nimport { Logger } from '../utils/log';\nimport ActionButtons from './components/ActionButtons.vue';\nimport FloatingBall from './components/FloatingBall.vue';\n\n// 从 EraDataPanel 迁移过来的 imports\nimport EraAccordion from './components/era-panel/parts/EraAccordion.vue';\nimport MetaHeader from './components/era-panel/parts/MetaHeader.vue';\nimport PrettyJsonViewer from './components/era-panel/parts/PrettyJsonViewer.vue';\nimport TabSwitch from './components/era-panel/parts/TabSwitch.vue';\n\n// 从 EraDataPanel 迁移过来的类型定义\ntype Actions = { rollback: boolean; apply: boolean; resync: boolean; api: boolean; apiWrite: boolean };\nexport interface WriteDonePayload {\n  mk: string;\n  message_id: number;\n  actions: Actions;\n  selectedMks: (string | null)[];\n  editLogs: Record<string, any[]>;\n  stat: any;\n  statWithoutMeta: any;\n  consecutiveProcessingCount: number;\n}\n\n// TabSwitch 需要的类型\ntype TabItem = { key: 'pure' | 'full'; label: string };\n\nconst logger = new Logger('ui-App');\n\n// App.vue 原有的 props\nconst props = defineProps({\n  initialView: {\n    type: String,\n    required: true,\n    default: 'FloatingBall',\n  },\n  eventData: {\n    type: Object as () => WriteDonePayload | null,\n    default: () => null,\n  },\n});\n\n// App.vue 原有的逻辑\nconst currentComponent = ref(props.initialView);\nconst requestSwitchView = (viewName: 'FloatingBall' | 'ExpandedView') => {\n  logger.debug('requestSwitchView', `请求切换视图到: ${viewName}`);\n  if ((window as any).eraUiSwitchView) {\n    (window as any).eraUiSwitchView(viewName);\n  } else {\n    logger.warn('requestSwitchView', '全局切换函数 eraUiSwitchView 未找到');\n  }\n};\n\n// 从 EraDataPanel 迁移过来的逻辑\nconst dataRef = computed(() => props.eventData || null);\n\nconst tabs: TabItem[] = [\n  { key: 'pure', label: '纯净状态数据' },\n  { key: 'full', label: '完整状态数据' },\n];\nconst activeTab = ref<'pure' | 'full'>('pure');\n\nonMounted(() => {\n  logger.log('onMounted', 'App.vue 组件已挂载', { props: props });\n});\n\nwatch(\n  () => props.eventData,\n  (newData, oldData) => {\n    logger.debug('watch:eventData', 'eventData prop 发生变化', {\n      newData,\n      oldData,\n    });\n  },\n  { deep: true },\n);\n\nwatch(\n  () => props.initialView,\n  newView => {\n    logger.debug('watch:initialView', `initialView prop 发生变化，新视图: ${newView}`);\n    currentComponent.value = newView;\n  },\n);\n</script>\n\n<style>\n/* App.vue 原有样式 */\n.era-app-container {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; /* 为子元素之间添加一些间距 */\n}\n</style>\n\n<style scoped>\n/* 从 EraDataPanel.vue 迁移过来的样式 */\n.era-panel {\n  width: min(960px, 60vw);\n  height: min(680px, 86vh);\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.65));\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(10px);\n  border-radius: 16px;\n  box-shadow:\n    0 10px 40px rgba(0, 0, 0, 0.18),\n    inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  overflow: hidden;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n}\n\n.panel-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.45));\n}\n.panel-title {\n  font-size: 16px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  color: #1f2937;\n}\n.btn-close {\n  width: 32px;\n  height: 32px;\n  line-height: 30px;\n  text-align: center;\n  border-radius: 8px;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  background: #fff;\n  cursor: pointer;\n  font-size: 18px;\n  color: #6b7280;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.btn-close:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\n}\n\n.panel-body {\n  padding: 14px 14px 16px;\n  overflow: auto;\n}\n\n.block {\n  margin: 12px 0 4px;\n  padding: 10px 12px;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n}\n.block-title {\n  margin: 0 0 8px;\n  font-size: 13px;\n  font-weight: 800;\n  color: #374151;\n}\n\n.chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.chip {\n  font-size: 12px;\n  padding: 6px 8px;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 999px;\n  background: linear-gradient(180deg, #fafafa, #f4f4f4);\n  color: #6b7280;\n  box-shadow: inset 0 1px 0 #fff;\n}\n.chip.ok {\n  color: #065f46;\n  background: linear-gradient(180deg, #ecfdf5, #d1fae5);\n  border-color: #a7f3d0;\n}\n\n.mk-strip {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  max-height: 140px;\n  overflow: auto;\n}\n.mk-pill {\n  display: inline-flex;\n  gap: 6px;\n  align-items: center;\n  padding: 6px 8px;\n  background: linear-gradient(180deg, #eef2ff, #e0e7ff);\n  color: #4338ca;\n  border: 1px solid #c7d2fe;\n  border-radius: 8px;\n  font-size: 12px;\n}\n.mk-pill.is-null {\n  background: linear-gradient(180deg, #f9fafb, #f3f4f6);\n  color: #6b7280;\n  border-color: #e5e7eb;\n}\n\n.empty {\n  height: 360px;\n  display: grid;\n  place-items: center;\n  color: #6b7280;\n  font-size: 14px;\n  border: 1px dashed rgba(0, 0, 0, 0.08);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n/* ===[新增] 折叠时把“按钮后紧邻的内容体”彻底压平并裁剪（通用规则） === */\n/* 适配 EraAccordion：标题按钮有 aria-expanded，内容体是紧邻兄弟元素 */\n:deep(button[aria-expanded='false'] + *) {\n  height: 0 !important; /* 高度压到 0，彻底收起 */\n  padding-top: 0 !important; /* 去掉上下内边距，防止露出一条边 */\n  padding-bottom: 0 !important;\n  margin-top: 0 !important; /* 去掉上下外边距，避免 margin 折叠穿出 */\n  margin-bottom: 0 !important;\n  border-top-width: 0 !important; /* 若内容体自身有分割线，折叠时去掉 */\n  border-bottom-width: 0 !important;\n  overflow: clip !important; /* 关键：裁剪一切子内容（含虚线/阴影） */\n  contain: paint !important; /* 防止子级阴影/边框超出裁剪边界 */\n}\n\n/* 展开状态可恢复可见溢出（如悬浮提示），默认即可，可保守加一条： */\n:deep(button[aria-expanded='true'] + *) {\n  overflow: visible; /* 展开时恢复正常绘制 */\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* ===[新增] 横向壳：左面板 + 右侧栏（按钮）=== */\n.era-shell { /* 横向包裹容器 */ /* 中文注释：横向排列容器 */\n  display: flex; /* 横向布局 */ /* 中文注释：flex 横排 */\n  align-items: flex-start; /* 顶对齐 */ /* 中文注释：上缘对齐 */\n  gap: 12px; /* 左右间距 */ /* 中文注释：元素间距 */\n  flex-wrap: nowrap; /* 默认不换行 */ /* 中文注释：保持并排 */\n}\n\n/* 保持面板宽高（原样），但让它更好地在横向中自适应 */\n.era-panel { /* 已存在：此处只说明语义，不做覆盖 */ /* 中文注释：保留原样式 */\n  flex: 0 1 auto; /* 面板按自身宽度布局 */ /* 中文注释：不强行拉伸 */\n}\n\n/* 右侧栏外框：与左面板视觉统一（玻璃卡片风） */\n.right-rail { /* 右侧区域容器 */ /* 中文注释：侧栏 */\n  width: min(320px, 34vw); /* 宽度自适应，桌面约 280-320px 体验最佳 */ /* 中文注释：侧栏宽度 */\n  position: sticky; /* 粘附在视口内滚动 */ /* 中文注释：吸附在视口顶部 */\n  top: 10px; /* 与顶部留白 */ /* 中文注释：吸顶间距 */\n  align-self: flex-start; /* 与左侧面板顶部对齐 */ /* 中文注释：自身对齐顶部 */\n  z-index: 1; /* 避免被面板阴影覆盖 */ /* 中文注释：提升层级 */\n}\n\n/* 小屏回落：改为上下堆叠（按钮在下） */\n@media (max-width: 1100px) { /* 1100px 下回落 */ /* 中文注释：响应式断点 */\n  .era-shell { /* 横向容器 */ /* 中文注释：容器 */\n    flex-wrap: wrap; /* 允许换行 */ /* 中文注释：允许堆叠 */\n  }\n  .right-rail { /* 侧栏 */ /* 中文注释：侧栏 */\n    width: 100%; /* 占满一行 */ /* 中文注释：全宽 */\n    position: static; /* 取消吸顶，避免窄屏遮挡 */ /* 中文注释：不吸顶 */\n    margin-top: 8px; /* 与上方留白 */ /* 中文注释：间距 */\n  }\n}\n\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.era-panel[data-v-390dd513]{width:min(960px,60vw);height:min(680px,86vh);display:flex;flex-direction:column;background:linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.65));border:1px solid rgba(255,255,255,0.6);backdrop-filter:blur(10px);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.18),inset 0 1px 0 rgba(255,255,255,0.6);overflow:hidden;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.panel-top[data-v-390dd513]{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(0,0,0,0.06);background:linear-gradient(90deg,rgba(255,255,255,0.65),rgba(255,255,255,0.45))}.panel-title[data-v-390dd513]{font-size:16px;font-weight:800;letter-spacing:0.5px;color:#1f2937}.btn-close[data-v-390dd513]{width:32px;height:32px;line-height:30px;text-align:center;border-radius:8px;border:1px solid rgba(0,0,0,0.08);background:#fff;cursor:pointer;font-size:18px;color:#6b7280;box-shadow:0 2px 8px rgba(0,0,0,0.08)}.btn-close[data-v-390dd513]:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(0,0,0,0.12)}.panel-body[data-v-390dd513]{padding:14px 14px 16px;overflow:auto}.block[data-v-390dd513]{margin:12px 0 4px;padding:10px 12px;background:rgba(255,255,255,0.6);border:1px solid rgba(0,0,0,0.06);border-radius:12px}.block-title[data-v-390dd513]{margin:0 0 8px;font-size:13px;font-weight:800;color:#374151}.chips[data-v-390dd513]{display:flex;flex-wrap:wrap;gap:8px}.chip[data-v-390dd513]{font-size:12px;padding:6px 8px;border:1px solid rgba(0,0,0,0.06);border-radius:999px;background:linear-gradient(180deg,#fafafa,#f4f4f4);color:#6b7280;box-shadow:inset 0 1px 0 #fff}.chip.ok[data-v-390dd513]{color:#065f46;background:linear-gradient(180deg,#ecfdf5,#d1fae5);border-color:#a7f3d0}.mk-strip[data-v-390dd513]{display:flex;gap:8px;flex-wrap:wrap;max-height:140px;overflow:auto}.mk-pill[data-v-390dd513]{display:inline-flex;gap:6px;align-items:center;padding:6px 8px;background:linear-gradient(180deg,#eef2ff,#e0e7ff);color:#4338ca;border:1px solid #c7d2fe;border-radius:8px;font-size:12px}.mk-pill.is-null[data-v-390dd513]{background:linear-gradient(180deg,#f9fafb,#f3f4f6);color:#6b7280;border-color:#e5e7eb}.empty[data-v-390dd513]{height:360px;display:grid;place-items:center;color:#6b7280;font-size:14px;border:1px dashed rgba(0,0,0,0.08);border-radius:12px;background:rgba(255,255,255,0.5)}[data-v-390dd513] button[aria-expanded='false']+*{height:0 !important;padding-top:0 !important;padding-bottom:0 !important;margin-top:0 !important;margin-bottom:0 !important;border-top-width:0 !important;border-bottom-width:0 !important;overflow:clip !important;contain:paint !important}[data-v-390dd513] button[aria-expanded='true']+*{overflow:visible}.era-shell[data-v-390dd513]{display:flex;align-items:flex-start;gap:12px;flex-wrap:nowrap}.era-panel[data-v-390dd513]{flex:0 1 auto}.right-rail[data-v-390dd513]{width:min(320px,34vw);position:sticky;top:10px;align-self:flex-start;z-index:1}@media (max-width:1100px){.era-shell[data-v-390dd513]{flex-wrap:wrap}.right-rail[data-v-390dd513]{width:100%;position:static;margin-top:8px}}

`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/App.vue"],"names":[],"mappings":"AA8JA,4BACE,qBAAuB,CACvB,sBAAwB,CACxB,YAAa,CACb,qBAAsB,CACtB,gFAAyF,CACzF,sCAA0C,CAC1C,0BAA2B,CAC3B,kBAAmB,CACnB,2EAEwC,CACxC,eAAgB,CAChB,gEACF,CAEA,4BACE,YAAa,CACb,kBAAmB,CACnB,6BAA8B,CAC9B,iBAAkB,CAClB,wCAA4C,CAC5C,+EACF,CACA,8BACE,cAAe,CACf,eAAgB,CAChB,oBAAqB,CACrB,aACF,CACA,4BACE,UAAW,CACX,WAAY,CACZ,gBAAiB,CACjB,iBAAkB,CAClB,iBAAkB,CAClB,iCAAqC,CACrC,eAAgB,CAChB,cAAe,CACf,cAAe,CACf,aAAc,CACd,qCACF,CACA,kCACE,0BAA2B,CAC3B,sCACF,CAEA,6BACE,sBAAuB,CACvB,aACF,CAEA,wBACE,iBAAkB,CAClB,iBAAkB,CAClB,gCAAoC,CACpC,iCAAqC,CACrC,kBACF,CACA,8BACE,cAAe,CACf,cAAe,CACf,eAAgB,CAChB,aACF,CAEA,wBACE,YAAa,CACb,cAAe,CACf,OACF,CACA,uBACE,cAAe,CACf,eAAgB,CAChB,iCAAqC,CACrC,mBAAoB,CACpB,kDAAqD,CACrD,aAAc,CACd,6BACF,CACA,0BACE,aAAc,CACd,kDAAqD,CACrD,oBACF,CAEA,2BACE,YAAa,CACb,OAAQ,CACR,cAAe,CACf,gBAAiB,CACjB,aACF,CACA,0BACE,mBAAoB,CACpB,OAAQ,CACR,kBAAmB,CACnB,eAAgB,CAChB,kDAAqD,CACrD,aAAc,CACd,wBAAyB,CACzB,iBAAkB,CAClB,cACF,CACA,kCACE,kDAAqD,CACrD,aAAc,CACd,oBACF,CAEA,wBACE,YAAa,CACb,YAAa,CACb,kBAAmB,CACnB,aAAc,CACd,cAAe,CACf,kCAAsC,CACtC,kBAAmB,CACnB,gCACF,CAIA,kDACE,mBAAoB,CACpB,wBAAyB,CACzB,2BAA4B,CAC5B,uBAAwB,CACxB,0BAA2B,CAC3B,6BAA8B,CAC9B,gCAAiC,CACjC,wBAAyB,CACzB,wBACF,CAGA,iDACE,gBACF,CAeA,4BACE,YAAa,CACb,sBAAuB,CACvB,QAAS,CACT,gBACF,CAGA,4BACE,aACF,CAGA,6BACE,qBAAuB,CACvB,eAAgB,CAChB,QAAS,CACT,qBAAsB,CACtB,SACF,CAGA,0BACE,4BACE,cACF,CACA,6BACE,UAAW,CACX,eAAgB,CAChB,cACF,CACF","sourcesContent":["<template>\n  <div class=\"era-app-container\">\n    <FloatingBall v-show=\"currentComponent === 'FloatingBall'\" @click=\"requestSwitchView('ExpandedView')\" />\n    <div v-show=\"currentComponent === 'ExpandedView'\"> <!-- 仅在展开视图时显示 --> <!-- 中文注释：视图切换容器 -->\n      <div class=\"era-shell\"> <!-- 新增横向壳容器：左面板 + 右侧栏 --> <!-- 中文注释：横向布局容器 -->\n        <div class=\"era-panel\"> <!-- 保持面板原有结构不变 --> <!-- 中文注释：左侧 ERA 面板 -->\n          <!-- 顶部栏：标题 + 关闭按钮 --> <!-- 中文注释：面板顶部 -->\n          <header class=\"panel-top\"> <!-- 中文注释：顶栏 -->\n            <h3 class=\"panel-title\">ERA 数据面板</h3> <!-- 中文注释：标题 -->\n            <button class=\"btn-close\" aria-label=\"关闭\" @click=\"requestSwitchView('FloatingBall')\">×</button> <!-- 中文注释：关闭按钮 -->\n          </header>\n\n          <!-- 内容区（原样保留） --> <!-- 中文注释：面板主体 -->\n          <div class=\"panel-body\"> <!-- 中文注释：可滚动内容 -->\n            <template v-if=\"dataRef\"> <!-- 中文注释：有数据则渲染 -->\n              <MetaHeader :mk=\"dataRef.mk\" :message-id=\"dataRef.message_id\" /> <!-- 中文注释：最新消息元数据 -->\n\n              <EraAccordion title=\"ERA 最新操作详情\" :default-open=\"false\"> <!-- 中文注释：外层折叠 -->\n                <template #default> <!-- 中文注释：插槽 -->\n                  <div style=\"display: flex; flex-direction: column; gap: 8px\"> <!-- 中文注释：堆叠两个子折叠 -->\n                    <EraAccordion title=\"SelectedMks（数组）\" :default-open=\"false\"> <!-- 中文注释：子折叠1 -->\n                      <template #default> <!-- 中文注释：插槽 -->\n                        <PrettyJsonViewer :value=\"dataRef.selectedMks\" :default-collapsed=\"true\" :max-depth=\"3\" /> <!-- 中文注释：JSON 视图 -->\n                      </template>\n                    </EraAccordion>\n                    <EraAccordion title=\"EditLogs（对象）\" :default-open=\"false\"> <!-- 中文注释：子折叠2 -->\n                      <template #default> <!-- 中文注释：插槽 -->\n                        <PrettyJsonViewer :value=\"dataRef.editLogs\" :default-collapsed=\"true\" :max-depth=\"2\" /> <!-- 中文注释：JSON 视图 -->\n                      </template>\n                    </EraAccordion>\n                  </div>\n                </template>\n              </EraAccordion>\n\n              <TabSwitch v-model:active=\"activeTab\" :tabs=\"tabs\"> <!-- 中文注释：选项卡 -->\n                <template #pure> <!-- 中文注释：纯净状态数据 -->\n                  <PrettyJsonViewer :value=\"dataRef.statWithoutMeta\" :default-collapsed=\"true\" :max-depth=\"Infinity\" /> <!-- 中文注释：JSON 视图 -->\n                </template>\n                <template #full> <!-- 中文注释：完整状态数据 -->\n                  <PrettyJsonViewer :value=\"dataRef.stat\" :default-collapsed=\"true\" :max-depth=\"Infinity\" /> <!-- 中文注释：JSON 视图 -->\n                </template>\n              </TabSwitch>\n            </template>\n\n            <template v-else> <!-- 中文注释：暂无数据占位 -->\n              <div class=\"empty\">等待 era:writeDone 事件数据…</div> <!-- 中文注释：占位提示 -->\n            </template>\n          </div>\n        </div>\n\n        <!-- 右侧固定栏：只改变“位置/外部结构”，不改按钮逻辑 -->\n        <aside class=\"right-rail\"> <!-- 中文注释：右侧栏容器 -->\n          <ActionButtons /> <!-- 中文注释：操作按钮组件（事件保持不变） -->\n        </aside>\n      </div>\n    </div>\n\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { computed, onMounted, ref, watch } from 'vue';\nimport { Logger } from '../utils/log';\nimport ActionButtons from './components/ActionButtons.vue';\nimport FloatingBall from './components/FloatingBall.vue';\n\n// 从 EraDataPanel 迁移过来的 imports\nimport EraAccordion from './components/era-panel/parts/EraAccordion.vue';\nimport MetaHeader from './components/era-panel/parts/MetaHeader.vue';\nimport PrettyJsonViewer from './components/era-panel/parts/PrettyJsonViewer.vue';\nimport TabSwitch from './components/era-panel/parts/TabSwitch.vue';\n\n// 从 EraDataPanel 迁移过来的类型定义\ntype Actions = { rollback: boolean; apply: boolean; resync: boolean; api: boolean; apiWrite: boolean };\nexport interface WriteDonePayload {\n  mk: string;\n  message_id: number;\n  actions: Actions;\n  selectedMks: (string | null)[];\n  editLogs: Record<string, any[]>;\n  stat: any;\n  statWithoutMeta: any;\n  consecutiveProcessingCount: number;\n}\n\n// TabSwitch 需要的类型\ntype TabItem = { key: 'pure' | 'full'; label: string };\n\nconst logger = new Logger('ui-App');\n\n// App.vue 原有的 props\nconst props = defineProps({\n  initialView: {\n    type: String,\n    required: true,\n    default: 'FloatingBall',\n  },\n  eventData: {\n    type: Object as () => WriteDonePayload | null,\n    default: () => null,\n  },\n});\n\n// App.vue 原有的逻辑\nconst currentComponent = ref(props.initialView);\nconst requestSwitchView = (viewName: 'FloatingBall' | 'ExpandedView') => {\n  logger.debug('requestSwitchView', `请求切换视图到: ${viewName}`);\n  if ((window as any).eraUiSwitchView) {\n    (window as any).eraUiSwitchView(viewName);\n  } else {\n    logger.warn('requestSwitchView', '全局切换函数 eraUiSwitchView 未找到');\n  }\n};\n\n// 从 EraDataPanel 迁移过来的逻辑\nconst dataRef = computed(() => props.eventData || null);\n\nconst tabs: TabItem[] = [\n  { key: 'pure', label: '纯净状态数据' },\n  { key: 'full', label: '完整状态数据' },\n];\nconst activeTab = ref<'pure' | 'full'>('pure');\n\nonMounted(() => {\n  logger.log('onMounted', 'App.vue 组件已挂载', { props: props });\n});\n\nwatch(\n  () => props.eventData,\n  (newData, oldData) => {\n    logger.debug('watch:eventData', 'eventData prop 发生变化', {\n      newData,\n      oldData,\n    });\n  },\n  { deep: true },\n);\n\nwatch(\n  () => props.initialView,\n  newView => {\n    logger.debug('watch:initialView', `initialView prop 发生变化，新视图: ${newView}`);\n    currentComponent.value = newView;\n  },\n);\n</script>\n\n<style>\n/* App.vue 原有样式 */\n.era-app-container {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; /* 为子元素之间添加一些间距 */\n}\n</style>\n\n<style scoped>\n/* 从 EraDataPanel.vue 迁移过来的样式 */\n.era-panel {\n  width: min(960px, 60vw);\n  height: min(680px, 86vh);\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.65));\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(10px);\n  border-radius: 16px;\n  box-shadow:\n    0 10px 40px rgba(0, 0, 0, 0.18),\n    inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  overflow: hidden;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n}\n\n.panel-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.45));\n}\n.panel-title {\n  font-size: 16px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  color: #1f2937;\n}\n.btn-close {\n  width: 32px;\n  height: 32px;\n  line-height: 30px;\n  text-align: center;\n  border-radius: 8px;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  background: #fff;\n  cursor: pointer;\n  font-size: 18px;\n  color: #6b7280;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.btn-close:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\n}\n\n.panel-body {\n  padding: 14px 14px 16px;\n  overflow: auto;\n}\n\n.block {\n  margin: 12px 0 4px;\n  padding: 10px 12px;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n}\n.block-title {\n  margin: 0 0 8px;\n  font-size: 13px;\n  font-weight: 800;\n  color: #374151;\n}\n\n.chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.chip {\n  font-size: 12px;\n  padding: 6px 8px;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 999px;\n  background: linear-gradient(180deg, #fafafa, #f4f4f4);\n  color: #6b7280;\n  box-shadow: inset 0 1px 0 #fff;\n}\n.chip.ok {\n  color: #065f46;\n  background: linear-gradient(180deg, #ecfdf5, #d1fae5);\n  border-color: #a7f3d0;\n}\n\n.mk-strip {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  max-height: 140px;\n  overflow: auto;\n}\n.mk-pill {\n  display: inline-flex;\n  gap: 6px;\n  align-items: center;\n  padding: 6px 8px;\n  background: linear-gradient(180deg, #eef2ff, #e0e7ff);\n  color: #4338ca;\n  border: 1px solid #c7d2fe;\n  border-radius: 8px;\n  font-size: 12px;\n}\n.mk-pill.is-null {\n  background: linear-gradient(180deg, #f9fafb, #f3f4f6);\n  color: #6b7280;\n  border-color: #e5e7eb;\n}\n\n.empty {\n  height: 360px;\n  display: grid;\n  place-items: center;\n  color: #6b7280;\n  font-size: 14px;\n  border: 1px dashed rgba(0, 0, 0, 0.08);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n/* ===[新增] 折叠时把“按钮后紧邻的内容体”彻底压平并裁剪（通用规则） === */\n/* 适配 EraAccordion：标题按钮有 aria-expanded，内容体是紧邻兄弟元素 */\n:deep(button[aria-expanded='false'] + *) {\n  height: 0 !important; /* 高度压到 0，彻底收起 */\n  padding-top: 0 !important; /* 去掉上下内边距，防止露出一条边 */\n  padding-bottom: 0 !important;\n  margin-top: 0 !important; /* 去掉上下外边距，避免 margin 折叠穿出 */\n  margin-bottom: 0 !important;\n  border-top-width: 0 !important; /* 若内容体自身有分割线，折叠时去掉 */\n  border-bottom-width: 0 !important;\n  overflow: clip !important; /* 关键：裁剪一切子内容（含虚线/阴影） */\n  contain: paint !important; /* 防止子级阴影/边框超出裁剪边界 */\n}\n\n/* 展开状态可恢复可见溢出（如悬浮提示），默认即可，可保守加一条： */\n:deep(button[aria-expanded='true'] + *) {\n  overflow: visible; /* 展开时恢复正常绘制 */\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* ===[新增] 横向壳：左面板 + 右侧栏（按钮）=== */\n.era-shell { /* 横向包裹容器 */ /* 中文注释：横向排列容器 */\n  display: flex; /* 横向布局 */ /* 中文注释：flex 横排 */\n  align-items: flex-start; /* 顶对齐 */ /* 中文注释：上缘对齐 */\n  gap: 12px; /* 左右间距 */ /* 中文注释：元素间距 */\n  flex-wrap: nowrap; /* 默认不换行 */ /* 中文注释：保持并排 */\n}\n\n/* 保持面板宽高（原样），但让它更好地在横向中自适应 */\n.era-panel { /* 已存在：此处只说明语义，不做覆盖 */ /* 中文注释：保留原样式 */\n  flex: 0 1 auto; /* 面板按自身宽度布局 */ /* 中文注释：不强行拉伸 */\n}\n\n/* 右侧栏外框：与左面板视觉统一（玻璃卡片风） */\n.right-rail { /* 右侧区域容器 */ /* 中文注释：侧栏 */\n  width: min(320px, 34vw); /* 宽度自适应，桌面约 280-320px 体验最佳 */ /* 中文注释：侧栏宽度 */\n  position: sticky; /* 粘附在视口内滚动 */ /* 中文注释：吸附在视口顶部 */\n  top: 10px; /* 与顶部留白 */ /* 中文注释：吸顶间距 */\n  align-self: flex-start; /* 与左侧面板顶部对齐 */ /* 中文注释：自身对齐顶部 */\n  z-index: 1; /* 避免被面板阴影覆盖 */ /* 中文注释：提升层级 */\n}\n\n/* 小屏回落：改为上下堆叠（按钮在下） */\n@media (max-width: 1100px) { /* 1100px 下回落 */ /* 中文注释：响应式断点 */\n  .era-shell { /* 横向容器 */ /* 中文注释：容器 */\n    flex-wrap: wrap; /* 允许换行 */ /* 中文注释：允许堆叠 */\n  }\n  .right-rail { /* 侧栏 */ /* 中文注释：侧栏 */\n    width: 100%; /* 占满一行 */ /* 中文注释：全宽 */\n    position: static; /* 取消吸顶，避免窄屏遮挡 */ /* 中文注释：不吸顶 */\n    margin-top: 8px; /* 与上方留白 */ /* 中文注释：间距 */\n  }\n}\n\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.action-buttons-card[data-v-b1998c20]{width:100%;padding:12px;background:linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,255,255,0.62));border:1px solid rgba(255,255,255,0.6);border-radius:16px;backdrop-filter:blur(10px);box-shadow:0 10px 40px rgba(0,0,0,0.16),inset 0 1px 0 rgba(255,255,255,0.6);display:flex;flex-direction:column;gap:10px}.card-title[data-v-b1998c20]{margin:0 0 4px;font-size:14px;font-weight:800;letter-spacing:0.3px;color:#1f2937}.btns[data-v-b1998c20]{display:flex;flex-direction:column;gap:10px}.btn[data-v-b1998c20]{display:grid;grid-template-columns:22px 1fr;align-items:center;-moz-column-gap:8px;column-gap:8px;padding:10px 12px;border-radius:12px;border:1px solid rgba(0,0,0,0.06);background:linear-gradient(180deg,#fafafa,#f3f4f6);color:#374151;font-weight:700;font-size:13px;cursor:pointer;box-shadow:inset 0 1px 0 #fff,0 2px 8px rgba(0,0,0,0.08);transition:transform 0.12s ease,box-shadow 0.12s ease,background 0.2s ease;text-align:left}.btn.primary[data-v-b1998c20]{background:linear-gradient(180deg,#e0f2fe,#bfdbfe);border-color:#93c5fd;color:#0f172a}.btn.subtle[data-v-b1998c20]{background:linear-gradient(180deg,#f9fafb,#f3f4f6);border-color:#e5e7eb}.btn[data-v-b1998c20]:hover{transform:translateY(-1px);box-shadow:inset 0 1px 0 #fff,0 6px 16px rgba(0,0,0,0.12)}.btn[data-v-b1998c20]:active{transform:translateY(0);box-shadow:inset 0 1px 0 #fff,0 2px 8px rgba(0,0,0,0.1)}.btn[data-v-b1998c20]:focus-visible{outline:2px solid #60a5fa;outline-offset:2px}.ico[data-v-b1998c20]{display:inline-grid;place-items:center;width:22px;height:22px;filter:saturate(0.95)}.label[data-v-b1998c20]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/ActionButtons.vue"],"names":[],"mappings":"AA8CA,sCAEE,UAAW,CACX,YAAa,CACb,gFAAyF,CACzF,sCAA0C,CAC1C,kBAAmB,CACnB,0BAA2B,CAC3B,2EAEwC,CACxC,YAAa,CACb,qBAAsB,CACtB,QACF,CAGA,6BAEE,cAAe,CACf,cAAe,CACf,eAAgB,CAChB,oBAAqB,CACrB,aACF,CAGA,uBAEE,YAAa,CACb,qBAAsB,CACtB,QACF,CAGA,sBAEE,YAAa,CACb,8BAA+B,CAC/B,kBAAmB,CACnB,mBAAe,CAAf,cAAe,CACf,iBAAkB,CAClB,kBAAmB,CACnB,iCAAqC,CACrC,kDAAqD,CACrD,aAAc,CACd,eAAgB,CAChB,cAAe,CACf,cAAe,CACf,wDAE+B,CAC/B,0EAGsB,CACtB,eACF,CAGA,8BAEE,kDAAqD,CACrD,oBAAqB,CACrB,aACF,CAGA,6BAEE,kDAAqD,CACrD,oBACF,CAGA,4BAEE,0BAA2B,CAC3B,yDAGF,CACA,6BAEE,uBAAwB,CACxB,uDAGF,CAGA,oCAEE,yBAA0B,CAC1B,kBACF,CAGA,sBAEE,mBAAoB,CACpB,kBAAmB,CACnB,UAAW,CACX,WAAY,CACZ,qBACF,CACA,wBAEE,kBAAmB,CACnB,eAAgB,CAChB,sBACF","sourcesContent":["<template>\n  <!-- 右侧操作卡：外层自包含，不依赖父组件样式 -->\n  <section class=\"action-buttons-card\" role=\"complementary\" aria-label=\"ERA 快捷操作\">\n    <!-- 中文注释：操作卡容器 -->\n    <h4 class=\"card-title\">快捷操作</h4>\n    <!-- 中文注释：卡片标题 -->\n    <div class=\"btns\">\n      <!-- 中文注释：按钮垂直栈 -->\n      <button class=\"btn primary\" title=\"重新计算所有变量\" @click.stop=\"onFullSync\">\n        <!-- 中文注释：主按钮 -->\n        <span class=\"ico\" aria-hidden=\"true\">🔄</span>\n        <!-- 中文注释：图标 -->\n        <span class=\"label\">完全重算变量</span>\n        <!-- 中文注释：文字 -->\n      </button>\n      <button class=\"btn subtle\" title=\"只重算最新一楼的变量\" @click.stop=\"onLastSync\">\n        <!-- 中文注释：次按钮 -->\n        <span class=\"ico\" aria-hidden=\"true\">♻️</span>\n        <!-- 中文注释：图标 -->\n        <span class=\"label\">重算最后一楼变量</span>\n        <!-- 中文注释：文字 -->\n      </button>\n    </div>\n  </section>\n</template>\n\n<script setup lang=\"ts\">\nimport { Logger } from '../../utils/log'; // 中文注释：日志工具\n\nconst logger = new Logger('ui-ActionButtons'); // 中文注释：实例化日志\n\nfunction onFullSync() {\n  // 中文注释：完全重算事件\n  logger.log('onFullSync', '点击“完全重算变量”，发送 manual_full_sync 事件。'); // 中文注释：日志\n  eventEmit('manual_full_sync'); // 中文注释：发送全量重算事件（保持不变）\n}\n\nfunction onLastSync() {\n  // 中文注释：局部重算事件\n  logger.log('onLastSync', '点击“重算最后一楼变量”，发送 manual_sync 事件。'); // 中文注释：日志\n  eventEmit('manual_sync'); // 中文注释：发送单楼重算事件（保持不变）\n}\n</script>\n\n<style scoped>\n/* === 外层卡片：与左侧 ERA 面板同风格（玻璃卡 + 轻浮雕） === */\n.action-buttons-card {\n  /* 中文注释：卡片容器 */\n  width: 100%; /* 占满侧栏 */ /* 中文注释：自适应宽度 */\n  padding: 12px; /* 内边距 */ /* 中文注释：留白 */\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62)); /* 中文注释：半透明渐变 */\n  border: 1px solid rgba(255, 255, 255, 0.6); /* 中文注释：浅色描边 */\n  border-radius: 16px; /* 中文注释：圆角 */\n  backdrop-filter: blur(10px); /* 中文注释：毛玻璃效果 */\n  box-shadow:\n    0 10px 40px rgba(0, 0, 0, 0.16),\n    inset 0 1px 0 rgba(255, 255, 255, 0.6); /* 中文注释：外投影 + 内高光 */\n  display: flex; /* 中文注释：纵向布局 */\n  flex-direction: column; /* 中文注释：垂直排列 */\n  gap: 10px; /* 中文注释：元素间距 */\n}\n\n/* 标题：与面板标题权重接近但略轻 */\n.card-title {\n  /* 中文注释：卡片标题 */\n  margin: 0 0 4px; /* 中文注释：底部留白 */\n  font-size: 14px; /* 中文注释：字号 */\n  font-weight: 800; /* 中文注释：加粗 */\n  letter-spacing: 0.3px; /* 中文注释：字距 */\n  color: #1f2937; /* 中文注释：深灰文字 */\n}\n\n/* 按钮栈：竖直排列 */\n.btns {\n  /* 中文注释：按钮容器 */\n  display: flex; /* 中文注释：flex 布局 */\n  flex-direction: column; /* 中文注释：垂直排列 */\n  gap: 10px; /* 中文注释：上下间距 */\n}\n\n/* 通用按钮造型：大号、易点、可聚焦 */\n.btn {\n  /* 中文注释：通用按钮 */\n  display: grid; /* 中文注释：网格方便对齐图标与文字 */\n  grid-template-columns: 22px 1fr; /* 中文注释：左 22px 图标 + 右侧文字 */\n  align-items: center; /* 中文注释：垂直居中 */\n  column-gap: 8px; /* 中文注释：图标与文字间距 */\n  padding: 10px 12px; /* 中文注释：触控友好尺寸 */\n  border-radius: 12px; /* 中文注释：圆角 */\n  border: 1px solid rgba(0, 0, 0, 0.06); /* 中文注释：浅描边 */\n  background: linear-gradient(180deg, #fafafa, #f3f4f6); /* 中文注释：浅灰渐变 */\n  color: #374151; /* 中文注释：文字颜色 */\n  font-weight: 700; /* 中文注释：字重 */\n  font-size: 13px; /* 中文注释：字号 */\n  cursor: pointer; /* 中文注释：可点击 */\n  box-shadow:\n    inset 0 1px 0 #fff,\n    0 2px 8px rgba(0, 0, 0, 0.08); /* 中文注释：内高光 + 轻投影 */\n  transition:\n    transform 0.12s ease,\n    box-shadow 0.12s ease,\n    background 0.2s ease; /* 中文注释：交互过渡 */\n  text-align: left; /* 中文注释：靠左 */\n}\n\n/* 主按钮：略带品牌色调（蓝青） */\n.btn.primary {\n  /* 中文注释：主按钮 */\n  background: linear-gradient(180deg, #e0f2fe, #bfdbfe); /* 中文注释：浅蓝渐变 */\n  border-color: #93c5fd; /* 中文注释：描边蓝 */\n  color: #0f172a; /* 中文注释：深色文字 */\n}\n\n/* 次按钮：更素雅 */\n.btn.subtle {\n  /* 中文注释：次按钮 */\n  background: linear-gradient(180deg, #f9fafb, #f3f4f6); /* 中文注释：浅灰渐变 */\n  border-color: #e5e7eb; /* 中文注释：浅灰描边 */\n}\n\n/* 悬停与按压反馈 */\n.btn:hover {\n  /* 中文注释：悬停态 */\n  transform: translateY(-1px); /* 中文注释：轻浮起 */\n  box-shadow:\n    inset 0 1px 0 #fff,\n    0 6px 16px rgba(0, 0, 0, 0.12); /* 中文注释：增强投影 */\n}\n.btn:active {\n  /* 中文注释：按下态 */\n  transform: translateY(0); /* 中文注释：回落 */\n  box-shadow:\n    inset 0 1px 0 #fff,\n    0 2px 8px rgba(0, 0, 0, 0.1); /* 中文注释：回到轻投影 */\n}\n\n/* 焦点可见性（无障碍） */\n.btn:focus-visible {\n  /* 中文注释：键盘聚焦态 */\n  outline: 2px solid #60a5fa; /* 中文注释：蓝色描边 */\n  outline-offset: 2px; /* 中文注释：描边偏移 */\n}\n\n/* 图标与文字 */\n.ico {\n  /* 中文注释：图标框 */\n  display: inline-grid; /* 中文注释：网格放置 */\n  place-items: center; /* 中文注释：居中 */\n  width: 22px; /* 中文注释：宽度 */\n  height: 22px; /* 中文注释：高度 */\n  filter: saturate(0.95); /* 中文注释：轻饱和 */\n}\n.label {\n  /* 中文注释：文字 */\n  white-space: nowrap; /* 中文注释：不换行（文字短） */\n  overflow: hidden; /* 中文注释：溢出裁剪 */\n  text-overflow: ellipsis; /* 中文注释：省略号 */\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.floating-ball[data-v-2fa4c130]{--size:50px;--hue:212;--sat:100%;--lum:52%;--surface:hsl(var(--hue) var(--sat) var(--lum));--surface-2:hsl(var(--hue) 95% 64%);--ring:hsl(calc(var(--hue) + 20) 95% 65%);--shadow:rgba(0,123,255,0.36);--glow:rgba(102,200,255,0.55);--inner-shadow:rgba(0,0,0,0.22);--specular:rgba(255,255,255,0.75);--glass:rgba(255,255,255,0.18);width:var(--size);height:var(--size);border-radius:50%;position:relative;display:grid;place-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;background:radial-gradient(120% 120% at 30% 28%,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.22) 18%,rgba(255,255,255,0) 36%),radial-gradient(120% 120% at 70% 72%,rgba(0,0,0,0.18) 0%,rgba(0,0,0,0) 38%),conic-gradient(from 210deg at 50% 50%,var(--surface),var(--surface-2),var(--surface));box-shadow:inset 0 2px 6px var(--inner-shadow),0 2px 4px rgba(0,0,0,0.08),0 10px 22px var(--shadow);transition:transform 0.28s ease,box-shadow 0.28s ease,filter 0.28s ease;will-change:transform,box-shadow,filter;animation:ball-bob-2fa4c130 3.2s ease-in-out infinite}.floating-ball[data-v-2fa4c130]::after{content:'';position:absolute;inset:-8px;border-radius:50%;background:conic-gradient(from 0deg,var(--ring),transparent 30%,transparent 70%,var(--ring));filter:blur(6px);opacity:0.55;pointer-events:none;-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 12px),#000 0);mask:radial-gradient(farthest-side,transparent calc(100% - 12px),#000 0);animation:ring-spin-2fa4c130 12s linear infinite}.floating-ball[data-v-2fa4c130]::before{content:'';position:absolute;inset:2px;border-radius:50%;background:radial-gradient(120% 80% at 26% 24%,var(--specular) 0%,rgba(255,255,255,0.2) 26%,rgba(255,255,255,0) 46%),linear-gradient(160deg,var(--glass) 0%,rgba(255,255,255,0) 50%);mix-blend-mode:screen;pointer-events:none;transition:opacity 0.28s ease,transform 0.28s ease}.floating-ball[data-v-2fa4c130]:hover{transform:translateY(-2px) scale(1.04);box-shadow:inset 0 2px 8px rgba(0,0,0,0.22),0 4px 10px rgba(0,0,0,0.12),0 16px 36px rgba(0,123,255,0.45);filter:saturate(1.08)}.floating-ball[data-v-2fa4c130]:hover::before{opacity:0.95;animation:shimmer-2fa4c130 1.2s ease-out}.floating-ball[data-v-2fa4c130]:active{transform:translateY(0) scale(0.98);box-shadow:inset 0 2px 10px rgba(0,0,0,0.28),0 2px 6px rgba(0,0,0,0.12),0 10px 22px rgba(0,123,255,0.35)}.floating-ball[data-v-2fa4c130]:focus-visible{outline:2px solid rgba(102,200,255,0.85);outline-offset:2px}@media (prefers-reduced-motion:reduce){.floating-ball[data-v-2fa4c130]{animation:none}.floating-ball[data-v-2fa4c130]::after{animation:none}}@keyframes ball-bob-2fa4c130{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}@keyframes ring-spin-2fa4c130{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes shimmer-2fa4c130{0%{transform:translateY(-1px) scale(0.98);opacity:0.6}50%{transform:translateY(-2px) scale(1.02);opacity:1}100%{transform:translateY(-1px) scale(0.99);opacity:0.85}}.floating-ball[data-v-2fa4c130]{--logo-scale:0.38}.era-logo[data-v-2fa4c130]{font-weight:800;font-size:calc(var(--size) * var(--logo-scale));letter-spacing:0.02em;line-height:1;transform:translateY(-1px);white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;z-index:1;background:linear-gradient(180deg,rgba(255,255,255,0.96) 0%,rgba(255,255,255,0.55) 45%,rgba(220,240,255,0.4) 65%,rgba(120,195,255,0.55) 100%),linear-gradient(180deg,rgba(0,0,0,0.38),rgba(0,0,0,0) 60%);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 1px 0 rgba(255,255,255,0.75),0 2px 4px rgba(0,0,0,0.25),0 8px 18px rgba(0,123,255,0.35);filter:drop-shadow(0 0 2px rgba(102,200,255,0.25));animation:era-sheen-2fa4c130 4s ease-in-out infinite}.floating-ball:hover .era-logo[data-v-2fa4c130]{text-shadow:0 1px 0 rgba(255,255,255,0.85),0 3px 8px rgba(0,0,0,0.28),0 10px 26px rgba(0,123,255,0.55);filter:drop-shadow(0 0 3px rgba(102,200,255,0.38))}@keyframes era-sheen-2fa4c130{0%,100%{background-position:0% 0%,0% 0%}50%{background-position:0% 40%,0% 0%}}
`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/FloatingBall.vue"],"names":[],"mappings":"AAuBA,gCACE,WAAY,CACZ,SAAU,CACV,UAAW,CACX,SAAU,CACV,+CAAgD,CAChD,mCAAoC,CACpC,yCAA0C,CAC1C,6BAAiC,CACjC,6BAAiC,CACjC,+BAAmC,CACnC,iCAAqC,CACrC,8BAAkC,CAClC,iBAAkB,CAClB,kBAAmB,CACnB,iBAAkB,CAClB,iBAAkB,CAClB,YAAa,CACb,kBAAmB,CACnB,cAAe,CACf,wBAAiB,CAAjB,gBAAiB,CACjB,uCAAwC,CACxC,+RAQ0G,CAC1G,mGAG0C,CAC1C,uEAGmB,CACnB,uCAA0C,CAC1C,qDACF,CAGA,uCACE,UAAW,CACX,iBAAkB,CAClB,UAAW,CACX,iBAAkB,CAClB,4FAMC,CACD,gBAAiB,CACjB,YAAa,CACb,mBAAoB,CACpB,gFAA2E,CAA3E,wEAA2E,CAC3E,gDACF,CAGA,wCACE,UAAW,CACX,iBAAkB,CAClB,SAAU,CACV,iBAAkB,CAClB,oLAE+E,CAC/E,qBAAsB,CACtB,mBAAoB,CACpB,kDAGF,CAGA,sCACE,sCAAuC,CACvC,wGAGgD,CAChD,qBACF,CAGA,8CACE,YAAa,CACb,wCACF,CAGA,uCACE,mCAAoC,CACpC,wGAIF,CAGA,8CACE,wCAA4C,CAC5C,kBACF,CAGA,uCACE,gCACE,cACF,CACA,uCACE,cACF,CACF,CAGA,6BACE,QAEE,uBACF,CACA,IACE,0BACF,CACF,CAGA,8BACE,GACE,sBACF,CACA,KACE,wBACF,CACF,CAGA,4BACE,GACE,sCAAuC,CACvC,WACF,CACA,IACE,sCAAuC,CACvC,SACF,CACA,KACE,sCAAuC,CACvC,YACF,CACF,CAGA,gCACE,iBACF,CAEA,2BACE,eAAgB,CAChB,+CAAgD,CAChD,qBAAsB,CACtB,aAAc,CACd,0BAA2B,CAC3B,kBAAmB,CACnB,wBAAiB,CAAjB,gBAAiB,CACjB,mBAAoB,CACpB,SAAU,CAGV,wMAQmF,CACnF,4BAA6B,CAC7B,oBAAqB,CACrB,iBAAkB,CAClB,qGAG8C,CAC9C,kDAAsD,CACtD,oDACF,CAEA,gDACE,sGAGqC,CACrC,kDACF,CAGA,8BACE,QAEE,+BAGF,CACA,IACE,gCAGF,CACF","sourcesContent":["<template>\n  <div class=\"floating-ball\" @click=\"$emit('click')\">\n    <span class=\"era-logo\" aria-hidden=\"true\">ERA</span>\n    <!-- 仅显示用；不拦截事件 -->\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { onMounted } from 'vue';\nimport { Logger } from '../../utils/log';\n\nconst logger = new Logger('ui-FloatingBall');\ndefineEmits(['click']);\n\nonMounted(() => {\n  logger.log('onMounted', 'FloatingBall.vue 组件已挂载');\n});\n</script>\n\n<style scoped>\n/* =========================\n   可调外观变量（局部作用域）\n   ========================= */\n.floating-ball {\n  --size: 50px; /* 直径：保持默认 50px，与原始一致 */\n  --hue: 212; /* 主色相：212≈#007bff，方便全局协调色相 */\n  --sat: 100%; /* 饱和度：更鲜亮 */\n  --lum: 52%; /* 明度：主色的明度 */\n  --surface: hsl(var(--hue) var(--sat) var(--lum)); /* 主表面色 */\n  --surface-2: hsl(var(--hue) 95% 64%); /* 渐变第二色，略亮 */\n  --ring: hsl(calc(var(--hue) + 20) 95% 65%); /* 外环的点缀色，偏青一点 */\n  --shadow: rgba(0, 123, 255, 0.36); /* 阴影颜色（与主色相近） */\n  --glow: rgba(102, 200, 255, 0.55); /* 外发光颜色 */\n  --inner-shadow: rgba(0, 0, 0, 0.22); /* 内阴影增强体积感 */\n  --specular: rgba(255, 255, 255, 0.75); /* 高光 */\n  --glass: rgba(255, 255, 255, 0.18); /* 玻璃质感覆盖层 */\n  width: var(--size); /* 宽度设为可变量 */\n  height: var(--size); /* 高度设为可变量 */\n  border-radius: 50%; /* 圆形 */\n  position: relative; /* 作为伪元素定位参照 */\n  display: grid; /* 用 grid 实现精确居中 */\n  place-items: center; /* 居中对齐 */\n  cursor: pointer; /* 手型光标（仅视觉，不改逻辑） */\n  user-select: none; /* 防止误选中文本 */\n  -webkit-tap-highlight-color: transparent; /* 移动端点击高亮去除 */\n  background:\n    radial-gradient(\n      120% 120% at 30% 28%,\n      rgba(255, 255, 255, 0.85) 0%,\n      rgba(255, 255, 255, 0.22) 18%,\n      rgba(255, 255, 255, 0) 36%\n    ),\n    /* 玻璃高光 */ radial-gradient(120% 120% at 70% 72%, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0) 38%),\n    /* 微内阴影，增加体积 */ conic-gradient(from 210deg at 50% 50%, var(--surface), var(--surface-2), var(--surface)); /* 主表面渐变：柔和流动感 */\n  box-shadow:\n    inset 0 2px 6px var(--inner-shadow),\n    /* 内阴影：球体边缘收束 */ 0 2px 4px rgba(0, 0, 0, 0.08),\n    /* 基础投影：贴地感 */ 0 10px 22px var(--shadow); /* 远投影：悬浮感 */\n  transition:\n    transform 0.28s ease,\n    box-shadow 0.28s ease,\n    filter 0.28s ease; /* 悬停时的平滑过渡 */\n  will-change: transform, box-shadow, filter; /* 提示浏览器优化 */\n  animation: ball-bob 3.2s ease-in-out infinite; /* 轻微上下浮动 */\n}\n\n/* 光晕外环（纯视觉层），不占点击区域 */\n.floating-ball::after {\n  content: ''; /* 生成外环层 */\n  position: absolute; /* 绝对定位贴合父元素 */\n  inset: -8px; /* 向外延展 8px，制造发光边缘 */\n  border-radius: 50%; /* 保持圆形 */\n  background: conic-gradient(\n    from 0deg,\n    var(--ring),\n    transparent 30%,\n    transparent 70%,\n    var(--ring)\n  ); /* 细腻的色环闪烁 */\n  filter: blur(6px); /* 模糊成柔和光晕 */\n  opacity: 0.55; /* 半透明，避免喧宾 */\n  pointer-events: none; /* 不拦截鼠标事件 */\n  mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 0); /* 掏空中心形成环 */\n  animation: ring-spin 12s linear infinite; /* 慢速旋转，低侵扰 */\n}\n\n/* 玻璃高光层（更立体） */\n.floating-ball::before {\n  content: ''; /* 生成高光层 */\n  position: absolute; /* 绝对定位 */\n  inset: 2px; /* 缩进一点，保留边缘 */\n  border-radius: 50%; /* 圆形 */\n  background:\n    radial-gradient(120% 80% at 26% 24%, var(--specular) 0%, rgba(255, 255, 255, 0.2) 26%, rgba(255, 255, 255, 0) 46%),\n    /* 亮斑 */ linear-gradient(160deg, var(--glass) 0%, rgba(255, 255, 255, 0) 50%); /* 玻璃蒙层 */\n  mix-blend-mode: screen; /* 与底色叠加更自然 */\n  pointer-events: none; /* 不拦截事件 */\n  transition:\n    opacity 0.28s ease,\n    transform 0.28s ease; /* 悬停联动 */\n}\n\n/* 悬停态：轻微抬升+增强光影 */\n.floating-ball:hover {\n  transform: translateY(-2px) scale(1.04); /* 轻微升起并放大 */\n  box-shadow:\n    inset 0 2px 8px rgba(0, 0, 0, 0.22),\n    /* 内阴影略加强 */ 0 4px 10px rgba(0, 0, 0, 0.12),\n    /* 近影增强 */ 0 16px 36px rgba(0, 123, 255, 0.45); /* 远影更亮，呈现发光 */\n  filter: saturate(1.08); /* 提升饱和度一点点 */\n}\n\n/* 悬停时的微光扫过效果 */\n.floating-ball:hover::before {\n  opacity: 0.95; /* 高光更显著 */\n  animation: shimmer 1.2s ease-out; /* 一次性高光掠过 */\n}\n\n/* 按下态：略压低 */\n.floating-ball:active {\n  transform: translateY(0) scale(0.98); /* 回落一点并轻微压扁 */\n  box-shadow:\n    inset 0 2px 10px rgba(0, 0, 0, 0.28),\n    0 2px 6px rgba(0, 0, 0, 0.12),\n    0 10px 22px rgba(0, 123, 255, 0.35); /* 回到接近初始的阴影 */\n}\n\n/* 可达性：键盘聚焦时的可见描边（不改变布局） */\n.floating-ball:focus-visible {\n  outline: 2px solid rgba(102, 200, 255, 0.85); /* 高亮描边 */\n  outline-offset: 2px; /* 外移 2px，避免遮挡球体 */\n}\n\n/* 减少动态偏好：关闭动画保持静态优雅 */\n@media (prefers-reduced-motion: reduce) {\n  .floating-ball {\n    animation: none;\n  } /* 去除上下浮动 */\n  .floating-ball::after {\n    animation: none;\n  } /* 停止外环旋转 */\n}\n\n/* 轻微上下浮动（循环） */\n@keyframes ball-bob {\n  0%,\n  100% {\n    transform: translateY(0);\n  } /* 起点/终点：原位 */\n  50% {\n    transform: translateY(-2px);\n  } /* 中点：上浮 2px */\n}\n\n/* 外环慢速旋转（不刺眼） */\n@keyframes ring-spin {\n  0% {\n    transform: rotate(0deg);\n  } /* 起点：0 度 */\n  100% {\n    transform: rotate(360deg);\n  } /* 终点：整周旋转 */\n}\n\n/* 悬停时的高光扫过 */\n@keyframes shimmer {\n  0% {\n    transform: translateY(-1px) scale(0.98);\n    opacity: 0.6;\n  } /* 初始：弱一点的高光 */\n  50% {\n    transform: translateY(-2px) scale(1.02);\n    opacity: 1;\n  } /* 中段：最亮最大 */\n  100% {\n    transform: translateY(-1px) scale(0.99);\n    opacity: 0.85;\n  } /* 结束：回落 */\n}\n\n/* ======= ERA 内标（仅视觉层） ======= */\n.floating-ball {\n  --logo-scale: 0.38;\n} /* 可调：字体占球直径比例 */\n\n.era-logo {\n  font-weight: 800; /* 粗体，增强刻感 */\n  font-size: calc(var(--size) * var(--logo-scale)); /* 跟随球大小缩放 */\n  letter-spacing: 0.02em; /* 轻微字距，避免糊 */\n  line-height: 1; /* 紧凑对齐 */\n  transform: translateY(-1px); /* 视觉微调居中 */\n  white-space: nowrap; /* 防止换行 */\n  user-select: none;\n  pointer-events: none; /* 不抢事件、不选中 */\n  z-index: 1; /* 位于背景之上（仍在 ::after 光环之下） */\n\n  /* 渐变镂空字 + 立体阴影 */\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.96) 0%,\n      rgba(255, 255, 255, 0.55) 45%,\n      rgba(220, 240, 255, 0.4) 65%,\n      rgba(120, 195, 255, 0.55) 100%\n    ),\n    /* 高光到冷蓝的层次 */ linear-gradient(180deg, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0) 60%); /* 轻内阴影 */\n  -webkit-background-clip: text;\n  background-clip: text; /* 渐变裁剪到文字 */\n  color: transparent; /* 镂空填充由背景提供 */\n  text-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.75),\n    /* 顶部掣光 */ 0 2px 4px rgba(0, 0, 0, 0.25),\n    /* 近阴影 */ 0 8px 18px rgba(0, 123, 255, 0.35); /* 远发光阴影 */\n  filter: drop-shadow(0 0 2px rgba(102, 200, 255, 0.25)); /* 柔光晕 */\n  animation: era-sheen 4s ease-in-out infinite; /* 轻微高光流动 */\n}\n\n.floating-ball:hover .era-logo {\n  text-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.85),\n    0 3px 8px rgba(0, 0, 0, 0.28),\n    0 10px 26px rgba(0, 123, 255, 0.55); /* 悬停增强立体感 */\n  filter: drop-shadow(0 0 3px rgba(102, 200, 255, 0.38)); /* 发光略加强 */\n}\n\n/* 高光缓慢上移，制造玻璃流光感（低侵扰） */\n@keyframes era-sheen {\n  0%,\n  100% {\n    background-position:\n      0% 0%,\n      0% 0%;\n  }\n  50% {\n    background-position:\n      0% 40%,\n      0% 0%;\n  }\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.acc[data-v-525cff1c]{border:1px solid rgba(0,0,0,0.06);border-radius:12px;background:linear-gradient(180deg,#fff,#fafafa);overflow:hidden}.acc-head[data-v-525cff1c]{width:100%;display:flex;align-items:center;gap:10px;background:linear-gradient(180deg,#f9fafb,#f3f4f6);border-bottom:1px solid rgba(0,0,0,0.06);padding:10px 12px;cursor:pointer;font-weight:800;color:#374151}.caret[data-v-525cff1c]{transition:transform 0.18s ease}.caret.open[data-v-525cff1c]{transform:rotate(90deg)}.title[data-v-525cff1c]{font-size:13px}.spacer[data-v-525cff1c]{flex:1}.hint[data-v-525cff1c]{font-size:12px;color:#6b7280}.acc-body[data-v-525cff1c]{display:grid;grid-template-rows:0fr;transition:grid-template-rows 0.28s ease;background:rgba(255,255,255,0.82)}.acc-body.open[data-v-525cff1c]{grid-template-rows:1fr}.inner[data-v-525cff1c]{overflow:hidden;transition:padding 0.28s ease,visibility 0s 0.28s;padding:0 12px;visibility:hidden}.acc-body.open .inner[data-v-525cff1c]{padding:10px 12px;visibility:visible;transition-delay:0s}
`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue"],"names":[],"mappings":"AAkCA,sBACE,iCAAqC,CACrC,kBAAmB,CACnB,+CAAkD,CAClD,eACF,CAEA,2BACE,UAAW,CACX,YAAa,CACb,kBAAmB,CACnB,QAAS,CACT,kDAAqD,CACrD,wCAA4C,CAC5C,iBAAkB,CAClB,cAAe,CACf,eAAgB,CAChB,aACF,CACA,wBACE,+BACF,CACA,6BACE,uBACF,CACA,wBACE,cACF,CACA,yBACE,MACF,CACA,uBACE,cAAe,CACf,aACF,CAEA,2BACE,YAAa,CACb,sBAAuB,CACvB,wCAAyC,CACzC,iCACF,CACA,gCACE,sBACF,CAEA,wBACE,eAAgB,CAEhB,iDAEqB,CACrB,cAAe,CACf,iBACF,CACA,uCACE,iBAAkB,CAClB,kBAAmB,CACnB,mBACF","sourcesContent":["<template>\n  <section class=\"acc\">\n    <!-- 折叠头：点击切换 -->\n    <button class=\"acc-head\" :aria-expanded=\"open ? 'true' : 'false'\" @click=\"open = !open\">\n      <span class=\"caret\" :class=\"{ open }\">▸</span>\n      <!-- 指示箭头 -->\n      <span class=\"title\">{{ title }}</span>\n      <!-- 标题文本 -->\n      <span class=\"spacer\"></span>\n      <!-- 弹性空隙 -->\n      <span class=\"hint\">{{ open ? '收起' : '展开' }}</span>\n      <!-- 右侧提示 -->\n    </button>\n\n    <!-- 内容：高度过渡（使用 CSS Grid） -->\n    <div class=\"acc-body\" :class=\"{ open }\">\n      <div class=\"inner\">\n        <slot />\n      </div>\n    </div>\n  </section>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\n\nconst props = withDefaults(defineProps<{ title: string; defaultOpen?: boolean }>(), {\n  defaultOpen: false,\n});\n\nconst open = ref<boolean>(props.defaultOpen);\n</script>\n\n<style scoped>\n.acc {\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  background: linear-gradient(180deg, #fff, #fafafa);\n  overflow: hidden;\n}\n\n.acc-head {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: linear-gradient(180deg, #f9fafb, #f3f4f6);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  padding: 10px 12px;\n  cursor: pointer;\n  font-weight: 800;\n  color: #374151;\n}\n.caret {\n  transition: transform 0.18s ease;\n}\n.caret.open {\n  transform: rotate(90deg);\n}\n.title {\n  font-size: 13px;\n}\n.spacer {\n  flex: 1;\n}\n.hint {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n.acc-body {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows 0.28s ease;\n  background: rgba(255, 255, 255, 0.82);\n}\n.acc-body.open {\n  grid-template-rows: 1fr;\n}\n\n.inner {\n  overflow: hidden;\n  /* Add transitions for padding and visibility */\n  transition:\n    padding 0.28s ease,\n    visibility 0s 0.28s; /* Hide after the collapse transition ends */\n  padding: 0 12px;\n  visibility: hidden;\n}\n.acc-body.open .inner {\n  padding: 10px 12px;\n  visibility: visible;\n  transition-delay: 0s; /* Show immediately when opening */\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.json-line[data-v-24d5a928]{position:relative;display:flex;align-items:center;gap:6px;padding:2px 6px;border-radius:6px}.json-line[data-v-24d5a928]:hover{background:rgba(59,130,246,0.06)}.json-children[data-v-24d5a928]{border-left:1px dashed rgba(107,114,128,0.25)}.key[data-v-24d5a928]{color:#1f2937;font-weight:700}.colon[data-v-24d5a928]{color:#6b7280}.brace[data-v-24d5a928]{color:#9ca3af}.summary[data-v-24d5a928]{color:#6b7280;margin-left:4px}.val.string[data-v-24d5a928]{color:#047857}.val.number[data-v-24d5a928]{color:#7c3aed}.val.boolean[data-v-24d5a928]{color:#0369a1}.val.null[data-v-24d5a928]{color:#9ca3af}.val.undefined[data-v-24d5a928]{color:#9ca3af}.caret[data-v-24d5a928]{width:18px;height:18px;border:1px solid rgba(0,0,0,0.06);border-radius:4px;background:#fff;line-height:16px;text-align:center;font-size:10px;color:#6b7280;cursor:pointer;box-shadow:0 1px 0 #fff,0 2px 6px rgba(0,0,0,0.06);transition:transform 0.18s ease,box-shadow 0.18s ease}.caret.open[data-v-24d5a928]{transform:rotate(90deg);box-shadow:0 3px 10px rgba(0,0,0,0.12)}.node[data-v-24d5a928]{overflow:clip;contain:paint;min-height:0}.json-children[data-v-24d5a928]{overflow:clip;contain:paint}

`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue"],"names":[],"mappings":"AAoJA,4BACE,iBAAkB,CAClB,YAAa,CACb,kBAAmB,CACnB,OAAQ,CACR,eAAgB,CAChB,iBACF,CACA,kCACE,gCACF,CACA,gCACE,6CACF,CAGA,sBACE,aAAc,CACd,eACF,CACA,wBACE,aACF,CACA,wBACE,aACF,CACA,0BACE,aAAc,CACd,eACF,CACA,6BACE,aACF,CACA,6BACE,aACF,CACA,8BACE,aACF,CACA,2BACE,aACF,CACA,gCACE,aACF,CAGA,wBACE,UAAW,CACX,WAAY,CACZ,iCAAqC,CACrC,iBAAkB,CAClB,eAAgB,CAChB,gBAAiB,CACjB,iBAAkB,CAClB,cAAe,CACf,aAAc,CACd,cAAe,CACf,kDAE+B,CAC/B,qDAGF,CACA,6BACE,uBAAwB,CACxB,sCACF,CAGA,uBACE,aAAc,CACd,aAAc,CACd,YACF,CAEA,gCACE,aAAc,CACd,aACF","sourcesContent":["<template>\n  <!-- 单条节点（支持递归） -->\n  <div class=\"node\">\n    <!-- 每个键值对 / 数组项的容器 -->\n    <div class=\"json-line\" :style=\"{ paddingLeft: level * 14 + 'px' }\">\n      <!-- 行+缩进 -->\n      <button v-if=\"foldable\" class=\"caret\" :class=\"{ open }\" aria-label=\"toggle\" @click=\"open = !open\">▸</button>\n      <!-- 折叠箭头按钮 -->\n\n      <span class=\"key\">{{ k }}</span\n      ><span class=\"colon\">:</span>\n      <!-- 键与冒号 -->\n\n      <!-- 可折叠容器：只显示括号与摘要；展开后由下方 children 区域递归渲染 -->\n      <template v-if=\"foldable\">\n        <span class=\"brace\">{{ isArray ? '[' : '{' }}</span>\n        <!-- 容器起始括号 -->\n        <span v-if=\"!open\" class=\"summary\">{{ summary }}</span>\n        <!-- 收起时的摘要 -->\n      </template>\n\n      <!-- 原始值：直接着色渲染 -->\n      <template v-else>\n        <span class=\"val\" :class=\"type\">{{ primitiveText }}</span>\n        <!-- 原始值文本 -->\n      </template>\n    </div>\n\n    <!-- 子元素区域：仅当可折叠且处于展开态时显示 -->\n    <template v-if=\"foldable && open\">\n      <div class=\"json-children\">\n        <!-- 递归：自引用同名组件 JsonNode（依赖 name: 'JsonNode' 实现自递归） -->\n        <JsonNode\n          v-for=\"(childVal, childKey) in childEntries\"\n          :key=\"path + '/' + String(childKey)\"\n          :k=\"String(childKey)\"\n          :v=\"childVal\"\n          :path=\"path + '/' + String(childKey)\"\n          :level=\"level + 1\"\n          :default-collapsed=\"defaultCollapsed\"\n          :max-depth=\"maxDepth\"\n        />\n        <div class=\"json-line\" :style=\"{ paddingLeft: level * 14 + 'px' }\">\n          <span class=\"brace\">{{ isArray ? ']' : '}' }}</span>\n          <!-- 容器闭合括号 -->\n        </div>\n      </div>\n    </template>\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport { computed, defineComponent, onMounted, ref, watch } from 'vue'; // 引入响应式/组件工具\nimport { Logger } from '../../../../utils/log';\n\nexport default defineComponent({\n  name: 'JsonNode', // 关键：为自递归提供组件名\n  props: {\n    k: { type: [String, Number], required: true }, // 当前键（或数组下标）\n    v: { required: true }, // 当前值\n    path: { type: String, required: true }, // 路径（仅用于 key/调试）\n    level: { type: Number, required: true }, // 层级（用于缩进）\n    defaultCollapsed: { type: Boolean, default: true }, // 默认是否折叠\n    maxDepth: { type: Number, default: 3 }, // 初次展开的最大深度\n  },\n  setup(p) {\n    const logger = new Logger(`ui-JsonNode[${p.path}]`);\n\n    onMounted(() => {\n      logger.log('onMounted', '组件已挂载', { props: p });\n    });\n\n    // 节点类型判定\n    const type = computed(() => {\n      const val = p.v;\n      if (val === null) return 'null';\n      if (Array.isArray(val)) return 'array';\n      const t = typeof val;\n      if (t === 'object') return 'object';\n      if (t === 'undefined') return 'undefined';\n      return t as 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'function';\n    });\n\n    // 是否数组/对象\n    const isArray = computed(() => type.value === 'array');\n    const isObject = computed(() => type.value === 'object');\n\n    // 是否可折叠\n    const foldable = computed(() => isArray.value || isObject.value);\n\n    // 初始开合：不超过 maxDepth 的层级默认展开；否则遵循 defaultCollapsed\n    const open = ref<boolean>(p.level <= (p.maxDepth ?? 3) ? true : !p.defaultCollapsed);\n\n    watch(open, newOpenState => {\n      logger.debug('watch:open', `折叠状态改变为: ${newOpenState ? '展开' : '收起'}`);\n    });\n\n    // 原始值渲染文本（补足 undefined / bigint / symbol）\n    const primitiveText = computed(() => {\n      const val = p.v as any;\n      switch (type.value) {\n        case 'string':\n          return JSON.stringify(val);\n        case 'number':\n          return String(val);\n        case 'boolean':\n          return val ? 'true' : 'false';\n        case 'null':\n          return 'null';\n        case 'undefined':\n          return 'undefined';\n        case 'bigint':\n          return String(val) + 'n';\n        case 'symbol':\n          return String(val);\n        case 'function':\n          return 'ƒ()';\n        default:\n          return '';\n      }\n    });\n\n    // 收起时的摘要信息\n    const summary = computed(() => {\n      if (isArray.value) return `Array[${(p.v as any[]).length}]`;\n      if (isObject.value) return `Object{${Object.keys(p.v || {}).length}}`;\n      return '';\n    });\n\n    // 子项列表：对象 → 其 entries；数组 → 直接枚举索引和值\n    const childEntries = computed<Record<string, any>>(() => {\n      if (isObject.value) return p.v as Record<string, any>;\n      if (isArray.value) {\n        const out: Record<string, any> = {};\n        (p.v as any[]).forEach((cv, idx) => {\n          out[String(idx)] = cv;\n        });\n        return out;\n      }\n      return {};\n    });\n\n    return { type, isArray, foldable, open, primitiveText, summary, childEntries };\n  },\n});\n</script>\n\n<style scoped>\n.json-line {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.json-line:hover {\n  background: rgba(59, 130, 246, 0.06);\n}\n.json-children {\n  border-left: 1px dashed rgba(107, 114, 128, 0.25);\n}\n\n/* 结构元素与着色 */\n.key {\n  color: #1f2937;\n  font-weight: 700;\n}\n.colon {\n  color: #6b7280;\n}\n.brace {\n  color: #9ca3af;\n}\n.summary {\n  color: #6b7280;\n  margin-left: 4px;\n}\n.val.string {\n  color: #047857;\n}\n.val.number {\n  color: #7c3aed;\n}\n.val.boolean {\n  color: #0369a1;\n}\n.val.null {\n  color: #9ca3af;\n}\n.val.undefined {\n  color: #9ca3af;\n}\n\n/* 折叠箭头 */\n.caret {\n  width: 18px;\n  height: 18px;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 4px;\n  background: #fff;\n  line-height: 16px;\n  text-align: center;\n  font-size: 10px;\n  color: #6b7280;\n  cursor: pointer;\n  box-shadow:\n    0 1px 0 #fff,\n    0 2px 6px rgba(0, 0, 0, 0.06);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.caret.open {\n  transform: rotate(90deg);\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);\n}\n\n/* ===[新增] 防溢出：节点与子树都裁剪（配合上层折叠时彻底看不见） === */\n.node {                     /* 单个节点容器 */\n  overflow: clip;           /* 裁剪节点内部所有绘制 */\n  contain: paint;           /* 隔离绘制，避免 1px 渲染外泄 */\n  min-height: 0;            /* 防“最小高度”把父级撑开 */\n}\n\n.json-children {            /* 子节点区域 */\n  overflow: clip;           /* 裁剪子树（含左侧虚线等装饰） */\n  contain: paint;           /* 防止子元素阴影/边框超界 */\n}\n\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.meta[data-v-3824c4e0]{position:relative;padding:12px 12px 14px;border:1px solid rgba(0,0,0,0.06);border-radius:12px;background:linear-gradient(180deg,#ffffff,#f9fafb);box-shadow:0 6px 18px rgba(0,0,0,0.06),inset 0 1px 0 #fff}.meta-title[data-v-3824c4e0]{margin:0 0 10px;font-size:13px;font-weight:800;color:#374151}.kv[data-v-3824c4e0]{display:grid;grid-template-columns:120px 1fr;gap:8px 12px}.item[data-v-3824c4e0]{display:contents}.k[data-v-3824c4e0]{justify-self:start;align-self:center;font-size:12px;color:#6b7280;background:#f3f4f6;border:1px solid #e5e7eb;padding:4px 8px;border-radius:8px;font-weight:700}.v[data-v-3824c4e0]{align-self:center;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;color:#111827;background:#fff;border:1px solid #e5e7eb;padding:6px 8px;border-radius:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.glow[data-v-3824c4e0]{position:absolute;left:12px;right:12px;top:-1px;height:3px;border-radius:999px;background:linear-gradient(90deg,#60a5fa,#a78bfa,#34d399,#f472b6);filter:blur(0.4px)}
`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue"],"names":[],"mappings":"AA8CA,uBACE,iBAAkB,CAClB,sBAAuB,CACvB,iCAAqC,CACrC,kBAAmB,CACnB,kDAAqD,CACrD,yDAGF,CACA,6BACE,eAAgB,CAChB,cAAe,CACf,eAAgB,CAChB,aACF,CAEA,qBACE,YAAa,CACb,+BAAgC,CAChC,YACF,CACA,uBACE,gBACF,CACA,oBACE,kBAAmB,CACnB,iBAAkB,CAClB,cAAe,CACf,aAAc,CACd,kBAAmB,CACnB,wBAAyB,CACzB,eAAgB,CAChB,iBAAkB,CAClB,eACF,CACA,oBACE,iBAAkB,CAClB,iDAAqD,CACrD,cAAe,CACf,aAAc,CACd,eAAgB,CAChB,wBAAyB,CACzB,eAAgB,CAChB,iBAAkB,CAClB,eAAgB,CAChB,sBAAuB,CACvB,kBACF,CAGA,uBACE,iBAAkB,CAClB,SAAU,CACV,UAAW,CACX,QAAS,CACT,UAAW,CACX,mBAAoB,CACpB,iEAAsE,CACtE,kBACF","sourcesContent":["<template>\n  <section class=\"meta\">\n    <h4 class=\"meta-title\">最新消息元数据</h4>\n    <!-- 小节标题 -->\n    <div class=\"kv\">\n      <div class=\"item\">\n        <span class=\"k\">mk</span>\n        <!-- 键：mk -->\n        <span class=\"v\" :title=\"mk\">{{ mk || '—' }}</span>\n        <!-- 值：mk -->\n      </div>\n      <div class=\"item\">\n        <span class=\"k\">message_id</span>\n        <!-- 键：message_id -->\n        <span class=\"v\">{{ messageId ?? '—' }}</span>\n        <!-- 值：message_id -->\n      </div>\n    </div>\n    <div class=\"glow\"></div>\n    <!-- 装饰：流光条 -->\n  </section>\n</template>\n\n<script setup lang=\"ts\">\nimport { onMounted, watch } from 'vue';\nimport { Logger } from '../../../../utils/log';\n\nconst logger = new Logger('ui-MetaHeader');\n\n// 接收父组件传入的两个字段\nconst props = defineProps<{ mk: string; messageId: number }>(); // 简单的只读展示\n\nonMounted(() => {\n  logger.log('onMounted', '组件已挂载', { props });\n});\n\nwatch(\n  () => props,\n  newProps => {\n    logger.debug('watch:props', 'Props 发生变化', { newProps });\n  },\n  { deep: true },\n);\n</script>\n\n<style scoped>\n.meta {\n  position: relative;\n  padding: 12px 12px 14px;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  background: linear-gradient(180deg, #ffffff, #f9fafb);\n  box-shadow:\n    0 6px 18px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 #fff;\n}\n.meta-title {\n  margin: 0 0 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: #374151;\n}\n\n.kv {\n  display: grid;\n  grid-template-columns: 120px 1fr;\n  gap: 8px 12px;\n}\n.item {\n  display: contents;\n}\n.k {\n  justify-self: start;\n  align-self: center;\n  font-size: 12px;\n  color: #6b7280;\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  padding: 4px 8px;\n  border-radius: 8px;\n  font-weight: 700;\n}\n.v {\n  align-self: center;\n  font-family: ui-monospace, Menlo, Consolas, monospace;\n  font-size: 12px;\n  color: #111827;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  padding: 6px 8px;\n  border-radius: 8px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n/* 顶部流光装饰 */\n.glow {\n  position: absolute;\n  left: 12px;\n  right: 12px;\n  top: -1px;\n  height: 3px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399, #f472b6);\n  filter: blur(0.4px);\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.json-root[data-v-15c94b4e]{font-size:12px;color:#111827}.json-line[data-v-15c94b4e]{position:relative;display:flex;align-items:center;gap:6px;padding:2px 6px;border-radius:6px}.json-line[data-v-15c94b4e]:hover{background:rgba(59,130,246,0.06)}.json-children[data-v-15c94b4e]{border-left:1px dashed rgba(107,114,128,0.25)}.key[data-v-15c94b4e]{color:#1f2937;font-weight:700}.colon[data-v-15c94b4e]{color:#6b7280}.brace[data-v-15c94b4e]{color:#9ca3af}.val.string[data-v-15c94b4e]{color:#047857}.val.number[data-v-15c94b4e]{color:#7c3aed}.val.boolean[data-v-15c94b4e]{color:#0369a1}.val.null[data-v-15c94b4e]{color:#9ca3af}.val.undefined[data-v-15c94b4e]{color:#9ca3af}.json-root[data-v-15c94b4e]{overflow:clip;contain:layout paint;min-height:0}.json-children[data-v-15c94b4e]{overflow:clip;contain:paint}

`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue"],"names":[],"mappings":"AAkIA,4BACE,cAAe,CACf,aACF,CACA,4BACE,iBAAkB,CAClB,YAAa,CACb,kBAAmB,CACnB,OAAQ,CACR,eAAgB,CAChB,iBACF,CACA,kCACE,gCACF,CACA,gCACE,6CACF,CAEA,sBACE,aAAc,CACd,eACF,CACA,wBACE,aACF,CACA,wBACE,aACF,CAEA,6BACE,aACF,CACA,6BACE,aACF,CACA,8BACE,aACF,CACA,2BACE,aACF,CACA,gCACE,aACF,CAGA,4BACE,aAAc,CACd,oBAAqB,CACrB,YACF,CAEA,gCACE,aAAc,CACd,aACF","sourcesContent":["<template>\n  <div class=\"json-root\">\n    <div class=\"json-line\">\n      <span class=\"brace\">{{ rootOpen }}</span>\n      <!-- 根开括号：对象{ / 数组[ -->\n    </div>\n\n    <div class=\"json-children\">\n      <template v-if=\"isPlainObjectOrArray\">\n        <JsonNode\n          v-for=\"(v, k) in value\"\n          :key=\"String(k)\"\n          :k=\"String(k)\"\n          :v=\"v\"\n          :path=\"String(k)\"\n          :level=\"1\"\n          :default-collapsed=\"defaultCollapsed\"\n          :max-depth=\"maxDepth\"\n        />\n      </template>\n\n      <template v-else>\n        <div class=\"json-line\" :style=\"{ paddingLeft: 1 * 14 + 'px' }\">\n          <span class=\"key\">value</span><span class=\"colon\">:</span>\n          <span class=\"val\" :class=\"primitiveType\">{{ primitiveText }}</span>\n        </div>\n      </template>\n    </div>\n\n    <div class=\"json-line\">\n      <span class=\"brace\">{{ rootClose }}</span>\n      <!-- 根闭括号：对象} / 数组] -->\n    </div>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { computed } from 'vue'; // 计算属性工具\nimport { Logger } from '../../../../utils/log';\nimport JsonNode from './JsonNode.vue'; // ✅ 改为导入独立 SFC 的递归节点组件\n\nconst logger = new Logger();\n\nconst props = withDefaults(\n  defineProps<{\n    value: any; // 要展示的 JSON 值\n    defaultCollapsed?: boolean; // 默认是否折叠\n    maxDepth?: number; // 初次展开最大层数\n  }>(),\n  {\n    defaultCollapsed: true, // 默认折叠\n    maxDepth: 3, // 默认展开到 3 层\n  },\n);\n\nconst isPlainObjectOrArray = computed(() => {\n  const v = props.value; // 取入参值\n  const result = v !== null && typeof v === 'object'; // 仅对象/数组才进入逐键渲染\n  logger.debug('isPlainObjectOrArray', `计算结果: ${result}。该值${result ? '是' : '不是'}普通对象或数组。`, {\n    传入值: v,\n  });\n  return result;\n}); // 是否对象/数组\n\nconst primitiveType = computed(() => {\n  const v = props.value; // 取入参值\n  let result: string;\n  if (v === null) {\n    result = 'null';\n  } else if (Array.isArray(v)) {\n    result = 'array'; // 数组（不会走到该分支，因为上面 isPlainObjectOrArray 判断过）\n  } else {\n    const t = typeof v; // 原始类型\n    result = t === 'undefined' ? 'undefined' : t;\n  }\n  logger.debug('primitiveType', `计算原始值类型: ${result}`, { 传入值: v });\n  return result;\n}); // 原始值类型名（用于着色）\n\nconst primitiveText = computed(() => {\n  const v = props.value; // 取入参值\n  let result: string;\n  switch (\n    primitiveType.value // 按类型格式化文本\n  ) {\n    case 'string':\n      result = JSON.stringify(v); // 字符串带引号\n      break;\n    case 'number':\n      result = String(v); // 数字\n      break;\n    case 'boolean':\n      result = v ? 'true' : 'false'; // 布尔\n      break;\n    case 'null':\n      result = 'null'; // null\n      break;\n    case 'undefined':\n      result = 'undefined'; // undefined\n      break;\n    case 'bigint':\n      result = String(v) + 'n'; // bigint\n      break;\n    case 'symbol':\n      result = String(v); // symbol\n      break;\n    case 'function':\n      result = 'ƒ()'; // 函数\n      break;\n    default:\n      result = ''; // 兜底\n      break;\n  }\n  logger.debug('primitiveText', `格式化原始值文本: \"${result}\"`, {\n    传入值: v,\n    类型: primitiveType.value,\n  });\n  return result;\n}); // 原始值文本\n\nconst isArrayRoot = computed(() => {\n  const result = Array.isArray(props.value);\n  logger.debug('isArrayRoot', `计算根节点是否为数组: ${result}`, { 传入值: props.value });\n  return result;\n}); // 根是否数组\nconst rootOpen = computed(() => (isArrayRoot.value ? '[' : '{')); // 根开括号\nconst rootClose = computed(() => (isArrayRoot.value ? ']' : '}')); // 根闭括号\n</script>\n\n<style scoped>\n.json-root {\n  font-size: 12px;\n  color: #111827;\n}\n.json-line {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.json-line:hover {\n  background: rgba(59, 130, 246, 0.06);\n}\n.json-children {\n  border-left: 1px dashed rgba(107, 114, 128, 0.25);\n}\n\n.key {\n  color: #1f2937;\n  font-weight: 700;\n}\n.colon {\n  color: #6b7280;\n}\n.brace {\n  color: #9ca3af;\n}\n\n.val.string {\n  color: #047857;\n}\n.val.number {\n  color: #7c3aed;\n}\n.val.boolean {\n  color: #0369a1;\n}\n.val.null {\n  color: #9ca3af;\n}\n.val.undefined {\n  color: #9ca3af;\n}\n\n/* ===[新增] 防溢出：根与子容器都裁剪绘制，避免在外部容器高度为 0 时“透出” === */\n.json-root {                /* JSON 根容器：自身成为一个绘制边界 */\n  overflow: clip;           /* 裁剪一切溢出（比 hidden 更省性能、无滚动条） */\n  contain: layout paint;    /* 隔离布局与绘制，防外部高度计算误差 */\n  min-height: 0;            /* 防止 flex 场景 min-content 顶高父级 */\n}\n\n.json-children {            /* 子区：同样裁剪，解决左侧虚线在收起时外露 */\n  overflow: clip;           /* 子级再保险裁剪 */\n  contain: paint;           /* 进一步隔离绘制 */\n}\n\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.tabs[data-v-f245150a]{margin-top:12px;border:1px solid rgba(0,0,0,0.06);border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#fff,#fafafa)}.tab-bar[data-v-f245150a]{display:flex;gap:8px;padding:8px;border-bottom:1px solid rgba(0,0,0,0.06);background:linear-gradient(180deg,#f9fafb,#f3f4f6)}.tab-btn[data-v-f245150a]{padding:8px 12px;font-weight:800;font-size:13px;color:#6b7280;background:#fff;border:1px solid #e5e7eb;border-radius:10px;cursor:pointer}.tab-btn.active[data-v-f245150a]{color:#111827;border-color:#93c5fd;box-shadow:inset 0 1px 0 #fff,0 0 0 3px rgba(147,197,253,0.35)}.tab-content[data-v-f245150a]{padding:10px 12px;background:rgba(255,255,255,0.86)}
`, "",{"version":3,"sources":["webpack://./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue"],"names":[],"mappings":"AA+DA,uBACE,eAAgB,CAChB,iCAAqC,CACrC,kBAAmB,CACnB,eAAgB,CAChB,+CACF,CACA,0BACE,YAAa,CACb,OAAQ,CACR,WAAY,CACZ,wCAA4C,CAC5C,kDACF,CACA,0BACE,gBAAiB,CACjB,eAAgB,CAChB,cAAe,CACf,aAAc,CACd,eAAgB,CAChB,wBAAyB,CACzB,kBAAmB,CACnB,cACF,CACA,iCACE,aAAc,CACd,oBAAqB,CACrB,8DAGF,CACA,8BACE,iBAAkB,CAClB,iCACF","sourcesContent":["<template>\n  <section class=\"tabs\">\n    <!-- 页签行 -->\n    <div class=\"tab-bar\" role=\"tablist\">\n      <button\n        v-for=\"t in tabs\"\n        :key=\"t.key\"\n        class=\"tab-btn\"\n        :class=\"{ active: t.key === innerActive }\"\n        role=\"tab\"\n        @click=\"setActive(t.key)\"\n      >\n        {{ t.label }}\n      </button>\n    </div>\n\n    <!-- 内容区：根据活动键渲染对应插槽 -->\n    <div class=\"tab-content\">\n      <div v-if=\"innerActive === 'pure'\">\n        <slot name=\"pure\" />\n        <!-- 纯净状态数据内容 -->\n      </div>\n      <div v-else>\n        <slot name=\"full\" />\n        <!-- 完整状态数据内容 -->\n      </div>\n    </div>\n  </section>\n</template>\n\n<script setup lang=\"ts\">\nimport { onMounted, ref, watch } from 'vue'; // 引入响应式工具\nimport { Logger } from '../../../../utils/log';\n\ntype TabItem = { key: 'pure' | 'full'; label: string }; // Tab 项类型\n\nconst logger = new Logger('ui-TabSwitch');\nconst props = defineProps<{ tabs: TabItem[]; active?: 'pure' | 'full' }>(); // 输入 tabs 与可选 active\nconst emit = defineEmits<{ 'update:active': ['pure' | 'full'] }>(); // v-model:active\n\nconst innerActive = ref<'pure' | 'full'>(props.active ?? 'pure'); // 内部活动键\n\nwatch(\n  () => props.active,\n  v => {\n    if (v) {\n      logger.debug('watch:active', `外部同步 active tab 为: ${v}`);\n      innerActive.value = v;\n    }\n  },\n); // 外部变更时同步\nfunction setActive(k: 'pure' | 'full') {\n  logger.log('setActive', `用户点击，切换 tab 到: ${k}`);\n  innerActive.value = k;\n  emit('update:active', k);\n} // 切换并抛出\n\nonMounted(() => {\n  logger.log('onMounted', '组件已挂载', { props });\n});\n</script>\n\n<style scoped>\n.tabs {\n  margin-top: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  overflow: hidden;\n  background: linear-gradient(180deg, #fff, #fafafa);\n}\n.tab-bar {\n  display: flex;\n  gap: 8px;\n  padding: 8px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: linear-gradient(180deg, #f9fafb, #f3f4f6);\n}\n.tab-btn {\n  padding: 8px 12px;\n  font-weight: 800;\n  font-size: 13px;\n  color: #6b7280;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  cursor: pointer;\n}\n.tab-btn.active {\n  color: #111827;\n  border-color: #93c5fd;\n  box-shadow:\n    inset 0 1px 0 #fff,\n    0 0 0 3px rgba(147, 197, 253, 0.35);\n}\n.tab-content {\n  padding: 10px 12px;\n  background: rgba(255, 255, 255, 0.86);\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=script&setup=true&lang=ts":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=script&setup=true&lang=ts ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _components_ActionButtons_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ActionButtons.vue */ "./src/ERA变量框架/ui/components/ActionButtons.vue");
/* harmony import */ var _components_FloatingBall_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FloatingBall.vue */ "./src/ERA变量框架/ui/components/FloatingBall.vue");
/* harmony import */ var _components_era_panel_parts_EraAccordion_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/era-panel/parts/EraAccordion.vue */ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue");
/* harmony import */ var _components_era_panel_parts_MetaHeader_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/era-panel/parts/MetaHeader.vue */ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue");
/* harmony import */ var _components_era_panel_parts_PrettyJsonViewer_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/era-panel/parts/PrettyJsonViewer.vue */ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue");
/* harmony import */ var _components_era_panel_parts_TabSwitch_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/era-panel/parts/TabSwitch.vue */ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue");
/* unplugin-vue-components disabled */




// 从 EraDataPanel 迁移过来的 imports




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'App',
    props: {
        initialView: {
            type: String,
            required: true,
            default: 'FloatingBall',
        },
        eventData: {
            type: Object,
            default: () => null,
        },
    },
    setup(__props, { expose: __expose }) {
        __expose();
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger('ui-App');
        // App.vue 原有的 props
        const props = __props;
        // App.vue 原有的逻辑
        const currentComponent = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.initialView);
        const requestSwitchView = (viewName) => {
            logger.debug('requestSwitchView', `请求切换视图到: ${viewName}`);
            if (window.eraUiSwitchView) {
                window.eraUiSwitchView(viewName);
            }
            else {
                logger.warn('requestSwitchView', '全局切换函数 eraUiSwitchView 未找到');
            }
        };
        // 从 EraDataPanel 迁移过来的逻辑
        const dataRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.eventData || null);
        const tabs = [
            { key: 'pure', label: '纯净状态数据' },
            { key: 'full', label: '完整状态数据' },
        ];
        const activeTab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('pure');
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
            logger.log('onMounted', 'App.vue 组件已挂载', { props: props });
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => props.eventData, (newData, oldData) => {
            logger.debug('watch:eventData', 'eventData prop 发生变化', {
                newData,
                oldData,
            });
        }, { deep: true });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => props.initialView, newView => {
            logger.debug('watch:initialView', `initialView prop 发生变化，新视图: ${newView}`);
            currentComponent.value = newView;
        });
        const __returned__ = { logger, props, currentComponent, requestSwitchView, dataRef, tabs, activeTab, ActionButtons: _components_ActionButtons_vue__WEBPACK_IMPORTED_MODULE_2__["default"], FloatingBall: _components_FloatingBall_vue__WEBPACK_IMPORTED_MODULE_3__["default"], EraAccordion: _components_era_panel_parts_EraAccordion_vue__WEBPACK_IMPORTED_MODULE_4__["default"], MetaHeader: _components_era_panel_parts_MetaHeader_vue__WEBPACK_IMPORTED_MODULE_5__["default"], PrettyJsonViewer: _components_era_panel_parts_PrettyJsonViewer_vue__WEBPACK_IMPORTED_MODULE_6__["default"], TabSwitch: _components_era_panel_parts_TabSwitch_vue__WEBPACK_IMPORTED_MODULE_7__["default"] };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=script&setup=true&lang=ts":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=script&setup=true&lang=ts ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* unplugin-vue-components disabled */
 // 中文注释：日志工具
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'ActionButtons',
    setup(__props, { expose: __expose }) {
        __expose();
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger('ui-ActionButtons'); // 中文注释：实例化日志
        function onFullSync() {
            // 中文注释：完全重算事件
            logger.log('onFullSync', '点击“完全重算变量”，发送 manual_full_sync 事件。'); // 中文注释：日志
            eventEmit('manual_full_sync'); // 中文注释：发送全量重算事件（保持不变）
        }
        function onLastSync() {
            // 中文注释：局部重算事件
            logger.log('onLastSync', '点击“重算最后一楼变量”，发送 manual_sync 事件。'); // 中文注释：日志
            eventEmit('manual_sync'); // 中文注释：发送单楼重算事件（保持不变）
        }
        const __returned__ = { logger, onFullSync, onLastSync };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=script&setup=true&lang=ts":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=script&setup=true&lang=ts ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* unplugin-vue-components disabled */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'FloatingBall',
    emits: ['click'],
    setup(__props, { expose: __expose }) {
        __expose();
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger('ui-FloatingBall');
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
            logger.log('onMounted', 'FloatingBall.vue 组件已挂载');
        });
        const __returned__ = { logger };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=script&setup=true&lang=ts":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=script&setup=true&lang=ts ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'EraAccordion',
    props: {
        title: { type: String, required: true },
        defaultOpen: { type: Boolean, required: false, default: false }
    },
    setup(__props, { expose: __expose }) {
        __expose();
        const props = __props;
        const open = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.defaultOpen);
        const __returned__ = { props, open };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=script&lang=ts":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=script&lang=ts ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* unplugin-vue-components disabled */ // 引入响应式/组件工具

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: 'JsonNode', // 关键：为自递归提供组件名
    props: {
        k: { type: [String, Number], required: true }, // 当前键（或数组下标）
        v: { required: true }, // 当前值
        path: { type: String, required: true }, // 路径（仅用于 key/调试）
        level: { type: Number, required: true }, // 层级（用于缩进）
        defaultCollapsed: { type: Boolean, default: true }, // 默认是否折叠
        maxDepth: { type: Number, default: 3 }, // 初次展开的最大深度
    },
    setup(p) {
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger(`ui-JsonNode[${p.path}]`);
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
            logger.log('onMounted', '组件已挂载', { props: p });
        });
        // 节点类型判定
        const type = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            const val = p.v;
            if (val === null)
                return 'null';
            if (Array.isArray(val))
                return 'array';
            const t = typeof val;
            if (t === 'object')
                return 'object';
            if (t === 'undefined')
                return 'undefined';
            return t;
        });
        // 是否数组/对象
        const isArray = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => type.value === 'array');
        const isObject = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => type.value === 'object');
        // 是否可折叠
        const foldable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => isArray.value || isObject.value);
        // 初始开合：不超过 maxDepth 的层级默认展开；否则遵循 defaultCollapsed
        const open = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(p.level <= (p.maxDepth ?? 3) ? true : !p.defaultCollapsed);
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(open, newOpenState => {
            logger.debug('watch:open', `折叠状态改变为: ${newOpenState ? '展开' : '收起'}`);
        });
        // 原始值渲染文本（补足 undefined / bigint / symbol）
        const primitiveText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            const val = p.v;
            switch (type.value) {
                case 'string':
                    return JSON.stringify(val);
                case 'number':
                    return String(val);
                case 'boolean':
                    return val ? 'true' : 'false';
                case 'null':
                    return 'null';
                case 'undefined':
                    return 'undefined';
                case 'bigint':
                    return String(val) + 'n';
                case 'symbol':
                    return String(val);
                case 'function':
                    return 'ƒ()';
                default:
                    return '';
            }
        });
        // 收起时的摘要信息
        const summary = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            if (isArray.value)
                return `Array[${p.v.length}]`;
            if (isObject.value)
                return `Object{${Object.keys(p.v || {}).length}}`;
            return '';
        });
        // 子项列表：对象 → 其 entries；数组 → 直接枚举索引和值
        const childEntries = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            if (isObject.value)
                return p.v;
            if (isArray.value) {
                const out = {};
                p.v.forEach((cv, idx) => {
                    out[String(idx)] = cv;
                });
                return out;
            }
            return {};
        });
        return { type, isArray, foldable, open, primitiveText, summary, childEntries };
    },
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=script&setup=true&lang=ts":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=script&setup=true&lang=ts ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* unplugin-vue-components disabled */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'MetaHeader',
    props: {
        mk: { type: String, required: true },
        messageId: { type: Number, required: true }
    },
    setup(__props, { expose: __expose }) {
        __expose();
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger('ui-MetaHeader');
        // 接收父组件传入的两个字段
        const props = __props; // 简单的只读展示
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
            logger.log('onMounted', '组件已挂载', { props });
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => props, newProps => {
            logger.debug('watch:props', 'Props 发生变化', { newProps });
        }, { deep: true });
        const __returned__ = { logger, props };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _JsonNode_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JsonNode.vue */ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue");
/* unplugin-vue-components disabled */
 // 计算属性工具

 // ✅ 改为导入独立 SFC 的递归节点组件
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'PrettyJsonViewer',
    props: {
        value: { type: null, required: true },
        defaultCollapsed: { type: Boolean, required: false, default: true },
        maxDepth: { type: Number, required: false, default: 3 }
    },
    setup(__props, { expose: __expose }) {
        __expose();
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger();
        const props = __props;
        const isPlainObjectOrArray = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            const v = props.value; // 取入参值
            const result = v !== null && typeof v === 'object'; // 仅对象/数组才进入逐键渲染
            logger.debug('isPlainObjectOrArray', `计算结果: ${result}。该值${result ? '是' : '不是'}普通对象或数组。`, {
                传入值: v,
            });
            return result;
        }); // 是否对象/数组
        const primitiveType = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            const v = props.value; // 取入参值
            let result;
            if (v === null) {
                result = 'null';
            }
            else if (Array.isArray(v)) {
                result = 'array'; // 数组（不会走到该分支，因为上面 isPlainObjectOrArray 判断过）
            }
            else {
                const t = typeof v; // 原始类型
                result = t === 'undefined' ? 'undefined' : t;
            }
            logger.debug('primitiveType', `计算原始值类型: ${result}`, { 传入值: v });
            return result;
        }); // 原始值类型名（用于着色）
        const primitiveText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            const v = props.value; // 取入参值
            let result;
            switch (primitiveType.value // 按类型格式化文本
            ) {
                case 'string':
                    result = JSON.stringify(v); // 字符串带引号
                    break;
                case 'number':
                    result = String(v); // 数字
                    break;
                case 'boolean':
                    result = v ? 'true' : 'false'; // 布尔
                    break;
                case 'null':
                    result = 'null'; // null
                    break;
                case 'undefined':
                    result = 'undefined'; // undefined
                    break;
                case 'bigint':
                    result = String(v) + 'n'; // bigint
                    break;
                case 'symbol':
                    result = String(v); // symbol
                    break;
                case 'function':
                    result = 'ƒ()'; // 函数
                    break;
                default:
                    result = ''; // 兜底
                    break;
            }
            logger.debug('primitiveText', `格式化原始值文本: "${result}"`, {
                传入值: v,
                类型: primitiveType.value,
            });
            return result;
        }); // 原始值文本
        const isArrayRoot = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
            const result = Array.isArray(props.value);
            logger.debug('isArrayRoot', `计算根节点是否为数组: ${result}`, { 传入值: props.value });
            return result;
        }); // 根是否数组
        const rootOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (isArrayRoot.value ? '[' : '{')); // 根开括号
        const rootClose = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => (isArrayRoot.value ? ']' : '}')); // 根闭括号
        const __returned__ = { logger, props, isPlainObjectOrArray, primitiveType, primitiveText, isArrayRoot, rootOpen, rootClose, JsonNode: _JsonNode_vue__WEBPACK_IMPORTED_MODULE_2__["default"] };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=script&setup=true&lang=ts":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=script&setup=true&lang=ts ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* unplugin-vue-components disabled */
 // 引入响应式工具

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    __name: 'TabSwitch',
    props: {
        tabs: { type: Array, required: true },
        active: { type: String, required: false }
    },
    emits: ["update:active"],
    setup(__props, { expose: __expose, emit: __emit }) {
        __expose();
        const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger('ui-TabSwitch');
        const props = __props; // 输入 tabs 与可选 active
        const emit = __emit; // v-model:active
        const innerActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.active ?? 'pure'); // 内部活动键
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => props.active, v => {
            if (v) {
                logger.debug('watch:active', `外部同步 active tab 为: ${v}`);
                innerActive.value = v;
            }
        }); // 外部变更时同步
        function setActive(k) {
            logger.log('setActive', `用户点击，切换 tab 到: ${k}`);
            innerActive.value = k;
            emit('update:active', k);
        } // 切换并抛出
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
            logger.log('onMounted', '组件已挂载', { props });
        });
        const __returned__ = { logger, props, emit, innerActive, setActive };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
}));


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=template&id=390dd513&scoped=true&ts=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=template&id=390dd513&scoped=true&ts=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = { class: "era-app-container" };
const _hoisted_2 = { class: "era-shell" };
const _hoisted_3 = { class: "era-panel" };
const _hoisted_4 = { class: "panel-top" };
const _hoisted_5 = { class: "panel-body" };
const _hoisted_6 = { style: { "display": "flex", "flex-direction": "column", "gap": "8px" } };
const _hoisted_7 = { class: "right-rail" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["FloatingBall"], {
            onClick: _cache[0] || (_cache[0] = ($event) => ($setup.requestSwitchView('ExpandedView')))
        }, null, 512 /* NEED_PATCH */), [
            [vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.currentComponent === 'FloatingBall']
        ]),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 仅在展开视图时显示 "),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：视图切换容器 "),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 新增横向壳容器：左面板 + 右侧栏 "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：横向布局容器 "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 保持面板原有结构不变 "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：左侧 ERA 面板 "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 顶部栏：标题 + 关闭按钮 "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：面板顶部 "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_4, [
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：顶栏 "),
                        _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", { class: "panel-title" }, "ERA 数据面板", -1 /* CACHED */)),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：标题 "),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
                            class: "btn-close",
                            "aria-label": "关闭",
                            onClick: _cache[1] || (_cache[1] = ($event) => ($setup.requestSwitchView('FloatingBall')))
                        }, "×"),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：关闭按钮 ")
                    ]),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 内容区（原样保留） "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：面板主体 "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：可滚动内容 "),
                        ($setup.dataRef)
                            ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key: 0 }, [
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：有数据则渲染 "),
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["MetaHeader"], {
                                    mk: $setup.dataRef.mk,
                                    "message-id": $setup.dataRef.message_id
                                }, null, 8 /* PROPS */, ["mk", "message-id"]),
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：最新消息元数据 "),
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["EraAccordion"], {
                                    title: "ERA 最新操作详情",
                                    "default-open": false
                                }, {
                                    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：插槽 "),
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [
                                            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：堆叠两个子折叠 "),
                                            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["EraAccordion"], {
                                                title: "SelectedMks（数组）",
                                                "default-open": false
                                            }, {
                                                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
                                                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：插槽 "),
                                                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["PrettyJsonViewer"], {
                                                        value: $setup.dataRef.selectedMks,
                                                        "default-collapsed": true,
                                                        "max-depth": 3
                                                    }, null, 8 /* PROPS */, ["value"]),
                                                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：JSON 视图 ")
                                                ]),
                                                _: 1 /* STABLE */
                                            }),
                                            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["EraAccordion"], {
                                                title: "EditLogs（对象）",
                                                "default-open": false
                                            }, {
                                                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
                                                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：插槽 "),
                                                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["PrettyJsonViewer"], {
                                                        value: $setup.dataRef.editLogs,
                                                        "default-collapsed": true,
                                                        "max-depth": 2
                                                    }, null, 8 /* PROPS */, ["value"]),
                                                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：JSON 视图 ")
                                                ]),
                                                _: 1 /* STABLE */
                                            })
                                        ])
                                    ]),
                                    _: 1 /* STABLE */
                                }),
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["TabSwitch"], {
                                    active: $setup.activeTab,
                                    "onUpdate:active": _cache[2] || (_cache[2] = ($event) => (($setup.activeTab) = $event)),
                                    tabs: $setup.tabs
                                }, {
                                    pure: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：纯净状态数据 "),
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["PrettyJsonViewer"], {
                                            value: $setup.dataRef.statWithoutMeta,
                                            "default-collapsed": true,
                                            "max-depth": Infinity
                                        }, null, 8 /* PROPS */, ["value"]),
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：JSON 视图 ")
                                    ]),
                                    full: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：完整状态数据 "),
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["PrettyJsonViewer"], {
                                            value: $setup.dataRef.stat,
                                            "default-collapsed": true,
                                            "max-depth": Infinity
                                        }, null, 8 /* PROPS */, ["value"]),
                                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：JSON 视图 ")
                                    ]),
                                    _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["active"])
                            ], 64 /* STABLE_FRAGMENT */))
                            : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key: 1 }, [
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：暂无数据占位 "),
                                _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", { class: "empty" }, "等待 era:writeDone 事件数据…", -1 /* CACHED */)),
                                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：占位提示 ")
                            ], 64 /* STABLE_FRAGMENT */))
                    ])
                ]),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 右侧固定栏：只改变“位置/外部结构”，不改按钮逻辑 "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", _hoisted_7, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：右侧栏容器 "),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["ActionButtons"]),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：操作按钮组件（事件保持不变） ")
                ])
            ])
        ], 512 /* NEED_PATCH */), [
            [vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.currentComponent === 'ExpandedView']
        ])
    ]));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = {
    class: "action-buttons-card",
    role: "complementary",
    "aria-label": "ERA 快捷操作"
};
const _hoisted_2 = { class: "btns" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 右侧操作卡：外层自包含，不依赖父组件样式 "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：操作卡容器 "),
            _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", { class: "card-title" }, "快捷操作", -1 /* CACHED */)),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：卡片标题 "),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：按钮垂直栈 "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
                    class: "btn primary",
                    title: "重新计算所有变量",
                    onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.onFullSync, ["stop"])
                }, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：主按钮 "),
                    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                        class: "ico",
                        "aria-hidden": "true"
                    }, "🔄", -1 /* CACHED */)),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：图标 "),
                    _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "label" }, "完全重算变量", -1 /* CACHED */)),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：文字 ")
                ]),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
                    class: "btn subtle",
                    title: "只重算最新一楼的变量",
                    onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.onLastSync, ["stop"])
                }, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：次按钮 "),
                    _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                        class: "ico",
                        "aria-hidden": "true"
                    }, "♻️", -1 /* CACHED */)),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：图标 "),
                    _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "label" }, "重算最后一楼变量", -1 /* CACHED */)),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 中文注释：文字 ")
                ])
            ])
        ])
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "floating-ball",
        onClick: _cache[0] || (_cache[0] = ($event) => (_ctx.$emit('click')))
    }, [
        _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
            class: "era-logo",
            "aria-hidden": "true"
        }, "ERA", -1 /* CACHED */)),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 仅显示用；不拦截事件 ")
    ]));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = { class: "acc" };
const _hoisted_2 = ["aria-expanded"];
const _hoisted_3 = { class: "title" };
const _hoisted_4 = { class: "hint" };
const _hoisted_5 = { class: "inner" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 折叠头：点击切换 "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            class: "acc-head",
            "aria-expanded": $setup.open ? 'true' : 'false',
            onClick: _cache[0] || (_cache[0] = ($event) => ($setup.open = !$setup.open))
        }, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["caret", { open: $setup.open }])
            }, "▸", 2 /* CLASS */),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 指示箭头 "),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.title), 1 /* TEXT */),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 标题文本 "),
            _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "spacer" }, null, -1 /* CACHED */)),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 弹性空隙 "),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.open ? '收起' : '展开'), 1 /* TEXT */),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 右侧提示 ")
        ], 8 /* PROPS */, _hoisted_2),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 内容：高度过渡（使用 CSS Grid） "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["acc-body", { open: $setup.open }])
        }, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default", {}, undefined, true)
            ])
        ], 2 /* CLASS */)
    ]));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = { class: "node" };
const _hoisted_2 = { class: "key" };
const _hoisted_3 = { class: "brace" };
const _hoisted_4 = {
    key: 0,
    class: "summary"
};
const _hoisted_5 = {
    key: 0,
    class: "json-children"
};
const _hoisted_6 = { class: "brace" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_JsonNode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("JsonNode", true);
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 单条节点（支持递归） "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 每个键值对 / 数组项的容器 "),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
                class: "json-line",
                style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({ paddingLeft: _ctx.level * 14 + 'px' })
            }, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 行+缩进 "),
                (_ctx.foldable)
                    ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
                        key: 0,
                        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["caret", { open: _ctx.open }]),
                        "aria-label": "toggle",
                        onClick: _cache[0] || (_cache[0] = ($event) => (_ctx.open = !_ctx.open))
                    }, "▸", 2 /* CLASS */))
                    : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 折叠箭头按钮 "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.k), 1 /* TEXT */),
                _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "colon" }, ":", -1 /* CACHED */)),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 键与冒号 "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 可折叠容器：只显示括号与摘要；展开后由下方 children 区域递归渲染 "),
                (_ctx.foldable)
                    ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key: 1 }, [
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isArray ? '[' : '{'), 1 /* TEXT */),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 容器起始括号 "),
                        (!_ctx.open)
                            ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.summary), 1 /* TEXT */))
                            : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 收起时的摘要 ")
                    ], 64 /* STABLE_FRAGMENT */))
                    : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key: 2 }, [
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 原始值：直接着色渲染 "),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                            class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["val", _ctx.type])
                        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.primitiveText), 3 /* TEXT, CLASS */),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 原始值文本 ")
                    ], 64 /* STABLE_FRAGMENT */))
            ], 4 /* STYLE */),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 子元素区域：仅当可折叠且处于展开态时显示 "),
            (_ctx.foldable && _ctx.open)
                ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 递归：自引用同名组件 JsonNode（依赖 name: 'JsonNode' 实现自递归） "),
                    ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.childEntries, (childVal, childKey) => {
                        return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_JsonNode, {
                            key: _ctx.path + '/' + String(childKey),
                            k: String(childKey),
                            v: childVal,
                            path: _ctx.path + '/' + String(childKey),
                            level: _ctx.level + 1,
                            "default-collapsed": _ctx.defaultCollapsed,
                            "max-depth": _ctx.maxDepth
                        }, null, 8 /* PROPS */, ["k", "v", "path", "level", "default-collapsed", "max-depth"]));
                    }), 128 /* KEYED_FRAGMENT */)),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
                        class: "json-line",
                        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({ paddingLeft: _ctx.level * 14 + 'px' })
                    }, [
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isArray ? ']' : '}'), 1 /* TEXT */),
                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 容器闭合括号 ")
                    ], 4 /* STYLE */)
                ]))
                : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)
        ])
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = { class: "meta" };
const _hoisted_2 = { class: "kv" };
const _hoisted_3 = { class: "item" };
const _hoisted_4 = ["title"];
const _hoisted_5 = { class: "item" };
const _hoisted_6 = { class: "v" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [
        _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", { class: "meta-title" }, "最新消息元数据", -1 /* CACHED */)),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 小节标题 "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [
                _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "k" }, "mk", -1 /* CACHED */)),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 键：mk "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                    class: "v",
                    title: $props.mk
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.mk || '—'), 9 /* TEXT, PROPS */, _hoisted_4),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 值：mk ")
            ]),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [
                _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "k" }, "message_id", -1 /* CACHED */)),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 键：message_id "),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.messageId ?? '—'), 1 /* TEXT */),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 值：message_id ")
            ])
        ]),
        _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", { class: "glow" }, null, -1 /* CACHED */)),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 装饰：流光条 ")
    ]));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = { class: "json-root" };
const _hoisted_2 = { class: "json-line" };
const _hoisted_3 = { class: "brace" };
const _hoisted_4 = { class: "json-children" };
const _hoisted_5 = {
    key: 1,
    class: "json-line",
    style: { paddingLeft: 1 * 14 + 'px' }
};
const _hoisted_6 = { class: "json-line" };
const _hoisted_7 = { class: "brace" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.rootOpen), 1 /* TEXT */),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 根开括号：对象{ / 数组[ ")
        ]),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [
            ($setup.isPlainObjectOrArray)
                ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key: 0 }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.value, (v, k) => {
                    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["JsonNode"], {
                        key: String(k),
                        k: String(k),
                        v: v,
                        path: String(k),
                        level: 1,
                        "default-collapsed": $props.defaultCollapsed,
                        "max-depth": $props.maxDepth
                    }, null, 8 /* PROPS */, ["k", "v", "path", "default-collapsed", "max-depth"]));
                }), 128 /* KEYED_FRAGMENT */))
                : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [
                    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "key" }, "value", -1 /* CACHED */)),
                    _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", { class: "colon" }, ":", -1 /* CACHED */)),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["val", $setup.primitiveType])
                    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.primitiveText), 3 /* TEXT, CLASS */)
                ]))
        ]),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.rootClose), 1 /* TEXT */),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 根闭括号：对象} / 数组] ")
        ])
    ]));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* unplugin-vue-components disabled */
const _hoisted_1 = { class: "tabs" };
const _hoisted_2 = {
    class: "tab-bar",
    role: "tablist"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "tab-content" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 页签行 "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
            ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.tabs, (t) => {
                return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
                    key: t.key,
                    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["tab-btn", { active: t.key === $setup.innerActive }]),
                    role: "tab",
                    onClick: ($event) => ($setup.setActive(t.key))
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(t.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_3));
            }), 128 /* KEYED_FRAGMENT */))
        ]),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 内容区：根据活动键渲染对应插槽 "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [
            ($setup.innerActive === 'pure')
                ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "pure", {}, undefined, true),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 纯净状态数据内容 ")
                ]))
                : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "full", {}, undefined, true),
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 完整状态数据内容 ")
                ]))
        ])
    ]));
}


/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./App.vue?vue&type=style&index=0&id=390dd513&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("52fd5332", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("68c96231", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("31f2b1af", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("0dc03616", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("40096e66", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("27133bab", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("4c9a5731", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unplugin-vue-components disabled */// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css */ "./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("3d287a48", content, false, {"ssrId":true});
// Hot Module Replacement
if(false) // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/addStylesClient.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addStylesClient)
/* harmony export */ });
/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listToStyles */ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/listToStyles.js");
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = (0,_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = (0,_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/listToStyles.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/lib/listToStyles.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listToStyles)
/* harmony export */ });
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./src/ERA变量框架/core/crud/delete.ts":
/*!*****************************************!*\
  !*** ./src/ERA变量框架/core/crud/delete.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processDeleteBlocks: () => (/* binding */ processDeleteBlocks)
/* harmony export */ });
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/**
 * @file ERA 变量框架 - 变量删除模块
 * @description
 * 该模块负责处理 `<VariableDelete>` 指令，实现对已存在变量的删除，并生成相应的 `EditLog`。
 *
 * **设计理念**:
 * - **指令驱动**: 递归行为由指令对象的结构驱动。空对象 `{}` 表示删除当前节点，非空对象表示递归删除子节点。
 * - **安全第一**: 删除是破坏性操作，因此引入了 `$meta.necessary` 权限机制来防止误删。
 * - **精确豁免**: `necessary` 的保护只有在删除指令明确指向 `necessary` 属性自身时才会被绕过。
 * - **原子性日志**: 为每一次删除生成单一、精确的 `EditLog`，确保操作可完全回滚。
 */



const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger();
/**
 * **【递归删除】**
 * 实现了 `<VariableDelete>` 的核心逻辑，其行为由指令 `patchObj` 的结构驱动。
 *
 * @param {any} statData - 状态数据对象 (即 `stat_data`)。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 从指令中解析出的、与 `basePath` 对应的部分。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 */
function applyDeleteAtLevel(statData, basePath, patchObj, editLog) {
    // --- 1. 入口守卫和状态获取 ---
    const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
    if (currentNodeInVars === undefined) {
        logger.warn('applyDeleteAtLevel', `VariableDelete 跳过：路径不存在 -> ${basePath || '(root)'}`);
        return;
    }
    const necessary = _.get(currentNodeInVars, ['$meta', 'necessary']);
    // 精确判断豁免条件
    const metaPatch = _.get(patchObj, '$meta');
    const isBypassingProtection = 
    // 场景1: 指令要删除整个 $meta 对象
    (_.isPlainObject(metaPatch) && _.isEmpty(metaPatch)) ||
        // 场景2: 指令明确要删除 $meta.necessary 键
        _.has(patchObj, ['$meta', 'necessary']);
    // --- 2. 判断意图：递归删除子节点 vs 删除当前节点 ---
    if (_.isPlainObject(patchObj) && !_.isEmpty(patchObj)) {
        // **意图：递归删除子节点**
        // 权限检查：如果节点受 'all' 保护，且指令不满足豁免条件，则禁止深入。
        if (necessary === 'all' && !isBypassingProtection) {
            logger.warn('applyDeleteAtLevel', `VariableDelete 失败：路径 <${basePath}> 受 "necessary: all" 保护，其子节点无法被删除。`);
            return;
        }
        // 权限通过，或存在豁免，继续向内递归。
        for (const key of Object.keys(patchObj)) {
            const fullPath = basePath ? `${basePath}.${key}` : key;
            const subPatchObj = patchObj[key];
            applyDeleteAtLevel(statData, fullPath, subPatchObj, editLog);
        }
        return; // 子节点处理完毕，返回。
    }
    // --- 3. 执行删除当前节点 ---
    // (能走到这里，说明 patchObj 是空对象、非对象或 null)
    // **意图：删除当前节点 `basePath`**
    // 权限检查：'self' 或 'all' 都会阻止当前节点的直接删除。
    // 直接删除节点的意图无法豁免保护，必须通过递归意图删除 '$meta' 来解除保护。
    if (necessary === 'self' || necessary === 'all') {
        logger.warn('applyDeleteAtLevel', `VariableDelete 失败：路径 <${basePath}> 受 "necessary: ${necessary}" 保护，无法被直接删除。`);
        return;
    }
    // 根节点（basePath 为 ''）不应被删除。
    if (basePath === '') {
        logger.error('applyDeleteAtLevel', 'VariableDelete 失败：不允许删除根对象。');
        return;
    }
    // 执行原子性删除
    const valOld = _.cloneDeep(currentNodeInVars);
    _.unset(statData, basePath);
    editLog.push({ op: 'delete', path: basePath, value_old: valOld });
    logger.debug('applyDeleteAtLevel', `成功删除节点: ${basePath}`);
}
/**
 * 处理所有 `<VariableDelete>` 指令块。
 *
 * @param {any[]} allDeletes - 从消息中解析出的所有 delete 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 */
async function processDeleteBlocks(allDeletes, editLog) {
    if (allDeletes.length > 0) {
        for (const deleteRoot of allDeletes) {
            if (!_.isPlainObject(deleteRoot) || _.isEmpty(deleteRoot))
                continue;
            try {
                await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_0__.updateEraStatData)(stat => {
                    logger.debug('processDeleteBlocks', `处理 deleteRoot: ${JSON.stringify(deleteRoot)}`);
                    // 从根路径开始递归
                    applyDeleteAtLevel(stat, '', deleteRoot, editLog);
                    return stat;
                });
            }
            catch (e) {
                logger.error('processDeleteBlocks', `处理 deleteRoot 失败: ${e?.message || e}`, e);
            }
        }
        logger.log('processDeleteBlocks', '所有 VariableDelete 操作完成');
    }
}


/***/ }),

/***/ "./src/ERA变量框架/core/crud/insert/insert.ts":
/*!************************************************!*\
  !*** ./src/ERA变量框架/core/crud/insert/insert.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyInsertAtLevel: () => (/* binding */ applyInsertAtLevel),
/* harmony export */   processInsertBlocks: () => (/* binding */ processInsertBlocks)
/* harmony export */ });
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ "./src/ERA变量框架/core/crud/insert/template.ts");
/**
 * @file ERA 变量框架 - 变量插入模块
 * @description
 * 该模块负责处理 `<VariableInsert>` 指令，实现变量的非破坏性插入，并生成相应的 `EditLog`。
 *
 * **设计理念**:
 * - **职责单一**: 模块只关心如何根据指令修改变量状态并生成日志，不关心指令从何而来。
 * - **原子性操作**: `applyInsertAtLevel` 实现了原子性的插入，确保了数据结构的完整性。
 *   如果一个基础路径不存在，它会将整个对象作为一整个单元一次性插入。
 * - **容错性**: 当遇到无效路径（如尝试向已存在的路径插入）时，会跳过该条指令并继续处理其他有效指令，
 *   而不是中断整个写入过程。
 */





const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_2__.Logger();
/**
 * **【递归插入】**
 * 实现了 `<VariableInsert>` 的核心逻辑：**非破坏性地**递归插入值。
 *
 * **核心规则**:
 * 1. **只在路径不存在时写入**。如果路径已存在，则跳过该路径的写入。
 * 2. **原子性插入**。如果一个基础路径（如 `player.inventory`）不存在，它会将整个 `inventory`
 *    对象作为一整个单元一次性插入，并只记录一条 `insert` 日志。
 * 3. **递归补充**。如果基础路径已存在，它会递归地深入，尝试在其下补充插入新的子路径。
 * 4. **模板支持**。支持从 `$template` 中继承模板，实现数据结构的复用。
 *
 * @param {any} statData - 状态数据对象 (即 `stat_data`)。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 从指令中解析出的、要应用于当前层级的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组（引用传递）。
 * @param {any} inheritedContent - 从上层继承的、纯粹的模板“内容”对象。
 * @param {any} parentData - 当前节点的父节点在 `statData` 中的数据。
 */
function applyInsertAtLevel(statData, basePath, patchObj, editLog, inheritedContent, parentData) {
    // --- 1. 确定当前层级的模板内容 ---
    // 调用 resolveTemplate，它现在直接使用传入的 parentData
    const localTplContent = (0,_template__WEBPACK_IMPORTED_MODULE_3__.resolveTemplate)(inheritedContent, parentData);
    logger.debug('applyInsertAtLevel', `[入口] basePath: "${basePath || 'root'}"`, {
        statData: _.cloneDeep(statData),
    });
    // --- 2. 检查路径存在性，决定执行策略 ---
    const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
    logger.debug('applyInsertAtLevel', `[路径检查] at path: "${basePath || 'root'}". currentNodeInVars 的值:`, currentNodeInVars);
    // **策略一：原子性插入 (Atomic Insert)**
    // 如果当前路径在变量中不存在，则将整个补丁对象作为新值一次性插入。
    if (basePath && currentNodeInVars === undefined) {
        // 调用 applyTemplateToPatch 函数，将合并后的模板内容应用到补丁上
        const composed = (0,_template__WEBPACK_IMPORTED_MODULE_3__.applyTemplateToPatch)(localTplContent, patchObj);
        const finalValue = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.sanitizeArrays)(composed); // 清理数组中的 null 等无效值。
        logger.debug('applyInsertAtLevel', `最终插入数据 at ${basePath}:\n${JSON.stringify(finalValue, null, 2)}`);
        _.set(statData, basePath, finalValue); // 执行插入。
        editLog.push({ op: 'insert', path: basePath, value_new: _.cloneDeep(finalValue) });
        logger.debug('applyInsertAtLevel', `原子性插入到新路径: ${basePath}`);
        return; // 插入完成，终止递归。
    }
    // **策略二：递归补充 (Recursive Supplement)**
    // 如果当前路径已存在，并且补丁和当前值都是对象，则深入递归。
    if (_.isPlainObject(currentNodeInVars) && _.isPlainObject(patchObj)) {
        logger.debug('applyInsertAtLevel', `[递归补充] at path: "${basePath || 'root'}"
      - 当前层级模板 (localTplContent): ${JSON.stringify(localTplContent)}`);
        for (const key of Object.keys(patchObj)) {
            const subPath = basePath ? `${basePath}.${key}` : key;
            const subPatch = patchObj[key];
            // 调用 getInheritedTemplateContent，从当前模板内容中为子节点查找其应继承的内容
            const subInheritedContent = (0,_template__WEBPACK_IMPORTED_MODULE_3__.getInheritedTemplateContent)(localTplContent, key);
            logger.debug('applyInsertAtLevel', `  - 准备递归子节点: "${key}"
      - 将传递给子节点的模板 (subInheritedContent): ${JSON.stringify(subInheritedContent)}`);
            // 将当前节点数据 currentNodeInVars 作为下一层的 parentData 传递下去
            applyInsertAtLevel(statData, subPath, subPatch, editLog, subInheritedContent, currentNodeInVars);
        }
    }
    else if (basePath) {
        // **插入失败**
        // 如果路径已存在，但不是可递归补充的对象结构（例如，一个是对象，另一个是字符串），
        // 则记录警告。insert 不会覆盖已存在的值。
        logger.warn('applyInsertAtLevel', `VariableInsert 失败：路径已存在且无法递归补充 -> ${basePath}`);
    }
    // 如果 basePath 为空（在根级别）且 patch 不是对象，则不执行任何操作，因为根不能被非对象替换。
}
/**
 * 处理所有 `<VariableInsert>` 指令块。
 *
 * @param {any[]} allInserts - 从消息中解析出的所有 insert 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 */
async function processInsertBlocks(allInserts, editLog) {
    if (allInserts.length > 0) {
        await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_1__.updateEraStatData)(async (stat) => {
            logger.debug('processInsertBlocks', '[初始状态] 进入 processInsertBlocks 时的 statData:', _.cloneDeep(stat));
            return stat;
        });
        /*
         * N.B. 必须对每个 insertRoot 单独调用 updateVariablesWith，而不是将所有操作合并到一次调用中。
         * 这是为了确保在同一条消息内，前一个 <VariableInsert> 块中插入的模板或数据，
         * 可以被后一个 <VariableInsert> 或 <VariableEdit> 块访问和使用。
         * 每次 await updateVariablesWith 完成后，变量状态都会被刷新，从而使后续操作能看到最新的结果。
         */
        for (const insertRoot of allInserts) {
            if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot))
                continue;
            try {
                await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_1__.updateEraStatData)(stat => {
                    logger.debug('processInsertBlocks', `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
                    // 从根路径 '' 开始统一递归入口，顶层调用时，父节点为 null
                    applyInsertAtLevel(stat, '', insertRoot, editLog, null, null);
                    return stat;
                });
            }
            catch (e) {
                logger.error('processInsertBlocks', `处理 insertRoot 失败: ${e?.message || e}`, e);
            }
        }
        logger.log('processInsertBlocks', '所有 VariableInsert 操作完成');
    }
}


/***/ }),

/***/ "./src/ERA变量框架/core/crud/insert/template.ts":
/*!**************************************************!*\
  !*** ./src/ERA变量框架/core/crud/insert/template.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyTemplateToPatch: () => (/* binding */ applyTemplateToPatch),
/* harmony export */   getInheritedTemplateContent: () => (/* binding */ getInheritedTemplateContent),
/* harmony export */   resolveTemplate: () => (/* binding */ resolveTemplate)
/* harmony export */ });
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/log */ "./src/ERA变量框架/utils/log.ts");



const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger();
/**
 * **【解析并合并模板内容】**
 *
 * 从继承的模板内容和父节点变量中定义的模板内容中，合并出当前层级可用的模板。
 *
 * @param inheritedContent - 从上上层继承的模板内容。
 * @param parentNodeData - 当前正在处理的节点的 **父节点** 在变量中的数据。
 * @returns {any} - 合并后的单一内容对象，如果所有来源都无效，则返回 `null`。
 */
function resolveTemplate(inheritedContent, parentNodeData) {
    // 1. 从父节点变量中，找到作为当前节点兄弟的 $template
    const varsContent = _.get(parentNodeData, '$template');
    logger.debug('resolveTemplate', `解析出的模板内容:\n    - 继承: ${JSON.stringify(inheritedContent)}\n    - 父节点变量: ${JSON.stringify(varsContent)}`);
    // 2. 按优先级合并 (父节点变量 > 继承)
    let mergedContent = {};
    mergedContent = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.mergeReplaceArray)(mergedContent, inheritedContent);
    mergedContent = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.mergeReplaceArray)(mergedContent, varsContent);
    logger.debug('resolveTemplate', `合并后的最终模板内容: ${JSON.stringify(mergedContent)}`);
    if (_.isEmpty(mergedContent)) {
        return null;
    }
    return mergedContent;
}
/**
 * **【获取子节点要继承的模板内容】**
 *
 * 在一个给定的“父级模板内容”中，查找并合并其内部定义的“原型规则” (`$template`) 和“特异性规则” (`key`)，
 * 以生成供特定子节点 `key` 使用的最终模板内容。
 *
 * @example
 * // 输入:
 * const parentTplContent = {
 *   "$template": { "hp": 10, "mana": 100, "a": { "d": 1 } },
 *   "lili": { "hp": 15, "class": "warrior", "a": { "c": 1 } }
 * };
 * const key = "lili";
 * // 输出 (合并后的内容):
 * // { "hp": 15, "mana": 100, "class": "warrior", "a": { "c": 1, "d": 1 } }
 *
 * @param parentTplContent - 父级的模板内容，它本身可能包含 `$template` 和 `key` 作为子键。
 * @param key - 正在处理的子节点的键名。
 * @returns {any} - 子节点应该继承的、已合并的模板内容，或 `undefined`。
 */
function getInheritedTemplateContent(parentTplContent, key) {
    if (!parentTplContent)
        return undefined;
    // 步骤 1: 在父级模板内容中查找通用的原型规则
    const prototypeContent = _.get(parentTplContent, '$template');
    // 步骤 2: 在父级模板内容中查找给 key 的特异性规则
    const specificContent = _.get(parentTplContent, key);
    // 步骤 3: 根据查找结果决定最终模板内容
    if (_.isPlainObject(prototypeContent) && _.isPlainObject(specificContent)) {
        logger.debug('getInheritedTemplateContent', `为子节点 "${key}" 同时找到原型和特异性内容。\n      - 原型: ${JSON.stringify(prototypeContent)}\n      - 特异性: ${JSON.stringify(specificContent)}`);
        // 直接使用 mergeReplaceArray 进行合并
        const merged = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.mergeReplaceArray)(_.cloneDeep(prototypeContent), specificContent);
        logger.debug('getInheritedTemplateContent', `  - 合并后: ${JSON.stringify(merged)}`);
        return merged;
    }
    else if (_.isPlainObject(specificContent)) {
        logger.debug('getInheritedTemplateContent', `为子节点 "${key}" 只找到特异性内容: ${JSON.stringify(specificContent)}`);
        return specificContent;
    }
    else if (_.isPlainObject(prototypeContent)) {
        logger.debug('getInheritedTemplateContent', `为子节点 "${key}" 只找到原型内容: ${JSON.stringify(prototypeContent)}`);
        return prototypeContent;
    }
    logger.debug('getInheritedTemplateContent', `在父级模板内容中未为子节点 "${key}" 找到任何可继承的规则。`);
    return undefined;
}
/**
 * **【应用模板内容到补丁】**
 *
 * 将一个“模板内容”对象应用到一个“补丁”对象上，作为其默认值。
 *
 * @param tplContent - 当前层级合并后的模板内容。
 * @param patchObj - 要应用模板的补丁数据。
 * @returns {any} - 应用了模板默认值之后，最终合成的数据对象。
 */
function applyTemplateToPatch(tplContent, patchObj) {
    logger.debug('applyTemplateToPatch', `[进入] 模板内容: ${JSON.stringify(tplContent)}, 补丁: ${JSON.stringify(patchObj)}`);
    if (!_.isPlainObject(patchObj)) {
        logger.debug('applyTemplateToPatch', `[退出] 补丁不是一个普通对象，直接返回。`);
        return patchObj;
    }
    if (!tplContent) {
        logger.debug('applyTemplateToPatch', `[退出] 模板内容无效，直接返回补丁。`);
        return patchObj;
    }
    // 如果补丁是空对象，直接使用模板内容
    if (_.isEmpty(patchObj)) {
        logger.debug('applyTemplateToPatch', `补丁为空对象，完全使用模板内容。`);
        return _.cloneDeep(tplContent);
    }
    // 如果补丁非空，将模板内容作为默认值与补丁合并
    const composed = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.mergeReplaceArray)(_.cloneDeep(tplContent), patchObj);
    logger.debug('applyTemplateToPatch', `合并模板与补丁后的结果: ${JSON.stringify(composed)}`);
    return composed;
}


/***/ }),

/***/ "./src/ERA变量框架/core/crud/patcher.ts":
/*!******************************************!*\
  !*** ./src/ERA变量框架/core/crud/patcher.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyVarChange: () => (/* binding */ ApplyVarChange),
/* harmony export */   ApplyVarChangeForMessage: () => (/* binding */ ApplyVarChangeForMessage)
/* harmony export */ });
/* harmony import */ var _core_key_mk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/key/mk */ "./src/ERA变量框架/core/key/mk.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _utils_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/message */ "./src/ERA变量框架/utils/message.ts");
/* harmony import */ var _utils_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/string */ "./src/ERA变量框架/utils/string.ts");
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./delete */ "./src/ERA变量框架/core/crud/delete.ts");
/* harmony import */ var _insert_insert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./insert/insert */ "./src/ERA变量框架/core/crud/insert/insert.ts");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./update */ "./src/ERA变量框架/core/crud/update.ts");
/**
 * @file ERA 变量框架 - 变量写入模块
 * @description
 * 该模块是 ERA 框架的“执行引擎”，负责将消息内容中的变量修改指令应用到实际的 `chat` 变量中。
 *
 * **设计理念**:
 * 变量的写入是一个严谨的过程，必须确保所有变更都被正确记录，以便后续的回滚和同步。
 * 此模块的核心职责是：
 * 1. **解析指令**: 从 AI 消息中提取 `<VariableInsert>` 和 `<VariableEdit>` 块。
 * 2. **顺序执行**: 确保同一消息内的多个指令块按顺序执行，且后续指令能感知到前面指令的结果。
 * 3. **生成日志**: 在应用变更的同时，调用 `recursive.ts` 中的递归函数来生成精确的 `EditLog`。
 * 4. **覆盖式日志写入**: 确保每个消息密钥（MK）对应的 `EditLog` 严格反映其当前内容，
 *    即使内容中没有任何指令（此时会写入空日志），也要覆盖旧日志，这是防止 `swipe` 造成数据污染的关键。
 *
 * **职责边界**:
 * - 本模块**只负责读取 MK**，不负责创建。创建 MK 的职责由上游的 `message_key.ts` 承担。
 * - `ApplyVarChangeForMessage` 函数**只负责写入变量和 `EditLog`**，不负责更新 `SelectedMks`。
 *   更新 `SelectedMks` 的职责被移交给了更上层的调用者（如 `ApplyVarChange` 或同步函数），
 *   以避免在同步循环中修改正在被读取的状态，这是一种重要的并发控制策略。
 */











const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_4__.Logger();
/**
 * **【核心实现】** 对指定的消息应用变量修改。
 * 这是变量写入流程的核心，处理单个消息。
 *
 * @param {TavernMessage} msg - 要处理的酒馆消息对象。
 * @returns {Promise<string | null>} 如果成功处理，返回该消息的 MK；如果消息无需处理或处理失败，返回 null。
 */
const ApplyVarChangeForMessage = async (msg) => {
    logger.debug('ApplyVarChangeForMessage', `开始处理消息...`, { msg });
    try {
        if (!msg || typeof msg.message_id !== 'number') {
            logger.warn('ApplyVarChangeForMessage', '无效消息对象或缺少 message_id，退出');
            return null;
        }
        const messageId = msg.message_id;
        // 写入函数只负责读取 MK，不负责创建。创建的职责由上游的 `ensureMessageKey` 承担。
        const MK = (0,_core_key_mk__WEBPACK_IMPORTED_MODULE_0__.readMessageKey)(msg);
        // 如果消息没有 MK（可能是一个异常状态，如新消息还未被注入 MK），则跳过。
        if (!MK) {
            logger.debug('ApplyVarChangeForMessage', `消息 (ID: ${messageId}) 不含 MK，跳过变量写入。`);
            return null;
        }
        // 根据设计，用户消息自身不应包含变量修改指令，因此跳过变量处理，但返回其已有的 MK。
        if ((0,_utils_message__WEBPACK_IMPORTED_MODULE_5__.isUserMessage)(msg)) {
            logger.debug('ApplyVarChangeForMessage', `消息 (ID: ${messageId}) 为用户消息，跳过变量写入，但保留其 MK。`);
            return MK;
        }
        const rawContent = (0,_utils_message__WEBPACK_IMPORTED_MODULE_5__.getMessageContent)(msg) || '';
        // 1. 从消息内容中解析出所有指令块。
        const insertBlocks = (0,_utils_string__WEBPACK_IMPORTED_MODULE_6__.extractValidBlocks)(rawContent, (0,_utils_string__WEBPACK_IMPORTED_MODULE_6__.createTagRegex)('VariableInsert', 'exact'));
        const editBlocks = (0,_utils_string__WEBPACK_IMPORTED_MODULE_6__.extractValidBlocks)(rawContent, (0,_utils_string__WEBPACK_IMPORTED_MODULE_6__.createTagRegex)('VariableEdit', 'exact'));
        const deleteBlocks = (0,_utils_string__WEBPACK_IMPORTED_MODULE_6__.extractValidBlocks)(rawContent, (0,_utils_string__WEBPACK_IMPORTED_MODULE_6__.createTagRegex)('VariableDelete', 'exact'));
        // 调试日志：输出提取的原始块
        logger.debug('ApplyVarChangeForMessage', 'delete拿到的指令', deleteBlocks);
        if (!insertBlocks.length && !editBlocks.length && !deleteBlocks.length) {
            logger.debug('ApplyVarChangeForMessage', `消息 (ID: ${messageId}) 未检测到变量修改标签。`);
        }
        const rawInserts = insertBlocks.flatMap((s) => (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.parseJsonl)(s));
        const rawEdits = editBlocks.flatMap((s) => (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.parseJsonl)(s));
        const rawDeletes = deleteBlocks.flatMap((s) => (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.parseJsonl)(s));
        // 调试日志：输出 JSONL 解析结果
        //logger.debug('【ERA调试】JSONL解析结果', rawInserts);
        // 在这里对从消息中解析出的原始数据进行转义，确保所有后续处理都使用转义后的数据。
        const allInserts = (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.escapeEraData)(rawInserts);
        const allEdits = (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.escapeEraData)(rawEdits);
        const allDeletes = (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.escapeEraData)(rawDeletes);
        logger.debug('ApplyVarChangeForMessage', '数据转义完成', {
            before: { inserts: rawInserts, edits: rawEdits, deletes: rawDeletes },
            after: { inserts: allInserts, edits: allEdits, deletes: allDeletes },
        });
        const editLog = []; // 用于收集本轮操作产生的所有变更记录。
        // 2. --- 处理所有插入操作 (`<VariableInsert>`) ---
        await (0,_insert_insert__WEBPACK_IMPORTED_MODULE_8__.processInsertBlocks)(allInserts, editLog);
        // 3. --- 处理所有编辑操作 (`<VariableEdit>`) ---
        await (0,_update__WEBPACK_IMPORTED_MODULE_9__.processEditBlocks)(allEdits, editLog, messageId);
        // 4. --- 处理所有删除操作 (`<VariableDelete>`) ---
        await (0,_delete__WEBPACK_IMPORTED_MODULE_7__.processDeleteBlocks)(allDeletes, editLog);
        // 5. --- 覆盖式写入 EditLog ---
        /*
         * 核心逻辑：无论本轮是否产生了有效的变量修改，都必须用当前的 editLog (哪怕是空数组) 覆盖旧的 EditLog。
         *
         * 为什么必须覆盖而不是在没有修改时跳过？
         *
         * 根本原因在于，必须确保每个 MK 对应的 EditLog，严格且唯一地反映其所属消息**当前内容**所产生的变量修改。
         *
         * 考虑一个场景：
         * 1. 消息A (MK_A) 的内容包含指令，生成了 EditLog_A。
         * 2. 用户对消息A进行 swipe，生成了消息B (MK_B)，其内容完全没有变量修改标签。
         *
         * 如果在处理消息B时，因为没有检测到指令就“跳过写入”，那么与 MK_B 关联的 EditLog 就会是空的或不存在的。
         * 这在当前是正确的。
         *
         * 但如果用户再次 swipe，从消息B切换回消息A。此时框架会重新处理消息A。
         * 如果我们不执行覆盖式写入，那么与 MK_A 关联的 EditLog 仍然是之前生成的 EditLog_A，这没有问题。
         *
         * 真正的问题在于状态的明确性。覆盖式写入确保了任何一个 MK 的日志，在任何时间点，
         * 都是其**当前可见内容**的直接产物，没有任何历史遗留。这使得整个系统的状态变迁变得清晰、可预测，
         * 极大地降低了在复杂操作（如多次 `swipe`、删除、编辑）中出现状态不一致的风险。
         *
         * 因此，正确的做法是：用本次解析消息内容生成的 editLog (在无指令的场景下是 `[]`) 去覆盖，
         * 从而斩断任何可能存在的历史关联，确保数据的一致性和纯粹性。
         */
        try {
            await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_3__.updateEraMetaData)(meta => {
                const newArr = Array.isArray(editLog) ? editLog : (0,_utils_data__WEBPACK_IMPORTED_MODULE_2__.parseEditLog)(editLog);
                logger.debug('ApplyVarChangeForMessage', `准备为 MK=${MK} (MsgID=${messageId}) 写入 EditLog:\n${JSON.stringify(newArr, null, 2)}`);
                // 将本轮生成的日志数组，以当前消息的 MK 为键，存入 `EditLogs` 对象。
                _.set(meta, [_utils_constants__WEBPACK_IMPORTED_MODULE_1__.LOGS_PATH, MK], JSON.stringify(newArr));
                /*
                 * N.B. 此函数不再负责更新 SelectedMks 数组。
                 * 更新 SelectedMks 的职责已移交至上层调用者 (resyncStateOnHistoryChange 或 ApplyVarChange)，
                 * 以避免在 resync 循环中意外修改正在被读取的 oldSelectedMks 状态。
                 */
                return meta;
            });
            logger.debug('ApplyVarChangeForMessage', `成功为 MK=${MK} 写入 EditLog。`);
        }
        catch (e) {
            logger.error('ApplyVarChangeForMessage', `为 MK=${MK} 写入 EditLogs 失败: ${e?.message || e}`, e);
        }
        return MK;
    }
    catch (err) {
        logger.error('ApplyVarChangeForMessage', `变量写入器异常: ${err?.message || err}`, err);
        return null;
    }
};
/**
 * **【标准事件处理入口】**
 * 这是一个上层封装，用于处理最新 AI 消息的变量写入，并负责更新 `SelectedMks` 数组。
 * 它会自动寻找最后一条 AI 消息进行操作，通常被绑定到“新消息生成”等事件上。
 */
const ApplyVarChange = async () => {
    logger.debug('ApplyVarChange', `函数被调用...`);
    // 1. 智能查找最后一条 AI 消息
    const msg = (0,_utils_message__WEBPACK_IMPORTED_MODULE_5__.findLastAiMessage)();
    if (!msg || typeof msg.message_id !== 'number') {
        logger.log('ApplyVarChange', '未找到可处理的 AI 消息，退出。');
        return;
    }
    const messageId = msg.message_id;
    logger.log('ApplyVarChange', `找到目标 AI 消息 (ID: ${messageId})，开始处理变量写入...`);
    // 2. 调用核心实现来处理变量和 EditLog 的写入。
    // EditLog 会被自动关联到从该消息中读取到的 MK 上。
    const MK = await ApplyVarChangeForMessage(msg);
    // 3. 在核心流程执行完毕后，在此处统一更新 SelectedMks，确保状态一致。
    try {
        await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_3__.updateEraMetaData)(meta => {
            const selectedMks = _.get(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.SEL_PATH, []);
            // 关键：必须使用我们正在处理的 AI 消息的 messageId 作为索引，
            // 来更新 SelectedMks 数组中对应的 MK 记录。
            selectedMks[messageId] = MK;
            _.set(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.SEL_PATH, selectedMks);
            return meta;
        });
    }
    catch (e) {
        logger.error('ApplyVarChange', `更新 SelectedMks 失败: ${e?.message || e}`, e);
    }
};


/***/ }),

/***/ "./src/ERA变量框架/core/crud/update.ts":
/*!*****************************************!*\
  !*** ./src/ERA变量框架/core/crud/update.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyEditAtLevel: () => (/* binding */ applyEditAtLevel),
/* harmony export */   processEditBlocks: () => (/* binding */ processEditBlocks)
/* harmony export */ });
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _rollback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rollback */ "./src/ERA变量框架/core/rollback.ts");
/**
 * @file ERA 变量框架 - 变量编辑模块
 * @description
 * 该模块负责处理 `<VariableEdit>` 指令，实现对已存在变量的修改，并生成用于回滚的精确 `EditLog`。
 *
 * **设计理念**:
 * - **职责单一**: 模块只关心如何根据指令修改变量状态并生成日志，不关心指令从何而来。
 * - **精确日志**: `EditLog` 的准确性是回滚功能的基础。`applyEditAtLevel` 通过精巧的逻辑，
 *   特别是对“旧值”的历史追溯，确保了日志的绝对可靠。
 * - **容错性**: 当遇到无效路径（如尝试编辑不存在的路径）时，会跳过该条指令并继续处理其他有效指令，
 *   而不是中断整个写入过程。
 */





const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_2__.Logger();
/**
 * **【递归编辑】**
 * 实现了 `<VariableEdit>` 的核心逻辑：**只修改已存在的路径**。
 *
 * **核心规则**:
 * 1. **路径必须存在**。如果指令中指定的路径在当前变量状态中不存在，则跳过该操作。
 * 2. **叶子节点操作**。只在遇到指令对象中的叶子节点（非对象值）时才执行实际的修改和日志记录。
 * 3. **精确的旧值查找**。为了生成可供回滚的 `EditLog`，它需要找到变量在本次修改发生**之前**的“旧值”。
 *    查找顺序为：首先通过 `findLatestNewValue` 在历史 `EditLog` 中回溯；如果找不到，
 *    则从当前消息处理开始时的变量快照中获取。这是确保日志准确性的关键。
 *
 * @param {any} statData - 状态数据对象 (即 `stat_data`)。
 * @param {string} basePath - 当前递归层级的基础路径。
 * @param {any} patchObj - 要应用的补丁对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {number} messageId - 当前正在处理的消息的 ID，用于历史追溯。
 * @param {Map<string, any>} intraMessageState - 用于跟踪在**同一条消息内部**对同一变量的连续修改。
 */
async function applyEditAtLevel(statData, basePath, patchObj, editLog, messageId, intraMessageState) {
    // --- 1. 路径和存在性检查 ---
    const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
    if (currentNodeInVars === undefined) {
        logger.warn('applyEditAtLevel', `VariableEdit 跳过：路径不存在 -> ${basePath || '(root)'}`);
        return;
    }
    // --- 2. 权限检查 (`updatable`) ---
    // 读取 updatable 标志，如果未定义，则默认为 true (允许更新)。
    const isUpdatable = _.get(currentNodeInVars, ['$meta', 'updatable'], true);
    // 定义豁免条件：只有当指令明确要将 updatable 从 false 改为 true 时，才允许操作。
    const isBypassingProtection = isUpdatable === false && // 当前是受保护的
        _.get(patchObj, ['$meta', 'updatable']) === true; // 且指令意图是明确地将其改为 true
    // 如果受保护且不满足豁免条件，则阻止整个子树的更新。
    if (isUpdatable === false && !isBypassingProtection) {
        logger.warn('applyEditAtLevel', `VariableEdit 失败：路径 <${basePath}> 受 "$meta.updatable: false" 保护，无法被修改。`);
        return; // 终止此分支的递归。
    }
    // --- 3. 递归或执行 ---
    // 遍历指令的键，以驱动递归。
    for (const key of Object.keys(patchObj)) {
        const subPath = basePath ? `${basePath}.${key}` : key;
        const valNew = patchObj[key];
        // **策略一：递归深入**
        // 如果指令的值是对象，则继续向内递归。
        if (_.isPlainObject(valNew)) {
            await applyEditAtLevel(statData, subPath, valNew, editLog, messageId, intraMessageState);
            continue; // 继续处理下一个键。
        }
        // **策略二：执行更新 (叶子节点)**
        // 只有当指令的值不是对象时，才执行更新操作。
        // 路径合法性检查：确保要写入的完整路径是存在的。
        if (!_.has(statData, subPath)) {
            logger.warn('applyEditAtLevel', `VariableEdit 失败：路径非法，无法写入 -> ${subPath}`);
            continue;
        }
        // a. 查找旧值 (`valOld`)
        // 这是确保回滚准确性的核心。
        logger.debug('applyEditAtLevel', `[旧值查找] 准备为路径 <${subPath}> 从消息 ID <${messageId}> 向上追溯...`);
        let valOld = await (0,_rollback__WEBPACK_IMPORTED_MODULE_3__.findLatestNewValue)(subPath, messageId);
        if (valOld === null) {
            valOld = _.get(statData, subPath);
            logger.debug('applyEditAtLevel', `[旧值查找] 追溯未找到历史值，从当前 stat_data 中获取到旧值: ${JSON.stringify(valOld)}`);
        }
        else {
            logger.debug('applyEditAtLevel', `[旧值查找] 追溯成功，找到历史旧值: ${JSON.stringify(valOld)}`);
        }
        const cleaned = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.sanitizeArrays)(valNew); // 清理新值
        // b. 记录编辑意图
        // 即使新旧值相同，也记录 EditLog，以完整反映作者的编辑意图。
        // 这对于调试和历史追溯非常有用。
        _.set(statData, subPath, cleaned);
        editLog.push({
            op: 'update',
            path: subPath,
            value_old: _.cloneDeep(valOld),
            value_new: _.cloneDeep(cleaned),
        });
        // c. 更新楼内状态 Map，以便同一消息内的后续操作能正确追溯到这个新值。
        intraMessageState.set(subPath, _.cloneDeep(cleaned));
    }
}
/**
 * 处理所有 `<VariableEdit>` 指令块。
 *
 * @param {any[]} allEdits - 从消息中解析出的所有 edit 指令对象。
 * @param {any[]} editLog - 用于收集变更记录的日志数组。
 * @param {number} messageId - 当前正在处理的消息的 ID。
 */
async function processEditBlocks(allEdits, editLog, messageId) {
    if (allEdits.length > 0) {
        const intraMessageState = new Map(); // 用于跟踪在**本消息内部**对变量的连续修改。
        // N.B. 同样，编辑操作也需要独立调用以确保能读取到同一消息中、此前已完成的插入或编辑操作的结果。
        for (const editRoot of allEdits) {
            if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot))
                continue;
            try {
                await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_1__.updateEraStatData)(async (stat) => {
                    logger.debug('processEditBlocks', `处理 editRoot: ${JSON.stringify(editRoot)}`);
                    // 从根路径 '' 开始统一递归入口，保持逻辑一致性。
                    await applyEditAtLevel(stat, '', editRoot, editLog, messageId, intraMessageState);
                    return stat;
                });
            }
            catch (e) {
                logger.error('processEditBlocks', `处理 editRoot 失败: ${e?.message || e}`, e);
            }
        }
        logger.log('processEditBlocks', '所有 VariableEdit 操作完成');
    }
}


/***/ }),

/***/ "./src/ERA变量框架/core/key/mk.ts":
/*!************************************!*\
  !*** ./src/ERA变量框架/core/key/mk.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureMessageKey: () => (/* binding */ ensureMessageKey),
/* harmony export */   ensureMkForLatestMessage: () => (/* binding */ ensureMkForLatestMessage),
/* harmony export */   readMessageKey: () => (/* binding */ readMessageKey),
/* harmony export */   updateLatestSelectedMk: () => (/* binding */ updateLatestSelectedMk)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _utils_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/message */ "./src/ERA变量框架/utils/message.ts");
/* harmony import */ var _utils_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/string */ "./src/ERA变量框架/utils/string.ts");
/**
 * @file ERA 变量框架 - 消息密钥 (MK) 管理模块
 * @description
 * 这个模块是 ERA 框架的基石，负责管理“消息密钥”（Message Key, MK）。
 *
 * **设计理念**:
 * ERA 的核心优势在于其鲁棒性，它通过将变量状态与 SillyTavern 不稳定的消息变量（message variables）
 * 解耦来实现这一点。MK 正是实现解耦的关键。
 *
 * MK 是一个由 **ERA 框架自身** 动态生成并**注入到消息内容字符串顶部**的唯一标识符。
 * 它就像一个不可变的“锚点”，随消息内容本身一起存在。ERA 的所有核心逻辑，包括变量追踪、
 * 回滚和同步，都围绕着识别和操作这些锚点来进行，而不是依赖于可能发生错位或被错误继承的消息变量。
 *
 * **MK 格式**:
 * MK 被包裹在一个独特的、类似 XML 的 `<era_data>` 标签中，其内部是一种**非标准**的类 JSON 格式，
 * 使用 `=` 作为分隔符，以避免与 AI 可能生成的标准 JSON 混淆。
 * e.g., `<era_data>{"era-message-key"="era_mk_...","era-message-type"="user"}</era_data>`
 * 这种设计（而不是用 HTML 注释 `<!-- -->`）是为了防止 MK 被其他可能移除注释的脚本无意中破坏。
 *
 * **核心功能**:
 * 1. **生成与注入**: `ensureMessageKey` 函数确保任何需要追踪的消息都拥有一个 MK。如果不存在，
 *    它会生成一个新的 MK 并注入到消息内容的开头。
 * 2. **解析与读取**: `readMessageKey` 函数提供了一个只读的接口，用于从消息内容中解析出 MK。
 * 3. **同步保障**: `updateLatestSelectedMk` 等函数确保核心数据结构 `SelectedMks` 与最新的
 *    消息状态保持一致，是框架自愈能力的重要组成部分。
 */






const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_2__.Logger();
// ==================================================================
// 内部辅助函数
// ==================================================================
/**
 * 从消息内容字符串中解析出 `EraData` 对象。这是一个只读操作。
 * @param {string | null | undefined} messageContent - 消息的内容字符串。
 * @returns {EraData | null} 解析成功则返回 `EraData` 对象，否则返回 null。
 */
function parseEraData(messageContent) {
    if (typeof messageContent !== 'string') {
        return null;
    }
    const match = messageContent.match(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_DATA_REGEX);
    if (!match || !match[1]) {
        return null;
    }
    try {
        // 由于 MK 块内部是自定义的 `{"key"="value"}` 格式，不能使用 JSON.parse。
        // 必须使用正则表达式进行宽松匹配来提取键值。
        const customFormatBlock = match[1];
        const keyMatch = customFormatBlock.match(/"era-message-key"\s*=\s*"(.*?)"/);
        const typeMatch = customFormatBlock.match(/"era-message-type"\s*=\s*"(.*?)"/);
        if (keyMatch?.[1] && typeMatch?.[1]) {
            return {
                'era-message-key': keyMatch[1],
                'era-message-type': typeMatch[1],
            };
        }
        return null;
    }
    catch {
        return null;
    }
}
// ==================================================================
// 导出的核心函数
// ==================================================================
/**
 * **【读取 MK】** 从一个消息对象中只读地提取其消息密钥（MK）。
 * 这个函数经过特别优化，以应对滑动（swipe）等场景下消息对象结构不一致的问题。
 * 它会全面检查消息的 `mes`、`message` 以及 `swipes` 数组中的每一个元素，直到找到第一个有效的 MK 为止。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {string} 找到的 MK；如果不存在，则返回空字符串。
 */
function readMessageKey(msg) {
    if (!msg)
        return '';
    // 核心逻辑：始终且仅根据 getMessageContent 的结果来解析 MK。
    const content = (0,_utils_message__WEBPACK_IMPORTED_MODULE_3__.getMessageContent)(msg);
    const mk = parseEraData(content)?.['era-message-key'] || '';
    // 移除遍历其他 swipes 的错误逻辑。如果当前激活的内容没有 MK，就必须返回空字符串，
    // 以强制 ensureMessageKey 生成新的 MK。
    return mk;
    /*
     * ==================================================================
     * 【已废弃的兼容逻辑】 - 2025/10/02
     *
     * 以下代码块是为了兼容旧版酒馆的一个特性：一个消息的多个 swipe 可能共享同一个底层消息变量，
     * 因此 MK 可能存在于任何一个 swipe 中。
     *
     * **废弃原因**:
     * 在当前的 ERA 架构中，每个 swipe 都被视为独立的内容。如果当前激活的 swipe 内容中没有 MK，
     * 就意味着它是一个全新的、需要被赋予新 MK 的消息。此时若继续查找并返回其他 swipe 的旧 MK，
     * 将会导致 `ensureMessageKey` 错误地认为新消息已有 MK，从而跳过必要的“生成新 MK”流程。
     * 这正是导致 swipe 新消息时无法正确写入变量的根本原因。
     *
     * 因此，该兼容逻辑已被注释掉，以确保 `readMessageKey` 的行为与当前架构的设计意图保持一致。
     * ==================================================================
     */
    // const mkFromCurrent = parseEraData(content)?.['era-message-key'];
    // if (mkFromCurrent) {
    //   return mkFromCurrent;
    // }
    // if (Array.isArray(msg.swipes)) {
    //   for (const swipeContent of msg.swipes) {
    //     const mkFromSwipe = parseEraData(swipeContent)?.['era-message-key'];
    //     if (mkFromSwipe) {
    //       return mkFromSwipe;
    //     }
    //   }
    // }
    // const mkFromMessage = parseEraData(msg.message)?.['era-message-key'];
    // if (mkFromMessage) {
    //   return mkFromMessage;
    // }
    // return '';
}
/**
 * **【确保 MK 存在】**
 * 这是本模块最核心的函数。它检查一个消息是否已拥有 MK，如果尚未拥有，则为其生成一个新的 MK 并注入到消息内容中。
 * 这是解决“鸡生蛋/蛋生鸡”问题的关键：在对变量进行任何操作之前，必须先确保有一个可供依附的锚点（MK）。
 *
 * @param {TavernMessage} msg - 目标消息对象 (必须包含 `message_id`, `role`, 以及 `message` 或 `swipes`)。
 * @returns {Promise<{mk: string, isNew: boolean}>} 返回包含 MK 和一个布尔值的对象，该布尔值指示是否创建了新的 MK。
 */
async function ensureMessageKey(msg) {
    if (!msg || typeof msg.message_id !== 'number' || !msg.role) {
        logger.warn('ensureMessageKey', `无效的消息对象结构，无法确保Key。msg=${JSON.stringify(msg)}`);
        return { mk: '', isNew: false };
    }
    // 1. 使用增强的 readMessageKey 检查是否已存在 MK
    const existingMk = readMessageKey(msg);
    if (existingMk) {
        return { mk: existingMk, isNew: false }; // 已存在，直接返回
    }
    // 2. 生成新的 MK 和元数据块
    const newMk = `era_mk_${Date.now()}_${(0,_utils_string__WEBPACK_IMPORTED_MODULE_4__.rnd)()}`;
    const messageType = msg.role === 'user' ? 'user' : 'assistant';
    const dataString = `<${_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_DATA_TAG}>{"era-message-key"="${newMk}","era-message-type"="${messageType}"}</${_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_DATA_TAG}>`;
    logger.log('ensureMessageKey', `为消息 (ID: ${msg.message_id}) 注入新的Key: ${newMk}`);
    // 3. 构造新的消息内容并统一调用更新函数
    const currentContent = (0,_utils_message__WEBPACK_IMPORTED_MODULE_3__.getMessageContent)(msg) ?? '';
    const newContent = dataString + '\n' + currentContent;
    // 使用从 utils.ts 导入的通用函数来更新消息，该函数已封装了处理 swipes 的逻辑。
    await (0,_utils_message__WEBPACK_IMPORTED_MODULE_3__.updateMessageContent)(msg, newContent);
    return { mk: newMk, isNew: true };
}
/**
 * **【确保最新消息的 MK】**
 * 这是一个便捷函数，专门用于确保当前聊天记录中的最后一条消息拥有 MK。
 * 它通常在监听到新消息生成等事件时被调用，以确保新消息能被 ERA 系统正确追踪。
 * @returns {Promise<{mk: string, message_id: number | null, isNewKey: boolean}>} 返回包含 MK、消息 ID 和一个布尔值的对象，该布尔值指示是否创建了新的 MK。
 */
const ensureMkForLatestMessage = async () => {
    try {
        const msg = getChatMessages(-1, { include_swipes: true })?.[0];
        // 保留此日志，因为它对于调试事件触发时的消息状态至关重要。
        logger.debug('ensureMkForLatestMessage', `获取到的最新消息对象 (msg): ${JSON.stringify(msg)}`);
        if (!msg || typeof msg.message_id !== 'number') {
            logger.warn('ensureMkForLatestMessage', '无法读取最新消息或其ID，退出');
            return { mk: '', message_id: null, isNewKey: false };
        }
        // ensureMessageKey 会返回最终的 MK 和一个布尔值
        const { mk, isNew } = await ensureMessageKey(msg);
        logger.log('ensureMkForLatestMessage', `已为最新消息 ${msg.message_id} 确保 MK 存在。 (是否新建: ${isNew})`);
        return { mk, message_id: msg.message_id, isNewKey: isNew };
    }
    catch (err) {
        logger.error('ensureMkForLatestMessage', `确保MK时异常: ${err?.message || err}`, err);
        return { mk: '', message_id: null, isNewKey: false };
    }
};
/**
 * **【更新最新已选 MK】**
 * 这是一个“保险”函数，用于在每次事件处理的最后，强制校准 `SelectedMks` 数组中关于**最新消息**的记录。
 * 它确保即使在复杂的异步流程中，`SelectedMks` 的尾部也始终与实际的最新消息保持严格同步。
 * @returns {Promise<void>}
 */
const updateLatestSelectedMk = async () => {
    const msg = getChatMessages(-1, { include_swipes: true })?.[0];
    if (!msg || typeof msg.message_id !== 'number')
        return;
    // 确保 MK 存在并获取它
    const { mk: MK } = await ensureMessageKey(msg);
    if (!MK)
        return;
    // 更新 ERAMetaData 中的 SelectedMks 数组
    await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_1__.updateEraMetaData)(meta => {
        const selectedMks = _.get(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.SEL_PATH, []);
        // 只有在记录不一致时才执行写操作，以优化性能
        if (selectedMks[msg.message_id] !== MK) {
            selectedMks[msg.message_id] = MK;
            _.set(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.SEL_PATH, selectedMks);
        }
        return meta;
    });
};


/***/ }),

/***/ "./src/ERA变量框架/core/rollback.ts":
/*!**************************************!*\
  !*** ./src/ERA变量框架/core/rollback.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findLatestNewValue: () => (/* binding */ findLatestNewValue),
/* harmony export */   rollbackByMk: () => (/* binding */ rollbackByMk)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _utils_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/message */ "./src/ERA变量框架/utils/message.ts");
/* harmony import */ var _key_mk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./key/mk */ "./src/ERA变量框架/core/key/mk.ts");
/**
 * @file ERA 变量框架 - 回滚与历史追溯模块
 * @description
 * 该模块提供了 ERA 框架“时间旅行”能力的核心实现。它负责根据 `EditLog` 精确地撤销变量修改，
 * 以及在需要时向上追溯历史以查找变量的旧值。
 *
 * **设计理念**:
 * - **可逆操作**: 所有的变量写入操作都必须是可逆的。`rollbackByMk` 函数通过读取 `EditLog`
 *   并执行反向操作（`insert` -> `unset`, `update` -> `set to value_old`）来保证这一点。
 * - **历史的权威性**: `EditLog` 是变量状态变迁的唯一真实记录。`findLatestNewValue` 函数
 *   体现了这一原则，它不信任任何临时的变量快照，而是通过回溯 `EditLog` 链来查找一个变量
 *   在特定时间点之前的真实值。
 */







const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_3__.Logger();
/**
 * **【回滚】**
 * 根据一个给定的消息密钥（MK），精确地撤销该消息所引入的所有变量变更。
 *
 * @param {string} MK - 要回滚的目标消息的密钥。
 * @param {boolean} [silent=false] - 是否为静默模式。在静默模式下，函数不会自己触发日志刷新，
 *   这在 `resyncStateOnHistoryChange` 等批量操作中非常有用，可以避免产生大量冗余日志。
 */
async function rollbackByMk(MK, silent = false) {
    try {
        logger.log('rollbackByMk', `开始回滚, MK=${MK}`);
        await updateVariablesWith(v => {
            const meta = _.get(v, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.META_DATA_PATH, {});
            const stat = _.get(v, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.STAT_DATA_PATH, {});
            const raw = _.get(meta, [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.LOGS_PATH, MK]);
            const arr = (0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.parseEditLog)(raw);
            if (!arr || !arr.length) {
                logger.debug('rollbackByMk', `EditLog 为空或无效，跳过回滚。`);
                return v;
            }
            // 关键：必须逆序遍历 EditLog 来执行回滚。
            // 这确保了对同一变量的多次修改能够被正确地、按相反的顺序撤销。
            for (let i = arr.length - 1; i >= 0; i--) {
                const e = arr[i];
                const op = String(e?.op || '').toLowerCase();
                const path = String(e?.path || '');
                if (!path)
                    continue;
                if (op === 'insert') {
                    // 对于“插入”操作，回滚即为“删除”。
                    _.unset(stat, path);
                    continue;
                }
                if (op === 'update' || op === 'delete') {
                    // 对于“更新”或“删除”操作，回滚即为恢复到“旧值”。
                    if (typeof e?.value_old === 'undefined') {
                        // 如果日志中没有记录旧值，最安全的回滚方式是直接删除该路径。
                        _.unset(stat, path);
                    }
                    else {
                        _.set(stat, path, _.cloneDeep(e.value_old));
                    }
                }
            }
            _.set(v, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.STAT_DATA_PATH, stat);
            return v;
        }, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.CHAT_SCOPE);
        logger.log('rollbackByMk', `回滚完成：MK=${MK}`);
    }
    catch (e) {
        logger.error('rollbackByMk', `回滚异常：MK=${MK} → ${e?.message || e}`, e);
    }
}
/**
 * **【历史追溯】**
 * 向上追溯聊天历史，查找某个变量路径在指定消息之前的最后一个值 (`value_new`)。
 * 这是为 `applyEditAtLevel` 函数提供支持的关键辅助函数，用于在生成 `update` 日志时，
 * 准确地记录下 `value_old`。
 *
 * @param {string} path - 要查找的变量的完整路径。
 * @param {number} startMessageId - 从此消息 ID 的**前一条**消息开始向上查找。
 * @returns {Promise<any>} 返回找到的 `value_new`。如果追溯到聊天记录的开头都未找到，则返回 `null`。
 */
async function findLatestNewValue(path, startMessageId) {
    logger?.debug('findLatestNewValue', `开始为路径 <${path}> 从消息ID <${startMessageId}> 向上追溯历史值...`);
    const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: false });
    if (!messages || messages.length < 1) {
        logger?.debug('findLatestNewValue', `消息历史为空，无法追溯。`);
        return null;
    }
    const startIndex = messages.findIndex(m => m.message_id === startMessageId);
    if (startIndex === -1) {
        logger?.warn('findLatestNewValue', `错误：在消息列表中未找到起始消息ID: ${startMessageId}`);
        return null;
    }
    // 从起始消息的前一条开始，向上（向旧）遍历历史消息。
    for (let i = startIndex - 1; i >= 0; i--) {
        const message = messages[i];
        const msgId = message?.message_id;
        logger?.debug('findLatestNewValue', `[进度] 正在检查消息 (ID: ${msgId})，内容: "${((0,_utils_message__WEBPACK_IMPORTED_MODULE_4__.getMessageContent)(message) || '').substring(0, 100)}..."`);
        // 使用 isUserMessage 辅助函数，并检查 message_id
        if ((0,_utils_message__WEBPACK_IMPORTED_MODULE_4__.isUserMessage)(message) || typeof msgId !== 'number') {
            continue;
        }
        const mk = (0,_key_mk__WEBPACK_IMPORTED_MODULE_5__.readMessageKey)(message);
        if (!mk) {
            logger?.debug('findLatestNewValue', `[进度] 消息 (ID: ${msgId}) 无 MK，跳过。`);
            continue; // 跳过没有 MK 的 AI 消息。
        }
        const { meta: metaData } = (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.getEraData)();
        const editLogRaw = _.get(metaData, [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.LOGS_PATH, mk]);
        const editLog = (0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.parseEditLog)(editLogRaw);
        if (!editLog || editLog.length === 0) {
            logger?.debug('findLatestNewValue', `[进度] MK ${mk} 的 EditLog 为空，跳过。`);
            continue; // 跳过 EditLog 为空的。
        }
        logger?.debug('findLatestNewValue', `[进度] 正在检查 MK ${mk} 的 EditLog...\n${(0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.J)(editLog)}`);
        // 关键：从后向前遍历该消息的 EditLog，这样找到的第一个匹配项就是最新的。
        for (let j = editLog.length - 1; j >= 0; j--) {
            const logEntry = editLog[j];
            if (!logEntry || !logEntry.path)
                continue;
            // Case 1: 精确路径匹配。
            if (logEntry.path === path) {
                // 如果在历史追溯中找到了 delete 记录，这意味着状态可能不一致。
                // 因为 applyEditAtLevel 的前置检查应阻止对已删除变量的更新。
                // 记录一个错误以供调试，并返回 null，因为该变量在逻辑上是不存在的。
                if (logEntry.op === 'delete') {
                    logger?.error('findLatestNewValue', `>> 状态异常! 在消息(ID:${message.message_id}, MK:${mk})中为路径 <${path}> 找到了 'delete' 记录。这表明 update 操作可能正在尝试修改一个已被删除的变量。`);
                    return null;
                }
                logger?.debug('findLatestNewValue', `>> 成功! 在消息(ID:${message.message_id}, MK:${mk})中找到精确路径 <${path}> 的值为: ${(0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.J)(logEntry.value_new)}`);
                return _.cloneDeep(logEntry.value_new);
            }
            // Case 2: 查找的路径是日志条目路径的子路径 (即 logEntry.path 是父级)。
            // 例如, 查找 "a.b.c", 而日志中有对 "a.b" 的修改。
            if (path.startsWith(logEntry.path + '.')) {
                const subPath = path.substring(logEntry.path.length + 1);
                const parentNewVal = logEntry.value_new;
                if (_.isPlainObject(parentNewVal) && _.has(parentNewVal, subPath)) {
                    const foundVal = _.get(parentNewVal, subPath);
                    logger?.debug('findLatestNewValue', `>> 成功! 在消息(ID:${message.message_id}, MK:${mk})中找到父级路径 <${logEntry.path}>, 并从中提取子路径 <${subPath}> 的值为: ${(0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.J)(foundVal)}`);
                    return _.cloneDeep(foundVal);
                }
            }
        }
    }
    // 如果追溯到聊天记录的开头都未找到，说明这是该变量的首次出现。
    logger?.debug('findLatestNewValue', `向上追溯未找到路径 ${path} 的任何历史值，将使用 null 作为旧值`);
    return null;
}


/***/ }),

/***/ "./src/ERA变量框架/core/sync.ts":
/*!**********************************!*\
  !*** ./src/ERA变量框架/core/sync.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resyncStateOnHistoryChange: () => (/* binding */ resyncStateOnHistoryChange)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _crud_patcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crud/patcher */ "./src/ERA变量框架/core/crud/patcher.ts");
/* harmony import */ var _key_mk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./key/mk */ "./src/ERA变量框架/core/key/mk.ts");
/* harmony import */ var _rollback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rollback */ "./src/ERA变量框架/core/rollback.ts");

/**
 * @file 状态同步核心
 * @description 本文件中的 `resyncStateOnHistoryChange` 是 ERA 变量框架最核心的函数之一。
 * 它通过实现“逆序回滚，顺序重算”的逻辑，解决了因消息删除、切换分支 (swipe) 等操作导致的变量状态与消息历史不一致的棘手问题。
 *
 * ### 酒馆的奇特行为 (Feature, not a bug)
 *
 * 当删除一条 swipe (例如，带有变量 id=2 的消息) 时：
 * 1. **内容与变量错位**: 后一条 swipe (id=3) 的**内容**会“顶”到被删除的 swipe (id=2) 的位置上，但**变量**却保留了 id=2 的变量。
 * 2. **孤儿变量残留**: 原本的 swipe 3 消息虽然在界面上消失了，但它对应的**消息变量** (id=3) 仍然残留在聊天数据中，成为“孤儿变量”。
 * 3. **孤儿变量继承**: 如果用户此时再 swipe 一次，新生成的 swipe 3 将会**继承**这个残留的孤儿变量 (id=3)，导致新内容配旧变量，进一步加剧状态混乱。
 * 4. **结果**: 我们得到了一个内容是 id=3、变量是 id=2 的“混合”消息，并且还有一个 id=3 的孤儿变量随时可能被新消息继承，造成严重的状态不一致。
 *
 * ### 本函数的解决策略
 *
 * `resyncStateOnHistoryChange` 通过全面的状态比对来解决此问题：
 * 1. 在 `message_deleted`, `message_swiped` 等事件触发时被调用。
 * 2. 全面获取当前实际的消息列表，并与之前记录的 `SelectedMks` 序列进行比对。
 * 3. 精确找到第一个不一致的点（无论是删除、还是修改）。
 * 4. **逆序回滚**: 从后往前，将所有不一致的 `MK` 所引入的变量修改全部撤销。
 * 5. **顺序重算**: 从不一致点开始，根据当前消息的**实际内容**，重新计算并写入变量。
 *
 * **最终效果**: 无论历史记录发生何种变化，变量状态都能被完美地自动修复，确保数据一致性。
 */







const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_3__.Logger();
/**
 * 获取用于变量操作的MK。如果消息是用户消息，则返回null以跳过操作。
 * @param msg 消息对象
 * @returns MK 字符串或 null
 */
const getMkFromMsg = (msg) => {
    const key = (0,_key_mk__WEBPACK_IMPORTED_MODULE_5__.readMessageKey)(msg);
    if (!key)
        return null;
    return key;
};
/**
 * 检查一组 MK 对应的 EditLog 是否都为空
 * @param mks MK 列表
 * @returns 如果所有 EditLog 都为空则返回 true
 */
const checkEditLogsAreEmpty = (mks) => {
    const { meta: metaData } = (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.getEraData)();
    for (const mk of mks) {
        if (!mk)
            continue; // 跳过 null (用户消息)
        const editLogRaw = _.get(metaData, [_utils_constants__WEBPACK_IMPORTED_MODULE_0__.LOGS_PATH, mk]);
        const editLog = (0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.parseEditLog)(editLogRaw);
        if (editLog.length > 0) {
            return false; // 发现一个非空 log，直接返回 false
        }
    }
    return true; // 所有 log 都为空
};
/**
 * 当聊天记录发生变化（删除、切换分支）时，重新同步状态的核心函数
 * 实现了“逆序回滚，顺序重算”的逻辑。
 * 在没有检测到历史变化时，该函数还会自动回滚并重算最后一条消息，从而实现了“写入”操作的统一。
 * @param {boolean} [forceFullResync=false] - 如果为 true，则强制从头开始完全重算，忽略差异检测。
 */
const resyncStateOnHistoryChange = async (forceFullResync = false) => {
    if (forceFullResync) {
        logger.warn('resyncStateOnHistoryChange', '强制完全重算模式已启动！');
    }
    else {
        logger.log('resyncStateOnHistoryChange', '聊天记录变更，启动状态同步...');
    }
    // 核心假设：getChatMessages 会重新生成 message_id，使其保持从 0 开始的连续序列。
    const allMessages = getChatMessages('0-{{lastMessageId}}', { include_swipes: true });
    logger.debug('resyncStateOnHistoryChange', '获取到的 allMessages:', allMessages);
    const { meta: oldMetaData } = (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.getEraData)();
    const oldSelectedMks = _.cloneDeep(_.get(oldMetaData, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.SEL_PATH, []));
    logger.debug('resyncStateOnHistoryChange', `状态快照: oldSelectedMks.length=${oldSelectedMks.length}, allMessages.length=${allMessages?.length ?? 0}`);
    if (!allMessages || allMessages.length === 0) {
        logger.log('resyncStateOnHistoryChange', '当前聊天记录为空，不执行任何操作，同步终止。');
        return;
    }
    let firstRecalcId = -1;
    if (forceFullResync) {
        firstRecalcId = 0;
        logger.log('resyncStateOnHistoryChange', '强制模式：设置重算起点为 0。');
    }
    // Case 1: 消息被删除 (新列表比旧列表短)
    else if (allMessages.length < oldSelectedMks.length) {
        logger.log('resyncStateOnHistoryChange', '检测到消息删除。');
        // 从后往前，寻找第一个 "currentMk === oldMk_at_same_index" 的对齐点
        for (let i = allMessages.length - 1; i >= 0; i--) {
            const currentMk = getMkFromMsg(allMessages[i]);
            const recordedMk = oldSelectedMks[i];
            logger.debug('resyncStateOnHistoryChange', `[删除-对齐检查] i=${i}, currentMk=${currentMk}, recordedMk=${recordedMk}`);
            if (currentMk === recordedMk) {
                firstRecalcId = i + 1;
                logger.log('resyncStateOnHistoryChange', `找到对齐点于 message_id=${i} (MK=${currentMk})。将从 ID ${firstRecalcId} 开始检查。`);
                break;
            }
        }
        if (firstRecalcId === -1) {
            firstRecalcId = 0;
            logger.log('resyncStateOnHistoryChange', '未找到任何对齐点，将从头开始检查。');
        }
        // 【优化】检查被删除的 MK 是否影响变量
        // 稳健地找出被删除的 MK：对比新旧 MK 序列的差异
        const currentMkSequence = allMessages.map(getMkFromMsg).filter(mk => mk);
        const oldMkSequence = oldSelectedMks.filter(mk => mk);
        const deletedMks = _.difference(oldMkSequence, currentMkSequence);
        logger.debug('resyncStateOnHistoryChange', `旧MK序列: [${oldMkSequence.join(', ')}]`);
        logger.debug('resyncStateOnHistoryChange', `新MK序列: [${currentMkSequence.join(', ')}]`);
        logger.debug('resyncStateOnHistoryChange', `计算出的被删除MK: [${deletedMks.join(', ')}]`);
        if (deletedMks.length > 0 && checkEditLogsAreEmpty(deletedMks)) {
            logger.log('resyncStateOnHistoryChange', `检测到被删除的 ${deletedMks.length} 条消息均不含变量修改，执行快速同步。`);
            const newSelectedMks = [];
            for (let i = 0; i < allMessages.length; i++) {
                newSelectedMks[i] = getMkFromMsg(allMessages[i]);
            }
            await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.updateEraMetaData)(meta => {
                _.set(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.SEL_PATH, newSelectedMks);
                return meta;
            });
            logger.log('resyncStateOnHistoryChange', '快速同步完成，仅修正 SelectedMks 数组。');
            return;
        }
    }
    // Case 2: 消息被修改/切换 (长度不变)
    else if (allMessages.length === oldSelectedMks.length) {
        logger.log('resyncStateOnHistoryChange', '检测到消息长度不变，可能为修改或切换。');
        // 从后往前，寻找第一个不匹配的点
        for (let i = allMessages.length - 1; i >= 0; i--) {
            const currentMk = getMkFromMsg(allMessages[i]);
            const recordedMk = oldSelectedMks[i];
            logger.debug('resyncStateOnHistoryChange', `[切换-对齐检查] i=${i}, currentMk=${currentMk}, recordedMk=${recordedMk}`);
            if (currentMk !== recordedMk) {
                firstRecalcId = i;
            }
        }
        if (firstRecalcId === -1) {
            // N.B. 在当前架构下，MK 已被直接写入消息内容，与内容强绑定。
            // 因此，任何导致内容变化的操作（如 swipe）也必然会导致 MK 的变化。
            // 这意味着，如果 MK 序列完全匹配，那么内容也必然完全匹配。
            // logger.log('resyncStateOnHistoryChange', '所有MK均匹配，无需重算。');
            // return; // 直接返回，终止同步。
            // 【模拟写入】为了将“写入”操作统一到“同步”流程中，我们在此处模拟写入。
            // 当所有 MK 匹配（即没有检测到历史变化）时，我们将重算点强制设置为最后一条消息。
            // 这相当于“回滚并重写最后一条消息”，从而实现了写入操作。
            //
            // 【历史问题】过去，一个类似的“保险机制”曾导致 Bug：在同步逻辑更新完 selectedMK 和 editLog 后，
            // 这个机制会错误地回滚最后一条消息，导致状态被破坏。
            // 【安全性】但此处的修改是安全的，因为它发生在状态数组（selectedMks, editLogs）被修改之前，
            // 属于同步流程的前置判断环节，因此不会造成过去的问题。
            firstRecalcId = allMessages.length > 0 ? allMessages.length - 1 : 0;
            logger.log('resyncStateOnHistoryChange', `所有MK均匹配。启动模拟写入，强制重算最后一条消息 (ID: ${firstRecalcId})。`);
        }
        else {
            logger.log('resyncStateOnHistoryChange', `找到最早的不匹配点于 message_id=${firstRecalcId}。将从该点开始重算。`);
        }
    }
    // Case 3: 消息被添加 (新列表比旧列表长)
    else {
        logger.log('resyncStateOnHistoryChange', '检测到消息添加。');
        // 将重算起点设置为新消息的起始索引，让同步流程统一处理
        firstRecalcId = oldSelectedMks.length;
        logger.log('resyncStateOnHistoryChange', `新增消息的写入逻辑已由同步流程接管。将从新增消息 (ID: ${firstRecalcId}) 开始处理。`);
    }
    // 3. 收集需要回滚的 MK 列表，并执行逆序回滚
    if (firstRecalcId > -1) {
        const mksToRollback = oldSelectedMks.slice(firstRecalcId).filter(mk => mk);
        if (mksToRollback.length > 0) {
            logger.log('resyncStateOnHistoryChange', `准备回滚 ${mksToRollback.length} 个MK: [${mksToRollback.join(', ')}]`);
            for (const mk of mksToRollback.reverse()) {
                logger.debug('resyncStateOnHistoryChange', `[回滚] 正在回滚 MK: ${mk}`);
                await (0,_rollback__WEBPACK_IMPORTED_MODULE_6__.rollbackByMk)(mk, true); // true 表示只回滚，不重写
            }
            logger.log('resyncStateOnHistoryChange', '逆序回滚完成。');
        }
    }
    // 4. 从不匹配点开始，顺序重新应用变量修改，并构建新的 selectedMks
    logger.log('resyncStateOnHistoryChange', `从 ID ${firstRecalcId} 开始顺序重算...`);
    const newSelectedMks = oldSelectedMks.slice(0, firstRecalcId); // 继承匹配部分
    for (let i = firstRecalcId; i < allMessages.length; i++) {
        const msg = allMessages[i];
        logger.debug('resyncStateOnHistoryChange', `[重算] 正在处理消息索引: ${i}`);
        const newMk = await (0,_crud_patcher__WEBPACK_IMPORTED_MODULE_4__.ApplyVarChangeForMessage)(msg);
        newSelectedMks[i] = newMk; // 使用重算后的新 message_id (即 i) 作为索引
    }
    logger.log('resyncStateOnHistoryChange', '顺序重算完成。');
    // 5. 更新 SelectedMks 数组
    await (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.updateEraMetaData)(meta => {
        _.set(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.SEL_PATH, newSelectedMks);
        return meta;
    });
    logger.log('resyncStateOnHistoryChange', '状态同步完成。');
    // ==================================================================
    // 【保险机制】 - 已于 2025/10/02 移除
    //
    // **历史原因**:
    // 该机制最初是为了解决一个旧架构下的“内容-变量错位”问题。在旧架构中，当删除一条 swipe 时，
    // 后一条 swipe 的内容会“顶替”上来，但其底层的消息变量（及其 MK）却保持不变。
    // 这导致主同步逻辑的 MK 比对失效，无法发现状态变化。
    // 为此，保险机制被设计为：通过 `oldSelectedMks`（状态变更前的快照）找到被删除的旧 MK，
    // 强制回滚它，然后根据当前可见的新内容重新写入变量，从而修复错位。
    //
    // **当前架构下的情况与移除原因**:
    // 在当前架构中，MK 已被直接写入消息内容，与内容强绑定。当 swipe 导致内容变化时，MK 也会随之变化。
    // 这使得主同步逻辑（逆序回滚、顺序重算）已经能够完全、正确地处理 swipe 等场景，不再需要此保险机制。
    //
    // 继续保留该机制不仅是冗余的，而且会主动引发 Bug：
    // 它依然按照旧逻辑，使用 `oldSelectedMks` 回滚一个过时的、不相关的 MK，这会破坏主逻辑刚刚同步好的正确状态。
    // 随后，在被破坏的状态上进行的重写操作会失败或产生错误结果（例如，生成一个空的 EditLog），
    // 并覆盖掉之前由主逻辑正确生成的 EditLog，导致数据丢失。
    //
    // 综上，该机制已从“保险”变为“风险”，因此被完全注释掉。
    // ==================================================================
    // logger.log('resyncStateOnHistoryChange', '执行【保险机制】：无条件回滚并重写最后一楼...');
    // const lastWrittenMk = [...oldSelectedMks].reverse().find(mk => mk);
    // if (lastWrittenMk) {
    //   logger.log('resyncStateOnHistoryChange', `找到最后一个写入的MK: ${lastWrittenMk}，执行回滚...`);
    //   await rollbackByMk(lastWrittenMk, true);
    //   logger.log('resyncStateOnHistoryChange', '回滚完成，准备根据当前最后一楼内容重写...');
    //   await ApplyVarChange(); // ApplyVarChange 默认处理最后一楼
    //   logger.log('resyncStateOnHistoryChange', '保险性重写完成。');
    // } else {
    //   logger.log('resyncStateOnHistoryChange', '未找到任何可供回滚的旧MK，跳过保险机制。');
    // }
};


/***/ }),

/***/ "./src/ERA变量框架/events/dispatcher.ts":
/*!******************************************!*\
  !*** ./src/ERA变量框架/events/dispatcher.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dispatchAndExecuteTask: () => (/* binding */ dispatchAndExecuteTask)
/* harmony export */ });
/* harmony import */ var _core_key_mk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/key/mk */ "./src/ERA变量框架/core/key/mk.ts");
/* harmony import */ var _scriptIniter_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scriptIniter/settings */ "./src/ERA变量框架/scriptIniter/settings.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _handlers_api_dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers/api/dispatcher */ "./src/ERA变量框架/events/handlers/api/dispatcher.ts");
/* harmony import */ var _handlers_sync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlers/sync */ "./src/ERA变量框架/events/handlers/sync.ts");
/* harmony import */ var _handlers_updateMkOnly__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handlers/updateMkOnly */ "./src/ERA变量框架/events/handlers/updateMkOnly.ts");
/* harmony import */ var _merger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./merger */ "./src/ERA变量框架/events/merger.ts");








const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_2__.Logger();
/**
 * @constant {number} RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION
 * @description 当 `ensureMessageKey` 注入一个新的 MK 后，需要忽略的由该操作触发的 `character_message_rendered` 事件的数量。
 * 通常设置为 1，因为一次消息内容更新通常只会触发一次渲染事件。
 */
const RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION = 1;
/**
 * @var {ConsecutiveMkState | null} consecutiveMkState
 * @description 追踪同一个 MK 被连续处理次数的状态。
 * **作用域**: 跨批次持久化。在整个脚本生命周期内，记录字面意义上的“上一次”执行的 MK。
 */
let consecutiveMkState = null;
/**
 * **【辅助函数】处理由 MK 注入触发的冗余渲染事件**
 * @param eventType - 当前事件的类型。
 * @param currentMk - 当前消息的 MK。
 * @param mkToIgnore - 当前的忽略规则。
 * @returns {{ shouldSkip: boolean; newIgnoreRule: IgnoreRule | null }} - 返回是否应跳过此事件，以及更新后的忽略规则。
 */
function handleRedundantRenderEvent(eventType, currentMk, mkToIgnore) {
    if (mkToIgnore && eventType === tavern_events.CHARACTER_MESSAGE_RENDERED && currentMk === mkToIgnore.mk) {
        logger.log('handleRedundantRenderEvent', `忽略由 MK (${mkToIgnore.mk}) 注入触发的冗余渲染事件。剩余忽略次数: ${mkToIgnore.ignoreCount - 1}`);
        mkToIgnore.ignoreCount--;
        if (mkToIgnore.ignoreCount <= 0) {
            mkToIgnore = null; // 忽略次数用完，重置
            logger.log('handleRedundantRenderEvent', `忽略次数用完`);
        }
        return { shouldSkip: true, newIgnoreRule: mkToIgnore };
    }
    return { shouldSkip: false, newIgnoreRule: mkToIgnore };
}
/**
 * **【辅助函数】更新连续处理计数**
 * @returns {number} - 返回更新后的连续处理次数。
 */
function updateConsecutiveMkCount() {
    const mk = _utils_log__WEBPACK_IMPORTED_MODULE_2__.logContext.mk;
    if (mk && consecutiveMkState && consecutiveMkState.mk === mk) {
        logger.debug('updateConsecutiveMkCount', `连续处理写入/同步操作的 MK: ${mk}。旧计数: ${consecutiveMkState.count}，新计数: ${consecutiveMkState.count + 1}`);
        consecutiveMkState.count++;
    }
    else {
        logger.debug('updateConsecutiveMkCount', `新的写入/同步操作的 MK: ${mk}。重置计数为 1。前一个 MK 是: ${consecutiveMkState?.mk}`);
        consecutiveMkState = { mk: mk, count: 1 };
    }
    return consecutiveMkState.count;
}
/**
 * **【任务执行器】**
 * 负责执行单个事件任务，包含所有前置、后置处理和错误捕获。
 * @param {EventJob} job - 要执行的事件任务。
 * @param {IgnoreRule | null} mkToIgnore - 当前的忽略规则。**作用域**: 仅在单次批处理 (event queue processing loop) 中生效。
 * @returns {Promise<IgnoreRule | null>} - 返回更新后的忽略规则。
 */
async function dispatchAndExecuteTask(job, mkToIgnore) {
    const { type: eventType } = job;
    const eventGroup = (0,_merger__WEBPACK_IMPORTED_MODULE_6__.getEventGroup)(eventType);
    let message_id = null;
    // 在每轮任务开始时，初始化操作记录器
    const actionsTaken = { rollback: false, apply: false, resync: false, api: false, apiWrite: false };
    try {
        // **前置保障**: 确保最新消息有 MK 并设置日志上下文。
        const { mk, message_id: msgId, isNewKey } = await (0,_core_key_mk__WEBPACK_IMPORTED_MODULE_0__.ensureMkForLatestMessage)();
        if (!mk || msgId === null) {
            logger.warn('dispatchAndExecuteTask', '无法获取有效的 MK 或消息 ID，跳过任务执行。');
            return mkToIgnore;
        }
        _utils_log__WEBPACK_IMPORTED_MODULE_2__.logContext.mk = mk;
        message_id = msgId;
        // 如果 ensureMkForLatestMessage 刚刚注入了一个新的 MK，就创建或更新忽略规则。
        if (isNewKey && mk) {
            mkToIgnore = {
                mk: mk,
                ignoreCount: RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION,
            };
        }
        // **核心优化**: 检查并处理由 MK 注入触发的冗余渲染事件。
        const { shouldSkip, newIgnoreRule } = handleRedundantRenderEvent(eventType, mk, mkToIgnore);
        mkToIgnore = newIgnoreRule; // 更新忽略规则的状态
        if (shouldSkip) {
            // 如果事件被忽略，则直接返回，不更新连续处理计数
            return mkToIgnore;
        }
        logger.log('dispatchAndExecuteTask', `执行任务: ${eventType} (分组: ${eventGroup})`);
        // **任务分发**
        // v3.1 优化：payload 仅包含最核心的上下文，其他数据由下游函数自行获取。
        const payload = {
            mk: mk,
            message_id: message_id,
            actions: actionsTaken,
            consecutiveProcessingCount: 1, // 初始值
        };
        switch (eventGroup) {
            case 'INIT':
                (0,_scriptIniter_settings__WEBPACK_IMPORTED_MODULE_1__.initializeExternalSettings)();
                // 为了兼容旧版酒馆的swipe逻辑，这里也调用同步
                payload.consecutiveProcessingCount = updateConsecutiveMkCount();
                await (0,_handlers_sync__WEBPACK_IMPORTED_MODULE_4__.handleSyncEvent)(job, actionsTaken, payload);
                break;
            case 'SYNC':
                payload.consecutiveProcessingCount = updateConsecutiveMkCount();
                await (0,_handlers_sync__WEBPACK_IMPORTED_MODULE_4__.handleSyncEvent)(job, actionsTaken, payload);
                break;
            case 'API':
                (0,_handlers_api_dispatcher__WEBPACK_IMPORTED_MODULE_3__.handleApiEvent)(job, actionsTaken, payload);
                break;
            case 'UPDATE_MK_ONLY':
                await (0,_handlers_updateMkOnly__WEBPACK_IMPORTED_MODULE_5__.handleUpdateMkOnlyEvent)();
                break;
        }
    }
    catch (error) {
        logger.error('dispatchAndExecuteTask', `事件 ${eventType} 处理异常: ${error}`, error);
    }
    finally {
        // 清理日志上下文，为下一个事件做准备
        _utils_log__WEBPACK_IMPORTED_MODULE_2__.logContext.mk = '';
        // **节流**: 在每个独立任务后都进行短暂等待，确保酒馆底层有时间完成其异步操作。
        //暂时取消等待逻辑，提高即时性。
        //await new Promise(resolve => setTimeout(resolve, 50));
    }
    return mkToIgnore;
}


/***/ }),

/***/ "./src/ERA变量框架/events/emitters/events.ts":
/*!***********************************************!*\
  !*** ./src/ERA变量框架/events/emitters/events.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debouncedEmitApiWrite: () => (/* binding */ debouncedEmitApiWrite),
/* harmony export */   emitWriteDoneEvent: () => (/* binding */ emitWriteDoneEvent)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");





const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_3__.Logger();
// ==================================================================
// API 事件广播器
// ==================================================================
/**
 * 使用 lodash.debounce 创建一个防抖函数来发送 API 写入事件。
 * 这个事件通知主循环，有一个由 API 触发的、需要处理的变量变更。
 */
const debouncedEmitApiWrite = _.debounce(() => {
    eventEmit(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_EVENT_EMITTER.API_WRITE);
    logger.log('debouncedEmitApiWrite', `已触发合并后的 ${_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_EVENT_EMITTER.API_WRITE} 事件。`);
}, 50, // API 调用的防抖改成 50 毫秒，提高即时性
{ leading: false, trailing: true });
// ==================================================================
// 核心事件广播器
// ==================================================================
/**
 * **【广播器】** 触发 `era:writeDone` 事件。
 * 当一次完整的变量写入操作（包括增、删、改）成功完成后，应调用此函数。
 * 它向外部脚本广播一个事件，通知它们变量状态已发生改变，并提供详细的上下文。
 *
 * @param {DispatcherPayload} payload - 包含核心上下文信息的内部载荷。
 */
function emitWriteDoneEvent(payload) {
    // 在广播前，获取最新的全量 ERA 数据
    const { stat, meta } = (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.getEraData)();
    const statWithoutMeta = (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_2__.removeMetaFields)(stat);
    logger.debug('emitWriteDoneEvent', '获取了最新的 ERA 数据并生成了纯净版', { stat, meta, statWithoutMeta });
    // 动态构建完整的 WriteDonePayload
    const fullPayload = {
        ...payload,
        stat: (0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.unescapeEraData)(stat),
        statWithoutMeta: (0,_utils_data__WEBPACK_IMPORTED_MODULE_1__.unescapeEraData)(statWithoutMeta),
        selectedMks: _.get(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.SEL_PATH, []),
        editLogs: _.get(meta, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.LOGS_PATH, {}),
    };
    logger.debug('emitWriteDoneEvent', '动态构建了完整的事件载荷', {
        inputPayload: payload,
        fullPayload: fullPayload,
    });
    eventEmit(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_EVENT_EMITTER.WRITE_DONE, fullPayload);
    logger.log('emitWriteDoneEvent', `已触发 ${_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_EVENT_EMITTER.WRITE_DONE} 事件。操作: ${JSON.stringify(payload.actions)}, MK: ${payload.mk}, MsgID: ${payload.message_id}, 连续处理次数: ${payload.consecutiveProcessingCount}`);
}


/***/ }),

/***/ "./src/ERA变量框架/events/handlers/api/dispatcher.ts":
/*!*******************************************************!*\
  !*** ./src/ERA变量框架/events/handlers/api/dispatcher.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleApiEvent: () => (/* binding */ handleApiEvent)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/ERA变量框架/events/handlers/api/handler.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/constants */ "./src/ERA变量框架/utils/constants.ts");



function handleApiEvent(job, actionsTaken, payload) {
    const { type: eventType, detail } = job;
    actionsTaken.api = true;
    // API 事件是“即发即忘”的，同步调用处理器将任务推入 api.ts 的队列后立即返回，不阻塞事件队列。
    if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.INSERT_BY_OBJECT)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.insertByObject)(detail);
    else if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.UPDATE_BY_OBJECT)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.updateByObject)(detail);
    else if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.INSERT_BY_PATH)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.insertByPath)(detail.path, detail.value);
    else if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.UPDATE_BY_PATH)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.updateByPath)(detail.path, detail.value);
    else if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.DELETE_BY_OBJECT)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.deleteByObject)(detail);
    else if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.DELETE_BY_PATH)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.deleteByPath)(detail.path);
    else if (eventType === _utils_constants__WEBPACK_IMPORTED_MODULE_1__.ERA_API_EVENTS.GET_CURRENT_VARS)
        (0,_handler__WEBPACK_IMPORTED_MODULE_0__.getCurrentVars)(payload);
}


/***/ }),

/***/ "./src/ERA变量框架/events/handlers/api/handler.ts":
/*!****************************************************!*\
  !*** ./src/ERA变量框架/events/handlers/api/handler.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteByObject: () => (/* binding */ deleteByObject),
/* harmony export */   deleteByPath: () => (/* binding */ deleteByPath),
/* harmony export */   getCurrentVars: () => (/* binding */ getCurrentVars),
/* harmony export */   insertByObject: () => (/* binding */ insertByObject),
/* harmony export */   insertByPath: () => (/* binding */ insertByPath),
/* harmony export */   updateByObject: () => (/* binding */ updateByObject),
/* harmony export */   updateByPath: () => (/* binding */ updateByPath)
/* harmony export */ });
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _utils_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/message */ "./src/ERA变量框架/utils/message.ts");
/* harmony import */ var _emitters_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../emitters/events */ "./src/ERA变量框架/events/emitters/events.ts");
/**
 * @file ERA 变量框架 - 外部事件 API 实现模块
 * @description
 * 该模块是 ERA 框架与外部脚本交互的接口层。它实现了一系列自定义事件的处理器。
 *
 * **设计理念**:
 * ERA 框架不直接向外暴露函数调用接口。外部脚本与 ERA 交互的**唯一**方式是通过酒馆的
 * `eventEmit(eventName, eventData)` 函数，发送特定格式的事件。
 *
 * `index.ts` 模块会监听这些 `era:*` 前缀的事件，并将其推入 `event_queue.ts` 中进行处理。
 * 事件队列最终会调用本文件中对应的处理器函数（如 `insertByObject`）。
 *
 * 本模块中的函数通过一种巧妙、解耦的方式工作：它们在最新的 AI 消息末尾动态注入
 * `<VariableInsert>` 或 `<VariableEdit>` 指令块，然后调用酒馆的 `setChatMessages` 更新消息。
 * 这次修改会触发 `character_message_rendered` 等事件，被 ERA 的主监听器捕获，
 * 从而将 API 调用无缝地整合到 ERA 的原生解析和同步流程中。
 */




const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger();
// ==================================================================
// API 事件参考
// (事件名称的常量定义见于 `constants.ts` 中的 `ERA_API_EVENTS` 对象)
// ==================================================================
/**
 * @section API Event: 'era:insertByObject'
 * @description 通过一个对象，非破坏性地插入新变量。只会写入不存在的路径。
 * @param {object} detail - 要插入的变量对象。
 * @example
 * eventEmit('era:insertByObject', {
 *   player: { name: "勇者", hp: 100, inventory: [] }
 * });
 */
/**
 * @section API Event: 'era:updateByObject'
 * @description 通过一个对象，修改已存在的变量。如果路径不存在，则忽略。
 * @param {object} detail - 要更新的变量对象。
 * @example
 * eventEmit('era:updateByObject', {
 *   player: { hp: 120, status: 'blessed' }
 * });
 */
/**
 * @section API Event: 'era:insertByPath'
 * @description 通过指定路径和值，非破坏性地插入一个新变量。
 * @param {object} detail - 包含路径和值的对象。
 * @param {string} detail.path - 变量的路径，使用点或方括号表示法。
 * @param {*} detail.value - 要插入的值。
 * @example
 * eventEmit('era:insertByPath', {
 *   path: 'player.inventory[0]',
 *   value: { name: '生命药水', count: 3 }
 * });
 */
/**
 * @section API Event: 'era:updateByPath'
 * @description 通过指定路径和值，修改一个已存在的变量。
 * @param {object} detail - 包含路径和值的对象。
 * @param {string} detail.path - 变量的路径。
 * @param {*} detail.value - 要设置的新值。可以是直接的值，也可以是运算表达式。
 * @example
 * eventEmit('era:updateByPath', {
 *   path: 'player.hp',
 *   value: '+=10'
 * });
 */
/**
 * @section API Event: 'era:deleteByObject'
 * @description 通过一个对象，删除已存在的变量。
 * @param {object} detail - 描述要删除路径的结构。值的结构决定了删除行为。
 * @example
 * // 准备删除 player.gold。指令中 gold 的值必须是空对象 {}
 * eventEmit('era:deleteByObject', { player: { gold: {} } });
 *
 * // 准备删除整个 player 对象。
 * eventEmit('era:deleteByObject', { player: {} });
 *
 * // **重要**: 如果 player 对象包含 gold 和 mana 两个属性，
 * // 以下指令只会删除 gold 和 mana，而 player 对象本身会被保留（变为空对象）。
 * // 这与 `eventEmit('era:deleteByObject', { player: {} })` 的效果是不同的。
 * eventEmit('era:deleteByObject', { player: { gold: {}, mana: {} } });
 */
/**
 * @section API Event: 'era:deleteByPath'
 * @description 通过指定路径，删除一个已存在的变量。
 * @param {object} detail - 包含路径的对象。
 * @param {string} detail.path - 要删除的变量的路径。
 * @example
 * eventEmit('era:deleteByPath', { path: 'player.inventory[0]' });
 */
// ==================================================================
// 内部核心函数
// ==================================================================
/**
 * 在聊天记录中查找并返回最后一条由 AI 发送的消息。
 * 这是注入变量修改指令的目标消息。
 * @returns {Promise<any | null>} 返回找到的消息对象，如果不存在 AI 消息则返回 null。
 */
/**
 * 执行一次 API 写入操作。
 * 它将指定的变量修改块追加到最后一条 AI 消息的末尾，然后调度一个 'era:apiWrite' 事件。
 * @param {ApiWriteJob} job - 要执行的写入任务。
 */
async function performApiWrite(job) {
    // 1. 生成指令块
    const contentString = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.J)(job.blockContent);
    const block = `\n<${job.blockTag}>\n${contentString}\n</${job.blockTag}>`;
    // 2. 查找目标消息并追加内容
    const lastAiMessage = await (0,_utils_message__WEBPACK_IMPORTED_MODULE_2__.findLastAiMessage)();
    if (!lastAiMessage) {
        logger.warn('performApiWrite', '找不到任何 AI 消息，无法执行 API 写入。');
        return;
    }
    const originalContent = (0,_utils_message__WEBPACK_IMPORTED_MODULE_2__.getMessageContent)(lastAiMessage) ?? '';
    const newContent = originalContent + block;
    logger.log('performApiWrite', `实时写入 API 任务 (${job.blockTag}) 到消息 ID ${lastAiMessage.message_id}...`);
    // 3. 实时更新消息内容
    await (0,_utils_message__WEBPACK_IMPORTED_MODULE_2__.updateMessageContent)(lastAiMessage, newContent);
    // 4. 调用防抖函数来调度写入事件的发送
    (0,_emitters_events__WEBPACK_IMPORTED_MODULE_3__.debouncedEmitApiWrite)();
}
// ==================================================================
// 事件处理器实现 (由 event_queue.ts 调用)
// ==================================================================
/**
 * **【处理器】** 处理 `era:insertByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量对象。
 */
function insertByObject(data) {
    performApiWrite({ blockTag: 'VariableInsert', blockContent: data });
}
/**
 * **【处理器】** 处理 `era:updateByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量对象。
 */
function updateByObject(data) {
    performApiWrite({ blockTag: 'VariableEdit', blockContent: data });
}
/**
 * **【处理器】** 处理 `era:insertByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 * @param {*} value - 从事件 `detail` 的 `value` 属性获取。
 */
function insertByPath(path, value) {
    const block = _.set({}, path, value);
    performApiWrite({ blockTag: 'VariableInsert', blockContent: block });
}
/**
 * **【处理器】** 处理 `era:updateByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 * @param {*} value - 从事件 `detail` 的 `value` 属性获取。
 */
function updateByPath(path, value) {
    const block = _.set({}, path, value);
    performApiWrite({ blockTag: 'VariableEdit', blockContent: block });
}
/**
 * **【处理器】** 处理 `era:deleteByObject` 事件。
 * @param {object} data - 从事件的 `detail` 中获取的变量结构。
 */
function deleteByObject(data) {
    performApiWrite({ blockTag: 'VariableDelete', blockContent: data });
}
/**
 * **【处理器】** 处理 `era:deleteByPath` 事件。
 * @param {string} path - 从事件 `detail` 的 `path` 属性获取。
 */
function deleteByPath(path) {
    // 对于删除操作，我们用一个空对象作为值来表示删除该路径的意图
    const block = _.set({}, path, {});
    performApiWrite({ blockTag: 'VariableDelete', blockContent: block });
}
/**
 * **【处理器】** 处理 `era:getCurrentVars` 事件。
 * 这个函数是空的，因为它的目的只是为了触发 writeDone 事件，以便其他组件能通过这种方式获取到最新变量。
 */
function getCurrentVars(payload) {
    (0,_emitters_events__WEBPACK_IMPORTED_MODULE_3__.emitWriteDoneEvent)(payload);
}


/***/ }),

/***/ "./src/ERA变量框架/events/handlers/sync.ts":
/*!*********************************************!*\
  !*** ./src/ERA变量框架/events/handlers/sync.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleSyncEvent: () => (/* binding */ handleSyncEvent)
/* harmony export */ });
/* harmony import */ var _core_key_mk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/key/mk */ "./src/ERA变量框架/core/key/mk.ts");
/* harmony import */ var _core_sync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/sync */ "./src/ERA变量框架/core/sync.ts");
/* harmony import */ var _ui_patch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/patch */ "./src/ERA变量框架/ui/patch.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _emitters_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../emitters/events */ "./src/ERA变量框架/events/emitters/events.ts");






const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_3__.Logger();
async function handleSyncEvent(job, actionsTaken, payload) {
    const { type: eventType } = job;
    logger.debug('handleSyncEvent', `事件 ${eventType} 触发状态同步流程...`);
    const isFullSync = eventType === 'manual_full_sync';
    await (0,_core_sync__WEBPACK_IMPORTED_MODULE_1__.resyncStateOnHistoryChange)(isFullSync);
    actionsTaken.resync = true;
    // 在同步完成后，强制重新渲染消息以触发宏
    if (eventType != 'combo_sync')
        (0,_ui_patch__WEBPACK_IMPORTED_MODULE_2__.forceRenderRecentMessages)();
    // 更新状态并发送事件
    await (0,_core_key_mk__WEBPACK_IMPORTED_MODULE_0__.updateLatestSelectedMk)();
    (0,_emitters_events__WEBPACK_IMPORTED_MODULE_4__.emitWriteDoneEvent)(payload);
}


/***/ }),

/***/ "./src/ERA变量框架/events/handlers/updateMkOnly.ts":
/*!*****************************************************!*\
  !*** ./src/ERA变量框架/events/handlers/updateMkOnly.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleUpdateMkOnlyEvent: () => (/* binding */ handleUpdateMkOnlyEvent)
/* harmony export */ });
/* harmony import */ var _core_key_mk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/key/mk */ "./src/ERA变量框架/core/key/mk.ts");


async function handleUpdateMkOnlyEvent() {
    // 监听此事件仅用于为用户消息创建 MK。
    await (0,_core_key_mk__WEBPACK_IMPORTED_MODULE_0__.updateLatestSelectedMk)();
}


/***/ }),

/***/ "./src/ERA变量框架/events/merger.ts":
/*!**************************************!*\
  !*** ./src/ERA变量框架/events/merger.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_COLLISION_MAP: () => (/* binding */ EVENT_COLLISION_MAP),
/* harmony export */   EVENT_COMBO_MAP: () => (/* binding */ EVENT_COMBO_MAP),
/* harmony export */   EVENT_DEBOUNCE_MAP: () => (/* binding */ EVENT_DEBOUNCE_MAP),
/* harmony export */   EVENT_GROUPS: () => (/* binding */ EVENT_GROUPS),
/* harmony export */   getEventGroup: () => (/* binding */ getEventGroup),
/* harmony export */   mergeEventBatch: () => (/* binding */ mergeEventBatch)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");



const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_1__.Logger();
/**
 * @description 定义需要监听的事件的分组
 */
const EVENT_GROUPS = {
    INIT: [tavern_events.APP_READY],
    SYNC: [
        'manual_write',
        _utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_EVENT_EMITTER.API_WRITE,
        tavern_events.MESSAGE_RECEIVED,
        tavern_events.MESSAGE_DELETED,
        tavern_events.MESSAGE_SWIPED,
        tavern_events.CHAT_CHANGED,
        'manual_sync',
        'manual_full_sync',
        /** 由 message_updated 和 generation_started 组合而成的同步事件 */
        'combo_sync',
    ],
    API: Object.values(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_API_EVENTS),
    /** 仅更新MK的事件 */
    UPDATE_MK_ONLY: [tavern_events.MESSAGE_SENT],
    /** 仅用于对冲检测的事件，本身不触发逻辑 */
    COLLISION_DETECTORS: [tavern_events.GENERATION_STARTED],
    /** 用于组合事件的起始事件 */
    COMBO_STARTERS: [tavern_events.MESSAGE_UPDATED],
};
/**
 * @constant {Map<string, string>} EVENT_COLLISION_MAP
 * @description
 * 定义了事件对冲规则。
 * 如果在事件队列的同一次批处理中，同时出现了 key 事件和 value 事件，
 * 则这两个事件都将被忽略。
 *
 * @example
 * // 当用户快速左滑然后点击生成时，会依次触发 `MESSAGE_SWIPED` 和 `GENERATION_STARTED`。
 * // 这条规则会捕获这种模式并同时忽略这两个事件，避免不必要的同步。
 * new Map([
 *   [tavern_events.MESSAGE_SWIPED, { next: tavern_events.GENERATION_STARTED, maxInterval: 500 }]
 * ])
 */
const EVENT_COLLISION_MAP = new Map([
    [tavern_events.MESSAGE_SWIPED, { next: tavern_events.GENERATION_STARTED, maxInterval: 600 }],
]);
/**
 * @constant {Map<string, { next: string; resultType: string; maxInterval: number }>} EVENT_COMBO_MAP
 * @description
 * 定义了事件组合规则。
 * 如果在事件队列的同一次批处理中，一个 key 事件紧跟着一个 `next` 事件，
 * 它们将被合并成一个新的 `resultType` 事件。
 *
 * @example
 * // 当用户消息被AI编辑后立刻开始生成下一条消息时，会依次触发 `MESSAGE_UPDATED` 和 `GENERATION_STARTED`。
 * // 这条规则会捕获这种模式并将它们合并为一个 `combo_sync` 事件，以确保数据一致性。
 * new Map([
 *   [tavern_events.MESSAGE_UPDATED, { next: tavern_events.GENERATION_STARTED, resultType: 'combo_sync', maxInterval: 2100 }]
 * ])
 */
const EVENT_COMBO_MAP = new Map([
    [
        tavern_events.MESSAGE_UPDATED,
        { next: tavern_events.GENERATION_STARTED, resultType: 'combo_sync', maxInterval: 1600 },
    ],
]);
/**
 * @constant {Map<string, number>} EVENT_DEBOUNCE_MAP
 * @description
 * 为特定事件定义自定义的防抖时间（毫秒）。
 * 在事件队列处理器中，如果一个事件在此映射中定义了时间，
 * 将使用该时间代替默认的防抖时间。
 * 这对于那些需要更长窗口来捕获后续事件的“前置事件”特别有用。
 *
 * @example
 * // 为 MESSAGE_SWIPED 设置更长的等待时间，以确保能捕获到后续的 GENERATION_STARTED
 * new Map([
 *   [tavern_events.MESSAGE_SWIPED, 500]
 * ])
 */
const EVENT_DEBOUNCE_MAP = new Map([
    [tavern_events.MESSAGE_SWIPED, 500], // 对冲事件的前置事件
    [tavern_events.MESSAGE_UPDATED, 1500], // 组合事件的前置事件
]);
/**
 * 根据事件类型，查找它属于哪个预定义的组。
 * @param {string} eventType - 要检查的事件类型。
 * @returns {string} 事件所属的组名 ('INIT', 'SYNC', 'API', 'UPDATE_MK_ONLY', 'UNKNOWN')。
 */
function getEventGroup(eventType) {
    // 使用 as string[] 来解决 TypeScript 因 'as const' 推断出的过于严格的类型问题
    if (EVENT_GROUPS.INIT.includes(eventType))
        return 'INIT';
    if (EVENT_GROUPS.SYNC.includes(eventType))
        return 'SYNC';
    if (EVENT_GROUPS.API.includes(eventType))
        return 'API';
    if (EVENT_GROUPS.UPDATE_MK_ONLY.includes(eventType))
        return 'UPDATE_MK_ONLY';
    if (EVENT_GROUPS.COLLISION_DETECTORS.includes(eventType))
        return 'COLLISION_DETECTORS';
    if (EVENT_GROUPS.COMBO_STARTERS.includes(eventType))
        return 'COMBO_STARTERS';
    return 'UNKNOWN';
}
/**
 * **【事件合并器】**
 * 对一批事件进行智能合并，包括处理事件对冲和合并同组可覆盖事件。
 * @param {EventJob[]} batchToProcess - 从队列中取出的一批原始事件。
 * @returns {EventJob[]} - 经过合并优化后的事件数组。
 */
function mergeEventBatch(batchToProcess) {
    const originalEvents = _.cloneDeep(batchToProcess);
    const finalJobs = [];
    // 使用 for...of 循环，让逻辑更清晰
    for (const currentJob of batchToProcess) {
        // 如果是第一个事件，直接放入结果中
        if (finalJobs.length === 0) {
            finalJobs.push(currentJob);
            continue; // 继续处理下一个事件
        }
        const prevJob = finalJobs[finalJobs.length - 1];
        const timeDifference = currentJob.timestamp - prevJob.timestamp;
        // 1. 检查事件组合
        const comboRule = EVENT_COMBO_MAP.get(prevJob.type);
        if (comboRule && currentJob.type === comboRule.next) {
            if (timeDifference <= comboRule.maxInterval) {
                logger.debug('mergeEventBatch', `检测到事件组合: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms <= ${comboRule.maxInterval}ms)。将合并为 ${comboRule.resultType} 事件。`);
                finalJobs.pop(); // 移除前一个事件
                finalJobs.push({ type: comboRule.resultType, timestamp: currentJob.timestamp, detail: currentJob.detail });
                continue;
            }
            else {
                logger.debug('mergeEventBatch', `检测到潜在的事件组合，但因超时而失败: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms > ${comboRule.maxInterval}ms)。`);
            }
        }
        // 2. 检查事件对冲
        const collisionRule = EVENT_COLLISION_MAP.get(prevJob.type);
        if (collisionRule && currentJob.type === collisionRule.next) {
            if (timeDifference <= collisionRule.maxInterval) {
                logger.debug('mergeEventBatch', `检测到相邻事件对冲: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms <= ${collisionRule.maxInterval}ms)。将忽略这两个事件。`);
                finalJobs.pop(); // 移除前一个事件
                continue; // 跳过当前事件，从而忽略两者
            }
            else {
                logger.debug('mergeEventBatch', `检测到潜在的事件对冲，但因超时而失败: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms > ${collisionRule.maxInterval}ms)。`);
            }
        }
        // 3. 如果不冲突或组合，则检查同组事件合并
        const prevGroup = getEventGroup(prevJob.type);
        const currentGroup = getEventGroup(currentJob.type);
        // 定义合并条件，让 if 判断的意图更清晰
        const areInSameGroup = prevGroup === currentGroup;
        const isMergeableGroup = prevGroup === 'SYNC';
        // 如果满足合并条件
        if (areInSameGroup && isMergeableGroup) {
            // 用当前事件覆盖掉结果数组中的最后一个事件
            finalJobs[finalJobs.length - 1] = currentJob;
        }
        else {
            // 否则，将当前事件追加到结果数组
            finalJobs.push(currentJob);
        }
    }
    // 最后，清理掉所有未配对的检测器和组合起始事件
    const filteredJobs = finalJobs.filter(job => {
        const group = getEventGroup(job.type);
        const isOrphanedDetector = group === 'COLLISION_DETECTORS';
        const isOrphanedComboStarter = group === 'COMBO_STARTERS';
        if (isOrphanedDetector || isOrphanedComboStarter) {
            logger.debug('mergeEventBatch', `清理未配对的事件: ${job.type}`);
        }
        return !isOrphanedDetector && !isOrphanedComboStarter;
    });
    // 打印合并日志
    logger.debug('mergeEventBatch', `事件合并: ${originalEvents.length} -> ${filteredJobs.length}`, {
        before: originalEvents.map((e) => e.type),
        after: filteredJobs.map((e) => e.type),
    });
    return filteredJobs;
}


/***/ }),

/***/ "./src/ERA变量框架/events/queue.ts":
/*!*************************************!*\
  !*** ./src/ERA变量框架/events/queue.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pushToQueue: () => (/* binding */ pushToQueue)
/* harmony export */ });
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dispatcher */ "./src/ERA变量框架/events/dispatcher.ts");
/* harmony import */ var _merger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./merger */ "./src/ERA变量框架/events/merger.ts");
/**
 * @file ERA 变量框架 - 事件队列与总调度模块
 * @description
 * 该模块是 ERA 框架的“神经中枢”。它通过一个事件队列机制，将所有事件的接收、
 * 合并、分发和执行流程化，从根本上解决了并发和状态竞争问题。
 *
 * **工作原理**:
 * 1. **事件入队**: 所有事件（来自酒馆或 API）都被封装成 `EventJob` 对象，推入 `eventQueue`。
 * 2. **单线程处理**: `processQueue` 函数使用 `isProcessing` 锁确保同一时间只有一个处理循环在运行。
 * 3. **防抖与批处理**: 在处理前会进行短暂防抖，以收集短时间内连续触发的多个事件，形成一个“批次”。
 * 4. **委托合并**: 将整个批次交由 `event_merger.ts` 模块进行智能合并（对冲、覆盖）。
 * 5. **委托执行**: 循环遍历合并后的任务，将每个任务委托给 `task_dispatcher.ts` 模块进行独立、原子的执行。
 * 6. **状态传递**: 在不同任务的执行之间，传递和更新必要的上下文状态（如 `mkToIgnore` 和 `consecutiveMkState`）。
 */




const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_0__.Logger();
/**
 * @const {EventJob[]} eventQueue
 * @description 事件队列，存储所有待处理的事件任务。
 */
const eventQueue = [];
/**
 * @let {boolean} isProcessing
 * @description 处理器锁。为 true 时表示 `processQueue` 正在运行，防止重入。
 */
let isProcessing = false;
let isWaiting = false;
let unlockSignal = null;
/**
 * **【事件入口】**
 * 将一个事件推入队列，并尝试启动或排队等待处理器。
 * @param {string} type - 事件类型 (e.g., `tavern_events.MESSAGE_DELETED`)。
 * @param {any} [detail] - 事件附带的数据。
 */
function pushToQueue(type, detail) {
    logger.debug('pushToQueue', `接收到事件: ${type}，已推入队列。`, { detail });
    eventQueue.push({ type, detail, timestamp: Date.now() });
    processQueue();
}
/**
 * **【核心事件处理器】**
 * 采用“锁-等待-释放-通知”机制，确保事件处理的连续性。
 */
async function processQueue() {
    // 如果已经有一个调用在“排队等待”，则本次调用直接返回，防止多个等待者。
    if (isWaiting) {
        logger.debug('processQueue', '已有处理函数在排队等待，本次调用忽略。');
        return;
    }
    // 如果处理器正在忙碌，则进入“排队等待”状态。
    if (isProcessing) {
        logger.debug('processQueue', '处理器忙碌，进入排队等待状态...');
        isWaiting = true;
        // 等待当前处理器释放锁的信号
        await new Promise(resolve => {
            unlockSignal = resolve;
        });
        isWaiting = false;
        logger.debug('processQueue', '等待结束，获取到处理权。');
    }
    // 获得处理权后，如果队列已经被前一个处理器清空，则无需做任何事。
    if (eventQueue.length === 0) {
        logger.debug('processQueue', '队列为空，无需处理。');
        return;
    }
    // 【加锁】
    // 正式开始处理，加锁以阻止其他调用进入。
    isProcessing = true;
    logger.log('processQueue', '处理器启动');
    // 【防抖】
    const firstJob = eventQueue[0];
    const group = (0,_merger__WEBPACK_IMPORTED_MODULE_2__.getEventGroup)(firstJob.type);
    if (group !== 'API') {
        const debounceTime = _merger__WEBPACK_IMPORTED_MODULE_2__.EVENT_DEBOUNCE_MAP.get(firstJob.type) ?? 300;
        logger.log('processQueue', `启动事件收集窗口，等待 ${debounceTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, debounceTime));
    }
    // 【调试日志】
    logger.debug('processQueue', '事件收集窗口关闭，准备处理的队列内容:', JSON.stringify(eventQueue.map(e => e.type)));
    // 【循环处理】
    // 只要队列不为空，就持续处理。这能确保在防抖期间新到达的事件也被纳入处理范围。
    let mkToIgnore = null;
    while (eventQueue.length > 0) {
        const batchToProcess = eventQueue.splice(0, eventQueue.length);
        const finalJobs = (0,_merger__WEBPACK_IMPORTED_MODULE_2__.mergeEventBatch)(batchToProcess);
        logger.debug('processQueue', `开始处理一个新批次，包含 ${batchToProcess.length} 个原始事件，合并后为 ${finalJobs.length} 个任务。`);
        for (const job of finalJobs) {
            const newIgnoreRule = await (0,_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatchAndExecuteTask)(job, mkToIgnore);
            mkToIgnore = newIgnoreRule;
        }
        logger.debug('processQueue', '本轮批次处理完毕。');
    }
    // 【解锁并通知】
    isProcessing = false;
    logger.log('processQueue', '处理器空闲，已释放锁。');
    // 如果有等待者，则发送解锁信号，让它立即开始。
    if (unlockSignal) {
        logger.debug('processQueue', '通知排队的处理器开始工作。');
        const signal = unlockSignal;
        unlockSignal = null;
        signal();
    }
}


/***/ }),

/***/ "./src/ERA变量框架/macro/parser.ts":
/*!*************************************!*\
  !*** ./src/ERA变量框架/macro/parser.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseEraMacros: () => (/* binding */ parseEraMacros)
/* harmony export */ });
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/data */ "./src/ERA变量框架/utils/data.ts");
/* harmony import */ var _utils_era_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/era_data */ "./src/ERA变量框架/utils/era_data.ts");
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");



const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_2__.Logger();
/**
 * 解析字符串中的 ERA 宏, 并将其替换为对应的变量值。
 * 这是提供给其他模块调用的公共接口。
 * @param text - 包含宏的输入字符串。
 * @returns - 替换宏后的字符串。
 */
function parseEraMacros(text) {
    const macroRegex = /{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi;
    // 如果文本中不包含宏特征字符串, 直接返回以优化性能
    if (!text.includes('{{ERA')) {
        return text;
    }
    // 获取 stat_data
    const { stat } = (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_1__.getEraData)();
    if (!stat) {
        logger.warn('parseEraMacros', '无法获取到 stat_data, 宏替换失败.');
        // 如果没有 stat_data, 任何宏都无法解析, 直接返回原文本
        return text;
    }
    return text.replace(macroRegex, (substring, withMeta, path) => {
        const funcName = 'parseEraMacros';
        const trimmedPath = path.trim();
        const includeMeta = !!withMeta;
        let data;
        if (trimmedPath === '$ALLDATA') {
            data = stat;
        }
        else {
            data = _.get(stat, trimmedPath);
        }
        if (data === undefined) {
            logger.warn(funcName, `在 stat_data 中未找到路径 "${trimmedPath}", 宏将替换为空字符串.`);
            return ''; // 路径未找到, 返回空字符串
        }
        // 根据 withMeta 标志决定是否移除 $meta 字段
        const dataBeforeUnescape = includeMeta ? data : (0,_utils_era_data__WEBPACK_IMPORTED_MODULE_1__.removeMetaFields)(data);
        // 在返回数据前进行反转义
        const finalData = (0,_utils_data__WEBPACK_IMPORTED_MODULE_0__.unescapeEraData)(dataBeforeUnescape);
        logger.debug('parseEraMacros', `宏替换数据反转义: ${trimmedPath}`, {
            before: dataBeforeUnescape,
            after: finalData,
        });
        // 如果是对象或数组, 转换为 JSON 字符串
        if (typeof finalData === 'object' && finalData !== null) {
            return JSON.stringify(finalData);
        }
        // 如果是原始类型, 直接转换为字符串
        return String(finalData);
    });
}
$(() => {
    /**
     * 注册 ERA 宏, 用于在发送给 AI 的消息中查询当前聊天的变量数据
     *
     * - `{{ERA:path.to.data}}`: 查询并替换为**不含** `$meta` 的纯净数据。
     *   - `{{ERA:$ALLDATA}}` 将返回整个移除 `$meta` 后的 `stat_data` 对象。
     * - `{{ERA-withmeta:path.to.data}}`: 查询并替换为**包含** `$meta` 的原始数据。
     *   - `{{ERA-withmeta:$ALLDATA}}` 将返回完整的 `stat_data` 对象。
     */
    registerMacroLike(/{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi, (context, substring, withMeta, path) => {
        // 直接复用 parseEraMacros 函数的逻辑。
        // substring 参数是匹配到的完整宏字符串, 如 "{{ERA:path.to.data}}"
        return parseEraMacros(substring);
    });
});


/***/ }),

/***/ "./src/ERA变量框架/scriptIniter/settings.ts":
/*!**********************************************!*\
  !*** ./src/ERA变量框架/scriptIniter/settings.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeExternalSettings: () => (/* binding */ initializeExternalSettings),
/* harmony export */   initializeExternalSettingsBak: () => (/* binding */ initializeExternalSettingsBak)
/* harmony export */ });
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ "zod");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_1__);



const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_0__.Logger();
/**
 * 定义外部设定的变量结构和默认值。
 */
const SettingsSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z
    .object({
    强制重载功能: zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().default(false),
    强制重载消息数: zod__WEBPACK_IMPORTED_MODULE_1__.z.number().default(2),
})
    .prefault({});
/**
 * 初始化脚本的外部设置变量。
 * 该函数会检查并创建缺失的脚本变量，如果已存在则不进行任何操作。
 * 同时，它会输出检查结果，报告哪些变量已存在，哪些缺失。
 */
function initializeExternalSettingsBak() {
    const scriptId = getScriptId();
    // 检查并初始化脚本变量
    const currentVars = getVariables({ type: 'script', script_id: scriptId }) ?? {};
    const defaultSettings = SettingsSchema.parse({}); // 从 Zod schema 获取一个包含所有默认值的对象
    const missingVars = {};
    const existingVarKeys = [];
    logger.debug('initializeExternalSettings', '当前脚本变量为:', currentVars);
    for (const key of Object.keys(defaultSettings)) {
        if (key in currentVars) {
            existingVarKeys.push(key);
        }
        else {
            missingVars[key] = defaultSettings[key];
        }
    }
    // 报告检查结果
    if (existingVarKeys.length > 0) {
        logger.debug('initializeExternalSettings', '检测到以下现有变量:', existingVarKeys);
    }
    const missingVarKeys = Object.keys(missingVars);
    if (missingVarKeys.length > 0) {
        logger.debug('initializeExternalSettings', '检测到以下缺失变量:', missingVarKeys);
        // 创建缺失的变量
        insertVariables(missingVars, { type: 'script', script_id: scriptId });
        // insertVariables 可能无法正常工作, 改为使用 replaceVariables
        //const updatedVars = { ...currentVars, ...missingVars };
        //logger.debug('initializeExternalSettings', '更新脚本变量为:', updatedVars);
        //replaceVariables(updatedVars, { type: 'script', script_id: scriptId });
        // 尝试使用 updateVariablesWith
        //updateVariablesWith((variables) => ({ ...variables, ...missingVars }),{ type: 'script', script_id: scriptId },);
        logger.log('initializeExternalSettings', '已初始化缺失的脚本变量。');
    }
    if (missingVarKeys.length === 0) {
        logger.log('initializeExternalSettings', '所有必需的外部变量均已存在，无需初始化。');
    }
}
function initializeExternalSettings() {
    let settings;
    if (!settings) {
        settings = SettingsSchema.parse(getVariables({ type: 'script', script_id: getScriptId() }));
        logger.debug('initializeExternalSettings', '写入脚本变量:', settings);
        insertVariables(settings, { type: 'script', script_id: getScriptId() });
    }
}
// 导出函数，由事件分发器在 app_ready 事件时调用
$(() => {
    initializeExternalSettings();
});


/***/ }),

/***/ "./src/ERA变量框架/ui/App.vue":
/*!********************************!*\
  !*** ./src/ERA变量框架/ui/App.vue ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _App_vue_vue_type_template_id_390dd513_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=390dd513&scoped=true&ts=true */ "./src/ERA变量框架/ui/App.vue?vue&type=template&id=390dd513&scoped=true&ts=true");
/* harmony import */ var _App_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/App.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _App_vue_vue_type_style_index_0_id_390dd513_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=390dd513&lang=css */ "./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css");
/* harmony import */ var _App_vue_vue_type_style_index_1_id_390dd513_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css */ "./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;



const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_App_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_390dd513_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-390dd513"],['__file',"src/ERA变量框架/ui/App.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/App.vue?vue&type=script&setup=true&lang=ts":
/*!*******************************************************************!*\
  !*** ./src/ERA变量框架/ui/App.vue?vue&type=script&setup=true&lang=ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./App.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css":
/*!****************************************************************************!*\
  !*** ./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_0_id_390dd513_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./App.vue?vue&type=style&index=0&id=390dd513&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=0&id=390dd513&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_0_id_390dd513_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_0_id_390dd513_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_0_id_390dd513_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_0_id_390dd513_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css":
/*!****************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcs_37bafd025248bbddf6b8842180147e3c_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_1_id_390dd513_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_37bafd025248bbddf6b8842180147e3c/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=style&index=1&id=390dd513&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcs_37bafd025248bbddf6b8842180147e3c_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_1_id_390dd513_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcs_37bafd025248bbddf6b8842180147e3c_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_1_id_390dd513_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcs_37bafd025248bbddf6b8842180147e3c_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_1_id_390dd513_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcs_37bafd025248bbddf6b8842180147e3c_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_style_index_1_id_390dd513_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/App.vue?vue&type=template&id=390dd513&scoped=true&ts=true":
/*!**********************************************************************************!*\
  !*** ./src/ERA变量框架/ui/App.vue?vue&type=template&id=390dd513&scoped=true&ts=true ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_a9147556e0c963c2f14f4c9e8ccef76f_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_template_id_390dd513_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_a9147556e0c963c2f14f4c9e8ccef76f_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_App_vue_vue_type_template_id_390dd513_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./App.vue?vue&type=template&id=390dd513&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/App.vue?vue&type=template&id=390dd513&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/ActionButtons.vue":
/*!*****************************************************!*\
  !*** ./src/ERA变量框架/ui/components/ActionButtons.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionButtons_vue_vue_type_template_id_b1998c20_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true");
/* harmony import */ var _ActionButtons_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtons.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _ActionButtons_vue_vue_type_style_index_0_id_b1998c20_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ActionButtons_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ActionButtons_vue_vue_type_template_id_b1998c20_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-b1998c20"],['__file',"src/ERA变量框架/ui/components/ActionButtons.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=script&setup=true&lang=ts":
/*!****************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=script&setup=true&lang=ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./ActionButtons.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_style_index_0_id_b1998c20_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=style&index=0&id=b1998c20&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_style_index_0_id_b1998c20_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_style_index_0_id_b1998c20_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_style_index_0_id_b1998c20_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_style_index_0_id_b1998c20_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true":
/*!*******************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_template_id_b1998c20_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_ActionButtons_vue_vue_type_template_id_b1998c20_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/ActionButtons.vue?vue&type=template&id=b1998c20&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/FloatingBall.vue":
/*!****************************************************!*\
  !*** ./src/ERA变量框架/ui/components/FloatingBall.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FloatingBall_vue_vue_type_template_id_2fa4c130_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true");
/* harmony import */ var _FloatingBall_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FloatingBall.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _FloatingBall_vue_vue_type_style_index_0_id_2fa4c130_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_FloatingBall_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FloatingBall_vue_vue_type_template_id_2fa4c130_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2fa4c130"],['__file',"src/ERA变量框架/ui/components/FloatingBall.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=script&setup=true&lang=ts":
/*!***************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=script&setup=true&lang=ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./FloatingBall.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_style_index_0_id_2fa4c130_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=style&index=0&id=2fa4c130&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_style_index_0_id_2fa4c130_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_style_index_0_id_2fa4c130_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_style_index_0_id_2fa4c130_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_style_index_0_id_2fa4c130_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true":
/*!******************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_template_id_2fa4c130_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_a9147556e0c963c2f14f4c9e8ccef76f_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_2_96d39c74a8c06e57a334244d199e36ff_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_FloatingBall_vue_vue_type_template_id_2fa4c130_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@_a9147556e0c963c2f14f4c9e8ccef76f/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.2_96d39c74a8c06e57a334244d199e36ff/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/FloatingBall.vue?vue&type=template&id=2fa4c130&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue":
/*!********************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EraAccordion_vue_vue_type_template_id_525cff1c_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true");
/* harmony import */ var _EraAccordion_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EraAccordion.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _EraAccordion_vue_vue_type_style_index_0_id_525cff1c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_EraAccordion_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_EraAccordion_vue_vue_type_template_id_525cff1c_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-525cff1c"],['__file',"src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=script&setup=true&lang=ts":
/*!*******************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=script&setup=true&lang=ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./EraAccordion.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_style_index_0_id_525cff1c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=style&index=0&id=525cff1c&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_style_index_0_id_525cff1c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_style_index_0_id_525cff1c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_style_index_0_id_525cff1c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_style_index_0_id_525cff1c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true":
/*!**********************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_template_id_525cff1c_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_EraAccordion_vue_vue_type_template_id_525cff1c_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/EraAccordion.vue?vue&type=template&id=525cff1c&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue":
/*!****************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _JsonNode_vue_vue_type_template_id_24d5a928_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true");
/* harmony import */ var _JsonNode_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JsonNode.vue?vue&type=script&lang=ts */ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=script&lang=ts");
/* harmony import */ var _JsonNode_vue_vue_type_style_index_0_id_24d5a928_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_JsonNode_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_JsonNode_vue_vue_type_template_id_24d5a928_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-24d5a928"],['__file',"src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=script&lang=ts":
/*!****************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=script&lang=ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./JsonNode.vue?vue&type=script&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=script&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css":
/*!************************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_style_index_0_id_24d5a928_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=style&index=0&id=24d5a928&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_style_index_0_id_24d5a928_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_style_index_0_id_24d5a928_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_style_index_0_id_24d5a928_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_style_index_0_id_24d5a928_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true":
/*!******************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_template_id_24d5a928_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_JsonNode_vue_vue_type_template_id_24d5a928_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/JsonNode.vue?vue&type=template&id=24d5a928&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue":
/*!******************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MetaHeader_vue_vue_type_template_id_3824c4e0_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true");
/* harmony import */ var _MetaHeader_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetaHeader.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _MetaHeader_vue_vue_type_style_index_0_id_3824c4e0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_MetaHeader_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MetaHeader_vue_vue_type_template_id_3824c4e0_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3824c4e0"],['__file',"src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=script&setup=true&lang=ts":
/*!*****************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=script&setup=true&lang=ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./MetaHeader.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css":
/*!**************************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_style_index_0_id_3824c4e0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=style&index=0&id=3824c4e0&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_style_index_0_id_3824c4e0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_style_index_0_id_3824c4e0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_style_index_0_id_3824c4e0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_style_index_0_id_3824c4e0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true":
/*!********************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_template_id_3824c4e0_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_MetaHeader_vue_vue_type_template_id_3824c4e0_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/MetaHeader.vue?vue&type=template&id=3824c4e0&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue":
/*!************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrettyJsonViewer_vue_vue_type_template_id_15c94b4e_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true");
/* harmony import */ var _PrettyJsonViewer_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _PrettyJsonViewer_vue_vue_type_style_index_0_id_15c94b4e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PrettyJsonViewer_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PrettyJsonViewer_vue_vue_type_template_id_15c94b4e_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-15c94b4e"],['__file',"src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts":
/*!***********************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css":
/*!********************************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_style_index_0_id_15c94b4e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=style&index=0&id=15c94b4e&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_style_index_0_id_15c94b4e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_style_index_0_id_15c94b4e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_style_index_0_id_15c94b4e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_style_index_0_id_15c94b4e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true":
/*!**************************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_template_id_15c94b4e_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_PrettyJsonViewer_vue_vue_type_template_id_15c94b4e_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/PrettyJsonViewer.vue?vue&type=template&id=15c94b4e&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue":
/*!*****************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TabSwitch_vue_vue_type_template_id_f245150a_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true */ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true");
/* harmony import */ var _TabSwitch_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabSwitch.vue?vue&type=script&setup=true&lang=ts */ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=script&setup=true&lang=ts");
/* harmony import */ var _TabSwitch_vue_vue_type_style_index_0_id_f245150a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css */ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/exportHelper.js");
/* unplugin-vue-components disabled */



;


const __exports__ = /*#__PURE__*/(0,_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TabSwitch_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TabSwitch_vue_vue_type_template_id_f245150a_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-f245150a"],['__file',"src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=script&setup=true&lang=ts":
/*!****************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=script&setup=true&lang=ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_script_setup_true_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./TabSwitch.vue?vue&type=script&setup=true&lang=ts */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=script&setup=true&lang=ts");
/* unplugin-vue-components disabled */ 

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_style_index_0_id_f245150a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!../../../../../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js??clonedRuleSet-43.use[0]!./node_modules/.pnpm/css-loader@7.1.2_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-43.use[1]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcss@8.5.6_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=style&index=0&id=f245150a&scoped=true&lang=css");
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_style_index_0_id_f245150a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_style_index_0_id_f245150a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_style_index_0_id_f245150a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_vue_style_loader_4_1_3_node_modules_vue_style_loader_index_js_clonedRuleSet_43_use_0_node_modules_pnpm_css_loader_7_1_2_webpack_5_102_1_node_modules_css_loader_dist_cjs_js_clonedRuleSet_43_use_1_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_pnpm_postcss_loader_8_2_0_postcss_8_5_6_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_postcss_loader_dist_cjs_js_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_style_index_0_id_f245150a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true":
/*!*******************************************************************************************************************!*\
  !*** ./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_template_id_f245150a_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_vue_components_node_modules_pnpm_unplugin_2_3_10_node_modules_unplugin_dist_webpack_loaders_transform_js_unplugin_auto_import_node_modules_pnpm_ts_loader_9_5_4_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_ts_loader_index_js_clonedRuleSet_40_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_pnpm_vue_loader_17_4_2_vue_3_5_22_typescript_6_0_0_dev_20250807_webpack_5_102_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_6_use_0_TabSwitch_vue_vue_type_template_id_f245150a_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!../../../../../../node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!../../../../../../node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../../../node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true */ "./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-vue-components!./node_modules/.pnpm/unplugin@2.3.10/node_modules/unplugin/dist/webpack/loaders/transform.js??unplugin-auto-import!./node_modules/.pnpm/ts-loader@9.5.4_typescript@6.0.0-dev.20250807_webpack@5.102.1/node_modules/ts-loader/index.js??clonedRuleSet-40!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/.pnpm/vue-loader@17.4.2_vue@3.5.22_typescript@6.0.0-dev.20250807__webpack@5.102.1/node_modules/vue-loader/dist/index.js??ruleSet[1].rules[6].use[0]!./src/ERA变量框架/ui/components/era-panel/parts/TabSwitch.vue?vue&type=template&id=f245150a&scoped=true&ts=true");
/* unplugin-vue-components disabled */

/***/ }),

/***/ "./src/ERA变量框架/ui/index.ts":
/*!*********************************!*\
  !*** ./src/ERA变量框架/ui/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pinia */ "pinia");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.vue */ "./src/ERA变量框架/ui/App.vue");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dom */ "./src/ERA变量框架/ui/utils/dom.ts");





const logger = new _utils_log__WEBPACK_IMPORTED_MODULE_2__.Logger('ui-index');
let vueApp = null;
let mountPoint = null;
let currentView = 'FloatingBall';
let lastEventData = null;
/**
 * 渲染 App 组件
 * @param viewToShow 要在 App 内部初始显示的视图
 */
function renderApp(viewToShow, dataToPass) {
    logger.debug('renderApp', `开始渲染 App，视图: ${viewToShow}`, { dataToPass });
    if (!mountPoint) {
        logger.warn('renderApp', '挂载点不存在，渲染中止');
        return;
    }
    // 1. 卸载当前 app
    if (vueApp) {
        logger.debug('renderApp', '卸载旧的 Vue 实例');
        vueApp.unmount();
    }
    // 2. 创建并挂载新的 app 实例，并通过 props 传递初始视图和数据
    vueApp = (0,vue__WEBPACK_IMPORTED_MODULE_1__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_3__["default"], {
        initialView: viewToShow,
        eventData: dataToPass,
    });
    vueApp.use((0,pinia__WEBPACK_IMPORTED_MODULE_0__.createPinia)());
    vueApp.mount(mountPoint[0]);
    // 3. 重新传送样式，以确保新组件的样式被加载
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.teleportStyle)();
    logger.debug('renderApp', '渲染完成');
}
/**
 * 切换视图的全局函数
 * @param viewName 要切换到的视图名称
 */
function switchView(viewName) {
    logger.debug('switchView', `请求切换视图到: ${viewName}`);
    if (currentView !== viewName) {
        currentView = viewName;
        logger.log('switchView', `视图已切换，重新渲染 App`);
        renderApp(viewName, lastEventData);
    }
    else {
        logger.debug('switchView', `视图已经是 ${viewName}，无需切换`);
    }
}
// 暴露切换函数到 window
window.eraUiSwitchView = switchView;
// 在加载时执行
$(() => {
    logger.log('$(document).ready', 'UI 脚本开始初始化');
    // 创建挂载点
    mountPoint = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.createMountPoint)();
    logger.debug('$(document).ready', '创建挂载点', mountPoint);
    // 将挂载点添加到 body
    $('body').append(mountPoint);
    logger.debug('$(document).ready', '挂载点已添加到 body');
    // 初始加载 App
    renderApp(currentView, lastEventData);
    // 监听 era:writeDone 事件
    eventOn('era:writeDone', (data) => {
        logger.log('era:writeDone', '接收到 era:writeDone 事件，准备刷新 UI', data);
        lastEventData = data;
        // 无论当前视图是什么，都强制刷新
        renderApp(currentView, lastEventData);
    });
    logger.debug('$(document).ready', '已设置 era:writeDone 事件监听器');
});
// 在卸载时执行
$(window).on('pagehide', () => {
    logger.log('pagehide', 'UI 脚本开始卸载');
    if (vueApp) {
        logger.debug('pagehide', '卸载 Vue 实例');
        vueApp.unmount();
    }
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.deteleportStyle)();
    if (mountPoint) {
        logger.debug('pagehide', '销毁挂载点');
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.destroyMountPoint)();
    }
    logger.log('pagehide', 'UI 脚本卸载完成');
});


/***/ }),

/***/ "./src/ERA变量框架/ui/patch.ts":
/*!*********************************!*\
  !*** ./src/ERA变量框架/ui/patch.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forceRenderRecentMessages: () => (/* binding */ forceRenderRecentMessages)
/* harmony export */ });
/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log */ "./src/ERA变量框架/utils/log.ts");
/**
 * @file 强制宏渲染模块
 * @description 通过模拟用户UI操作, 强制酒馆重新渲染消息, 以触发完整的宏替换。
 */

const log = new _utils_log__WEBPACK_IMPORTED_MODULE_0__.Logger();
/*
 * 强制重新渲染单条消息 (UI事件模拟备份)。
 * @param messageId 要强制渲染的消息ID。
 * @returns 一个 Promise, 在模拟点击完成后 resolve。
 */
// function forceRenderMessage_backup_by_UI_event(messageId: number): Promise<void> {
//   return new Promise(resolve => {
//     const messageSelector = `div.mes[mesid="${messageId}"]`;
//     const $message = $(messageSelector);
//
//     if ($message.length === 0) {
//       log.warn('forceRenderMessage_backup_by_UI_event', `找不到消息ID为 ${messageId} 的div。`);
//       return resolve();
//     }
//
//     const { state, buttons } = analyzeMessageUI($message);
//
//     if (state === 'editing') {
//       // 如果已经是编辑状态，直接点击取消
//       buttons.cancelEdit?.trigger('click');
//       log.debug('forceRenderMessage_backup_by_UI_event', `消息 ${messageId} 处于编辑状态，已点击取消。`);
//       setTimeout(resolve, 50);
//     } else {
//       // 如果是常规状态，先点击编辑，再点击取消
//       buttons.edit?.trigger('click');
//       log.debug('forceRenderMessage_backup_by_UI_event', `消息 ${messageId} 处于常规状态，已点击编辑。`);
//       setTimeout(() => {
//         // 重新分析以获取新状态下的按钮
//         const { buttons: updatedButtons } = analyzeMessageUI($message);
//         updatedButtons.cancelEdit?.trigger('click');
//         log.debug('forceRenderMessage_backup_by_UI_event', `消息 ${messageId} 已点击取消。`);
//         resolve();
//       }, 50);
//     }
//   });
// }
/**
 * 强制重新渲染单条消息。
 * @param messageId 要强制渲染的消息ID。
 * @returns 一个 Promise, 在操作完成后 resolve。
 */
async function forceRenderMessage(messageId) {
    const messages = getChatMessages(messageId);
    if (!messages || messages.length === 0) {
        log.warn('forceRenderMessage', `找不到消息ID为 ${messageId} 的消息。`);
        return;
    }
    const message = messages[0];
    // 使用 setChatMessages 并传入原封不动的消息内容来触发刷新
    await setChatMessages([{ message_id: messageId, message: message.message }]);
    log.debug('forceRenderMessage', `已使用 setChatMessages 刷新消息 ${messageId}。`);
}
/**
 * 强制重新渲染最近的N条消息, 以确保宏被正确替换。
 * 是否执行以及渲染的数量由脚本变量控制。
 */
async function forceRenderRecentMessages() {
    const scriptVars = getVariables({ type: 'script', script_id: getScriptId() });
    // 检查是否启用了强制重载功能
    const forceReload = _.get(scriptVars, '强制重载功能', false);
    if (!forceReload) {
        log.debug('forceRenderRecentMessages', '强制重载功能未启用, 跳过。');
        return; // 如果未启用，则不执行任何操作
    }
    // 获取要重载的消息数量，默认为1
    const messageCount = _.get(scriptVars, '强制重载消息数', 1);
    log.log('forceRenderRecentMessages', `开始强制重载, 数量: ${messageCount}`);
    // 等待一小段时间, 确保变量更新已经完成
    await new Promise(resolve => setTimeout(resolve, 1000));
    const allMessages = getChatMessages('0-{{lastMessageId}}');
    if (!allMessages || allMessages.length === 0) {
        log.warn('forceRenderRecentMessages', '无法获取到任何消息, 终止重载。');
        return;
    }
    // 根据脚本变量设置的数量来截取最近的消息
    const recentMessages = allMessages.slice(-messageCount);
    for (const message of recentMessages) {
        log.debug('forceRenderRecentMessages', `正在强制渲染消息: ${message.message_id}`);
        await forceRenderMessage(message.message_id);
        // 在每次操作之间短暂暂停, 避免操作过快导致UI问题。
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    log.log('forceRenderRecentMessages', '强制重载完成。');
}


/***/ }),

/***/ "./src/ERA变量框架/ui/utils/dom.ts":
/*!*************************************!*\
  !*** ./src/ERA变量框架/ui/utils/dom.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMountPoint: () => (/* binding */ createMountPoint),
/* harmony export */   destroyMountPoint: () => (/* binding */ destroyMountPoint),
/* harmony export */   deteleportStyle: () => (/* binding */ deteleportStyle),
/* harmony export */   teleportStyle: () => (/* binding */ teleportStyle)
/* harmony export */ });
function createMountPoint() {
    return $('<div>').attr('id', `era-ui-mount-point-${getScriptId()}`).css({
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        'z-index': 10000,
    });
}
function destroyMountPoint() {
    $(`div#era-ui-mount-point-${getScriptId()}`).remove();
}
function teleportStyle() {
    const scriptId = getScriptId();
    // 先移除旧的，确保样式是最新的
    $(`head > div[script_id="${scriptId}"]`).remove();
    const $div = $('<div>').attr('script_id', scriptId).append($('head > style', document).clone());
    $('head').append($div);
}
function deteleportStyle() {
    $(`head > div[script_id="${getScriptId()}"]`).remove();
}


/***/ }),

/***/ "./src/ERA变量框架/utils/constants.ts":
/*!****************************************!*\
  !*** ./src/ERA变量框架/utils/constants.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHAT_SCOPE: () => (/* binding */ CHAT_SCOPE),
/* harmony export */   ERA_API_EVENTS: () => (/* binding */ ERA_API_EVENTS),
/* harmony export */   ERA_DATA_REGEX: () => (/* binding */ ERA_DATA_REGEX),
/* harmony export */   ERA_DATA_TAG: () => (/* binding */ ERA_DATA_TAG),
/* harmony export */   ERA_EVENT_EMITTER: () => (/* binding */ ERA_EVENT_EMITTER),
/* harmony export */   LOGS_PATH: () => (/* binding */ LOGS_PATH),
/* harmony export */   META_DATA_PATH: () => (/* binding */ META_DATA_PATH),
/* harmony export */   SEL_PATH: () => (/* binding */ SEL_PATH),
/* harmony export */   STAT_DATA_PATH: () => (/* binding */ STAT_DATA_PATH)
/* harmony export */ });
/**
 * @file ERA 变量框架 - 核心常量模块
 * @description
 * 该文件集中定义了整个 ERA 框架所使用的关键常量。
 * 这些常量主要用作在酒馆 `chat` 变量中存储和检索 ERA 核心数据的路径（键名）。
 *
 * **核心数据结构**:
 * ERA 的数据被分为两部分，存储在 `chat` 变量下：
 * 1. **元数据 (ERAMetaData)**: 包含框架自身运行所需的核心数据，如 `EditLogs` 和 `SelectedMks`。
 * 2. **状态数据 (stat_data)**: 包含所有由用户和 AI 管理的游戏/故事变量，如 `player`、`world_state` 等。
 *
 * 其结构大致如下：
 * ```json
 * {
 *   "ERAMetaData": {
 *     "EditLogs": { ... },
 *     "SelectedMks": [ ... ]
 *   },
 *   "stat_data": {
 *     "player": { "hp": 100, "gold": 50 },
 *     "world_state": { ... }
 *   }
 * }
 * ```
 * 将这些路径定义为常量，有助于：
 * 1. **避免硬编码**：减少因拼写错误导致的 bug。
 * 2. **提高可维护性**：如果未来需要调整数据结构，只需修改此文件即可。
 * 3. **增强代码可读性**：常量的名称清晰地表达了其所指向的数据的含义。
 */

/**
 * @constant {object} CHAT_SCOPE
 * @description
 * 用于酒馆助手 `getVariables` 和 `replaceVariables` 系列函数的 `scope` 参数。
 * 它指定了操作的目标是当前**聊天（Chat）**级别的变量。
 * ERA 框架的所有核心数据和用户变量都存储在此作用域下。
 */
const CHAT_SCOPE = { type: 'chat' };
/**
 * @constant {string} META_DATA_PATH
 * @description 在 `chat` 变量中，存储 ERA 框架**元数据**的根对象的键名。
 */
const META_DATA_PATH = 'ERAMetaData';
/**
 * @constant {string} STAT_DATA_PATH
 * @description 在 `chat` 变量中，存储用户**状态数据**的根对象的键名。
 */
const STAT_DATA_PATH = 'stat_data';
/**
 * @constant {string} LOGS_PATH
 * @description
 * 在 `ERAMetaData` 对象中，存储**编辑日志（Edit Logs）**的对象的键名，即 `"EditLogs"`。
 * `EditLogs` 是一个以**消息密钥（MK）**为键，以该消息引发的变量变更记录数组为值的对象。
 * 这是实现“逆序回滚”功能的基础数据。
 *
 * @example
 * // chat.ERAMetaData.EditLogs 的一个条目
 * "era_mk_1759246942209_jipmrj": [
 *   { "op": "insert", "path": "testData.inventory", "value_new": { "gold": 100, "slots": ["sword", "shield"] } },
 *   { "op": "update", "path": "player.hp", "value_old": 90, "value_new": 100 }
 * ]
 */
const LOGS_PATH = 'EditLogs';
/**
 * @constant {string} SEL_PATH
 * @description
 * 在 `ERAMetaData` 对象中，存储**已选择消息密钥链（Selected Message Keys）**的数组的键名，即 `"SelectedMks"`。
 * `SelectedMks` 是一个稀疏数组，其**索引约等于消息 ID**，值是该楼层消息的 MK。
 * 这个数组是 ERA 框架的“脊梁”，是连接抽象变量状态与具体聊天历史的桥梁。
 * 框架通过比对 `SelectedMks` 与实际消息流中的 MK，来判断数据是否需要同步。
 *
 * @example
 * // chat.ERAMetaData.SelectedMks
 * [ , "era_mk_greeting", "era_mk_abc123", , "era_mk_xyz789"]
 */
const SEL_PATH = 'SelectedMks';
/**
 * @constant {string} ERA_DATA_TAG
 * @description
 * 用于在消息内容中包裹 ERA 元数据（如消息密钥 MK）的 XML 风格标签名。
 * e.g., `<era_data>{...}</era_data>`
 */
const ERA_DATA_TAG = 'era_data';
/**
 * @constant {RegExp} ERA_DATA_REGEX
 * @description
 * 用于从消息内容字符串中匹配和提取 `<era_data>` 块的正则表达式。
 * 这个常量被定义在这里，以避免 `message_key.ts` 和 `message_utils.ts` 之间的循环依赖。
 */
const ERA_DATA_REGEX = new RegExp(`<${ERA_DATA_TAG}>({.*?})<\\/${ERA_DATA_TAG}>`);
/**
 * @constant {object} ERA_API_EVENTS
 * @description
 * 定义了所有供外部脚本通过 `eventEmit` 调用的自定义 API 事件名称。
 * 使用这些常量可以避免在代码中使用硬编码的字符串。
 */
const ERA_API_EVENTS = {
    INSERT_BY_OBJECT: 'era:insertByObject',
    UPDATE_BY_OBJECT: 'era:updateByObject',
    INSERT_BY_PATH: 'era:insertByPath',
    UPDATE_BY_PATH: 'era:updateByPath',
    DELETE_BY_OBJECT: 'era:deleteByObject',
    DELETE_BY_PATH: 'era:deleteByPath',
    GET_CURRENT_VARS: 'era:getCurrentVars',
};
/**
 * @constant {object} ERA_EVENT_EMITTER
 * @description 定义了所有由 ERA 框架**向外发出**的事件。
 */
const ERA_EVENT_EMITTER = {
    /** 当变量写入完成时触发 */
    WRITE_DONE: 'era:writeDone',
    /** 当API执行写入时触发 */
    API_WRITE: 'era:apiWrite',
};


/***/ }),

/***/ "./src/ERA变量框架/utils/data.ts":
/*!***********************************!*\
  !*** ./src/ERA变量框架/utils/data.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ J),
/* harmony export */   escapeEraData: () => (/* binding */ escapeEraData),
/* harmony export */   isPO: () => (/* binding */ isPO),
/* harmony export */   mergeReplaceArray: () => (/* binding */ mergeReplaceArray),
/* harmony export */   parseEditLog: () => (/* binding */ parseEditLog),
/* harmony export */   parseJsonl: () => (/* binding */ parseJsonl),
/* harmony export */   sanitizeArrays: () => (/* binding */ sanitizeArrays),
/* harmony export */   unescapeEraData: () => (/* binding */ unescapeEraData)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "./src/ERA变量框架/utils/log.ts");
/**
 * @file ERA 变量框架 - 通用数据处理模块
 */


const logger = new _log__WEBPACK_IMPORTED_MODULE_0__.Logger();
const ESCAPE_MAP = {
    '.': '__DOT__',
    '"': '__DQUOTE__',
    "'": '__SQUOTE__',
};
const UNESCAPE_MAP = _.invert(ESCAPE_MAP);
const escapeRegex = new RegExp(Object.keys(ESCAPE_MAP).map(_.escapeRegExp).join('|'), 'g');
const unescapeRegex = new RegExp(Object.values(ESCAPE_MAP).map(_.escapeRegExp).join('|'), 'g');
/**
 * 递归地转义对象或数组中所有字符串值和键的特殊字符。
 * @param data - 要处理的数据。
 * @returns - 转义后的数据。
 */
function escapeEraData(data) {
    if (Array.isArray(data)) {
        return data.map(item => escapeEraData(item));
    }
    if (_.isPlainObject(data)) {
        const newObj = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const escapedKey = key.replace(escapeRegex, match => ESCAPE_MAP[match]);
                newObj[escapedKey] = escapeEraData(data[key]);
            }
        }
        return newObj;
    }
    if (typeof data === 'string') {
        return data.replace(escapeRegex, match => ESCAPE_MAP[match]);
    }
    return data;
}
/**
 * 递归地反转义对象或数组中所有字符串值和键的特殊字符。
 * @param data - 要处理的数据。
 * @returns - 反转义后的数据。
 */
function unescapeEraData(data) {
    if (Array.isArray(data)) {
        return data.map(item => unescapeEraData(item));
    }
    if (_.isPlainObject(data)) {
        const newObj = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const unescapedKey = key.replace(unescapeRegex, match => UNESCAPE_MAP[match]);
                newObj[unescapedKey] = unescapeEraData(data[key]);
            }
        }
        return newObj;
    }
    if (typeof data === 'string') {
        return data.replace(unescapeRegex, match => UNESCAPE_MAP[match]);
    }
    return data;
}
/**
 * 判断一个值是否为“纯粹的对象”（Plain Object）。
 * 数组、null、函数、Date 对象等都会返回 false。
 * @param {*} v - 待检查的值。
 * @returns {boolean} 如果是纯粹的对象则返回 true，否则返回 false。
 */
const isPO = (v) => _.isPlainObject(v);
/**
 * 递归地“净化”一个对象，将其中的数组或对象值转换为字符串。
 * 主要用于准备数据以便在某些特定场景下展示或存储。
 * @param {*} v - 待净化的值。
 * @returns {*} 净化后的值。
 */
function sanitizeArrays(v) {
    if (Array.isArray(v)) {
        // 如果是数组，则遍历其元素。如果元素是数组或对象，则字符串化它。
        return v.map(e => (Array.isArray(e) || _.isPlainObject(e) ? JSON.stringify(e) : e));
    }
    else if (_.isPlainObject(v)) {
        // 如果是对象，则递归地对其每个属性值进行净化。
        const o = {};
        for (const k in v)
            o[k] = sanitizeArrays(v[k]);
        return o;
    }
    else {
        // 其他类型的值直接返回。
        return v;
    }
}
/**
 * 安全地将一个对象序列化为格式化的 JSON 字符串。
 * 如果序列化失败，不会抛出异常，而是返回一个包含错误信息的字符串。
 * @param {*} o - 待序列化的对象。
 * @returns {string} 成功则返回 JSON 字符串，失败则返回错误提示。
 */
const J = (o) => {
    try {
        return JSON.stringify(o, null, 2); // 使用 2 个空格进行缩进，提高可读性。
    }
    catch (e) {
        return `<<stringify失败: ${e?.message || e}>>`;
    }
};
/**
 * 使用“新数组覆盖旧数组”的策略来深度合并两个对象。
 * 这是 `_.merge` 的一个变体，专门用于处理模板合并等场景，
 * 在这些场景中，我们希望补丁对象中的数组能够完全替换基础对象中的数组，而不是合并它们。
 * @param {*} base - 基础对象。
 * @param {*} patch - 补丁对象。
 * @returns {*} 合并后的新对象。
 */
function mergeReplaceArray(base, patch) {
    // 使用 _.cloneDeep 确保不修改原始对象。
    return _.mergeWith(_.cloneDeep(base), _.cloneDeep(patch), (a, b) => {
        // 自定义合并逻辑：如果任一值为数组，则直接返回补丁值（b），从而实现覆盖。
        if (Array.isArray(a) || Array.isArray(b))
            return b;
        // 对于非数组类型，返回 undefined 以使用 _.merge 的默认合并行为。
        return undefined;
    });
}
/**
 * 健壮地解析 `EditLog` 的原始数据。
 * `EditLog` 可能以多种格式存在（对象、数组、JSON字符串），此函数旨在统一处理它们。
 * @param {*} raw - 从变量中读取的原始 `EditLog` 数据。
 * @returns {any[]} 解析后的 `EditLog` 数组。如果解析失败或输入无效，则返回一个空数组。
 */
function parseEditLog(raw) {
    if (Array.isArray(raw))
        return raw;
    if (raw && typeof raw === 'object')
        return [raw]; // 单个对象也视为有效日志
    if (typeof raw === 'string') {
        const s = raw.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, ''); // 移除代码围栏
        try {
            const arr = JSON.parse(s);
            return Array.isArray(arr) ? arr : [];
        }
        catch {
            return [];
        }
    }
    return [];
}
/**
 * 智能地从字符串中移除各种风格的注释，同时保留字符串字面量中的内容。
 *
 * **工作原理**:
 * 该函数通过一个小型状态机来逐字解析输入字符串。它维护一个 `inString` 状态，
 * 用于判断当前字符是否位于一个双引号包裹的字符串内部。
 *
 * 1. 当检测到进入或退出一个字符串时（通过非转义的双引号 `"`），`inString` 状态会翻转。
 * 2. 如果 `inString` 为 `true`，则所有字符都会被无条件地保留。这确保了字符串值（如 URL）中的 `//` 或 `/*` 不会被当作注释处理。
 * 3. 如果 `inString` 为 `false`，函数会检查是否存在注释标记（`//`, `/*`, `<!--`）。
 * 4. 如果找到注释标记，函数会向前扫描直到注释结束，并跳过这部分内容。
 * 5. 如果没有找到注释，则将当前字符追加到结果中。
 *
 * @param str - 待处理的字符串。
 * @returns 移除了注释的字符串。
 */
function stripComments(str) {
    if (!str)
        return '';
    let result = '';
    let inString = false; // 状态：是否在字符串内部
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // 检查是否进入或退出字符串。忽略转义的双引号 `\"`。
        if (char === '"' && (i === 0 || str[i - 1] !== '\\')) {
            inString = !inString;
        }
        // 如果在字符串内部，直接追加字符，不进行任何注释检查。
        if (inString) {
            result += char;
            continue;
        }
        // --- 只有在字符串外部时，才进行注释检查 ---
        const nextChar = str[i + 1];
        // 检查行注释 `//`
        if (char === '/' && nextChar === '/') {
            const endOfLine = str.indexOf('\n', i + 2);
            if (endOfLine === -1) {
                // 如果没有换行符，说明注释直到字符串末尾，直接结束循环。
                break;
            }
            // 保留换行符，并将索引 `i` 快进到行尾。
            result += '\n';
            i = endOfLine;
            continue;
        }
        // 检查块注释 `/* ... */`
        if (char === '/' && nextChar === '*') {
            const endOfComment = str.indexOf('*/', i + 2);
            if (endOfComment === -1) {
                // 未闭合的注释，忽略剩余所有内容。
                break;
            }
            // 将索引 `i` 快进到注释结尾。
            i = endOfComment + 1;
            continue;
        }
        // 检查 HTML 注释 `<!-- ... -->`
        if (char === '<' && str.substring(i, i + 4) === '<!--') {
            const endOfComment = str.indexOf('-->', i + 4);
            if (endOfComment === -1) {
                // 未闭合的注释。
                break;
            }
            i = endOfComment + 2;
            continue;
        }
        // 如果不是注释，则保留该字符。
        result += char;
    }
    return result;
}
/**
 * 解析一个包含多个串联 JSON 对象的字符串（类似于 JSONL 格式）。
 * 这种格式有时会由 AI 生成。此函数能够逐个提取并解析它们。
 *
 * @param {string} str - 待解析的字符串。
 * @returns {any[]} 解析出的对象数组。
 */
function parseJsonl(str) {
    const objects = [];
    if (!str || typeof str !== 'string') {
        return objects;
    }
    // 在解析 JSON 之前，必须先安全地移除所有注释。
    // 不能使用简单的正则表达式（如 `/\/\/.*/g`），因为它无法区分代码中的注释和字符串值（如 URL "https://..."）中的 `//`，
    // 会错误地破坏 JSON 字符串的结构。`stripComments` 函数通过状态管理解决了这个问题。
    const strWithoutComments = stripComments(str);
    const trimmedStr = strWithoutComments.trim();
    let braceCount = 0; // 花括号平衡计数器
    let startIndex = -1; // 当前 JSON 对象的起始索引
    let inString = false; // 标记是否处于双引号字符串内部
    for (let i = 0; i < trimmedStr.length; i++) {
        const char = trimmedStr[i];
        // 切换 inString 状态，忽略转义的双引号
        if (char === '"' && (i === 0 || trimmedStr[i - 1] !== '\\')) {
            inString = !inString;
        }
        // 如果在字符串内部，则跳过所有花括号的逻辑判断
        if (inString)
            continue;
        if (char === '{') {
            if (braceCount === 0) {
                // 发现一个新 JSON 对象的开始
                startIndex = i;
            }
            braceCount++;
        }
        else if (char === '}') {
            if (braceCount > 0) {
                braceCount--;
                if (braceCount === 0 && startIndex !== -1) {
                    // 花括号平衡，一个完整的 JSON 对象被找到
                    const jsonString = trimmedStr.substring(startIndex, i + 1);
                    try {
                        const obj = JSON.parse(jsonString);
                        objects.push(obj);
                    }
                    catch (e) {
                        // 如果解析失败，记录错误并继续，不中断整个过程
                        logger.error(`JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, e);
                    }
                    // 重置状态，准备寻找下一个对象
                    startIndex = -1;
                }
            }
        }
    }
    return objects;
}


/***/ }),

/***/ "./src/ERA变量框架/utils/era_data.ts":
/*!***************************************!*\
  !*** ./src/ERA变量框架/utils/era_data.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEraData: () => (/* binding */ getEraData),
/* harmony export */   removeMetaFields: () => (/* binding */ removeMetaFields),
/* harmony export */   updateEraMetaData: () => (/* binding */ updateEraMetaData),
/* harmony export */   updateEraStatData: () => (/* binding */ updateEraStatData)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/ERA变量框架/utils/constants.ts");
/**
 * @file ERA 变量框架 - ERA 核心变量读写模块
 */



/**
 * 递归地从对象中移除所有以 `$` 开头的字段（如 `$meta`, `$template`）。
 * 此函数会创建一个对象的深拷贝，因此不会修改原始对象。
 * @param {any} obj - 待处理的对象或值。
 * @returns {any} 一个不包含 `$` 前缀字段的新对象或原始值。
 */
function removeMetaFields(obj) {
    // 对于非对象类型，直接返回原始值
    if (!lodash__WEBPACK_IMPORTED_MODULE_0___default().isObject(obj)) {
        return obj;
    }
    // 创建深拷贝以避免修改原始对象
    const newObj = lodash__WEBPACK_IMPORTED_MODULE_0___default().cloneDeep(obj);
    function recurse(current) {
        if (Array.isArray(current)) {
            // 如果是数组，则递归处理数组中的每个元素
            current.forEach(item => recurse(item));
        }
        else if (lodash__WEBPACK_IMPORTED_MODULE_0___default().isPlainObject(current)) {
            // 如果是纯粹的对象，遍历其所有键
            for (const key in current) {
                // 如果键以 '$' 开头，则删除该属性
                if (key.startsWith('$')) {
                    delete current[key];
                }
                else {
                    // 否则，递归处理该属性的值
                    recurse(current[key]);
                }
            }
        }
    }
    recurse(newObj);
    return newObj;
}
/**
 * 获取并确保 ERA 的元数据和状态数据对象的存在。
 * @returns {{meta: object, stat: object}} 包含元数据和状态数据的对象。
 */
function getEraData() {
    const chatVars = getVariables(_constants__WEBPACK_IMPORTED_MODULE_1__.CHAT_SCOPE) || {};
    const meta = lodash__WEBPACK_IMPORTED_MODULE_0___default().get(chatVars, _constants__WEBPACK_IMPORTED_MODULE_1__.META_DATA_PATH, {});
    const stat = lodash__WEBPACK_IMPORTED_MODULE_0___default().get(chatVars, _constants__WEBPACK_IMPORTED_MODULE_1__.STAT_DATA_PATH, {});
    return { meta, stat };
}
/**
 * 原子性地更新 ERA 的状态数据 (stat_data)。
 * @param {(currentStatData: any) => (any | Promise<any>)} updater - 一个接收当前 stat_data 并返回修改后 stat_data 的函数 (可以是 async)。
 */
async function updateEraStatData(updater) {
    await updateVariablesWith(async (v) => {
        const currentStat = lodash__WEBPACK_IMPORTED_MODULE_0___default().get(v, _constants__WEBPACK_IMPORTED_MODULE_1__.STAT_DATA_PATH, {});
        const newStat = await updater(currentStat);
        lodash__WEBPACK_IMPORTED_MODULE_0___default().set(v, _constants__WEBPACK_IMPORTED_MODULE_1__.STAT_DATA_PATH, newStat);
        return v;
    }, _constants__WEBPACK_IMPORTED_MODULE_1__.CHAT_SCOPE);
}
/**
 * 原子性地更新 ERA 的元数据 (ERAMetaData)。
 * @param {(currentMetaData: any) => (any | Promise<any>)} updater - 一个接收当前 ERAMetaData 并返回修改后 ERAMetaData 的函数 (可以是 async)。
 */
async function updateEraMetaData(updater) {
    await updateVariablesWith(async (v) => {
        const currentMeta = lodash__WEBPACK_IMPORTED_MODULE_0___default().get(v, _constants__WEBPACK_IMPORTED_MODULE_1__.META_DATA_PATH, {});
        const newMeta = await updater(currentMeta);
        lodash__WEBPACK_IMPORTED_MODULE_0___default().set(v, _constants__WEBPACK_IMPORTED_MODULE_1__.META_DATA_PATH, newMeta);
        return v;
    }, _constants__WEBPACK_IMPORTED_MODULE_1__.CHAT_SCOPE);
}


/***/ }),

/***/ "./src/ERA变量框架/utils/log.ts":
/*!**********************************!*\
  !*** ./src/ERA变量框架/utils/log.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logger: () => (/* binding */ Logger),
/* harmony export */   logContext: () => (/* binding */ logContext)
/* harmony export */ });
/**
 * @file ERA 变量框架 - 日志记录模块 (V3 - 规则分离版)
 */

// --- 新的运行时调试配置系统 (V3) ---
/**
 * @constant {string} DEBUG_CONFIG_LS_KEY
 * @description 用于在 localStorage 中存储调试配置的键名。
 */
const DEBUG_CONFIG_LS_KEY = 'era_debug_config';
let enabledPatterns = [];
let disabledPatterns = [];
/**
 * @typedef {object} DebugConfig
 * @property {string[]} enabled - 启用的模式列表。
 * @property {string[]} disabled - 禁用的模式列表。
 */
/**
 * 从 localStorage 加载并解析调试配置。
 */
function loadDebugConfig() {
    try {
        const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
        /** @type {DebugConfig} */
        const config = JSON.parse(configStr);
        const toRegex = (p) => new RegExp(`^${p.replace(/\*/g, '.*?')}$`);
        enabledPatterns = (config.enabled || []).map(toRegex);
        disabledPatterns = (config.disabled || []).map(toRegex);
    }
    catch (e) {
        console.error('《ERA-Log》: 加载调试配置失败。', e);
        enabledPatterns = [];
        disabledPatterns = [];
    }
}
/**
 * 检查给定的模块名是否应该输出 debug 日志。
 * @param {string} moduleName - 要检查的模块名。
 * @returns {boolean} - 如果允许输出则返回 true。
 */
function isDebugEnabled(moduleName) {
    if (!moduleName)
        return false;
    // 规则 1: 如果匹配任何一个“禁用”模式，则绝对禁用。
    if (disabledPatterns.some(re => re.test(moduleName))) {
        return false;
    }
    // 规则 2: 如果“启用”列表为空，则全部禁用。
    if (enabledPatterns.length === 0) {
        return false;
    }
    // 规则 3: 如果匹配任何一个“启用”模式，则启用。
    if (enabledPatterns.some(re => re.test(moduleName))) {
        return true;
    }
    return false;
}
/**
 * 更新并保存调试配置。
 * @param {{ enabled: string[], disabled: string[] }} newConfig
 */
function updateConfig(newConfig) {
    const uniqueConfig = {
        enabled: [...new Set(newConfig.enabled)],
        disabled: [...new Set(newConfig.disabled)],
    };
    globalThis.localStorage?.setItem(DEBUG_CONFIG_LS_KEY, JSON.stringify(uniqueConfig));
    loadDebugConfig();
    console.log(`%c《ERA-Log》调试模式已更新。`, 'color: #3498db; font-weight: bold;', {
        '启用 (Enabled)': uniqueConfig.enabled,
        '禁用 (Disabled)': uniqueConfig.disabled,
    });
}
// 初始化配置
loadDebugConfig();
// 将控制对象暴露到全局
if (typeof globalThis !== 'undefined') {
    const eraDebug = {
        /**
         * 将一个模式添加到“启用列表”，使其匹配的模块显示日志。
         * 这也会从“禁用列表”中移除该模式。
         * @param {string} pattern - 要启用的模式，支持 * 通配符。
         * @example
         * // 开启所有 core 开头的模块
         * eraDebug.add('core*')
         */
        add(pattern) {
            const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
            const config = JSON.parse(configStr);
            const enabled = new Set(config.enabled || []);
            const disabled = new Set(config.disabled || []);
            enabled.add(pattern);
            disabled.delete(pattern);
            updateConfig({ enabled: Array.from(enabled), disabled: Array.from(disabled) });
        },
        /**
         * 将一个模式添加到“禁用列表”，使其匹配的模块不显示日志。
         * 这也会从“启用列表”中移除该模式。
         * @param {string} pattern - 要禁用的模式，支持 * 通配符。
         * @example
         * // 禁用 core-key 模块
         * eraDebug.remove('core-key')
         */
        remove(pattern) {
            const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
            const config = JSON.parse(configStr);
            const enabled = new Set(config.enabled || []);
            const disabled = new Set(config.disabled || []);
            disabled.add(pattern);
            enabled.delete(pattern);
            updateConfig({ enabled: Array.from(enabled), disabled: Array.from(disabled) });
        },
        /**
         * 查看当前的调试配置。
         */
        status() {
            const configStr = globalThis.localStorage?.getItem(DEBUG_CONFIG_LS_KEY) || '{"enabled":[],"disabled":[]}';
            const config = JSON.parse(configStr);
            console.log(`%c《ERA-Log》当前调试配置:`, 'color: #3498db; font-weight: bold;', config);
        },
        /**
         * 清空所有调试规则。
         */
        clear() {
            updateConfig({ enabled: [], disabled: [] });
        },
    };
    globalThis.eraDebug = eraDebug;
}
// --- Logger 类 ---
/**
 * @class Logger
 * @description 一个为 ERA 框架设计的、支持动态配置的日志记录器。
 *
 * **核心功能**:
 * 1. **动态调试**: 可通过浏览器控制台 `eraDebug('...')` 命令在运行时开启/关闭指定模块的 `debug` 日志。
 * 2. **统一格式**: 所有日志都遵循 `《ERA》「模块名」【函数名】日志内容` 的格式。
 * 3. **自动模块名**: 自动从调用栈解析模块名，推荐在每个文件中创建独立的 logger 实例以保证准确性。
 *    例如: `const logger = new Logger();`
 */
const logContext = {
    mk: '',
};
class Logger {
    moduleName;
    constructor(moduleName) {
        if (moduleName) {
            this.moduleName = moduleName;
        }
        else {
            // 自动从调用栈获取模块名，能有效避免因实例共享导致的模块名不准问题
            this.moduleName = this._getModuleNameFromStack() || 'unknown';
        }
    }
    _getModuleNameFromStack() {
        try {
            const stack = new Error().stack || '';
            // 智能寻找调用者：遍历堆栈，找到第一个不属于 log.ts 的、包含项目路径的行
            const callerLine = stack
                .split('\n')
                .find(line => line.includes('/src/ERA变量框架/') && !line.includes('/utils/log.ts'));
            if (!callerLine) {
                // 如果找不到，优雅降级
                return null;
            }
            // 更鲁棒的正则，用于从不同格式的堆栈行中提取路径
            const match = callerLine.match(/src\/ERA变量框架\/([^?:\s)]+)/);
            if (!match || !match[1]) {
                // 如果正则匹配失败，优雅降级
                return null;
            }
            let path = match[1];
            // 移除文件扩展名
            path = path.replace(/\.(vue|ts|js)$/, '');
            // 将 'src/ERA变量框架/' 替换为空，并用 '-' 替换 '/'
            return path
                .replace(/^src\/ERA变量框架\//, '')
                .replace(/\/index$/, '')
                .replace(/\//g, '-');
        }
        catch (e) {
            console.error('《ERA-Log-Debug》: 解析模块名时发生意外错误。', e);
            return null;
        }
    }
    formatMessage(funcName, message) {
        const mkString = logContext.mk ? `（${logContext.mk}）` : '';
        return `《ERA》${mkString}「${this.moduleName}」【${funcName}】${String(message)}`;
    }
    debug(funcName, message, obj) {
        if (!isDebugEnabled(this.moduleName)) {
            return;
        }
        const formattedMessage = this.formatMessage(funcName, message);
        if (obj !== undefined) {
            console.debug(formattedMessage, obj);
        }
        else {
            console.debug(formattedMessage);
        }
    }
    log(funcName, message, obj) {
        const formattedMessage = this.formatMessage(funcName, message);
        if (obj !== undefined) {
            console.log(`%c${formattedMessage}`, 'color: #3498db;', obj);
        }
        else {
            console.log(`%c${formattedMessage}`, 'color: #3498db;');
        }
    }
    warn(funcName, message, obj) {
        const formattedMessage = this.formatMessage(funcName, message);
        if (obj !== undefined) {
            console.warn(`%c${formattedMessage}`, 'color: #f39c12;', obj);
        }
        else {
            console.warn(`%c${formattedMessage}`, 'color: #f39c12;');
        }
    }
    error(funcName, message, errorObj) {
        const formattedMessage = this.formatMessage(funcName, message);
        if (errorObj !== undefined) {
            console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;', errorObj);
        }
        else {
            console.error(`%c${formattedMessage}`, 'color: #e74c3c; font-weight: bold;');
        }
    }
}


/***/ }),

/***/ "./src/ERA变量框架/utils/message.ts":
/*!**************************************!*\
  !*** ./src/ERA变量框架/utils/message.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findLastAiMessage: () => (/* binding */ findLastAiMessage),
/* harmony export */   getMessageContent: () => (/* binding */ getMessageContent),
/* harmony export */   isUserMessage: () => (/* binding */ isUserMessage),
/* harmony export */   updateMessageContent: () => (/* binding */ updateMessageContent)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/ERA变量框架/utils/constants.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log */ "./src/ERA变量框架/utils/log.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text */ "./src/ERA变量框架/utils/text.ts");
/**
 * @file ERA 变量框架 - 消息处理模块
 * @description
 * 该文件提供了一系列用于处理、查询和更新酒馆消息对象的通用辅助函数。
 */




const log = new _log__WEBPACK_IMPORTED_MODULE_1__.Logger();
// ==================================================================
// 消息读取与解析
// ==================================================================
/**
 * **【获取消息内容】** 从酒馆的消息对象中安全地提取当前激活（被选中）的消息内容字符串。
 * 这个函数是 ERA 中所有消息内容读取的唯一入口，以确保逻辑统一和健壮性。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {string | null} 当前激活的消息内容；如果无法获取，则返回 null。
 */
function getMessageContent(msg) {
    if (!msg)
        return null;
    let content = null;
    // 优先检查 .mes 属性，这是新版酒馆的规范
    if (typeof msg.mes === 'string') {
        content = msg.mes;
    }
    // 如果没有 .mes，则处理 swipes
    else if (Array.isArray(msg.swipes)) {
        const sid = Number(msg.swipe_id ?? 0);
        content = msg.swipes[sid] || null;
    }
    // 最后，作为兼容，检查旧版的 .message 属性
    else if (typeof msg.message === 'string') {
        content = msg.message;
    }
    if (content === null) {
        return null;
    }
    // 在返回内容前进行宏替换。
    // 这样做是因为酒馆自身的宏替换行为不一致：有时（如消息流式生成后）会替换，
    // 但有时（如聊天记录刚加载时）则不会，这会导致读取到的内容状态混乱。
    // 因此，我们统一在获取消息时手动执行一次宏替换，以确保数据的一致性。
    return (0,_text__WEBPACK_IMPORTED_MODULE_2__.parseCharacterMacros)(content);
}
/**
 * 从消息内容字符串中解析出 `EraData` 对象。这是一个只读操作。
 * @param {string | null | undefined} messageContent - 消息的内容字符串。
 * @returns {EraData | null} 解析成功则返回 `EraData` 对象，否则返回 null。
 */
function parseEraData(messageContent) {
    if (typeof messageContent !== 'string') {
        return null;
    }
    const match = messageContent.match(_constants__WEBPACK_IMPORTED_MODULE_0__.ERA_DATA_REGEX);
    if (!match || !match[1]) {
        return null;
    }
    try {
        // 由于 MK 块内部是自定义的 `{"key"="value"}` 格式，不能使用 JSON.parse。
        // 必须使用正则表达式进行宽松匹配来提取键值。
        const customFormatBlock = match[1];
        const keyMatch = customFormatBlock.match(/"era-message-key"\s*=\s*"(.*?)"/);
        const typeMatch = customFormatBlock.match(/"era-message-type"\s*=\s*"(.*?)"/);
        if (keyMatch?.[1] && typeMatch?.[1]) {
            const eraData = {
                'era-message-key': keyMatch[1],
                'era-message-type': typeMatch[1],
            };
            log.debug('parseEraData', '成功解析 EraData', eraData);
            return eraData;
        }
        log.debug('parseEraData', '未能在 EraData 块中找到完整的键值对', { customFormatBlock });
        return null;
    }
    catch (e) {
        log.warn('parseEraData', '解析 EraData 块时发生异常', e);
        return null;
    }
}
/**
 * **【判断消息类型】** 根据消息内容中的 `era-message-type` 元数据或 `role` 属性判断是否为用户消息。
 * 优先信任注入的元数据。
 * @param {TavernMessage} msg - 酒馆消息对象。
 * @returns {boolean} 如果是用户消息，则返回 true。
 */
function isUserMessage(msg) {
    const content = getMessageContent(msg);
    const data = parseEraData(content);
    if (data) {
        return data['era-message-type'] === 'user';
    }
    // 回退到检查 role 属性
    return msg?.role === 'user';
}
/**
 * 从后向前查找并返回最后一条 AI 消息。
 * @returns {TavernMessage | null} 找到的 AI 消息对象，如果找不到则返回 null。
 */
function findLastAiMessage() {
    const messages = getChatMessages('0-{{lastMessageId}}', { include_swipes: true });
    if (!messages || messages.length === 0) {
        log.debug('findLastAiMessage', '聊天记录为空, 未找到任何消息。');
        return null;
    }
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (!isUserMessage(msg)) {
            log.debug('findLastAiMessage', `找到最后一条 AI 消息, ID: ${msg.message_id}`);
            return msg;
        }
    }
    log.debug('findLastAiMessage', '未在聊天记录中找到任何 AI 消息。');
    return null;
}
// ==================================================================
// 消息写入
// ==================================================================
/**
 * **【通用】** 更新指定消息的内容。
 * 这个辅助函数封装了处理 `swipes` 和普通 `message` 的逻辑，提供一个统一的写入接口。
 * @param {any} message - 要更新的消息对象。
 * @param {string} newContent - 全新的消息内容。
 */
async function updateMessageContent(message, newContent) {
    const oldContent = getMessageContent(message);
    log.debug('updateMessageContent', '更新前的消息内容:', oldContent);
    log.debug('updateMessageContent', '更新后的消息内容:', newContent);
    const updatePayload = {
        message_id: message.message_id,
    };
    if (Array.isArray(message.swipes)) {
        const sid = Number(message.swipe_id ?? 0);
        const newSwipes = [...message.swipes];
        newSwipes[sid] = newContent;
        updatePayload.swipes = newSwipes;
    }
    else {
        updatePayload.message = newContent;
    }
    await setChatMessages([updatePayload], { refresh: 'none' });
}


/***/ }),

/***/ "./src/ERA变量框架/utils/string.ts":
/*!*************************************!*\
  !*** ./src/ERA变量框架/utils/string.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsXMLTags: () => (/* binding */ containsXMLTags),
/* harmony export */   createTagRegex: () => (/* binding */ createTagRegex),
/* harmony export */   extractBlocksByRegex: () => (/* binding */ extractBlocksByRegex),
/* harmony export */   extractValidBlocks: () => (/* binding */ extractValidBlocks),
/* harmony export */   removeTagsByRegex: () => (/* binding */ removeTagsByRegex),
/* harmony export */   rnd: () => (/* binding */ rnd),
/* harmony export */   stripCodeFence: () => (/* binding */ stripCodeFence)
/* harmony export */ });
/**
 * @file ERA 变量框架 - 字符串处理模块
 */

/**
 * 生成一个指定长度的随机字符串，用作唯一标识符。
 * @returns {string} 一个随机的、由数字和小写字母组成的字符串。
 */
function rnd() {
    return Math.random().toString(36).slice(2, 8);
}
/**
 * 从字符串中移除 AI 生成的 Markdown 代码块围栏（如 ```json ... ```）。
 * @param {string} s - 待处理的字符串。
 * @returns {string} 移除围栏并修剪首尾空格后的字符串。
 */
function stripCodeFence(s) {
    if (!s)
        return s;
    let t = String(s).trim();
    t = t.replace(/^\s*(?:```|~~~)\[a-zA-Z0-9_-\]*\s*\r?\n/, '');
    t = t.replace(/\r?\n(?:```|~~~)\s*$/, '');
    return t.trim();
}
/**
 * 辅助函数：根据关键字和模式创建用于匹配标签名的正则表达式。
 * @param {string} [keyword=''] - 标签关键字。
 * @param {TagMatchMode} [mode='exact'] - 匹配模式。
 * @returns {RegExp} 生成的正则表达式。
 */
function createTagRegex(keyword = '', mode = 'exact') {
    if (mode === 'any' || keyword === '*') {
        return /([a-zA-Z][a-zA-Z0-9_]*)/;
    }
    // 对 keyword 进行转义，防止特殊字符影响正则
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    switch (mode) {
        case 'exact':
            return new RegExp(`(${escapedKeyword})`);
        case 'prefix':
            return new RegExp(`(${escapedKeyword}[a-zA-Z0-9_]*)`);
        case 'suffix':
            return new RegExp(`([a-zA-Z0-9_]*${escapedKeyword})`);
        case 'contains':
        default:
            return new RegExp(`([a-zA-Z0-9_]*${escapedKeyword}[a-zA-Z0-9_]*)`);
    }
}
/**
 * 核心函数：从文本尾部开始，使用正则表达式反向查找第一个完整闭合的标签。
 * @param {string} text - 原始文本。
 * @param {RegExp} tagNameRegex - 用于匹配标签名的正则表达式，必须包含一个捕获组。
 * @param {number} [endIndex=text.length] - 开始搜索的位置。
 * @returns {{startIndex: number, endIndex: number, content: string, tagName: string} | null} 包含起止索引、内容和完整标签名的对象，或 null。
 */
function findTagFromEndByRegex(text, tagNameRegex, endIndex = text.length) {
    const closeTagRegex = new RegExp(`</${tagNameRegex.source}>`, 'g');
    let lastMatch = null;
    let currentMatch;
    // 1. 找到最后一个在 endIndex 之前的闭合标签
    while ((currentMatch = closeTagRegex.exec(text)) !== null) {
        if (currentMatch.index < endIndex) {
            lastMatch = currentMatch;
        }
        else {
            break;
        }
    }
    if (!lastMatch) {
        return null;
    }
    const tagName = lastMatch[1];
    const closeIndex = lastMatch.index;
    // 2. 用找到的完整标签名，反向查找对应的开标签
    const openTag = `<${tagName}>`;
    const openIndex = text.lastIndexOf(openTag, closeIndex);
    if (openIndex === -1) {
        // 如果找不到匹配的开标签，则从这个闭合标签前继续递归搜索
        return findTagFromEndByRegex(text, tagNameRegex, closeIndex);
    }
    return {
        startIndex: openIndex,
        endIndex: closeIndex + `</${tagName}>`.length,
        content: text.substring(openIndex + openTag.length, closeIndex),
        tagName: tagName,
    };
}
/**
 * 从文本中移除指定的 XML 标签及其内容，支持正则匹配。
 * @param {string} text - 原始文本。
 * @param {RegExp} tagNameRegex - 用于匹配要移除的标签名的正则表达式。
 * @returns {string} 移除标签后的文本。
 */
function removeTagsByRegex(text, tagNameRegex) {
    let processedText = text;
    while (true) {
        const found = findTagFromEndByRegex(processedText, tagNameRegex);
        if (!found) {
            break;
        }
        processedText = processedText.slice(0, found.startIndex) + processedText.slice(found.endIndex);
    }
    return processedText;
}
/**
 * 检查字符串中是否包含 XML 风格的标签，支持正则匹配。
 * @param {string} text - 要检查的字符串。
 * @param {RegExp} [tagNameRegex] - 用于匹配标签名的正则表达式。如果未提供，则检查任何标签。
 * @returns {boolean} 如果包含则返回 true，否则返回 false。
 */
function containsXMLTags(text, tagNameRegex) {
    const regex = tagNameRegex ? new RegExp(`</?${tagNameRegex.source}>`) : /<\/?\s*[a-zA-Z][a-zA-Z0-9_]*\s*>/;
    return regex.test(text);
}
/**
 * 从文本尾部开始，反向提取所有被特定 XML 风格标签包裹的、完整闭合的内容块，支持正则匹配。
 * @param {string} text - 包含标签的原始文本。
 * @param {RegExp} tagNameRegex - 用于匹配要提取的标签名的正则表达式。
 * @returns {string[]} 包含所有提取内容的数组，顺序与在文本中出现的顺序一致。
 */
function extractBlocksByRegex(text, tagNameRegex) {
    const blocks = [];
    let searchIndex = text.length;
    while (searchIndex > 0) {
        const found = findTagFromEndByRegex(text, tagNameRegex, searchIndex);
        if (!found) {
            break;
        }
        blocks.unshift(found.content); // 保持原始顺序
        searchIndex = found.startIndex;
    }
    return blocks;
}
/**
 * 从文本中安全地提取所有有效、闭合的特定标签内容块。
 * 这是推荐使用的主要提取函数。
 *
 * @param {string} text - 包含标签的原始文本。
 * @param {RegExp} targetTagNameRegex - 用于匹配目标标签名的正则表达式。
 * @returns {string[]} 包含所有有效内容块的数组。
 */
function extractValidBlocks(text, targetTagNameRegex) {
    // 1. 预处理：移除所有包含 "think" 的标签块
    const thinkRegex = createTagRegex('think', 'contains');
    const processedText = removeTagsByRegex(text, thinkRegex);
    // 2. 提取：从尾部开始查找目标 tag，确保标签闭合
    const extracted = extractBlocksByRegex(processedText, targetTagNameRegex);
    const validBlocks = [];
    for (const block of extracted) {
        // 3. 清理和校验
        const cleanedBlock = stripCodeFence(block.trim());
        // 校验：如果内部还包含任何XML标签，则丢弃
        if (containsXMLTags(cleanedBlock)) {
            continue;
        }
        if (cleanedBlock) {
            validBlocks.push(cleanedBlock);
        }
    }
    return validBlocks;
}


/***/ }),

/***/ "./src/ERA变量框架/utils/text.ts":
/*!***********************************!*\
  !*** ./src/ERA变量框架/utils/text.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepParseCharacterMacros: () => (/* binding */ deepParseCharacterMacros),
/* harmony export */   parseCharacterMacros: () => (/* binding */ parseCharacterMacros)
/* harmony export */ });
/**
 * 解析字符串中的角色和用户宏, 并将其替换为对应的名称。
 * 这是提供给其他模块调用的公共接口。
 * @param text - 包含宏的输入字符串。
 * @returns - 替换宏后的字符串。
 */
function parseCharacterMacros(text) {
    // 如果文本中不包含宏特征字符串, 直接返回以优化性能
    if (!text.includes('{{')) {
        return text;
    }
    let result = text;
    // 使用全局不区分大小写的替换
    result = result.replace(/{{user}}/gi, SillyTavern.name1);
    result = result.replace(/{{char}}/gi, SillyTavern.name2);
    return result;
}
/**
 * 深度遍历数据, 对所有字符串类型的值应用 parseCharacterMacros 宏替换。
 * @param data - 任何类型的数据。
 * @returns - 经过宏替换后的数据。
 */
const deepParseCharacterMacros = (data) => {
    if (typeof data === 'string') {
        return parseCharacterMacros(data);
    }
    if (Array.isArray(data)) {
        return data.map(item => deepParseCharacterMacros(item));
    }
    if (typeof data === 'object' && data !== null) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = deepParseCharacterMacros(value);
            return acc;
        }, {});
    }
    return data;
};


/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/***/ ((module) => {

module.exports = _;

/***/ }),

/***/ "pinia":
/*!****************************************************************!*\
  !*** external "https://testingcf.jsdelivr.net/npm/pinia/+esm" ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_npm_pinia_esm_b723a504__;

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = Vue;

/***/ }),

/***/ "zod":
/*!********************!*\
  !*** external "z" ***!
  \********************/
/***/ ((module) => {

module.exports = z;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/ERA变量框架/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_merger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/merger */ "./src/ERA变量框架/events/merger.ts");
/* harmony import */ var _events_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/queue */ "./src/ERA变量框架/events/queue.ts");
/* harmony import */ var _macro_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./macro/parser */ "./src/ERA变量框架/macro/parser.ts");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/ERA变量框架/ui/index.ts");
/**
 * @file ERA 变量框架 - 主入口与事件监听模块
 * @description
 * 该文件是整个 ERA 变量框架的起点。它的职责非常清晰和专一：
 * 1. **定义监听范围**: 声明框架所关心的所有事件类型。
 * 2. **注册监听器**: 为上述所有事件注册监听器。
 * 3. **统一派发**: 当任何一个被监听的事件触发时，它不进行任何逻辑处理，
 *    而是立即将该事件（包括事件类型和附带数据）原封不动地推入到 `event_queue.ts`
 *    中的事件处理队列中。
 *
 * 这种设计体现了良好的**关注点分离**原则：`index.ts` 只负责“听”，而 `event_queue.ts`
 * 负责“思考”和“行动”。这使得事件的来源和处理逻辑完全解耦，非常清晰且易于维护。
 */



// 导入查询模块, 以注册 {{ERA:...}} 宏

// 导入 UI 模块

// ===============================
// 事件监听器注册
// ===============================
/**
 * @const {string[]} eventsToListen
 * @description 定义了所有需要被 ERA 框架监听的事件。
 */
const eventsToListen = [
    ..._events_merger__WEBPACK_IMPORTED_MODULE_0__.EVENT_GROUPS.INIT,
    ..._events_merger__WEBPACK_IMPORTED_MODULE_0__.EVENT_GROUPS.SYNC,
    ..._events_merger__WEBPACK_IMPORTED_MODULE_0__.EVENT_GROUPS.API,
    ..._events_merger__WEBPACK_IMPORTED_MODULE_0__.EVENT_GROUPS.UPDATE_MK_ONLY,
    ..._events_merger__WEBPACK_IMPORTED_MODULE_0__.EVENT_GROUPS.COLLISION_DETECTORS,
    ..._events_merger__WEBPACK_IMPORTED_MODULE_0__.EVENT_GROUPS.COMBO_STARTERS,
];
// 遍历事件列表，为每个事件注册一个回调函数。
// 这个回调函数是所有事件的统一入口。
eventsToListen.forEach(ev => {
    // `eventOn` 是酒馆助手提供的全局函数，用于注册事件监听。
    // 当事件 `ev` 触发时，回调函数被调用，并将事件类型 `ev` 和事件详情 `detail` 推入队列。
    eventOn(ev, (detail) => (0,_events_queue__WEBPACK_IMPORTED_MODULE_1__.pushToQueue)(ev, detail));
});
// 为酒馆助手脚本界面中的手动按钮注册监听器。
// 点击按钮时，同样是向队列中推入一个特定类型的事件。
eventOn(getButtonEvent('写入变量修改'), () => (0,_events_queue__WEBPACK_IMPORTED_MODULE_1__.pushToQueue)('manual_write'));
eventOn(getButtonEvent('手动同步状态'), () => (0,_events_queue__WEBPACK_IMPORTED_MODULE_1__.pushToQueue)('manual_sync'));
eventOn(getButtonEvent('强制完全重算'), () => (0,_events_queue__WEBPACK_IMPORTED_MODULE_1__.pushToQueue)('manual_full_sync'));

})();


//# sourceMappingURL=index.js.map
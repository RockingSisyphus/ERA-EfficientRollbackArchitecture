<template>
  <div class="json-root">
    <div class="json-line">
      <span class="brace">{{ rootOpen }}</span>
      <!-- 根开括号：对象{ / 数组[ -->
    </div>

    <div class="json-children">
      <template v-if="isPlainObjectOrArray">
        <JsonNode
          v-for="(v, k) in value"
          :key="String(k)"
          :k="String(k)"
          :v="v"
          :path="String(k)"
          :level="1"
          :default-collapsed="defaultCollapsed"
          :max-depth="maxDepth"
        />
      </template>

      <template v-else>
        <div class="json-line" :style="{ paddingLeft: 1 * 14 + 'px' }">
          <span class="key">value</span><span class="colon">:</span>
          <span class="val" :class="primitiveType">{{ primitiveText }}</span>
        </div>
      </template>
    </div>

    <div class="json-line">
      <span class="brace">{{ rootClose }}</span>
      <!-- 根闭括号：对象} / 数组] -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // 计算属性工具
import { Logger } from '../../../../utils/log';
import JsonNode from './JsonNode.vue'; // ✅ 改为导入独立 SFC 的递归节点组件

const logger = new Logger();

const props = withDefaults(
  defineProps<{
    value: any; // 要展示的 JSON 值
    defaultCollapsed?: boolean; // 默认是否折叠
    maxDepth?: number; // 初次展开最大层数
  }>(),
  {
    defaultCollapsed: true, // 默认折叠
    maxDepth: 3, // 默认展开到 3 层
  },
);

const isPlainObjectOrArray = computed(() => {
  const v = props.value; // 取入参值
  const result = v !== null && typeof v === 'object'; // 仅对象/数组才进入逐键渲染
  logger.debug('isPlainObjectOrArray', `计算结果: ${result}。该值${result ? '是' : '不是'}普通对象或数组。`, {
    传入值: v,
  });
  return result;
}); // 是否对象/数组

const primitiveType = computed(() => {
  const v = props.value; // 取入参值
  let result: string;
  if (v === null) {
    result = 'null';
  } else if (Array.isArray(v)) {
    result = 'array'; // 数组（不会走到该分支，因为上面 isPlainObjectOrArray 判断过）
  } else {
    const t = typeof v; // 原始类型
    result = t === 'undefined' ? 'undefined' : t;
  }
  logger.debug('primitiveType', `计算原始值类型: ${result}`, { 传入值: v });
  return result;
}); // 原始值类型名（用于着色）

const primitiveText = computed(() => {
  const v = props.value; // 取入参值
  let result: string;
  switch (
    primitiveType.value // 按类型格式化文本
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

const isArrayRoot = computed(() => {
  const result = Array.isArray(props.value);
  logger.debug('isArrayRoot', `计算根节点是否为数组: ${result}`, { 传入值: props.value });
  return result;
}); // 根是否数组
const rootOpen = computed(() => (isArrayRoot.value ? '[' : '{')); // 根开括号
const rootClose = computed(() => (isArrayRoot.value ? ']' : '}')); // 根闭括号
</script>

<style scoped>
.json-root {
  font-size: 12px;
  color: #111827;
}
.json-line {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 6px;
  border-radius: 6px;
}
.json-line:hover {
  background: rgba(59, 130, 246, 0.06);
}
.json-children {
  border-left: 1px dashed rgba(107, 114, 128, 0.25);
}

.key {
  color: #1f2937;
  font-weight: 700;
}
.colon {
  color: #6b7280;
}
.brace {
  color: #9ca3af;
}

.val.string {
  color: #047857;
}
.val.number {
  color: #7c3aed;
}
.val.boolean {
  color: #0369a1;
}
.val.null {
  color: #9ca3af;
}
.val.undefined {
  color: #9ca3af;
}

/* ===[新增] 防溢出：根与子容器都裁剪绘制，避免在外部容器高度为 0 时“透出” === */
.json-root {
  /* JSON 根容器：自身成为一个绘制边界 */
  overflow: clip; /* 裁剪一切溢出（比 hidden 更省性能、无滚动条） */
  contain: layout paint; /* 隔离布局与绘制，防外部高度计算误差 */
  min-height: 0; /* 防止 flex 场景 min-content 顶高父级 */
}

.json-children {
  /* 子区：同样裁剪，解决左侧虚线在收起时外露 */
  overflow: clip; /* 子级再保险裁剪 */
  contain: paint; /* 进一步隔离绘制 */
}
</style>

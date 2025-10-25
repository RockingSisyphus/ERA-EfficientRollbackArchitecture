<template>
  <div class="json-root">
    <div class="json-line">
      <span class="brace">{{ rootOpen }}</span>
      <!-- 根开括号：对象{ / 数组[ -->
    </div>

    <div class="json-children">
      <template v-if="isPlainObjectOrArray">
        <!-- 对象根：按键枚举 -->
        <template v-if="!isArrayRoot">
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

        <!-- 数组根：按索引枚举 -->
        <template v-else>
          <JsonNode
            v-for="(v, i) in value"
            :key="String(i)"
            :k="String(i)"
            :v="v"
            :path="String(i)"
            :level="1"
            :default-collapsed="defaultCollapsed"
            :max-depth="maxDepth"
          />
        </template>
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
import JsonNode from './JsonNode.vue'; // ✅ 改为导入独立 SFC 的递归节点组件

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
  return v !== null && typeof v === 'object'; // 仅对象/数组才进入逐键渲染
}); // 是否对象/数组

const primitiveType = computed(() => {
  const v = props.value; // 取入参值
  if (v === null) return 'null'; // null
  if (Array.isArray(v)) return 'array'; // 数组（不会走到该分支，因为上面判断过）
  const t = typeof v; // 原始类型
  return (t === 'undefined' ? 'undefined' : t) as string;
}); // 原始值类型名（用于着色）

const primitiveText = computed(() => {
  const v = props.value; // 取入参值
  switch (
    primitiveType.value // 按类型格式化文本
  ) {
    case 'string':
      return JSON.stringify(v); // 字符串带引号
    case 'number':
      return String(v); // 数字
    case 'boolean':
      return v ? 'true' : 'false'; // 布尔
    case 'null':
      return 'null'; // null
    case 'undefined':
      return 'undefined'; // undefined
    case 'bigint':
      return String(v) + 'n'; // bigint
    case 'symbol':
      return String(v); // symbol
    case 'function':
      return 'ƒ()'; // 函数
    default:
      return ''; // 兜底
  }
}); // 原始值文本

const isArrayRoot = computed(() => Array.isArray(props.value)); // 根是否数组
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
</style>
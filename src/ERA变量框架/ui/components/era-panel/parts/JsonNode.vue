<template>
  <!-- 单条节点（支持递归） -->
  <div class="node">
    <!-- 每个键值对 / 数组项的容器 -->
    <div class="json-line" :style="{ paddingLeft: level * 14 + 'px' }">
      <!-- 行+缩进 -->
      <button v-if="foldable" class="caret" :class="{ open }" aria-label="toggle" @click="open = !open">▸</button>
      <!-- 折叠箭头按钮 -->

      <span class="key">{{ k }}</span
      ><span class="colon">:</span>
      <!-- 键与冒号 -->

      <!-- 可折叠容器：只显示括号与摘要；展开后由下方 children 区域递归渲染 -->
      <template v-if="foldable">
        <span class="brace">{{ isArray ? '[' : '{' }}</span>
        <!-- 容器起始括号 -->
        <span v-if="!open" class="summary">{{ summary }}</span>
        <!-- 收起时的摘要 -->
      </template>

      <!-- 原始值：直接着色渲染 -->
      <template v-else>
        <span class="val" :class="type">{{ primitiveText }}</span>
        <!-- 原始值文本 -->
      </template>
    </div>

    <!-- 子元素区域：仅当可折叠且处于展开态时显示 -->
    <template v-if="foldable && open">
      <div class="json-children">
        <!-- 递归：自引用同名组件 JsonNode（依赖 name: 'JsonNode' 实现自递归） -->
        <JsonNode
          v-for="(childVal, childKey) in childEntries"
          :key="path + '/' + String(childKey)"
          :k="String(childKey)"
          :v="childVal"
          :path="path + '/' + String(childKey)"
          :level="level + 1"
          :default-collapsed="defaultCollapsed"
          :max-depth="maxDepth"
        />
        <div class="json-line" :style="{ paddingLeft: level * 14 + 'px' }">
          <span class="brace">{{ isArray ? ']' : '}' }}</span>
          <!-- 容器闭合括号 -->
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'; // 引入响应式/组件工具
import { Logger } from '../../../../utils/log';

export default defineComponent({
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
    const logger = new Logger();

    onMounted(() => {
      logger.debug('onMounted', '组件已挂载', { props: p });
    });

    // 节点类型判定
    const type = computed(() => {
      const val = p.v;
      if (val === null) return 'null';
      if (Array.isArray(val)) return 'array';
      const t = typeof val;
      if (t === 'object') return 'object';
      if (t === 'undefined') return 'undefined';
      return t as 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'function';
    });

    // 是否数组/对象
    const isArray = computed(() => type.value === 'array');
    const isObject = computed(() => type.value === 'object');

    // 是否可折叠
    const foldable = computed(() => isArray.value || isObject.value);

    // 初始开合：不超过 maxDepth 的层级默认展开；否则遵循 defaultCollapsed
    const open = ref<boolean>(p.level <= (p.maxDepth ?? 3) ? true : !p.defaultCollapsed);

    watch(open, newOpenState => {
      logger.debug('watch:open', `折叠状态改变为: ${newOpenState ? '展开' : '收起'}`);
    });

    // 原始值渲染文本（补足 undefined / bigint / symbol）
    const primitiveText = computed(() => {
      const val = p.v as any;
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
    const summary = computed(() => {
      if (isArray.value) return `Array[${(p.v as any[]).length}]`;
      if (isObject.value) return `Object{${Object.keys(p.v || {}).length}}`;
      return '';
    });

    // 子项列表：对象 → 其 entries；数组 → 直接枚举索引和值
    const childEntries = computed<Record<string, any>>(() => {
      if (isObject.value) return p.v as Record<string, any>;
      if (isArray.value) {
        const out: Record<string, any> = {};
        (p.v as any[]).forEach((cv, idx) => {
          out[String(idx)] = cv;
        });
        return out;
      }
      return {};
    });

    return { type, isArray, foldable, open, primitiveText, summary, childEntries };
  },
});
</script>

<style scoped>
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

/* 结构元素与着色 */
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
.summary {
  color: #6b7280;
  margin-left: 4px;
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

/* 折叠箭头 */
.caret {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  background: #fff;
  line-height: 16px;
  text-align: center;
  font-size: 10px;
  color: #6b7280;
  cursor: pointer;
  box-shadow:
    0 1px 0 #fff,
    0 2px 6px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}
.caret.open {
  transform: rotate(90deg);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
}

/* ===[新增] 防溢出：节点与子树都裁剪（配合上层折叠时彻底看不见） === */
.node {
  /* 单个节点容器 */
  overflow: clip; /* 裁剪节点内部所有绘制 */
  contain: paint; /* 隔离绘制，避免 1px 渲染外泄 */
  min-height: 0; /* 防“最小高度”把父级撑开 */
}

.json-children {
  /* 子节点区域 */
  overflow: clip; /* 裁剪子树（含左侧虚线等装饰） */
  contain: paint; /* 防止子元素阴影/边框超界 */
}
</style>

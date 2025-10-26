<template>
  <!-- 外层卡片：与 ActionButtons 保持一致的玻璃卡风格，但默认收起 -->
  <section class="settings-card" role="region" aria-label="ERA 设置">
    <!-- 设置卡片容器 -->
    <!-- 标题行：可点击折叠/展开 -->
    <button class="card-header" :aria-expanded="isOpen" @click="onToggle">
      <!-- 点击切换展开状态 -->
      <span class="title">ERA 设置</span>
      <!-- 标题文字 -->
      <span class="chev" aria-hidden="true">{{ isOpen ? '▾' : '▸' }}</span>
      <!-- 展开箭头 -->
    </button>

    <!-- 内容体：默认收起；展开后显示变量列表与操作 -->
    <div v-show="isOpen" class="content">
      <!-- 展开内容容器 -->
      <!-- 顶部操作区：刷新/保存/重置编辑 -->
      <div class="toolbar">
        <!-- 工具条 -->
        <button class="mini-btn" title="重新读取脚本变量" @click.stop="loadVars">🔄 重新读取</button>
        <!-- 读取按钮 -->
        <div class="spacer"></div>
        <!-- 占位撑开 -->
        <button class="mini-btn subtle" title="丢弃未保存的修改" @click.stop="discardEdits">↩︎ 丢弃修改</button>
        <!-- 丢弃编辑 -->
        <button class="mini-btn primary" title="保存修改到脚本变量" @click.stop="saveEdits">💾 保存修改</button>
        <!-- 保存修改 -->
      </div>

      <!-- 变量列表：逐项渲染 -->
      <div class="vars">
        <template v-if="rows.length > 0">
          <!-- 有变量时渲染列表 -->
          <div v-for="row in rows" :key="row.key" class="var-row">
            <!-- 每个变量一行 -->
            <label class="var-key" :title="row.key">{{ row.key }}</label>
            <!-- 变量名 -->
            <!-- 根据变量类型选择不同的编辑控件 -->
            <div class="var-editor">
              <!-- 编辑器容器 -->
              <!-- 布尔：勾选框 -->
              <template v-if="row.type === 'boolean'">
                <label class="switch">
                  <!-- 自定义开关外观 -->
                  <input v-model="edits[row.key]" type="checkbox" />
                  <!-- 勾选值 -->
                  <span class="track"></span>
                  <!-- 轨道 -->
                </label>
              </template>

              <!-- 数字：number 输入 -->
              <template v-else-if="row.type === 'number'">
                <input v-model.number="edits[row.key]" type="number" class="ipt" :placeholder="String(row.value)" />
                <!-- 数字输入 -->
              </template>

              <!-- 字符串：text 输入 -->
              <template v-else-if="row.type === 'string'">
                <input v-model="edits[row.key]" type="text" class="ipt" :placeholder="String(row.value)" />
                <!-- 文本输入 -->
              </template>

              <!-- 其他（对象/数组/null/未知）：JSON 文本域 -->
              <template v-else>
                <textarea
                  v-model="jsonBuffers[row.key]"
                  class="ipt ta"
                  :placeholder="safeStringify(row.value)"
                  @input="markJsonTouched(row.key)"
                ></textarea>
                <!-- JSON 文本域 -->
                <span class="hint" :class="{ ok: jsonState[row.key]?.ok, bad: jsonState[row.key]?.bad }">{{
                  jsonState[row.key]?.msg ?? '以 JSON 格式编辑此值'
                }}</span>
                <!-- JSON 校验提示 -->
              </template>
            </div>
            <!-- 类型徽标 -->
            <span class="type-chip">{{ humanType(row.type) }}</span>
            <!-- 类型展示 -->
          </div>
        </template>

        <template v-else>
          <!-- 没有变量时的占位 -->
          <div class="placeholder">
            <p>未读取到任何脚本变量。</p>
            <!-- 文本提示 -->
            <p class="dim">
              请先确保在 <code>app_ready</code> 或初始化阶段通过
              <code>initializeExternalSettings()</code> 写入默认变量。
            </p>
            <!-- 辅助说明 -->
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/* 块头：逻辑说明
   - 默认收起，展开时读取脚本域变量；
   - 支持 boolean/number/string/json 四类编辑；
   - 保存时按原类型回写到脚本域。
*/
import { reactive, ref } from 'vue'; // 中文注释：Vue 响应式 API
import { Logger } from '../../utils/log'; // 中文注释：项目内日志工具

// === 运行时依赖（由你的环境提供）：getVariables / replaceVariables / getScriptId / updateVariablesWith 等 ===
// 声明为全局（若你是 TS 严格模式，可在 d.ts 中声明）
declare const getVariables: (opt: { type: 'script'; script_id: string }) => Record<string, any> | null; // 中文注释：读取脚本域变量
declare const replaceVariables: (vars: Record<string, any>, opt: { type: 'script'; script_id: string }) => void; // 中文注释：整包写回
declare const updateVariablesWith: (
  fn: (vars: Record<string, any>) => Record<string, any>,
  opt: { type: 'script'; script_id: string },
) => void; // 中文注释：函数式更新（可选）
declare const getScriptId: () => string; // 中文注释：获取当前脚本 ID
declare const eventEmit: (name: string, payload?: any) => void; // 中文注释：事件触发（可选，用于通知外界已更新）

const logger = new Logger('ui-EraSettingsPanel'); // 中文注释：实例化日志

// === 折叠状态 ===
const isOpen = ref(false); // 中文注释：是否展开

// === 原始数据与编辑缓存 ===
type Row = { key: string; value: any; type: 'boolean' | 'number' | 'string' | 'json' }; // 中文注释：一行变量的结构
const rows = ref<Row[]>([]); // 中文注释：可渲染的变量行
const edits = reactive<Record<string, any>>({}); // 中文注释：针对简单类型的编辑缓存（布尔/数字/字符串）
const jsonBuffers = reactive<Record<string, string>>({}); // 中文注释：针对 JSON 类型的文本缓存
const jsonState = reactive<Record<string, { ok?: boolean; bad?: boolean; msg?: string }>>({}); // 中文注释：JSON 校验状态

// === 工具：类型判定与人类可读名 ===
function detectType(v: any): Row['type'] {
  // 中文注释：检测变量类型
  if (typeof v === 'boolean') return 'boolean'; // 中文注释：布尔
  if (typeof v === 'number' && Number.isFinite(v)) return 'number'; // 中文注释：有限数
  if (typeof v === 'string') return 'string'; // 中文注释：字符串
  return 'json'; // 中文注释：其他一律归为 json（对象/数组/null/特殊数等）
}
function humanType(t: Row['type']): string {
  // 中文注释：类型中文名
  return t === 'boolean' ? '布尔' : t === 'number' ? '数字' : t === 'string' ? '字符串' : 'JSON'; // 中文注释：映射
}
function safeStringify(v: any): string {
  // 中文注释：安全 JSON 序列化
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  } // 中文注释：失败则转字符串
}

// === 加载变量列表 ===
function loadVars() {
  // 中文注释：读取脚本域变量
  try {
    // 中文注释：异常捕获
    const sid = getScriptId(); // 中文注释：获取脚本 ID
    const obj = getVariables({ type: 'script', script_id: sid }) ?? {}; // 中文注释：读取变量对象
    logger.debug('loadVars', '脚本变量：', obj); // 中文注释：日志输出
    // 清空旧缓存
    rows.value = []; // 中文注释：清空行
    for (const k of Object.keys(edits)) delete edits[k]; // 中文注释：清空简易编辑缓存
    for (const k of Object.keys(jsonBuffers)) delete jsonBuffers[k]; // 中文注释：清空 json 文本缓存
    for (const k of Object.keys(jsonState)) delete jsonState[k]; // 中文注释：清空 json 状态

    // 构建可编辑行
    Object.entries(obj).forEach(([key, value]) => {
      // 中文注释：遍历变量
      const t = detectType(value); // 中文注释：判类型
      rows.value.push({ key, value, type: t }); // 中文注释：压入行
      if (t === 'json') {
        // 中文注释：JSON 类型
        jsonBuffers[key] = safeStringify(value); // 中文注释：记录文本缓存
      } else {
        // 中文注释：简单类型
        edits[key] = value; // 中文注释：记录可直接编辑的值
      }
    });
  } catch (e) {
    // 中文注释：异常分支
    logger.error('loadVars', '读取脚本变量失败：', e); // 中文注释：错误日志
  }
}

// === 展开折叠 ===
function onToggle() {
  // 中文注释：切换展开
  isOpen.value = !isOpen.value; // 中文注释：翻转状态
  if (isOpen.value && rows.value.length === 0) loadVars(); // 中文注释：首次展开时读取数据
}

// === JSON 文本域编辑标记 + 校验 ===
function markJsonTouched(key: string) {
  // 中文注释：标记 JSON 文本改动并校验
  const txt = jsonBuffers[key] ?? ''; // 中文注释：读取文本
  if (txt.trim() === '') {
    // 中文注释：空文本提示
    jsonState[key] = { bad: true, ok: false, msg: '不能为空（若要设为 null 请写 null）' }; // 中文注释：空提示
    return; // 中文注释：返回
  }
  try {
    JSON.parse(txt);
    jsonState[key] = { ok: true, bad: false, msg: 'JSON 格式有效' };
  } catch (e: any) {
    // 中文注释：校验通过
    jsonState[key] = { bad: true, ok: false, msg: `JSON 格式错误：${e?.message ?? ''}` };
  } // 中文注释：校验失败
}

// === 丢弃未保存的编辑 ===
function discardEdits() {
  // 中文注释：丢弃编辑
  loadVars(); // 中文注释：重新读取覆盖本地改动
}

// === 保存修改 ===
function saveEdits() {
  // 中文注释：保存到脚本域
  try {
    // 中文注释：异常捕获
    const sid = getScriptId(); // 中文注释：脚本 ID
    const current = getVariables({ type: 'script', script_id: sid }) ?? {}; // 中文注释：当前值
    const next: Record<string, any> = { ...current }; // 中文注释：下一版对象（拷贝）

    // 合并简单类型的改动（布尔/数字/字符串）
    Object.entries(edits).forEach(([k, v]) => {
      next[k] = v;
    }); // 中文注释：合并简单改动

    // 合并 JSON 文本改动（需先通过校验）
    Object.entries(jsonBuffers).forEach(([k, txt]) => {
      // 中文注释：遍历 JSON 缓存
      if (txt != null) {
        // 中文注释：有文本
        if (jsonState[k]?.bad) throw new Error(`键 ${k} 的 JSON 格式不正确`); // 中文注释：若已标坏则阻止提交
        next[k] = JSON.parse(txt); // 中文注释：写入解析后的对象
      }
    });

    // === 写回：两种方式任选其一（默认用 replaceVariables） ===
    replaceVariables(next, { type: 'script', script_id: sid }); // 中文注释：整包写回
    // updateVariablesWith(() => next, { type: 'script', script_id: sid }); // 中文注释：若更偏好函数式更新，改用此行

    logger.log('saveEdits', '脚本变量已保存：', next); // 中文注释：成功日志
    eventEmit?.('era:variables_updated', { scope: 'script', keys: Object.keys(next) }); // 中文注释：可选：通知外界更新
    loadVars(); // 中文注释：重载以反映保存后的最终值
  } catch (e) {
    // 中文注释：异常分支
    logger.error('saveEdits', '保存失败：', e); // 中文注释：错误日志
    alert(`保存失败：${(e as any)?.message ?? e}`); // 中文注释：用户提示
  }
}
</script>

<style scoped>
/* === 外层卡片容器（与 ActionButtons 保持同系外观） === */
.settings-card {
  /* 玻璃卡容器 */
  width: 100%; /* 占满侧栏宽度 */
  padding: 12px; /* 内边距 */
  margin-top: 12px; /* 与上方按钮卡间距 */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62)); /* 半透明渐变 */
  border: 1px solid rgba(255, 255, 255, 0.6); /* 浅描边 */
  border-radius: 16px; /* 圆角 */
  backdrop-filter: blur(10px); /* 毛玻璃 */
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.6); /* 投影 */
  display: flex; /* 纵向布局 */
  flex-direction: column; /* 垂直排布 */
  gap: 10px; /* 间距 */
}

/* 标题按钮：收起/展开控制 */
.card-header {
  /* 标题行按钮 */
  display: flex; /* 横向布局 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 两端对齐 */
  padding: 8px 10px; /* 内边距 */
  border-radius: 10px; /* 圆角 */
  border: 1px solid rgba(0, 0, 0, 0.06); /* 轻描边 */
  background: linear-gradient(180deg, #fafafa, #f3f4f6); /* 渐变 */
  color: #1f2937; /* 字色 */
  font-weight: 800; /* 加粗 */
  font-size: 13px; /* 字号 */
  cursor: pointer; /* 可点 */
  box-shadow:
    inset 0 1px 0 #fff,
    0 2px 8px rgba(0, 0, 0, 0.08); /* 阴影 */
}
.card-header:hover {
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 #fff,
    0 6px 16px rgba(0, 0, 0, 0.12);
} /* 悬停态 */
.title {
  pointer-events: none;
} /* 避免子元素截获点击 */
.chev {
  opacity: 0.7;
} /* 箭头淡化 */

/* 内容体 */
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
} /* 内容容器 */

/* 工具条 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
} /* 工具条布局 */
.spacer {
  flex: 1;
} /* 右对齐按钮用 */

.mini-btn {
  /* 通用小按钮 */
  padding: 6px 10px; /* 内边距 */
  border-radius: 8px; /* 圆角 */
  border: 1px solid rgba(0, 0, 0, 0.08); /* 描边 */
  background: linear-gradient(180deg, #fafafa, #f3f4f6); /* 背景 */
  cursor: pointer; /* 可点击 */
  font-size: 12px; /* 字号 */
  font-weight: 700; /* 加粗 */
  box-shadow:
    inset 0 1px 0 #fff,
    0 2px 6px rgba(0, 0, 0, 0.06); /* 阴影 */
}
.mini-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 #fff,
    0 5px 12px rgba(0, 0, 0, 0.1);
} /* 悬停 */
.mini-btn.primary {
  background: linear-gradient(180deg, #e0f2fe, #bfdbfe);
  border-color: #93c5fd;
  color: #0f172a;
} /* 主要 */
.mini-btn.subtle {
  background: linear-gradient(180deg, #f9fafb, #f3f4f6);
  border-color: #e5e7eb;
} /* 次要 */

/* 变量列表 */
.vars {
  display: flex;
  flex-direction: column;
  gap: 8px;
} /* 列表容器 */

.var-row {
  /* 一行变量 */
  display: grid; /* 网格布局 */
  grid-template-columns: 1fr minmax(120px, 1.2fr) auto; /* 三列：键 / 编辑器 / 类型 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 列间距 */
  padding: 8px 10px; /* 内边距 */
  border: 1px solid rgba(0, 0, 0, 0.06); /* 轻描边 */
  border-radius: 10px; /* 圆角 */
  background: linear-gradient(180deg, #ffffff, #f8fafc); /* 淡底 */
}
.var-key {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} /* 键名样式 */
.var-editor {
  display: flex;
  align-items: center;
  gap: 8px;
} /* 编辑器容器 */

.ipt {
  /* 通用输入框 */
  width: 100%; /* 拉满可用宽度 */
  padding: 8px 10px; /* 内边距 */
  border-radius: 8px; /* 圆角 */
  border: 1px solid #e5e7eb; /* 描边 */
  background: #fff; /* 背景 */
  font-size: 12px; /* 字号 */
  color: #111827; /* 文字 */
  box-shadow: inset 0 1px 0 #fff; /* 内高光 */
}
.ta {
  min-height: 64px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
} /* JSON 文本域 */

.type-chip {
  /* 类型标签 */
  font-size: 11px; /* 字号 */
  color: #374151; /* 字色 */
  background: #eef2ff; /* 背景 */
  border: 1px solid #c7d2fe; /* 描边 */
  border-radius: 999px; /* 胶囊 */
  padding: 4px 8px; /* 内边距 */
  white-space: nowrap; /* 不换行 */
}

/* 自定义开关（布尔） */
.switch {
  position: relative;
  width: 42px;
  height: 24px;
  display: inline-block;
} /* 开关容器 */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
} /* 隐藏原生框 */
.switch .track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #e5e7eb;
  box-shadow: inset 0 1px 0 #fff;
  transition: background 0.2s ease;
} /* 轨道 */
.switch .track::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
} /* 拖头 */
.switch input:checked + .track {
  background: #93c5fd;
} /* 选中轨道色 */
.switch input:checked + .track::after {
  transform: translateX(18px);
} /* 拖头右移 */

.hint {
  font-size: 11px;
  color: #6b7280;
} /* JSON 提示 */
.hint.ok {
  color: #065f46;
} /* 通过提示色 */
.hint.bad {
  color: #b91c1c;
} /* 错误提示色 */

.placeholder {
  padding: 10px;
  color: #6b7280;
  font-size: 12px;
  border: 1px dashed rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
} /* 空状态 */
</style>

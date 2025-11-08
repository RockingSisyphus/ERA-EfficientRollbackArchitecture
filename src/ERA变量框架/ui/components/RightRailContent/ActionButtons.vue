<template>
  <!-- 右侧操作卡：外层自包含，不依赖父组件样式 -->
  <section class="action-buttons-card" role="complementary" aria-label="ERA 快捷操作">
    <!-- 中文注释：操作卡容器 -->
    <h4 class="card-title">快捷操作</h4>
    <!-- 中文注释：卡片标题 -->
    <div class="btns">
      <!-- 中文注释：按钮垂直栈 -->
      <div class="btn-group">
        <button class="btn primary" title="重新计算所有变量" @click.stop="onFullSync">
          <!-- 中文注释：主按钮 -->
          <span class="ico" aria-hidden="true">🔄</span>
          <!-- 中文注释：图标 -->
          <span class="label">完全重算变量</span>
          <!-- 中文注释：文字 -->
        </button>
        <p class="btn-desc">
          当变量与预期不符时，点击此按钮可从**第一条消息**开始重新计算所有消息，以确保数据完全同步。这是一个非常耗时的操作。
        </p>
      </div>

      <div class="btn-group">
        <button class="btn subtle" title="只重算最新一楼的变量" @click.stop="onLastSync">
          <!-- 中文注释：次按钮 -->
          <span class="ico" aria-hidden="true">♻️</span>
          <!-- 中文注释：图标 -->
          <span class="label">重算最后一楼变量</span>
          <!-- 中文注释：文字 -->
        </button>
        <p class="btn-desc">
          仅根据最新一条消息重新计算变量，速度较快。适用于修复最近一次操作导致的小问题或在手动编辑了最后一条消息后重新写入变量（注意，era会无视所有**用户发送的消息**中的变量更新语句）。
        </p>
      </div>

      <!-- 新增：时间旅行/回滚功能 -->
      <div class="btn-group">
        <div class="input-btn-combo">
          <input
            v-model.number="rollbackId"
            type="number"
            class="input-field"
            placeholder="消息 ID"
            aria-label="要回滚到的消息 ID"
          />
          <button class="btn subtle combo-btn" title="将变量状态回滚到指定消息" @click.stop="onRollbackTo">
            <span class="ico" aria-hidden="true">⏳</span>
            <span class="label">回滚到</span>
          </button>
        </div>
        <p class="btn-desc">输入一个消息 ID，点击按钮可将变量状态“时间旅行”回该消息处理完毕后的那一刻。</p>
      </div>

      <div class="btn-group">
        <button class="btn danger" title="为角色卡注入 ERA 规则" @click.stop="onInjectRegex">
          <span class="ico" aria-hidden="true">🥽</span>
          <span class="label">ERA 快速初始化</span>
        </button>
        <p class="btn-desc">
          【角色卡作者专用】点击后，会向当前角色卡注入四条规则：<br />
          1. 添加“ERA 数据隐藏正则”以隐藏聊天中的数据标签。<br />
          2. 添加“ERA状态栏模板”以将模板状态栏替换至消息。<br />
          3. 向角色主世界书中添加“ERA变量操作规则”条目以令ai明白era变量的操作规则。<br />
          4. 向角色主世界书中添加“ERA变量意图说明”条目以存放变量意图说明。<br />
          注意：作者可以用该功能快速注入使用era的几个基础配置。但你仍旧需要：<br />
          1. 自己设计角色卡用到的变量结构并写入角色的开场白。<br />
          2. 在角色主世界书中‘ERA变量意图说明’条目中添加向ai说明各个变量的意图的提示词。<br />
          3. 修改‘ERA状态栏模板’正则中的状态栏代码，令其与**你设计的变量系统匹配**。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import toastr from 'toastr';
import { initEraCharacterRegexes } from '../../../initer/manual/regex';
import { initEraWorldbookEntries } from '../../../initer/manual/worldbook';
import { Logger } from '../../../utils/log'; // 中文注释：日志工具
import { ui } from 'jquery';

const logger = new Logger(); // 中文注释：实例化日志
const rollbackId = ref<number | null>(null);

async function onInjectRegex() {
  logger.log('onInjectRegex', '点击“ERA 快速初始化”，开始注入...');
  try {
    // 检查是否存在第 0 条消息
    try {
      const firstMessage = getChatMessages(0);
      if (!firstMessage || firstMessage.length === 0) {
        throw new Error('No messages found');
      }
    } catch (e) {
      toastr.error('然后再次点击快速初始化', '请在角色卡的开场白中添加任意内容。');
      logger.warn('onInjectRegex', '获取第 0 条消息失败，可能是因为聊天记录为空。', e);
      return;
    }

    // 初始化正则
    const regexResult = await initEraCharacterRegexes();
    if (!regexResult.success) {
      toastr.error(regexResult.reason ?? '未知错误', '正则初始化失败');
      logger.error('onInjectRegex', '正则注入失败:', regexResult.reason);
      return;
    } else {
      const injectedCount = regexResult.details.filter(d => d.status === 'injected').length;
      const existsCount = regexResult.details.filter(d => d.status === 'exists').length;
      let message = '';
      if (injectedCount > 0) {
        message += `成功注入 ${injectedCount} 个新正则。`;
      }
      if (existsCount > 0) {
        message += ` ${existsCount} 个正则已存在。`;
      }
      if (message) {
        toastr.success(message.trim(), '正则初始化完成');
      }
    }

    // 初始化世界书
    const worldbookResult = await initEraWorldbookEntries();
    if (!worldbookResult.success) {
      toastr.error(worldbookResult.reason ?? '一个或多个世界书条目注入失败。', '世界书初始化失败');
      logger.error('onInjectRegex', '世界书注入失败:', worldbookResult);
    } else {
      const injectedCount = worldbookResult.details.filter(d => d.status === 'injected').length;
      const existsCount = worldbookResult.details.filter(d => d.status === 'exists').length;
      let message = '';
      if (injectedCount > 0) {
        message += `成功注入 ${injectedCount} 个新条目。`;
      }
      if (existsCount > 0) {
        message += ` ${existsCount} 个条目已存在。`;
      }
      toastr.success(message.trim(), '世界书初始化完成');
    }

    logger.log('onInjectRegex', '初始化流程完成。');
  } catch (error) {
    logger.error('onInjectRegex', '执行初始化时发生意外错误:', error);
    toastr.error('发生意外错误，请检查控制台获取详细信息。', '初始化失败');
  }
}

function onFullSync() {
  logger.log('onFullSync', '点击“完全重算变量”，发送 era:forceSync 事件 (mode: full)。');
  try {
    eventEmit('era:forceSync', { mode: 'full' });
    toastr.success('已发送“完全重算变量”请求。', '操作成功');
  } catch (error) {
    logger.error('onFullSync', '发送 era:forceSync 事件时出错:', error);
    toastr.error('发送请求失败，请检查控制台。', '操作失败');
  }
}

function onLastSync() {
  logger.log('onLastSync', '点击“重算最后一楼变量”，发送 era:forceSync 事件 (mode: latest)。');
  try {
    eventEmit('era:forceSync', { mode: 'latest' });
    toastr.success('已发送“重算最后一楼变量”请求。', '操作成功');
  } catch (error) {
    logger.error('onLastSync', '发送 era:forceSync 事件时出错:', error);
    toastr.error('发送请求失败，请检查控制台。', '操作失败');
  }
}

function onRollbackTo() {
  if (rollbackId.value === null || rollbackId.value < 0) {
    toastr.warning('请输入一个有效的、非负的消息 ID。', '输入无效');
    return;
  }
  logger.log(
    'onRollbackTo',
    `点击“回滚到”，发送 era:forceSync 事件 (mode: rollbackTo, message_id: ${rollbackId.value})。`,
  );
  try {
    eventEmit('era:forceSync', { mode: 'rollbackTo', message_id: rollbackId.value });
    toastr.success(`已发送回滚到消息 #${rollbackId.value} 的请求。`, '操作成功');
  } catch (error) {
    logger.error('onRollbackTo', '发送 era:forceSync 事件时出错:', error);
    toastr.error('发送请求失败，请检查控制台。', '操作失败');
  }
}
</script>

<style scoped>
/* === 新增：输入框与按钮组合 === */
.input-btn-combo {
  display: flex;
  gap: 8px;
}

.input-field {
  flex-grow: 1;
  width: 0; /* 让 flex-grow 生效 */
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--settings-border-input, var(--border-soft));
  background: var(--settings-bg-btn-subtle, var(--actions-btn-bg));
  color: var(--settings-text-input, var(--text-normal));
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: var(--settings-shadow-inset);
}
.input-field::placeholder {
  color: var(--text-soft);
  font-weight: 500;
}
.input-field:focus {
  outline: none;
  border-color: var(--actions-outline-focus);
  box-shadow:
    var(--settings-shadow-inset),
    0 0 0 3px var(--snapshot-accent-soft);
}
/* 隐藏 number input 的原生箭头 */
.input-field::-webkit-outer-spin-button,
.input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-field[type='number'] {
  -moz-appearance: textfield;
}

.combo-btn {
  flex-shrink: 0; /* 防止按钮被压缩 */
  padding-left: 12px;
  padding-right: 12px;
}

/* === 外层卡片：与左侧 ERA 面板同风格（玻璃卡 + 轻浮雕） === */
.action-buttons-card {
  /* 中文注释：卡片容器 */
  width: 100%; /* 占满侧栏 */ /* 中文注释：自适应宽度 */
  padding: 12px; /* 内边距 */ /* 中文注释：留白 */
  background: var(--actions-bg-glass);
  border: 1px solid var(--border-strong);
  border-radius: 16px; /* 中文注释：圆角 */
  backdrop-filter: blur(10px); /* 中文注释：毛玻璃效果 */
  box-shadow: var(--actions-shadow-card), var(--shadow-inset);
  display: flex; /* 中文注释：纵向布局 */
  flex-direction: column; /* 中文注释：垂直排列 */
  gap: 10px; /* 中文注释：元素间距 */
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}

/* 标题：与面板标题权重接近但略轻 */
.card-title {
  /* 中文注释：卡片标题 */
  margin: 0 0 4px; /* 中文注释：底部留白 */
  font-size: 14px; /* 中文注释：字号 */
  font-weight: 800; /* 中文注释：加粗 */
  letter-spacing: 0.3px; /* 中文注释：字距 */
  color: var(--text-title);
  transition: color 0.3s ease;
}

/* 按钮栈：竖直排列 */
.btns {
  /* 中文注释：按钮容器 */
  display: flex; /* 中文注释：flex 布局 */
  flex-direction: column; /* 中文注释：垂直排列 */
  gap: 16px; /* 中文注释：上下间距 */
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.btn-desc {
  font-size: 11px;
  color: var(--text-soft);
  padding: 0 4px;
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;
}

/* 通用按钮造型：大号、易点、可聚焦 */
.btn {
  /* 中文注释：通用按钮 */
  display: grid; /* 中文注释：网格方便对齐图标与文字 */
  grid-template-columns: 22px 1fr; /* 中文注释：左 22px 图标 + 右侧文字 */
  align-items: center; /* 中文注释：垂直居中 */
  column-gap: 8px; /* 中文注释：图标与文字间距 */
  padding: 10px 12px; /* 中文注释：触控友好尺寸 */
  border-radius: 12px; /* 中文注释：圆角 */
  border: 1px solid var(--border-soft);
  background: var(--actions-btn-bg);
  color: var(--actions-btn-text);
  font-weight: 700; /* 中文注释：字重 */
  font-size: 13px; /* 中文注释：字号 */
  cursor: pointer; /* 中文注释：可点击 */
  box-shadow: var(--settings-shadow-inset), var(--shadow-button);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background 0.2s ease,
    color 0.3s ease,
    border-color 0.3s ease;
  text-align: left; /* 中文注释：靠左 */
}

/* 主按钮：略带品牌色调（蓝青） */
.btn.primary {
  /* 中文注释：主按钮 */
  background: var(--actions-btn-primary-bg);
  border-color: var(--actions-btn-primary-border);
  color: var(--actions-btn-primary-text);
}

/* 次按钮：更素雅 */
.btn.subtle {
  /* 中文注释：次按钮 */
  background: var(--actions-btn-subtle-bg);
  border-color: var(--actions-btn-subtle-border);
}

/* 危险按钮：用于特殊或破坏性操作 */
.btn.danger {
  background: var(--actions-btn-danger-bg);
  border-color: var(--actions-btn-danger-border);
  color: var(--actions-btn-danger-text);
}

/* 悬停与按压反馈 */
.btn:hover {
  /* 中文注释：悬停态 */
  transform: translateY(-1px); /* 中文注释：轻浮起 */
  box-shadow: var(--settings-shadow-inset), var(--shadow-button-hover);
}
.btn:active {
  /* 中文注释：按下态 */
  transform: translateY(0); /* 中文注释：回落 */
  box-shadow: var(--settings-shadow-inset), var(--actions-shadow-btn-active);
}

/* 焦点可见性（无障碍） */
.btn:focus-visible {
  /* 中文注释：键盘聚焦态 */
  outline: 2px solid var(--actions-outline-focus);
  outline-offset: 2px; /* 中文注释：描边偏移 */
}

/* 图标与文字 */
.ico {
  /* 中文注释：图标框 */
  display: inline-grid; /* 中文注释：网格放置 */
  place-items: center; /* 中文注释：居中 */
  width: 22px; /* 中文注释：宽度 */
  height: 22px; /* 中文注释：高度 */
  filter: saturate(0.95); /* 中文注释：轻饱和 */
}
.label {
  /* 中文注释：文字 */
  white-space: nowrap; /* 中文注释：不换行（文字短） */
  overflow: hidden; /* 中文注释：溢出裁剪 */
  text-overflow: ellipsis; /* 中文注释：省略号 */
}
</style>

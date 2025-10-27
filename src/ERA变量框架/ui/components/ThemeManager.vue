<script setup lang="ts">
import { defineExpose, ref } from 'vue';

const isDarkMode = ref(false);

// 通过 defineExpose 将状态和方法暴露给父组件
defineExpose({
  isDarkMode,
});
</script>

<style>
/*
  这个 style 标签没有 'scoped' 属性，
  因此当 ThemeManager 组件被挂载时，
  这里的所有样式都会作为全局样式注入到页面中。
*/

/* 亮色主题（默认） */
:root {
  /* === App.vue & General Styles === */
  --bg-blur-heavy: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.65));
  --bg-blur-light: linear-gradient(90deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.45));
  --bg-solid: #fff;
  --bg-soft: rgba(255, 255, 255, 0.6);
  --bg-empty: rgba(255, 255, 255, 0.5);
  --border-strong: rgba(255, 255, 255, 0.6);
  --border-normal: rgba(0, 0, 0, 0.08);
  --border-soft: rgba(0, 0, 0, 0.06);
  --border-dashed: rgba(0, 0, 0, 0.08);
  --text-title: #1f2937;
  --text-subtitle: #374151;
  --text-normal: #6b7280;
  --shadow-panel: 0 10px 40px rgba(0, 0, 0, 0.18);
  --shadow-button: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-button-hover: 0 6px 16px rgba(0, 0, 0, 0.12);
  --shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  --chip-bg: linear-gradient(180deg, #fafafa, #f4f4f4);
  --chip-text: #6b7280;
  --chip-border: rgba(0, 0, 0, 0.06);
  --chip-ok-bg: linear-gradient(180deg, #ecfdf5, #d1fae5);
  --chip-ok-text: #065f46;
  --chip-ok-border: #a7f3d0;
  --mk-pill-bg: linear-gradient(180deg, #eef2ff, #e0e7ff);
  --mk-pill-text: #4338ca;
  --mk-pill-border: #c7d2fe;
  --mk-pill-null-bg: linear-gradient(180deg, #f9fafb, #f3f4f6);
  --mk-pill-null-text: #6b7280;
  --mk-pill-null-border: #e5e7eb;

  /* === EraSettingsPanel.vue Styles === */
  --settings-bg-glass: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62));
  --settings-shadow-card: 0 10px 40px rgba(0, 0, 0, 0.16);
  --settings-shadow-inset: inset 0 1px 0 #fff;
  --settings-shadow-minibtn: 0 2px 6px rgba(0, 0, 0, 0.06);
  --settings-shadow-minibtn-hover: 0 5px 12px rgba(0, 0, 0, 0.1);
  --settings-bg-var-row: linear-gradient(180deg, #ffffff, #f8fafc);
  --settings-text-input: #111827;
  --settings-text-primary-btn: #0f172a;
  --settings-border-input: #e5e7eb;
  --settings-bg-btn-primary: linear-gradient(180deg, #e0f2fe, #bfdbfe);
  --settings-border-btn-primary: #93c5fd;
  --settings-bg-btn-subtle: linear-gradient(180deg, #f9fafb, #f3f4f6);
  --settings-bg-type-chip: #eef2ff;
  --settings-border-type-chip: #c7d2fe;
  --settings-bg-switch-track: #e5e7eb;
  --settings-bg-switch-handle: #fff;
  --settings-shadow-switch-handle: 0 1px 3px rgba(0, 0, 0, 0.2);
  --settings-bg-switch-checked: #93c5fd;
  --settings-text-hint-ok: #065f46;
  --settings-text-hint-bad: #b91c1c;

  /* === ActionButtons.vue Styles === */
  --actions-bg-glass: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62));
  --actions-shadow-card: 0 10px 40px rgba(0, 0, 0, 0.16);
  --actions-btn-bg: linear-gradient(180deg, #fafafa, #f3f4f6);
  --actions-btn-text: #374151;
  --actions-btn-primary-bg: linear-gradient(180deg, #e0f2fe, #bfdbfe);
  --actions-btn-primary-border: #93c5fd;
  --actions-btn-primary-text: #0f172a;
  --actions-btn-subtle-bg: linear-gradient(180deg, #f9fafb, #f3f4f6);
  --actions-btn-subtle-border: #e5e7eb;
  --actions-shadow-btn-active: 0 2px 8px rgba(0, 0, 0, 0.1);
  --actions-outline-focus: #60a5fa;

  /* === EraAccordion.vue Styles === */
  --accordion-bg: linear-gradient(180deg, #fff, #fafafa);
  --accordion-body-bg: rgba(255, 255, 255, 0.82);

  /* === MetaHeader.vue Styles === */
  --meta-bg: linear-gradient(180deg, #ffffff, #f9fafb);
  --meta-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  --meta-key-bg: #f3f4f6;
  --meta-glow-bg: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399, #f472b6);

  /* === JsonNode.vue Styles === */
  --json-hover-bg: rgba(59, 130, 246, 0.06);
  --json-tree-line: rgba(107, 114, 128, 0.25);
  --json-key-color: #1f2937;
  --json-val-string: #047857;
  --json-val-number: #7c3aed;
  --json-val-boolean: #0369a1;
  --json-val-null: #9ca3af;
  --json-caret-shadow: 0 1px 0 #fff, 0 2px 6px rgba(0, 0, 0, 0.06);
  --json-caret-open-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);

  /* === TabSwitch.vue Styles === */
  --tab-active-shadow: 0 0 0 3px rgba(147, 197, 253, 0.35);
  --tab-content-bg: rgba(255, 255, 255, 0.86);

  /* === FloatingBall.vue Styles === */
  --ball-hue: 210;
  --ball-sat: 15%;
  --ball-lum: 95%;
  --ball-shadow-color: rgba(0, 0, 0, 0.15);
  --ball-glow-color: rgba(180, 200, 220, 0.55);
  --ball-inner-shadow-color: rgba(0, 0, 0, 0.1);
  --ball-specular-color: rgba(255, 255, 255, 0.9);
  --ball-glass-color: rgba(255, 255, 255, 0.1);
  --ball-focus-outline: rgba(180, 200, 220, 0.85);
  --ball-logo-bg: linear-gradient(180deg, #8899aa 0%, #556677 100%);
  --ball-logo-shadow-top: rgba(0, 0, 0, 0.25);
  --ball-logo-shadow-near: rgba(255, 255, 255, 0.6);
  --ball-logo-shadow-far: rgba(0, 0, 0, 0.1);
  --ball-logo-filter-glow: drop-shadow(0 0 1px rgba(0, 0, 0, 0.2));
}

/* 暗色主题 */
.dark-theme {
  /* === App.vue & General Styles === */
  --bg-blur-heavy: linear-gradient(180deg, rgba(35, 37, 43, 0.8), rgba(28, 29, 33, 0.75));
  --bg-blur-light: linear-gradient(90deg, rgba(50, 52, 59, 0.7), rgba(42, 43, 48, 0.6));
  --bg-solid: #2d2f37;
  --bg-soft: rgba(60, 63, 73, 0.5);
  --bg-empty: rgba(60, 63, 73, 0.25);
  --border-strong: rgba(255, 255, 255, 0.12);
  --border-normal: rgba(255, 255, 255, 0.1);
  --border-soft: rgba(255, 255, 255, 0.08);
  --border-dashed: rgba(255, 255, 255, 0.1);
  --text-title: #f9fafb;
  --text-subtitle: #d1d5db;
  --text-normal: #9ca3af;
  --shadow-panel: 0 10px 40px rgba(0, 0, 0, 0.3);
  --shadow-button: 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-button-hover: 0 6px 16px rgba(0, 0, 0, 0.35);
  --shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  --chip-bg: linear-gradient(180deg, #4b5563, #374151);
  --chip-text: #e5e7eb;
  --chip-border: rgba(255, 255, 255, 0.1);
  --chip-ok-bg: linear-gradient(180deg, #064e3b, #052e22);
  --chip-ok-text: #a7f3d0;
  --chip-ok-border: #047857;
  --mk-pill-bg: linear-gradient(180deg, #3730a3, #312e81);
  --mk-pill-text: #c7d2fe;
  --mk-pill-border: #4f46e5;
  --mk-pill-null-bg: linear-gradient(180deg, #4b5563, #374151);
  --mk-pill-null-text: #9ca3af;
  --mk-pill-null-border: #6b7280;

  /* === EraSettingsPanel.vue Styles === */
  --settings-bg-glass: linear-gradient(180deg, rgba(40, 42, 48, 0.8), rgba(33, 34, 38, 0.75));
  --settings-shadow-card: 0 10px 40px rgba(0, 0, 0, 0.3);
  --settings-shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  --settings-shadow-minibtn: 0 2px 6px rgba(0, 0, 0, 0.2);
  --settings-shadow-minibtn-hover: 0 5px 12px rgba(0, 0, 0, 0.3);
  --settings-bg-var-row: #2d2f37;
  --settings-text-input: #f9fafb;
  --settings-text-primary-btn: #e0f2fe;
  --settings-border-input: #4b5563;
  --settings-bg-btn-primary: linear-gradient(180deg, #3b82f6, #2563eb);
  --settings-border-btn-primary: #1d4ed8;
  --settings-bg-btn-subtle: linear-gradient(180deg, #4b5563, #374151);
  --settings-bg-type-chip: #3730a3;
  --settings-border-type-chip: #4f46e5;
  --settings-bg-switch-track: #4b5563;
  --settings-bg-switch-handle: #d1d5db;
  --settings-shadow-switch-handle: 0 1px 3px rgba(0, 0, 0, 0.4);
  --settings-bg-switch-checked: #3b82f6;
  --settings-text-hint-ok: #34d399;
  --settings-text-hint-bad: #ef4444;

  /* === ActionButtons.vue Styles === */
  --actions-bg-glass: linear-gradient(180deg, rgba(40, 42, 48, 0.8), rgba(33, 34, 38, 0.75));
  --actions-shadow-card: 0 10px 40px rgba(0, 0, 0, 0.3);
  --actions-btn-bg: linear-gradient(180deg, #4b5563, #374151);
  --actions-btn-text: #d1d5db;
  --actions-btn-primary-bg: linear-gradient(180deg, #3b82f6, #2563eb);
  --actions-btn-primary-border: #1d4ed8;
  --actions-btn-primary-text: #f1f5f9;
  --actions-btn-subtle-bg: linear-gradient(180deg, #4b5563, #374151);
  --actions-btn-subtle-border: #6b7280;
  --actions-shadow-btn-active: 0 2px 8px rgba(0, 0, 0, 0.2);
  --actions-outline-focus: #2563eb;

  /* === EraAccordion.vue Styles === */
  --accordion-bg: var(--bg-solid);
  --accordion-body-bg: rgba(45, 47, 55, 0.5);

  /* === MetaHeader.vue Styles === */
  --meta-bg: linear-gradient(180deg, #2d2f37, #24262b);
  --meta-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  --meta-key-bg: #374151;
  --meta-glow-bg: linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981, #ec4899);

  /* === JsonNode.vue Styles === */
  --json-hover-bg: rgba(147, 197, 253, 0.1);
  --json-tree-line: rgba(107, 114, 128, 0.4);
  --json-key-color: #e5e7eb;
  --json-val-string: #6ee7b7;
  --json-val-number: #c4b5fd;
  --json-val-boolean: #7dd3fc;
  --json-val-null: #9ca3af;
  --json-caret-shadow: 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 6px rgba(0, 0, 0, 0.2);
  --json-caret-open-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);

  /* === TabSwitch.vue Styles === */
  --tab-active-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  --tab-content-bg: rgba(45, 47, 55, 0.5);

  /* === FloatingBall.vue Styles === */
  --ball-hue: 220;
  --ball-sat: 10%;
  --ball-lum: 25%;
  --ball-shadow-color: rgba(0, 0, 0, 0.3);
  --ball-glow-color: rgba(150, 180, 210, 0.4);
  --ball-inner-shadow-color: rgba(0, 0, 0, 0.4);
  --ball-specular-color: rgba(255, 255, 255, 0.15);
  --ball-glass-color: rgba(255, 255, 255, 0.05);
  --ball-focus-outline: rgba(150, 180, 210, 0.7);
  --ball-logo-bg:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(233, 213, 255, 0.6) 45%,
      rgba(220, 200, 255, 0.5) 65%,
      rgba(191, 128, 255, 0.65) 100%
    ),
    linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0) 60%);
  --ball-logo-shadow-top: rgba(255, 255, 255, 0.6);
  --ball-logo-shadow-near: rgba(0, 0, 0, 0.3);
  --ball-logo-shadow-far: rgba(138, 43, 226, 0.45);
  --ball-logo-filter-glow: drop-shadow(0 0 3px rgba(191, 128, 255, 0.35));
}
</style>

/**
 * @file panel-data.ts
 * @description Processes raw event data and generates static HTML for the EraDataPanel component.
 */

export type Actions = { rollback: boolean; apply: boolean; resync: boolean; api: boolean; apiWrite: boolean };
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

// --- HTML Generation Functions ---

/**
 * Recursively converts a JSON object to a static HTML string, mimicking JsonNode.vue.
 */
function jsonToHtml(data: any, level = 0, maxDepth = Infinity, defaultCollapsed = true): string {
  const type = (() => {
    if (data === null) return 'null';
    if (Array.isArray(data)) return 'array';
    return typeof data;
  })();

  const isFoldable = type === 'array' || type === 'object';
  const isOpen = level < maxDepth;

  const keyHtml = (k: string) => `<span class="key">${k}</span><span class="colon">:</span>`;

  if (!isFoldable) {
    const primitiveText = (() => {
      switch (type) {
        case 'string':
          return JSON.stringify(data);
        case 'number':
          return String(data);
        case 'boolean':
          return data ? 'true' : 'false';
        case 'null':
          return 'null';
        default:
          return String(data);
      }
    })();
    return `<span class="val ${type}">${primitiveText}</span>`;
  }

  const summary = type === 'array' ? `Array[${data.length}]` : `Object{${Object.keys(data).length}}`;
  const childrenHtml = Object.entries(data)
    .map(([key, value]) => {
      return `
        <div class="json-line" style="padding-left: ${(level + 1) * 14}px;">
          ${keyHtml(key)} ${jsonToHtml(value, level + 1, maxDepth, defaultCollapsed)}
        </div>
      `;
    })
    .join('');

  return `
    <details class="json-node-details" ${isOpen ? 'open' : ''}>
      <summary class="json-line" style="padding-left: ${level * 14}px; display: flex; align-items: center; gap: 6px;">
        <span class="brace">${type === 'array' ? '[' : '{'}</span>
        <span class="summary">${summary}</span>
      </summary>
      <div class="json-children" style="border-left: 1px dashed rgba(107, 114, 128, 0.25);">
        ${childrenHtml}
        <div class="json-line" style="padding-left: ${level * 14}px;">
          <span class="brace">${type === 'array' ? ']' : '}'}</span>
        </div>
      </div>
    </details>
  `;
}

function createAccordionHtml(title: string, content: string, defaultOpen = false): string {
  return `
    <details class="era-accordion" ${defaultOpen ? 'open' : ''}>
      <summary class="era-accordion-summary">${title}</summary>
      <div class="era-accordion-content">${content}</div>
    </details>
  `;
}

function createTabsHtml(tabs: { key: string; label: string; content: string }[]): string {
  const radios = tabs
    .map(
      (tab, index) => `
    <input type="radio" id="tab-${tab.key}" name="tabs" ${index === 0 ? 'checked' : ''} class="tab-radio">
  `,
    )
    .join('');

  const labelsAndContent = tabs
    .map(
      tab => `
    <label for="tab-${tab.key}" class="tab-label">${tab.label}</label>
    <div class="tab-content">${tab.content}</div>
  `,
    )
    .join('');

  return `<div class="tab-switch">${radios}${labelsAndContent}</div>`;
}

/**
 * Generates the entire inner HTML for the panel body.
 * @param payload The raw event payload.
 * @returns A static HTML string.
 */
export function createPanelBodyHtml(payload: WriteDonePayload | null): string {
  if (!payload) {
    return '<div class="empty">等待 era:writeDone 事件数据…</div>';
  }

  const metaHtml = `
    <div class="meta-header">
      <span>MK: ${payload.mk}</span>
      <span>Message ID: ${payload.message_id}</span>
    </div>
  `;

  const selectedMksContent = jsonToHtml(payload.selectedMks, 0, 3);
  const editLogsContent = jsonToHtml(payload.editLogs, 0, 2);

  const detailsAccordion = createAccordionHtml(
    'ERA 最新操作详情',
    createAccordionHtml('SelectedMks（数组）', selectedMksContent, false) +
      createAccordionHtml('EditLogs（对象）', editLogsContent, false),
    false,
  );

  const tabs = [
    { key: 'pure', label: '纯净状态数据', content: jsonToHtml(payload.statWithoutMeta) },
    { key: 'full', label: '完整状态数据', content: jsonToHtml(payload.stat) },
  ];
  const tabsHtml = createTabsHtml(tabs);

  return metaHtml + detailsAccordion + tabsHtml;
}

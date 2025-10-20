/**
 * @file UI解析器，用于分析和操作酒馆UI元素。
 */
import _ from 'lodash';

/**
 * 表示消息UI的当前状态。
 * - 'display': 常规显示模式
 * - 'editing': 编辑模式
 */
export type MessageUIState = 'display' | 'editing';

/**
 * 包含从消息UI中提取的各种功能按钮的jQuery对象。
 */
export interface MessageButtons {
  // 常规按钮
  translate?: JQuery<HTMLElement>;
  generateImage?: JQuery<HTMLElement>;
  narrate?: JQuery<HTMLElement>;
  prompt?: JQuery<HTMLElement>;
  exclude?: JQuery<HTMLElement>;
  include?: JQuery<HTMLElement>;
  embed?: JQuery<HTMLElement>;
  createCheckpoint?: JQuery<HTMLElement>;
  createBranch?: JQuery<HTMLElement>;
  copy?: JQuery<HTMLElement>;
  edit?: JQuery<HTMLElement>;

  // 编辑模式下的按钮
  confirmEdit?: JQuery<HTMLElement>;
  copyInEdit?: JQuery<HTMLElement>;
  delete?: JQuery<HTMLElement>;
  moveUp?: JQuery<HTMLElement>;
  moveDown?: JQuery<HTMLElement>;
  cancelEdit?: JQuery<HTMLElement>;

  // 其他
  [key: string]: JQuery<HTMLElement> | undefined;
}

/**
 * 包含消息UI状态和所有可用按钮的对象。
 */
export interface MessageUIAnalysis {
  state: MessageUIState;
  buttons: MessageButtons;
}

/**
 * 分析指定消息div的UI状态，并返回其状态和所有功能按钮。
 * @param messageDiv 消息的jQuery对象，例如 $(`div.mes[mesid="..."]`)。
 * @returns 一个包含当前状态和按钮集合的对象。
 */
export function analyzeMessageUI(messageDiv: JQuery<HTMLElement>): MessageUIAnalysis {
  if (!messageDiv || messageDiv.length === 0) {
    throw new Error('传入的消息div无效。');
  }

  const isEditing = messageDiv.find('.mes_edit_buttons').is(':visible');
  const state: MessageUIState = isEditing ? 'editing' : 'display';

  const buttons: MessageButtons = {
    // 常规按钮
    translate: messageDiv.find('.mes_button.mes_translate'),
    generateImage: messageDiv.find('.mes_button.sd_message_gen'),
    narrate: messageDiv.find('.mes_button.mes_narrate'),
    prompt: messageDiv.find('.mes_button.mes_prompt'),
    exclude: messageDiv.find('.mes_button.mes_hide'),
    include: messageDiv.find('.mes_button.mes_unhide'),
    embed: messageDiv.find('.mes_button.mes_embed'),
    createCheckpoint: messageDiv.find('.mes_button.mes_create_bookmark'),
    createBranch: messageDiv.find('.mes_button.mes_create_branch'),
    copy: messageDiv.find('.mes_button.mes_copy'),
    edit: messageDiv.find('.mes_button.mes_edit'),

    // 编辑模式下的按钮
    confirmEdit: messageDiv.find('.mes_edit_done'),
    copyInEdit: messageDiv.find('.mes_edit_copy'),
    delete: messageDiv.find('.mes_edit_delete'),
    moveUp: messageDiv.find('.mes_edit_up'),
    moveDown: messageDiv.find('.mes_edit_down'),
    cancelEdit: messageDiv.find('.mes_edit_cancel'),
  };

  return {
    state,
    buttons,
  };
}

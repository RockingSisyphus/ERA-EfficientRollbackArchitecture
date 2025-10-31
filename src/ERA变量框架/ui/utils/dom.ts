export function createMountPoint(): JQuery<HTMLDivElement> {
  return $('<div>').attr('id', `era-ui-mount-point-${getScriptId()}`).css({
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    'z-index': 10000,
  }) as JQuery<HTMLDivElement>;
}

export function destroyMountPoint(): void {
  $(`div#era-ui-mount-point-${getScriptId()}`).remove();
}

export function teleportStyle(): void {
  const scriptId = getScriptId();
  // 先移除旧的，确保样式是最新的
  $(`head > div[script_id="${scriptId}"]`).remove();

  const $div = $('<div>').attr('script_id', scriptId).append($(document).find('head > style').clone());
  $('head').append($div);
}

export function deteleportStyle(): void {
  $(`head > div[script_id="${getScriptId()}"]`).remove();
}

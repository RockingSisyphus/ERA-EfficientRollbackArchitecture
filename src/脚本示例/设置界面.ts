import 界面 from './设置界面.vue';

const app = createApp(界面).use(createPinia());

$(() => {
  const $app = createScriptIdDiv();
  $('#extensions_settings2').append($app);
  teleportStyle();
  app.mount($app[0]);
});

$(window).on('unload', () => {
  app.unmount();
  deteleportStyle();
  destroyScriptIdDiv();
});

function teleportStyle() {
  if ($(`head > div[script_id="${getScriptId()}"]`).length > 0) {
    return;
  }
  const $div = $(`<div>`).attr('script_id', getScriptId()).append($(`head > style`, document).clone());
  $('head').append($div);
}

function deteleportStyle() {
  $(`head > div[script_id="${getScriptId()}"]`).remove();
}

function createScriptIdDiv(): JQuery<HTMLDivElement> {
  return $('<div>').attr('script_id', getScriptId()) as JQuery<HTMLDivElement>;
}

function destroyScriptIdDiv(): void {
  $(`div[script_id="${getScriptId()}"]`).remove();
}

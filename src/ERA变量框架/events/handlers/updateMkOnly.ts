'use strict';

import { updateLatestSelectedMk } from '../../core/key/mk';

export async function handleUpdateMkOnlyEvent(mk: string): Promise<void> {
  // 监听此事件仅用于为用户消息创建 MK。
  await updateLatestSelectedMk(mk);
}

/**
 * @file ERA 变量框架 - 回滚与历史追溯模块
 * @description
 * 该模块提供了 ERA 框架“时间旅行”能力的核心实现。它负责根据 `EditLog` 精确地撤销变量修改，
 * 以及在需要时向上追溯历史以查找变量的旧值。
 *
 * **设计理念**:
 * - **可逆操作**: 所有的变量写入操作都必须是可逆的。`rollbackByMk` 函数通过读取 `EditLog`
 *   并执行反向操作（`insert` -> `unset`, `update` -> `set to value_old`）来保证这一点。
 * - **历史的权威性**: `EditLog` 是变量状态变迁的唯一真实记录。`findLatestNewValue` 函数
 *   体现了这一原则，它不信任任何临时的变量快照，而是通过回溯 `EditLog` 链来查找一个变量
 *   在特定时间点之前的真实值。
 */

'use strict';

import { LOGS_PATH, SEL_PATH, STAT_DATA_PATH } from '../utils/constants';
import { J, parseEditLog } from '../utils/data';
import { getEraData, updateEraStatData } from '../utils/era_data';
import { Logger } from '../utils/log';
import { getMessageContent, isUserMessage } from '../utils/message';
import { readMessageKey } from './key/mk';
import { rollbackStatToMK } from './timetravel';

const logger = new Logger();

/**
 * **【回滚】**
 * 根据一个给定的消息密钥（MK），精确地撤销该消息所引入的所有变量变更。
 *
 * @param {string} MK - 要回滚的目标消息的密钥。
 * @param {boolean} [silent=false] - 是否为静默模式。在静默模式下，函数不会自己触发日志刷新，
 *   这在 `resyncStateOnHistoryChange` 等批量操作中非常有用，可以避免产生大量冗余日志。
 */
export async function rollbackByMk(MK: string, silent = false) {
  try {
    logger.log('rollbackByMk', `开始回滚, MK=${MK}`);

    const { meta, stat: currentStat } = getEraData();
    const selectedMks: string[] = _.get(meta, SEL_PATH, []);
    const allLogs: { [mk: string]: string } = _.get(meta, LOGS_PATH, {});

    const currentIndex = selectedMks.indexOf(MK);
    if (currentIndex === -1) {
      logger.error('rollbackByMk', `在 selectedMks 中未找到要回滚的 MK: ${MK}`);
      return;
    }

    // 即使是第一条消息(currentIndex=0)，targetMK 也会是 undefined，
    // rollbackStatToMK 会正确处理这种情况，回滚到初始状态。
    const targetMK = selectedMks[currentIndex - 1];

    const newStat = rollbackStatToMK(targetMK, MK, currentStat, selectedMks, allLogs);

    await updateEraStatData(() => {
      return newStat;
    });

    logger.log('rollbackByMk', `回滚完成：MK=${MK}`);
  } catch (e: any) {
    logger.error('rollbackByMk', `回滚异常：MK=${MK} → ${e?.message || e}`, e);
  }
}


/*
 * 旧的 calibrate 函数，其核心思想已被吸收进 `resyncStateOnHistoryChange` 的保险机制中。
 * 此处的注释被保留，因为它极好地解释了 ERA 框架如何巧妙地应对 SillyTavern 的一个核心“怪癖”。
 *
 * ### 校准主流程：比较“当前消息”与“上次选中的消息”并利用酒馆的特性巧妙地修复变量状态。
 *
 * @description
 * 这是 ERA 变量框架最核心的函数之一，它解决了一个非常棘手的问题：**删除 swipe 时的变量状态自动修复**。
 *
 * **酒馆的奇特行为 (Feature, not a bug):**
 * 当删除一条 swipe (例如，带有变量 id=2 的消息) 时：
 * 1. **内容与变量错位**: 后一条 swipe (id=3) 的**内容**会“顶”到被删除的 swipe (id=2) 的位置上，但**变量**却保留了 id=2 的变量。
 * 2. **孤儿变量残留**: 原本的 swipe 3 消息虽然在界面上消失了，但它对应的**消息变量** (id=3) 仍然残留在聊天数据中，成为“孤儿变量”。
 * 3. **孤儿变量继承**: 如果用户此时再 swipe 一次，新生成的 swipe 3 将会**继承**这个残留的孤儿变量 (id=3)，导致新内容配旧变量，进一步加剧状态混乱。
 * 4. **结果**: 我们得到了一个内容是 id=3、变量是 id=2 的“混合”消息，并且还有一个 id=3 的孤儿变量随时可能被新消息继承，造成严重的状态不一致。
 * 5. **无特定事件**: 此外，这个操作不会触发任何独特的事件，只会触发 `chat_id_changed` 等通用事件。
 *
 * **本函数的校准巧计:**
 * 本函数精确地利用了上述“状态错位”来完成自动修复：
 * 1. `calibrate` 被 `chat_id_changed` 事件触发。
 * 2. 它检测到 `oldMK` 存在 (它记录了被删除消息的 MK，即 id=2 的 MK)。
 * 3. **执行回滚**: `applyRollbackByMK(oldMK)` 被调用，将 id=2 引入的变量修改全部撤销。
 * 4. **触发重写**: `eventEmit('rollback_done_reapply_var_start')` 被触发。
 * 5. `ApplyVarChange` 函数响应重写事件，读取**当前**消息的**内容** (现在是 id=3 的内容)，并根据它重新写入变量。
 *
 * **最终效果**: “回滚了旧的(id=2)，重写了新的(id=3)”，变量状态被完美地自动修复。
 */

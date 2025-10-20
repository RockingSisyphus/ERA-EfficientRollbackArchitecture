/**
 * @file ERA 变量 API 分组测试脚本
 * @description 在酒馆助手脚本菜单中注册三个按钮，分别用于插入、更新和删除测试数据。
 * **使用说明**: 请按顺序点击按钮 (Insert -> Update/Delete) 以确保测试数据存在。
 */

import { Logger } from './utils';

const logger = new Logger('ApiTest');

// ==================================================================
// 测试用例组定义
// ==================================================================

/**
 * 插入测试组：
 * 建立一个完整的、包含多种数据类型的初始状态。
 */
const insertTestSuite = [
  {
    description: '1.1. 插入一个包含 user 和 items 的基础对象',
    event: 'era:insertByObject',
    data: {
      testData: {
        description: 'Initial state for testing',
        user: { name: 'Tester', level: 1 },
        items: ['apple', 'banana', 'cherry'],
        status: 'active',
      },
    },
  },
  {
    description: '1.2. 插入 inventory 对象',
    event: 'era:insertByPath',
    data: {
      path: 'testData.inventory',
      value: { gold: 100, slots: ['sword', 'shield'] },
    },
  },
  {
    description: '1.3. 插入 user.stats 对象',
    event: 'era:insertByPath',
    data: {
      path: 'testData.user.stats',
      value: { str: 10, dex: 8, int: 5 },
    },
  },
  {
    description: '1.4. 插入 metadata 对象',
    event: 'era:insertByObject',
    data: {
      testData: {
        metadata: { version: '1.0', author: 'Cline' },
      },
    },
  },
];

/**
 * 更新测试组：
 * 修改由 insertTestSuite 创建的数据。
 */
const updateTestSuite = [
  {
    description: '2.1. 更新 user.name',
    event: 'era:updateByPath',
    data: {
      path: 'testData.user.name',
      value: 'Advanced Tester',
    },
  },
  {
    description: '2.2. 通过对象合并更新 level 和 status',
    event: 'era:updateByObject',
    data: {
      testData: {
        user: { level: 5 },
        status: 'idle',
      },
    },
  },
  {
    description: '2.3. 直接赋值更新 gold',
    event: 'era:updateByPath',
    data: {
      path: 'testData.inventory.gold',
      value: 150,
    },
  },
];

/**
 * 删除测试组：
 * 删除由 insertTestSuite 创建的数据。
 */
const deleteTestSuite = [
  {
    description: '3.1. [ByPath] 删除 items 数组的第一个元素',
    event: 'era:deleteByPath',
    data: {
      path: 'testData.items[0]',
    },
  },
  {
    description: '3.2. [ByObject] 删除 user.stats 中的 int 属性',
    event: 'era:deleteByObject',
    data: {
      testData: {
        user: {
          stats: {
            int: {}, // 使用空对象表示删除'int'这个键
          },
        },
      },
    },
  },
  {
    description: '3.3. [ByObject] 删除整个 metadata 对象',
    event: 'era:deleteByObject',
    data: {
      testData: {
        metadata: {}, // 使用空对象表示删除'metadata'这个键
      },
    },
  },
  {
    description: '3.4. [ByPath] 删除整个 inventory 对象',
    event: 'era:deleteByPath',
    data: {
      path: 'testData.inventory',
    },
  },
];

// ==================================================================
// 事件监听器注册
// ==================================================================
$(() => {
  logger.log('init', 'ERA API 分组测试脚本已加载');

  /**
   * 辅助函数：执行一个测试套件
   * @param suite 要执行的测试套件数组
   * @param delay 每个动作之间的延迟（毫秒）
   */
  function runTestSuite(suite: any[], delay = 500) {
    suite.forEach((testCase, index) => {
      setTimeout(() => {
        logger.log('runTestSuite', `[${index + 1}/${suite.length}] ${testCase.description}`);
        eventEmit(testCase.event, testCase.data);
      }, index * delay);
    });
  }

  // 注册按钮
  eventOn(getButtonEvent('Run Insert Tests'), () => {
    runTestSuite(insertTestSuite);
  });

  eventOn(getButtonEvent('Run Update Tests'), () => {
    runTestSuite(updateTestSuite);
  });

  eventOn(getButtonEvent('Run Delete Tests'), () => {
    runTestSuite(deleteTestSuite);
  });

  eventOn(getButtonEvent('Get Current Vars'), () => {
    logger.log('runTestSuite', `[Get Current Vars] Triggering era:getCurrentVars`);
    eventEmit('era:getCurrentVars');
  });

  // 监听 ERA 框架的写入完成事件
  eventOn('era:writeDone', detail => {
    const { mk, message_id, actions, selectedMks, editLogs, stat, statWithoutMeta, consecutiveProcessingCount } =
      detail;
    const funcName = 'onWriteDone';

    // 如果是由 apiWrite 触发的，则跳过，避免循环
    if (detail?.actions?.apiWrite === true) {
      logger.log(funcName, '检测到 apiWrite 触发的事件，已跳过。');
      return;
    }

    logger.log(
      funcName,
      `接收到 era:writeDone 事件 (MK: ${mk}, MsgID: ${message_id}, Actions: ${JSON.stringify(actions)}, Consecutive: ${consecutiveProcessingCount})`,
    );

    // 使用 logger.debug 输出详细信息，避免在常规日志中刷屏
    logger.debug(funcName, '--- Event Payload Details ---');
    logger.debug(funcName, `Message Key (mk): ${mk}`);
    logger.debug(funcName, `Message ID (message_id): ${message_id}`);
    logger.debug(funcName, `Consecutive Processing Count: ${consecutiveProcessingCount}`);
    logger.debug(funcName, `Actions: ${JSON.stringify(actions, null, 2)}`);

    // 对于大型对象，使用 JSON.stringify 配合 logger.debug
    logger.debug(funcName, `Selected MKs (selectedMks): ${JSON.stringify(selectedMks, null, 2)}`);
    logger.debug(funcName, `Edit Logs (editLogs): ${JSON.stringify(editLogs, null, 2)}`);
    logger.debug(funcName, `Stat (with meta): ${JSON.stringify(stat, null, 2)}`);
    logger.debug(funcName, `Stat (without meta): ${JSON.stringify(statWithoutMeta, null, 2)}`);
    logger.debug(funcName, '---------------------------');
  });
});

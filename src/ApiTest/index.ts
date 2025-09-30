/**
 * @file ERA 变量 API 分组测试脚本
 * @description 在酒馆助手脚本菜单中注册几个按钮，每个按钮触发一组连续的测试操作。
 */

// ==================================================================
// 测试用例组定义
// ==================================================================

/**
 * 基础测试组：
 * 1. 初始化一个基本状态。
 * 2. 更新其中的一个值。
 * 3. 合并入一个新的对象。
 */
const basicTestSuite = [
  {
    description: '1.1. Initialize State',
    event: 'era:insertByObject',
    data: {
      testData: {
        description: 'Initial state',
        user: { name: 'Tester', level: 1 },
        items: ['apple', 'banana'],
      },
    },
  },
  {
    description: '1.2. Update user name',
    event: 'era:updateByPath',
    data: {
      path: 'testData.user.name',
      value: 'Advanced Tester',
    },
  },
  {
    description: '1.3. Update by merging an object',
    event: 'era:updateByObject',
    data: {
      testData: {
        user: { level: 2 }, // 更新嵌套值
        status: 'active', // 添加新键
      },
    },
  },
];

/**
 * 插入测试组：
 * 在基础状态上，连续插入新的数据。
 */
const insertionTestSuite = [
  {
    description: '2.1. Insert a new top-level key (inventory)',
    event: 'era:insertByPath',
    data: {
      path: 'testData.inventory',
      value: { gold: 100, slots: ['sword', 'shield'] },
    },
  },
  {
    description: '2.2. Insert a new nested key (user.stats)',
    event: 'era:insertByPath',
    data: {
      path: 'testData.user.stats',
      value: { str: 10, dex: 8 },
    },
  },
  {
    description: '2.3. Insert another object to merge at top level',
    event: 'era:insertByObject',
    data: {
      testData: {
        metadata: { version: '1.0' },
      },
    },
  },
];

// ==================================================================
// 事件监听器注册
// ==================================================================
$(() => {
  toastr.success('ERA API 分组测试脚本已加载');

  /**
   * 辅助函数：执行一个测试套件
   * @param suite 要执行的测试套件数组
   * @param delay 每个动作之间的延迟（毫秒）
   */
  function runTestSuite(suite: any[], delay = 500) {
    suite.forEach((testCase, index) => {
      setTimeout(() => {
        toastr.info(`[${index + 1}/${suite.length}] ${testCase.description}`);
        eventEmit(testCase.event, testCase.data);
      }, index * delay);
    });
  }

  // 注册按钮
  eventOn(getButtonEvent('RunBasicTestSuite'), () => {
    runTestSuite(basicTestSuite);
  });

  eventOn(getButtonEvent('RunInsertionTestSuite'), () => {
    runTestSuite(insertionTestSuite);
  });
});

const basicTestSuite = [ {
  description: "1.1. Initialize State",
  event: "era:insertByObject",
  data: {
    testData: {
      description: "Initial state",
      user: {
        name: "Tester",
        level: 1
      },
      items: [ "apple", "banana" ]
    }
  }
}, {
  description: "1.2. Update user name",
  event: "era:updateByPath",
  data: {
    path: "testData.user.name",
    value: "Advanced Tester"
  }
}, {
  description: "1.3. Update by merging an object",
  event: "era:updateByObject",
  data: {
    testData: {
      user: {
        level: 2
      },
      status: "active"
    }
  }
} ];

const insertionTestSuite = [ {
  description: "2.1. Insert a new top-level key (inventory)",
  event: "era:insertByPath",
  data: {
    path: "testData.inventory",
    value: {
      gold: 100,
      slots: [ "sword", "shield" ]
    }
  }
}, {
  description: "2.2. Insert a new nested key (user.stats)",
  event: "era:insertByPath",
  data: {
    path: "testData.user.stats",
    value: {
      str: 10,
      dex: 8
    }
  }
}, {
  description: "2.3. Insert another object to merge at top level",
  event: "era:insertByObject",
  data: {
    testData: {
      metadata: {
        version: "1.0"
      }
    }
  }
} ];

$(() => {
  toastr.success("ERA API 分组测试脚本已加载");
  function runTestSuite(suite, delay = 500) {
    suite.forEach((testCase, index) => {
      setTimeout(() => {
        toastr.info(`[${index + 1}/${suite.length}] ${testCase.description}`);
        eventEmit(testCase.event, testCase.data);
      }, index * delay);
    });
  }
  eventOn(getButtonEvent("RunBasicTestSuite"), () => {
    runTestSuite(basicTestSuite);
  });
  eventOn(getButtonEvent("RunInsertionTestSuite"), () => {
    runTestSuite(insertionTestSuite);
  });
});
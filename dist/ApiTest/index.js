var __webpack_exports__ = {};

const external_namespaceObject = _;

class Logger {
  moduleName;
  constructor(moduleName) {
    this.moduleName = moduleName;
  }
  formatMessage(funcName, message) {
    return `《ERA-ApiTest》「${this.moduleName}」【${funcName}】${String(message)}`;
  }
  debug(funcName, message) {
    console.debug(this.formatMessage(funcName, message));
  }
  log(funcName, message) {
    console.log(`%c${this.formatMessage(funcName, message)}`, "color: #3498db;");
  }
  warn(funcName, message) {
    console.warn(`%c${this.formatMessage(funcName, message)}`, "color: #f39c12;");
  }
  error(funcName, message, errorObj) {
    const formattedMessage = this.formatMessage(funcName, message);
    if (errorObj) {
      console.error(`%c${formattedMessage}`, "color: #e74c3c; font-weight: bold;", errorObj);
    } else {
      console.error(`%c${formattedMessage}`, "color: #e74c3c; font-weight: bold;");
    }
  }
}

function rnd() {
  return Math.random().toString(36).slice(2, 8);
}

const isPO = v => _.isPlainObject(v);

function extractBlocks(text, tag) {
  const blocks = [];
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "g");
  let m;
  while (m = re.exec(text)) {
    const rawBody = (m[1] || "").trim();
    const body = stripCodeFence(rawBody);
    if (body) blocks.push(body);
  }
  return blocks;
}

function stripCodeFence(s) {
  if (!s) return s;
  let t = String(s).trim();
  t = t.replace(/^\s*(?:```|~~~)[a-zA-Z0-9_-]*\s*\r?\n/, "");
  t = t.replace(/\r?\n(?:```|~~~)\s*$/, "");
  return t.trim();
}

function sanitizeArrays(v) {
  if (Array.isArray(v)) {
    return v.map(e => Array.isArray(e) || _.isPlainObject(e) ? JSON.stringify(e) : e);
  } else if (_.isPlainObject(v)) {
    const o = {};
    for (const k in v) o[k] = sanitizeArrays(v[k]);
    return o;
  } else {
    return v;
  }
}

const J = o => {
  try {
    return JSON.stringify(o, null, 2);
  } catch (e) {
    return `<<stringify失败: ${e?.message || e}>>`;
  }
};

function mergeReplaceArray(base, patch) {
  return _.mergeWith(_.cloneDeep(base), _.cloneDeep(patch), (a, b) => {
    if (Array.isArray(a) || Array.isArray(b)) return b;
    return undefined;
  });
}

function parseEditLog(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === "object") return [ raw ];
  if (typeof raw === "string") {
    const s = raw.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, "");
    try {
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parseJsonl(str, logger) {
  const objects = [];
  if (!str || typeof str !== "string") {
    return objects;
  }
  const strWithoutComments = str.replace(/\/\/.*/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/<!--[\s\S]*?-->/g, "");
  const trimmedStr = strWithoutComments.trim();
  let braceCount = 0;
  let startIndex = -1;
  let inString = false;
  for (let i = 0; i < trimmedStr.length; i++) {
    const char = trimmedStr[i];
    if (char === '"' && (i === 0 || trimmedStr[i - 1] !== "\\")) {
      inString = !inString;
    }
    if (inString) continue;
    if (char === "{") {
      if (braceCount === 0) {
        startIndex = i;
      }
      braceCount++;
    } else if (char === "}") {
      if (braceCount > 0) {
        braceCount--;
        if (braceCount === 0 && startIndex !== -1) {
          const jsonString = trimmedStr.substring(startIndex, i + 1);
          try {
            const obj = JSON.parse(jsonString);
            objects.push(obj);
          } catch (e) {
            logger?.error("parseJsonl", `JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, e);
          }
          startIndex = -1;
        }
      }
    }
  }
  return objects;
}

const logger = new Logger("ApiTest");

const insertTestSuite = [ {
  description: "1.1. 插入一个包含 user 和 items 的基础对象",
  event: "era:insertByObject",
  data: {
    testData: {
      description: "Initial state for testing",
      user: {
        name: "Tester",
        level: 1
      },
      items: [ "apple", "banana", "cherry" ],
      status: "active"
    }
  }
}, {
  description: "1.2. 插入 inventory 对象",
  event: "era:insertByPath",
  data: {
    path: "testData.inventory",
    value: {
      gold: 100,
      slots: [ "sword", "shield" ]
    }
  }
}, {
  description: "1.3. 插入 user.stats 对象",
  event: "era:insertByPath",
  data: {
    path: "testData.user.stats",
    value: {
      str: 10,
      dex: 8,
      int: 5
    }
  }
}, {
  description: "1.4. 插入 metadata 对象",
  event: "era:insertByObject",
  data: {
    testData: {
      metadata: {
        version: "1.0",
        author: "Cline"
      }
    }
  }
} ];

const updateTestSuite = [ {
  description: "2.1. 更新 user.name",
  event: "era:updateByPath",
  data: {
    path: "testData.user.name",
    value: "Advanced Tester"
  }
}, {
  description: "2.2. 通过对象合并更新 level 和 status",
  event: "era:updateByObject",
  data: {
    testData: {
      user: {
        level: 5
      },
      status: "idle"
    }
  }
}, {
  description: "2.3. 使用表达式更新 gold",
  event: "era:updateByPath",
  data: {
    path: "testData.inventory.gold",
    value: "+=50"
  }
} ];

const deleteTestSuite = [ {
  description: "3.1. [ByPath] 删除 items 数组的第一个元素",
  event: "era:deleteByPath",
  data: {
    path: "testData.items[0]"
  }
}, {
  description: "3.2. [ByObject] 删除 user.stats 中的 int 属性",
  event: "era:deleteByObject",
  data: {
    testData: {
      user: {
        stats: {
          int: {}
        }
      }
    }
  }
}, {
  description: "3.3. [ByObject] 删除整个 metadata 对象",
  event: "era:deleteByObject",
  data: {
    testData: {
      metadata: {}
    }
  }
}, {
  description: "3.4. [ByPath] 删除整个 inventory 对象",
  event: "era:deleteByPath",
  data: {
    path: "testData.inventory"
  }
} ];

$(() => {
  logger.log("init", "ERA API 分组测试脚本已加载");
  function runTestSuite(suite, delay = 500) {
    suite.forEach((testCase, index) => {
      setTimeout(() => {
        logger.log("runTestSuite", `[${index + 1}/${suite.length}] ${testCase.description}`);
        eventEmit(testCase.event, testCase.data);
      }, index * delay);
    });
  }
  eventOn(getButtonEvent("Run Insert Tests"), () => {
    runTestSuite(insertTestSuite);
  });
  eventOn(getButtonEvent("Run Update Tests"), () => {
    runTestSuite(updateTestSuite);
  });
  eventOn(getButtonEvent("Run Delete Tests"), () => {
    runTestSuite(deleteTestSuite);
  });
});
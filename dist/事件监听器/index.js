const external_namespaceObject = _;

class Logger {
  moduleName;
  constructor(moduleName) {
    this.moduleName = moduleName;
  }
  formatMessage(funcName, message) {
    return `《ERA-事件监听器》「${this.moduleName}」【${funcName}】${String(message)}`;
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

(() => {
  "use strict";
  const logger = new Logger("事件监听器");
  const now = () => performance && performance.now ? performance.now() : Date.now();
  let SEQ = 0;
  let chain = Promise.resolve();
  const enqueue = task => {
    chain = chain.then(task).catch(e => {
      logger.error("enqueue", `【监听错误】${e?.message || e}`, e);
    });
  };
  const safe = v => {
    try {
      return JSON.stringify(v, (k, val) => {
        if (typeof val === "string" && val.length > 300) return `${val.slice(0, 300)}…(${val.length})`;
        if (typeof val === "function") return `[Function ${val.name || "anonymous"}]`;
        if (val && typeof Element !== "undefined" && val instanceof Element) return `[Element <${val.tagName}>]`;
        if (val && typeof val.jquery === "string") return `[jQuery ${val.length}]`;
        return val;
      });
    } catch {
      try {
        return String(v);
      } catch {
        return "[Unserializable]";
      }
    }
  };
  const attach = eventName => {
    const handler = (...args) => {
      const id = ++SEQ;
      const t = now();
      enqueue(async () => {
        let logMessage = `[#${id}] 触发事件：${eventName} @${t.toFixed ? t.toFixed(3) : t}`;
        if (args.length > 0) {
          logMessage += ` | 数据：${args.map(a => safe(a)).join(" | ")}`;
        }
        logger.log("handler", logMessage);
      });
    };
    try {
      eventMakeFirst(eventName, handler);
    } catch {
      eventOn(eventName, handler);
    }
  };
  const iframeList = Object.values(typeof iframe_events !== "undefined" && iframe_events || {});
  const tavernList = Object.values(typeof tavern_events !== "undefined" && tavern_events || {});
  iframeList.forEach(attach);
  tavernList.forEach(attach);
  enqueue(async () => {
    logger.log("main", `【事件监听就绪】iframe=${iframeList.length}，tavern=${tavernList.length}（统一串行输出，保障顺序）`);
  });
})();
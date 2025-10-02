var __webpack_require__ = {};

(() => {
  __webpack_require__.n = module => {
    var getter = module && module.__esModule ? () => module["default"] : () => module;
    __webpack_require__.d(getter, {
      a: getter
    });
    return getter;
  };
})();

(() => {
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key]
        });
      }
    }
  };
})();

(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();

var __webpack_exports__ = {};

const CHAT_SCOPE = {
  type: "chat"
};

const META_DATA_PATH = "ERAMetaData";

const STAT_DATA_PATH = "stat_data";

const LOGS_PATH = "EditLogs";

const SEL_PATH = "SelectedMks";

const ERA_API_EVENTS = {
  INSERT_BY_OBJECT: "era:insertByObject",
  UPDATE_BY_OBJECT: "era:updateByObject",
  INSERT_BY_PATH: "era:insertByPath",
  UPDATE_BY_PATH: "era:updateByPath",
  DELETE_BY_OBJECT: "era:deleteByObject",
  DELETE_BY_PATH: "era:deleteByPath"
};

const ERA_EVENT_EMITTER = {
  WRITE_DONE: "era:writeDone",
  API_WRITE: "era:apiWrite"
};

const EVENT_GROUPS = {
  WRITE: [ tavern_events.APP_READY, "manual_write", ERA_EVENT_EMITTER.API_WRITE ],
  SYNC: [ tavern_events.MESSAGE_RECEIVED, tavern_events.MESSAGE_DELETED, tavern_events.MESSAGE_SWIPED, tavern_events.CHAT_CHANGED, "manual_sync", "manual_full_sync" ],
  API: Object.values(ERA_API_EVENTS),
  UPDATE_MK_ONLY: [ tavern_events.MESSAGE_SENT ],
  COLLISION_DETECTORS: [ tavern_events.GENERATION_STARTED ]
};

const EVENT_COLLISION_MAP = new Map([ [ tavern_events.MESSAGE_SWIPED, tavern_events.GENERATION_STARTED ] ]);

const RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION = 1;

const LOG_CONFIG = {
  levels: {
    debug: 0,
    log: 1,
    warn: 2,
    error: 3
  },
  currentLevel: 0,
  debugWhitelist: [ "event_queue", "message_key" ]
};

LOG_CONFIG.currentLevel = LOG_CONFIG.levels.debug;

const external_namespaceObject = _;

var external_default = __webpack_require__.n(external_namespaceObject);

const logContext = {
  mk: ""
};

class Logger {
  moduleName;
  constructor(moduleName) {
    this.moduleName = moduleName;
  }
  formatMessage(funcName, message) {
    const mkString = logContext.mk ? `（${logContext.mk}）` : "";
    return `《ERA》${mkString}「${this.moduleName}」【${funcName}】${String(message)}`;
  }
  debug(funcName, message, obj) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.debug) return;
    if (LOG_CONFIG.currentLevel === LOG_CONFIG.levels.debug && !LOG_CONFIG.debugWhitelist.includes(this.moduleName)) {
      return;
    }
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj) {
      console.debug(formattedMessage, obj);
    } else {
      console.debug(formattedMessage);
    }
  }
  log(funcName, message, obj) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.log) return;
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj) {
      console.log(`%c${formattedMessage}`, "color: #3498db;", obj);
    } else {
      console.log(`%c${formattedMessage}`, "color: #3498db;");
    }
  }
  warn(funcName, message, obj) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.warn) return;
    const formattedMessage = this.formatMessage(funcName, message);
    if (obj) {
      console.warn(`%c${formattedMessage}`, "color: #f39c12;", obj);
    } else {
      console.warn(`%c${formattedMessage}`, "color: #f39c12;");
    }
  }
  error(funcName, message, errorObj) {
    if (LOG_CONFIG.currentLevel > LOG_CONFIG.levels.error) return;
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

const isPO = v => external_default().isPlainObject(v);

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
    return v.map(e => Array.isArray(e) || external_default().isPlainObject(e) ? JSON.stringify(e) : e);
  } else if (external_default().isPlainObject(v)) {
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
  return external_default().mergeWith(external_default().cloneDeep(base), external_default().cloneDeep(patch), (a, b) => {
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

function removeMetaFields(obj) {
  if (!external_default().isObject(obj)) {
    return obj;
  }
  const newObj = external_default().cloneDeep(obj);
  function recurse(current) {
    if (Array.isArray(current)) {
      current.forEach(item => recurse(item));
    } else if (isPO(current)) {
      for (const key in current) {
        if (key.startsWith("$")) {
          delete current[key];
        } else {
          recurse(current[key]);
        }
      }
    }
  }
  recurse(newObj);
  return newObj;
}

function getEraData() {
  const chatVars = getVariables(CHAT_SCOPE) || {};
  const meta = external_default().get(chatVars, META_DATA_PATH, {});
  const stat = external_default().get(chatVars, STAT_DATA_PATH, {});
  return {
    meta,
    stat
  };
}

async function updateEraStatData(updater) {
  await updateVariablesWith(async v => {
    const currentStat = external_default().get(v, STAT_DATA_PATH, {});
    const newStat = await updater(currentStat);
    external_default().set(v, STAT_DATA_PATH, newStat);
    return v;
  }, CHAT_SCOPE);
}

async function updateEraMetaData(updater) {
  await updateVariablesWith(async v => {
    const currentMeta = external_default().get(v, META_DATA_PATH, {});
    const newMeta = await updater(currentMeta);
    external_default().set(v, META_DATA_PATH, newMeta);
    return v;
  }, CHAT_SCOPE);
}

async function updateMessageContent(message, newContent) {
  const updatePayload = {
    message_id: message.message_id
  };
  if (Array.isArray(message.swipes)) {
    const sid = Number(message.swipe_id ?? 0);
    const newSwipes = [ ...message.swipes ];
    newSwipes[sid] = newContent;
    updatePayload.swipes = newSwipes;
  } else {
    updatePayload.message = newContent;
  }
  await setChatMessages([ updatePayload ]);
}

const logger = new Logger("message_key");

const ERA_DATA_TAG = "era_data";

const ERA_DATA_REGEX = new RegExp(`<${ERA_DATA_TAG}>({.*?})<\\/${ERA_DATA_TAG}>`);

function getMessageContent(msg) {
  if (!msg) return null;
  if (typeof msg.mes === "string") {
    return msg.mes;
  }
  if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    return msg.swipes[sid] || null;
  }
  if (typeof msg.message === "string") {
    return msg.message;
  }
  return null;
}

function parseEraData(messageContent) {
  if (typeof messageContent !== "string") {
    return null;
  }
  const match = messageContent.match(ERA_DATA_REGEX);
  if (!match || !match[1]) {
    return null;
  }
  try {
    const customFormatBlock = match[1];
    const keyMatch = customFormatBlock.match(/"era-message-key"\s*=\s*"(.*?)"/);
    const typeMatch = customFormatBlock.match(/"era-message-type"\s*=\s*"(.*?)"/);
    if (keyMatch?.[1] && typeMatch?.[1]) {
      return {
        "era-message-key": keyMatch[1],
        "era-message-type": typeMatch[1]
      };
    }
    return null;
  } catch {
    return null;
  }
}

function readMessageKey(msg) {
  if (!msg) return "";
  const content = getMessageContent(msg);
  const mk = parseEraData(content)?.["era-message-key"] || "";
  return mk;
}

function isUserMessage(msg) {
  const content = getMessageContent(msg);
  const data = parseEraData(content);
  if (data) {
    return data["era-message-type"] === "user";
  }
  return msg?.role === "user";
}

async function ensureMessageKey(msg) {
  if (!msg || typeof msg.message_id !== "number" || !msg.role) {
    logger.warn("ensureMessageKey", `无效的消息对象结构，无法确保Key。msg=${JSON.stringify(msg)}`);
    return {
      mk: "",
      isNew: false
    };
  }
  const existingMk = readMessageKey(msg);
  if (existingMk) {
    return {
      mk: existingMk,
      isNew: false
    };
  }
  const newMk = `era_mk_${Date.now()}_${rnd()}`;
  const messageType = msg.role === "user" ? "user" : "assistant";
  const dataString = `<${ERA_DATA_TAG}>{"era-message-key"="${newMk}","era-message-type"="${messageType}"}</${ERA_DATA_TAG}>`;
  logger.log("ensureMessageKey", `为消息 (ID: ${msg.message_id}) 注入新的Key: ${newMk}`);
  const currentContent = getMessageContent(msg) ?? "";
  const newContent = dataString + "\n" + currentContent;
  await updateMessageContent(msg, newContent);
  return {
    mk: newMk,
    isNew: true
  };
}

const ensureMkForLatestMessage = async () => {
  try {
    const msg = getChatMessages(-1, {
      include_swipes: true
    })?.[0];
    logger.debug("ensureMkForLatestMessage", `获取到的最新消息对象 (msg): ${JSON.stringify(msg)}`);
    if (!msg || typeof msg.message_id !== "number") {
      logger.warn("ensureMkForLatestMessage", "无法读取最新消息或其ID，退出");
      return {
        mk: "",
        message_id: null,
        isNewKey: false
      };
    }
    const {mk, isNew} = await ensureMessageKey(msg);
    logger.log("ensureMkForLatestMessage", `已为最新消息 ${msg.message_id} 确保 MK 存在。 (是否新建: ${isNew})`);
    return {
      mk,
      message_id: msg.message_id,
      isNewKey: isNew
    };
  } catch (err) {
    logger.error("ensureMkForLatestMessage", `确保MK时异常: ${err?.message || err}`, err);
    return {
      mk: "",
      message_id: null,
      isNewKey: false
    };
  }
};

const updateLatestSelectedMk = async () => {
  const msg = getChatMessages(-1, {
    include_swipes: true
  })?.[0];
  if (!msg || typeof msg.message_id !== "number") return;
  const {mk: MK} = await ensureMessageKey(msg);
  if (!MK) return;
  await updateEraMetaData(meta => {
    const selectedMks = _.get(meta, SEL_PATH, []);
    if (selectedMks[msg.message_id] !== MK) {
      selectedMks[msg.message_id] = MK;
      _.set(meta, SEL_PATH, selectedMks);
    }
    return meta;
  });
};

const api_logger = new Logger("api");

const debouncedEmitApiWrite = external_default().debounce(() => {
  eventEmit(ERA_EVENT_EMITTER.API_WRITE);
  api_logger.log("debouncedEmitApiWrite", `已触发合并后的 ${ERA_EVENT_EMITTER.API_WRITE} 事件。`);
}, 700, {
  leading: false,
  trailing: true
});

async function findLastAiMessage() {
  const messages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: true
  });
  if (!messages || messages.length === 0) {
    return null;
  }
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") {
      return messages[i];
    }
  }
  return null;
}

async function performApiWrite(job) {
  const contentString = J(job.blockContent);
  const block = `\n<${job.blockTag}>\n${contentString}\n</${job.blockTag}>`;
  const lastAiMessage = await findLastAiMessage();
  if (!lastAiMessage) {
    api_logger.warn("performApiWrite", "找不到任何 AI 消息，无法执行 API 写入。");
    return;
  }
  const originalContent = getMessageContent(lastAiMessage) ?? "";
  const newContent = originalContent + block;
  api_logger.log("performApiWrite", `实时写入 API 任务 (${job.blockTag}) 到消息 ID ${lastAiMessage.message_id}...`);
  await updateMessageContent(lastAiMessage, newContent);
  debouncedEmitApiWrite();
}

function insertByObject(data) {
  performApiWrite({
    blockTag: "VariableInsert",
    blockContent: data
  });
}

function updateByObject(data) {
  performApiWrite({
    blockTag: "VariableEdit",
    blockContent: data
  });
}

function insertByPath(path, value) {
  const block = external_default().set({}, path, value);
  performApiWrite({
    blockTag: "VariableInsert",
    blockContent: block
  });
}

function updateByPath(path, value) {
  const block = external_default().set({}, path, value);
  performApiWrite({
    blockTag: "VariableEdit",
    blockContent: block
  });
}

function deleteByObject(data) {
  performApiWrite({
    blockTag: "VariableDelete",
    blockContent: data
  });
}

function deleteByPath(path) {
  const block = external_default().set({}, path, {});
  performApiWrite({
    blockTag: "VariableDelete",
    blockContent: block
  });
}

function emitWriteDoneEvent(payload) {
  eventEmit(ERA_EVENT_EMITTER.WRITE_DONE, payload);
  api_logger.log("emitWriteDoneEvent", `已触发 ${ERA_EVENT_EMITTER.WRITE_DONE} 事件。操作: ${JSON.stringify(payload.actions)}, MK: ${payload.mk}, MsgID: ${payload.message_id}`);
}

const rollback_logger = new Logger("rollback");

async function rollbackByMk(MK, silent = false) {
  try {
    rollback_logger.log("rollbackByMk", `开始回滚, MK=${MK}`);
    await updateVariablesWith(v => {
      const meta = _.get(v, META_DATA_PATH, {});
      const stat = _.get(v, STAT_DATA_PATH, {});
      const raw = _.get(meta, [ LOGS_PATH, MK ]);
      const arr = parseEditLog(raw);
      if (!arr || !arr.length) {
        rollback_logger.debug("rollbackByMk", `EditLog 为空或无效，跳过回滚。`);
        return v;
      }
      for (let i = arr.length - 1; i >= 0; i--) {
        const e = arr[i];
        const op = String(e?.op || "").toLowerCase();
        const path = String(e?.path || "");
        if (!path) continue;
        if (op === "insert") {
          _.unset(stat, path);
          continue;
        }
        if (op === "update" || op === "delete") {
          if (typeof e?.value_old === "undefined") {
            _.unset(stat, path);
          } else {
            _.set(stat, path, _.cloneDeep(e.value_old));
          }
        }
      }
      _.set(v, STAT_DATA_PATH, stat);
      return v;
    }, CHAT_SCOPE);
    rollback_logger.log("rollbackByMk", `回滚完成：MK=${MK}`);
  } catch (e) {
    rollback_logger.error("rollbackByMk", `回滚异常：MK=${MK} → ${e?.message || e}`, e);
  }
}

async function findLatestNewValue(path, startMessageId, logger) {
  logger?.debug("findLatestNewValue", `开始为路径 <${path}> 从消息ID <${startMessageId}> 向上追溯历史值...`);
  const messages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: false
  });
  if (!messages || messages.length < 1) {
    logger?.debug("findLatestNewValue", `消息历史为空，无法追溯。`);
    return null;
  }
  const startIndex = messages.findIndex(m => m.message_id === startMessageId);
  if (startIndex === -1) {
    logger?.warn("findLatestNewValue", `错误：在消息列表中未找到起始消息ID: ${startMessageId}`);
    return null;
  }
  for (let i = startIndex - 1; i >= 0; i--) {
    const message = messages[i];
    const msgId = message?.message_id;
    logger?.debug("findLatestNewValue", `[进度] 正在检查消息 (ID: ${msgId})，内容: "${(getMessageContent(message) || "").substring(0, 100)}..."`);
    if (isUserMessage(message) || typeof msgId !== "number") {
      continue;
    }
    const mk = readMessageKey(message);
    if (!mk) {
      logger?.debug("findLatestNewValue", `[进度] 消息 (ID: ${msgId}) 无 MK，跳过。`);
      continue;
    }
    const {meta: metaData} = getEraData();
    const editLogRaw = _.get(metaData, [ LOGS_PATH, mk ]);
    const editLog = parseEditLog(editLogRaw);
    if (!editLog || editLog.length === 0) {
      logger?.debug("findLatestNewValue", `[进度] MK ${mk} 的 EditLog 为空，跳过。`);
      continue;
    }
    logger?.debug("findLatestNewValue", `[进度] 正在检查 MK ${mk} 的 EditLog...\n${J(editLog)}`);
    for (let j = editLog.length - 1; j >= 0; j--) {
      const logEntry = editLog[j];
      if (!logEntry || !logEntry.path) continue;
      if (logEntry.path === path) {
        if (logEntry.op === "delete") {
          logger?.error("findLatestNewValue", `>> 状态异常! 在消息(ID:${message.message_id}, MK:${mk})中为路径 <${path}> 找到了 'delete' 记录。这表明 update 操作可能正在尝试修改一个已被删除的变量。`);
          return null;
        }
        logger?.debug("findLatestNewValue", `>> 成功! 在消息(ID:${message.message_id}, MK:${mk})中找到精确路径 <${path}> 的值为: ${J(logEntry.value_new)}`);
        return _.cloneDeep(logEntry.value_new);
      }
      if (path.startsWith(logEntry.path + ".")) {
        const subPath = path.substring(logEntry.path.length + 1);
        const parentNewVal = logEntry.value_new;
        if (_.isPlainObject(parentNewVal) && _.has(parentNewVal, subPath)) {
          const foundVal = _.get(parentNewVal, subPath);
          logger?.debug("findLatestNewValue", `>> 成功! 在消息(ID:${message.message_id}, MK:${mk})中找到父级路径 <${logEntry.path}>, 并从中提取子路径 <${subPath}> 的值为: ${J(foundVal)}`);
          return _.cloneDeep(foundVal);
        }
      }
    }
  }
  logger?.debug("findLatestNewValue", `向上追溯未找到路径 ${path} 的任何历史值，将使用 null 作为旧值`);
  return null;
}

function applyDeleteAtLevel(statData, basePath, patchObj, editLog, logger) {
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
  if (currentNodeInVars === undefined) {
    logger.warn("applyDeleteAtLevel", `VariableDelete 跳过：路径不存在 -> ${basePath || "(root)"}`);
    return;
  }
  const necessary = _.get(currentNodeInVars, [ "$meta", "necessary" ]);
  const metaPatch = _.get(patchObj, "$meta");
  const isBypassingProtection = _.isPlainObject(metaPatch) && _.isEmpty(metaPatch) || _.has(patchObj, [ "$meta", "necessary" ]);
  if (_.isPlainObject(patchObj) && !_.isEmpty(patchObj)) {
    if (necessary === "all" && !isBypassingProtection) {
      logger.warn("applyDeleteAtLevel", `VariableDelete 失败：路径 <${basePath}> 受 "necessary: all" 保护，其子节点无法被删除。`);
      return;
    }
    for (const key of Object.keys(patchObj)) {
      const fullPath = basePath ? `${basePath}.${key}` : key;
      const subPatchObj = patchObj[key];
      applyDeleteAtLevel(statData, fullPath, subPatchObj, editLog, logger);
    }
    return;
  }
  if (necessary === "self" || necessary === "all") {
    logger.warn("applyDeleteAtLevel", `VariableDelete 失败：路径 <${basePath}> 受 "necessary: ${necessary}" 保护，无法被直接删除。`);
    return;
  }
  if (basePath === "") {
    logger.error("applyDeleteAtLevel", "VariableDelete 失败：不允许删除根对象。");
    return;
  }
  const valOld = _.cloneDeep(currentNodeInVars);
  _.unset(statData, basePath);
  editLog.push({
    op: "delete",
    path: basePath,
    value_old: valOld
  });
  logger.debug("applyDeleteAtLevel", `成功删除节点: ${basePath}`);
}

async function processDeleteBlocks(allDeletes, editLog, logger) {
  if (allDeletes.length > 0) {
    for (const deleteRoot of allDeletes) {
      if (!_.isPlainObject(deleteRoot) || _.isEmpty(deleteRoot)) continue;
      try {
        await updateEraStatData(stat => {
          logger.debug("processDeleteBlocks", `处理 deleteRoot: ${JSON.stringify(deleteRoot)}`);
          applyDeleteAtLevel(stat, "", deleteRoot, editLog, logger);
          return stat;
        });
      } catch (e) {
        logger.error("processDeleteBlocks", `处理 deleteRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log("processDeleteBlocks", "所有 VariableDelete 操作完成");
  }
}

function resolveTemplate(inheritedContent, parentNodeData, logger) {
  const varsContent = _.get(parentNodeData, "$template");
  logger.debug("resolveTemplate", `解析出的模板内容:\n    - 继承: ${JSON.stringify(inheritedContent)}\n    - 父节点变量: ${JSON.stringify(varsContent)}`);
  let mergedContent = {};
  mergedContent = mergeReplaceArray(mergedContent, inheritedContent);
  mergedContent = mergeReplaceArray(mergedContent, varsContent);
  logger.debug("resolveTemplate", `合并后的最终模板内容: ${JSON.stringify(mergedContent)}`);
  if (_.isEmpty(mergedContent)) {
    return null;
  }
  return mergedContent;
}

function getInheritedTemplateContent(parentTplContent, key, logger) {
  if (!parentTplContent) return undefined;
  const prototypeContent = _.get(parentTplContent, "$template");
  const specificContent = _.get(parentTplContent, key);
  if (_.isPlainObject(prototypeContent) && _.isPlainObject(specificContent)) {
    logger.debug("getInheritedTemplateContent", `为子节点 "${key}" 同时找到原型和特异性内容。\n      - 原型: ${JSON.stringify(prototypeContent)}\n      - 特异性: ${JSON.stringify(specificContent)}`);
    const merged = mergeReplaceArray(_.cloneDeep(prototypeContent), specificContent);
    logger.debug("getInheritedTemplateContent", `  - 合并后: ${JSON.stringify(merged)}`);
    return merged;
  } else if (_.isPlainObject(specificContent)) {
    logger.debug("getInheritedTemplateContent", `为子节点 "${key}" 只找到特异性内容: ${JSON.stringify(specificContent)}`);
    return specificContent;
  } else if (_.isPlainObject(prototypeContent)) {
    logger.debug("getInheritedTemplateContent", `为子节点 "${key}" 只找到原型内容: ${JSON.stringify(prototypeContent)}`);
    return prototypeContent;
  }
  logger.debug("getInheritedTemplateContent", `在父级模板内容中未为子节点 "${key}" 找到任何可继承的规则。`);
  return undefined;
}

function applyTemplateToPatch(tplContent, patchObj, logger) {
  logger.debug("applyTemplateToPatch", `[进入] 模板内容: ${JSON.stringify(tplContent)}, 补丁: ${JSON.stringify(patchObj)}`);
  if (!_.isPlainObject(patchObj)) {
    logger.debug("applyTemplateToPatch", `[退出] 补丁不是一个普通对象，直接返回。`);
    return patchObj;
  }
  if (!tplContent) {
    logger.debug("applyTemplateToPatch", `[退出] 模板内容无效，直接返回补丁。`);
    return patchObj;
  }
  if (_.isEmpty(patchObj)) {
    logger.debug("applyTemplateToPatch", `补丁为空对象，完全使用模板内容。`);
    return _.cloneDeep(tplContent);
  }
  const composed = mergeReplaceArray(_.cloneDeep(tplContent), patchObj);
  logger.debug("applyTemplateToPatch", `合并模板与补丁后的结果: ${JSON.stringify(composed)}`);
  return composed;
}

function applyInsertAtLevel(statData, basePath, patchObj, editLog, inheritedContent, parentData, logger) {
  const localTplContent = resolveTemplate(inheritedContent, parentData, logger);
  logger.debug("applyInsertAtLevel", `[入口] basePath: "${basePath || "root"}"`, {
    statData: _.cloneDeep(statData)
  });
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
  logger.debug("applyInsertAtLevel", `[路径检查] at path: "${basePath || "root"}". currentNodeInVars 的值:`, currentNodeInVars);
  if (basePath && currentNodeInVars === undefined) {
    const composed = applyTemplateToPatch(localTplContent, patchObj, logger);
    const finalValue = sanitizeArrays(composed);
    logger.debug("applyInsertAtLevel", `最终插入数据 at ${basePath}:\n${JSON.stringify(finalValue, null, 2)}`);
    _.set(statData, basePath, finalValue);
    editLog.push({
      op: "insert",
      path: basePath,
      value_new: _.cloneDeep(finalValue)
    });
    logger.debug("applyInsertAtLevel", `原子性插入到新路径: ${basePath}`);
    return;
  }
  if (_.isPlainObject(currentNodeInVars) && _.isPlainObject(patchObj)) {
    logger.debug("applyInsertAtLevel", `[递归补充] at path: "${basePath || "root"}"\n      - 当前层级模板 (localTplContent): ${JSON.stringify(localTplContent)}`);
    for (const key of Object.keys(patchObj)) {
      const subPath = basePath ? `${basePath}.${key}` : key;
      const subPatch = patchObj[key];
      const subInheritedContent = getInheritedTemplateContent(localTplContent, key, logger);
      logger.debug("applyInsertAtLevel", `  - 准备递归子节点: "${key}"\n      - 将传递给子节点的模板 (subInheritedContent): ${JSON.stringify(subInheritedContent)}`);
      applyInsertAtLevel(statData, subPath, subPatch, editLog, subInheritedContent, currentNodeInVars, logger);
    }
  } else if (basePath) {
    logger.warn("applyInsertAtLevel", `VariableInsert 失败：路径已存在且无法递归补充 -> ${basePath}`);
  }
}

async function processInsertBlocks(allInserts, editLog, logger) {
  if (allInserts.length > 0) {
    await updateEraStatData(async stat => {
      logger.debug("processInsertBlocks", "[初始状态] 进入 processInsertBlocks 时的 statData:", _.cloneDeep(stat));
      return stat;
    });
    for (const insertRoot of allInserts) {
      if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
      try {
        await updateEraStatData(stat => {
          logger.debug("processInsertBlocks", `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
          applyInsertAtLevel(stat, "", insertRoot, editLog, null, null, logger);
          return stat;
        });
      } catch (e) {
        logger.error("processInsertBlocks", `处理 insertRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log("processInsertBlocks", "所有 VariableInsert 操作完成");
  }
}

async function applyEditAtLevel(statData, basePath, patchObj, editLog, logger, messageId, intraMessageState) {
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
  if (currentNodeInVars === undefined) {
    logger.warn("applyEditAtLevel", `VariableEdit 跳过：路径不存在 -> ${basePath || "(root)"}`);
    return;
  }
  const isUpdatable = _.get(currentNodeInVars, [ "$meta", "updatable" ], true);
  const isBypassingProtection = isUpdatable === false && _.get(patchObj, [ "$meta", "updatable" ]) === true;
  if (isUpdatable === false && !isBypassingProtection) {
    logger.warn("applyEditAtLevel", `VariableEdit 失败：路径 <${basePath}> 受 "$meta.updatable: false" 保护，无法被修改。`);
    return;
  }
  for (const key of Object.keys(patchObj)) {
    const subPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];
    if (_.isPlainObject(valNew)) {
      await applyEditAtLevel(statData, subPath, valNew, editLog, logger, messageId, intraMessageState);
      continue;
    }
    if (!_.has(statData, subPath)) {
      logger.warn("applyEditAtLevel", `VariableEdit 失败：路径非法，无法写入 -> ${subPath}`);
      continue;
    }
    logger.debug("applyEditAtLevel", `[旧值查找] 准备为路径 <${subPath}> 从消息 ID <${messageId}> 向上追溯...`);
    let valOld = await findLatestNewValue(subPath, messageId, logger);
    if (valOld === null) {
      valOld = _.get(statData, subPath);
      logger.debug("applyEditAtLevel", `[旧值查找] 追溯未找到历史值，从当前 stat_data 中获取到旧值: ${JSON.stringify(valOld)}`);
    } else {
      logger.debug("applyEditAtLevel", `[旧值查找] 追溯成功，找到历史旧值: ${JSON.stringify(valOld)}`);
    }
    const cleaned = sanitizeArrays(valNew);
    _.set(statData, subPath, cleaned);
    editLog.push({
      op: "update",
      path: subPath,
      value_old: _.cloneDeep(valOld),
      value_new: _.cloneDeep(cleaned)
    });
    intraMessageState.set(subPath, _.cloneDeep(cleaned));
  }
}

async function processEditBlocks(allEdits, editLog, messageId, logger) {
  if (allEdits.length > 0) {
    const intraMessageState = new Map;
    for (const editRoot of allEdits) {
      if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot)) continue;
      try {
        await updateEraStatData(async stat => {
          logger.debug("processEditBlocks", `处理 editRoot: ${JSON.stringify(editRoot)}`);
          await applyEditAtLevel(stat, "", editRoot, editLog, logger, messageId, intraMessageState);
          return stat;
        });
      } catch (e) {
        logger.error("processEditBlocks", `处理 editRoot 失败: ${e?.message || e}`, e);
      }
    }
    logger.log("processEditBlocks", "所有 VariableEdit 操作完成");
  }
}

const variable_change_processor_logger = new Logger("write");

const ApplyVarChangeForMessage = async msg => {
  try {
    if (!msg || typeof msg.message_id !== "number") {
      variable_change_processor_logger.warn("ApplyVarChangeForMessage", "无效消息对象或缺少 message_id，退出");
      return null;
    }
    const messageId = msg.message_id;
    const MK = readMessageKey(msg);
    if (!MK) {
      variable_change_processor_logger.debug("ApplyVarChangeForMessage", `消息 (ID: ${messageId}) 不含 MK，跳过变量写入。`);
      return null;
    }
    if (isUserMessage(msg)) {
      variable_change_processor_logger.debug("ApplyVarChangeForMessage", `消息 (ID: ${messageId}) 为用户消息，跳过变量写入，但保留其 MK。`);
      return MK;
    }
    const rawContent = getMessageContent(msg) || "";
    const insertBlocks = extractBlocks(rawContent, "VariableInsert");
    const editBlocks = extractBlocks(rawContent, "VariableEdit");
    const deleteBlocks = extractBlocks(rawContent, "VariableDelete");
    if (!insertBlocks.length && !editBlocks.length && !deleteBlocks.length) {
      variable_change_processor_logger.debug("ApplyVarChangeForMessage", `消息 (ID: ${messageId}) 未检测到变量修改标签。`);
    }
    const allInserts = insertBlocks.flatMap(s => parseJsonl(s, variable_change_processor_logger));
    const allEdits = editBlocks.flatMap(s => parseJsonl(s, variable_change_processor_logger));
    const allDeletes = deleteBlocks.flatMap(s => parseJsonl(s, variable_change_processor_logger));
    const editLog = [];
    await processInsertBlocks(allInserts, editLog, variable_change_processor_logger);
    await processEditBlocks(allEdits, editLog, messageId, variable_change_processor_logger);
    await processDeleteBlocks(allDeletes, editLog, variable_change_processor_logger);
    try {
      await updateEraMetaData(meta => {
        const newArr = Array.isArray(editLog) ? editLog : parseEditLog(editLog);
        variable_change_processor_logger.debug("ApplyVarChangeForMessage", `准备为 MK=${MK} (MsgID=${messageId}) 写入 EditLog:\n${JSON.stringify(newArr, null, 2)}`);
        _.set(meta, [ LOGS_PATH, MK ], JSON.stringify(newArr));
        return meta;
      });
      variable_change_processor_logger.debug("ApplyVarChangeForMessage", `成功为 MK=${MK} 写入 EditLog。`);
    } catch (e) {
      variable_change_processor_logger.error("ApplyVarChangeForMessage", `为 MK=${MK} 写入 EditLogs 失败: ${e?.message || e}`, e);
    }
    return MK;
  } catch (err) {
    variable_change_processor_logger.error("ApplyVarChangeForMessage", `变量写入器异常: ${err?.message || err}`, err);
    return null;
  }
};

const ApplyVarChange = async () => {
  const msg = getChatMessages(-1, {
    include_swipes: true
  })?.[0];
  if (!msg || typeof msg.message_id !== "number") return;
  const messageId = msg.message_id;
  const MK = await ApplyVarChangeForMessage(msg);
  try {
    await updateEraMetaData(meta => {
      const selectedMks = _.get(meta, SEL_PATH, []);
      selectedMks[messageId] = MK;
      _.set(meta, SEL_PATH, selectedMks);
      return meta;
    });
  } catch (e) {
    variable_change_processor_logger.error("ApplyVarChange", `更新 SelectedMks 失败: ${e?.message || e}`, e);
  }
};

const sync_logger = new Logger("sync");

const getMkFromMsg = msg => {
  const key = readMessageKey(msg);
  if (!key) return null;
  return key;
};

const checkEditLogsAreEmpty = mks => {
  const {meta: metaData} = getEraData();
  for (const mk of mks) {
    if (!mk) continue;
    const editLogRaw = _.get(metaData, [ LOGS_PATH, mk ]);
    const editLog = parseEditLog(editLogRaw);
    if (editLog.length > 0) {
      return false;
    }
  }
  return true;
};

const resyncStateOnHistoryChange = async (forceFullResync = false) => {
  if (forceFullResync) {
    sync_logger.warn("resyncStateOnHistoryChange", "强制完全重算模式已启动！");
  } else {
    sync_logger.log("resyncStateOnHistoryChange", "聊天记录变更，启动状态同步...");
  }
  const allMessages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: true
  });
  sync_logger.debug("resyncStateOnHistoryChange", "获取到的 allMessages:", allMessages);
  const {meta: oldMetaData} = getEraData();
  const oldSelectedMks = _.cloneDeep(_.get(oldMetaData, SEL_PATH, []));
  sync_logger.debug("resyncStateOnHistoryChange", `状态快照: oldSelectedMks.length=${oldSelectedMks.length}, allMessages.length=${allMessages?.length ?? 0}`);
  if (!allMessages || allMessages.length === 0) {
    sync_logger.log("resyncStateOnHistoryChange", "当前聊天记录为空，不执行任何操作，同步终止。");
    return;
  }
  let firstRecalcId = -1;
  if (forceFullResync) {
    firstRecalcId = 0;
    sync_logger.log("resyncStateOnHistoryChange", "强制模式：设置重算起点为 0。");
  } else if (allMessages.length < oldSelectedMks.length) {
    sync_logger.log("resyncStateOnHistoryChange", "检测到消息删除。");
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
      sync_logger.debug("resyncStateOnHistoryChange", `[删除-对齐检查] i=${i}, currentMk=${currentMk}, recordedMk=${recordedMk}`);
      if (currentMk === recordedMk) {
        firstRecalcId = i + 1;
        sync_logger.log("resyncStateOnHistoryChange", `找到对齐点于 message_id=${i} (MK=${currentMk})。将从 ID ${firstRecalcId} 开始检查。`);
        break;
      }
    }
    if (firstRecalcId === -1) {
      firstRecalcId = 0;
      sync_logger.log("resyncStateOnHistoryChange", "未找到任何对齐点，将从头开始检查。");
    }
    const currentMkSequence = allMessages.map(getMkFromMsg).filter(mk => mk);
    const oldMkSequence = oldSelectedMks.filter(mk => mk);
    const deletedMks = _.difference(oldMkSequence, currentMkSequence);
    sync_logger.debug("resyncStateOnHistoryChange", `旧MK序列: [${oldMkSequence.join(", ")}]`);
    sync_logger.debug("resyncStateOnHistoryChange", `新MK序列: [${currentMkSequence.join(", ")}]`);
    sync_logger.debug("resyncStateOnHistoryChange", `计算出的被删除MK: [${deletedMks.join(", ")}]`);
    if (deletedMks.length > 0 && checkEditLogsAreEmpty(deletedMks)) {
      sync_logger.log("resyncStateOnHistoryChange", `检测到被删除的 ${deletedMks.length} 条消息均不含变量修改，执行快速同步。`);
      const newSelectedMks = [];
      for (let i = 0; i < allMessages.length; i++) {
        newSelectedMks[i] = getMkFromMsg(allMessages[i]);
      }
      await updateEraMetaData(meta => {
        _.set(meta, SEL_PATH, newSelectedMks);
        return meta;
      });
      sync_logger.log("resyncStateOnHistoryChange", "快速同步完成，仅修正 SelectedMks 数组。");
      return;
    }
  } else if (allMessages.length === oldSelectedMks.length) {
    sync_logger.log("resyncStateOnHistoryChange", "检测到消息长度不变，可能为修改或切换。");
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
      sync_logger.debug("resyncStateOnHistoryChange", `[切换-对齐检查] i=${i}, currentMk=${currentMk}, recordedMk=${recordedMk}`);
      if (currentMk !== recordedMk) {
        firstRecalcId = i;
      }
    }
    if (firstRecalcId === -1) {
      sync_logger.log("resyncStateOnHistoryChange", "所有MK均匹配，无需重算。");
      return;
    } else {
      sync_logger.log("resyncStateOnHistoryChange", `找到最早的不匹配点于 message_id=${firstRecalcId}。将从该点开始重算。`);
    }
  } else {
    sync_logger.log("resyncStateOnHistoryChange", "检测到消息添加。");
    sync_logger.log("resyncStateOnHistoryChange", "新增消息由其他事件处理，本次同步终止。");
    return;
  }
  if (firstRecalcId > -1) {
    const mksToRollback = oldSelectedMks.slice(firstRecalcId).filter(mk => mk);
    if (mksToRollback.length > 0) {
      sync_logger.log("resyncStateOnHistoryChange", `准备回滚 ${mksToRollback.length} 个MK: [${mksToRollback.join(", ")}]`);
      for (const mk of mksToRollback.reverse()) {
        sync_logger.debug("resyncStateOnHistoryChange", `[回滚] 正在回滚 MK: ${mk}`);
        await rollbackByMk(mk, true);
      }
      sync_logger.log("resyncStateOnHistoryChange", "逆序回滚完成。");
    }
  }
  sync_logger.log("resyncStateOnHistoryChange", `从 ID ${firstRecalcId} 开始顺序重算...`);
  const newSelectedMks = oldSelectedMks.slice(0, firstRecalcId);
  for (let i = firstRecalcId; i < allMessages.length; i++) {
    const msg = allMessages[i];
    sync_logger.debug("resyncStateOnHistoryChange", `[重算] 正在处理消息索引: ${i}`);
    const newMk = await ApplyVarChangeForMessage(msg);
    newSelectedMks[i] = newMk;
  }
  sync_logger.log("resyncStateOnHistoryChange", "顺序重算完成。");
  await updateEraMetaData(meta => {
    _.set(meta, SEL_PATH, newSelectedMks);
    return meta;
  });
  sync_logger.log("resyncStateOnHistoryChange", "状态同步完成。");
};

const event_queue_logger = new Logger("event_queue");

const eventQueue = [];

let isProcessing = false;

function pushToQueue(type, detail) {
  event_queue_logger.debug("pushToQueue", `接收到事件: ${type}，已推入队列。`);
  eventQueue.push({
    type,
    detail,
    timestamp: Date.now()
  });
  processQueue();
}

function getEventGroup(eventType) {
  if (EVENT_GROUPS.WRITE.includes(eventType)) return "WRITE";
  if (EVENT_GROUPS.SYNC.includes(eventType)) return "SYNC";
  if (EVENT_GROUPS.API.includes(eventType)) return "API";
  if (EVENT_GROUPS.UPDATE_MK_ONLY.includes(eventType)) return "UPDATE_MK_ONLY";
  if (EVENT_GROUPS.COLLISION_DETECTORS.includes(eventType)) return "COLLISION_DETECTORS";
  return "UNKNOWN";
}

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;
  event_queue_logger.log("processQueue", "处理器启动...");
  let mkToIgnore = null;
  while (eventQueue.length > 0) {
    const nextJob = eventQueue[0];
    const nextGroup = getEventGroup(nextJob.type);
    if (nextGroup !== "API") {
      event_queue_logger.log("processQueue", `下一个事件 (${nextJob.type}) 需要防抖，等待300毫秒...`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    const batchToProcess = eventQueue.splice(0, eventQueue.length);
    const originalEvents = external_default().cloneDeep(batchToProcess);
    const finalJobs = [];
    for (const currentJob of batchToProcess) {
      if (finalJobs.length === 0) {
        finalJobs.push(currentJob);
        continue;
      }
      const prevJob = finalJobs[finalJobs.length - 1];
      const expectedNextEvent = EVENT_COLLISION_MAP.get(prevJob.type);
      const timeDifference = currentJob.timestamp - prevJob.timestamp;
      if (expectedNextEvent && currentJob.type === expectedNextEvent && timeDifference <= 300) {
        event_queue_logger.log("processQueue", `检测到相邻事件对冲: ${prevJob.type} 和 ${currentJob.type} (时间差: ${timeDifference}ms)。将忽略这两个事件。`);
        finalJobs.pop();
        continue;
      }
      const prevGroup = getEventGroup(prevJob.type);
      const currentGroup = getEventGroup(currentJob.type);
      const areInSameGroup = prevGroup === currentGroup;
      const isMergeableGroup = prevGroup === "WRITE" || prevGroup === "SYNC";
      if (areInSameGroup && isMergeableGroup) {
        finalJobs[finalJobs.length - 1] = currentJob;
      } else {
        finalJobs.push(currentJob);
      }
    }
    console.groupCollapsed(`[ERA] 事件队列处理: ${originalEvents.length} -> ${finalJobs.length}`);
    event_queue_logger.log("合并前", originalEvents.map(e => e.type));
    event_queue_logger.log("合并后", finalJobs.map(e => e.type));
    console.groupEnd();
    for (const job of finalJobs) {
      const {type: eventType, detail} = job;
      const eventGroup = getEventGroup(eventType);
      let message_id = null;
      const actionsTaken = {
        rollback: false,
        apply: false,
        resync: false
      };
      try {
        if (eventGroup === "COLLISION_DETECTORS") {
          event_queue_logger.log("processQueue", `事件 ${eventType} 是一个对冲检测器，无独立操作，已忽略。`);
          continue;
        }
        const {mk, message_id: msgId, isNewKey} = await ensureMkForLatestMessage();
        logContext.mk = mk;
        message_id = msgId;
        if (isNewKey && mk) {
          mkToIgnore = {
            mk,
            ignoreCount: RENDER_EVENTS_TO_IGNORE_AFTER_MK_INJECTION
          };
        }
        if (mkToIgnore && eventType === tavern_events.CHARACTER_MESSAGE_RENDERED && mk === mkToIgnore.mk) {
          event_queue_logger.log("processQueue", `忽略由 MK (${mkToIgnore.mk}) 注入触发的冗余渲染事件。剩余忽略次数: ${mkToIgnore.ignoreCount - 1}`);
          mkToIgnore.ignoreCount--;
          if (mkToIgnore.ignoreCount <= 0) {
            mkToIgnore = null;
            event_queue_logger.log("processQueue", `忽略次数用完`);
          }
          continue;
        }
        event_queue_logger.log("processQueue", `执行任务: ${eventType} (分组: ${eventGroup})`);
        if (eventGroup === "WRITE") {
          const msg = getChatMessages(-1, {
            include_swipes: true
          })?.[0];
          if (msg) {
            const MK = readMessageKey(msg);
            if (MK) {
              await rollbackByMk(MK, true);
              actionsTaken.rollback = true;
            }
          }
          await ApplyVarChange();
          actionsTaken.apply = true;
        } else if (eventGroup === "SYNC") {
          event_queue_logger.log("processQueue", `事件 ${eventType} 触发状态同步流程...`);
          const isFullSync = eventType === "manual_full_sync";
          await resyncStateOnHistoryChange(isFullSync);
          actionsTaken.resync = true;
        } else if (eventGroup === "API") {
          if (eventType === ERA_API_EVENTS.INSERT_BY_OBJECT) insertByObject(detail); else if (eventType === ERA_API_EVENTS.UPDATE_BY_OBJECT) updateByObject(detail); else if (eventType === ERA_API_EVENTS.INSERT_BY_PATH) insertByPath(detail.path, detail.value); else if (eventType === ERA_API_EVENTS.UPDATE_BY_PATH) updateByPath(detail.path, detail.value); else if (eventType === ERA_API_EVENTS.DELETE_BY_OBJECT) deleteByObject(detail); else if (eventType === ERA_API_EVENTS.DELETE_BY_PATH) deleteByPath(detail.path);
        } else if (eventGroup === "UPDATE_MK_ONLY") {
          await updateLatestSelectedMk();
        }
      } catch (error) {
        event_queue_logger.error("processQueue", `事件 ${eventType} 处理异常: ${error}`, error);
      } finally {
        if (actionsTaken.rollback || actionsTaken.apply || actionsTaken.resync) {
          await updateLatestSelectedMk();
          if (logContext.mk && message_id !== null) {
            const {meta: metaData, stat: statData} = getEraData();
            const selectedMks = external_default().get(metaData, SEL_PATH, []);
            const editLogs = external_default().get(metaData, LOGS_PATH, {});
            const statWithoutMeta = removeMetaFields(statData);
            emitWriteDoneEvent({
              mk: logContext.mk,
              message_id,
              actions: actionsTaken,
              selectedMks,
              editLogs,
              stat: statData,
              statWithoutMeta
            });
          }
        }
        logContext.mk = "";
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    event_queue_logger.debug("processQueue", "本轮批次处理完毕。");
  }
  isProcessing = false;
  event_queue_logger.log("processQueue", "处理器空闲，已释放锁。");
}

const query_logger = new Logger("宏查询");

$(() => {
  registerMacroLike(/{{\s*ERA(-withmeta)?\s*:\s*([^}]+?)\s*}}/gi, (context, substring, withMeta, path) => {
    const funcName = "registerMacroLike";
    const trimmedPath = path.trim();
    const includeMeta = !!withMeta;
    const {stat} = getEraData();
    if (!stat) {
      query_logger.warn(funcName, "无法获取到 stat_data, 宏替换失败.");
      return "";
    }
    let data;
    if (trimmedPath === "$ALLDATA") {
      data = stat;
    } else {
      data = _.get(stat, trimmedPath);
    }
    if (data === undefined) {
      query_logger.warn(funcName, `在 stat_data 中未找到路径 "${trimmedPath}", 宏将替换为空字符串.`);
      return "";
    }
    const finalData = includeMeta ? data : removeMetaFields(data);
    if (typeof finalData === "object" && finalData !== null) {
      return JSON.stringify(finalData);
    }
    return String(finalData);
  });
});

const eventsToListen = [ ...EVENT_GROUPS.WRITE, ...EVENT_GROUPS.SYNC, ...EVENT_GROUPS.API, ...EVENT_GROUPS.UPDATE_MK_ONLY, ...EVENT_GROUPS.COLLISION_DETECTORS ];

eventsToListen.forEach(ev => {
  eventOn(ev, detail => pushToQueue(ev, detail));
});

eventOn(getButtonEvent("写入变量修改"), () => pushToQueue("manual_write"));

eventOn(getButtonEvent("手动同步状态"), () => pushToQueue("manual_sync"));

eventOn(getButtonEvent("强制完全重算"), () => pushToQueue("manual_full_sync"));
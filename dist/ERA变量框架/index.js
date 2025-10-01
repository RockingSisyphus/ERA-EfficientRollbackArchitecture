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
  DELETE_BY_PATH: "era:deleteByPath",
  WRITE_DONE: "era:writeDone"
};

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
      delete current.$meta;
      for (const key in current) {
        recurse(current[key]);
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

const logger = new Logger("api");

async function findLastAiMessage() {
  const messages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: false
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

async function performUpdate(blockContent, blockTag) {
  const lastAiMessage = await findLastAiMessage();
  if (!lastAiMessage) {
    logger.warn("performUpdate", "找不到任何 AI 消息，无法执行变量更新。");
    return;
  }
  const originalMessage = lastAiMessage.message;
  const contentString = J(blockContent);
  const variableBlock = `\n<${blockTag}>\n${contentString}\n</${blockTag}>`;
  const newMessage = originalMessage + variableBlock;
  logger.log("performUpdate", `准备向消息 ID ${lastAiMessage.message_id} 注入 ${blockTag} 块...`);
  logger.debug("performUpdate", `注入内容: ${contentString}`);
  await setChatMessages([ {
    message_id: lastAiMessage.message_id,
    message: newMessage
  } ]);
  logger.log("performUpdate", `已调用 setChatMessages，等待 ERA 框架自动处理...`);
}

async function insertByObject(data) {
  await performUpdate(data, "VariableInsert");
}

async function updateByObject(data) {
  await performUpdate(data, "VariableEdit");
}

async function insertByPath(path, value) {
  const block = external_default().set({}, path, value);
  await performUpdate(block, "VariableInsert");
}

async function updateByPath(path, value) {
  const block = external_default().set({}, path, value);
  await performUpdate(block, "VariableEdit");
}

async function deleteByObject(data) {
  await performUpdate(data, "VariableDelete");
}

async function deleteByPath(path) {
  const block = external_default().set({}, path, {});
  await performUpdate(block, "VariableDelete");
}

function emitWriteDoneEvent(payload) {
  eventEmit(ERA_API_EVENTS.WRITE_DONE, payload);
  logger.log("emitWriteDoneEvent", `已触发 ${ERA_API_EVENTS.WRITE_DONE} 事件。操作: ${JSON.stringify(payload.actions)}, MK: ${payload.mk}, MsgID: ${payload.message_id}`);
}

const message_key_logger = new Logger("message_key");

const ERA_DATA_TAG = "era_data";

const ERA_DATA_REGEX = new RegExp(`<${ERA_DATA_TAG}>({.*?})<\\/${ERA_DATA_TAG}>`);

function getMessageContent(msg) {
  if (!msg) return null;
  if (typeof msg.message === "string") {
    return msg.message;
  }
  if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    return msg.swipes[sid] || null;
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
  const content = getMessageContent(msg);
  return parseEraData(content)?.["era-message-key"] || "";
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
  if (!msg) {
    message_key_logger.warn("ensureMessageKey", "无效的 null 消息对象，无法确保Key");
    return "";
  }
  const messageId = msg.message_id;
  const role = msg.role;
  const messageContent = getMessageContent(msg);
  if (typeof messageId !== "number" || typeof messageContent !== "string" || !role) {
    message_key_logger.warn("ensureMessageKey", `无效的消息对象结构，无法确保Key。msg=${JSON.stringify(msg)}`);
    return "";
  }
  const existingMk = readMessageKey(msg);
  if (existingMk) {
    return existingMk;
  }
  const newMk = `era_mk_${Date.now()}_${rnd()}`;
  const messageType = role === "user" ? "user" : "assistant";
  const dataString = `<${ERA_DATA_TAG}>{"era-message-key"="${newMk}","era-message-type"="${messageType}"}</${ERA_DATA_TAG}>`;
  const newContent = dataString + messageContent;
  message_key_logger.log("ensureMessageKey", `为消息 (ID: ${messageId}) 注入新的Key: ${newMk}`);
  const updatePayload = {
    message_id: messageId
  };
  if (Array.isArray(msg.swipes)) {
    const sid = Number(msg.swipe_id ?? 0);
    const newSwipes = [ ...msg.swipes ];
    newSwipes[sid] = newContent;
    updatePayload.swipes = newSwipes;
  } else {
    updatePayload.message = newContent;
  }
  await setChatMessages([ updatePayload ], {
    refresh: "none"
  });
  return newMk;
}

const ensureMkForLatestMessage = async () => {
  try {
    const msg = getChatMessages(-1, {
      include_swipes: true
    })?.[0];
    if (!msg || typeof msg.message_id !== "number") {
      message_key_logger.warn("ensureMkForLatestMessage", "无法读取最新消息或其ID，退出");
      return {
        mk: "",
        message_id: null
      };
    }
    const mk = await ensureMessageKey(msg);
    message_key_logger.log("ensureMkForLatestMessage", `已为最新消息 ${msg.message_id} 确保 MK 存在。`);
    return {
      mk,
      message_id: msg.message_id
    };
  } catch (err) {
    message_key_logger.error("ensureMkForLatestMessage", `确保MK时异常: ${err?.message || err}`, err);
    return {
      mk: "",
      message_id: null
    };
  }
};

const updateLatestSelectedMk = async () => {
  const msg = getChatMessages(-1, {
    include_swipes: true
  })?.[0];
  if (!msg || typeof msg.message_id !== "number") return;
  const MK = await ensureMessageKey(msg);
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
    if (message?.role !== "assistant" || typeof message?.message_id !== "number") {
      continue;
    }
    const mk = readMessageKey(message);
    if (!mk) continue;
    const {meta: metaData} = getEraData();
    const editLogRaw = _.get(metaData, [ LOGS_PATH, mk ]);
    const editLog = parseEditLog(editLogRaw);
    if (!editLog || editLog.length === 0) continue;
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

function applyInsertAtLevel(statData, basePath, patchObj, editLog, inheritedTpl, logger) {
  const tplFromVars = basePath ? _.get(statData, `${basePath}.$meta.template`) : _.get(statData, `$meta.template`);
  const tplFromPatch = _.get(patchObj, [ "$meta", "template" ]);
  const localTpl = _.isPlainObject(tplFromVars) ? tplFromVars : _.isPlainObject(inheritedTpl) ? tplFromPatch : inheritedTpl;
  const currentNodeInVars = basePath ? _.get(statData, basePath) : statData;
  if (basePath && currentNodeInVars === undefined) {
    let composed = patchObj;
    if (_.isPlainObject(patchObj) && _.isPlainObject(localTpl)) {
      composed = mergeReplaceArray(localTpl, patchObj);
    }
    composed = sanitizeArrays(composed);
    _.set(statData, basePath, composed);
    editLog.push({
      op: "insert",
      path: basePath,
      value_new: _.cloneDeep(composed)
    });
    logger.debug("applyInsertAtLevel", `原子性插入到新路径: ${basePath}`);
    return;
  }
  if (_.isPlainObject(currentNodeInVars) && _.isPlainObject(patchObj)) {
    for (const key of Object.keys(patchObj)) {
      const subPath = basePath ? `${basePath}.${key}` : key;
      const subPatch = patchObj[key];
      applyInsertAtLevel(statData, subPath, subPatch, editLog, localTpl, logger);
    }
  } else if (basePath) {
    logger.warn("applyInsertAtLevel", `VariableInsert 失败：路径已存在且无法递归补充 -> ${basePath}`);
  }
}

async function processInsertBlocks(allInserts, editLog, logger) {
  if (allInserts.length > 0) {
    for (const insertRoot of allInserts) {
      if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
      try {
        await updateEraStatData(stat => {
          logger.debug("processInsertBlocks", `处理 insertRoot: ${JSON.stringify(insertRoot)}`);
          applyInsertAtLevel(stat, "", insertRoot, editLog, null, logger);
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
    let valOld = await findLatestNewValue(subPath, messageId, logger);
    if (valOld === null) {
      valOld = _.get(statData, subPath);
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
    const rawContent = String((msg?.message && msg.message.length ? msg.message : Array.isArray(msg?.swipes) ? msg.swipes[Number(msg?.swipe_id ?? 0)] : "") || "");
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
        _.set(meta, [ LOGS_PATH, MK ], JSON.stringify(newArr));
        return meta;
      });
    } catch (e) {
      variable_change_processor_logger.error("ApplyVarChangeForMessage", `写入 EditLogs 失败: ${e?.message || e}`, e);
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

const resyncStateOnHistoryChange = async () => {
  sync_logger.log("resyncStateOnHistoryChange", "聊天记录变更，启动状态同步...");
  const allMessages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: false
  });
  const {meta: oldMetaData} = getEraData();
  const oldSelectedMks = _.cloneDeep(_.get(oldMetaData, SEL_PATH, []));
  if (!allMessages || allMessages.length === 0) {
    sync_logger.log("resyncStateOnHistoryChange", "当前聊天记录为空，不执行任何操作，同步终止。");
    return;
  }
  let firstRecalcId = -1;
  if (allMessages.length < oldSelectedMks.length) {
    sync_logger.log("resyncStateOnHistoryChange", "检测到消息删除。");
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
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
      if (currentMk !== recordedMk) {
        firstRecalcId = i;
      }
    }
    if (firstRecalcId === -1) {
      sync_logger.log("resyncStateOnHistoryChange", "所有MK均匹配，无需重算。");
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
        await rollbackByMk(mk, true);
      }
      sync_logger.log("resyncStateOnHistoryChange", "逆序回滚完成。");
    }
  }
  sync_logger.log("resyncStateOnHistoryChange", `从 ID ${firstRecalcId} 开始顺序重算...`);
  const newSelectedMks = oldSelectedMks.slice(0, firstRecalcId);
  for (let i = firstRecalcId; i < allMessages.length; i++) {
    const msg = allMessages[i];
    const newMk = await ApplyVarChangeForMessage(msg);
    newSelectedMks[i] = newMk;
  }
  sync_logger.log("resyncStateOnHistoryChange", "顺序重算完成。");
  await updateEraMetaData(meta => {
    _.set(meta, SEL_PATH, newSelectedMks);
    return meta;
  });
  sync_logger.log("resyncStateOnHistoryChange", "状态同步完成。");
  sync_logger.log("resyncStateOnHistoryChange", "执行【保险机制】：无条件回滚并重写最后一楼...");
  const lastWrittenMk = [ ...oldSelectedMks ].reverse().find(mk => mk);
  if (lastWrittenMk) {
    sync_logger.log("resyncStateOnHistoryChange", `找到最后一个写入的MK: ${lastWrittenMk}，执行回滚...`);
    await rollbackByMk(lastWrittenMk, true);
    sync_logger.log("resyncStateOnHistoryChange", "回滚完成，准备根据当前最后一楼内容重写...");
    await ApplyVarChange();
    sync_logger.log("resyncStateOnHistoryChange", "保险性重写完成。");
  } else {
    sync_logger.log("resyncStateOnHistoryChange", "未找到任何可供回滚的旧MK，跳过保险机制。");
  }
};

const event_queue_logger = new Logger("event_queue");

const eventQueue = [];

let isProcessing = false;

function pushToQueue(type, detail) {
  event_queue_logger.debug("pushToQueue", `接收到事件: ${type}，已推入队列。`);
  eventQueue.push({
    type,
    detail
  });
  processQueue();
}

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;
  event_queue_logger.log("processQueue", "处理器启动...");
  while (eventQueue.length > 0) {
    const actionsTaken = {
      rollback: false,
      apply: false,
      resync: false
    };
    let currentBatch = eventQueue.splice(0, eventQueue.length);
    event_queue_logger.debug("processQueue", `取出批次，包含 ${currentBatch.length} 个事件: ${currentBatch.map(e => e.type).join(", ")}`);
    const lastRenderIndex = external_default().findLastIndex(currentBatch, {
      type: tavern_events.CHARACTER_MESSAGE_RENDERED
    });
    if (lastRenderIndex > -1) {
      currentBatch = currentBatch.filter((job, index) => job.type !== tavern_events.CHARACTER_MESSAGE_RENDERED || index === lastRenderIndex);
    }
    const finalJobs = [];
    if (currentBatch.length > 0) {
      finalJobs.push(currentBatch[0]);
      for (let i = 1; i < currentBatch.length; i++) {
        const prevJob = finalJobs[finalJobs.length - 1];
        const currentJob = currentBatch[i];
        if (currentJob.type === prevJob.type && (currentJob.type === tavern_events.MESSAGE_RECEIVED || currentJob.type === tavern_events.MESSAGE_SWIPED)) {
          finalJobs[finalJobs.length - 1] = currentJob;
        } else {
          finalJobs.push(currentJob);
        }
      }
    }
    event_queue_logger.debug("processQueue", `合并后，剩余 ${finalJobs.length} 个任务: ${finalJobs.map(e => e.type).join(", ")}`);
    for (const job of finalJobs) {
      const {type: eventType, detail} = job;
      let message_id = null;
      try {
        const {mk, message_id: msgId} = await ensureMkForLatestMessage();
        logContext.mk = mk;
        message_id = msgId;
        event_queue_logger.log("processQueue", `执行任务: ${eventType}`);
        switch (eventType) {
         case "rollback_done_reapply_var_start":
         case tavern_events.MESSAGE_RECEIVED:
         case tavern_events.CHARACTER_MESSAGE_RENDERED:
         case tavern_events.APP_READY:
         case "manual_write":
          {
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
            break;
          }

         case tavern_events.MESSAGE_DELETED:
         case tavern_events.MESSAGE_SWIPED:
         case tavern_events.CHAT_CHANGED:
         case "manual_sync":
          await resyncStateOnHistoryChange();
          actionsTaken.resync = true;
          break;

         case ERA_API_EVENTS.INSERT_BY_OBJECT:
          if (detail && typeof detail === "object") await insertByObject(detail);
          break;

         case ERA_API_EVENTS.UPDATE_BY_OBJECT:
          if (detail && typeof detail === "object") await updateByObject(detail);
          break;

         case ERA_API_EVENTS.INSERT_BY_PATH:
          if (detail && typeof detail.path === "string") await insertByPath(detail.path, detail.value);
          break;

         case ERA_API_EVENTS.UPDATE_BY_PATH:
          if (detail && typeof detail.path === "string") await updateByPath(detail.path, detail.value);
          break;

         case ERA_API_EVENTS.DELETE_BY_OBJECT:
          if (detail && typeof detail === "object") await deleteByObject(detail);
          break;

         case ERA_API_EVENTS.DELETE_BY_PATH:
          if (detail && typeof detail.path === "string") await deleteByPath(detail.path);
          break;
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

const eventsToListen = [ "rollback_done_reapply_var_start", tavern_events.MESSAGE_RECEIVED, tavern_events.MESSAGE_DELETED, tavern_events.MESSAGE_SWIPED, tavern_events.CHAT_CHANGED, tavern_events.APP_READY, tavern_events.CHARACTER_MESSAGE_RENDERED, ...Object.values(ERA_API_EVENTS) ];

eventsToListen.forEach(ev => {
  eventOn(ev, detail => pushToQueue(ev, detail));
});

eventOn(getButtonEvent("写入变量修改"), () => pushToQueue("manual_write"));

eventOn(getButtonEvent("手动同步状态"), () => pushToQueue("manual_sync"));
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

const CHAT_SCOPE = {
  type: "chat"
};

const LOGS_PATH = "EditLogs";

const SEL_PATH = "SelectedMks";

const external_namespaceObject = _;

var external_default = __webpack_require__.n(external_namespaceObject);

class Logger {
  buffer=[];
  log(line, module) {
    const text = `《${module}》 ${String(line)}`;
    this.buffer.push(text);
  }
  async flush() {
    if (this.buffer.length === 0) {
      return;
    }
    await updateVariablesWith(v => {
      const existingLogs = external_default().get(v, "console");
      const newLogs = Array.isArray(existingLogs) ? [ ...existingLogs, ...this.buffer ] : this.buffer;
      external_default().set(v, "console", newLogs);
      return v;
    }, CHAT_SCOPE);
    this.buffer = [];
  }
  get length() {
    return this.buffer.length;
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
    return v.map(e => Array.isArray(e) || external_default().isPlainObject(e) ? JSON.stringify(e) : e);
  } else if (external_default().isPlainObject(v)) {
    const o = {};
    for (const k in v) o[k] = sanitizeArrays(v[k]);
    return o;
  } else {
    return v;
  }
}

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
    if (char === '"') {
      if (i === 0 || trimmedStr[i - 1] !== "\\") {
        inString = !inString;
      }
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
            logger?.log(`JSONL 解析失败: ${e?.message || e}. 失败的片段: ${jsonString}`, "JSONL解析");
          }
          startIndex = -1;
        }
      }
    }
  }
  return objects;
}

const J = o => {
  try {
    return JSON.stringify(o, null, 2);
  } catch (e) {
    return `<<stringify失败: ${e?.message || e}>>`;
  }
};

async function findLatestNewValue(path, startMessageId, logger) {
  logger?.log(`[findLatestNewValue] 开始为路径 <${path}> 从消息ID <${startMessageId}> 向上追溯历史值...`, "获取旧值");
  const messages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: false
  });
  logger?.log(`[findLatestNewValue] 原始消息列表: ${J(messages)}`, "获取旧值");
  if (!messages || messages.length < 1) {
    logger?.log(`[findLatestNewValue] 消息历史为空，无法追溯。`, "获取旧值");
    return null;
  }
  const startIndex = messages.findIndex(m => m.message_id === startMessageId);
  if (startIndex === -1) {
    logger?.log(`[findLatestNewValue] 错误：在消息列表中未找到起始消息ID: ${startMessageId}`, "获取旧值");
    return null;
  }
  logger?.log(`[findLatestNewValue] 进入循环查找逻辑`, "获取旧值");
  for (let i = startIndex - 1; i >= 0; i--) {
    const message = messages[i];
    const messageId = message?.message_id;
    logger?.log(`[findLatestNewValue] 开始检索消息:id=${messageId};消息内容message=${JSON.stringify(message)}`, "获取旧值");
    if (message?.role !== "assistant" || typeof messageId !== "number") {
      logger?.log(`[findLatestNewValue] 消息:id=${messageId},role=${message.role}不符合要求，跳过`, "获取旧值");
      continue;
    }
    const messageVars = getVariables({
      type: "message",
      message_id: messageId
    }) || {};
    const mk = String(external_default().get(messageVars, [ "_keys", "MK" ]) || "");
    logger?.log(`[findLatestNewValue] 正在检查AI消息 ID=${messageId};messageVars=${JSON.stringify(messageVars)};mk=${mk}`, "获取旧值");
    if (!mk) {
      logger?.log(`[findLatestNewValue] -> 消息 (ID: ${messageId}) 没有MK，跳过。`, "获取旧值");
      continue;
    }
    const chatVars = getVariables(CHAT_SCOPE) || {};
    const editLogRaw = external_default().get(chatVars, [ LOGS_PATH, mk ]);
    const editLog = parseEditLog(editLogRaw);
    if (!editLog || editLog.length === 0) {
      logger?.log(`[findLatestNewValue] -> 消息 (ID: ${messageId}, MK: ${mk}) 的EditLog为空，跳过。`, "获取旧值");
      continue;
    }
    logger?.log(`[findLatestNewValue] -> 正在逆序扫描消息 (ID: ${messageId}, MK: ${mk}) 的 EditLog=${JSON.stringify(editLog)}`, "获取旧值");
    for (let j = editLog.length - 1; j >= 0; j--) {
      const logEntry = editLog[j];
      if (!logEntry || !logEntry.path) continue;
      if (logEntry.path === path) {
        logger?.log(`[findLatestNewValue] >> 成功! 在消息(ID:${messageId}, MK:${mk})中找到精确路径 <${path}> 的值为: ${J(logEntry.value_new)}`, "获取旧值");
        return external_default().cloneDeep(logEntry.value_new);
      }
      if (path.startsWith(logEntry.path + ".")) {
        const subPath = path.substring(logEntry.path.length + 1);
        const parentNewVal = logEntry.value_new;
        if (external_default().isPlainObject(parentNewVal) && external_default().has(parentNewVal, subPath)) {
          const foundVal = external_default().get(parentNewVal, subPath);
          logger?.log(`[findLatestNewValue] >> 成功! 在消息(ID:${messageId}, MK:${mk})中找到父级路径 <${logEntry.path}>, 并从中提取子路径 <${subPath}> 的值为: ${J(foundVal)}`, "获取旧值");
          return external_default().cloneDeep(foundVal);
        }
      }
    }
    logger?.log(`[findLatestNewValue] -> 在消息 (ID: ${messageId}, MK: ${mk}) 的EditLog中未找到路径 <${path}> 或其有效父级，继续向上...`, "获取旧值");
  }
  logger?.log(`[findLatestNewValue] 向上追溯未找到路径 ${path} 的任何历史值，将使用 null 作为旧值`, "获取旧值");
  return null;
}

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
    const jsonLike = match[1];
    const keyMatch = jsonLike.match(/"era-message-key"\s*=\s*"(.*?)"/);
    const typeMatch = jsonLike.match(/"era-message-type"\s*=\s*"(.*?)"/);
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
  const logger = new Logger;
  if (!msg) {
    logger.log("无效的 null 消息对象，无法确保Key", "ensureMessageKey");
    await logger.flush();
    return "";
  }
  const messageId = msg.message_id;
  const role = msg.role;
  const messageContent = getMessageContent(msg);
  if (typeof messageId !== "number" || typeof messageContent !== "string" || !role) {
    logger.log(`无效的消息对象，无法确保Key。msg=${JSON.stringify(msg)}`, "ensureMessageKey");
    await logger.flush();
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
  logger.log(`为消息 (ID: ${messageId}) 注入新的Key: ${newMk}`, "ensureMessageKey");
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
  await logger.flush();
  return newMk;
}

const ensureMkForLatestMessage = async () => {
  const logger = new Logger;
  try {
    logger.log(`[调试] 进入 ensureMkForLatestMessage。`, "调试");
    const _arr = getChatMessages(-1, {
      include_swipes: true
    });
    const msg = _arr && _arr[0];
    if (!msg) {
      logger.log("无法读取最新消息，退出", "确保MK");
      await logger.flush();
      return;
    }
    const messageId = msg.message_id;
    if (typeof messageId !== "number") {
      logger.log("无法读取消息ID，退出", "确保MK");
      await logger.flush();
      return;
    }
    await ensureMessageKey(msg);
    logger.log(`已为消息 ${messageId} 确保 MK 存在。`, "确保MK");
    logger.log(`[调试] 退出 ensureMkForLatestMessage。`, "调试");
  } catch (err) {
    logger.log(`确保MK时异常: ${err?.message || err}`, "确保MK");
  } finally {
    await logger.flush();
  }
};

const updateLatestSelectedMk = async () => {
  const msg = getChatMessages(-1, {
    include_swipes: true
  })?.[0];
  if (!msg) return;
  const messageId = msg.message_id;
  if (typeof messageId !== "number") return;
  const MK = await ensureMessageKey(msg);
  if (!MK) return;
  await updateVariablesWith(v => {
    const selectedMks = _.get(v, SEL_PATH, []);
    if (selectedMks[messageId] !== MK) {
      selectedMks[messageId] = MK;
      _.set(v, SEL_PATH, selectedMks);
    }
    return v;
  }, {
    type: "chat"
  });
};

async function rollbackByMk(MK, silent = false) {
  const logger = new Logger;
  try {
    await updateVariablesWith(v => {
      const raw = _.get(v, [ LOGS_PATH, MK ]);
      const arr = parseEditLog(raw);
      if (!arr.length) return v;
      for (let i = arr.length - 1; i >= 0; i--) {
        const e = arr[i];
        const op = String(e?.op || "").toLowerCase();
        const path = String(e?.path || "");
        if (!path) continue;
        if (op === "insert") {
          _.unset(v, path);
          continue;
        }
        if (op === "update" || op === "delete") {
          if (typeof e?.value_old === "undefined") _.unset(v, path); else _.set(v, path, _.cloneDeep(e.value_old));
        }
      }
      return v;
    }, CHAT_SCOPE);
    logger.log(`回退完成：MK=${MK}（原子更新）`, "变量回退");
  } catch (e) {
    logger.log(`回退异常：MK=${MK} → ${e?.message || e}`, "变量回退");
  } finally {
    if (!silent) {
      await logger.flush();
    }
  }
}

function applyInsertAtLevel(rootVars, basePath, patchObj, editLog, inheritedTpl, logger) {
  const tplFromPatch = _.get(patchObj, [ "$meta", "template" ]);
  const tplFromVars = basePath ? _.get(rootVars, `${basePath}.$meta.template`) : _.get(rootVars, `$meta.template`);
  const localTpl = _.isPlainObject(tplFromPatch) ? tplFromPatch : _.isPlainObject(tplFromVars) ? tplFromVars : inheritedTpl;
  if (basePath && !_.has(rootVars, basePath)) {
    let composed = patchObj;
    if (_.isPlainObject(patchObj) && _.isPlainObject(localTpl)) {
      composed = mergeReplaceArray(localTpl, patchObj);
    }
    composed = sanitizeArrays(composed);
    _.set(rootVars, basePath, composed);
    editLog.push({
      op: "insert",
      path: basePath,
      value_new: _.cloneDeep(composed)
    });
    return;
  }
  for (const key of Object.keys(patchObj)) {
    if (key === "$meta") continue;
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];
    if (_.has(rootVars, fullPath)) {
      const valOld = _.get(rootVars, fullPath);
      if (_.isPlainObject(valOld) && _.isPlainObject(valNew)) {
        applyInsertAtLevel(rootVars, fullPath, valNew, editLog, localTpl, logger);
      } else {
        logger.log(`VariableInsert 失败：路径已存在 -> ${fullPath}`, "插入");
      }
    } else {
      let composed = valNew;
      if (_.isPlainObject(valNew) && _.isPlainObject(localTpl)) {
        composed = mergeReplaceArray(localTpl, valNew);
      }
      composed = sanitizeArrays(composed);
      _.set(rootVars, fullPath, composed);
      editLog.push({
        op: "insert",
        path: fullPath,
        value_new: _.cloneDeep(composed)
      });
    }
  }
}

async function applyEditAtLevel(rootVars, basePath, patchObj, editLog, logger, messageId, intraMessageState) {
  for (const key of Object.keys(patchObj)) {
    if (key === "$meta") continue;
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const valNew = patchObj[key];
    if (_.isPlainObject(valNew)) {
      if (!_.has(rootVars, fullPath)) {
        logger.log(`VariableEdit 跳过：父路径不存在 -> ${fullPath}`, "编辑");
        continue;
      }
      await applyEditAtLevel(rootVars, fullPath, valNew, editLog, logger, messageId, intraMessageState);
      continue;
    }
    if (!_.has(rootVars, fullPath)) {
      logger.log(`VariableEdit 失败：路径非法，无法写入 -> ${fullPath}`, "编辑");
      continue;
    }
    let valOld = await findLatestNewValue(fullPath, messageId, logger);
    if (valOld === null) {
      logger.log(`历史追溯未找到 <${fullPath}>，从楼内初始状态获取...`, "获取旧值");
      valOld = _.get(rootVars, fullPath);
      logger.log(`成功从楼内初始状态获取 <${fullPath}> 的值为: ${JSON.stringify(valOld)}`, "获取旧值");
    }
    const cleaned = sanitizeArrays(valNew);
    if (!_.isEqual(valOld, cleaned)) {
      _.set(rootVars, fullPath, cleaned);
      editLog.push({
        op: "update",
        path: fullPath,
        value_old: _.cloneDeep(valOld),
        value_new: _.cloneDeep(cleaned)
      });
      intraMessageState.set(fullPath, _.cloneDeep(cleaned));
    }
  }
}

const ApplyVarChangeForMessage = async msg => {
  const logger = new Logger;
  try {
    logger.log(`[调试] 进入 ApplyVarChangeForMessage。当前消息列表: ${JSON.stringify(getChatMessages("0-{{lastMessageId}}", {
      include_swipes: true
    }))}`, "调试");
    if (!msg) {
      logger.log("无效消息对象，退出", "变量写入");
      return null;
    }
    const messageId = msg.message_id;
    if (typeof messageId !== "number") {
      logger.log("无法读取消息ID，退出", "变量写入");
      return null;
    }
    const sid = Number(msg?.swipe_id ?? 0);
    const MK = readMessageKey(msg);
    if (!MK || isUserMessage(msg)) {
      logger.log(`消息 (ID: ${messageId}) 不含 MK 或为用户消息，跳过变量写入。`, "变量写入");
      return null;
    }
    const raw = String((msg?.message && msg.message.length ? msg.message : Array.isArray(msg?.swipes) ? msg.swipes[sid] : "") || "");
    const insertBlocks = extractBlocks(raw, "VariableInsert");
    const editBlocks = extractBlocks(raw, "VariableEdit");
    if (!insertBlocks.length && !editBlocks.length) {
      logger.log(`消息 (ID: ${messageId}) 未检测到 <VariableInsert>/<VariableEdit> 标签：本轮写入空 EditLog 并更新选中`, "变量写入");
    }
    const allInserts = insertBlocks.flatMap(s => parseJsonl(s, logger));
    const allEdits = editBlocks.flatMap(s => parseJsonl(s, logger));
    const editLog = [];
    if (allInserts.length > 0) {
      for (const insertRoot of allInserts) {
        if (!_.isPlainObject(insertRoot) || _.isEmpty(insertRoot)) continue;
        try {
          await updateVariablesWith(v => {
            logger.log(`处理 insertRoot: ${JSON.stringify(insertRoot)}`, "变量写入");
            for (const topKey of Object.keys(insertRoot)) {
              const topPatch = insertRoot[topKey];
              if (topPatch == null) continue;
              applyInsertAtLevel(v, topKey, topPatch, editLog, null, logger);
            }
            return v;
          }, CHAT_SCOPE);
        } catch (e) {
          logger.log(`处理 insertRoot 失败: ${e?.message || e}`, "变量写入");
        }
      }
      logger.log("所有 VariableInsert 操作完成", "变量写入");
    }
    if (allEdits.length > 0) {
      const intraMessageState = new Map;
      for (const editRoot of allEdits) {
        if (!_.isPlainObject(editRoot) || _.isEmpty(editRoot)) continue;
        try {
          await updateVariablesWith(async v => {
            logger.log(`处理 editRoot: ${JSON.stringify(editRoot)}`, "变量写入");
            for (const topKey of Object.keys(editRoot)) {
              const topPatch = editRoot[topKey];
              if (topPatch == null) continue;
              await applyEditAtLevel(v, topKey, topPatch, editLog, logger, messageId, intraMessageState);
            }
            return v;
          }, CHAT_SCOPE);
        } catch (e) {
          logger.log(`处理 editRoot 失败: ${e?.message || e}`, "变量写入");
        }
      }
      logger.log("所有 VariableEdit 操作完成", "变量写入");
    }
    try {
      await updateVariablesWith(v => {
        const newArr = Array.isArray(editLog) ? editLog : parseEditLog(editLog);
        _.set(v, [ LOGS_PATH, MK ], JSON.stringify(newArr));
        return v;
      }, CHAT_SCOPE);
    } catch (e) {
      logger.log(`写入 EditLogs 失败: ${e?.message || e}`, "变量写入");
    }
    logger.log(`[调试] 退出 ApplyVarChangeForMessage。当前消息列表: ${JSON.stringify(getChatMessages("0-{{lastMessageId}}", {
      include_swipes: true
    }))}`, "调试");
    return MK;
  } catch (err) {
    logger.log(`变量写入器异常: ${err?.message || err}`, "变量写入");
    return null;
  } finally {
    await logger.flush();
  }
};

const ApplyVarChange = async () => {
  const logger = new Logger;
  logger.log(`[调试] 进入 ApplyVarChange。当前消息列表: ${JSON.stringify(getChatMessages("0-{{lastMessageId}}", {
    include_swipes: true
  }))}`, "调试");
  const _arr = getChatMessages(-1, {
    include_swipes: true
  });
  const msg = _arr && _arr[0];
  if (!msg) return;
  const messageId = msg.message_id;
  if (typeof messageId !== "number") return;
  const MK = await ApplyVarChangeForMessage(msg);
  try {
    await updateVariablesWith(v => {
      const selectedMks = _.get(v, SEL_PATH, []);
      selectedMks[messageId] = MK;
      _.set(v, SEL_PATH, selectedMks);
      return v;
    }, CHAT_SCOPE);
  } catch (e) {
    const logger = new Logger;
    logger.log(`(ApplyVarChange) 更新 SelectedMks 失败: ${e?.message || e}`, "变量写入");
    await logger.flush();
  }
};

const logger = new Logger;

const getMkFromMsg = msg => {
  const key = readMessageKey(msg);
  if (!key) return null;
  return key;
};

const checkEditLogsAreEmpty = mks => {
  const chatVars = getVariables(CHAT_SCOPE) || {};
  for (const mk of mks) {
    if (!mk) continue;
    const editLogRaw = _.get(chatVars, [ LOGS_PATH, mk ]);
    const editLog = parseEditLog(editLogRaw);
    if (editLog.length > 0) {
      return false;
    }
  }
  return true;
};

const resyncStateOnHistoryChange = async () => {
  await logger.flush();
  logger.log("聊天记录变更，启动状态同步...", "核心同步");
  const allMessages = getChatMessages("0-{{lastMessageId}}", {
    include_swipes: false
  });
  const oldSelectedMks = _.cloneDeep(getVariables(CHAT_SCOPE)?.[SEL_PATH] || []);
  if (!allMessages || allMessages.length === 0) {
    logger.log("当前聊天记录为空，不执行任何操作，同步终止。", "核心同步");
    await logger.flush();
    return;
  }
  let firstRecalcId = -1;
  if (allMessages.length < oldSelectedMks.length) {
    logger.log("检测到消息删除。", "核心同步");
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
      if (currentMk === recordedMk) {
        firstRecalcId = i + 1;
        logger.log(`找到对齐点于 message_id=${i} (MK=${currentMk})。将从 ID ${firstRecalcId} 开始检查。`, "核心同步");
        break;
      }
    }
    if (firstRecalcId === -1) {
      firstRecalcId = 0;
      logger.log("未找到任何对齐点，将从头开始检查。", "核心同步");
    }
    const currentMkSequence = allMessages.map(getMkFromMsg).filter(mk => mk);
    const oldMkSequence = oldSelectedMks.filter(mk => mk);
    const deletedMks = _.difference(oldMkSequence, currentMkSequence);
    logger.log(`旧MK序列: [${oldMkSequence.join(", ")}]`, "优化检查");
    logger.log(`新MK序列: [${currentMkSequence.join(", ")}]`, "优化检查");
    logger.log(`计算出的被删除MK: [${deletedMks.join(", ")}]`, "优化检查");
    if (deletedMks.length > 0 && checkEditLogsAreEmpty(deletedMks)) {
      logger.log(`检测到被删除的 ${deletedMks.length} 条消息均不含变量修改，执行快速同步。`, "优化");
      const newSelectedMks = [];
      for (let i = 0; i < allMessages.length; i++) {
        newSelectedMks[i] = getMkFromMsg(allMessages[i]);
      }
      await updateVariablesWith(v => {
        _.set(v, SEL_PATH, newSelectedMks);
        return v;
      }, CHAT_SCOPE);
      logger.log("快速同步完成，仅修正 SelectedMks 数组。", "优化");
      await logger.flush();
      return;
    }
  } else if (allMessages.length === oldSelectedMks.length) {
    logger.log("检测到消息长度不变，可能为修改或切换。", "核心同步");
    for (let i = allMessages.length - 1; i >= 0; i--) {
      const currentMk = getMkFromMsg(allMessages[i]);
      const recordedMk = oldSelectedMks[i];
      if (currentMk !== recordedMk) {
        firstRecalcId = i;
      }
    }
    if (firstRecalcId === -1) {
      logger.log("所有MK均匹配，无需重算。", "核心同步");
    } else {
      logger.log(`找到最早的不匹配点于 message_id=${firstRecalcId}。将从该点开始重算。`, "核心同步");
    }
  } else {
    logger.log("检测到消息添加。", "核心同步");
    logger.log("新增消息由其他事件处理，本次同步终止。", "核心同步");
    await logger.flush();
    return;
  }
  if (firstRecalcId > -1) {
    const mksToRollback = oldSelectedMks.slice(firstRecalcId).filter(mk => mk);
    if (mksToRollback.length > 0) {
      logger.log(`准备回滚 ${mksToRollback.length} 个MK: [${mksToRollback.join(", ")}]`, "核心同步");
      for (const mk of mksToRollback.reverse()) {
        await rollbackByMk(mk, true);
      }
      logger.log("逆序回滚完成。", "核心同步");
    }
  }
  logger.log(`从 ID ${firstRecalcId} 开始顺序重算...`, "核心同步");
  const newSelectedMks = oldSelectedMks.slice(0, firstRecalcId);
  for (let i = firstRecalcId; i < allMessages.length; i++) {
    const msg = allMessages[i];
    const newMk = await ApplyVarChangeForMessage(msg);
    newSelectedMks[i] = newMk;
  }
  logger.log("顺序重算完成。", "核心同步");
  await updateVariablesWith(v => {
    _.set(v, SEL_PATH, newSelectedMks);
    return v;
  }, CHAT_SCOPE);
  logger.log("状态同步完成。", "核心同步");
  logger.log("执行【保险机制】：无条件回滚并重写最后一楼...", "保险机制");
  const lastWrittenMk = [ ...oldSelectedMks ].reverse().find(mk => mk);
  if (lastWrittenMk) {
    logger.log(`找到最后一个写入的MK: ${lastWrittenMk}，执行回滚...`, "保险机制");
    await rollbackByMk(lastWrittenMk, true);
    logger.log("回滚完成，准备根据当前最后一楼内容重写...", "保险机制");
    await ApplyVarChange();
    logger.log("保险性重写完成。", "保险机制");
  } else {
    logger.log("未找到任何可供回滚的旧MK，跳过保险机制。", "保险机制");
  }
  await logger.flush();
};

const handleEvent = async eventType => {
  try {
    await ensureMkForLatestMessage();
    const debug = false;
    if (!debug) {
      switch (eventType) {
       case "rollback_done_reapply_var_start":
       case tavern_events.MESSAGE_RECEIVED:
       case "manual_write":
        await ApplyVarChange();
        break;

       case tavern_events.MESSAGE_DELETED:
       case tavern_events.MESSAGE_SWIPED:
       case tavern_events.CHAT_CHANGED:
       case "manual_sync":
        await resyncStateOnHistoryChange();
        break;

       case tavern_events.MESSAGE_SENT:
        break;
      }
    }
  } finally {
    await updateLatestSelectedMk();
  }
};

[ "rollback_done_reapply_var_start", tavern_events.MESSAGE_RECEIVED, tavern_events.MESSAGE_DELETED, tavern_events.MESSAGE_SWIPED, tavern_events.CHAT_CHANGED, tavern_events.MESSAGE_SENT ].forEach(ev => {
  eventOn(ev, () => handleEvent(ev));
});

eventOn(getButtonEvent("写入变量修改"), () => handleEvent("manual_write"));

eventOn(getButtonEvent("手动同步状态"), () => handleEvent("manual_sync"));
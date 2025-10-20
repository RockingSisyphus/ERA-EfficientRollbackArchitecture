---
description: 解释在 JavaScript 环境中使用 TypeScript 类型注解导致的 `Unexpected token ':'` 错误，并提供可独立运行的示例。
---
# 语法错误：`Unexpected token ':'`

## 问题根源

当你在一个不支持 TypeScript 的纯 JavaScript 环境（例如酒馆助手的脚本执行环境）中运行代码时，如果代码中包含了 TypeScript 的**类型注解**（即在变量或函数参数后使用冒号 `:` 来指定类型），就会触发 `Uncaught SyntaxError: Unexpected token ':'` 错误。

JavaScript 解释器不认识这种语法，因此会报错。

---

### 错误示例（会报错）

下面的脚本可以直接复制到酒馆助手的脚本库中运行。由于它在 `logMessage` 函数的参数 `message` 后面使用了 `: string` 类型注解，执行时会在浏览器的控制台中产生 `Unexpected token ':'` 错误。

```javascript
// 文件名: 错误示例.js
// 描述: 此脚本会因包含 TypeScript 类型注解而报错。

$(function() {
  function logMessage(message: string) {
    console.log('消息: ' + message);
  }

  logMessage('这段消息将无法被打印');
});
```

---

### 修复示例（可正常运行）

这是修复后的版本。唯一的改动就是**移除了 `: string` 类型注解**。这个脚本可以被酒馆助手正常执行，并在控制台中打印出消息。

```javascript
// 文件名: 修复示例.js
// 描述: 移除了类型注解，脚本可以正常运行。

$(function() {
  function logMessage(message) {
    console.log('消息: ' + message);
  }

  logMessage('这段消息可以被成功打印');
});
```

通过对比这两个简单的示例，可以清楚地看到，解决此类问题的关键就是确保在纯 JavaScript 环境中不使用 TypeScript 特有的语法。

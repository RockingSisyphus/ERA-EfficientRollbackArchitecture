# ERA 框架 API 接口文档

## 简介

ERA 框架采用**事件驱动架构**与外部脚本进行交互。这种设计实现了高度解耦，确保了系统的稳定性和可维护性。

与 ERA 交互的**唯一**方式是通过酒馆助手提供的 `eventEmit` 和 `eventOn` 函数。您通过发送特定格式的事件来请求操作，并通过监听 ERA 广播的事件来获取结果和状态更新。

---

## 监听的事件 (外部 -> ERA)

这些是您可以发送给 ERA 以操作变量的事件。所有事件的参数都必须包裹在一个 `detail` 对象中。

### `era:insertByObject`

*   **描述**: 非破坏性地插入一个或多个变量。只会写入不存在的路径，绝不会覆盖任何已有数据。
*   **参数 (`detail`)**: `object` - 要插入的变量对象。
*   **示例**:
    ```javascript
    // 插入一个包含 user 和 items 的基础对象
    eventEmit('era:insertByObject', {
      testData: {
        description: 'Initial state for testing',
        user: { name: 'Tester', level: 1 },
        items: ['apple', 'banana', 'cherry'],
      },
    });
    ```

### `era:updateByObject`

*   **描述**: 通过对象合并的方式，修改一个或多个已存在的变量。如果路径不存在，则该路径的更新将被忽略。
*   **参数 (`detail`)**: `object` - 要更新的变量对象。
*   **示例**:
    ```javascript
    // 同时更新 user 的等级和顶层的 status
    eventEmit('era:updateByObject', {
      testData: {
        user: { level: 5 },
        status: 'idle',
      },
    });
    ```

### `era:insertByPath`

*   **描述**: 通过指定路径和值，非破坏性地插入一个新变量。如果路径已存在，操作将被忽略。
*   **参数 (`detail`)**:
    *   `path` (`string`): 变量的路径，使用点或方括号表示法 (e.g., `player.inventory[0]`)。
    *   `value` (`any`): 要插入的值。
*   **示例**:
    ```javascript
    // 在 testData.inventory 路径下插入一个新对象
    eventEmit('era:insertByPath', {
      path: 'testData.inventory',
      value: { gold: 100, slots: ['sword', 'shield'] },
    });
    ```

### `era:updateByPath`

*   **描述**: 通过指定路径和值，修改一个已存在的变量。如果路径不存在，操作将被忽略。
*   **参数 (`detail`)**:
    *   `path` (`string`): 变量的路径。
    *   `value` (`any`): 要设置的新值。支持简单的数学运算表达式（如 `'+=10'`）。
*   **示例**:
    ```javascript
    // 将玩家金币增加 50
    eventEmit('era:updateByPath', {
      path: 'testData.inventory.gold',
      value: '+=50', // ERA 会自动解析并执行加法运算
    });

    // 直接设置玩家等级
    eventEmit('era:updateByPath', {
      path: 'testData.user.level',
      value: 10,
    });
    ```

### `era:deleteByObject`

*   **描述**: 根据一个描述性的对象结构，删除一个或多个已存在的变量。
*   **参数 (`detail`)**: `object` - 一个结构与要删除的变量相似的对象，但要删除的键的值必须是一个**空对象 `{}`**。
*   **示例**:
    ```javascript
    // 删除 user.stats 中的 'int' 属性
    eventEmit('era:deleteByObject', {
      testData: {
        user: {
          stats: {
            int: {}, // 使用空对象表示删除 'int'
          },
        },
      },
    });

    // 删除整个 'metadata' 对象
    eventEmit('era:deleteByObject', {
      testData: {
        metadata: {}, // 删除 'metadata' 键
      },
    });
    ```

### `era:deleteByPath`

*   **描述**: 通过指定路径，删除一个已存在的变量。
*   **参数 (`detail`)**:
    *   `path` (`string`): 要删除的变量的路径。
*   **示例**:
    ```javascript
    // 删除 items 数组的第一个元素
    eventEmit('era:deleteByPath', {
      path: 'testData.items[0]',
    });
    ```

### `era:getCurrentVars`

*   **描述**: 请求获取当前最新的变量快照。ERA 在收到此事件后，会立即通过 `era:writeDone` 事件将当前的完整变量状态广播出来。这是一个用于手动同步或获取初始状态的便捷方法。
*   **参数 (`detail`)**: (无)
*   **示例**:
    ```javascript
    eventEmit('era:getCurrentVars');
    ```

---

## 广播的事件 (ERA -> 外部)

这是 ERA 在完成变量操作后向外广播的事件，用于通知外部脚本状态已更新。

### `era:writeDone`

*   **描述**: 当一次或多次连续的变量写入操作成功完成后，ERA 会广播此事件。这是外部脚本获取最新状态并做出响应的**唯一推荐方式**。
*   **参数 (`detail`)**: `WriteDonePayload` (`object`) - 一个包含详细更新信息的对象。
    *   `mk` (`string`): 本次更新最终落定的消息密钥 (Message Key)。
    *   `message_id` (`number`): 本次更新最终落定的消息 ID。
    *   `actions` (`object`): 一个描述本次写入触发了哪些操作（如 `apiWrite`, `sync`）的布尔值对象。
    *   `stat` (`object`): **包含** ERA 内部 `$meta` 字段的完整变量对象。
    *   `statWithoutMeta` (`object`): **不含** `$meta` 字段的纯净变量对象。**强烈建议在 UI 更新或业务逻辑处理中使用此对象**。
    *   `editLogs` (`object`): 记录变量变更历史的日志对象。
    *   `selectedMks` (`string[]`): 与当前聊天记录完全对应的消息密钥链。
    *   `consecutiveProcessingCount` (`number`): 本次事件合并处理的连续操作次数。
*   **示例**:
    ```javascript
    eventOn('era:writeDone', (detail) => {
      const { mk, message_id, actions, stat, statWithoutMeta } = detail;

      console.log(`ERA 变量已在消息 ${message_id} (MK: ${mk}) 处更新。`);
      console.log('执行的操作:', actions);

      // 'statWithoutMeta' 提供了一个干净的数据版本，非常适合用于更新 UI。
      if (actions.apiWrite) {
        console.log('本次更新由 API 调用触发。');
        updateMyUI(statWithoutMeta);
      }
    });

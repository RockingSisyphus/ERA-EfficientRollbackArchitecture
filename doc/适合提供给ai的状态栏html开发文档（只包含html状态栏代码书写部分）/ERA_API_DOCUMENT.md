# ERA 框架 API 接口文档

## 简介

ERA 框架采用**事件驱动架构**与外部脚本进行交互。这种设计实现了高度解耦，确保了系统的稳定性和可维护性。

与 ERA 交互的**唯一**方式是通过酒馆助手提供的 `eventEmit` 和 `eventOn` 函数。您通过发送特定格式的事件来请求操作，并通过监听 ERA 广播的事件来获取结果和状态更新。

---

## API 请求事件 (外部 -> ERA)

这些是您可以发送给 ERA 以操作或查询变量的事件。所有事件的参数都必须包裹在一个 `detail` 对象中。

### 写入类事件

#### `era:insertByObject`

* **描述**: 非破坏性地插入一个或多个变量。只会写入不存在的路径，绝不会覆盖任何已有数据。
* **参数 (`detail`)**: `object` - 要插入的变量对象。
* **示例**:

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

#### `era:updateByObject`

* **描述**: 通过对象合并的方式，修改一个或多个已存在的变量。如果路径不存在，则该路径的更新将被忽略。
* **参数 (`detail`)**: `object` - 要更新的变量对象。
* **示例**:

    ```javascript
    // 同时更新 user 的等级和顶层的 status
    eventEmit('era:updateByObject', {
      testData: {
        user: { level: 5 },
        status: 'idle',
      },
    });
    ```

#### `era:insertByPath`

* **描述**: 通过指定路径和值，非破坏性地插入一个新变量。如果路径已存在，操作将被忽略。
* **参数 (`detail`)**:
  * `path` (`string`): 变量的路径，使用点或方括号表示法 (e.g., `player.inventory[0]`)。
  * `value` (`any`): 要插入的值。
* **示例**:

    ```javascript
    // 在 testData.inventory 路径下插入一个新对象
    eventEmit('era:insertByPath', {
      path: 'testData.inventory',
      value: { gold: 100, slots: ['sword', 'shield'] },
    });
    ```

#### `era:updateByPath`

* **描述**: 通过指定路径和值，修改一个已存在的变量。如果路径不存在，操作将被忽略。
* **参数 (`detail`)**:
  * `path` (`string`): 变量的路径。
  * `value` (`any`): 要设置的新值。支持简单的数学运算表达式（如 `'+=10'`）。
* **示例**:

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

#### `era:deleteByObject`

* **描述**: 根据一个描述性的对象结构，删除一个或多个已存在的变量。
* **参数 (`detail`)**: `object` - 一个结构与要删除的变量相似的对象，但要删除的键的值必须是一个**空对象 `{}`**。
* **示例**:

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

#### `era:deleteByPath`

* **描述**: 通过指定路径，删除一个已存在的变量。
* **参数 (`detail`)**:
  * `path` (`string`): 要删除的变量的路径。
* **示例**:

    ```javascript
    // 删除 items 数组的第一个元素
    eventEmit('era:deleteByPath', {
      path: 'testData.items[0]',
    });
    ```

### 查询类事件

所有查询类事件都会触发一个统一的 `era:queryResult` 事件作为响应。

#### `era:getCurrentVars`

* **描述**: 请求获取当前最新的变量状态。
* **参数 (`detail`)**: (无)
* **响应**: 触发 `era:queryResult` 事件，其 `detail.queryType` 为 `getCurrentVars`，`detail.result` 为单个 `QueryResultItem` 对象。
* **示例**:

    ```javascript
    eventEmit('era:getCurrentVars');
    ```

#### `era:getSnapshotAtMk`

* **描述**: 请求获取指定消息密钥（MK）所在时间点的历史变量快照。
* **参数 (`detail`)**:
  * `mk` (`string`): 目标历史状态的消息密钥。
* **响应**: 触发 `era:queryResult` 事件，其 `detail.queryType` 为 `getSnapshotAtMk`，`detail.result` 为单个 `QueryResultItem` 对象。
* **示例**:

    ```javascript
    eventEmit('era:getSnapshotAtMk', { mk: 'era_mk_1759246942209_jipmrj' });
    ```

#### `era:getSnapshotsBetweenMks`

* **描述**: 请求获取两个消息密钥（MK）之间（包含两者）的所有历史变量快照。
* **参数 (`detail`)**:
  * `startMk` (`string`, 可选): 起始消息密钥。如果省略，则从第一条消息开始。
  * `endMk` (`string`, 可选): 结束消息密钥。如果省略，则到最后一条消息结束。
* **响应**: 触发 `era:queryResult` 事件，其 `detail.queryType` 为 `getSnapshotsBetweenMks`，`detail.result` 为一个 `QueryResultItem` 对象数组。
* **示例**:

    ```javascript
    // 获取从 startMk 到 endMk 的所有状态
    eventEmit('era:getSnapshotsBetweenMks', {
      startMk: 'era_mk_1759246942209_jipmrj',
      endMk: 'era_mk_1759247953101_abcdef'
    });

    // 获取从第一条消息到 endMk 的所有状态
    eventEmit('era:getSnapshotsBetweenMks', {
      endMk: 'era_mk_1759247953101_abcdef'
    });
    ```

---

## 广播的事件 (ERA -> 外部)

这是 ERA 在完成操作后向外广播的事件，用于通知外部脚本状态已更新或查询已完成。

### `era:writeDone`

* **描述**: **仅在写入/同步操作**（如 `insert`, `update`, `delete` 或因消息删除/切换导致重同步）成功完成后，ERA 会广播此事件。它用于通知外部脚本**当前的**变量状态已发生改变。
* **参数 (`detail`)**: `WriteDonePayload` (`object`) - 一个包含详细更新信息的对象。其结构如下：

    ```typescript
    {
      mk: string; // 本次更新的消息密钥
      message_id: number; // 本次更新的消息 ID
      actions: {
        rollback: boolean; // 是否执行了回滚
        apply: boolean;    // 是否应用了来自AI输出的变量变更
        resync: boolean;   // 是否因历史记录变化而执行了再同步
        api: boolean;      // 是否由API直接调用触发
        apiWrite: boolean; // 是否由API写入操作(如update/insert)触发
      };
      selectedMks: (string | null)[]; // 当前聊天的主干消息密钥链
      editLogs: { [key: string]: any[] }; // 完整的编辑日志
      stat: any; // 包含 $meta 字段的完整变量状态
      statWithoutMeta: any; // 不含 $meta 的纯净变量状态 (推荐使用)
      consecutiveProcessingCount: number; // 对当前消息的连续处理次数
    }
    ```

* **重要提示：防止无限循环**
    所有写入事件（如 `era:updateByPath`）最终都会触发一次 `era:writeDone`。为避免无限循环（例如：API写入 -> `writeDone` -> API写入），你可以在 `writeDone` 的监听器中检查 `detail.actions.apiWrite` 字段。如果为 `true`，则说明本次更新是由你自己的 API 调用触发的，你可能需要跳过某些响应逻辑。
* **示例**:

    ```javascript
    eventOn('era:writeDone', (detail) => {
      // 如果这次更新是由 API 写入触发的，并且你不想重复响应，可以在这里返回。
      if (detail.actions.apiWrite) {
        console.log('本次更新由 API 写入触发，UI 可能已同步，跳过某些逻辑。');
        // return;
      }

      const { mk, message_id, actions, statWithoutMeta } = detail;

      console.log(`ERA 变量已在消息 ${message_id} (MK: ${mk}) 处更新。`);
      console.log('执行的操作:', actions);

      // 'statWithoutMeta' 提供了一个干净的数据版本，非常适合用于更新 UI。
      updateMyUI(statWithoutMeta);
    });
    ```

### `era:queryResult`

* **描述**: 作为所有**查询类 API 事件** (`era:getCurrentVars`, `era:getSnapshotAtMk`, `era:getSnapshotsBetweenMks`) 的统一响应事件。
* **参数 (`detail`)**: `QueryResultPayload` (`object`) - 一个包含查询请求和结果的对象。其结构如下：

    ```typescript
    // QueryResultPayload 结构
    {
      // 原始查询的类型
      queryType: 'getCurrentVars' | 'getSnapshotAtMk' | 'getSnapshotsBetweenMks';
      // 原始查询的 detail 对象
      request: any;
      // 查询的结果。根据 queryType，可以是单个 QueryResultItem 或 QueryResultItem 数组。
      result: QueryResultItem | QueryResultItem[];
    }
    ```

* **`QueryResultItem` 结构详解**:
  * `mk` (`string`): 该状态快照所对应的**消息密钥**。
  * `message_id` (`number`): 该状态快照所对应的**消息 ID**。
  * `is_user` (`boolean`): 消息是否由用户发送。`true` 表示是用户消息，`false` 表示是 AI 消息。
  * `stat` (`any`): 包含 `$meta` 等内部字段的**完整**变量状态对象。
  * `statWithoutMeta` (`any`): **不包含**任何 `$` 前缀字段的**纯净**变量状态对象，推荐用于 UI 展示或业务逻辑处理。

* **示例**:

    ```javascript
    eventOn('era:queryResult', (detail) => {
      console.log(`收到了对 [${detail.queryType}] 查询的响应。`);

      if (detail.queryType === 'getSnapshotsBetweenMks') {
        // 结果是一个数组
        console.log(`获取了 ${detail.result.length} 个快照。`);
        detail.result.forEach(item => {
          console.log(`MK: ${item.mk}, 消息ID: ${item.message_id}, Stat:`, item.statWithoutMeta);
        });
      } else {
        // 结果是单个对象
        const resultItem = detail.result;
        console.log(`获取了快照 MK: ${resultItem.mk}, 消息ID: ${resultItem.message_id}`);
        console.log('Stat:', resultItem.statWithoutMeta);
      }
    });

# ERA 变量框架：增删改指令用法指南

本文档旨在为角色卡/世界书作者和相关插件开发者提供 ERA 变量框架中 `<VariableInsert>`、`<VariableEdit>` 和 `<VariableDelete>` 三个核心指令的详细用法和逻辑说明。

## 目录

1. [`<VariableInsert>` (插入)](#variableinsert-插入)
2. [`<VariableEdit>` (更新)](#variableedit-更新)
3. [`<VariableDelete>` (删除)](#variabledelete-删除)
4. [综合示例](#综合示例)

---

## `<VariableInsert>` (插入)

**用途**: 向变量中 **添加新数据**。这是一个 **非破坏性** 操作，它绝不会修改或覆盖任何已经存在的数据。

### 核心行为

- **只增不改**: `insert` 只会在不存在的路径上创建新的属性和值。如果一个路径已经有值了，`insert` 会跳过对该路径的操作。
- **补充结构**: 如果指令中的父路径已经存在，`insert` 会在该父路径下补充新的子属性。

### `template` (模板) 的使用

`insert` 支持使用 `$template` 来为新创建的对象预设一个默认结构。模板本身也可以包含 `$meta` 属性。

- **何时使用**: 当 `insert` 创建一个全新的对象时，它会寻找可用的模板，并将模板与指令中的数据合并后存入变量。**`template` 对象本身的内容就是缺省值**
- **模板的继承与覆盖**:
  - 如果一个父元素定义了模板，那么在向其 **直接** 子元素插入新数据时，会自动应用父模板。
  - **如果子元素自身也定义了模板，则子元素的模板会优先于父模板。**
- **模板优先级**: 综合来看，模板的查找遵循以下优先级：
    1. **变量中已有的模板**: 如果要插入的路径的父级已经定义了 `$template`，将优先使用它。
    2. **继承的模板**: 如果父级没有，则会使用从更上层节点继承下来的模板。
    3. **指令中自带的模板**: 仅当以上两者都不存在时，才会使用本次 `insert` 指令中提供的 `$template`。

### 示例：复杂的模板继承与覆盖

**第 1 步: 定义一个带模板的结构**

- **指令**:

  ```xml
  <VariableInsert>
  {
    "guild": {
      "$template": {
        "rank": "Rookie",
        "contribution": 0,
        "$meta": { "updatable": true }
      }
    }
  }
  </VariableInsert>
  ```

- **逻辑**: 创建 `guild` 结构，并为其定义一个模板。这个模板将应用于未来直接添加到 `guild` 下的新成员。

**第 2 步: 使用模板插入新成员**

- **指令**:

  ```xml
  <VariableInsert>
  {
    "guild": {
      "Alex": { "class": "Warrior" },
    }
  }
  </VariableInsert>
  ```

- **逻辑**:
    1. 插入 `Alex` 作为 `guild` 的直接子节点。它继承了父级 `guild` 的模板。
- **最终 `guild` 的值**:

  ```json
  {
    "guild": {
      "Alex": {
        "class": "Warrior",
        "rank": "Rookie",
        "contribution": 0,
        "$meta": { "updatable": true }
      }
    }
  }
  ```

### `$meta.unInsertAble`（插入保护）

- **作用**：在目标节点的 `$meta` 中写入 `unInsertAble`，即可为该节点及其层级配置 **禁止新增** 的规则，根节点同样适用。
- **`"all"`**：除 `$meta` 自身外，拒绝一切递归插入；只允许显式修改 `$meta`（例如清空或删除 `unInsertAble`）来解除保护。
- **`"self"`**：禁止在当前节点下新增任何“直属子属性”键，但允许对已存在的键继续递归插入或修改已有内容。
- **修改 `$meta` 默认放行**：针对 `$meta` 的写入被视为合法维护操作，因此可以在保护开启后单独更新 `$meta` 字段以调整配置。
- **根节点同样生效**：`applyInsertAtLevel` 在 basePath 为 `''` 时也会读取 `$meta.unInsertAble`，因此只需在根对象写入即可保护整个变量树。

---

## `<VariableEdit>` (更新)

**用途**: **修改已存在的数据**。这是一个 **破坏性** 操作，它会直接用新值覆盖目标路径的旧值。

### 核心行为

- **只改不增**: `edit` 只会修改已经存在的路径。如果指令中指定的路径不存在，操作将被跳过。
- **直接覆盖**: `edit` 会用指令中提供的新值完全替换掉目标路径上的旧值。
- **完整日志**: 即使指令提供的新值与旧值相同，`edit` 依然会执行写入并记录日志。

### `$meta.updatable` (可更新) 的使用

- **`updatable: false`**: 在变量的 `$meta` 中将此项设为 `false`，该变量及其所有子孙变量（跨层级）都将受到保护，无法被更新。
- **默认行为**: 如果不设置 `updatable`，则默认为 `true`（允许更新）。
- **如何解除保护**: 只要 `edit` 指令中 **包含了** 将 `$meta.updatable` 的值从 `false` 改为 `true` 的部分，保护就会被解除，并且 同一个指令中的其他有效更新也会被一并执行，注意，updatable的保护不包含防删除。

### 示例

**示例 1: 常规更新**

- **变量**:

  ```json
  { "player": { "hp": 100 } }
  ```

- **指令**: `<VariableEdit>{ "player": { "hp": 90 } }</VariableEdit>`
- **结果**:

  ```json
  { "player": { "hp": 90 } }
  ```

**示例 2: 尝试更新受保护的变量 (失败)**

- **变量**:

  ```json
  { "player": { "hp": 100, "$meta": { "updatable": false } } }
  ```

- **指令**: `<VariableEdit>{ "player": { "hp": 90 } }</VariableEdit>`
- **结果**: 无变化，因为 `player` 节点受保护。

**示例 3: 解除保护并同时更新其他属性**

- **变量**: (同上)
- **指令**:

  ```xml
  <VariableEdit>
  {
    "player": {
      "hp": 80,
      "$meta": { "updatable": true }
    }
  }
  </VariableEdit>
  ```

- **逻辑**: 指令中包含了将 `updatable` 改为 `true` 的部分，满足解除保护的条件。因此，对 `hp` 的更新和对 `$meta` 的更新都会被成功执行。
- **结果**:

  ```json
  { "player": { "hp": 80, "$meta": { "updatable": true } } }
  ```

---

## `<VariableDelete>` (删除)

**用途**: **删除已存在的数据**。这是一个 **破坏性** 操作。

### 核心行为

- **删除节点本身**: 在指令中，使用一个 **空对象 `{}`** 作为值，表示要删除该键对应的整个节点。
- **删除子节点**: 在指令中，使用一个 **非空对象** 作为值，表示要继续深入，去删除更深层级的子节点。

### `$meta.necessary` (必要性) 的使用

- **`"self"`**: 保护当前节点 **不被直接删除**，但其子节点 **可以被删除**。
- **`"all"`**: 保护当前节点及其所有子孙节点不被任何删除操作影响。
- **如何解除保护**: 只要 `delete` 指令中 **包含了** 删除 `$meta` 对象本身或删除 `$meta.necessary` 属性的逻辑，保护就会被解除，并且 **同一个指令中的其他有效删除也会被一并执行**。

### 示例

**示例 1: `necessary: "self"` 的区别**

- **变量**:

  ```json
  { "user": { "name": "Alex", "stats": { "str": 10 }, "$meta": { "necessary": "self" } } }
  ```

- **指令 1 (删除子节点 - 成功)**: `<VariableDelete>{ "user": { "stats": {} } }</VariableDelete>`
  - **结果**:

    ```json
    { "user": { "name": "Alex", "$meta": { "necessary": "self" } } }
    ```

- **指令 2 (删除自身 - 失败)**: `<VariableDelete>{ "user": {} }</VariableDelete>`
  - **结果**: 无变化。

**示例 2: `necessary: "all"` 的保护**

- **变量**:

  ```json
  { "user": { "name": "Alex", "stats": { "str": 10 }, "$meta": { "necessary": "all" } } }
  ```

- **指令 (删除子节点 - 失败)**: `<VariableDelete>{ "user": { "stats": {} } }</VariableDelete>`
  - **结果**: 无变化。

**示例 3: 解除保护并同时删除其他属性**

- **变量**: (同上)
- **指令**:

  ```xml
  <VariableDelete>
  {
    "user": {
      "stats": {},
      "$meta": { "necessary": {} }
    }
  }
  </VariableDelete>
  ```

- **逻辑**: 指令中包含了删除 `necessary` 属性的逻辑，满足解除保护的条件。因此，对 `stats` 的删除和对 `$meta.necessary` 的删除都会被成功执行。
- **结果**:

  ```json
  { "user": { "name": "Alex", "$meta": {} } }
  ```

---

## 综合示例

本章节将通过一个连续的场景，完整地展示三个指令如何协同工作。

### 1. 初始化世界状态

首先，我们使用一个复杂的 `<VariableInsert>` 指令来初始化整个世界的变量结构。

- **指令**:

  ```xml
  <VariableInsert>
  {
    "world_state": {
      "capital": {
        "type": "city",
        "population": 1000,
        "description": "The bustling capital city.",
        "$meta": {
          "updatable": false,
          "necessary": "all"
        }
      },
      "characters": {
        "$template": {
            "level": 1,
            "hp": 10,
            "inventory": [],
            "$meta": { "necessary": "self" }
          }
      },
      "game_version": "1.0.0"
    }
  }
  </VariableInsert>
  ```

- **逻辑**: 创建了一个 `world_state` 对象。`capital` 被 `meta` 保护。`characters` 定义了一个模板，用于之后创建的新角色。

### 2. 后续操作：`<VariableInsert>`

- **场景 A: 成功 - 应用父节点模板**
  - **指令**: `<VariableInsert>{ "world_state": { "characters": { "player": { "hp": 15 } } } }</VariableInsert>`
  - **逻辑**: `player` 是新角色，应用了 `characters` 下的模板。指令中的 `hp: 15` 覆盖了模板中的 `hp: 10`。
  - **结果**: `player` 对象被创建为:

    ```json
    {
      "level": 1,
      "hp": 15,
      "inventory": [],
      "$meta": { "necessary": "self" }
    }
    ```

- **场景 B: 半失败 - $template已存在，无法插入，也自然无法使用**
  - **指令**:

    ```xml
    <VariableInsert>
    {
      "world_state": {
        "characters": {
          "$template": { 
            "level": 99, "hp": 9999, "$meta": { "necessary": "all" }
          },
          "final_boss": { "hp": 8888 }
        }
      }
    }
    </VariableInsert>
    ```

  - **逻辑**: insert无法插入已存在的值。
  - **结果**: `final_boss` 对象被创建为:

    ```json
    {
      "level": 1,
      "hp": 8888,
      "inventory": [],
      "$meta": { "necessary": "all" }
    }
    ```

- **场景 C: 成功 - 模板的嵌套使用**
  - **前置操作**: 首先，我们通过 `edit` 在 `characters` 的 `$template` 中，同时定义一个“原型模板”（直接包含 `level` 等属性）和一个针对 `npc_guard` 的“特异性模板”。

    ```xml
    <VariableInsert>
    {
      "world_state": {
        "characters": {
          "$template": {
            "follower": {
              "$template":{
                "level":10,
                "hp":200,
                "faction":"None",
                "sex":"female"
              }
            }
          }
        }
      }
    }
    </VariableInsert>
    ```

  - **指令**:

    ```xml
    <VariableInsert>
    {
      "world_state": {
        "characters": {
          "player": {
            "follower":{
            }
          }
        }
      }
    }
    {
      "world_state": {
        "characters": {
          "player": {
            "follower":{
              "lili":{
                "level":1
              },
              "cityGuard":{}
            }
          }
        }
      }
    }
    </VariableInsert>

  - **逻辑**:
    1. 在 `follower` 层级，其模板定义了,但是系统检测到playwer无follower（因为plawer的插入在follower模板的构造之前）。所以直接试图使用follwer内部的模板是无效的。必须先为player插入follwer，而后再为follower插入值，即可应用模板。
    2. 当插入 `lili` 时用指令中的 `level: 1` 覆盖原型中的默认值。
  - **结果**: `player.follower` 的数据最终变为：

    ```json
    {
      "lili": {
        "level": 1,
        "hp": 200,
        "faction": "None",
        "sex": "female"
      },
      "cityGuard": {
        "level": 5,
        "hp": 50,
        "faction": "None",
        "sex": "female"
      }
    }
    ```

- **场景 D: 失败 - 路径已存在**
  - **指令**: `<VariableInsert>{ "world_state": { "game_version": "1.0.1" } }</VariableInsert>`
  - **逻辑**: `game_version` 路径已存在，`insert` 不会覆盖它。
  - **结果**: 无变化。

### 3. 后续操作：`<VariableEdit>`

- **场景 A: 失败 - 路径受 `updatable: false` 保护**
  - **指令**: `<VariableEdit>{ "world_state": { "capital": { "population": 1001 } } }</VariableEdit>`
  - **逻辑**: `capital` 节点受 `updatable: false` 保护，操作被阻止。
  - **结果**: 无变化。

- **场景 B: 成功 - 解除保护并同时更新**
  - **指令**: `<VariableEdit>{ "world_state": { "capital": { "population": 1002, "$meta": { "updatable": true } } } }</VariableEdit>`
  - **逻辑**: 指令中包含了解除保护的部分，因此对 `population` 的更新也被一并执行。
  - **结果**: `capital` 的 `population` 变为 `1002`，`updatable` 变为 `true`。

- **场景 C: 失败 - 路径不存在**
  - **指令**: `<VariableEdit>{ "world_state": { "lost_city": { "population": 1 } } }</VariableEdit>`
  - **逻辑**: `lost_city` 路径不存在，`edit` 只修改已存在路径，操作跳过。
  - **结果**: 无变化。

### 4. 后续操作：`<VariableDelete>`

- **场景 A: 失败 - 路径受 `necessary: "all"` 保护**
  - **指令**: `<VariableDelete>{ "world_state": { "capital": { "description": {} } } }</VariableDelete>`
  - **逻辑**: `capital` 节点受 `necessary: "all"` 保护，其所有子节点都无法被删除。
  - **结果**: 无变化。

- **场景 B: 成功 - 删除受 `necessary: "self"` 保护的节点的子节点**
  - **指令**: `<VariableDelete>{ "world_state": { "characters": { "player": { "inventory": {} } } } }</VariableDelete>`
  - **逻辑**: `player` 受 `self` 保护，意味着它自身不能被直接删除，但其子节点 `inventory` 可以。
  - **结果**: `player` 对象中的 `inventory` 属性被删除。

- **场景 C: 成功 - 解除保护并同时删除**
  - **指令**: `<VariableDelete>{ "world_state": { "characters": { "final_boss": { "hp": {}, "$meta": {} } } } }</VariableDelete>`
  - **逻辑**: `final_boss` 受 `all` 保护。但指令中包含了删除 `$meta` 的豁免操作，因此对 `hp` 的删除也被一并执行。
  - **结果**: `final_boss` 对象中的 `hp` 和 `$meta` 属性都被删除。

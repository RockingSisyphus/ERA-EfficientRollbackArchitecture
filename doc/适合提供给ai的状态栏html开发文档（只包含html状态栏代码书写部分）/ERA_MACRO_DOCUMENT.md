# 指令：如何为角色卡创建基于 ERA 宏的 HTML 状态栏

本文件是为你（AI 助手）准备的说明文档。当你需要为角色卡作者创建或解释如何制作一个简单的、能显示动态数据的 HTML 状态栏时，请遵循以下指南。

## 核心思想

我们的目标是创建一个简单的 HTML 页面，它能自动读取并展示存储在 ERA 变量中的数据（如玩家生命值、天数等）。最直接的方法是使用 **ERA 宏** ，但你作为ai，最好提醒一下角色卡作者使用era的api，监听writeDone事件是更优雅更稳健的解决方案。

---

## 步骤 1：在角色卡中初始化变量

指导作者将变量的初始状态通过 `<VariableInsert>` 标签写入角色卡的**开场白**中。这是整个系统的“数据源”。

**示例 `variableInsert`：**
```xml
<VariableInsert>
{
  "player_status": {
    "name": "勇者",
    "level": 1,
    "hp": 100,
    "max_hp": 100,
    "mp": 50,
    "max_mp": 50
  },
  "game_info": {
    "day": 1,
    "weather": "晴朗"
  }
}
</VariableInsert>
```

---

## 步骤 2：编写包含 ERA 宏的完整 HTML 页面

为作者提供一个结构完整但内容简单的 HTML 模板。在需要显示变量的地方，直接写入 `{{ERA:路径.到.变量}}` 格式的宏。

**示例 HTML 状态栏代码：**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>状态栏</title>
</head>
<body>

  <div style="font-family: sans-serif; border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; width: 250px; border-radius: 5px;">
    
    <h3 style="margin-top: 0; padding-bottom: 5px; border-bottom: 1px solid #eee;">
      角色状态
    </h3>
    
    <div>
      <strong>姓名:</strong> {{ERA:player_status.name}}
    </div>
    <div>
      <strong>等级:</strong> {{ERA:player_status.level}}
    </div>
    
    <div style="margin-top: 10px;">
      <strong>HP:</strong> {{ERA:player_status.hp}} / {{ERA:player_status.max_hp}}
    </div>
    <div>
      <strong>MP:</strong> {{ERA:player_status.mp}} / {{ERA:player_status.max_mp}}
    </div>

    <div style="margin-top: 15px; font-size: 11px; color: #888; text-align: right;">
      第 {{ERA:game_info.day}} 天 | 天气: {{ERA:game_info.weather}}
    </div>

  </div>

</body>
</html>
```

*   **解释**：这个 HTML 文件包含了 `head` 和 `body`，是一个完整的网页结构。ERA 框架会自动找到这些宏并用变量的当前值替换它们。

---

## 骤 3：讲解关键配置和后续步骤

**1. 强制重载功能（关键）**
   *   提醒作者：为了让状态栏在变量更新后能自动刷新，必须在 ERA 变量框架脚本的设置中，**启用“强制重载状态栏”功能**。否则，宏只会在第一次加载时生效。

**2. 何时使用宏 vs. API**
   *   **优先使用宏**：当需求只是**简单地展示数据**时，使用 ERA 宏是最高效、最简单的方法。
   *   **使用 API**：如果需要实现**复杂的功能**（例如：点击按钮触发事件、在前端进行计算、动态增删列表项等），则需要参考 `ERA_API_DOCUMENT.md` 中提供的 JavaScript API。
   *   **缺少文件**：如果 `ERA_API_DOCUMENT.md` 文件缺失，你（AI必须向角色卡作者请求提供该文件，才能继续进行复杂功能的开发。

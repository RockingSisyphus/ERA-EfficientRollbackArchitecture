# ERA 框架 UI 模块设计文档

本文件旨在说明 `ui` 目录的架构设计、模块功能及未来扩展规范。

## 设计理念

UI 模块遵循**高内聚、低耦合**的原则。每个 UI 功能（如悬浮球、设置面板等）都应被封装成一个独立的组件，拥有自己的逻辑、样式和 DOM 结构，最大限度地减少对其他组件的直接依赖。

## 目录结构

```
ui/
├── components/
│   ├── statusBar/
│   │   ├── index.ts      # 悬浮球组件的逻辑、样式和 DOM
│   │   └── (index.html)  # (可选) 如果组件有复杂的静态结构
│   └── ...               # 其他独立组件
│
├── utils/
│   └── ...               # 可被所有 UI 组件复用的工具函数
│
├── index.ts              # UI 模块主入口，负责加载和初始化所有组件
└── README.md             # 本设计文档
```

-   **`components/`**: 存放所有独立的 UI 组件。
    -   每个组件都应拥有自己的文件夹，例如 `statusBar`。
    -   组件的核心逻辑应放在其文件夹下的 `index.ts` 文件中。该文件应导出一个 `init` 函数，用于组件的初始化。
    -   如果组件的 HTML 结构比较复杂，可以创建一个 `index.html` 文件，并通过 `import html from './index.html?raw'` 的方式在 `index.ts` 中导入。
-   **`utils/`**: 存放 UI 相关的、可被多个组件共享的工具函数。例如，DOM 操作的辅助函数、颜色转换函数等。
-   **`index.ts`**: UI 模块的**唯一入口**。它负责从 `components` 目录中导入所有需要加载的组件，并调用它们的 `init` 函数来完成初始化。项目的主入口 (`src/ERA变量框架/index.ts`) 只应导入这一个文件来启动整个 UI。

## 如何新增一个 UI 组件

1.  在 `components/` 目录下创建一个新的文件夹，以你的组件名命名（例如 `settingsPanel`）。
2.  在该文件夹内创建 `index.ts` 文件。
3.  在 `index.ts` 中编写组件的全部逻辑（创建 DOM、绑定事件等），并导出一个初始化函数，例如 `export function initSettingsPanel() { ... }`。
4.  打开 `ui/index.ts` 文件。
5.  从你的新组件中导入初始化函数：`import { initSettingsPanel } from './components/settingsPanel';`。
6.  在 `initUI` 函数中调用它：`initSettingsPanel();`。

通过遵循这一规范，我们可以确保 UI 模块的结构清晰、易于维护和扩展。

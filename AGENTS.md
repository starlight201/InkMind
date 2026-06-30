# AGENTS.md

## 项目概况

- 项目名称：InkMind / `inkmind-dashboard`
- 类型：Vite 纯前端大屏项目，当前不是 Vue 组件项目。
- 主要技术：原生 JavaScript、CSS、ECharts。
- 主要场景：中国画美育疗法数据可视化，面向 `1920 x 1080` 大屏展示。
- 部署路径：`vite.config.js` 中 `base` 为 `/InkMind/`，修改部署配置前需确认目标环境。

## 本地约定

- 插件、技能等默认安装到 D 盘。
- 新项目或新建独立文件默认保存到 E 盘。
- 当前项目根目录：`E:\vue_project\InkMind`。

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 目录说明

- `src/main.js`：应用入口。
- `src/app.js`：页面装配、全局组件渲染和事件绑定。
- `src/charts/`：ECharts 图表模块。
- `src/components/`：顶部栏、弹窗等通用组件。
- `src/data/`：前端结构化数据。
- `src/interactions/`：交互事件、弹窗内容、滚轮导航、热区逻辑。
- `src/pages/`：五个页面模板。
- `src/styles/`：基础样式、布局、组件样式和页面样式。
- `public/`：静态资源。
- `realdata/`：原始 Excel 数据来源。

## 开发原则

- 优先沿用现有模块拆分和命名风格，保持改动范围小而清晰。
- 不要无故引入 Vue、React、TypeScript、状态库或新的 UI 框架。
- 图表逻辑优先放在 `src/charts/`，页面结构放在 `src/pages/`，交互逻辑放在 `src/interactions/`。
- 样式按现有 `src/styles/` 分层维护，避免把大量内联样式写进 JS 模板。
- 修改数据展示时，优先更新 `src/data/` 中的结构化数据；涉及原始数据口径时同步核对 `realdata/`。
- 面向大屏展示，注意固定比例、文字溢出、图表自适应和导航切换后的视觉稳定性。

## 验证要求

- 提交前至少运行 `npm run build`。
- 涉及页面、图表或样式时，使用 `npm run dev` 本地检查主要页面：
  - `/?page=status`
  - `/?page=therapy`
  - `/?page=trend`
  - `/?page=technique`
  - `/?page=comparison`
- 若修改滚轮导航、弹窗、热区或图表联动，需要手动验证对应交互。

## 注意事项

- 不要提交 `node_modules/`、`dist/`、本地日志或临时文件。
- 保留中文业务文案和数据含义，避免在无依据时改写指标口径。
- README 当前可能存在编码显示问题；如需整理文档，先确认原始编码和用户意图。

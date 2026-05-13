# 优站导航

一个使用 Vue 3 全家桶和 Ant Design Vue 构建的个人导航站，用来收藏优秀网站、AI 编程工具、常用 Skills 和常用 MCP 工具。

## 功能

- 站点导航：按分类展示优秀网站，卡片包含名称、地址、简介、图片和分类。
- 分类切换：支持 AI 工具、设计灵感、开发工具、静态部署、AI 编程工具等多类站点。
- 站点搜索：支持按名称、地址和简介搜索。
- 新窗口跳转：点击站点卡片后在新窗口打开目标网站。
- 常用 Skills：独立 `/skills` 页面，按分类展示前端开发 AI Skills。
- 常用 MCP：独立 `/mcp` 页面，按分类展示 MCP 工具、核心功能、适用场景和安装方式。
- 响应式布局：桌面端多列卡片展示，移动端自适应。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia
- Ant Design Vue
- Ant Design Icons Vue

## 快速开始

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问地址：

```text
http://127.0.0.1:5173
```

如需指定端口，例如当前开发常用的 `5188`：

```bash
npm run dev -- --port 5188
```

访问：

```text
http://127.0.0.1:5188
```

## 构建

```bash
npm run build
```

构建产物会输出到：

```text
dist/
```

本地预览构建产物：

```bash
npm run preview
```

## 页面说明

### 首页

路径：

```text
/
```

首页展示普通站点导航。数据来源：

```text
src/data/sites.js
```

首页顶部分类中有两个特殊入口：

- `常用 Skills`：跳转到 `/skills`
- `常用 MCP`：跳转到 `/mcp`

### 常用 Skills

路径：

```text
/skills
```

用于展示前端开发专用 AI Skills，包含：

- 通用基础规范
- React 生态
- Vue 生态
- 样式与 UI
- 工程化构建
- 业务开发
- 跨端 / 小程序
- 性能与优化
- 测试与质量
- 安全与兼容
- 文档与工具
- AI 辅助专用

数据来源：

```text
src/data/frontendSkills.js
```

### 常用 MCP

路径：

```text
/mcp
```

用于展示常用 MCP 工具，包含：

- 开发辅助与智能升级
- 脚手架与开发框架
- 文档辅助与知识检索
- 浏览器控制、测试与 QA
- UI 组件、设计与动画
- WebMCP 与网站智能化
- 项目配置与管理
- 文件系统
- Git 版本
- 全网搜索
- 代码仓库
- 数据库
- 前端调试
- 框架专属
- 样式 UI
- 设计稿
- 工程规范
- 接口测试
- 部署运维
- 性能优化
- 监控异常
- 组件文档
- 测试工具
- 云服务
- 办公效率

数据来源：

```text
src/data/frontendMcpTools.js
```

## 数据维护

### 添加普通导航站点

编辑：

```text
src/data/sites.js
```

新增分类：

```js
export const categories = [
  { label: '全部', value: 'all' },
  { label: '新分类', value: 'new-category' },
];
```

新增站点：

```js
{
  id: 'example',
  name: 'Example',
  url: 'https://example.com',
  description: '站点简介。',
  image: 'https://example.com/cover.jpg',
  category: 'new-category',
}
```

### 添加 Skill

编辑：

```text
src/data/frontendSkills.js
```

新增数据：

```js
{
  id: 'my-skill',
  category: '通用基础规范',
  name: 'my-skill',
  coreUse: '核心作用说明',
  scenario: '适用开发场景',
}
```

### 添加 MCP 工具

编辑：

```text
src/data/frontendMcpTools.js
```

新增数据：

```js
{
  id: 'my-mcp',
  category: '文件系统',
  name: 'My MCP',
  description: '核心功能说明',
  scenario: '适用场景',
  target: 'npm install my-mcp',
  type: 'command',
}
```

`type` 可选值：

- `command`：安装命令或包名，会以代码样式展示。
- `link`：网址，会以可点击链接展示。
- `text`：普通文本说明。

## 项目结构

```text
src/
  components/
    CategoryTabs.vue
    SearchBar.vue
    SiteCard.vue
  data/
    frontendMcpTools.js
    frontendSkills.js
    sites.js
  router/
    index.js
  stores/
    siteStore.js
  styles/
    global.css
  views/
    HomeView.vue
    McpView.vue
    SkillsView.vue
  App.vue
  main.js
```

## GitHub

仓库地址：

```text
https://github.com/liugang1988/my-favorites
```

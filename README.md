# AM Harness 工程指南

> **AI 会思考，但它动不了手。给它装上手脚的那套系统，就叫 Harness。**

一个图形化的中文站，把「Agent Harness 工程」讲清楚——不用啃长文档，滚一遍就懂。

**在线访问：<https://am5188.github.io/harness-guide/>**

## 这个站讲什么

| 页面 | 内容 |
|---|---|
| 总览 | Harness 是什么、为什么同一个模型换个 harness 能力差十倍 |
| [九大件](https://am5188.github.io/harness-guide/parts/) | 循环控制 / 上下文 / 工具 / 记忆 / 评估 / 安全 / 多智能体 / 钩子 / 长时运行 |
| [智能体循环](https://am5188.github.io/harness-guide/loop/) | 从一轮 prompt 到长时运行的循环与控制流 |
| [上下文工程](https://am5188.github.io/harness-guide/context/) | 上下文预算、压缩、注入策略 |
| [工具与 MCP](https://am5188.github.io/harness-guide/tools/) | 工具设计、MCP 生态、code mode 取舍 |
| [工作流模式](https://am5188.github.io/harness-guide/workflows/) | 编排者-工作者、并行化、路由、提示链 |
| [评估与基准](https://am5188.github.io/harness-guide/eval/) | SWE-bench / 轨迹评测 / LLM-judge 的边界 |
| [安全与权限](https://am5188.github.io/harness-guide/security/) | 提示词注入、致命三要素、权限门与沙箱 |

内容基于公开论文、工程博客与开源仓库整理，源头都在正文里给了链接。

## 本地跑

```bash
npm install
npm run dev          # http://localhost:3000/harness-guide/
```

> 本地开发时 URL 带 `/harness-guide` 前缀（因为线上部署在同一子路径下）。
> 想在根路径开发：`NEXT_PUBLIC_BASE_PATH= npm run dev`

## 构建 / 发布

```bash
npm run build        # 静态导出到 out/
npm run deploy       # 构建 + 推送 out/ 到 gh-pages 分支 → GitHub Pages 自动更新
```

技术栈：Next.js 16（App Router，`output: "export"` 纯静态）+ React 19 + Tailwind CSS 4 + shadcn 风格组件。
没有后端、没有环境变量、没有运行时依赖——字体也已经在构建时自托管。

## 许可

- **代码**：MIT（见 [LICENSE](./LICENSE)）
- **文字与图解**：CC BY 4.0 —— 欢迎转载/改编，注明来源即可

正文中引用的第三方资料（论文、博客、开源仓库）版权归原作者，本站只做摘要与链接。

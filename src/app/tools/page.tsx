import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolsExplorer } from "@/components/tools-explorer";

export const metadata: Metadata = {
  title: "工具设计与 MCP · Harness 工程",
  description: "少而精的工具设计、MCP 协议、工具太多时的渐进式发现与编程式调用。",
};

const DESIGN_PRINCIPLES = [
  {
    title: "少而精，面向任务",
    desc: "别把每个 API 端点都包一遍。给「完成某任务」的复合工具，而不是 20 个原子碎片。",
    icon: "🎯",
    color: "border-amber-500/30 bg-amber-500/10",
  },
  {
    title: "命名空间划清边界",
    desc: "asana_projects_search、jira_search——模型在「一堆工具」里才能在对的时机选对。",
    icon: "🏷️",
    color: "border-orange-500/30 bg-orange-500/10",
  },
  {
    title: "严格 schema 消歧义",
    desc: "参数叫 user_id 不叫 user。必填、枚举、约束写清楚，描述像给新同事讲。",
    icon: "📋",
    color: "border-amber-500/30 bg-amber-500/10",
  },
  {
    title: "输出为 token 效率优化",
    desc: "只返高信号内容。分页/过滤/截断，失败用 isError 结构化返回，别直接抛异常崩循环。",
    icon: "⚡",
    color: "border-orange-500/30 bg-orange-500/10",
  },
];

const MCP_FEATURES = [
  { label: "开放协议", detail: "工具/数据源以标准方式暴露给任意模型客户端" },
  { label: "模型可控", detail: "模型根据上下文自动发现并调用工具" },
  { label: "标准元数据", detail: "name、title、description、inputSchema、outputSchema、annotations" },
];

const MCP_SECURITY = [
  "校验所有输入",
  "实现访问控制 + 限流",
  "清洗输出",
  "始终 human-in-the-loop，用户能拒绝调用",
];

export default function ToolsPage() {
  return (
    <>
      <SiteHeader pageLabel="第 6 页 / 工具与 MCP" backHref="/context" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-24">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-amber-400">给 agent 装双手</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            工具怎么设计？
            <span className="text-gradient"> MCP 又是什么</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            Agent 的上限，取决于你给它的工具。造对了，模型如虎添翼；造错了，上下文被垃圾数据淹没。
          </p>
        </section>

        {/* MCP 是什么 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">MCP：工具的「USB 接口」</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            Model Context Protocol——让工具和数据源以标准方式暴露给任意模型客户端
          </p>
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6 sm:p-8">
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              {MCP_FEATURES.map((f) => (
                <div key={f.label} className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
                  <div className="mb-1 text-sm font-semibold text-amber-300">{f.label}</div>
                  <div className="text-xs text-slate-300">{f.detail}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-5">
              <div className="mb-3 text-xs font-semibold tracking-wider text-orange-400 uppercase">
                安全铁律（规范原文）
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
                {MCP_SECURITY.map((item, i) => (
                  <div key={item} className="flex items-center gap-2">
                    {i > 0 ? <span className="hidden text-slate-500 sm:inline">→</span> : null}
                    <div className="rounded-lg border border-orange-500/30 bg-orange-500/15 px-3 py-2 text-xs text-orange-200">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-300">
              模型只「提出」工具调用——Harness 负责校验 schema → 检查权限 → 执行 → 回填结果
            </p>
          </div>
        </section>

        {/* 工具设计要点 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">工具设计要点</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            先想清楚造哪些、不造哪些——判断标准：这个工具对应 agent 真正要做的「一件事」吗？
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {DESIGN_PRINCIPLES.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-6">
                <div className={`mb-3 inline-flex rounded-lg border px-3 py-1.5 text-lg ${p.color}`}>
                  {p.icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Claude Code 默认把工具响应限制在 25,000 token 以内——输出臃肿是真金白银的浪费
          </p>
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 工具太多怎么办 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">工具太多怎么办</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            几十上百个工具一次性塞进上下文会拖慢、变贵、降质——两种关键应对模式
          </p>
          <ToolsExplorer />
        </section>

        {/* 手搓启发 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-white">对我们手搓的启发</h2>
            <div className="space-y-3">
              {[
                "阶段 01「第一个工具」就按这些原则来：严格 schema、精确参数名、带内错误、结构化返回",
                "核心安全铁律：模型只提出调用，Harness 校验 → 鉴权 → 执行 → 回填，绝不让模型直接执行",
                "工具少时不用搞渐进式发现；等工具多了再上 search_tools 或编程式调用",
              ].map((tip, i) => (
                <div key={tip} className="flex gap-3 text-sm text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                    {i + 1}
                  </span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 导航 */}
        <section>
          <h2 className="mb-6 text-center text-lg font-semibold text-white">继续往下看</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/context"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sm font-bold text-sky-300">
                05
              </div>
              <div>
                <div className="text-sm font-medium text-white">上下文工程</div>
                <div className="text-xs text-slate-400">已完成</div>
              </div>
            </Link>
            <div className="glass flex cursor-not-allowed items-center gap-4 rounded-xl p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-slate-400">
                07
              </div>
              <div>
                <div className="text-sm font-medium text-slate-300">评估与基准</div>
                <div className="text-xs text-slate-400">即将推出</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

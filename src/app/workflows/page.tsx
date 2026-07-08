import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkflowPatterns } from "@/components/workflow-patterns";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "工作流设计模式 · Harness 工程",
  description: "Anthropic 五大工作流模式：提示链、路由、并行化、编排者、评估者。",
};

const COMBOS = [
  { from: "路由", to: "提示链", desc: "先分类，再走该类专属的多步链" },
  { from: "编排者", to: "并行化", desc: "编排者拆任务，独立子任务并行跑" },
  { from: "提示链", to: "评估", desc: "跑完整流水线，最后对成品做评估优化" },
  { from: "并行", to: "投票 → 链", desc: "多视角并行 → 投票选最优 → 再进格式化链" },
];

const ANTI_PATTERNS = [
  {
    icon: "🦣",
    name: "单体 Agent",
    desc: "一个 agent 塞进所有职责、所有工具。难调、难测、容易乱。",
    color: "border-red-500/30 bg-red-500/10",
  },
  {
    icon: "🏗️",
    name: "过度设计的规划",
    desc: "还没证明简单流程不够用，就先堆一套复杂 planning。",
    color: "border-orange-500/30 bg-orange-500/10",
  },
  {
    icon: "🕳️",
    name: "缺可观测性",
    desc: "没有日志 / 追踪 / 指标，出了问题无从查。",
    color: "border-amber-500/30 bg-amber-500/10",
  },
];

export default function WorkflowsPage() {
  return (
    <>
      <SiteHeader pageLabel="第 4 页 / 工作流模式" backHref="/loop" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-24">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-amber-400">循环之上</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            流程怎么组织？
            <span className="text-gradient"> 五种积木</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            Agent 循环是心跳。工作流模式是骨架——决定多个 LLM 调用之间怎么配合。
          </p>
        </section>

        {/* Workflow vs Agent */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-lg font-semibold text-white">先分清两个词</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 text-xs font-semibold tracking-wider text-blue-400 uppercase">Workflow 工作流</div>
              <p className="mb-4 text-sm leading-relaxed text-slate-300">
                由<strong className="text-white">预先写死的代码路径</strong>编排 LLM 和工具。流程是确定的。
              </p>
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-center text-xs text-blue-200">
                输入 → 步骤 A → 步骤 B → 输出（固定路线）
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 text-xs font-semibold tracking-wider text-violet-400 uppercase">Agent 智能体</div>
              <p className="mb-4 text-sm leading-relaxed text-slate-300">
                由<strong className="text-white">模型自己动态决定</strong>流程和工具用法。流程是运行时生成的。
              </p>
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-center text-xs text-violet-200">
                输入 → 模型想干嘛就干嘛 → 输出（动态路线）
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-amber-300/90">
            Anthropic 总纲：<strong>从简单开始，能用工作流就别上 agent</strong>
          </p>
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 五大模式 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">Anthropic 五大模式</h2>
          <p className="mb-8 text-center text-sm text-slate-500">点一个看流程和适用场景</p>
          <WorkflowPatterns />
        </section>

        {/* 组合技 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">可以组合着用</h2>
          <p className="mb-6 text-center text-sm text-slate-500">五个模式是可组合的积木，不是互斥的</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {COMBOS.map((combo) => (
              <div key={combo.desc} className="glass rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2 text-sm">
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-300">{combo.from}</span>
                  <span className="text-slate-600">→</span>
                  <span className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-violet-200">{combo.to}</span>
                </div>
                <p className="text-xs text-slate-400">{combo.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 反模式 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">两个反模式，要避开</h2>
          <p className="mb-6 text-center text-sm text-slate-500">生产里最常见的踩坑</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {ANTI_PATTERNS.map((item) => (
              <div key={item.name} className={cn("rounded-xl border p-4", item.color)}>
                <div className="mb-2 text-xl">{item.icon}</div>
                <div className="mb-1 text-sm font-medium text-white">{item.name}</div>
                <p className="text-xs leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 手搓启发 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-amber-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-white">对我们手搓的启发</h2>
            <div className="space-y-3">
              {[
                "阶段 02 的最小 agent 循环 = 最简 agent；五模式是「循环之上还能怎么组织」",
                "阶段 04 评估器直接对应「评估者—优化者」；阶段 05 自我改进是它的升级版",
                "记住总纲：先简单，用评估去优化，只有简单方案不够时才加复杂度",
              ].map((tip, i) => (
                <div key={tip} className="flex gap-3 text-sm text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
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
              href="/loop"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-300">
                03
              </div>
              <div>
                <div className="text-sm font-medium text-white">智能体循环深潜</div>
                <div className="text-xs text-slate-500">已完成</div>
              </div>
            </Link>
            <Link
              href="/context"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sm font-bold text-sky-300">
                05
              </div>
              <div>
                <div className="text-sm font-medium text-white">上下文工程</div>
                <div className="text-xs text-slate-500">压缩 / 清理 / 记忆 →</div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

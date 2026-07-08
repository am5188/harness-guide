import type { Metadata } from "next";
import Link from "next/link";
import { EvalBenchmarkExplorer } from "@/components/eval-benchmark-explorer";
import { EvalGraderCompare } from "@/components/eval-grader-compare";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "评估与基准 · Harness 工程",
  description: "不靠感觉靠测量：Agent 评估指标、代码打分器 vs LLM-as-a-Judge、SWE-bench 等关键基准。",
};

export default function EvalPage() {
  return (
    <>
      <SiteHeader pageLabel="第 7 页 / 评估与基准" backHref="/tools" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-32">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-emerald-400">不靠感觉，靠测量</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Agent 好不好，
            <span className="text-gradient"> 怎么说了算？</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            评估是 Harness 工程里最难、也最被低估的一环——没有可靠评估，自我改进就是空中楼阁。
          </p>
        </section>

        {/* 核心洞察 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 sm:p-8">
            <p className="text-center text-sm leading-relaxed text-slate-300">
              Anthropic 反复强调：<strong className="text-white">先用充分的评估去优化简单方案，再考虑加复杂度。</strong>
              <br />
              <span className="text-slate-400">
                自我改进的整个循环，都建立在「能判断一次改动是变好还是变坏」之上。
              </span>
            </p>
          </div>
        </section>

        {/* 别只看最终答案 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">别只看「最终答案对不对」</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            大多数评估止步于留出集 pass/fail，会漏掉过程里的大量信号
          </p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: "🛤️",
                  title: "轨迹质量",
                  desc: "中间步骤走得对不对？有没有绕远路？",
                  cls: "border-emerald-500/30 bg-emerald-500/10",
                },
                {
                  icon: "🔧",
                  title: "工具调用",
                  desc: "调对工具了吗？参数传对了吗？",
                  cls: "border-cyan-500/30 bg-cyan-500/10",
                },
                {
                  icon: "🔄",
                  title: "打转与恢复",
                  desc: "陷入循环了吗？出错后能不能自己爬出来？",
                  cls: "border-violet-500/30 bg-violet-500/10",
                },
              ].map((item) => (
                <div key={item.title} className={cn("rounded-xl border p-4", item.cls)}>
                  <div className="mb-2 text-2xl">{item.icon}</div>
                  <div className="mb-1 text-sm font-semibold text-white">{item.title}</div>
                  <p className="text-xs text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-slate-400">
              成熟评估会同时看<strong className="text-white"> 结果</strong>和<strong className="text-white"> 过程</strong>
            </p>
          </div>
        </section>

        {/* 交互：打分器对比 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">两类打分器，怎么选？</h2>
          <p className="mb-8 text-center text-sm text-slate-400">点卡片切换，看代码打分器和 LLM 裁判各擅长什么</p>
          <EvalGraderCompare />
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 交互：基准探索 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">关键基准一览</h2>
          <p className="mb-8 text-center text-sm text-slate-400">了解即可，不必记全——点卡片看每个基准在测什么</p>
          <EvalBenchmarkExplorer />
        </section>

        {/* 评估框架生态 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">评估框架（工具生态）</h2>
          <p className="mb-8 text-center text-sm text-slate-400">不用全学，知道有哪些选手就行</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: "LangSmith", note: "轨迹评估 · LangChain 原生" },
                { name: "Braintrust", note: "评估优先的打分" },
                { name: "OpenAI Evals", note: "MIT · 注册表式" },
                { name: "Arize Phoenix", note: "OpenTelemetry · 函数调用评估" },
                { name: "DeepEval", note: "pytest 风格" },
                { name: "Ragas", note: "无参考 RAG 评估" },
                { name: "Harbor", note: "驱动 Terminal-Bench · 评估即训练环境" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center"
                >
                  <div className="text-xs font-semibold text-emerald-200">{tool.name}</div>
                  <div className="text-[10px] text-slate-400">{tool.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* held-in / held-out */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">自我改进里的评估：留内集 vs 留出集</h2>
          <p className="mb-8 text-center text-sm text-slate-400">Self-Harness 第三步「验证」正是评估在起作用</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 text-xs font-semibold tracking-wider text-emerald-400 uppercase">held-in 留内集</div>
              <p className="text-sm text-slate-300">
                验证「已知弱点」是否<strong className="text-white"> 真被修好</strong>了——你 targeted 修的那个 bug，还复现吗？
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 text-xs font-semibold tracking-wider text-cyan-400 uppercase">held-out 留出集</div>
              <p className="text-sm text-slate-300">
                验证有没有引入<strong className="text-white"> 未知退化</strong>——改 A 的时候有没有把 B 搞坏？
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            两者都不回归，候选改动才合并；被拒的改动留档但不改变现役 Harness
          </p>
        </section>

        {/* 手搓启发 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-white">对我们手搓的三条启发</h2>
            <div className="space-y-3">
              {[
                "阶段 04「评估器」先做确定性打分器——最直观、最可靠，给 agent 结果写能自动判对错的检查",
                "从 day 1 记录每次运行的轨迹（用了哪些工具、几轮、token 花费），为后续评估和改进铺路",
                "到阶段 05 把评估拆成 held-in / held-out 两套，才能安全地「自我改进」",
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
              href="/tools"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-sm font-bold text-amber-300">
                06
              </div>
              <div>
                <div className="text-sm font-medium text-white">工具与 MCP</div>
                <div className="text-xs text-slate-400">已完成</div>
              </div>
            </Link>
            <Link
              href="/security"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-sm font-bold text-rose-300">
                08
              </div>
              <div>
                <div className="text-sm font-medium text-white">安全与提示词注入</div>
                <div className="text-xs text-slate-500">致命三要素 →</div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

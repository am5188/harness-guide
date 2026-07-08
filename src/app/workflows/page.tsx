import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkflowPatterns } from "@/components/workflow-patterns";

export const metadata: Metadata = {
  title: "工作流设计模式 · Harness 工程",
  description: "Anthropic 五大工作流模式：提示链、路由、并行化、编排者、评估者。",
};

const COMBOS = [
  { from: "路由", to: "提示链", desc: "先判断问题类型，再走该类专属的多步流程" },
  { from: "编排者", to: "并行化", desc: "包工头拆好活，几个工人同时干" },
  { from: "提示链", to: "评估", desc: "流水线跑完，最后请审稿人把关改稿" },
  { from: "并行", to: "投票 → 链", desc: "多路同时出方案，投票选最好的，再统一排版" },
];

const ANTI_PATTERNS = [
  {
    icon: "🦣",
    name: "一个 Agent 包打天下",
    desc: "把所有工具和职责塞进一个智能体。难调、难测，一出错就乱套。",
  },
  {
    icon: "🏗️",
    name: "还没试简单方案就堆复杂度",
    desc: "简单流程明明够用，却先造一套复杂的「规划流水线」。",
  },
  {
    icon: "🕳️",
    name: "出了问题看不见",
    desc: "没有日志、没有记录、没有指标——坏了只能瞎猜。",
  },
];

export default function WorkflowsPage() {
  return (
    <>
      <SiteHeader pageLabel="第 4 页 / 工作流模式" backHref="/loop" />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-wide text-sky-400">循环之上</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              一件事，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                拆成几步来做？
              </span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              循环是心跳——AI 一遍遍「想一步、做一步」。
              <br className="hidden sm:block" />
              工作流是骨架——决定<span className="font-medium text-white">问几次、先问什么、怎么配合</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 先分清两个词 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              先分清两个词。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              它们都用到 AI，但「谁来定路线」不一样。
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={200}>
              <div className="glass h-full rounded-3xl p-8">
                <div className="mb-4 text-4xl">🗺️</div>
                <div className="mb-2 text-xl font-semibold text-white">工作流 · Workflow</div>
                <p className="mb-5 text-base leading-relaxed text-slate-400">
                  路线<span className="text-slate-200">提前画好</span>——程序员写死「先 A 再 B 再 C」。
                  AI 只负责每一步怎么答，不负责改路线。
                </p>
                <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-center text-sm text-sky-200">
                  输入 → 步骤 A → 步骤 B → 输出
                </div>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="glass h-full rounded-3xl p-8 ring-1 ring-cyan-500/20">
                <div className="mb-4 text-4xl">🤖</div>
                <div className="mb-2 text-xl font-semibold text-white">智能体 · Agent</div>
                <p className="mb-5 text-base leading-relaxed text-slate-400">
                  路线<span className="text-slate-200">现场想出来</span>——AI 自己决定下一步干嘛、用哪个工具。
                  灵活，但也更难预测。
                </p>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-center text-sm text-cyan-200">
                  输入 → AI 自己琢磨 → 输出
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={440}>
            <p className="mt-10 text-center text-lg leading-relaxed text-slate-400">
              Anthropic 的总纲：
              <span className="font-medium text-white"> 从简单开始，能用工作流就别上 Agent。</span>
            </p>
          </Reveal>
        </section>

        {/* ===== 五大模式 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">五种搭积木的方式</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Anthropic 总结的
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                五种工作流模式。
              </span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              点一个，看流程怎么走、什么时候该用。
              <br className="hidden sm:block" />
              每种都配了一句生活类比。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <WorkflowPatterns />
          </Reveal>
        </section>

        {/* ===== 组合技 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              可以叠着用。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              五个模式是积木，不是五选一。常见搭法如下：
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {COMBOS.map((combo, i) => (
              <Reveal key={combo.desc} delay={200 + i * 80}>
                <div className="glass h-full rounded-3xl p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-xl border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 text-sky-200">
                      {combo.from}
                    </span>
                    <span className="text-slate-600">→</span>
                    <span className="rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
                      {combo.to}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-slate-400">{combo.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== 反模式 ===== */}
        <section className="relative mx-auto max-w-4xl overflow-hidden px-5 py-28 sm:py-36">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              三个反模式，
              <br />
              要避开。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              生产环境里最常见的踩坑。
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {ANTI_PATTERNS.map((item, i) => (
              <Reveal key={item.name} delay={200 + i * 90}>
                <div className="glass h-full rounded-3xl p-6 ring-1 ring-rose-500/15">
                  <div className="mb-3 text-3xl">{item.icon}</div>
                  <div className="mb-2 text-base font-semibold text-white">{item.name}</div>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== 对我们手搓的启发 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              跟我们手搓
              <br />
              有什么关系？
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-14 space-y-4">
              {[
                "最小的 Agent 循环 = 最简的智能体。这五种模式是「循环之上还能怎么组织」，不必一开始就全上。",
                "评估器对应「评估者—优化者」；自我改进是它的升级版——写手改稿，审稿人把关。",
                "记住总纲：先简单，用评估去优化，只有简单方案真的不够用时，再加复杂度。",
              ].map((tip, i) => (
                <div key={tip} className="glass flex gap-4 rounded-3xl p-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sm font-bold text-sky-300">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-slate-400">{tip}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== 底部导航 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              继续往下看。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-14 grid gap-3 sm:grid-cols-2">
              <Link
                href="/loop"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  03
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">循环深潜</div>
                  <div className="truncate text-sm text-slate-500">← 上一页</div>
                </div>
                <svg
                  className="ml-auto h-4 w-4 shrink-0 rotate-180 text-slate-600 transition group-hover:-translate-x-0.5 group-hover:text-sky-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
              <Link
                href="/context"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  05
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">上下文工程</div>
                  <div className="truncate text-sm text-slate-500">记忆怎么管才不乱 →</div>
                </div>
                <svg
                  className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-sky-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

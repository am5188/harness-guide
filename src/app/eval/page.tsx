import type { Metadata } from "next";
import Link from "next/link";
import { EvalBenchmarkExplorer } from "@/components/eval-benchmark-explorer";
import { EvalGraderCompare } from "@/components/eval-grader-compare";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "评估与基准 · Harness 工程",
  description: "不靠感觉靠测量：为什么要评估、代码打分 vs 模型裁判、SWE-bench 等标准化考卷。",
};

export default function EvalPage() {
  return (
    <>
      <SiteHeader pageLabel="第 7 页 / 评估与基准" backHref="/tools" />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-wide text-sky-400">不靠感觉，靠测量</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              AI 好不好，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                不能光靠「感觉」。
              </span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              你改了提示词、换了工具、调了循环——
              到底变好了还是变坏了？没有评估，你只能猜。
            </p>
          </Reveal>
        </section>

        {/* ===== 1. 为什么要评估 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">先打个比方</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              就像学开车，
              <br />
              不能只看「感觉开顺了」。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              你得有考试——倒车入库过没过、侧方停车压没压线。
              对 AI 来说，<span className="font-medium text-white">评估就是那套标准化考卷</span>。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              没有它，「自我改进」就是空中楼阁：
              改了一版，不知道变好还是变坏，只能继续凭感觉瞎调。
            </p>
          </Reveal>
        </section>

        {/* ===== 2. 别只看最终答案 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              别只看<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">最后答对没</span>，
              <br />
              过程也很重要。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              就像考试不只看最终分数，还要看解题步骤——
              AI 干活也一样，中间走没走弯路、有没有原地打转，都是信号。
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🛤️",
                title: "走得对不对",
                desc: "中间步骤合理吗？有没有绕了十万八千里？",
              },
              {
                icon: "🔧",
                title: "工具用对没",
                desc: "调了正确的工具吗？参数传对了吗？",
              },
              {
                icon: "🔄",
                title: "卡住能自救吗",
                desc: "陷入死循环了吗？出错后能不能自己爬出来？",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={120 + i * 90}>
                <div className="glass h-full rounded-3xl p-7">
                  <div className="mb-3 text-3xl">{item.icon}</div>
                  <div className="mb-2 text-lg font-semibold text-white">{item.title}</div>
                  <p className="text-base leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <p className="mt-10 text-center text-lg text-slate-400">
              成熟的评估会同时看<span className="font-medium text-white">结果</span>和
              <span className="font-medium text-white">过程</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 3. 两类打分器 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              两种打分方式，
              <br />
              像<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">判断题</span>
              和<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">作文题</span>。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              有标准答案的，用代码自动批改；没有标准答案的，请另一位 AI 当老师打分。
              点卡片切换，看看各自擅长什么。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <EvalGraderCompare />
          </Reveal>
        </section>

        {/* ===== 4. 基准测试 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              标准化考卷：
              <br />
              业界常用的<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">基准测试</span>。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              修真实 bug、在命令行里干活、跨环境切换——
              这些是专门给 AI 出的考题。了解即可，不必全记。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <EvalBenchmarkExplorer />
          </Reveal>
        </section>

        {/* ===== 5. 评估工具生态 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              现成的评估工具，
              <br />
              知道有哪些就行。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              不用全学——就像知道市面上有卷尺、游标卡尺、激光测距仪，需要的时候再挑。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="glass rounded-3xl p-8">
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { name: "LangSmith", note: "轨迹评估 · LangChain 原生" },
                  { name: "Braintrust", note: "评估优先的打分平台" },
                  { name: "OpenAI Evals", note: "开源 · 注册表式" },
                  { name: "Arize Phoenix", note: "可观测性 · 函数调用评估" },
                  { name: "DeepEval", note: "pytest 风格，写起来像写测试" },
                  { name: "Ragas", note: "专门评 RAG 问答质量" },
                  { name: "Harbor", note: "驱动 Terminal-Bench · 评估即训练场" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-xl border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-center"
                  >
                    <div className="text-xs font-semibold text-sky-200">{tool.name}</div>
                    <div className="text-[10px] text-slate-500">{tool.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== 6. held-in / held-out ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              自我改进时，
              <br />
              要考<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">两套题</span>。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              就像修完车要跑两圈：一圈专门测你刚修的那个毛病，一圈测有没有把别的地方搞坏。
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={200}>
              <div className="glass h-full rounded-3xl p-8">
                <div className="mb-3 text-sm font-medium tracking-wide text-sky-400">留内集 · held-in</div>
                <p className="text-base leading-relaxed text-slate-400">
                  验证<span className="font-medium text-white">已知弱点</span>是不是真的修好了——
                  你 targeted 修的那个 bug，还会复现吗？
                </p>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="glass h-full rounded-3xl p-8 ring-1 ring-cyan-500/20">
                <div className="mb-3 text-sm font-medium tracking-wide text-cyan-400">留出集 · held-out</div>
                <p className="text-base leading-relaxed text-slate-400">
                  验证有没有引入<span className="font-medium text-white">未知退化</span>——
                  改 A 的时候，有没有把本来好好的 B 搞坏？
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={360}>
            <p className="mt-10 text-center text-lg text-slate-500">
              两套都不退步，改动才能合并；没过的改动留档，但不改变现役 Harness。
            </p>
          </Reveal>
        </section>

        {/* ===== 7. 手搓启发 ===== */}
        <section className="relative overflow-hidden px-5 py-32 text-center sm:py-40">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">动手之前记住三条</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              从最简单的
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">自动批改</span>
              开始。
            </h2>
          </Reveal>
          <div className="mx-auto mt-14 max-w-2xl space-y-4 text-left">
            {[
              "先做确定性打分器——给 AI 的结果写一个能自动判对错的检查，像判断题一样干脆。",
              "从第一天就记录每次运行的轨迹：用了哪些工具、跑了几轮、花了多少 token，为以后改进铺路。",
              "到能「自我改进」时，把评估拆成留内集和留出集两套，才能安全地自动迭代。",
            ].map((tip, i) => (
              <Reveal key={tip} delay={200 + i * 100}>
                <div className="glass flex gap-4 rounded-3xl p-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-300">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-slate-400">{tip}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== 导航 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              继续往下看
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            <Reveal delay={120}>
              <Link
                href="/tools"
                className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  06
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">工具与 MCP</div>
                  <div className="truncate text-sm text-slate-500">给 AI 装上手和脚</div>
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
            </Reveal>
            <Reveal delay={200}>
              <Link
                href="/security"
                className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  08
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">安全与注入</div>
                  <div className="truncate text-sm text-slate-500">别让它被人骗</div>
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
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

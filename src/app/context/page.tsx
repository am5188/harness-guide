import type { Metadata } from "next";
import Link from "next/link";
import { ContextStrategyPicker } from "@/components/context-strategy-picker";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "上下文工程 · Harness 工程",
  description: "AI 的短期记忆怎么管？上下文腐烂是什么？压缩、清理、外部记忆三大手段怎么选。",
};

export default function ContextPage() {
  return (
    <>
      <SiteHeader pageLabel="第 5 页 / 上下文工程" backHref="/workflows" />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-wide text-sky-400">别让 AI 越聊越糊涂</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              AI 的
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                短期记忆
              </span>
              ，
              <br />
              得有人帮它收拾。
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              每次 AI 回答你，它只能「看到」眼前这点内容——
              就像你桌上摊着的东西。东西堆太多，它反而找不到重点。
            </p>
          </Reveal>
        </section>

        {/* ===== 什么是上下文 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">先搞懂一个词</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              「上下文」=
              <br />
              AI 此刻能看到的全部。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              你的问题、它之前的回答、它查过的文件内容、跑过的命令结果——
              全堆在一起，就是它的「工作台」。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              每聊一轮，桌上就多几样东西。
              <span className="font-medium text-white"> 不管的话，迟早会乱。</span>
            </p>
          </Reveal>
        </section>

        {/* ===== 上下文腐烂 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              东西堆太多，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                反而会变笨。
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              这叫「上下文腐烂」——不是窗口不够大，是桌上太乱了。
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={200}>
              <div className="glass h-full rounded-3xl p-8 ring-1 ring-rose-500/15">
                <div className="mb-4 text-4xl">📦</div>
                <div className="mb-2 text-xl font-semibold text-white">硬上限：桌子满了</div>
                <p className="text-base leading-relaxed text-slate-400">
                  内容多到超出 AI 能「看」的极限，直接报错或被迫截断——
                  就像桌子小到放不下更多纸。
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="glass h-full rounded-3xl p-8 ring-1 ring-rose-500/15">
                <div className="mb-4 text-4xl">🌀</div>
                <div className="mb-2 text-xl font-semibold text-white">软伤害：乱到找不到</div>
                <p className="text-base leading-relaxed text-slate-400">
                  还没满，但旧纸条、废草稿、过时资料塞满了视线——
                  AI 开始答非所问、忘记关键细节。
                  <span className="text-slate-300"> 研究发现，所有主流模型都会中招。</span>
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={400}>
            <p className="mt-10 text-center text-lg text-slate-400">
              所以答案不是「换一张更大的桌子」，
              <br className="hidden sm:block" />
              而是<span className="font-medium text-white">学会定期收拾</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 三种办法（交互） ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              三种收拾桌子的办法。
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              点下面三个标签，看压缩、清理、外部记忆各自干什么、什么时候该用。
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ContextStrategyPicker />
          </Reveal>
        </section>

        {/* ===== 什么时候动手 ===== */}
        <section className="relative overflow-hidden px-5 py-32 text-center sm:py-40">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">关键数字</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              别等桌子堆满了
              <br />
              才动手收拾。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-lg leading-relaxed text-slate-400">
              一旦乱到 AI 自己都看不清楚，让它写摘要也会写歪——
              所以要提前动手。
            </p>
          </Reveal>
          <div className="mx-auto max-w-2xl space-y-8">
            <Reveal delay={300}>
              <div className="glass rounded-3xl p-8 text-left">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium text-white">清理工具结果</span>
                  <span className="font-mono text-sm text-cyan-300">60–70%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-sky-500/60 to-cyan-400/80" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  首选办法：把旧的、随时能再查的中间结果收走，只留最近几条。
                  成本低、效果好。
                </p>
              </div>
            </Reveal>
            <Reveal delay={380}>
              <div className="glass rounded-3xl p-8 text-left">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-medium text-white">压缩整段对话</span>
                  <span className="font-mono text-sm text-sky-300">约 70%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-sky-500/60 to-sky-400/80" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  需要保住长段推理脉络时才用——把旧对话缩成一份摘要，腾出空间。
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={460}>
            <p className="mx-auto mt-10 max-w-xl text-center text-lg text-slate-400">
              一句话：<span className="font-medium text-white">平时靠清理，真不够了再压缩。</span>
            </p>
          </Reveal>
        </section>

        {/* ===== 优先级 + 外部记忆 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              先温和收拾，
              <br />
              最后才扔东西。
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              能收起来存档就别直接扔掉；压缩管这一趟聊天，外部记忆管跨天的项目。
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={200}>
              <div className="glass h-full rounded-3xl p-8">
                <div className="mb-5 text-sm font-medium tracking-wide text-sky-400">收拾的优先级</div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                    ① 原始内容——全留着（最理想）
                  </div>
                  <div className="text-center text-slate-600">↓ 桌子快满了</div>
                  <div className="rounded-2xl border border-sky-500/25 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
                    ② 可逆收拾——旧内容存到别处，需要能翻回来
                  </div>
                  <div className="text-center text-slate-600">↓ 实在没办法</div>
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                    ③ 有损摘要——被丢掉的内容找不回来了
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="glass h-full rounded-3xl p-8">
                <div className="mb-5 text-sm font-medium tracking-wide text-cyan-400">外部记忆怎么起步</div>
                <ul className="space-y-4 text-base leading-relaxed text-slate-400">
                  <li className="flex gap-3">
                    <span className="text-cyan-400">·</span>
                    <span>
                      <span className="font-medium text-white">最简单</span>：一个 Markdown 笔记文件。
                      AI 定期把进度写进去，忘了就翻出来看。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400">·</span>
                    <span>
                      <span className="font-medium text-white">工作记忆</span>：这次聊天里的事，聊完可以忘掉。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400">·</span>
                    <span>
                      <span className="font-medium text-white">长期记忆</span>：跨好几天的项目知识，按意思搜索找回。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400">·</span>
                    <span>
                      不是什么都该永久保存——
                      <span className="text-slate-300">重要的才写进档案室。</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 进阶 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">再往前一步</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              让 AI 自己判断
              <br />
              该不该收拾桌子。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              AI 自己感觉不到「桌子乱了」。给它几条简单规则就行：
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="glass rounded-3xl p-6 text-left">
                <div className="mb-2 text-sm font-medium text-emerald-300">✓ 该收拾了</div>
                <p className="text-sm leading-relaxed text-slate-400">
                  子任务做完了、思路已经理顺了——这时候压缩很安全。
                </p>
              </div>
              <div className="glass rounded-3xl p-6 text-left">
                <div className="mb-2 text-sm font-medium text-rose-300">✗ 先别动</div>
                <p className="text-sm leading-relaxed text-slate-400">
                  还在推导、卡住了、还在摸索——这时候压缩会丢关键线索。
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-slate-400">
              如果派了「小助手」去干子任务，也别把整段聊天记录塞给它——
              <span className="font-medium text-white">只给一份简短说明和明确任务就行。</span>
            </p>
          </Reveal>
        </section>

        {/* ===== 导航 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              继续往下看。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-14 grid gap-3 sm:grid-cols-2">
              <Link
                href="/workflows"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  04
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">工作流模式</div>
                  <div className="truncate text-sm text-slate-500">← 上一页</div>
                </div>
              </Link>
              <Link
                href="/tools"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  06
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">工具与 MCP</div>
                  <div className="truncate text-sm text-slate-500">好工具长什么样 →</div>
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

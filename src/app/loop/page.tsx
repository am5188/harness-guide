import type { Metadata } from "next";
import Link from "next/link";
import { ItemTurnThread } from "@/components/item-turn-thread";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TurnFlow } from "@/components/turn-flow";

export const metadata: Metadata = {
  title: "智能体循环深潜 · Harness 工程",
  description: "想一步、做一步、看结果——看懂 TAO 循环、停止条件，以及 Item / Turn / Thread 三层概念。",
};

export default function LoopPage() {
  return (
    <>
      <SiteHeader pageLabel="第 3 页 / 循环深潜" backHref="/parts" />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-wide text-sky-400">第 3 章 · 剥到最细</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
              想一步，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                做一步，看结果。
              </span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              这就是智能体循环的核心。模型负责<span className="font-medium text-white">想</span>，
              Harness 负责<span className="font-medium text-white">动手和收尾</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 1. 模型只管想 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">先记住一句话</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              模型只负责
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">每一步怎么想</span>。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              读文件、跑命令、记历史、问你要不要批准——全是 Harness 的活。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8">
              <p className="text-base leading-relaxed text-slate-300">
                OpenAI 说过：让它不只是「傻循环」的，是沿途 Harness 管的一切。
              </p>
              <p className="mt-3 text-sm text-slate-500">
                循环本身很笨，聪明全在模型里；但能不能真的把事做完，看 Harness 管得好不好。
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== 2. 交互：一个回合怎么走 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              一个回合里，
              <br />
              究竟发生了什么？
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-12 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              <span className="text-slate-300">Turn（回合）</span>：你发一句话，到 AI 回完并停下，算一整轮。
              点「下一步」，跟着走一遍。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <TurnFlow />
          </Reveal>
        </section>

        {/* ===== 3. TAO 三步 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              拆开看，就是
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent"> TAO </span>
              三步。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              像做菜：先想菜谱（Thought），再下锅炒（Action），尝一口咸淡（Observation）。
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "T",
                name: "Thought · 想",
                desc: "模型读上下文，决定下一步：直接回答，还是调用工具？",
              },
              {
                step: "A",
                name: "Action · 做",
                desc: "Harness 真的去执行——打开文件、跑测试、搜网页。",
              },
              {
                step: "O",
                name: "Observation · 看",
                desc: "工具跑完的结果塞回对话，模型据此再想下一步。",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={120 + i * 100}>
                <div className="glass h-full rounded-3xl p-7 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-xl font-bold text-sky-300">
                    {item.step}
                  </div>
                  <div className="mb-2 text-lg font-semibold text-white">{item.name}</div>
                  <p className="text-base leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={420}>
            <p className="mt-12 text-center text-lg text-slate-400">
              没有工具要调了？模型给出最终回复，这一回合结束。
              <br className="hidden sm:block" />
              还有事没做完？<span className="font-medium text-white">回到 T，继续转</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 4. 什么时候停 ===== */}
        <section className="relative overflow-hidden px-5 py-28 sm:py-36">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">最容易漏掉的一点</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                循环必须知道：
                <br />
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">什么时候停。</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mx-auto mt-8 mb-12 max-w-xl text-lg leading-relaxed text-slate-400">
                没有停止条件，就会无限转圈、烧光 token、卡死不动。
              </p>
            </Reveal>
            <div className="space-y-3 text-left">
              {[
                {
                  label: "模型不再要工具，只给文字",
                  sub: "最常见——它觉得活干完了",
                  highlight: true,
                },
                {
                  label: "达到最大回合数",
                  sub: "兜底保险，防死循环（新手可先设 50 轮）",
                },
                {
                  label: "上下文 / token 预算满了",
                  sub: "该压缩历史或换策略了",
                },
                {
                  label: "收到明确的「完成」信号",
                  sub: "或遇到无法恢复的报错",
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={280 + i * 80}>
                  <div className="glass flex items-start gap-4 rounded-2xl p-5">
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        item.highlight
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-sky-500/15 text-sky-300"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-medium text-white">{item.label}</div>
                      <div className="mt-1 text-sm text-slate-500">{item.sub}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 5. Item / Turn / Thread ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              三层概念，
              <br />
              用<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">聊天软件</span>来理解。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-12 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              OpenAI Codex 把对话拆成三个词。点下面三个标签，看它们怎么一层套一层。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ItemTurnThread />
          </Reveal>
        </section>

        {/* ===== 6. 为什么变贵 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              为什么聊着聊着
              <br />
              就<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">越来越贵</span>？
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-12 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              每一轮新对话，都会把<span className="font-medium text-white">之前所有回合的历史</span>重新塞进 Prompt——
              包括每一次工具调用和返回结果。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-sky-500/30 bg-sky-500/15 px-3 py-2 text-xs font-medium text-sky-200">
                    第 1 轮
                  </div>
                  <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                    你的消息 + 10 次工具调用 + 回复 ≈ <span className="text-sky-300">8k tokens</span>
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">↓ 全部带进下一轮</div>
                <div className="flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-cyan-500/30 bg-cyan-500/15 px-3 py-2 text-xs font-medium text-cyan-200">
                    第 2 轮
                  </div>
                  <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                    8k 历史 + 新消息 + 15 次工具 ≈ <span className="text-sky-300">24k tokens</span>
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">↓ 继续膨胀</div>
                <div className="flex items-center gap-4">
                  <div className="shrink-0 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-300">
                    第 5 轮
                  </div>
                  <div className="flex-1 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm text-slate-300">
                    上下文快满了 → 需要<span className="font-medium text-rose-300">压缩（compaction）</span>历史
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-sm text-slate-500">
                Codex 的做法：token 超阈值时，把冗长历史换成更短的摘要，腾出空间继续干活。
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== 7. 人在环中 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              危险动作，
              <br />
              先<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">问你一句</span>。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-12 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              删文件、改生产配置这类事，Harness 会暂停当前回合，弹窗等你点头。
              这叫<span className="text-slate-300">人在环中（Human-in-the-loop）</span>。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col items-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:justify-center">
                {[
                  { label: "AI 要删文件", sky: true },
                  { label: "Harness 暂停回合", sky: false },
                  { label: "弹窗：允许吗？", sky: true },
                  { label: "你点「允许」", emerald: true },
                  { label: "继续执行", sky: true },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {i > 0 ? <span className="hidden text-slate-600 sm:inline">→</span> : null}
                    <div
                      className={`rounded-xl border px-4 py-3 text-center text-sm ${
                        item.emerald
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-sky-500/25 bg-sky-500/10 text-slate-300"
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-slate-500">
                审批开关放在 Harness 层，不写死在循环里——自主和监督可以分开调。
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== 8. Codex 架构 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Codex 怎么拆的？
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-12 max-w-xl text-center text-lg text-slate-400">
              核心逻辑和界面分开，所有客户端共用同一套 Harness。
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={200}>
              <div className="glass h-full rounded-3xl p-8">
                <div className="mb-4 text-sm font-medium tracking-wide text-sky-400">Codex Core · 心脏</div>
                <ul className="space-y-3 text-base text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-sky-400">·</span>智能体循环
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-400">·</span>线程管理
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-400">·</span>工具执行
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-400">·</span>配置与鉴权
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="glass h-full rounded-3xl p-8 ring-1 ring-sky-500/15">
                <div className="mb-4 text-sm font-medium tracking-wide text-cyan-400">App Server · 接口层</div>
                <p className="mb-4 text-base text-slate-300">用统一协议包一层，谁都能连</p>
                <div className="flex flex-wrap gap-2">
                  {["CLI", "VS Code", "Web", "macOS", "JetBrains"].map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-xs text-sky-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={420}>
            <p className="mt-10 text-center text-lg text-slate-400">
              同一个模型，Harness 不同，体验就不同——
              <br className="hidden sm:block" />
              所以 Codex 在自家界面上往往比通用聊天窗口<span className="font-medium text-white">更能干活</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 9. 三条启发 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              自己搓的时候，
              <br />
              记住这三条。
            </h2>
          </Reveal>
          <div className="mt-14 space-y-4">
            {[
              "先把最小循环跑通，再加停止条件、token 预算、审批闸门",
              "分清 Item / Turn / Thread——哪怕最小实现，也把「一条消息」「一轮对话」「整段会话」拆开",
              "历史用追加写文件存下来，以后才能恢复、压缩、断点续聊",
            ].map((tip, i) => (
              <Reveal key={tip} delay={120 + i * 100}>
                <div className="glass flex gap-4 rounded-3xl p-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sm font-bold text-sky-300">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-slate-300">{tip}</p>
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
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-12 max-w-xl text-center text-lg text-slate-400">
              循环懂了，下一章看五种「搭积木」的工作流模式。
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            <Reveal delay={200}>
              <Link
                href="/parts"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  02
                </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white">九大组成零件</div>
                  <div className="text-sm text-slate-500">← 上一章</div>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={280}>
              <Link
                href="/workflows"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  04
                </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white">工作流模式</div>
                  <div className="text-sm text-slate-500">五种积木怎么组合 →</div>
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

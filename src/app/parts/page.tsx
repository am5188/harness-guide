import type { Metadata } from "next";
import Link from "next/link";
import { PartsExplorer } from "@/components/parts-explorer";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "九大零件 · Harness 工程",
  description: "拆开 Harness，看清里面有哪些零件。",
};

const STOP_CONDITIONS = [
  { icon: "✅", label: "大脑说「做完了」", desc: "不再要工具，直接给你文字答案——这是最自然的停法。" },
  { icon: "🔢", label: "转太久了", desc: "比如最多 50 轮，防止它原地打转、烧光预算。" },
  { icon: "📦", label: "记忆装不下了", desc: "上下文窗口满了，没法再塞更多对话历史。" },
  { icon: "🏁", label: "收到完成信号", desc: "程序里写好的「done」标记，明确告诉循环可以停了。" },
  { icon: "💥", label: "出了没法救的错", desc: "硬停。不能假装没事继续往下跑。" },
];

export default function PartsPage() {
  return (
    <>
      <SiteHeader pageLabel="第 2 页 / 九大零件" backHref="/" />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-wide text-sky-400">拆开看里面</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
              一个循环，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                八个脚手架。
              </span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              剥到最里面，Harness 就是<span className="font-medium text-white">一个 while 循环</span>——
              不停地「想一步、做一步、看结果」。
              其它零件，都是围着它搭的架子。
            </p>
          </Reveal>
        </section>

        {/* ===== 最小公式 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">先记住这个公式</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              循环 + 工具 + 闸门
              <br />
              <span className="text-3xl font-semibold text-slate-400 sm:text-4xl">= 最小 Harness</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              智能全在大脑（模型）里。循环本身很「笨」——
              只负责一轮又一轮地转，把大脑的想法变成真实动作。
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-14 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
              <div className="glass w-full rounded-3xl border border-sky-500/20 px-6 py-5 text-center sm:w-auto sm:min-w-[160px]">
                <div className="mb-1 text-xs font-medium text-sky-400">核心 · 循环</div>
                <div className="font-mono text-sm font-medium text-white">while 还没做完</div>
              </div>
              <span className="text-2xl text-slate-600">+</span>
              <div className="glass w-full rounded-3xl border border-cyan-500/20 px-6 py-5 text-center sm:w-auto sm:min-w-[160px]">
                <div className="mb-1 text-xs font-medium text-cyan-400">手脚 · 工具注册表</div>
                <div className="text-sm font-medium text-white">读文件、跑命令</div>
              </div>
              <span className="text-2xl text-slate-600">+</span>
              <div className="glass w-full rounded-3xl border border-sky-500/20 px-6 py-5 text-center sm:w-auto sm:min-w-[160px]">
                <div className="mb-1 text-xs font-medium text-sky-400">闸门 · 权限层</div>
                <div className="text-sm font-medium text-white">危险动作先拦住</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <p className="mt-10 text-center text-base text-slate-500">
              Anthropic 管它叫 <span className="text-slate-400">「a dumb loop」</span>——笨循环，但够用。
            </p>
          </Reveal>
        </section>

        {/* ===== TAO 循环 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">循环里在转什么</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              想一步，
              <br />
              做一步，
              <br />
              看结果。
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              工程师叫它 <span className="font-medium text-white">TAO 循环</span>（Thought–Action–Observation，
              思考–行动–观察）。用大白话就是上面这三步。
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: "🧠",
                title: "思考",
                desc: "把该知道的上下文拼好，问大脑「现在该干嘛？」",
              },
              {
                icon: "⚡",
                title: "行动",
                desc: "大脑说要调工具，Harness 校验后真正执行。",
              },
              {
                icon: "👁️",
                title: "观察",
                desc: "把执行结果塞回对话，进入下一轮思考。",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={280 + i * 100}>
                <div className="glass h-full rounded-3xl p-7 text-center">
                  <div className="mb-3 text-3xl">{item.icon}</div>
                  <div className="mb-2 text-lg font-semibold text-white">{item.title}</div>
                  <p className="text-base leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={600}>
            <p className="mt-10 text-center text-base text-slate-500">
              Claude Code 的版本：收集 → 行动 → 验证 → 再来一轮。
            </p>
          </Reveal>
        </section>

        {/* ===== 九大零件交互 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">围着循环转的零件</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              九个零件，
              <br />
              点一个看一个。
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              几乎每个能上线的 Harness 都有这些。不用一次全懂，挑感兴趣的看。
            </p>
          </Reveal>
          <Reveal delay={300}>
            <PartsExplorer />
          </Reveal>
        </section>

        {/* ===== 停止条件 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">循环什么时候停</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              知道何时停，
              <br />
              和知道怎么转一样重要。
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              <span className="font-medium text-white">停止条件</span>不是小细节——
              它决定 AI 什么时候算「做完了」，什么时候该强行刹车。
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STOP_CONDITIONS.map((item, i) => (
              <Reveal key={item.label} delay={280 + i * 80}>
                <div className="glass h-full rounded-3xl p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base font-semibold text-white">{item.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={700}>
            <p className="mt-10 text-center text-base text-slate-500">
              让「干活的」和「检查的」商量好什么叫完成，往往比改提示词更有效。
            </p>
          </Reveal>
        </section>

        {/* ===== 工具执行安全流 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">一条铁律</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              工具绝不能
              <br />
              让模型直接执行。
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 mb-14 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              模型只能<span className="font-medium text-white">「申请」</span>调工具。
              真正动手的是 Harness——这样坏人没法用话术骗它跑任意代码。
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="glass rounded-3xl p-8">
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
                {[
                  { step: "1", label: "大脑申请", sub: "返回结构化的工具调用请求" },
                  { step: "2", label: "Harness 校验", sub: "检查格式 + 权限" },
                  { step: "3", label: "Harness 执行", sub: "真正读文件、跑命令" },
                  { step: "4", label: "结果塞回", sub: "写入对话，进入下一轮" },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-center gap-3 sm:flex-col">
                    {i > 0 ? (
                      <span className="hidden text-slate-600 sm:inline">↓</span>
                    ) : null}
                    <div className="glass flex-1 rounded-2xl border border-sky-500/15 px-4 py-4 text-center sm:min-w-[130px] sm:flex-none">
                      <div className="mb-1 text-xs text-sky-400">步骤 {item.step}</div>
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== Harness 会变薄 ===== */}
        <section className="relative mx-auto max-w-3xl overflow-hidden px-5 py-28 text-center sm:py-36">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">一个重要判断</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              模型越强，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                脚手架越薄。
              </span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              每个零件都藏着一个假设：「模型自己做不好这件事」。
              模型变强了，对应零件就可以拿掉。
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              Harness 工程不是一直往上堆，而是<span className="font-medium text-white">随模型能力调厚薄</span>。
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <Reveal delay={420}>
              <div className="glass rounded-3xl p-7 text-left">
                <div className="mb-2 text-sm font-medium text-sky-400">会变薄的</div>
                <p className="text-base leading-relaxed text-slate-400">
                  复杂规划、多步推理辅助、部分上下文管理——模型自己能搞定了。
                </p>
              </div>
            </Reveal>
            <Reveal delay={520}>
              <div className="glass rounded-3xl p-7 text-left">
                <div className="mb-2 text-sm font-medium text-cyan-400">骨架始终要</div>
                <p className="text-base leading-relaxed text-slate-400">
                  持久存档、可验证的工具执行、清晰的权限控制——这些不会消失。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 手搓顺序 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium tracking-wide text-sky-400">我们仓库怎么搭</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              四步手搓，
              <br />
              从手脚到心跳。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { phase: "01", name: "工具注册", desc: "先给它手和脚" },
              { phase: "02", name: "智能体循环", desc: "再装心跳" },
              { phase: "03", name: "记忆持久化", desc: "断电不白打" },
              { phase: "04", name: "评估验证", desc: "最后上质检" },
            ].map((item, i) => (
              <Reveal key={item.phase} delay={200 + i * 90}>
                <div className="glass rounded-3xl p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300">
                    {item.phase}
                  </div>
                  <div className="text-base font-semibold text-white">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== 底部导航 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              继续往下看。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <Reveal delay={120}>
              <Link
                href="/"
                className="glass group flex items-center gap-4 rounded-3xl p-6 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  01
                </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white">总览</div>
                  <div className="text-sm text-slate-500">Harness 是什么</div>
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
            <Reveal delay={240}>
              <Link
                href="/loop"
                className="glass group flex items-center gap-4 rounded-3xl p-6 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  03
                </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white">循环深潜</div>
                  <div className="text-sm text-slate-500">它一步步怎么想</div>
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

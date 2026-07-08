import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader pageLabel="第 1 页 / 总览" />

      <main className="flex-1">
        {/* ===== Hero：一屏一句话 ===== */}
        <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          {/* 背景光晕 */}
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-xs font-medium tracking-[0.3em] text-sky-400/80 uppercase">
              AM Harness · 工程指南
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-7xl">
              AI 会思考，
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                但它动不了手。
              </span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              给它装上手脚的那套系统，就叫 <span className="font-medium text-white">Harness</span>。
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-16 flex flex-col items-center gap-2 text-slate-500">
              <span className="text-sm">往下滚，30 秒看懂</span>
              <svg
                className="h-5 w-5 animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </Reveal>
        </section>

        {/* ===== 1. 一个模型能做什么 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">先说清楚一件事</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              一个 AI 模型，
              <br />
              本质上只会「接话」。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              你发一段文字，它接一段文字。就这么简单。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              它可以在回复里写下「我应该打开 config.py」——
              <br className="hidden sm:block" />
              但它<span className="font-medium text-white">没有手，打不开任何一个文件</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 2. 大脑与身体 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              模型是<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">大脑</span>，
              <br />
              Harness 是<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">身体</span>。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <Reveal delay={120}>
              <div className="glass h-full rounded-3xl p-8">
                <div className="mb-4 text-4xl">🧠</div>
                <div className="mb-2 text-xl font-semibold text-white">大脑 · 模型</div>
                <p className="text-base leading-relaxed text-slate-400">
                  负责<span className="text-slate-200">想</span>——理解、推理、做决定。
                  非常聪明，但离开身体，它什么也做不了。
                </p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="glass h-full rounded-3xl p-8 ring-1 ring-sky-500/20">
                <div className="mb-4 text-4xl">🦾</div>
                <div className="mb-2 text-xl font-semibold text-white">身体 · Harness</div>
                <p className="text-base leading-relaxed text-slate-400">
                  负责<span className="text-slate-200">做</span>——调工具、记笔记、一步步循环、守住安全线。
                  把大脑的想法，变成真实的动作。
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={360}>
            <p className="mt-10 text-center text-lg text-slate-400">
              大脑想「打开文件」，身体<span className="font-medium text-white">真的把文件打开</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 3. 身体里有什么 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              这副身体，
              <br />
              由四样东西组成。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "🔁",
                title: "一个循环",
                desc: "不停地「想一步 → 做一步 → 看结果」，直到把事做完。",
              },
              {
                icon: "🔧",
                title: "一套工具",
                desc: "读文件、跑命令、搜网页——这是它的手和脚。",
              },
              {
                icon: "📁",
                title: "一份记忆",
                desc: "把重要的事写下来，忘了随时能翻回去看。",
              },
              {
                icon: "🛡️",
                title: "一道闸门",
                desc: "危险动作先问你一句「确定吗？」，不乱来。",
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
        </section>

        {/* ===== 4. Aha：你早就见过它 ===== */}
        <section className="relative overflow-hidden px-5 py-32 text-center sm:py-40">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">其实你早就见过它</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Cursor、Claude Code，
              <br />
              它们本身<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">就是 Harness</span>。
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              你以为在用「一个 AI」，其实你在用「模型 + 一副精心打造的身体」。
              同一个模型，换一副更好的身体，就更能干活。
            </p>
          </Reveal>
        </section>

        {/* ===== 5. 最小核心：一个循环 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              剥到最里面，
              <br />
              它只是一个循环。
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-8 mb-10 max-w-xl text-center text-lg leading-relaxed text-slate-400">
              懂「循环」你就懂了它的核心。用大白话写出来是这样：
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="glass overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-xs text-slate-500">harness 的心脏（伪代码）</span>
              </div>
              <pre className="overflow-x-auto px-6 py-6 text-sm leading-relaxed sm:text-[15px]">
                <code className="text-slate-300">
{`while `}<span className="text-sky-300">还没做完</span>{`:
    想法 = `}<span className="text-cyan-300">问大脑</span>{`(&quot;现在该干嘛？&quot;)

    `}<span className="text-slate-500">{`# 大脑说要用工具（比如打开文件）`}</span>{`
    if 想法.要用工具:
        结果 = `}<span className="text-cyan-300">执行</span>{`(想法.工具)
        把结果塞回去   `}<span className="text-slate-500">{`# 再问一次大脑`}</span>{`

    `}<span className="text-slate-500">{`# 大脑说不用了，说明做完了`}</span>{`
    else:
        return 想法.答案`}
                </code>
              </pre>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-10 text-center text-lg leading-relaxed text-slate-400">
              真的，就这么点东西。剩下所有的复杂，
              <br className="hidden sm:block" />
              都是围着<span className="font-medium text-white">这个循环</span>打转。
            </p>
          </Reveal>
        </section>

        {/* ===== 6. 继续学习 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              接下来，
              <br />
              一章一个概念。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              不用一次全懂。点进去，每页只讲一件事。
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/parts", num: "02", title: "九大组成零件", sub: "把 Harness 拆开看" },
              { href: "/loop", num: "03", title: "循环深潜", sub: "它一步步怎么想" },
              { href: "/workflows", num: "04", title: "工作流模式", sub: "五种搭积木的方式" },
              { href: "/context", num: "05", title: "上下文工程", sub: "记忆怎么管才不乱" },
              { href: "/tools", num: "06", title: "工具与 MCP", sub: "好工具长什么样" },
              { href: "/eval", num: "07", title: "评估与基准", sub: "不靠感觉，靠测量" },
              { href: "/security", num: "08", title: "安全与注入", sub: "别让它被人骗" },
            ].map((item, i) => (
              <Reveal key={item.href} delay={80 + i * 60}>
                <Link
                  href={item.href}
                  className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                    {item.num}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-base font-medium text-white">{item.title}</div>
                    <div className="truncate text-sm text-slate-500">{item.sub}</div>
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
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-12 text-center text-sm text-slate-500">
              想看详细文字版？都在 <code className="rounded bg-white/5 px-1.5 py-0.5 text-slate-400">docs/</code> 目录里。
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolsExplorer } from "@/components/tools-explorer";

export const metadata: Metadata = {
  title: "工具设计与 MCP · Harness 工程",
  description: "工具是什么、好工具长什么样、MCP 通用插头标准，以及工具太多时怎么办。",
};

const DESIGN_PRINCIPLES = [
  {
    icon: "🎯",
    title: "少而精，一件事一个工具",
    desc: "别把每个 API 都包一遍。给「完成某任务」的复合工具，就像 App 里一个按钮干一件事。",
  },
  {
    icon: "🏷️",
    title: "名字要让人一眼看懂",
    desc: "asana_projects_search 比 get_data 好——模型在几十个工具里才能在对的时机选对。",
  },
  {
    icon: "📋",
    title: "参数写得明明白白",
    desc: "叫 user_id 不叫 user，必填项写清楚。像给新同事写操作说明，别让他猜。",
  },
  {
    icon: "⚡",
    title: "返回结果要干净",
    desc: "只给有用的信息，别塞 UUID 和内部字段。失败了说清楚原因，别直接崩掉。",
  },
];

const MCP_FLOW = [
  { label: "模型提出", detail: "「我想读这个文件」" },
  { label: "Harness 校验", detail: "参数对不对？你有权限吗？" },
  { label: "执行并回填", detail: "真的去读，把结果塞回对话" },
];

export default function ToolsPage() {
  return (
    <>
      <SiteHeader pageLabel="第 6 页 / 工具与 MCP" backHref="/context" />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-2/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

          <Reveal>
            <p className="mb-6 text-sm font-medium tracking-wide text-sky-400">给 AI 装上手和脚</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              工具，
              <br />
              就是 AI 能按的
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                「按钮」
              </span>
              。
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              读文件、发邮件、搜网页——每一个都是 AI 可以调用的能力。
              工具造得好，AI 如虎添翼；造得烂，它会被垃圾数据淹没。
            </p>
          </Reveal>
        </section>

        {/* ===== 1. 什么是工具 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">先打个比方</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              手机 App 上的按钮，
              <br />
              就是人类的「工具」。
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              你想打车，点一下「叫车」——不用自己踩油门。
              AI 也一样：它只会「想」，但<span className="font-medium text-white">点不了任何按钮</span>。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              所以我们给它造按钮：一个叫「读文件」，一个叫「发邮件」。
              大脑决定按哪个，身体（Harness）负责真的去按。
            </p>
          </Reveal>
        </section>

        {/* ===== 2. 好工具怎么造 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              好工具，
              <br />
              长这样。
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              判断标准很简单：这个工具对应 AI 真正要做的「一件事」吗？
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {DESIGN_PRINCIPLES.map((item, i) => (
              <Reveal key={item.title} delay={120 + i * 90}>
                <div className="glass h-full rounded-3xl p-7">
                  <div className="mb-3 text-3xl">{item.icon}</div>
                  <div className="mb-2 text-lg font-semibold text-white">{item.title}</div>
                  <p className="text-base leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={480}>
            <p className="mt-10 text-center text-sm text-slate-500">
              Claude Code 默认把工具返回限制在 25,000 token 以内——输出臃肿是真金白银的浪费。
            </p>
          </Reveal>
        </section>

        {/* ===== 3. 好 vs 坏 交互 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              好工具 vs 坏工具，
              <br />
              差在哪？
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              点下面标签，对比同一个场景下的两种做法。
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ToolsExplorer />
          </Reveal>
        </section>

        {/* ===== 4. MCP 是什么 ===== */}
        <section className="relative overflow-hidden px-5 py-32 text-center sm:py-40">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <Reveal>
            <p className="mb-5 text-sm font-medium tracking-wide text-sky-400">工具的通用插头</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              MCP，
              <br />
              就像 USB / Type-C。
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              <span className="font-medium text-white">Model Context Protocol</span>（模型上下文协议）——
              一个开放标准，让不同软件的工具都能「插」到 AI 上。
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              以前每个 AI 客户端要单独对接每个工具。
              有了 MCP，就像有了统一充电口——
              <span className="font-medium text-white">写一次，到处能用</span>。
            </p>
          </Reveal>
        </section>

        {/* ===== 5. MCP 怎么工作 ===== */}
        <section className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              模型只「提议」，
              <br />
              Harness 才「执行」。
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 mb-14 max-w-xl text-center text-lg text-slate-400">
              这是核心安全铁律：AI 不能直接动手，必须经过一道闸门。
            </p>
          </Reveal>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {MCP_FLOW.map((step, i) => (
              <Reveal key={step.label} delay={200 + i * 100}>
                <div className="flex items-center gap-3">
                  {i > 0 ? (
                    <span className="hidden text-slate-600 sm:inline">→</span>
                  ) : null}
                  <div className="glass rounded-2xl px-5 py-4 text-center">
                    <div className="text-sm font-semibold text-sky-300">{step.label}</div>
                    <div className="mt-1 text-xs text-slate-400">{step.detail}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={520}>
            <p className="mt-10 text-center text-lg text-slate-400">
              每一步你都能拒绝——
              <span className="font-medium text-white">人在环中</span>，不是摆设。
            </p>
          </Reveal>
        </section>

        {/* ===== 6. 工具太多怎么办 ===== */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
          <Reveal>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              工具一多，
              <br />
              就塞不进脑子了。
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
              几十个工具的定义全塞进上下文，又慢又贵又容易选错。
              两招应对：<span className="font-medium text-white">按需加载</span>，或者
              <span className="font-medium text-white">让 AI 写脚本去跑腿</span>。
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              工具少的时候不用搞这些。等真的多了，再上。
            </p>
          </Reveal>
        </section>

        {/* ===== 7. 继续学习 ===== */}
        <section className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
          <Reveal>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              继续往下看。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            <Reveal delay={120}>
              <Link
                href="/context"
                className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  05
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">上下文工程</div>
                  <div className="truncate text-sm text-slate-500">记忆怎么管才不乱</div>
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
                href="/eval"
                className="glass group flex h-full items-center gap-4 rounded-2xl p-5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 transition group-hover:bg-sky-500/25">
                  07
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-medium text-white">评估与基准</div>
                  <div className="truncate text-sm text-slate-500">不靠感觉，靠测量</div>
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

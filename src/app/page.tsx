import Link from "next/link";
import { LayerTabs } from "@/components/layer-tabs";

export default function Home() {
  return (
    <>
      {/* 顶栏 */}
      <header className="glass sticky top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
              H
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Harness 工程</div>
              <div className="text-xs text-slate-500">图形化学习 · 不用啃长文档</div>
            </div>
          </div>
          <span className="hidden text-xs text-slate-500 sm:block">第 1 页 / 总览</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-24">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-blue-400">30 秒建立心智模型</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Harness 不是插件
            <br className="sm:hidden" />
            <span className="text-gradient">是 AI 的「身体」</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            模型只会「想」。Harness 让它能「做」——调工具、记笔记、循环纠错、守住安全边界。
          </p>
        </section>

        {/* 核心比喻 */}
        <section className="mb-14">
          <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-sm">🧠</span>
              一句话比喻
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5">
                <div className="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">基础模型 · 大脑</div>
                <div className="mb-2 text-lg font-medium text-white">DeepSeek / 智谱 GLM</div>
                <p className="text-sm leading-relaxed text-slate-400">
                  负责理解、推理、做决定。聪明，但<strong className="text-slate-300">自己不会跑腿</strong>。
                </p>
              </div>
              <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-violet-500/5 p-5">
                <div className="mb-2 text-xs font-semibold tracking-wider text-violet-400 uppercase">Harness · 身体</div>
                <div className="mb-2 text-lg font-medium text-white">Claude Code / Cursor / Codex</div>
                <p className="text-sm leading-relaxed text-slate-400">
                  负责执行、记忆、循环、权限、评估。<strong className="text-slate-300">把「想」变成「做」</strong>。
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
              <span>大脑说方案</span>
              <span className="text-blue-400">→</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">Harness 执行</span>
              <span className="text-violet-400">→</span>
              <span>真实结果</span>
            </div>
          </div>
        </section>

        {/* 三层 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">三个层级，别混了</h2>
          <p className="mb-6 text-center text-sm text-slate-500">点上面的标签，看每一层到底差在哪</p>
          <LayerTabs />
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 核心问题 */}
        <section className="mb-14">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-lg font-semibold text-white">你最关心的问题</h2>
            <p className="text-sm text-slate-500">Harness 到底是造 Agent 后端，还是给已有 Agent 用的？</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 opacity-80">
              <div className="mb-2 text-xs font-bold text-red-400 uppercase">❌ 错误理解</div>
              <p className="text-sm leading-relaxed text-slate-300">
                有个现成的 Agent，Harness 是<strong>外挂插件</strong>，给它加功能用的。
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 ring-1 ring-emerald-500/20">
              <div className="mb-2 text-xs font-bold text-emerald-400 uppercase">✅ 正确理解</div>
              <p className="text-sm leading-relaxed text-white">
                Harness <strong>就是 Agent 的运行本体</strong>。Claude Code = Claude + Harness，缺一不可。
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            你之前感觉「像在做 Agent 客户端后端」——这个感觉是对的。
          </p>
        </section>

        {/* 循环 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">Harness 的心脏：一个循环</h2>
          <p className="mb-8 text-center text-sm text-slate-500">剥到最里面，就是一个 while 循环 + 工具 + 权限</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col flex-wrap items-center justify-center gap-3 text-sm sm:flex-row sm:gap-2">
              <div className="min-w-[100px] rounded-xl border border-blue-500/30 bg-blue-500/15 px-4 py-3 text-center text-blue-200">
                <div className="mb-1 text-xs text-blue-400">用户</div>发任务
              </div>
              <span className="hidden text-slate-600 sm:inline">→</span>
              <div className="min-w-[100px] animate-pulse rounded-xl border border-violet-500/30 bg-violet-500/15 px-4 py-3 text-center text-violet-200">
                <div className="mb-1 text-xs text-violet-400">大脑</div>推理
              </div>
              <span className="hidden text-slate-600 sm:inline">→</span>
              <div className="min-w-[100px] rounded-xl border border-amber-500/30 bg-amber-500/15 px-4 py-3 text-center text-amber-200">
                <div className="mb-1 text-xs text-amber-400">判断</div>要工具吗？
              </div>
            </div>
            <div className="my-4 flex justify-center">
              <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-500">
                要 → 执行工具 → 结果塞回去 → 再推理（循环）
              </div>
            </div>
            <div className="flex justify-center">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 text-center text-emerald-200">
                <div className="mb-1 text-xs text-emerald-400">不要工具了</div>输出最终答案 · 循环停止
              </div>
            </div>
          </div>
        </section>

        {/* 框架 vs harness */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-lg font-semibold text-white">和「框架」有什么区别？</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass rounded-xl p-5 text-center">
              <div className="mb-2 text-2xl">🧱</div>
              <div className="mb-1 font-medium text-white">框架</div>
              <div className="mb-3 text-xs text-slate-500">LangChain</div>
              <p className="text-xs leading-relaxed text-slate-400">给你积木，<strong className="text-slate-300">你自己拼</strong></p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="mb-2 text-2xl">⚡</div>
              <div className="mb-1 font-medium text-white">运行时</div>
              <div className="mb-3 text-xs text-slate-500">LangGraph</div>
              <p className="text-xs leading-relaxed text-slate-400">管执行状态，<strong className="text-slate-300">能断点续跑</strong></p>
            </div>
            <div className="glass rounded-xl p-5 text-center ring-1 ring-violet-500/30">
              <div className="mb-2 text-2xl">🎯</div>
              <div className="mb-1 font-medium text-violet-300">Harness</div>
              <div className="mb-3 text-xs text-slate-500">Claude Code</div>
              <p className="text-xs leading-relaxed text-slate-400">决策已内置，<strong className="text-slate-300">开箱即用</strong></p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">类比：Node.js → Express → Next.js</p>
        </section>

        {/* 导航 */}
        <section>
          <h2 className="mb-2 text-center text-lg font-semibold text-white">继续往下看</h2>
          <p className="mb-6 text-center text-sm text-slate-500">每页只讲一件事，点进去就能懂</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="glass flex cursor-not-allowed items-center gap-4 rounded-xl p-4 opacity-50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-slate-500">02</div>
              <div>
                <div className="text-sm font-medium text-slate-400">定位与适用人群</div>
                <div className="text-xs text-slate-600">即将推出</div>
              </div>
            </div>
            <div className="glass flex cursor-not-allowed items-center gap-4 rounded-xl p-4 opacity-50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-slate-500">03</div>
              <div>
                <div className="text-sm font-medium text-slate-400">九大组成零件</div>
                <div className="text-xs text-slate-600">即将推出</div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-600">
            详细文字版在 <code className="rounded bg-white/5 px-1.5 py-0.5 text-slate-500">docs/</code> 目录，这里只做「一眼看懂」
          </p>
        </section>
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-600">
        Harness 工程 · 图形化学习
      </footer>
    </>
  );
}

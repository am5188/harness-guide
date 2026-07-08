import type { Metadata } from "next";
import Link from "next/link";
import { ItemTurnThread } from "@/components/item-turn-thread";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TurnFlow } from "@/components/turn-flow";

export const metadata: Metadata = {
  title: "智能体循环深潜 · Harness 工程",
  description: "一个 Turn 里到底发生了什么？Item / Turn / Thread 三层抽象。",
};

export default function LoopPage() {
  return (
    <>
      <SiteHeader pageLabel="第 3 页 / 循环深潜" backHref="/parts" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-32">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-cyan-400">剥到最细</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            一个 Turn 里
            <span className="text-gradient"> 到底发生了什么</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            模型只负责每一步推理。执行命令、收集输出、管权限、决定何时停——全是 Harness 的事。
          </p>
        </section>

        {/* 核心洞察 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-violet-500/5 p-6 sm:p-8">
            <p className="text-center text-sm leading-relaxed text-slate-300">
              OpenAI 原话精神：<strong className="text-white">「What makes this more than a simple loop
              is everything the harness manages along the way.」</strong>
              <br />
              <span className="text-slate-500">让它不只是简单循环的，是沿途 Harness 管的一切。</span>
            </p>
          </div>
        </section>

        {/* 交互式 Turn 流程 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">一步一步走一遍</h2>
          <p className="mb-8 text-center text-sm text-slate-500">点「下一步」看一个 Turn 的完整生命周期</p>
          <TurnFlow />
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* Item / Turn / Thread */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">三层抽象：Item → Turn → Thread</h2>
          <p className="mb-8 text-center text-sm text-slate-500">
            Codex 的心智模型，手搓 Harness 非常值得抄
          </p>
          <ItemTurnThread />
        </section>

        {/* 多 Turn 成本 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">为什么聊着聊着就贵了？</h2>
          <p className="mb-8 text-center text-sm text-slate-500">多 Turn 之间，历史会全部塞进下一次 Prompt</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="shrink-0 rounded-lg border border-blue-500/30 bg-blue-500/15 px-3 py-2 text-xs text-blue-200">
                  Turn 1
                </div>
                <div className="flex-1 rounded-lg border border-white/5 bg-black/20 px-4 py-2 text-xs text-slate-400">
                  用户消息 + 10 次工具调用 + 输出 = <span className="text-amber-300">8k tokens</span>
                </div>
              </div>
              <div className="flex justify-center text-slate-500">↓ 全部塞进下一次</div>
              <div className="flex items-center gap-4">
                <div className="shrink-0 rounded-lg border border-violet-500/30 bg-violet-500/15 px-3 py-2 text-xs text-violet-200">
                  Turn 2
                </div>
                <div className="flex-1 rounded-lg border border-white/5 bg-black/20 px-4 py-2 text-xs text-slate-400">
                  8k 历史 + 新消息 + 15 次工具 = <span className="text-amber-300">24k tokens</span>
                </div>
              </div>
              <div className="flex justify-center text-slate-500">↓ 继续膨胀</div>
              <div className="flex items-center gap-4">
                <div className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/15 px-3 py-2 text-xs text-red-200">
                  Turn 5
                </div>
                <div className="flex-1 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs text-red-300">
                  💸 上下文爆了 → 需要 <strong>压缩（compaction）</strong>
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-slate-500">
              OpenAI 做法：token 超阈值时，用 compact 端点把历史换成更小的摘要条目
            </p>
          </div>
        </section>

        {/* 人在环中 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">人在环中：审批闸门</h2>
          <p className="mb-8 text-center text-sm text-slate-500">高风险操作前暂停 Turn，等人类点头</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col items-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:justify-center">
              {[
                { label: "Agent 要删文件", cls: "border-amber-500/30 bg-amber-500/15" },
                { label: "Harness 暂停 Turn", cls: "border-red-500/30 bg-red-500/15" },
                { label: "弹窗：允许？", cls: "border-blue-500/30 bg-blue-500/15" },
                { label: "用户点 Allow", cls: "border-emerald-500/30 bg-emerald-500/15" },
                { label: "继续执行", cls: "border-violet-500/30 bg-violet-500/15" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  {i > 0 ? <span className="hidden text-slate-600 sm:inline">→</span> : null}
                  <div className={`rounded-xl border px-4 py-3 text-center text-xs sm:text-sm ${item.cls}`}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-slate-500">
              审批策略不写死在循环里，而是 Harness 层的开关——自主和监督解耦
            </p>
          </div>
        </section>

        {/* Codex 架构 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">Codex 怎么拆的？</h2>
          <p className="mb-8 text-center text-sm text-slate-500">核心和界面分开，所有客户端共用同一套 Harness</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 text-xs font-semibold tracking-wider text-violet-400 uppercase">Codex Core</div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-violet-400">·</span>Agent 循环</li>
                <li className="flex gap-2"><span className="text-violet-400">·</span>线程管理</li>
                <li className="flex gap-2"><span className="text-violet-400">·</span>工具执行</li>
                <li className="flex gap-2"><span className="text-violet-400">·</span>配置 + 鉴权</li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="mb-3 text-xs font-semibold tracking-wider text-blue-400 uppercase">App Server</div>
              <p className="mb-3 text-sm text-slate-300">JSON-RPC over stdio，包一层接口</p>
              <div className="flex flex-wrap gap-2">
                {["CLI", "VS Code", "Web", "macOS", "JetBrains"].map((c) => (
                  <span key={c} className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            同一个模型，Harness 不同，体验就不同——Codex 在自家界面上比通用聊天窗口表现更好
          </p>
        </section>

        {/* 手搓启发 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-white">对我们手搓的三条启发</h2>
            <div className="space-y-3">
              {[
                "先把最小循环搓通（阶段 02），再加停止条件、token 预算、审批闸门",
                "借鉴 Item/Turn/Thread：即使最小实现，也把「一条事件」「一个回合」「一段会话」分清",
                "会话历史用追加写文件持久化（阶段 03），为恢复和压缩打基础",
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
              href="/parts"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-sm font-bold text-violet-300">
                02
              </div>
              <div>
                <div className="text-sm font-medium text-white">九大组成零件</div>
                <div className="text-xs text-slate-500">已完成</div>
              </div>
            </Link>
            <Link
              href="/workflows"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-sm font-bold text-amber-300">
                04
              </div>
              <div>
                <div className="text-sm font-medium text-white">工作流设计模式</div>
                <div className="text-xs text-slate-500">五种积木怎么组合 →</div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

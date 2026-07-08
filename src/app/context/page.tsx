import type { Metadata } from "next";
import Link from "next/link";
import { ContextStrategyPicker } from "@/components/context-strategy-picker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "上下文工程 · Harness 工程",
  description: "Context Rot 是什么？压缩、清理、外部记忆三大手段怎么选、何时触发。",
};

export default function ContextPage() {
  return (
    <>
      <SiteHeader pageLabel="第 5 页 / 上下文工程" backHref="/workflows" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-32">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-sky-400">别让 Agent 越跑越笨</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            上下文
            <span className="text-gradient"> 管得好，才跑得远</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            长任务为什么会越跑越贵、越跑越蠢？不是窗口不够大，是上下文没管好。
            这篇讲清楚腐烂、压缩、清理、记忆——以及什么时候该用哪个。
          </p>
        </section>

        {/* Context Rot */}
        <section className="mb-14">
          <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-teal-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-center text-lg font-semibold text-white">核心敌人：Context Rot（上下文腐烂）</h2>
            <p className="mb-6 text-center text-sm leading-relaxed text-slate-300">
              朴素做法是「把所有东西都追加进消息历史」。它会<strong className="text-white">两种</strong>崩法：
            </p>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4">
                <div className="mb-2 text-sm font-semibold text-red-300">硬上限：窗口溢出</div>
                <p className="text-sm text-slate-300">token 数超过模型上下文窗口，直接报错或截断。</p>
              </div>
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
                <div className="mb-2 text-sm font-semibold text-amber-300">软伤害：质量下降</div>
                <p className="text-sm text-slate-300">
                  还没到上限，噪声已塞满窗口——模型性能随输入变长而下降。2025 年跨 18 个前沿模型的研究：<strong className="text-white">每一个</strong>都会中招。
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-slate-300">
              结论不是「把窗口做大」，而是<strong className="text-sky-300">把上下文管得更聪明</strong>。
            </p>
          </div>
        </section>

        {/* 交互：三大手段 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">三大手段：别搞混了</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            点下面三个标签，看压缩 / 清理 / 外部记忆各自干什么、什么时候该用
          </p>
          <ContextStrategyPicker />
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 触发阈值 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">关键数字：别等窗口用尽才动手</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            一旦 rot 已经发生，负责生成摘要的模型自己也受损——摘要质量会变差
          </p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">工具结果清理</span>
                  <span className="font-mono text-teal-300">60–70%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-teal-500/60 to-teal-400/80" />
                </div>
                <p className="mt-2 text-xs text-slate-400">observation masking：滚动保留最近 N 个，旧的换占位符</p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">压缩 Compaction</span>
                  <span className="font-mono text-sky-300">~70%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-sky-500/60 to-sky-400/80" />
                </div>
                <p className="mt-2 text-xs text-slate-400">128K 有效窗口 ≈ 90K–100K token 时触发</p>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/10 p-4">
              <p className="text-center text-sm text-slate-300">
                JetBrains 实测：<strong className="text-teal-300">以工具结果清理为主</strong>，省 50%+ 成本；
                对 Qwen3-Coder 480B 还有 +2.6% 解题率、−52% 成本。压缩留给「需要保住长对话推理」时。
              </p>
            </div>
          </div>
        </section>

        {/* 优先级阶梯 + 外部记忆 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">优先级阶梯 & 外部记忆</h2>
          <p className="mb-8 text-center text-sm text-slate-400">能可逆就别有损；压缩管这一会话，记忆管跨会话</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 text-xs font-semibold tracking-wider text-sky-400 uppercase">Redis 建议的阶梯</div>
              <div className="space-y-3 font-mono text-xs">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-slate-300">
                  原始上下文（raw）
                </div>
                <div className="text-center text-slate-500">↓ 窗口紧张时</div>
                <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-teal-200">
                  可逆压缩（内容还在别处，可取回）
                </div>
                <div className="text-center text-slate-500">↓ 最后手段</div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-200">
                  有损摘要（被丢的内容永久销毁）
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase">外部记忆分层</div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-cyan-400">·</span>
                  <span>
                    <strong className="text-white">最简起步</strong>：一个 Markdown 文件，定期写进度，重置后再读
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">·</span>
                  <span>
                    <strong className="text-white">工作记忆</strong>：会话级事件，带 TTL
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">·</span>
                  <span>
                    <strong className="text-white">长期记忆</strong>：跨会话知识，向量化语义检索
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">·</span>
                  <span>
                    <strong className="text-white">晋升门</strong>：不是什么都该变持久状态，防漂移
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 进阶 & 子代理 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">进阶：模型自己决定何时压缩</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            SelfCompact 论文：给模型一个压缩工具 + 轻量 rubric，成本降 30–70%，数学 +18.1 分
          </p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-slate-300">
                <span className="text-emerald-300">✓ 该压：</span>子任务已解决、轨迹在收敛
              </div>
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-slate-300">
                <span className="text-red-300">✗ 别压：</span>推导中、卡住了、还在探索
              </div>
            </div>
            <p className="text-center text-sm text-slate-300">
              模型自己「感知不到」上下文在腐烂——一份轻量 rubric 就能补上元认知缺口。
              <br />
              <span className="text-slate-400">子代理也别继承父代理完整历史：给带范围摘要 + 结构化返回，各自在干净窗口里工作。</span>
            </p>
          </div>
        </section>

        {/* 手搓启发 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-sky-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-white">对我们手搓的启发</h2>
            <div className="space-y-3">
              {[
                "阶段 03「文件即记忆」：先做最简外部记忆——追加写 JSONL / 维护 progress.md",
                "之后加 token 预算追踪、工具结果清理（滚动保留最近 N 个）、阈值触发的压缩",
                "排障法：长任务失败时先看失败点的上下文大小——若集中在 60–70% 填充度，就是上下文管理问题",
              ].map((tip, i) => (
                <div key={tip} className="flex gap-3 text-sm text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-xs font-bold text-teal-300">
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
              href="/workflows"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-sm font-bold text-amber-300">
                04
              </div>
              <div>
                <div className="text-sm font-medium text-white">工作流设计模式</div>
                <div className="text-xs text-slate-400">已完成</div>
              </div>
            </Link>
            <Link
              href="/tools"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-sm font-bold text-amber-300">
                06
              </div>
              <div>
                <div className="text-sm font-medium text-white">工具设计与 MCP</div>
                <div className="text-xs text-slate-500">好工具 vs 坏工具 →</div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

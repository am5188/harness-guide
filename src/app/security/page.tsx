import type { Metadata } from "next";
import Link from "next/link";
import { SecurityDefenseLayers } from "@/components/security-defense-layers";
import { SecurityLethalTrifecta } from "@/components/security-lethal-trifecta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "安全权限与提示词注入 · Harness 工程",
  description: "致命三要素威胁模型、间接提示词注入、沙箱与最小权限——agent 安全从聊天升级成系统安全。",
};

export default function SecurityPage() {
  return (
    <>
      <SiteHeader pageLabel="第 8 页 / 安全与注入" backHref="/eval" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-24">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-rose-400">守住边界</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            安全不是「说错话」
            <span className="text-gradient"> 是「系统被攻破」</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            一旦 agent 能读文件、调 API、执行动作，威胁就从坏回复升级成真实的数据外泄和系统破坏。
          </p>
        </section>

        {/* 核心洞察 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-red-500/5 p-6 sm:p-8">
            <p className="text-center text-sm leading-relaxed text-slate-300">
              Simon Willison 的<strong className="text-white">「致命三要素」</strong>：
              私有数据 + 不可信内容 + 对外动作，三项同时存在 = 间接提示词注入的温床。
              <br />
              <span className="text-slate-400">
                防护核心：假设模型会被攻破，用 Harness 缩小爆炸半径——不靠「请忽略注入」这种祈祷。
              </span>
            </p>
          </div>
        </section>

        {/* 交互：致命三要素 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">致命三要素 · 三项全占才危险</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            单独看每一项都是合理功能，危险来自同一条执行路径里三者并存
          </p>
          <SecurityLethalTrifecta />
        </section>

        {/* 提示词注入 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">间接提示词注入 · 攻击怎么发生</h2>
          <p className="mb-8 text-center text-sm text-slate-400">
            攻击者不需要黑进你的系统——只需在 agent 会读到的内容里埋一句指令
          </p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4">
                <div className="mb-2 text-sm font-semibold text-red-300">攻击面</div>
                <p className="text-sm text-slate-300">
                  邮件正文、网页、用户上传的文档、第三方 API 返回——任何会进入 prompt 的不可信内容，都是埋雷点。
                </p>
              </div>
              <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 p-4">
                <div className="mb-2 text-sm font-semibold text-rose-300">为什么难防</div>
                <p className="text-sm text-slate-300">
                  对 LLM 来说，<strong className="text-white">数据里的指令和系统提示词长得一模一样</strong>——模型无法可靠区分「该听的」和「被注入的」。
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 p-4">
              <p className="text-center text-sm text-slate-300">
                用户让 agent「总结这封邮件」——agent 照常读取，却以<strong className="text-amber-200">你的真实凭证</strong>执行了攻击者埋在正文里的命令。
                全程看不见，以为只是做了个摘要。
              </p>
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">
              外泄通道极多且易被忽略：图片 URL、链接预览、错误报告、普通工具调用……都能当数据出口
            </p>
          </div>
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 二选二法则 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">Agents Rule of Two · 二选二法则</h2>
          <p className="mb-8 text-center text-sm text-slate-400">Meta 提出：同一执行路径里，最多只占三要素中的两项</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="space-y-4">
              {[
                {
                  title: "拆成两次运行",
                  desc: "一次只读私有数据做规划，另一次只处理不可信内容——两条路径不交叉。",
                },
                {
                  title: "掐掉对外网络",
                  desc: "如果某次运行同时碰了私有数据和不可信内容，Harness 强制禁网，没有外泄通道。",
                },
                {
                  title: "先净化再合并",
                  desc: "不可信内容先提取成结构化字段（摘要、实体列表），再进入含私有数据的上下文。",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">{item.title}</div>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-center text-xs text-amber-200/90">
              关键：这个检查由 <strong className="text-amber-100">host（Harness）</strong> 在编排时强制执行，
              不能靠提示模型「忽略注入」——那不可靠。
            </p>
          </div>
        </section>

        {/* 最小自主 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">Least Agency · 自主权要挣得</h2>
          <p className="mb-8 text-center text-sm text-slate-400">OWASP 2026 Agentic Top 10 的核心精神</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-500/25 bg-red-500/8 p-5">
              <div className="mb-2 text-xs font-bold text-red-300 uppercase">❌ 默认给满权限</div>
              <p className="text-sm leading-relaxed text-slate-300">
                agent 拿着真实凭证为所欲为。爆炸半径不再是「一句坏回复」，而是机密性 / 完整性 / 可用性的直接损失。
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 ring-1 ring-emerald-500/25">
              <div className="mb-2 text-xs font-bold text-emerald-300 uppercase">✅ 逐步挣得自主权</div>
              <p className="text-sm leading-relaxed text-slate-300">
                只读规划 → 窄工具执行 → 高危动作人工确认。每一步权限都是 Harness 显式授予的，不是模型自己拿的。
              </p>
            </div>
          </div>
        </section>

        {/* 交互：防护层 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">缩小爆炸半径 · 五层防护</h2>
          <p className="mb-8 text-center text-sm text-slate-400">点选每一种控制，看 Harness 怎么兜底</p>
          <SecurityDefenseLayers />
        </section>

        {/* 工具层最小权限 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">工具层：别给 run_shell</h2>
          <p className="mb-8 text-center text-sm text-slate-400">开放式 shell 是「过度功能」的教科书反例</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <div className="mb-2 text-xs font-semibold text-red-300">宽工具 · 爆炸半径 = 任何事</div>
                <code className="text-sm text-red-200">run_shell(&quot;rm -rf /&quot;)</code>
                <p className="mt-2 text-xs text-slate-400">没有类型约束、没有 allowlist、没有边界——秘密一旦进循环就完了。</p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="mb-2 text-xs font-semibold text-emerald-300">窄工具 · 带类型的 allowlist</div>
                <code className="text-sm text-emerald-200">read_file(path: WorkspacePath)</code>
                <p className="mt-2 text-xs text-slate-400">路径类型校验、工作区边界、风险等级标签——Harness 在执行前拦截越权。</p>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <p>· 给每个工具打<strong className="text-white">能力标签</strong>：读私有 / 收不可信 / 对外通信</p>
              <p>· 缺标签的工具，<strong className="text-white">当作三项全占</strong>对待</p>
              <p>· 控制面变更走 <strong className="text-white">PR 式治理</strong>：agent 提交声明式清单，CI + 人审后才生效</p>
            </div>
          </div>
        </section>

        {/* 手搓启发 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-rose-500/5 p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-white">对我们手搓的四条铁律</h2>
            <div className="space-y-3">
              {[
                "模型只提出工具调用；Harness 负责校验 schema → 检查权限 → 执行 → 回填。绝不让模型直接执行。",
                "阶段 01 起就给工具分风险等级（只读 / 写文件 / 跑命令），高危动作留人工确认钩子。",
                "加工作区边界（不许越出项目目录）和预算限制（最大调用次数 / 时长）。",
                "本地学习场景风险低，但把这些闸门当默认习惯搓进去——这正是 harness 工程区别于「随便写个脚本」的地方。",
              ].map((tip, i) => (
                <div key={tip} className="flex gap-3 text-sm text-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                    {i + 1}
                  </span>
                  {tip}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-slate-400">
              至此，Docs 01–10 概念地基已扎实——可以开始动手搓 Harness 了 🎉
            </p>
          </div>
        </section>

        {/* 导航 */}
        <section>
          <h2 className="mb-6 text-center text-lg font-semibold text-white">继续往下看</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/eval"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-sm font-bold text-emerald-300">
                07
              </div>
              <div>
                <div className="text-sm font-medium text-white">评估与基准</div>
                <div className="text-xs text-slate-400">已完成</div>
              </div>
            </Link>
            <Link
              href="/"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-sm font-bold text-rose-300">
                🏠
              </div>
              <div>
                <div className="text-sm font-medium text-white">回到总览</div>
                <div className="text-xs text-slate-400">全系列完结 · 概念地基已齐</div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

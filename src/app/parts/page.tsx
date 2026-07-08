import type { Metadata } from "next";
import Link from "next/link";
import { PartsExplorer } from "@/components/parts-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "九大零件 · Harness 工程",
  description: "拆开 Harness，看清里面有哪些零件。",
};

const STOP_CONDITIONS = [
  { icon: "✅", label: "模型给出纯文本", desc: "不再要工具 = 主动完成" },
  { icon: "🔢", label: "达到最大轮次", desc: "如 50 次，防止无限打转" },
  { icon: "📦", label: "上下文窗口满了", desc: "装不下更多历史" },
  { icon: "🏁", label: "收到完成信号", desc: "明确的 done 标记" },
  { icon: "💥", label: "不可恢复的错误", desc: "硬停，不能瞎继续" },
];

export default function PartsPage() {
  return (
    <>
      <SiteHeader pageLabel="第 2 页 / 九大零件" backHref="/" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-32">
        {/* Hero */}
        <section className="pt-14 pb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-violet-400">拆开看里面</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            一个循环
            <span className="text-gradient"> + 八个脚手架</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            剥到最里面：while 循环 + 工具注册表 + 权限层。其它全是围着它转的零件。
          </p>
        </section>

        {/* 核心公式 */}
        <section className="mb-14">
          <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
            <h2 className="mb-6 text-center text-lg font-semibold text-white">Harness 的最小公式</h2>
            <div className="flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              <div className="animate-pulse rounded-xl border border-violet-500/40 bg-violet-500/20 px-5 py-3 text-center">
                <div className="text-xs text-violet-400">核心</div>
                <div className="font-mono text-sm font-medium text-violet-200">while (未完成)</div>
              </div>
              <span className="text-slate-600">+</span>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/15 px-5 py-3 text-center">
                <div className="text-xs text-amber-400">手脚</div>
                <div className="text-sm font-medium text-amber-200">工具注册表</div>
              </div>
              <span className="text-slate-600">+</span>
              <div className="rounded-xl border border-red-500/30 bg-red-500/15 px-5 py-3 text-center">
                <div className="text-xs text-red-400">闸门</div>
                <div className="text-sm font-medium text-red-200">权限层</div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">
              Anthropic 叫它 <strong className="text-slate-400">「a dumb loop」</strong>——智能在模型里，循环只负责管好一轮又一轮
            </p>
          </div>
        </section>

        {/* TAO 循环 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">循环里到底在转什么？</h2>
          <p className="mb-8 text-center text-sm text-slate-500">TAO = Thought · Action · Observation（思考 · 行动 · 观察）</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5 text-center">
                <div className="mb-2 text-2xl">🧠</div>
                <div className="mb-1 font-medium text-blue-300">Thought 思考</div>
                <p className="text-xs text-slate-400">装配上下文，调用模型，决定下一步</p>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 text-center">
                <div className="mb-2 text-2xl">⚡</div>
                <div className="mb-1 font-medium text-amber-300">Action 行动</div>
                <p className="text-xs text-slate-400">解析工具调用，harness 校验后执行</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
                <div className="mb-2 text-2xl">👁️</div>
                <div className="mb-1 font-medium text-emerald-300">Observation 观察</div>
                <p className="text-xs text-slate-400">把执行结果塞回对话，进入下一轮</p>
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-center text-sm text-slate-400">
              Claude Code 版本：<strong className="text-slate-300">Gather 收集</strong> →{" "}
              <strong className="text-slate-300">Act 行动</strong> →{" "}
              <strong className="text-slate-300">Verify 验证</strong> → 再来一轮
            </div>
          </div>
        </section>

        <div className="glow-line mx-auto mb-14 max-w-md" />

        {/* 九大零件交互 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">九大零件，点一个看一个</h2>
          <p className="mb-8 text-center text-sm text-slate-500">几乎每个生产级 Harness 都有这些</p>
          <PartsExplorer />
        </section>

        {/* 停止条件 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">循环什么时候停？</h2>
          <p className="mb-6 text-center text-sm text-slate-500">停止条件是一等公民，不是细节</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STOP_CONDITIONS.map((item) => (
              <div key={item.label} className="glass rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium text-white">{item.label}</span>
                </div>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            让「生成器」和「验证器」协商什么算完成，比改提示词更有效
          </p>
        </section>

        {/* 工具执行安全流 */}
        <section className="mb-14">
          <h2 className="mb-2 text-center text-lg font-semibold text-white">工具绝不能由模型直接执行</h2>
          <p className="mb-8 text-center text-sm text-slate-500">这是防止提示词注入升级成任意代码执行的关键</p>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col items-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:justify-center">
              {[
                { step: "1", label: "模型返回", sub: "结构化工具调用请求", cls: "border-blue-500/30 bg-blue-500/15" },
                { step: "2", label: "Harness 校验", sub: "schema + 权限", cls: "border-amber-500/30 bg-amber-500/15" },
                { step: "3", label: "Harness 执行", sub: "真正跑命令/读文件", cls: "border-violet-500/30 bg-violet-500/15" },
                { step: "4", label: "结果塞回", sub: "写入对话上下文", cls: "border-emerald-500/30 bg-emerald-500/15" },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-3">
                  {i > 0 ? <span className="hidden text-slate-600 sm:inline">→</span> : null}
                  <div className={`min-w-[120px] rounded-xl border px-4 py-3 text-center ${item.cls}`}>
                    <div className="mb-1 text-[10px] text-slate-500">步骤 {item.step}</div>
                    <div className="font-medium text-white">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Harness 会变薄 */}
        <section className="mb-14">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6 sm:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
              <span>📉</span> Harness 会随模型变强而「变薄」
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              每个零件都编码了一个假设：「模型自己做不好这件事」。模型变强了，对应零件就可以拿掉。
              Harness 工程不是一直往上堆，而是<strong className="text-white">随模型能力动态调厚薄</strong>。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                <div className="mb-1 text-xs font-medium text-cyan-400">会变薄的</div>
                <p className="text-xs text-slate-400">复杂规划、多步推理辅助、部分上下文管理</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                <div className="mb-1 text-xs font-medium text-emerald-400">骨架始终要</div>
                <p className="text-xs text-slate-400">持久状态、可验证的工具执行、清晰的权限控制</p>
              </div>
            </div>
          </div>
        </section>

        {/* 手搓路线 */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-lg font-semibold text-white">我们仓库的手搓顺序</h2>
          <div className="relative">
            <div className="absolute top-6 right-8 left-8 hidden h-px bg-gradient-to-r from-amber-500/50 via-violet-500/50 to-rose-500/50 sm:block" />
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { phase: "01", name: "工具注册", desc: "手和脚" },
                { phase: "02", name: "智能体循环", desc: "心跳" },
                { phase: "03", name: "记忆持久化", desc: "档案室" },
                { phase: "04", name: "评估验证", desc: "质检" },
              ].map((item) => (
                <div key={item.phase} className="glass relative rounded-xl p-4 text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-300">
                    {item.phase}
                  </div>
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
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
              href="/"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300">
                01
              </div>
              <div>
                <div className="text-sm font-medium text-white">总览</div>
                <div className="text-xs text-slate-500">Harness 是什么 · 已完成</div>
              </div>
            </Link>
            <Link
              href="/loop"
              className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-300">
                03
              </div>
              <div>
                <div className="text-sm font-medium text-white">智能体循环深潜</div>
                <div className="text-xs text-slate-500">Item / Turn / Thread →</div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

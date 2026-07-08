"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LayerTabs() {
  return (
    <Tabs defaultValue="harness" className="w-full">
      <TabsList className="mx-auto mb-6 flex w-full max-w-md gap-1 bg-white/5">
        <TabsTrigger value="prompt" className="flex-1 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
          Prompt
        </TabsTrigger>
        <TabsTrigger value="agent" className="flex-1 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
          Agent
        </TabsTrigger>
        <TabsTrigger value="harness" className="flex-1 data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300">
          Harness
        </TabsTrigger>
      </TabsList>

      <div className="glass min-h-[240px] rounded-2xl p-6 sm:p-8">
        <TabsContent value="prompt" className="mt-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <span className="text-lg font-semibold text-amber-300">Prompt · 只会「喊话」</span>
          </div>
          <div className="mb-4 rounded-lg border border-white/5 bg-black/30 p-4 font-mono text-sm text-slate-300">
            「请先分析，再执行，再检查。」
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2"><span className="text-amber-400">✓</span> 用文字要求模型怎么做</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> 软约束，模型可以忘、可以乱来</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> 说完就忘，没有工具、没有循环</li>
          </ul>
        </TabsContent>

        <TabsContent value="agent" className="mt-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-lg font-semibold text-blue-300">Agent · 能「动手」了</span>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {["模型", "工具", "记忆", "规划"].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-600">+</span>}
                <span className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">{t}</span>
              </span>
            ))}
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2"><span className="text-blue-400">✓</span> 能调用搜索、代码、文件</li>
            <li className="flex gap-2"><span className="text-amber-400">△</span> 可能只是功能拼装，还不稳定</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> 缺：怎么循环、怎么停、怎么评估、怎么守边界</li>
          </ul>
        </TabsContent>

        <TabsContent value="harness" className="mt-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <span className="text-lg font-semibold text-violet-300">Harness · 完整的「运行系统」</span>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {["工作流循环", "工具 + 权限", "上下文管理", "文件记忆", "评估器", "自我改进"].map((t) => (
              <span key={t} className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2 py-1.5 text-center text-xs text-violet-200">
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            Claude Code、Codex、Cursor <strong className="text-slate-200">本身就是 harness</strong>。
            不是给 Agent 用的外挂，而是 Agent 的躯体。
          </p>
        </TabsContent>
      </div>
    </Tabs>
  );
}

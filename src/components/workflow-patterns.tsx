"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Pattern = {
  id: string;
  num: number;
  icon: string;
  name: string;
  tagline: string;
  flow: string[];
  when: string;
  benefit: string;
  analogy: string;
  color: string;
};

const PATTERNS: Pattern[] = [
  {
    id: "chain",
    num: 1,
    icon: "🔗",
    name: "提示链",
    tagline: "固定步骤，串行执行",
    flow: ["输入", "LLM 1", "gate 检查", "LLM 2", "LLM 3", "输出"],
    when: "任务能干净拆成固定子步骤",
    benefit: "每步更简单、更可控、更易检查",
    analogy: "像流水线：先写大纲 → 写正文 → 润色",
    color: "blue",
  },
  {
    id: "route",
    num: 2,
    icon: "🚦",
    name: "路由",
    tagline: "先分类，再分派",
    flow: ["输入", "路由器", "账单分支", "技术分支", "通用分支"],
    when: "输入种类差异大，一个 prompt 顾此失彼",
    benefit: "关注点分离，每分支有自己的 prompt 和工具",
    analogy: "像客服前台：先判断问题类型，再转接",
    color: "amber",
  },
  {
    id: "parallel",
    num: 3,
    icon: "⚡",
    name: "并行化",
    tagline: "独立任务同时跑",
    flow: ["任务", "Worker A", "Worker B", "Worker C", "汇总"],
    when: "需要多视角，或纯粹想提速",
    benefit: "分段并行提速，或投票取最优",
    analogy: "像三个实习生同时调研不同方向",
    color: "cyan",
  },
  {
    id: "orchestrator",
    num: 4,
    icon: "🎯",
    name: "编排者—工作者",
    tagline: "运行时动态拆任务",
    flow: ["任务", "编排者规划", "Worker 1", "Worker 2", "综合结果"],
    when: "子任务不能预先定好，要现场决定",
    benefit: "灵活拆解，比并行化更动态",
    analogy: "像项目经理：看任务现场派活，不是固定分工",
    color: "violet",
  },
  {
    id: "evaluator",
    num: 5,
    icon: "📝",
    name: "评估者—优化者",
    tagline: "生成 → 评估 → 改稿循环",
    flow: ["生成器", "产出", "评估者", "反馈", "再生成", "达标"],
    when: "有清晰评估标准，迭代能带来提升",
    benefit: "写作 → 审稿 → 改稿，直到达标",
    analogy: "像改论文：写完给导师看，打回再改",
    color: "emerald",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string; chip: string }> = {
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/15", text: "text-blue-300", ring: "ring-blue-500/40", chip: "border-blue-500/25 bg-blue-500/10 text-blue-200" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/15", text: "text-amber-300", ring: "ring-amber-500/40", chip: "border-amber-500/25 bg-amber-500/10 text-amber-200" },
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/15", text: "text-cyan-300", ring: "ring-cyan-500/40", chip: "border-cyan-500/25 bg-cyan-500/10 text-cyan-200" },
  violet: { border: "border-violet-500/30", bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/40", chip: "border-violet-500/25 bg-violet-500/10 text-violet-200" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40", chip: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200" },
};

export function WorkflowPatterns() {
  const [active, setActive] = useState("chain");
  const selected = PATTERNS.find((p) => p.id === active) ?? PATTERNS[0];
  const colors = colorMap[selected.color];

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
        {PATTERNS.map((pattern) => {
          const c = colorMap[pattern.color];
          const isActive = active === pattern.id;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => setActive(pattern.id)}
              className={cn(
                "rounded-xl border p-3 text-left transition-all sm:p-4",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]",
              )}
            >
              <div className="mb-1 text-lg sm:text-xl">{pattern.icon}</div>
              <div className={cn("text-xs font-semibold sm:text-sm", isActive ? c.text : "text-white")}>
                {pattern.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 流程可视化 */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {selected.flow.map((step, i) => (
          <div key={`${selected.id}-${step}`} className="flex items-center gap-2">
            {i > 0 ? <span className="text-slate-600">→</span> : null}
            <div className={cn("rounded-lg border px-3 py-2 text-xs sm:text-sm", colors.chip)}>{step}</div>
          </div>
        ))}
      </div>

      <div className={cn("glass rounded-2xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <div className="text-xs text-slate-500">模式 #{selected.num}</div>
            <h3 className={cn("text-lg font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-xs text-slate-500">{selected.tagline}</p>
          </div>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
            <div className="mb-1 text-xs font-medium text-slate-500">什么时候用</div>
            <p className="text-sm text-slate-300">{selected.when}</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
            <div className="mb-1 text-xs font-medium text-slate-500">收益</div>
            <p className="text-sm text-slate-300">{selected.benefit}</p>
          </div>
        </div>
        <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-sm text-slate-400">
          <span className="text-slate-500">比喻：</span>
          {selected.analogy}
        </div>
      </div>
    </div>
  );
}

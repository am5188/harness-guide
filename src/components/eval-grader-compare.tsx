"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type GraderType = "code" | "llm";

const GRADERS: {
  id: GraderType;
  name: string;
  icon: string;
  tagline: string;
  analogy: string;
  pros: string[];
  cons: string[];
  example: string;
  color: string;
}[] = [
  {
    id: "code",
    name: "代码打分器",
    icon: "⚙️",
    tagline: "确定性验证 · 可复现",
    analogy: "像单元测试：跑一遍，过没过一目了然",
    pros: ["客观、可复现", "适合 CI 回归门禁", "代码/数学等可执行任务首选"],
    cons: ["只能验证「可执行」的结果", "对开放问答、创意写作无能为力"],
    example: "跑 pytest → 12 passed / 0 failed → ✅ pass",
    color: "emerald",
  },
  {
    id: "llm",
    name: "LLM-as-a-Judge",
    icon: "⚖️",
    tagline: "模型当裁判 · 灵活可扩展",
    analogy: "像请一位阅卷老师：给 rubric，让它按标准打分",
    pros: ["灵活，能评开放任务", "可规模化", "进阶版 Agent-as-a-Judge 还能取证"],
    cons: [
      "位置/顺序偏好、冗长偏好",
      "自我偏好（偏自家模型）",
      "与人类判断可能不对齐",
      "容易被「讨好式」输出骗过",
    ],
    example: "输出 + 评分 rubric → 模型打分 7/10 + 理由",
    color: "violet",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40" },
  violet: { border: "border-violet-500/30", bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/40" },
};

export function EvalGraderCompare() {
  const [active, setActive] = useState<GraderType>("code");
  const selected = GRADERS.find((g) => g.id === active) ?? GRADERS[0];
  const colors = colorMap[selected.color];

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2 sm:gap-3">
        {GRADERS.map((grader) => {
          const c = colorMap[grader.color];
          const isActive = active === grader.id;
          return (
            <button
              key={grader.id}
              type="button"
              onClick={() => setActive(grader.id)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-4 text-center transition-all sm:px-6",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/5 bg-white/[0.02] hover:border-white/10",
              )}
            >
              <div className="mb-1 text-xl sm:text-2xl">{grader.icon}</div>
              <div className={cn("text-xs font-semibold sm:text-sm", isActive ? c.text : "text-white")}>
                {grader.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className={cn("glass rounded-2xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-xs text-slate-400">{selected.tagline}</p>
          </div>
        </div>

        <p className="mb-5 text-sm text-slate-300">
          <span className="text-slate-400">比喻：</span>
          {selected.analogy}
        </p>

        <div className="mb-5 rounded-lg border border-white/5 bg-black/20 px-4 py-3 font-mono text-xs text-slate-300">
          {selected.example}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">优点</div>
            <ul className="space-y-1.5">
              {selected.pros.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">局限</div>
            <ul className="space-y-1.5">
              {selected.cons.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-amber-400">!</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        实务口诀：<strong className="text-white">可验证的用代码打分器</strong>；<strong className="text-white">只能判断的用模型打分器 + 对齐校准</strong>
      </p>
    </div>
  );
}

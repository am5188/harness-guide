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
  accent: "sky" | "cyan";
}[] = [
  {
    id: "code",
    name: "代码打分器",
    icon: "✅",
    tagline: "有标准答案 · 自动批改",
    analogy: "像判断题：跑一遍测试，对就是对、错就是错，又快又客观。",
    pros: ["客观、可复现，每次结果一样", "适合放进自动化流水线做回归检查", "写代码、算数学等有明确对错的事首选"],
    cons: ["只能验证「能自动检查」的结果", "开放问答、创意写作这类没法用"],
    example: "跑 pytest → 12 passed / 0 failed → ✅ 通过",
    accent: "sky",
  },
  {
    id: "llm",
    name: "LLM-as-a-Judge",
    icon: "⚖️",
    tagline: "没标准答案 · 请 AI 当老师",
    analogy: "像作文题：没有唯一正确答案，请另一位老师按评分标准主观打分。",
    pros: ["灵活，能评开放任务和创意内容", "可以规模化，一次评很多份", "进阶版还能自己查资料、多步推理再打分"],
    cons: [
      "可能偏爱更长的答案（冗长偏好）",
      "可能偏爱自己家模型的输出（自我偏好）",
      "打分标准可能和人类感觉不一致",
      "容易被「讨好式」的漂亮废话骗过",
    ],
    example: "AI 输出 + 评分标准 → 裁判模型打 7/10 并写理由",
    accent: "cyan",
  },
];

const accentMap: Record<
  "sky" | "cyan",
  { border: string; bg: string; text: string; ring: string }
> = {
  sky: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    ring: "ring-sky-500/40",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/15",
    text: "text-cyan-300",
    ring: "ring-cyan-500/40",
  },
};

export function EvalGraderCompare() {
  const [active, setActive] = useState<GraderType>("code");
  const selected = GRADERS.find((g) => g.id === active) ?? GRADERS[0];
  const colors = accentMap[selected.accent];

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2 sm:gap-3" role="tablist" aria-label="打分器类型">
        {GRADERS.map((grader) => {
          const c = accentMap[grader.accent];
          const isActive = active === grader.id;
          return (
            <button
              key={grader.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(grader.id)}
              className={cn(
                "flex-1 rounded-2xl border px-3 py-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 sm:px-6",
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

      <div className={cn("glass rounded-3xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold text-white", colors.text)}>{selected.name}</h3>
            <p className="text-sm text-slate-500">{selected.tagline}</p>
          </div>
        </div>

        <p className="mb-5 text-base leading-relaxed text-slate-400">
          <span className="text-slate-500">打个比方：</span>
          {selected.analogy}
        </p>

        <div className="mb-5 rounded-2xl border border-white/5 bg-black/20 px-4 py-3 font-mono text-sm text-slate-300">
          {selected.example}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">优点</div>
            <ul className="space-y-2">
              {selected.pros.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-400">
                  <span className="shrink-0 text-emerald-400">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">局限</div>
            <ul className="space-y-2">
              {selected.cons.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-slate-400">
                  <span className="shrink-0 text-rose-400">!</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        记住：<span className="font-medium text-white">有标准答案的用代码打分</span>；
        <span className="font-medium text-white">只能主观判断的用模型打分，并定期和人类校准</span>。
      </p>
    </div>
  );
}

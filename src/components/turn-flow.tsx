"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "input", label: "你发消息", desc: "比如：「帮我修这个 bug」", side: "user" },
  { id: "prompt", label: "拼好上下文", desc: "历史记录 + 系统说明 + 可用工具列表", side: "harness" },
  { id: "infer", label: "模型想一想", desc: "决定：直接回复，还是调用工具？", side: "model" },
  { id: "tool", label: "Harness 动手", desc: "读文件、跑命令、改代码……", side: "harness" },
  { id: "append", label: "结果塞回去", desc: "工具输出追加进对话，供模型再看", side: "harness" },
  { id: "loop", label: "再想一轮", desc: "可能重复几十次，直到活干完", side: "loop" },
  { id: "done", label: "给出最终回复", desc: "这一轮结束，展示给你看", side: "done" },
];

export function TurnFlow() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const sideColor: Record<string, string> = {
    user: "border-sky-500/30 bg-sky-500/15 text-sky-200",
    harness: "border-cyan-500/30 bg-cyan-500/15 text-cyan-200",
    model: "border-sky-400/40 bg-sky-400/10 text-slate-200",
    loop: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    done: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  };

  const sideLabel: Record<string, string> = {
    user: "你",
    harness: "Harness",
    model: "模型",
    loop: "循环",
    done: "完成",
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          步骤 <span className="font-medium text-white">{step + 1}</span> / {STEPS.length}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 disabled:opacity-30"
          >
            ← 上一步
          </button>
          <button
            type="button"
            disabled={step === STEPS.length - 1}
            onClick={() => setStep((s) => s + 1)}
            className="rounded-xl border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-xs text-sky-200 transition hover:bg-sky-500/25 disabled:opacity-30"
          >
            下一步 →
          </button>
        </div>
      </div>

      <div className="mb-2 text-center text-xs font-medium tracking-wide text-slate-500">
        {sideLabel[current.side]}
      </div>
      <div className="mb-6 flex justify-center">
        <div
          className={cn(
            "min-w-[220px] rounded-2xl border px-6 py-5 text-center transition-all",
            sideColor[current.side],
          )}
        >
          <div className="mb-1 text-lg font-semibold text-white">{current.label}</div>
          <div className="text-sm text-slate-300">{current.desc}</div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(i)}
            className={cn(
              "h-2 w-6 rounded-full transition-all sm:w-8",
              i === step ? "bg-sky-400" : i < step ? "bg-sky-500/40" : "bg-white/10",
            )}
            aria-label={s.label}
          />
        ))}
      </div>

      {step >= 3 && step <= 5 ? (
        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-center text-sm text-slate-300">
          调工具 → 执行 → 看结果 → 再想——循环转，直到模型说「做完了」
        </div>
      ) : null}
    </div>
  );
}

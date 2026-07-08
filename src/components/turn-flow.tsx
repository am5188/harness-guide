"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "input", label: "用户输入", desc: "「帮我修这个 bug」", side: "user" },
  { id: "prompt", label: "构造 Prompt", desc: "历史 + 系统提示 + 工具列表", side: "harness" },
  { id: "infer", label: "模型推理", desc: "返回：最终消息 或 工具调用", side: "model" },
  { id: "tool", label: "执行工具", desc: "读文件 / 跑命令 / 写代码", side: "harness" },
  { id: "append", label: "结果塞回", desc: "工具输出追加进 prompt", side: "harness" },
  { id: "loop", label: "再推理", desc: "可能重复几十次", side: "loop" },
  { id: "done", label: "最终消息", desc: "给用户看的回复", side: "done" },
];

export function TurnFlow() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const sideColor: Record<string, string> = {
    user: "border-blue-500/30 bg-blue-500/15 text-blue-200",
    harness: "border-violet-500/30 bg-violet-500/15 text-violet-200",
    model: "border-amber-500/30 bg-amber-500/15 text-amber-200",
    loop: "border-cyan-500/30 bg-cyan-500/15 text-cyan-200",
    done: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
  };

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          步骤 <span className="text-white">{step + 1}</span> / {STEPS.length}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 disabled:opacity-30"
          >
            ← 上一步
          </button>
          <button
            type="button"
            disabled={step === STEPS.length - 1}
            onClick={() => setStep((s) => s + 1)}
            className="rounded-lg border border-violet-500/30 bg-violet-500/15 px-3 py-1.5 text-xs text-violet-200 transition hover:bg-violet-500/25 disabled:opacity-30"
          >
            下一步 →
          </button>
        </div>
      </div>

      <div className="mb-6 flex justify-center">
        <div className={cn("min-w-[200px] rounded-xl border px-6 py-5 text-center transition-all", sideColor[current.side])}>
          <div className="mb-1 text-lg font-semibold">{current.label}</div>
          <div className="text-sm opacity-80">{current.desc}</div>
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
              i === step ? "bg-violet-400" : i < step ? "bg-violet-500/40" : "bg-white/10",
            )}
            aria-label={s.label}
          />
        ))}
      </div>

      {step >= 3 && step <= 5 ? (
        <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-center text-sm text-cyan-200">
          🔁 工具调用 → 执行 → 塞回 → 再推理，循环直到模型说「完成了」
        </div>
      ) : null}
    </div>
  );
}

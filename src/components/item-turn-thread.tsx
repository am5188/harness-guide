"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Level = "item" | "turn" | "thread";

const LEVELS: {
  id: Level;
  name: string;
  icon: string;
  tagline: string;
  analogy: string;
  examples: string[];
  lifecycle: string;
  color: string;
}[] = [
  {
    id: "item",
    name: "Item 条目",
    icon: "⚛️",
    tagline: "最小原子单位",
    analogy: "像聊天记录里的「一条消息」",
    examples: ["用户消息", "Agent 回复", "工具执行结果", "审批请求", "代码 diff"],
    lifecycle: "started → delta（流式）→ completed",
    color: "blue",
  },
  {
    id: "turn",
    name: "Turn 回合",
    icon: "🔄",
    tagline: "一次用户输入触发的整段工作",
    analogy: "像微信里「你发一句话，对方回一大段」",
    examples: ["用户：修这个 bug", "Agent 读文件", "Agent 改代码", "Agent 跑测试", "Agent：修好了"],
    lifecycle: "turn/start → 一串 item → turn/completed",
    color: "violet",
  },
  {
    id: "thread",
    name: "Thread 线程",
    icon: "🧵",
    tagline: "整段持久化会话",
    analogy: "像一整段微信对话记录",
    examples: ["第 1 轮：修 bug", "第 2 轮：加个测试", "第 3 轮：重构一下", "可恢复、可 fork、可归档"],
    lifecycle: "创建 → 多轮 turn → 持久化事件历史",
    color: "emerald",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/15", text: "text-blue-300", ring: "ring-blue-500/40" },
  violet: { border: "border-violet-500/30", bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/40" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40" },
};

export function ItemTurnThread() {
  const [active, setActive] = useState<Level>("turn");
  const selected = LEVELS.find((l) => l.id === active) ?? LEVELS[1];
  const colors = colorMap[selected.color];

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2 sm:gap-3">
        {LEVELS.map((level) => {
          const c = colorMap[level.color];
          const isActive = active === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setActive(level.id)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-4 text-center transition-all sm:px-6",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/5 bg-white/[0.02] hover:border-white/10",
              )}
            >
              <div className="mb-1 text-xl sm:text-2xl">{level.icon}</div>
              <div className={cn("text-xs font-semibold sm:text-sm", isActive ? c.text : "text-white")}>
                {level.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 嵌套可视化：Thread 包 Turn 包 Item，高亮当前选中层 */}
      <div className="mb-6 flex justify-center">
        <div className="w-full max-w-xl">
          <div
            className={cn(
              "rounded-2xl border bg-emerald-500/[0.07] p-6 transition-all sm:p-8",
              active === "thread" ? "border-emerald-500/50 ring-1 ring-emerald-500/40" : "border-emerald-500/20",
            )}
          >
            <div className="mb-3 text-center text-xs font-semibold text-emerald-300">🧵 Thread 线程</div>
            <div
              className={cn(
                "rounded-xl border bg-violet-500/[0.07] p-5 transition-all sm:p-6",
                active === "turn" ? "border-violet-500/50 ring-1 ring-violet-500/40" : "border-violet-500/20",
              )}
            >
              <div className="mb-3 text-center text-xs font-semibold text-violet-300">🔄 Turn 回合</div>
              <div className="flex flex-wrap justify-center gap-2">
                {selected.examples.map((ex) => (
                  <div
                    key={ex}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs transition-all",
                      active === "item"
                        ? "border-blue-500/50 bg-blue-500/20 text-blue-100 ring-1 ring-blue-500/30"
                        : "border-blue-500/25 bg-blue-500/10 text-blue-200",
                    )}
                  >
                    {ex}
                  </div>
                ))}
              </div>
              {active === "item" ? (
                <div className="mt-3 text-center text-[11px] text-blue-300/80">⚛️ 每一块就是一个 Item</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={cn("glass rounded-2xl border p-6", colors.border)}>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-xs text-slate-500">{selected.tagline}</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-slate-300">
          <span className="text-slate-500">比喻：</span>
          {selected.analogy}
        </p>
        <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3 font-mono text-xs text-slate-400">
          生命周期：{selected.lifecycle}
        </div>
      </div>
    </div>
  );
}

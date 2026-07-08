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
}[] = [
  {
    id: "item",
    name: "Item · 一条",
    icon: "💬",
    tagline: "最小单位，像聊天里的一条气泡",
    analogy: "微信里你发的一句「在吗？」、对方回的一个「在」、系统提示「对方正在输入」——每一条都是 Item。",
    examples: ["你的消息", "AI 的回复", "工具跑完的结果", "「要删文件吗？」的弹窗", "改动的代码 diff"],
    lifecycle: "开始 → 可能一点点流出来 → 完成",
  },
  {
    id: "turn",
    name: "Turn · 一轮",
    icon: "🔄",
    tagline: "你发一次话，到 AI 干完并停下，算一整轮",
    analogy: "你问「帮我修 bug」，对方读文件、改代码、跑测试、最后说「修好了」——这一整段算一轮 Turn。",
    examples: ["你：修这个 bug", "读 main.py", "改了两行代码", "跑测试通过", "AI：修好了"],
    lifecycle: "回合开始 → 一串 Item 依次出现 → 回合结束",
  },
  {
    id: "thread",
    name: "Thread · 整段对话",
    icon: "🧵",
    tagline: "多轮 Turn 串起来，就是一段完整会话",
    analogy: "你和某人的整段微信聊天记录——可以翻回去、接着聊、复制一份新开聊（fork）。",
    examples: ["第 1 轮：修 bug", "第 2 轮：加个测试", "第 3 轮：顺手重构", "关掉再打开，记录还在"],
    lifecycle: "创建会话 → 多轮 Turn → 历史持久保存，随时恢复",
  },
];

export function ItemTurnThread() {
  const [active, setActive] = useState<Level>("turn");
  const selected = LEVELS.find((l) => l.id === active) ?? LEVELS[1];

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2 sm:gap-3">
        {LEVELS.map((level) => {
          const isActive = active === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setActive(level.id)}
              className={cn(
                "flex-1 rounded-2xl border px-3 py-4 text-center transition-all sm:px-6",
                isActive
                  ? "border-sky-500/40 bg-sky-500/15 ring-1 ring-sky-500/30"
                  : "border-white/5 bg-white/[0.02] hover:border-sky-500/20",
              )}
            >
              <div className="mb-1 text-xl sm:text-2xl">{level.icon}</div>
              <div
                className={cn(
                  "text-xs font-semibold sm:text-sm",
                  isActive ? "text-sky-300" : "text-slate-300",
                )}
              >
                {level.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 嵌套可视化：Thread 包 Turn 包 Item */}
      <div className="mb-6 flex justify-center">
        <div className="w-full max-w-xl">
          <div
            className={cn(
              "rounded-3xl border bg-sky-500/[0.06] p-6 transition-all sm:p-8",
              active === "thread"
                ? "border-sky-500/50 ring-1 ring-sky-500/30"
                : "border-sky-500/20",
            )}
          >
            <div className="mb-3 text-center text-xs font-semibold text-sky-300">
              🧵 Thread · 整段对话
            </div>
            <div
              className={cn(
                "rounded-2xl border bg-cyan-500/[0.06] p-5 transition-all sm:p-6",
                active === "turn"
                  ? "border-cyan-500/50 ring-1 ring-cyan-500/30"
                  : "border-cyan-500/20",
              )}
            >
              <div className="mb-3 text-center text-xs font-semibold text-cyan-300">
                🔄 Turn · 一轮
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {selected.examples.map((ex) => (
                  <div
                    key={ex}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-xs transition-all",
                      active === "item"
                        ? "border-sky-400/50 bg-sky-500/20 text-slate-200 ring-1 ring-sky-400/30"
                        : "border-sky-500/25 bg-sky-500/10 text-slate-300",
                    )}
                  >
                    {ex}
                  </div>
                ))}
              </div>
              {active === "item" ? (
                <div className="mt-3 text-center text-xs text-slate-400">
                  💬 每一块气泡就是一个 Item
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl border border-sky-500/20 p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">{selected.icon}</span>
          <div>
            <h3 className="font-semibold text-white">{selected.name}</h3>
            <p className="text-sm text-slate-400">{selected.tagline}</p>
          </div>
        </div>
        <p className="mb-5 text-base leading-relaxed text-slate-300">
          <span className="text-slate-500">生活类比：</span>
          {selected.analogy}
        </p>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
          <span className="text-slate-500">生命周期：</span>
          {selected.lifecycle}
        </div>
      </div>
    </div>
  );
}

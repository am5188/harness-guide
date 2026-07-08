"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Strategy = "compaction" | "clearing" | "memory";

const STRATEGIES: {
  id: Strategy;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
  analogy: string;
  whatItDoes: string;
  whenToUse: string;
  trigger: string;
  bestFor: string[];
  color: string;
}[] = [
  {
    id: "compaction",
    name: "压缩 Compaction",
    shortName: "压缩",
    icon: "🗜️",
    tagline: "把整个窗口蒸馏成高保真摘要",
    analogy: "把一摞会议记录浓缩成一份纪要",
    whatItDoes: "把整个上下文窗口里的对话、推理、工具轨迹，压缩成一份更小的摘要条目。Agent 带着「发生过什么」继续跑，而不是带着原始全文。",
    whenToUse: "长对话推理必须保住、窗口快满了、且可逆清理已经不够用时。",
    trigger: "约 70% 有效窗口（128K 窗口 ≈ 90K–100K token）",
    bestFor: ["多轮深度推理", "需要保留决策脉络", "子任务已解决、轨迹在收敛时"],
    color: "sky",
  },
  {
    id: "clearing",
    name: "工具结果清理 Clearing",
    shortName: "清理",
    icon: "🧹",
    tagline: "丢掉窗口内过时、可重新获取的工具输出",
    analogy: "把看过、随时能再查的资料从桌面收走",
    whatItDoes: "不碰用户消息和 Agent 推理，只把旧的工具返回换成占位符（observation masking）。需要时重新调工具拿新鲜数据。",
    whenToUse: "当前最佳实践首选——成本低、效果好，尤其适合工具调用密集的任务。",
    trigger: "约 60–70% 窗口；滚动保留最近 N 个工具结果",
    bestFor: ["读文件 / 搜代码", "可重新执行的命令", "JetBrains 实测省 50%+ 成本"],
    color: "teal",
  },
  {
    id: "memory",
    name: "外部记忆 Memory",
    shortName: "记忆",
    icon: "📁",
    tagline: "结构化记笔记，写到窗口之外的持久存储",
    analogy: "把重要结论归档进档案室，需要时再取回",
    whatItDoes: "信息移出上下文窗口，存到文件 / 数据库 / 向量库。跨会话存活，按语义或路径检索回来。",
    whenToUse: "跨会话延续、长期项目状态、压缩前的可逆备份。",
    trigger: "定期写入；压缩前先把完整历史存到别处",
    bestFor: ["progress.md / JSONL", "工作记忆 + 长期记忆分层", "子代理返回结构化摘要"],
    color: "cyan",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string; accent: string }> = {
  sky: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    ring: "ring-sky-500/40",
    accent: "bg-sky-500/20",
  },
  teal: {
    border: "border-teal-500/30",
    bg: "bg-teal-500/15",
    text: "text-teal-300",
    ring: "ring-teal-500/40",
    accent: "bg-teal-500/20",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/15",
    text: "text-cyan-300",
    ring: "ring-cyan-500/40",
    accent: "bg-cyan-500/20",
  },
};

/** 可视化：三种策略对上下文窗口的影响 */
function WindowVisualization({ active }: { active: Strategy }) {
  const segments =
    active === "compaction"
      ? [
          { label: "用户 + 推理", width: "w-[18%]", cls: "bg-sky-500/30 border-sky-500/40" },
          { label: "旧内容 → 摘要", width: "w-[52%]", cls: "bg-sky-500/50 border-sky-500/60 ring-1 ring-sky-400/50" },
          { label: "近期原文", width: "w-[30%]", cls: "bg-slate-500/20 border-white/10" },
        ]
      : active === "clearing"
        ? [
            { label: "用户 + 推理", width: "w-[25%]", cls: "bg-teal-500/25 border-teal-500/35" },
            { label: "旧工具 → 占位符", width: "w-[35%]", cls: "bg-teal-500/40 border-teal-500/50 ring-1 ring-teal-400/50" },
            { label: "最近 N 个工具结果", width: "w-[40%]", cls: "bg-slate-500/20 border-white/10" },
          ]
        : [
            { label: "窗口内精简上下文", width: "w-[35%]", cls: "bg-cyan-500/25 border-cyan-500/35" },
            { label: "→ 写出", width: "w-[15%]", cls: "bg-transparent border-dashed border-cyan-500/40 text-cyan-400" },
            { label: "progress.md / 向量库", width: "w-[50%]", cls: "bg-cyan-500/30 border-cyan-500/50 ring-1 ring-cyan-400/50" },
          ];

  return (
    <div className="mb-6 rounded-xl border border-white/5 bg-black/20 p-4">
      <div className="mb-2 text-center text-xs text-slate-400">上下文窗口示意</div>
      <div className="flex h-14 gap-1 overflow-hidden rounded-lg border border-white/10">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={cn(
              "flex items-center justify-center border px-1 text-center text-[10px] leading-tight text-slate-300 sm:text-xs",
              seg.width,
              seg.cls,
            )}
          >
            {seg.label}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        {active === "compaction" && "整窗压缩：旧轨迹变成摘要，窗口腾出新空间"}
        {active === "clearing" && "只清工具输出：推理链保留，陈旧 observation 换成占位符"}
        {active === "memory" && "信息移出窗口：持久化到外部，需要时再读回来"}
      </p>
    </div>
  );
}

export function ContextStrategyPicker() {
  const [active, setActive] = useState<Strategy>("clearing");
  const selected = STRATEGIES.find((s) => s.id === active) ?? STRATEGIES[1];
  const colors = colorMap[selected.color];

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2 sm:gap-3">
        {STRATEGIES.map((strategy) => {
          const c = colorMap[strategy.color];
          const isActive = active === strategy.id;
          return (
            <button
              key={strategy.id}
              type="button"
              onClick={() => setActive(strategy.id)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-4 text-center transition-all sm:px-5",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/5 bg-white/[0.02] hover:border-white/10",
              )}
            >
              <div className="mb-1 text-xl sm:text-2xl">{strategy.icon}</div>
              <div className={cn("text-xs font-semibold sm:text-sm", isActive ? c.text : "text-white")}>
                {strategy.shortName}
              </div>
            </button>
          );
        })}
      </div>

      <WindowVisualization active={active} />

      <div className={cn("glass rounded-2xl border p-6", colors.border)}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-xs text-slate-400">{selected.tagline}</p>
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-300">
          <span className="text-slate-400">比喻：</span>
          {selected.analogy}
        </p>

        <p className="mb-4 text-sm leading-relaxed text-slate-300">{selected.whatItDoes}</p>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
            <div className="mb-1 text-xs font-semibold text-slate-400">什么时候用</div>
            <p className="text-sm text-slate-300">{selected.whenToUse}</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
            <div className="mb-1 text-xs font-semibold text-slate-400">触发阈值</div>
            <p className="text-sm text-slate-300">{selected.trigger}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selected.bestFor.map((item) => (
            <span
              key={item}
              className={cn("rounded-lg border px-2.5 py-1 text-xs", colors.border, colors.accent, colors.text)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        一句话：<strong className="text-slate-300">压缩</strong>压整个窗口 ·{" "}
        <strong className="text-slate-300">清理</strong>丢可再取的陈旧数据 ·{" "}
        <strong className="text-slate-300">记忆</strong>移出窗口、跨会话存活
      </p>
    </div>
  );
}

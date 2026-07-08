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
  color: "sky" | "cyan";
}[] = [
  {
    id: "compaction",
    name: "压缩",
    shortName: "压缩",
    icon: "🗜️",
    tagline: "把一摞旧记录浓缩成一份摘要",
    analogy: "像把一整场会议的录音，浓缩成一页会议纪要。",
    whatItDoes:
      "把桌上所有旧对话、推理过程、查过的资料，整段缩成一份更短的摘要。AI 带着「之前发生过什么」继续干活，而不是背着全部原文。",
    whenToUse: "长段推理必须保住、桌子快满了、光靠清理已经不够用时。",
    trigger: "桌上大约堆到 70% 满的时候",
    bestFor: ["多轮深度推理", "要保留决策脉络", "子任务做完、思路理顺了"],
    color: "sky",
  },
  {
    id: "clearing",
    name: "清理工具结果",
    shortName: "清理",
    icon: "🧹",
    tagline: "把看过、随时能再查的资料从桌上收走",
    analogy: "像把已经翻过的参考书放回书架——需要时再拿，不必一直摊在桌上。",
    whatItDoes:
      "不动你的问题和 AI 的思考过程，只把旧的「查文件结果」「跑命令输出」换成一行占位符。需要时重新查一次，拿最新鲜的数据。",
    whenToUse: "首选办法——成本低、效果好，特别适合 AI 频繁查资料、跑命令的任务。",
    trigger: "桌上大约堆到 60–70% 满；只留最近几条工具结果",
    bestFor: ["读文件 / 搜代码", "能重新跑的命令", "日常最省钱的收拾法"],
    color: "cyan",
  },
  {
    id: "memory",
    name: "外部记忆",
    shortName: "记忆",
    icon: "📁",
    tagline: "把重要结论写进档案室，需要时再翻",
    analogy: "像把关键决定记进笔记本，桌上只留当前在做的那页。",
    whatItDoes:
      "把信息从 AI 的「眼前」挪到桌外的文件或数据库里。跨好几天的项目也能接着干——需要时按关键词或意思搜回来。",
    whenToUse: "跨天延续项目、要长期记住的事、压缩之前先把完整记录备份到别处。",
    trigger: "定期写入；压缩前先把完整历史存到文件里",
    bestFor: ["progress.md 笔记", "工作记忆 + 长期记忆", "小助手只带回摘要"],
    color: "cyan",
  },
];

const colorMap: Record<
  "sky" | "cyan",
  { border: string; bg: string; text: string; ring: string; accent: string; bar: string }
> = {
  sky: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    ring: "ring-sky-500/40",
    accent: "bg-sky-500/20",
    bar: "bg-sky-500/30 border-sky-500/40",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/15",
    text: "text-cyan-300",
    ring: "ring-cyan-500/40",
    accent: "bg-cyan-500/20",
    bar: "bg-cyan-500/30 border-cyan-500/50",
  },
};

/** 可视化：三种策略对上下文窗口的影响 */
function WindowVisualization({ active }: { active: Strategy }) {
  const segments =
    active === "compaction"
      ? [
          { label: "你的问题 + AI 思考", width: "w-[18%]", cls: "bg-sky-500/30 border-sky-500/40" },
          { label: "旧内容 → 摘要", width: "w-[52%]", cls: "bg-sky-500/50 border-sky-500/60 ring-1 ring-sky-400/50" },
          { label: "最近原文", width: "w-[30%]", cls: "bg-slate-500/20 border-white/10" },
        ]
      : active === "clearing"
        ? [
            { label: "你的问题 + AI 思考", width: "w-[25%]", cls: "bg-cyan-500/25 border-cyan-500/35" },
            { label: "旧结果 → 占位符", width: "w-[35%]", cls: "bg-cyan-500/40 border-cyan-500/50 ring-1 ring-cyan-400/50" },
            { label: "最近几条结果", width: "w-[40%]", cls: "bg-slate-500/20 border-white/10" },
          ]
        : [
            { label: "桌上精简内容", width: "w-[35%]", cls: "bg-cyan-500/25 border-cyan-500/35" },
            { label: "→ 写出", width: "w-[15%]", cls: "bg-transparent border-dashed border-cyan-500/40 text-cyan-400" },
            { label: "笔记文件 / 档案库", width: "w-[50%]", cls: "bg-cyan-500/30 border-cyan-500/50 ring-1 ring-cyan-400/50" },
          ];

  return (
    <div className="mb-6 rounded-2xl border border-white/5 bg-black/20 p-5">
      <div className="mb-3 text-center text-xs text-slate-500">AI 眼前能看到的东西（示意）</div>
      <div className="flex h-14 gap-1 overflow-hidden rounded-xl border border-white/10">
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
      <p className="mt-3 text-center text-xs text-slate-500">
        {active === "compaction" && "整段压缩：旧内容变成摘要，腾出桌面空间"}
        {active === "clearing" && "只清中间结果：思考过程保留，旧查询结果收走"}
        {active === "memory" && "移出桌面：重要内容写到文件里，需要时再读回来"}
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
                "flex-1 rounded-2xl border px-3 py-4 text-center transition-all sm:px-5",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/5 bg-white/[0.02] hover:border-sky-500/20 hover:bg-white/[0.04]",
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

      <div className={cn("glass rounded-3xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-5 flex items-center gap-3">
          <span className="text-2xl">{selected.icon}</span>
          <div>
            <h3 className={cn("text-lg font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-sm text-slate-500">{selected.tagline}</p>
          </div>
        </div>

        <p className="mb-4 text-base leading-relaxed text-slate-400">
          <span className="text-slate-500">生活类比：</span>
          {selected.analogy}
        </p>

        <p className="mb-5 text-base leading-relaxed text-slate-400">{selected.whatItDoes}</p>

        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
            <div className="mb-1 text-xs font-medium text-slate-500">什么时候用</div>
            <p className="text-sm leading-relaxed text-slate-300">{selected.whenToUse}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
            <div className="mb-1 text-xs font-medium text-slate-500">大概什么时候动手</div>
            <p className="text-sm leading-relaxed text-slate-300">{selected.trigger}</p>
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

      <p className="mt-5 text-center text-sm text-slate-500">
        一句话：
        <span className="text-slate-400">压缩</span>缩整桌 ·{" "}
        <span className="text-slate-400">清理</span>收走过时资料 ·{" "}
        <span className="text-slate-400">记忆</span>写到桌外、跨天也能翻
      </p>
    </div>
  );
}

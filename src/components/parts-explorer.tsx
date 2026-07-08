"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Part = {
  id: string;
  num: number;
  icon: string;
  name: string;
  tagline: string;
  detail: string;
  analogy: string;
  phase?: string;
  color: string;
};

const PARTS: Part[] = [
  {
    id: "loop",
    num: 1,
    icon: "💓",
    name: "智能体循环",
    tagline: "心跳，管一轮又一轮",
    detail: "TAO 循环：思考 → 行动 → 观察。装配上下文、调模型、解析输出；有工具就执行，结果塞回去，再来一轮。",
    analogy: "像心脏跳动，每次泵血把养分送到全身",
    phase: "手搓第 02 阶段",
    color: "violet",
  },
  {
    id: "context",
    num: 2,
    icon: "🧩",
    name: "上下文管理",
    tagline: "决定喂什么给大脑",
    detail: "不是把全部历史塞进去，而是主动决定留什么、丢什么、什么时候摘要。长任务要做压缩，保住任务状态又不炸预算。",
    analogy: "像厨师配菜，不是把冰箱全倒锅里",
    color: "blue",
  },
  {
    id: "tools",
    num: 3,
    icon: "🛠️",
    name: "技能 / 工具",
    tagline: "模型的手和脚",
    detail: "每个工具有名字、描述、参数 schema、执行函数。模型只返回调用请求，harness 校验后执行——防止提示词注入变任意代码执行。",
    analogy: "大脑下命令，身体真正动手",
    phase: "手搓第 01 阶段",
    color: "amber",
  },
  {
    id: "subagents",
    num: 4,
    icon: "👥",
    name: "子代理管理",
    tagline: "派分身并行干活",
    detail: "主代理可派出多个子代理并行探索、跑实验、委派子任务，避免污染主上下文。需要小型进程管理器：启动、看日志、取消、合并结果。",
    analogy: "项目经理派几个实习生分头调研",
    color: "cyan",
  },
  {
    id: "builtin",
    num: 5,
    icon: "📦",
    name: "内置技能",
    tagline: "开箱自带的能力",
    detail: "Claude Code 自带读文件、跑命令、编辑代码等 curated tool set，不用你从零注册每一个。",
    analogy: "手机出厂就有的相机、通讯录",
    color: "emerald",
  },
  {
    id: "persist",
    num: 6,
    icon: "💾",
    name: "会话持久化",
    tagline: "崩溃能恢复、跨会话记忆",
    detail: "短任务靠上下文；长任务必须写外部存储。典型做法：每步追加 JSONL 事件，崩溃后从断点恢复。",
    analogy: "游戏自动存档，断电不白打",
    phase: "手搓第 03 阶段",
    color: "rose",
  },
  {
    id: "prompt",
    num: 7,
    icon: "📝",
    name: "系统提示词装配",
    tagline: "动态拼上下文",
    detail: "系统提示词不是写死一段，而是每轮动态装配：稳定前缀 + 动态注入的项目上下文，还能利用提示词缓存省钱。",
    analogy: "每天穿同一套西装，但口袋里的便签天天换",
    color: "indigo",
  },
  {
    id: "hooks",
    num: 8,
    icon: "🪝",
    name: "生命周期钩子",
    tagline: "关键节点插检查",
    detail: "在调用工具前、提交前等节点插入检查。pre-commit、pre-tool-use 钩子，程序化抓错纠错。",
    analogy: "机场安检，上飞机前必过一道",
    phase: "手搓第 04 阶段",
    color: "orange",
  },
  {
    id: "guard",
    num: 9,
    icon: "🛡️",
    name: "权限 / 安全",
    tagline: "闸门",
    detail: "工具分风险等级（只读 / 花钱 / 破坏性），权限矩阵决定谁能调什么，破坏性操作要人工批准。工作区边界、预算限制。",
    analogy: "银行转账要密码 + 短信验证",
    color: "red",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
  violet: { border: "border-violet-500/30", bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/40" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/15", text: "text-blue-300", ring: "ring-blue-500/40" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/15", text: "text-amber-300", ring: "ring-amber-500/40" },
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/15", text: "text-cyan-300", ring: "ring-cyan-500/40" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40" },
  rose: { border: "border-rose-500/30", bg: "bg-rose-500/15", text: "text-rose-300", ring: "ring-rose-500/40" },
  indigo: { border: "border-indigo-500/30", bg: "bg-indigo-500/15", text: "text-indigo-300", ring: "ring-indigo-500/40" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/15", text: "text-orange-300", ring: "ring-orange-500/40" },
  red: { border: "border-red-500/30", bg: "bg-red-500/15", text: "text-red-300", ring: "ring-red-500/40" },
};

export function PartsExplorer() {
  const [active, setActive] = useState("loop");
  const selected = PARTS.find((p) => p.id === active) ?? PARTS[0];
  const colors = colorMap[selected.color];

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {PARTS.map((part) => {
          const c = colorMap[part.color];
          const isActive = active === part.id;
          return (
            <button
              key={part.id}
              type="button"
              onClick={() => setActive(part.id)}
              aria-pressed={isActive}
              aria-label={part.name}
              className={cn(
                "rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:p-4",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring, "scale-[1.02]")
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]",
              )}
            >
              <div className="mb-1 text-lg sm:text-xl">{part.icon}</div>
              <div className={cn("text-xs font-semibold sm:text-sm", isActive ? c.text : "text-white")}>
                {part.name}
              </div>
              <div className="mt-0.5 hidden text-[10px] text-slate-500 sm:block">{part.tagline}</div>
            </button>
          );
        })}
      </div>

      <div className={cn("glass rounded-2xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selected.icon}</span>
            <div>
              <div className="text-xs font-medium text-slate-500">零件 #{selected.num}</div>
              <h3 className={cn("text-lg font-semibold", colors.text)}>{selected.name}</h3>
            </div>
          </div>
          {selected.phase ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {selected.phase}
            </span>
          ) : null}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">{selected.detail}</p>
        <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-sm text-slate-400">
          <span className="text-slate-500">比喻：</span>
          {selected.analogy}
        </div>
      </div>
    </div>
  );
}

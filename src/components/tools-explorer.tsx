"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type View = "compare" | "discovery" | "code";
type CompareSide = "good" | "bad";

const VIEWS: { id: View; name: string; icon: string }[] = [
  { id: "compare", name: "好 vs 坏", icon: "⚖️" },
  { id: "discovery", name: "渐进式发现", icon: "🔍" },
  { id: "code", name: "编程式调用", icon: "💻" },
];

const COMPARE: Record<
  CompareSide,
  {
    label: string;
    icon: string;
    color: string;
    analogy: string;
    example: { name: string; schema: string; output: string };
    points: string[];
  }
> = {
  good: {
    label: "好工具",
    icon: "✅",
    color: "emerald",
    analogy: "像给新同事一张「任务清单」——一步做完一件事，参数写得明明白白。",
    example: {
      name: "asana_projects_search",
      schema: '{ "query": string, "limit": 1-50 }',
      output: "只返回项目名 + 状态，分页默认 10 条",
    },
    points: [
      "面向任务：一个工具 = agent 真正要做的一件事",
      "命名空间清晰：asana_projects_search，不会和 jira 搞混",
      "严格 schema：user_id 不叫 user，必填/枚举写死",
      "输出高信号：不带 UUID，失败用 isError 结构化返回",
    ],
  },
  bad: {
    label: "坏工具",
    icon: "❌",
    color: "red",
    analogy: "像把整本 API 手册撕成 20 张碎片扔给实习生——每片都「能用」，但没人知道先拿哪片。",
    example: {
      name: "get_user",
      schema: '{ "user": string }',
      output: "返回完整 JSON：UUID、created_at、internal_flags…",
    },
    points: [
      "原子端点堆砌：20 个 API 包 20 个工具，模型选花眼",
      "名字含糊：get_user 到底是 id 还是邮箱？",
      "schema 松散：参数叫 user，模型经常传错格式",
      "输出臃肿：25k token 上限轻松爆，异常直接崩循环",
    ],
  },
};

const DISCOVERY = {
  analogy: "像图书馆检索——不用把整栋楼的书都搬上桌，先搜「salesforce」，只拿相关书架的书。",
  steps: [
    { label: "工具定义超阈值", detail: "占上下文 1%–5% 时触发按需加载" },
    { label: "agent 调 search_tools", detail: '搜 "salesforce"，只加载匹配工具' },
    { label: "控制详细程度", detail: "只要名字 / 名字+描述 / 完整 schema" },
    { label: "按需塞进上下文", detail: "当前任务相关的工具才进 prompt" },
  ],
  tip: "OpenAI、Anthropic 已内置工具搜索，有平台能力可优先用。",
};

const CODE_MODE = {
  analogy: "像让模型写一段脚本去跑腿——脚本在沙箱里跑，只把最终结果带回来，中间过程不污染上下文。",
  steps: [
    { label: "模型生成代码", detail: "不直接调工具，而是写代码去调" },
    { label: "沙箱执行", detail: "代码在隔离环境里跑，有资源限制" },
    { label: "本地过滤", detail: "执行环境里先筛数据，再回传" },
    { label: "只返最终结果", detail: "省 token、降延迟，复杂逻辑一步完成" },
  ],
  tradeoff: "代价：需要安全沙箱 + 监控，运维复杂度上升，要权衡。",
};

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40" },
  red: { border: "border-red-500/30", bg: "bg-red-500/15", text: "text-red-300", ring: "ring-red-500/40" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/15", text: "text-amber-300", ring: "ring-amber-500/40" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/15", text: "text-orange-300", ring: "ring-orange-500/40" },
};

export function ToolsExplorer() {
  const [view, setView] = useState<View>("compare");
  const [side, setSide] = useState<CompareSide>("good");
  const selected = COMPARE[side];
  const colors = colorMap[selected.color];

  return (
    <div>
      {/* 顶层视图切换 */}
      <div className="mb-6 flex justify-center gap-2 sm:gap-3">
        {VIEWS.map((v) => {
          const isActive = view === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-4 text-center transition-all sm:px-4",
                isActive
                  ? "border-amber-500/40 bg-amber-500/15 ring-1 ring-amber-500/40"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10",
              )}
            >
              <div className="mb-1 text-xl sm:text-2xl">{v.icon}</div>
              <div className={cn("text-xs font-semibold sm:text-sm", isActive ? "text-amber-300" : "text-white")}>
                {v.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 好 vs 坏 */}
      {view === "compare" ? (
        <div>
          <div className="mb-6 flex justify-center gap-3">
            {(["good", "bad"] as CompareSide[]).map((s) => {
              const c = colorMap[COMPARE[s].color];
              const isActive = side === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  className={cn(
                    "rounded-xl border px-6 py-3 text-sm font-semibold transition-all",
                    isActive
                      ? cn(c.border, c.bg, "ring-1", c.ring, c.text)
                      : "border-white/5 bg-white/[0.02] text-white hover:border-white/10",
                  )}
                >
                  {COMPARE[s].icon} {COMPARE[s].label}
                </button>
              );
            })}
          </div>

          <div className={cn("glass rounded-2xl border p-6", colors.border)}>
            <p className="mb-4 text-sm text-slate-300">
              <span className="text-slate-500">比喻：</span>
              {selected.analogy}
            </p>

            <div className="mb-4 rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-xs">
              <div className="mb-2 text-slate-500">工具名</div>
              <div className={cn("mb-3 font-semibold", colors.text)}>{selected.example.name}</div>
              <div className="mb-2 text-slate-500">inputSchema</div>
              <div className="mb-3 text-slate-300">{selected.example.schema}</div>
              <div className="mb-2 text-slate-500">输出</div>
              <div className="text-slate-300">{selected.example.output}</div>
            </div>

            <ul className="space-y-2">
              {selected.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-sm text-slate-300">
                  <span className={colors.text}>·</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* 渐进式发现 */}
      {view === "discovery" ? (
        <div className="glass rounded-2xl border border-amber-500/30 p-6">
          <p className="mb-6 text-sm text-slate-300">
            <span className="text-slate-500">比喻：</span>
            {DISCOVERY.analogy}
          </p>
          <div className="space-y-3">
            {DISCOVERY.steps.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-xs font-bold text-amber-300">
                  {i + 1}
                </div>
                <div className="flex-1 rounded-lg border border-white/5 bg-black/20 px-4 py-3">
                  <div className="text-sm font-medium text-white">{step.label}</div>
                  <div className="mt-1 text-xs text-slate-400">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">{DISCOVERY.tip}</p>
        </div>
      ) : null}

      {/* 编程式调用 */}
      {view === "code" ? (
        <div className="glass rounded-2xl border border-orange-500/30 p-6">
          <p className="mb-6 text-sm text-slate-300">
            <span className="text-slate-500">比喻：</span>
            {CODE_MODE.analogy}
          </p>
          <div className="space-y-3">
            {CODE_MODE.steps.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/15 text-xs font-bold text-orange-300">
                  {i + 1}
                </div>
                <div className="flex-1 rounded-lg border border-white/5 bg-black/20 px-4 py-3">
                  <div className="text-sm font-medium text-white">{step.label}</div>
                  <div className="mt-1 text-xs text-slate-400">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-center text-xs text-orange-200">
            ⚠️ {CODE_MODE.tradeoff}
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type BenchmarkId = "swe" | "terminal" | "tau" | "agentbench";

const BENCHMARKS: {
  id: BenchmarkId;
  name: string;
  icon: string;
  domain: string;
  verifies: string;
  highlight: string;
  caveat?: string;
  color: string;
}[] = [
  {
    id: "swe",
    name: "SWE-bench Verified",
    icon: "🐛",
    domain: "软件工程",
    verifies: "真实 GitHub issue → 容器里跑补丁后的测试",
    highlight: "500 题人工筛过的高质量子集，SWE agent 的事实标准",
    caveat: "59% 失败可能是测试本身坏了；也有「靠记忆刷分」的质疑",
    color: "emerald",
  },
  {
    id: "terminal",
    name: "Terminal-Bench 2.0",
    icon: "💻",
    domain: "命令行",
    verifies: "真实终端里的长程、高难任务",
    highlight: "面向结果——只看 Docker 最终状态对不对，不管过程；Harbor 框架驱动",
    color: "cyan",
  },
  {
    id: "tau",
    name: "τ²-bench",
    icon: "🎧",
    domain: "客服（零售/航空/电信）",
    verifies: "多轮工具调用 + 数据库最终状态",
    highlight: "不仅看最终答案，还看 DB 状态；τ² 加了 pass^k 衡量多次尝试的可靠性",
    color: "violet",
  },
  {
    id: "agentbench",
    name: "AgentBench",
    icon: "🌐",
    domain: "多环境",
    verifies: "OS / DB / Web / 游戏等跨环境推理与决策",
    highlight: "测 agent 能不能在不同交互环境里「切换脑回路」",
    color: "amber",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string; badge: string }> = {
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40", badge: "bg-emerald-500/20 text-emerald-200" },
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/15", text: "text-cyan-300", ring: "ring-cyan-500/40", badge: "bg-cyan-500/20 text-cyan-200" },
  violet: { border: "border-violet-500/30", bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/40", badge: "bg-violet-500/20 text-violet-200" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/15", text: "text-amber-300", ring: "ring-amber-500/40", badge: "bg-amber-500/20 text-amber-200" },
};

export function EvalBenchmarkExplorer() {
  const [active, setActive] = useState<BenchmarkId>("swe");
  const selected = BENCHMARKS.find((b) => b.id === active) ?? BENCHMARKS[0];
  const colors = colorMap[selected.color];

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
        {BENCHMARKS.map((bench) => {
          const c = colorMap[bench.color];
          const isActive = active === bench.id;
          return (
            <button
              key={bench.id}
              type="button"
              onClick={() => setActive(bench.id)}
              className={cn(
                "rounded-xl border px-2 py-3 text-center transition-all sm:px-3 sm:py-4",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/5 bg-white/[0.02] hover:border-white/10",
              )}
            >
              <div className="mb-1 text-lg sm:text-xl">{bench.icon}</div>
              <div className={cn("text-xs font-semibold leading-tight sm:text-sm", isActive ? c.text : "text-white")}>
                {bench.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className={cn("glass rounded-2xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>{selected.name}</h3>
            <span className={cn("mt-1 inline-block rounded-md px-2 py-0.5 text-xs", colors.badge)}>
              {selected.domain}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">验证什么</div>
            <p className="text-slate-300">{selected.verifies}</p>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">为什么重要</div>
            <p className="text-slate-300">{selected.highlight}</p>
          </div>
          {selected.caveat ? (
            <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              ⚠️ {selected.caveat}
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        别迷信分数——趋势是<strong className="text-white"> 执行式验证 + 持续更新的基准</strong>，对异常高分保持怀疑
      </p>
    </div>
  );
}

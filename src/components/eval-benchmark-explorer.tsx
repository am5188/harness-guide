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
}[] = [
  {
    id: "swe",
    name: "SWE-bench Verified",
    icon: "🐛",
    domain: "软件工程",
    verifies: "给 AI 一个真实的 GitHub bug，看它能不能在容器里修好并通过测试。",
    highlight: "500 道人工筛过的高质量题，是测「AI 能不能当程序员」的事实标准。",
    caveat: "有审计发现近六成失败其实是测试本身坏了；也有人质疑 AI 靠「背答案」刷分。",
  },
  {
    id: "terminal",
    name: "Terminal-Bench 2.0",
    icon: "💻",
    domain: "命令行",
    verifies: "在真实终端里完成长程、高难度的命令行任务。",
    highlight: "只看最终 Docker 容器状态对不对，不管中间怎么折腾——像只看考试结果，不看草稿纸。",
  },
  {
    id: "tau",
    name: "τ²-bench",
    icon: "🎧",
    domain: "客服场景",
    verifies: "模拟零售/航空/电信客服：多轮对话 + 调工具，最后检查数据库状态对不对。",
    highlight: "不仅看嘴上答得好不好，还看后台数据有没有真的改对；τ² 还测多次尝试的稳定性。",
  },
  {
    id: "agentbench",
    name: "AgentBench",
    icon: "🌐",
    domain: "多环境",
    verifies: "在操作系统、数据库、网页、游戏等不同环境里切换，看 AI 能不能适应。",
    highlight: "测的是 AI 能不能在不同「考场」里灵活切换脑回路。",
  },
];

export function EvalBenchmarkExplorer() {
  const [active, setActive] = useState<BenchmarkId>("swe");
  const selected = BENCHMARKS.find((b) => b.id === active) ?? BENCHMARKS[0];

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {BENCHMARKS.map((bench) => {
          const isActive = active === bench.id;
          return (
            <button
              key={bench.id}
              type="button"
              onClick={() => setActive(bench.id)}
              className={cn(
                "rounded-2xl border px-2 py-3 text-center transition-all sm:px-3 sm:py-4",
                isActive
                  ? "border-sky-500/30 bg-sky-500/15 ring-1 ring-sky-500/40"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10",
              )}
            >
              <div className="mb-1 text-lg sm:text-xl">{bench.icon}</div>
              <div
                className={cn(
                  "text-xs font-semibold leading-tight sm:text-sm",
                  isActive ? "text-sky-300" : "text-white",
                )}
              >
                {bench.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className="glass rounded-3xl border border-sky-500/20 p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className="font-semibold text-sky-300">{selected.name}</h3>
            <span className="mt-1 inline-block rounded-lg bg-sky-500/15 px-2 py-0.5 text-xs text-sky-200">
              {selected.domain}
            </span>
          </div>
        </div>

        <div className="space-y-5 text-base">
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">考什么</div>
            <p className="leading-relaxed text-slate-400">{selected.verifies}</p>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">为什么重要</div>
            <p className="leading-relaxed text-slate-400">{selected.highlight}</p>
          </div>
          {selected.caveat ? (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm leading-relaxed text-slate-400">
              <span className="text-rose-400">注意：</span> {selected.caveat}
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        别迷信分数——看<span className="font-medium text-white">趋势</span>，对
        <span className="font-medium text-white">异常高分</span>保持怀疑。
      </p>
    </div>
  );
}

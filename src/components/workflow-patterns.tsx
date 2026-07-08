"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Pattern = {
  id: string;
  num: number;
  icon: string;
  name: string;
  tagline: string;
  flow: string[];
  when: string;
  benefit: string;
  analogy: string;
};

const PATTERNS: Pattern[] = [
  {
    id: "chain",
    num: 1,
    icon: "🔗",
    name: "提示链",
    tagline: "一步接一步，做完再做下一步",
    flow: ["你的问题", "第 1 步", "检查过关", "第 2 步", "第 3 步", "最终答案"],
    when: "任务能拆成固定的几步，顺序不会变——比如先列大纲、再写正文、最后润色。",
    benefit: "每一步只干一件事，更简单、更好查、出了问题也好定位。",
    analogy: "像做菜：先洗菜 → 切菜 → 下锅，顺序固定。",
  },
  {
    id: "route",
    num: 2,
    icon: "🚦",
    name: "路由",
    tagline: "先分诊，再派到对的窗口",
    flow: ["你的问题", "分诊台", "账单窗口", "技术窗口", "通用窗口"],
    when: "问题类型差很多，一套话术顾不过来——账单和技术不能混着答。",
    benefit: "各管各的：每个分支有自己的问法和工具，互不干扰。",
    analogy: "像医院分诊台：先看看你挂什么科，再转去对的诊室。",
  },
  {
    id: "parallel",
    num: 3,
    icon: "⚡",
    name: "并行化",
    tagline: "几路同时干，最后汇总",
    flow: ["任务", "工人 A", "工人 B", "工人 C", "汇总结果"],
    when: "需要多个角度一起看，或者纯粹想省时间——几块活互不依赖。",
    benefit: "同时跑，更快；或者多跑几次投票，选最好的那份。",
    analogy: "像三个朋友同时搜资料，最后把笔记合并成一份报告。",
  },
  {
    id: "orchestrator",
    num: 4,
    icon: "🎯",
    name: "编排者—工作者",
    tagline: "包工头看现场，再派工人",
    flow: ["任务", "包工头规划", "工人 1", "工人 2", "拼成答案"],
    when: "子任务没法提前定死——得看了具体内容才知道要拆成几块、谁干什么。",
    benefit: "比并行化更灵活：拆法随任务变，不是固定分工。",
    analogy: "像装修包工头：看了户型才决定先刷墙还是先铺地板。",
  },
  {
    id: "evaluator",
    num: 5,
    icon: "📝",
    name: "评估者—优化者",
    tagline: "写手出稿，审稿人打回改",
    flow: ["写手", "初稿", "审稿人", "修改意见", "再写", "达标"],
    when: "有清楚的打分标准，而且改一轮确实能变好——比如格式、语气、事实对不对。",
    benefit: "写完 → 审稿 → 改稿，循环到合格为止。",
    analogy: "像改作文：写完给老师看，打回再改，直到过关。",
  },
];

export function WorkflowPatterns() {
  const [active, setActive] = useState("chain");
  const selected = PATTERNS.find((p) => p.id === active) ?? PATTERNS[0];

  return (
    <div>
      <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
        {PATTERNS.map((pattern) => {
          const isActive = active === pattern.id;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => setActive(pattern.id)}
              className={cn(
                "rounded-2xl border p-3 text-left transition-all sm:p-4",
                isActive
                  ? "border-sky-500/30 bg-sky-500/15 ring-1 ring-sky-500/40"
                  : "border-white/5 bg-white/[0.02] hover:border-sky-500/20 hover:bg-white/[0.04]",
              )}
            >
              <div className="mb-1 text-lg sm:text-xl">{pattern.icon}</div>
              <div
                className={cn(
                  "text-xs font-semibold sm:text-sm",
                  isActive ? "text-sky-300" : "text-white",
                )}
              >
                {pattern.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 流程可视化 */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {selected.flow.map((step, i) => (
          <div key={`${selected.id}-${step}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span className="text-slate-600">→</span> : null}
            <div className="rounded-xl border border-sky-500/25 bg-sky-500/10 px-3 py-2 text-xs text-sky-200 sm:text-sm">
              {step}
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl border border-sky-500/20 p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="text-4xl">{selected.icon}</span>
          <div>
            <div className="text-sm text-slate-500">模式 #{selected.num}</div>
            <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
            <p className="text-sm text-slate-400">{selected.tagline}</p>
          </div>
        </div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-black/20 px-5 py-4">
            <div className="mb-2 text-sm font-medium text-sky-400">什么时候用</div>
            <p className="text-base leading-relaxed text-slate-300">{selected.when}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-black/20 px-5 py-4">
            <div className="mb-2 text-sm font-medium text-cyan-400">有什么好处</div>
            <p className="text-base leading-relaxed text-slate-300">{selected.benefit}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 px-5 py-4 text-base leading-relaxed text-slate-400">
          <span className="font-medium text-cyan-300">生活类比：</span>
          {selected.analogy}
        </div>
      </div>
    </div>
  );
}

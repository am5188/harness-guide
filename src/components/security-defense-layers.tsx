"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type DefenseId = "sandbox" | "least" | "human" | "egress" | "audit";

const DEFENSES: {
  id: DefenseId;
  name: string;
  icon: string;
  tagline: string;
  what: string;
  how: string;
  analogy: string;
}[] = [
  {
    id: "sandbox",
    name: "沙箱隔离",
    icon: "📦",
    tagline: "Sandboxing",
    what: "给 agent 画个圈，限定它能读什么、写什么、能不能上网。",
    how: "文件只读、网络禁通、进程隔开——多数 Harness 都支持，但常常是手动才开，应尽量默认开启。",
    analogy: "像给装修工划定施工区，锤子只能在围栏里挥，碰不到客厅贵重物品。",
  },
  {
    id: "least",
    name: "最小权限",
    icon: "🔑",
    tagline: "Least Privilege",
    what: "别给长期万能钥匙；按任务发短期通行证，用完就失效。",
    how: "高危操作 5–15 分钟过期，只读大约 1 小时，平时零常驻权限。默认只读，真要动手走窄工具白名单。",
    analogy: "像酒店房卡——只开一间房、退房就作废，不是能开所有门的总钥匙。",
  },
  {
    id: "human",
    name: "人工点头",
    icon: "🚦",
    tagline: "Human Gates",
    what: "删文件、发钱、改生产环境这类大事，必须你点「允许」才执行。",
    how: "Harness 暂停这一轮，弹窗等你确认——审批是 Harness 的开关，不和循环逻辑绑死。",
    analogy: "像银行大额转账要短信验证码——agent 可以「提议」，人不能缺席。",
  },
  {
    id: "egress",
    name: "出口过滤",
    icon: "🛡️",
    tagline: "Egress Filtering",
    what: "严格限制 agent 能把数据发到哪些地址。",
    how: "走代理 + 白名单：只有清单里的域名/IP 能出站，其余一律拦。堵住「偷数据发出去」这条路。",
    analogy: "像公司防火墙——内网电脑不能随意访问外网任意网站。",
  },
  {
    id: "audit",
    name: "全量记录",
    icon: "📋",
    tagline: "Audit",
    what: "记下每一次工具调用、每一次对外请求，出事能追溯。",
    how: "但要分清：能记录 ≠ 能阻止危害。审计是事后追责，不能代替沙箱和人工闸门。",
    analogy: "像监控录像——出了事能查，但拦不住正在发生的盗窃。",
  },
];

const colorMap: Record<DefenseId, { border: string; bg: string; text: string; ring: string }> = {
  sandbox: { border: "border-sky-500/30", bg: "bg-sky-500/15", text: "text-sky-300", ring: "ring-sky-500/40" },
  least: { border: "border-cyan-500/30", bg: "bg-cyan-500/15", text: "text-cyan-300", ring: "ring-cyan-500/40" },
  human: { border: "border-emerald-500/30", bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-500/40" },
  egress: { border: "border-sky-400/30", bg: "bg-sky-400/10", text: "text-sky-200", ring: "ring-sky-400/40" },
  audit: { border: "border-slate-400/30", bg: "bg-slate-500/15", text: "text-slate-300", ring: "ring-slate-400/40" },
};

export function SecurityDefenseLayers() {
  const [active, setActive] = useState<DefenseId>("sandbox");
  const selected = DEFENSES.find((d) => d.id === active) ?? DEFENSES[0];
  const colors = colorMap[selected.id];

  return (
    <div>
      <p className="mb-6 text-center text-sm text-slate-500">
        点选每一种防线，看 Harness 怎么兜底
      </p>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {DEFENSES.map((d) => {
          const c = colorMap[d.id];
          const isActive = active === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              className={cn(
                "glass rounded-2xl border px-3 py-3 text-center transition-all sm:px-4",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/10 hover:border-sky-500/20",
              )}
            >
              <div className="text-lg">{d.icon}</div>
              <div className={cn("text-xs font-semibold", isActive ? c.text : "text-white")}>
                {d.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className={cn("glass rounded-3xl border p-6 sm:p-8", colors.border)}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-xs text-slate-500">{selected.tagline}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-500">做什么</div>
            <p className="text-sm text-slate-400">{selected.what}</p>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-500">怎么做</div>
            <p className="text-sm text-slate-400">{selected.how}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
            <span className="text-xs text-slate-500">生活类比：</span>
            <span className="text-sm text-slate-400">{selected.analogy}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        核心思路：接受模型迟早会被骗，靠 Harness 层控制缩小「爆炸半径」
      </p>
    </div>
  );
}

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
    what: "给 agent 进程套边界，限制它能读/写/联网的范围。",
    how: "文件系统只读、网络禁通、进程隔离——多数 harness 已支持，但常是 opt-in，应尽量默认开启。",
    analogy: "像给工人划定施工围栏，锤子只能在围栏里挥。",
  },
  {
    id: "least",
    name: "最小权限",
    icon: "🔑",
    tagline: "Least Privilege",
    what: "别给长期 API Key 和宽 OAuth 范围；用按任务即时签发、短寿命的凭证。",
    how: "高危操作 5–15 分钟过期，只读约 1 小时，零常驻权限。默认只读，执行藏在窄的 allowlist 工具后面。",
    analogy: "像酒店房卡——只开一间房、只到退房失效，不是万能钥匙。",
  },
  {
    id: "human",
    name: "人工闸门",
    icon: "🚦",
    tagline: "Human Gates",
    what: "不可逆或高后果动作，强制人工确认后再执行。",
    how: "Harness 暂停 Turn，弹窗等用户点 Allow——审批策略是 Harness 层开关，不和循环逻辑绑死。",
    analogy: "像银行大额转账要短信验证码——agent 可以「提议」，人不能缺席。",
  },
  {
    id: "egress",
    name: "出口过滤",
    icon: "🛡️",
    tagline: "Egress Filtering",
    what: "严格限制 agent 能把数据发到哪些目的地。",
    how: "代理 + allowlist：只有白名单域名/IP 能出站，其余一律拦。堵住「偷数据发出去」这条路。",
    analogy: "像公司防火墙——内网机器不能随意访问外网任意地址。",
  },
  {
    id: "audit",
    name: "全量审计",
    icon: "📋",
    tagline: "Audit",
    what: "记录每一次工具调用、每一次出站请求，事后可追溯。",
    how: "但要分清：能记录 ≠ 能阻止危害。审计是事后追责，不能替代沙箱和闸门。",
    analogy: "像监控录像——出了事能查，但拦不住正在发生的盗窃。",
  },
];

const colorMap: Record<DefenseId, { border: string; bg: string; text: string; ring: string }> = {
  sandbox: { border: "border-blue-500/30", bg: "bg-blue-500/15", text: "text-blue-300", ring: "ring-blue-500/40" },
  least: { border: "border-violet-500/30", bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/40" },
  human: { border: "border-amber-500/30", bg: "bg-amber-500/15", text: "text-amber-300", ring: "ring-amber-500/40" },
  egress: { border: "border-cyan-500/30", bg: "bg-cyan-500/15", text: "text-cyan-300", ring: "ring-cyan-500/40" },
  audit: { border: "border-slate-400/30", bg: "bg-slate-500/15", text: "text-slate-300", ring: "ring-slate-400/40" },
};

export function SecurityDefenseLayers() {
  const [active, setActive] = useState<DefenseId>("sandbox");
  const selected = DEFENSES.find((d) => d.id === active) ?? DEFENSES[0];
  const colors = colorMap[selected.id];

  return (
    <div>
      <p className="mb-6 text-center text-sm text-slate-400">
        假设模型终将被攻破——用模型之外的控制缩小「爆炸半径」
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
                "rounded-xl border px-3 py-3 text-center transition-all sm:px-4",
                isActive
                  ? cn(c.border, c.bg, "ring-1", c.ring)
                  : "border-white/10 bg-white/[0.03] hover:border-white/20",
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

      <div className={cn("glass rounded-2xl border p-6", colors.border)}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{selected.icon}</span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>{selected.name}</h3>
            <p className="text-xs text-slate-400">{selected.tagline}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-500">做什么</div>
            <p className="text-sm text-slate-300">{selected.what}</p>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-500">怎么做</div>
            <p className="text-sm text-slate-300">{selected.how}</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
            <span className="text-xs text-slate-500">比喻：</span>
            <span className="text-sm text-slate-300">{selected.analogy}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Sophos 思路：接受模型会被攻破，靠 Harness 层控制兜底——别指望「提示模型忽略注入」
      </p>
    </div>
  );
}

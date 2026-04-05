import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Trophy, Calendar, TrendingDown, TrendingUp, Lightbulb } from "lucide-react";

import { useApp } from "../context/AppContext";
import { CASH_FLOW_DATA, PIE_COLORS } from "../data/mockData";
import CustomTooltip from "../components/CustomTooltip";
import SubscriptionManager from "../components/SubscriptionManager";
import WhatIfSimulator from "../components/WhatIfSimulator";

const now          = new Date();
const curYear      = now.getFullYear();
const curMonth     = now.getMonth() + 1;
const prevYear     = curMonth === 1 ? curYear - 1 : curYear;
const prevMonth    = curMonth === 1 ? 12 : curMonth - 1;
const CURRENT_PFX  = `${curYear}-${String(curMonth).padStart(2, "0")}`;
const PREVIOUS_PFX = `${prevYear}-${String(prevMonth).padStart(2, "0")}`;

export default function InsightsPage() {
  const { transactions, totalIncome, totalExpenses, spendingByCategory, fmt } = useApp();

  const thisMonthExpenses = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(CURRENT_PFX))
    .reduce((s, t) => s + t.amount, 0);

  const lastMonthExpenses = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(PREVIOUS_PFX))
    .reduce((s, t) => s + t.amount, 0);

  const currentMonthLabel = now.toLocaleString("en-IN", { month: "long", year: "numeric" });
  const topCategory = spendingByCategory[0];
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;
  const savedVsLast = thisMonthExpenses < lastMonthExpenses;
  const monthDiff   = Math.abs(thisMonthExpenses - lastMonthExpenses);

  const insightCards = [
    { icon: Trophy,       label: "Top Category",     value: topCategory?.name || "—",             sub: fmt(topCategory?.value || 0), color: "#fee2e2", accent: "#dc2626" },
    { icon: Calendar,     label: "This Month",        value: fmt(thisMonthExpenses),               sub: currentMonthLabel,            color: "#eff6ff", accent: "#2563eb" },
    { icon: savedVsLast ? TrendingDown : TrendingUp,
                          label: "vs Last Month",     value: savedVsLast ? "Saved" : "Spent more", sub: `${fmt(monthDiff)} diff`,    color: savedVsLast ? "#dcfce7" : "#fee2e2", accent: savedVsLast ? "#16a34a" : "#dc2626" },
    { icon: Lightbulb,    label: "Savings Rate",      value: `${savingsRate}%`,                    sub: "of income saved",            color: "#fef9c3", accent: "#ca8a04" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Insight cards */}
      <div className="fin-insight-row">
        {insightCards.map((card) => {
          const CardIcon = card.icon;
          return (
            <div key={card.label} className="fin-card fin-summary-card" style={{ borderRadius: 16, padding: "18px 18px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: card.color,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <CardIcon size={18} color={card.accent} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{card.label}</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: card.accent, marginBottom: 3,
                fontFamily: "'DM Sans', sans-serif", wordBreak: "break-all" }}>{card.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Subscription + What-If */}
      <div className="fin-widget-row">
        <SubscriptionManager />
        <WhatIfSimulator />
      </div>

      {/* Pie + bar breakdown */}
      <div className="fin-widget-row">
        <div className="fin-widget" style={{ flex: 1, minWidth: 260, padding: "20px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Spending by Category</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={spendingByCategory} cx="50%" cy="50%" outerRadius={85} paddingAngle={3} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {spendingByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="fin-widget" style={{ flex: 1, minWidth: 260, padding: "20px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Category Breakdown</div>
          {spendingByCategory.map((c, i) => {
            const max = spendingByCategory[0]?.value || 1;
            return (
              <div key={c.name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{c.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>{fmt(c.value)}</span>
                </div>
                <div style={{ height: 6, background: "var(--bg-hover)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(c.value / max) * 100}%`,
                    background: PIE_COLORS[i % PIE_COLORS.length], borderRadius: 10, transition: "width 0.6s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly income vs expenses chart */}
      <div className="fin-widget" style={{ padding: "20px 20px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
          Monthly Income vs Expenses
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={CASH_FLOW_DATA.slice(-6)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f87171" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} width={46} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} />
            <Area type="monotone" dataKey="income"   name="Income"   stroke="#22c55e" strokeWidth={2.5} fill="url(#incG)" dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f87171" strokeWidth={2.5} fill="url(#expG)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
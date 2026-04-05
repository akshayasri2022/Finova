import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

import { useApp } from "../context/AppContext";
import { CASH_FLOW_DATA, PIE_COLORS, TOTAL_BALANCE } from "../data/mockData";
import SummaryCard from "../components/SummaryCard";
import CustomTooltip from "../components/CustomTooltip";
import TransactionRow from "../components/TransactionRow";
import SafeToSpend from "../components/SafeToSpend";
import GoalRings from "../components/GoalRings";

const RANGES = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12, "All": 12 };

function PillButton({ active, onClick, label }) {
  return (
    <button className="fin-pill"
      onClick={onClick}
      style={{
        padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
        background: active ? "#2563eb" : "var(--bg-hover)",
        color: active ? "#fff" : "var(--text-secondary)",
        fontSize: 13, fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

export default function DashboardPage() {
  const {
    transactions, totalIncome, totalExpenses, spendingByCategory,
    setActiveNav, fmt, fmtFull, currencyConfig, role, demoMode,
  } = useApp();

  const [chartRange, setChartRange] = useState("All");
  const chartData = CASH_FLOW_DATA.slice(-RANGES[chartRange]);

  return (
    <>
      {/* Summary Cards — responsive grid */}
      <div className="fin-summary-row">
        <SummaryCard
          label="Available Balance"
          value={fmt(TOTAL_BALANCE)}
          subValue={fmtFull(750087.44)}
          subLabel="all time"
        />
        <SummaryCard
          label="Total Income"
          value={fmt(totalIncome)}
          subValue={`+${fmt(totalIncome)}`}
          subLabel="this month"
          trend="10%" trendUp={true}
        />
        <SummaryCard
          label="Total Expenses"
          value={fmt(totalExpenses)}
          subValue={`+${fmt(totalExpenses)}`}
          subLabel="this month"
          trend="5%" trendUp={false}
        />
      </div>

      {/* SafeToSpend + GoalRings */}
      <div className="fin-widget-row">
        <SafeToSpend />
        <GoalRings />
      </div>

      {/* Cash Flow Chart */}
      <div className="fin-widget" style={{ padding: "24px 20px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
            Cash Flow
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }} className="fin-pill-group">
            {Object.keys(RANGES).map((r) => (
              <PillButton key={r} active={chartRange === r} onClick={() => setChartRange(r)} label={r} />
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month"
              tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
              axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
              axisLine={false} tickLine={false}
              tickFormatter={(v) => `${currencyConfig.symbol}${((v * currencyConfig.rate) / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="balance"  name="Balance"  stroke="#2563eb" strokeWidth={2.5} fill="url(#balanceGrad)" dot={false} />
            <Area type="monotone" dataKey="income"   name="Income"   stroke="#22c55e" strokeWidth={2}   fill="url(#incomeGrad)"  dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f87171" strokeWidth={2}   fill="none" dot={false} strokeDasharray="4 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row — recent tx + pie */}
      <div className="fin-bottom-row">
        <div className="fin-widget fin-tx-panel" style={{ padding: "20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
              Recent Transactions
            </div>
            <button onClick={() => setActiveNav("transactions")}
              style={{ background: "none", border: "none", color: "#2563eb", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              View all →
            </button>
          </div>
          {transactions.slice(0, 5).map((tx) => (
            <TransactionRow key={tx.id} tx={tx}
              role={demoMode ? "viewer" : role}
              onEdit={() => {}} onDelete={() => {}} />
          ))}
        </div>

        <div className="fin-widget fin-pie-panel" style={{ padding: "20px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
            Spending Breakdown
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={spendingByCategory} cx="50%" cy="50%" innerRadius={46} outerRadius={75} paddingAngle={3} dataKey="value">
                {spendingByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
            {spendingByCategory.slice(0, 4).map((c, i) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 3, background: PIE_COLORS[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
                  {fmt(c.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
import { ShieldCheck, TrendingDown, Calendar } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SafeToSpend() {
  const { safeToSpend, totalIncome, totalExpenses, fmt, subscriptions } = useApp();

  const balance = totalIncome - totalExpenses;
  const upcomingBills = subscriptions.reduce((s, t) => s + t.amount, 0);
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - now.getDate();
  const avgDailySpend = totalExpenses / now.getDate() || 0;
  const projectedSpend = avgDailySpend * daysLeft;
  const safePercent = Math.min(100, Math.round((safeToSpend / balance) * 100)) || 0;

  const getColor = () => {
    if (safePercent > 60) return { main: "#16a34a", bg: "#dcfce7", light: "#bbf7d0" };
    if (safePercent > 30) return { main: "#d97706", bg: "#fef3c7", light: "#fde68a" };
    return { main: "#dc2626", bg: "#fee2e2", light: "#fecaca" };
  };
  const color = getColor();

  return (
    <div className="fin-widget" style={{ padding: "20px 20px", flex: 1, minWidth: 260 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color.bg, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShieldCheck size={18} color={color.main} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
            Safe to Spend
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
            After bills & projected spend
          </div>
        </div>
      </div>

      <div style={{ fontSize: 30, fontWeight: 700, color: color.main, letterSpacing: "-1px",
        marginBottom: 6, fontFamily: "'DM Sans', sans-serif", wordBreak: "break-all" }}>
        {fmt(safeToSpend)}
      </div>

      <div style={{ height: 7, background: "var(--bg-hover)", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ height: "100%", width: `${safePercent}%`,
          background: `linear-gradient(90deg, ${color.light}, ${color.main})`,
          borderRadius: 10, transition: "width 1s ease" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Calendar size={13} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
              Upcoming bills
            </span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", fontFamily: "'DM Sans', sans-serif" }}>
            -{fmt(upcomingBills)}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TrendingDown size={13} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
              Projected ({daysLeft}d left)
            </span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#d97706", fontFamily: "'DM Sans', sans-serif" }}>
            -{fmt(projectedSpend)}
          </span>
        </div>
      </div>
    </div>
  );
}
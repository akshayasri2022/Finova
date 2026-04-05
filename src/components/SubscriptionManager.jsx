import { RefreshCw, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";

function daysUntilNext(billingDay) {
  const now = new Date();
  const today = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  if (billingDay > today) return billingDay - today;
  return daysInMonth - today + billingDay;
}

const CATEGORY_COLORS = {
  Entertainment: "#8B5CF6", Utilities: "#F59E0B", Health: "#10B981",
  Housing: "#6366F1", Food: "#3B82F6",
};

export default function SubscriptionManager() {
  const { subscriptions, fmt } = useApp();
  const totalMonthly = subscriptions.reduce((s, t) => s + t.amount, 0);

  if (subscriptions.length === 0) {
    return (
      <div className="fin-widget" style={{ padding: "20px 20px", flex: 1, minWidth: 260 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Subscriptions</div>
        <div style={{ color: "var(--text-muted)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>No recurring transactions found.</div>
      </div>
    );
  }

  return (
    <div className="fin-widget" style={{ padding: "20px 20px", flex: 1, minWidth: 260 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>Subscriptions</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
            {subscriptions.length} active · {fmt(totalMonthly)}/mo
          </div>
        </div>
        <div style={{ background: "#fee2e2", borderRadius: 10, padding: "5px 10px",
          fontSize: 12, fontWeight: 700, color: "#dc2626", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
          {fmt(totalMonthly * 12)}/yr
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {subscriptions.map(sub => {
          const daysLeft = sub.billingDay ? daysUntilNext(sub.billingDay) : null;
          const catColor = CATEGORY_COLORS[sub.category] || "#64748b";
          const urgent = daysLeft !== null && daysLeft <= 5;

          return (
            <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: 10,
              padding: "11px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: catColor + "18",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <RefreshCw size={14} color={catColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)",
                  fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {sub.description}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1, fontFamily: "'DM Sans', sans-serif" }}>
                  {sub.category}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
                  {fmt(sub.amount)}
                </div>
                {daysLeft !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", marginTop: 2 }}>
                    <Clock size={10} color={urgent ? "#dc2626" : "var(--text-muted)"} />
                    <span style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif",
                      color: urgent ? "#dc2626" : "var(--text-muted)", fontWeight: urgent ? 700 : 400 }}>
                      {daysLeft === 0 ? "Due today" : `${daysLeft}d`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
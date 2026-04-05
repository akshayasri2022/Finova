export default function SummaryCard({ label, value, subValue, subLabel, trend, trendUp }) {
  return (
    <div className="fin-card fin-summary-card fin-fade-up" style={{ borderRadius: 16, padding: "20px 22px" }}>
      <div style={{
        color: "var(--text-muted)", fontSize: 12, fontWeight: 500,
        marginBottom: 8, fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
        <span style={{
          fontSize: 26, fontWeight: 700, color: "var(--text-primary)",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: "-1px",
          wordBreak: "break-all",
        }}>
          {value}
        </span>

        {trend && (
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 7px", borderRadius: 20,
            background: trendUp ? "#dcfce7" : "#fee2e2",
            color: trendUp ? "#16a34a" : "#dc2626",
            display: "flex", alignItems: "center", gap: 3, flexShrink: 0,
          }}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>

      <div style={{ color: "var(--text-muted)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{subValue}</span>{" "}{subLabel}
      </div>
    </div>
  );
}
import { useApp } from "../context/AppContext";

export default function CustomTooltip({ active, payload, label }) {
  const { fmt } = useApp(); // ✅ was: import { fmt } from "../utils/formatters" — hardcoded INR

  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: "#1e293b",
      borderRadius: 12,
      padding: "14px 18px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      minWidth: 180,
    }}>
      <div style={{
        color: "#94a3b8", fontSize: 12,
        marginBottom: 10, fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </div>

      {payload.map((p) => (
        <div
          key={p.name}
          style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 4 }}
        >
          <span style={{ color: "#94a3b8", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            {p.name}
          </span>
          <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            {fmt(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
import { useState } from "react";
import { Sliders, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function WhatIfSimulator() {
  const { spendingByCategory, fmt } = useApp();
  const [selectedCat, setSelectedCat] = useState(spendingByCategory[0]?.name || "");
  const [reduction, setReduction] = useState(20);

  const expenseCategories = spendingByCategory.filter(c => c.name !== "Income");
  const selected = expenseCategories.find(c => c.name === selectedCat);
  const monthlySaving = selected ? (selected.value * reduction) / 100 : 0;
  const yearlySaving = monthlySaving * 12;

  return (
    <div className="fin-widget" style={{ padding: "20px 20px", flex: 1, minWidth: 260 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-active)", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sliders size={16} color="var(--accent)" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
            What-If Simulator
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
            Adjust spending to see savings
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)",
          display: "block", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Category</label>
        <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} style={{
          width: "100%", padding: "10px 12px", border: "1.5px solid var(--border-input)",
          borderRadius: 10, fontSize: 13, background: "var(--bg-card)", color: "var(--text-primary)",
          fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none", minHeight: 44,
        }}>
          {expenseCategories.map(c => (
            <option key={c.name} value={c.name}>{c.name} ({fmt(c.value)})</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
            Reduce by
          </label>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Sans', sans-serif" }}>
            {reduction}%
          </span>
        </div>
        <input type="range" min="5" max="90" step="5" value={reduction}
          onChange={e => setReduction(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer", height: 4 }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>5%</span>
          <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>90%</span>
        </div>
      </div>

      <div style={{ background: "var(--bg-hover)", borderRadius: 14, padding: "16px 18px",
        border: "1px solid var(--border-input)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <TrendingUp size={15} color="#16a34a" />
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)",
            fontFamily: "'DM Sans', sans-serif" }}>
            Reduce {selectedCat} by {reduction}%
          </span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>
              Monthly saving
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#16a34a", fontFamily: "'DM Sans', sans-serif", wordBreak: "break-all" }}>
              {fmt(monthlySaving)}
            </div>
          </div>
          <div style={{ width: 1, background: "var(--border-input)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>
              Yearly saving
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", wordBreak: "break-all" }}>
              {fmt(yearlySaving)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
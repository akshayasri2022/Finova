import { useState } from "react";
import { useApp } from "../context/AppContext";
import { RefreshCw } from "lucide-react";

const CATEGORIES = ["Food", "Entertainment", "Utilities", "Health", "Shopping", "Transport", "Housing", "Income"];

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid var(--border-input)",
  borderRadius: 10,
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  background: "var(--bg-card)",
  color: "var(--text-primary)",
  minHeight: 44,
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: 6,
  fontFamily: "'DM Sans', sans-serif",
};

export default function AddEditModal({ tx, onSave, onClose }) {
  const { currencyConfig } = useApp();

  const [form, setForm] = useState(
    tx
      ? { ...tx, isRecurring: tx.tags?.includes("recurring") || false, billingDay: tx.billingDay || "" }
      : {
          date: new Date().toISOString().split("T")[0],
          description: "", category: "Food", type: "expense",
          amount: "", isRecurring: false, billingDay: "",
        }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.description.trim() || !form.amount) return;
    const baseTags = (tx?.tags || []).filter(t => t !== "recurring");
    const tags = form.isRecurring ? [...baseTags, "recurring"] : baseTags;
    onSave({
      ...form,
      amount: parseFloat(form.amount) || 0,
      tags,
      billingDay: form.isRecurring && form.billingDay ? parseInt(form.billingDay) : undefined,
    });
    onClose();
  };

  return (
    <div className="fin-modal-wrap" onClick={onClose}>
      <div className="fin-modal-inner" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "var(--text-primary)", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          {tx?.id ? "Edit Transaction" : "Add Transaction"}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Description</label>
          <input type="text" value={form.description} onChange={(e) => set("description", e.target.value)}
            placeholder="e.g. Netflix, Rent, Grocery Store" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Amount ({currencyConfig.symbol})</label>
          <input type="number" value={form.amount} onChange={(e) => set("amount", e.target.value)}
            placeholder="0.00" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Date</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} style={inputStyle} />
        </div>

        {/* Category + Type — side by side on desktop, stacked on mobile */}
        <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={labelStyle}>Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Recurring toggle */}
        <div style={{ marginBottom: form.isRecurring ? 14 : 22 }}>
          <label style={labelStyle}>Subscription / Recurring</label>
          <button onClick={() => set("isRecurring", !form.isRecurring)} style={{
            width: "100%", padding: "10px 14px", minHeight: 44,
            border: `1.5px solid ${form.isRecurring ? "#2563eb" : "var(--border-input)"}`,
            borderRadius: 10, cursor: "pointer",
            background: form.isRecurring ? "#eff6ff" : "var(--bg-hover)",
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
          }}>
            <RefreshCw size={15} color={form.isRecurring ? "#2563eb" : "var(--text-muted)"} />
            <span style={{ fontSize: 13, fontWeight: 600,
              color: form.isRecurring ? "#2563eb" : "var(--text-muted)", flex: 1, textAlign: "left" }}>
              {form.isRecurring ? "Recurring — in Subscriptions" : "Mark as recurring"}
            </span>
            <div style={{ width: 36, height: 20, borderRadius: 10,
              background: form.isRecurring ? "#2563eb" : "var(--border-input)",
              position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: form.isRecurring ? 18 : 3,
                width: 14, height: 14, borderRadius: "50%", background: "#fff",
                transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
          </button>
        </div>

        {form.isRecurring && (
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>
              Billing Day
              <span style={{ fontWeight: 400, color: "var(--text-muted)", marginLeft: 6 }}>(for countdown timer)</span>
            </label>
            <input type="number" min="1" max="31" value={form.billingDay}
              onChange={(e) => set("billingDay", e.target.value)}
              placeholder="e.g. 15 (billed on the 15th)" style={inputStyle} />
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 12, minHeight: 48,
            border: "1.5px solid var(--border-input)", borderRadius: 12,
            background: "transparent", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            color: "var(--text-secondary)",
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            flex: 1, padding: 12, minHeight: 48,
            border: "none", borderRadius: 12, background: "#2563eb", color: "#fff",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}
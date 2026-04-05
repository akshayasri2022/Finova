import { useState, useEffect, useRef, useCallback } from "react";
import { Search, LayoutDashboard, CreditCard, BarChart2, Plus, Filter, X, ArrowRight, Command } from "lucide-react";
import { useApp } from "../context/AppContext";

const COMMANDS = [
  { id: "nav-dashboard",    icon: LayoutDashboard, label: "Go to Dashboard",        category: "Navigate",    action: "nav",    value: "dashboard" },
  { id: "nav-transactions", icon: CreditCard,       label: "Go to Transactions",     category: "Navigate",    action: "nav",    value: "transactions" },
  { id: "nav-insights",     icon: BarChart2,        label: "Go to Insights",         category: "Navigate",    action: "nav",    value: "insights" },
  { id: "add-transaction",  icon: Plus,             label: "Add New Transaction",    category: "Actions",     action: "add",    value: null },
  { id: "filter-food",      icon: Filter,           label: "Filter: Food",           category: "Filter",      action: "filter", value: "Food" },
  { id: "filter-housing",   icon: Filter,           label: "Filter: Housing",        category: "Filter",      action: "filter", value: "Housing" },
  { id: "filter-health",    icon: Filter,           label: "Filter: Health",         category: "Filter",      action: "filter", value: "Health" },
  { id: "filter-shopping",  icon: Filter,           label: "Filter: Shopping",       category: "Filter",      action: "filter", value: "Shopping" },
  { id: "filter-transport", icon: Filter,           label: "Filter: Transport",      category: "Filter",      action: "filter", value: "Transport" },
  { id: "filter-entertainment", icon: Filter,       label: "Filter: Entertainment",  category: "Filter",      action: "filter", value: "Entertainment" },
  { id: "filter-income",    icon: Filter,           label: "Filter: Income",         category: "Filter",      action: "filter", value: "Income" },
  { id: "currency-inr",     icon: null,             label: "Switch to ₹ INR",        category: "Currency",    action: "currency", value: "INR", emoji: "₹" },
  { id: "currency-usd",     icon: null,             label: "Switch to $ USD",        category: "Currency",    action: "currency", value: "USD", emoji: "$" },
  { id: "currency-eur",     icon: null,             label: "Switch to € EUR",        category: "Currency",    action: "currency", value: "EUR", emoji: "€" },
];

const CATEGORY_ORDER = ["Navigate", "Actions", "Filter", "Currency"];

export default function CommandPalette({ onAddTransaction }) {
  const { setActiveNav, setDrillCategory, setCurrency, role, demoMode } = useApp();
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState("");
  const [cursor,  setCursor]  = useState(0);
  const inputRef = useRef(null);

  // Open on Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setCursor(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  // Group by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = filtered.filter(c => c.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const execute = useCallback((cmd) => {
    setOpen(false);
    setQuery("");
    switch (cmd.action) {
      case "nav":
        setActiveNav(cmd.value);
        break;
      case "filter":
        setDrillCategory(cmd.value);
        setActiveNav("transactions");
        break;
      case "currency":
        setCurrency(cmd.value);
        break;
      case "add":
        if (role === "admin" && !demoMode) onAddTransaction?.();
        else alert("Switch to Admin role and disable Demo Mode to add transactions.");
        break;
    }
  }, [setActiveNav, setDrillCategory, setCurrency, role, demoMode, onAddTransaction]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => Math.min(c + 1, flatFiltered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
      if (e.key === "Enter" && flatFiltered[cursor]) execute(flatFiltered[cursor]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, cursor, flatFiltered, execute]);

  if (!open) return null;

  let globalIdx = 0;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "15vh",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 560, maxWidth: "90vw",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          overflow: "hidden",
          animation: "paletteIn 0.18s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`
          @keyframes paletteIn { from { opacity: 0; transform: scale(0.96) translateY(-8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          .palette-item:hover { background: #f1f5f9 !important; }
        `}</style>

        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <Search size={18} color="#94a3b8" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setCursor(0); }}
            placeholder="Type a command or search..."
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: 15, color: "#0f172a",
              fontFamily: "'DM Sans', sans-serif",
              background: "transparent",
            }}
          />
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={16} color="#94a3b8" />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 360, overflowY: "auto", padding: "8px 0" }}>
          {Object.entries(grouped).length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
              No commands found for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div style={{ padding: "6px 20px 4px", fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>
                  {cat}
                </div>
                {items.map(cmd => {
                  const idx = globalIdx++;
                  const isActive = cursor === idx;
                  const CmdIcon = cmd.icon;
                  return (
                    <div
                      key={cmd.id}
                      className="palette-item"
                      onClick={() => execute(cmd)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 20px", cursor: "pointer",
                        background: isActive ? "#f1f5f9" : "transparent",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={() => setCursor(idx)}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        background: isActive ? "#eff6ff" : "#f8fafc",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 700,
                        color: isActive ? "#2563eb" : "#64748b",
                      }}>
                        {cmd.emoji
                          ? <span>{cmd.emoji}</span>
                          : CmdIcon ? <CmdIcon size={15} /> : null
                        }
                      </div>
                      <span style={{ flex: 1, fontSize: 14, color: "#0f172a", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                        {cmd.label}
                      </span>
                      {isActive && <ArrowRight size={14} color="#2563eb" />}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "10px 20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 16 }}>
          {[["↑↓", "navigate"], ["↵", "select"], ["esc", "close"]].map(([key, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <kbd style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 5, padding: "2px 7px", fontSize: 11, fontFamily: "monospace", color: "#475569" }}>{key}</kbd>
              <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Trigger button to show in header
export function CommandPaletteButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }))}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 14px",
        background: "#f1f5f9",
        border: "1.5px solid #e2e8f0",
        borderRadius: 10, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#e2e8f0"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#f1f5f9"; }}
    >
      <Command size={14} color="#64748b" />
      <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>Search</span>
      <kbd style={{ background: "#e2e8f0", border: "1px solid #cbd5e1", borderRadius: 4, padding: "1px 5px", fontSize: 10, fontFamily: "monospace", color: "#475569" }}>⌘K</kbd>
    </button>
  );
}
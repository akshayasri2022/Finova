import { CATEGORY_COLORS } from "../data/mockData";
import { categoryIcon } from "../utils/formatters";
import { Utensils, Tv, Zap, HeartPulse, ShoppingBag, Car, Home, Bookmark, Wallet } from "lucide-react";
import { useApp } from "../context/AppContext";

const ICON_MAP = { Utensils, Tv, Zap, HeartPulse, ShoppingBag, Car, Home, Bookmark };

export default function TransactionRow({ tx, role, onEdit, onDelete }) {
  const { fmtFull } = useApp(); // ✅ was: import { fmtFull } from "../utils/formatters" — hardcoded INR

  const catColor = CATEGORY_COLORS[tx.category] || "#64748b";
  const IconComponent = ICON_MAP[categoryIcon(tx.category)] || Bookmark;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid #f1f5f9",
      gap: 12,
    }}>
      {/* Icon */}
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: catColor + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {tx.type === "income"
          ? <Wallet size={16} color={catColor} />
          : <IconComponent size={16} color={catColor} />
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 600, fontSize: 14, color: "#0f172a",
          fontFamily: "'DM Sans', sans-serif",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {tx.description}
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
          {tx.date} · {tx.category}
        </div>
      </div>

      {/* Amount — fmtFull from context, respects currency switcher */}
      <div style={{
        fontWeight: 700, fontSize: 15,
        fontFamily: "'DM Sans', sans-serif",
        color: tx.type === "income" ? "#16a34a" : "#0f172a",
        flexShrink: 0,
      }}>
        {tx.type === "income" ? "+" : "-"}{fmtFull(tx.amount)}
      </div>

      {/* Admin actions */}
      {role === "admin" && (
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => onEdit(tx)}
            style={{
              background: "#f1f5f9", border: "none", borderRadius: 8,
              padding: "5px 10px", cursor: "pointer", fontSize: 12,
              color: "#475569", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(tx.id)}
            style={{
              background: "#fee2e2", border: "none", borderRadius: 8,
              padding: "5px 10px", cursor: "pointer", fontSize: 12,
              color: "#dc2626", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Del
          </button>
        </div>
      )}
    </div>
  );
}
import { LayoutDashboard, CreditCard, BarChart2, FlaskConical, LogOut, Shield, Eye, Sun, Moon, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import logotext from "../assets/logotext.png";
import "../global.css";

const NAV_ITEMS = [
  { key: "dashboard",    icon: LayoutDashboard, label: "Dashboard"    },
  { key: "transactions", icon: CreditCard,       label: "Transactions" },
  { key: "insights",     icon: BarChart2,        label: "Insights"     },
];

const CURRENCIES = ["INR", "USD", "EUR"];
const CURRENCY_LABELS = { INR: "₹", USD: "$", EUR: "€" };

export default function Sidebar({ onLogout, isOpen, onClose }) {
  const { activeNav, setActiveNav, role, currency, setCurrency, demoMode, setDemoMode } = useApp();
  const { isDark, toggle: toggleTheme } = useTheme();

  const navItemStyle = (key) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px", borderRadius: 10, cursor: "pointer",
    fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
    background: activeNav === key ? "var(--bg-active)" : "transparent",
    color: activeNav === key ? "var(--text-active)" : "var(--text-secondary)",
    border: "none", width: "100%", textAlign: "left",
    flexShrink: 0, minHeight: 44,
  });

  return (
    <aside className={`fin-sidebar${isOpen ? " sidebar-open" : ""}`}>

      {/* Logo row */}
      <div style={{ padding: "16px 8px 14px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logo} alt="Finova" style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0 }} />
            <img src={logotext} alt="FINOVA" style={{
              marginLeft: -8, height: 26, objectFit: "contain",
              filter: isDark ? "brightness(0) invert(1)"
                : "brightness(0) saturate(100%) invert(18%) sepia(15%) saturate(500%) hue-rotate(180deg) brightness(90%)",
              transition: "filter 0.3s ease",
            }} />
          </div>

          {/* Close btn — only visible on mobile */}
          <button
            onClick={onClose}
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: 6, borderRadius: 8,
              color: "var(--text-muted)", flexShrink: 0,
            }}
            className="fin-sidebar-close"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <style>{`
          @media (max-width: 1024px) { .fin-sidebar-close { display: flex !important; } }
        `}</style>

        {/* Role badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 9px", borderRadius: 20,
          background: role === "admin" ? "var(--bg-active)" : "var(--bg-hover)",
          border: `1px solid ${role === "admin" ? "var(--accent)" : "var(--border-input)"}`,
        }}>
          {role === "admin" ? <Shield size={10} color="var(--accent)" /> : <Eye size={10} color="var(--text-secondary)" />}
          <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            color: role === "admin" ? "var(--accent)" : "var(--text-secondary)" }}>
            {role === "admin" ? "Admin" : "Viewer"}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ padding: "10px 0", flexShrink: 0 }}>
        {NAV_ITEMS.map(({ key, icon: NavIcon, label }) => (
          <button key={key} style={navItemStyle(key)} onClick={() => { setActiveNav(key); onClose?.(); }}>
            <NavIcon size={16} /> {label}
          </button>
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Bottom controls */}
      <div style={{ padding: "12px 8px 16px", borderTop: "1px solid var(--border)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Dark / Light toggle */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5,
            textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}>
            Appearance
          </div>
          <button onClick={toggleTheme} style={{
            width: "100%", padding: "8px 10px",
            border: "1.5px solid var(--border-input)", borderRadius: 9,
            cursor: "pointer", background: "var(--bg-hover)",
            display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s", minHeight: 40,
          }}>
            {isDark ? <Sun size={13} color="#f59e0b" /> : <Moon size={13} color="#6366f1" />}
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)",
              fontFamily: "'DM Sans', sans-serif", flex: 1, textAlign: "left" }}>
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
            <div style={{ width: 28, height: 16, borderRadius: 8, background: isDark ? "#6366f1" : "var(--border-input)",
              position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 2, left: isDark ? 12 : 2,
                width: 12, height: 12, borderRadius: "50%", background: "#fff",
                transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
            </div>
          </button>
        </div>

        {/* Demo Mode */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5,
            textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}>Mode</div>
          <button onClick={() => setDemoMode(!demoMode)} style={{
            width: "100%", padding: "8px 10px", minHeight: 40,
            border: `1.5px solid ${demoMode ? "#fde68a" : "var(--border-input)"}`,
            borderRadius: 9, cursor: "pointer",
            background: demoMode ? "#fef9c3" : "var(--bg-hover)",
            display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s",
          }}>
            <FlaskConical size={13} color={demoMode ? "#d97706" : "var(--text-muted)"} />
            <span style={{ fontSize: 11, fontWeight: 600, color: demoMode ? "#d97706" : "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif" }}>
              {demoMode ? "Demo ON" : "Demo OFF"}
            </span>
            <div style={{ marginLeft: "auto", width: 28, height: 16, borderRadius: 8,
              background: demoMode ? "#f59e0b" : "var(--border-input)", position: "relative",
              transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 2, left: demoMode ? 12 : 2,
                width: 12, height: 12, borderRadius: "50%", background: "#fff",
                transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
          </button>
        </div>

        {/* Currency */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5,
            textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif" }}>Currency</div>
          <div style={{ display: "flex", gap: 4 }}>
            {CURRENCIES.map(c => (
              <button key={c} onClick={() => setCurrency(c)} style={{
                flex: 1, padding: "7px 4px", minHeight: 36,
                border: `1.5px solid ${currency === c ? "var(--accent)" : "var(--border-input)"}`,
                borderRadius: 8, cursor: "pointer",
                background: currency === c ? "var(--bg-active)" : "var(--bg-card)",
                color: currency === c ? "var(--accent)" : "var(--text-secondary)",
                fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
              }}>
                {CURRENCY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={onLogout} style={{
          width: "100%", padding: "9px 12px", minHeight: 40,
          border: "1.5px solid #fee2e2", borderRadius: 9,
          background: "transparent", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 7, transition: "background 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <LogOut size={13} color="#dc2626" />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", fontFamily: "'DM Sans', sans-serif" }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
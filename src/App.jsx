import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import AddEditModal from "./components/AddEditModal";
import LoginPage from "./pages/LoginPage";
import DashboardPage    from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage     from "./pages/InsightsPage";
import CommandPalette, { CommandPaletteButton } from "./components/CommandPalette";
import { Lock, Plus, Menu, X, LayoutDashboard, CreditCard, BarChart2 } from "lucide-react";
import logo from "./assets/logo.png";
import logotext from "./assets/logotext.png";
import "./global.css";

const PAGE_TITLES = {
  dashboard:    "Dashboard",
  transactions: "Transactions",
  insights:     "Insights",
};

const PAGE_ICONS = {
  dashboard: LayoutDashboard,
  transactions: CreditCard,
  insights: BarChart2,
};

function BrandedLoader() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "var(--bg-app)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16,
    }}>
      <img src={logo} alt="Loading"
        style={{ width: 56, height: 56, objectFit: "contain", animation: "1.2s linear infinite" }} />
      <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
        Loading dashboard...
      </div>
    </div>
  );
}

function AppShell() {
  const { activeNav, setActiveNav, role, setRole, saveTransaction, demoMode } = useApp();
  const [showModal,  setShowModal]  = useState(false);
  const [loggedIn,   setLoggedIn]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on nav change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [activeNav]);

  // Close sidebar on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 1024) setSidebarOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setLoading(true);
    setLoggedIn(true);
    setTimeout(() => setLoading(false), 1600);
  };
  const handleLogout = () => { setLoggedIn(false); setLoading(false); setSidebarOpen(false); };

  if (!loggedIn) return <LoginPage onLogin={handleLogin} />;
  if (loading)   return <BrandedLoader />;

  const canAdd = role === "admin" && !demoMode;
  const PageIcon = PAGE_ICONS[activeNav];

  return (
    <div className="fin-app-shell">
      {/* ── Sidebar overlay (mobile tap-to-close) ── */}
      <div
        className={`fin-sidebar-overlay${sidebarOpen ? " overlay-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <Sidebar
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* ── Mobile top bar ── */}
        <div className="fin-mobile-topbar">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, color: "var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Open menu"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={logo} alt="Finova" style={{ width: 26, height: 26, objectFit: "contain" }} />
            <img src={logotext} alt="FINOVA" style={{ height: 20, objectFit: "contain",
              filter: "brightness(0) saturate(100%) invert(18%) sepia(15%) saturate(500%) hue-rotate(180deg) brightness(90%)" }} />
          </div>

          {/* Mobile add button */}
          <button
            onClick={canAdd ? () => setShowModal(true) : undefined}
            style={{
              width: 36, height: 36, borderRadius: 10, border: "none",
              background: canAdd ? "#2563eb" : "#94a3b8",
              color: "#fff", cursor: canAdd ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: canAdd ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
            }}
            title={canAdd ? "New Transaction" : demoMode ? "Demo Mode" : "Admin only"}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* ── Main content ── */}
        <main className="fin-main">
          {/* Desktop page header */}
          <div className="fin-page-header">
            <div>
              <div className="fin-header-title" style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 10 }}>
                {PageIcon && <PageIcon size={22} color="var(--accent)" />}
                {PAGE_TITLES[activeNav]}
              </div>
              <div className="fin-header-date" style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>

            <div className="fin-header-actions">
              <CommandPaletteButton />

              <div style={{ position: "relative" }}>
                <button
                  onClick={canAdd ? () => setShowModal(true) : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: canAdd ? "#2563eb" : "#94a3b8",
                    color: "#fff", border: "none", borderRadius: 12,
                    padding: "10px 18px", fontWeight: 600, fontSize: 14,
                    cursor: canAdd ? "pointer" : "default",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: canAdd ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                    transition: "all 0.15s", whiteSpace: "nowrap",
                  }}
                >
                  <Plus size={16} />
                  <span style={{ display: "inline" }}>New Transaction</span>
                </button>
                {!canAdd && (
                  <div title={demoMode ? "Disable Demo Mode to add transactions" : "Switch to Admin to add transactions"}
                    style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.45)", backdropFilter: "blur(3px)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "not-allowed" }}>
                    <Lock size={13} color="#475569" />
                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                      {demoMode ? "Demo Mode" : "Admin only"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {activeNav === "dashboard"    && <DashboardPage    />}
          {activeNav === "transactions" && <TransactionsPage />}
          {activeNav === "insights"     && <InsightsPage     />}
        </main>

        {/* ── Mobile bottom nav ── */}
        <MobileBottomNav />
      </div>

      <CommandPalette onAddTransaction={() => setShowModal(true)} />

      {showModal && (
        <AddEditModal tx={null} onSave={saveTransaction} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

function MobileBottomNav() {
  const { activeNav, setActiveNav } = useApp();
  const NAV = [
    { key: "dashboard",    icon: LayoutDashboard, label: "Home" },
    { key: "transactions", icon: CreditCard,       label: "Transactions" },
    { key: "insights",     icon: BarChart2,        label: "Insights" },
  ];
  return (
    <nav style={{
      display: "none",
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "var(--bg-card)",
      boxShadow: "0 -1px 0 var(--border), 0 -4px 16px rgba(0,0,0,0.08)",
      zIndex: 150,
      paddingBottom: "env(safe-area-inset-bottom)",
    }}
      className="fin-bottom-nav"
    >
      <style>{`
        @media (max-width: 1024px) { .fin-bottom-nav { display: flex !important; } }
      `}</style>
      {NAV.map(({ key, icon: Icon, label }) => {
        const active = activeNav === key;
        return (
          <button key={key}
            onClick={() => setActiveNav(key)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              gap: 3, padding: "10px 0", border: "none", background: "none",
              cursor: "pointer", color: active ? "var(--accent)" : "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s",
            }}>
            <Icon size={22} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
            {active && (
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", marginTop: 1 }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </ThemeProvider>
  );
}
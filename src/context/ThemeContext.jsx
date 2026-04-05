import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

// All design tokens in one place
const THEMES = {
  light: {
    "--bg-app":        "#f1f5f9",
    "--bg-card":       "#ffffff",
    "--bg-sidebar":    "#ffffff",
    "--bg-input":      "#ffffff",
    "--bg-hover":      "#f8fafc",
    "--bg-active":     "#eff6ff",
    "--border":        "#f1f5f9",
    "--border-input":  "#e2e8f0",
    "--text-primary":  "#0f172a",
    "--text-secondary":"#475569",
    "--text-muted":    "#94a3b8",
    "--text-active":   "#2563eb",
    "--shadow-card":   "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    "--shadow-hover":  "0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
    "--shadow-sidebar":"1px 0 0 #f1f5f9",
    "--accent":        "#2563eb",
    "--accent-bg":     "#eff6ff",
    "--scrollbar":     "#cbd5e1",
  },
  dark: {
    "--bg-app":        "#0f172a",
    "--bg-card":       "#1e293b",
    "--bg-sidebar":    "#1e293b",
    "--bg-input":      "#0f172a",
    "--bg-hover":      "#273449",
    "--bg-active":     "#1e3a5f",
    "--border":        "#334155",
    "--border-input":  "#334155",
    "--text-primary":  "#f1f5f9",
    "--text-secondary":"#94a3b8",
    "--text-muted":    "#64748b",
    "--text-active":   "#60a5fa",
    "--shadow-card":   "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
    "--shadow-hover":  "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
    "--shadow-sidebar":"1px 0 0 #334155",
    "--accent":        "#60a5fa",
    "--accent-bg":     "#1e3a5f",
    "--scrollbar":     "#334155",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("finova-theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    const vars = THEMES[theme];
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute("data-theme", theme);
    localStorage.setItem("finova-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
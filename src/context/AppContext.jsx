import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { DEMO_TRANSACTIONS, SAVINGS_GOALS } from "../data/mockData";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [demoMode, setDemoMode]           = useState(true);
  const [role, setRole]                   = useState("viewer");
  const [activeNav, setActiveNav]         = useState("dashboard");
  const [currency, setCurrency]           = useState("INR");
  const [drillCategory, setDrillCategory] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);

  // Goals live in state now — seeded from mockData so demo still works
  const [savingsGoals, setSavingsGoals] = useState(SAVINGS_GOALS);

  const transactions = demoMode ? DEMO_TRANSACTIONS : userTransactions;

  const CURRENCIES = {
    INR: { symbol: "₹", locale: "en-IN", code: "INR", rate: 1 },
    USD: { symbol: "$", locale: "en-US", code: "USD", rate: 0.012 },
    EUR: { symbol: "€", locale: "de-DE", code: "EUR", rate: 0.011 },
  };
  const currencyConfig = CURRENCIES[currency];

  const fmt = useCallback((n) => {
    const converted = n * currencyConfig.rate;
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: "currency",
      currency: currencyConfig.code,
      maximumFractionDigits: 0,
    }).format(converted);
  }, [currency]); // eslint-disable-line react-hooks/exhaustive-deps

  const fmtFull = useCallback((n) => {
    const converted = n * currencyConfig.rate;
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: "currency",
      currency: currencyConfig.code,
    }).format(converted);
  }, [currency]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const spendingByCategory = useMemo(() => {
    const map = {};
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const subscriptions = useMemo(
    () => transactions.filter(t => t.tags?.includes("recurring") && t.type === "expense"),
    [transactions]
  );

  const safeToSpend = useMemo(() => {
    const balance = totalIncome - totalExpenses;
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysLeft = daysInMonth - now.getDate();
    const avgDailySpend = totalExpenses / (now.getDate() || 1);
    const upcomingBills = subscriptions.reduce((s, t) => s + t.amount, 0);
    return Math.max(0, balance - upcomingBills - avgDailySpend * daysLeft);
  }, [transactions, totalIncome, totalExpenses, subscriptions]);

  const saveTransaction = useCallback((form) => {
    if (demoMode) return;
    if (form.id) {
      setUserTransactions(prev => prev.map(t => t.id === form.id ? { ...form, amount: parseFloat(form.amount) || 0 } : t));
    } else {
      setUserTransactions(prev => [{ ...form, id: Date.now(), amount: parseFloat(form.amount) || 0 }, ...prev]);
    }
  }, [demoMode]);

  const deleteTransaction = useCallback((id) => {
    if (demoMode) return;
    setUserTransactions(prev => prev.filter(t => t.id !== id));
  }, [demoMode]);

  // Add a new goal or update an existing one (matched by id)
  const saveGoal = useCallback((form) => {
    const goal = {
      ...form,
      id:     form.id     || Date.now(),
      target: parseFloat(form.target) || 0,
      saved:  parseFloat(form.saved)  || 0,
    };
    setSavingsGoals(prev =>
      form.id ? prev.map(g => g.id === form.id ? goal : g) : [...prev, goal]
    );
  }, []);

  const deleteGoal = useCallback((id) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      transactions,
      role, setRole,
      activeNav, setActiveNav,
      currency, setCurrency,
      currencyConfig,
      fmt, fmtFull,
      demoMode, setDemoMode,
      drillCategory, setDrillCategory,
      totalIncome, totalExpenses,
      spendingByCategory,
      safeToSpend,
      subscriptions,
      saveTransaction,
      deleteTransaction,
      // Goals
      savingsGoals,
      saveGoal,
      deleteGoal,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
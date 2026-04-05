const generateCashFlowData = () => {
  const now = new Date();
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("en-IN", { month: "short", year: "2-digit" });
    months.push(label);
  }
  return [
    { month: months[0],  balance: 58000, income: 7200,  expenses: 4100 },
    { month: months[1],  balance: 61000, income: 8100,  expenses: 3900 },
    { month: months[2],  balance: 59500, income: 6800,  expenses: 5200 },
    { month: months[3],  balance: 63000, income: 9200,  expenses: 4300 },
    { month: months[4],  balance: 67000, income: 10100, expenses: 3800 },
    { month: months[5],  balance: 65000, income: 7500,  expenses: 5100 },
    { month: months[6],  balance: 70000, income: 11000, expenses: 4200 },
    { month: months[7],  balance: 72000, income: 9800,  expenses: 4600 },
    { month: months[8],  balance: 69000, income: 8200,  expenses: 6100 },
    { month: months[9],  balance: 73000, income: 10500, expenses: 3900 },
    { month: months[10], balance: 71000, income: 7900,  expenses: 5400 },
    { month: months[11], balance: 75876, income: 15876, expenses: 5876 },
  ];
};

export const CASH_FLOW_DATA = generateCashFlowData();

export const DEMO_TRANSACTIONS = [
  { id: 1,  date: "2026-04-02", description: "Freelance Payment",  category: "Income",        type: "income",  amount: 4500,  tags: ["essential"] },
  { id: 2,  date: "2026-04-01", description: "Grocery Store",      category: "Food",          type: "expense", amount: 182,   tags: ["essential"] },
  { id: 3,  date: "2026-04-01", description: "Netflix",            category: "Entertainment", type: "expense", amount: 649,   tags: ["recurring"], billingDay: 1 },
  { id: 4,  date: "2026-04-01", description: "Salary Deposit",     category: "Income",        type: "income",  amount: 85000, tags: ["essential"] },
  { id: 5,  date: "2026-03-31", description: "Electric Bill",      category: "Utilities",     type: "expense", amount: 1200,  tags: ["recurring"], billingDay: 31 },
  { id: 6,  date: "2026-03-28", description: "Restaurant Dinner",  category: "Food",          type: "expense", amount: 850,   tags: ["leisure"] },
  { id: 7,  date: "2026-03-25", description: "Gym Membership",     category: "Health",        type: "expense", amount: 1499,  tags: ["recurring"], billingDay: 25 },
  { id: 8,  date: "2026-03-20", description: "Amazon Purchase",    category: "Shopping",      type: "expense", amount: 2300,  tags: ["leisure"] },
  { id: 9,  date: "2026-03-15", description: "Consulting Fee",     category: "Income",        type: "income",  amount: 12000, tags: ["essential"] },
  { id: 10, date: "2026-03-10", description: "Spotify",            category: "Entertainment", type: "expense", amount: 119,   tags: ["recurring"], billingDay: 10 },
  { id: 11, date: "2026-03-05", description: "Fuel",               category: "Transport",     type: "expense", amount: 550,   tags: ["essential"] },
  { id: 12, date: "2026-03-01", description: "Rent",               category: "Housing",       type: "expense", amount: 18000, tags: ["recurring", "essential"], billingDay: 1 },
  { id: 13, date: "2026-02-28", description: "Freelance Payment",  category: "Income",        type: "income",  amount: 32000, tags: ["essential"] },
  { id: 14, date: "2026-02-20", description: "Grocery Store",      category: "Food",          type: "expense", amount: 2100,  tags: ["essential"] },
  { id: 15, date: "2026-02-15", description: "Salary Deposit",     category: "Income",        type: "income",  amount: 85000, tags: ["essential"] },
  { id: 16, date: "2026-02-10", description: "Clothing",           category: "Shopping",      type: "expense", amount: 3400,  tags: ["leisure"] },
  { id: 17, date: "2026-02-05", description: "Doctor Visit",       category: "Health",        type: "expense", amount: 1200,  tags: ["essential"] },
  { id: 18, date: "2026-02-01", description: "Internet Bill",      category: "Utilities",     type: "expense", amount: 799,   tags: ["recurring"], billingDay: 1 },
  { id: 19, date: "2026-01-31", description: "Salary Deposit",     category: "Income",        type: "income",  amount: 85000, tags: ["essential"] },
  { id: 20, date: "2026-01-15", description: "Rent",               category: "Housing",       type: "expense", amount: 18000, tags: ["recurring", "essential"], billingDay: 1 },
];

export const INITIAL_TRANSACTIONS = [];

export const SAVINGS_GOALS = [
  { id: 1, name: "Emergency Fund", target: 100000, saved: 67000, color: "#2563eb", icon: "Shield" },
  { id: 2, name: "New Laptop",     target: 80000,  saved: 52000, color: "#8b5cf6", icon: "Laptop" },
  { id: 3, name: "Vacation",       target: 50000,  saved: 18000, color: "#f59e0b", icon: "Plane" },
];

export const CATEGORY_COLORS = {
  Food:          "#3B82F6",
  Entertainment: "#8B5CF6",
  Utilities:     "#F59E0B",
  Health:        "#10B981",
  Shopping:      "#EC4899",
  Transport:     "#F97316",
  Housing:       "#6366F1",
  Income:        "#22C55E",
};

export const PIE_COLORS = [
  "#3B82F6", "#8B5CF6", "#F59E0B",
  "#10B981", "#EC4899", "#F97316", "#6366F1",
];

export const TOTAL_BALANCE = 75876;
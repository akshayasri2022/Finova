# 💰 Finova — Personal Finance Dashboard

A modern, fully responsive personal finance dashboard built with **React + Vite**. Features real-time currency switching, dark/light mode, role-based access control, savings goal tracking, subscription management, a what-if spending simulator, and a command palette — all running entirely in the browser with no backend required.

---

## 📋 Table of Contents

- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Login & Roles](#-login--roles)
- [Pages & Components](#-pages--components)
- [Context & State](#-context--state)
- [Theming & Dark Mode](#-theming--dark-mode)
- [Responsive Design](#-responsive-design)
- [Currency System](#-currency-system)
- [Command Palette](#-command-palette)
- [Demo Mode](#-demo-mode)
- [Customization Guide](#-customization-guide)
- [Known Limitations](#-known-limitations)

---

## 🎬 Demo

### Login Credentials (Admin)
```
Email:    admin@finova.com
Password: admin123
```

### Quick Access (Viewer)
Click **"Continue as Viewer"** on the login screen — no credentials needed.

---

## ✨ Features

### Core
- **Dashboard** with live summary cards, cash flow area chart, spending pie chart, and recent transactions
- **Transactions page** with search, filtering, sorting, bulk selection, and smart keyword detection
- **Insights page** with monthly comparisons, subscription tracker, what-if simulator, and category breakdowns

### UX & Polish
- **Dark / Light mode** toggle with smooth transitions across every component
- **Fully responsive** — mobile drawer sidebar, bottom navigation bar, bottom-sheet modals on small screens
- **Command palette** (`Cmd+K` / `Ctrl+K`) for keyboard-driven navigation, filtering, and currency switching
- **Skeleton loaders** during the post-login loading animation
- **Card hover effects** — lift shadow + accent underline on every card
- **Congrats popup** when a savings goal reaches 100%
- **Smart search** — typing "coffee" or "netflix" auto-suggests the matching category

### Financial Tools
- **Safe to Spend** widget — calculates spendable balance after upcoming bills and projected daily spend
- **Savings Goals (GoalRings)** — animated circular progress rings with add/edit/delete
- **Subscription Manager** — lists all recurring transactions with countdown timers to next billing date
- **What-If Simulator** — slider-based tool showing monthly and yearly savings if you cut a category by X%
- **Currency switcher** — INR / USD / EUR with live conversion across all figures

### Access Control
- **Admin role** — full CRUD on transactions, bulk tagging, add/edit/delete savings goals
- **Viewer role** — read-only, all edit controls are hidden or locked with a glassmorphism overlay
- **Demo Mode** — freezes all mutations even for Admin, shows a notice banner

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (with Vite) |
| Routing | None — single-page with state-based navigation |
| State | React Context API (`AppContext`, `ThemeContext`) |
| Charts | Recharts (`AreaChart`, `PieChart`) |
| Icons | Lucide React |
| Fonts | DM Sans (Google Fonts) |
| Styling | Inline styles + CSS custom properties + `global.css` |
| Build | Vite |
| Data | In-memory mock data (`src/data/mockData.js`) |

No Redux, no React Router, no external UI library — intentionally lightweight.

---

## 📁 Project Structure

```
financeDashboard/
└── src/
    ├── assets/
    │   ├── logo.png              # App logo mark
    │   └── logotext.png          # "FINOVA" wordmark
    │
    ├── components/
    │   ├── AddEditModal.jsx       # Add / edit transaction modal (bottom-sheet on mobile)
    │   ├── CommandPalette.jsx     # Cmd+K command palette + trigger button
    │   ├── CustomTooltip.jsx      # Dark-themed recharts tooltip
    │   ├── GoalRings.jsx          # Savings goal rings with CRUD
    │   ├── SafeToSpend.jsx        # Safe-to-spend widget
    │   ├── Sidebar.jsx            # Desktop sidebar + mobile drawer
    │   ├── SkeletonLoader.jsx     # Shimmer skeleton screens
    │   ├── SubscriptionManager.jsx# Recurring transaction tracker
    │   ├── SummaryCard.jsx        # Top-level KPI card
    │   ├── TransactionRow.jsx     # Single transaction list item
    │   └── WhatIfSimulator.jsx    # Spending reduction simulator
    │
    ├── context/
    │   ├── AppContext.jsx         # Global state — transactions, currency, role, goals
    │   └── ThemeContext.jsx       # Light/dark theme toggle + CSS variable injection
    │
    ├── data/
    │   └── mockData.js            # Demo transactions, chart data, savings goals, colors
    │
    ├── pages/
    │   ├── DashboardPage.jsx      # Main dashboard view
    │   ├── InsightsPage.jsx       # Analytics & tools view
    │   ├── LoginPage.jsx          # Login screen with animated background
    │   └── TransactionsPage.jsx   # Full transaction list with filters
    │
    ├── utils/
    │   └── formatters.js          # categoryIcon() helper
    │
    ├── App.jsx                    # Root — ThemeProvider > AppProvider > AppShell
    ├── global.css                 # CSS custom properties, responsive grid, card classes
    └── main.jsx                   # React DOM entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/finova.git
cd finova

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

### Common Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## 🔐 Login & Roles

The app has a two-role system controlled entirely on the frontend (no real auth).

### Role: Admin
- Login via **"Continue as Admin"** with credentials `admin@finova.com` / `admin123`
- Can add, edit, and delete transactions
- Can add, edit, and delete savings goals
- Can bulk-tag selected transactions
- All controls are fully active when **Demo Mode is OFF**

### Role: Viewer
- Login via **"Continue as Viewer"** — no credentials required
- All data is visible but all mutation controls are hidden or show a lock overlay
- Suitable for sharing a read-only view with others

### Demo Mode
- A toggle in the sidebar bottom section
- When **ON** — even Admin users cannot mutate data; the app uses the built-in mock dataset
- When **OFF** — Admin users can add/edit/delete; data lives in React state (resets on page refresh)
- Starts **ON** by default so new visitors can explore safely

---

## 📄 Pages & Components

### Dashboard (`DashboardPage.jsx`)

| Section | Description |
|---|---|
| Summary Cards | Available Balance, Total Income, Total Expenses with trend badges |
| Safe to Spend | Remaining balance after bills and projected daily spend, with color-coded progress bar |
| Savings Goals | Animated circular rings showing progress toward each goal |
| Cash Flow Chart | Area chart with 1M / 3M / 6M / 1Y / All range filters |
| Recent Transactions | Last 5 transactions; "View all →" links to Transactions page |
| Spending Breakdown | Donut pie chart with top-4 category legend |

### Transactions (`TransactionsPage.jsx`)

| Feature | Description |
|---|---|
| Search | Full-text search across description, category, and tags |
| Smart Suggestions | Typing "coffee", "rent", "netflix" etc. auto-suggests a category filter |
| Filters | Type (income/expense), Category, Sort order |
| Drill-down | Clicking a chart category in Insights navigates here with that category pre-filtered |
| Bulk Select | Checkbox per row, select-all, bulk tag as `essential` / `recurring` / `leisure` (Admin only) |
| Edit / Delete | Per-row Edit and Delete buttons visible only to Admin in non-demo mode |
| Add | "New Transaction" button in header opens `AddEditModal` |

### Insights (`InsightsPage.jsx`)

| Section | Description |
|---|---|
| KPI Cards | Top category, this month's spend, vs last month comparison, savings rate |
| Subscription Manager | All transactions tagged `recurring`, with billing countdown timers |
| What-If Simulator | Select a category + drag a slider to see monthly/yearly savings |
| Spending by Category | Full pie chart with percentage labels |
| Category Breakdown | Horizontal progress bars, one per category, sorted by spend |
| Income vs Expenses | 6-month area chart with legend |

### Key Components

#### `AddEditModal`
- Opens as a centered dialog on desktop, slides up as a bottom sheet on mobile
- Fields: Description, Amount, Date, Category, Type, Recurring toggle, Billing Day
- Recurring toggle adds the `"recurring"` tag to the transaction, making it appear in Subscription Manager
- Billing Day enables the countdown timer in Subscription Manager

#### `GoalRings`
- Each goal shows an SVG ring with animated stroke-dasharray fill
- Trophy emoji replaces the icon when a goal reaches 100%, and a congrats popup fires once
- Add/Edit via `GoalModal` — choose name, target, saved amount, icon (4 options), and color (8 options)

#### `CommandPalette`
- Opens with `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux), or via the Search button in the header
- Arrow keys navigate, Enter executes, Escape closes
- Supports: page navigation, category filters, currency switching, add transaction

#### `SkeletonLoader`
- `DashboardSkeleton` renders shimmer placeholders for all dashboard sections
- Displayed for ~1.6 seconds after login to simulate data loading

---

## 🧠 Context & State

### `AppContext` (`src/context/AppContext.jsx`)

The single source of truth for all application data.

| Value | Type | Description |
|---|---|---|
| `transactions` | `Array` | Active dataset — either `DEMO_TRANSACTIONS` or `userTransactions` |
| `role` | `"admin" \| "viewer"` | Current user role |
| `activeNav` | `string` | Current page key: `"dashboard"`, `"transactions"`, `"insights"` |
| `currency` | `"INR" \| "USD" \| "EUR"` | Selected currency code |
| `currencyConfig` | `Object` | `{ symbol, locale, code, rate }` for the selected currency |
| `fmt(n)` | `Function` | Formats a number with currency symbol, 0 decimal places |
| `fmtFull(n)` | `Function` | Formats with full decimal places |
| `demoMode` | `boolean` | Whether demo mode is active |
| `drillCategory` | `string \| null` | Category to pre-filter on Transactions page |
| `totalIncome` | `number` | Sum of all income transactions |
| `totalExpenses` | `number` | Sum of all expense transactions |
| `spendingByCategory` | `Array` | `[{ name, value }]` sorted by spend descending |
| `safeToSpend` | `number` | Computed safe balance after bills and projected spend |
| `subscriptions` | `Array` | Transactions tagged `"recurring"` with type `"expense"` |
| `savingsGoals` | `Array` | List of savings goal objects |
| `saveTransaction(form)` | `Function` | Add or update a transaction (no-op in demo mode) |
| `deleteTransaction(id)` | `Function` | Remove a transaction by ID (no-op in demo mode) |
| `saveGoal(form)` | `Function` | Add or update a savings goal |
| `deleteGoal(id)` | `Function` | Remove a savings goal by ID |

### `ThemeContext` (`src/context/ThemeContext.jsx`)

Manages light/dark mode. Persists the choice to `localStorage` under the key `"finova-theme"`.

On theme change, it writes all CSS custom property values to `document.documentElement.style` and sets `data-theme` attribute, making the theme available to every component via CSS variables.

| Value | Description |
|---|---|
| `theme` | `"light"` or `"dark"` |
| `isDark` | Boolean shorthand |
| `toggle()` | Switches between light and dark |

---

## 🎨 Theming & Dark Mode

All colors are CSS custom properties defined in `ThemeContext.jsx` and applied to `:root`. Components use `var(--token-name)` instead of hardcoded hex values.

### Token Reference

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg-app` | `#f1f5f9` | `#0f172a` | Page background |
| `--bg-card` | `#ffffff` | `#1e293b` | Cards, modals, sidebar |
| `--bg-sidebar` | `#ffffff` | `#1e293b` | Sidebar background |
| `--bg-input` | `#ffffff` | `#0f172a` | Input fields |
| `--bg-hover` | `#f8fafc` | `#273449` | Hover states, progress track |
| `--bg-active` | `#eff6ff` | `#1e3a5f` | Active nav, selected state |
| `--border` | `#f1f5f9` | `#334155` | Dividers |
| `--border-input` | `#e2e8f0` | `#334155` | Input borders |
| `--text-primary` | `#0f172a` | `#f1f5f9` | Headings, values |
| `--text-secondary` | `#475569` | `#94a3b8` | Labels, secondary text |
| `--text-muted` | `#94a3b8` | `#64748b` | Hints, timestamps |
| `--text-active` | `#2563eb` | `#60a5fa` | Active nav links |
| `--accent` | `#2563eb` | `#60a5fa` | Buttons, highlights |
| `--accent-bg` | `#eff6ff` | `#1e3a5f` | Accent backgrounds |
| `--shadow-card` | subtle | stronger | Default card shadow |
| `--shadow-hover` | lifted | lifted+dark | Hover card shadow |
| `--scrollbar` | `#cbd5e1` | `#334155` | Scrollbar thumb |

### CSS Classes (`global.css`)

| Class | Effect |
|---|---|
| `.fin-card` | White card with hover lift + shadow transition |
| `.fin-summary-card` | Extends `.fin-card` + bottom accent bar on hover |
| `.fin-widget` | `border-radius: 20px` card for larger panels |
| `.fin-fade-up` | Entrance animation (translateY + opacity) |
| `.fin-fade-up-1` through `.fin-fade-up-5` | Staggered delays for cascading entrance |
| `.fin-tx-row` | Transaction row with hover background |
| `.fin-pill` | Pill button transition |

---

## 📱 Responsive Design

The app is designed mobile-first across three breakpoints.

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | `< 640px` | Single column, bottom nav, drawer sidebar, bottom-sheet modals |
| Tablet | `640–1024px` | Two-column grids, drawer sidebar, bottom nav |
| Desktop | `> 1024px` | Full sidebar always visible, three-column cards, no bottom nav |

### Responsive Behavior by Component

**Sidebar**
- Desktop: Fixed `232px` left column, always visible
- Mobile/Tablet: Hidden off-screen, slides in as a drawer on hamburger tap, with a dark overlay behind it

**Navigation**
- Desktop: Left sidebar nav buttons
- Mobile/Tablet: Fixed bottom tab bar with icons for Dashboard, Transactions, Insights

**Mobile Top Bar** (visible below 1024px)
- Hamburger menu button (left)
- Logo + wordmark (center)
- Quick-add icon button (right)

**Summary Cards**
- Desktop: 3 columns (`grid-template-columns: repeat(3, 1fr)`)
- Tablet: 2 columns
- Mobile: 1 column

**Widget Rows** (SafeToSpend + GoalRings, Subscriptions + WhatIf)
- Desktop/Tablet: Side by side with `flex-wrap`
- Mobile: Stacked full-width

**Modals**
- Desktop: Centered dialog, `400px` wide
- Mobile: Bottom sheet sliding up from the bottom edge, full width, `border-radius: 24px 24px 0 0`

**Filter Row** (Transactions)
- Desktop: Single row with search + 3 selects
- Mobile: Search bar full-width on its own row, selects go 2-per-row

**Touch Targets**
- All interactive elements have `min-height: 44px` to meet Apple and Google tap-target guidelines

**iOS Zoom Prevention**
- All `<input>` and `<select>` have `font-size: 14px` minimum to prevent iOS Safari from auto-zooming on focus

---

## 💱 Currency System

Three currencies are supported. Switching is instant and affects every formatted number in the app.

| Currency | Symbol | Locale | Rate (relative to INR base) |
|---|---|---|---|
| INR | ₹ | `en-IN` | 1× (base) |
| USD | $ | `en-US` | 0.012× |
| EUR | € | `de-DE` | 0.011× |

### How It Works

Raw amounts are always stored in INR. The `fmt(n)` and `fmtFull(n)` functions in `AppContext` multiply by `currencyConfig.rate` before formatting with `Intl.NumberFormat`.

```javascript
// AppContext
const fmt = (n) => new Intl.NumberFormat(currencyConfig.locale, {
  style: "currency",
  currency: currencyConfig.code,
  maximumFractionDigits: 0,
}).format(n * currencyConfig.rate);
```

To add a new currency, add an entry to the `CURRENCIES` object in `AppContext.jsx` and a label to `CURRENCY_LABELS` in `Sidebar.jsx`.

---

## ⌨️ Command Palette

Open with `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux).

| Category | Commands |
|---|---|
| Navigate | Go to Dashboard, Transactions, Insights |
| Actions | Add New Transaction (Admin + non-demo only) |
| Filter | Filter by Food, Housing, Health, Shopping, Transport, Entertainment, Income |
| Currency | Switch to ₹ INR, $ USD, € EUR |

### Keyboard Shortcuts Inside the Palette

| Key | Action |
|---|---|
| `↑` / `↓` | Navigate results |
| `Enter` | Execute selected command |
| `Escape` | Close palette |

---

## 🧪 Demo Mode

Demo Mode is the default state for new visitors. It provides a safe, read-only experience using the built-in mock dataset.

| Behavior | Demo Mode ON | Demo Mode OFF |
|---|---|---|
| Data source | `DEMO_TRANSACTIONS` (mock) | `userTransactions` (React state) |
| Add transaction | ❌ Blocked | ✅ Allowed (Admin only) |
| Edit transaction | ❌ Blocked | ✅ Allowed (Admin only) |
| Delete transaction | ❌ Blocked | ✅ Allowed (Admin only) |
| Bulk tag | ❌ Blocked | ✅ Allowed (Admin only) |
| Notice banner | Shown on Transactions page | Hidden |

Toggle Demo Mode using the **Demo ON/OFF** button at the bottom of the sidebar.

> **Note:** All data added in non-demo mode lives in React state only. It will be lost on page refresh. To persist data, you would need to integrate a backend or `localStorage`.

---

## 🔧 Customization Guide

### Adding a New Currency

1. Open `src/context/AppContext.jsx`
2. Add to the `CURRENCIES` object:
   ```javascript
   GBP: { symbol: "£", locale: "en-GB", code: "GBP", rate: 0.0095 },
   ```
3. Open `src/components/Sidebar.jsx`
4. Add to `CURRENCIES` array and `CURRENCY_LABELS`:
   ```javascript
   const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
   const CURRENCY_LABELS = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
   ```

### Adding a New Transaction Category

1. Open `src/components/AddEditModal.jsx`
2. Add to the `CATEGORIES` array:
   ```javascript
   const CATEGORIES = ["Food", "Entertainment", ..., "Travel"];
   ```
3. Open `src/data/mockData.js` and add a color to `CATEGORY_COLORS`:
   ```javascript
   Travel: "#0ea5e9",
   ```
4. Open `src/utils/formatters.js` and map the category to a Lucide icon name:
   ```javascript
   Travel: "Plane",
   ```
5. Import that icon in `src/components/TransactionRow.jsx` and add it to `ICON_MAP`.

### Adding a New Command to the Palette

Open `src/components/CommandPalette.jsx` and add an entry to the `COMMANDS` array:

```javascript
{ id: "my-command", icon: SomeIcon, label: "My Command",
  category: "Actions", action: "nav", value: "dashboard" },
```

Supported actions: `nav`, `filter`, `currency`, `add`.

### Replacing Mock Data

Open `src/data/mockData.js`. The file exports:

| Export | Description |
|---|---|
| `DEMO_TRANSACTIONS` | Array of transaction objects |
| `CASH_FLOW_DATA` | 12-month chart data array |
| `SAVINGS_GOALS` | Initial savings goal seed data |
| `CATEGORY_COLORS` | Map of category → hex color |
| `PIE_COLORS` | Array of colors for the pie chart |
| `TOTAL_BALANCE` | Number shown as "Available Balance" |

Each transaction object has this shape:
```javascript
{
  id: 1,
  date: "2025-03-15",        // YYYY-MM-DD
  description: "Salary",
  category: "Income",
  type: "income",             // "income" | "expense"
  amount: 85000,              // Always in INR (base currency)
  tags: ["recurring"],        // Optional — "recurring" triggers Subscription Manager
  billingDay: 1,              // Optional — day of month for billing countdown
}
```

---

## ⚠️ Known Limitations

- **No persistence** — data added in non-demo mode resets on page refresh. Integrate `localStorage` or a backend API to persist user data.
- **No real authentication** — credentials are hardcoded in `LoginPage.jsx`. Do not use in production without a proper auth layer.
- **Currency rates are static** — exchange rates are fixed constants, not fetched from a live API.
- **Chart data is static** — the Cash Flow chart uses `CASH_FLOW_DATA` from `mockData.js`, not computed from actual transactions.
- **No multi-user support** — all state is local to the browser session.
- **No PWA / offline support** — the app requires a network connection to load Google Fonts.

---

## 📄 License

This project is for portfolio / demonstration purposes. Feel free to fork and adapt for personal or educational use.

---

*Built with React, Recharts, Lucide Icons, and DM Sans.*#   F i n o v a  
 
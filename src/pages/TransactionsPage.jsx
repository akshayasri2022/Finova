import { useState, useMemo, useEffect } from "react";
import { Search, Tag, Lock, CheckSquare, Square } from "lucide-react";
import { useApp } from "../context/AppContext";
import TransactionRow from "../components/TransactionRow";
import AddEditModal from "../components/AddEditModal";
import "../global.css";

const selectStyle = {
  padding: "9px 10px",
  border: "1.5px solid var(--border-input)",
  borderRadius: 10,
  fontSize: 13,
  background: "var(--bg-card)",
  color: "var(--text-primary)",
  fontFamily: "'DM Sans', sans-serif",
  cursor: "pointer",
  outline: "none",
  minHeight: 42,
};

const KEYWORD_CATEGORY_MAP = {
  coffee: "Food", food: "Food", lunch: "Food", dinner: "Food",
  restaurant: "Food", grocery: "Food", eat: "Food",
  netflix: "Entertainment", spotify: "Entertainment", movie: "Entertainment",
  electricity: "Utilities", electric: "Utilities", internet: "Utilities", bill: "Utilities",
  gym: "Health", doctor: "Health", medical: "Health", health: "Health",
  amazon: "Shopping", shop: "Shopping", clothes: "Shopping", clothing: "Shopping",
  fuel: "Transport", uber: "Transport", transport: "Transport", cab: "Transport",
  rent: "Housing", house: "Housing", housing: "Housing",
};

function getSmartCategory(search) {
  const lower = search.toLowerCase().trim();
  for (const [key, cat] of Object.entries(KEYWORD_CATEGORY_MAP)) {
    if (lower.includes(key)) return cat;
  }
  return null;
}

export default function TransactionsPage() {
  const {
    transactions, role, saveTransaction, deleteTransaction,
    drillCategory, setDrillCategory, demoMode,
  } = useApp();

  const [search,         setSearch]         = useState("");
  const [filterType,     setFilterType]     = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy,         setSortBy]         = useState("date_desc");
  const [modalTx,        setModalTx]        = useState(null);
  const [showModal,      setShowModal]      = useState(false);
  const [selectedIds,    setSelectedIds]    = useState(new Set());
  const [bulkTag,        setBulkTag]        = useState("");

  useEffect(() => {
    if (drillCategory) setFilterCategory(drillCategory);
  }, [drillCategory]);

  const smartCategory = getSmartCategory(search);

  const categories = useMemo(
    () => ["all", ...new Set(transactions.map((t) => t.category))],
    [transactions]
  );

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (search)
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()) ||
          t.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    if (filterType !== "all")     list = list.filter((t) => t.type === filterType);
    if (filterCategory !== "all") list = list.filter((t) => t.category === filterCategory);
    if (sortBy === "date_desc")   list.sort((a, b) => b.date.localeCompare(a.date));
    if (sortBy === "date_asc")    list.sort((a, b) => a.date.localeCompare(b.date));
    if (sortBy === "amount_desc") list.sort((a, b) => b.amount - a.amount);
    if (sortBy === "amount_asc")  list.sort((a, b) => a.amount - b.amount);
    return list;
  }, [transactions, search, filterType, filterCategory, sortBy]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map(t => t.id)));
  };

  const clearDrill = () => { setDrillCategory(null); setFilterCategory("all"); };

  return (
    <>
      <div className="fin-widget" style={{ padding: "20px 18px" }}>

        {/* Drill-down banner */}
        {drillCategory && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "var(--bg-active)", borderRadius: 10, padding: "10px 14px",
            marginBottom: 14, border: "1px solid var(--accent)", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
              📊 Filtered: {drillCategory}
            </span>
            <button onClick={clearDrill} style={{ background: "none", border: "none",
              color: "var(--accent)", cursor: "pointer", fontSize: 12, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", padding: 0 }}>Clear ✕</button>
          </div>
        )}

        {/* Smart search suggestion */}
        {search && smartCategory && filterCategory === "all" && (
          <div onClick={() => setFilterCategory(smartCategory)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#fef9c3", borderRadius: 10, padding: "9px 14px",
            marginBottom: 12, cursor: "pointer", border: "1px solid #fde68a" }}>
            <span style={{ fontSize: 13, color: "#92400e", fontFamily: "'DM Sans', sans-serif" }}>
              💡 Filter by <strong>{smartCategory}</strong>
            </span>
          </div>
        )}

        {/* Demo notice */}
        {demoMode && (
          <div style={{ background: "#fef9c3", borderRadius: 10, padding: "8px 14px",
            marginBottom: 14, fontSize: 12, color: "#92400e",
            fontFamily: "'DM Sans', sans-serif", border: "1px solid #fde68a" }}>
            👁 Demo Mode — read-only. Disable in sidebar to edit.
          </div>
        )}

        {/* Filters */}
        <div className="fin-filter-row">
          <div className="fin-search-wrap" style={{ position: "relative" }}>
            <Search size={15} color="var(--text-muted)"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "9px 14px 9px 34px",
                border: "1.5px solid var(--border-input)", borderRadius: 10,
                fontSize: 13, outline: "none", fontFamily: "'DM Sans', sans-serif",
                boxSizing: "border-box", background: "var(--bg-card)",
                color: "var(--text-primary)", minHeight: 42,
              }}
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={selectStyle}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); if (drillCategory) setDrillCategory(null); }}
            style={selectStyle}>
            {categories.map((c) => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
            <option value="date_desc">Newest</option>
            <option value="date_asc">Oldest</option>
            <option value="amount_desc">Highest</option>
            <option value="amount_asc">Lowest</option>
          </select>
        </div>

        {/* Bulk bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <button onClick={selectAll} style={{ background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5, padding: 0, minHeight: 36 }}>
              {selectedIds.size === filtered.length && filtered.length > 0
                ? <CheckSquare size={16} color="var(--accent)" />
                : <Square size={16} color="var(--text-muted)" />}
              <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                {selectedIds.size > 0 ? `${selectedIds.size} selected` : "Select all"}
              </span>
            </button>

            {selectedIds.size > 0 && (
              role === "admin" && !demoMode ? (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <select value={bulkTag} onChange={e => setBulkTag(e.target.value)}
                    style={{ ...selectStyle, padding: "5px 10px", fontSize: 12, minHeight: 32 }}>
                    <option value="">Tag as...</option>
                    <option value="essential">essential</option>
                    <option value="recurring">recurring</option>
                    <option value="leisure">leisure</option>
                  </select>
                  {bulkTag && (
                    <button
                      onClick={() => { alert(`Tagged ${selectedIds.size} as "${bulkTag}"`); setSelectedIds(new Set()); setBulkTag(""); }}
                      style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--accent)",
                        color: "#fff", border: "none", borderRadius: 8, padding: "5px 12px",
                        cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                      <Tag size={12} /> Apply
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--bg-hover)",
                    color: "var(--text-muted)", borderRadius: 8, padding: "5px 12px",
                    fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", userSelect: "none" }}>
                    <Tag size={12} /> Bulk Tag
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(3px)", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 4, cursor: "not-allowed" }}>
                    <Lock size={11} color="#94a3b8" />
                    <span style={{ fontSize: 10, color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Admin only</span>
                  </div>
                </div>
              )
            )}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
            {filtered.length} / {transactions.length}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)",
            fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}></div>
            No transactions found
          </div>
        ) : (
          filtered.map((tx) => (
            <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => toggleSelect(tx.id)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "0 4px", flexShrink: 0, minHeight: 44, display: "flex", alignItems: "center" }}>
                {selectedIds.has(tx.id) ? <CheckSquare size={16} color="var(--accent)" /> : <Square size={16} color="var(--border-input)" />}
              </button>
              <div style={{ flex: 1 }}>
                <TransactionRow
                  tx={tx}
                  role={demoMode ? "viewer" : role}
                  onEdit={(t) => { setModalTx(t); setShowModal(true); }}
                  onDelete={deleteTransaction}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && !demoMode && (
        <AddEditModal tx={modalTx} onSave={saveTransaction}
          onClose={() => { setShowModal(false); setModalTx(null); }} />
      )}
    </>
  );
}
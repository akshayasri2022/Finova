import { useState, useEffect } from "react";
import { Shield, Laptop, Plane, Target, Plus, Pencil, Trash2, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const ICON_MAP    = { Shield, Laptop, Plane, Target };
const ICON_NAMES  = ["Shield", "Laptop", "Plane", "Target"];
const COLOR_OPTIONS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6"];

function CongratsPopup({ goal, onClose }) {
  const Icon = ICON_MAP[goal.icon] || Target;
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(15,23,42,0.5)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "var(--bg-card)", borderRadius: 24, padding: "36px 32px 28px",
        textAlign: "center", maxWidth: 320, width: "100%",
        boxShadow: "0 30px 80px rgba(0,0,0,0.3)", fontFamily: "'DM Sans', sans-serif",
        animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: goal.color + "22",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <Icon size={24} color={goal.color} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Goal Achieved! 🏆</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: goal.color, marginBottom: 8 }}>{goal.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
          You've hit 100% of your savings target!
        </div>
        <div style={{ height: 7, background: "var(--bg-hover)", borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ height: "100%", width: "100%", background: goal.color, borderRadius: 10 }} />
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "12px", border: "none",
          borderRadius: 12, background: goal.color, color: "#fff", fontSize: 14, fontWeight: 700,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Awesome! 🎊
        </button>
      </div>
      <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

function GoalModal({ goal, onSave, onClose }) {
  const [form, setForm] = useState({
    name: goal?.name || "", target: goal?.target || "", saved: goal?.saved || "",
    icon: goal?.icon || "Target", color: goal?.color || "#6366f1", id: goal?.id || null,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = () => {
    if (!form.name.trim() || !form.target) return;
    onSave(form); onClose();
  };

  const inputSt = {
    width: "100%", padding: "10px 12px", border: "1.5px solid var(--border-input)",
    borderRadius: 10, fontSize: 14, outline: "none", marginBottom: 14,
    fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box",
    background: "var(--bg-card)", color: "var(--text-primary)", minHeight: 44,
  };
  const labelSt = {
    display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-secondary)",
    marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,0.45)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "var(--bg-card)", borderRadius: 20, padding: "24px 22px",
        width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        fontFamily: "'DM Sans', sans-serif", maxHeight: "90dvh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
            {form.id ? "Edit Goal" : "New Savings Goal"}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer",
            color: "var(--text-muted)", padding: 4 }}><X size={18} /></button>
        </div>

        <label style={labelSt}>Goal Name</label>
        <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Emergency Fund" style={inputSt} />

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={labelSt}>Target Amount</label>
            <input type="number" value={form.target} onChange={e => set("target", e.target.value)} placeholder="100000" style={inputSt} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelSt}>Saved So Far</label>
            <input type="number" value={form.saved} onChange={e => set("saved", e.target.value)} placeholder="0" style={inputSt} />
          </div>
        </div>

        <label style={labelSt}>Icon</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {ICON_NAMES.map(name => {
            const Ic = ICON_MAP[name]; const active = form.icon === name;
            return (
              <button key={name} onClick={() => set("icon", name)} style={{
                flex: 1, height: 42, borderRadius: 10, border: "none", cursor: "pointer",
                background: active ? form.color : "var(--bg-hover)",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
              }}>
                <Ic size={17} color={active ? "#fff" : "var(--text-muted)"} />
              </button>
            );
          })}
        </div>

        <label style={labelSt}>Color</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {COLOR_OPTIONS.map(c => (
            <button key={c} onClick={() => set("color", c)} style={{
              width: 28, height: 28, borderRadius: "50%", background: c, border: "none", cursor: "pointer",
              outline: form.color === c ? `3px solid ${c}` : "none", outlineOffset: 2,
            }} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", minHeight: 46,
            border: "1.5px solid var(--border-input)", borderRadius: 12, background: "transparent",
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 2, padding: "11px", minHeight: 46,
            border: "none", borderRadius: 12, background: "#2563eb", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            opacity: (!form.name.trim() || !form.target) ? 0.5 : 1 }}>
            {form.id ? "Save Changes" : "Add Goal"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Ring({ goal, fmt, onEdit, onDelete, onComplete }) {
  const [animated, setAnimated]           = useState(false);
  const [congratsShown, setCongratsShown] = useState(false);

  const pct  = Math.min(1, goal.saved / (goal.target || 1));
  const r    = 34;
  const circ = 2 * Math.PI * r;
  const dash = animated ? pct * circ : 0;

  useEffect(() => { const t = setTimeout(() => setAnimated(true), 300); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (pct >= 1 && !congratsShown) { setCongratsShown(true); onComplete(goal); }
  }, [pct]); // eslint-disable-line

  const Icon = ICON_MAP[goal.icon] || Target;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14,
      padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
      {/* Ring SVG */}
      <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
        <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--bg-hover)" strokeWidth="6" />
          <circle cx="40" cy="40" r={r} fill="none" stroke={goal.color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {pct >= 1 ? <span style={{ fontSize: 18 }}>🏆</span> : <Icon size={16} color={goal.color} />}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2,
          fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {goal.name}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
          {fmt(goal.saved)} / {fmt(goal.target)}
        </div>
        <div style={{ height: 5, background: "var(--bg-hover)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: animated ? `${pct * 100}%` : "0%",
            background: goal.color, borderRadius: 10, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: goal.color, fontFamily: "'DM Sans', sans-serif" }}>
          {Math.round(pct * 100)}%
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => onEdit(goal)} style={{ width: 28, height: 28, borderRadius: 7, border: "none",
            background: "var(--bg-active)", color: "var(--accent)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pencil size={12} />
          </button>
          <button onClick={() => onDelete(goal.id)} style={{ width: 28, height: 28, borderRadius: 7, border: "none",
            background: "#fee2e2", color: "#dc2626", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GoalRings() {
  const { fmt, savingsGoals, saveGoal, deleteGoal } = useApp();
  const [modalGoal, setModalGoal]       = useState(null);
  const [congratsGoal, setCongratsGoal] = useState(null);

  return (
    <>
      <div className="fin-widget" style={{ padding: "20px 20px", flex: 1, minWidth: 260 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
              Savings Goals
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
              Track your targets
            </div>
          </div>
          <button onClick={() => setModalGoal({})} style={{
            display: "flex", alignItems: "center", gap: 5, background: "var(--bg-active)",
            border: "none", borderRadius: 10, padding: "7px 12px", cursor: "pointer",
            color: "var(--accent)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            minHeight: 36,
          }}>
            <Plus size={14} /> Add Goal
          </button>
        </div>

        {savingsGoals.length === 0 && (
          <div style={{ textAlign: "center", padding: "28px 0", color: "var(--text-muted)",
            fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>🎯</div>
            No goals yet — add one!
          </div>
        )}

        {savingsGoals.map(goal => (
          <Ring key={goal.id} goal={goal} fmt={fmt}
            onEdit={(g) => setModalGoal(g)}
            onDelete={deleteGoal}
            onComplete={(g) => setCongratsGoal(g)}
          />
        ))}
      </div>

      {modalGoal !== null && (
        <GoalModal
          goal={Object.keys(modalGoal).length > 0 ? modalGoal : null}
          onSave={saveGoal}
          onClose={() => setModalGoal(null)}
        />
      )}
      {congratsGoal && (
        <CongratsPopup goal={congratsGoal} onClose={() => setCongratsGoal(null)} />
      )}
    </>
  );
}
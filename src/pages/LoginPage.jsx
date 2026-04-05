import { useState } from "react";
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, ChevronLeft } from "lucide-react";
import logo from "../assets/logo.png";
import logotext from "../assets/logotext.png";


function MiniBar({ height, color, delay }) {
  return (
    <div style={{
      width: 18, height, background: color, borderRadius: 4,
      animation: `barPulse 3s ease-in-out ${delay}s infinite alternate`,
    }} />
  );
}

function FakeDashboardBg() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", overflow: "hidden" }}>
      <style>{`
        @keyframes barPulse   { from { transform: scaleY(0.7); opacity: 0.7; } to { transform: scaleY(1); opacity: 1; } }
        @keyframes floatCard  { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes fadeSlide  { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shimmer    { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }
      `}</style>
      <div style={{ position: "absolute", top: "-10%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)", filter: "blur(40px)", animation: "shimmer 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", filter: "blur(40px)", animation: "shimmer 5s ease-in-out 1s infinite" }} />
      <div style={{ position: "absolute", top: "40%", right: "30%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)", filter: "blur(30px)", animation: "shimmer 6s ease-in-out 2s infinite" }} />

      {/* Fake summary cards */}
      <div style={{ position: "absolute", top: 40, left: 40, display: "flex", gap: 16, animation: "floatCard 6s ease-in-out infinite" }}>
        {[{label:"Total Income",value:"₹1,01,500",color:"#22c55e"},{label:"Expenses",value:"₹27,300",color:"#f87171"},{label:"Net Savings",value:"₹74,200",color:"#60a5fa"}].map((card,i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "18px 22px", backdropFilter: "blur(4px)", minWidth: 140, animation: `fadeSlide 0.6s ease ${i * 0.15}s both` }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{card.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: card.color, fontFamily: "'DM Sans', sans-serif" }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Fake bar chart */}
      <div style={{ position: "absolute", bottom: 60, left: 40, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(4px)", animation: "floatCard 7s ease-in-out 1s infinite" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Cash Flow</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
          {[{h:40,c:"#3b82f6",d:0},{h:55,c:"#3b82f6",d:0.1},{h:35,c:"#3b82f6",d:0.2},{h:65,c:"#3b82f6",d:0.3},{h:50,c:"#3b82f6",d:0.4},{h:75,c:"#22c55e",d:0.5},{h:60,c:"#22c55e",d:0.6},{h:80,c:"#22c55e",d:0.7}].map((b,i) => (
            <MiniBar key={i} height={b.h} color={b.c+"99"} delay={b.d} />
          ))}
        </div>
      </div>

      {/* Fake transactions */}
      <div style={{ position: "absolute", top: 160, right: 40, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(4px)", width: 240, animation: "floatCard 8s ease-in-out 0.5s infinite" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Recent Transactions</div>
        {[{desc:"Salary Deposit",amt:"+₹85,000",color:"#22c55e"},{desc:"Rent",amt:"-₹18,000",color:"#f87171"},{desc:"Netflix",amt:"-₹649",color:"#f87171"},{desc:"Freelance",amt:"+₹4,500",color:"#22c55e"}].map((tx,i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{tx.desc}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: tx.color, fontFamily: "'DM Sans', sans-serif" }}>{tx.amt}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.4)" }} />
    </div>
  );
}

function AdminLoginForm({ onSuccess, onBack }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const ADMIN_EMAIL = "admin@finova.com";
  const ADMIN_PASS  = "admin123";

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        onSuccess();
      } else {
        setError("Invalid credentials. Try admin@finova.com / admin123");
        setLoading(false);
      }
    }, 900);
  };

  const inputBase = {
    width: "100%", padding: "12px 14px 12px 40px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12, fontSize: 14, color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>{`
        .auth-input:-webkit-autofill,
        .auth-input:-webkit-autofill:hover,
        .auth-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 999px rgba(15,23,42,0.98) inset !important;
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
          transition: background-color 9999s ease-in-out 0s;
        }
        .auth-input { color-scheme: dark; }
        .auth-input::placeholder { color: rgba(255,255,255,0.28); }
        .auth-input:focus { border-color: rgba(56,139,253,0.7) !important; background: rgba(255,255,255,0.1) !important; outline: none; }
      `}</style>

      {/* Back */}
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 22, padding: 0 }}>
        <ChevronLeft size={15} /> Back
      </button>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
<img src={logo} alt="Finova" style={{ width: 32, height: 32, objectFit: "contain" }} />        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Admin Sign In</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Full access to all features</div>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "18px 0" }} />

      {/* Email */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Email</label>
        <div style={{ position: "relative" }}>
          <Mail size={15} color="rgba(255,255,255,0.28)" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }} />
          <input className="auth-input" type="email" placeholder="abc@finova.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={inputBase} />
        </div>
      </div>

      {/* Password */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Password</label>
        <div style={{ position: "relative" }}>
          <Lock size={15} color="rgba(255,255,255,0.28)" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }} />
          <input className="auth-input" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ ...inputBase, paddingRight: 44 }} />
          <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, zIndex: 1 }}>
            {showPw ? <EyeOff size={15} color="rgba(255,255,255,0.4)" /> : <Eye size={15} color="rgba(255,255,255,0.4)" />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>
          {error}
        </div>
      )}

     

      {/* Submit */}
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%", padding: "13px",
          background: loading ? "rgba(37,99,235,0.45)" : "linear-gradient(135deg, #1d4ed8, #2563eb)",
          border: "none", borderRadius: 12, cursor: loading ? "default" : "pointer",
          color: "#fff", fontSize: 15, fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: loading ? "none" : "0 6px 20px rgba(37,99,235,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          transition: "all 0.2s",
        }}
      >
        {loading ? (
          <>
            <img src={logo} alt="" style={{ width: 20, height: 20, objectFit: "contain", animation: "1s linear infinite" }} />
            Signing in...
          </>
        ) : (
          <>
            <Shield size={16} /> Sign In as Admin
          </>
        )}
      </button>
    </>
  );
}

export default function LoginPage({ onLogin }) {
  const [view,    setView]    = useState("select");
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes cardIn   { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .role-btn { transition: all 0.2s ease !important; }
        .role-btn:hover { transform: translateY(-2px) !important; }
      `}</style>

      <FakeDashboardBg />

      <div style={{
        position: "relative", zIndex: 10,
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 28, padding: "44px 40px",
        width: 420, maxWidth: "90vw",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
        animation: "cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {view === "admin" ? (
          <AdminLoginForm onSuccess={() => onLogin("admin")} onBack={() => setView("select")} />
        ) : (
          <>
            {/* Finova logo + wordmark */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
              <img src={logo} alt="Finova" style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 12, filter: "drop-shadow(0 0 20px rgba(37,99,235,0.5))" }} />
              <img src={logotext} alt="FINOVA" style={{ width: 140, objectFit: "contain", filter: "brightness(1.1)" }} />
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
                
              </div>
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px", marginBottom: 4, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
              Welcome back
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
              Choose your access level to continue
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 22 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Admin */}
              <button
                className="role-btn"
                onClick={() => setView("admin")}
                onMouseEnter={() => setHovered("admin")}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: "100%", padding: "16px 20px",
                  background: hovered === "admin"
                    ? "linear-gradient(135deg, rgba(37,99,235,0.65), rgba(29,78,216,0.65))"
                    : "linear-gradient(135deg, rgba(37,99,235,0.35), rgba(29,78,216,0.35))",
                  border: "1px solid rgba(99,139,255,0.35)", borderRadius: 16,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                  backdropFilter: "blur(8px)",
                  boxShadow: hovered === "admin" ? "0 8px 28px rgba(37,99,235,0.3)" : "none",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Shield size={19} color="#93c5fd" />
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2, fontFamily: "'DM Sans', sans-serif" }}>Continue as Admin</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Requires credentials · Full access</div>
                </div>
                <ArrowRight size={16} color="rgba(255,255,255,0.45)" />
              </button>

              {/* Viewer */}
              <button
                className="role-btn"
                onClick={() => onLogin("viewer")}
                onMouseEnter={() => setHovered("viewer")}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: "100%", padding: "16px 20px",
                  background: hovered === "viewer" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                  backdropFilter: "blur(8px)",
                  boxShadow: hovered === "viewer" ? "0 8px 24px rgba(0,0,0,0.2)" : "none",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Eye size={19} color="rgba(255,255,255,0.65)" />
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2, fontFamily: "'DM Sans', sans-serif" }}>Continue as Viewer</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>No login needed · Read-only access</div>
                </div>
                <ArrowRight size={16} color="rgba(255,255,255,0.25)" />
              </button>
            </div>

            
          </>
        )}
      </div>
    </div>
  );
}
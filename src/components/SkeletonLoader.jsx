// Shimmer skeleton components for loading states

function Shimmer({ width = "100%", height = 16, borderRadius = 8, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius,
      background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmerMove 1.5s infinite",
      ...style,
    }} />
  );
}

export function SummaryCardSkeleton() {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "24px 28px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flex: 1, minWidth: 0,
    }}>
      <Shimmer width="50%" height={12} style={{ marginBottom: 16 }} />
      <Shimmer width="70%" height={28} style={{ marginBottom: 10 }} />
      <Shimmer width="40%" height={11} />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "28px 28px 20px",
      marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Shimmer width={120} height={18} />
        <div style={{ display: "flex", gap: 8 }}>
          {[1,2,3,4,5].map(i => <Shimmer key={i} width={40} height={28} borderRadius={20} />)}
        </div>
      </div>
      {/* Fake chart bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 200, padding: "0 8px" }}>
        {[60,80,50,90,70,85,65,75,55,88,72,95].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "6px 6px 0 0", background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)", backgroundSize: "200% 100%", animation: `shimmerMove 1.5s ${i * 0.05}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

export function TransactionRowSkeleton() {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9", gap: 12 }}>
      <Shimmer width={38} height={38} borderRadius={10} />
      <div style={{ flex: 1 }}>
        <Shimmer width="55%" height={13} style={{ marginBottom: 8 }} />
        <Shimmer width="35%" height={11} />
      </div>
      <Shimmer width={70} height={14} />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <style>{`@keyframes shimmerMove { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
      </div>

      {/* Two widget placeholders */}
      <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280, background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <Shimmer width="40%" height={16} style={{ marginBottom: 20 }} />
          <Shimmer width="60%" height={34} style={{ marginBottom: 12 }} />
          <Shimmer width="100%" height={8} borderRadius={10} style={{ marginBottom: 16 }} />
          <Shimmer width="80%" height={11} style={{ marginBottom: 8 }} />
          <Shimmer width="80%" height={11} />
        </div>
        <div style={{ flex: 1, minWidth: 280, background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <Shimmer width="40%" height={16} style={{ marginBottom: 20 }} />
          {[1,2,3].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <Shimmer width={88} height={88} borderRadius={44} />
              <div style={{ flex: 1 }}>
                <Shimmer width="60%" height={13} style={{ marginBottom: 8 }} />
                <Shimmer width="80%" height={5} borderRadius={10} />
              </div>
              <Shimmer width={36} height={20} />
            </div>
          ))}
        </div>
      </div>

      <ChartSkeleton />

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: 280, background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <Shimmer width="40%" height={16} style={{ marginBottom: 16 }} />
          {[1,2,3,4,5].map(i => <TransactionRowSkeleton key={i} />)}
        </div>
        <div style={{ flex: 1, minWidth: 240, background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <Shimmer width="50%" height={16} style={{ marginBottom: 16 }} />
          <Shimmer width={180} height={180} borderRadius={90} style={{ margin: "0 auto 16px" }} />
          {[1,2,3,4].map(i => <Shimmer key={i} width="100%" height={12} style={{ marginBottom: 10 }} />)}
        </div>
      </div>
    </>
  );
}
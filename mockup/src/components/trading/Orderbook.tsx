import { ASKS, BIDS, SPREAD_PRICE } from "../../constants/orderbook";
import type { CSSProperties } from "react";

const container: CSSProperties = {
  background: "#050505",
  fontSize: "14px",
  fontFamily: "var(--font-family)",
  paddingTop: "8px",
  overflow: "hidden",
};

const headerRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "11px",
  color: "#e0e0e0",
  marginBottom: "4px",
};

const row: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  lineHeight: "18px",
};

const spreadRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2px 0",
  fontSize: "12px",
  fontWeight: 600,
};

export default function Orderbook() {
  const asks = [...ASKS].reverse().slice(0, 4);
  const bids = BIDS.slice(0, 4);

  return (
    <div style={container}>
      <div style={headerRow}>
        <span>Price</span>
        <span style={{ textAlign: "right" }}>Size</span>
      </div>

      {/* Asks (red) */}
      {asks.map((r) => (
        <div key={r.price} style={row}>
          <span style={{ color: "#ff5938", fontSize: "12px" }}>{r.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
          <span style={{ color: "#e0e0e0", fontSize: "11px", textAlign: "right" }}>{r.size.toFixed(1).replace(".", ",")}</span>
        </div>
      ))}

      {/* Spread */}
      <div style={spreadRow}>
        <span style={{ color: "#fff" }}>{SPREAD_PRICE.toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
        <span style={{ color: "#fff" }}>&gt;</span>
      </div>

      {/* Bids (green) */}
      {bids.map((r) => (
        <div key={r.price} style={row}>
          <span style={{ color: "#00de0b", fontSize: "12px" }}>{r.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
          <span style={{ color: "#e0e0e0", fontSize: "11px", textAlign: "right" }}>{r.size.toFixed(1).replace(".", ",")}</span>
        </div>
      ))}

    </div>
  );
}

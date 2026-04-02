import { useApp } from "../../context/AppContext";
import type { CSSProperties } from "react";

const bar: CSSProperties = {
  padding: "8px 16px",
  background: "#050505",
  borderBottom: "1px solid #2c2c2c",
};

interface Props {
  readonly onCoinSelect: () => void;
}

export default function CoinInfoBar({ onCoinSelect }: Props) {
  const { state } = useApp();
  const coin = state.selectedCoin;
  const isPositive = coin.change24h >= 0;

  return (
    <div style={{ ...bar, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <button
        onClick={onCoinSelect}
        style={{
          background: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#fff",
          padding: 0,
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: 700, lineHeight: "20px" }}>
          {coin.pair}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1.5 1.5L5 4.5L8.5 1.5" stroke="#9f9f9f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
          {coin.price.toLocaleString()}
        </span>
        <span style={{
          fontSize: "12px",
          fontWeight: 600,
          color: isPositive ? "#00de0b" : "#ff5938",
        }}>
          {isPositive ? "+" : ""}{coin.change24h}%
        </span>
      </div>
    </div>
  );
}

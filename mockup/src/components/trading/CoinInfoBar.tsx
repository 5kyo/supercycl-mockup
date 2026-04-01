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
    <div style={bar}>
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
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
          <path d="M1 1L4 4L7 1" stroke="#e0e0e0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p style={{
        fontSize: "12px",
        fontWeight: 600,
        lineHeight: "16px",
        color: isPositive ? "#00de0b" : "#ff5938",
        marginTop: "2px",
      }}>
        {isPositive ? "+" : ""}{coin.change24h}%
      </p>
    </div>
  );
}

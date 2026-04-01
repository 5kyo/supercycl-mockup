import type { Position } from "../../constants/positions";
import type { CSSProperties } from "react";

const card: CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "4px",
  padding: "10px 12px 10px 14px",
  marginBottom: "6px",
  position: "relative",
  overflow: "hidden",
};

interface Props {
  readonly position: Position;
  readonly onClose: (id: string) => void;
}

export default function PositionCard({ position, onClose }: Props) {
  const isLong = position.side === "Long";
  const sideColor = isLong ? "#00de0b" : "#ff5938";
  const isProfit = position.pnl >= 0;
  const pnlColor = isProfit ? "#00de0b" : "#ff5938";

  return (
    <div style={card}>
      {/* Left color bar */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "3px",
        background: sideColor,
      }} />

      {/* Row 1: Header + Close */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>
            {position.coin}
          </span>
          <span style={{ fontSize: "10px", fontWeight: 600, color: sideColor }}>
            {position.side} · {position.leverage}x · Isolated
          </span>
        </div>
        <button
          onClick={() => onClose(position.id)}
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#9f9f9f",
            background: "#1d1d1d",
            border: "1px solid #363636",
            borderRadius: "3px",
            padding: "2px 8px",
            cursor: "pointer",
            lineHeight: "16px",
          }}
        >
          Close
        </button>
      </div>

      {/* Row 2: Entry price */}
      <div style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>
        Entry <span style={{ color: "#9f9f9f" }}>{position.entryPrice}</span>
      </div>

      {/* Row 3: P&L + Size */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "4px",
      }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: pnlColor }}>
          {isProfit ? "+" : ""}{position.pnl} ({isProfit ? "+" : ""}{position.pnlPercent}%)
        </span>
        <span style={{ fontSize: "10px", color: "#666" }}>
          {position.size} {position.sizeUnit}
        </span>
      </div>

      {/* Row 4: TP/SL (if Auto) */}
      {position.isAuto && (position.tp || position.sl) && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "6px",
          paddingTop: "6px",
          borderTop: "1px solid #2c2c2c",
          fontSize: "10px",
        }}>
          <span style={{
            fontSize: "9px",
            fontWeight: 700,
            color: "#00de0b",
            background: "rgba(0,222,11,0.1)",
            borderRadius: "2px",
            padding: "1px 4px",
          }}>
            Auto
          </span>
          {position.tp != null && (
            <span style={{ color: "#666" }}>
              TP <span style={{ color: "#00de0b" }}>{position.tp.toLocaleString()}</span>
            </span>
          )}
          {position.sl != null && (
            <span style={{ color: "#666" }}>
              SL <span style={{ color: "#ff5938" }}>{position.sl.toLocaleString()}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

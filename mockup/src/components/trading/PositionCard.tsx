import type { Position } from "../../constants/positions";
import type { CSSProperties } from "react";

const card: CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-md)",
  padding: "14px",
  marginBottom: "8px",
};

const row: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "6px",
};

interface Props {
  readonly position: Position;
}

export default function PositionCard({ position }: Props) {
  const isProfit = position.pnl >= 0;

  return (
    <div style={{
      ...card,
      borderLeft: `3px solid ${isProfit ? "var(--accent-green)" : "var(--accent-red)"}`,
    }}>
      <div style={row}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: 600 }}>{position.coin}</span>
          <span style={{
            fontSize: "10px",
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: "3px",
            background: position.side === "Long" ? "rgba(0,214,143,0.15)" : "rgba(255,77,106,0.15)",
            color: position.side === "Long" ? "var(--accent-green)" : "var(--accent-red)",
          }}>
            {position.side}
          </span>
          {position.isAuto && (
            <span style={{
              fontSize: "9px",
              fontWeight: 700,
              padding: "2px 5px",
              borderRadius: "3px",
              background: "rgba(0,255,106,0.1)",
              color: "var(--color-pri-1)",
            }}>
              Auto
            </span>
          )}
        </div>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          {position.size} {position.sizeUnit}
        </span>
      </div>

      <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "6px" }}>
        <span>Entry: ${position.entryPrice.toLocaleString()}</span>
        <span>Mark: ${position.markPrice.toLocaleString()}</span>
      </div>

      <div style={row}>
        <span style={{
          fontSize: "14px",
          fontWeight: 600,
          color: isProfit ? "var(--accent-green)" : "var(--accent-red)",
        }}>
          {isProfit ? "+" : ""}${position.pnl.toFixed(2)} ({isProfit ? "+" : ""}{position.pnlPercent}%)
        </span>
      </div>

      {(position.tp || position.sl) && (
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", borderTop: "1px solid var(--border-color)", paddingTop: "6px", marginTop: "4px" }}>
          {position.tp && <span>TP: ${position.tp.toLocaleString()}</span>}
          {position.tp && position.sl && <span> / </span>}
          {position.sl && <span>SL: ${position.sl.toLocaleString()}</span>}
        </div>
      )}
    </div>
  );
}

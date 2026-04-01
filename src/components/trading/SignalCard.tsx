import type { Signal } from "../../constants/signals";
import type { CSSProperties } from "react";

interface Props {
  readonly signal: Signal;
  readonly onExecute: (id: string) => void;
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const isActive = (s: Signal) => s.status === "ACTIVE";

const STATUS_LABEL: Record<string, { text: string; color: string }> = {
  HIT_TP: { text: "HIT TP", color: "#00de0b" },
  HIT_SL: { text: "HIT SL", color: "#ff5938" },
  EXPIRED: { text: "EXPIRED", color: "#666" },
  CANCELLED: { text: "CANCELLED", color: "#666" },
};

const CONFIDENCE_COLOR: Record<string, string> = {
  HIGH: "#00de0b",
  MEDIUM: "#c89b00",
  LOW: "#666",
};

export default function SignalCard({ signal, onExecute }: Props) {
  const isLong = signal.direction === "LONG";
  const active = isActive(signal);
  const dirColor = isLong ? "#00de0b" : "#ff5938";

  const card: CSSProperties = {
    padding: "10px 0",
    borderBottom: "1px solid #2c2c2c",
    opacity: active ? 1 : 0.7,
  };

  return (
    <div style={card}>
      {/* Header: bar + pair + direction/status + confidence + time */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{
          width: "3px",
          height: "14px",
          borderRadius: "2px",
          background: active ? dirColor : "#666",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: "13px", fontWeight: 700 }}>{signal.pair}</span>
        {active ? (
          <span style={{ fontSize: "11px", fontWeight: 600, color: dirColor }}>
            {isLong ? "Long" : "Short"}
          </span>
        ) : (
          <span style={{
            fontSize: "10px",
            fontWeight: 600,
            color: STATUS_LABEL[signal.status]?.color,
            background: "rgba(255,255,255,0.05)",
            padding: "1px 4px",
            borderRadius: "2px",
          }}>
            {STATUS_LABEL[signal.status]?.text}
          </span>
        )}
        <span style={{
          fontSize: "10px",
          fontWeight: 500,
          color: CONFIDENCE_COLOR[signal.confidence],
          marginLeft: "auto",
        }}>
          {signal.confidence === "HIGH" ? "High" : signal.confidence === "MEDIUM" ? "Med" : "Low"}
        </span>
        <span style={{ fontSize: "10px", color: "#505050" }}>
          {relativeTime(signal.timestamp)}
        </span>
      </div>

      {/* Data: Entry / TP / SL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", marginTop: "6px" }}>
        <span style={{ fontSize: "10px", color: "#666" }}>Entry</span>
        <span style={{ fontSize: "10px", color: "#666" }}>TP</span>
        <span style={{ fontSize: "10px", color: "#666" }}>SL</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px" }}>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>{signal.entryPrice.toLocaleString()}</span>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#00de0b" }}>{signal.targetPrice.toLocaleString()}</span>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#ff5938" }}>{signal.stopLoss.toLocaleString()}</span>
      </div>

      {/* Reasoning */}
      <p style={{
        fontSize: "10px",
        color: "#505050",
        marginTop: "4px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {signal.reasoning}
      </p>

      {/* Closed result */}
      {!active && signal.pnlPercent !== undefined && (
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          marginTop: "4px",
          color: signal.pnlPercent >= 0 ? "#00de0b" : "#ff5938",
        }}>
          Result: {signal.pnlPercent >= 0 ? "+" : ""}{signal.pnlPercent}%
        </div>
      )}

      {/* CTA */}
      {active && (
        <button
          onClick={() => onExecute(signal.id)}
          style={{
            width: "100%",
            height: "28px",
            marginTop: "8px",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "3px",
            background: dirColor,
            color: "#151515",
            cursor: "pointer",
            fontFamily: "var(--font-family)",
          }}
        >
          Execute
        </button>
      )}
    </div>
  );
}

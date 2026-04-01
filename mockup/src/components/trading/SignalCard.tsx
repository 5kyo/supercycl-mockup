import type { Signal } from "../../constants/signals";
import type { CSSProperties } from "react";

interface Props {
  readonly signal: Signal;
  readonly onExecute: (id: string) => void;
  readonly onModify: (id: string) => void;
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

function ConfidenceDots({ level, color }: { readonly level: Signal["confidence"]; readonly color: string }) {
  const filled = level === "HIGH" ? 3 : level === "MEDIUM" ? 2 : 1;
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "3px",
            background: i < filled ? color : "#363636",
          }}
        />
      ))}
    </div>
  );
}

const isActive = (s: Signal) => s.status === "ACTIVE";

export default function SignalCard({ signal, onExecute, onModify }: Props) {
  const isLong = signal.direction === "LONG";
  const active = isActive(signal);
  const dirColor = isLong ? "#00de0b" : "#ff5938";

  const statusLabel: Record<string, { text: string; color: string }> = {
    HIT_TP: { text: "HIT TP", color: "#00de0b" },
    HIT_SL: { text: "HIT SL", color: "#ff5938" },
    EXPIRED: { text: "EXPIRED", color: "#666" },
    CANCELLED: { text: "CANCELLED", color: "#666" },
  };

  const card: CSSProperties = {
    padding: "16px 0",
    borderBottom: "1px solid #2c2c2c",
    opacity: active ? 1 : 0.7,
    animation: active ? "fadeInUp 0.3s ease-out" : undefined,
  };

  return (
    <div style={card}>
      {/* Row 1: Color bar + Pair + Direction + Time */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <div style={{
          width: "4px",
          height: "16px",
          borderRadius: "2px",
          background: active ? dirColor : "#666",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: "14px", fontWeight: 600 }}>{signal.pair}</span>
        {active ? (
          <span style={{ fontSize: "13px", fontWeight: 500, color: dirColor }}>
            {signal.direction === "LONG" ? "Long" : "Short"}
          </span>
        ) : (
          <span style={{ fontSize: "10px", fontWeight: 600, color: statusLabel[signal.status]?.color }}>
            {statusLabel[signal.status]?.text}
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: "9px", fontWeight: 500, color: "#505050" }}>
          {relativeTime(signal.timestamp)}
        </span>
      </div>

      {/* Row 2: Data grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 40px 40px", gap: "2px", marginBottom: "4px" }}>
        <span style={{ fontSize: "10px", color: "#666" }}>Entry Price</span>
        <span style={{ fontSize: "10px", color: "#666" }}>TP</span>
        <span style={{ fontSize: "10px", color: "#666" }}>SL</span>
        <span style={{ fontSize: "10px", color: "#666" }}>{signal.confidence === "HIGH" ? "High" : signal.confidence === "MEDIUM" ? "Medium" : "Low"}</span>
        <span style={{ fontSize: "10px", color: "#666" }}>R:R</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 40px 40px", gap: "2px", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>{signal.entryPrice}</span>
        <span style={{ fontSize: "12px", fontWeight: 500, color: dirColor }}>{signal.targetPrice.toLocaleString()}</span>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>{signal.stopLoss.toLocaleString()}</span>
        <ConfidenceDots level={signal.confidence} color={dirColor} />
        <span style={{ fontSize: "12px", fontWeight: 500 }}>1:1.5</span>
      </div>

      {/* Row 3: Reasoning */}
      <p style={{
        fontSize: "10px",
        color: "#363636",
        marginBottom: active ? "10px" : "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        "{signal.reasoning}"
      </p>

      {/* Closed signal PnL */}
      {!active && signal.pnlPercent !== undefined && (
        <div style={{
          fontSize: "13px",
          fontWeight: 600,
          marginTop: "6px",
          color: signal.pnlPercent >= 0 ? "#00de0b" : "#ff5938",
        }}>
          Result: {signal.pnlPercent >= 0 ? "+" : ""}{signal.pnlPercent}%
        </div>
      )}

      {/* CTA for active signals */}
      {active && (
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            onClick={() => onModify(signal.id)}
            style={{
              flex: 1,
              height: "26px",
              fontSize: "10px",
              fontWeight: 500,
              borderRadius: "2px",
              background: "#242424",
              color: "#e0e0e0",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
            }}
          >
            Modify
          </button>
          <button
            onClick={() => onExecute(signal.id)}
            style={{
              flex: 1,
              height: "26px",
              fontSize: "10px",
              fontWeight: 500,
              borderRadius: "2px",
              background: dirColor,
              color: "#151515",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
            }}
          >
            Execute Signal
          </button>
        </div>
      )}
    </div>
  );
}

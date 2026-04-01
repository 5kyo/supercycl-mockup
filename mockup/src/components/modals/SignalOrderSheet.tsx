import type { Signal } from "../../constants/signals";
import { ACCOUNT } from "../../constants/defaults";
import BottomSheet from "../common/BottomSheet";
import type { CSSProperties } from "react";

interface Props {
  readonly signal: Signal;
  readonly onExecute: () => void;
  readonly onModify: () => void;
  readonly onClose: () => void;
}

const row: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  fontSize: "13px",
};

export default function SignalOrderSheet({ signal, onExecute, onModify, onClose }: Props) {
  const isLong = signal.direction === "LONG";
  const tpPercent = Math.abs((signal.targetPrice - signal.entryPrice) / signal.entryPrice * 100).toFixed(2);
  const slPercent = Math.abs((signal.stopLoss - signal.entryPrice) / signal.entryPrice * 100).toFixed(2);

  return (
    <BottomSheet onClose={onClose} title="Signal Order Confirm">
      <div style={{ padding: "0 20px 20px" }}>
        {/* Signal summary */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ fontSize: "16px", fontWeight: 700 }}>{signal.pair}</span>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px",
            background: isLong ? "rgba(0,214,143,0.15)" : "rgba(255,77,106,0.15)",
            color: isLong ? "var(--accent-green)" : "var(--accent-red)",
          }}>
            {signal.direction}
          </span>
        </div>

        {/* Details */}
        <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", padding: "12px 14px", marginBottom: "16px" }}>
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>Order Type</span>
            <span>Limit</span>
          </div>
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>Entry Price</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>${signal.entryPrice.toLocaleString()}</span>
          </div>
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>Quantity</span>
            <span style={{ color: "var(--text-secondary)" }}>{ACCOUNT.balance} {ACCOUNT.currency} based</span>
          </div>
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>Leverage</span>
            <span>{signal.leverage}x</span>
          </div>
          <div style={{ ...row, borderTop: "1px solid var(--border-color)", marginTop: "4px", paddingTop: "12px" }}>
            <span style={{ color: "var(--accent-green)" }}>TP: ${signal.targetPrice.toLocaleString()}</span>
            <span style={{ color: "var(--accent-green)", fontSize: "12px" }}>+{tpPercent}%</span>
          </div>
          <div style={row}>
            <span style={{ color: "var(--accent-red)" }}>SL: ${signal.stopLoss.toLocaleString()}</span>
            <span style={{ color: "var(--accent-red)", fontSize: "12px" }}>-{slPercent}%</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onModify}
            style={{
              flex: 1,
              padding: "14px",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-color)",
            }}
          >
            Modify
          </button>
          <button
            onClick={onExecute}
            style={{
              flex: 2,
              padding: "14px",
              fontSize: "14px",
              fontWeight: 700,
              borderRadius: "var(--radius-md)",
              background: isLong ? "var(--accent-green)" : "var(--accent-red)",
              color: "#fff",
            }}
          >
            Execute Order
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

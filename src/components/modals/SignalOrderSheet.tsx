import { useState } from "react";
import type { Signal } from "../../constants/signals";
import { ACCOUNT, MAX_LEVERAGE, MIN_LEVERAGE } from "../../constants/defaults";
import { useTranslation } from "../../i18n";
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
  alignItems: "center",
  padding: "8px 0",
  fontSize: "13px",
};

const editInput: CSSProperties = {
  background: "#1d1d1d",
  border: "1px solid #363636",
  borderRadius: "4px",
  padding: "6px 10px",
  fontSize: "13px",
  color: "#fff",
  fontFamily: "var(--font-family)",
  textAlign: "right" as const,
  width: "120px",
  outline: "none",
};

export default function SignalOrderSheet({ signal, onExecute, onModify: _onModify, onClose }: Props) {
  const { t } = useTranslation();
  const isLong = signal.direction === "LONG";
  const [editing, setEditing] = useState(false);
  const [leverage, setLeverage] = useState(signal.leverage);
  const [quantity, setQuantity] = useState(ACCOUNT.balance.toString());

  const tpPercent = Math.abs((signal.targetPrice - signal.entryPrice) / signal.entryPrice * 100).toFixed(2);
  const slPercent = Math.abs((signal.stopLoss - signal.entryPrice) / signal.entryPrice * 100).toFixed(2);

  const handleModify = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  return (
    <BottomSheet onClose={onClose} title={t("signal.orderConfirm")}>
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
            <span style={{ color: "var(--text-tertiary)" }}>{t("signal.orderType")}</span>
            <span>{t("trade.limit")}</span>
          </div>
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>{t("signal.entryPrice")}</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>${signal.entryPrice.toLocaleString()}</span>
          </div>

          {/* Quantity — editable */}
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>{t("signal.margin")}</span>
            {editing ? (
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input
                  style={editInput}
                  type="text"
                  inputMode="decimal"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <span style={{ fontSize: "11px", color: "#666" }}>USDC</span>
              </div>
            ) : (
              <span style={{ color: "var(--text-secondary)" }}>{t("signal.usdcBased", { amount: quantity, currency: ACCOUNT.currency })}</span>
            )}
          </div>

          {/* Leverage — editable */}
          <div style={row}>
            <span style={{ color: "var(--text-tertiary)" }}>{t("signal.leverage")}</span>
            {editing ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => setLeverage(Math.max(MIN_LEVERAGE, leverage - 1))}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    background: "#1d1d1d",
                    border: "1px solid #363636",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: "14px", fontWeight: 600, minWidth: "24px", textAlign: "center" }}>
                  {leverage}x
                </span>
                <button
                  onClick={() => setLeverage(Math.min(MAX_LEVERAGE, leverage + 1))}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    background: "#1d1d1d",
                    border: "1px solid #363636",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <span>{leverage}x</span>
            )}
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
            onClick={handleModify}
            style={{
              flex: 1,
              padding: "14px",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              background: editing ? "#1d1d1d" : "var(--bg-card)",
              color: editing ? "#00de0b" : "var(--text-secondary)",
              border: editing ? "1px solid #00de0b" : "1px solid var(--border-color)",
            }}
          >
            {editing ? t("signal.done") : t("signal.modify")}
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
            {t("signal.executeOrder")}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

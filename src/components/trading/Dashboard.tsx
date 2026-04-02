import { useState, useCallback } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n";
import PositionCard from "./PositionCard";
import type { CSSProperties } from "react";

const container: CSSProperties = {
  padding: "12px 16px",
  background: "var(--bg-secondary)",
  borderTop: "1px solid var(--border-color)",
};

type Tab = "positions" | "open";

const tabStyle = (active: boolean): CSSProperties => ({
  padding: "8px 16px",
  fontSize: "12px",
  fontWeight: active ? 600 : 400,
  color: active ? "var(--text-primary)" : "var(--text-tertiary)",
  background: "none",
  borderBottom: active ? "2px solid var(--color-pri-1)" : "2px solid transparent",
});

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("positions");
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  const handleClose = useCallback((id: string) => {
    dispatch({ type: "CLOSE_POSITION", id });
    dispatch({ type: "SHOW_TOAST", message: t("trade.positionClosed") });
  }, [dispatch, t]);

  const handleCancel = useCallback((orderId: string) => {
    dispatch({ type: "CANCEL_ORDER", orderId });
    dispatch({ type: "SHOW_TOAST", message: t("trade.orderCancelled") });
  }, [dispatch, t]);

  return (
    <div style={container}>
      <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--border-color)", marginBottom: "12px" }}>
        {([["positions", t("trade.positions")], ["open", t("trade.openOrder")]] as const).map(([key, label]) => (
          <button key={key} style={tabStyle(tab === key)} onClick={() => setTab(key as Tab)}>
            {label}
            {key === "open" && state.openOrders.length > 0 && (
              <span style={{ marginLeft: "4px", fontSize: "10px", background: "var(--accent-yellow)", color: "#0a0a0a", borderRadius: "8px", padding: "1px 5px", fontWeight: 700 }}>
                {state.openOrders.length}
              </span>
            )}
            {key === "positions" && state.positions.length > 0 && (
              <span style={{ marginLeft: "4px", fontSize: "10px", background: "var(--color-pri-1)", color: "#0a0a0a", borderRadius: "8px", padding: "1px 5px", fontWeight: 700 }}>
                {state.positions.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "positions" && (
        state.positions.length > 0
          ? state.positions.map((p) => <PositionCard key={p.id} position={p} onClose={handleClose} />)
          : <Empty label={t("trade.noPositions")} />
      )}

      {tab === "open" && (
        state.openOrders.length > 0
          ? state.openOrders.map((o) => (
            <div key={o.id} style={{
              background: "var(--bg-card)",
              borderRadius: "4px",
              padding: "10px 12px",
              marginBottom: "8px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: "8px",
                bottom: "8px",
                width: "3px",
                borderRadius: "0 2px 2px 0",
                background: o.side === "Long" ? "var(--accent-green)" : "var(--accent-red)",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{o.coin}</span>
                  <span style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    color: o.side === "Long" ? "var(--accent-green)" : "var(--accent-red)",
                  }}>
                    {o.side === "Long" ? "Long" : "Short"} · {o.leverage}x · Limit
                  </span>
                </div>
                <button
                  onClick={() => handleCancel(o.id)}
                  style={{
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "4px",
                    color: "var(--text-secondary)",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontFamily: "var(--font-family)",
                  }}
                >
                  {t("common.cancel")}
                </button>
              </div>
              <div style={{ display: "flex", gap: "16px", fontSize: "10px", color: "var(--text-secondary)" }}>
                <span>Price <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{o.limitPrice.toLocaleString()}</span></span>
                <span>Size <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{o.size} {o.symbol}</span></span>
              </div>
            </div>
          ))
          : <Empty label={t("trade.noOrders")} />
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 0", fontSize: "13px", color: "var(--text-tertiary)" }}>
      {label}
    </div>
  );
}

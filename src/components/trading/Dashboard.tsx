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

  return (
    <div style={container}>
      <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--border-color)", marginBottom: "12px" }}>
        {([["positions", t("trade.positions")], ["open", t("trade.openOrder")]] as const).map(([key, label]) => (
          <button key={key} style={tabStyle(tab === key)} onClick={() => setTab(key as Tab)}>
            {label}
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

      {tab === "open" && <Empty label={t("trade.noOrders")} />}
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

import { useState } from "react";
import { useApp } from "../context/AppContext";
import { SIGNAL_STATS, type Signal, type SignalFilter } from "../constants/signals";
import SignalCard from "../components/trading/SignalCard";
import SignalOrderSheet from "../components/modals/SignalOrderSheet";
import { useTranslation } from "../i18n";
import type { CSSProperties } from "react";

const FILTER_KEYS: readonly { key: SignalFilter; labelKey: "filter.all" | "filter.long" | "filter.short" | "filter.active" | "filter.closed" }[] = [
  { key: "ALL", labelKey: "filter.all" },
  { key: "LONG", labelKey: "filter.long" },
  { key: "SHORT", labelKey: "filter.short" },
  { key: "ACTIVE", labelKey: "filter.active" },
  { key: "CLOSED", labelKey: "filter.closed" },
];

const CLOSED_STATUSES = new Set(["HIT_TP", "HIT_SL", "EXPIRED", "CANCELLED"]);

function filterSignals(signals: readonly Signal[], filter: SignalFilter): readonly Signal[] {
  switch (filter) {
    case "ALL": return signals;
    case "LONG": return signals.filter((s) => s.direction === "LONG");
    case "SHORT": return signals.filter((s) => s.direction === "SHORT");
    case "ACTIVE": return signals.filter((s) => s.status === "ACTIVE");
    case "CLOSED": return signals.filter((s) => CLOSED_STATUSES.has(s.status));
    default: return signals;
  }
}

const perfSection: CSSProperties = {
  padding: "12px 16px 8px",
};

const statsRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0",
  marginTop: "8px",
};

const statItem: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  paddingRight: "16px",
};

const divider: CSSProperties = {
  width: "1px",
  height: "24px",
  background: "#2c2c2c",
  marginRight: "16px",
};

const filterTab = (active: boolean): CSSProperties => ({
  background: "none",
  padding: "0 0 6px",
  marginRight: "16px",
  fontSize: "12px",
  fontWeight: 500,
  color: active ? "#fff" : "#666",
  position: "relative" as const,
  cursor: "pointer",
  fontFamily: "var(--font-family)",
});

export default function SignalPage() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const { signals, filter } = state.signalState;
  const [sheetSignal, setSheetSignal] = useState<Signal | null>(null);

  const filtered = filterSignals(signals, filter);

  const handleExecute = (id: string) => {
    const signal = signals.find((s) => s.id === id);
    if (signal) setSheetSignal(signal);
  };


  const handleSheetExecute = () => {
    if (!sheetSignal) return;
    dispatch({ type: "EXECUTE_SIGNAL_ORDER", signalId: sheetSignal.id });
    dispatch({ type: "SHOW_TOAST", message: t("signal.orderExecuted") });
    setSheetSignal(null);
  };

  const handleSheetModify = () => {
    if (!sheetSignal) return;
    dispatch({
      type: "PREFILL_FROM_SIGNAL",
      prefill: {
        coinSymbol: sheetSignal.coin,
        price: sheetSignal.entryPrice,
        leverage: sheetSignal.leverage,
        tp: sheetSignal.targetPrice,
        sl: sheetSignal.stopLoss,
        side: sheetSignal.direction === "LONG" ? "Long" : "Short",
      },
    });
    setSheetSignal(null);
  };

  return (
    <div>
      {/* Performance Summary */}
      <div style={perfSection}>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "#666" }}>
          {t("signal.performance")}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "8px" }}>
          <div style={statsRow}>
            <div style={statItem}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "#00de0b" }}>{t("signal.hit")}</span>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>{SIGNAL_STATS.hitCount}</span>
            </div>
            <div style={divider} />
            <div style={statItem}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "#ff5938" }}>{t("signal.miss")}</span>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>{SIGNAL_STATS.missCount}</span>
            </div>
            <div style={divider} />
            <div style={statItem}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "#666" }}>{t("signal.expired")}</span>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>{SIGNAL_STATS.expiredCount}</span>
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: "11px", lineHeight: "15px" }}>
            <div>
              <span style={{ color: "#9f9f9f" }}>{t("signal.avgPnl")} </span>
              <span style={{ color: "#00de0b", fontWeight: 700 }}>+{SIGNAL_STATS.avgPnlPercent}%</span>
            </div>
            <div style={{ marginTop: "2px" }}>
              <span style={{ color: "#9f9f9f" }}>{t("signal.hitRate")} </span>
              <span style={{ color: "#00de0b", fontWeight: 700 }}>{SIGNAL_STATS.hitRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", padding: "0 16px 8px" }}>
        {FILTER_KEYS.map(({ key, labelKey }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => dispatch({ type: "SET_SIGNAL_FILTER", filter: key })}
              style={filterTab(active)}
            >
              {t(labelKey)}
              {active && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "16px",
                  height: "2px",
                  borderRadius: "2px",
                  background: "#fff",
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Signal List */}
      <div style={{ padding: "0 16px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "14px", color: "#666" }}>
              {t("signal.noSignals")}
            </div>
          </div>
        ) : (
          filtered.map((signal) => (
            <SignalCard
              key={signal.id}
              signal={signal}
              onExecute={handleExecute}
            />
          ))
        )}
      </div>

      {sheetSignal && (
        <SignalOrderSheet
          signal={sheetSignal}
          onExecute={handleSheetExecute}
          onModify={handleSheetModify}
          onClose={() => setSheetSignal(null)}
        />
      )}
    </div>
  );
}

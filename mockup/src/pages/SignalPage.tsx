import { useState } from "react";
import { useApp } from "../context/AppContext";
import { SIGNAL_STATS, type Signal, type SignalFilter } from "../constants/signals";
import SignalCard from "../components/trading/SignalCard";
import SignalOrderSheet from "../components/modals/SignalOrderSheet";
import type { CSSProperties } from "react";

const FILTERS: readonly { key: SignalFilter; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "LONG", label: "Long" },
  { key: "SHORT", label: "Short" },
  { key: "ACTIVE", label: "Active" },
  { key: "CLOSED", label: "Closed" },
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
  fontSize: "9px",
  fontWeight: 500,
  color: active ? "#fff" : "#666",
  position: "relative" as const,
  cursor: "pointer",
  fontFamily: "var(--font-family)",
});

export default function SignalPage() {
  const { state, dispatch } = useApp();
  const { signals, filter } = state.signalState;
  const [sheetSignal, setSheetSignal] = useState<Signal | null>(null);

  const filtered = filterSignals(signals, filter);

  const handleExecute = (id: string) => {
    const signal = signals.find((s) => s.id === id);
    if (signal) setSheetSignal(signal);
  };

  const handleModify = (id: string) => {
    const signal = signals.find((s) => s.id === id);
    if (!signal) return;
    dispatch({
      type: "PREFILL_FROM_SIGNAL",
      prefill: {
        coinSymbol: signal.coin,
        price: signal.entryPrice,
        leverage: signal.leverage,
        tp: signal.targetPrice,
        sl: signal.stopLoss,
        side: signal.direction === "LONG" ? "Long" : "Short",
      },
    });
    dispatch({ type: "SHOW_TOAST", message: "Signal values loaded into order form" });
  };

  const handleSheetExecute = () => {
    if (!sheetSignal) return;
    dispatch({ type: "EXECUTE_SIGNAL_ORDER", signalId: sheetSignal.id });
    dispatch({ type: "SHOW_TOAST", message: "Order executed from signal" });
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
        <p style={{ fontSize: "10px", fontWeight: 500, color: "#666" }}>
          Last 30 days performance
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "8px" }}>
          <div style={statsRow}>
            <div style={statItem}>
              <span style={{ fontSize: "10px", fontWeight: 500, color: "#00de0b" }}>Hit</span>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>{SIGNAL_STATS.hitCount}</span>
            </div>
            <div style={divider} />
            <div style={statItem}>
              <span style={{ fontSize: "10px", fontWeight: 500, color: "#ff5938" }}>Miss</span>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>{SIGNAL_STATS.missCount}</span>
            </div>
            <div style={divider} />
            <div style={statItem}>
              <span style={{ fontSize: "10px", fontWeight: 500, color: "#666" }}>Expired</span>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>{SIGNAL_STATS.expiredCount}</span>
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: "9px", lineHeight: "13px" }}>
            <div>
              <span style={{ color: "#9f9f9f" }}>Avg PnL </span>
              <span style={{ color: "#00de0b", fontWeight: 700 }}>+{SIGNAL_STATS.avgPnlPercent}%</span>
            </div>
            <div style={{ marginTop: "2px" }}>
              <span style={{ color: "#9f9f9f" }}>Hit Rate </span>
              <span style={{ color: "#00de0b", fontWeight: 700 }}>{SIGNAL_STATS.hitRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", padding: "0 16px 8px" }}>
        {FILTERS.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => dispatch({ type: "SET_SIGNAL_FILTER", filter: key })}
              style={filterTab(active)}
            >
              {label}
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
              No signals matching this filter
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

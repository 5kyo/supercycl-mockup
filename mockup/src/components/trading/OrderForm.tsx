import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import type { CSSProperties } from "react";

const container: CSSProperties = {
  padding: "8px 0 0",
  background: "#050505",
};

const dropdown: CSSProperties = {
  background: "#1d1d1d",
  borderRadius: "2px",
  padding: "6px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "11px",
  fontWeight: 600,
  color: "#e0e0e0",
  cursor: "pointer",
};

const inputBox: CSSProperties = {
  background: "#1d1d1d",
  borderRadius: "2px",
  padding: "0 10px",
  height: "30px",
  position: "relative",
};

const inputLabel: CSSProperties = {
  fontSize: "8px",
  fontWeight: 500,
  color: "#9f9f9f",
  lineHeight: "13px",
};

const inputValue: CSSProperties = {
  fontSize: "12px",
  color: "#fff",
  background: "none",
  border: "none",
  outline: "none",
  fontFamily: "var(--font-family)",
  width: "100%",
  padding: 0,
};

const Arrow = () => (
  <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
    <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="#9f9f9f" strokeWidth="0.8" />
  </svg>
);

interface Props {
  readonly onLeverageTap: () => void;
  readonly onTpSlEdit: () => void;
}

export default function OrderForm({ onLeverageTap, onTpSlEdit: _onTpSlEdit }: Props) {
  const { state, dispatch } = useApp();
  const [price, setPrice] = useState(state.selectedCoin.price.toString());
  const [size, setSize] = useState("611,000,000");
  const [sizePercent, setSizePercent] = useState(50);

  useEffect(() => {
    if (state.prefillData) {
      setPrice(state.prefillData.price.toString());
    }
  }, [state.prefillData]);

  const handleOrder = (side: "Long" | "Short") => {
    dispatch({ type: "PLACE_ORDER", side });
    const label = side === "Long" ? "Buy/Long" : "Sell/Short";
    const tpslMsg = state.autoTpSlEnabled
      ? ` | Auto TP: +${state.takeProfitPercent}% / SL: -${state.stopLossPercent}%`
      : "";
    dispatch({ type: "SHOW_TOAST", message: `${label} ${state.selectedCoin.symbol} order placed${tpslMsg}` });
    if (state.prefillData) {
      dispatch({ type: "CLEAR_PREFILL" });
    }
  };

  const dots = [0, 25, 50, 75, 100];
  const activeIndex = dots.findIndex((d) => d >= sizePercent);

  return (
    <div style={container}>
      {/* Market dropdown */}
      <div style={{ ...dropdown, width: "190px", height: "28px", marginBottom: "4px" }}>
        <span>Market</span>
        <Arrow />
      </div>

      {/* Isolated + Leverage row */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        <div style={{ ...dropdown, width: "110px", height: "28px" }}>
          <span>Isolated</span>
          <Arrow />
        </div>
        <div style={{ ...dropdown, width: "77px", height: "28px" }} onClick={onLeverageTap}>
          <span>{state.leverage}x(Max)</span>
          <Arrow />
        </div>
      </div>

      {/* Price input */}
      {state.orderType !== "market" && (
        <div style={{ ...inputBox, width: "138px", marginBottom: "4px" }}>
          <span style={inputLabel}>Price (USDT)</span>
          <input
            style={inputValue}
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      )}

      {/* Size input */}
      <div style={{ ...inputBox, width: "190px", marginBottom: "6px" }}>
        <span style={inputLabel}>Size</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <input
            style={{ ...inputValue, flex: 1 }}
            type="text"
            inputMode="decimal"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "12px", color: "#00de0b" }}>{state.selectedCoin.symbol}</span>
            <Arrow />
          </div>
        </div>
      </div>

      {/* Size slider */}
      <div style={{ position: "relative", height: "22px", marginBottom: "8px" }}>
        <input
          type="range"
          min="0"
          max="100"
          value={sizePercent}
          onChange={(e) => setSizePercent(Number(e.target.value))}
          style={{
            width: "190px",
            appearance: "none",
            background: "transparent",
            position: "absolute",
            top: "2px",
            left: 0,
            zIndex: 2,
            height: "16px",
            cursor: "pointer",
          }}
        />
        <div style={{
          position: "absolute",
          top: "8px",
          left: 0,
          width: "190px",
          height: "6px",
          background: "#242424",
          borderRadius: "3px",
        }}>
          <div style={{
            width: `${sizePercent}%`,
            height: "100%",
            background: "#9f9f9f",
            borderRadius: "3px",
          }} />
        </div>
        <div style={{
          position: "absolute",
          top: "8px",
          left: 0,
          width: "190px",
          display: "flex",
          justifyContent: "space-between",
        }}>
          {dots.map((d, i) => (
            <div
              key={d}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "4px",
                background: i <= activeIndex && sizePercent >= d ? "#9f9f9f" : "#363636",
                border: i <= activeIndex && sizePercent >= d ? "0.5px solid #9f9f9f" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Cost info */}
      <div style={{ fontSize: "9px", fontWeight: 500, lineHeight: "13px", marginBottom: "2px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#9f9f9f" }}>Cost</span>
          <span>
            <span style={{ color: "#00de0b" }}>1,000.33</span>
            <span style={{ color: "#9f9f9f" }}> / </span>
            <span style={{ color: "#ff5938" }}>1,000.32</span>
            <span style={{ color: "#9f9f9f" }}> USDT</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#9f9f9f" }}>Long Est. Liquidation Price</span>
          <span><span style={{ color: "#00de0b" }}>600.3</span><span style={{ color: "#9f9f9f" }}> USDT</span></span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#9f9f9f" }}>Short Est. Liquidation Price</span>
          <span><span style={{ color: "#ff5938" }}>1,400.3</span><span style={{ color: "#9f9f9f" }}> USDT</span></span>
        </div>
      </div>

      {/* Buy/Sell buttons */}
      <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
        <button
          onClick={() => handleOrder("Long")}
          style={{
            flex: 1,
            height: "36px",
            background: "#00de0b",
            color: "#151515",
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "var(--font-family)",
            cursor: "pointer",
          }}
        >
          Buy / Long
        </button>
        <button
          onClick={() => handleOrder("Short")}
          style={{
            flex: 1,
            height: "36px",
            background: "#ff5938",
            color: "#151515",
            borderRadius: "3px",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "var(--font-family)",
            cursor: "pointer",
          }}
        >
          Sell / Short
        </button>
      </div>
    </div>
  );
}

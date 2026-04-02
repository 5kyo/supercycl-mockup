import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n";
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
  boxSizing: "border-box",
};

const inputBox: CSSProperties = {
  background: "#1d1d1d",
  borderRadius: "2px",
  padding: "0 10px",
  height: "30px",
  position: "relative",
  boxSizing: "border-box",
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
  width: 0,
  minWidth: 0,
  padding: 0,
};

const Arrow = ({ open = false }: { readonly open?: boolean }) => (
  <svg
    width="6"
    height="4"
    viewBox="0 0 6 4"
    fill="none"
    style={{
      transition: "transform 0.15s ease-out",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path d="M0.5 0.5L3 3.5L5.5 0.5" stroke="#9f9f9f" strokeWidth="0.8" />
  </svg>
);

interface Props {
  readonly onLeverageTap: () => void;
  readonly onTpSlEdit: () => void;
}

export default function OrderForm({ onLeverageTap, onTpSlEdit: _onTpSlEdit }: Props) {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [price, setPrice] = useState(state.selectedCoin.price.toString());
  const [size, setSize] = useState("0.001");
  const [sizePercent, setSizePercent] = useState(50);
  const [orderTypeOpen, setOrderTypeOpen] = useState(false);

  useEffect(() => {
    if (state.prefillData) {
      setPrice(state.prefillData.price.toString());
    }
  }, [state.prefillData]);

  const handleOrder = (side: "Long" | "Short") => {
    dispatch({ type: "PLACE_ORDER", side });
    const label = side === "Long" ? t("trade.buyLong") : t("trade.sellShort");
    const tpslMsg = state.autoTpSlEnabled
      ? ` | Auto TP: +${state.takeProfitPercent}% / SL: -${state.stopLossPercent}%`
      : "";
    dispatch({ type: "SHOW_TOAST", message: t("trade.orderPlaced", { label, symbol: state.selectedCoin.symbol, tpsl: tpslMsg }) });
    if (state.prefillData) {
      dispatch({ type: "CLEAR_PREFILL" });
    }
  };

  const dots = [0, 25, 50, 75, 100];
  const activeIndex = dots.findIndex((d) => d >= sizePercent);

  return (
    <div style={container}>
      {/* Order type dropdown */}
      <div style={{ position: "relative", marginBottom: "4px" }}>
        <div
          style={{ ...dropdown, height: "28px" }}
          onClick={() => setOrderTypeOpen((prev) => !prev)}
        >
          <span>{state.orderType === "market" ? t("trade.market") : t("trade.limit")}</span>
          <Arrow open={orderTypeOpen} />
        </div>
        {orderTypeOpen && (
          <div style={{
            position: "absolute",
            top: "30px",
            left: 0,
            right: 0,
            background: "#1d1d1d",
            border: "1px solid #2c2c2c",
            borderRadius: "4px",
            zIndex: 10,
            overflow: "hidden",
          }}>
            {(["market", "limit"] as const).map((type) => (
              <div
                key={type}
                onClick={() => {
                  dispatch({ type: "SET_ORDER_TYPE", orderType: type });
                  setOrderTypeOpen(false);
                }}
                style={{
                  padding: "8px 10px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: state.orderType === type ? "#fff" : "#9f9f9f",
                  background: state.orderType === type ? "#2c2c2c" : "transparent",
                  cursor: "pointer",
                }}
              >
                {type === "market" ? t("trade.market") : t("trade.limit")}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Isolated + Leverage row */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        <div style={{ ...dropdown, flex: 1, height: "28px" }}>
          <span>{t("common.isolated")}</span>
        </div>
        <div style={{ ...dropdown, flex: "0 0 auto", height: "28px", minWidth: "68px" }} onClick={onLeverageTap}>
          <span>{state.leverage}x</span>
          <Arrow />
        </div>
      </div>

      {/* Price input */}
      {state.orderType !== "market" && (
        <div style={{ ...inputBox, marginBottom: "4px" }}>
          <span style={inputLabel}>{t("trade.priceUsdc")}</span>
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
      <div style={{ ...inputBox, marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
          <input
            style={{ ...inputValue, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}
            type="text"
            inputMode="decimal"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <span style={{ fontSize: "12px", color: "#00de0b", flexShrink: 0 }}>{state.selectedCoin.symbol}</span>
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
            width: "100%",
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
          width: "100%",
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
          width: "100%",
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
          {t("trade.buyLong")}
        </button>
        <button
          onClick={() => handleOrder("Short")}
          style={{
            flex: 1,
            height: "36px",
            background: "#ff5938",
            color: "#151515",
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "var(--font-family)",
            cursor: "pointer",
          }}
        >
          {t("trade.sellShort")}
        </button>
      </div>
    </div>
  );
}

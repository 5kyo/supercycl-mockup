import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { MAX_LEVERAGE, MIN_LEVERAGE } from "../../constants/defaults";

interface Props {
  readonly onClose: () => void;
}

export default function AdjustLeverage({ onClose }: Props) {
  const { state, dispatch } = useApp();
  const [value, setValue] = useState(state.leverage);

  const handleConfirm = () => {
    dispatch({ type: "SET_LEVERAGE", leverage: value });
    onClose();
  };

  return (
    <Modal title="Adjust Leverage" onClose={onClose}>
      <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "8px" }}>
        {state.selectedCoin.symbol}USDT Perp | Isolated
      </div>

      {/* Warning banner */}
      <div style={{
        background: "rgba(240,185,11,0.1)",
        border: "1px solid rgba(240,185,11,0.3)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ fontSize: "16px" }}>&#9888;</span>
        <span style={{ fontSize: "12px", color: "var(--accent-yellow)" }}>
          Max leverage limited to 2x (User Protection)
        </span>
      </div>

      {/* Value display */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{
          display: "inline-block",
          background: "var(--bg-input)",
          borderRadius: "var(--radius-md)",
          padding: "12px 32px",
          fontSize: "28px",
          fontWeight: 700,
        }}>
          {value}x
        </div>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: "8px" }}>
        <input
          type="range"
          min={MIN_LEVERAGE}
          max={MAX_LEVERAGE}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent-yellow)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-tertiary)" }}>
          <span>{MIN_LEVERAGE}x</span>
          <span>{MAX_LEVERAGE}x</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
        <Button fullWidth onClick={handleConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
}

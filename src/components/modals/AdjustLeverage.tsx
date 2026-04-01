import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { MAX_LEVERAGE, MIN_LEVERAGE } from "../../constants/defaults";

interface Props {
  readonly onClose: () => void;
}

export default function AdjustLeverage({ onClose }: Props) {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [value, setValue] = useState(state.leverage);

  const handleConfirm = () => {
    dispatch({ type: "SET_LEVERAGE", leverage: value });
    onClose();
  };

  return (
    <Modal title={t("leverage.title")} onClose={onClose}>
      <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "8px" }}>
        {state.selectedCoin.symbol}USDT Perp | {t("common.isolated")}
      </div>

      {/* Warning banner */}
      <div style={{
        background: "rgba(0,222,11,0.06)",
        border: "1px solid rgba(0,222,11,0.2)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#00de0b" strokeWidth="1.5" />
          <path d="M8 4.5V8.5" stroke="#00de0b" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="#00de0b" />
        </svg>
        <span style={{ fontSize: "12px", color: "#00de0b" }}>
          {t("leverage.maxWarning", { max: MAX_LEVERAGE })}
        </span>
      </div>

      {/* Value display */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{
          display: "inline-block",
          background: "var(--bg-input)",
          border: "1px solid var(--border-color)",
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
          style={{ width: "100%", accentColor: "#00de0b" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-tertiary)" }}>
          <span>{MIN_LEVERAGE}x</span>
          <span>{MAX_LEVERAGE}x</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button variant="secondary" fullWidth onClick={onClose}>{t("common.cancel")}</Button>
        <Button fullWidth onClick={handleConfirm}>{t("common.confirm")}</Button>
      </div>
    </Modal>
  );
}

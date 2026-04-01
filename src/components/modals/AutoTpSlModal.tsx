import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n";
import Modal from "../common/Modal";
import Button from "../common/Button";
import type { CSSProperties } from "react";

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "var(--bg-input)",
  color: "var(--text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "14px",
  border: "1px solid var(--border-color)",
};

interface Props {
  readonly onClose: () => void;
}

export default function AutoTpSlModal({ onClose }: Props) {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [tp, setTp] = useState(state.takeProfitPercent.toString());
  const [sl, setSl] = useState(state.stopLossPercent.toString());

  const tpNum = parseFloat(tp) || 0;
  const slNum = parseFloat(sl) || 0;
  const isValid = tpNum > 0 || slNum > 0;

  const handleConfirm = () => {
    dispatch({ type: "UPDATE_TP_SL", tp: tpNum, sl: slNum });
    onClose();
  };

  return (
    <Modal title={t("tpsl.title")} onClose={onClose}>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
          {t("tpsl.takeProfit")}
        </label>
        <div style={{ position: "relative" }}>
          <input
            style={inputStyle}
            type="text"
            inputMode="decimal"
            value={tp}
            onChange={(e) => setTp(e.target.value)}
            placeholder="0.0"
          />
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "var(--text-tertiary)" }}>%</span>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
          {t("tpsl.stopLoss")}
        </label>
        <div style={{ position: "relative" }}>
          <input
            style={inputStyle}
            type="text"
            inputMode="decimal"
            value={sl}
            onChange={(e) => setSl(e.target.value)}
            placeholder="0.0"
          />
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "var(--text-tertiary)" }}>%</span>
        </div>
      </div>

      <p style={{ fontSize: "11px", color: "var(--text-tertiary)", lineHeight: 1.5, marginBottom: "20px" }}>
        {t("tpsl.note")}
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="secondary" fullWidth onClick={onClose}>{t("common.cancel")}</Button>
        <Button fullWidth disabled={!isValid} onClick={handleConfirm}>{t("common.confirm")}</Button>
      </div>
    </Modal>
  );
}

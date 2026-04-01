import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function LeverageNotice() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  if (state.hasSeenLeverageNotice) return null;

  return (
    <Modal showClose={false}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
          {t("leverage.noticeTitle")}
        </div>

        <div style={{
          fontSize: "36px",
          marginBottom: "16px",
          color: "var(--accent-yellow)",
        }}>
          &#9888;
        </div>

        <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
          {t("leverage.noticeBody", { max: 2 })}
        </p>

        <Button
          fullWidth
          onClick={() => dispatch({ type: "DISMISS_LEVERAGE_NOTICE" })}
        >
          {t("leverage.understand")}
        </Button>
      </div>
    </Modal>
  );
}

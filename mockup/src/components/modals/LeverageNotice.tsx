import { useApp } from "../../context/AppContext";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function LeverageNotice() {
  const { state, dispatch } = useApp();

  if (state.hasSeenLeverageNotice) return null;

  return (
    <Modal showClose={false}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
          Leverage Policy Notice
        </div>

        <div style={{
          fontSize: "36px",
          marginBottom: "16px",
          color: "var(--accent-yellow)",
        }}>
          &#9888;
        </div>

        <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
          This account has a maximum leverage limit of <strong style={{ color: "var(--text-primary)" }}>2x</strong> under the user protection policy.
        </p>

        <Button
          fullWidth
          onClick={() => dispatch({ type: "DISMISS_LEVERAGE_NOTICE" })}
        >
          I Understand
        </Button>
      </div>
    </Modal>
  );
}

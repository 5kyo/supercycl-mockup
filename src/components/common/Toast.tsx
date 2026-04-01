import { useEffect, type CSSProperties } from "react";
import { useApp } from "../../context/AppContext";

const container: CSSProperties = {
  position: "fixed",
  bottom: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--radius-md)",
  padding: "12px 20px",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--text-primary)",
  zIndex: 200,
  maxWidth: "360px",
  textAlign: "center",
  animation: "toastIn 0.3s ease-out",
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
};

export default function Toast() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (state.toastMessage) {
      const timer = setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.toastMessage, dispatch]);

  if (!state.toastMessage) return null;

  return <div style={container}>{state.toastMessage}</div>;
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/common/Header";
import PlasmaOrb from "../components/canvas/PlasmaOrb";
import { useTranslation } from "../i18n";
import type { CSSProperties } from "react";

const page: CSSProperties = {
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#050505",
  position: "relative",
  overflowX: "hidden",
  overflowY: "auto",
  animation: "fadeIn 0.3s ease-out",
};

const checkbox = (checked: boolean): CSSProperties => ({
  width: "24px",
  height: "24px",
  borderRadius: "24px",
  border: checked ? "none" : "2px solid #666",
  background: checked ? "#00de0b" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  cursor: "pointer",
  transition: "all 0.15s",
});

export default function TermsPage() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { t } = useTranslation();

  const handleAccept = () => {
    if (!agreed) return;
    dispatch({ type: "ACCEPT_TERMS" });
    navigate("/onboarding");
  };

  return (
    <div style={page}>
      <Header />

      <p style={{
        fontSize: "28px",
        fontWeight: 500,
        lineHeight: "30px",
        padding: "28px 20px 0",
      }}>
        {t("terms.title")}
      </p>

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}>
        <PlasmaOrb style={{ width: "100%", maxWidth: "320px", aspectRatio: "1" }} />
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        <div
          onClick={() => setAgreed(!agreed)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            marginBottom: "32px",
          }}
        >
          <div style={checkbox(agreed)}>
            {agreed && (
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 3.5L4.5 7L11 1" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: "16px", lineHeight: "21px", color: "#9f9f9f" }}>
            {t("terms.agree")}
            <a href="https://supercycl.io/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>{t("terms.tos")}</a>
            {t("terms.and")}
            <a href="https://supercycl.io/policy" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>{t("terms.privacy")}</a>
          </span>
        </div>

        <button
          onClick={handleAccept}
          disabled={!agreed}
          style={{
            width: "100%",
            padding: "18px",
            background: "rgba(5,5,5,0.6)",
            border: "1px solid #666",
            borderRadius: "32px",
            backdropFilter: "blur(2px)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "var(--font-family)",
            cursor: agreed ? "pointer" : "not-allowed",
            opacity: agreed ? 1 : 0.4,
            transition: "opacity 0.15s",
          }}
        >
          {t("terms.accept")}
        </button>
      </div>
    </div>
  );
}

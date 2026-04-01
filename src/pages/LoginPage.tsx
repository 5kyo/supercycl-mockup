import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/common/Header";
import { useTranslation } from "../i18n";
import type { CSSProperties } from "react";
import { asset } from "../utils/asset";

const page: CSSProperties = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#050505",
  position: "relative",
  overflow: "hidden",
};

const bgImage: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "208px",
  width: "100%",
  height: "320px",
  objectFit: "cover",
  pointerEvents: "none",
};


const dim: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#000",
  opacity: 0.8,
  zIndex: 2,
  animation: "fadeIn 0.2s ease-out",
};

const sheet: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#fff",
  borderRadius: "20px 20px 0 0",
  padding: "0 20px 40px",
  zIndex: 3,
  animation: "slideUp 0.3s ease-out",
};

const handle: CSSProperties = {
  width: "40px",
  height: "4px",
  background: "#e0e0e0",
  borderRadius: "4px",
  margin: "8px auto 24px",
};

const accountCard: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "20px",
  background: "#efefef",
  borderRadius: "12px",
  marginTop: "20px",
};

const avatar: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  background: "#008e66",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 700,
  fontFamily: "var(--font-kr)",
  flexShrink: 0,
};

const ctaBtn: CSSProperties = {
  width: "100%",
  height: "44px",
  background: "#0b34a4",
  borderRadius: "22px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 700,
  fontFamily: "var(--font-kr)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginTop: "20px",
  border: "none",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { t } = useTranslation();

  const handleLogin = () => {
    dispatch({ type: "LOGIN" });
    navigate("/terms");
  };

  return (
    <div style={page}>
      <img src={asset("images/landing-bg.png")} alt="" style={bgImage} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
      </div>

      <div style={{ position: "absolute", left: "20px", top: "124px", width: "320px", zIndex: 1 }}>
        <h1 style={{ fontSize: "34px", fontWeight: 500, lineHeight: "36px", color: "#fff" }}>
          {t("landing.headline1")}<br />
          {t("landing.headline2")}<span style={{ color: "#00de0b" }}>Supercycl</span>
        </h1>
      </div>

      <div style={dim} onClick={() => navigate("/")} />

      <div style={sheet}>
        <div style={handle} />

        <div style={{ textAlign: "center" }}>
          <img src={asset("images/logo-icon.svg")} alt="Supercycl" style={{ width: "40px", height: "40px" }} />
        </div>

        <p style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: 500,
          color: "#050505",
          lineHeight: "28px",
          marginTop: "12px",
          fontFamily: "var(--font-kr)",
        }}>
          {t("login.title")}
        </p>

        <div style={accountCard}>
          <div style={avatar}>{t("login.mockInitial")}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#050505", fontFamily: "var(--font-kr)" }}>
              {t("login.mockName")}
            </div>
            <div style={{ fontSize: "14px", color: "#505050", marginTop: "2px" }}>
              text123@gmail.com
            </div>
          </div>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M1 1L6 5L11 1" stroke="#505050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <button style={ctaBtn} onClick={handleLogin}>
          {t("login.continueAs", { name: t("login.mockName") })}
        </button>
      </div>
    </div>
  );
}

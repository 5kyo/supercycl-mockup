import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import GoogleIcon from "../components/common/GoogleIcon";
import PlasmaOrb from "../components/canvas/PlasmaOrb";
import en from "../i18n/en";
import type { CSSProperties } from "react";

const page: CSSProperties = {
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#050505",
  position: "relative",
  overflowX: "hidden",
  overflowY: "auto",
};

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={page}>
      {/* Orb — centered background */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "320px",
        height: "320px",
        pointerEvents: "none",
      }}>
        <PlasmaOrb />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
      </div>

      {/* Title */}
      <div style={{ padding: "68px 20px 0", position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontSize: "34px",
          fontWeight: 500,
          lineHeight: "36px",
          color: "#fff",
          animation: "fadeInUp 0.6s ease-out 0.15s both",
        }}>
          {en["landing.headline1"]}<br />
          {en["landing.headline2"]}<span style={{ color: "#00de0b" }}>Supercycl</span>
        </h1>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* CTA */}
      <div style={{
        padding: "0 20px 60px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "20px",
            background: "rgba(5,5,5,0.6)",
            border: "1px solid #666",
            borderRadius: "32px",
            backdropFilter: "blur(2px)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "var(--font-family)",
            cursor: "pointer",
            animation: "fadeInUp 0.6s ease-out 0.45s both",
          }}
        >
          <GoogleIcon />
          {en["landing.cta"]}
        </button>
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#00de0b",
          textAlign: "center",
          lineHeight: "18px",
        }}>
          {en["landing.disclaimer"]}
        </p>
      </div>
    </div>
  );
}

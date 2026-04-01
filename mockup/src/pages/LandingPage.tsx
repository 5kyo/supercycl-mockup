import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import GoogleIcon from "../components/common/GoogleIcon";
import PlasmaOrb from "../components/canvas/PlasmaOrb";
import type { CSSProperties } from "react";

const page: CSSProperties = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#050505",
  position: "relative",
  overflow: "hidden",
};

const orbArea: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "320px",
  height: "320px",
  pointerEvents: "none",
};

const titleArea: CSSProperties = {
  position: "absolute",
  left: "20px",
  top: "124px",
  width: "320px",
};

const ctaArea: CSSProperties = {
  position: "absolute",
  left: "20px",
  bottom: "60px",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={orbArea}>
        <PlasmaOrb />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
      </div>

      <div style={titleArea}>
        <h1 style={{
          fontSize: "34px",
          fontWeight: 500,
          lineHeight: "36px",
          color: "#fff",
          animation: "fadeInUp 0.6s ease-out 0.15s both",
        }}>
          Trade Different,<br />
          Ride the <span style={{ color: "#00de0b" }}>Supercycl</span>
        </h1>
      </div>

      <div style={ctaArea}>
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
          Continue with Google
        </button>
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#00de0b",
          textAlign: "center",
          lineHeight: "18px",
        }}>
          Test environment. No real funds used.
        </p>
      </div>
    </div>
  );
}

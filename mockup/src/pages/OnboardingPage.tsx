import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/common/Header";
import Logo from "../components/common/Logo";
import { ACCOUNT } from "../constants/defaults";
import type { CSSProperties } from "react";

const page: CSSProperties = {
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "#050505",
  position: "relative",
  animation: "fadeIn 0.3s ease-out",
};

const steps = [
  "Creating wallet",
  "Connecting to Hyperliquid",
  "Loading test funds",
] as const;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useApp();

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 1200),
      setTimeout(() => setCurrentStep(2), 2200),
      setTimeout(() => {
        setCurrentStep(3);
        setCompleted(true);
        dispatch({ type: "COMPLETE_ONBOARDING" });
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [dispatch]);

  if (completed) {
    return (
      <div style={page}>
        <Header variant="close" onClose={() => navigate("/trade")} />

        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <Logo size={40} />
        </div>

        <p style={{
          fontSize: "26px",
          fontWeight: 500,
          lineHeight: "30px",
          textAlign: "center",
          marginTop: "24px",
        }}>
          You're all set!
        </p>

        <div style={{
          margin: "24px 20px 0",
          background: "#1a1a1a",
          borderRadius: "8px",
          padding: "32px 0 36px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Ticket notches */}
          <div style={{
            position: "absolute",
            left: "-16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#050505",
          }} />
          <div style={{
            position: "absolute",
            right: "-16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#050505",
          }} />

          <p style={{ fontSize: "16px", color: "#666", lineHeight: "21px" }}>
            Balance
          </p>
          <p style={{ fontSize: "22px", fontWeight: 500, lineHeight: "28px", marginTop: "8px" }}>
            {ACCOUNT.balance.toLocaleString("en-US")} USDC
          </p>
        </div>

        <div style={{ padding: "0 20px", marginTop: "auto", marginBottom: "40px" }}>
          <button
            onClick={() => navigate("/trade")}
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
              cursor: "pointer",
            }}
          >
            Start Trading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      {/* No header, just status bar space */}
      <div style={{ height: "32px" }} />

      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <img
          src="/images/onboarding-wallet.png"
          alt=""
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />
      </div>

      <p style={{
        fontSize: "26px",
        fontWeight: 500,
        lineHeight: "30px",
        textAlign: "center",
        marginTop: "24px",
      }}>
        Setting up your<br />trading account
      </p>

      <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {steps.map((label, i) => (
          <StepDot key={label} label={label} active={currentStep === i} done={currentStep > i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </div>
  );
}

function StepDot({ label, active, done, isLast }: {
  readonly label: string;
  readonly active: boolean;
  readonly done: boolean;
  readonly isLast: boolean;
}) {
  const dotColor = done || active ? "#00de0b" : "#666";
  const textColor = done || active ? "#00de0b" : "#666";

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
          transition: "background 0.3s",
        }} />
        <span style={{
          fontSize: "16px",
          lineHeight: "21px",
          color: textColor,
          transition: "color 0.3s",
        }}>
          {label}
        </span>
      </div>
      {!isLast && (
        <div style={{
          position: "absolute",
          left: "3.5px",
          top: "27px",
          width: "1px",
          height: "12px",
          borderLeft: "1px dashed #666",
        }} />
      )}
    </div>
  );
}

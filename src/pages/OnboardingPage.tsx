import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PlasmaOrb from "../components/canvas/PlasmaOrb";
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

  return (
    <div style={page}>
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "40px",
      }}>
        {/* Orb — pulse stops on completion */}
        <div style={{
          position: "relative",
          width: "200px",
          height: "200px",
          animation: completed ? "none" : "orbPulse 3s ease-in-out infinite",
          transition: "transform 0.6s ease-out",
        }}>
          <PlasmaOrb style={{ width: "200px", height: "200px" }} variant={completed ? "green" : "warm"} />
          <div style={{
            position: "absolute",
            left: "50%",
            bottom: "-20px",
            transform: "translateX(-50%)",
            width: "160px",
            height: "40px",
            background: "radial-gradient(ellipse, rgba(0,222,11,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </div>

        <p style={{
          fontSize: "26px",
          fontWeight: 500,
          lineHeight: "30px",
          textAlign: "center",
          marginTop: "36px",
        }}>
          {completed ? "You're all set!" : <>Setting up your<br />trading account</>}
        </p>

        {/* Steps */}
        <div style={{
          marginTop: "28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "120px",
        }}>
          {steps.map((label, i) => (
            <StepRow
              key={label}
              label={label}
              active={currentStep === i}
              done={currentStep > i}
              visible={currentStep >= i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* Completed section — fades in below steps */}
        <div style={{
          width: "100%",
          padding: "0 20px",
          opacity: completed ? 1 : 0,
          transform: completed ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          pointerEvents: completed ? "auto" : "none",
        }}>
          <p style={{
            fontSize: "14px",
            color: "#9f9f9f",
            textAlign: "center",
            lineHeight: "18px",
            marginBottom: "16px",
          }}>
            Test funds of <span style={{ color: "#00de0b", fontWeight: 500 }}>{ACCOUNT.balance} USDC</span> have been deposited.
          </p>

          <div style={{
            background: "#151515",
            border: "1px solid #2c2c2c",
            borderRadius: "12px",
            padding: "28px 20px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Ticket notches */}
            <div style={{
              position: "absolute",
              left: "-14px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#050505",
              border: "1px solid #2c2c2c",
            }} />
            <div style={{
              position: "absolute",
              right: "-14px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#050505",
              border: "1px solid #2c2c2c",
            }} />

            <p style={{ fontSize: "14px", color: "#666", lineHeight: "18px" }}>
              Balance
            </p>
            <p style={{
              fontSize: "28px",
              fontWeight: 600,
              lineHeight: "34px",
              marginTop: "8px",
              color: "#fff",
            }}>
              {ACCOUNT.balance.toLocaleString("en-US")} <span style={{ fontSize: "16px", color: "#9f9f9f", fontWeight: 400 }}>USDC</span>
            </p>
          </div>
        </div>
      </div>

      {/* Start Trading button — fades in at bottom */}
      <div style={{
        padding: "0 20px 40px",
        opacity: completed ? 1 : 0,
        transform: completed ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease-out 0.15s, transform 0.5s ease-out 0.15s",
        pointerEvents: completed ? "auto" : "none",
      }}>
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

function StepRow({ label, active, done, visible, isLast }: {
  readonly label: string;
  readonly active: boolean;
  readonly done: boolean;
  readonly visible: boolean;
  readonly isLast: boolean;
}) {
  const isGreen = done || active;

  return (
    <div style={{
      position: "relative",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0" }}>
        {/* Indicator */}
        <div style={{
          width: "16px",
          height: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          {done ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "scaleIn 0.25s ease-out" }}>
              <circle cx="7" cy="7" r="7" fill="#00de0b" />
              <path d="M4 7.2L6 9.2L10 5" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : active ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
              <circle cx="8" cy="8" r="6.5" stroke="#333" strokeWidth="2" />
              <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" stroke="#00de0b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#666",
            }} />
          )}
        </div>
        <span style={{
          fontSize: "16px",
          lineHeight: "21px",
          color: isGreen ? "#00de0b" : "#666",
          transition: "color 0.3s",
        }}>
          {label}
        </span>
      </div>
      {!isLast && (
        <div style={{
          position: "absolute",
          left: "7.5px",
          top: "28px",
          width: "1px",
          height: "12px",
          borderLeft: `1px dashed ${done ? "#00de0b" : "#666"}`,
          transition: "border-color 0.3s",
        }} />
      )}
    </div>
  );
}

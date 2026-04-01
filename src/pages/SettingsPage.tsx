import { useApp } from "../context/AppContext";
import { ACCOUNT } from "../constants/defaults";
import type { CSSProperties } from "react";

const section: CSSProperties = {
  padding: "16px",
  borderBottom: "1px solid var(--border-color)",
};

const sectionTitle: CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "1px",
  color: "var(--text-tertiary)",
  textTransform: "uppercase" as const,
  marginBottom: "12px",
};

interface Props {
  readonly onTpSlEdit: () => void;
}

export default function SettingsPage({ onTpSlEdit }: Props) {
  const { state, dispatch } = useApp();

  return (
    <div style={{ paddingBottom: "20px" }}>
      {/* Account */}
      <div style={section}>
        <div style={sectionTitle}>Account</div>
        <div style={{ fontSize: "14px", marginBottom: "6px" }}>{ACCOUNT.email}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            {ACCOUNT.wallet}
          </span>
          <button
            onClick={() => dispatch({ type: "SHOW_TOAST", message: "Address copied!" })}
            style={{ background: "var(--bg-card)", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", color: "var(--text-secondary)" }}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Trading Preferences */}
      <div style={section}>
        <div style={sectionTitle}>Trading Preferences</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "14px" }}>Auto TP/SL</span>
          <button onClick={onTpSlEdit} style={{ background: "none", color: "var(--color-pri-1)", fontSize: "13px", fontWeight: 600 }}>
            Edit
          </button>
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "10px" }}>
          TP: +{state.takeProfitPercent}% | SL: -{state.stopLossPercent}%
        </div>

        <button
          onClick={() => dispatch({ type: "TOGGLE_AUTO_TP_SL" })}
          style={{
            width: "48px",
            height: "26px",
            borderRadius: "13px",
            background: state.autoTpSlEnabled ? "var(--accent-green)" : "var(--bg-input)",
            position: "relative",
            transition: "background 0.2s",
          }}
        >
          <div style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: "2px",
            left: state.autoTpSlEnabled ? "24px" : "2px",
            transition: "left 0.2s",
          }} />
        </button>
      </div>

      {/* Exchange Connection */}
      <div style={section}>
        <div style={sectionTitle}>Exchange Connection</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "14px" }}>Hyperliquid (Testnet)</span>
          <span style={{ fontSize: "12px", color: "var(--accent-green)", fontWeight: 600 }}>Connected &#10003;</span>
        </div>

        <div style={{ marginTop: "14px", padding: "12px", background: "var(--bg-input)", borderRadius: "var(--radius-sm)" }}>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "18px" }}>
            PC 버전에서는 총 6개 거래소에서 거래가 가능합니다.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
            {["Binance", "BingX", "OKX", "Bybit"].map((name) => (
              <span key={name} style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--text-tertiary)",
                background: "var(--bg-card)",
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
              }}>
                {name}
              </span>
            ))}
            <span style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--accent-yellow)",
              padding: "4px 0 4px 4px",
            }}>
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={section}>
        <div style={sectionTitle}>About</div>
        <a
          href="https://supercycl.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          <span>Supercycl Website</span>
          <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>supercycl.io &#8599;</span>
        </a>
        <a
          href="https://supercycl.gitbook.io/supercycl-docs-1"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            color: "var(--text-primary)",
            textDecoration: "none",
            marginTop: "12px",
          }}
        >
          <span>Docs</span>
          <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>gitbook &#8599;</span>
        </a>
      </div>

      {/* Logout */}
      <div style={{ padding: "24px 16px" }}>
        <button
          onClick={() => dispatch({ type: "SHOW_TOAST", message: "Logged out (mockup)" })}
          style={{
            width: "100%",
            padding: "14px",
            background: "transparent",
            border: "1px solid var(--accent-red)",
            borderRadius: "var(--radius-md)",
            color: "var(--accent-red)",
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

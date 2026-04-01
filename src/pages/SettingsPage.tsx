import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n";
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
  const { t, language } = useTranslation();

  return (
    <div style={{ paddingBottom: "20px" }}>
      {/* Account */}
      <div style={section}>
        <div style={sectionTitle}>{t("settings.account")}</div>
        <div style={{ fontSize: "14px", marginBottom: "6px" }}>{ACCOUNT.email}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            {ACCOUNT.wallet}
          </span>
          <button
            onClick={() => dispatch({ type: "SHOW_TOAST", message: t("settings.addressCopied") })}
            style={{ background: "var(--bg-card)", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", color: "var(--text-secondary)" }}
          >
            {t("common.copy")}
          </button>
        </div>
      </div>

      {/* Trading Preferences */}
      <div style={section}>
        <div style={sectionTitle}>{t("settings.tradingPrefs")}</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "14px" }}>{t("settings.autoTpSl")}</span>
          <button onClick={onTpSlEdit} style={{ background: "none", color: "var(--color-pri-1)", fontSize: "13px", fontWeight: 600 }}>
            {t("common.edit")}
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

      {/* Language */}
      <div style={section}>
        <div style={sectionTitle}>{t("settings.language")}</div>
        <div style={{ display: "flex", gap: "8px" }}>
          {(["en", "ko"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => dispatch({ type: "SET_LANGUAGE", language: lang })}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "var(--radius-full)",
                fontSize: "13px",
                fontWeight: 600,
                background: language === lang ? "var(--color-pri-1)" : "var(--bg-input)",
                color: language === lang ? "#0a0a0a" : "var(--text-secondary)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {lang === "en" ? "English" : "\ud55c\uad6d\uc5b4"}
            </button>
          ))}
        </div>
      </div>

      {/* Exchange Connection */}
      <div style={section}>
        <div style={sectionTitle}>{t("settings.exchange")}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "14px" }}>Hyperliquid (Testnet)</span>
          <span style={{ fontSize: "12px", color: "var(--accent-green)", fontWeight: 600 }}>{t("settings.connected")}</span>
        </div>

        <div style={{ marginTop: "14px", padding: "12px", background: "var(--bg-input)", borderRadius: "var(--radius-sm)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
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
              {t("settings.comingSoon")}
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={section}>
        <div style={sectionTitle}>{t("settings.about")}</div>
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
          <span>{t("settings.website")}</span>
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
          <span>{t("settings.docs")}</span>
          <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>gitbook &#8599;</span>
        </a>
      </div>

      {/* Logout */}
      <div style={{ padding: "24px 16px" }}>
        <button
          onClick={() => dispatch({ type: "SHOW_TOAST", message: t("settings.loggedOut") })}
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
          {t("common.logout")}
        </button>
      </div>
    </div>
  );
}

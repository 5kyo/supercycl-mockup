import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n";
import { ACCOUNT } from "../constants/defaults";
import type { CSSProperties } from "react";

const section: CSSProperties = {
  padding: "16px",
};

const card: CSSProperties = {
  background: "#151515",
  border: "1px solid #2c2c2c",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "12px",
};

const label: CSSProperties = {
  fontSize: "10px",
  fontWeight: 500,
  color: "#666",
  marginBottom: "4px",
};

const MOCK_ACTIVITY_KEYS = [
  { key: "portfolio.openedShort" as const, time: "2h" },
  { key: "portfolio.openedLong" as const, time: "3h" },
  { key: "portfolio.deposited" as const, time: "5h" },
];

export default function PortfolioPage() {
  const { state } = useApp();
  const { t } = useTranslation();

  const totalPnl = state.positions.reduce((sum, p) => sum + p.pnl, 0);
  const totalMargin = state.positions.reduce((sum, p) => sum + p.margin, 0);
  const totalBalance = ACCOUNT.balance + totalPnl;
  const available = ACCOUNT.balance - totalMargin;
  const pnlPercent = ACCOUNT.balance > 0
    ? Math.round(totalPnl / ACCOUNT.balance * 10000) / 100
    : 0;
  const isProfit = totalPnl >= 0;
  const pnlColor = isProfit ? "#00de0b" : "#ff5938";

  return (
    <div style={section}>
      {/* Total Balance */}
      <div style={card}>
        <div style={label}>{t("portfolio.totalBalance")}</div>
        <div style={{ fontSize: "28px", fontWeight: 700, color: "#fff" }}>
          ${totalBalance.toFixed(2)}
        </div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: pnlColor, marginTop: "4px" }}>
          {isProfit ? "+" : ""}${totalPnl.toFixed(2)} ({isProfit ? "+" : ""}{pnlPercent}%)
        </div>
      </div>

      {/* Available / Margin */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <div style={{ ...card, flex: 1, marginBottom: 0 }}>
          <div style={label}>{t("portfolio.available")}</div>
          <div style={{ fontSize: "16px", fontWeight: 600 }}>
            ${available.toFixed(2)}
          </div>
        </div>
        <div style={{ ...card, flex: 1, marginBottom: 0 }}>
          <div style={label}>{t("portfolio.marginUsed")}</div>
          <div style={{ fontSize: "16px", fontWeight: 600 }}>
            ${totalMargin.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div style={card}>
        <div style={{ ...label, marginBottom: "8px" }}>
          {t("portfolio.openPositions")} ({state.positions.length})
        </div>
        {state.positions.length === 0 ? (
          <div style={{ fontSize: "12px", color: "#505050", padding: "8px 0" }}>
            {t("portfolio.noPositions")}
          </div>
        ) : (
          state.positions.map((p) => {
            const posProfit = p.pnl >= 0;
            return (
              <div key={p.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: "1px solid #242424",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "3px",
                    height: "12px",
                    borderRadius: "1px",
                    background: p.side === "Long" ? "#00de0b" : "#ff5938",
                  }} />
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>{p.coin}</span>
                  <span style={{ fontSize: "10px", color: "#666" }}>
                    {p.side} · {p.leverage}x
                  </span>
                </div>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: posProfit ? "#00de0b" : "#ff5938",
                }}>
                  {posProfit ? "+" : ""}{p.pnl}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Recent Activity */}
      <div style={card}>
        <div style={{ ...label, marginBottom: "8px" }}>{t("portfolio.recentActivity")}</div>
        {MOCK_ACTIVITY_KEYS.map((a) => (
          <div key={a.key} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0",
          }}>
            <span style={{ fontSize: "11px", color: "#9f9f9f" }}>{a.key === "portfolio.deposited" ? t(a.key, { amount: 100 }) : t(a.key)}</span>
            <span style={{ fontSize: "10px", color: "#505050" }}>{t("time.hAgo", { n: parseInt(a.time) })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

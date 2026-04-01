import type { Signal } from "../../constants/signals";
import { useTranslation } from "../../i18n";
import type { TranslationKey } from "../../i18n";
import type { CSSProperties } from "react";

interface Props {
  readonly signal: Signal;
  readonly onExecute: (id: string) => void;
}

const isActive = (s: Signal) => s.status === "ACTIVE";

const STATUS_COLOR: Record<string, string> = {
  HIT_TP: "#00de0b",
  HIT_SL: "#ff5938",
  EXPIRED: "#666",
  CANCELLED: "#666",
};

const STATUS_KEY: Record<string, TranslationKey> = {
  HIT_TP: "signal.status.hitTp",
  HIT_SL: "signal.status.hitSl",
  EXPIRED: "signal.status.expired",
  CANCELLED: "signal.status.cancelled",
};

const CONFIDENCE_COLOR: Record<string, string> = {
  HIGH: "#00de0b",
  MEDIUM: "#c89b00",
  LOW: "#666",
};

const CONFIDENCE_KEY: Record<string, TranslationKey> = {
  HIGH: "signal.confidence.high",
  MEDIUM: "signal.confidence.med",
  LOW: "signal.confidence.low",
};

function formatRelativeTime(timestamp: string, t: (key: TranslationKey, params?: Record<string, string | number>) => string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return t("time.justNow");
  if (minutes < 60) return t("time.mAgo", { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("time.hAgo", { n: hours });
  return t("time.dAgo", { n: Math.floor(hours / 24) });
}

export default function SignalCard({ signal, onExecute }: Props) {
  const { t } = useTranslation();
  const isLong = signal.direction === "LONG";
  const active = isActive(signal);
  const dirColor = isLong ? "#00de0b" : "#ff5938";

  const card: CSSProperties = {
    padding: "10px 0",
    borderBottom: "1px solid #2c2c2c",
    opacity: active ? 1 : 0.7,
  };

  return (
    <div style={card}>
      {/* Header: bar + pair + direction/status + confidence + time */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{
          width: "3px",
          height: "14px",
          borderRadius: "2px",
          background: active ? dirColor : "#666",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: "13px", fontWeight: 700 }}>{signal.pair}</span>
        {active ? (
          <span style={{ fontSize: "11px", fontWeight: 600, color: dirColor }}>
            {isLong ? t("filter.long") : t("filter.short")}
          </span>
        ) : (
          <span style={{
            fontSize: "10px",
            fontWeight: 600,
            color: STATUS_COLOR[signal.status],
            background: "rgba(255,255,255,0.05)",
            padding: "1px 4px",
            borderRadius: "2px",
          }}>
            {STATUS_KEY[signal.status] ? t(STATUS_KEY[signal.status]) : signal.status}
          </span>
        )}
        <span style={{
          fontSize: "10px",
          fontWeight: 500,
          color: CONFIDENCE_COLOR[signal.confidence],
          marginLeft: "auto",
        }}>
          {CONFIDENCE_KEY[signal.confidence] ? t(CONFIDENCE_KEY[signal.confidence]) : signal.confidence}
        </span>
        <span style={{ fontSize: "10px", color: "#505050" }}>
          {formatRelativeTime(signal.timestamp, t)}
        </span>
      </div>

      {/* Data: Entry / TP / SL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", marginTop: "6px" }}>
        <span style={{ fontSize: "10px", color: "#666" }}>{t("trade.entry")}</span>
        <span style={{ fontSize: "10px", color: "#666" }}>TP</span>
        <span style={{ fontSize: "10px", color: "#666" }}>SL</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px" }}>
        <span style={{ fontSize: "12px", fontWeight: 500 }}>{signal.entryPrice.toLocaleString()}</span>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#00de0b" }}>{signal.targetPrice.toLocaleString()}</span>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#ff5938" }}>{signal.stopLoss.toLocaleString()}</span>
      </div>

      {/* Reasoning */}
      <p style={{
        fontSize: "10px",
        color: "#505050",
        marginTop: "4px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {signal.reasoning}
      </p>

      {/* Closed result */}
      {!active && signal.pnlPercent !== undefined && (
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          marginTop: "4px",
          color: signal.pnlPercent >= 0 ? "#00de0b" : "#ff5938",
        }}>
          {t("signal.result", { pnl: `${signal.pnlPercent >= 0 ? "+" : ""}${signal.pnlPercent}` })}
        </div>
      )}

      {/* CTA */}
      {active && (
        <button
          onClick={() => onExecute(signal.id)}
          style={{
            width: "100%",
            height: "28px",
            marginTop: "8px",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "3px",
            background: dirColor,
            color: "#151515",
            cursor: "pointer",
            fontFamily: "var(--font-family)",
          }}
        >
          {t("signal.execute")}
        </button>
      )}
    </div>
  );
}

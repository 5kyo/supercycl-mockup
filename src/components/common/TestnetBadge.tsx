import type { CSSProperties } from "react";

const badge: CSSProperties = {
  display: "inline-block",
  background: "rgba(240, 185, 11, 0.15)",
  color: "var(--accent-yellow)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.5px",
  padding: "2px 8px",
  borderRadius: "var(--radius-sm)",
};

export default function TestnetBadge() {
  return <span style={badge}>TESTNET</span>;
}

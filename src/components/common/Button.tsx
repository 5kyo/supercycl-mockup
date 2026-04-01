import type { CSSProperties, ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly onClick?: () => void;
  readonly variant?: "primary" | "secondary" | "google" | "buy" | "sell" | "danger" | "ghost";
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly style?: CSSProperties;
}

const baseStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: "var(--font-family)",
  transition: "opacity 0.15s, transform 0.1s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const variants: Record<string, CSSProperties> = {
  primary: {
    background: "rgba(5,5,5,0.6)",
    color: "#fff",
    border: "1px solid #666",
    borderRadius: "32px",
    padding: "18px 24px",
    backdropFilter: "blur(2px)",
  },
  secondary: {
    background: "var(--bg-card)",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "32px",
    padding: "18px 24px",
  },
  google: {
    background: "rgba(5,5,5,0.6)",
    color: "#fff",
    border: "1px solid #666",
    borderRadius: "32px",
    padding: "20px 24px",
    backdropFilter: "blur(2px)",
  },
  buy: {
    background: "#00de0b",
    color: "#151515",
    borderRadius: "3px",
    padding: "9px 16px",
    fontSize: "14px",
    fontWeight: 600,
  },
  sell: {
    background: "#ff5938",
    color: "#151515",
    borderRadius: "3px",
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: 500,
  },
  danger: {
    background: "#ff5938",
    color: "#151515",
    borderRadius: "3px",
    padding: "10px 16px",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    padding: "14px 24px",
    borderRadius: "32px",
  },
};

export default function Button({ children, onClick, variant = "primary", disabled, fullWidth, style }: Props) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        ...baseStyle,
        ...variants[variant],
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

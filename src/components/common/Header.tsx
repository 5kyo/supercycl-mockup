import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { asset } from "../../utils/asset";

interface Props {
  readonly variant?: "default" | "close" | "none";
  readonly onClose?: () => void;
}

const base: CSSProperties = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  width: "100%",
  background: "#050505",
};

const defaultStyle: CSSProperties = {
  ...base,
  gap: "4px",
  height: "56px",
  padding: "18px 20px",
};

const closeStyle: CSSProperties = {
  ...base,
  justifyContent: "flex-end",
  height: "56px",
  padding: "18px 20px",
};

export default function Header({ variant = "default", onClose }: Props) {
  const navigate = useNavigate();

  if (variant === "none") return null;

  if (variant === "close") {
    return (
      <div style={closeStyle}>
        <button
          onClick={onClose}
          style={{ background: "none", padding: 0, display: "flex" }}
        >
          <img
            src={asset("images/icon-close.svg")}
            alt="Close"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
      </div>
    );
  }

  return (
    <div style={defaultStyle}>
      <div
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", width: "140px", height: "20px", cursor: "pointer" }}
      >
        <img
          src={asset("images/logo-icon.svg")}
          alt=""
          style={{ width: "20px", height: "20px", flexShrink: 0 }}
        />
        <img
          src={asset("images/logo-text.svg")}
          alt="Supercycl"
          style={{ height: "11px", width: "auto" }}
        />
      </div>
      <div style={{ position: "relative", width: "49px", height: "14px" }}>
        <img
          src={asset("images/testnet-badge.svg")}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <span style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "8px",
          fontWeight: 700,
          color: "#050505",
          letterSpacing: "0.5px",
          paddingLeft: "2px",
        }}>
          Testnet
        </span>
      </div>
    </div>
  );
}

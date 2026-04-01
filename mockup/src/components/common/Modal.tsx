import type { ReactNode, CSSProperties } from "react";

interface Props {
  readonly children: ReactNode;
  readonly onClose?: () => void;
  readonly showClose?: boolean;
  readonly title?: string;
}

const backdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  padding: "20px",
  animation: "fadeIn 0.2s ease-out",
};

const panel: CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
  width: "100%",
  maxWidth: "360px",
  animation: "scaleIn 0.2s ease-out",
};

export default function Modal({ children, onClose, showClose = true, title }: Props) {
  return (
    <div style={backdrop} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        {(title || showClose) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            {title && <span style={{ fontSize: "16px", fontWeight: 600 }}>{title}</span>}
            {showClose && onClose && (
              <button
                onClick={onClose}
                style={{ background: "none", color: "var(--text-secondary)", fontSize: "20px", padding: "4px" }}
              >
                ✕
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

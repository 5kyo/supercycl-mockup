import type { ReactNode, CSSProperties } from "react";

interface Props {
  readonly children: ReactNode;
  readonly onClose: () => void;
  readonly title?: string;
}

const backdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  zIndex: 100,
  animation: "fadeIn 0.2s ease-out",
};

const sheet: CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: "428px",
  margin: "0 auto",
  background: "var(--bg-secondary)",
  borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
  padding: "20px",
  maxHeight: "70vh",
  overflowY: "auto",
  zIndex: 101,
  animation: "slideUp 0.3s ease-out",
};

export default function BottomSheet({ children, onClose, title }: Props) {
  return (
    <>
      <div style={backdrop} onClick={onClose} />
      <div style={sheet}>
        <div style={{ width: "40px", height: "4px", background: "var(--border-color)", borderRadius: "2px", margin: "0 auto 16px" }} />
        {title && (
          <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>{title}</div>
        )}
        {children}
      </div>
    </>
  );
}

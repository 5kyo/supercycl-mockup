import { useApp, type TabKey } from "../../context/AppContext";
import type { CSSProperties, ReactNode } from "react";

const nav: CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: "360px",
  margin: "0 auto",
  background: "#050505",
  borderTop: "1px solid #242424",
  zIndex: 50,
};

const navInner: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "50px",
};

function TradeIcon({ active }: { readonly active: boolean }) {
  const c = active ? "#fff" : "#666";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="0.5" y="0.5" width="15" height="15" rx="1" stroke={c} />
      <path d="M3.5 5.5L6.5 8.5L9.5 6.5L12.5 10.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignalIcon({ active }: { readonly active: boolean }) {
  const c = active ? "#fff" : "#666";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="0.5" y="0.5" width="15" height="15" rx="1" stroke={c} />
      <path d="M4 8L6 5L8 9L10 6L12 8" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 11L6 9L8 12L10 10L12 11" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PortfolioIcon({ active }: { readonly active: boolean }) {
  const c = active ? "#fff" : "#666";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="10" rx="1" stroke={c} />
      <path d="M5 3V2C5 1.44772 5.44772 1 6 1H10C10.5523 1 11 1.44772 11 2V3" stroke={c} />
      <line x1="1" y1="7" x2="15" y2="7" stroke={c} />
    </svg>
  );
}

function SettingIcon({ active }: { readonly active: boolean }) {
  const c = active ? "#fff" : "#666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" stroke={c} strokeWidth="1.2" />
      <path d="M10 1.5V4M10 16V18.5M1.5 10H4M16 10H18.5M3.5 3.5L5.5 5.5M14.5 14.5L16.5 16.5M16.5 3.5L14.5 5.5M5.5 14.5L3.5 16.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const icons: Record<TabKey, (active: boolean) => ReactNode> = {
  trade: (a) => <TradeIcon active={a} />,
  signal: (a) => <SignalIcon active={a} />,
  portfolio: (a) => <PortfolioIcon active={a} />,
  settings: (a) => <SettingIcon active={a} />,
};

const labels: Record<TabKey, string> = {
  trade: "Trade",
  signal: "Signal",
  portfolio: "Portfoilo",
  settings: "Setting",
};

const tabKeys: readonly TabKey[] = ["trade", "signal", "portfolio", "settings"];

interface Props {
  readonly onTabChange?: (tab: TabKey) => void;
}

export default function BottomNav({ onTabChange }: Props) {
  const { state, dispatch } = useApp();

  return (
    <div style={nav}>
      <div style={navInner}>
        {tabKeys.map((key) => {
          const active = state.activeTab === key;
          return (
            <button
              key={key}
              onClick={() => {
                dispatch({ type: "SET_TAB", tab: key });
                if (key === "signal") dispatch({ type: "MARK_SIGNALS_READ" });
                onTabChange?.(key);
              }}
              style={{
                background: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                padding: "6px 12px",
                color: active ? "#fff" : "#666",
                position: "relative",
              }}
            >
              {icons[key](active)}
              <span style={{ fontSize: "11px", fontWeight: active ? 500 : 400, marginTop: "2px" }}>
                {labels[key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

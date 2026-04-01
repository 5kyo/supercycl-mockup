import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { SCENARIOS, SHOW_DEV_NAV, type ScenarioJump } from "../../constants/scenarios";
import type { CSSProperties } from "react";

const SESSION_KEY = "supercycl-devnav-open";

const fab: CSSProperties = {
  position: "fixed",
  top: "8px",
  right: "8px",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  zIndex: 9999,
  border: "1px solid rgba(255,255,255,0.1)",
  cursor: "pointer",
};

const bar: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  maxWidth: "428px",
  margin: "0 auto",
  background: "rgba(10,10,10,0.92)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid var(--border-color)",
  padding: "8px 12px",
  zIndex: 9999,
};

const groupLabel: CSSProperties = {
  fontSize: "9px",
  fontWeight: 600,
  color: "var(--text-tertiary)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "4px",
  marginTop: "6px",
};

const btnRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
};

function getInitialOpen(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export default function DevNav() {
  const [open, setOpen] = useState(getInitialOpen);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      try { sessionStorage.setItem(SESSION_KEY, String(next)); } catch { /* noop */ }
      return next;
    });
  }, []);

  const jumpTo = useCallback((scenario: ScenarioJump) => {
    dispatch({ type: "JUMP_TO_SCENARIO", overrides: scenario.stateOverrides });
    if (location.pathname !== scenario.route) {
      navigate(scenario.route);
    }
  }, [dispatch, navigate, location.pathname]);

  useEffect(() => {
    if (!SHOW_DEV_NAV) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "`") {
        e.preventDefault();
        toggle();
        return;
      }

      const index = parseInt(e.key);
      if (!isNaN(index) && index >= 0 && index <= 9) {
        const scenarioIndex = index === 0 ? 9 : index - 1;
        const scenario = SCENARIOS[scenarioIndex];
        if (scenario) jumpTo(scenario);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, jumpTo]);

  if (!SHOW_DEV_NAV) return null;

  if (!open) {
    return (
      <button onClick={toggle} style={fab}>
        🚀
      </button>
    );
  }

  const isActive = (scenario: ScenarioJump) =>
    location.pathname === scenario.route &&
    (!scenario.stateOverrides.activeTab || state.activeTab === scenario.stateOverrides.activeTab);

  const groups = [
    { key: "auth" as const, label: "Auth Flow" },
    { key: "main" as const, label: "Main Tabs" },
    { key: "complex" as const, label: "Scenarios" },
  ];

  return (
    <div style={bar}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-pri-1)" }}>
          🚀 Quick Jump
        </span>
        <button onClick={toggle} style={{ background: "none", color: "var(--text-tertiary)", fontSize: "14px", padding: "2px 6px" }}>
          ×
        </button>
      </div>

      {groups.map(({ key, label }) => {
        const items = SCENARIOS.filter((s) => s.group === key);
        return (
          <div key={key}>
            <div style={groupLabel}>{label}</div>
            <div style={btnRow}>
              {items.map((scenario, _i) => {
                const globalIndex = SCENARIOS.indexOf(scenario);
                const shortcut = globalIndex < 9 ? globalIndex + 1 : 0;
                const active = isActive(scenario);
                return (
                  <button
                    key={scenario.label}
                    onClick={() => jumpTo(scenario)}
                    style={{
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontWeight: active ? 600 : 400,
                      borderRadius: "var(--radius-sm)",
                      background: active ? "rgba(0,255,106,0.1)" : "rgba(255,255,255,0.06)",
                      color: active ? "var(--color-pri-1)" : "var(--text-secondary)",
                      border: active ? "1px solid var(--color-pri-1)" : "1px solid transparent",
                      transition: "all 0.12s",
                    }}
                  >
                    <span style={{ opacity: 0.4, fontSize: "9px", marginRight: "3px" }}>{shortcut}</span>
                    {scenario.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

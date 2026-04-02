import type { CSSProperties, ReactNode } from 'react';

// =============================================================================
// Types
// =============================================================================

type TabKey = 'trade' | 'signal' | 'portfolio' | 'settings';

interface TabItem {
  readonly key: TabKey;
  readonly label: string;
  readonly icon: (active: boolean) => ReactNode;
}

interface Props {
  readonly tabs: readonly TabItem[];
  readonly activeTab: TabKey;
  readonly onTabChange: (tab: TabKey) => void;
  readonly style?: CSSProperties;
}

// =============================================================================
// Style Constants — token-based
// =============================================================================

const navStyle: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: '360px',
  margin: '0 auto',
  background: 'var(--c-nav-bg)',
  borderTop: 'var(--c-nav-border-top)',
  zIndex: 'var(--c-nav-z)' as unknown as number,
};

const navInnerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 'var(--c-nav-height)',
};

const tabButtonBase: CSSProperties = {
  background: 'none',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--p-space-0.5)',
  padding: 'var(--p-space-1.5) var(--p-space-3)',
  cursor: 'pointer',
  outline: 'none',
  position: 'relative',
  transition: 'color var(--p-duration-fast) var(--p-ease-out)',
};

const labelBase: CSSProperties = {
  fontSize: 'var(--c-nav-label-size)',
  marginTop: 'var(--p-space-0.5)',
  lineHeight: 'var(--p-line-height-normal)',
};

// =============================================================================
// Component
// =============================================================================

export default function BottomNav({
  tabs,
  activeTab,
  onTabChange,
  style,
}: Props) {
  return (
    <nav style={{ ...navStyle, ...style }} role="tablist" aria-label="Main navigation">
      <div style={navInnerStyle}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          const buttonStyle: CSSProperties = {
            ...tabButtonBase,
            color: isActive
              ? 'var(--c-nav-icon-active)'
              : 'var(--c-nav-icon-inactive)',
          };

          const labelStyleComputed: CSSProperties = {
            ...labelBase,
            fontWeight: isActive
              ? ('var(--p-font-weight-medium)' as CSSProperties['fontWeight'])
              : ('var(--p-font-weight-regular)' as CSSProperties['fontWeight']),
          };

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTabChange(tab.key);
                }
              }}
              style={buttonStyle}
            >
              {tab.icon(isActive)}
              <span style={labelStyleComputed}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export type { TabKey, TabItem, Props as BottomNavProps };

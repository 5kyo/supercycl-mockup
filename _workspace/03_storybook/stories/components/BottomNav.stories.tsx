import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import BottomNav from '../../02_components/layout/BottomNav';
import type { TabItem } from '../../02_components/layout/BottomNav';

// =============================================================================
// Mock Icons (simple SVG-like spans)
// =============================================================================

function TabIcon({ label, active }: { readonly label: string; readonly active: boolean }) {
  const iconMap: Record<string, string> = {
    Trade: '\u2191\u2193',
    Signal: '\u26A1',
    Portfolio: '\u25CE',
    Settings: '\u2699',
  };
  return (
    <span style={{ fontSize: '16px', opacity: active ? 1 : 0.5 }}>
      {iconMap[label] ?? '\u25CB'}
    </span>
  );
}

const DEFAULT_TABS: readonly TabItem[] = [
  { key: 'trade',     label: 'Trade',     icon: (active: boolean): ReactNode => <TabIcon label="Trade" active={active} /> },
  { key: 'signal',    label: 'Signal',    icon: (active: boolean): ReactNode => <TabIcon label="Signal" active={active} /> },
  { key: 'portfolio', label: 'Portfolio', icon: (active: boolean): ReactNode => <TabIcon label="Portfolio" active={active} /> },
  { key: 'settings',  label: 'Settings',  icon: (active: boolean): ReactNode => <TabIcon label="Settings" active={active} /> },
];

// =============================================================================
// Constants
// =============================================================================

const containerStyle: CSSProperties = {
  background: 'var(--s-surface-page)',
  maxWidth: '360px',
  minHeight: '200px',
  fontFamily: 'var(--s-font-family-default)',
  position: 'relative',
};

const contentStyle: CSSProperties = {
  padding: '20px',
  paddingBottom: '70px',
  color: 'var(--s-text-secondary)',
  fontSize: '11px',
};

const sectionTitleStyle: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--s-text-primary)',
  marginBottom: '8px',
  marginTop: '16px',
};

// =============================================================================
// Interactive Wrapper
// =============================================================================

function BottomNavDemo({
  initialTab = 'trade',
}: {
  readonly initialTab?: 'trade' | 'signal' | 'portfolio' | 'settings';
}) {
  const [activeTab, setActiveTab] = useState<'trade' | 'signal' | 'portfolio' | 'settings'>(initialTab);
  const handleTabChange = useCallback((tab: 'trade' | 'signal' | 'portfolio' | 'settings') => {
    setActiveTab(tab);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={{ fontSize: '14px', color: 'var(--s-text-primary)', fontWeight: 600, marginBottom: '8px' }}>
          Active Tab: {activeTab}
        </div>
        <p>Click the tabs below to switch. The active tab highlights with white text and icon.</p>
      </div>
      <BottomNav
        tabs={DEFAULT_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        style={{ position: 'absolute' }}
      />
    </div>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/BottomNav',
  component: BottomNav,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['trade', 'signal', 'portfolio', 'settings'],
      description: 'Currently active tab',
    },
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof BottomNav>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: () => <BottomNavDemo />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ padding: '20px', background: 'var(--s-surface-page)' }}>
        <div style={sectionTitleStyle}>Each Tab Active</div>
        {(['trade', 'signal', 'portfolio', 'settings'] as const).map((tab) => (
          <div key={tab} style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', color: 'var(--s-text-tertiary)', marginBottom: '4px' }}>
              activeTab: {tab}
            </div>
            <div style={{ position: 'relative', height: '50px', maxWidth: '360px' }}>
              <BottomNav
                tabs={DEFAULT_TABS}
                activeTab={tab}
                onTabChange={() => undefined}
                style={{ position: 'absolute' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<'trade' | 'signal' | 'portfolio' | 'settings'>(
      (args.activeTab as 'trade' | 'signal' | 'portfolio' | 'settings') ?? 'trade'
    );
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={{ fontSize: '14px', color: 'var(--s-text-primary)', fontWeight: 600, marginBottom: '8px' }}>
            Active: {activeTab}
          </div>
          <p>Use the Controls panel to change initial tab, or click tabs to interact.</p>
        </div>
        <BottomNav
          tabs={DEFAULT_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          style={{ position: 'absolute' }}
        />
      </div>
    );
  },
  args: {
    activeTab: 'trade',
  },
};

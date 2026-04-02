import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

// =============================================================================
// Data
// =============================================================================

const SPACING_SCALE = [
  { name: '0',    var: '--p-space-0',    px: 0 },
  { name: '0.5',  var: '--p-space-0.5',  px: 2 },
  { name: '1',    var: '--p-space-1',    px: 4 },
  { name: '1.5',  var: '--p-space-1.5',  px: 6 },
  { name: '2',    var: '--p-space-2',    px: 8 },
  { name: '2.5',  var: '--p-space-2.5',  px: 10 },
  { name: '3',    var: '--p-space-3',    px: 12 },
  { name: '3.5',  var: '--p-space-3.5',  px: 14 },
  { name: '4',    var: '--p-space-4',    px: 16 },
  { name: '4.5',  var: '--p-space-4.5',  px: 18 },
  { name: '5',    var: '--p-space-5',    px: 20 },
  { name: '6',    var: '--p-space-6',    px: 24 },
  { name: '7',    var: '--p-space-7',    px: 28 },
  { name: '8',    var: '--p-space-8',    px: 32 },
  { name: '10',   var: '--p-space-10',   px: 40 },
  { name: '12',   var: '--p-space-12',   px: 48 },
  { name: '16',   var: '--p-space-16',   px: 64 },
] as const;

// =============================================================================
// Styles
// =============================================================================

const pageStyle: CSSProperties = {
  padding: '20px',
  background: '#050505',
  color: '#ffffff',
  fontFamily: "'IBM Plex Sans', sans-serif",
  maxWidth: '360px',
};

const sectionTitleStyle: CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '16px',
  color: '#00ff6a',
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 0',
  borderBottom: '1px solid #1d1d1d',
};

const nameColStyle: CSSProperties = {
  width: '36px',
  fontSize: '10px',
  color: '#9f9f9f',
  fontFamily: "'IBM Plex Sans', monospace",
  flexShrink: 0,
  textAlign: 'right',
};

const pxColStyle: CSSProperties = {
  width: '32px',
  fontSize: '9px',
  color: '#666666',
  fontFamily: "'IBM Plex Sans', monospace",
  flexShrink: 0,
  textAlign: 'right',
};

const barStyle: CSSProperties = {
  height: '12px',
  background: '#00ff6a',
  borderRadius: '2px',
  transition: 'width 0.2s ease-out',
  minWidth: '1px',
};

// =============================================================================
// Story Component
// =============================================================================

function SpacingPage() {
  const maxPx = SPACING_SCALE[SPACING_SCALE.length - 1].px;

  return (
    <div style={pageStyle}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Spacing Tokens</h2>
      <p style={{ fontSize: '11px', color: '#9f9f9f', marginBottom: '24px' }}>
        4px base grid system. Visual bars show relative sizes.
      </p>

      <div style={sectionTitleStyle}>Spacing Scale</div>
      {SPACING_SCALE.map((s) => (
        <div key={s.name} style={rowStyle}>
          <span style={nameColStyle}>{s.name}</span>
          <span style={pxColStyle}>{s.px}px</span>
          <div style={{ flex: 1 }}>
            <div style={{ ...barStyle, width: `${(s.px / maxPx) * 100}%` }} />
          </div>
        </div>
      ))}

      <div style={{ ...sectionTitleStyle, marginTop: '32px' }}>Visual Preview</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {SPACING_SCALE.filter((s) => s.px > 0 && s.px <= 48).map((s) => (
          <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: `${s.px}px`,
                height: `${s.px}px`,
                background: 'rgba(0, 255, 106, 0.2)',
                border: '1px solid rgba(0, 255, 106, 0.4)',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontSize: '8px', color: '#666666' }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Meta & Stories
// =============================================================================

const meta = {
  title: 'Tokens/Spacing',
  component: SpacingPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof SpacingPage>;

export default meta;
type Story = StoryObj<typeof SpacingPage>;

export const Default: Story = {};

export const ScaleOnly: Story = {
  render: () => {
    const maxPx = SPACING_SCALE[SPACING_SCALE.length - 1].px;
    return (
      <div style={pageStyle}>
        <div style={sectionTitleStyle}>Spacing Scale</div>
        {SPACING_SCALE.map((s) => (
          <div key={s.name} style={rowStyle}>
            <span style={nameColStyle}>{s.name}</span>
            <span style={pxColStyle}>{s.px}px</span>
            <div style={{ flex: 1 }}>
              <div style={{ ...barStyle, width: `${(s.px / maxPx) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Boxes: Story = {
  render: () => (
    <div style={pageStyle}>
      <div style={sectionTitleStyle}>Box Preview</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-end' }}>
        {SPACING_SCALE.filter((s) => s.px > 0 && s.px <= 64).map((s) => (
          <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: `${s.px}px`,
                height: `${s.px}px`,
                background: 'rgba(0, 255, 106, 0.2)',
                border: '1px solid rgba(0, 255, 106, 0.4)',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontSize: '8px', color: '#666666' }}>{s.px}px</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

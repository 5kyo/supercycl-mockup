import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

// =============================================================================
// Data
// =============================================================================

const RADIUS = [
  { name: 'xs',   var: '--p-radius-xs',   value: '2px' },
  { name: 'sm',   var: '--p-radius-sm',   value: '4px' },
  { name: 'md',   var: '--p-radius-md',   value: '6px' },
  { name: 'lg',   var: '--p-radius-lg',   value: '10px' },
  { name: 'xl',   var: '--p-radius-xl',   value: '16px' },
  { name: '2xl',  var: '--p-radius-2xl',  value: '20px' },
  { name: '3xl',  var: '--p-radius-3xl',  value: '32px' },
  { name: 'full', var: '--p-radius-full', value: '9999px' },
] as const;

const SHADOWS = [
  { name: 'sm',   var: '--p-shadow-sm',   value: '0 1px 2px rgba(0,0,0,0.3)' },
  { name: 'md',   var: '--p-shadow-md',   value: '0 2px 8px rgba(0,0,0,0.4)' },
  { name: 'lg',   var: '--p-shadow-lg',   value: '0 4px 16px rgba(0,0,0,0.5)' },
  { name: 'xl',   var: '--p-shadow-xl',   value: '0 8px 32px rgba(0,0,0,0.6)' },
  { name: 'glow-green', var: '--p-shadow-glow-green', value: '0 0 8px rgba(0,255,106,0.3)' },
  { name: 'glow-strong', var: '--p-shadow-glow-green-strong', value: '0 0 20px rgba(0,255,106,0.6)' },
] as const;

const DURATIONS = [
  { name: 'instant',  var: '--p-duration-instant',  value: '0s' },
  { name: 'fast',     var: '--p-duration-fast',     value: '0.15s' },
  { name: 'normal',   var: '--p-duration-normal',   value: '0.2s' },
  { name: 'moderate', var: '--p-duration-moderate', value: '0.3s' },
  { name: 'slow',     var: '--p-duration-slow',     value: '0.4s' },
  { name: 'slower',   var: '--p-duration-slower',   value: '0.5s' },
  { name: 'loading',  var: '--p-duration-loading',  value: '1s' },
  { name: 'pulse',    var: '--p-duration-pulse',    value: '1.5s' },
] as const;

const EASINGS = [
  { name: 'out',    var: '--p-ease-out',     value: 'ease-out' },
  { name: 'in-out', var: '--p-ease-in-out',  value: 'ease-in-out' },
  { name: 'linear', var: '--p-ease-linear',  value: 'linear' },
  { name: 'spring', var: '--p-ease-spring',  value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
] as const;

const Z_INDEX = [
  { name: 'base',    var: '--p-z-base',    value: 0 },
  { name: 'raised',  var: '--p-z-raised',  value: 10 },
  { name: 'nav',     var: '--p-z-nav',     value: 50 },
  { name: 'overlay', var: '--p-z-overlay', value: 100 },
  { name: 'sheet',   var: '--p-z-sheet',   value: 101 },
  { name: 'toast',   var: '--p-z-toast',   value: 200 },
  { name: 'max',     var: '--p-z-max',     value: 999 },
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
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '12px',
  marginTop: '28px',
  color: '#00ff6a',
};

const gridStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '20px',
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '6px 0',
  borderBottom: '1px solid #1d1d1d',
};

const labelStyle: CSSProperties = {
  width: '60px',
  fontSize: '9px',
  color: '#9f9f9f',
  fontFamily: "'IBM Plex Sans', monospace",
  flexShrink: 0,
};

const valueStyle: CSSProperties = {
  fontSize: '9px',
  color: '#666666',
  fontFamily: "'IBM Plex Sans', monospace",
  flex: 1,
};

// =============================================================================
// Story Component
// =============================================================================

function OverviewPage() {
  return (
    <div style={pageStyle}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Token Overview</h2>
      <p style={{ fontSize: '11px', color: '#9f9f9f', marginBottom: '24px' }}>
        Border radius, shadows, motion, and z-index tokens.
      </p>

      {/* Radius */}
      <div style={sectionTitleStyle}>Border Radius</div>
      <div style={gridStyle}>
        {RADIUS.map((r) => (
          <div key={r.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#242424',
                border: '1px solid #2c2c2c',
                borderRadius: r.value,
              }}
            />
            <span style={{ fontSize: '8px', color: '#9f9f9f' }}>{r.name}</span>
            <span style={{ fontSize: '7px', color: '#505050' }}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Shadows */}
      <div style={sectionTitleStyle}>Shadows</div>
      <div style={gridStyle}>
        {SHADOWS.map((s) => (
          <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                background: '#242424',
                borderRadius: '6px',
                boxShadow: s.value,
              }}
            />
            <span style={{ fontSize: '8px', color: '#9f9f9f' }}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Motion - Durations */}
      <div style={sectionTitleStyle}>Motion Durations</div>
      {DURATIONS.map((d) => (
        <div key={d.name} style={rowStyle}>
          <span style={labelStyle}>{d.name}</span>
          <span style={valueStyle}>{d.value}</span>
        </div>
      ))}

      {/* Motion - Easings */}
      <div style={sectionTitleStyle}>Easing Curves</div>
      {EASINGS.map((e) => (
        <div key={e.name} style={rowStyle}>
          <span style={labelStyle}>{e.name}</span>
          <span style={valueStyle}>{e.value}</span>
        </div>
      ))}

      {/* Z-Index */}
      <div style={sectionTitleStyle}>Z-Index Scale</div>
      {Z_INDEX.map((z) => {
        const barWidth = z.value === 0 ? 1 : Math.min((z.value / 999) * 100, 100);
        return (
          <div key={z.name} style={rowStyle}>
            <span style={labelStyle}>{z.name}</span>
            <span style={{ ...valueStyle, width: '32px', flex: 'none' }}>{z.value}</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: '8px',
                  width: `${barWidth}%`,
                  background: '#00ff6a',
                  borderRadius: '2px',
                  minWidth: '2px',
                  opacity: 0.6,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// Meta & Stories
// =============================================================================

const meta = {
  title: 'Tokens/Overview',
  component: OverviewPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof OverviewPage>;

export default meta;
type Story = StoryObj<typeof OverviewPage>;

export const Default: Story = {};

export const RadiusOnly: Story = {
  render: () => (
    <div style={pageStyle}>
      <div style={sectionTitleStyle}>Border Radius</div>
      <div style={gridStyle}>
        {RADIUS.map((r) => (
          <div key={r.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                background: '#242424',
                border: '1px solid #2c2c2c',
                borderRadius: r.value,
              }}
            />
            <span style={{ fontSize: '9px', color: '#9f9f9f' }}>{r.name}</span>
            <span style={{ fontSize: '8px', color: '#505050' }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ShadowsOnly: Story = {
  render: () => (
    <div style={pageStyle}>
      <div style={sectionTitleStyle}>Shadows</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {SHADOWS.map((s) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                background: '#242424',
                borderRadius: '6px',
                boxShadow: s.value,
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: '11px', color: '#ffffff' }}>{s.name}</div>
              <div style={{ fontSize: '8px', color: '#505050', marginTop: '2px' }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

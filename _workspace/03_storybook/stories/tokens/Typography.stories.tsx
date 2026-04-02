import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

// =============================================================================
// Data
// =============================================================================

const FONT_SIZES = [
  { name: '2xs', var: '--p-font-size-2xs', px: '8px' },
  { name: 'xs',  var: '--p-font-size-xs',  px: '9px' },
  { name: 'sm',  var: '--p-font-size-sm',  px: '10px' },
  { name: 'md',  var: '--p-font-size-md',  px: '11px' },
  { name: 'base', var: '--p-font-size-base', px: '12px' },
  { name: 'lg',  var: '--p-font-size-lg',  px: '13px' },
  { name: 'xl',  var: '--p-font-size-xl',  px: '14px' },
  { name: '2xl', var: '--p-font-size-2xl', px: '16px' },
  { name: '3xl', var: '--p-font-size-3xl', px: '20px' },
  { name: '4xl', var: '--p-font-size-4xl', px: '24px' },
] as const;

const FONT_WEIGHTS = [
  { name: 'regular',  var: '--p-font-weight-regular',  value: 400 },
  { name: 'medium',   var: '--p-font-weight-medium',   value: 500 },
  { name: 'semibold', var: '--p-font-weight-semibold', value: 600 },
  { name: 'bold',     var: '--p-font-weight-bold',     value: 700 },
] as const;

const PRESETS = [
  { name: 'title',      desc: 'Modal/sheet titles',        size: '16px', weight: 600, lineHeight: 1.2, letterSpacing: '0em' },
  { name: 'button',     desc: 'Button labels',             size: '16px', weight: 500, lineHeight: 1.2, letterSpacing: '0em' },
  { name: 'toast',      desc: 'Toast messages',            size: '13px', weight: 500, lineHeight: 1.4, letterSpacing: '0em' },
  { name: 'cardHeader', desc: 'Card header / primary',     size: '12px', weight: 600, lineHeight: 1.3, letterSpacing: '0em' },
  { name: 'tab',        desc: 'Tab labels',                size: '11px', weight: 400, lineHeight: 1.4, letterSpacing: '0.02em' },
  { name: 'secondary',  desc: 'Secondary text',            size: '10px', weight: 500, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'badge',      desc: 'Status badge',              size: '9px',  weight: 600, lineHeight: 1.2, letterSpacing: '0.04em' },
  { name: 'label',      desc: 'Input label / tertiary',    size: '8px',  weight: 500, lineHeight: 1.4, letterSpacing: '0.02em' },
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
  marginTop: '32px',
  color: '#00ff6a',
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '12px',
  padding: '8px 0',
  borderBottom: '1px solid #1d1d1d',
};

const labelColStyle: CSSProperties = {
  width: '60px',
  fontSize: '9px',
  color: '#666666',
  fontFamily: "'IBM Plex Sans', monospace",
  flexShrink: 0,
};

const pxColStyle: CSSProperties = {
  width: '36px',
  fontSize: '9px',
  color: '#9f9f9f',
  fontFamily: "'IBM Plex Sans', monospace",
  flexShrink: 0,
  textAlign: 'right',
};

const presetRowStyle: CSSProperties = {
  padding: '12px 0',
  borderBottom: '1px solid #1d1d1d',
};

const presetMetaStyle: CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: '4px',
};

const presetTagStyle: CSSProperties = {
  fontSize: '8px',
  color: '#505050',
  fontFamily: "'IBM Plex Sans', monospace",
  background: '#1d1d1d',
  padding: '2px 4px',
  borderRadius: '2px',
};

// =============================================================================
// Story Component
// =============================================================================

function TypographyPage() {
  return (
    <div style={pageStyle}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Typography Tokens</h2>
      <p style={{ fontSize: '11px', color: '#9f9f9f', marginBottom: '24px' }}>
        Font size scale, weight variations, and composite typography presets.
      </p>

      <div style={sectionTitleStyle}>Font Size Scale</div>
      {FONT_SIZES.map((fs) => (
        <div key={fs.name} style={rowStyle}>
          <span style={labelColStyle}>{fs.name}</span>
          <span style={pxColStyle}>{fs.px}</span>
          <span style={{ fontSize: fs.px, color: '#ffffff', flex: 1 }}>
            The quick brown fox
          </span>
        </div>
      ))}

      <div style={sectionTitleStyle}>Font Weights</div>
      {FONT_WEIGHTS.map((fw) => (
        <div key={fw.name} style={rowStyle}>
          <span style={labelColStyle}>{fw.name}</span>
          <span style={pxColStyle}>{fw.value}</span>
          <span style={{ fontSize: '14px', fontWeight: fw.value, color: '#ffffff', flex: 1 }}>
            The quick brown fox
          </span>
        </div>
      ))}

      <div style={sectionTitleStyle}>Typography Presets</div>
      {PRESETS.map((p) => (
        <div key={p.name} style={presetRowStyle}>
          <div
            style={{
              fontSize: p.size,
              fontWeight: p.weight,
              lineHeight: p.lineHeight,
              letterSpacing: p.letterSpacing,
              color: '#ffffff',
            }}
          >
            {p.name} - {p.desc}
          </div>
          <div style={presetMetaStyle}>
            <span style={presetTagStyle}>{p.size}</span>
            <span style={presetTagStyle}>w{p.weight}</span>
            <span style={presetTagStyle}>lh {p.lineHeight}</span>
            <span style={presetTagStyle}>ls {p.letterSpacing}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Meta & Stories
// =============================================================================

const meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof TypographyPage>;

export const Default: Story = {};

export const FontSizes: Story = {
  render: () => (
    <div style={pageStyle}>
      <div style={sectionTitleStyle}>Font Size Scale</div>
      {FONT_SIZES.map((fs) => (
        <div key={fs.name} style={rowStyle}>
          <span style={labelColStyle}>{fs.name}</span>
          <span style={pxColStyle}>{fs.px}</span>
          <span style={{ fontSize: fs.px, color: '#ffffff', flex: 1 }}>
            The quick brown fox
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Presets: Story = {
  render: () => (
    <div style={pageStyle}>
      <div style={sectionTitleStyle}>Typography Presets</div>
      {PRESETS.map((p) => (
        <div key={p.name} style={presetRowStyle}>
          <div
            style={{
              fontSize: p.size,
              fontWeight: p.weight,
              lineHeight: p.lineHeight,
              letterSpacing: p.letterSpacing,
              color: '#ffffff',
            }}
          >
            {p.name} - {p.desc}
          </div>
          <div style={presetMetaStyle}>
            <span style={presetTagStyle}>{p.size}</span>
            <span style={presetTagStyle}>w{p.weight}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};

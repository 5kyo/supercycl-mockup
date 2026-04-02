import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

// =============================================================================
// Primitive Color Palettes — raw hex values for visual display
// =============================================================================

const PALETTES = {
  gray: {
    50: '#050505', 100: '#0a0a0a', 150: '#111111', 200: '#151515',
    250: '#1d1d1d', 300: '#242424', 350: '#2c2c2c', 400: '#363636',
    450: '#444444', 500: '#505050', 550: '#5a5a5a', 600: '#666666',
    650: '#7a7a7a', 700: '#8e8e8e', 750: '#9f9f9f', 800: '#b3b3b3',
    850: '#cccccc', 900: '#e0e0e0', 950: '#ffffff',
  },
  green: {
    50: '#021a00', 100: '#042d00', 150: '#064200', 200: '#092900',
    250: '#0d5c00', 300: '#127400', 400: '#1a8c00', 500: '#00de0b',
    550: '#00e830', 600: '#00ff6a', 650: '#37ff00', 700: '#55ff44',
    800: '#88ff77', 900: '#bbffaa', 950: '#e0ffe0',
  },
  red: {
    50: '#1a0800', 100: '#2d0e00', 150: '#421400', 200: '#5c1a00',
    300: '#8c2a10', 400: '#b33a1c', 500: '#ff5938', 600: '#ff7a60',
    700: '#ff9a88', 800: '#ffbbaa', 900: '#ffddd5', 950: '#fff0ec',
  },
  yellow: {
    50: '#1a1500', 100: '#332a00', 200: '#665400', 300: '#997f00',
    400: '#cca800', 500: '#f0b90b', 600: '#f5cc40', 700: '#f8dd77',
    800: '#fbeaaa', 900: '#fef5dd', 950: '#fffaee',
  },
  blue: {
    50: '#0a1428', 100: '#142850', 200: '#1e3c78', 300: '#2860b0',
    400: '#3272d4', 500: '#4285f4', 600: '#6aa0f8', 700: '#92bbfa',
    800: '#b8d4fc', 900: '#deebfe', 950: '#f0f5ff',
  },
} as const;

const SEMANTIC_COLORS = {
  surface: {
    page:         { var: '--s-surface-page',        hex: '#050505' },
    secondary:    { var: '--s-surface-secondary',    hex: '#050505' },
    card:         { var: '--s-surface-card',         hex: '#242424' },
    input:        { var: '--s-surface-input',        hex: '#1d1d1d' },
    hover:        { var: '--s-surface-hover',        hex: '#2c2c2c' },
    elevated:     { var: '--s-surface-elevated',     hex: '#242424' },
  },
  text: {
    primary:   { var: '--s-text-primary',   hex: '#ffffff' },
    secondary: { var: '--s-text-secondary', hex: '#9f9f9f' },
    tertiary:  { var: '--s-text-tertiary',  hex: '#666666' },
    disabled:  { var: '--s-text-disabled',  hex: '#505050' },
    inverse:   { var: '--s-text-inverse',   hex: '#050505' },
    onAccent:  { var: '--s-text-on-accent', hex: '#0a0a0a' },
  },
  border: {
    default: { var: '--s-border-default', hex: '#2c2c2c' },
    subtle:  { var: '--s-border-subtle',  hex: '#242424' },
    strong:  { var: '--s-border-strong',  hex: '#666666' },
    focus:   { var: '--s-border-focus',   hex: '#00de0b' },
  },
  interactive: {
    primary:      { var: '--s-interactive-primary',       hex: '#00ff6a' },
    primaryAlt:   { var: '--s-interactive-primary-alt',   hex: '#37ff00' },
    primaryMuted: { var: '--s-interactive-primary-muted', hex: '#00de0b' },
    secondary:    { var: '--s-interactive-secondary',     hex: '#242424' },
    hover:        { var: '--s-interactive-hover',         hex: '#2c2c2c' },
    disabled:     { var: '--s-interactive-disabled',      hex: '#505050' },
  },
  feedback: {
    success:   { var: '--s-feedback-success',   hex: '#00de0b' },
    error:     { var: '--s-feedback-error',     hex: '#ff5938' },
    warning:   { var: '--s-feedback-warning',   hex: '#f0b90b' },
    info:      { var: '--s-feedback-info',      hex: '#4285f4' },
  },
  trading: {
    buy:     { var: '--s-trading-buy',     hex: '#00de0b' },
    sell:    { var: '--s-trading-sell',    hex: '#ff5938' },
    profit:  { var: '--s-trading-profit',  hex: '#00de0b' },
    loss:    { var: '--s-trading-loss',    hex: '#ff5938' },
    neutral: { var: '--s-trading-neutral', hex: '#9f9f9f' },
  },
} as const;

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
  color: '#ffffff',
};

const paletteGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
  gap: '8px',
  marginBottom: '24px',
};

const swatchStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
};

const colorBoxStyle: CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '4px',
  border: '1px solid rgba(255,255,255,0.1)',
};

const swatchLabelStyle: CSSProperties = {
  fontSize: '8px',
  color: '#9f9f9f',
  textAlign: 'center',
  lineHeight: 1.3,
};

const semanticRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 0',
  borderBottom: '1px solid #1d1d1d',
};

const semanticBoxStyle: CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '4px',
  border: '1px solid rgba(255,255,255,0.1)',
  flexShrink: 0,
};

const semanticVarStyle: CSSProperties = {
  fontSize: '10px',
  color: '#9f9f9f',
  flex: 1,
  fontFamily: "'IBM Plex Sans', monospace",
};

const semanticHexStyle: CSSProperties = {
  fontSize: '10px',
  color: '#666666',
  fontFamily: "'IBM Plex Sans', monospace",
};

// =============================================================================
// Helper Components
// =============================================================================

function PrimitivePalette({ name, colors }: { readonly name: string; readonly colors: Record<string, string> }) {
  return (
    <div>
      <div style={sectionTitleStyle}>{name}</div>
      <div style={paletteGridStyle}>
        {Object.entries(colors).map(([scale, hex]) => (
          <div key={scale} style={swatchStyle}>
            <div style={{ ...colorBoxStyle, background: hex }} />
            <div style={swatchLabelStyle}>
              <div>{scale}</div>
              <div>{hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemanticGroup({ name, items }: { readonly name: string; readonly items: Record<string, { var: string; hex: string }> }) {
  return (
    <div>
      <div style={{ ...sectionTitleStyle, fontSize: '13px', marginTop: '20px' }}>{name}</div>
      {Object.entries(items).map(([key, { var: cssVar, hex }]) => (
        <div key={key} style={semanticRowStyle}>
          <div style={{ ...semanticBoxStyle, background: hex }} />
          <span style={semanticVarStyle}>{cssVar}</span>
          <span style={semanticHexStyle}>{hex}</span>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Story Component
// =============================================================================

function ColorsPage() {
  return (
    <div style={pageStyle}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Color Tokens</h2>
      <p style={{ fontSize: '11px', color: '#9f9f9f', marginBottom: '24px' }}>
        3-tier token system: Primitive (raw values) and Semantic (purpose-driven aliases).
      </p>

      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#00ff6a' }}>
        Primitive Colors
      </h3>
      {Object.entries(PALETTES).map(([name, colors]) => (
        <PrimitivePalette key={name} name={name} colors={colors} />
      ))}

      <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '40px', marginBottom: '8px', color: '#00ff6a' }}>
        Semantic Colors
      </h3>
      {Object.entries(SEMANTIC_COLORS).map(([group, items]) => (
        <SemanticGroup key={group} name={group} items={items} />
      ))}
    </div>
  );
}

// =============================================================================
// Meta & Stories
// =============================================================================

const meta = {
  title: 'Tokens/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof ColorsPage>;

export default meta;
type Story = StoryObj<typeof ColorsPage>;

export const Default: Story = {};

export const PrimitivePalettes: Story = {
  render: () => (
    <div style={pageStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#00ff6a' }}>
        Primitive Color Palettes
      </h3>
      {Object.entries(PALETTES).map(([name, colors]) => (
        <PrimitivePalette key={name} name={name} colors={colors} />
      ))}
    </div>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <div style={pageStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#00ff6a' }}>
        Semantic Color Tokens
      </h3>
      {Object.entries(SEMANTIC_COLORS).map(([group, items]) => (
        <SemanticGroup key={group} name={group} items={items} />
      ))}
    </div>
  ),
};

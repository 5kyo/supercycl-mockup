import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import Card from '../../02_components/common/Card';

// =============================================================================
// Constants
// =============================================================================

const VARIANTS = ['default', 'outlined', 'elevated'] as const;

const containerStyle: CSSProperties = {
  padding: '20px',
  background: 'var(--s-surface-page)',
  maxWidth: '360px',
  fontFamily: 'var(--s-font-family-default)',
};

const sectionTitleStyle: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--s-text-primary)',
  marginBottom: '12px',
  marginTop: '24px',
};

const gridStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const bodyTextStyle: CSSProperties = {
  fontSize: '11px',
  color: 'var(--s-text-secondary)',
  lineHeight: 1.4,
};

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={containerStyle}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: [...VARIANTS],
      description: 'Visual variant',
    },
    indicator: {
      control: 'color',
      description: 'Left indicator color',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    children: (
      <span style={bodyTextStyle}>
        BTC/USDT - Bitcoin is currently trading at $67,500.00 with a 24h change of +2.3%.
      </span>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={gridStyle}>
      <div style={sectionTitleStyle}>Variants</div>
      {VARIANTS.map((variant) => (
        <Card key={variant} variant={variant}>
          <div style={bodyTextStyle}>
            <strong style={{ color: 'var(--s-text-primary)' }}>{variant}</strong> variant card.
            Background, border, and shadow differ by variant.
          </div>
        </Card>
      ))}

      <div style={sectionTitleStyle}>With Indicator</div>
      <Card indicator="var(--s-trading-buy)">
        <div style={bodyTextStyle}>
          <strong style={{ color: 'var(--s-trading-buy)' }}>Long</strong> position indicator (green)
        </div>
      </Card>
      <Card indicator="var(--s-trading-sell)">
        <div style={bodyTextStyle}>
          <strong style={{ color: 'var(--s-trading-sell)' }}>Short</strong> position indicator (red)
        </div>
      </Card>
      <Card indicator="var(--s-feedback-warning)">
        <div style={bodyTextStyle}>
          <strong style={{ color: 'var(--s-feedback-warning)' }}>Warning</strong> indicator (yellow)
        </div>
      </Card>

      <div style={sectionTitleStyle}>With Header & Footer</div>
      <Card
        variant="outlined"
        header={
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--s-text-primary)' }}>
            Position Summary
          </span>
        }
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <span style={{ fontSize: '10px', color: 'var(--s-trading-buy)' }}>+$1,250.00</span>
            <span style={{ fontSize: '10px', color: 'var(--s-text-tertiary)' }}>|</span>
            <span style={{ fontSize: '10px', color: 'var(--s-trading-buy)' }}>+12.5%</span>
          </div>
        }
      >
        <div style={bodyTextStyle}>
          BTC/USDT Long 10x<br />
          Entry: $60,000 | Current: $67,500
        </div>
      </Card>

      <div style={sectionTitleStyle}>Combined: Header + Indicator</div>
      <Card
        variant="outlined"
        indicator="var(--s-trading-buy)"
        header="BTC/USDT Long 10x"
      >
        <div style={bodyTextStyle}>
          Entry $60,000.00 | Liq $54,000.00
        </div>
      </Card>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'default',
    indicator: undefined,
    children: (
      <span style={bodyTextStyle}>Card content goes here. Adjust props in the Controls panel.</span>
    ),
  },
};

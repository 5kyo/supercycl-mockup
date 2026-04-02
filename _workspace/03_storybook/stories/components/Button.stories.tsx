import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import Button from '../../02_components/common/Button';

// =============================================================================
// Constants
// =============================================================================

const VARIANTS = ['primary', 'secondary', 'google', 'buy', 'sell', 'danger', 'ghost'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

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
  gap: '8px',
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
};

const labelStyle: CSSProperties = {
  fontSize: '9px',
  color: 'var(--s-text-tertiary)',
  width: '52px',
  flexShrink: 0,
  fontFamily: 'var(--s-font-family-mono)',
};

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/Button',
  component: Button,
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
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: [...SIZES],
      description: 'Size preset',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width of container',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={gridStyle}>
      <div style={sectionTitleStyle}>Variants x Sizes</div>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <div style={{ ...labelStyle, marginBottom: '4px' }}>{variant}</div>
          <div style={rowStyle}>
            {SIZES.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                {variant} {size}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div style={sectionTitleStyle}>States</div>
      <div style={rowStyle}>
        <Button variant="primary" isLoading>Loading</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="buy" isLoading>Loading</Button>
        <Button variant="sell" disabled>Disabled</Button>
      </div>

      <div style={sectionTitleStyle}>Full Width</div>
      <Button variant="primary" fullWidth>Full Width Primary</Button>
      <Button variant="buy" fullWidth>Full Width Buy</Button>
      <Button variant="sell" fullWidth>Full Width Sell</Button>

      <div style={sectionTitleStyle}>With Icons</div>
      <div style={rowStyle}>
        <Button variant="primary" leftIcon={<span>&#x2B;</span>}>Add</Button>
        <Button variant="secondary" rightIcon={<span>&#x2192;</span>}>Next</Button>
        <Button variant="ghost" leftIcon={<span>&#x2715;</span>}>Close</Button>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Click Me',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
    fullWidth: false,
  },
};

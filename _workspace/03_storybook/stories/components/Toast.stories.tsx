import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import Toast from '../../02_components/common/Toast';
import Button from '../../02_components/common/Button';

// =============================================================================
// Constants
// =============================================================================

const VARIANTS = ['default', 'success', 'error', 'warning'] as const;

const containerStyle: CSSProperties = {
  padding: '20px',
  background: 'var(--s-surface-page)',
  maxWidth: '360px',
  minHeight: '300px',
  fontFamily: 'var(--s-font-family-default)',
  position: 'relative',
};

const gridStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const sectionTitleStyle: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--s-text-primary)',
  marginBottom: '8px',
  marginTop: '16px',
};

const VARIANT_MESSAGES: Record<string, string> = {
  default: 'Order submitted',
  success: 'Position opened successfully',
  error: 'Insufficient margin',
  warning: 'Approaching liquidation price',
};

// =============================================================================
// Interactive Wrapper
// =============================================================================

function ToastDemo({
  variant = 'default',
  message,
  duration = 3000,
  buttonLabel,
}: {
  readonly variant?: 'default' | 'success' | 'error' | 'warning';
  readonly message?: string;
  readonly duration?: number;
  readonly buttonLabel?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleShow = useCallback(() => setIsVisible(true), []);
  const handleDismiss = useCallback(() => setIsVisible(false), []);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        {buttonLabel ?? `Show ${variant}`}
      </Button>
      <Toast
        message={message ?? VARIANT_MESSAGES[variant] ?? 'Toast message'}
        variant={variant}
        isVisible={isVisible}
        onDismiss={handleDismiss}
        duration={duration}
      />
    </>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <div style={containerStyle}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    message: { control: 'text', description: 'Toast message text' },
    variant: {
      control: 'select',
      options: [...VARIANTS],
      description: 'Visual variant',
    },
    duration: { control: 'number', description: 'Auto-dismiss duration (ms)' },
    isVisible: { control: 'boolean', description: 'Whether the toast is visible' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: () => (
    <ToastDemo variant="success" message="Order placed successfully" />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={gridStyle}>
      <div style={sectionTitleStyle}>Variants (click to show, auto-dismiss 3s)</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {VARIANTS.map((variant) => (
          <ToastDemo key={variant} variant={variant} />
        ))}
      </div>

      <div style={sectionTitleStyle}>Custom Duration</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <ToastDemo variant="success" duration={1000} buttonLabel="1s dismiss" message="Quick toast (1s)" />
        <ToastDemo variant="warning" duration={5000} buttonLabel="5s dismiss" message="Slow toast (5s)" />
      </div>

      <div style={sectionTitleStyle}>Static Preview (always visible)</div>
      <div style={{ position: 'relative', height: '200px' }}>
        {VARIANTS.map((variant, i) => (
          <Toast
            key={variant}
            message={VARIANT_MESSAGES[variant] ?? 'Toast'}
            variant={variant}
            isVisible={true}
            onDismiss={() => undefined}
            duration={999999}
            style={{
              position: 'relative',
              bottom: 'auto',
              left: 'auto',
              transform: 'none',
              marginBottom: '8px',
            }}
          />
        ))}
      </div>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <>
        <Button variant="primary" size="sm" onClick={() => setIsVisible(true)}>
          Show Toast
        </Button>
        <Toast
          message={args.message ?? 'Playground toast'}
          variant={args.variant}
          isVisible={isVisible}
          onDismiss={() => setIsVisible(false)}
          duration={args.duration}
        />
      </>
    );
  },
  args: {
    message: 'This is a toast message',
    variant: 'success',
    duration: 3000,
    isVisible: false,
  },
};

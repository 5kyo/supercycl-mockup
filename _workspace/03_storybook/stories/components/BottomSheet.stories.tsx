import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import BottomSheet from '../../02_components/common/BottomSheet';
import Button from '../../02_components/common/Button';

// =============================================================================
// Constants
// =============================================================================

const containerStyle: CSSProperties = {
  padding: '20px',
  background: 'var(--s-surface-page)',
  maxWidth: '360px',
  minHeight: '400px',
  fontFamily: 'var(--s-font-family-default)',
};

const bodyStyle: CSSProperties = {
  fontSize: '11px',
  color: 'var(--s-text-secondary)',
  lineHeight: 1.5,
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

// =============================================================================
// Interactive Wrapper
// =============================================================================

function SheetDemo({
  title,
  maxHeight,
  showHandle,
  children,
  buttonLabel = 'Open Sheet',
}: {
  readonly title?: string;
  readonly maxHeight?: string;
  readonly showHandle?: boolean;
  readonly children?: React.ReactNode;
  readonly buttonLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleOpen}>
        {buttonLabel}
      </Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        maxHeight={maxHeight}
        showHandle={showHandle}
      >
        {children ?? (
          <div style={bodyStyle}>
            Bottom sheet content. Swipe down or click backdrop to close.
          </div>
        )}
      </BottomSheet>
    </>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  decorators: [
    (Story) => (
      <div style={containerStyle}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Whether the sheet is visible' },
    title: { control: 'text', description: 'Sheet title' },
    maxHeight: { control: 'text', description: 'Max height (CSS value)' },
    showHandle: { control: 'boolean', description: 'Show drag handle' },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: () => (
    <SheetDemo title="Select Coin">
      <div style={bodyStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'DOGE/USDT'].map((coin) => (
            <div
              key={coin}
              style={{
                padding: '10px 12px',
                background: 'var(--s-surface-input)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--s-text-primary)',
                cursor: 'pointer',
              }}
            >
              {coin}
            </div>
          ))}
        </div>
      </div>
    </SheetDemo>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={gridStyle}>
      <div style={sectionTitleStyle}>Basic</div>
      <SheetDemo title="With Title" buttonLabel="With Title">
        <div style={bodyStyle}>Sheet with a title and drag handle.</div>
      </SheetDemo>

      <div style={sectionTitleStyle}>Without Title</div>
      <SheetDemo buttonLabel="No Title">
        <div style={bodyStyle}>Sheet without a title. Content only.</div>
      </SheetDemo>

      <div style={sectionTitleStyle}>Without Handle</div>
      <SheetDemo title="No Handle" showHandle={false} buttonLabel="No Handle">
        <div style={bodyStyle}>Sheet without drag handle.</div>
      </SheetDemo>

      <div style={sectionTitleStyle}>Custom Height</div>
      <SheetDemo title="Short Sheet" maxHeight="30vh" buttonLabel="30vh Height">
        <div style={bodyStyle}>This sheet is limited to 30vh.</div>
      </SheetDemo>

      <div style={sectionTitleStyle}>Scrollable Content</div>
      <SheetDemo title="Leverage" maxHeight="50vh" buttonLabel="Scrollable">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: '10px 12px',
                background: 'var(--s-surface-input)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--s-text-primary)',
              }}
            >
              {(i + 1)}x Leverage
            </div>
          ))}
        </div>
      </SheetDemo>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
          Open Playground Sheet
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={args.title}
          maxHeight={args.maxHeight}
          showHandle={args.showHandle}
        >
          <div style={bodyStyle}>
            Adjust props in the Controls panel below.
          </div>
        </BottomSheet>
      </>
    );
  },
  args: {
    title: 'Playground Sheet',
    maxHeight: '70vh',
    showHandle: true,
    isOpen: false,
  },
};

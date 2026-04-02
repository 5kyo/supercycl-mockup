import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import Modal from '../../02_components/common/Modal';
import Button from '../../02_components/common/Button';

// =============================================================================
// Constants
// =============================================================================

const SIZES = ['sm', 'md', 'lg'] as const;

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

function ModalDemo({
  title,
  size,
  showClose,
  children,
  buttonLabel = 'Open Modal',
}: {
  readonly title?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showClose?: boolean;
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
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        size={size}
        showClose={showClose}
      >
        {children ?? (
          <div style={bodyStyle}>
            This is modal content. Press Escape or click the backdrop to close.
          </div>
        )}
      </Modal>
    </>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div style={containerStyle}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Whether the modal is visible' },
    title: { control: 'text', description: 'Modal title' },
    size: { control: 'select', options: [...SIZES], description: 'Modal width' },
    showClose: { control: 'boolean', description: 'Show close button' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: () => (
    <ModalDemo title="Confirm Action" size="md">
      <div style={bodyStyle}>
        <p>Are you sure you want to close this position?</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button variant="danger" size="sm">Close Position</Button>
        </div>
      </div>
    </ModalDemo>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={gridStyle}>
      <div style={sectionTitleStyle}>Sizes</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {SIZES.map((size) => (
          <ModalDemo key={size} title={`${size} Modal`} size={size} buttonLabel={`Size: ${size}`}>
            <div style={bodyStyle}>
              This is a {size} modal. Max width varies by size.
            </div>
          </ModalDemo>
        ))}
      </div>

      <div style={sectionTitleStyle}>Without Close Button</div>
      <ModalDemo title="No Close Button" size="md" showClose={false}>
        <div style={bodyStyle}>
          <p>This modal has no close button. Click backdrop or press Escape to dismiss.</p>
        </div>
      </ModalDemo>

      <div style={sectionTitleStyle}>Without Title</div>
      <ModalDemo size="md" buttonLabel="No Title">
        <div style={bodyStyle}>
          <p>A modal without a title. Just content and a close button.</p>
        </div>
      </ModalDemo>

      <div style={sectionTitleStyle}>With Actions</div>
      <ModalDemo title="Confirm Trade" size="md" buttonLabel="With Actions">
        <div style={bodyStyle}>
          <p style={{ marginBottom: '12px' }}>
            Buy 0.5 BTC at market price ($67,500.00)?<br />
            Leverage: 10x | Margin: $3,375.00
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="ghost" size="sm" fullWidth>Cancel</Button>
            <Button variant="buy" size="sm" fullWidth>Confirm Buy</Button>
          </div>
        </div>
      </ModalDemo>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="sm" onClick={() => setIsOpen(true)}>
          Open Playground Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={args.title}
          size={args.size}
          showClose={args.showClose}
        >
          <div style={bodyStyle}>
            Adjust props in the Controls panel below. Press Escape or click backdrop to close.
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Playground Modal',
    size: 'md',
    showClose: true,
    isOpen: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import Input from '../../02_components/common/Input';

// =============================================================================
// Constants
// =============================================================================

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
  gap: '16px',
};

const SearchIcon = () => (
  <span style={{ fontSize: '12px', color: 'var(--s-text-tertiary)' }}>&#x1F50D;</span>
);

const ClearIcon = () => (
  <span style={{ fontSize: '10px', color: 'var(--s-text-tertiary)', cursor: 'pointer' }}>&#x2715;</span>
);

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={containerStyle}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the input',
    },
    error: {
      control: 'text',
      description: 'Error message (shows error state)',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width of container',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter value...',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={gridStyle}>
      <div style={sectionTitleStyle}>Basic States</div>
      <Input label="Default" placeholder="Enter value..." />
      <Input label="With Value" defaultValue="100.00" />
      <Input label="With Helper" placeholder="0.00" helperText="Enter the amount in USD" />
      <Input label="Error State" defaultValue="invalid" error="This field is required" />
      <Input label="Disabled" placeholder="Cannot edit" disabled />

      <div style={sectionTitleStyle}>With Icons</div>
      <Input
        label="Search"
        placeholder="Search coins..."
        leftIcon={<SearchIcon />}
      />
      <Input
        label="Amount"
        placeholder="0.00"
        rightIcon={<ClearIcon />}
      />
      <Input
        label="Both Icons"
        placeholder="Search..."
        leftIcon={<SearchIcon />}
        rightIcon={<ClearIcon />}
      />

      <div style={sectionTitleStyle}>Full Width</div>
      <Input label="Full Width" placeholder="Takes full container width" fullWidth />
      <Input label="Full Width Error" placeholder="Error example" error="Something went wrong" fullWidth />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    helperText: 'Enter the trade amount',
    error: '',
    disabled: false,
    fullWidth: true,
  },
};

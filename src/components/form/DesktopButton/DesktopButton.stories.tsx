import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopButton } from './DesktopButton';

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="14" r="1" />
    <circle cx="13" cy="14" r="1" />
    <path d="M1 1h2.5l1.8 9h8.4l1.3-6H5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="7" cy="7" r="5" />
    <path d="M11 11l3 3" />
  </svg>
);

const meta = {
  title: 'Forms (Desktop)/DesktopButton',
  component: DesktopButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Add to Cart',
    onClick: fn(),
  },
};

export const Variants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <DesktopButton variant="primary">Primary</DesktopButton>
      <DesktopButton variant="secondary">Secondary</DesktopButton>
      <DesktopButton variant="outline">Outline</DesktopButton>
      <DesktopButton variant="ghost">Ghost</DesktopButton>
      <DesktopButton variant="danger">Danger</DesktopButton>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DesktopButton size="sm">Small</DesktopButton>
      <DesktopButton size="md">Medium</DesktopButton>
      <DesktopButton size="lg">Large</DesktopButton>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'Add to Cart',
    icon: <CartIcon />,
  },
};

export const IconRight: Story = {
  args: {
    children: 'Search',
    icon: <SearchIcon />,
    iconPosition: 'right',
    variant: 'outline',
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Checkout Now',
    fullWidth: true,
    size: 'lg',
  },
};

export const ButtonGroup: Story = {
  name: 'Button Group Example',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <DesktopButton variant="outline">Cancel</DesktopButton>
      <DesktopButton variant="primary">Save Changes</DesktopButton>
    </div>
  ),
};

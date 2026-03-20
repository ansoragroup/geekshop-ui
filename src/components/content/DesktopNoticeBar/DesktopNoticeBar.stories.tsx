import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopNoticeBar } from './DesktopNoticeBar';

const meta = {
  title: 'Content (Desktop)/DesktopNoticeBar',
  component: DesktopNoticeBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    onDismiss: { action: 'dismissed' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopNoticeBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    content: 'Free shipping on all orders over 500,000 UZS this week. No coupon needed!',
    variant: 'info',
    dismissible: true,
  },
};

export const Success: Story = {
  args: {
    content: 'Your order #12345 has been shipped! Expected delivery: March 20, 2026.',
    variant: 'success',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    content: 'Some items in your cart are running low on stock. Complete your order soon!',
    variant: 'warning',
    dismissible: true,
  },
};

export const Error: Story = {
  args: {
    content: 'Payment failed. Please check your card details and try again.',
    variant: 'error',
    dismissible: true,
  },
};

export const AllVariants: Story = {
  name: 'All Variants (stacked)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopNoticeBar
        content="Free shipping on orders over 500,000 UZS this week."
        variant="info"
        dismissible
      />
      <DesktopNoticeBar
        content="Your coupon GEEK50K has been applied successfully!"
        variant="success"
        dismissible
      />
      <DesktopNoticeBar
        content="Flash sale ends in 2 hours. Hurry up!"
        variant="warning"
      />
      <DesktopNoticeBar
        content="Unable to connect to payment service. Please try again later."
        variant="error"
        dismissible
      />
    </div>
  ),
};

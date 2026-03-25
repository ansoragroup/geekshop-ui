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
    dismissible: { control: 'boolean' },
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

// ─── Default (Info) ──────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    content: 'Free shipping on all orders over 500,000 UZS this week. No coupon needed!',
    variant: 'info',
    dismissible: true,
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    content: 'Your coupon GEEK50K has been applied successfully! You saved 50,000 UZS on this order.',
    variant: 'success',
    dismissible: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
};

// ─── Variant: Info ───────────────────────────────────────────────────────────

export const Info: Story = {
  args: {
    content: 'Free shipping on all orders over 500,000 UZS this week. No coupon needed!',
    variant: 'info',
    dismissible: true,
  },
};

// ─── Variant: Success ────────────────────────────────────────────────────────

export const Success: Story = {
  args: {
    content: 'Your order #12345 has been shipped! Expected delivery: March 28, 2026.',
    variant: 'success',
    dismissible: true,
  },
};

// ─── Variant: Warning ────────────────────────────────────────────────────────

export const Warning: Story = {
  args: {
    content: 'Some items in your cart are running low on stock. Complete your order soon!',
    variant: 'warning',
    dismissible: true,
  },
};

// ─── Variant: Error ──────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    content: 'Payment failed. Please check your card details and try again.',
    variant: 'error',
    dismissible: true,
  },
};

// ─── Not Dismissible ─────────────────────────────────────────────────────────

export const NotDismissible: Story = {
  name: 'Not Dismissible',
  args: {
    content: 'Flash sale ends in 2 hours. Prices will return to normal at midnight.',
    variant: 'warning',
    dismissible: false,
  },
};

// ─── Custom Icon ─────────────────────────────────────────────────────────────

export const CustomIcon: Story = {
  args: {
    content: 'New products added! Check out the latest GPUs and CPUs in our store.',
    variant: 'info',
    dismissible: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
};

// ─── Long Content ────────────────────────────────────────────────────────────

export const LongContent: Story = {
  name: 'Edge: Long Content',
  args: {
    content: 'Attention shoppers! Due to unprecedented demand during our Spring Tech Festival, delivery times for some items may be extended by 2-3 business days. We apologize for the inconvenience and are working hard to fulfill all orders as quickly as possible. Thank you for your patience.',
    variant: 'warning',
    dismissible: true,
  },
};

// ─── Short Content ───────────────────────────────────────────────────────────

export const ShortContent: Story = {
  name: 'Edge: Short Content',
  args: {
    content: 'Server maintenance tonight.',
    variant: 'info',
    dismissible: true,
  },
};

// ─── All Variants Stacked ────────────────────────────────────────────────────

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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopOrderSummary } from './DesktopOrderSummary';

const meta = {
  title: 'Commerce (Desktop)/DesktopOrderSummary',
  component: DesktopOrderSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onCheckout: { action: 'onCheckout' },
  },
  decorators: [(Story) => (
    <div style={{ width: 360, padding: 24 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopOrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subtotal: 14_700_000,
    shipping: 0,
    tax: 1_764_000,
    total: 16_464_000,
    itemCount: 3,
    onCheckout: fn(),
  },
};

export const WithDiscount: Story = {
  args: {
    subtotal: 22_500_000,
    shipping: 0,
    tax: 2_250_000,
    discount: 3_375_000,
    total: 21_375_000,
    itemCount: 5,
    ctaText: 'Place Order',
    onCheckout: fn(),
  },
};

export const Loading: Story = {
  args: {
    subtotal: 14_700_000,
    shipping: 0,
    tax: 1_764_000,
    total: 16_464_000,
    itemCount: 3,
    loading: true,
    onCheckout: fn(),
  },
};

export const WithTrustBadges: Story = {
  args: {
    subtotal: 8_900_000,
    shipping: 50_000,
    total: 8_950_000,
    itemCount: 1,
    onCheckout: fn(),
    trustBadges: [
      { icon: 'shipping', text: 'Free shipping on orders over 100,000 UZS' },
      { icon: 'secure', text: 'Secure checkout with SSL encryption' },
      { icon: 'returns', text: '14-day hassle-free returns' },
      { icon: 'warranty', text: '1-year warranty included' },
    ],
  },
};

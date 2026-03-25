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

/** Default order summary: subtotal, free shipping, tax, item count. */
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

/** With discount line visible. */
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

/** Loading state: CTA button shows spinner. */
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

/** With all 4 trust badges below the CTA button. */
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

/** All props filled: discount, tax, shipping cost, trust badges, custom CTA, and item count. */
export const FullFeatured: Story = {
  args: {
    subtotal: 45_200_000,
    shipping: 35_000,
    tax: 4_523_500,
    discount: 6_780_000,
    total: 42_978_500,
    itemCount: 8,
    ctaText: 'Confirm & Pay',
    loading: false,
    onCheckout: fn(),
    trustBadges: [
      { icon: 'shipping', text: 'Express delivery in 1-2 business days' },
      { icon: 'secure', text: '256-bit SSL encrypted payment' },
      { icon: 'returns', text: '30-day money-back guarantee' },
      { icon: 'warranty', text: 'Official manufacturer warranty' },
    ],
  },
};

/** Paid shipping (non-zero). */
export const PaidShipping: Story = {
  args: {
    subtotal: 3_500_000,
    shipping: 50_000,
    total: 3_550_000,
    itemCount: 2,
    onCheckout: fn(),
  },
};

/** No tax displayed (tax is undefined). */
export const NoTax: Story = {
  args: {
    subtotal: 8_900_000,
    shipping: 0,
    total: 8_900_000,
    itemCount: 1,
    onCheckout: fn(),
  },
};

/** No item count displayed. */
export const NoItemCount: Story = {
  args: {
    subtotal: 14_700_000,
    shipping: 0,
    tax: 1_764_000,
    total: 16_464_000,
    onCheckout: fn(),
  },
};

/** Single item purchase with high value. */
export const SingleExpensiveItem: Story = {
  args: {
    subtotal: 42_500_000,
    shipping: 0,
    tax: 5_100_000,
    total: 47_600_000,
    itemCount: 1,
    ctaText: 'Buy Now',
    onCheckout: fn(),
    trustBadges: [
      { icon: 'warranty', text: '2-year AppleCare+ included' },
      { icon: 'shipping', text: 'Free next-day delivery' },
    ],
  },
};

/** Large order: many items and a big discount. */
export const LargeOrder: Story = {
  args: {
    subtotal: 156_000_000,
    shipping: 0,
    tax: 18_720_000,
    discount: 23_400_000,
    total: 151_320_000,
    itemCount: 24,
    ctaText: 'Complete Purchase',
    onCheckout: fn(),
    trustBadges: [
      { icon: 'shipping', text: 'Free shipping on all items' },
      { icon: 'secure', text: 'PCI DSS compliant checkout' },
      { icon: 'returns', text: '30-day return policy' },
      { icon: 'warranty', text: 'Full warranty coverage' },
    ],
  },
};

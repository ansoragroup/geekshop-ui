import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckoutPage } from './CheckoutPage';

const meta: Meta<typeof CheckoutPage> = {
  title: 'Pages/CheckoutPage',
  component: CheckoutPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutPage>;

/** Default checkout with addresses, payment methods, items, and price breakdown */
export const Default: Story = {
  args: {
    hasCoupon: false,
  },
};

/** Checkout with a GEEK2026 coupon applied showing -5% discount */
export const WithCouponApplied: Story = {
  args: {
    hasCoupon: true,
  },
};

/** Checkout without coupon — showing coupon input field ready for code entry */
export const WithCouponInput: Story = {
  args: {
    hasCoupon: false,
  },
};

/** Checkout showing multiple address selection with home and work addresses */
export const MultipleAddresses: Story = {
  args: {
    hasCoupon: false,
  },
};

/** Full checkout flow with coupon, all payment methods, and bottom action bar */
export const FullCheckout: Story = {
  args: {
    hasCoupon: true,
  },
};

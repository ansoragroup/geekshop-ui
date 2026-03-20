import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCheckoutPage } from './DesktopCheckoutPage';

const meta = {
  title: 'Pages (Desktop)/DesktopCheckoutPage',
  component: DesktopCheckoutPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full checkout page with items, on the Shipping step. */
export const Default: Story = {};

/** Checkout with an empty cart — shows empty state prompt. */
export const EmptyCart: Story = {
  args: {
    emptyCart: true,
  },
};

/** Shipping step — address selection (same as default, step 0). */
export const ShippingStep: Story = {
  args: {
    initialStep: 0,
  },
};

/** Payment step — payment method selection. */
export const PaymentStep: Story = {
  args: {
    initialStep: 1,
  },
};

/** Review step — final order review before placing. */
export const ReviewStep: Story = {
  args: {
    initialStep: 2,
  },
};

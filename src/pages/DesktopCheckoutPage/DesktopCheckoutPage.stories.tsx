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

/** Full checkout page — authenticated user, shipping step. */
export const Default: Story = {};

/** Empty cart — shows empty state prompt. */
export const EmptyCart: Story = {
  args: {
    emptyCart: true,
  },
};

/** Shipping step — address selection. */
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

/** Review step — final order review. */
export const ReviewStep: Story = {
  args: {
    initialStep: 2,
  },
};

/** Guest checkout — initial prompt: "Sign in or continue as guest". */
export const GuestCheckout: Story = {
  name: 'Guest — Sign In Prompt',
  args: {
    isAuthenticated: false,
    initialGuestStep: 'prompt',
  },
};

/** Guest checkout — phone number input step. */
export const GuestPhoneStep: Story = {
  name: 'Guest — Phone Input',
  args: {
    isAuthenticated: false,
    initialGuestStep: 'phone',
    initialGuestPhone: '97 321 65 40',
  },
};

/** Guest checkout — OTP verification step. */
export const GuestOTPStep: Story = {
  name: 'Guest — OTP Verification',
  args: {
    isAuthenticated: false,
    initialGuestStep: 'otp',
    initialGuestPhone: '93 876 12 34',
    initialGuestCountdown: 45,
  },
};

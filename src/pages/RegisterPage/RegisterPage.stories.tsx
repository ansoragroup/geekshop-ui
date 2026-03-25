import type { Meta, StoryObj } from '@storybook/react-vite';
import { RegisterPage } from './RegisterPage';

const meta = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof RegisterPage>;

/** Fresh registration form — name and phone inputs, Telegram login, login link */
export const Default: Story = {
  args: {
    step: 'info',
  },
};

/** User redirected from checkout — shows prompt banner explaining why registration is needed */
export const FromCheckout: Story = {
  args: {
    fromCheckout: true,
    step: 'info',
  },
};

/** OTP verification step — code input with countdown timer and resend link */
export const VerifyStep: Story = {
  args: {
    step: 'verify',
  },
};

/** Registration success — shows success result with "Start Shopping" CTA */
export const Success: Story = {
  args: {
    step: 'success',
  },
};

/** Checkout redirect on narrow iPhone SE — verifies prompt and form fit */
export const FromCheckoutSmallScreen: Story = {
  args: {
    fromCheckout: true,
    step: 'info',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** OTP step on narrow device — verifies code input and timer layout */
export const VerifyStepSmallScreen: Story = {
  args: {
    step: 'verify',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

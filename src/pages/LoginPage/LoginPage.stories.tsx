import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginPage } from './LoginPage';

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof LoginPage>;

/** Phone input step — logo, phone field with +998 country code, Telegram login option */
export const PhoneStep: Story = {
  args: {
    step: 'phone',
  },
};

/** OTP verification step — 6-digit code input with countdown timer and resend button */
export const OTPStep: Story = {
  args: {
    step: 'otp',
  },
};

/** Success step — green checkmark result screen with "Start Shopping" CTA */
export const Success: Story = {
  args: {
    step: 'success',
  },
};

/** Phone step with initial empty state — shows placeholder text and disabled button */
export const PhoneEmpty: Story = {
  name: 'Phone Empty',
  args: {
    step: 'phone',
  },
};

/** Login page showing Telegram login button alternative and terms agreement */
export const WithTelegramLogin: Story = {
  name: 'With Telegram Login',
  args: {
    step: 'phone',
  },
};

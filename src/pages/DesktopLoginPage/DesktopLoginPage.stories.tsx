import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopLoginPage } from './DesktopLoginPage';

const meta = {
  title: 'Pages (Desktop)/DesktopLoginPage',
  component: DesktopLoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopLoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default view: phone tab with number input. */
export const Default: Story = {};

/** Email tab with email+password form. */
export const EmailTab: Story = {
  args: {
    defaultTab: 'email',
  },
};

/** Phone login — user enters their phone number. */
export const PhoneLogin: Story = {
  name: 'Phone — Enter Number',
  args: {
    defaultTab: 'phone',
    initialPhone: '93 456 78 90',
  },
};

/** Phone login — OTP code entry step after sending code. */
export const PhoneOTPStep: Story = {
  name: 'Phone — OTP Entry',
  args: {
    defaultTab: 'phone',
    initialPhone: '91 234 56 78',
    initialPhoneStep: 'otp',
    initialCountdown: 42,
  },
};

/** Phone login — loading state during OTP verification. */
export const PhoneLoginLoading: Story = {
  name: 'Phone — Verifying',
  args: {
    defaultTab: 'phone',
    initialPhone: '90 123 45 67',
    initialPhoneStep: 'otp',
    initialOtp: '483921',
    loading: true,
    initialCountdown: 0,
  },
};

/** Email tab with error message. */
export const WithError: Story = {
  args: {
    defaultTab: 'email',
    error: 'Invalid email or password. Please try again.',
    initialEmail: 'alisher@mail.uz',
  },
};

/** Email tab in loading state. */
export const Loading: Story = {
  name: 'Loading State',
  args: {
    defaultTab: 'email',
    loading: true,
    initialEmail: 'nodira@geekshop.uz',
  },
};

/** Phone tab with OTP error. */
export const PhoneOTPError: Story = {
  name: 'Phone — OTP Error',
  args: {
    defaultTab: 'phone',
    initialPhone: '97 654 32 10',
    initialPhoneStep: 'otp',
    error: 'Invalid code. Please check and try again.',
    initialCountdown: 15,
  },
};

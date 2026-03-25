import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopRegisterPage } from './DesktopRegisterPage';

const meta = {
  title: 'Pages (Desktop)/DesktopRegisterPage',
  component: DesktopRegisterPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopRegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default view: phone tab registration form. */
export const Default: Story = {};

/** Email tab with full registration form. */
export const EmailTab: Story = {
  args: {
    defaultTab: 'email',
  },
};

/** Phone registration — user fills name + phone. */
export const PhoneRegister: Story = {
  name: 'Phone — Fill Form',
  args: {
    defaultTab: 'phone',
    initialValues: {
      name: 'Dilshod Rahimov',
      phone: '94 567 89 01',
    },
  },
};

/** Phone registration — OTP verification step. */
export const PhoneOTPStep: Story = {
  name: 'Phone — OTP Verification',
  args: {
    defaultTab: 'phone',
    initialValues: {
      name: 'Malika Abdullayeva',
      phone: '91 876 54 32',
    },
    initialPhoneStep: 'otp',
    initialCountdown: 37,
  },
};

/** Email tab with validation errors. */
export const WithValidationErrors: Story = {
  args: {
    defaultTab: 'email',
    initialValues: {
      name: 'Bekzod',
      email: 'alisher@mail.uz',
      phone: '+998 90',
    },
    errors: {
      email: 'This email is already registered',
      password: 'Password must be at least 8 characters',
      phone: 'Enter a valid phone number',
    },
  },
};

/** Loading state during account creation. */
export const Loading: Story = {
  name: 'Loading State',
  args: {
    defaultTab: 'email',
    loading: true,
    initialValues: {
      name: 'Nodira Karimova',
      email: 'nodira@example.com',
      phone: '+998 93 456 78 90',
    },
  },
};

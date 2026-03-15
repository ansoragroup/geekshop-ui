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

export const PhoneStep: Story = {
  args: {
    step: 'phone',
  },
};

export const OTPStep: Story = {
  args: {
    step: 'otp',
  },
};

export const Success: Story = {
  args: {
    step: 'success',
  },
};

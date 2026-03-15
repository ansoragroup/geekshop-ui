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

export const Default: Story = {
  args: {
    step: 'info',
  },
};

export const FromCheckout: Story = {
  args: {
    fromCheckout: true,
    step: 'info',
  },
};

export const VerifyStep: Story = {
  args: {
    step: 'verify',
  },
};

export const Success: Story = {
  args: {
    step: 'success',
  },
};

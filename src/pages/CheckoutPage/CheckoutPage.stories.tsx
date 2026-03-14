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

export const Default: Story = {
  args: {
    hasCoupon: false,
  },
};

export const WithCouponApplied: Story = {
  args: {
    hasCoupon: true,
  },
};

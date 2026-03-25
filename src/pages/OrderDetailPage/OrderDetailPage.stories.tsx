import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderDetailPage } from './OrderDetailPage';

const meta = {
  title: 'Pages/OrderDetailPage',
  component: OrderDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof OrderDetailPage>;

export default meta;
type Story = StoryObj<typeof OrderDetailPage>;

/** Order is currently in transit — delivery tracker shows shipping step active */
export const Shipping: Story = {
  args: {
    status: 'shipping',
  },
};

/** Order has been delivered — all tracker steps completed */
export const Delivered: Story = {
  args: {
    status: 'delivered',
  },
};

/** Order is awaiting payment — only the first tracker step is active */
export const PendingPayment: Story = {
  args: {
    status: 'pending',
  },
};

/** Simulates viewing the page on a narrow iPhone SE viewport */
export const ShippingOnSmallScreen: Story = {
  args: {
    status: 'shipping',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** Delivered order viewed on a narrow device — verifies layout doesn't break */
export const DeliveredOnSmallScreen: Story = {
  args: {
    status: 'delivered',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

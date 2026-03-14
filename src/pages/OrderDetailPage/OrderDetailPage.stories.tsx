import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderDetailPage } from './OrderDetailPage';

const meta: Meta<typeof OrderDetailPage> = {
  title: 'Pages/OrderDetailPage',
  component: OrderDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof OrderDetailPage>;

export const Shipping: Story = {
  args: {
    status: 'shipping',
  },
};

export const Delivered: Story = {
  args: {
    status: 'delivered',
  },
};

export const PendingPayment: Story = {
  args: {
    status: 'pending',
  },
};

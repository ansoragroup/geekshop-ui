import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrdersPage } from './OrdersPage';

const meta = {
  title: 'Pages/OrdersPage',
  component: OrdersPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof OrdersPage>;

export default meta;
type Story = StoryObj<typeof OrdersPage>;

export const Default: Story = {
  args: {
    empty: false,
  },
};

export const EmptyOrders: Story = {
  args: {
    empty: true,
  },
};

export const ShippingTab: Story = {
  args: {
    empty: false,
    initialTab: 'shipping',
  },
};

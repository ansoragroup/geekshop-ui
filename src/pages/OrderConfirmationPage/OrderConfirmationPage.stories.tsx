import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { mockOrderItems } from '../_shared';

const meta = {
  title: 'Pages/OrderConfirmationPage',
  component: OrderConfirmationPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof OrderConfirmationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: two order items (GPU + CPU) with success checkmark */
export const Default: Story = {};

/** Single item order — one GPU purchased */
export const SingleItem: Story = {
  args: {
    orderId: 'GS-20260315-002',
    estimatedDays: 3,
    items: [mockOrderItems[0]],
  },
};

/** Large order with 5 items — GPU, CPU, RAM, SSD, Monitor */
export const LargeOrder: Story = {
  args: {
    orderId: 'GS-20260320-010',
    estimatedDays: 7,
    items: mockOrderItems,
  },
};

/** Express delivery — estimated 1-2 days, Tashkent city order */
export const ExpressDelivery: Story = {
  args: {
    orderId: 'GS-20260325-015',
    estimatedDays: 2,
    items: [mockOrderItems[1], mockOrderItems[2]],
  },
};

/** Regional delivery — estimated 5-7 days for orders outside Tashkent */
export const RegionalDelivery: Story = {
  args: {
    orderId: 'GS-20260322-008',
    estimatedDays: 7,
    items: [mockOrderItems[3]],
  },
};

/** Bulk order with multiple quantities — RAM x2 + SSD x2 */
export const BulkQuantity: Story = {
  args: {
    orderId: 'GS-20260318-020',
    estimatedDays: 5,
    items: [mockOrderItems[2], mockOrderItems[3]],
  },
};

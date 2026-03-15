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

/** Default: two order items (GPU + CPU) */
export const Default: Story = {};

/** Single item order */
export const SingleItem: Story = {
  args: {
    orderId: 'GS-20260315-002',
    estimatedDays: 3,
    items: [mockOrderItems[0]],
  },
};

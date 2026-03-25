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

/** All orders shown — mixed statuses (shipping, review, pending) */
export const Default: Story = {
  args: {
    empty: false,
  },
};

/** New user with no order history — shows empty state with CTA */
export const EmptyOrders: Story = {
  args: {
    empty: true,
  },
};

/** Filtered to only show orders currently in transit */
export const ShippingTab: Story = {
  args: {
    empty: false,
    initialTab: 'shipping',
  },
};

/** Filtered to delivered orders — shows review and reorder actions */
export const DeliveredTab: Story = {
  args: {
    empty: false,
    initialTab: 'delivered',
  },
};

/** Filtered to pending orders — shows pay and cancel actions */
export const PendingTab: Story = {
  args: {
    empty: false,
    initialTab: 'pending',
  },
};

/** Cancelled tab — currently no cancelled orders, shows empty state within tab */
export const CancelledTabEmpty: Story = {
  args: {
    empty: false,
    initialTab: 'cancelled',
  },
};

/** Empty orders page on a narrow iPhone SE viewport */
export const EmptyOnSmallScreen: Story = {
  args: {
    empty: true,
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

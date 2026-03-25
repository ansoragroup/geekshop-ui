import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartPage } from './CartPage';

const meta = {
  title: 'Pages/CartPage',
  component: CartPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Cart with 3 items — GPU selected, CPU selected, RAM unselected */
export const WithItems: Story = {
  args: {
    empty: false,
    hasCoupon: false,
  },
};

/** Empty cart state with "Shop Now" CTA button */
export const EmptyCart: Story = {
  args: {
    empty: true,
  },
};

/** Cart with GEEK2026 coupon applied showing -10% discount on total */
export const WithCoupon: Story = {
  args: {
    empty: false,
    hasCoupon: true,
  },
};

/** Cart with items showing select-all checkbox and bottom action bar */
export const WithSelectAll: Story = {
  name: 'With Select All',
  args: {
    empty: false,
    hasCoupon: false,
  },
};

/** Full cart with coupon, price summary breakdown, and place order button */
export const FullCart: Story = {
  name: 'Full Cart',
  args: {
    empty: false,
    hasCoupon: true,
  },
};

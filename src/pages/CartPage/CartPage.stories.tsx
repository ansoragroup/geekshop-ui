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

/** Cart with items added */
export const WithItems: Story = {
  args: {
    empty: false,
    hasCoupon: false,
  },
};

/** Empty cart state */
export const EmptyCart: Story = {
  args: {
    empty: true,
  },
};

/** Cart with a coupon applied */
export const WithCoupon: Story = {
  args: {
    empty: false,
    hasCoupon: true,
  },
};

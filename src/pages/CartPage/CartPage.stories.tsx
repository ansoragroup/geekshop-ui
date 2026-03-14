import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartPage } from './CartPage';

const meta: Meta<typeof CartPage> = {
  title: 'Pages/CartPage',
  component: CartPage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof CartPage>;

export const WithItems: Story = {
  args: {
    empty: false,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

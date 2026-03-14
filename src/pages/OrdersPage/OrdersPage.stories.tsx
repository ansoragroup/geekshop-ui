import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrdersPage } from './OrdersPage';

const meta: Meta<typeof OrdersPage> = {
  title: 'Pages/OrdersPage',
  component: OrdersPage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof OrdersPage>;

export const Default: Story = {};

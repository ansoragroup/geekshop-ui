import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductDetailPage } from './ProductDetailPage';

const meta: Meta<typeof ProductDetailPage> = {
  title: 'Pages/ProductDetailPage',
  component: ProductDetailPage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductDetailPage>;

export const Default: Story = {};

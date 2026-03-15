import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductDetailPage } from './ProductDetailPage';

const meta = {
  title: 'Pages/ProductDetailPage',
  component: ProductDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof ProductDetailPage>;

export default meta;
type Story = StoryObj<typeof ProductDetailPage>;

export const Default: Story = {
  args: {
    withDiscount: true,
    outOfStock: false,
  },
};

export const WithDiscount: Story = {
  args: {
    withDiscount: true,
    outOfStock: false,
  },
};

export const OutOfStock: Story = {
  args: {
    withDiscount: false,
    outOfStock: true,
  },
};

export const PreOrder: Story = {
  args: {
    withDiscount: false,
    outOfStock: false,
    preOrder: true,
  },
};

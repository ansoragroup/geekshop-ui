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

/** Product with active discount — sale badge, original price strikethrough, and -20% tag */
export const Default: Story = {
  args: {
    withDiscount: true,
    outOfStock: false,
  },
};

/** Product at full price — no sale badge, no strikethrough, regular price display */
export const FullPrice: Story = {
  args: {
    withDiscount: false,
    outOfStock: false,
  },
};

/** Product out of stock — no quantity stepper, no variant selector, out-of-stock label shown */
export const OutOfStock: Story = {
  args: {
    withDiscount: false,
    outOfStock: true,
  },
};

/** Pre-order product (RTX 5070 Ti) — no reviews, no variant selector, pre-order badge */
export const PreOrder: Story = {
  args: {
    withDiscount: false,
    outOfStock: false,
    preOrder: true,
  },
};

/** Out of stock product that still shows its previous discount pricing */
export const OutOfStockWithDiscount: Story = {
  args: {
    withDiscount: true,
    outOfStock: true,
  },
};

/** Default product on narrow iPhone SE — verifies price, title, and action bar fit */
export const DefaultOnSmallScreen: Story = {
  args: {
    withDiscount: true,
    outOfStock: false,
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

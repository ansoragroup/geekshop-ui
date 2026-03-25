import type { Meta, StoryObj } from '@storybook/react-vite';
import { WishlistPage } from './WishlistPage';

const meta: Meta<typeof WishlistPage> = {
  title: 'Pages/WishlistPage',
  component: WishlistPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof WishlistPage>;

/** Default: wishlist with 8 items across all/sale/low-stock tabs */
export const WithItems: Story = {
  args: {
    empty: false,
  },
};

/** Empty wishlist — no saved products, CTA to browse products */
export const EmptyState: Story = {
  args: {
    empty: true,
  },
};

/** On Sale tab — showing products with price drops and discount badges */
export const OnSaleFilter: Story = {
  name: 'On Sale Filter',
  args: {
    empty: false,
  },
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[1] instanceof HTMLElement) {
      tabs[1].click();
    }
  },
};

/** Low Stock tab — items running low, urgency to purchase */
export const LowStockFilter: Story = {
  name: 'Low Stock Filter',
  args: {
    empty: false,
  },
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[2] instanceof HTMLElement) {
      tabs[2].click();
    }
  },
};

/** Full wishlist with all tab filter badges showing counts (8, 4, 3) */
export const WithBadgeCounts: Story = {
  name: 'With Badge Counts',
  args: {
    empty: false,
  },
};

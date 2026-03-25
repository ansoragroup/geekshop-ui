import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoreFrontPage } from './StoreFrontPage';

const meta = {
  title: 'Pages/StoreFrontPage',
  component: StoreFrontPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof StoreFrontPage>;

export default meta;
type Story = StoryObj<typeof StoreFrontPage>;

/** Default: TechZone Electronics storefront with products and follow button */
export const Default: Story = {};

/** Storefront with all products tab active and infinite scroll */
export const AllProducts: Story = {};

/** New products tab filter */
export const NewProducts: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[1] instanceof HTMLElement) {
      tabs[1].click();
    }
  },
};

/** Popular products tab showing bestsellers */
export const PopularProducts: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[2] instanceof HTMLElement) {
      tabs[2].click();
    }
  },
};

/** Discount products filter — showing sale items */
export const DiscountProducts: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[3] instanceof HTMLElement) {
      tabs[3].click();
    }
  },
};

/** Storefront with shop info, hero banner, and floating chat bubble */
export const WithShopInfo: Story = {};

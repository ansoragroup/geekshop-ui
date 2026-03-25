import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowsingHistoryPage } from './BrowsingHistoryPage';

const meta = {
  title: 'Pages/BrowsingHistoryPage',
  component: BrowsingHistoryPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof BrowsingHistoryPage>;

export default meta;
type Story = StoryObj<typeof BrowsingHistoryPage>;

/** Default: browsing history with products grouped by date (Today, Yesterday, This week) */
export const Default: Story = {
  args: { empty: false },
};

/** Empty browsing history — new user or cleared history */
export const EmptyHistory: Story = {
  args: { empty: true },
};

/** Full history with multiple date groups and products with various badges */
export const FullHistory: Story = {
  args: { empty: false },
};

/** History with products showing price drops and sale badges */
export const WithSaleProducts: Story = {
  args: { empty: false },
};

/** Browsing history showing trash icon in navbar for clearing */
export const WithClearAction: Story = {
  args: { empty: false },
};

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

export const WithItems: Story = {
  args: {
    empty: false,
  },
};

export const EmptyState: Story = {
  args: {
    empty: true,
  },
};

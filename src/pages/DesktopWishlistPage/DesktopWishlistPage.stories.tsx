import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopWishlistPage } from './DesktopWishlistPage';

const meta = {
  title: 'Pages (Desktop)/DesktopWishlistPage',
  component: DesktopWishlistPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopWishlistPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialProducts: [
      { id: 'w1', image: 'https://picsum.photos/seed/wish-mac/400/400', title: 'Apple MacBook Pro 16" M3 Max 36GB 1TB', price: 42000000, originalPrice: 46000000, discount: '-9%', rating: 4.9, reviewCount: 234, freeShipping: true },
      { id: 'w2', image: 'https://picsum.photos/seed/wish-gpu/400/400', title: 'ASUS ROG Strix RTX 4080 Super 16GB', price: 14500000, originalPrice: 16200000, discount: '-10%', rating: 4.7, reviewCount: 178, freeShipping: true },
      { id: 'w3', image: 'https://picsum.photos/seed/wish-hp/400/400', title: 'Sony WH-1000XM5 Wireless Headphones', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: false },
      { id: 'w4', image: 'https://picsum.photos/seed/wish-kb/400/400', title: 'Keychron Q1 Pro 75% Mechanical Keyboard', price: 1850000, originalPrice: 2200000, discount: '-16%', rating: 4.6, reviewCount: 890, freeShipping: true },
      { id: 'w5', image: 'https://picsum.photos/seed/wish-cpu/400/400', title: 'AMD Ryzen 9 7950X3D Processor', price: 7200000, originalPrice: 8500000, discount: '-15%', rating: 4.9, reviewCount: 234, freeShipping: true },
      { id: 'w6', image: 'https://picsum.photos/seed/wish-mon/400/400', title: 'LG UltraGear 27" OLED 240Hz Monitor', price: 11500000, rating: 4.8, reviewCount: 456, freeShipping: true },
    ],
  },
};

export const Empty: Story = {
  name: 'Empty Wishlist',
  args: {
    initialProducts: [],
  },
};

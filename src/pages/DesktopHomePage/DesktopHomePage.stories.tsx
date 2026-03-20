import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePage } from './DesktopHomePage';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePage',
  component: DesktopHomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFewProducts: Story = {
  name: 'Few Products',
  args: {
    initialFlashDeals: [
      { id: 'fd1', image: 'https://picsum.photos/seed/few-fd1/300/300', title: 'Samsung Galaxy S24 Ultra 256GB', price: 12500000, originalPrice: 16900000, discount: '-26%', rating: 4.8, reviewCount: 1234, freeShipping: true },
      { id: 'fd2', image: 'https://picsum.photos/seed/few-fd2/300/300', title: 'Apple AirPods Pro 2nd Gen USB-C', price: 2800000, originalPrice: 3500000, discount: '-20%', rating: 4.9, reviewCount: 892, freeShipping: true },
    ],
    initialProducts: [
      { id: '1', image: 'https://picsum.photos/seed/few-p1/300/300', title: 'Apple MacBook Air M3 15" 16GB', price: 18900000, originalPrice: 21500000, discount: '-12%', rating: 4.9, reviewCount: 567, freeShipping: true },
      { id: '2', image: 'https://picsum.photos/seed/few-p2/300/300', title: 'Sony WH-1000XM5 Headphones', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: false },
      { id: '3', image: 'https://picsum.photos/seed/few-p3/300/300', title: 'Keychron Q1 Pro 75% Keyboard', price: 1850000, originalPrice: 2200000, discount: '-16%', rating: 4.6, reviewCount: 890, freeShipping: true },
    ],
    initialRecentlyViewed: [
      { id: 'r1', image: 'https://picsum.photos/seed/few-r1/300/300', title: 'Logitech MX Master 3S Mouse', price: 950000, rating: 4.7, reviewCount: 2100, freeShipping: true },
    ],
  },
};

export const DesktopLarge: Story = {
  name: 'Desktop Large (1440px)',
  parameters: {
    viewport: { defaultViewport: 'desktop-lg' },
  },
};

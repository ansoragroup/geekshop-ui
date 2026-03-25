import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSearchResultsPage } from './DesktopSearchResultsPage';
import type { DesktopProductGridItem } from '../../components';

const meta = {
  title: 'Pages (Desktop)/DesktopSearchResultsPage',
  component: DesktopSearchResultsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopSearchResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GPUSearch: Story = {
  name: 'GPU Search Results',
  args: {
    query: 'RTX 4070',
    initialProducts: [
      { id: '1', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'MSI GeForce RTX 4070 Super Gaming X Slim 12GB', price: 8900000, originalPrice: 9800000, discount: '-10%', rating: 4.5, reviewCount: 234, freeShipping: true },
      { id: '2', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'ASUS ROG Strix RTX 4070 OC 12GB GDDR6X', price: 9200000, rating: 4.7, reviewCount: 345, freeShipping: true },
      { id: '3', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Gigabyte RTX 4070 Eagle OC 12GB', price: 7800000, originalPrice: 8500000, discount: '-8%', rating: 4.4, reviewCount: 123, freeShipping: true },
      { id: '4', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Zotac RTX 4070 Twin Edge 12GB', price: 7500000, rating: 4.3, reviewCount: 89, freeShipping: false },
      { id: '5', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'EVGA RTX 4070 XC Gaming 12GB', price: 8100000, rating: 4.5, reviewCount: 167, freeShipping: true },
      { id: '6', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'MSI RTX 4070 Ventus 3X 12GB', price: 7600000, originalPrice: 8200000, discount: '-7%', rating: 4.2, reviewCount: 201, freeShipping: false },
      { id: '7', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Sapphire RTX 4070 Pulse 12GB', price: 8000000, rating: 4.6, reviewCount: 56, freeShipping: true },
      { id: '8', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'ASUS TUF RTX 4070 OC 12GB', price: 8300000, originalPrice: 9000000, discount: '-8%', rating: 4.4, reviewCount: 145, freeShipping: true },
    ] satisfies DesktopProductGridItem[],
  },
};

export const NoResults: Story = {
  name: 'No Results',
  args: {
    query: 'quantum entanglement processor',
    initialProducts: [],
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    query: 'gaming laptop',
    loading: true,
  },
};

export const FewResults: Story = {
  name: 'Few Results (2)',
  args: {
    query: 'Apple Pro Display XDR',
    initialProducts: [
      { id: '1', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop', title: 'Apple Pro Display XDR 32" 6K Retina', price: 58000000, rating: 4.9, reviewCount: 89, freeShipping: true },
      { id: '2', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop', title: 'Apple Pro Display XDR Nano-texture Glass', price: 62000000, rating: 4.9, reviewCount: 45, freeShipping: true },
    ] satisfies DesktopProductGridItem[],
  },
};

export const HeadphoneSearch: Story = {
  name: 'Headphone Search',
  args: {
    query: 'wireless headphones',
    initialProducts: [
      { id: '1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: true },
      { id: '2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Bose QuietComfort Ultra Headphones', price: 4200000, originalPrice: 4800000, discount: '-13%', rating: 4.7, reviewCount: 567, freeShipping: true },
      { id: '3', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', title: 'Apple AirPods Max (2nd Gen) USB-C', price: 5500000, rating: 4.6, reviewCount: 234, freeShipping: true },
      { id: '4', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Sennheiser Momentum 4 Wireless', price: 3600000, originalPrice: 4200000, discount: '-14%', rating: 4.6, reviewCount: 345, freeShipping: false },
      { id: '5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'JBL Live 770NC Over-Ear Wireless', price: 1200000, originalPrice: 1800000, discount: '-33%', rating: 4.3, reviewCount: 678, freeShipping: false },
      { id: '6', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', title: 'Samsung Galaxy Buds3 Pro TWS', price: 2200000, rating: 4.5, reviewCount: 1234, freeShipping: true },
    ] satisfies DesktopProductGridItem[],
  },
};

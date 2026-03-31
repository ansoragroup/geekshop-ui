import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCategoryPage } from './DesktopCategoryPage';

const meta = {
  title: 'Pages (Desktop)/DesktopCategoryPage',
  component: DesktopCategoryPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCategoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryName: 'Graphics Cards',
  },
};

export const Laptops: Story = {
  name: 'Laptops (4 columns)',
  args: {
    categoryName: 'Laptops',
    columns: 4,
    initialProducts: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Apple MacBook Air M3 15" 16GB 512GB',
        price: 18900000,
        originalPrice: 21500000,
        discount: '-12%',
        rating: 4.9,
        reviewCount: 567,
        freeShipping: true,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'ASUS ROG Zephyrus G14 Ryzen 9 RTX 4060',
        price: 16200000,
        originalPrice: 18500000,
        discount: '-12%',
        rating: 4.7,
        reviewCount: 234,
        freeShipping: true,
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Lenovo ThinkPad X1 Carbon Gen 11 i7 16GB',
        price: 14800000,
        rating: 4.6,
        reviewCount: 189,
        freeShipping: true,
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Dell XPS 15 i9 32GB RTX 4070 OLED',
        price: 22500000,
        originalPrice: 25000000,
        discount: '-10%',
        rating: 4.8,
        reviewCount: 312,
        freeShipping: true,
      },
      {
        id: '5',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'HP Omen 16 Ryzen 7 RTX 4060 16GB',
        price: 11200000,
        rating: 4.4,
        reviewCount: 456,
        freeShipping: false,
      },
      {
        id: '6',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'MSI Raider GE78 i9 RTX 4080 32GB',
        price: 28500000,
        originalPrice: 32000000,
        discount: '-11%',
        rating: 4.7,
        reviewCount: 78,
        freeShipping: true,
      },
      {
        id: '7',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Acer Nitro 5 Ryzen 5 RTX 4050 16GB',
        price: 8500000,
        rating: 4.2,
        reviewCount: 890,
        freeShipping: false,
      },
      {
        id: '8',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Samsung Galaxy Book3 Ultra i7 RTX 4050',
        price: 15900000,
        originalPrice: 18200000,
        discount: '-13%',
        rating: 4.5,
        reviewCount: 123,
        freeShipping: true,
      },
    ],
  },
};

export const WideGrid: Story = {
  name: 'Monitors (5 columns)',
  args: {
    categoryName: 'Monitors',
    columns: 5,
    initialProducts: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        title: 'LG UltraGear 27GP950-B 27" 4K 160Hz Nano IPS',
        price: 8500000,
        originalPrice: 9800000,
        discount: '-13%',
        rating: 4.8,
        reviewCount: 456,
        freeShipping: true,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        title: 'Samsung Odyssey G9 49" DQHD 240Hz',
        price: 14200000,
        rating: 4.7,
        reviewCount: 234,
        freeShipping: true,
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        title: 'Dell UltraSharp U2723QE 27" 4K USB-C',
        price: 5600000,
        rating: 4.6,
        reviewCount: 567,
        freeShipping: true,
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        title: 'ASUS ROG Swift PG27AQDM 27" 1440p 240Hz OLED',
        price: 11500000,
        originalPrice: 13000000,
        discount: '-12%',
        rating: 4.9,
        reviewCount: 123,
        freeShipping: true,
      },
      {
        id: '5',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        title: 'BenQ MOBIUZ EX2710Q 27" 2K 165Hz',
        price: 4200000,
        rating: 4.5,
        reviewCount: 789,
        freeShipping: false,
      },
    ],
  },
};

export const NoResults: Story = {
  args: {
    categoryName: 'Quantum Computers',
    initialProducts: [],
  },
};

export const Headphones: Story = {
  name: 'Headphones (3 columns)',
  args: {
    categoryName: 'Headphones & Earbuds',
    columns: 3,
    initialProducts: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling',
        price: 3900000,
        rating: 4.8,
        reviewCount: 2100,
        freeShipping: true,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
        title: 'Apple AirPods Pro 2nd Gen USB-C',
        price: 2800000,
        originalPrice: 3500000,
        discount: '-20%',
        rating: 4.9,
        reviewCount: 892,
        freeShipping: true,
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        title: 'Bose QuietComfort Ultra Headphones',
        price: 4200000,
        rating: 4.7,
        reviewCount: 567,
        freeShipping: true,
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
        title: 'Samsung Galaxy Buds3 Pro',
        price: 2200000,
        originalPrice: 2800000,
        discount: '-21%',
        rating: 4.5,
        reviewCount: 1234,
        freeShipping: false,
      },
      {
        id: '5',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        title: 'Sennheiser Momentum 4 Wireless',
        price: 3600000,
        rating: 4.6,
        reviewCount: 345,
        freeShipping: true,
      },
      {
        id: '6',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
        title: 'JBL Live 770NC Over-Ear',
        price: 1200000,
        originalPrice: 1800000,
        discount: '-33%',
        rating: 4.3,
        reviewCount: 678,
        freeShipping: false,
      },
    ],
  },
};

export const FewProducts: Story = {
  name: 'Few Products (2)',
  args: {
    categoryName: 'Server Components',
    columns: 4,
    initialProducts: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Intel Xeon w9-3495X 56-Core Processor',
        price: 58000000,
        rating: 4.9,
        reviewCount: 12,
        freeShipping: true,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        title: 'Samsung 960GB PM9A3 NVMe Enterprise SSD',
        price: 4800000,
        originalPrice: 5500000,
        discount: '-13%',
        rating: 4.8,
        reviewCount: 34,
        freeShipping: true,
      },
    ],
  },
};

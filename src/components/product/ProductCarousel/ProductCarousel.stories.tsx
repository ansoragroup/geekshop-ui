import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCarousel } from './ProductCarousel';
import type { CarouselProduct, CarouselTab } from './ProductCarousel';

const tabs: CarouselTab[] = [
  { key: 'all', label: 'All' },
  { key: 'gpu', label: 'Graphics Cards' },
  { key: 'cpu', label: 'Processors' },
  { key: 'monitor', label: 'Monitors' },
  { key: 'laptop', label: 'Laptops' },
];

const manyTabs: CarouselTab[] = [
  { key: 'all', label: 'All' },
  { key: 'gpu', label: 'GPUs' },
  { key: 'cpu', label: 'CPUs' },
  { key: 'monitor', label: 'Monitors' },
  { key: 'laptop', label: 'Laptops' },
  { key: 'ssd', label: 'Storage' },
  { key: 'ram', label: 'Memory' },
  { key: 'peripherals', label: 'Peripherals' },
];

const products: CarouselProduct[] = [
  {
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=240&h=240&fit=crop',
    title: 'MSI RTX 4060 Ventus 2X 8GB GDDR6',
    price: 5_200_000,
    originalPrice: 5_800_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=240&h=240&fit=crop',
    title: 'AMD Ryzen 5 7600X 4.7GHz 6-Core',
    price: 3_450_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=240&h=240&fit=crop',
    title: 'LG 27GP850-B 27" Nano IPS 165Hz',
    price: 4_800_000,
    originalPrice: 5_500_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=240&h=240&fit=crop',
    title: 'Kingston Fury 16GB DDR5 5200MHz',
    price: 980_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=240&h=240&fit=crop',
    title: 'Samsung 980 Pro 1TB NVMe SSD',
    price: 1_450_000,
    originalPrice: 1_700_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=240&h=240&fit=crop',
    title: 'ASUS ROG Strix B650-A WiFi',
    price: 3_800_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=240&h=240&fit=crop',
    title: 'Logitech G502 X Gaming Mouse',
    price: 890_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=240&h=240&fit=crop',
    title: 'Corsair RM850x 850W 80+ Gold PSU',
    price: 1_650_000,
  },
];

const laptopProducts: CarouselProduct[] = [
  {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=240&h=240&fit=crop',
    title: 'MacBook Air M3 15" 16GB 512GB',
    price: 22_900_000,
    originalPrice: 24_500_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=240&h=240&fit=crop',
    title: 'ASUS ROG Strix G16 RTX 4070',
    price: 15_200_000,
    originalPrice: 19_000_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=240&h=240&fit=crop',
    title: 'Lenovo ThinkPad X1 Carbon Gen 11',
    price: 18_500_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=240&h=240&fit=crop',
    title: 'Dell XPS 15 OLED i9 32GB',
    price: 25_800_000,
    originalPrice: 28_000_000,
  },
  {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=240&h=240&fit=crop',
    title: 'HP Spectre x360 16" Touch',
    price: 19_900_000,
  },
];

const meta = {
  title: 'Product/ProductCarousel',
  component: ProductCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onSeeAll: { action: 'see all' },
    onTabChange: { action: 'tab changed' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, margin: '0 auto', background: '#F5F5F5', padding: '12px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── With Tabs ───────────────────────────────────────────────────────────────

export const WithTabs: Story = {
  args: {
    title: 'Recommended For You',
    products,
    tabs,
    activeTab: 'all',
  },
};

// ─── Without Tabs ────────────────────────────────────────────────────────────

export const WithoutTabs: Story = {
  args: {
    title: 'Popular Products',
    products: products.slice(0, 6),
  },
};

// ─── Many Tabs ───────────────────────────────────────────────────────────────

export const ManyTabs: Story = {
  name: 'Many Tabs (8)',
  args: {
    title: 'Shop by Category',
    products,
    tabs: manyTabs,
    activeTab: 'all',
  },
};

// ─── All Discounted Products ─────────────────────────────────────────────────

export const DiscountedOnly: Story = {
  name: 'Discounted Products Only',
  args: {
    title: 'Current Deals',
    products: products.filter((p) => p.originalPrice),
  },
};

// ─── Laptop Section ──────────────────────────────────────────────────────────

export const LaptopSection: Story = {
  name: 'Laptop Collection',
  args: {
    title: 'Laptops',
    products: laptopProducts,
  },
};

// ─── Few Products (3) ────────────────────────────────────────────────────────

export const FewProducts: Story = {
  name: 'Edge: Few Products (3)',
  args: {
    title: 'Flash Sale',
    products: products.slice(0, 3),
  },
};

// ─── Single Product ──────────────────────────────────────────────────────────

export const SingleProduct: Story = {
  name: 'Edge: Single Product',
  args: {
    title: 'Deal of the Day',
    products: [products[0]],
  },
};

// ─── Interactive Controlled ──────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (controlled tabs)',
  render: () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredProducts =
      activeTab === 'all'
        ? products
        : activeTab === 'gpu'
        ? products.slice(0, 3)
        : activeTab === 'cpu'
        ? products.slice(1, 4)
        : products.slice(2, 6);

    return (
      <ProductCarousel
        title="Browse Products"
        products={filteredProducts}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSeeAll={() => console.log('See all:', activeTab)}
      />
    );
  },
};

// ─── Long Titles ─────────────────────────────────────────────────────────────

export const LongTitles: Story = {
  name: 'Edge: Products with Long Titles',
  args: {
    title: 'Featured Products',
    products: [
      {
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=240&h=240&fit=crop',
        title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X PCIe 4.0 Graphics Card',
        price: 28_500_000,
        originalPrice: 32_000_000,
      },
      {
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=240&h=240&fit=crop',
        title: 'Apple MacBook Pro 16-inch M3 Max Chip 36GB Unified Memory 1TB SSD Space Black',
        price: 42_990_000,
      },
      {
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=240&h=240&fit=crop',
        title: 'Samsung Odyssey Neo G9 57" Dual 4K UHD Mini LED Curved Gaming Monitor 240Hz',
        price: 28_000_000,
        originalPrice: 34_000_000,
      },
    ],
  },
};

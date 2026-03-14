import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCarousel } from './ProductCarousel';
import type { CarouselProduct, CarouselTab } from './ProductCarousel';

const tabs: CarouselTab[] = [
  { key: 'all', label: 'Barchasi' },
  { key: 'gpu', label: 'Videokartalar' },
  { key: 'cpu', label: 'Protsessorlar' },
  { key: 'monitor', label: 'Monitorlar' },
  { key: 'laptop', label: 'Noutbuklar' },
];

const products: CarouselProduct[] = [
  {
    image: 'https://picsum.photos/seed/cg1/240/240',
    title: 'MSI RTX 4060 Ventus 2X 8GB',
    price: 5_200_000,
    originalPrice: 5_800_000,
  },
  {
    image: 'https://picsum.photos/seed/cg2/240/240',
    title: 'AMD Ryzen 5 7600X',
    price: 3_450_000,
  },
  {
    image: 'https://picsum.photos/seed/cg3/240/240',
    title: 'LG 27GP850-B 27" Nano IPS 165Hz',
    price: 4_800_000,
    originalPrice: 5_500_000,
  },
  {
    image: 'https://picsum.photos/seed/cg4/240/240',
    title: 'Kingston Fury 16GB DDR5 5200MHz',
    price: 980_000,
  },
  {
    image: 'https://picsum.photos/seed/cg5/240/240',
    title: 'Samsung 980 Pro 1TB NVMe',
    price: 1_450_000,
    originalPrice: 1_700_000,
  },
  {
    image: 'https://picsum.photos/seed/cg6/240/240',
    title: 'ASUS ROG Strix B650-A WiFi',
    price: 3_800_000,
  },
  {
    image: 'https://picsum.photos/seed/cg7/240/240',
    title: 'Logitech G502 X Gaming Mouse',
    price: 890_000,
  },
  {
    image: 'https://picsum.photos/seed/cg8/240/240',
    title: 'Corsair RM850x 850W 80+ Gold',
    price: 1_650_000,
  },
];

const meta = {
  title: 'Product/ProductCarousel',
  component: ProductCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

// --- With tabs ---
export const WithTabs: Story = {
  args: {
    title: 'Tavsiya etamiz',
    products,
    tabs,
    activeTab: 'all',
  },
};

// --- Without tabs ---
export const WithoutTabs: Story = {
  args: {
    title: 'Ommabop mahsulotlar',
    products: products.slice(0, 6),
  },
};

// --- GPU section ---
export const GPUSection: Story = {
  name: 'Videokartalar',
  args: {
    title: 'Videokartalar',
    products: [
      {
        image: 'https://picsum.photos/seed/vg1/240/240',
        title: 'MSI RTX 4060 Ventus 2X 8GB',
        price: 5_200_000,
        originalPrice: 5_800_000,
      },
      {
        image: 'https://picsum.photos/seed/vg2/240/240',
        title: 'ASUS RTX 4070 Dual OC 12GB',
        price: 8_490_000,
      },
      {
        image: 'https://picsum.photos/seed/vg3/240/240',
        title: 'Gigabyte RTX 4090 AORUS 24GB',
        price: 28_500_000,
      },
      {
        image: 'https://picsum.photos/seed/vg4/240/240',
        title: 'EVGA RTX 4080 Super FTW3 16GB',
        price: 18_200_000,
        originalPrice: 20_000_000,
      },
      {
        image: 'https://picsum.photos/seed/vg5/240/240',
        title: 'MSI RTX 4060 Ti Gaming X 8GB',
        price: 6_900_000,
      },
    ],
  },
};

// --- Deals section ---
export const DealsSection: Story = {
  name: 'Chegirmalar',
  args: {
    title: 'Chegirmalar',
    products: products.filter((p) => p.originalPrice),
  },
};

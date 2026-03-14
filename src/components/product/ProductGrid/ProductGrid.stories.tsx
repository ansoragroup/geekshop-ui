import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductGrid } from './ProductGrid';
import type { ProductCardFlatProps } from '../ProductCard';

const sampleProducts: ProductCardFlatProps[] = [
  {
    image: 'https://picsum.photos/seed/gpu1/400/400',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 5_200_000,
    originalPrice: 5_800_000,
    discount: '-10%',
    badge: 'top',
    soldCount: '700+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/cpu1/400/400',
    title: 'AMD Ryzen 7 7800X3D Processor',
    price: 6_350_000,
    badge: 'new',
  },
  {
    image: 'https://picsum.photos/seed/monitor1/400/400',
    title: 'Samsung Odyssey G5 27" 165Hz QHD Monitor',
    price: 4_100_000,
    originalPrice: 4_800_000,
    discount: '-15%',
    soldCount: '320+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/ram1/400/400',
    title: 'Kingston Fury Beast DDR5 32GB (2x16GB) 5600MHz',
    price: 1_850_000,
    soldCount: '350+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/ssd1/400/400',
    title: 'Samsung 990 EVO SSD 1TB NVMe M.2',
    price: 1_290_000,
    originalPrice: 1_500_000,
    discount: '-14%',
    badge: 'hot',
    soldCount: '500+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/laptop1/400/400',
    title: 'Lenovo IdeaPad Gaming 3 RTX 4050 16GB',
    price: 11_900_000,
    originalPrice: 13_500_000,
    discount: '-12%',
    soldCount: '1200+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/gpu2/400/400',
    title: 'ASUS Dual GeForce RTX 4070 OC 12GB GDDR6X',
    price: 8_490_000,
    badge: 'top',
  },
  {
    image: 'https://picsum.photos/seed/mobo1/400/400',
    title: 'MSI MAG B650 Tomahawk WiFi ATX Motherboard',
    price: 3_200_000,
    soldCount: '180+ sotilgan',
  },
];

const meta: Meta<typeof ProductGrid> = {
  title: 'Product/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, margin: '0 auto', background: '#F5F5F5', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

// --- Default 2-column grid ---
export const Default: Story = {
  args: {
    products: sampleProducts,
    columns: 2,
    gap: 8,
  },
};

// --- 6 products ---
export const SixProducts: Story = {
  args: {
    products: sampleProducts.slice(0, 6),
    columns: 2,
    gap: 8,
  },
};

// --- 3-column layout ---
export const ThreeColumns: Story = {
  args: {
    products: sampleProducts.slice(0, 6),
    columns: 3,
    gap: 8,
  },
};

// --- Wider gap ---
export const WideGap: Story = {
  args: {
    products: sampleProducts.slice(0, 4),
    columns: 2,
    gap: 16,
  },
};

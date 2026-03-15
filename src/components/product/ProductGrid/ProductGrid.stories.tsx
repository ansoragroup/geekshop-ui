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

// Products with varied image aspect ratios for waterfall demo
const waterfallProducts: ProductCardFlatProps[] = [
  {
    image: 'https://picsum.photos/seed/wf-tall1/400/560',
    title: 'Xiaomi Mi Band 8 Pro Smart Bracelet',
    price: 490_000,
    originalPrice: 590_000,
    discount: '-17%',
    badge: 'hot',
    soldCount: '2400+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/wf-short1/400/300',
    title: 'Baseus 65W GaN USB-C Charger',
    price: 245_000,
    soldCount: '800+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/wf-tall2/400/600',
    title: 'Samsung Galaxy S24 Ultra Case Silicone Cover Original',
    price: 189_000,
    originalPrice: 250_000,
    discount: '-24%',
    badge: 'top',
  },
  {
    image: 'https://picsum.photos/seed/wf-med1/400/400',
    title: 'Logitech G Pro X Superlight Wireless Mouse',
    price: 1_350_000,
    badge: 'new',
    soldCount: '450+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/wf-short2/400/280',
    title: 'Ugreen USB-C Hub 7-in-1 Adapter',
    price: 385_000,
    originalPrice: 420_000,
    discount: '-8%',
  },
  {
    image: 'https://picsum.photos/seed/wf-tall3/400/520',
    title: 'Anker Soundcore Liberty 4 NC True Wireless Earbuds',
    price: 890_000,
    soldCount: '1500+ sotilgan',
    badge: 'hot',
  },
  {
    image: 'https://picsum.photos/seed/wf-med2/400/450',
    title: 'Apple AirPods Pro 2nd Gen USB-C',
    price: 3_200_000,
    originalPrice: 3_500_000,
    discount: '-9%',
    badge: 'top',
    soldCount: '3200+ sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/wf-short3/400/320',
    title: 'Keychron K2 Pro Mechanical Keyboard',
    price: 1_100_000,
    badge: 'new',
  },
];

const meta = {
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
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

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

// --- Waterfall / masonry layout ---
export const WaterfallLayout: Story = {
  args: {
    products: waterfallProducts,
    layout: 'waterfall',
    columns: 2,
    gap: 8,
  },
};

// --- Grid vs Waterfall comparison ---
export const GridVsWaterfall: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ textAlign: 'center', padding: '8px 0', fontSize: 14, fontWeight: 600 }}>Grid</h3>
        <ProductGrid products={waterfallProducts.slice(0, 6)} layout="grid" columns={2} gap={8} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ textAlign: 'center', padding: '8px 0', fontSize: 14, fontWeight: 600 }}>Waterfall</h3>
        <ProductGrid products={waterfallProducts.slice(0, 6)} layout="waterfall" columns={2} gap={8} />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#F5F5F5', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

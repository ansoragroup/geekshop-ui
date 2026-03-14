import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    badge: {
      control: 'select',
      options: [undefined, 'new', 'top', 'hot'],
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 175, padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// --- Default GPU card ---
export const Default: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu1/400/400',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 5_200_000,
  },
};

// --- Sale card ---
export const WithDiscount: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu2/400/400',
    title: 'ASUS Dual GeForce RTX 4070 OC 12GB GDDR6X',
    price: 8_490_000,
    originalPrice: 9_200_000,
    discount: '-8%',
  },
};

// --- With New badge ---
export const NewBadge: Story = {
  args: {
    image: 'https://picsum.photos/seed/cpu1/400/400',
    title: 'AMD Ryzen 7 7800X3D Processor',
    price: 6_350_000,
    badge: 'new',
  },
};

// --- With TOP badge ---
export const TopBadge: Story = {
  args: {
    image: 'https://picsum.photos/seed/monitor1/400/400',
    title: 'Samsung Odyssey G5 27" 165Hz QHD Monitor',
    price: 4_100_000,
    badge: 'top',
    soldCount: '700+ sotilgan',
  },
};

// --- Hot badge with discount ---
export const HotWithDiscount: Story = {
  args: {
    image: 'https://picsum.photos/seed/laptop1/400/400',
    title: 'Lenovo IdeaPad Gaming 3 RTX 4050 16GB',
    price: 11_900_000,
    originalPrice: 13_500_000,
    discount: '-12%',
    badge: 'hot',
    soldCount: '1200+ sotilgan',
  },
};

// --- Sold count ---
export const WithSoldCount: Story = {
  args: {
    image: 'https://picsum.photos/seed/ram1/400/400',
    title: 'Kingston Fury Beast DDR5 32GB (2x16GB) 5600MHz',
    price: 1_850_000,
    soldCount: '350+ sotilgan',
  },
};

// --- Budget SSD ---
export const BudgetSSD: Story = {
  args: {
    image: 'https://picsum.photos/seed/ssd1/400/400',
    title: 'Samsung 990 EVO SSD 1TB NVMe M.2',
    price: 1_290_000,
    originalPrice: 1_500_000,
    discount: '-14%',
    soldCount: '500+ sotilgan',
  },
};

// --- All features combined ---
export const FullFeatured: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu3/400/400',
    title: 'Gigabyte GeForce RTX 4090 AORUS Master 24GB GDDR6X',
    price: 28_500_000,
    originalPrice: 32_000_000,
    discount: '-11%',
    badge: 'top',
    soldCount: '45+ sotilgan',
  },
};

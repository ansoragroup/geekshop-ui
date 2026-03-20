import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ProductListItem } from './ProductListItem';

const meta = {
  title: 'Product/ProductListItem',
  component: ProductListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu4090/400/400',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X Graphics Card',
    price: 24990000,
    originalPrice: 29990000,
    discount: 17,
    rating: 4.7,
    reviewCount: 128,
    inStock: true,
    freeShipping: true,
    onAddToCart: fn(),
    onWishlist: fn(),
    onClick: fn(),
  },
};

export const NoDiscount: Story = {
  args: {
    image: 'https://picsum.photos/seed/ryzen9/400/400',
    title: 'AMD Ryzen 9 7950X Desktop Processor — 16 Cores, 32 Threads, 5.7 GHz Boost',
    price: 8990000,
    rating: 4.9,
    reviewCount: 256,
    inStock: true,
    freeShipping: true,
    onAddToCart: fn(),
    onWishlist: fn(),
    onClick: fn(),
  },
};

export const OutOfStock: Story = {
  args: {
    image: 'https://picsum.photos/seed/monitor/400/400',
    title: 'Samsung Odyssey G9 49" DQHD 240Hz Curved Gaming Monitor',
    price: 15490000,
    originalPrice: 18990000,
    discount: 18,
    rating: 4.5,
    reviewCount: 89,
    inStock: false,
    freeShipping: false,
    onAddToCart: fn(),
    onWishlist: fn(),
    onClick: fn(),
  },
};

export const MinimalInfo: Story = {
  args: {
    image: 'https://picsum.photos/seed/ssd/400/400',
    title: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
    price: 2190000,
    inStock: true,
    onAddToCart: fn(),
    onClick: fn(),
  },
};

export const OnSale: Story = {
  args: {
    image: 'https://picsum.photos/seed/laptop/400/400',
    title: 'ASUS ROG Strix G16 Gaming Laptop — i9-13980HX, RTX 4070, 32GB RAM, 1TB SSD',
    price: 18900000,
    originalPrice: 24500000,
    discount: 23,
    rating: 4.3,
    reviewCount: 45,
    inStock: true,
    freeShipping: true,
    onAddToCart: fn(),
    onWishlist: fn(),
    onClick: fn(),
  },
};

export const ListOfItems: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ProductListItem
        image="https://picsum.photos/seed/gpu1/400/400"
        title="NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X"
        price={24990000}
        originalPrice={29990000}
        discount={17}
        rating={4.7}
        reviewCount={128}
        inStock={true}
        freeShipping={true}
        onAddToCart={() => {}}
        onWishlist={() => {}}
        onClick={() => {}}
      />
      <ProductListItem
        image="https://picsum.photos/seed/cpu1/400/400"
        title="AMD Ryzen 9 7950X Desktop Processor — 16 Cores"
        price={8990000}
        rating={4.9}
        reviewCount={256}
        inStock={true}
        freeShipping={true}
        onAddToCart={() => {}}
        onWishlist={() => {}}
        onClick={() => {}}
      />
      <ProductListItem
        image="https://picsum.photos/seed/monitor1/400/400"
        title='Samsung Odyssey G9 49" Curved Gaming Monitor'
        price={15490000}
        originalPrice={18990000}
        discount={18}
        rating={4.5}
        reviewCount={89}
        inStock={false}
        onAddToCart={() => {}}
        onWishlist={() => {}}
        onClick={() => {}}
      />
    </div>
  ),
};

export const NarrowWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    image: 'https://picsum.photos/seed/narrow/400/400',
    title: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz RAM Kit',
    price: 1890000,
    originalPrice: 2490000,
    discount: 24,
    rating: 4.6,
    reviewCount: 72,
    inStock: true,
    freeShipping: true,
    onAddToCart: fn(),
    onWishlist: fn(),
    onClick: fn(),
  },
};

export const WideWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 1000 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    image: 'https://picsum.photos/seed/wide/400/400',
    title: 'Apple MacBook Pro 16" M3 Max — 36GB RAM, 1TB SSD, Space Black',
    price: 42990000,
    originalPrice: 47990000,
    discount: 10,
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    freeShipping: true,
    onAddToCart: fn(),
    onWishlist: fn(),
    onClick: fn(),
  },
};

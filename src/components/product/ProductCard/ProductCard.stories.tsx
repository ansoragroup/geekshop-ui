import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './ProductCard';

const meta = {
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
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ═══════════════════════════════════════════════════════════════════
// Flat API stories (existing, backward-compatible)
// ═══════════════════════════════════════════════════════════════════

// --- Default GPU card ---
export const Default: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop&auto=format',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 5_200_000,
  },
};

// --- Sale card ---
export const WithDiscount: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&auto=format',
    title: 'ASUS Dual GeForce RTX 4070 OC 12GB GDDR6X',
    price: 8_490_000,
    originalPrice: 9_200_000,
    discount: '-8%',
  },
};

// --- With New badge ---
export const NewBadge: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
    title: 'AMD Ryzen 7 7800X3D Processor',
    price: 6_350_000,
    badge: 'new',
  },
};

// --- With TOP badge ---
export const TopBadge: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    title: 'Samsung Odyssey G5 27" 165Hz QHD Monitor',
    price: 4_100_000,
    badge: 'top',
    soldCount: '700+ sotilgan',
  },
};

// --- Hot badge with discount ---
export const HotWithDiscount: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1542291026616-b53d31cf4641?w=400&h=400&fit=crop&auto=format',
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
    image:
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop&auto=format',
    title: 'Kingston Fury Beast DDR5 32GB (2x16GB) 5600MHz',
    price: 1_850_000,
    soldCount: '350+ sotilgan',
  },
};

// --- Budget SSD ---
export const BudgetSSD: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
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
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format',
    title: 'Gigabyte GeForce RTX 4090 AORUS Master 24GB GDDR6X',
    price: 28_500_000,
    originalPrice: 32_000_000,
    discount: '-11%',
    badge: 'top',
    soldCount: '45+ sotilgan',
  },
};

// ═══════════════════════════════════════════════════════════════════
// Compound API stories (new)
// ═══════════════════════════════════════════════════════════════════

export const CompoundBasic: Story = {
  name: 'Compound — Basic',
  render: () => (
    <ProductCard>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a0a?w=400&h=400&fit=crop&auto=format"
        alt="iPhone 15"
      />
      <ProductCard.Body>
        <ProductCard.Title>iPhone 15 Pro Max 256GB</ProductCard.Title>
        <ProductCard.Price current={16_900_000} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

export const CompoundWithDiscount: Story = {
  name: 'Compound — With Discount',
  render: () => (
    <ProductCard>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop&auto=format"
        alt="Samsung Galaxy"
        discount="-15%"
      />
      <ProductCard.Body>
        <ProductCard.Title>Samsung Galaxy S24 Ultra 512GB</ProductCard.Title>
        <ProductCard.Price current={18_500_000} original={21_800_000} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

export const CompoundWithBadges: Story = {
  name: 'Compound — With Badges',
  render: () => (
    <ProductCard>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format"
        alt="AirPods"
        badges={['hot']}
        discount="-10%"
      />
      <ProductCard.Body>
        <ProductCard.Title>Apple AirPods Pro 2nd Gen USB-C</ProductCard.Title>
        <ProductCard.Price current={3_200_000} original={3_550_000} />
        <ProductCard.Rating value={4.8} count={512} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

export const CompoundWithRating: Story = {
  name: 'Compound — With Rating',
  render: () => (
    <ProductCard>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format"
        alt="Keychron"
        badges={['new']}
      />
      <ProductCard.Body>
        <ProductCard.Title>Keychron Q1 Pro Wireless Mechanical Keyboard</ProductCard.Title>
        <ProductCard.Price current={2_450_000} />
        <ProductCard.Rating value={4.6} count={87} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

export const CompoundWithInstallment: Story = {
  name: 'Compound — With Installment',
  render: () => (
    <ProductCard>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop&auto=format"
        alt="MacBook"
        badges={['top']}
      />
      <ProductCard.Body>
        <ProductCard.Title>MacBook Air M3 15" 16GB 512GB</ProductCard.Title>
        <ProductCard.Price current={22_900_000} original={24_500_000} installment={1_908_000} />
        <ProductCard.Rating value={4.9} count={234} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

export const CompoundLineClamp: Story = {
  name: 'Compound — Title Line Clamp',
  render: () => (
    <ProductCard>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop&auto=format"
        alt="Mouse"
      />
      <ProductCard.Body>
        <ProductCard.Title lineClamp={1}>
          Logitech G Pro X Superlight 2 Wireless Gaming Mouse - Very Long Title That Should Be
          Truncated
        </ProductCard.Title>
        <ProductCard.Price current={1_650_000} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

export const CompoundFullFeatured: Story = {
  name: 'Compound — Full Featured',
  render: () => (
    <ProductCard onClick={() => console.log('clicked')}>
      <ProductCard.Image
        src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=400&fit=crop&auto=format"
        alt="RTX 4090"
        badges={['hot']}
        discount="-11%"
      />
      <ProductCard.Body>
        <ProductCard.Title>Gigabyte GeForce RTX 4090 AORUS Master 24GB GDDR6X</ProductCard.Title>
        <ProductCard.Price current={28_500_000} original={32_000_000} installment={2_375_000} />
        <ProductCard.Rating value={4.9} count={45} />
      </ProductCard.Body>
    </ProductCard>
  ),
};

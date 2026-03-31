import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopDealCard } from './DesktopDealCard';

const meta = {
  title: 'Content (Desktop)/DesktopDealCard',
  component: DesktopDealCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onBuy: { action: 'buy clicked' },
    soldPercent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    discount: { control: { type: 'range', min: 1, max: 90, step: 1 } },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopDealCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 8_900_000,
    originalPrice: 12_000_000,
    discount: 26,
    rating: 4,
    reviewCount: 234,
    soldPercent: 68,
    endTime: new Date(Date.now() + 3_600_000 * 3),
  },
};

// ─── Full Featured (every prop) ──────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones Black',
    price: 4_200_000,
    originalPrice: 5_500_000,
    discount: 24,
    rating: 5,
    reviewCount: 512,
    soldPercent: 82,
    endTime: new Date(Date.now() + 7_200_000),
  },
};

// ─── No Countdown ────────────────────────────────────────────────────────────

export const NoCountdown: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    title: 'ASUS ROG Strix G16 Gaming Laptop 16" RTX 4070',
    price: 15_200_000,
    originalPrice: 19_000_000,
    discount: 20,
    rating: 4.5,
    reviewCount: 87,
    soldPercent: 45,
  },
};

// ─── Almost Sold Out ─────────────────────────────────────────────────────────

export const AlmostSoldOut: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=300&h=300&fit=crop',
    title: 'Anker Soundcore Liberty 4 NC True Wireless Earbuds',
    price: 750_000,
    originalPrice: 1_100_000,
    discount: 32,
    rating: 4.7,
    reviewCount: 345,
    soldPercent: 95,
    endTime: new Date(Date.now() + 1_800_000),
  },
};

// ─── High Discount ───────────────────────────────────────────────────────────

export const HighDiscount: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    title: 'Keychron Q1 Pro Mechanical Keyboard',
    price: 1_250_000,
    originalPrice: 2_500_000,
    discount: 50,
    rating: 4.6,
    reviewCount: 156,
    soldPercent: 78,
    endTime: new Date(Date.now() + 7_200_000),
  },
};

// ─── Low Discount ────────────────────────────────────────────────────────────

export const LowDiscount: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    title: 'Logitech G Pro X Superlight 2 Wireless Mouse',
    price: 1_550_000,
    originalPrice: 1_650_000,
    discount: 6,
    rating: 4.8,
    reviewCount: 420,
    soldPercent: 22,
    endTime: new Date(Date.now() + 86_400_000),
  },
};

// ─── No Rating / No Reviews ─────────────────────────────────────────────────

export const NoRating: Story = {
  name: 'No Rating or Reviews',
  args: {
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop',
    title: 'Corsair Vengeance DDR5 32GB 6000MHz RAM Kit',
    price: 2_100_000,
    originalPrice: 2_800_000,
    discount: 25,
    soldPercent: 40,
    endTime: new Date(Date.now() + 14_400_000),
  },
};

// ─── No Progress Bar ─────────────────────────────────────────────────────────

export const NoProgress: Story = {
  name: 'No Sold Progress Bar',
  args: {
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop',
    title: 'ASUS ROG Swift PG27AQDM OLED 240Hz Monitor',
    price: 15_800_000,
    originalPrice: 18_200_000,
    discount: 13,
    rating: 4.7,
    reviewCount: 42,
    endTime: new Date(Date.now() + 43_200_000),
  },
};

// ─── Expired Countdown ───────────────────────────────────────────────────────

export const Expired: Story = {
  name: 'Expired Countdown',
  args: {
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop',
    title: 'Samsung 990 Pro 2TB NVMe SSD',
    price: 2_800_000,
    originalPrice: 3_500_000,
    discount: 20,
    rating: 4.4,
    reviewCount: 256,
    soldPercent: 100,
    endTime: new Date(Date.now() - 60_000),
  },
};

// ─── Zero Percent Sold ───────────────────────────────────────────────────────

export const JustStarted: Story = {
  name: 'Just Started (0% sold)',
  args: {
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop',
    title: 'Noctua NH-D15 chromax.black CPU Cooler',
    price: 1_450_000,
    originalPrice: 1_800_000,
    discount: 19,
    rating: 4.9,
    reviewCount: 92,
    soldPercent: 0,
    endTime: new Date(Date.now() + 172_800_000),
  },
};

// ─── Perfect Rating ──────────────────────────────────────────────────────────

export const PerfectRating: Story = {
  name: 'Perfect 5-Star Rating',
  args: {
    image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=300&h=300&fit=crop',
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm Titanium',
    price: 11_500_000,
    originalPrice: 14_000_000,
    discount: 18,
    rating: 5,
    reviewCount: 1280,
    soldPercent: 73,
    endTime: new Date(Date.now() + 10_800_000),
  },
};

// ─── Grid Layout (2 stacked) ─────────────────────────────────────────────────

export const GridLayout: Story = {
  name: 'Grid (2 cards stacked)',
  decorators: [
    (Story) => (
      <div
        style={{
          width: 600,
          padding: 24,
          background: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <DesktopDealCard
        image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop"
        title="MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6"
        price={8_900_000}
        originalPrice={12_000_000}
        discount={26}
        rating={4}
        reviewCount={234}
        soldPercent={68}
        endTime={new Date(Date.now() + 3_600_000 * 3)}
      />
      <DesktopDealCard
        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop"
        title="MacBook Air M3 15-inch 16GB 512GB Space Gray"
        price={22_900_000}
        originalPrice={26_500_000}
        discount={14}
        rating={4.9}
        reviewCount={78}
        soldPercent={35}
      />
    </>
  ),
};

// ─── Long Title ──────────────────────────────────────────────────────────────

export const LongTitle: Story = {
  name: 'Edge: Long Title',
  args: {
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    title:
      'Samsung Galaxy S24 Ultra 12GB RAM 512GB Storage Titanium Gray with S Pen and AI Features Premium Edition',
    price: 15_990_000,
    originalPrice: 18_990_000,
    discount: 16,
    rating: 4.8,
    reviewCount: 12453,
    soldPercent: 88,
    endTime: new Date(Date.now() + 5_400_000),
  },
};

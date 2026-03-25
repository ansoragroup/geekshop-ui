import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProductCard } from './DesktopProductCard';

const meta = {
  title: 'Product/DesktopProductCard',
  component: DesktopProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    imageFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 220, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 4_200_000,
    currency: "so'm",
    rating: 4.6,
    purchaseCount: 340,
  },
};

// ─── Full Featured (every optional prop) ─────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop',
    ],
    title: 'Nike Air Max 90 Essential Men Running Shoes Multiple Colorways Available',
    price: 1_290_000,
    originalPrice: 1_890_000,
    discount: '-32%',
    currency: "so'm",
    rating: 4.8,
    purchaseCount: 3420,
    purchaseCountLabel: (count: number) => `${(count / 1000).toFixed(1)}k sold`,
    badges: [
      { label: 'SALE', variant: 'sale' as const },
      { label: 'TOP', variant: 'top' as const },
    ],
    recommended: true,
    recommendedText: 'Recommended',
    freeShipping: true,
    freeShippingLabel: 'Free delivery',
    imageFit: 'cover',
  },
};

// ─── Image Swipe Preview ─────────────────────────────────────────────────────

export const ImageSwipePreview: Story = {
  name: 'Image Swipe Preview (5 images)',
  args: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop',
    ],
    title: 'Nike Air Max 90 Running Shoes',
    price: 1_290_000,
    originalPrice: 1_890_000,
    discount: '-32%',
    rating: 4.8,
    purchaseCount: 3420,
    badges: [{ label: 'SALE', variant: 'sale' as const }],
    deliveryText: 'Free shipping, 2-5 days',
  },
};

// ─── Badge Variant: SALE ─────────────────────────────────────────────────────

export const BadgeSale: Story = {
  name: 'Badge: Sale',
  args: {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    title: 'Minimalist Wristwatch Gold Edition',
    price: 890_000,
    originalPrice: 1_500_000,
    discount: '-41%',
    badges: [{ label: 'SALE', variant: 'sale' as const }],
    rating: 4.3,
    purchaseCount: 89,
  },
};

// ─── Badge Variant: TOP ──────────────────────────────────────────────────────

export const BadgeTop: Story = {
  name: 'Badge: Top',
  args: {
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop',
    title: 'Anker Soundcore Liberty 4 NC Earbuds',
    price: 750_000,
    rating: 4.7,
    purchaseCount: 12450,
    badges: [{ label: 'TOP', variant: 'top' as const }],
    freeShipping: true,
  },
};

// ─── Badge Variant: HOT ──────────────────────────────────────────────────────

export const BadgeHot: Story = {
  name: 'Badge: Hot',
  args: {
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    title: 'Portable Bluetooth Speaker JBL Flip 6',
    price: 1_150_000,
    originalPrice: 1_400_000,
    discount: '-18%',
    rating: 4.5,
    purchaseCount: 6780,
    badges: [{ label: 'HOT', variant: 'hot' as const }],
  },
};

// ─── Badge Variant: Custom Color ─────────────────────────────────────────────

export const BadgeCustom: Story = {
  name: 'Badge: Custom Color',
  args: {
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
    title: 'Adidas Ultraboost Light Running Shoes',
    price: 2_400_000,
    badges: [
      { label: 'EXCLUSIVE', variant: 'custom' as const, bgColor: '#7B2BFC', textColor: '#FFFFFF' },
    ],
    rating: 4.9,
    purchaseCount: 156,
  },
};

// ─── Multiple Badges ─────────────────────────────────────────────────────────

export const MultipleBadges: Story = {
  name: 'Multiple Badges (3)',
  args: {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
    title: 'MacBook Air M3 15-inch 16GB 512GB Space Gray',
    price: 22_900_000,
    originalPrice: 26_500_000,
    discount: '-14%',
    rating: 4.9,
    purchaseCount: 890,
    badges: [
      { label: 'SALE', variant: 'sale' as const },
      { label: 'TOP', variant: 'top' as const },
      { label: 'HOT', variant: 'hot' as const },
    ],
  },
};

// ─── With Recommended Label ──────────────────────────────────────────────────

export const Recommended: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
    title: 'Natural Tourmaline Crystal Rough Stone',
    price: 49_000,
    originalPrice: 83_000,
    discount: '-41%',
    rating: 4.8,
    purchaseCount: 26,
    badges: [{ label: 'SALE', variant: 'sale' as const }],
    recommended: true,
    recommendedText: 'Recommended',
    deliveryText: 'Free shipping',
  },
};

// ─── Custom Recommended Text ─────────────────────────────────────────────────

export const CustomRecommendedText: Story = {
  name: 'Custom Recommended Text',
  args: {
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    title: 'Fujifilm X-T5 Mirrorless Camera Body',
    price: 18_900_000,
    originalPrice: 21_000_000,
    discount: '-10%',
    rating: 4.9,
    purchaseCount: 45,
    recommended: true,
    recommendedText: "Editor's Choice",
    freeShipping: true,
  },
};

// ─── Free Shipping ───────────────────────────────────────────────────────────

export const FreeShipping: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    title: 'Ray-Ban Aviator Classic Sunglasses Gold',
    price: 2_150_000,
    rating: 4.5,
    purchaseCount: 234,
    freeShipping: true,
    freeShippingLabel: 'Free express delivery',
  },
};

// ─── Paid Delivery ───────────────────────────────────────────────────────────

export const PaidDelivery: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    title: 'LEGO Star Wars Millennium Falcon 7541 pieces',
    price: 8_500_000,
    originalPrice: 10_200_000,
    discount: '-17%',
    rating: 4.8,
    purchaseCount: 21,
    deliveryText: 'Delivery from 120,000 UZS',
  },
};

// ─── No Discount ─────────────────────────────────────────────────────────────

export const NoDiscount: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
    title: 'Samsung Galaxy Watch 6 Classic 47mm Silver',
    price: 4_800_000,
    rating: 4.6,
    purchaseCount: 312,
    freeShipping: true,
  },
};

// ─── No Rating ───────────────────────────────────────────────────────────────

export const NoRating: Story = {
  name: 'No Rating — No Reviews',
  args: {
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    title: 'Bose SoundLink Flex Portable Speaker',
    price: 1_350_000,
    originalPrice: 1_600_000,
    discount: '-16%',
    deliveryText: 'Ships in 3-5 days',
  },
};

// ─── High Purchase Count (function label) ────────────────────────────────────

export const PurchaseCountFunction: Story = {
  name: 'Purchase Count with Function Label',
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    title: 'Apple AirPods Pro 2nd Gen USB-C',
    price: 3_200_000,
    originalPrice: 3_800_000,
    discount: '-16%',
    rating: 4.9,
    purchaseCount: 58300,
    purchaseCountLabel: (count: number) =>
      count >= 10000 ? `${(count / 1000).toFixed(0)}k+ buyers` : `${count} buyers`,
    badges: [{ label: 'TOP', variant: 'top' as const }],
    recommended: true,
    freeShipping: true,
  },
};

// ─── Image Fit: Contain ──────────────────────────────────────────────────────

export const ImageFitContain: Story = {
  name: 'imageFit: contain',
  args: {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    title: 'Nike Dunk Low Retro White Black Panda',
    price: 1_490_000,
    rating: 4.7,
    purchaseCount: 2100,
    imageFit: 'contain',
  },
};

// ─── Image Fit: Fill ─────────────────────────────────────────────────────────

export const ImageFitFill: Story = {
  name: 'imageFit: fill',
  args: {
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    title: 'iPhone 15 Pro Max 256GB Natural Titanium',
    price: 16_900_000,
    originalPrice: 18_500_000,
    discount: '-9%',
    rating: 4.8,
    purchaseCount: 450,
    imageFit: 'fill',
  },
};

// ─── Legacy Badge Format ─────────────────────────────────────────────────────

export const LegacyBadges: Story = {
  name: 'Legacy Badge Colors (deprecated)',
  args: {
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    title: 'Samsung Galaxy S24 Ultra 12/256GB Titanium Gray',
    price: 15_990_000,
    originalPrice: 18_990_000,
    discount: '-16%',
    rating: 4.8,
    purchaseCount: 12453,
    badges: [
      { label: 'ORIGINAL', color: 'green' },
      { label: 'TOP', color: 'red' },
      { label: 'FLASH', color: 'purple' },
    ],
    freeShipping: true,
  },
};

// ─── Long Title (edge case) ──────────────────────────────────────────────────

export const LongTitle: Story = {
  name: 'Edge: Long Title',
  args: {
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    title: 'DUCATI Performance Motorcycle Frame Slider CNC Aluminum Crash Protector Left Right Set Universal Sport Naked Bike 2024 Model',
    price: 723_000,
    originalPrice: 1_447_000,
    discount: '-50%',
    rating: 4.2,
    purchaseCount: 3,
    badges: [{ label: 'SALE', variant: 'sale' as const }],
    deliveryText: 'Express 2-day delivery',
  },
};

// ─── Minimal (only required props) ───────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (required props only)',
  args: {
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop',
    title: 'USB-C to VGA Adapter',
    price: 45_000,
  },
};

// ─── Currency Display ────────────────────────────────────────────────────────

export const WithCurrency: Story = {
  name: 'With Currency Label',
  args: {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    title: 'Fjallraven Kanken Classic Backpack 16L',
    price: 89.99,
    originalPrice: 129.99,
    discount: '-31%',
    currency: 'USD',
    rating: 4.4,
    purchaseCount: 15600,
    freeShipping: true,
  },
};

// ─── Grid (6 cards) ──────────────────────────────────────────────────────────

export const Grid: Story = {
  name: 'Grid Layout (6 cards)',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 200px)',
          gap: 1,
          width: 1280,
        }}
      >
        <Story />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
          title="iPhone 15 Pro Max 256GB Natural Titanium"
          price={16_900_000}
          originalPrice={18_500_000}
          discount="-9%"
          rating={4.8}
          purchaseCount={450}
          badges={[{ label: 'TOP', variant: 'top' }]}
          freeShipping
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
          title="ASUS ROG Strix RTX 4070 Ti OC 12GB"
          price={9_200_000}
          originalPrice={11_500_000}
          discount="-20%"
          rating={4.9}
          purchaseCount={234}
          recommended
          deliveryText="Free shipping"
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop"
          title="Keychron Q1 Pro Wireless Mechanical Keyboard"
          price={2_450_000}
          rating={4.6}
          purchaseCount={87}
          badges={[{ label: 'HOT', variant: 'hot' }]}
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
          title="North Face Borealis Backpack 28L Black"
          price={1_350_000}
          originalPrice={1_800_000}
          discount="-25%"
          rating={4.5}
          purchaseCount={1200}
          badges={[{ label: 'SALE', variant: 'sale' }]}
          deliveryText="2-5 day delivery"
        />
        <DesktopProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
          title="New Balance 574 Classic Sneakers Grey"
          price={1_100_000}
          rating={4.3}
          purchaseCount={560}
          badges={[
            { label: 'SALE', variant: 'sale' },
            { label: 'TOP', variant: 'top' },
          ]}
          freeShipping
        />
      </div>
    ),
  ],
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: 4_200_000,
    originalPrice: 5_500_000,
    discount: '-24%',
    rating: 4.8,
    purchaseCount: 5883,
    badges: [{ label: 'SALE', variant: 'sale' }],
    recommended: true,
    deliveryText: 'Free express delivery',
  },
};

// ─── Polymorphic as="a" ──────────────────────────────────────────────────────

export const AsLink: Story = {
  name: 'Polymorphic: as="a"',
  args: {
    as: 'a',
    href: '#product-detail',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    price: 11_500_000,
    rating: 4.9,
    purchaseCount: 78,
    badges: [{ label: 'HOT', variant: 'hot' as const }],
    freeShipping: true,
  },
};

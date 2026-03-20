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
    onAddToCart: { action: 'add to cart' },
    onWishlist: { action: 'wishlist toggled' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/seed/phone1/400/400',
    title: 'Samsung Galaxy S24 Ultra 12/256GB Titanium Gray',
    price: 15_990_000,
    originalPrice: 18_990_000,
    discount: '-16%',
    installmentPrice: 1_332_500,
    installmentLabel: "so'm/oyiga",
    rating: 4.8,
    reviewCount: 12453,
    badges: [
      { label: 'ORIGINAL', color: 'green' },
    ],
    ctaText: 'Savatga',
    freeShipping: true,
    deliveryText: 'Ertaga',
  },
};

// ─── Uzum Style ─────────────────────────────────────────────────────────────

export const UzumStyle: Story = {
  name: 'Uzum.uz Style',
  args: {
    image: 'https://picsum.photos/seed/headphones2/400/400',
    title: 'Apple AirPods Pro 2 USB-C simsiz minigarnituralari',
    price: 2_520_000,
    originalPrice: 2_990_000,
    discount: '-16%',
    installmentPrice: 210_000,
    installmentLabel: "so'm/oyiga",
    rating: 4.9,
    reviewCount: 41123,
    badges: [
      { label: 'ORIGINAL', color: 'blue' },
      { label: 'ARZON NARX', color: 'green' },
    ],
    ctaText: 'Ertaga',
    ctaColor: '#7B2BFC',
    deliveryText: 'Ertaga yetkaziladi',
  },
};

// ─── Alifshop Style ─────────────────────────────────────────────────────────

export const AlifshopStyle: Story = {
  name: 'Alifshop.uz Style',
  args: {
    image: 'https://picsum.photos/seed/laptop2/400/400',
    title: 'MacBook Air M3 15" 16GB 512GB Space Gray noutbuk',
    price: 14_110_000,
    originalPrice: 17_110_000,
    discount: '-17%',
    installmentPrice: 1_028_850,
    installmentLabel: "so'm/oyga",
    rating: 4.7,
    reviewCount: 892,
    badges: [
      { label: "Rozыgrish", color: 'green' },
    ],
    ctaText: 'Savatga',
    ctaColor: '#FF5000',
  },
};

// ─── Ozon Style ─────────────────────────────────────────────────────────────

export const OzonStyle: Story = {
  name: 'Ozon.ru Style',
  args: {
    image: 'https://picsum.photos/seed/tablet1/400/400',
    title: 'iPad Pro 13" M4 256GB Wi-Fi Space Black plansheti',
    price: 2_665_380,
    originalPrice: 10_809_590,
    discount: '-75%',
    rating: 4.9,
    reviewCount: 57800,
    badges: [
      { label: 'Rasprodazha', color: 'green' },
    ],
    ctaText: 'V korzinu',
    ctaColor: '#005BFF',
    deliveryText: 'Dostavka zavtra',
  },
};

// ─── Grid (5 cards) ─────────────────────────────────────────────────────────

export const Grid: Story = {
  name: 'Grid (5 cards)',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 230px)',
          gap: 16,
          padding: 16,
          width: 1280,
        }}
      >
        <Story />
        <DesktopProductCard
          image="https://picsum.photos/seed/watch1/400/400"
          title="Apple Watch Ultra 2 49mm Titanium Orange Alpine"
          price={12_500_000}
          originalPrice={14_800_000}
          discount="-15%"
          installmentPrice={1_041_000}
          installmentLabel="so'm/oyiga"
          rating={4.8}
          reviewCount={3245}
          badges={[{ label: 'ORIGINAL', color: 'blue' }]}
          ctaText="Savatga"
          ctaColor="#7B2BFC"
        />
        <DesktopProductCard
          image="https://picsum.photos/seed/sneaker1/400/400"
          title="Nike Air Max 90 erkaklar krossovkasi oq rang"
          price={1_290_000}
          rating={4.5}
          reviewCount={8920}
          ctaText="Savatga"
          ctaColor="#FF5000"
          freeShipping
        />
        <DesktopProductCard
          image="https://picsum.photos/seed/cam1/400/400"
          title="Sony Alpha A7 IV Mirrorless kamera 28-70mm kit"
          price={32_900_000}
          originalPrice={38_000_000}
          discount="-13%"
          installmentPrice={2_741_000}
          installmentLabel="so'm/oyiga"
          rating={4.9}
          reviewCount={1560}
          badges={[
            { label: 'TOP', color: 'red' },
            { label: 'ORIGINAL', color: 'green' },
          ]}
          ctaText="V korzinu"
          ctaColor="#005BFF"
          deliveryText="Dostavka zavtra"
        />
        <DesktopProductCard
          image="https://picsum.photos/seed/chair2/400/400"
          title="Herman Miller Aeron ergonomik ofis kresloasi"
          price={18_500_000}
          rating={4.9}
          reviewCount={456}
          installmentPrice={1_541_000}
          installmentLabel="so'm/oyiga"
          ctaText="Savatga"
          freeShipping
          deliveryText="Ertaga"
        />
      </div>
    ),
  ],
  args: {
    ...Default.args,
  },
};

// ─── No Discount ────────────────────────────────────────────────────────────

export const NoDiscount: Story = {
  args: {
    image: 'https://picsum.photos/seed/speaker1/400/400',
    title: 'JBL Flip 6 portativ bluetooth dinamik qora',
    price: 890_000,
    rating: 4.3,
    reviewCount: 2340,
    ctaText: 'Savatga',
  },
};

// ─── Wishlisted ─────────────────────────────────────────────────────────────

export const Wishlisted: Story = {
  args: {
    image: 'https://picsum.photos/seed/bag1/400/400',
    title: 'Louis Vuitton Neverfull MM Monogram sumka ayollar uchun',
    price: 28_900_000,
    originalPrice: 32_000_000,
    discount: '-10%',
    rating: 5.0,
    reviewCount: 178,
    isWishlisted: true,
    badges: [
      { label: 'PREMIUM', color: 'purple' },
    ],
    ctaText: 'Savatga',
    ctaColor: '#7B2BFC',
  },
};

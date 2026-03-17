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
    onWishlist: { action: 'wishlist' },
    onCompare: { action: 'compare' },
    onQuickView: { action: 'quick view' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 230, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultImages = [
  'https://picsum.photos/seed/gpu1/400/400',
  'https://picsum.photos/seed/gpu1b/400/400',
  'https://picsum.photos/seed/gpu1c/400/400',
];

export const Default: Story = {
  args: {
    images: defaultImages,
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    shopName: 'TechZone Official',
    price: 8_900_000,
    originalPrice: 12_000_000,
    discount: '-26%',
    rating: 4.5,
    soldCount: '234',
    installmentPrice: '742 000',
    freeShipping: true,
  },
};

export const NoDiscount: Story = {
  args: {
    images: ['https://picsum.photos/seed/cpu1/400/400'],
    title: 'AMD Ryzen 7 7800X3D Processor',
    shopName: 'ComputerWorld',
    price: 6_350_000,
    rating: 4.8,
    soldCount: '189',
  },
};

export const SingleImage: Story = {
  args: {
    images: ['https://picsum.photos/seed/ssd1/400/400'],
    title: 'Samsung 990 EVO SSD 1TB NVMe M.2',
    shopName: 'Digital Plaza',
    price: 1_290_000,
    originalPrice: 1_500_000,
    discount: '-14%',
    rating: 4.3,
    soldCount: '512',
    freeShipping: true,
  },
};

export const WithInstallment: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/laptop1/400/400',
      'https://picsum.photos/seed/laptop1b/400/400',
    ],
    title: 'MacBook Air M3 15" 16GB 512GB Space Gray',
    shopName: 'Apple Store Tashkent',
    price: 22_900_000,
    originalPrice: 24_500_000,
    discount: '-7%',
    rating: 4.9,
    soldCount: '78',
    installmentPrice: '1 908 000',
    freeShipping: true,
  },
};

export const MinimalInfo: Story = {
  args: {
    images: ['https://picsum.photos/seed/mouse1/400/400'],
    title: 'Logitech G Pro X Superlight 2',
    shopName: 'GamerShop',
    price: 1_650_000,
  },
};

export const LongTitle: Story = {
  args: {
    images: ['https://picsum.photos/seed/monitor1/400/400'],
    title: 'ASUS ROG Swift PG27AQDM 27" OLED 240Hz 0.03ms G-SYNC Compatible Gaming Monitor',
    shopName: 'ASUS Authorized Reseller',
    price: 15_800_000,
    originalPrice: 18_200_000,
    discount: '-13%',
    rating: 4.7,
    soldCount: '42',
    installmentPrice: '1 316 000',
    freeShipping: true,
  },
};

export const GridLayout: Story = {
  name: 'Grid (4 cards)',
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 230px)', gap: 16, padding: 16 }}>
        <Story />
        <DesktopProductCard
          images={['https://picsum.photos/seed/kb1/400/400']}
          title="Keychron Q1 Pro Mechanical Keyboard"
          shopName="KeyboardLab"
          price={2_450_000}
          rating={4.6}
          soldCount="87"
          freeShipping
        />
        <DesktopProductCard
          images={['https://picsum.photos/seed/headset1/400/400']}
          title="Sony WH-1000XM5 Wireless Headphones"
          shopName="AudioWorld"
          price={4_200_000}
          originalPrice={4_800_000}
          discount="-13%"
          rating={4.8}
          soldCount="320"
          installmentPrice="350 000"
        />
        <DesktopProductCard
          images={['https://picsum.photos/seed/chair1/400/400']}
          title="Herman Miller Aeron Remastered"
          shopName="OfficePro"
          price={18_500_000}
          rating={4.9}
          soldCount="15"
          installmentPrice="1 541 000"
          freeShipping
        />
      </div>
    ),
  ],
  args: {
    ...Default.args,
  },
};

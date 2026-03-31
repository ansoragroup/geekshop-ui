import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlashDealStrip, type FlashDealItem } from './FlashDealStrip';

const meta = {
  title: 'Commerce/FlashDealStrip',
  component: FlashDealStrip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onViewAll: { action: 'view all' },
    onBuy: { action: 'buy' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1000, padding: 24, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlashDealStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: FlashDealItem[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    title: 'MSI RTX 4060 Ventus 2X',
    price: 4_200_000,
    originalPrice: 5_800_000,
    discount: '-28%',
    soldPercent: 72,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop&auto=format',
    title: 'AMD Ryzen 5 7600X',
    price: 2_100_000,
    originalPrice: 3_200_000,
    discount: '-34%',
    soldPercent: 58,
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&auto=format',
    title: 'Samsung 990 Pro 1TB',
    price: 3_400_000,
    originalPrice: 4_100_000,
    discount: '-17%',
    soldPercent: 45,
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop&auto=format',
    title: 'Corsair Vengeance DDR5 32GB',
    price: 1_600_000,
    originalPrice: 2_000_000,
    discount: '-20%',
    soldPercent: 83,
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop&auto=format',
    title: 'Logitech G Pro X Superlight 2',
    price: 850_000,
    originalPrice: 1_200_000,
    discount: '-29%',
    soldPercent: 61,
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop&auto=format',
    title: 'ASUS ROG Strix B650E-F',
    price: 3_800_000,
    originalPrice: 6_900_000,
    discount: '-45%',
    soldPercent: 34,
  },
  {
    id: '7',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop&auto=format',
    title: 'Noctua NH-D15 Cooler',
    price: 5_100_000,
    originalPrice: 6_000_000,
    discount: '-15%',
    soldPercent: 70,
  },
];

// 2 hours, 34 minutes, 56 seconds from now
const endTime = new Date(Date.now() + (2 * 3600 + 34 * 60 + 56) * 1000);

export const Default: Story = {
  args: {
    items: sampleItems,
    endTime,
    onViewAll: () => console.log('View all'),
    onBuy: (item) => console.log('Buy', item.title),
  },
};

export const FewItems: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    endTime,
  },
};

export const AlmostSoldOut: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      soldPercent: 90 + Math.floor(Math.random() * 10),
    })),
    endTime: new Date(Date.now() + 300_000), // 5 minutes
    title: 'LAST CHANCE',
  },
};

export const CustomTitle: Story = {
  args: {
    items: sampleItems.slice(0, 5),
    endTime,
    title: 'MEGA SALE',
  },
};

export const NarrowWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...Default.args,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSaleHits } from './DesktopSaleHits';

const meta = {
  title: 'Content (Desktop)/DesktopSaleHits',
  component: DesktopSaleHits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onViewAll: { action: 'view all' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSaleHits>;

export default meta;
type Story = StoryObj<typeof meta>;

const saleItems = [
  { id: '1', image: 'https://images.unsplash.com/photo-1515562141589-67f0d707b39b?w=300&h=300&fit=crop', title: 'Freshwater pearl pendants natural set', price: 10_003, originalPrice: 17_323, discount: '-42%', currency: 'USD' },
  { id: '2', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop', title: 'CINDY XIANG pearl brooch vintage', price: 16_469, originalPrice: 40_259, discount: '-59%', currency: 'USD' },
  { id: '3', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop', title: 'Acrylic beads for bracelet 30 pcs', price: 6_953, originalPrice: 10_491, discount: '-34%', currency: 'USD' },
  { id: '4', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', title: 'Kids clothing set summer cotton', price: 332_942, originalPrice: 665_885, discount: '-50%', currency: 'USD' },
  { id: '5', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop', title: 'Vintage hair clip metal butterfly', price: 18_421, originalPrice: 34_769, discount: '-47%', currency: 'USD' },
  { id: '6', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop', title: 'Acrylic brooch handmade floral', price: 25_009, originalPrice: 56_876, discount: '-56%', currency: 'USD' },
  { id: '7', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop', title: 'Round acrylic beads colorful 50 pcs', price: 8_173, originalPrice: 11_711, discount: '-30%', currency: 'USD' },
  { id: '8', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop', title: 'ELITA ONE MTB carbon bike frame', price: 426_255, originalPrice: 592_032, discount: '-28%', currency: 'USD' },
  { id: '9', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', title: 'TWS wireless earbuds noise cancelling', price: 43_500, originalPrice: 87_000, discount: '-50%', currency: 'USD' },
];

export const Default: Story = {
  args: { items: saleItems },
};

export const WithViewAll: Story = {
  args: { items: saleItems },
};

export const CustomCardWidth: Story = {
  args: { items: saleItems, cardWidth: 200 },
};

export const CustomBackground: Story = {
  args: {
    items: saleItems,
    background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
    title: 'Weekly Picks',
    subtitle: 'Curated deals just for you',
  },
};

export const FewItems: Story = {
  args: { items: saleItems.slice(0, 4) },
};

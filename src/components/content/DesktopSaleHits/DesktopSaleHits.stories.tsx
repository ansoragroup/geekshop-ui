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
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d707b39b?w=300&h=300&fit=crop',
    title: 'Подвески из пресноводного жемчуга натуральные',
    price: 10_003.83,
    originalPrice: 17_323.71,
    discount: '-42%',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop',
    title: 'Брошь CINDY XIANG жемчужная винтажная',
    price: 16_469.73,
    originalPrice: 40_259.33,
    discount: '-59%',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop',
    title: 'Акриловые бусины для браслета 30 шт набор',
    price: 6_953.89,
    originalPrice: 10_491.83,
    discount: '-34%',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop',
    title: 'Детский комплект одежды лето хлопок',
    price: 332_942.79,
    originalPrice: 665_885.59,
    discount: '-50%',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
    title: 'Винтажная заколка для волос металлическая',
    price: 18_421.70,
    originalPrice: 34_769.43,
    discount: '-47%',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
    title: 'Акриловая брошь ручной работы цветочная',
    price: 25_009.59,
    originalPrice: 56_876.90,
    discount: '-56%',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop',
    title: 'Акриловые бусины круглые разноцветные 50 шт',
    price: 8_173.86,
    originalPrice: 11_711.81,
    discount: '-30%',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop',
    title: 'ELITA ONE MTB карбоновая рама велосипеда',
    price: 426_255,
    originalPrice: 592_032.69,
    discount: '-28%',
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    title: 'Наушники беспроводные TWS с шумоподавлением',
    price: 43_500,
    originalPrice: 87_000,
    discount: '-50%',
  },
];

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    items: saleItems,
    onViewAll: undefined,
  },
};

// ─── With View All Button ───────────────────────────────────────────────────

export const WithViewAll: Story = {
  args: {
    items: saleItems,
  },
};

// ─── Few Items ──────────────────────────────────────────────────────────────

export const FewItems: Story = {
  args: {
    items: saleItems.slice(0, 4),
  },
};

// ─── Custom Title ───────────────────────────────────────────────────────────

export const CustomTitle: Story = {
  args: {
    title: 'Топ скидки недели',
    subtitle: 'Успей купить по лучшей цене',
    viewAllText: 'Все товары',
    items: saleItems,
  },
};

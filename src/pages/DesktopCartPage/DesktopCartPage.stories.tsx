import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCartPage } from './DesktopCartPage';
import type { CartItemData } from '../_shared/types';

const meta = {
  title: 'Pages (Desktop)/DesktopCartPage',
  component: DesktopCartPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialItems: [
      {
        id: 1,
        name: 'Apple MacBook Pro 14" M3 Pro 18GB RAM 512GB',
        variant: 'Space Black / 512GB',
        price: 23_000_000,
        originalPrice: 26_500_000,
        quantity: 1,
        selected: true,
        image: 'https://picsum.photos/seed/cart-macbook/160/160',
      },
      {
        id: 2,
        name: 'Sony WH-1000XM5 Wireless Headphones',
        variant: 'Silver',
        price: 3_900_000,
        quantity: 1,
        selected: true,
        image: 'https://picsum.photos/seed/cart-sony/160/160',
      },
      {
        id: 3,
        name: 'Logitech MX Master 3S Wireless Mouse',
        variant: 'Graphite',
        price: 950_000,
        quantity: 1,
        selected: true,
        image: 'https://picsum.photos/seed/cart-mouse/160/160',
      },
    ],
  },
};

export const EmptyCart: Story = {
  name: 'Empty Cart',
  args: {
    initialItems: [],
  },
};

export const WithCouponApplied: Story = {
  name: 'With Coupon Applied',
  args: {
    initialItems: [
      {
        id: 1,
        name: 'Apple MacBook Pro 14" M3 Pro 18GB RAM 512GB',
        variant: 'Space Black / 512GB',
        price: 23_000_000,
        originalPrice: 26_500_000,
        quantity: 1,
        selected: true,
        image: 'https://picsum.photos/seed/cart-macbook/160/160',
      },
      {
        id: 2,
        name: 'Sony WH-1000XM5 Wireless Headphones',
        variant: 'Silver',
        price: 3_900_000,
        quantity: 1,
        selected: true,
        image: 'https://picsum.photos/seed/cart-sony/160/160',
      },
      {
        id: 3,
        name: 'Logitech MX Master 3S Wireless Mouse',
        variant: 'Graphite',
        price: 950_000,
        quantity: 1,
        selected: true,
        image: 'https://picsum.photos/seed/cart-mouse/160/160',
      },
    ],
    appliedCoupon: { code: 'GEEK20', discountPercent: 20 },
  },
};

const outOfStockItems: CartItemData[] = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra 256GB',
    variant: 'Titanium Black / 256GB',
    price: 12_500_000,
    quantity: 1,
    selected: true,
    image: 'https://picsum.photos/seed/cart-samsung/160/160',
  },
  {
    id: 2,
    name: 'ASUS ROG Strix RTX 4090 OC 24GB',
    variant: '24GB / Black',
    price: 22_000_000,
    quantity: 1,
    selected: false,
    image: 'https://picsum.photos/seed/cart-gpu/160/160',
  },
  {
    id: 3,
    name: 'Razer DeathAdder V3 HyperSpeed',
    variant: 'Black',
    price: 1_200_000,
    quantity: 2,
    selected: true,
    image: 'https://picsum.photos/seed/cart-razer/160/160',
  },
];

export const WithOutOfStockItem: Story = {
  name: 'With Out-of-Stock Item',
  args: {
    initialItems: outOfStockItems,
  },
};

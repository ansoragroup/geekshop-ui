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
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop',
      },
      {
        id: 2,
        name: 'Sony WH-1000XM5 Wireless Headphones',
        variant: 'Silver',
        price: 3_900_000,
        quantity: 1,
        selected: true,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
      },
      {
        id: 3,
        name: 'Logitech MX Master 3S Wireless Mouse',
        variant: 'Graphite',
        price: 950_000,
        quantity: 1,
        selected: true,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
      },
    ] satisfies CartItemData[],
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
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop',
      },
      {
        id: 2,
        name: 'Sony WH-1000XM5 Wireless Headphones',
        variant: 'Silver',
        price: 3_900_000,
        quantity: 1,
        selected: true,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
      },
    ] satisfies CartItemData[],
    appliedCoupon: { code: 'GEEK20', discountPercent: 20 },
  },
};

export const PartiallySelected: Story = {
  name: 'Partially Selected Items',
  args: {
    initialItems: [
      {
        id: 1,
        name: 'Samsung Galaxy S24 Ultra 256GB',
        variant: 'Titanium Black / 256GB',
        price: 12_500_000,
        quantity: 1,
        selected: true,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&h=160&fit=crop',
      },
      {
        id: 2,
        name: 'ASUS ROG Strix RTX 4090 OC 24GB',
        variant: '24GB / Black',
        price: 22_000_000,
        quantity: 1,
        selected: false,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
      },
      {
        id: 3,
        name: 'Razer DeathAdder V3 HyperSpeed',
        variant: 'Black',
        price: 1_200_000,
        quantity: 2,
        selected: true,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
      },
    ] satisfies CartItemData[],
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    initialItems: [
      {
        id: 1,
        name: 'Keychron Q1 Pro 75% Wireless Mechanical Keyboard',
        variant: 'Carbon Black / Gateron Pro Brown',
        price: 1_850_000,
        originalPrice: 2_200_000,
        quantity: 1,
        selected: true,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
      },
    ] satisfies CartItemData[],
  },
};

export const ManyItems: Story = {
  name: 'Many Items (7)',
  args: {
    initialItems: [
      { id: 1, name: 'Apple MacBook Air M3 15" 16GB 512GB', variant: 'Midnight', price: 18_900_000, originalPrice: 21_500_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop' },
      { id: 2, name: 'Samsung 990 Pro 2TB NVMe SSD', variant: '2TB', price: 2_400_000, quantity: 2, selected: true, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop' },
      { id: 3, name: 'Logitech MX Master 3S', variant: 'Pale Gray', price: 950_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop' },
      { id: 4, name: 'Sony WH-1000XM5 Headphones', variant: 'Black', price: 3_900_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop' },
      { id: 5, name: 'Apple AirPods Pro 2nd Gen USB-C', variant: 'White', price: 2_800_000, quantity: 1, selected: false, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=160&h=160&fit=crop' },
      { id: 6, name: 'Keychron Q1 Pro 75% Keyboard', variant: 'Navy Blue / Gateron Pro Red', price: 1_850_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop' },
      { id: 7, name: 'CalDigit TS4 Thunderbolt 4 Dock', variant: 'Silver', price: 4_500_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop' },
    ] satisfies CartItemData[],
    appliedCoupon: { code: 'GEEK10', discountPercent: 10 },
  },
};

export const HighValueCart: Story = {
  name: 'High Value Cart (Free Shipping)',
  args: {
    initialItems: [
      { id: 1, name: 'Apple MacBook Pro 16" M3 Max 36GB 1TB', variant: 'Space Black', price: 42_000_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop' },
      { id: 2, name: 'Apple Pro Display XDR 32" 6K', variant: 'Nano-texture Glass', price: 58_000_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=160&h=160&fit=crop' },
      { id: 3, name: 'Apple Magic Keyboard with Touch ID', variant: 'Black / Silver', price: 2_500_000, quantity: 1, selected: true, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop' },
    ] satisfies CartItemData[],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopQuickBuyPopup } from './DesktopQuickBuyPopup';

const meta = {
  title: 'Commerce (Desktop)/DesktopQuickBuyPopup',
  component: DesktopQuickBuyPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopQuickBuyPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: open popup with product, 4 color variants, and stock. */
export const Default: Story = {
  args: {
    open: true,
    product: {
      title: 'Samsung Galaxy S24 Ultra 5G Smartphone 256GB',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
      price: 14_500_000,
      stock: 24,
    },
    variants: [
      { id: 'black', name: 'Titanium Black' },
      { id: 'white', name: 'Titanium White' },
      { id: 'violet', name: 'Titanium Violet' },
      { id: 'yellow', name: 'Titanium Yellow' },
    ],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** No variants: single-option product, just quantity selection. */
export const NoVariants: Story = {
  args: {
    open: true,
    product: {
      title: 'Apple AirPods Pro 2nd Generation with MagSafe Charging Case (USB-C)',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      price: 3_200_000,
      stock: 12,
    },
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** Low stock warning: only 2 items left. */
export const LowStock: Story = {
  args: {
    open: true,
    product: {
      title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X Graphics Card',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
      price: 28_900_000,
      stock: 2,
    },
    variants: [{ id: 'default', name: 'Founders Edition' }],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** Many variants to test overflow. */
export const ManyVariants: Story = {
  args: {
    open: true,
    product: {
      title: 'Nike Air Max 270 React Running Shoes',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
      price: 1_450_000,
      stock: 45,
    },
    variants: [
      { id: 'black', name: 'Black — White' },
      { id: 'red', name: 'University Red' },
      { id: 'blue', name: 'Royal Blue' },
      { id: 'green', name: 'Pine Green' },
      { id: 'grey', name: 'Wolf Grey' },
      { id: 'pink', name: 'Barely Rose' },
      { id: 'navy', name: 'Midnight Navy' },
      { id: 'orange', name: 'Total Orange' },
    ],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** Single variant option. */
export const SingleVariant: Story = {
  args: {
    open: true,
    product: {
      title: 'Corsair K100 RGB Mechanical Gaming Keyboard',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      price: 3_290_000,
      stock: 8,
    },
    variants: [{ id: 'cherry', name: 'Cherry MX Speed' }],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** Very long product title. */
export const LongTitle: Story = {
  args: {
    open: true,
    product: {
      title:
        'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X PCI Express 4.0 Graphics Card with Aura Sync RGB LED Lighting and Triple Axial-tech Fan Design',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
      price: 28_990_000,
      stock: 3,
    },
    variants: [
      { id: 'oc', name: 'OC Edition' },
      { id: 'standard', name: 'Standard Edition' },
    ],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** High stock count. */
export const HighStock: Story = {
  args: {
    open: true,
    product: {
      title: 'Anker USB-C to Lightning Cable 1m',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop',
      price: 85_000,
      stock: 500,
    },
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** Closed state: popup is hidden. */
export const Closed: Story = {
  args: {
    open: false,
    product: {
      title: 'Test Product',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop',
      price: 1_000_000,
      stock: 10,
    },
    onClose: fn(),
    onAddToCart: fn(),
  },
};

/** Expensive product with variants. */
export const ExpensiveProduct: Story = {
  args: {
    open: true,
    product: {
      title: 'Apple MacBook Pro 16" M3 Max 48GB 1TB',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      price: 42_500_000,
      stock: 5,
    },
    variants: [
      { id: 'space-black', name: 'Space Black' },
      { id: 'silver', name: 'Silver' },
    ],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopMiniCart, type DesktopMiniCartItem } from './DesktopMiniCart';

const meta = {
  title: 'Commerce (Desktop)/DesktopMiniCart',
  component: DesktopMiniCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, display: 'flex', justifyContent: 'flex-end' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopMiniCart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: DesktopMiniCartItem[] = [
  {
    id: '1',
    title: 'MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    price: 5_900_000,
    quantity: 1,
    variant: 'Black Edition',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra 256GB',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop',
    price: 14_500_000,
    quantity: 1,
    variant: 'Titanium Black',
  },
  {
    id: '3',
    title: 'Apple AirPods Pro 2nd Gen USB-C',
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=200&h=200&fit=crop',
    price: 3_200_000,
    quantity: 2,
  },
];

/** Default: open with 3 items, all actions available. */
export const Default: Story = {
  args: {
    items: sampleItems,
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Empty cart: shows empty state illustration. */
export const Empty: Story = {
  args: {
    items: [],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
  },
};

/** Single item in the cart. */
export const SingleItem: Story = {
  args: {
    items: [{
      id: '1',
      title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop',
      price: 4_200_000,
      quantity: 1,
      variant: 'Midnight Blue',
    }],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Closed state: only shows the cart icon trigger with badge. */
export const Closed: Story = {
  args: {
    items: sampleItems,
    open: false,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Many items in the cart (scrollable list). */
export const ManyItems: Story = {
  args: {
    items: [
      { id: '1', title: 'NVIDIA GeForce RTX 4090 24GB', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop', price: 28_900_000, quantity: 1 },
      { id: '2', title: 'Apple MacBook Pro 16" M3 Max', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop', price: 42_500_000, quantity: 1, variant: 'Space Black' },
      { id: '3', title: 'Samsung Galaxy S24 Ultra', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop', price: 14_500_000, quantity: 2, variant: 'Titanium' },
      { id: '4', title: 'Sony WH-1000XM5 Headphones', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop', price: 4_200_000, quantity: 1 },
      { id: '5', title: 'Logitech MX Master 3S Mouse', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop', price: 1_290_000, quantity: 1, variant: 'Graphite' },
      { id: '6', title: 'Corsair K100 RGB Keyboard', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=200&fit=crop', price: 3_290_000, quantity: 1, variant: 'Cherry MX Speed' },
    ],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Items without variants. */
export const NoVariants: Story = {
  args: {
    items: [
      { id: '1', title: 'Anker USB-C Hub 7-in-1', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&h=200&fit=crop', price: 590_000, quantity: 2 },
      { id: '2', title: 'Baseus 65W GaN Charger', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop', price: 350_000, quantity: 3 },
    ],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Without remove button (onRemoveItem not provided). */
export const NoRemoveButton: Story = {
  args: {
    items: sampleItems,
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
  },
};

/** High quantity items. */
export const HighQuantity: Story = {
  args: {
    items: [
      { id: '1', title: 'Cat6 Ethernet Cable 3m', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&h=200&fit=crop', price: 25_000, quantity: 50 },
      { id: '2', title: 'USB-C to Lightning Cable', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop', price: 85_000, quantity: 20 },
    ],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Custom trigger element instead of default cart icon. */
export const CustomTrigger: Story = {
  args: {
    items: sampleItems,
    trigger: (
      <button type="button" style={{ background: '#FF5000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 600 }}>
        My Bag (3)
      </button>
    ),
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

/** Interactive: add/remove items, toggle cart open/closed. */
export const Interactive: Story = {
  render: () => {
    const [items, setItems] = useState<DesktopMiniCartItem[]>(sampleItems);
    const [open, setOpen] = useState(false);

    return (
      <DesktopMiniCart
        items={items}
        open={open}
        onClose={() => setOpen(false)}
        onViewCart={() => alert('Navigate to cart page')}
        onCheckout={() => alert('Navigate to checkout')}
        onRemoveItem={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
      />
    );
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartItem } from './CartItem';

const meta = {
  title: 'Commerce/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop&auto=format',
    title: 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse',
    variant: 'Qora',
    price: 1_200_000,
    quantity: 1,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=200&h=200&fit=crop&auto=format',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X',
    variant: 'Founders Edition',
    price: 24_500_000,
    quantity: 1,
    selected: true,
  },
};

export const MultipleQuantity: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop&auto=format',
    title: 'HyperX Alloy Origins 65 Mechanical Keyboard Red Switch',
    variant: 'Red Switch',
    price: 890_000,
    quantity: 3,
    selected: true,
  },
};

export const NoVariant: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format',
    title: 'Corsair Vengeance DDR5 32GB (2x16) 6000MHz CL36',
    price: 2_400_000,
    quantity: 2,
    selected: false,
  },
};

export const CartList = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      image:
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop&auto=format',
      title: 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse',
      variant: 'Qora',
      price: 1_200_000,
      quantity: 1,
      selected: true,
    },
    {
      id: '2',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop&auto=format',
      title: 'MSI GeForce RTX 4070 SUPER Ventus 3X 12GB OC',
      variant: 'Ventus 3X OC',
      price: 8_200_000,
      quantity: 1,
      selected: false,
    },
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=200&h=200&fit=crop&auto=format',
      title: 'Keychron Q1 HE Wireless Mechanical Keyboard',
      variant: 'Gateron Magnetic Jade',
      price: 2_100_000,
      quantity: 2,
      selected: true,
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#f5f5f5' }}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          image={item.image}
          title={item.title}
          variant={item.variant}
          price={item.price}
          quantity={item.quantity}
          selected={item.selected}
          onSelect={(sel) =>
            setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, selected: sel } : i)))
          }
          onQuantityChange={(qty) =>
            setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: qty } : i)))
          }
          onDelete={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
        />
      ))}
      <div
        style={{
          padding: 16,
          textAlign: 'center',
          fontSize: 12,
          color: '#999',
        }}
      >
        Chapga suring — o'chirish tugmasi chiqadi
      </div>
    </div>
  );
};

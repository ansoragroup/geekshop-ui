import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopCartItem } from './DesktopCartItem';

const meta = {
  title: 'Commerce (Desktop)/DesktopCartItem',
  component: DesktopCartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onQuantityChange: { action: 'onQuantityChange' },
    onDelete: { action: 'onDelete' },
    onClick: { action: 'onClick' },
  },
  decorators: [(Story) => (
    <div style={{ width: 900, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopCartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default cart item: in stock, not selected, no variant, no free shipping. */
export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    title: 'MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC',
    price: 17_800_000,
    quantity: 2,
    selected: false,
    inStock: true,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** Selected state: checkbox is checked (blue). */
export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

/** Out of stock: dimmed appearance, stepper disabled. */
export const OutOfStock: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X',
    price: 28_900_000,
    quantity: 1,
    selected: false,
    inStock: false,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** With free shipping badge visible. */
export const WithFreeShipping: Story = {
  args: {
    ...Default.args,
    freeShipping: true,
  },
};

/** With variant text (color/size selection shown). */
export const WithVariant: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop',
    title: 'Samsung Galaxy S24 Ultra 5G',
    variant: 'Titanium Black / 256GB',
    price: 14_500_000,
    quantity: 1,
    selected: false,
    inStock: true,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** All props filled: selected, variant, free shipping. */
export const FullFeatured: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
    title: 'Apple MacBook Pro 16" M3 Max 48GB 1TB Space Black',
    variant: 'Space Black / M3 Max / 48GB / 1TB',
    price: 42_500_000,
    quantity: 1,
    selected: true,
    inStock: true,
    freeShipping: true,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** Very long product title to test text wrapping. */
export const LongTitle: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    title: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X PCI Express 4.0 Graphics Card with Aura Sync RGB LED Lighting and Axial-tech Fan Design',
    variant: 'ROG Strix OC / 24GB GDDR6X / PCIe 4.0',
    price: 28_990_000,
    quantity: 1,
    selected: false,
    inStock: true,
    freeShipping: true,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** Cheap item with high quantity. */
export const HighQuantity: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&h=200&fit=crop',
    title: 'Anker USB-C to USB-A Adapter',
    price: 45_000,
    quantity: 10,
    selected: true,
    inStock: true,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** Out of stock + selected (edge case). */
export const OutOfStockSelected: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    variant: 'Midnight Blue',
    price: 4_200_000,
    quantity: 1,
    selected: true,
    inStock: false,
    freeShipping: false,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

/** Multiple cart items stacked. */
export const MultipleItems: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop', title: 'NVIDIA RTX 4090 Founders Edition', price: 28_900_000, quantity: 1, selected: true, inStock: true, freeShipping: true },
      { id: 2, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop', title: 'Samsung Galaxy S24 Ultra', variant: 'Titanium Black / 512GB', price: 16_200_000, quantity: 1, selected: true, inStock: true, freeShipping: false },
      { id: 3, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop', title: 'Sony WH-1000XM5 Headphones', variant: 'Silver', price: 4_200_000, quantity: 2, selected: false, inStock: true, freeShipping: true },
      { id: 4, image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&h=200&fit=crop', title: 'Logitech MX Master 3S Mouse', price: 1_290_000, quantity: 1, selected: false, inStock: false, freeShipping: false },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#eee' }}>
        {items.map((item) => (
          <DesktopCartItem
            key={item.id}
            image={item.image}
            title={item.title}
            variant={item.variant}
            price={item.price}
            quantity={item.quantity}
            selected={item.selected}
            inStock={item.inStock}
            freeShipping={item.freeShipping}
            onSelect={(sel) => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, selected: sel } : i))}
            onQuantityChange={(qty) => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: qty } : i))}
            onDelete={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
            onClick={() => console.log('Navigate to:', item.title)}
          />
        ))}
      </div>
    );
  },
};

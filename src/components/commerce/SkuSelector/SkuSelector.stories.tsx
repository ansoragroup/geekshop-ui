import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SkuSelector } from './SkuSelector';
import type { SkuProduct, SkuVariant } from './SkuSelector';

const gpuProduct: SkuProduct = {
  title: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB',
  image:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
  priceRange: [8_200_000, 12_500_000],
};

const gpuVariants: SkuVariant[] = [
  {
    id: 'msi-ventus',
    name: 'MSI Ventus 3X OC',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    price: 8_200_000,
    stock: 12,
  },
  {
    id: 'asus-tuf',
    name: 'ASUS TUF Gaming OC',
    image:
      'https://images.unsplash.com/photo-1542291026616-b53d31cf4641?w=200&h=200&fit=crop&auto=format',
    price: 9_100_000,
    stock: 8,
  },
  {
    id: 'gigabyte-eagle',
    name: 'Gigabyte Eagle OC',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop&auto=format',
    price: 8_500_000,
    stock: 5,
  },
  {
    id: 'evga-ftw3',
    name: 'EVGA FTW3 Ultra',
    image:
      'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=200&h=200&fit=crop&auto=format',
    price: 10_800_000,
    stock: 3,
  },
  {
    id: 'zotac-amp',
    name: 'Zotac AMP Extreme',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format',
    price: 12_500_000,
    stock: 2,
  },
  {
    id: 'palit-gamerock',
    name: 'Palit GameRock OC',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    price: 9_400_000,
    stock: 7,
  },
];

const gpuVariantsWithHotRank: SkuVariant[] = [
  {
    id: 'msi-ventus',
    name: 'MSI Ventus 3X OC',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    price: 8_200_000,
    stock: 12,
    hotRank: 1,
  },
  {
    id: 'asus-tuf',
    name: 'ASUS TUF Gaming OC',
    image:
      'https://images.unsplash.com/photo-1542291026616-b53d31cf4641?w=200&h=200&fit=crop&auto=format',
    price: 9_100_000,
    stock: 8,
    hotRank: 2,
  },
  {
    id: 'gigabyte-eagle',
    name: 'Gigabyte Eagle OC',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop&auto=format',
    price: 8_500_000,
    stock: 5,
    hotRank: 3,
  },
  {
    id: 'evga-ftw3',
    name: 'EVGA FTW3 Ultra',
    image:
      'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=200&h=200&fit=crop&auto=format',
    price: 10_800_000,
    stock: 3,
  },
  {
    id: 'zotac-amp',
    name: 'Zotac AMP Extreme',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format',
    price: 12_500_000,
    stock: 2,
  },
  {
    id: 'palit-gamerock',
    name: 'Palit GameRock OC',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    price: 9_400_000,
    stock: 7,
  },
];

const meta = {
  title: 'Commerce/SkuSelector',
  component: SkuSelector,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'GeekShop Light' },
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: { control: 'radio', options: ['list', 'grid'] },
    variant: { control: 'radio', options: ['chips', 'imageGrid'] },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof SkuSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListView: Story = {
  args: {
    product: gpuProduct,
    variants: gpuVariants,
    viewMode: 'list',
    variant: 'chips',
    open: true,
    onClose: fn(),
    onAddToCart: fn(),
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // The "Savatga qo'shish" button should be disabled initially (no selections)
    const addToCartBtn = canvas.getByRole('button', { name: /savatga/i });
    await expect(addToCartBtn).toBeDisabled();

    // Find increment buttons for list items — each variant has a QuantityStepper
    // Click the first variant's increment button to select it
    const incrementButtons = canvas.getAllByRole('button', { name: /ko'paytirish/i });
    await userEvent.click(incrementButtons[0]);

    // onSelect should have been called with the first variant selected
    await expect(args.onSelect).toHaveBeenCalled();

    // Add to cart button should now be enabled
    await expect(addToCartBtn).not.toBeDisabled();

    // Click add to cart
    await userEvent.click(addToCartBtn);
    await expect(args.onAddToCart).toHaveBeenCalledTimes(1);
  },
};

export const GridView: Story = {
  args: {
    product: gpuProduct,
    variants: gpuVariants,
    viewMode: 'grid',
    variant: 'chips',
    open: true,
  },
};

/** 1688/Taobao-style image grid variant with product photos and labeled cards */
export const ImageGrid: Story = {
  args: {
    product: gpuProduct,
    variants: gpuVariantsWithHotRank,
    variant: 'imageGrid',
    open: true,
  },
};

export const Interactive = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#FF5000',
          color: '#fff',
          borderRadius: 24,
          border: 'none',
          fontSize: 14,
          cursor: 'pointer',
          margin: 24,
        }}
      >
        SKU Tanlash
      </button>
      <SkuSelector
        product={gpuProduct}
        variants={gpuVariants}
        open={open}
        onClose={() => setOpen(false)}
        onAddToCart={(selections) => {
          alert(`Savatga qo'shildi: ${JSON.stringify(selections, null, 2)}`);
          setOpen(false);
        }}
      />
    </div>
  );
};

/** Interactive image grid variant demo */
export const InteractiveImageGrid = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#FF5000',
          color: '#fff',
          borderRadius: 24,
          border: 'none',
          fontSize: 14,
          cursor: 'pointer',
          margin: 24,
        }}
      >
        SKU Tanlash (Image Grid)
      </button>
      <SkuSelector
        product={gpuProduct}
        variants={gpuVariantsWithHotRank}
        variant="imageGrid"
        open={open}
        onClose={() => setOpen(false)}
        onAddToCart={(selections) => {
          alert(`Savatga qo'shildi: ${JSON.stringify(selections, null, 2)}`);
          setOpen(false);
        }}
      />
    </div>
  );
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { QuickBuyPopup } from './QuickBuyPopup';
import type { QuickBuyProduct, QuickBuyVariant } from './QuickBuyPopup';

const mouseProduct: QuickBuyProduct = {
  title: 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse',
  image: 'https://picsum.photos/seed/logitech-gpro2/200/200',
  price: 1_200_000,
  stock: 45,
};

const mouseVariants: QuickBuyVariant[] = [
  { id: 'black', name: 'Qora' },
  { id: 'white', name: 'Oq' },
  { id: 'pink', name: 'Pushti' },
];

const keyboardProduct: QuickBuyProduct = {
  title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
  image: 'https://picsum.photos/seed/razer-bw4/200/200',
  price: 3_400_000,
  stock: 12,
};

const keyboardVariants: QuickBuyVariant[] = [
  { id: 'green', name: 'Green Switch' },
  { id: 'yellow', name: 'Yellow Switch' },
  { id: 'orange', name: 'Orange Switch' },
];

const meta = {
  title: 'Commerce/QuickBuyPopup',
  component: QuickBuyPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof QuickBuyPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mouse: Story = {
  args: {
    product: mouseProduct,
    variants: mouseVariants,
    open: true,
    onClose: fn(),
    onAddToCart: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // The dialog should be open
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    // First variant (Qora) should be selected by default
    const qoraRadio = canvas.getByRole('radio', { name: /qora/i });
    await expect(qoraRadio).toHaveAttribute('aria-checked', 'true');

    // Select a different variant (Oq)
    const oqRadio = canvas.getByRole('radio', { name: /oq/i });
    await userEvent.click(oqRadio);
    await expect(oqRadio).toHaveAttribute('aria-checked', 'true');
    await expect(qoraRadio).toHaveAttribute('aria-checked', 'false');

    // Click "Savatga qo'shish"
    const addToCartBtn = canvas.getByRole('button', { name: /savatga/i });
    await userEvent.click(addToCartBtn);
    await expect(args.onAddToCart).toHaveBeenCalledWith('white', 1);
  },
};

export const Keyboard: Story = {
  args: {
    product: keyboardProduct,
    variants: keyboardVariants,
    open: true,
  },
};

export const NoVariants: Story = {
  args: {
    product: {
      title: 'SteelSeries QcK Heavy XXL Gaming Mouse Pad 900x400x6mm',
      image: 'https://picsum.photos/seed/steelseries-pad/200/200',
      price: 350_000,
      stock: 100,
    },
    variants: [],
    open: true,
  },
};

export const LowStock: Story = {
  args: {
    product: {
      title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X',
      image: 'https://picsum.photos/seed/rtx4090-fe/200/200',
      price: 24_500_000,
      stock: 2,
    },
    variants: [
      { id: 'fe', name: 'Founders Edition' },
    ],
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
          background: '#FF0000',
          color: '#fff',
          borderRadius: 24,
          border: 'none',
          fontSize: 14,
          cursor: 'pointer',
          margin: 24,
        }}
      >
        Tez sotib olish
      </button>
      <QuickBuyPopup
        product={mouseProduct}
        variants={mouseVariants}
        open={open}
        onClose={() => setOpen(false)}
        onAddToCart={(variantId, qty) => {
          alert(`Savatga qo'shildi!\nVariant: ${variantId}\nMiqdor: ${qty}`);
          setOpen(false);
        }}
      />
    </div>
  );
};

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

export const Default: Story = {
  args: {
    open: true,
    product: {
      title: 'Samsung Galaxy S24 Ultra 5G Smartphone 256GB',
      image: 'https://picsum.photos/seed/phone2/400/400',
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

export const NoVariants: Story = {
  args: {
    open: true,
    product: {
      title: 'Apple AirPods Pro 2nd Generation with MagSafe Charging Case (USB-C)',
      image: 'https://picsum.photos/seed/airpods2/400/400',
      price: 3_200_000,
      stock: 12,
    },
    onClose: fn(),
    onAddToCart: fn(),
  },
};

export const LowStock: Story = {
  args: {
    open: true,
    product: {
      title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X Graphics Card',
      image: 'https://picsum.photos/seed/gpu2/400/400',
      price: 28_900_000,
      stock: 2,
    },
    variants: [
      { id: 'default', name: 'Founders Edition' },
    ],
    onClose: fn(),
    onAddToCart: fn(),
  },
};

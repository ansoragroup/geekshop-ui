import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkuSelector } from './SkuSelector';
import type { SkuProduct, SkuVariant } from './SkuSelector';

const gpuProduct: SkuProduct = {
  title: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB',
  image: 'https://picsum.photos/seed/rtx4070ti/200/200',
  priceRange: [8_200_000, 12_500_000],
};

const gpuVariants: SkuVariant[] = [
  {
    id: 'msi-ventus',
    name: 'MSI Ventus 3X OC',
    image: 'https://picsum.photos/seed/msi-ventus/200/200',
    price: 8_200_000,
    stock: 12,
  },
  {
    id: 'asus-tuf',
    name: 'ASUS TUF Gaming OC',
    image: 'https://picsum.photos/seed/asus-tuf/200/200',
    price: 9_100_000,
    stock: 8,
  },
  {
    id: 'gigabyte-eagle',
    name: 'Gigabyte Eagle OC',
    image: 'https://picsum.photos/seed/gigabyte-eagle/200/200',
    price: 8_500_000,
    stock: 5,
  },
  {
    id: 'evga-ftw3',
    name: 'EVGA FTW3 Ultra',
    image: 'https://picsum.photos/seed/evga-ftw3/200/200',
    price: 10_800_000,
    stock: 3,
  },
  {
    id: 'zotac-amp',
    name: 'Zotac AMP Extreme',
    image: 'https://picsum.photos/seed/zotac-amp/200/200',
    price: 12_500_000,
    stock: 2,
  },
  {
    id: 'palit-gamerock',
    name: 'Palit GameRock OC',
    image: 'https://picsum.photos/seed/palit-gamerock/200/200',
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
    open: true,
  },
};

export const GridView: Story = {
  args: {
    product: gpuProduct,
    variants: gpuVariants,
    viewMode: 'grid',
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

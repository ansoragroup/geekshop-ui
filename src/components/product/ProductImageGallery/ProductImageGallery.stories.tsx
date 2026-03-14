import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductImageGallery } from './ProductImageGallery';

const gpuImages = [
  'https://picsum.photos/seed/gallery1/800/800',
  'https://picsum.photos/seed/gallery2/800/800',
  'https://picsum.photos/seed/gallery3/800/800',
  'https://picsum.photos/seed/gallery4/800/800',
];

const monitorImages = [
  'https://picsum.photos/seed/mongal1/800/800',
  'https://picsum.photos/seed/mongal2/800/800',
  'https://picsum.photos/seed/mongal3/800/800',
];

const meta: Meta<typeof ProductImageGallery> = {
  title: 'Product/ProductImageGallery',
  component: ProductImageGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onBack: { action: 'back' },
    onShare: { action: 'share' },
    onFavorite: { action: 'favorite' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, margin: '0 auto', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductImageGallery>;

// --- Default with 4 images ---
export const Default: Story = {
  args: {
    images: gpuImages,
  },
};

// --- Single image ---
export const SingleImage: Story = {
  args: {
    images: ['https://picsum.photos/seed/single1/800/800'],
  },
};

// --- Three images ---
export const ThreeImages: Story = {
  args: {
    images: monitorImages,
  },
};

// --- Favorited state ---
export const Favorited: Story = {
  args: {
    images: gpuImages,
    isFavorited: true,
  },
};

// --- Interactive (controlled) ---
export const Interactive: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const [fav, setFav] = useState(false);

    return (
      <div>
        <ProductImageGallery
          images={gpuImages}
          currentIndex={index}
          onIndexChange={setIndex}
          isFavorited={fav}
          onFavorite={() => setFav((v) => !v)}
          onBack={() => alert('Orqaga bosildi')}
          onShare={() => alert('Ulashish bosildi')}
        />
        <div
          style={{
            padding: 16,
            background: '#fff',
            fontSize: 14,
            color: '#666',
            textAlign: 'center',
          }}
        >
          Current index: {index} | Favorited: {fav ? 'Yes' : 'No'}
        </div>
      </div>
    );
  },
};

// --- Many images ---
export const ManyImages: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/many1/800/800',
      'https://picsum.photos/seed/many2/800/800',
      'https://picsum.photos/seed/many3/800/800',
      'https://picsum.photos/seed/many4/800/800',
      'https://picsum.photos/seed/many5/800/800',
      'https://picsum.photos/seed/many6/800/800',
    ],
  },
};

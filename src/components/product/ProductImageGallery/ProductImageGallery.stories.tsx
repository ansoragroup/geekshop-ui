import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductImageGallery } from './ProductImageGallery';

const gpuImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=800&fit=crop&auto=format',
];

const monitorImages = [
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=800&h=800&fit=crop&auto=format',
];

const meta = {
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
} satisfies Meta<typeof ProductImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default with 4 images ---
export const Default: Story = {
  args: {
    images: gpuImages,
  },
};

// --- Single image ---
export const SingleImage: Story = {
  args: {
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop&auto=format',
    ],
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
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&auto=format',
    ],
  },
};

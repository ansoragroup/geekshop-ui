import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductImageGallery } from './ProductImageGallery';

const gpuImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&h=800&fit=crop&auto=format',
];

const monitorImages = [
  'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a0a?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&h=800&fit=crop&auto=format',
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
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop&auto=format',
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
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a0a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&auto=format',
    ],
  },
};

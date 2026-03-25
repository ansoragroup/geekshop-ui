import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopImageZoom } from './DesktopImageZoom';

const meta = {
  title: 'Product (Desktop)/DesktopImageZoom',
  component: DesktopImageZoom,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSelect: { action: 'thumbnail selected' },
    zoomLevel: { control: { type: 'range', min: 1.5, max: 5, step: 0.5 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopImageZoom>;

export default meta;
type Story = StoryObj<typeof meta>;

const headphoneImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&h=600&fit=crop',
];

const sneakerImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
];

const watchImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop',
];

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    images: headphoneImages,
    altPrefix: 'Sony WH-1000XM5',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    images: headphoneImages,
    altPrefix: 'Sony WH-1000XM5 Headphones',
    zoomLevel: 3,
    selectedIndex: 0,
    labels: {
      mainImage: '{alt} {index} of {total}. Click for fullscreen view.',
      thumbnails: 'Product photo thumbnails',
      lightbox: 'Product image fullscreen',
      closeFullscreen: 'Close fullscreen view',
    },
  },
};

// ─── Three Images ────────────────────────────────────────────────────────────

export const ThreeImages: Story = {
  name: 'Sneakers (3 images)',
  args: {
    images: sneakerImages,
    altPrefix: 'Nike Air Max 90',
    zoomLevel: 2.5,
  },
};

// ─── Two Images ──────────────────────────────────────────────────────────────

export const TwoImages: Story = {
  name: 'Watch (2 images)',
  args: {
    images: watchImages,
    altPrefix: 'Classic Wristwatch',
    zoomLevel: 3,
  },
};

// ─── Single Image (no thumbnails) ────────────────────────────────────────────

export const SingleImage: Story = {
  args: {
    images: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop'],
    altPrefix: 'JBL Flip 6',
  },
};

// ─── High Zoom (4x) ─────────────────────────────────────────────────────────

export const HighZoom: Story = {
  name: 'High Zoom (4x)',
  args: {
    images: headphoneImages,
    altPrefix: 'Product detail',
    zoomLevel: 4,
  },
};

// ─── Low Zoom (1.5x) ────────────────────────────────────────────────────────

export const LowZoom: Story = {
  name: 'Low Zoom (1.5x)',
  args: {
    images: sneakerImages,
    altPrefix: 'Shoe detail',
    zoomLevel: 1.5,
  },
};

// ─── Controlled (interactive) ────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (controlled)',
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <div>
        <DesktopImageZoom
          images={headphoneImages}
          altPrefix="Sony WH-1000XM5"
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          zoomLevel={2.5}
        />
        <div style={{ marginTop: 12, fontSize: 13, color: '#666', textAlign: 'center' }}>
          Viewing image {selectedIndex + 1} of {headphoneImages.length}
        </div>
      </div>
    );
  },
};

// ─── Custom Labels (i18n) ────────────────────────────────────────────────────

export const CustomLabels: Story = {
  name: 'Custom i18n Labels',
  args: {
    images: sneakerImages,
    altPrefix: 'Nike Air Max',
    labels: {
      mainImage: '{alt} - rasm {index}/{total}. Kattalashtirish uchun bosing.',
      thumbnails: 'Mahsulot rasmlari',
      lightbox: 'Mahsulot rasmi katta formatda',
      closeFullscreen: 'Yopish',
    },
  },
};

// ─── Pre-selected Index ──────────────────────────────────────────────────────

export const PreSelected: Story = {
  name: 'Pre-selected Third Image',
  args: {
    images: headphoneImages,
    altPrefix: 'Headphones',
    selectedIndex: 2,
  },
};

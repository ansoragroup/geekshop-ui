import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProductImageGallery } from './DesktopProductImageGallery';

const meta = {
  title: 'Product (Desktop)/DesktopProductImageGallery',
  component: DesktopProductImageGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onIndexChange: { action: 'index changed' },
    zoomScale: { control: { type: 'range', min: 1.5, max: 5, step: 0.5 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopProductImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const headphoneImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
];

const sneakerImages = [
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
];

// ─── Default (5 images) ──────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    images: headphoneImages,
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    images: headphoneImages,
    currentIndex: 0,
    zoomScale: 3,
  },
};

// ─── Single Image ────────────────────────────────────────────────────────────

export const SingleImage: Story = {
  args: {
    images: ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=600&fit=crop'],
  },
};

// ─── Two Images ──────────────────────────────────────────────────────────────

export const TwoImages: Story = {
  args: {
    images: sneakerImages.slice(0, 2),
  },
};

// ─── Four Images ─────────────────────────────────────────────────────────────

export const FourImages: Story = {
  name: 'Sneakers (4 images)',
  args: {
    images: sneakerImages,
  },
};

// ─── Many Images (10) ────────────────────────────────────────────────────────

export const ManyImages: Story = {
  name: 'Edge: Many Images (10)',
  args: {
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop',
    ],
  },
};

// ─── High Zoom (4x) ─────────────────────────────────────────────────────────

export const HighZoom: Story = {
  name: 'High Zoom (4x)',
  args: {
    images: headphoneImages,
    zoomScale: 4,
  },
};

// ─── Low Zoom (1.5x) ────────────────────────────────────────────────────────

export const LowZoom: Story = {
  name: 'Low Zoom (1.5x)',
  args: {
    images: sneakerImages,
    zoomScale: 1.5,
  },
};

// ─── Pre-selected Index ──────────────────────────────────────────────────────

export const PreSelected: Story = {
  name: 'Pre-selected (3rd image)',
  args: {
    images: headphoneImages,
    currentIndex: 2,
  },
};

// ─── Interactive (controlled) ────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (controlled)',
  render: () => {
    const [index, setIndex] = useState(0);
    return (
      <div>
        <DesktopProductImageGallery
          images={headphoneImages}
          currentIndex={index}
          onIndexChange={setIndex}
          zoomScale={2.5}
        />
        <div style={{ marginTop: 12, fontSize: 13, color: '#666', textAlign: 'center' }}>
          Viewing image {index + 1} of {headphoneImages.length}
        </div>
      </div>
    );
  },
};

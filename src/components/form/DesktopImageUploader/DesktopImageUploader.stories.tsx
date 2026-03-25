import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DesktopImageUploader } from './DesktopImageUploader';
import type { DesktopImageFile } from './DesktopImageUploader';

const sampleImages: DesktopImageFile[] = [
  { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', name: 'headphones-front.jpg' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', name: 'watch-angle.jpg' },
  { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop', name: 'camera-detail.jpg' },
];

const manyImages: DesktopImageFile[] = [
  { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', name: 'product-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', name: 'product-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop', name: 'product-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop', name: 'product-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop', name: 'product-5.jpg' },
];

const meta = {
  title: 'Forms (Desktop)/DesktopImageUploader',
  component: DesktopImageUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    maxCount: { control: { type: 'number', min: 1, max: 20 } },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    maxCount: 5,
    onChange: fn(),
  },
};

/* ─── With Images ─── */

export const WithImages: Story = {
  name: 'With Pre-loaded Images',
  render: () => {
    const [images, setImages] = useState<DesktopImageFile[]>(sampleImages);

    return (
      <DesktopImageUploader
        value={images}
        onChange={setImages}
        maxCount={6}
      />
    );
  },
};

/* ─── Max Reached ─── */

export const MaxReached: Story = {
  name: 'Max Images Reached',
  render: () => (
    <DesktopImageUploader
      value={manyImages}
      maxCount={5}
    />
  ),
};

export const MaxReachedThree: Story = {
  name: 'Max 3 Images Reached',
  render: () => (
    <DesktopImageUploader
      value={sampleImages}
      maxCount={3}
    />
  ),
};

/* ─── Different Max Counts ─── */

export const MaxCount1: Story = {
  name: 'Max 1 Image (Avatar)',
  args: {
    maxCount: 1,
    multiple: false,
    onChange: fn(),
  },
};

export const MaxCount3: Story = {
  name: 'Max 3 Images',
  args: {
    maxCount: 3,
    onChange: fn(),
  },
};

export const MaxCount10: Story = {
  name: 'Max 10 Images (Gallery)',
  args: {
    maxCount: 10,
    onChange: fn(),
  },
};

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    disabled: true,
    value: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', name: 'locked-image.jpg' },
    ],
  },
};

export const DisabledEmpty: Story = {
  name: 'Disabled (Empty)',
  args: {
    disabled: true,
    maxCount: 5,
  },
};

/* ─── Single Upload ─── */

export const SingleUpload: Story = {
  name: 'Single File Upload',
  args: {
    maxCount: 1,
    multiple: false,
    onChange: fn(),
  },
};

/* ─── Custom Accept ─── */

export const PNGOnly: Story = {
  name: 'PNG Files Only',
  args: {
    maxCount: 5,
    accept: 'image/png',
    onChange: fn(),
  },
};

export const JpegAndPng: Story = {
  name: 'JPEG + PNG Only',
  args: {
    maxCount: 5,
    accept: 'image/jpeg,image/png',
    onChange: fn(),
  },
};

/* ─── Custom Max Size ─── */

export const SmallMaxSize: Story = {
  name: 'Max 1MB Per File',
  args: {
    maxCount: 5,
    maxSize: 1 * 1024 * 1024,
    onChange: fn(),
  },
};

export const LargeMaxSize: Story = {
  name: 'Max 10MB Per File',
  args: {
    maxCount: 3,
    maxSize: 10 * 1024 * 1024,
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  render: () => {
    const [images, setImages] = useState<DesktopImageFile[]>([sampleImages[0]]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Product Images</div>
        <div style={{ fontSize: 13, color: '#666' }}>
          Upload up to 8 product images. JPEG or PNG, max 5MB each.
        </div>
        <DesktopImageUploader
          value={images}
          onChange={setImages}
          maxCount={8}
          maxSize={5 * 1024 * 1024}
          accept="image/jpeg,image/png"
          multiple
        />
        <div style={{ fontSize: 12, color: '#999' }}>
          {images.length}/8 images uploaded
        </div>
      </div>
    );
  },
};

/* ─── Interactive: Add and Remove ─── */

export const InteractiveDemo: Story = {
  name: 'Interactive (Add — Remove)',
  render: () => {
    const [images, setImages] = useState<DesktopImageFile[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopImageUploader
          value={images}
          onChange={setImages}
          maxCount={5}
        />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => {
              const newImage: DesktopImageFile = {
                url: `https://images.unsplash.com/photo-${1505740420928 + images.length}-5e560c06d30e?w=200&h=200&fit=crop`,
                name: `demo-${images.length + 1}.jpg`,
              };
              setImages((prev) => [...prev, newImage]);
            }}
            disabled={images.length >= 5}
            style={{
              fontSize: 13, padding: '6px 12px', borderRadius: 6,
              border: '1px solid #eee', background: '#fff', cursor: images.length >= 5 ? 'not-allowed' : 'pointer',
              color: images.length >= 5 ? '#ccc' : '#1A1A1A',
            }}
          >
            Add demo image
          </button>
          <button
            type="button"
            onClick={() => setImages([])}
            disabled={images.length === 0}
            style={{
              fontSize: 13, padding: '6px 12px', borderRadius: 6,
              border: '1px solid #eee', background: '#fff', cursor: images.length === 0 ? 'not-allowed' : 'pointer',
              color: images.length === 0 ? '#ccc' : '#FF3B30',
            }}
          >
            Clear all
          </button>
          <span style={{ fontSize: 12, color: '#999' }}>
            {images.length}/5
          </span>
        </div>
      </div>
    );
  },
};

/* ─── Realistic: Product Upload Form ─── */

export const ProductUploadForm: Story = {
  name: 'Product Image Upload',
  render: () => {
    const [mainImages, setMainImages] = useState<DesktopImageFile[]>(sampleImages.slice(0, 2));
    const [detailImages, setDetailImages] = useState<DesktopImageFile[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            Main Product Images *
          </div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
            The first image will be used as the product thumbnail. Recommended: 800x800px.
          </div>
          <DesktopImageUploader
            value={mainImages}
            onChange={setMainImages}
            maxCount={5}
          />
        </div>
        <div style={{ borderTop: '1px solid #eee', paddingTop: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            Detail / Lifestyle Images
          </div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
            Show the product in use or highlight specific features.
          </div>
          <DesktopImageUploader
            value={detailImages}
            onChange={setDetailImages}
            maxCount={10}
          />
        </div>
      </div>
    );
  },
};

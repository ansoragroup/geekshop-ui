import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { ImageUploader } from './ImageUploader';

const sampleImages = [
  'https://picsum.photos/id/1/200/200',
  'https://picsum.photos/id/2/200/200',
  'https://picsum.photos/id/3/200/200',
];

const meta = {
  title: 'Form/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addBtn = canvas.getByRole('button');
    await expect(addBtn).toBeInTheDocument();
  },
};

export const WithImages: Story = {
  args: {
    value: sampleImages,
  },
};

export const MaxReached: Story = {
  args: {
    value: [
      'https://picsum.photos/id/10/200/200',
      'https://picsum.photos/id/11/200/200',
      'https://picsum.photos/id/12/200/200',
      'https://picsum.photos/id/13/200/200',
      'https://picsum.photos/id/14/200/200',
    ],
    maxCount: 5,
  },
};

export const FourColumns: Story = {
  args: {
    value: sampleImages.slice(0, 2),
    columns: 4,
    maxCount: 8,
  },
};

export const TwoColumns: Story = {
  args: {
    value: sampleImages.slice(0, 1),
    columns: 2,
    maxCount: 4,
  },
};

export const NotDeletable: Story = {
  args: {
    value: sampleImages,
    deletable: false,
  },
};

export const Disabled: Story = {
  args: {
    value: sampleImages.slice(0, 2),
    disabled: true,
  },
};

export const Interactive: Story = {
  name: 'Review Photo Upload',
  render: () => {
    const [images, setImages] = useState<string[]>([
      'https://picsum.photos/id/20/200/200',
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
          Product Photos
        </div>
        <ImageUploader
          value={images}
          onChange={setImages}
          maxCount={5}
        />
        <div style={{ fontSize: 12, color: '#999' }}>
          {images.length}/5 photos uploaded. Max 5MB each.
        </div>
      </div>
    );
  },
};

export const WithUploadHandler: Story = {
  name: 'With Upload Simulation',
  render: () => {
    const [images, setImages] = useState<string[]>([]);

    const simulateUpload = async (file: File): Promise<string> => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));
      return URL.createObjectURL(file);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
          Upload Product Images
        </div>
        <ImageUploader
          value={images}
          onChange={setImages}
          maxCount={3}
          onUpload={simulateUpload}
        />
        <div style={{ fontSize: 12, color: '#999' }}>
          Click + to upload (simulated). Max 3 images.
        </div>
      </div>
    );
  },
};

export const SingleImage: Story = {
  name: 'Avatar Upload (1 image)',
  render: () => {
    const [images, setImages] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
          Profile Photo
        </div>
        <ImageUploader
          value={images}
          onChange={setImages}
          maxCount={1}
          columns={1}
        />
      </div>
    );
  },
};

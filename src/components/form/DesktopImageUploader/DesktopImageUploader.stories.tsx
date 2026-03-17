import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopImageUploader } from './DesktopImageUploader';
import type { DesktopImageFile } from './DesktopImageUploader';

const meta = {
  title: 'Forms (Desktop)/DesktopImageUploader',
  component: DesktopImageUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
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

export const Default: Story = {
  args: {
    maxCount: 5,
  },
};

export const WithImages: Story = {
  name: 'With Pre-loaded Images',
  render: () => {
    const [images, setImages] = useState<DesktopImageFile[]>([
      { url: 'https://picsum.photos/seed/prod1/200/200', name: 'product-front.jpg' },
      { url: 'https://picsum.photos/seed/prod2/200/200', name: 'product-back.jpg' },
      { url: 'https://picsum.photos/seed/prod3/200/200', name: 'product-detail.jpg' },
    ]);

    return (
      <DesktopImageUploader
        value={images}
        onChange={setImages}
        maxCount={6}
      />
    );
  },
};

export const MaxReached: Story = {
  name: 'Max Images Reached',
  render: () => {
    const images: DesktopImageFile[] = [
      { url: 'https://picsum.photos/seed/img1/200/200', name: 'image-1.jpg' },
      { url: 'https://picsum.photos/seed/img2/200/200', name: 'image-2.jpg' },
      { url: 'https://picsum.photos/seed/img3/200/200', name: 'image-3.jpg' },
    ];

    return (
      <DesktopImageUploader
        value={images}
        maxCount={3}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: [
      { url: 'https://picsum.photos/seed/dis1/200/200', name: 'locked-image.jpg' },
    ],
  },
};

export const SingleUpload: Story = {
  args: {
    maxCount: 1,
    multiple: false,
  },
};

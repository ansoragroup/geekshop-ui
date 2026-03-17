import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProductImageGallery } from './DesktopProductImageGallery';

const meta = {
  title: 'Product/DesktopProductImageGallery',
  component: DesktopProductImageGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onIndexChange: { action: 'index changed' },
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

const defaultImages = [
  'https://picsum.photos/seed/prod1/600/600',
  'https://picsum.photos/seed/prod2/600/600',
  'https://picsum.photos/seed/prod3/600/600',
  'https://picsum.photos/seed/prod4/600/600',
  'https://picsum.photos/seed/prod5/600/600',
];

export const Default: Story = {
  args: {
    images: defaultImages,
  },
};

export const SingleImage: Story = {
  args: {
    images: ['https://picsum.photos/seed/single1/600/600'],
  },
};

export const ManyImages: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/many1/600/600',
      'https://picsum.photos/seed/many2/600/600',
      'https://picsum.photos/seed/many3/600/600',
      'https://picsum.photos/seed/many4/600/600',
      'https://picsum.photos/seed/many5/600/600',
      'https://picsum.photos/seed/many6/600/600',
      'https://picsum.photos/seed/many7/600/600',
      'https://picsum.photos/seed/many8/600/600',
      'https://picsum.photos/seed/many9/600/600',
      'https://picsum.photos/seed/many10/600/600',
    ],
  },
};

export const HighZoom: Story = {
  name: 'High zoom (3x)',
  args: {
    images: defaultImages,
    zoomScale: 3,
  },
};

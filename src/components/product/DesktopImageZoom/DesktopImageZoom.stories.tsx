import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopImageZoom } from './DesktopImageZoom';

const meta = {
  title: 'Product/DesktopImageZoom',
  component: DesktopImageZoom,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
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

const smartphoneImages = [
  'https://picsum.photos/seed/zoom-phone-1/600/600',
  'https://picsum.photos/seed/zoom-phone-2/600/600',
  'https://picsum.photos/seed/zoom-phone-3/600/600',
  'https://picsum.photos/seed/zoom-phone-4/600/600',
  'https://picsum.photos/seed/zoom-phone-5/600/600',
];

const laptopImages = [
  'https://picsum.photos/seed/zoom-laptop-1/600/600',
  'https://picsum.photos/seed/zoom-laptop-2/600/600',
  'https://picsum.photos/seed/zoom-laptop-3/600/600',
];

export const Default: Story = {
  args: {
    images: smartphoneImages,
    altPrefix: 'Samsung Galaxy S24 Ultra',
  },
};

export const ThreeImages: Story = {
  name: 'Laptop (3 images)',
  args: {
    images: laptopImages,
    altPrefix: 'MacBook Pro',
    zoomLevel: 3,
  },
};

export const SingleImage: Story = {
  args: {
    images: ['https://picsum.photos/seed/zoom-single/600/600'],
    altPrefix: 'Product photo',
  },
};

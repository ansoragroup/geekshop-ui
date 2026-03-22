import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopImageLazy } from './DesktopImageLazy';

const meta = {
  title: 'Data Display (Desktop)/DesktopImageLazy',
  component: DesktopImageLazy,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopImageLazy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/lazy1/800/600',
    alt: 'Product hero image',
    aspectRatio: '4/3',
    radius: 12,
  },
};

export const SquareAspect: Story = {
  args: {
    src: 'https://picsum.photos/seed/lazy2/600/600',
    alt: 'Product thumbnail',
    aspectRatio: '1/1',
    radius: 8,
    style: { maxWidth: 400 },
  },
};

export const WideAspect: Story = {
  args: {
    src: 'https://picsum.photos/seed/lazy3/1200/400',
    alt: 'Banner image',
    aspectRatio: '3/1',
    radius: 16,
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/seed/lazy4/800/600',
    alt: 'Product with placeholder',
    aspectRatio: '4/3',
    placeholder: 'https://picsum.photos/seed/lazy4/80/60',
    radius: 12,
  },
};

export const WithColorPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/seed/lazy5/800/600',
    alt: 'Product with color placeholder',
    aspectRatio: '4/3',
    placeholder: '#FFF5F0',
    radius: 12,
  },
};

export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url.example.com/not-found.jpg',
    alt: 'Broken image',
    aspectRatio: '4/3',
    radius: 12,
  },
};

export const ContainFit: Story = {
  args: {
    src: 'https://picsum.photos/seed/lazy6/400/800',
    alt: 'Tall product image',
    aspectRatio: '4/3',
    objectFit: 'contain',
    radius: 12,
    style: { maxWidth: 500, background: '#fff' },
  },
};

export const Priority: Story = {
  args: {
    src: 'https://picsum.photos/seed/priority-desktop/800/600',
    alt: 'Above-fold hero image',
    width: 800,
    height: 600,
    aspectRatio: '4/3',
    radius: 12,
    priority: true,
  },
};

export const WithDimensions: Story = {
  args: {
    src: 'https://picsum.photos/seed/dims/600/600',
    alt: 'Product with explicit dimensions',
    width: 600,
    height: 600,
    aspectRatio: '1/1',
    radius: 8,
    style: { maxWidth: 400 },
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <DesktopImageLazy
        src="https://picsum.photos/seed/gal1/400/400"
        alt="Gallery image 1"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://picsum.photos/seed/gal2/400/400"
        alt="Gallery image 2"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://picsum.photos/seed/gal3/400/400"
        alt="Gallery image 3"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://picsum.photos/seed/gal4/400/400"
        alt="Gallery image 4"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://picsum.photos/seed/gal5/400/400"
        alt="Gallery image 5"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://picsum.photos/seed/gal6/400/400"
        alt="Gallery image 6"
        aspectRatio="1/1"
        radius={8}
      />
    </div>
  ),
};

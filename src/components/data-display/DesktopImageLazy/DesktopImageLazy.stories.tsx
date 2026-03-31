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
    src: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop&auto=format',
    alt: 'Product hero image',
    aspectRatio: '4/3',
    radius: 12,
  },
};

export const SquareAspect: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop&auto=format',
    alt: 'Product thumbnail',
    aspectRatio: '1/1',
    radius: 8,
    style: { maxWidth: 400 },
  },
};

export const WideAspect: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=400&fit=crop&auto=format',
    alt: 'Banner image',
    aspectRatio: '3/1',
    radius: 16,
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop&auto=format',
    alt: 'Product with placeholder',
    aspectRatio: '4/3',
    placeholder:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=80&h=60&fit=crop&auto=format',
    radius: 12,
  },
};

export const WithColorPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=600&fit=crop&auto=format',
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
    src: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=800&fit=crop&auto=format',
    alt: 'Tall product image',
    aspectRatio: '4/3',
    objectFit: 'contain',
    radius: 12,
    style: { maxWidth: 500, background: '#fff' },
  },
};

export const Priority: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&auto=format',
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
    src: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop&auto=format',
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
        src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 1"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 2"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 3"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 4"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 5"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 6"
        aspectRatio="1/1"
        radius={8}
      />
    </div>
  ),
};

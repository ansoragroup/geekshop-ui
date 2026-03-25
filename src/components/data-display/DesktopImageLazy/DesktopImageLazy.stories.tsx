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
    src: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800&h=600&fit=crop&auto=format',
    alt: 'Product hero image',
    aspectRatio: '4/3',
    radius: 12,
  },
};

export const SquareAspect: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1583394838336-d831d2d8d3da?w=600&h=600&fit=crop&auto=format',
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
    src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop&auto=format',
    alt: 'Product with placeholder',
    aspectRatio: '4/3',
    placeholder:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=60&fit=crop&auto=format',
    radius: 12,
  },
};

export const WithColorPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&h=600&fit=crop&auto=format',
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
    src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=800&fit=crop&auto=format',
    alt: 'Tall product image',
    aspectRatio: '4/3',
    objectFit: 'contain',
    radius: 12,
    style: { maxWidth: 500, background: '#fff' },
  },
};

export const Priority: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1583394838336-d831d2d8d3da?w=800&h=600&fit=crop&auto=format',
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
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop&auto=format',
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
        src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 1"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 2"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 3"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop&auto=format"
        alt="Gallery image 4"
        aspectRatio="1/1"
        radius={8}
      />
      <DesktopImageLazy
        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format"
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

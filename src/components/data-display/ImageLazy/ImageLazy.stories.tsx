import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageLazy } from './ImageLazy';

const meta = {
  title: 'Data Display/ImageLazy',
  component: ImageLazy,
  tags: ['autodocs'],
  argTypes: {
    objectFit: { control: 'select', options: ['cover', 'contain', 'fill'] },
    aspectRatio: { control: 'text' },
    radius: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageLazy>;

export default meta;
type Story = StoryObj<typeof ImageLazy>;

// --- Default ---
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/geekshop1/400/400',
    alt: 'Product image',
    aspectRatio: '1/1',
    radius: 8,
  },
  render: (args) => (
    <div style={{ width: 200 }}>
      <ImageLazy {...args} />
    </div>
  ),
};

// --- With Placeholder ---
export const WithPlaceholder: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <ImageLazy
        src="https://picsum.photos/seed/geekshop2/600/400"
        alt="Product with placeholder"
        placeholder="https://picsum.photos/seed/geekshop2/30/20"
        aspectRatio="3/2"
        radius={12}
      />
    </div>
  ),
};

// --- Aspect Ratios ---
export const AspectRatio: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ width: 160 }}>
        <ImageLazy
          src="https://picsum.photos/seed/ar1/300/300"
          alt="1:1 square"
          aspectRatio="1/1"
          radius={8}
          placeholder="#f0f0f0"
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>1:1</p>
      </div>
      <div style={{ width: 200 }}>
        <ImageLazy
          src="https://picsum.photos/seed/ar2/400/300"
          alt="4:3 landscape"
          aspectRatio="4/3"
          radius={8}
          placeholder="#e8e8e8"
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>4:3</p>
      </div>
      <div style={{ width: 240 }}>
        <ImageLazy
          src="https://picsum.photos/seed/ar3/480/270"
          alt="16:9 widescreen"
          aspectRatio="16/9"
          radius={8}
          placeholder="#e0e0e0"
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>16:9</p>
      </div>
    </div>
  ),
};

// --- Error Fallback ---
export const ErrorFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 160 }}>
        <ImageLazy
          src="https://invalid-url.example/broken.jpg"
          alt="Broken image with fallback"
          fallback="https://picsum.photos/seed/fallback/300/300"
          aspectRatio="1/1"
          radius={8}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>With fallback</p>
      </div>
      <div style={{ width: 160 }}>
        <ImageLazy
          src="https://invalid-url.example/broken.jpg"
          alt="Broken image no fallback"
          aspectRatio="1/1"
          radius={8}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>No fallback</p>
      </div>
    </div>
  ),
};

// --- Product Grid ---
export const Grid: Story = {
  name: 'Product Grid',
  render: () => {
    const products = [
      { id: 1, name: 'RTX 4060', price: '$299' },
      { id: 2, name: 'Mechanical Keyboard', price: '$89' },
      { id: 3, name: 'Gaming Mouse', price: '$49' },
      { id: 4, name: '27" Monitor', price: '$399' },
      { id: 5, name: 'USB Hub', price: '$25' },
      { id: 6, name: 'Webcam HD', price: '$59' },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          maxWidth: 480,
        }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <ImageLazy
              src={`https://picsum.photos/seed/product${p.id}/300/300`}
              alt={p.name}
              placeholder={`https://picsum.photos/seed/product${p.id}/15/15`}
              aspectRatio="1/1"
            />
            <div style={{ padding: '8px 10px' }}>
              <div style={{ fontSize: 12, color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 14, color: '#FF5000', fontWeight: 600, marginTop: 2 }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

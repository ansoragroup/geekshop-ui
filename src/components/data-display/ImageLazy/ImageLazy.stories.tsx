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
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
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
        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format"
        alt="Product with placeholder"
        placeholder="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=30&h=20&fit=crop&auto=format"
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
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop&auto=format"
          alt="1:1 square"
          aspectRatio="1/1"
          radius={8}
          placeholder="#f0f0f0"
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>1:1</p>
      </div>
      <div style={{ width: 200 }}>
        <ImageLazy
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop&auto=format"
          alt="4:3 landscape"
          aspectRatio="4/3"
          radius={8}
          placeholder="#e8e8e8"
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>4:3</p>
      </div>
      <div style={{ width: 240 }}>
        <ImageLazy
          src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=480&h=270&fit=crop&auto=format"
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
          fallback="https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=300&h=300&fit=crop&auto=format"
          aspectRatio="1/1"
          radius={8}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>
          With fallback
        </p>
      </div>
      <div style={{ width: 160 }}>
        <ImageLazy
          src="https://invalid-url.example/broken.jpg"
          alt="Broken image no fallback"
          aspectRatio="1/1"
          radius={8}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>
          No fallback
        </p>
      </div>
    </div>
  ),
};

// --- Priority (above-fold) ---
export const Priority: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <ImageLazy
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&auto=format"
        alt="Above-fold hero image"
        width={600}
        height={400}
        aspectRatio="3/2"
        radius={12}
        priority
      />
      <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>
        priority=true — no lazy loading, fetchpriority=high
      </p>
    </div>
  ),
};

// --- With width/height for CLS prevention ---
export const WithDimensions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 200 }}>
        <ImageLazy
          src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format"
          alt="With dimensions"
          width={400}
          height={400}
          aspectRatio="1/1"
          radius={8}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>
          width=400 height=400
        </p>
      </div>
      <div style={{ width: 200 }}>
        <ImageLazy
          src="https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=300&fit=crop&auto=format"
          alt="Without dimensions"
          aspectRatio="4/3"
          radius={8}
        />
        <p style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>
          No width/height
        </p>
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
          <div
            key={p.id}
            style={{
              background: '#fff',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <ImageLazy
              src={`https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop&auto=format`}
              alt={p.name}
              placeholder={`https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=15&h=15&fit=crop&auto=format`}
              aspectRatio="1/1"
            />
            <div style={{ padding: '8px 10px' }}>
              <div
                style={{
                  fontSize: 12,
                  color: '#333',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {p.name}
              </div>
              <div style={{ fontSize: 14, color: '#FF5000', fontWeight: 600, marginTop: 2 }}>
                {p.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

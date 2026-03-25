import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Rating } from './Rating';

const meta = {
  title: 'Data Display/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default display ---
export const Default: Story = {
  args: {
    value: 4.6,
    count: 87,
    size: 'md',
    showCount: true,
  },
};

// --- RTX 4060 Rating ---
export const RTX4060: Story = {
  name: 'RTX 4060 Reviews',
  args: {
    value: 4.8,
    count: 234,
    size: 'md',
  },
};

// --- Half star ---
export const HalfStar: Story = {
  args: {
    value: 3.5,
    count: 42,
    size: 'md',
  },
};

// --- All sizes ---
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Rating value={4.6} count={87} size="sm" />
      <Rating value={4.6} count={87} size="md" />
      <Rating value={4.6} count={87} size="lg" />
    </div>
  ),
};

// --- Without count ---
export const NoCount: Story = {
  args: {
    value: 4.2,
    size: 'md',
    showCount: false,
  },
};

// --- Full 5 stars ---
export const Perfect: Story = {
  args: {
    value: 5.0,
    count: 12,
    size: 'lg',
  },
};

// --- Low rating ---
export const LowRating: Story = {
  args: {
    value: 1.5,
    count: 3,
    size: 'md',
  },
};

// --- Interactive ---
export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState(0);
    return (
      <div>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
          Bahoyingiz: {val > 0 ? `${val} yulduz` : 'Tanlang'}
        </p>
        <Rating value={val} size="lg" interactive onChange={setVal} showCount={false} />
      </div>
    );
  },
};

// --- Product card context ---
export const InProductCard: Story = {
  name: 'In Product Card Context',
  render: () => (
    <div
      style={{
        width: 180,
        padding: 12,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=180&h=140&fit=crop&auto=format"
        alt="RTX 4060"
        style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
      />
      <div
        style={{
          fontSize: 13,
          color: '#1a1a1a',
          marginBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        MSI RTX 4060 VENTUS 2X
      </div>
      <Rating value={4.6} count={87} size="sm" />
      <div style={{ fontSize: 16, fontWeight: 700, color: '#FF0000', marginTop: 4 }}>
        5 200 000 so'm
      </div>
    </div>
  ),
};

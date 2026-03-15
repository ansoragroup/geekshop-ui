import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, ProductCardSkeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular', 'rounded'] },
    animation: { control: 'select', options: ['pulse', 'wave', 'none'] },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// --- Default (single text line) ---
export const Default: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
  },
};

// --- Multiple text lines ---
export const TextLines: Story = {
  args: {
    variant: 'text',
    lines: 4,
    animation: 'pulse',
  },
};

// --- Circular (avatar placeholder) ---
export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

// --- Rectangular (image placeholder) ---
export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 180,
    animation: 'wave',
  },
};

// --- Product card skeleton ---
export const ProductCard: Story = {
  render: () => <ProductCardSkeleton />,
};

// --- Grid of product card skeletons ---
export const ProductGridSkeleton: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, width: 390, padding: 8, background: '#F5F5F5', borderRadius: 12 }}>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  ),
};

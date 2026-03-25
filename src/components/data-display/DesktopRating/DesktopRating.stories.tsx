import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopRating } from './DesktopRating';

const meta = {
  title: 'Data Display (Desktop)/DesktopRating',
  component: DesktopRating,
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
} satisfies Meta<typeof DesktopRating>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- DEFAULT ---

export const Default: Story = {
  args: {
    value: 4.5,
    showValue: true,
    count: 1287,
    allowHalf: true,
    readonly: true,
  },
};

// --- FULL FEATURED ---

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    value: 4.5,
    max: 5,
    size: 28,
    readonly: true,
    count: 8432,
    showValue: true,
    allowHalf: true,
  },
};

// --- INTERACTIVE ---

export const Interactive: Story = {
  name: 'Interactive (Click to Rate)',
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DesktopRating
          value={value}
          onChange={setValue}
          showValue
          size={32}
        />
        <span style={{ fontSize: 14, color: '#666' }}>Click a star to rate. Current: {value} star{value !== 1 ? 's' : ''}</span>
      </div>
    );
  },
};

// --- ALL VALUES ---

export const AllValues: Story = {
  name: 'All Rating Values (0 to 5)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopRating value={0} readonly showValue />
      <DesktopRating value={1} readonly showValue count={3} />
      <DesktopRating value={2} readonly showValue count={15} />
      <DesktopRating value={3} readonly showValue count={87} />
      <DesktopRating value={4} readonly showValue count={523} />
      <DesktopRating value={5} readonly showValue count={2104} />
    </div>
  ),
};

// --- HALF STARS ---

export const HalfStars: Story = {
  name: 'Half Star Values',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopRating value={0.5} allowHalf readonly showValue count={1} />
      <DesktopRating value={1.5} allowHalf readonly showValue count={3} />
      <DesktopRating value={2.5} allowHalf readonly showValue count={12} />
      <DesktopRating value={3.5} allowHalf readonly showValue count={87} />
      <DesktopRating value={4.5} allowHalf readonly showValue count={523} />
    </div>
  ),
};

// --- SIZES ---

export const AllSizes: Story = {
  name: 'All Sizes (16, 24, 32, 48)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <DesktopRating value={4} size={16} readonly showValue count={42} />
        <span style={{ fontSize: 12, color: '#999' }}>16px</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <DesktopRating value={4} size={24} readonly showValue count={42} />
        <span style={{ fontSize: 12, color: '#999' }}>24px (default)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <DesktopRating value={4} size={32} readonly showValue count={42} />
        <span style={{ fontSize: 12, color: '#999' }}>32px</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <DesktopRating value={4} size={48} readonly showValue count={42} />
        <span style={{ fontSize: 12, color: '#999' }}>48px</span>
      </div>
    </div>
  ),
};

// --- READ-ONLY VARIANTS ---

export const ReadonlyNoCount: Story = {
  name: 'Readonly (No Count)',
  args: {
    value: 5,
    readonly: true,
    showValue: true,
    size: 24,
  },
};

export const ReadonlyNoValue: Story = {
  name: 'Readonly (No Value Text)',
  args: {
    value: 3.5,
    readonly: true,
    allowHalf: true,
    count: 156,
  },
};

export const ReadonlyMinimal: Story = {
  name: 'Readonly Minimal (Stars Only)',
  args: {
    value: 4,
    readonly: true,
    size: 20,
  },
};

// --- CUSTOM MAX ---

export const CustomMax10Stars: Story = {
  name: 'Custom Max: 10 Stars',
  args: {
    value: 7,
    max: 10,
    size: 20,
    readonly: true,
    showValue: true,
  },
};

export const CustomMax3Stars: Story = {
  name: 'Custom Max: 3 Stars',
  args: {
    value: 2,
    max: 3,
    size: 32,
    readonly: true,
    showValue: true,
    count: 45,
  },
};

// --- EDGE CASES ---

export const ZeroRating: Story = {
  name: 'Zero Rating',
  args: {
    value: 0,
    readonly: true,
    showValue: true,
    count: 0,
  },
};

export const HighCount: Story = {
  name: 'Very High Review Count',
  args: {
    value: 4.7,
    allowHalf: true,
    readonly: true,
    showValue: true,
    count: 124589,
  },
};

// --- PRODUCT CARD CONTEXT ---

export const ProductCardRating: Story = {
  name: 'Product Card Context',
  render: () => (
    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #eee', maxWidth: 300 }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600 }}>MSI RTX 4060 Ventus 2X</h3>
      <DesktopRating value={4.5} allowHalf readonly showValue count={1287} size={16} />
      <p style={{ margin: '12px 0 0', fontSize: 18, fontWeight: 700, color: '#FF0000' }}>12,500,000 UZS</p>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopColorSwatch } from './DesktopColorSwatch';

const meta = {
  title: 'Product/DesktopColorSwatch',
  component: DesktopColorSwatch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onChange: { action: 'color changed' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Color',
    options: [
      { value: 'black', color: '#1A1A1A', label: 'Black' },
      { value: 'white', color: '#FAFAFA', label: 'White' },
      { value: 'blue', color: '#005BFF', label: 'Blue' },
      { value: 'red', color: '#FF3B30', label: 'Red' },
      { value: 'green', color: '#07C160', label: 'Green' },
    ],
    selected: 'black',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    label: 'Select Your Color',
    options: [
      { value: 'titanium-gray', color: '#8E8E93', label: 'Titanium Gray' },
      { value: 'midnight', color: '#1C1C1E', label: 'Midnight' },
      { value: 'starlight', color: '#F5E6CC', label: 'Starlight' },
      { value: 'purple', color: '#7B2BFC', label: 'Deep Purple' },
      { value: 'orange', color: '#FF5000', label: 'Sunset Orange' },
      { value: 'pink', color: '#FF6B8A', label: 'Rose Pink' },
      { value: 'blue', color: '#005BFF', label: 'Ocean Blue' },
      { value: 'green', color: '#07C160', label: 'Forest Green' },
    ],
    selected: 'titanium-gray',
  },
};

// ─── Phone Case Colors ───────────────────────────────────────────────────────

export const PhoneCases: Story = {
  name: 'Phone Case Colors',
  args: {
    label: 'Case Color',
    options: [
      { value: 'titanium-gray', color: '#8E8E93', label: 'Titanium' },
      { value: 'midnight', color: '#1C1C1E', label: 'Midnight' },
      { value: 'starlight', color: '#F5E6CC', label: 'Starlight' },
      { value: 'purple', color: '#7B2BFC', label: 'Purple' },
      { value: 'orange', color: '#FF5000', label: 'Orange' },
      { value: 'pink', color: '#FF6B8A', label: 'Pink' },
    ],
    selected: 'titanium-gray',
  },
};

// ─── Material / Image Swatches ───────────────────────────────────────────────

export const MaterialSwatches: Story = {
  name: 'Material and Pattern (images)',
  args: {
    label: 'Material',
    options: [
      { value: 'leather', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop', label: 'Leather' },
      { value: 'fabric', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop', label: 'Fabric' },
      { value: 'metal', image: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?w=80&h=80&fit=crop', label: 'Metal' },
      { value: 'wood', image: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=80&h=80&fit=crop', label: 'Wood' },
    ],
    selected: 'leather',
  },
};

// ─── No Labels ───────────────────────────────────────────────────────────────

export const NoLabels: Story = {
  name: 'Without Swatch Labels',
  args: {
    label: 'Color',
    options: [
      { value: 'black', color: '#1A1A1A' },
      { value: 'silver', color: '#C0C0C0' },
      { value: 'gold', color: '#C8A951' },
      { value: 'rose', color: '#E8B4B8' },
    ],
    selected: 'black',
  },
};

// ─── No Group Label ──────────────────────────────────────────────────────────

export const NoGroupLabel: Story = {
  name: 'Without Group Label',
  args: {
    options: [
      { value: 'xs', color: '#E3F2FD', label: 'XS' },
      { value: 's', color: '#BBDEFB', label: 'S' },
      { value: 'm', color: '#90CAF9', label: 'M' },
      { value: 'l', color: '#64B5F6', label: 'L' },
      { value: 'xl', color: '#42A5F5', label: 'XL' },
    ],
    selected: 'm',
  },
};

// ─── Two Options ─────────────────────────────────────────────────────────────

export const TwoOptions: Story = {
  name: 'Edge: Two Options',
  args: {
    label: 'Finish',
    options: [
      { value: 'matte', color: '#333333', label: 'Matte Black' },
      { value: 'glossy', color: '#1A1A1A', label: 'Glossy Black' },
    ],
    selected: 'matte',
  },
};

// ─── Many Options ────────────────────────────────────────────────────────────

export const ManyOptions: Story = {
  name: 'Edge: Many Options (12)',
  args: {
    label: 'T-Shirt Color',
    options: [
      { value: 'black', color: '#1A1A1A', label: 'Black' },
      { value: 'white', color: '#FAFAFA', label: 'White' },
      { value: 'gray', color: '#808080', label: 'Gray' },
      { value: 'navy', color: '#001F3F', label: 'Navy' },
      { value: 'red', color: '#FF3B30', label: 'Red' },
      { value: 'blue', color: '#005BFF', label: 'Blue' },
      { value: 'green', color: '#07C160', label: 'Green' },
      { value: 'yellow', color: '#FFD700', label: 'Yellow' },
      { value: 'orange', color: '#FF5000', label: 'Orange' },
      { value: 'pink', color: '#FF6B8A', label: 'Pink' },
      { value: 'purple', color: '#7B2BFC', label: 'Purple' },
      { value: 'brown', color: '#8B4513', label: 'Brown' },
    ],
    selected: 'black',
  },
};

// ─── Interactive (controlled) ────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (controlled)',
  render: () => {
    const [selected, setSelected] = useState('black');
    return (
      <div>
        <DesktopColorSwatch
          label="Color"
          options={[
            { value: 'black', color: '#1A1A1A', label: 'Black' },
            { value: 'white', color: '#FAFAFA', label: 'White' },
            { value: 'blue', color: '#005BFF', label: 'Blue' },
            { value: 'gold', color: '#C8A951', label: 'Gold' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
        <p style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

// ─── Mixed (colors + images) ─────────────────────────────────────────────────

export const MixedSwatches: Story = {
  name: 'Mixed: Colors + Images',
  args: {
    label: 'Style',
    options: [
      { value: 'solid-black', color: '#1A1A1A', label: 'Solid Black' },
      { value: 'solid-white', color: '#FAFAFA', label: 'Solid White' },
      { value: 'pattern-stripe', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop', label: 'Striped' },
      { value: 'pattern-plaid', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop', label: 'Plaid' },
    ],
    selected: 'solid-black',
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopSkuSelector } from './DesktopSkuSelector';

const meta = {
  title: 'Commerce (Desktop)/DesktopSkuSelector',
  component: DesktopSkuSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSkuSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: two variant groups (Color + Storage) with selection, stock, and price. */
export const Default: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [{ value: 'Black' }, { value: 'White' }, { value: 'Blue' }],
      },
      {
        name: 'Storage',
        options: [{ value: '128GB' }, { value: '256GB' }, { value: '512GB' }],
      },
    ],
    selectedValues: { Color: 'Black', Storage: '256GB' },
    stock: 24,
    price: 8_900_000,
    onSelect: fn(),
  },
};

/** Color options with thumbnail images. */
export const WithImages: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [
          {
            value: 'Midnight Black',
            image:
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=48&h=48&fit=crop',
          },
          {
            value: 'Pearl White',
            image:
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=48&h=48&fit=crop',
          },
          {
            value: 'Ocean Blue',
            image:
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=48&h=48&fit=crop',
          },
          {
            value: 'Sunset Gold',
            image:
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=48&h=48&fit=crop',
          },
        ],
      },
    ],
    selectedValues: { Color: 'Midnight Black' },
    stock: 12,
    price: 14_500_000,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop',
    onSelect: fn(),
  },
};

/** Some options out of stock, some disabled. */
export const OutOfStock: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [
          { value: 'Black' },
          { value: 'White', outOfStock: true },
          { value: 'Red', disabled: true },
        ],
      },
      {
        name: 'Size',
        options: [
          { value: 'S' },
          { value: 'M' },
          { value: 'L', outOfStock: true },
          { value: 'XL' },
        ],
      },
    ],
    selectedValues: { Color: 'Black', Size: 'M' },
    stock: 3,
    price: 450_000,
    onSelect: fn(),
  },
};

/** Single variant group (RAM selection for a laptop). */
export const SingleVariant: Story = {
  args: {
    variants: [
      {
        name: 'RAM',
        options: [{ value: '8GB' }, { value: '16GB' }, { value: '32GB' }, { value: '64GB' }],
      },
    ],
    selectedValues: { RAM: '16GB' },
    stock: 47,
    price: 12_300_000,
    onSelect: fn(),
  },
};

/** Three variant groups: Color, Storage, and RAM. */
export const ThreeVariantGroups: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [{ value: 'Space Gray' }, { value: 'Silver' }, { value: 'Midnight' }],
      },
      {
        name: 'Storage',
        options: [{ value: '256GB' }, { value: '512GB' }, { value: '1TB' }, { value: '2TB' }],
      },
      {
        name: 'RAM',
        options: [{ value: '16GB' }, { value: '32GB' }, { value: '64GB' }],
      },
    ],
    selectedValues: { Color: 'Space Gray', Storage: '512GB', RAM: '32GB' },
    stock: 8,
    price: 35_900_000,
    onSelect: fn(),
  },
};

/** All props filled: preview image, 3 variant groups, stock, price. */
export const FullFeatured: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [
          {
            value: 'Titanium Black',
            image:
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=48&h=48&fit=crop',
          },
          {
            value: 'Titanium Gray',
            image:
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=48&h=48&fit=crop',
          },
          {
            value: 'Titanium Violet',
            image:
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=48&h=48&fit=crop',
          },
          {
            value: 'Titanium Yellow',
            image:
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=48&h=48&fit=crop',
          },
        ],
      },
      {
        name: 'Storage',
        options: [{ value: '256GB' }, { value: '512GB' }, { value: '1TB', outOfStock: true }],
      },
    ],
    selectedValues: { Color: 'Titanium Black', Storage: '512GB' },
    stock: 5,
    price: 16_200_000,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop',
    onSelect: fn(),
  },
};

/** Zero stock (completely sold out). */
export const ZeroStock: Story = {
  args: {
    variants: [
      {
        name: 'Model',
        options: [
          { value: 'Standard', outOfStock: true },
          { value: 'Pro', outOfStock: true },
        ],
      },
    ],
    selectedValues: {},
    stock: 0,
    price: 5_900_000,
    onSelect: fn(),
  },
};

/** Low stock warning (less than 5 items). */
export const LowStock: Story = {
  args: {
    variants: [
      {
        name: 'Edition',
        options: [{ value: 'Standard' }, { value: 'Limited Edition' }],
      },
    ],
    selectedValues: { Edition: 'Limited Edition' },
    stock: 2,
    price: 18_990_000,
    onSelect: fn(),
  },
};

/** No stock or price displayed (undefined). */
export const NoStockOrPrice: Story = {
  args: {
    variants: [
      {
        name: 'Size',
        options: [{ value: 'Small' }, { value: 'Medium' }, { value: 'Large' }],
      },
    ],
    selectedValues: { Size: 'Medium' },
    onSelect: fn(),
  },
};

/** Many options in a single variant group. */
export const ManyOptions: Story = {
  args: {
    variants: [
      {
        name: 'Size (EU)',
        options: [
          { value: '36' },
          { value: '37' },
          { value: '38' },
          { value: '39' },
          { value: '40' },
          { value: '41' },
          { value: '42' },
          { value: '43' },
          { value: '44' },
          { value: '45' },
          { value: '46', outOfStock: true },
          { value: '47', outOfStock: true },
        ],
      },
    ],
    selectedValues: { 'Size (EU)': '42' },
    stock: 15,
    price: 890_000,
    onSelect: fn(),
  },
};

/** Interactive: selecting options updates the state. */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string>>({
      Color: 'Black',
      Storage: '256GB',
    });
    const prices: Record<string, number> = {
      '128GB': 8_900_000,
      '256GB': 10_500_000,
      '512GB': 14_200_000,
    };

    return (
      <div>
        <DesktopSkuSelector
          variants={[
            {
              name: 'Color',
              options: [
                { value: 'Black' },
                { value: 'White' },
                { value: 'Blue' },
                { value: 'Green', outOfStock: true },
              ],
            },
            {
              name: 'Storage',
              options: [{ value: '128GB' }, { value: '256GB' }, { value: '512GB' }],
            },
          ]}
          selectedValues={selected}
          stock={selected.Color === 'Green' ? 0 : 18}
          price={prices[selected.Storage] ?? 8_900_000}
          onSelect={(name, value) => setSelected((prev) => ({ ...prev, [name]: value }))}
        />
        <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Selected: {JSON.stringify(selected)}
        </p>
      </div>
    );
  },
};

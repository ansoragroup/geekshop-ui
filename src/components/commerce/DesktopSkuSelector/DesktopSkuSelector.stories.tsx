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
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, background: '#fff', borderRadius: 12 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopSkuSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [
          { value: 'Black' },
          { value: 'White' },
          { value: 'Blue' },
        ],
      },
      {
        name: 'Storage',
        options: [
          { value: '128GB' },
          { value: '256GB' },
          { value: '512GB' },
        ],
      },
    ],
    selectedValues: { Color: 'Black', Storage: '256GB' },
    stock: 24,
    price: 8_900_000,
    onSelect: fn(),
  },
};

export const WithImages: Story = {
  args: {
    variants: [
      {
        name: 'Color',
        options: [
          { value: 'Midnight Black', image: 'https://picsum.photos/seed/black/48/48' },
          { value: 'Pearl White', image: 'https://picsum.photos/seed/white/48/48' },
          { value: 'Ocean Blue', image: 'https://picsum.photos/seed/blue/48/48' },
          { value: 'Sunset Gold', image: 'https://picsum.photos/seed/gold/48/48' },
        ],
      },
    ],
    selectedValues: { Color: 'Midnight Black' },
    stock: 12,
    price: 14_500_000,
    image: 'https://picsum.photos/seed/phone-black/200/200',
    onSelect: fn(),
  },
};

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

export const SingleVariant: Story = {
  args: {
    variants: [
      {
        name: 'RAM',
        options: [
          { value: '8GB' },
          { value: '16GB' },
          { value: '32GB' },
          { value: '64GB' },
        ],
      },
    ],
    selectedValues: { RAM: '16GB' },
    stock: 47,
    price: 12_300_000,
    onSelect: fn(),
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopCartItem } from './DesktopCartItem';

const meta = {
  title: 'Commerce (Desktop)/DesktopCartItem',
  component: DesktopCartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onQuantityChange: { action: 'onQuantityChange' },
    onDelete: { action: 'onDelete' },
    onClick: { action: 'onClick' },
  },
  decorators: [(Story) => (
    <div style={{ width: 900, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopCartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu1/200/200',
    title: 'MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC',
    price: 17_800_000,
    quantity: 2,
    selected: false,
    inStock: true,
    onSelect: fn(),
    onQuantityChange: fn(),
    onDelete: fn(),
    onClick: fn(),
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const OutOfStock: Story = {
  args: {
    ...Default.args,
    inStock: false,
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB',
  },
};

export const WithFreeShipping: Story = {
  args: {
    ...Default.args,
    freeShipping: true,
  },
};

export const WithVariant: Story = {
  args: {
    ...Default.args,
    title: 'Samsung Galaxy S24 Ultra 5G',
    variant: 'Black / 256GB',
    price: 14_500_000,
    image: 'https://picsum.photos/seed/phone1/200/200',
  },
};

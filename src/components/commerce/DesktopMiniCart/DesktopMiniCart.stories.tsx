import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopMiniCart } from './DesktopMiniCart';

const meta = {
  title: 'Commerce (Desktop)/DesktopMiniCart',
  component: DesktopMiniCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, display: 'flex', justifyContent: 'flex-end' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopMiniCart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: '1',
    title: 'MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC',
    image: 'https://picsum.photos/seed/gpu1/200/200',
    price: 5_900_000,
    quantity: 1,
    variant: 'Black Edition',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra 256GB',
    image: 'https://picsum.photos/seed/phone1/200/200',
    price: 14_500_000,
    quantity: 1,
    variant: 'Titanium Black',
  },
  {
    id: '3',
    title: 'Apple AirPods Pro 2nd Gen USB-C',
    image: 'https://picsum.photos/seed/airpods1/200/200',
    price: 3_200_000,
    quantity: 2,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

export const Empty: Story = {
  args: {
    items: [],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
    open: true,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

export const Closed: Story = {
  args: {
    items: sampleItems,
    open: false,
    onClose: fn(),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

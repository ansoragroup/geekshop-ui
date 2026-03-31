import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MiniCart } from './MiniCart';

const sampleItems = [
  {
    id: '1',
    title: 'ASUS ROG Strix RTX 4070 Super OC 12GB',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=120&h=120&fit=crop&auto=format',
    price: 8900000,
    quantity: 1,
    variant: '12GB GDDR6X',
  },
  {
    id: '2',
    title: 'AMD Ryzen 7 7800X3D Processor',
    image:
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=120&h=120&fit=crop&auto=format',
    price: 5600000,
    quantity: 1,
    variant: 'AM5 Socket',
  },
  {
    id: '3',
    title: 'Samsung 990 Pro NVMe SSD 2TB',
    image:
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=120&h=120&fit=crop&auto=format',
    price: 3200000,
    quantity: 2,
  },
];

const meta = {
  title: 'Commerce/MiniCart',
  component: MiniCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, display: 'flex', justifyContent: 'flex-end', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MiniCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    items: sampleItems,
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        id: '4',
        title: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
        image:
          'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=120&h=120&fit=crop&auto=format',
        price: 2100000,
        quantity: 1,
        variant: 'DDR5-6000',
      },
      {
        id: '5',
        title: 'ASUS ROG Crosshair X670E Hero Motherboard',
        image:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop&auto=format',
        price: 6800000,
        quantity: 1,
      },
      {
        id: '6',
        title: 'Corsair RM1000x 1000W Power Supply',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format',
        price: 2800000,
        quantity: 1,
        variant: '80+ Gold',
      },
    ],
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

export const WithCustomTrigger: Story = {
  args: {
    items: sampleItems,
    trigger: (
      <button
        style={{
          padding: '8px 16px',
          background: '#FF5000',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Cart (3)
      </button>
    ),
    onViewCart: fn(),
    onCheckout: fn(),
    onRemoveItem: fn(),
  },
};

export const NoRemoveCallback: Story = {
  args: {
    items: sampleItems.slice(0, 2),
    onViewCart: fn(),
    onCheckout: fn(),
  },
};

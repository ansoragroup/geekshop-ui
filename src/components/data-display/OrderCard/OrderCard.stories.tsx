import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderCard } from './OrderCard';

const meta = {
  title: 'Data Display/OrderCard',
  component: OrderCard,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['pending', 'shipping', 'review', 'return'] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#F5F5F5', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Pending payment ---
export const Pending: Story = {
  args: {
    orderId: '20260314001',
    status: 'pending',
    date: '2026-03-14',
    products: [
      {
        image:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop&auto=format',
        title: 'MSI GeForce RTX 4060 VENTUS 2X 8G OC',
        variant: 'RTX 4060 8GB',
        price: 5_200_000,
        quantity: 1,
      },
    ],
    totalAmount: 5_200_000,
    actions: [
      { label: "To'lash", type: 'primary', onClick: () => {} },
      { label: 'Bekor qilish', type: 'default', onClick: () => {} },
    ],
  },
};

// --- Shipping ---
export const Shipping: Story = {
  args: {
    orderId: '20260312005',
    status: 'shipping',
    date: '2026-03-12',
    products: [
      {
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop&auto=format',
        title: 'AMD Ryzen 7 7800X3D Protsessor',
        variant: 'BOX',
        price: 6_400_000,
        quantity: 1,
      },
      {
        image:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop&auto=format',
        title: 'Kingston FURY Beast DDR5 32GB (2x16GB) 6000MHz',
        price: 1_800_000,
        quantity: 1,
      },
    ],
    totalAmount: 8_200_000,
    actions: [{ label: 'Kuzatish', type: 'primary', onClick: () => {} }],
  },
};

// --- Ready for review ---
export const Review: Story = {
  args: {
    orderId: '20260308012',
    status: 'review',
    date: '2026-03-08',
    products: [
      {
        image:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop&auto=format',
        title: 'Logitech G Pro X Superlight 2',
        variant: 'Qora',
        price: 1_650_000,
        quantity: 1,
      },
    ],
    totalAmount: 1_650_000,
    actions: [
      { label: 'Baholash', type: 'primary', onClick: () => {} },
      { label: 'Qayta buyurtma', type: 'default', onClick: () => {} },
    ],
  },
};

// --- Return ---
export const Return: Story = {
  args: {
    orderId: '20260305008',
    status: 'return',
    date: '2026-03-05',
    products: [
      {
        image:
          'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop&auto=format',
        title: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
        price: 3_100_000,
        quantity: 1,
      },
    ],
    totalAmount: 3_100_000,
    actions: [{ label: 'Qaytarish holati', type: 'primary', onClick: () => {} }],
  },
};

// --- Multiple orders ---
export const OrdersList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <OrderCard
        orderId="20260314001"
        status="pending"
        date="2026-03-14"
        products={[
          {
            image:
              'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&h=200&fit=crop&auto=format',
            title: 'ASUS TUF Gaming RTX 4070 Ti SUPER OC 16GB',
            variant: 'RTX 4070 Ti SUPER',
            price: 11_500_000,
            quantity: 1,
          },
        ]}
        totalAmount={11_500_000}
        actions={[
          { label: "To'lash", type: 'primary', onClick: () => {} },
          { label: 'Bekor qilish', type: 'default', onClick: () => {} },
        ]}
      />
      <OrderCard
        orderId="20260312005"
        status="shipping"
        date="2026-03-12"
        products={[
          {
            image:
              'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop&auto=format',
            title: 'NZXT H7 Flow ATX Mid Tower Keys',
            variant: 'Oq',
            price: 1_400_000,
            quantity: 1,
          },
          {
            image:
              'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop&auto=format',
            title: 'Noctua NF-A12x25 PWM Fan (3-pack)',
            price: 850_000,
            quantity: 1,
          },
        ]}
        totalAmount={2_250_000}
        actions={[{ label: 'Kuzatish', type: 'primary', onClick: () => {} }]}
      />
    </div>
  ),
};

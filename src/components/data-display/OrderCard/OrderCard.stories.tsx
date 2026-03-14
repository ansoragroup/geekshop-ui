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
      <div style={{ padding: 16, background: '#F5F5F5', borderRadius: 12, maxWidth: 390 }}>
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
        image: 'https://picsum.photos/seed/order-gpu/200/200',
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
        image: 'https://picsum.photos/seed/order-cpu/200/200',
        title: 'AMD Ryzen 7 7800X3D Protsessor',
        variant: 'BOX',
        price: 6_400_000,
        quantity: 1,
      },
      {
        image: 'https://picsum.photos/seed/order-ram/200/200',
        title: 'Kingston FURY Beast DDR5 32GB (2x16GB) 6000MHz',
        price: 1_800_000,
        quantity: 1,
      },
    ],
    totalAmount: 8_200_000,
    actions: [
      { label: 'Kuzatish', type: 'primary', onClick: () => {} },
    ],
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
        image: 'https://picsum.photos/seed/order-mouse/200/200',
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
        image: 'https://picsum.photos/seed/order-ssd/200/200',
        title: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
        price: 3_100_000,
        quantity: 1,
      },
    ],
    totalAmount: 3_100_000,
    actions: [
      { label: 'Qaytarish holati', type: 'primary', onClick: () => {} },
    ],
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
            image: 'https://picsum.photos/seed/ord-gpu2/200/200',
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
            image: 'https://picsum.photos/seed/ord-case/200/200',
            title: 'NZXT H7 Flow ATX Mid Tower Keys',
            variant: 'Oq',
            price: 1_400_000,
            quantity: 1,
          },
          {
            image: 'https://picsum.photos/seed/ord-fan/200/200',
            title: 'Noctua NF-A12x25 PWM Fan (3-pack)',
            price: 850_000,
            quantity: 1,
          },
        ]}
        totalAmount={2_250_000}
        actions={[
          { label: 'Kuzatish', type: 'primary', onClick: () => {} },
        ]}
      />
    </div>
  ),
};

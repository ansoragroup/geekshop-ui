import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrderCard } from './DesktopOrderCard';

const meta = {
  title: 'Data Display (Desktop)/DesktopOrderCard',
  component: DesktopOrderCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onAction: { action: 'action clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopOrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProducts = [
  { id: '1', image: 'https://picsum.photos/seed/prod1/128/128', title: 'MSI RTX 4060 Ventus 2X' },
  { id: '2', image: 'https://picsum.photos/seed/prod2/128/128', title: 'AMD Ryzen 7 7800X3D' },
  { id: '3', image: 'https://picsum.photos/seed/prod3/128/128', title: 'Samsung 990 EVO 1TB' },
];

export const Default: Story = {
  args: {
    orderId: 'GS-2026-0047',
    status: 'delivered',
    products: defaultProducts,
    totalAmount: 23_700_000,
    date: '14 Mar 2026',
    actions: [
      { id: 'review', label: 'Write Review', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const Shipping: Story = {
  args: {
    orderId: 'GS-2026-0052',
    status: 'shipping',
    products: [
      { id: '1', image: 'https://picsum.photos/seed/ship1/128/128', title: 'MacBook Air M3 15"' },
      { id: '2', image: 'https://picsum.photos/seed/ship2/128/128', title: 'Apple Magic Mouse' },
    ],
    totalAmount: 25_100_000,
    date: '16 Mar 2026',
    actions: [
      { id: 'track', label: 'Track Order', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const Pending: Story = {
  args: {
    orderId: 'GS-2026-0055',
    status: 'pending',
    products: [
      { id: '1', image: 'https://picsum.photos/seed/pend1/128/128', title: 'Sony WH-1000XM5' },
    ],
    totalAmount: 4_200_000,
    date: '17 Mar 2026',
    actions: [
      { id: 'cancel', label: 'Cancel Order', variant: 'danger' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const Cancelled: Story = {
  args: {
    orderId: 'GS-2026-0041',
    status: 'cancelled',
    products: [
      { id: '1', image: 'https://picsum.photos/seed/can1/128/128', title: 'Logitech G Pro X Superlight' },
    ],
    totalAmount: 1_650_000,
    date: '8 Mar 2026',
    actions: [
      { id: 'reorder', label: 'Reorder', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    orderId: 'GS-2026-0039',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://picsum.photos/seed/many1/128/128', title: 'Product 1' },
      { id: '2', image: 'https://picsum.photos/seed/many2/128/128', title: 'Product 2' },
      { id: '3', image: 'https://picsum.photos/seed/many3/128/128', title: 'Product 3' },
      { id: '4', image: 'https://picsum.photos/seed/many4/128/128', title: 'Product 4' },
      { id: '5', image: 'https://picsum.photos/seed/many5/128/128', title: 'Product 5' },
      { id: '6', image: 'https://picsum.photos/seed/many6/128/128', title: 'Product 6' },
      { id: '7', image: 'https://picsum.photos/seed/many7/128/128', title: 'Product 7' },
      { id: '8', image: 'https://picsum.photos/seed/many8/128/128', title: 'Product 8' },
    ],
    totalAmount: 45_300_000,
    date: '5 Mar 2026',
    actions: [
      { id: 'review', label: 'Write Review', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

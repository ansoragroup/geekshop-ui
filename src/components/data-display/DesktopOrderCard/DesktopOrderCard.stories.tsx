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

// --- DEFAULT ---

export const Default: Story = {
  args: {
    orderId: 'GS-2026-0047',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=128&h=128&fit=crop', title: 'MSI RTX 4060 Ventus 2X' },
      { id: '2', image: 'https://images.unsplash.com/photo-1555618568-bce51e8e11c6?w=128&h=128&fit=crop', title: 'AMD Ryzen 7 7800X3D' },
      { id: '3', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=128&h=128&fit=crop', title: 'Samsung 990 EVO 1TB' },
    ],
    totalAmount: 23_700_000,
    date: '14 Mar 2026',
    actions: [
      { id: 'review', label: 'Write Review', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

// --- EVERY STATUS ---

export const StatusPending: Story = {
  name: 'Status: Pending',
  args: {
    orderId: 'GS-2026-0055',
    status: 'pending',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=128&h=128&fit=crop', title: 'Sony WH-1000XM5 Headphones' },
    ],
    totalAmount: 4_200_000,
    date: '17 Mar 2026',
    actions: [
      { id: 'cancel', label: 'Cancel Order', variant: 'danger' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const StatusProcessing: Story = {
  name: 'Status: Processing',
  args: {
    orderId: 'GS-2026-0061',
    status: 'processing',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=128&h=128&fit=crop', title: 'Logitech MX Master 3S' },
      { id: '2', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=128&h=128&fit=crop', title: 'Keychron Q1 Pro Keyboard' },
    ],
    totalAmount: 5_800_000,
    date: '18 Mar 2026',
    actions: [
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const StatusShipping: Story = {
  name: 'Status: Shipping',
  args: {
    orderId: 'GS-2026-0052',
    status: 'shipping',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=128&h=128&fit=crop', title: 'MacBook Air M3 15"' },
      { id: '2', image: 'https://images.unsplash.com/photo-1625723044792-b84a7c238e96?w=128&h=128&fit=crop', title: 'Apple Magic Mouse' },
    ],
    totalAmount: 25_100_000,
    date: '16 Mar 2026',
    actions: [
      { id: 'track', label: 'Track Order', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const StatusDelivered: Story = {
  name: 'Status: Delivered',
  args: {
    orderId: 'GS-2026-0043',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=128&h=128&fit=crop', title: 'Nike Air Max 270' },
    ],
    totalAmount: 1_890_000,
    date: '10 Mar 2026',
    actions: [
      { id: 'review', label: 'Write Review', variant: 'primary' },
      { id: 'reorder', label: 'Reorder', variant: 'secondary' },
    ],
  },
};

export const StatusCancelled: Story = {
  name: 'Status: Cancelled',
  args: {
    orderId: 'GS-2026-0041',
    status: 'cancelled',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=128&h=128&fit=crop', title: 'Logitech G Pro X Superlight' },
    ],
    totalAmount: 1_650_000,
    date: '8 Mar 2026',
    actions: [
      { id: 'reorder', label: 'Reorder', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const StatusReturned: Story = {
  name: 'Status: Returned',
  args: {
    orderId: 'GS-2026-0038',
    status: 'returned',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=128&h=128&fit=crop', title: 'Dell UltraSharp U2723QE Monitor' },
    ],
    totalAmount: 8_500_000,
    date: '5 Mar 2026',
    actions: [
      { id: 'reorder', label: 'Order Again', variant: 'primary' },
      { id: 'details', label: 'Return Details', variant: 'secondary' },
    ],
  },
};

// --- EDGE CASES ---

export const ManyItems: Story = {
  name: 'Many Items (8 Products, Overflow)',
  args: {
    orderId: 'GS-2026-0039',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=128&h=128&fit=crop', title: 'MSI RTX 4060 Ventus 2X' },
      { id: '2', image: 'https://images.unsplash.com/photo-1555618568-bce51e8e11c6?w=128&h=128&fit=crop', title: 'AMD Ryzen 7 7800X3D' },
      { id: '3', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=128&h=128&fit=crop', title: 'Samsung 990 EVO 1TB' },
      { id: '4', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=128&h=128&fit=crop', title: 'Corsair Vengeance DDR5 32GB' },
      { id: '5', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=128&h=128&fit=crop', title: 'NZXT H510 Case' },
      { id: '6', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=128&h=128&fit=crop', title: 'Corsair RM850x PSU' },
      { id: '7', image: 'https://images.unsplash.com/photo-1625723044792-b84a7c238e96?w=128&h=128&fit=crop', title: 'Noctua NH-D15 Cooler' },
      { id: '8', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=128&h=128&fit=crop', title: 'MSI MAG B650 Motherboard' },
    ],
    totalAmount: 45_300_000,
    date: '5 Mar 2026',
    actions: [
      { id: 'review', label: 'Write Review', variant: 'primary' },
      { id: 'details', label: 'View Details', variant: 'secondary' },
    ],
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    orderId: 'GS-2026-0070',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=128&h=128&fit=crop', title: 'Apple AirPods Pro 2nd Gen' },
    ],
    totalAmount: 3_900_000,
    date: '20 Mar 2026',
    actions: [
      { id: 'review', label: 'Write Review', variant: 'primary' },
    ],
  },
};

export const NoActions: Story = {
  name: 'No Action Buttons',
  args: {
    orderId: 'GS-2026-0035',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=128&h=128&fit=crop', title: 'Sony WH-1000XM5' },
    ],
    totalAmount: 4_200_000,
    date: '1 Mar 2026',
  },
};

export const HighTotal: Story = {
  name: 'Very High Total Amount',
  args: {
    orderId: 'GS-2026-0022',
    status: 'shipping',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=128&h=128&fit=crop', title: 'MacBook Pro M3 Max 16"' },
      { id: '2', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=128&h=128&fit=crop', title: 'Apple Pro Display XDR' },
    ],
    totalAmount: 125_000_000,
    date: '22 Mar 2026',
    actions: [
      { id: 'track', label: 'Track Shipment', variant: 'primary' },
    ],
  },
};

export const WithLink: Story = {
  name: 'With Link (href)',
  args: {
    orderId: 'GS-2026-0047',
    status: 'delivered',
    products: [
      { id: '1', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=128&h=128&fit=crop', title: 'MSI RTX 4060 Ventus 2X' },
    ],
    totalAmount: 12_500_000,
    date: '14 Mar 2026',
    href: '#',
    target: '_blank',
  },
};

// --- ALL STATUSES SIDE BY SIDE ---

export const AllStatuses: Story = {
  name: 'All Statuses Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['pending', 'processing', 'shipping', 'delivered', 'cancelled', 'returned'] as const).map((status, i) => (
        <DesktopOrderCard
          key={status}
          orderId={`GS-2026-00${40 + i}`}
          status={status}
          products={[
            { id: '1', image: `https://images.unsplash.com/photo-${1591488320449 + i * 1000}-011701bb6704?w=128&h=128&fit=crop`, title: `Product for ${status} order` },
          ]}
          totalAmount={(i + 1) * 3_500_000}
          date={`${10 + i} Mar 2026`}
        />
      ))}
    </div>
  ),
};

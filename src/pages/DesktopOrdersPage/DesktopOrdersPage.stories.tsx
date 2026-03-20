import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrdersPage } from './DesktopOrdersPage';
import type { Order } from '../_shared/types';

const meta = {
  title: 'Pages (Desktop)/DesktopOrdersPage',
  component: DesktopOrdersPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopOrdersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialOrders: [
      {
        id: 'GS-2026031901',
        status: 'delivered',
        items: [
          { id: '1', name: 'ASUS ROG Strix RTX 4070 Super 12GB', image: 'https://picsum.photos/seed/ord-gpu/160/160', price: 8_900_000, quantity: 1, variant: '12GB / Black' },
        ],
        totalPrice: 8_900_000,
        date: '19 mart, 2026',
      },
      {
        id: 'GS-2026031502',
        status: 'shipping',
        items: [
          { id: '2', name: 'Apple MacBook Air M3 15" 16GB', image: 'https://picsum.photos/seed/ord-mac/160/160', price: 18_900_000, quantity: 1, variant: 'Space Gray / 512GB' },
          { id: '3', name: 'Apple Magic Keyboard', image: 'https://picsum.photos/seed/ord-kb/160/160', price: 1_500_000, quantity: 1 },
        ],
        totalPrice: 20_400_000,
        date: '15 mart, 2026',
        trackingNumber: 'UZ9876543210',
      },
      {
        id: 'GS-2026030801',
        status: 'pending',
        items: [
          { id: '4', name: 'Samsung Galaxy S24 Ultra 256GB', image: 'https://picsum.photos/seed/ord-phone/160/160', price: 12_500_000, quantity: 1, variant: 'Titanium Black' },
        ],
        totalPrice: 12_500_000,
        date: '8 mart, 2026',
      },
      {
        id: 'GS-2026022001',
        status: 'delivered',
        items: [
          { id: '5', name: 'Sony WH-1000XM5 Headphones', image: 'https://picsum.photos/seed/ord-hp/160/160', price: 3_900_000, quantity: 1 },
        ],
        totalPrice: 3_900_000,
        date: '20 fevral, 2026',
      },
      {
        id: 'GS-2026011201',
        status: 'cancelled',
        items: [
          { id: '6', name: 'MSI RTX 4090 Suprim X 24GB', image: 'https://picsum.photos/seed/ord-gpu2/160/160', price: 22_000_000, quantity: 1 },
        ],
        totalPrice: 22_000_000,
        date: '12 yanvar, 2026',
      },
    ] satisfies Order[],
  },
};

export const NoOrders: Story = {
  name: 'No Orders',
  args: {
    initialOrders: [],
  },
};

export const WithPendingOrder: Story = {
  name: 'With Pending Orders',
  args: {
    initialOrders: [
      {
        id: 'GS-2026032101',
        status: 'pending',
        items: [
          { id: '1', name: 'Dell XPS 15 i9 32GB RTX 4070', image: 'https://picsum.photos/seed/pend-dell/160/160', price: 22_500_000, quantity: 1, variant: 'Silver / 1TB' },
          { id: '2', name: 'Dell TB16 Thunderbolt Dock', image: 'https://picsum.photos/seed/pend-dock/160/160', price: 3_200_000, quantity: 1 },
        ],
        totalPrice: 25_700_000,
        date: '21 mart, 2026',
      },
    ] satisfies Order[],
  },
};

export const WithDeliveredOrders: Story = {
  name: 'With Delivered Orders',
  args: {
    initialOrders: [
      {
        id: 'GS-2026031001',
        status: 'delivered',
        items: [
          { id: '1', name: 'Keychron Q1 Pro 75% Keyboard', image: 'https://picsum.photos/seed/del-kb/160/160', price: 1_850_000, quantity: 1 },
        ],
        totalPrice: 1_850_000,
        date: '10 mart, 2026',
      },
      {
        id: 'GS-2026020501',
        status: 'delivered',
        items: [
          { id: '2', name: 'Logitech MX Master 3S', image: 'https://picsum.photos/seed/del-mouse/160/160', price: 950_000, quantity: 2 },
        ],
        totalPrice: 1_900_000,
        date: '5 fevral, 2026',
      },
      {
        id: 'GS-2026011501',
        status: 'delivered',
        items: [
          { id: '3', name: 'Samsung 990 Pro 2TB NVMe SSD', image: 'https://picsum.photos/seed/del-ssd/160/160', price: 2_400_000, quantity: 1 },
        ],
        totalPrice: 2_400_000,
        date: '15 yanvar, 2026',
      },
    ] satisfies Order[],
  },
};

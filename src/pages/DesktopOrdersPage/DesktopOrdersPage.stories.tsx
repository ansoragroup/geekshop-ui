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
          {
            id: '1',
            name: 'ASUS ROG Strix RTX 4070 Super 12GB',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 8_900_000,
            quantity: 1,
            variant: '12GB / Black',
          },
        ],
        totalPrice: 8_900_000,
        date: '19 mart, 2026',
      },
      {
        id: 'GS-2026031502',
        status: 'shipping',
        items: [
          {
            id: '2',
            name: 'Apple MacBook Air M3 15" 16GB',
            image:
              'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop',
            price: 18_900_000,
            quantity: 1,
            variant: 'Space Gray / 512GB',
          },
          {
            id: '3',
            name: 'Apple Magic Keyboard',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 1_500_000,
            quantity: 1,
          },
        ],
        totalPrice: 20_400_000,
        date: '15 mart, 2026',
        trackingNumber: 'UZ9876543210',
      },
      {
        id: 'GS-2026030801',
        status: 'pending',
        items: [
          {
            id: '4',
            name: 'Samsung Galaxy S24 Ultra 256GB',
            image:
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&h=160&fit=crop',
            price: 12_500_000,
            quantity: 1,
            variant: 'Titanium Black',
          },
        ],
        totalPrice: 12_500_000,
        date: '8 mart, 2026',
      },
      {
        id: 'GS-2026022001',
        status: 'delivered',
        items: [
          {
            id: '5',
            name: 'Sony WH-1000XM5 Headphones',
            image:
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
            price: 3_900_000,
            quantity: 1,
          },
        ],
        totalPrice: 3_900_000,
        date: '20 fevral, 2026',
      },
      {
        id: 'GS-2026011201',
        status: 'cancelled',
        items: [
          {
            id: '6',
            name: 'MSI RTX 4090 Suprim X 24GB',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 22_000_000,
            quantity: 1,
          },
        ],
        totalPrice: 22_000_000,
        date: '12 yanvar, 2026',
      },
    ] satisfies Order[],
  },
};

export const NoOrders: Story = {
  args: {
    initialOrders: [],
  },
};

export const WithPendingOrders: Story = {
  name: 'All Pending',
  args: {
    initialOrders: [
      {
        id: 'GS-2026032101',
        status: 'pending',
        items: [
          {
            id: '1',
            name: 'Dell XPS 15 i9 32GB RTX 4070',
            image:
              'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop',
            price: 22_500_000,
            quantity: 1,
            variant: 'Silver / 1TB',
          },
          {
            id: '2',
            name: 'Dell TB16 Thunderbolt Dock',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 3_200_000,
            quantity: 1,
          },
        ],
        totalPrice: 25_700_000,
        date: '21 mart, 2026',
      },
      {
        id: 'GS-2026032102',
        status: 'pending',
        items: [
          {
            id: '3',
            name: 'Apple AirPods Pro 2nd Gen USB-C',
            image:
              'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=160&h=160&fit=crop',
            price: 2_800_000,
            quantity: 1,
          },
        ],
        totalPrice: 2_800_000,
        date: '21 mart, 2026',
      },
    ] satisfies Order[],
  },
};

export const WithDeliveredOrders: Story = {
  name: 'All Delivered',
  args: {
    initialOrders: [
      {
        id: 'GS-2026031001',
        status: 'delivered',
        items: [
          {
            id: '1',
            name: 'Keychron Q1 Pro 75% Keyboard',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 1_850_000,
            quantity: 1,
          },
        ],
        totalPrice: 1_850_000,
        date: '10 mart, 2026',
      },
      {
        id: 'GS-2026020501',
        status: 'delivered',
        items: [
          {
            id: '2',
            name: 'Logitech MX Master 3S',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 950_000,
            quantity: 2,
          },
        ],
        totalPrice: 1_900_000,
        date: '5 fevral, 2026',
      },
      {
        id: 'GS-2026011501',
        status: 'delivered',
        items: [
          {
            id: '3',
            name: 'Samsung 990 Pro 2TB NVMe SSD',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 2_400_000,
            quantity: 1,
          },
        ],
        totalPrice: 2_400_000,
        date: '15 yanvar, 2026',
      },
    ] satisfies Order[],
  },
};

export const AllCancelled: Story = {
  args: {
    initialOrders: [
      {
        id: 'GS-2026030501',
        status: 'cancelled',
        items: [
          {
            id: '1',
            name: 'Apple MacBook Pro 16" M3 Max 36GB 1TB',
            image:
              'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop',
            price: 42_000_000,
            quantity: 1,
          },
        ],
        totalPrice: 42_000_000,
        date: '5 mart, 2026',
      },
      {
        id: 'GS-2026022801',
        status: 'cancelled',
        items: [
          {
            id: '2',
            name: 'Canon EOS R6 Mark II Body',
            image:
              'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=160&h=160&fit=crop',
            price: 28_500_000,
            quantity: 1,
          },
        ],
        totalPrice: 28_500_000,
        date: '28 fevral, 2026',
      },
    ] satisfies Order[],
  },
};

export const ManyOrders: Story = {
  name: 'Many Orders (8)',
  args: {
    initialOrders: [
      {
        id: 'GS-2026032301',
        status: 'shipping',
        items: [
          {
            id: '1',
            name: 'Samsung Galaxy S24 Ultra 512GB',
            image:
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&h=160&fit=crop',
            price: 16_900_000,
            quantity: 1,
            variant: 'Titanium Violet',
          },
        ],
        totalPrice: 16_900_000,
        date: '23 mart, 2026',
        trackingNumber: 'UZ5555666677',
      },
      {
        id: 'GS-2026032001',
        status: 'pending',
        items: [
          {
            id: '2',
            name: 'Sony A7 IV Mirrorless Camera',
            image:
              'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=160&h=160&fit=crop',
            price: 24_000_000,
            quantity: 1,
          },
        ],
        totalPrice: 24_000_000,
        date: '20 mart, 2026',
      },
      {
        id: 'GS-2026031801',
        status: 'delivered',
        items: [
          {
            id: '3',
            name: 'ASUS ROG Strix RTX 4070 Super 12GB',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 8_900_000,
            quantity: 1,
          },
        ],
        totalPrice: 8_900_000,
        date: '18 mart, 2026',
      },
      {
        id: 'GS-2026031501',
        status: 'delivered',
        items: [
          {
            id: '4',
            name: 'Apple AirPods Pro 2',
            image:
              'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=160&h=160&fit=crop',
            price: 2_800_000,
            quantity: 2,
          },
        ],
        totalPrice: 5_600_000,
        date: '15 mart, 2026',
      },
      {
        id: 'GS-2026031001',
        status: 'delivered',
        items: [
          {
            id: '5',
            name: 'Keychron Q1 Pro 75%',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 1_850_000,
            quantity: 1,
          },
        ],
        totalPrice: 1_850_000,
        date: '10 mart, 2026',
      },
      {
        id: 'GS-2026030101',
        status: 'cancelled',
        items: [
          {
            id: '6',
            name: 'Trek Domane SL 5 Road Bike',
            image:
              'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=160&h=160&fit=crop',
            price: 35_000_000,
            quantity: 1,
          },
        ],
        totalPrice: 35_000_000,
        date: '1 mart, 2026',
      },
      {
        id: 'GS-2026020501',
        status: 'delivered',
        items: [
          {
            id: '7',
            name: 'Logitech MX Master 3S',
            image:
              'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
            price: 950_000,
            quantity: 1,
          },
        ],
        totalPrice: 950_000,
        date: '5 fevral, 2026',
      },
      {
        id: 'GS-2026011001',
        status: 'delivered',
        items: [
          {
            id: '8',
            name: 'Sony WH-1000XM5 Headphones',
            image:
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
            price: 3_900_000,
            quantity: 1,
          },
        ],
        totalPrice: 3_900_000,
        date: '10 yanvar, 2026',
      },
    ] satisfies Order[],
  },
};

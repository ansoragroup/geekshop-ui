import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrderDetailPage } from './DesktopOrderDetailPage';

const meta = {
  title: 'Pages (Desktop)/DesktopOrderDetailPage',
  component: DesktopOrderDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopOrderDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Processing: Story = {
  args: {
    orderId: 'GS-2026-1234',
    orderDate: 'March 21, 2026',
    status: 'Processing',
    statusStep: 1,
    paymentMethod: 'UzCard •••• 4523',
    steps: [
      { label: 'Order Placed', description: 'March 21, 2026' },
      { label: 'Processing', description: 'March 21, 2026' },
      { label: 'Shipped' },
      { label: 'Delivered' },
    ],
    items: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=160&h=160&fit=crop',
        name: 'ASUS ROG Strix RTX 4070 Super 12GB',
        quantity: 1,
        price: 8_900_000,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=160&h=160&fit=crop',
        name: 'Corsair Vengeance DDR5 32GB 6000MHz',
        quantity: 2,
        price: 2_200_000,
      },
    ],
    shippingAddress: {
      name: 'Bekzod Tursunov',
      phone: '+998 91 456 78 90',
      street: "Navoi ko'chasi, 42-uy",
      city: 'Samarqand',
      postal: '140100',
    },
  },
};

export const Shipped: Story = {
  args: {
    orderId: 'GS-2026-0987',
    orderDate: 'March 16, 2026',
    status: 'Shipped',
    statusStep: 2,
    paymentMethod: 'Humo •••• 8901',
    trackingNumber: 'UZ5678901234',
    steps: [
      { label: 'Order Placed', description: 'March 16, 2026' },
      { label: 'Processing', description: 'March 16, 2026' },
      { label: 'Shipped', description: 'March 17, 2026' },
      { label: 'Delivered', description: 'Expected March 20' },
    ],
    items: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=160&h=160&fit=crop',
        name: 'Apple MacBook Pro 14" M3 Pro 18GB',
        quantity: 1,
        price: 23_000_000,
      },
    ],
    shippingAddress: {
      name: 'Nodira Karimova',
      phone: '+998 90 987 65 43',
      street: "Amir Temur ko'chasi, 15-uy",
      city: 'Toshkent',
      postal: '100000',
    },
  },
};

export const Delivered: Story = {
  args: {
    orderId: 'GS-2026-0456',
    orderDate: 'March 5, 2026',
    status: 'Delivered',
    statusStep: 3,
    paymentMethod: 'Payme',
    steps: [
      { label: 'Order Placed', description: 'March 5, 2026' },
      { label: 'Processing', description: 'March 5, 2026' },
      { label: 'Shipped', description: 'March 6, 2026' },
      { label: 'Delivered', description: 'March 8, 2026' },
    ],
    items: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
        name: 'Keychron Q1 Pro 75% Mechanical Keyboard',
        quantity: 1,
        price: 1_850_000,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=160&h=160&fit=crop',
        name: 'Logitech MX Master 3S Wireless Mouse',
        quantity: 1,
        price: 950_000,
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=160&h=160&fit=crop',
        name: 'Razer Gigantus V2 XXL Mouse Pad',
        quantity: 1,
        price: 350_000,
      },
    ],
    shippingAddress: {
      name: 'Alisher Navoiy',
      phone: '+998 71 234 56 78',
      street: "Mustaqillik ko'chasi, 59-uy",
      city: 'Toshkent',
      postal: '100115',
    },
  },
};

export const Cancelled: Story = {
  args: {
    orderId: 'GS-2026-0111',
    orderDate: 'February 20, 2026',
    status: 'Cancelled',
    statusStep: 0,
    paymentMethod: 'UzCard •••• 4523',
    cancellationReason: 'Customer request — found a better price elsewhere',
    steps: [
      { label: 'Order Placed', description: 'Feb 20, 2026' },
      { label: 'Cancelled', description: 'Feb 20, 2026' },
    ],
    items: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=160&h=160&fit=crop',
        name: 'MSI RTX 4090 Suprim X 24GB GDDR6X',
        quantity: 1,
        price: 22_000_000,
      },
    ],
    shippingAddress: {
      name: 'Jasur Karimov',
      phone: '+998 90 123 45 67',
      street: "Amir Temur ko'chasi, 15-uy",
      city: 'Toshkent',
      postal: '100000',
    },
  },
};

export const ReturnRequested: Story = {
  args: {
    orderId: 'GS-2026-0789',
    orderDate: 'March 1, 2026',
    status: 'Return In Progress',
    statusStep: 3,
    paymentMethod: 'Humo •••• 8901',
    returnStatus:
      'Return approved, awaiting pickup — refund will be processed within 5 business days',
    steps: [
      { label: 'Order Placed', description: 'March 1, 2026' },
      { label: 'Delivered', description: 'March 4, 2026' },
      { label: 'Return Requested', description: 'March 10, 2026' },
      { label: 'Return Approved', description: 'March 11, 2026' },
    ],
    items: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=160&h=160&fit=crop',
        name: 'LG UltraGear 27" 4K 160Hz Monitor',
        quantity: 1,
        price: 8_500_000,
      },
    ],
    shippingAddress: {
      name: 'Aziza Rustamova',
      phone: '+998 93 111 22 33',
      street: "Bobur ko'chasi, 12-uy",
      city: 'Namangan',
      postal: '160100',
    },
  },
};

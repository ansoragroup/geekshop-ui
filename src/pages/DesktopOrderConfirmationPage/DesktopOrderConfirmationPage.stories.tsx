import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrderConfirmationPage } from './DesktopOrderConfirmationPage';

const meta = {
  title: 'Pages (Desktop)/DesktopOrderConfirmationPage',
  component: DesktopOrderConfirmationPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopOrderConfirmationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {},
};

export const WithInstallment: Story = {
  name: 'With Installment',
  args: {
    orderId: 'GS-2024-9012',
    paymentMethod: 'Humo •••• 8901 (Installment)',
    withInstallment: true,
    installmentMonths: 6,
    items: [
      { id: '1', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop', name: 'Apple MacBook Pro 14" M3 Pro 18GB', quantity: 1, price: 23_000_000 },
      { id: '2', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=160&h=160&fit=crop', name: 'MacBook Pro 14" Leather Sleeve', quantity: 1, price: 850_000 },
    ],
    shippingAddress: {
      name: 'Bekzod Tursunov',
      phone: '+998 91 456 78 90',
      street: "Navoiy ko'chasi, 42-uy",
      city: 'Samarqand',
      postal: '140100',
    },
    contactPhone: '+998 91 456 78 90',
  },
};

export const ExpressDelivery: Story = {
  name: 'Express Delivery',
  args: {
    orderId: 'GS-2024-3456',
    estimatedDelivery: '1-2 business days',
    expressDelivery: true,
    paymentMethod: 'Payme',
    items: [
      { id: '1', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop', name: 'Keychron Q1 Pro 75% Mechanical Keyboard', quantity: 1, price: 1_850_000 },
    ],
    shippingAddress: {
      name: 'Nodira Karimova',
      phone: '+998 90 987 65 43',
      street: "Amir Temur ko'chasi, 15-uy",
      city: 'Toshkent',
      postal: '100000',
    },
    contactPhone: '+998 90 987 65 43',
  },
};

export const MultiItemOrder: Story = {
  name: 'Multi-Item Order (5 items)',
  args: {
    orderId: 'GS-2024-7890',
    estimatedDelivery: '5-7 business days',
    paymentMethod: 'UzCard •••• 1234',
    items: [
      { id: '1', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop', name: 'Apple MacBook Air M3 15" 16GB 512GB', quantity: 1, price: 18_900_000 },
      { id: '2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop', name: 'Sony WH-1000XM5 Wireless Headphones', quantity: 1, price: 3_900_000 },
      { id: '3', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop', name: 'Logitech MX Master 3S Wireless Mouse', quantity: 2, price: 950_000 },
      { id: '4', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=160&h=160&fit=crop', name: 'Apple AirPods Pro 2nd Gen USB-C', quantity: 1, price: 2_800_000 },
      { id: '5', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop', name: 'Samsung 990 Pro 2TB NVMe SSD', quantity: 1, price: 2_400_000 },
    ],
    shippingAddress: {
      name: 'Dilmurod Xasanov',
      phone: '+998 71 200 33 44',
      street: "Minor ko'chasi, 7-uy, 12-xonadon",
      city: 'Tashkent, Uzbekistan',
      postal: '100060',
    },
    contactPhone: '+998 71 200 33 44',
  },
};

export const InstallmentExpress: Story = {
  name: 'Installment + Express',
  args: {
    orderId: 'GS-2024-1111',
    estimatedDelivery: '1-2 business days',
    expressDelivery: true,
    paymentMethod: 'UzCard •••• 7712 (Installment)',
    withInstallment: true,
    installmentMonths: 12,
    items: [
      { id: '1', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&h=160&fit=crop', name: 'Samsung Galaxy S24 Ultra 512GB', quantity: 1, price: 16_900_000 },
      { id: '2', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=160&h=160&fit=crop', name: 'Samsung Galaxy Buds3 Pro', quantity: 1, price: 2_200_000 },
    ],
    shippingAddress: {
      name: 'Sardor Azimov',
      phone: '+998 93 777 88 99',
      street: "Buyuk Turon ko'chasi, 55-A",
      city: 'Tashkent, Uzbekistan',
      postal: '100015',
    },
    contactPhone: '+998 93 777 88 99',
  },
};

export const CashPayment: Story = {
  name: 'Cash on Delivery',
  args: {
    orderId: 'GS-2024-2222',
    estimatedDelivery: '3-5 business days',
    paymentMethod: 'Naqd pul (Yetkazib berishda)',
    items: [
      { id: '1', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop', name: 'Razer DeathAdder V3 HyperSpeed Mouse', quantity: 1, price: 1_200_000 },
    ],
    shippingAddress: {
      name: 'Fotima Karimova',
      phone: '+998 95 444 55 66',
      street: "Istiqlol ko'chasi, 12-A",
      city: 'Bukhara, Uzbekistan',
      postal: '200100',
    },
    contactPhone: '+998 95 444 55 66',
  },
};

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
      { id: '1', image: 'https://picsum.photos/seed/inst-laptop/160/160', name: 'Apple MacBook Pro 14" M3 Pro 18GB', quantity: 1, price: 23_000_000 },
      { id: '2', image: 'https://picsum.photos/seed/inst-case/160/160', name: 'MacBook Pro 14" Leather Sleeve', quantity: 1, price: 850_000 },
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
      { id: '1', image: 'https://picsum.photos/seed/exp-kb/160/160', name: 'Keychron Q1 Pro 75% Mechanical Keyboard', quantity: 1, price: 1_850_000 },
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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { QRCode } from './QRCode';

const meta = {
  title: 'Data Display/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F5F5F5', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'https://geekshop.uz',
    size: 200,
  },
};

export const ProductLink: Story = {
  args: {
    value: 'https://geekshop.uz/product/iphone-15-pro-max',
    size: 200,
  },
};

export const SmallSize: Story = {
  args: {
    value: 'https://geekshop.uz',
    size: 120,
  },
};

export const LargeSize: Story = {
  args: {
    value: 'https://geekshop.uz/referral/ABC123',
    size: 280,
  },
};

export const CustomColors: Story = {
  args: {
    value: 'https://geekshop.uz',
    size: 200,
    color: '#FF5000',
    bgColor: '#FFF5F0',
  },
};

export const WithLogo: Story = {
  args: {
    value: 'https://geekshop.uz/pickup/order-12345',
    size: 200,
    logo: 'https://placehold.co/48x48/FF5000/FFFFFF?text=GS',
  },
};

export const HighErrorCorrection: Story = {
  args: {
    value: 'https://geekshop.uz/payment/QR12345',
    size: 200,
    errorLevel: 'H',
  },
};

export const PlainText: Story = {
  args: {
    value: 'Buyurtma raqami: #GS-2024-12345',
    size: 200,
  },
};

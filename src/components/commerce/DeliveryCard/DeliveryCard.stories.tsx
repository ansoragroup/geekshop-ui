import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeliveryCard } from './DeliveryCard';

const meta = {
  title: 'Commerce/DeliveryCard',
  component: DeliveryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    carrier: 'FedEx Express',
    trackingNumber: 'FX1234567890',
    status: 'inTransit',
    estimatedDate: '2026-03-18',
    lastUpdate: '2 soat oldin',
    lastLocation: 'Toshkent, saralash markazi',
    onTrack: () => console.log('Track'),
    onCopy: () => console.log('Copy'),
  },
};

export const Pending: Story = {
  args: {
    carrier: 'CDEK',
    trackingNumber: 'CDEK98765432',
    status: 'pending',
    estimatedDate: '2026-03-20',
    onTrack: () => console.log('Track'),
    onCopy: () => console.log('Copy'),
  },
};

export const Shipped: Story = {
  args: {
    carrier: 'DHL International',
    trackingNumber: 'DHL5678901234',
    status: 'shipped',
    estimatedDate: '2026-03-22',
    lastUpdate: '6 soat oldin',
    lastLocation: 'Xitoy, Shenzhen ombori',
    onTrack: () => console.log('Track'),
    onCopy: () => console.log('Copy'),
  },
};

export const Delivered: Story = {
  args: {
    carrier: 'UzPost',
    trackingNumber: 'UZP000111222',
    status: 'delivered',
    lastUpdate: 'Bugun, 14:30',
    lastLocation: "Toshkent, Mirzo Ulug'bek tumani",
    onCopy: () => console.log('Copy'),
  },
};

export const NoTrackButton: Story = {
  args: {
    carrier: 'Local Courier',
    trackingNumber: 'LC00001',
    status: 'inTransit',
    estimatedDate: 'Bugun',
    onCopy: () => navigator.clipboard.writeText('LC00001'),
  },
};

export const AllStatuses = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <DeliveryCard
      carrier="CDEK"
      trackingNumber="CDEK111"
      status="pending"
      estimatedDate="2026-03-20"
      onTrack={() => {}}
      onCopy={() => {}}
    />
    <DeliveryCard
      carrier="DHL"
      trackingNumber="DHL222"
      status="shipped"
      lastUpdate="5 soat oldin"
      estimatedDate="2026-03-22"
      onTrack={() => {}}
      onCopy={() => {}}
    />
    <DeliveryCard
      carrier="FedEx"
      trackingNumber="FX333"
      status="inTransit"
      lastUpdate="1 soat oldin"
      lastLocation="Toshkent, tranzit"
      estimatedDate="2026-03-18"
      onTrack={() => {}}
      onCopy={() => {}}
    />
    <DeliveryCard
      carrier="UzPost"
      trackingNumber="UZ444"
      status="delivered"
      lastUpdate="Bugun, 14:30"
      lastLocation="Yetkazildi"
      onCopy={() => {}}
    />
  </div>
);

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopDeliveryCard } from './DesktopDeliveryCard';

const meta = {
  title: 'Commerce (Desktop)/DesktopDeliveryCard',
  component: DesktopDeliveryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [(Story) => (
    <div style={{ width: 800, padding: 24, background: '#f5f5f5' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopDeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    carrier: 'DHL Express',
    trackingNumber: 'DHL-2024-0567-8901',
    status: 'inTransit',
    estimatedDate: 'March 20, 2026',
    lastUpdate: '2 hours ago',
    lastLocation: 'Tashkent Distribution Center',
    onTrack: fn(),
    onCopy: fn(),
  },
};

export const Pending: Story = {
  args: {
    carrier: 'FedEx',
    trackingNumber: 'FDX-9876-5432-1001',
    status: 'pending',
    estimatedDate: 'March 22, 2026',
    onTrack: fn(),
    onCopy: fn(),
  },
};

export const Shipped: Story = {
  args: {
    carrier: 'UPS Ground',
    trackingNumber: 'UPS-1234-5678-9012',
    status: 'shipped',
    estimatedDate: 'March 21, 2026',
    lastUpdate: '1 day ago',
    lastLocation: 'Samarkand Sorting Facility',
    onTrack: fn(),
    onCopy: fn(),
  },
};

export const Delivered: Story = {
  args: {
    carrier: 'Uzbekistan Post',
    trackingNumber: 'UZP-2024-1122-3344',
    status: 'delivered',
    lastUpdate: 'Today at 14:30',
    lastLocation: 'Delivered to recipient',
    onTrack: fn(),
    onCopy: fn(),
  },
};

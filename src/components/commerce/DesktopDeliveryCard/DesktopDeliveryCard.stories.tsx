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

/** In transit: progress at step 2 of 4, with estimated date, last update, and location. */
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

/** Pending: order placed, not yet shipped. */
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

/** Shipped: package picked up by carrier. */
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

/** Delivered: all steps completed, green status. */
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

/** All props filled: full tracking details. */
export const FullFeatured: Story = {
  args: {
    carrier: 'DPD International',
    trackingNumber: 'DPD-UZ-2026-03-25-0001',
    status: 'inTransit',
    estimatedDate: 'March 27, 2026',
    lastUpdate: '35 minutes ago',
    lastLocation: 'Customs clearance - Tashkent International Airport',
    onTrack: fn(),
    onCopy: fn(),
  },
};

/** Minimal: no estimated date, no last update, no location. */
export const Minimal: Story = {
  args: {
    carrier: 'Local Courier',
    trackingNumber: 'LC-0001',
    status: 'pending',
    onTrack: fn(),
    onCopy: fn(),
  },
};

/** Without track button. */
export const NoTrackButton: Story = {
  args: {
    carrier: 'Express Delivery Co.',
    trackingNumber: 'EDC-5555-6666',
    status: 'shipped',
    estimatedDate: 'Tomorrow',
    lastUpdate: '6 hours ago',
    lastLocation: 'Bukhara Processing Center',
    onCopy: fn(),
  },
};

/** Without copy button. */
export const NoCopyButton: Story = {
  args: {
    carrier: 'Amazon Logistics',
    trackingNumber: 'AMZ-TBA-001234567',
    status: 'inTransit',
    estimatedDate: 'March 26, 2026',
    lastUpdate: '1 hour ago',
    lastLocation: 'Out for delivery',
    onTrack: fn(),
  },
};

/** All 4 statuses stacked for visual comparison. */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopDeliveryCard
        carrier="Order #1001"
        trackingNumber="TRK-PENDING-001"
        status="pending"
        estimatedDate="March 28, 2026"
        onTrack={fn()}
        onCopy={fn()}
      />
      <DesktopDeliveryCard
        carrier="Order #1002"
        trackingNumber="TRK-SHIPPED-002"
        status="shipped"
        estimatedDate="March 25, 2026"
        lastUpdate="Yesterday"
        lastLocation="Carrier pickup complete"
        onTrack={fn()}
        onCopy={fn()}
      />
      <DesktopDeliveryCard
        carrier="Order #1003"
        trackingNumber="TRK-TRANSIT-003"
        status="inTransit"
        estimatedDate="March 24, 2026"
        lastUpdate="3 hours ago"
        lastLocation="Tashkent Hub"
        onTrack={fn()}
        onCopy={fn()}
      />
      <DesktopDeliveryCard
        carrier="Order #1004"
        trackingNumber="TRK-DELIVERED-004"
        status="delivered"
        lastUpdate="Today at 10:15"
        lastLocation="Signed by: Alisher N."
        onTrack={fn()}
        onCopy={fn()}
      />
    </div>
  ),
};

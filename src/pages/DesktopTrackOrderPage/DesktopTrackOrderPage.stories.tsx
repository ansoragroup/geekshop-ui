import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTrackOrderPage } from './DesktopTrackOrderPage';

const meta = {
  title: 'Pages (Desktop)/DesktopTrackOrderPage',
  component: DesktopTrackOrderPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopTrackOrderPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTransit: Story = {
  args: {
    currentStep: 2,
    trackingNumber: 'UZ9876543210',
    steps: [
      { label: 'Order Placed', description: 'March 18, 2026' },
      { label: 'Processing', description: 'March 18, 2026' },
      { label: 'Shipped', description: 'March 19, 2026' },
      { label: 'In Transit', description: 'March 20, 2026' },
      { label: 'Delivered', description: 'Expected March 22' },
    ],
    events: [
      {
        title: 'In transit to Tashkent',
        description: 'Package departed from Bukhara sorting center',
        time: 'March 20, 11:30',
        status: 'active' as const,
      },
      {
        title: 'Arrived at Bukhara facility',
        description: 'Package received at regional distribution center',
        time: 'March 19, 22:00',
        status: 'completed' as const,
      },
      {
        title: 'Shipped',
        description: 'Package picked up from warehouse',
        time: 'March 19, 09:15',
        status: 'completed' as const,
      },
      {
        title: 'Order placed',
        description: 'Order #GS-2026-0318-005 confirmed',
        time: 'March 18, 14:20',
        status: 'completed' as const,
      },
    ],
  },
};

export const Delivered: Story = {
  args: {
    currentStep: 4,
    trackingNumber: 'UZ1111222233',
    steps: [
      { label: 'Order Placed', description: 'March 10, 2026' },
      { label: 'Processing', description: 'March 10, 2026' },
      { label: 'Shipped', description: 'March 11, 2026' },
      { label: 'Out for Delivery', description: 'March 13, 2026' },
      { label: 'Delivered', description: 'March 13, 2026' },
    ],
    events: [
      {
        title: 'Delivered',
        description: 'Package delivered to recipient at front door',
        time: 'March 13, 15:30',
        status: 'active' as const,
      },
      {
        title: 'Out for delivery',
        description: 'Package on the way to Chilonzor, Tashkent',
        time: 'March 13, 08:00',
        status: 'completed' as const,
      },
      {
        title: 'Arrived at local facility',
        description: 'Tashkent Central Hub',
        time: 'March 12, 23:45',
        status: 'completed' as const,
      },
      {
        title: 'In transit',
        description: 'Package in transit from Namangan',
        time: 'March 11, 16:00',
        status: 'completed' as const,
      },
      {
        title: 'Shipped',
        description: 'Package picked up by courier',
        time: 'March 11, 10:00',
        status: 'completed' as const,
      },
      {
        title: 'Order placed',
        description: 'Order #GS-2026-0310-003 confirmed',
        time: 'March 10, 12:00',
        status: 'completed' as const,
      },
    ],
  },
};

export const JustPlaced: Story = {
  name: 'Just Placed (Processing)',
  args: {
    currentStep: 0,
    trackingNumber: 'UZ0000000001',
    steps: [
      { label: 'Order Placed', description: 'March 25, 2026' },
      { label: 'Processing', description: 'Pending' },
      { label: 'Shipped', description: 'Pending' },
      { label: 'Out for Delivery', description: 'Pending' },
      { label: 'Delivered', description: 'Expected March 30' },
    ],
    events: [
      {
        title: 'Order placed',
        description: 'Order #GS-2026-0325-001 placed successfully. Awaiting payment confirmation.',
        time: 'March 25, 09:15',
        status: 'active' as const,
      },
    ],
  },
};

export const OutForDelivery: Story = {
  args: {
    currentStep: 3,
    trackingNumber: 'UZ5555666677',
    steps: [
      { label: 'Order Placed', description: 'March 20, 2026' },
      { label: 'Processing', description: 'March 20, 2026' },
      { label: 'Shipped', description: 'March 21, 2026' },
      { label: 'Out for Delivery', description: 'March 24, 2026' },
      { label: 'Delivered', description: 'Expected today' },
    ],
    events: [
      {
        title: 'Out for delivery',
        description:
          'Courier is on the way to Mirzo Ulugbek, Tashkent. Estimated arrival: 14:00-16:00',
        time: 'March 24, 09:30',
        status: 'active' as const,
      },
      {
        title: 'Arrived at local facility',
        description: 'Tashkent North Distribution Center',
        time: 'March 23, 21:00',
        status: 'completed' as const,
      },
      {
        title: 'In transit',
        description: 'Package departed from Fergana regional hub',
        time: 'March 22, 08:45',
        status: 'completed' as const,
      },
      {
        title: 'Shipped',
        description: 'Package picked up from warehouse by courier',
        time: 'March 21, 11:00',
        status: 'completed' as const,
      },
      {
        title: 'Processing',
        description: 'Payment verified, packaging started',
        time: 'March 20, 15:00',
        status: 'completed' as const,
      },
      {
        title: 'Order placed',
        description: 'Order #GS-2026-0320-009 confirmed',
        time: 'March 20, 14:20',
        status: 'completed' as const,
      },
    ],
  },
};

export const LongDistanceShipping: Story = {
  name: 'Long Distance (Karakalpakstan)',
  args: {
    currentStep: 2,
    trackingNumber: 'UZ7777888899',
    steps: [
      { label: 'Order Placed', description: 'March 15, 2026' },
      { label: 'Processing', description: 'March 15, 2026' },
      { label: 'Shipped', description: 'March 16, 2026' },
      { label: 'In Transit', description: 'March 18, 2026' },
      { label: 'Delivered', description: 'Expected March 27' },
    ],
    events: [
      {
        title: 'In transit to Nukus',
        description: 'Package passed through Bukhara sorting center, heading to Karakalpakstan',
        time: 'March 18, 16:00',
        status: 'active' as const,
      },
      {
        title: 'In transit',
        description: 'Package departed Tashkent Central Hub via rail',
        time: 'March 17, 06:00',
        status: 'completed' as const,
      },
      {
        title: 'Shipped',
        description: 'Package consolidated at Tashkent warehouse',
        time: 'March 16, 14:30',
        status: 'completed' as const,
      },
      {
        title: 'Processing',
        description: 'Order packed and labeled',
        time: 'March 15, 18:00',
        status: 'completed' as const,
      },
      {
        title: 'Order placed',
        description: 'Order #GS-2026-0315-012 confirmed',
        time: 'March 15, 12:45',
        status: 'completed' as const,
      },
    ],
  },
};

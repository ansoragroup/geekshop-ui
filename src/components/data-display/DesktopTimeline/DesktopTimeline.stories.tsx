import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTimeline } from './DesktopTimeline';

const meta = {
  title: 'Data Display (Desktop)/DesktopTimeline',
  component: DesktopTimeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Order placed',
        content: 'Your order GS-2026-0047 has been confirmed and payment received.',
        date: '17 Mar 2026, 10:30',
        color: 'success',
      },
      {
        title: 'Processing started',
        content: 'Warehouse team is preparing your items for shipment.',
        date: '17 Mar 2026, 11:15',
        color: 'success',
      },
      {
        title: 'Shipped',
        content: 'Package handed to Uzbekiston Pochtasi. Tracking: UZ1234567890.',
        date: '18 Mar 2026, 09:00',
        color: 'primary',
      },
      {
        title: 'In transit',
        content: 'Package is on its way to Tashkent sorting center.',
        date: '18 Mar 2026, 14:30',
        color: 'default',
      },
      {
        title: 'Estimated delivery',
        content: 'Expected to arrive by 20 Mar 2026.',
        date: '20 Mar 2026',
        color: 'default',
      },
    ],
  },
};

export const Alternate: Story = {
  args: {
    mode: 'alternate',
    items: [
      {
        title: 'Company founded',
        content: 'GeekShop was established in Tashkent.',
        date: 'Jan 2024',
        color: 'primary',
      },
      {
        title: 'First 1,000 users',
        content: 'Reached our first milestone of registered users.',
        date: 'Apr 2024',
        color: 'success',
      },
      {
        title: 'Mobile app launch',
        content: 'iOS and Android apps released on app stores.',
        date: 'Aug 2024',
        color: 'primary',
      },
      {
        title: 'Series A funding',
        content: 'Raised $2M to expand operations across Central Asia.',
        date: 'Jan 2025',
        color: 'warning',
      },
      {
        title: '100K orders milestone',
        content: 'Processed our 100,000th order.',
        date: 'Mar 2026',
        color: 'success',
      },
    ],
  },
};

export const OrderTracking: Story = {
  args: {
    items: [
      {
        title: 'Delivered',
        content: 'Package was delivered to the recipient.',
        date: '20 Mar, 11:00',
        color: 'success',
      },
      {
        title: 'Out for delivery',
        content: 'Package is with the delivery courier.',
        date: '20 Mar, 08:30',
        color: 'success',
      },
      {
        title: 'Arrived at local hub',
        content: 'Tashkent distribution center.',
        date: '19 Mar, 22:00',
        color: 'success',
      },
      {
        title: 'In transit',
        content: 'On the way from Samarkand to Tashkent.',
        date: '19 Mar, 06:00',
        color: 'success',
      },
      {
        title: 'Picked up by courier',
        date: '18 Mar, 14:00',
        color: 'success',
      },
      {
        title: 'Order dispatched',
        date: '18 Mar, 09:00',
        color: 'success',
      },
    ],
  },
};

export const MixedColors: Story = {
  args: {
    items: [
      { title: 'Payment received', date: '10 Mar', color: 'success' },
      { title: 'Processing', content: 'Item being prepared.', date: '11 Mar', color: 'primary' },
      { title: 'Quality issue detected', content: 'Item failed inspection. Replacement requested.', date: '12 Mar', color: 'error' },
      { title: 'Replacement shipped', date: '13 Mar', color: 'warning' },
      { title: 'Delivered', date: '15 Mar', color: 'success' },
    ],
  },
};

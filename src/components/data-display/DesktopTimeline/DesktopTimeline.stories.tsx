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

export const SingleItem: Story = {
  name: 'Single Event',
  args: {
    items: [
      {
        title: 'Account created',
        content: 'Welcome to GeekShop! Your account has been successfully created.',
        date: '25 Mar 2026, 14:00',
        color: 'primary',
      },
    ],
  },
};

export const TitlesOnly: Story = {
  name: 'Titles Only (No Content — Dates)',
  args: {
    items: [
      { title: 'Step 1: Browse products' },
      { title: 'Step 2: Add to cart' },
      { title: 'Step 3: Checkout' },
      { title: 'Step 4: Payment' },
      { title: 'Step 5: Delivery' },
      { title: 'Step 6: Enjoy!' },
    ],
  },
};

export const AllColors: Story = {
  name: 'All Color Variants',
  args: {
    items: [
      { title: 'Default color event', content: 'This uses the default dot color.', date: 'Event 1', color: 'default' },
      { title: 'Primary color event', content: 'This uses the primary (orange) dot.', date: 'Event 2', color: 'primary' },
      { title: 'Success color event', content: 'This uses the success (green) dot.', date: 'Event 3', color: 'success' },
      { title: 'Warning color event', content: 'This uses the warning (amber) dot.', date: 'Event 4', color: 'warning' },
      { title: 'Error color event', content: 'This uses the error (red) dot.', date: 'Event 5', color: 'error' },
    ],
  },
};

export const LongContentItems: Story = {
  name: 'Long Content Text',
  args: {
    items: [
      {
        title: 'Customer support ticket opened',
        content: 'Customer reported that the MSI RTX 4060 Ventus 2X graphics card purchased on 10 Mar 2026 (Order #GS-2026-1847) is experiencing intermittent display artifacts during gaming. Customer has tried reinstalling drivers (version 551.86) and testing with different DisplayPort cables. Issue persists across multiple games including Cyberpunk 2077 and Baldur\'s Gate 3.',
        date: '15 Mar 2026, 09:30',
        color: 'warning',
      },
      {
        title: 'Technical assessment completed',
        content: 'Our technician diagnosed the GPU with a possible VRAM issue. Recommended RMA replacement under manufacturer warranty. Customer agreed to proceed with replacement. Return shipping label has been generated and sent to customer email.',
        date: '16 Mar 2026, 14:15',
        color: 'primary',
      },
      {
        title: 'Replacement shipped',
        content: 'New unit dispatched via express courier. Tracking number: UZ9876543210.',
        date: '18 Mar 2026, 10:00',
        color: 'success',
      },
    ],
  },
};

export const ReturnProcess: Story = {
  name: 'Product Return Timeline',
  args: {
    items: [
      { title: 'Return requested', content: 'Customer initiated return for Samsung Galaxy S24 Ultra (wrong color received).', date: '20 Mar, 10:00', color: 'primary' },
      { title: 'Return approved', content: 'Return request approved by support team. Prepaid shipping label emailed.', date: '20 Mar, 11:30', color: 'success' },
      { title: 'Package picked up', content: 'Courier collected the return package from customer address.', date: '21 Mar, 14:00', color: 'success' },
      { title: 'Received at warehouse', content: 'Package received and inspection initiated.', date: '22 Mar, 09:00', color: 'success' },
      { title: 'Inspection passed', content: 'Item in original condition. Refund approved.', date: '22 Mar, 11:30', color: 'success' },
      { title: 'Refund processed', content: '14,990,000 UZS refunded to original payment method. Please allow 3-5 business days.', date: '22 Mar, 12:00', color: 'success' },
    ],
  },
};

export const AlternateProductLaunch: Story = {
  name: 'Alternate: Product Launch Roadmap',
  args: {
    mode: 'alternate',
    items: [
      { title: 'Concept & Research', content: 'Market analysis and user research for the new product line.', date: 'Q1 2025', color: 'default' },
      { title: 'Design Phase', content: 'Industrial design, prototyping, and user testing completed.', date: 'Q2 2025', color: 'primary' },
      { title: 'Manufacturing', content: 'Production line setup and initial batch of 10,000 units.', date: 'Q3 2025', color: 'warning' },
      { title: 'Beta Launch', content: 'Limited release to 500 beta testers in Tashkent.', date: 'Q4 2025', color: 'primary' },
      { title: 'Public Launch', content: 'Full nationwide launch across all GeekShop channels.', date: 'Q1 2026', color: 'success' },
      { title: 'International Expansion', content: 'Launch in Kazakhstan and Kyrgyzstan markets.', date: 'Q2 2026', color: 'success' },
    ],
  },
};

export const ManyItems: Story = {
  name: 'Many Events (12)',
  args: {
    items: [
      { title: 'Order placed', date: '1 Mar, 10:00', color: 'success' },
      { title: 'Payment confirmed', date: '1 Mar, 10:02', color: 'success' },
      { title: 'Sent to warehouse', date: '1 Mar, 10:05', color: 'success' },
      { title: 'Picked from shelf', date: '1 Mar, 14:30', color: 'success' },
      { title: 'Quality check passed', date: '1 Mar, 15:00', color: 'success' },
      { title: 'Packed', date: '1 Mar, 15:20', color: 'success' },
      { title: 'Handed to courier', date: '1 Mar, 17:00', color: 'success' },
      { title: 'Departed Tashkent hub', date: '1 Mar, 20:00', color: 'success' },
      { title: 'Arrived Samarkand hub', date: '2 Mar, 06:00', color: 'success' },
      { title: 'Out for delivery', date: '2 Mar, 09:00', color: 'primary' },
      { title: 'Delivery attempted', content: 'Recipient not available. Will retry tomorrow.', date: '2 Mar, 12:30', color: 'warning' },
      { title: 'Delivered', content: 'Signed by: A. Karimov', date: '3 Mar, 10:15', color: 'success' },
    ],
  },
};

export const CustomIcons: Story = {
  name: 'With Custom Icons',
  args: {
    items: [
      {
        title: 'Firmware update available',
        content: 'Version 2.1.0 is ready to install.',
        date: '24 Mar 2026',
        color: 'primary',
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v6M3 4l3 3 3-3M2 9h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: 'Update installed successfully',
        content: 'Device restarted. All systems operational.',
        date: '24 Mar 2026',
        color: 'success',
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        title: 'Next update scheduled',
        content: 'Version 2.2.0 expected in April 2026.',
        date: 'Upcoming',
        color: 'default',
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 3.5v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
};

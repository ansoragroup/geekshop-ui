import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFloatingBubble } from './DesktopFloatingBubble';

const meta = {
  title: 'Feedback (Desktop)/DesktopFloatingBubble',
  component: DesktopFloatingBubble,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: 400, background: '#f5f5f5', position: 'relative' }}>
        <div style={{ padding: 24 }}>
          <p style={{ color: '#666', fontSize: 14 }}>Hover over the floating button in the bottom-right corner to see it expand.</p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopFloatingBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Customer Support',
    onClick: () => console.log('Bubble clicked'),
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.964L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="15.5" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    label: 'Live Chat Support',
    badgeCount: 5,
    offset: { right: 32, bottom: 32 },
    onClick: () => console.log('Chat clicked'),
  },
};

export const WithBadge: Story = {
  name: 'With Badge Count (3)',
  args: {
    label: 'Messages',
    badgeCount: 3,
    onClick: () => console.log('Messages clicked'),
  },
};

export const HighBadgeCount: Story = {
  name: 'High Badge Count (150 = 99+)',
  args: {
    label: 'Notifications',
    badgeCount: 150,
    onClick: () => console.log('Notifications clicked'),
  },
};

export const ZeroBadge: Story = {
  name: 'Zero Badge Count (Hidden)',
  args: {
    label: 'Messages',
    badgeCount: 0,
    onClick: () => console.log('Messages clicked'),
  },
};

export const CustomIcon: Story = {
  name: 'Custom Star Icon',
  args: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Leave Feedback',
    onClick: () => console.log('Feedback clicked'),
  },
};

export const CartIcon: Story = {
  name: 'Custom Cart Icon',
  args: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3h2l2.5 12h11l2-9H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      </svg>
    ),
    label: 'Quick Cart',
    badgeCount: 7,
    onClick: () => console.log('Cart clicked'),
  },
};

export const CustomOffset: Story = {
  name: 'Custom Offset (80px from edges)',
  args: {
    label: 'Help',
    offset: { right: 80, bottom: 80 },
    onClick: () => console.log('Help clicked'),
  },
};

export const NoLabel: Story = {
  name: 'Without Label',
  args: {
    badgeCount: 2,
    onClick: () => console.log('Clicked'),
  },
};

export const NoLabelNoBadge: Story = {
  name: 'Minimal (No Label, No Badge)',
  args: {
    onClick: () => console.log('Clicked'),
  },
};

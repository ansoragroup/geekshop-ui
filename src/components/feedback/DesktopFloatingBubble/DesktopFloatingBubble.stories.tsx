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

export const WithBadge: Story = {
  args: {
    label: 'Messages',
    badgeCount: 3,
    onClick: () => console.log('Messages clicked'),
  },
};

export const HighBadgeCount: Story = {
  args: {
    label: 'Notifications',
    badgeCount: 150,
    onClick: () => console.log('Notifications clicked'),
  },
};

export const CustomIcon: Story = {
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

export const CustomOffset: Story = {
  args: {
    label: 'Help',
    offset: { right: 80, bottom: 80 },
    onClick: () => console.log('Help clicked'),
  },
};

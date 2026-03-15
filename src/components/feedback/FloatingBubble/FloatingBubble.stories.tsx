import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloatingBubble } from './FloatingBubble';

const meta = {
  title: 'Feedback/FloatingBubble',
  component: FloatingBubble,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, height: 600, position: 'relative', background: '#F5F5F5', overflow: 'hidden', borderRadius: 12 }}>
        <div style={{ padding: 24 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, color: '#1A1A1A' }}>GeekShop</h3>
          <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
            Drag the bubble to move it. Release near an edge to dock it.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert('Chat opened!'),
  },
};

export const WithBadge: Story = {
  args: {
    badge: 3,
    onClick: () => alert('3 new messages!'),
  },
};

export const LargeBadge: Story = {
  args: {
    badge: 128,
  },
};

export const CustomIcon: Story = {
  args: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94M5 2H3a1 1 0 00-1 1v2.28a1 1 0 00.684.948l4.493 1.498a1 1 0 001.21-.502l1.345-2.69a1 1 0 00-.149-1.113L7.89 2.353A1 1 0 007.132 2H5zM16.5 14.5l-2.69 1.346a1 1 0 01-1.113-.15L9.57 12.884A17.7 17.7 0 0111.11 9.57" />
      </svg>
    ),
    badge: 1,
  },
};

export const CustomPosition: Story = {
  args: {
    position: { right: 24, bottom: 120 },
    badge: 5,
  },
};

export const NonMagnetic: Story = {
  args: {
    magnetic: false,
    badge: 2,
  },
};

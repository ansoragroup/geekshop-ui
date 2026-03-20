import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopEmpty } from './DesktopEmpty';

const meta = {
  title: 'Feedback (Desktop)/DesktopEmpty',
  component: DesktopEmpty,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 800, padding: 24, background: '#ffffff', borderRadius: 12, border: '1px solid #eee' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No data available',
    description: 'There are no items to display at the moment. Try adjusting your filters or check back later.',
  },
};

export const EmptyCart: Story = {
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#FFF5F0" />
        <path d="M45 52h12l6 6h36l-4 32H58l-7-32H45" stroke="#FF5000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="66" cy="100" r="4" fill="#FF5000" />
        <circle cx="90" cy="100" r="4" fill="#FF5000" />
        <path d="M70 74h20M80 64v20" stroke="#FF5000" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    title: 'Your cart is empty',
    description: 'Looks like you haven\'t added any items to your cart yet. Start shopping to find amazing deals!',
    actionText: 'Browse Products',
    onAction: () => console.log('Browse clicked'),
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#F5F5F5" />
        <circle cx="72" cy="72" r="24" stroke="#CCCCCC" strokeWidth="3.5" fill="none" />
        <path d="M90 90l16 16" stroke="#CCCCCC" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M64 68h16M64 78h10" stroke="#D4D4D4" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'No results found',
    description: 'We couldn\'t find anything matching your search. Try different keywords or browse our categories.',
    actionText: 'Clear Search',
    onAction: () => console.log('Clear search'),
  },
};

export const NoOrders: Story = {
  args: {
    title: 'No orders yet',
    description: 'You haven\'t placed any orders. When you do, they will appear here so you can track and manage them.',
    actionText: 'Start Shopping',
    onAction: () => console.log('Start shopping'),
  },
};

export const MinimalWithoutAction: Story = {
  args: {
    title: 'No notifications',
    description: 'You\'re all caught up! Check back later for new updates.',
  },
};

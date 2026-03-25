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
      <div
        style={{
          width: 800,
          padding: 24,
          background: '#ffffff',
          borderRadius: 12,
          border: '1px solid #eee',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- DEFAULT ---

export const Default: Story = {
  args: {
    title: 'No data available',
    description:
      'There are no items to display at the moment. Try adjusting your filters or check back later.',
  },
};

// --- FULL FEATURED ---

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#FFF5F0" />
        <path
          d="M45 52h12l6 6h36l-4 32H58l-7-32H45"
          stroke="#FF5000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="66" cy="100" r="4" fill="#FF5000" />
        <circle cx="90" cy="100" r="4" fill="#FF5000" />
        <path
          d="M70 74h20M80 64v20"
          stroke="#FF5000"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    ),
    title: 'Your cart is empty',
    description:
      "Looks like you haven't added any items to your cart yet. Start shopping to find amazing deals!",
    actionText: 'Browse Products',
    onAction: () => console.log('Browse clicked'),
  },
};

// --- EMPTY CART ---

export const EmptyCart: Story = {
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#FFF5F0" />
        <path
          d="M45 52h12l6 6h36l-4 32H58l-7-32H45"
          stroke="#FF5000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="66" cy="100" r="4" fill="#FF5000" />
        <circle cx="90" cy="100" r="4" fill="#FF5000" />
        <path
          d="M70 74h20M80 64v20"
          stroke="#FF5000"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    ),
    title: 'Your cart is empty',
    description:
      "Looks like you haven't added any items to your cart yet. Start shopping to find amazing deals!",
    actionText: 'Browse Products',
    onAction: () => console.log('Browse clicked'),
  },
};

// --- NO SEARCH RESULTS ---

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
    description:
      'We couldn\'t find anything matching "RTX 5090 Ti". Try different keywords or browse our categories.',
    actionText: 'Clear Search',
    onAction: () => console.log('Clear search'),
  },
};

// --- NO ORDERS ---

export const NoOrders: Story = {
  name: 'No Orders Yet',
  args: {
    title: 'No orders yet',
    description:
      "You haven't placed any orders. When you do, they will appear here so you can track and manage them.",
    actionText: 'Start Shopping',
    onAction: () => console.log('Start shopping'),
  },
};

// --- EMPTY WISHLIST ---

export const EmptyWishlist: Story = {
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#FFF0F3" />
        <path
          d="M80 120s-30-20-40-40c-6-12-2-28 10-32s20 2 28 14l2 3 2-3c8-12 16-18 28-14s16 20 10 32c-10 20-40 40-40 40z"
          stroke="#FF3B70"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Your wishlist is empty',
    description:
      'Save items you love by tapping the heart icon on any product. They will appear here for easy access.',
    actionText: 'Explore Products',
    onAction: () => console.log('Explore'),
  },
};

// --- NO NOTIFICATIONS ---

export const NoNotifications: Story = {
  args: {
    title: 'No notifications',
    description:
      "You're all caught up! Check back later for order updates, promotions, and new arrivals.",
  },
};

// --- NO REVIEWS ---

export const NoReviews: Story = {
  name: 'No Reviews for Product',
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#FFFBEB" />
        <path
          d="M80 45l8.5 17.2L108 65l-14 13.6 3.3 19.4L80 89.3 62.7 98l3.3-19.4L52 65l19.5-2.8L80 45z"
          stroke="#FFC107"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'No reviews yet',
    description:
      'Be the first to review this product! Share your experience to help other shoppers make informed decisions.',
    actionText: 'Write a Review',
    onAction: () => console.log('Write review'),
  },
};

// --- MINIMAL ---

export const MinimalTitleOnly: Story = {
  name: 'Minimal (Title Only)',
  args: {
    title: 'Nothing here',
  },
};

// --- WITHOUT ACTION ---

export const WithoutAction: Story = {
  name: 'Without Action Button',
  args: {
    title: 'No saved addresses',
    description: "You haven't saved any delivery addresses yet. Add one during your next checkout.",
  },
};

// --- CUSTOM ICON ---

export const CustomIcon: Story = {
  name: 'Custom SVG Icon',
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#EFF6FF" />
        <rect
          x="50"
          y="55"
          width="60"
          height="45"
          rx="6"
          stroke="#1890FF"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M50 70l30 20 30-20"
          stroke="#1890FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Inbox is empty',
    description: 'No new messages. All conversations are up to date.',
    actionText: 'Compose Message',
    onAction: () => console.log('Compose'),
  },
};

// --- ERROR STATE EMPTY ---

export const ConnectionError: Story = {
  args: {
    icon: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" fill="#FFF0F0" />
        <path
          d="M60 60l40 40M100 60L60 100"
          stroke="#FF3B30"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="80" cy="80" r="30" stroke="#FF3B30" strokeWidth="3" fill="none" />
      </svg>
    ),
    title: 'Connection lost',
    description: "We couldn't load your data. Please check your internet connection and try again.",
    actionText: 'Retry',
    onAction: () => console.log('Retry'),
  },
};

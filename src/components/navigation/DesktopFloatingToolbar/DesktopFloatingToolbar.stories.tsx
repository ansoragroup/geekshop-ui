import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFloatingToolbar, type DesktopFloatingToolbarItem } from './DesktopFloatingToolbar';

const ChatIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const PackageIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const sampleItems: DesktopFloatingToolbarItem[] = [
  { icon: <ChatIcon />, label: 'Customer Service', onClick: () => {} },
  { icon: <PackageIcon />, label: 'My Orders', onClick: () => {} },
  { icon: <CartIcon />, label: 'Cart', badge: 3, onClick: () => {} },
  { icon: <HeartIcon />, label: 'Wishlist', onClick: () => {} },
  { icon: <EyeIcon />, label: 'Recently Viewed', onClick: () => {} },
  {
    icon: <ArrowUpIcon />,
    label: 'Back to Top',
    showOnScroll: true,
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopFloatingToolbar',
  component: DesktopFloatingToolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopFloatingToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    position: 'right',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 24 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16, color: '#1a1a1a' }}>FloatingToolbar Demo</h2>
        <p style={{ color: '#666' }}>
          Hover over the toolbar items on the right side to see labels expand.
        </p>
        <Story />
      </div>
    ),
  ],
};

export const LeftPosition: Story = {
  args: {
    items: sampleItems.filter((i) => !i.showOnScroll),
    position: 'left',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHighBadge: Story = {
  args: {
    items: [
      { icon: <CartIcon />, label: 'Cart', badge: 150, onClick: () => {} },
      { icon: <HeartIcon />, label: 'Wishlist', badge: 12, onClick: () => {} },
      { icon: <ChatIcon />, label: 'Messages', badge: 5, onClick: () => {} },
    ],
    position: 'right',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export const InScrollablePage: Story = {
  render: (args) => (
    <div style={{ background: '#f5f5f5' }}>
      <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 16 }}>Scroll down to see Back to Top button appear</h2>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: 16,
              marginBottom: 12,
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 8,
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Product #{i + 1} — GeekShop Item</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
              High-performance computer component with premium build quality.
            </p>
          </div>
        ))}
      </div>
      <DesktopFloatingToolbar {...args} />
    </div>
  ),
  args: {
    items: sampleItems,
    position: 'right',
    scrollThreshold: 300,
  },
};

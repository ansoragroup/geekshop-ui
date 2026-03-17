import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTabBar } from './DesktopTabBar';

const meta = {
  title: 'Navigation (Desktop)/DesktopTabBar',
  component: DesktopTabBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 0, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeKey: 'home',
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home' },
      { key: 'categories', label: 'Categories' },
      { key: 'deals', label: 'Deals', badge: 5 },
      { key: 'cart', label: 'Cart', badge: 12 },
      { key: 'profile', label: 'Profile' },
    ],
    activeKey: 'deals',
  },
};

export const SmallSize: Story = {
  args: {
    activeKey: 'home',
    size: 'sm',
  },
};

export const CustomItems: Story = {
  args: {
    items: [
      { key: 'new', label: 'New Arrivals' },
      { key: 'bestsellers', label: 'Bestsellers' },
      { key: 'flash', label: 'Flash Deals', badge: 3 },
      { key: 'brands', label: 'Top Brands' },
    ],
    activeKey: 'new',
  },
};

export const NoIcons: Story = {
  args: {
    items: [
      { key: 'all', label: 'All' },
      { key: 'electronics', label: 'Electronics' },
      { key: 'fashion', label: 'Fashion' },
      { key: 'home', label: 'Home & Garden' },
      { key: 'sports', label: 'Sports' },
    ],
    activeKey: 'all',
  },
};

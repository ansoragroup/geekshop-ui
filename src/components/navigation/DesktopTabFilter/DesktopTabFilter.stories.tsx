import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTabFilter } from './DesktopTabFilter';

const meta = {
  title: 'Navigation (Desktop)/DesktopTabFilter',
  component: DesktopTabFilter,
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
} satisfies Meta<typeof DesktopTabFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const orderTabs = [
  { key: 'all', label: 'All Orders', count: 156 },
  { key: 'pending', label: 'Pending', count: 8 },
  { key: 'shipped', label: 'Shipped', count: 12 },
  { key: 'delivered', label: 'Delivered', count: 130 },
  { key: 'cancelled', label: 'Cancelled', count: 6 },
];

const categoryTabs = [
  { key: 'all', label: 'All' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'home', label: 'Home & Garden' },
  { key: 'sports', label: 'Sports & Outdoors' },
  { key: 'books', label: 'Books' },
];

export const Default: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'all',
  },
};

export const UnderlineVariant: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'all',
    variant: 'underline',
  },
};

export const CardVariant: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'all',
    variant: 'card',
  },
};

export const SmallSize: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'pending',
    size: 'sm',
  },
};

export const NoCounts: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'electronics',
  },
};

export const UnderlineNoCounts: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'all',
    variant: 'underline',
  },
};

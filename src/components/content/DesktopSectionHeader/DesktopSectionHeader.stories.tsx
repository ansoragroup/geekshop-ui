import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSectionHeader } from './DesktopSectionHeader';

const FireIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1012 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const sampleTabs = [
  { label: 'All', value: 'all' },
  { label: 'Laptops', value: 'laptops' },
  { label: 'GPUs', value: 'gpus' },
  { label: 'Peripherals', value: 'peripherals' },
  { label: 'Audio', value: 'audio' },
];

const manyTabs = [
  { label: 'All', value: 'all' },
  { label: 'Laptops', value: 'laptops' },
  { label: 'GPUs', value: 'gpus' },
  { label: 'CPUs', value: 'cpus' },
  { label: 'Monitors', value: 'monitors' },
  { label: 'Keyboards', value: 'keyboards' },
  { label: 'Mice', value: 'mice' },
  { label: 'Storage', value: 'storage' },
  { label: 'Audio', value: 'audio' },
  { label: 'Networking', value: 'networking' },
];

const meta = {
  title: 'Content (Desktop)/DesktopSectionHeader',
  component: DesktopSectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onViewAll: { action: 'view all clicked' },
    onTabChange: { action: 'tab changed' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (icon + count) ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Flash Deals',
    icon: <FireIcon />,
    count: 156,
  },
};

// ─── Full Featured (all props) ───────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    title: 'Top Rated Products',
    subtitle: 'Highest rated by our customers this month',
    icon: <StarIcon />,
    tabs: sampleTabs,
    activeTab: 'all',
    count: 234,
  },
};

// ─── With Subtitle ───────────────────────────────────────────────────────────

export const WithSubtitle: Story = {
  args: {
    title: 'New Arrivals',
    subtitle: 'Fresh products added this week',
    count: 89,
  },
};

// ─── With Icon ───────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  args: {
    title: 'Lightning Deals',
    icon: <BoltIcon />,
    count: 42,
  },
};

// ─── With Count ──────────────────────────────────────────────────────────────

export const WithCount: Story = {
  name: 'With Item Count',
  args: {
    title: 'All Products',
    count: 1024,
  },
};

// ─── With Tabs ───────────────────────────────────────────────────────────────

export const WithTabs: Story = {
  args: {
    title: 'Browse by Category',
    icon: <PackageIcon />,
    tabs: sampleTabs,
    activeTab: 'all',
    count: 234,
  },
};

// ─── Many Tabs ───────────────────────────────────────────────────────────────

export const ManyTabs: Story = {
  name: 'Many Tabs (10)',
  args: {
    title: 'Shop by Department',
    tabs: manyTabs,
    activeTab: 'all',
    count: 5420,
  },
};

// ─── Interactive Tabs (controlled) ───────────────────────────────────────────

export const InteractiveTabs: Story = {
  name: 'Interactive Tabs (controlled)',
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    return (
      <DesktopSectionHeader
        title="Browse by Category"
        subtitle="Find exactly what you need"
        icon={<PackageIcon />}
        tabs={sampleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        count={1024}
      />
    );
  },
};

// ─── Minimal (title only) ────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (title only)',
  args: {
    title: 'Recommended for You',
  },
};

// ─── No View All ─────────────────────────────────────────────────────────────

export const NoViewAll: Story = {
  name: 'Without View All Button',
  args: {
    title: "Today's Picks",
    icon: <FireIcon />,
    subtitle: 'Handpicked by our editors',
    onViewAll: undefined,
  },
};

// ─── Tabs Without Icon ───────────────────────────────────────────────────────

export const TabsNoIcon: Story = {
  name: 'Tabs without Icon',
  args: {
    title: 'Featured Collections',
    tabs: sampleTabs.slice(0, 3),
    activeTab: 'laptops',
    count: 67,
  },
};

// ─── Icon + Subtitle (no tabs/count) ─────────────────────────────────────────

export const IconWithSubtitle: Story = {
  name: 'Icon + Subtitle (no tabs)',
  args: {
    title: 'Trending Now',
    subtitle: 'Products gaining popularity this week',
    icon: <StarIcon />,
  },
};

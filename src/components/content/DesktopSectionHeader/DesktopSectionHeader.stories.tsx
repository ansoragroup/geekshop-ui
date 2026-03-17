import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSectionHeader } from './DesktopSectionHeader';

const FireIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1012 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
  </svg>
);

const sampleTabs = [
  { label: 'All', value: 'all' },
  { label: 'Laptops', value: 'laptops' },
  { label: 'GPUs', value: 'gpus' },
  { label: 'Peripherals', value: 'peripherals' },
  { label: 'Audio', value: 'audio' },
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

export const Default: Story = {
  args: {
    title: 'Flash Deals',
    icon: <FireIcon />,
    count: 156,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Top Rated Products',
    subtitle: 'Highest rated by our customers this month',
    count: 89,
  },
};

export const WithTabs: Story = {
  args: {
    title: 'New Arrivals',
    icon: <FireIcon />,
    tabs: sampleTabs,
    activeTab: 'all',
    count: 234,
  },
};

export const InteractiveTabs: Story = {
  name: 'Interactive Tabs',
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    return (
      <DesktopSectionHeader
        title="Browse by Category"
        subtitle="Find exactly what you need"
        tabs={sampleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        count={1024}
      />
    );
  },
};

export const Minimal: Story = {
  name: 'Minimal (title only)',
  args: {
    title: 'Recommended for You',
  },
};

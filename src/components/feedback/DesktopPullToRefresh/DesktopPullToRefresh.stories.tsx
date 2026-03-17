import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPullToRefresh } from './DesktopPullToRefresh';

const meta = {
  title: 'Feedback (Desktop)/DesktopPullToRefresh',
  component: DesktopPullToRefresh,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopPullToRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div style={{ padding: 16 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          padding: 16,
          marginBottom: 8,
          background: '#fff',
          borderRadius: 8,
          border: '1px solid #eee',
          fontSize: 14,
          color: '#333',
        }}
      >
        Product item #{i} - GeekShop Special Edition
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    refreshing: false,
    onRefresh: () => {},
    children: <SampleContent />,
  },
};

export const Refreshing: Story = {
  args: {
    refreshing: true,
    onRefresh: () => {},
    children: <SampleContent />,
  },
};

export const CustomText: Story = {
  args: {
    refreshing: false,
    onRefresh: () => {},
    buttonText: 'Update Products',
    children: <SampleContent />,
  },
};

export const Interactive: Story = {
  render: () => {
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 2000);
    };
    return (
      <DesktopPullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
        <SampleContent />
      </DesktopPullToRefresh>
    );
  },
};

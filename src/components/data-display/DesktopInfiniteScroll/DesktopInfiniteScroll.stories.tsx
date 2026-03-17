import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopInfiniteScroll } from './DesktopInfiniteScroll';

const meta = {
  title: 'Data Display (Desktop)/DesktopInfiniteScroll',
  component: DesktopInfiniteScroll,
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
} satisfies Meta<typeof DesktopInfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoCard = ({ index }: { index: number }) => (
  <div
    style={{
      padding: 16,
      marginBottom: 8,
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #eee',
    }}
  >
    Product #{index + 1} — MSI RTX 4060 Gaming Graphics Card
  </div>
);

function InfiniteScrollDemo({ initialCount = 6, hasMoreInitial = true }: { initialCount?: number; hasMoreInitial?: boolean }) {
  const [items, setItems] = useState(
    Array.from({ length: initialCount }, (_, i) => i),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(hasMoreInitial);

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems((prev) => {
          const next = [...prev, ...Array.from({ length: 4 }, (_, i) => prev.length + i)];
          if (next.length >= 20) setHasMore(false);
          return next;
        });
        setLoading(false);
        resolve();
      }, 1200);
    });
  }, []);

  return (
    <DesktopInfiniteScroll
      hasMore={hasMore}
      loading={loading}
      onLoadMore={handleLoadMore}
      loadingText="Fetching more products..."
    >
      {items.map((i) => (
        <DemoCard key={i} index={i} />
      ))}
    </DesktopInfiniteScroll>
  );
}

export const Default: Story = {
  args: {
    hasMore: true,
    loading: false,
    onLoadMore: () => {},
    children: null,
  },
  render: () => <InfiniteScrollDemo />,
};

export const Loading: Story = {
  args: {
    hasMore: true,
    loading: true,
    onLoadMore: () => {},
    loadingText: 'Fetching more products...',
    children: (
      <>
        {Array.from({ length: 4 }, (_, i) => (
          <DemoCard key={i} index={i} />
        ))}
      </>
    ),
  },
};

export const EndOfList: Story = {
  args: {
    hasMore: false,
    loading: false,
    onLoadMore: () => {},
    children: (
      <>
        {Array.from({ length: 3 }, (_, i) => (
          <DemoCard key={i} index={i} />
        ))}
      </>
    ),
  },
};

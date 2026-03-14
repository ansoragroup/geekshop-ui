import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfiniteScroll } from './InfiniteScroll';

const meta = {
  title: 'Data Display/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 12, maxHeight: 400, overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfiniteScroll>;

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

/* Simple product item for demos */
const ProductItem = ({ name, price, index }: { name: string; price: string; index: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      background: '#fff',
      borderRadius: 8,
      marginBottom: 8,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}
  >
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: 8,
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        color: '#999',
        flexShrink: 0,
      }}
    >
      #{index + 1}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: 16, color: '#FF5000', fontWeight: 600, marginTop: 2 }}>{price}</div>
    </div>
  </div>
);

const generateProducts = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: `Product Item ${start + i + 1}`,
    price: `$${(Math.random() * 200 + 10).toFixed(2)}`,
  }));

// --- Default (interactive) ---
const DefaultDemo = () => {
  const [items, setItems] = useState(() => generateProducts(0, 8));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const next = [...prev, ...generateProducts(prev.length, 8)];
        if (next.length >= 40) {
          setHasMore(false);
        }
        return next;
      });
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <InfiniteScroll
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      loading={loading}
    >
      {items.map((p, i) => (
        <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
      ))}
    </InfiniteScroll>
  );
};

export const Default: Story = {
  render: () => <DefaultDemo />,
};

// --- With Error ---
const WithErrorDemo = () => {
  const [items] = useState(() => generateProducts(0, 5));
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRetry = useCallback(() => {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate another error
      setError(true);
    }, 1500);
  }, []);

  return (
    <InfiniteScroll
      onLoadMore={() => {}}
      hasMore={true}
      loading={loading}
      error={error}
      onRetry={handleRetry}
    >
      {items.map((p, i) => (
        <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
      ))}
    </InfiniteScroll>
  );
};

export const WithError: Story = {
  render: () => <WithErrorDemo />,
};

// --- End Reached ---
export const EndReached: Story = {
  render: () => {
    const items = generateProducts(0, 6);

    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={false}
      >
        {items.map((p, i) => (
          <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
        ))}
      </InfiniteScroll>
    );
  },
};

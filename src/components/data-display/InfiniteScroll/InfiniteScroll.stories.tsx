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

const productNames = [
  'MSI RTX 4060 Ventus 2X 8G OC',
  'Samsung Galaxy S24 Ultra 256GB',
  'Sony WH-1000XM5 Headphones',
  'ASUS ROG Strix B650E-F Motherboard',
  'Kingston FURY Beast DDR5 32GB',
  'Logitech MX Master 3S Mouse',
  'Dell UltraSharp U2723QE Monitor',
  'Apple MacBook Pro 16" M3 Pro',
  'Corsair RM850x Power Supply',
  'WD Black SN850X 2TB NVMe SSD',
  'Razer BlackWidow V4 Keyboard',
  'LG C3 OLED 55" 4K TV',
];

const generateProducts = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: productNames[(start + i) % productNames.length],
    price: `${((start + i + 1) * 850_000 + 200_000).toLocaleString()} UZS`,
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

// --- Loading State ---
export const LoadingState: Story = {
  name: 'Loading State (Visible)',
  render: () => {
    const items = generateProducts(0, 4);

    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={true}
        loading={true}
      >
        {items.map((p, i) => (
          <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
        ))}
      </InfiniteScroll>
    );
  },
};

// --- Custom Loading Content ---
export const CustomLoadingContent: Story = {
  name: 'Custom Loading Indicator',
  render: () => {
    const items = generateProducts(0, 4);

    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={true}
        loading={true}
        loadingContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: 72,
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  borderRadius: 8,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        }
      >
        {items.map((p, i) => (
          <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
        ))}
      </InfiniteScroll>
    );
  },
};

// --- Custom End Content ---
export const CustomEndContent: Story = {
  name: 'Custom End-of-List Content',
  render: () => {
    const items = generateProducts(0, 5);

    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={false}
        endContent={
          <div style={{ textAlign: 'center', padding: '16px 0', color: '#999', fontSize: 13 }}>
            <div style={{ marginBottom: 4 }}>You have seen all 5 products</div>
            <div style={{ fontSize: 11 }}>Try adjusting your filters for more results</div>
          </div>
        }
      >
        {items.map((p, i) => (
          <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
        ))}
      </InfiniteScroll>
    );
  },
};

// --- Custom Error Content ---
export const CustomErrorContent: Story = {
  name: 'Custom Error Content',
  render: () => {
    const items = generateProducts(0, 3);

    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={true}
        error={true}
        errorContent={
          <div style={{ textAlign: 'center', padding: 16, background: '#FFF5F5', borderRadius: 8, color: '#FF3B30' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Network connection lost</div>
            <div style={{ fontSize: 12, color: '#999' }}>Check your internet connection and try again</div>
          </div>
        }
      >
        {items.map((p, i) => (
          <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
        ))}
      </InfiniteScroll>
    );
  },
};

// --- Large Threshold ---
const LargeThresholdDemo = () => {
  const [items, setItems] = useState(() => generateProducts(0, 6));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const next = [...prev, ...generateProducts(prev.length, 6)];
        if (next.length >= 24) setHasMore(false);
        return next;
      });
      setLoading(false);
    }, 800);
  }, []);

  return (
    <InfiniteScroll
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      loading={loading}
      threshold={500}
    >
      {items.map((p, i) => (
        <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
      ))}
    </InfiniteScroll>
  );
};

export const LargeThreshold: Story = {
  name: 'Large Threshold (500px)',
  render: () => <LargeThresholdDemo />,
};

// --- Error then Success ---
const ErrorThenSuccessDemo = () => {
  const [items, setItems] = useState(() => generateProducts(0, 4));
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = useCallback(() => {
    setError(false);
    setLoading(true);
    setRetryCount((prev) => prev + 1);
    setTimeout(() => {
      if (retryCount >= 1) {
        setItems((prev) => [...prev, ...generateProducts(prev.length, 4)]);
        setHasMore(false);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    }, 1000);
  }, [retryCount]);

  return (
    <div>
      <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>
        Retry count: {retryCount} (succeeds on 2nd retry)
      </div>
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={hasMore}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      >
        {items.map((p, i) => (
          <ProductItem key={p.id} name={p.name} price={p.price} index={i} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export const ErrorThenSuccess: Story = {
  name: 'Error Then Success on Retry',
  render: () => <ErrorThenSuccessDemo />,
};

// --- Empty Initial State ---
export const EmptyInitial: Story = {
  name: 'Empty Initial (No Items Yet)',
  render: () => {
    return (
      <InfiniteScroll
        onLoadMore={() => {}}
        hasMore={true}
        loading={true}
      >
        <div style={{ textAlign: 'center', padding: 24, color: '#999', fontSize: 13 }}>
          Loading products...
        </div>
      </InfiniteScroll>
    );
  },
};

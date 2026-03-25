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

const DemoCard = ({ index, title }: { index: number; title?: string }) => (
  <div
    style={{
      padding: 16,
      marginBottom: 8,
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #eee',
    }}
  >
    {title ?? `Product #${index + 1} — MSI RTX 4060 Gaming Graphics Card`}
  </div>
);

const productTitles = [
  'Samsung Galaxy S24 Ultra 256GB Titanium Black',
  'Apple MacBook Pro 16" M3 Pro 36GB',
  'Sony WH-1000XM5 Wireless Headphones',
  'ASUS ROG Strix RTX 4070 Ti OC',
  'Logitech G Pro X Superlight 2 Mouse',
  'Kingston FURY Beast DDR5 6000MHz 32GB',
  'Dell UltraSharp U2723QE 27" 4K Monitor',
  'Corsair RM1000x 1000W Modular PSU',
  'WD Black SN850X 2TB PCIe Gen4 NVMe',
  'Razer Huntsman V3 Pro Keyboard',
  'LG C3 OLED evo 65" 4K Smart TV',
  'Bose QuietComfort Ultra Earbuds',
];

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
        <DemoCard key={i} index={i} title={productTitles[i % productTitles.length]} />
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
          <DemoCard key={i} index={i} title={productTitles[i]} />
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
          <DemoCard key={i} index={i} title={productTitles[i]} />
        ))}
      </>
    ),
  },
};

export const CustomLoadingText: Story = {
  name: 'Custom Loading Text',
  args: {
    hasMore: true,
    loading: true,
    onLoadMore: () => {},
    loadingText: 'Searching for more deals...',
    children: (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <DemoCard key={i} index={i} title={productTitles[i]} />
        ))}
      </>
    ),
  },
};

export const SingleItemEndOfList: Story = {
  name: 'Single Item (End of List)',
  args: {
    hasMore: false,
    loading: false,
    onLoadMore: () => {},
    children: (
      <DemoCard index={0} title="The only product matching your search" />
    ),
  },
};

export const ManyItems: Story = {
  name: 'Many Items Already Loaded',
  args: {
    hasMore: true,
    loading: false,
    onLoadMore: () => {},
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <DemoCard key={i} index={i} title={productTitles[i % productTitles.length]} />
        ))}
      </>
    ),
  },
};

export const LargeThreshold: Story = {
  name: 'Large Threshold (600px)',
  render: () => {
    const LargeThresholdDemo = () => {
      const [items, setItems] = useState(Array.from({ length: 4 }, (_, i) => i));
      const [loading, setLoading] = useState(false);
      const [hasMore, setHasMore] = useState(true);

      const handleLoadMore = useCallback(() => {
        setLoading(true);
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setItems((prev) => {
              const next = [...prev, ...Array.from({ length: 4 }, (_, i) => prev.length + i)];
              if (next.length >= 16) setHasMore(false);
              return next;
            });
            setLoading(false);
            resolve();
          }, 800);
        });
      }, []);

      return (
        <DesktopInfiniteScroll
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
          threshold={600}
          loadingText="Pre-fetching with high threshold..."
        >
          {items.map((i) => (
            <DemoCard key={i} index={i} title={productTitles[i % productTitles.length]} />
          ))}
        </DesktopInfiniteScroll>
      );
    };

    return <LargeThresholdDemo />;
  },
};

export const GridLayout: Story = {
  name: 'Grid Layout Content',
  render: () => {
    const GridDemo = () => {
      const [items, setItems] = useState(Array.from({ length: 8 }, (_, i) => i));
      const [loading, setLoading] = useState(false);
      const [hasMore, setHasMore] = useState(true);

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
          }, 1000);
        });
      }, []);

      return (
        <DesktopInfiniteScroll
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
          loadingText="Loading more products..."
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {items.map((i) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  textAlign: 'center',
                }}
              >
                <div style={{ width: '100%', height: 80, background: '#f8f8f8', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 12 }}>
                  Product Image
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#333', marginBottom: 4 }}>
                  {productTitles[i % productTitles.length].split(' ').slice(0, 3).join(' ')}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#FF5000' }}>
                  {((i + 1) * 1_250_000).toLocaleString()} UZS
                </div>
              </div>
            ))}
          </div>
        </DesktopInfiniteScroll>
      );
    };

    return <GridDemo />;
  },
};

export const EmptyBeforeLoad: Story = {
  name: 'Empty State Before First Load',
  args: {
    hasMore: true,
    loading: true,
    onLoadMore: () => {},
    loadingText: 'Fetching initial results...',
    children: (
      <div style={{ textAlign: 'center', padding: 40, color: '#999', fontSize: 14 }}>
        Searching products...
      </div>
    ),
  },
};

export const SmallBatch: Story = {
  name: 'Small Batch Interactive (2 at a time)',
  render: () => {
    const SmallBatchDemo = () => {
      const [items, setItems] = useState(Array.from({ length: 2 }, (_, i) => i));
      const [loading, setLoading] = useState(false);
      const [hasMore, setHasMore] = useState(true);

      const handleLoadMore = useCallback(() => {
        setLoading(true);
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setItems((prev) => {
              const next = [...prev, ...Array.from({ length: 2 }, (_, i) => prev.length + i)];
              if (next.length >= 10) setHasMore(false);
              return next;
            });
            setLoading(false);
            resolve();
          }, 600);
        });
      }, []);

      return (
        <DesktopInfiniteScroll
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
          loadingText="Loading 2 more..."
        >
          {items.map((i) => (
            <DemoCard key={i} index={i} title={productTitles[i % productTitles.length]} />
          ))}
        </DesktopInfiniteScroll>
      );
    };

    return <SmallBatchDemo />;
  },
};

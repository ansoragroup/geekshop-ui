import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecommendationFeed, type RecommendationTab } from './RecommendationFeed';
import { ProductCard } from '../ProductCard';

const tabs: RecommendationTab[] = [
  { key: 'all', label: 'All' },
  { key: 'gpus', label: 'GPUs' },
  { key: 'cpus', label: 'CPUs' },
  { key: 'monitors', label: 'Monitors' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'storage', label: 'Storage' },
  { key: 'peripherals', label: 'Peripherals' },
];

const sampleProducts = [
  {
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format',
    title: 'NVIDIA RTX 4070 Ti Super',
    price: 8500000,
    originalPrice: 9200000,
    discount: '-8%',
  },
  {
    image:
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop&auto=format',
    title: 'AMD Ryzen 7 7800X3D Processor',
    price: 4200000,
    badge: 'hot' as const,
  },
  {
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop&auto=format',
    title: 'Samsung Odyssey G7 32" 240Hz Monitor',
    price: 6800000,
    originalPrice: 7500000,
    discount: '-9%',
  },
  {
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop&auto=format',
    title: 'ASUS ROG Strix B650E Motherboard',
    price: 3100000,
    badge: 'new' as const,
  },
  {
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&h=300&fit=crop&auto=format',
    title: 'Corsair Vengeance DDR5 32GB Kit',
    price: 1200000,
    soldCount: '1.2k+ sold',
  },
  {
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format',
    title: 'WD Black SN850X 2TB NVMe SSD',
    price: 2400000,
    originalPrice: 2800000,
    discount: '-14%',
  },
  {
    image:
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=300&fit=crop&auto=format',
    title: 'Logitech G Pro X Superlight 2 Mouse',
    price: 1800000,
    badge: 'top' as const,
  },
  {
    image:
      'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=300&h=300&fit=crop&auto=format',
    title: 'Corsair RM1000x Power Supply 1000W',
    price: 2100000,
  },
  {
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop&auto=format',
    title: 'Noctua NH-D15 CPU Cooler',
    price: 1500000,
    soldCount: '800+ sold',
  },
  {
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format',
    title: 'LG UltraGear 27" 4K IPS 144Hz',
    price: 5500000,
    originalPrice: 6200000,
    discount: '-11%',
  },
];

const PackageIcon = () => (
  <svg
    width="24"
    height="24"
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

const meta = {
  title: 'Product/RecommendationFeed',
  component: RecommendationFeed,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecommendationFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Recommended For You',
    icon: <PackageIcon />,
    tabs,
    hasMore: true,
    children: sampleProducts.map((product, i) => <ProductCard key={i} {...product} />),
  },
};

export const WithActiveTab: Story = {
  args: {
    title: 'Recommended For You',
    icon: <PackageIcon />,
    tabs,
    activeTab: 'gpus',
    hasMore: true,
    children: sampleProducts.slice(0, 5).map((product, i) => <ProductCard key={i} {...product} />),
  },
};

export const NoMoreProducts: Story = {
  args: {
    title: 'Top Picks',
    tabs: tabs.slice(0, 4),
    hasMore: false,
    children: sampleProducts.slice(0, 5).map((product, i) => <ProductCard key={i} {...product} />),
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Recommended For You',
    icon: <PackageIcon />,
    tabs,
    hasMore: true,
    loading: true,
    children: sampleProducts.map((product, i) => <ProductCard key={i} {...product} />),
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [visibleCount, setVisibleCount] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((c) => Math.min(c + 5, sampleProducts.length));
        setLoading(false);
      }, 1000);
    };

    return (
      <RecommendationFeed
        title="Recommended For You"
        icon={<PackageIcon />}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasMore={visibleCount < sampleProducts.length}
        loading={loading}
        onLoadMore={handleLoadMore}
      >
        {sampleProducts.slice(0, visibleCount).map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </RecommendationFeed>
    );
  },
};

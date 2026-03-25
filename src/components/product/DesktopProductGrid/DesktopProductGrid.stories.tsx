import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopProductGrid } from './DesktopProductGrid';
import type { DesktopProductGridItem, SortOption } from './DesktopProductGrid';

const meta = {
  title: 'Product/DesktopProductGrid',
  component: DesktopProductGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onViewModeChange: { action: 'view mode changed' },
    onColumnsChange: { action: 'columns changed' },
    onSortChange: { action: 'sort changed' },
    onProductClick: { action: 'product clicked' },
    onAddToCart: { action: 'add to cart' },
    viewMode: { control: 'select', options: ['grid', 'list'] },
    columns: { control: 'select', options: [4, 5] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, background: '#f5f5f5', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const sortOptions: SortOption[] = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest First' },
  { id: 'popular', label: 'Most Popular' },
];

const mockProducts: DesktopProductGridItem[] = [
  {
    id: 'gpu-rtx4060',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 8_900_000,
    originalPrice: 12_000_000,
    discount: '-26%',
    rating: 4.5,
    reviewCount: 234,
    freeShipping: true,
  },
  {
    id: 'cpu-ryzen7',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'AMD Ryzen 7 7800X3D Processor 4.2GHz 8-Core',
    price: 6_350_000,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: 'ssd-samsung',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
    title: 'Samsung 990 EVO SSD 1TB NVMe M.2 PCIe 5.0',
    price: 1_290_000,
    originalPrice: 1_500_000,
    discount: '-14%',
    rating: 4.3,
    reviewCount: 512,
    freeShipping: true,
  },
  {
    id: 'laptop-macbook',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    title: 'MacBook Air M3 15" 16GB 512GB Space Gray',
    price: 22_900_000,
    originalPrice: 24_500_000,
    discount: '-7%',
    rating: 4.9,
    reviewCount: 78,
    freeShipping: true,
  },
  {
    id: 'mouse-logitech',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    title: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse',
    price: 1_650_000,
    rating: 4.7,
    reviewCount: 145,
  },
  {
    id: 'keyboard-keychron',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop',
    title: 'Keychron Q1 Pro Mechanical Keyboard Gateron Brown',
    price: 2_450_000,
    rating: 4.6,
    reviewCount: 87,
    freeShipping: true,
  },
  {
    id: 'headphones-sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 4_200_000,
    originalPrice: 4_800_000,
    discount: '-13%',
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: 'monitor-asus',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    title: 'ASUS ROG Swift PG27AQDM 27" OLED 240Hz Monitor',
    price: 15_800_000,
    originalPrice: 18_200_000,
    discount: '-13%',
    rating: 4.7,
    reviewCount: 42,
    freeShipping: true,
  },
  {
    id: 'ram-corsair',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop',
    title: 'Corsair Vengeance DDR5 32GB (2x16) 6000MHz CL30',
    price: 2_100_000,
    rating: 4.4,
    reviewCount: 256,
  },
  {
    id: 'cooler-noctua',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'Noctua NH-D15 Premium CPU Cooler Dual Tower',
    price: 1_450_000,
    rating: 4.9,
    reviewCount: 92,
    freeShipping: true,
  },
];

// ─── Default (5 columns, grid view) ──────────────────────────────────────────

export const Default: Story = {
  args: {
    products: mockProducts,
    totalCount: 195,
    sortOptions,
    activeSortId: 'relevance',
  },
};

// ─── List View ───────────────────────────────────────────────────────────────

export const ListView: Story = {
  args: {
    products: mockProducts.slice(0, 5),
    totalCount: 195,
    viewMode: 'list',
    sortOptions,
    activeSortId: 'relevance',
  },
};

// ─── Four Columns ────────────────────────────────────────────────────────────

export const FourColumns: Story = {
  args: {
    products: mockProducts.slice(0, 8),
    totalCount: 195,
    columns: 4,
    sortOptions,
    activeSortId: 'price-asc',
  },
};

// ─── Five Columns ────────────────────────────────────────────────────────────

export const FiveColumns: Story = {
  args: {
    products: mockProducts,
    totalCount: 195,
    columns: 5,
    sortOptions,
    activeSortId: 'rating',
  },
};

// ─── Sort by Price (active) ──────────────────────────────────────────────────

export const SortByPrice: Story = {
  name: 'Sort: Price Active',
  args: {
    products: [...mockProducts].sort((a, b) => a.price - b.price),
    totalCount: 195,
    sortOptions,
    activeSortId: 'price-asc',
    columns: 5,
  },
};

// ─── No Sort Options ─────────────────────────────────────────────────────────

export const NoSortOptions: Story = {
  args: {
    products: mockProducts.slice(0, 5),
    totalCount: 5,
    sortOptions: [],
  },
};

// ─── Few Products (2 items) ──────────────────────────────────────────────────

export const FewProducts: Story = {
  name: 'Edge: Few Products (2)',
  args: {
    products: mockProducts.slice(0, 2),
    totalCount: 2,
    sortOptions,
    activeSortId: 'relevance',
    columns: 5,
  },
};

// ─── Many Products (all 10) ──────────────────────────────────────────────────

export const ManyProducts: Story = {
  name: 'Full Page (10 products)',
  args: {
    products: mockProducts,
    totalCount: 342,
    sortOptions,
    activeSortId: 'popular',
  },
};

// ─── All Products on Sale ────────────────────────────────────────────────────

export const AllOnSale: Story = {
  name: 'All Products with Discounts',
  args: {
    products: mockProducts.filter((p) => p.originalPrice),
    totalCount: 48,
    sortOptions: sortOptions.slice(0, 3),
    activeSortId: 'price-desc',
    columns: 4,
  },
};

// ─── Interactive (controlled state) ──────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (controlled)',
  render: () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [columns, setColumns] = useState<4 | 5>(5);
    const [activeSortId, setActiveSortId] = useState('relevance');

    return (
      <DesktopProductGrid
        products={mockProducts}
        totalCount={195}
        viewMode={viewMode}
        columns={columns}
        sortOptions={sortOptions}
        activeSortId={activeSortId}
        onViewModeChange={setViewMode}
        onColumnsChange={setColumns}
        onSortChange={setActiveSortId}
        onProductClick={(p) => console.log('Clicked:', p.title)}
        onAddToCart={(p) => console.log('Add to cart:', p.title)}
      />
    );
  },
};

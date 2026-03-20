import type { Meta, StoryObj } from '@storybook/react-vite';
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
  { id: 'price-asc', label: 'Price' },
  { id: 'rating', label: 'Rating' },
  { id: 'newest', label: 'Newest' },
];

const mockProducts: DesktopProductGridItem[] = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/gprod1/400/400',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 8_900_000,
    originalPrice: 12_000_000,
    discount: '-26%',
    rating: 4.5,
    reviewCount: 234,
    installmentPrice: 742_000,
    freeShipping: true,
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/gprod2/400/400',
    title: 'AMD Ryzen 7 7800X3D Processor',
    price: 6_350_000,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/gprod3/400/400',
    title: 'Samsung 990 EVO SSD 1TB NVMe M.2',
    price: 1_290_000,
    originalPrice: 1_500_000,
    discount: '-14%',
    rating: 4.3,
    reviewCount: 512,
    freeShipping: true,
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/gprod4/400/400',
    title: 'MacBook Air M3 15" 16GB 512GB Space Gray',
    price: 22_900_000,
    originalPrice: 24_500_000,
    discount: '-7%',
    rating: 4.9,
    reviewCount: 78,
    installmentPrice: 1_908_000,
    freeShipping: true,
  },
  {
    id: '5',
    image: 'https://picsum.photos/seed/gprod5/400/400',
    title: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse',
    price: 1_650_000,
    rating: 4.7,
    reviewCount: 145,
  },
  {
    id: '6',
    image: 'https://picsum.photos/seed/gprod6/400/400',
    title: 'Keychron Q1 Pro Mechanical Keyboard',
    price: 2_450_000,
    rating: 4.6,
    reviewCount: 87,
    freeShipping: true,
  },
  {
    id: '7',
    image: 'https://picsum.photos/seed/gprod7/400/400',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 4_200_000,
    originalPrice: 4_800_000,
    discount: '-13%',
    rating: 4.8,
    reviewCount: 320,
    installmentPrice: 350_000,
  },
  {
    id: '8',
    image: 'https://picsum.photos/seed/gprod8/400/400',
    title: 'ASUS ROG Swift PG27AQDM 27" OLED 240Hz Monitor',
    price: 15_800_000,
    originalPrice: 18_200_000,
    discount: '-13%',
    rating: 4.7,
    reviewCount: 42,
    installmentPrice: 1_316_000,
    freeShipping: true,
  },
  {
    id: '9',
    image: 'https://picsum.photos/seed/gprod9/400/400',
    title: 'Corsair Vengeance DDR5 32GB (2x16) 6000MHz RAM',
    price: 2_100_000,
    rating: 4.4,
    reviewCount: 256,
  },
  {
    id: '10',
    image: 'https://picsum.photos/seed/gprod10/400/400',
    title: 'Noctua NH-D15 Premium CPU Cooler',
    price: 1_450_000,
    rating: 4.9,
    reviewCount: 92,
    freeShipping: true,
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    totalCount: 195,
    sortOptions,
    activeSortId: 'relevance',
  },
};

export const ListView: Story = {
  args: {
    products: mockProducts.slice(0, 5),
    totalCount: 195,
    viewMode: 'list',
    sortOptions,
    activeSortId: 'relevance',
  },
};

export const FourColumns: Story = {
  args: {
    products: mockProducts.slice(0, 8),
    totalCount: 195,
    columns: 4,
    sortOptions,
    activeSortId: 'price-asc',
  },
};

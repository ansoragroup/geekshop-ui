import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DesktopSidebar } from './DesktopSidebar';
import type { DesktopSidebarProps, SidebarBrand } from './DesktopSidebar';

const sampleCategories = [
  { label: 'All Products', active: true },
  { label: 'GPUs', count: 42 },
  { label: 'Processors', count: 38 },
  { label: 'Monitors', count: 25 },
  { label: 'Laptops', count: 18 },
  { label: 'RAM', count: 31 },
  { label: 'Storage', count: 27 },
  { label: 'Motherboards', count: 15 },
];

const sampleBrands: SidebarBrand[] = [
  { label: 'ASUS', value: 'asus', checked: true },
  { label: 'MSI', value: 'msi', checked: true },
  { label: 'Gigabyte', value: 'gigabyte', checked: false },
  { label: 'Corsair', value: 'corsair', checked: false },
  { label: 'Samsung', value: 'samsung', checked: false },
  { label: 'Kingston', value: 'kingston', checked: false },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopSidebar',
  component: DesktopSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 260, padding: 16, background: '#F5F5F5', minHeight: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveSidebar(props: Partial<DesktopSidebarProps>) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [brands, setBrands] = useState<SidebarBrand[]>(props.brands ?? sampleBrands);
  const [rating, setRating] = useState<number | undefined>(props.ratingFilter);
  const [priceMin, setPriceMin] = useState(props.selectedPriceRange?.min ?? 0);
  const [priceMax, setPriceMax] = useState(props.selectedPriceRange?.max ?? 0);

  const categories = (props.categories ?? sampleCategories).map((cat, i) => ({
    ...cat,
    active: i === activeCategory,
  }));

  return (
    <DesktopSidebar
      categories={categories}
      brands={brands}
      priceRange={{ min: 0, max: 50000000 }}
      selectedPriceRange={{ min: priceMin, max: priceMax }}
      ratingFilter={rating}
      onCategorySelect={(cat) => {
        const idx = categories.findIndex((c) => c.label === cat.label);
        setActiveCategory(idx >= 0 ? idx : 0);
      }}
      onBrandToggle={(value, checked) => {
        setBrands((prev) =>
          prev.map((b) => (b.value === value ? { ...b, checked } : b))
        );
      }}
      onPriceChange={(range) => {
        setPriceMin(range.min);
        setPriceMax(range.max);
      }}
      onRatingChange={setRating}
      {...props}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveSidebar />,
};

export const CategoriesOnly: Story = {
  args: {
    categories: sampleCategories,
  },
};

export const WithAllFilters: Story = {
  render: () => (
    <InteractiveSidebar
      ratingFilter={4}
      selectedPriceRange={{ min: 1000000, max: 15000000 }}
    />
  ),
};

export const BrandsSelected: Story = {
  render: () => (
    <InteractiveSidebar
      brands={sampleBrands.map((b) => ({
        ...b,
        checked: ['asus', 'msi', 'gigabyte'].includes(b.value),
      }))}
    />
  ),
};

export const FewCategories: Story = {
  args: {
    categories: [
      { label: 'All GPUs', active: true },
      { label: 'NVIDIA RTX 40 Series', count: 24 },
      { label: 'AMD RX 7000 Series', count: 18 },
    ],
    brands: [
      { label: 'ASUS', value: 'asus', checked: false },
      { label: 'MSI', value: 'msi', checked: false },
      { label: 'Gigabyte', value: 'gigabyte', checked: false },
    ],
    priceRange: { min: 0, max: 30000000 },
    onCategorySelect: fn(),
    onBrandToggle: fn(),
    onPriceChange: fn(),
    onRatingChange: fn(),
  },
};

export const Empty: Story = {
  args: {
    categories: [],
    brands: [],
  },
};

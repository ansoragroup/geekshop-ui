import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCategoryShowcase, type ShowcaseCategory } from './DesktopCategoryShowcase';

const meta = {
  title: 'Content (Desktop)/DesktopCategoryShowcase',
  component: DesktopCategoryShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1100, padding: 24, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCategoryShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories: ShowcaseCategory[] = [
  {
    label: 'GPUs',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format',
    count: 42,
    onClick: () => console.log('GPUs'),
  },
  {
    label: 'CPUs',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&auto=format',
    count: 38,
    onClick: () => console.log('CPUs'),
  },
  {
    label: 'Monitors',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format',
    count: 25,
    onClick: () => console.log('Monitors'),
  },
  {
    label: 'Laptops',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop&auto=format',
    count: 31,
    onClick: () => console.log('Laptops'),
  },
  {
    label: 'Storage',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format',
    count: 56,
    onClick: () => console.log('Storage'),
  },
  {
    label: 'Keyboards',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&auto=format',
    count: 19,
    onClick: () => console.log('Keyboards'),
  },
  {
    label: 'Mice',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&auto=format',
    count: 27,
    onClick: () => console.log('Mice'),
  },
  {
    label: 'Coolers',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&auto=format',
    count: 14,
    onClick: () => console.log('Coolers'),
  },
  {
    label: 'Cases',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&auto=format',
    count: 11,
    onClick: () => console.log('Cases'),
  },
  {
    label: 'PSUs',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&auto=format',
    count: 22,
    onClick: () => console.log('PSUs'),
  },
];

export const Default: Story = {
  args: {
    categories,
    title: 'Shop by Category',
  },
};

export const WithoutTitle: Story = {
  args: {
    categories,
  },
};

export const FourColumns: Story = {
  args: {
    categories: categories.slice(0, 8),
    columns: 4,
    title: 'Popular Categories',
  },
};

export const ThreeColumns: Story = {
  args: {
    categories: categories.slice(0, 6),
    columns: 3,
    title: 'Featured Categories',
  },
};

export const WithLinks: Story = {
  args: {
    categories: categories.slice(0, 5).map((cat) => ({
      ...cat,
      href: `/category/${cat.label.toLowerCase()}`,
      onClick: undefined,
    })),
    title: 'Browse Categories',
  },
};

export const NoCounts: Story = {
  args: {
    categories: categories.slice(0, 5).map(({ count: _, ...rest }) => rest),
    title: 'Categories',
  },
};

export const SingleRow: Story = {
  args: {
    categories: categories.slice(0, 5),
    title: 'Top Categories',
  },
};

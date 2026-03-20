import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryShowcase, type ShowcaseCategory } from './CategoryShowcase';

const meta = {
  title: 'Content/CategoryShowcase',
  component: CategoryShowcase,
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
} satisfies Meta<typeof CategoryShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories: ShowcaseCategory[] = [
  { label: 'GPUs', image: 'https://picsum.photos/seed/cat-gpu/400/300', count: 42, onClick: () => console.log('GPUs') },
  { label: 'CPUs', image: 'https://picsum.photos/seed/cat-cpu/400/300', count: 38, onClick: () => console.log('CPUs') },
  { label: 'Monitors', image: 'https://picsum.photos/seed/cat-monitor/400/300', count: 25, onClick: () => console.log('Monitors') },
  { label: 'Laptops', image: 'https://picsum.photos/seed/cat-laptop/400/300', count: 31, onClick: () => console.log('Laptops') },
  { label: 'Storage', image: 'https://picsum.photos/seed/cat-ssd/400/300', count: 56, onClick: () => console.log('Storage') },
  { label: 'Keyboards', image: 'https://picsum.photos/seed/cat-kb/400/300', count: 19, onClick: () => console.log('Keyboards') },
  { label: 'Mice', image: 'https://picsum.photos/seed/cat-mouse/400/300', count: 27, onClick: () => console.log('Mice') },
  { label: 'Coolers', image: 'https://picsum.photos/seed/cat-cooler/400/300', count: 14, onClick: () => console.log('Coolers') },
  { label: 'Cases', image: 'https://picsum.photos/seed/cat-case/400/300', count: 11, onClick: () => console.log('Cases') },
  { label: 'PSUs', image: 'https://picsum.photos/seed/cat-psu/400/300', count: 22, onClick: () => console.log('PSUs') },
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

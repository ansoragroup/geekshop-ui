import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FilterBar } from './FilterBar';
import type { FilterBarProps } from './FilterBar';

const meta = {
  title: 'Navigation/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'iPhone13' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveFilterBar(props: Partial<FilterBarProps> & { initialFilter?: string }) {
  const { initialFilter = 'all', filters = [], ...rest } = props;
  const [active, setActive] = useState(initialFilter);
  return <FilterBar filters={filters} activeFilter={active} onFilterChange={setActive} {...rest} />;
}

const defaultFilters = [
  { key: 'all', label: 'Barchasi' },
  { key: 'new', label: 'Yangi' },
  { key: 'popular', label: 'Mashhur' },
  { key: 'cheap', label: 'Arzon' },
  { key: 'expensive', label: 'Qimmat' },
];

export const Default: Story = {
  render: () => <InteractiveFilterBar filters={defaultFilters} />,
};

export const PopularActive: Story = {
  render: () => <InteractiveFilterBar filters={defaultFilters} initialFilter="popular" />,
};

export const WithDropdowns: Story = {
  render: () => (
    <InteractiveFilterBar
      filters={[
        { key: 'all', label: 'Barchasi' },
        { key: 'sort', label: 'Saralash', hasDropdown: true },
        { key: 'brand', label: 'Brend', hasDropdown: true },
        { key: 'price', label: 'Narx', hasDropdown: true },
        { key: 'filter', label: 'Filtr', hasDropdown: true },
      ]}
      initialFilter="all"
    />
  ),
};

export const CategoryFilters: Story = {
  render: () => (
    <InteractiveFilterBar
      filters={[
        { key: 'all', label: 'Barchasi' },
        { key: 'gpu', label: 'Videokartalar' },
        { key: 'cpu', label: 'Protsessorlar' },
        { key: 'ram', label: 'Xotira' },
        { key: 'ssd', label: 'Disklar' },
        { key: 'mb', label: 'Ona platalar' },
      ]}
      initialFilter="all"
    />
  ),
};

export const PriceSortActive: Story = {
  render: () => (
    <InteractiveFilterBar
      filters={[
        { key: 'all', label: 'Barchasi' },
        { key: 'new', label: 'Yangi' },
        { key: 'popular', label: 'Mashhur' },
        { key: 'cheap', label: 'Arzon' },
        { key: 'expensive', label: 'Qimmat' },
      ]}
      initialFilter="cheap"
    />
  ),
};

export const SelectFilterTest: Story = {
  args: {
    filters: [
      { key: 'all', label: 'Barchasi' },
      { key: 'new', label: 'Yangi' },
      { key: 'popular', label: 'Mashhur' },
      { key: 'cheap', label: 'Arzon' },
    ],
    activeFilter: 'all',
    onFilterChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify tablist is rendered
    const tablist = canvas.getByRole('tablist');
    await expect(tablist).toBeInTheDocument();

    // Verify initial active tab
    const allTab = canvas.getByRole('tab', { name: /barchasi/i });
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Click on "Yangi" tab
    const yangiTab = canvas.getByRole('tab', { name: /yangi/i });
    await userEvent.click(yangiTab);
    await expect(args.onFilterChange).toHaveBeenCalledWith('new');

    // Click on "Mashhur" tab
    const mashhurTab = canvas.getByRole('tab', { name: /mashhur/i });
    await userEvent.click(mashhurTab);
    await expect(args.onFilterChange).toHaveBeenCalledWith('popular');

    // Verify onFilterChange was called twice total
    await expect(args.onFilterChange).toHaveBeenCalledTimes(2);
  },
};

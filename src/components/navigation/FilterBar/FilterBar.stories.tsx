import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FilterBar } from './FilterBar';
import type { FilterBarProps } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Navigation/FilterBar',
  component: FilterBar,
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
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

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

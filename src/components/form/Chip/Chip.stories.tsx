import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Chip } from './Chip';

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4z" />
  </svg>
);

const meta = {
  title: 'Form/Chip',
  component: Chip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Electronics',
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText('Electronics').closest('[role="option"]')!;

    await expect(chip).toHaveAttribute('aria-selected', 'false');
    await userEvent.click(chip);
    await expect(args.onSelect).toHaveBeenCalled();
  },
};

export const Selected: Story = {
  args: {
    label: 'Laptops',
    selected: true,
    onSelect: fn(),
  },
};

export const Filled: Story = {
  args: {
    label: 'Sale',
    variant: 'filled',
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Featured',
    icon: <StarIcon />,
    selected: true,
  },
};

export const Deletable: Story = {
  args: {
    label: 'RTX 4090',
    deletable: true,
    selected: true,
    onDelete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const deleteBtn = canvas.getByRole('button');

    await userEvent.click(deleteBtn);
    await expect(args.onDelete).toHaveBeenCalled();
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small chip',
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    onSelect: fn(),
  },
};

export const FilterChipGroup: Story = {
  name: 'Filter Selection Example',
  render: () => {
    const categories = ['All', 'Laptops', 'Monitors', 'Keyboards', 'Mice', 'GPUs'];
    const [selected, setSelected] = useState('All');

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            selected={selected === cat}
            onSelect={() => setSelected(cat)}
          />
        ))}
      </div>
    );
  },
};

export const SearchHistory: Story = {
  name: 'Search History Example',
  render: () => {
    const [tags, setTags] = useState([
      'RTX 4090',
      'MacBook Pro',
      'Mechanical keyboard',
      'Samsung monitor',
      '32GB RAM',
    ]);

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="filled"
            deletable
            onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))}
          />
        ))}
      </div>
    );
  },
};

export const MultiSelect: Story = {
  name: 'Multi-Select Filters',
  render: () => {
    const brands = ['Apple', 'Samsung', 'ASUS', 'Lenovo', 'Dell', 'HP'];
    const [selected, setSelected] = useState<string[]>(['Apple', 'ASUS']);

    const toggle = (brand: string) => {
      setSelected((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
      );
    };

    return (
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1A1A1A' }}>
          Brand
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {brands.map((brand) => (
            <Chip
              key={brand}
              label={brand}
              selected={selected.includes(brand)}
              onSelect={() => toggle(brand)}
            />
          ))}
        </div>
      </div>
    );
  },
};

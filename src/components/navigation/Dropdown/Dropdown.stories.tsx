import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Dropdown } from './Dropdown';
import type { DropdownItem } from './Dropdown';

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GpuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="6" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    <line x1="10" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" />
    <line x1="10" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.2" />
    <line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const sortItems: DropdownItem[] = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
];

const categoryItems: DropdownItem[] = [
  { label: 'GPUs & Graphics Cards', value: 'gpus', icon: <GpuIcon /> },
  { label: 'Processors & CPUs', value: 'cpus', icon: <GpuIcon /> },
  { label: 'Monitors & Displays', value: 'monitors', icon: <GpuIcon /> },
  { label: 'Laptops', value: 'laptops', icon: <GpuIcon /> },
  { label: 'Peripherals', value: 'peripherals', disabled: true, icon: <GpuIcon /> },
];

const TriggerButton = ({ label }: { label: string }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    fontSize: 14,
    color: '#1A1A1A',
    userSelect: 'none',
  }}>
    {label}
    <ChevronDown />
  </div>
);

const meta = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sortItems,
    value: 'price-asc',
    trigger: <TriggerButton label="Sort by" />,
    onSelect: fn(),
  },
};

export const WithIcons: Story = {
  args: {
    items: categoryItems,
    value: 'gpus',
    trigger: <TriggerButton label="Category" />,
    onSelect: fn(),
    width: 240,
  },
};

export const BottomEnd: Story = {
  args: {
    items: sortItems,
    trigger: <TriggerButton label="Sort" />,
    onSelect: fn(),
    placement: 'bottom-end',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: () => {
    const [selectedSort, setSelectedSort] = useState('price-asc');
    const selectedLabel = sortItems.find((i) => i.value === selectedSort)?.label || 'Sort by';

    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Dropdown
          items={sortItems}
          value={selectedSort}
          trigger={<TriggerButton label={selectedLabel} />}
          onSelect={(val) => setSelectedSort(val)}
        />
      </div>
    );
  },
};

export const OpenByDefault: Story = {
  args: {
    items: sortItems,
    value: 'rating',
    trigger: <TriggerButton label="Sort by" />,
    onSelect: fn(),
    open: true,
  },
};

export const SelectionTest: Story = {
  args: {
    items: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' },
    ],
    trigger: <TriggerButton label="Select" />,
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Click trigger to open
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);

    // Verify menu is visible
    const menu = canvas.getByRole('listbox');
    await expect(menu).toBeInTheDocument();

    // Click an option
    const optionB = canvas.getByText('Option B');
    await userEvent.click(optionB);

    // Verify onSelect was called
    await expect(args.onSelect).toHaveBeenCalledWith('b');
  },
};

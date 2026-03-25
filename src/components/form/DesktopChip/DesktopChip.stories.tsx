import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopChip } from './DesktopChip';

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 3.9L7 10.2 3.4 12l.7-3.9L1.2 5.2l4-.6z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 7l2.5 2.5 4.5-4.5" />
  </svg>
);

const FlameIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1C5.5 4 3 5.5 3 8.5a4 4 0 008 0C11 5.5 8.5 4 7 1z" />
  </svg>
);

const TagIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.5 7.5L7 2h5v5L6.5 12.5z" />
    <circle cx="10" cy="4" r="1" fill="currentColor" />
  </svg>
);

const meta = {
  title: 'Forms (Desktop)/DesktopChip',
  component: DesktopChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    color: { control: 'radio', options: ['default', 'primary', 'success', 'warning', 'error'] },
    selected: { control: 'boolean' },
    closable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic States ─── */

export const Default: Story = {
  args: {
    children: 'Electronics',
    onSelect: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText('Electronics');
    await userEvent.click(chip);
    await expect(chip).toBeInTheDocument();
  },
};

export const Selected: Story = {
  args: {
    children: 'Laptops',
    selected: true,
    onSelect: fn(),
  },
};

export const Unselected: Story = {
  args: {
    children: 'Keyboards',
    selected: false,
    onSelect: fn(),
  },
};

/* ─── Color Variants ─── */

export const ColorVariantsUnselected: Story = {
  name: 'Color Variants (Unselected)',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopChip color="default">Default</DesktopChip>
      <DesktopChip color="primary">Primary</DesktopChip>
      <DesktopChip color="success">Success</DesktopChip>
      <DesktopChip color="warning">Warning</DesktopChip>
      <DesktopChip color="error">Error</DesktopChip>
    </div>
  ),
};

export const ColorVariantsSelected: Story = {
  name: 'Color Variants (Selected)',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopChip color="default" selected>
        Default
      </DesktopChip>
      <DesktopChip color="primary" selected>
        Primary
      </DesktopChip>
      <DesktopChip color="success" selected>
        Success
      </DesktopChip>
      <DesktopChip color="warning" selected>
        Warning
      </DesktopChip>
      <DesktopChip color="error" selected>
        Error
      </DesktopChip>
    </div>
  ),
};

/* ─── With Icons ─── */

export const WithIcon: Story = {
  args: {
    children: 'Featured',
    icon: <StarIcon />,
    color: 'primary',
    selected: true,
    onSelect: fn(),
  },
};

export const IconVariants: Story = {
  name: 'Icons with Colors',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopChip icon={<StarIcon />} color="primary" selected>
        Featured
      </DesktopChip>
      <DesktopChip icon={<CheckIcon />} color="success" selected>
        Verified
      </DesktopChip>
      <DesktopChip icon={<FlameIcon />} color="error" selected>
        Hot Deal
      </DesktopChip>
      <DesktopChip icon={<TagIcon />} color="warning" selected>
        Limited
      </DesktopChip>
    </div>
  ),
};

/* ─── Closable ─── */

export const Closable: Story = {
  args: {
    children: 'RTX 4090',
    closable: true,
    selected: true,
    onClose: fn(),
  },
};

export const ClosableWithIcon: Story = {
  name: 'Closable + Icon',
  args: {
    children: 'Samsung',
    closable: true,
    selected: true,
    color: 'primary',
    icon: <TagIcon />,
    onClose: fn(),
  },
};

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
    onSelect: fn(),
  },
};

export const DisabledSelected: Story = {
  name: 'Disabled (Selected)',
  args: {
    children: 'Locked Tag',
    disabled: true,
    selected: true,
  },
};

export const DisabledClosable: Story = {
  name: 'Disabled (Closable)',
  args: {
    children: 'Cannot Remove',
    disabled: true,
    closable: true,
    selected: true,
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    children: 'Premium Tag',
    icon: <StarIcon />,
    color: 'primary',
    selected: true,
    closable: true,
    disabled: false,
    onSelect: fn(),
    onClose: fn(),
  },
};

/* ─── Interactive: Filter Group ─── */

export const FilterGroup: Story = {
  name: 'Category Filter',
  render: () => {
    const categories = [
      'All',
      'Laptops',
      'Monitors',
      'Keyboards',
      'Mice',
      'GPUs',
      'SSDs',
      'Headphones',
    ];
    const [active, setActive] = useState('All');

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <DesktopChip
            key={cat}
            selected={active === cat}
            onSelect={() => setActive(cat)}
            color={active === cat ? 'primary' : 'default'}
          >
            {cat}
          </DesktopChip>
        ))}
      </div>
    );
  },
};

export const MultiSelectFilter: Story = {
  name: 'Multi-Select Filter',
  render: () => {
    const brands = ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Lenovo', 'ASUS', 'Dell', 'HP'];
    const [selected, setSelected] = useState<string[]>(['Samsung', 'Apple']);

    const toggle = (brand: string) => {
      setSelected((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
      );
    };

    return (
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>
          Filter by Brand ({selected.length} selected)
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {brands.map((brand) => (
            <DesktopChip
              key={brand}
              selected={selected.includes(brand)}
              onSelect={() => toggle(brand)}
            >
              {brand}
            </DesktopChip>
          ))}
        </div>
      </div>
    );
  },
};

/* ─── Tags with Remove ─── */

export const TagsWithRemove: Story = {
  name: 'Removable Tags',
  render: () => {
    const [tags, setTags] = useState([
      'RTX 4090',
      'MacBook Pro',
      'Mechanical keyboard',
      'Samsung monitor',
      '32GB RAM',
    ]);

    return (
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>
          Your search tags
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <DesktopChip
              key={tag}
              color="primary"
              selected
              closable
              onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
            >
              {tag}
            </DesktopChip>
          ))}
        </div>
        {tags.length === 0 && (
          <div style={{ fontSize: 13, color: '#999', marginTop: 8 }}>
            No tags. Search for something!
          </div>
        )}
      </div>
    );
  },
};

/* ─── Status Chips ─── */

export const StatusChips: Story = {
  name: 'Order Status Chips',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopChip color="warning" selected icon={<FlameIcon />}>
        Pending
      </DesktopChip>
      <DesktopChip color="primary" selected icon={<CheckIcon />}>
        Processing
      </DesktopChip>
      <DesktopChip color="success" selected icon={<CheckIcon />}>
        Delivered
      </DesktopChip>
      <DesktopChip color="error" selected>
        Cancelled
      </DesktopChip>
    </div>
  ),
};

/* ─── Edge Cases ─── */

export const LongLabel: Story = {
  args: {
    children: 'Very Long Category Name That Might Overflow',
    selected: true,
    closable: true,
    onClose: fn(),
  },
};

export const SingleCharacter: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <DesktopChip selected>A</DesktopChip>
      <DesktopChip selected color="primary">
        B
      </DesktopChip>
      <DesktopChip selected color="success">
        C
      </DesktopChip>
    </div>
  ),
};

export const ManyChips: Story = {
  name: 'Many Chips (Wrapping)',
  render: () => {
    const items = [
      'Laptops',
      'Monitors',
      'Keyboards',
      'Mice',
      'Headphones',
      'Webcams',
      'Speakers',
      'Cables',
      'Adapters',
      'Power Banks',
      'Cases',
      'Screen Protectors',
      'Chargers',
      'USB Drives',
      'External SSDs',
      'Docking Stations',
    ];
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <DesktopChip key={item} selected={i < 3} color={i < 3 ? 'primary' : 'default'}>
            {item}
          </DesktopChip>
        ))}
      </div>
    );
  },
};

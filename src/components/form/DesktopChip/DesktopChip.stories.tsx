import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopChip } from './DesktopChip';

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 3.9L7 10.2 3.4 12l.7-3.9L1.2 5.2l4-.6z" />
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

export const Default: Story = {
  args: {
    children: 'Electronics',
  },
};

export const Selected: Story = {
  args: {
    children: 'Laptops',
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Featured',
    icon: <StarIcon />,
    color: 'primary',
    selected: true,
  },
};

export const Closable: Story = {
  args: {
    children: 'RTX 4090',
    closable: true,
    selected: true,
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopChip color="default" selected>Default</DesktopChip>
      <DesktopChip color="primary" selected>Primary</DesktopChip>
      <DesktopChip color="success" selected>Success</DesktopChip>
      <DesktopChip color="warning" selected>Warning</DesktopChip>
      <DesktopChip color="error" selected>Error</DesktopChip>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const FilterGroup: Story = {
  name: 'Filter Group Example',
  render: () => {
    const categories = ['All', 'Laptops', 'Monitors', 'Keyboards', 'Mice', 'GPUs', 'SSDs'];
    const [active, setActive] = useState('All');

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <DesktopChip
            key={cat}
            selected={active === cat}
            onSelect={() => setActive(cat)}
          >
            {cat}
          </DesktopChip>
        ))}
      </div>
    );
  },
};

export const TagsWithRemove: Story = {
  name: 'Tags with Remove',
  render: () => {
    const [tags, setTags] = useState([
      'RTX 4090', 'MacBook Pro', 'Mechanical keyboard', 'Samsung monitor', '32GB RAM',
    ]);

    return (
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
    );
  },
};

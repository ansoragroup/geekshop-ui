import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopCheckbox } from './DesktopCheckbox';

const meta = {
  title: 'Forms (Desktop)/DesktopCheckbox',
  component: DesktopCheckbox,
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
} satisfies Meta<typeof DesktopCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'This option is disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Checked but disabled',
    checked: true,
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    checked: true,
  },
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group Example',
  render: () => {
    const options = [
      { id: 'free-shipping', label: 'Free shipping' },
      { id: 'in-stock', label: 'In stock only' },
      { id: 'on-sale', label: 'On sale' },
      { id: 'verified', label: 'Verified sellers' },
    ];
    const [selected, setSelected] = useState<string[]>(['free-shipping']);

    const toggle = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
          Filter options
        </div>
        {options.map((opt) => (
          <DesktopCheckbox
            key={opt.id}
            label={opt.label}
            checked={selected.includes(opt.id)}
            onChange={() => toggle(opt.id)}
          />
        ))}
      </div>
    );
  },
};

export const SelectAllPattern: Story = {
  name: 'Select All with Indeterminate',
  render: () => {
    const items = ['MacBook Pro', 'iPhone 15', 'iPad Air', 'AirPods Pro'];
    const [selected, setSelected] = useState<string[]>(['MacBook Pro']);

    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && !allSelected;

    const toggleAll = () => {
      setSelected(allSelected ? [] : [...items]);
    };

    const toggleItem = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item],
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DesktopCheckbox
          label="Select all"
          checked={allSelected}
          indeterminate={someSelected}
          onChange={toggleAll}
        />
        <div style={{ borderTop: '1px solid #eee', margin: '4px 0' }} />
        {items.map((item) => (
          <div key={item} style={{ paddingLeft: 28 }}>
            <DesktopCheckbox
              label={item}
              checked={selected.includes(item)}
              onChange={() => toggleItem(item)}
            />
          </div>
        ))}
      </div>
    );
  },
};

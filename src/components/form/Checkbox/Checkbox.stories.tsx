import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Tanlash',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Tanlangan',
  },
};

export const NoLabel: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    label: 'O\'chirilgan',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    label: 'O\'chirilgan (tanlangan)',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        label={checked ? 'Tanlangan' : 'Tanlanmagan'}
        onChange={setChecked}
      />
    );
  },
};

export const CartItemList: Story = {
  name: 'Cart Item Selection',
  render: () => {
    const [selected, setSelected] = useState<Record<string, boolean>>({
      item1: true,
      item2: false,
      item3: true,
    });

    const toggleAll = () => {
      const allChecked = Object.values(selected).every(Boolean);
      const next: Record<string, boolean> = {};
      for (const k of Object.keys(selected)) next[k] = !allChecked;
      setSelected(next);
    };

    const items = [
      { key: 'item1', name: 'NVIDIA RTX 4060 Ti', price: '5 200 000' },
      { key: 'item2', name: 'AMD Ryzen 7 7800X3D', price: '4 890 000' },
      { key: 'item3', name: 'Samsung 990 Pro 2TB', price: '2 450 000' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
          <Checkbox
            checked={Object.values(selected).every(Boolean)}
            label="Hammasini tanlash"
            onChange={toggleAll}
          />
        </div>
        {items.map((item) => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <Checkbox
              checked={selected[item.key]}
              onChange={(v) => setSelected({ ...selected, [item.key]: v })}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#1A1A1A' }}>{item.name}</div>
              <div style={{ fontSize: 14, color: '#FF0000', fontWeight: 700, marginTop: 4 }}>{item.price} so'm</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

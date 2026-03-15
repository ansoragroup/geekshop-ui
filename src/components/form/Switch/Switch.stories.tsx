import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Switch } from './Switch';

const meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Bildirishnomalar',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');

    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(toggle);
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};

export const CheckedByDefault: Story = {
  args: {
    label: 'Tungi rejim',
    defaultChecked: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Kompakt',
    size: 'sm',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "O'chirilgan",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "O'chirilgan (yoqilgan)",
    disabled: true,
    checked: true,
  },
};

export const NoLabel: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        checked={checked}
        label={checked ? 'Yoqilgan' : "O'chirilgan"}
        onChange={setChecked}
      />
    );
  },
};

export const SettingsList: Story = {
  name: 'Settings Page Example',
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoUpdate, setAutoUpdate] = useState(true);

    const items = [
      { label: 'Push bildirishnomalar', checked: notifications, onChange: setNotifications },
      { label: 'Tungi rejim', checked: darkMode, onChange: setDarkMode },
      { label: "Avtomatik yangilanish", checked: autoUpdate, onChange: setAutoUpdate },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 14, color: '#1A1A1A' }}>{item.label}</span>
            <Switch checked={item.checked} onChange={item.onChange} />
          </div>
        ))}
      </div>
    );
  },
};

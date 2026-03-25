import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopSwitch } from './DesktopSwitch';

const meta = {
  title: 'Forms (Desktop)/DesktopSwitch',
  component: DesktopSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 450, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    defaultChecked: false,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole('switch');
    await expect(switchEl).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute('aria-checked', 'true');
  },
};

export const CheckedOn: Story = {
  name: 'Checked (On)',
  args: {
    label: 'Dark mode',
    defaultChecked: true,
    onChange: fn(),
  },
};

export const CheckedOff: Story = {
  name: 'Unchecked (Off)',
  args: {
    label: 'Auto-update',
    defaultChecked: false,
    onChange: fn(),
  },
};

/* ─── All Sizes ─── */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSwitch size="sm" label="Small switch" defaultChecked />
      <DesktopSwitch size="md" label="Medium switch (default)" defaultChecked />
    </div>
  ),
};

/* ─── With Description ─── */

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive order updates and promotions via email',
    defaultChecked: true,
    onChange: fn(),
  },
};

/* ─── Inline Labels ─── */

export const WithInlineLabels: Story = {
  args: {
    label: 'Auto-save drafts',
    onLabel: 'ON',
    offLabel: 'OFF',
    defaultChecked: false,
    onChange: fn(),
  },
};

export const InlineLabelsOn: Story = {
  name: 'Inline Labels (On)',
  args: {
    label: 'Live preview',
    onLabel: 'ON',
    offLabel: 'OFF',
    defaultChecked: true,
    onChange: fn(),
  },
};

/* ─── Disabled States ─── */

export const DisabledOff: Story = {
  name: 'Disabled (Off)',
  args: {
    label: 'Premium features',
    description: 'Upgrade your plan to enable this feature',
    checked: false,
    disabled: true,
  },
};

export const DisabledOn: Story = {
  name: 'Disabled (On)',
  args: {
    label: 'Two-factor authentication',
    description: 'This setting is managed by your organization',
    checked: true,
    disabled: true,
  },
};

/* ─── Small Size Variants ─── */

export const SmallOff: Story = {
  name: 'Small Size (Off)',
  args: {
    label: 'Show prices in USD',
    size: 'sm',
    defaultChecked: false,
    onChange: fn(),
  },
};

export const SmallOn: Story = {
  name: 'Small Size (On)',
  args: {
    label: 'Compact mode',
    size: 'sm',
    defaultChecked: true,
    onChange: fn(),
  },
};

/* ─── No Label / No Description ─── */

export const NoLabel: Story = {
  name: 'Without Label (Standalone)',
  args: {
    defaultChecked: true,
    'aria-label': 'Toggle feature',
    onChange: fn(),
  },
};

export const LabelOnly: Story = {
  name: 'Label Only (No Description)',
  args: {
    label: 'Express checkout',
    defaultChecked: false,
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    label: 'Show installment pricing',
    description: 'Display monthly installment amounts on product pages',
    size: 'md',
    onLabel: 'YES',
    offLabel: 'NO',
    defaultChecked: true,
    onChange: fn(),
  },
};

/* ─── All States Overview ─── */

export const AllStatesOverview: Story = {
  name: 'All States Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSwitch label="Off" defaultChecked={false} />
      <DesktopSwitch label="On" defaultChecked />
      <DesktopSwitch label="Small off" size="sm" defaultChecked={false} />
      <DesktopSwitch label="Small on" size="sm" defaultChecked />
      <DesktopSwitch label="Disabled off" disabled checked={false} />
      <DesktopSwitch label="Disabled on" disabled checked />
      <DesktopSwitch label="With inline labels" onLabel="ON" offLabel="OFF" defaultChecked={false} />
      <DesktopSwitch label="With description" description="Extra context here" defaultChecked />
    </div>
  ),
};

/* ─── Controlled ─── */

export const Controlled: Story = {
  name: 'Controlled Switch',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopSwitch
          label="Enable feature"
          description={`Currently ${checked ? 'enabled' : 'disabled'}`}
          checked={checked}
          onChange={setChecked}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          Value: {String(checked)}
        </div>
      </div>
    );
  },
};

/* ─── Realistic: Settings Page ─── */

export const SettingsGroup: Story = {
  name: 'Settings Page Section',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
      {[
        { label: 'Push notifications', desc: 'Get notified about order status changes', checked: true },
        { label: 'SMS notifications', desc: 'Receive delivery updates via SMS', checked: false },
        { label: 'Marketing emails', desc: 'Weekly deals and exclusive offers', checked: false },
        { label: 'Price drop alerts', desc: 'Get notified when items in your wishlist go on sale', checked: true },
        { label: 'Security alerts', desc: 'Login attempts and password changes', checked: true },
      ].map(({ label, desc, checked }, index) => (
        <div key={label} style={{ padding: '16px 20px', borderTop: index > 0 ? '1px solid #f0f0f0' : undefined }}>
          <DesktopSwitch
            label={label}
            description={desc}
            defaultChecked={checked}
          />
        </div>
      ))}
    </div>
  ),
};

/* ─── Edge Cases ─── */

export const LongLabel: Story = {
  name: 'Long Label (Overflow)',
  args: {
    label: 'Automatically apply the best available discount code when checking out products from verified sellers',
    description: 'This feature scans all available promo codes and applies the one that gives you the highest discount on your current cart',
    defaultChecked: true,
    onChange: fn(),
  },
};

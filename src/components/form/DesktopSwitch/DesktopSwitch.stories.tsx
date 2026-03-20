import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
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
    <div style={{ width: 400, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    defaultChecked: false,
    onChange: fn(),
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
    onChange: fn(),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive order updates and promotions via email',
    defaultChecked: true,
    onChange: fn(),
  },
};

export const WithInlineLabels: Story = {
  args: {
    label: 'Auto-save',
    onLabel: 'ON',
    offLabel: 'OFF',
    defaultChecked: false,
    onChange: fn(),
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Show prices in USD',
    size: 'sm',
    defaultChecked: true,
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Two-factor authentication',
    description: 'This setting is managed by your organization',
    checked: true,
    disabled: true,
  },
};

export const SettingsGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DesktopSwitch
        label="Push notifications"
        description="Get notified about order status changes"
        defaultChecked
      />
      <DesktopSwitch
        label="SMS notifications"
        description="Receive delivery updates via SMS"
        defaultChecked={false}
      />
      <DesktopSwitch
        label="Marketing emails"
        description="Weekly deals and exclusive offers"
        defaultChecked={false}
      />
      <DesktopSwitch
        label="Price drop alerts"
        description="Get notified when items in your wishlist go on sale"
        defaultChecked
      />
    </div>
  ),
};

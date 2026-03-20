import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopTelegramLoginButton } from './DesktopTelegramLoginButton';

const meta = {
  title: 'Forms (Desktop)/DesktopTelegramLoginButton',
  component: DesktopTelegramLoginButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    cornerRadius: { control: { type: 'number', min: 0, max: 24 } },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopTelegramLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    onAuth: fn(),
  },
};

export const Small: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'sm',
    onAuth: fn(),
  },
};

export const Large: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'lg',
    onAuth: fn(),
  },
};

export const CustomLabel: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    label: 'Continue with Telegram',
    onAuth: fn(),
  },
};

export const RoundedCorners: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    cornerRadius: 24,
    onAuth: fn(),
  },
};

export const Disabled: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <DesktopTelegramLoginButton botName="GeekShopBot" size="sm" />
      <DesktopTelegramLoginButton botName="GeekShopBot" size="md" />
      <DesktopTelegramLoginButton botName="GeekShopBot" size="lg" />
    </div>
  ),
};

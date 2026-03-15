import type { Meta, StoryObj } from '@storybook/react-vite';
import { TelegramLoginButton } from './TelegramLoginButton';

const meta = {
  title: 'Form/TelegramLoginButton',
  component: TelegramLoginButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    botUsername: 'GeekShopBot',
  },
} satisfies Meta<typeof TelegramLoginButton>;

export default meta;
type Story = StoryObj<typeof TelegramLoginButton>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Continue with Telegram',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsPage } from './SettingsPage';

const meta = {
  title: 'Pages/SettingsPage',
  component: SettingsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {
  args: {
    showDeleteConfirm: false,
  },
};

export const DeleteAccountConfirm: Story = {
  args: {
    showDeleteConfirm: true,
  },
};

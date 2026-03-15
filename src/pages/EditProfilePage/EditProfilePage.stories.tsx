import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditProfilePage } from './EditProfilePage';

const meta = {
  title: 'Pages/EditProfilePage',
  component: EditProfilePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof EditProfilePage>;

export default meta;
type Story = StoryObj<typeof EditProfilePage>;

export const Default: Story = {
  args: {
    empty: false,
    showErrors: false,
    showAvatarSheet: false,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const WithErrors: Story = {
  args: {
    empty: true,
    showErrors: true,
  },
};

export const AvatarSheet: Story = {
  args: {
    empty: false,
    showAvatarSheet: true,
  },
};

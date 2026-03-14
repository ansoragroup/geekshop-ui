import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfilePage } from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {};

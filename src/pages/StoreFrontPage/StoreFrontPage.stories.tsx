import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoreFrontPage } from './StoreFrontPage';

const meta = {
  title: 'Pages/StoreFrontPage',
  component: StoreFrontPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof StoreFrontPage>;

export default meta;
type Story = StoryObj<typeof StoreFrontPage>;

export const Default: Story = {};

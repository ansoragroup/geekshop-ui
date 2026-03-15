import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowsingHistoryPage } from './BrowsingHistoryPage';

const meta = {
  title: 'Pages/BrowsingHistoryPage',
  component: BrowsingHistoryPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof BrowsingHistoryPage>;

export default meta;
type Story = StoryObj<typeof BrowsingHistoryPage>;

export const Default: Story = {
  args: { empty: false },
};

export const EmptyHistory: Story = {
  args: { empty: true },
};

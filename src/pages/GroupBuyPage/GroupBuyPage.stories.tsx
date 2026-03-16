import type { Meta, StoryObj } from '@storybook/react-vite';
import { GroupBuyPage } from './GroupBuyPage';

const meta = {
  title: 'Pages/GroupBuyPage',
  component: GroupBuyPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof GroupBuyPage>;

export default meta;
type Story = StoryObj<typeof GroupBuyPage>;

export const Default: Story = {};

export const EndingSoon: Story = {
  args: {
    filter: 'ending',
  },
};

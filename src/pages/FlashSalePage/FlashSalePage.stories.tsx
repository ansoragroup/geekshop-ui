import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlashSalePage } from './FlashSalePage';

const meta = {
  title: 'Pages/FlashSalePage',
  component: FlashSalePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof FlashSalePage>;

export default meta;
type Story = StoryObj<typeof FlashSalePage>;

export const Default: Story = {};

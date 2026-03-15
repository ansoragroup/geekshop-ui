import type { Meta, StoryObj } from '@storybook/react-vite';
import { FAQPage } from './FAQPage';

const meta = {
  title: 'Pages/FAQPage',
  component: FAQPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof FAQPage>;

export default meta;
type Story = StoryObj<typeof FAQPage>;

export const Default: Story = {};

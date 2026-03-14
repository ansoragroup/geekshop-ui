import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewsPage } from './ReviewsPage';

const meta: Meta<typeof ReviewsPage> = {
  title: 'Pages/ReviewsPage',
  component: ReviewsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewsPage>;

export const Default: Story = {};

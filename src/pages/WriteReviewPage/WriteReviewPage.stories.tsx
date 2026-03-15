import type { Meta, StoryObj } from '@storybook/react-vite';
import { WriteReviewPage } from './WriteReviewPage';

const meta = {
  title: 'Pages/WriteReviewPage',
  component: WriteReviewPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof WriteReviewPage>;

export default meta;
type Story = StoryObj<typeof WriteReviewPage>;

export const Default: Story = {
  args: {
    rating: 0,
    hasText: false,
    hasImages: false,
    showValidation: false,
  },
};

export const PartiallyFilled: Story = {
  args: {
    rating: 4,
    hasText: true,
    hasImages: false,
    showValidation: false,
  },
};

export const Completed: Story = {
  args: {
    rating: 5,
    hasText: true,
    hasImages: true,
    showValidation: false,
  },
};

export const ValidationError: Story = {
  args: {
    rating: 0,
    hasText: false,
    hasImages: false,
    showValidation: true,
  },
};

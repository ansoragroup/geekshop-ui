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

/** Default: all reviews with rating summary and distribution bars */
export const Default: Story = {};

/** All reviews tab showing the full list with infinite scroll */
export const AllReviews: Story = {};

/** Reviews filtered to only show reviews with photos */
export const PhotoReviews: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[1] instanceof HTMLElement) {
      tabs[1].click();
    }
  },
};

/** 5-star reviews only — positive feedback filter */
export const FiveStarReviews: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[2] instanceof HTMLElement) {
      tabs[2].click();
    }
  },
};

/** 3-star reviews — average/mixed feedback */
export const ThreeStarReviews: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[4] instanceof HTMLElement) {
      tabs[4].click();
    }
  },
};

/** Low rating (1-2 star) reviews showing negative feedback */
export const LowRatingReviews: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[6] instanceof HTMLElement) {
      tabs[6].click();
    }
  },
};

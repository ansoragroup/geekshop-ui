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

/** Fresh review form — no rating, no text, no images, submit disabled */
export const Default: Story = {
  args: {
    rating: 0,
    hasText: false,
    hasImages: false,
    showValidation: false,
  },
};

/** User has set a rating and written text but hasn't added photos yet */
export const PartiallyFilled: Story = {
  args: {
    rating: 4,
    hasText: true,
    hasImages: false,
    showValidation: false,
  },
};

/** Fully filled review — 5 stars, text, and 2 attached images, ready to submit */
export const Completed: Story = {
  args: {
    rating: 5,
    hasText: true,
    hasImages: true,
    showValidation: false,
  },
};

/** Validation triggered — rating error shown because no stars selected */
export const ValidationError: Story = {
  args: {
    rating: 0,
    hasText: false,
    hasImages: false,
    showValidation: true,
  },
};

/** Only images attached, no text — rating set to 3 stars (mixed review) */
export const ImagesOnly: Story = {
  args: {
    rating: 3,
    hasText: false,
    hasImages: true,
    showValidation: false,
  },
};

/** Low rating with text but no photos — dissatisfied customer review */
export const LowRatingWithText: Story = {
  args: {
    rating: 1,
    hasText: true,
    hasImages: false,
    showValidation: false,
  },
};

/** Completed review on narrow iPhone SE — verifies image grid and textarea fit */
export const CompletedOnSmallScreen: Story = {
  args: {
    rating: 5,
    hasText: true,
    hasImages: true,
    showValidation: false,
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

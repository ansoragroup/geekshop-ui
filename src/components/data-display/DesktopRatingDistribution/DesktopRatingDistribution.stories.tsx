import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopRatingDistribution } from './DesktopRatingDistribution';

const meta = {
  title: 'Data Display (Desktop)/DesktopRatingDistribution',
  component: DesktopRatingDistribution,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopRatingDistribution>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    distribution: { 5: 8420, 4: 2130, 3: 645, 2: 189, 1: 76 },
    average: 4.6,
    total: 11460,
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    distribution: { 5: 14230, 4: 4510, 3: 1280, 2: 390, 1: 120 },
    average: 4.52,
    total: 20530,
    labels: {
      averageStars: '{rating} out of 5 stars overall',
      starDistribution: 'Rating breakdown',
      starBar: '{star} stars: {percent}% of reviews',
      reviewsLabel: 'customer reviews',
    },
  },
};

export const MixedRatings: Story = {
  name: 'Mixed — Polarized Ratings',
  args: {
    distribution: { 5: 120, 4: 85, 3: 200, 2: 95, 1: 145 },
    average: 2.8,
    total: 645,
  },
};

export const PerfectRating: Story = {
  name: 'Perfect 5.0 Rating',
  args: {
    distribution: { 5: 342, 4: 12, 3: 0, 2: 0, 1: 0 },
    average: 4.97,
    total: 354,
  },
};

export const TerribleRating: Story = {
  name: 'Terrible Rating (Mostly 1-Star)',
  args: {
    distribution: { 5: 3, 4: 5, 3: 12, 2: 89, 1: 241 },
    average: 1.4,
    total: 350,
  },
};

export const FewReviews: Story = {
  name: 'Very Few Reviews',
  args: {
    distribution: { 5: 3, 4: 1, 3: 0, 2: 1, 1: 0 },
    average: 4.2,
    total: 5,
  },
};

export const SingleReview: Story = {
  args: {
    distribution: { 5: 1, 4: 0, 3: 0, 2: 0, 1: 0 },
    average: 5.0,
    total: 1,
  },
};

export const ZeroReviews: Story = {
  name: 'Zero Reviews (Empty State)',
  args: {
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    average: 0,
    total: 0,
  },
};

export const HighVolume: Story = {
  name: 'High Volume (100K+ Reviews)',
  args: {
    distribution: { 5: 67340, 4: 21890, 3: 8450, 2: 3210, 1: 1890 },
    average: 4.47,
    total: 102780,
  },
};

export const EvenDistribution: Story = {
  name: 'Evenly Distributed',
  args: {
    distribution: { 5: 200, 4: 210, 3: 195, 2: 205, 1: 190 },
    average: 3.0,
    total: 1000,
  },
};

export const CustomLabels: Story = {
  name: 'Custom i18n Labels',
  args: {
    distribution: { 5: 450, 4: 120, 3: 35, 2: 10, 1: 5 },
    average: 4.61,
    total: 620,
    labels: {
      averageStars: '{rating} of 5',
      starDistribution: 'Buyer ratings',
      starBar: '{star} star reviews: {percent}%',
      reviewsLabel: 'verified buyers',
    },
  },
};

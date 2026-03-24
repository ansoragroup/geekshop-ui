import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopRatingDistribution } from './DesktopRatingDistribution';

const meta = {
  title: 'Data Display/DesktopRatingDistribution',
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

export const MixedRatings: Story = {
  name: 'Aralash baholar',
  args: {
    distribution: { 5: 120, 4: 85, 3: 200, 2: 95, 1: 45 },
    average: 3.4,
    total: 545,
  },
};

export const PerfectRating: Story = {
  name: 'Mukammal baho',
  args: {
    distribution: { 5: 342, 4: 12, 3: 0, 2: 0, 1: 0 },
    average: 4.97,
    total: 354,
  },
};

export const FewReviews: Story = {
  name: 'Kam sharhlar',
  args: {
    distribution: { 5: 3, 4: 1, 3: 0, 2: 1, 1: 0 },
    average: 4.2,
    total: 5,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopReviewCard } from './DesktopReviewCard';

const meta = {
  title: 'Data Display (Desktop)/DesktopReviewCard',
  component: DesktopReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onHelpful: { action: 'helpful' },
    onNotHelpful: { action: 'not helpful' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 800, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: 'Dilshod Rahimov',
      avatar: 'https://picsum.photos/seed/user1/80/80',
    },
    rating: 5,
    variant: '12GB/Black',
    content:
      'Excellent GPU performance! Runs all games at ultra settings with smooth 60+ FPS. The cooling system is very effective and keeps the temperature below 75C even during heavy loads. Highly recommend for gaming builds.',
    images: [
      'https://picsum.photos/seed/review1/200/200',
      'https://picsum.photos/seed/review2/200/200',
      'https://picsum.photos/seed/review3/200/200',
    ],
    date: '14 Mar 2026',
    helpfulCount: 12,
    notHelpfulCount: 1,
  },
};

export const TextOnly: Story = {
  args: {
    user: {
      name: 'Aziza Karimova',
    },
    rating: 4,
    content:
      'Good product, works as expected. Delivery was fast and packaging was secure. The only minor issue is the fan noise under heavy load, but it is within acceptable range.',
    date: '10 Mar 2026',
    helpfulCount: 5,
    notHelpfulCount: 0,
  },
};

export const WithVotes: Story = {
  args: {
    user: {
      name: 'Rustam Toshmatov',
      avatar: 'https://picsum.photos/seed/user3/80/80',
    },
    rating: 3,
    variant: '8GB/White',
    content:
      'Average performance for the price. Expected a bit more from this model. Build quality is fine though.',
    date: '8 Mar 2026',
    helpfulCount: 24,
    notHelpfulCount: 7,
    isHelpfulActive: true,
  },
};

export const LongReview: Story = {
  args: {
    user: {
      name: 'Sardor Yusupov',
      avatar: 'https://picsum.photos/seed/user4/80/80',
    },
    rating: 5,
    variant: '16GB/Founders Edition',
    content:
      'I have been using this graphics card for over two months now and I can confidently say it is one of the best purchases I have made for my PC build. The performance in 1440p gaming is outstanding - I can run Cyberpunk 2077 at ultra settings with ray tracing and DLSS enabled, maintaining a stable 80+ FPS. The card runs surprisingly cool thanks to the excellent dual-fan design, rarely exceeding 70C even during extended gaming sessions. The build quality is premium with a metal backplate that adds structural rigidity. Installation was straightforward in my mid-tower case. Power consumption is reasonable at around 170W under full load. The only minor complaint would be the slightly noisy fans at max RPM, but with headphones on during gaming, it is not noticeable. Overall, excellent value for money and I would highly recommend this to anyone building a mid-to-high-end gaming PC.',
    images: [
      'https://picsum.photos/seed/review4/200/200',
      'https://picsum.photos/seed/review5/200/200',
      'https://picsum.photos/seed/review6/200/200',
      'https://picsum.photos/seed/review7/200/200',
      'https://picsum.photos/seed/review8/200/200',
    ],
    date: '2 Mar 2026',
    helpfulCount: 48,
    notHelpfulCount: 3,
  },
};

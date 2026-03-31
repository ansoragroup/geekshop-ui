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

// --- DEFAULT ---

export const Default: Story = {
  args: {
    user: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    },
    rating: 5,
    variant: '12GB/Black',
    content:
      'Excellent GPU performance! Runs all games at ultra settings with smooth 60+ FPS. The cooling system is very effective and keeps the temperature below 75C even during heavy loads. Highly recommend for gaming builds.',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=200&h=200&fit=crop',
    ],
    date: '14 Mar 2026',
    helpfulCount: 12,
    notHelpfulCount: 1,
  },
};

// --- FULL FEATURED ---

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    user: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    },
    rating: 4,
    variant: '16GB/Founders Edition',
    content:
      "Outstanding card for 1440p gaming. I tested it with Cyberpunk 2077, Starfield, and Baldur's Gate 3 at max settings. Consistent 70+ FPS in most titles. The dual-fan cooler keeps thermals in check. One minor gripe: the RGB software could be better integrated. Overall a solid purchase that replaced my aging GTX 1080.",
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop',
    ],
    date: '12 Mar 2026',
    helpfulCount: 34,
    notHelpfulCount: 2,
    isHelpfulActive: true,
    isNotHelpfulActive: false,
  },
};

// --- TEXT ONLY (no images) ---

export const TextOnly: Story = {
  name: 'Text Only (No Images)',
  args: {
    user: {
      name: 'Emily Chen',
    },
    rating: 4,
    content:
      'Good product, works as expected. Delivery was fast and packaging was secure. The only minor issue is the fan noise under heavy load, but it is within acceptable range for the price point.',
    date: '10 Mar 2026',
    helpfulCount: 5,
    notHelpfulCount: 0,
  },
};

// --- NO AVATAR (initials fallback) ---

export const NoAvatar: Story = {
  name: 'No Avatar (Initials Fallback)',
  args: {
    user: {
      name: 'Robert Kim',
    },
    rating: 3,
    variant: '8GB/White',
    content:
      'Average performance for the price. Expected a bit more from this model. Build quality is fine but nothing exceptional. If you are on a tight budget, it does the job.',
    date: '8 Mar 2026',
    helpfulCount: 8,
    notHelpfulCount: 3,
  },
};

// --- EACH RATING ---

export const Rating5Stars: Story = {
  name: 'Rating: 5 Stars',
  args: {
    user: {
      name: 'Anna Petrova',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    },
    rating: 5,
    content:
      'Absolutely perfect in every way. Best tech purchase I have made this year. Zero regrets.',
    date: '20 Mar 2026',
    helpfulCount: 41,
    notHelpfulCount: 0,
  },
};

export const Rating4Stars: Story = {
  name: 'Rating: 4 Stars',
  args: {
    user: { name: 'David Park' },
    rating: 4,
    content:
      'Really solid product. Lost one star because the packaging was slightly damaged on arrival, but the product itself is flawless.',
    date: '18 Mar 2026',
    helpfulCount: 7,
    notHelpfulCount: 1,
  },
};

export const Rating3Stars: Story = {
  name: 'Rating: 3 Stars',
  args: {
    user: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
    },
    rating: 3,
    variant: '256GB/Blue',
    content:
      'Decent product for the price. Nothing special but gets the job done. Delivery took longer than expected, about 8 days instead of the promised 3.',
    date: '15 Mar 2026',
    helpfulCount: 3,
    notHelpfulCount: 2,
  },
};

export const Rating2Stars: Story = {
  name: 'Rating: 2 Stars',
  args: {
    user: { name: 'Alex Thompson' },
    rating: 2,
    content:
      'Disappointed with the build quality. The plastic housing feels cheap and the buttons are already sticking after two weeks of use. The product photos on the listing were misleading.',
    date: '12 Mar 2026',
    helpfulCount: 15,
    notHelpfulCount: 4,
  },
};

export const Rating1Star: Story = {
  name: 'Rating: 1 Star',
  args: {
    user: {
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    },
    rating: 1,
    content:
      'Product arrived broken. The screen was cracked out of the box. Contacted customer support and still waiting for a response after 5 days. Very frustrated with the experience.',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop'],
    date: '7 Mar 2026',
    helpfulCount: 52,
    notHelpfulCount: 1,
  },
};

// --- EDGE CASES ---

export const VeryLongReview: Story = {
  name: 'Very Long Review Text',
  args: {
    user: {
      name: 'Jennifer Lawrence-Smithson',
      avatar: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
    },
    rating: 5,
    variant: '16GB/Founders Edition',
    content:
      'I have been using this graphics card for over two months now and I can confidently say it is one of the best purchases I have made for my PC build. The performance in 1440p gaming is outstanding. I can run Cyberpunk 2077 at ultra settings with ray tracing and DLSS enabled, maintaining a stable 80+ FPS. Starfield runs beautifully at high settings. Even demanding titles like Red Dead Redemption 2 with max textures barely make this card break a sweat. The card runs surprisingly cool thanks to the excellent dual-fan design, rarely exceeding 70C even during extended gaming sessions lasting 4-5 hours. The build quality is premium with a metal backplate that adds structural rigidity and looks great through my tempered glass side panel. Installation was straightforward in my mid-tower case. The power connectors are well positioned and the card fits perfectly without any sag. Power consumption is reasonable at around 170W under full load, which my 750W PSU handles without any issues. The only minor complaint would be the slightly noisy fans at max RPM, but with headphones on during gaming, it is not noticeable at all. The zero-RPM fan mode at idle is a nice touch for quiet desktop usage. I also tested some creative workloads: Blender renders are significantly faster than my previous card, and DaVinci Resolve handles 4K timeline scrubbing smoothly. Overall, excellent value for money and I would highly recommend this to anyone building a mid-to-high-end gaming PC in 2026.',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    ],
    date: '2 Mar 2026',
    helpfulCount: 48,
    notHelpfulCount: 3,
  },
};

export const MinimalReview: Story = {
  name: 'Minimal (Short Text, No Extras)',
  args: {
    user: { name: 'Tom' },
    rating: 4,
    content: 'Works great!',
    date: '21 Mar 2026',
    helpfulCount: 0,
    notHelpfulCount: 0,
  },
};

export const ActiveNotHelpful: Story = {
  name: 'Not Helpful Active State',
  args: {
    user: {
      name: 'Karen White',
      avatar: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop',
    },
    rating: 2,
    content: 'This review is not very helpful and lacks details. The product is okay I guess.',
    date: '9 Mar 2026',
    helpfulCount: 2,
    notHelpfulCount: 14,
    isHelpfulActive: false,
    isNotHelpfulActive: true,
  },
};

export const HighVoteCount: Story = {
  name: 'High Vote Counts',
  args: {
    user: {
      name: 'Tech Reviewer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    },
    rating: 5,
    variant: '12GB/Gaming OC',
    content:
      'After testing 15 different graphics cards this year, this one stands out as the best value proposition. Detailed benchmarks in my full video review linked below.',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    ],
    date: '1 Mar 2026',
    helpfulCount: 847,
    notHelpfulCount: 23,
    isHelpfulActive: true,
  },
};

export const ManyImages: Story = {
  name: 'Many Review Images (5)',
  args: {
    user: {
      name: 'Photographer Pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    },
    rating: 5,
    content: 'Here are photos from every angle showing the build quality and installation.',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    ],
    date: '5 Mar 2026',
    helpfulCount: 31,
    notHelpfulCount: 0,
  },
};

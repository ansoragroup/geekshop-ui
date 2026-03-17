import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeroBanner } from './DesktopHeroBanner';

const meta = {
  title: 'Content (Desktop)/DesktopHeroBanner',
  component: DesktopHeroBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'banner clicked' },
    onCtaClick: { action: 'CTA clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1100, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopHeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Spring Tech Festival 2026',
    subtitle: 'Up to 50% off on laptops, GPUs, and gaming peripherals',
    badge: 'HOT',
    ctaText: 'Shop Now',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: 'Next-Gen Gaming Awaits',
    subtitle: 'RTX 5090, Ryzen 9950X, DDR5 — all at launch prices',
    badge: 'NEW',
    ctaText: 'Explore',
    image: 'https://picsum.photos/seed/hero-gpu/1200/400',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
  },
};

export const MinimalGradient: Story = {
  args: {
    title: 'Free Shipping Week',
    subtitle: 'All orders over 500,000 UZS ship free — no code needed',
    ctaText: 'Browse Deals',
    bgGradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
  },
};

export const NoCta: Story = {
  name: 'No CTA Button',
  args: {
    title: 'Coming Soon: Summer Sale',
    subtitle: 'Mark your calendars for June 15th',
    badge: 'PREVIEW',
    bgGradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
};

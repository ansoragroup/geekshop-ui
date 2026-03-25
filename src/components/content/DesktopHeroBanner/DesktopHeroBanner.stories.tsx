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

// ─── Default (gradient) ──────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Spring Tech Festival 2026',
    subtitle: 'Up to 50% off on laptops, GPUs, and gaming peripherals',
    badge: 'HOT',
    ctaText: 'Shop Now',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

// ─── Full Featured (every prop) ──────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    title: 'Next-Gen Gaming Awaits',
    subtitle: 'RTX 5090, Ryzen 9950X, DDR5 — all at launch prices. Limited stock available.',
    badge: 'NEW',
    ctaText: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=400&fit=crop',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
  },
};

// ─── Background Image ────────────────────────────────────────────────────────

export const WithBackgroundImage: Story = {
  args: {
    title: 'Premium Audio Experience',
    subtitle: 'Sony, Bose, JBL — top noise-cancelling headphones',
    badge: 'SALE',
    ctaText: 'Shop Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
  },
};

// ─── Green Gradient ──────────────────────────────────────────────────────────

export const GreenGradient: Story = {
  args: {
    title: 'Free Shipping Week',
    subtitle: 'All orders over 500,000 UZS ship free — no code needed',
    ctaText: 'Browse Deals',
    bgGradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
  },
};

// ─── Blue Gradient ───────────────────────────────────────────────────────────

export const BlueGradient: Story = {
  args: {
    title: 'Intel Core Ultra Launch',
    subtitle: 'The fastest processors ever made — available now for pre-order',
    badge: 'NEW',
    ctaText: 'Pre-order',
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
  },
};

// ─── Purple Gradient ─────────────────────────────────────────────────────────

export const PurpleGradient: Story = {
  args: {
    title: 'Gaming Peripherals Week',
    subtitle: 'Mechanical keyboards, gaming mice, RGB everything',
    badge: 'HOT',
    ctaText: 'Shop Peripherals',
    bgGradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
};

// ─── No CTA Button ───────────────────────────────────────────────────────────

export const NoCta: Story = {
  name: 'No CTA Button',
  args: {
    title: 'Coming Soon: Summer Sale',
    subtitle: 'Mark your calendars for June 15th',
    badge: 'PREVIEW',
    bgGradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
};

// ─── No Badge ────────────────────────────────────────────────────────────────

export const NoBadge: Story = {
  args: {
    title: 'Monitor Upgrade Week',
    subtitle: '4K and 2K monitors from Samsung, LG, and ASUS at special prices',
    ctaText: 'Shop Monitors',
    bgGradient: 'linear-gradient(135deg, #FA8C16 0%, #FFC069 100%)',
  },
};

// ─── No Subtitle ─────────────────────────────────────────────────────────────

export const NoSubtitle: Story = {
  args: {
    title: 'BLACK FRIDAY MEGA SALE',
    badge: '-70%',
    ctaText: 'Shop Now',
    bgGradient: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
  },
};

// ─── Minimal (title only) ────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (title only)',
  args: {
    title: 'GeekShop — Your Tech Destination',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

// ─── As Link ─────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  name: 'Renders as <a> Link',
  args: {
    title: 'Visit Our Blog',
    subtitle: 'Tech reviews, buying guides, and the latest news',
    ctaText: 'Read Blog',
    href: '#blog',
    target: '_blank',
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
  },
};

// ─── Clickable Banner ────────────────────────────────────────────────────────

export const Clickable: Story = {
  name: 'Clickable (onClick)',
  args: {
    title: 'Laptop Festival 2026',
    subtitle: 'MacBook Air M3, ASUS ROG, Lenovo ThinkPad — up to 40% off',
    badge: 'HOT',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

// ─── Long Title ──────────────────────────────────────────────────────────────

export const LongTitle: Story = {
  name: 'Edge: Very Long Title and Subtitle',
  args: {
    title: 'The Ultimate Spring Technology Festival with Unbelievable Discounts on Every Category',
    subtitle:
      'From laptops and GPUs to mechanical keyboards, gaming mice, monitors, SSDs, RAM kits, CPU coolers, and power supplies — everything you need for the perfect setup at prices you will not believe',
    badge: 'MEGA',
    ctaText: 'Start Shopping',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

// ─── Dark Image Overlay ──────────────────────────────────────────────────────

export const DarkImageOverlay: Story = {
  name: 'Background Image (laptop)',
  args: {
    title: 'MacBook Pro M4 Available Now',
    subtitle: 'The most powerful Mac ever. Order today and get free AirPods.',
    badge: 'EXCLUSIVE',
    ctaText: 'Order Now',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=400&fit=crop',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
  },
};

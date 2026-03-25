import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPromoBanner } from './DesktopPromoBanner';

const meta = {
  title: 'Content (Desktop)/DesktopPromoBanner',
  component: DesktopPromoBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'banner clicked' },
    onCtaClick: { action: 'CTA clicked' },
    imageAlign: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopPromoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'GPU Mega Sale',
    description: 'RTX 4060 & 4070 at unbeatable prices. Limited stock available.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    imageAlign: 'right',
    tag: '-30%',
    ctaText: 'Shop GPUs',
    background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    title: 'Spring Laptop Festival',
    description: 'MacBook Air M3, ROG Strix, ThinkPad X1 Carbon — up to 40% off on all premium laptops this week only.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    imageAlt: 'MacBook Air laptop on a desk',
    imageAlign: 'right',
    tag: '-40%',
    ctaText: 'Browse Laptops',
    background: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
  },
};

// ─── Image Left ──────────────────────────────────────────────────────────────

export const ImageLeft: Story = {
  args: {
    title: 'Gaming Keyboards',
    description: 'Mechanical keyboards from Keychron, Razer, and Logitech.',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop',
    imageAlign: 'left',
    tag: 'NEW',
    ctaText: 'Browse Collection',
    background: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
};

// ─── Image Right ─────────────────────────────────────────────────────────────

export const ImageRight: Story = {
  args: {
    title: 'Audio Essentials',
    description: 'Premium headphones and speakers from Sony, JBL, and Bose.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    imageAlign: 'right',
    tag: 'HOT',
    ctaText: 'Shop Audio',
    background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

// ─── Green Theme ─────────────────────────────────────────────────────────────

export const GreenTheme: Story = {
  args: {
    title: 'Eco-Friendly Tech',
    description: 'Save energy and money with our green-certified products.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop',
    imageAlign: 'right',
    ctaText: 'Learn More',
    background: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
  },
};

// ─── No Tag ──────────────────────────────────────────────────────────────────

export const NoTag: Story = {
  name: 'Without Tag',
  args: {
    title: 'Monitor Upgrade Week',
    description: '4K and ultrawide monitors from Samsung, LG, and ASUS.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    imageAlign: 'right',
    ctaText: 'Shop Monitors',
    background: 'linear-gradient(135deg, #FA8C16 0%, #FFC069 100%)',
  },
};

// ─── No CTA ──────────────────────────────────────────────────────────────────

export const NoCta: Story = {
  name: 'Without CTA Button',
  args: {
    title: 'Coming Soon: VR Headsets',
    description: 'Meta Quest 3, Apple Vision Pro, and more — launching next week.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop',
    imageAlign: 'left',
    tag: 'SOON',
    background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
  },
};

// ─── No Description ──────────────────────────────────────────────────────────

export const NoDescription: Story = {
  name: 'Without Description',
  args: {
    title: 'BLACK FRIDAY — 70% OFF',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    imageAlign: 'right',
    tag: '-70%',
    ctaText: 'Shop Now',
    background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
  },
};

// ─── As Link ─────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  name: 'As Link (href)',
  args: {
    title: 'Visit Our Blog',
    description: 'Tech reviews, buying guides, and the latest news.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    imageAlign: 'right',
    ctaText: 'Read More',
    href: '#blog',
    target: '_blank',
    background: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
  },
};

// ─── Two Banners Stacked ─────────────────────────────────────────────────────

export const TwoBanners: Story = {
  name: 'Two Banners (stacked)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopPromoBanner
        title="Laptop Festival"
        description="Up to 40% off on ASUS, MSI, and Lenovo laptops"
        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
        imageAlign="right"
        tag="-40%"
        ctaText="Shop Now"
        background="linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)"
      />
      <DesktopPromoBanner
        title="Audio Essentials"
        description="Premium headphones and speakers from Sony, JBL, and Bose"
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        imageAlign="left"
        tag="HOT"
        ctaText="Explore"
        background="linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)"
      />
    </div>
  ),
};

// ─── Long Description ────────────────────────────────────────────────────────

export const LongDescription: Story = {
  name: 'Edge: Long Description',
  args: {
    title: 'Spring Tech Festival 2026',
    description: 'The biggest sale event of the year is here! Save up to 50% on laptops, GPUs, monitors, gaming peripherals, and so much more. Free shipping on all orders over 500,000 UZS. Limited quantities available — shop now before they are gone.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    imageAlign: 'right',
    tag: 'MEGA',
    ctaText: 'Start Shopping',
    background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

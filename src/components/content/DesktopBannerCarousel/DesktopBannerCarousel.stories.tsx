import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopBannerCarousel, type BannerSlide } from './DesktopBannerCarousel';

const sampleSlides: BannerSlide[] = [
  {
    title: 'Spring Tech Festival',
    subtitle: 'Up to 50% off on laptops, GPUs, and monitors',
    ctaText: 'Shop Now',
    ctaHref: '#deals',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
  {
    title: 'New RTX 5090 Arrived',
    subtitle: 'The most powerful GPU ever made — available now',
    ctaText: 'Pre-order',
    ctaHref: '#gpu',
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
  },
  {
    title: 'Gaming Peripherals Sale',
    subtitle: 'Keyboards, mice, headsets from top brands',
    ctaText: 'Browse',
    ctaHref: '#peripherals',
    bgGradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
  {
    title: 'Free Shipping Week',
    subtitle: 'All orders over 500,000 UZS ship free',
    bgGradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
  },
];

const bgImageSlides: BannerSlide[] = [
  {
    title: 'GPU Mega Sale',
    subtitle: 'RTX 4070 & 4080 at unbeatable prices',
    ctaText: 'Shop GPUs',
    ctaHref: '#',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=400&fit=crop',
  },
  {
    title: 'Laptop Festival 2026',
    subtitle: 'MacBook, ROG, ThinkPad — all at discount',
    ctaText: 'Explore Laptops',
    ctaHref: '#',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=400&fit=crop',
  },
  {
    title: 'Audio Essentials',
    subtitle: 'Premium headphones and speakers from Sony, JBL, Bose',
    ctaText: 'Shop Audio',
    bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop',
  },
];

const SidePanelLogin = () => (
  <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, boxSizing: 'border-box' }}>
    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <span style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 600 }}>Welcome back!</span>
    <span style={{ fontSize: 12, color: '#666' }}>Sign in for personalized deals</span>
    <button type="button" style={{ padding: '8px 24px', background: '#FF5000', color: '#fff', border: 'none', borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
      Sign In
    </button>
  </div>
);

const SidePanelNewArrivals = () => (
  <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box' }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>New Arrivals</span>
    {['RTX 5070 Ti', 'Ryzen 9 9950X', 'DDR5 6400MHz Kit'].map((item) => (
      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f5f5f5', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: '#333' }}>{item}</span>
      </div>
    ))}
  </div>
);

const SidePanelDeals = () => (
  <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box', background: 'linear-gradient(180deg, #FFF5F0 0%, #FFF 100%)' }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: '#FF5000' }}>Flash Deals</span>
    {[
      { name: 'RTX 4060', price: '8.9M', old: '12M' },
      { name: 'Ryzen 7 7800X3D', price: '6.3M', old: '7.5M' },
      { name: 'Samsung 990 Pro', price: '1.3M', old: '1.5M' },
    ].map((d) => (
      <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #f0f0f0', fontSize: 11 }}>
        <span style={{ color: '#333' }}>{d.name}</span>
        <div>
          <span style={{ color: '#FF0000', fontWeight: 600 }}>{d.price}</span>
          <span style={{ color: '#999', textDecoration: 'line-through', marginLeft: 4 }}>{d.old}</span>
        </div>
      </div>
    ))}
  </div>
);

const meta = {
  title: 'Content (Desktop)/DesktopBannerCarousel',
  component: DesktopBannerCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    interval: { control: { type: 'range', min: 1000, max: 10000, step: 500 } },
    height: { control: { type: 'range', min: 200, max: 600, step: 50 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopBannerCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (gradient slides) ───────────────────────────────────────────────

export const Default: Story = {
  args: {
    slides: sampleSlides,
    interval: 5000,
    height: 400,
  },
};

// ─── Full Featured (all props) ───────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (side panels + bg images)',
  args: {
    slides: bgImageSlides,
    interval: 6000,
    height: 400,
    sidePanel: <SidePanelLogin />,
    sidePanel2: <SidePanelNewArrivals />,
  },
};

// ─── With Side Panels ────────────────────────────────────────────────────────

export const WithSidePanels: Story = {
  args: {
    slides: sampleSlides,
    interval: 5000,
    height: 400,
    sidePanel: <SidePanelLogin />,
    sidePanel2: <SidePanelNewArrivals />,
  },
};

// ─── With One Side Panel ─────────────────────────────────────────────────────

export const OneSidePanel: Story = {
  name: 'Single Side Panel',
  args: {
    slides: sampleSlides,
    interval: 5000,
    height: 400,
    sidePanel: <SidePanelDeals />,
  },
};

// ─── Single Slide (no arrows/dots) ───────────────────────────────────────────

export const SingleSlide: Story = {
  args: {
    slides: [sampleSlides[0]],
    height: 400,
  },
};

// ─── Two Slides ──────────────────────────────────────────────────────────────

export const TwoSlides: Story = {
  args: {
    slides: sampleSlides.slice(0, 2),
    interval: 4000,
    height: 400,
  },
};

// ─── Background Image Slides ─────────────────────────────────────────────────

export const BackgroundImages: Story = {
  name: 'All Background Image Slides',
  args: {
    slides: bgImageSlides,
    interval: 5000,
    height: 400,
  },
};

// ─── Custom Text Color ───────────────────────────────────────────────────────

export const CustomTextColor: Story = {
  name: 'Slide with Custom Text Color',
  args: {
    slides: [
      {
        title: 'Dark Mode Collection',
        subtitle: 'Sleek peripherals for your setup',
        ctaText: 'Explore',
        bgGradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
        textColor: '#1A1A1A',
      },
      {
        title: 'Neon Gaming Gear',
        subtitle: 'RGB everything at special prices',
        ctaText: 'Shop Now',
        bgGradient: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)',
        textColor: '#00FF88',
      },
    ],
    interval: 4000,
    height: 400,
  },
};

// ─── Short Height ────────────────────────────────────────────────────────────

export const ShortHeight: Story = {
  name: 'Short Height (250px)',
  args: {
    slides: sampleSlides.slice(0, 2),
    height: 250,
    interval: 5000,
  },
};

// ─── Tall Height ─────────────────────────────────────────────────────────────

export const TallHeight: Story = {
  name: 'Tall Height (500px)',
  args: {
    slides: bgImageSlides.slice(0, 2),
    height: 500,
    interval: 5000,
    sidePanel: <SidePanelLogin />,
    sidePanel2: <SidePanelDeals />,
  },
};

// ─── Fast AutoPlay ───────────────────────────────────────────────────────────

export const FastAutoPlay: Story = {
  name: 'Fast AutoPlay (2s interval)',
  args: {
    slides: sampleSlides,
    interval: 2000,
    height: 400,
  },
};

// ─── No CTA Slides ───────────────────────────────────────────────────────────

export const NoCta: Story = {
  name: 'Slides without CTA Buttons',
  args: {
    slides: [
      {
        title: 'Coming Soon: Summer Collection',
        subtitle: 'Mark your calendars for June 15th',
        bgGradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
      },
      {
        title: 'Under Maintenance',
        subtitle: 'We are upgrading our servers for better performance',
        bgGradient: 'linear-gradient(135deg, #666666 0%, #999999 100%)',
      },
    ],
    height: 400,
  },
};

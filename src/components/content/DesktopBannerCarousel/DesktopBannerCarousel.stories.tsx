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

const SidePanelLogin = () => (
  <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, boxSizing: 'border-box' }}>
    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
      <span role="img" aria-hidden="true">&#128100;</span>
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

const meta = {
  title: 'Content (Desktop)/DesktopBannerCarousel',
  component: DesktopBannerCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
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

export const Default: Story = {
  args: {
    slides: sampleSlides,
    interval: 5000,
    height: 400,
  },
};

export const WithSidePanels: Story = {
  args: {
    slides: sampleSlides,
    interval: 5000,
    height: 400,
    sidePanel: <SidePanelLogin />,
    sidePanel2: <SidePanelNewArrivals />,
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [sampleSlides[0]],
    height: 400,
  },
};

export const WithBackgroundImage: Story = {
  args: {
    slides: [
      {
        title: 'GPU Mega Sale',
        subtitle: 'RTX 4070 & 4080 at unbeatable prices',
        ctaText: 'Shop GPUs',
        ctaHref: '#',
        bgGradient: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
        bgImage: 'https://picsum.photos/seed/gpu-banner/1200/400',
      },
      ...sampleSlides.slice(1),
    ],
    interval: 5000,
    height: 400,
    sidePanel: <SidePanelLogin />,
  },
};

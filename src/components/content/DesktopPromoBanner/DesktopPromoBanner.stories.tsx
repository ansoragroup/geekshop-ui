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

export const Default: Story = {
  args: {
    title: 'GPU Mega Sale',
    description: 'RTX 4060 & 4070 at unbeatable prices. Limited stock available.',
    image: 'https://picsum.photos/seed/promo-gpu/400/300',
    imageAlign: 'right',
    tag: '-30%',
    ctaText: 'Shop GPUs',
    background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

export const ImageLeft: Story = {
  args: {
    title: 'Gaming Keyboards',
    description: 'Mechanical keyboards from Keychron, Razer, and Logitech.',
    image: 'https://picsum.photos/seed/promo-keyboard/400/300',
    imageAlign: 'left',
    tag: 'NEW',
    ctaText: 'Browse Collection',
    background: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
};

export const GreenTheme: Story = {
  args: {
    title: 'Eco-Friendly Tech',
    description: 'Save energy and money with our green-certified products.',
    image: 'https://picsum.photos/seed/promo-eco/400/300',
    imageAlign: 'right',
    ctaText: 'Learn More',
    background: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
  },
};

export const TwoBanners: Story = {
  name: 'Two Banners (stacked)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopPromoBanner
        title="Laptop Festival"
        description="Up to 40% off on ASUS, MSI, and Lenovo laptops"
        image="https://picsum.photos/seed/promo-laptop/400/300"
        imageAlign="right"
        tag="-40%"
        ctaText="Shop Now"
        background="linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)"
      />
      <DesktopPromoBanner
        title="Audio Essentials"
        description="Premium headphones and speakers from Sony, JBL, and Bose"
        image="https://picsum.photos/seed/promo-audio/400/300"
        imageAlign="left"
        tag="HOT"
        ctaText="Explore"
        background="linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)"
      />
    </div>
  ),
};

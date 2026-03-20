import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTabs } from './DesktopTabs';

const DescriptionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h10" />
  </svg>
);

const SpecsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 3v18" />
  </svg>
);

const ReviewsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9 9H2l6 4.5L5.5 21 12 16.5 18.5 21 16 13.5 22 9h-7L12 2z" />
  </svg>
);

const meta = {
  title: 'Navigation (Desktop)/DesktopTabs',
  component: DesktopTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const productDetailItems = [
  {
    key: 'description',
    label: 'Description',
    icon: <DescriptionIcon />,
    children: (
      <div style={{ padding: '16px 0', color: '#666', lineHeight: 1.6 }}>
        <p>The NVIDIA GeForce RTX 4090 is the ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.</p>
        <p style={{ marginTop: 12 }}>Experience ultra-high performance gaming, incredibly detailed virtual worlds, unprecedented productivity, and new ways to create.</p>
      </div>
    ),
  },
  {
    key: 'specs',
    label: 'Specifications',
    icon: <SpecsIcon />,
    children: (
      <div style={{ padding: '16px 0', color: '#666' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><strong>GPU:</strong> AD102</div>
          <div><strong>CUDA Cores:</strong> 16,384</div>
          <div><strong>Memory:</strong> 24GB GDDR6X</div>
          <div><strong>TDP:</strong> 450W</div>
        </div>
      </div>
    ),
  },
  {
    key: 'reviews',
    label: 'Reviews',
    icon: <ReviewsIcon />,
    badge: 128,
    children: (
      <div style={{ padding: '16px 0', color: '#666' }}>
        <p>128 customer reviews with an average rating of 4.8 out of 5 stars.</p>
      </div>
    ),
  },
  {
    key: 'qa',
    label: 'Q&A',
    badge: 45,
    children: (
      <div style={{ padding: '16px 0', color: '#666' }}>
        <p>45 questions and answers from the community.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: productDetailItems,
    activeKey: 'description',
  },
};

export const CardVariant: Story = {
  args: {
    items: productDetailItems,
    activeKey: 'description',
    variant: 'card',
  },
};

export const SmallSize: Story = {
  args: {
    items: productDetailItems,
    activeKey: 'specs',
    size: 'sm',
  },
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      ...productDetailItems.slice(0, 3),
      {
        key: 'shipping',
        label: 'Shipping Info',
        disabled: true,
        children: <div>Shipping information unavailable.</div>,
      },
    ],
    activeKey: 'description',
  },
};

export const SimpleTextTabs: Story = {
  args: {
    items: [
      { key: 'overview', label: 'Overview', children: <div style={{ padding: '16px 0', color: '#666' }}>Product overview content goes here with detailed information about the item.</div> },
      { key: 'features', label: 'Features', children: <div style={{ padding: '16px 0', color: '#666' }}>Key features and highlights of the product.</div> },
      { key: 'warranty', label: 'Warranty', children: <div style={{ padding: '16px 0', color: '#666' }}>2-year manufacturer warranty included.</div> },
    ],
    activeKey: 'overview',
  },
};

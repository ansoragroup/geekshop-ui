import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopActionBar } from './DesktopActionBar';

const meta = {
  title: 'Commerce (Desktop)/DesktopActionBar',
  component: DesktopActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [(Story) => (
    <div style={{ width: 700, padding: 24, background: '#f5f5f5' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 14_500_000,
    originalPrice: 18_900_000,
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    isFavorite: false,
    shareLabel: 'Share',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

export const Favorited: Story = {
  args: {
    ...Default.args,
    isFavorite: true,
  },
};

export const NoPriceDisplay: Story = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
  },
};

export const PrimaryOnly: Story = {
  args: {
    price: 8_900_000,
    primaryLabel: 'Buy Now',
    onPrimary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

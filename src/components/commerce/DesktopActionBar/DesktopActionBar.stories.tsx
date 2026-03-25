import { useState } from 'react';
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

/** Default: price with original price (strikethrough), both CTA buttons, favorite, and share. */
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

/** Favorited state: heart icon is filled red. */
export const Favorited: Story = {
  args: {
    ...Default.args,
    isFavorite: true,
  },
};

/** No price display (price undefined). */
export const NoPriceDisplay: Story = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
  },
};

/** Primary CTA only (no secondary/add to cart button). */
export const PrimaryOnly: Story = {
  args: {
    price: 8_900_000,
    primaryLabel: 'Buy Now',
    onPrimary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

/** Secondary CTA only (no buy now button). */
export const SecondaryOnly: Story = {
  args: {
    price: 3_200_000,
    secondaryLabel: 'Add to Cart',
    onSecondary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

/** No original price (no discount/strikethrough). */
export const NoDiscount: Story = {
  args: {
    price: 12_000_000,
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

/** No favorite or share buttons. */
export const NoUtilityButtons: Story = {
  args: {
    price: 5_900_000,
    originalPrice: 7_200_000,
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    onPrimary: fn(),
    onSecondary: fn(),
  },
};

/** Only share button visible (no favorite). */
export const ShareOnly: Story = {
  args: {
    price: 2_100_000,
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    shareLabel: 'Share this product',
    onPrimary: fn(),
    onSecondary: fn(),
    onShare: fn(),
  },
};

/** Custom CTA labels for a different context (pre-order scenario). */
export const PreOrder: Story = {
  args: {
    price: 22_500_000,
    primaryLabel: 'Pre-Order Now',
    secondaryLabel: 'Notify Me',
    isFavorite: false,
    shareLabel: 'Share',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

/** All props filled: price, original price, both CTAs, favorited, share. */
export const FullFeatured: Story = {
  args: {
    price: 42_500_000,
    originalPrice: 49_900_000,
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    isFavorite: true,
    shareLabel: 'Share',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
};

/** Very cheap item (low price). */
export const CheapItem: Story = {
  args: {
    price: 25_000,
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    onPrimary: fn(),
    onSecondary: fn(),
    onFavorite: fn(),
  },
};

/** Interactive: toggle favorite on click. */
export const Interactive: Story = {
  render: () => {
    const [isFav, setIsFav] = useState(false);

    return (
      <div>
        <DesktopActionBar
          price={14_500_000}
          originalPrice={18_900_000}
          primaryLabel="Buy Now"
          secondaryLabel="Add to Cart"
          isFavorite={isFav}
          shareLabel="Share"
          onPrimary={() => alert('Buy Now clicked!')}
          onSecondary={() => alert('Added to cart!')}
          onFavorite={() => setIsFav((prev) => !prev)}
          onShare={() => alert('Share dialog opened')}
        />
        <p style={{ marginTop: 12, color: '#666', fontSize: 14 }}>
          Favorite: <strong>{isFav ? 'Yes' : 'No'}</strong>
        </p>
      </div>
    );
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionBar } from './ActionBar';

const meta = {
  title: 'Commerce/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, margin: '0 auto', minHeight: 200, position: 'relative' }}>
        <div style={{ padding: 16, color: '#999', fontSize: 13, textAlign: 'center' }}>
          Mahsulot sahifasi kontenti
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cartCount: 3,
    isFavorite: false,
  },
};

export const WithBadge: Story = {
  args: {
    cartCount: 12,
    isFavorite: false,
  },
};

export const Favorited: Story = {
  args: {
    cartCount: 5,
    isFavorite: true,
  },
};

export const OverflowBadge: Story = {
  args: {
    cartCount: 150,
    isFavorite: false,
  },
};

export const EmptyCart: Story = {
  args: {
    cartCount: 0,
    isFavorite: false,
  },
};

export const Interactive = () => {
  const [fav, setFav] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  return (
    <div style={{ maxWidth: 420, margin: '0 auto', minHeight: 200, position: 'relative' }}>
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          fontSize: 13,
          color: '#666',
        }}
      >
        <div>NVIDIA GeForce RTX 4070 Ti SUPER 16GB</div>
        <div style={{ color: '#FF0000', fontWeight: 700, fontSize: 20 }}>8 200 000 so'm</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
          Savatdagi mahsulotlar: {cartCount}
        </div>
      </div>
      <ActionBar
        cartCount={cartCount}
        isFavorite={fav}
        onFavorite={() => setFav(!fav)}
        onAddToCart={() => setCartCount((c) => c + 1)}
        onBuyNow={() => alert("Sotib olish sahifasiga o'tish")}
        onChat={() => alert('Aloqa oynasi ochildi')}
        onCart={() => alert('Savat sahifasiga otish')}
      />
    </div>
  );
};

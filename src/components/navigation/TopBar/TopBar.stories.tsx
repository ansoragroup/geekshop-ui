import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './TopBar';

const meta = {
  title: 'Navigation/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftItems: [
      <span key="welcome">Welcome to GeekShop!</span>,
      <a key="seller" href="/page">Seller Center</a>,
      <a key="help" href="/page">Help & Support</a>,
    ],
    rightItems: [
      <button key="lang" type="button">EN</button>,
      <button key="currency" type="button">$ USD</button>,
    ],
  },
};

export const LeftOnly: Story = {
  args: {
    leftItems: [
      <span key="welcome">Free shipping on orders over $50</span>,
      <a key="deals" href="/page">Today&apos;s Deals</a>,
    ],
  },
};

export const RightOnly: Story = {
  args: {
    rightItems: [
      <a key="track" href="/page">Track Order</a>,
      <button key="lang" type="button">EN</button>,
      <button key="currency" type="button">$ USD</button>,
    ],
  },
};

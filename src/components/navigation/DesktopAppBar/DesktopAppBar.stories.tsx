import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAppBar } from './DesktopAppBar';

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

const meta = {
  title: 'Navigation (Desktop)/DesktopAppBar',
  component: DesktopAppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Product Details',
    onBack: () => {},
  },
};

export const WithActions: Story = {
  args: {
    title: 'RTX 4090 Gaming OC',
    onBack: () => {},
    actions: [
      { icon: <HeartIcon />, onClick: () => {}, label: 'Add to wishlist' },
      { icon: <ShareIcon />, onClick: () => {}, label: 'Share' },
      { icon: <MoreIcon />, onClick: () => {}, label: 'More options' },
    ],
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'My Orders',
  },
};

export const Transparent: Story = {
  args: {
    title: 'Category: GPUs',
    onBack: () => {},
    transparent: true,
    actions: [
      { icon: <ShareIcon />, onClick: () => {}, label: 'Share' },
    ],
  },
};

export const NoTitle: Story = {
  args: {
    onBack: () => {},
    actions: [
      { icon: <HeartIcon />, onClick: () => {}, label: 'Wishlist' },
      { icon: <ShareIcon />, onClick: () => {}, label: 'Share' },
    ],
  },
};

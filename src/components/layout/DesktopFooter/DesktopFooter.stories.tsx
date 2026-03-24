import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFooter } from './DesktopFooter';

const meta = {
  title: 'Layout (Desktop)/DesktopFooter',
  component: DesktopFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultColumns = [
  {
    title: 'CUSTOMERS',
    links: [
      { label: 'Support', href: '/support' },
      { label: 'Sale Calendar', href: '/sales' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'PARTNERS',
    links: [
      { label: 'Sell on Platform', href: '/sell' },
      { label: 'Affiliate Program', href: '/affiliate' },
    ],
  },
  {
    title: 'ABOUT',
    links: [
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'SOCIAL',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Telegram', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
  },
];

export const Default: Story = {
  args: {
    columns: defaultColumns,
    copyright: '© MyShop 2024 – 2026',
    legalText: 'This platform uses recommended technologies.',
    policyLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    appBadges: [
      { label: 'Google Play', image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg', href: '#' },
      { label: 'App Store', image: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg', href: '#' },
    ],
  },
};

export const Minimal: Story = {
  args: {
    columns: defaultColumns.slice(0, 2),
    copyright: '© Store 2026',
  },
};

export const ColumnsOnly: Story = {
  args: {
    columns: defaultColumns,
  },
};

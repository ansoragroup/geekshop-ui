import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFooter } from './DesktopFooter';
import type { DesktopFooterColumn, DesktopFooterAppBadge, DesktopFooterLink } from './DesktopFooter';

const fullColumns: DesktopFooterColumn[] = [
  {
    title: 'CUSTOMERS',
    links: [
      { label: 'Support Center', href: '/support' },
      { label: 'Sale Calendar', href: '/sales' },
      { label: 'Help Center', href: '/help' },
      { label: 'Track Order', href: '/tracking' },
      { label: 'Returns & Refunds', href: '/returns' },
    ],
  },
  {
    title: 'PARTNERS',
    links: [
      { label: 'Sell on GeekShop', href: '/sell' },
      { label: 'Affiliate Program', href: '/affiliate' },
      { label: 'Business Accounts', href: '/b2b' },
      { label: 'Seller Dashboard', href: '/seller' },
    ],
  },
  {
    title: 'ABOUT',
    links: [
      { label: 'Careers', href: '/careers' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'SOCIAL',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Telegram', href: 'https://t.me/geekshop' },
      { label: 'Twitter / X', href: 'https://x.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
    ],
  },
];

const minimalColumns: DesktopFooterColumn[] = [
  {
    title: 'SUPPORT',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const defaultAppBadges: DesktopFooterAppBadge[] = [
  { label: 'Google Play', image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg', href: '#' },
  { label: 'App Store', image: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg', href: '#' },
];

const defaultPolicyLinks: DesktopFooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

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

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    columns: fullColumns,
    copyright: '© GeekShop 2024 - 2026',
    legalText: 'This platform uses recommended technologies for secure transactions.',
    policyLinks: defaultPolicyLinks,
    appBadges: defaultAppBadges,
  },
};

/* ─── Minimal ─── */

export const Minimal: Story = {
  args: {
    columns: minimalColumns,
    copyright: '© Store 2026',
  },
};

/* ─── Columns Only ─── */

export const ColumnsOnly: Story = {
  args: {
    columns: fullColumns,
  },
};

/* ─── With App Badges ─── */

export const WithAppBadges: Story = {
  name: 'With App Store Badges',
  args: {
    columns: fullColumns,
    copyright: '© GeekShop 2026',
    appBadges: defaultAppBadges,
  },
};

/* ─── With Policy Links ─── */

export const WithPolicyLinks: Story = {
  name: 'With Policy Links',
  args: {
    columns: minimalColumns,
    copyright: '© GeekShop 2026',
    policyLinks: defaultPolicyLinks,
  },
};

/* ─── With Legal Text ─── */

export const WithLegalText: Story = {
  name: 'With Legal — Compliance Text',
  args: {
    columns: minimalColumns,
    copyright: '© GeekShop 2026. All rights reserved.',
    legalText: 'GeekShop LLC is registered in Uzbekistan. Registration No. 12345. All transactions are processed securely through PCI DSS compliant payment gateways.',
    policyLinks: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
};

/* ─── Custom Bottom Bar ─── */

export const CustomBottomBar: Story = {
  name: 'Custom Bottom Bar',
  args: {
    columns: fullColumns,
    bottomBar: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ fontSize: 13, color: '#666' }}>© GeekShop 2026 | Made with care in Tashkent</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#FF5000', fontWeight: 600 }}>UZ</span>
          <span style={{ fontSize: 13, color: '#666' }}>RU</span>
          <span style={{ fontSize: 13, color: '#666' }}>EN</span>
        </div>
      </div>
    ),
  },
};

/* ─── Many Columns ─── */

export const SixColumns: Story = {
  name: '6 Columns (Dense)',
  args: {
    columns: [
      ...fullColumns,
      {
        title: 'CATEGORIES',
        links: [
          { label: 'Electronics', href: '/c/electronics' },
          { label: 'Clothing', href: '/c/clothing' },
          { label: 'Home', href: '/c/home' },
        ],
      },
      {
        title: 'PAYMENT',
        links: [
          { label: 'Click', href: '#' },
          { label: 'Payme', href: '#' },
          { label: 'Visa / MC', href: '#' },
        ],
      },
    ],
    copyright: '© GeekShop 2026',
    policyLinks: defaultPolicyLinks,
  },
};

/* ─── Single Column ─── */

export const SingleColumn: Story = {
  args: {
    columns: [
      {
        title: 'QUICK LINKS',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Support', href: '/support' },
          { label: 'Blog', href: '/blog' },
        ],
      },
    ],
    copyright: '© GeekShop 2026',
  },
};

/* ─── Copyright Only ─── */

export const CopyrightOnly: Story = {
  name: 'Copyright Only (No Columns)',
  args: {
    copyright: '© GeekShop 2026. All rights reserved.',
    policyLinks: defaultPolicyLinks,
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    columns: fullColumns,
    copyright: '© GeekShop 2024 - 2026. All rights reserved.',
    legalText: 'GeekShop LLC | Registration No. 12345 | Tashkent, Uzbekistan. Prices include VAT where applicable.',
    policyLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
    appBadges: defaultAppBadges,
  },
};

/* ─── With onClick handlers ─── */

export const WithClickHandlers: Story = {
  name: 'Links with onClick (No Navigation)',
  args: {
    columns: [
      {
        title: 'QUICK ACTIONS',
        links: [
          { label: 'Open Live Chat', onClick: () => alert('Live chat opened') },
          { label: 'Download App', onClick: () => alert('Download started') },
          { label: 'Switch Language', onClick: () => alert('Language picker') },
        ],
      },
    ],
    copyright: '© GeekShop 2026',
  },
};

/* ─── Empty Footer ─── */

export const Empty: Story = {
  name: 'Empty (No Props)',
  args: {},
};

/* ─── Dark Context ─── */

export const OnDarkBackground: Story = {
  name: 'On Dark Page Background',
  decorators: [
    (Story) => (
      <div style={{ background: '#1A1A1A', padding: '40px 0 0' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns: fullColumns,
    copyright: '© GeekShop 2026',
    policyLinks: defaultPolicyLinks,
    appBadges: defaultAppBadges,
  },
};

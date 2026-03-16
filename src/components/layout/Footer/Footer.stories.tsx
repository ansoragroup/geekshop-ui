import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Footer } from './Footer';
import type { FooterColumn, FooterSocial } from './Footer';

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const defaultColumns: FooterColumn[] = [
  {
    title: 'About Us',
    links: [
      { label: 'About GeekShop', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Returns & Refunds', href: '/returns' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'GPUs & Graphics Cards', href: '/category/gpus' },
      { label: 'Processors & CPUs', href: '/category/cpus' },
      { label: 'Monitors & Displays', href: '/category/monitors' },
      { label: 'Laptops & Notebooks', href: '/category/laptops' },
    ],
  },
];

const defaultSocialLinks: FooterSocial[] = [
  { icon: <TelegramIcon />, label: 'Telegram', href: 'https://t.me/geekshop' },
  { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com/geekshop' },
  { icon: <YouTubeIcon />, label: 'YouTube', href: 'https://youtube.com/geekshop' },
  { icon: <TwitterIcon />, label: 'X (Twitter)', href: 'https://x.com/geekshop' },
];

const defaultBottomLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: defaultColumns,
    socialLinks: defaultSocialLinks,
    bottomLinks: defaultBottomLinks,
    onSubscribe: fn(),
  },
};

export const WithCustomLogo: Story = {
  args: {
    columns: defaultColumns,
    logo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32,
          height: 32,
          background: '#FF5000',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: 16,
        }}>
          G
        </div>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>GeekShop</span>
      </div>
    ),
    socialLinks: defaultSocialLinks,
    bottomLinks: defaultBottomLinks,
    onSubscribe: fn(),
  },
};

export const WithoutNewsletter: Story = {
  args: {
    columns: defaultColumns,
    socialLinks: defaultSocialLinks,
    showNewsletter: false,
    bottomLinks: defaultBottomLinks,
  },
};

export const Minimal: Story = {
  args: {
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help', href: '/help' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
    ],
    showNewsletter: false,
    copyrightText: '\u00A9 2026 GeekShop',
  },
};

export const InteractiveNewsletter: Story = {
  render: () => {
    const [subscribed, setSubscribed] = useState(false);

    return (
      <div>
        {subscribed && (
          <div style={{ padding: 16, background: '#07C160', color: '#fff', textAlign: 'center', fontSize: 14 }}>
            Successfully subscribed!
          </div>
        )}
        <Footer
          columns={defaultColumns}
          socialLinks={defaultSocialLinks}
          bottomLinks={defaultBottomLinks}
          onSubscribe={(email) => {
            console.log('Subscribed:', email);
            setSubscribed(true);
          }}
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopTelegramLoginButton } from './DesktopTelegramLoginButton';

const meta = {
  title: 'Forms (Desktop)/DesktopTelegramLoginButton',
  component: DesktopTelegramLoginButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    cornerRadius: { control: { type: 'number', min: 0, max: 24 } },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopTelegramLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    onAuth: fn(),
  },
};

/* ─── All Sizes ─── */

export const Small: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'sm',
    onAuth: fn(),
  },
};

export const Medium: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    onAuth: fn(),
  },
};

export const Large: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'lg',
    onAuth: fn(),
  },
};

export const AllSizes: Story = {
  name: 'All Sizes Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Small</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" size="sm" />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Medium</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" size="md" />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Large</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" size="lg" />
      </div>
    </div>
  ),
};

/* ─── Custom Label ─── */

export const CustomLabel: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    label: 'Continue with Telegram',
    onAuth: fn(),
  },
};

export const ShortLabel: Story = {
  name: 'Short Custom Label',
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    label: 'Telegram',
    onAuth: fn(),
  },
};

export const LongLabel: Story = {
  name: 'Long Custom Label',
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    label: 'Sign in with your Telegram account for instant access',
    onAuth: fn(),
  },
};

/* ─── Corner Radius ─── */

export const RoundedCorners: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    cornerRadius: 24,
    onAuth: fn(),
  },
};

export const SquareCorners: Story = {
  name: 'Square Corners (0px)',
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    cornerRadius: 0,
    onAuth: fn(),
  },
};

export const RadiusComparison: Story = {
  name: 'Corner Radius Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>0px</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" cornerRadius={0} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>4px</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" cornerRadius={4} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>8px (default)</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" cornerRadius={8} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>16px</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" cornerRadius={16} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>24px (pill)</div>
        <DesktopTelegramLoginButton botName="GeekShopBot" cornerRadius={24} />
      </div>
    </div>
  ),
};

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    disabled: true,
  },
};

/* ─── With Callback URL ─── */

export const WithCallbackUrl: Story = {
  name: 'With Callback URL',
  args: {
    botName: 'GeekShopBot',
    size: 'md',
    callbackUrl: 'https://geekshop.uz/auth/telegram/callback',
    label: 'Log in with Telegram',
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    botName: 'GeekShopBot',
    size: 'lg',
    label: 'Continue with Telegram',
    cornerRadius: 12,
    requestAccess: true,
    disabled: false,
    onAuth: fn(),
  },
};

/* ─── Realistic: Login Page ─── */

export const LoginPageComposition: Story = {
  name: 'Login Page Social Buttons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320, margin: '0 auto' }}>
      <div style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 8 }}>
        Or continue with
      </div>
      <DesktopTelegramLoginButton botName="GeekShopBot" size="lg" cornerRadius={8} />
      <button
        type="button"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          height: 48, border: '1.5px solid #eee', borderRadius: 8, background: '#fff',
          fontSize: 15, color: '#1A1A1A', cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8a4.1 4.1 0 01-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z" fill="#4285F4" />
          <path d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3C2.4 15.9 5.5 18 9 18z" fill="#34A853" />
          <path d="M3.9 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5H.9A9 9 0 000 9c0 1.5.3 2.8.9 4l3-2.3z" fill="#FBBC05" />
          <path d="M9 3.6c1.3 0 2.5.5 3.4 1.4l2.6-2.6C13.5.9 11.4 0 9 0 5.5 0 2.4 2.1.9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopResult } from './DesktopResult';

const meta = {
  title: 'Feedback (Desktop)/DesktopResult',
  component: DesktopResult,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopResult>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- EACH STATUS ---

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Order Placed Successfully!',
    description: 'Your order #GS-2026-0082 has been confirmed. You will receive a confirmation email shortly.',
    primaryAction: { label: 'View Order', onClick: fn() },
    secondaryAction: { label: 'Continue Shopping', onClick: fn() },
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Payment Failed',
    description: 'We could not process your payment for order #GS-2026-0083. Please check your card details and try again.',
    primaryAction: { label: 'Try Again', onClick: fn() },
    secondaryAction: { label: 'Change Payment Method', onClick: fn() },
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Items Out of Stock',
    description: 'Some items in your cart are no longer available. We have automatically removed MSI RTX 4060 (Black) and Samsung 990 EVO 2TB.',
    primaryAction: { label: 'Review Cart', onClick: fn() },
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Account Verification Required',
    description: 'Please verify your email address (j***@gmail.com) to complete your registration and start shopping.',
    primaryAction: { label: 'Resend Email', onClick: fn() },
    secondaryAction: { label: 'Change Email', onClick: fn() },
  },
};

// --- FULL FEATURED ---

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    status: 'success',
    title: 'Return Request Submitted',
    description: 'Your return request for order #GS-2026-0047 has been received. Our team will review it within 1-2 business days. You will receive an email with the return shipping label.',
    primaryAction: { label: 'Track Return Status', onClick: fn() },
    secondaryAction: { label: 'Back to Orders', onClick: fn() },
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M30 14H18v20h12M24 20l-6 4 6 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

// --- WITHOUT ACTIONS ---

export const NoActions: Story = {
  name: 'No Action Buttons',
  args: {
    status: 'success',
    title: 'All Caught Up!',
    description: 'You have no new notifications at this time.',
  },
};

// --- PRIMARY ACTION ONLY ---

export const PrimaryOnly: Story = {
  name: 'Primary Action Only',
  args: {
    status: 'warning',
    title: 'Session Expiring',
    description: 'Your session will expire in 5 minutes due to inactivity. Please save your progress.',
    primaryAction: { label: 'Stay Signed In', onClick: fn() },
  },
};

// --- WITHOUT DESCRIPTION ---

export const NoDescription: Story = {
  name: 'Without Description',
  args: {
    status: 'success',
    title: 'Email Verified!',
    primaryAction: { label: 'Go to Dashboard', onClick: fn() },
  },
};

// --- CUSTOM ICON ---

export const CustomIcon: Story = {
  name: 'Custom Icon Override',
  args: {
    status: 'success',
    title: 'Subscription Activated',
    description: 'Welcome to GeekShop Premium! Enjoy exclusive discounts, free shipping, and early access to sales.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4l5.18 10.5L40 16.36l-8 7.8 1.89 11L24 30l-9.89 5.16L16 24.16l-8-7.8 10.82-1.86L24 4z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
    primaryAction: { label: 'Explore Benefits', onClick: fn() },
    secondaryAction: { label: 'Maybe Later', onClick: fn() },
  },
};

// --- E-COMMERCE SCENARIOS ---

export const OrderDelivered: Story = {
  name: 'Scenario: Order Delivered',
  args: {
    status: 'success',
    title: 'Package Delivered!',
    description: 'Your order #GS-2026-0047 was delivered to your doorstep at 10:30 AM today. Enjoy your new MSI RTX 4060!',
    primaryAction: { label: 'Write a Review', onClick: fn() },
    secondaryAction: { label: 'Report Issue', onClick: fn() },
  },
};

export const AccountLocked: Story = {
  name: 'Scenario: Account Locked',
  args: {
    status: 'error',
    title: 'Account Temporarily Locked',
    description: 'Too many failed login attempts detected. Your account has been locked for 30 minutes for security reasons.',
    primaryAction: { label: 'Reset Password', onClick: fn() },
    secondaryAction: { label: 'Contact Support', onClick: fn() },
  },
};

export const CouponExpired: Story = {
  name: 'Scenario: Coupon Expired',
  args: {
    status: 'warning',
    title: 'Coupon Has Expired',
    description: 'The coupon code SAVE20 expired on 20 March 2026. Check our current promotions for active deals.',
    primaryAction: { label: 'View Promotions', onClick: fn() },
  },
};

export const PasswordChanged: Story = {
  name: 'Scenario: Password Changed',
  args: {
    status: 'info',
    title: 'Password Updated',
    description: 'Your password has been changed successfully. For security, you have been signed out of all other devices.',
    primaryAction: { label: 'Continue to Account', onClick: fn() },
  },
};

// --- ALL STATUSES ---

export const AllStatuses: Story = {
  name: 'All Statuses Overview',
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #eee' }}>
        <DesktopResult status="success" title="Success State" description="Operation completed successfully." primaryAction={{ label: 'Continue', onClick: fn() }} />
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #eee' }}>
        <DesktopResult status="error" title="Error State" description="Something went wrong." primaryAction={{ label: 'Retry', onClick: fn() }} />
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #eee' }}>
        <DesktopResult status="warning" title="Warning State" description="Attention needed." primaryAction={{ label: 'Review', onClick: fn() }} />
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #eee' }}>
        <DesktopResult status="info" title="Info State" description="Here is some information." primaryAction={{ label: 'Got It', onClick: fn() }} />
      </div>
    </>
  ),
};

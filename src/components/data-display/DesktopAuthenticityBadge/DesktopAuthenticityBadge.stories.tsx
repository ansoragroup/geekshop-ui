import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DesktopAuthenticityBadge,
  type DesktopAuthenticityStatus,
} from './DesktopAuthenticityBadge';

const meta = {
  title: 'Data Display (Desktop)/DesktopAuthenticityBadge',
  component: DesktopAuthenticityBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 900,
          padding: 24,
          background: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopAuthenticityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  args: {
    status: 'verified',
    verifiedBy: 'GeekShop Verify',
    verifiedDate: '15 Mar 2026',
  },
};

export const Official: Story = {
  args: {
    status: 'official',
    verifiedBy: 'Samsung Official',
    verifiedDate: '10 Jan 2026',
    tooltip: 'This is an official Samsung store verified by GeekShop',
  },
};

export const Unverified: Story = {
  args: {
    status: 'unverified',
    verifiedBy: 'GeekShop Verify',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopAuthenticityBadge
        status="verified"
        verifiedBy="GeekShop Verify"
        verifiedDate="15 Mar 2026"
      />
      <DesktopAuthenticityBadge
        status="official"
        verifiedBy="Apple Official"
        verifiedDate="1 Feb 2026"
      />
      <DesktopAuthenticityBadge status="unverified" />
    </div>
  ),
};

export const CustomLabel: Story = {
  name: 'Custom Label Override',
  args: {
    status: 'verified',
    label: 'Authenticity Guaranteed',
    verifiedBy: 'International QA Labs',
    verifiedDate: '5 Feb 2026',
  },
};

export const CustomTooltip: Story = {
  name: 'Custom Tooltip Text',
  args: {
    status: 'official',
    verifiedBy: 'Xiaomi Official',
    verifiedDate: '22 Mar 2026',
    tooltip:
      'Xiaomi authorized retail partner in Uzbekistan since 2023. All products come with official warranty.',
  },
};

export const NoVerifiedDate: Story = {
  name: 'Without Verification Date',
  args: {
    status: 'verified',
    verifiedBy: 'Amazon Verified Purchase',
  },
};

export const LongVerifierName: Story = {
  args: {
    status: 'official',
    label: 'Authorized Dealer',
    verifiedBy: 'Samsung Electronics Central Asia Regional Authorized Distributor',
    verifiedDate: '1 Jan 2026',
  },
};

export const OfficialAppleStore: Story = {
  args: {
    status: 'official',
    verifiedBy: 'Apple Inc.',
    verifiedDate: '12 Mar 2026',
    tooltip:
      'Apple Authorized Reseller verified by GeekShop. All products carry manufacturer warranty.',
  },
};

export const UnverifiedSeller: Story = {
  name: 'Unverified Third-Party Seller',
  args: {
    status: 'unverified',
    verifiedBy: 'Pending Review',
    tooltip: 'This seller has not been verified yet. Purchase at your own discretion.',
  },
};

export const InteractiveCycleStatuses: Story = {
  name: 'Interactive: Cycle Through Statuses',
  render: () => {
    const statuses: DesktopAuthenticityStatus[] = ['verified', 'official', 'unverified'];
    const verifiers = ['GeekShop Verify', 'Sony Official', 'Pending Review'];
    const [index, setIndex] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <DesktopAuthenticityBadge
          status={statuses[index]}
          verifiedBy={verifiers[index]}
          verifiedDate={index < 2 ? '20 Mar 2026' : undefined}
        />
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev + 1) % statuses.length)}
          style={{
            padding: '8px 16px',
            background: '#FF5000',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Next Status ({statuses[(index + 1) % statuses.length]})
        </button>
      </div>
    );
  },
};

export const InProductContext: Story = {
  name: 'Inside Product Card Context',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>
          Samsung Galaxy S24 Ultra 256GB
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#FF5000' }}>14 990 000 UZS</div>
        <DesktopAuthenticityBadge
          status="official"
          verifiedBy="Samsung Official"
          verifiedDate="10 Mar 2026"
        />
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>
          Generic USB-C Cable 2m
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#FF5000' }}>45 000 UZS</div>
        <DesktopAuthenticityBadge status="unverified" verifiedBy="Unknown Seller" />
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>
          Sony WH-1000XM5 Headphones
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#FF5000' }}>4 200 000 UZS</div>
        <DesktopAuthenticityBadge
          status="verified"
          verifiedBy="GeekShop Verify"
          verifiedDate="8 Mar 2026"
        />
      </div>
    </div>
  ),
};

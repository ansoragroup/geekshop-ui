import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopRadio, DesktopRadioGroup } from './DesktopRadio';

const meta = {
  title: 'Forms (Desktop)/DesktopRadio',
  component: DesktopRadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    direction: { control: 'radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    defaultValue: 'standard',
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="express">Express Delivery (1-2 days)</DesktopRadio>
      <DesktopRadio value="standard">Standard Delivery (3-5 days)</DesktopRadio>
      <DesktopRadio value="economy">Economy Delivery (7-10 days)</DesktopRadio>
    </DesktopRadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(3);
    const standard = canvas.getByRole('radio', { checked: true });
    await expect(standard).toBeInTheDocument();
    const express = radios[0];
    await userEvent.click(express);
    await expect(express).toBeChecked();
  },
};

/* ─── Directions ─── */

export const Vertical: Story = {
  args: {
    defaultValue: 'standard',
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="express">Express Delivery (1-2 days)</DesktopRadio>
      <DesktopRadio value="standard">Standard Delivery (3-5 days)</DesktopRadio>
      <DesktopRadio value="economy">Economy Delivery (7-10 days)</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    defaultValue: 'md',
    direction: 'horizontal',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="sm">Small</DesktopRadio>
      <DesktopRadio value="md">Medium</DesktopRadio>
      <DesktopRadio value="lg">Large</DesktopRadio>
      <DesktopRadio value="xl">X-Large</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

/* ─── With Descriptions ─── */

export const WithDescriptions: Story = {
  args: {
    defaultValue: 'card',
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="card" description="Visa, Mastercard, UnionPay accepted">
        Credit / Debit Card
      </DesktopRadio>
      <DesktopRadio value="click" description="Pay via Click mobile app">
        Click
      </DesktopRadio>
      <DesktopRadio value="payme" description="Pay via Payme mobile app">
        Payme
      </DesktopRadio>
      <DesktopRadio value="cash" description="Pay on delivery in cash or card">
        Cash on Delivery
      </DesktopRadio>
    </DesktopRadioGroup>
  ),
};

/* ─── Disabled States ─── */

export const DisabledGroup: Story = {
  name: 'Entire Group Disabled',
  args: {
    defaultValue: 'option1',
    direction: 'vertical',
    disabled: true,
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="option1">Selected option (locked)</DesktopRadio>
      <DesktopRadio value="option2">Another option</DesktopRadio>
      <DesktopRadio value="option3">Third option</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

export const PartiallyDisabled: Story = {
  name: 'Individual Options Disabled',
  args: {
    defaultValue: 'available',
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="available">In Stock (245 units)</DesktopRadio>
      <DesktopRadio value="preorder" description="Ships in 2-3 weeks">
        Pre-order
      </DesktopRadio>
      <DesktopRadio value="outofstock" disabled description="Currently unavailable">
        Out of Stock
      </DesktopRadio>
    </DesktopRadioGroup>
  ),
};

/* ─── No Default Selection ─── */

export const NoDefaultSelection: Story = {
  name: 'No Default (Nothing Selected)',
  args: {
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="standard">Standard</DesktopRadio>
      <DesktopRadio value="premium">Premium</DesktopRadio>
      <DesktopRadio value="enterprise">Enterprise</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    defaultValue: 'express',
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio
        value="same-day"
        description="Order before 2pm for same-day delivery in Tashkent"
      >
        Same Day Delivery
      </DesktopRadio>
      <DesktopRadio
        value="express"
        description="Guaranteed delivery within 24-48 hours. Free for orders over 500,000 UZS."
      >
        Express Delivery
      </DesktopRadio>
      <DesktopRadio value="standard" description="3-5 business days. Free for all orders.">
        Standard Delivery
      </DesktopRadio>
      <DesktopRadio value="pickup" description="Pick up from nearest GeekShop outlet" disabled>
        Store Pickup (Unavailable)
      </DesktopRadio>
    </DesktopRadioGroup>
  ),
};

/* ─── Controlled ─── */

export const Controlled: Story = {
  name: 'Controlled Radio Group',
  render: () => {
    const [value, setValue] = useState('monthly');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopRadioGroup value={value} onChange={setValue}>
          <DesktopRadio value="monthly" description="12,000 UZS/month">
            Monthly Plan
          </DesktopRadio>
          <DesktopRadio value="quarterly" description="10,000 UZS/month (save 17%)">
            Quarterly Plan
          </DesktopRadio>
          <DesktopRadio value="annual" description="8,000 UZS/month (save 33%)">
            Annual Plan
          </DesktopRadio>
        </DesktopRadioGroup>
        <div style={{ fontSize: 12, color: '#666' }}>Selected plan: {value}</div>
      </div>
    );
  },
};

/* ─── Edge Cases ─── */

export const LongLabels: Story = {
  name: 'Long Labels (Overflow)',
  args: {
    defaultValue: 'opt1',
    direction: 'vertical',
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio
        value="opt1"
        description="This is an extremely long description that should wrap properly within the available space without breaking the layout or causing horizontal scrolling"
      >
        Option with a very long label that might wrap to multiple lines depending on container width
      </DesktopRadio>
      <DesktopRadio value="opt2">Short option</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

export const SingleOption: Story = {
  name: 'Single Option (Edge Case)',
  args: {
    defaultValue: 'only',
    direction: 'vertical',
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="only" description="This is the only available option">
        Standard Delivery
      </DesktopRadio>
    </DesktopRadioGroup>
  ),
};

/* ─── Realistic: Shipping Method ─── */

export const ShippingMethodSelector: Story = {
  render: () => {
    const [method, setMethod] = useState('standard');

    const prices: Record<string, string> = {
      'same-day': '45,000 UZS',
      express: '25,000 UZS',
      standard: 'Free',
      economy: 'Free',
    };

    return (
      <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 16 }}>
          Shipping Method
        </div>
        <DesktopRadioGroup value={method} onChange={setMethod}>
          <DesktopRadio value="same-day" description="Today by 8pm (Tashkent only)">
            Same Day
          </DesktopRadio>
          <DesktopRadio value="express" description="Tomorrow, March 26">
            Express
          </DesktopRadio>
          <DesktopRadio value="standard" description="March 28 - March 30">
            Standard
          </DesktopRadio>
          <DesktopRadio value="economy" description="April 1 - April 5">
            Economy
          </DesktopRadio>
        </DesktopRadioGroup>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingTop: 12,
            borderTop: '1px solid #f0f0f0',
            fontSize: 14,
          }}
        >
          <span style={{ color: '#666' }}>Shipping cost:</span>
          <span
            style={{ fontWeight: 600, color: prices[method] === 'Free' ? '#07C160' : '#1A1A1A' }}
          >
            {prices[method]}
          </span>
        </div>
      </div>
    );
  },
};

/* ─── Horizontal with Descriptions ─── */

export const HorizontalWithDescriptions: Story = {
  name: 'Horizontal (with Descriptions)',
  args: {
    defaultValue: 'monthly',
    direction: 'horizontal',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="monthly" description="$10/mo">
        Monthly
      </DesktopRadio>
      <DesktopRadio value="quarterly" description="$8/mo">
        Quarterly
      </DesktopRadio>
      <DesktopRadio value="yearly" description="$6/mo">
        Yearly
      </DesktopRadio>
    </DesktopRadioGroup>
  ),
};

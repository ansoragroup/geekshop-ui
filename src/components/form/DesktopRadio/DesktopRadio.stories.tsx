import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopRadio, DesktopRadioGroup } from './DesktopRadio';

const meta = {
  title: 'Forms (Desktop)/DesktopRadio',
  component: DesktopRadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Disabled: Story = {
  args: {
    defaultValue: 'option1',
    direction: 'vertical',
    disabled: true,
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="option1">Option 1 (selected)</DesktopRadio>
      <DesktopRadio value="option2">Option 2</DesktopRadio>
      <DesktopRadio value="option3">Option 3</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

export const PartiallyDisabled: Story = {
  args: {
    defaultValue: 'available',
    direction: 'vertical',
    onChange: fn(),
    children: undefined,
  },
  render: (args) => (
    <DesktopRadioGroup {...args}>
      <DesktopRadio value="available">In Stock</DesktopRadio>
      <DesktopRadio value="preorder" description="Ships in 2-3 weeks">Pre-order</DesktopRadio>
      <DesktopRadio value="outofstock" disabled>Out of Stock</DesktopRadio>
    </DesktopRadioGroup>
  ),
};

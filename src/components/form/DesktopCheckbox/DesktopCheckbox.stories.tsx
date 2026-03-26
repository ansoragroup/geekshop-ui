import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopCheckbox } from './DesktopCheckbox';

const meta = {
  title: 'Form (Desktop)/DesktopCheckbox',
  component: DesktopCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic States ─── */

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me on this device',
    checked: true,
    onChange: fn(),
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: false,
    onChange: fn(),
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
    onChange: fn(),
  },
};

/* ─── Disabled States ─── */

export const Disabled: Story = {
  args: {
    label: 'This option is disabled',
    disabled: true,
    onChange: fn(),
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Mandatory agreement (locked)',
    checked: true,
    disabled: true,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    label: 'Partially selected (locked)',
    indeterminate: true,
    disabled: true,
  },
};

/* ─── No Label ─── */

export const NoLabel: Story = {
  name: 'Without Label',
  args: {
    checked: true,
    'aria-label': 'Select this item',
    onChange: fn(),
  },
};

/* ─── Uncontrolled ─── */

export const UncontrolledDefaultChecked: Story = {
  name: 'Uncontrolled (defaultChecked)',
  args: {
    label: 'Pre-checked by default',
    defaultChecked: true,
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 12, color: '#999' }}>Controlled checkbox with callback</div>
        <DesktopCheckbox
          label="Enable two-factor authentication for your account"
          checked={checked}
          onChange={setChecked}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          State: {checked ? 'Checked' : 'Unchecked'}
        </div>
      </div>
    );
  },
};

/* ─── All States Grid ─── */

export const AllStatesOverview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopCheckbox label="Unchecked (default)" />
      <DesktopCheckbox label="Checked" checked onChange={() => {}} />
      <DesktopCheckbox label="Indeterminate" indeterminate />
      <DesktopCheckbox label="Disabled unchecked" disabled />
      <DesktopCheckbox label="Disabled checked" checked disabled />
      <DesktopCheckbox label="Disabled indeterminate" indeterminate disabled />
    </div>
  ),
};

/* ─── Checkbox Group ─── */

export const CheckboxGroup: Story = {
  name: 'Filter Checkbox Group',
  render: () => {
    const options = [
      { id: 'free-shipping', label: 'Free shipping' },
      { id: 'in-stock', label: 'In stock only' },
      { id: 'on-sale', label: 'On sale' },
      { id: 'verified', label: 'Verified sellers' },
      { id: 'fast-delivery', label: 'Same-day delivery' },
    ];
    const [selected, setSelected] = useState<string[]>(['free-shipping', 'in-stock']);

    const toggle = (id: string) => {
      setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
          Filter options
        </div>
        {options.map((opt) => (
          <DesktopCheckbox
            key={opt.id}
            label={opt.label}
            checked={selected.includes(opt.id)}
            onChange={() => toggle(opt.id)}
          />
        ))}
        <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Selected: {selected.length} filters
        </div>
      </div>
    );
  },
};

/* ─── Select All Pattern ─── */

export const SelectAllPattern: Story = {
  name: 'Select All with Indeterminate',
  render: () => {
    const items = [
      'MacBook Pro 16"',
      'iPhone 15 Pro Max',
      'iPad Air M2',
      'AirPods Pro 3',
      'Apple Watch Ultra 2',
    ];
    const [selected, setSelected] = useState<string[]>(['MacBook Pro 16"', 'iPad Air M2']);

    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && !allSelected;

    const toggleAll = () => {
      setSelected(allSelected ? [] : [...items]);
    };

    const toggleItem = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
      );
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 16,
        }}
      >
        <DesktopCheckbox
          label={`Select all (${selected.length}/${items.length})`}
          checked={allSelected}
          indeterminate={someSelected}
          onChange={toggleAll}
        />
        <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }} />
        {items.map((item) => (
          <div key={item} style={{ paddingLeft: 28 }}>
            <DesktopCheckbox
              label={item}
              checked={selected.includes(item)}
              onChange={() => toggleItem(item)}
            />
          </div>
        ))}
      </div>
    );
  },
};

/* ─── Edge Cases ─── */

export const LongLabel: Story = {
  name: 'Long Label (Multiline)',
  args: {
    label:
      'I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy. I understand that my data will be processed in accordance with applicable laws.',
    onChange: fn(),
  },
};

/* ─── Realistic: Terms & Conditions ─── */

export const TermsCheckboxes: Story = {
  name: 'Checkout Terms',
  render: () => {
    const [terms, setTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [marketing, setMarketing] = useState(true);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
          Before completing your order
        </div>
        <DesktopCheckbox
          label="I agree to the Terms of Service"
          checked={terms}
          onChange={setTerms}
        />
        <DesktopCheckbox
          label="I have read the Privacy Policy"
          checked={privacy}
          onChange={setPrivacy}
        />
        <DesktopCheckbox
          label="Send me deals and promotions via email"
          checked={marketing}
          onChange={setMarketing}
        />
        <div
          style={{ fontSize: 12, color: terms && privacy ? '#07C160' : '#FF3B30', marginTop: 4 }}
        >
          {terms && privacy ? 'Ready to proceed!' : 'Please accept required agreements to continue'}
        </div>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CurrencySwitcher } from './CurrencySwitcher';
import type { CurrencyCode } from '../../../i18n/types';

const meta = {
  title: 'Navigation/CurrencySwitcher',
  component: CurrencySwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'iPhone13' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CurrencySwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledCurrencySwitcher({ initial = 'UZS' as CurrencyCode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(initial);
  return <CurrencySwitcher value={currency} onChange={setCurrency} />;
}

export const InlineDefault: Story = {
  args: {
    defaultValue: 'UZS',
    variant: 'inline',
  },
};

export const InlineUSD: Story = {
  args: {
    defaultValue: 'USD',
    variant: 'inline',
  },
};

export const InlineSmall: Story = {
  args: {
    defaultValue: 'UZS',
    variant: 'inline',
    size: 'sm',
  },
};

export const DropdownDefault: Story = {
  args: {
    defaultValue: 'UZS',
    variant: 'dropdown',
  },
};

export const DropdownSmall: Story = {
  args: {
    defaultValue: 'EUR',
    variant: 'dropdown',
    size: 'sm',
  },
};

export const Controlled: Story = {
  render: () => <ControlledCurrencySwitcher initial="USD" />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Inline — md</p>
        <CurrencySwitcher defaultValue="UZS" variant="inline" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Inline — sm</p>
        <CurrencySwitcher defaultValue="USD" variant="inline" size="sm" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Dropdown — md</p>
        <CurrencySwitcher defaultValue="UZS" variant="dropdown" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Dropdown — sm</p>
        <CurrencySwitcher defaultValue="EUR" variant="dropdown" size="sm" />
      </div>
    </div>
  ),
};

export const InlineClickTest: Story = {
  args: {
    defaultValue: 'UZS',
    variant: 'inline',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const radiogroup = canvas.getByRole('radiogroup');
    await expect(radiogroup).toBeInTheDocument();

    const uzsRadio = canvas.getByRole('radio', { name: /UZS/i });
    await expect(uzsRadio).toHaveAttribute('aria-checked', 'true');

    const usdRadio = canvas.getByRole('radio', { name: /USD/i });
    await userEvent.click(usdRadio);
    await expect(args.onChange).toHaveBeenCalledWith('USD');

    const eurRadio = canvas.getByRole('radio', { name: /EUR/i });
    await userEvent.click(eurRadio);
    await expect(args.onChange).toHaveBeenCalledWith('EUR');

    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};

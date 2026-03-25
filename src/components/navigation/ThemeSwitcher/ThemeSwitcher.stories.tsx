import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { ThemePreset } from '../../../theme/presets';
import { Button } from '../../form/Button';
import { PriceDisplay } from '../../product/PriceDisplay';
import { Tag } from '../../data-display/Tag';

const meta = {
  title: 'Navigation/ThemeSwitcher',
  component: ThemeSwitcher,
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
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'default',
  },
};

export const SmallSize: Story = {
  args: {
    defaultValue: 'default',
    size: 'sm',
  },
};

export const TealSelected: Story = {
  args: {
    defaultValue: 'teal',
  },
};

function ControlledDemo() {
  const [preset, setPreset] = useState<ThemePreset>('default');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
          Select a theme to see components update:
        </p>
        <ThemeSwitcher value={preset} onChange={setPreset} />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="primary" size="md">
          Buy Now
        </Button>
        <Button variant="secondary" size="md">
          Add to Cart
        </Button>
      </div>
      <PriceDisplay price={149900} originalPrice={259900} currency="UZS" size="lg" />
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag color="primary">New</Tag>
        <Tag color="success">In Stock</Tag>
        <Tag color="warning">Limited</Tag>
      </div>
      <p style={{ fontSize: 12, color: '#666' }}>
        Active preset: <strong>{preset}</strong>
      </p>
    </div>
  );
}

export const WithLivePreview: Story = {
  render: () => <ControlledDemo />,
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Medium (default)</p>
        <ThemeSwitcher defaultValue="default" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Small</p>
        <ThemeSwitcher defaultValue="default" size="sm" />
      </div>
    </div>
  ),
};

export const ClickTest: Story = {
  args: {
    defaultValue: 'default',
    onChange: fn(),
    applyOnChange: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const radiogroup = canvas.getByRole('radiogroup');
    await expect(radiogroup).toBeInTheDocument();
    // Default locale is Uzbek, so aria-label is t('aria.themePreset') = "Rang sxemasi"
    await expect(radiogroup).toHaveAttribute('aria-label', 'Rang sxemasi');

    // Default should be checked
    const defaultRadio = canvas.getByRole('radio', { name: /GeekShop Orange/i });
    await expect(defaultRadio).toHaveAttribute('aria-checked', 'true');

    // Click teal
    const tealRadio = canvas.getByRole('radio', { name: /Teal Tech/i });
    await userEvent.click(tealRadio);
    await expect(args.onChange).toHaveBeenCalledWith('teal');

    // Click red
    const redRadio = canvas.getByRole('radio', { name: /Classic Red/i });
    await userEvent.click(redRadio);
    await expect(args.onChange).toHaveBeenCalledWith('red');

    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};

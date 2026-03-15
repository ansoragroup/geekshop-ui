import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '../../../i18n/types';

const meta = {
  title: 'Navigation/LanguageSwitcher',
  component: LanguageSwitcher,
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
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledLanguageSwitcher({ initial = 'uz' as Locale }) {
  const [locale, setLocale] = useState<Locale>(initial);
  return <LanguageSwitcher value={locale} onChange={setLocale} />;
}

export const InlineDefault: Story = {
  args: {
    defaultValue: 'uz',
    variant: 'inline',
  },
};

export const InlineRussian: Story = {
  args: {
    defaultValue: 'ru',
    variant: 'inline',
  },
};

export const InlineSmall: Story = {
  args: {
    defaultValue: 'uz',
    variant: 'inline',
    size: 'sm',
  },
};

export const DropdownDefault: Story = {
  args: {
    defaultValue: 'uz',
    variant: 'dropdown',
  },
};

export const DropdownSmall: Story = {
  args: {
    defaultValue: 'en',
    variant: 'dropdown',
    size: 'sm',
  },
};

export const Controlled: Story = {
  render: () => <ControlledLanguageSwitcher initial="ru" />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Inline — md</p>
        <LanguageSwitcher defaultValue="uz" variant="inline" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Inline — sm</p>
        <LanguageSwitcher defaultValue="ru" variant="inline" size="sm" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Dropdown — md</p>
        <LanguageSwitcher defaultValue="uz" variant="dropdown" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Dropdown — sm</p>
        <LanguageSwitcher defaultValue="en" variant="dropdown" size="sm" />
      </div>
    </div>
  ),
};

export const InlineClickTest: Story = {
  args: {
    defaultValue: 'uz',
    variant: 'inline',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const radiogroup = canvas.getByRole('radiogroup');
    await expect(radiogroup).toBeInTheDocument();

    const uzRadio = canvas.getByRole('radio', { name: /O'zbek/i });
    await expect(uzRadio).toHaveAttribute('aria-checked', 'true');

    const ruRadio = canvas.getByRole('radio', { name: /Русский/i });
    await userEvent.click(ruRadio);
    await expect(args.onChange).toHaveBeenCalledWith('ru');

    const enRadio = canvas.getByRole('radio', { name: /English/i });
    await userEvent.click(enRadio);
    await expect(args.onChange).toHaveBeenCalledWith('en');

    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};

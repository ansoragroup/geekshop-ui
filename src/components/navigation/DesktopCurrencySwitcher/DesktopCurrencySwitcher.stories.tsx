import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCurrencySwitcher } from './DesktopCurrencySwitcher';

const meta = {
  title: 'Navigation (Desktop)/DesktopCurrencySwitcher',
  component: DesktopCurrencySwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: '#f5f5f5', minHeight: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCurrencySwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'UZS',
  },
};

export const USDSelected: Story = {
  args: {
    defaultValue: 'USD',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'UZS',
    disabled: true,
  },
};

export const CustomCurrencies: Story = {
  args: {
    currencies: [
      { code: 'UZS', symbol: "so'm", name: "O'zbek so'mi", flag: '🇺🇿' },
      { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
      { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    ],
    defaultValue: 'EUR',
  },
};

export const WithoutFlags: Story = {
  args: {
    currencies: [
      { code: 'UZS', symbol: "so'm", name: "O'zbek so'mi" },
      { code: 'USD', symbol: '$', name: 'US Dollar' },
      { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
      { code: 'EUR', symbol: '€', name: 'Euro' },
    ],
    defaultValue: 'RUB',
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopLanguageSwitcher } from './DesktopLanguageSwitcher';

const meta = {
  title: 'Navigation (Desktop)/DesktopLanguageSwitcher',
  component: DesktopLanguageSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: '#f5f5f5', minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopLanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'uz',
  },
};

export const RussianSelected: Story = {
  args: {
    defaultValue: 'ru',
  },
};

export const EnglishSelected: Story = {
  args: {
    defaultValue: 'en',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'uz',
    disabled: true,
  },
};

export const WithoutFlags: Story = {
  args: {
    languages: [
      { code: 'uz', name: "O'zbekcha" },
      { code: 'ru', name: 'Русский' },
      { code: 'en', name: 'English' },
    ],
    defaultValue: 'en',
  },
};

export const MoreLanguages: Story = {
  args: {
    languages: [
      { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
    ],
    defaultValue: 'uz',
  },
};

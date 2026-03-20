import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopThemeSwitcher } from './DesktopThemeSwitcher';

const meta = {
  title: 'Navigation (Desktop)/DesktopThemeSwitcher',
  component: DesktopThemeSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: '#f5f5f5', minHeight: 250 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'system',
    variant: 'toggle',
  },
};

export const LightSelected: Story = {
  args: {
    defaultValue: 'light',
    variant: 'toggle',
  },
};

export const DarkSelected: Story = {
  args: {
    defaultValue: 'dark',
    variant: 'toggle',
  },
};

export const DropdownVariant: Story = {
  args: {
    defaultValue: 'system',
    variant: 'dropdown',
  },
};

export const DropdownLight: Story = {
  args: {
    defaultValue: 'light',
    variant: 'dropdown',
  },
};

export const DropdownDark: Story = {
  args: {
    defaultValue: 'dark',
    variant: 'dropdown',
  },
};

export const DisabledToggle: Story = {
  args: {
    defaultValue: 'system',
    variant: 'toggle',
    disabled: true,
  },
};

export const DisabledDropdown: Story = {
  args: {
    defaultValue: 'light',
    variant: 'dropdown',
    disabled: true,
  },
};

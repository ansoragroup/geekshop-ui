import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopOTPInput } from './DesktopOTPInput';

const meta = {
  title: 'Forms (Desktop)/DesktopOTPInput',
  component: DesktopOTPInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    length: { control: 'radio', options: [4, 6] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mask: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopOTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 6,
    autoFocus: true,
    onChange: fn(),
    onComplete: fn(),
  },
};

export const FourDigits: Story = {
  args: {
    length: 4,
    onChange: fn(),
    onComplete: fn(),
  },
};

export const WithError: Story = {
  args: {
    length: 6,
    value: '123456',
    error: true,
    errorMessage: 'Invalid verification code. Please try again.',
    onChange: fn(),
  },
};

export const Masked: Story = {
  args: {
    length: 6,
    value: '1234',
    mask: true,
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    length: 6,
    value: '123',
    disabled: true,
  },
};

export const PreFilled: Story = {
  args: {
    length: 6,
    value: '482901',
    onChange: fn(),
  },
};

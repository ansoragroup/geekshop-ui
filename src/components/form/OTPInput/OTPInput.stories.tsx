import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { OTPInput } from './OTPInput';

const meta = {
  title: 'Form/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: fn(),
    onComplete: fn(),
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: {},
};

export const PartiallyFilled: Story = {
  args: {
    defaultValue: '428',
  },
};

export const Complete: Story = {
  args: {
    defaultValue: '428917',
  },
};

export const Error: Story = {
  args: {
    defaultValue: '428917',
    error: true,
    errorMessage: "Noto'g'ri kod",
  },
};

export const Masked: Story = {
  args: {
    defaultValue: '428917',
    mask: true,
  },
};

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '428',
    disabled: true,
  },
};

export const FourDigit: Story = {
  args: {
    length: 4,
  },
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState('');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <OTPInput value={value} onChange={setValue} onComplete={(code) => alert(`Code: ${code}`)} />
          <p style={{ fontSize: 14, color: '#666' }}>Value: {value || '(empty)'}</p>
          <button type="button" onClick={() => setValue('')} style={{ padding: '8px 16px', cursor: 'pointer' }}>Clear</button>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

export const InteractiveTest: Story = {
  args: {
    onComplete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('OTP code input');

    await userEvent.click(input);
    await userEvent.type(input, '428917');

    await expect(args.onComplete).toHaveBeenCalledWith('428917');
  },
};

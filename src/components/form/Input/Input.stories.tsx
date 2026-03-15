import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Qidirish...',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Qidirish...');

    // Type text into the input
    await userEvent.type(input, 'RTX 4070');
    await expect(args.onChange).toHaveBeenCalled();

    // Verify onChange was called for each character
    await expect(args.onChange).toHaveBeenCalledTimes(8);
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Ism',
    placeholder: 'Ismingizni kiriting',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Noto\'g\'ri email formati',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Qidirish...',
    leftIcon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="#999" strokeWidth="1.5" />
        <path d="M12.5 12.5L16 16" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('RTX 4060');
    return (
      <Input
        label="Qidirish"
        value={value}
        placeholder="Mahsulot nomi..."
        clearable
        onChange={setValue}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Mahsulot nomi...');

    // Input should have the initial value
    await expect(input).toHaveValue('RTX 4060');

    // Click the clear button
    const clearButton = canvas.getByRole('button', { name: /clear input/i });
    await userEvent.click(clearButton);

    // After clearing, the input should be empty
    await expect(input).toHaveValue('');
  },
};

export const Disabled: Story = {
  args: {
    label: 'Shahar',
    value: 'Toshkent',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Parol',
    type: 'password',
    placeholder: 'Parolni kiriting',
  },
};

export const AllStates: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Normal" placeholder="Matn kiriting" value={val} onChange={setVal} clearable />
        <Input label="With icon" placeholder="Qidirish..." leftIcon={
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="#999" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        } />
        <Input label="Xato" value="noto'g'ri" error="Maydonni to'ldiring" />
        <Input label="O'chirilgan" value="Toshkent" disabled />
      </div>
    );
  },
};

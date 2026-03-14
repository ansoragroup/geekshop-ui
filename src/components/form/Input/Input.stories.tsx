import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
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
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Qidirish...',
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

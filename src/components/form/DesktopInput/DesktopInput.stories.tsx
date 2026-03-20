import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopInput } from './DesktopInput';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="7" cy="7" r="5" />
    <path d="M11 11l3 3" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="10" height="7" rx="2" />
    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

const meta = {
  title: 'Forms (Desktop)/DesktopInput',
  component: DesktopInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  name: 'With Value & Clearable',
  render: () => {
    const [value, setValue] = useState('john@example.com');

    return (
      <DesktopInput
        label="Email"
        value={value}
        onChange={setValue}
        clearable
      />
    );
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    prefix: <SearchIcon />,
    clearable: true,
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    suffix: <LockIcon />,
  },
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopInput size="sm" label="Small" placeholder="Small input" />
      <DesktopInput size="md" label="Medium" placeholder="Medium input (default)" />
      <DesktopInput size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Username',
    value: 'ab',
    error: 'Username must be at least 3 characters',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    value: 'geekshop_user',
    success: true,
    helperText: 'Username is available',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Phone number',
    placeholder: '+998 90 123 45 67',
    helperText: 'We will send a verification code',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked Field',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const FormExample: Story = {
  name: 'Login Form Example',
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <DesktopInput
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
          prefix={<SearchIcon />}
          clearable
        />
        <DesktopInput
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
          suffix={<LockIcon />}
        />
      </div>
    );
  },
};

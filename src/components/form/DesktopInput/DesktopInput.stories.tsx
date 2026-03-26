import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopInput } from './DesktopInput';

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <circle cx="7" cy="7" r="5" />
    <path d="M11 11l3 3" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="7" width="10" height="7" rx="2" />
    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="12" height="10" rx="2" />
    <path d="M2 5l6 4 6-4" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 2H4a2 2 0 00-2 2v1a10 10 0 005 5h0a10 10 0 005 5h1a2 2 0 002-2v-1l-3-2-1.5 1.5a8 8 0 01-4-4L8 5 5 2z" />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M8 2v12M5 5a2.5 2.5 0 005 0c0-2-5-2-5-4a2.5 2.5 0 015 0" />
  </svg>
);

const meta = {
  title: 'Form (Desktop)/DesktopInput',
  component: DesktopInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    success: { control: 'boolean' },
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

/* ─── Basic ─── */

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <DesktopInput
        label="Email"
        placeholder="Enter your email"
        value={value}
        onChange={setValue}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your email');
    await userEvent.type(input, 'john@geekshop.uz');
    await expect(input).toHaveValue('john@geekshop.uz');
  },
};

/* ─── Input Types ─── */

export const TextInput: Story = {
  args: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
    onChange: fn(),
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    suffix: <LockIcon />,
    onChange: fn(),
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    prefix: <MailIcon />,
    onChange: fn(),
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Quantity',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 999,
    onChange: fn(),
  },
};

/* ─── All Sizes ─── */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopInput size="sm" label="Small" placeholder="Small input (32px)" />
      <DesktopInput size="md" label="Medium (default)" placeholder="Medium input (40px)" />
      <DesktopInput size="lg" label="Large" placeholder="Large input (48px)" />
    </div>
  ),
};

/* ─── Prefix & Suffix ─── */

export const WithPrefix: Story = {
  args: {
    label: 'Search Products',
    placeholder: 'Search by name, brand, or SKU...',
    prefix: <SearchIcon />,
    clearable: true,
    onChange: fn(),
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    suffix: <LockIcon />,
    onChange: fn(),
  },
};

export const WithPrefixAndSuffix: Story = {
  name: 'Prefix + Suffix Combined',
  args: {
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
    prefix: <DollarIcon />,
    suffix: <span style={{ fontSize: 12, color: '#999' }}>USD</span>,
    onChange: fn(),
  },
};

/* ─── Value & Clearable ─── */

export const WithValueAndClearable: Story = {
  name: 'With Value & Clearable',
  render: () => {
    const [value, setValue] = useState('john@geekshop.uz');

    return <DesktopInput label="Email" value={value} onChange={setValue} clearable />;
  },
};

/* ─── Validation States ─── */

export const ErrorState: Story = {
  args: {
    label: 'Username',
    value: 'ab',
    error: 'Username must be at least 3 characters',
    onChange: fn(),
  },
};

export const ErrorBooleanOnly: Story = {
  name: 'Error (Boolean, No Message)',
  args: {
    label: 'Card Number',
    value: '1234',
    error: true,
    onChange: fn(),
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    value: 'geekshop_user',
    success: true,
    helperText: 'Username is available',
    onChange: fn(),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '+998 90 123 45 67',
    helperText: 'We will send a verification code to this number',
    prefix: <PhoneIcon />,
    onChange: fn(),
  },
};

/* ─── Disabled & Readonly ─── */

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    value: 'USR-9283-XKF2',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Order Number',
    value: 'ORD-2026-00451',
    readOnly: true,
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    label: 'Promo Code',
    placeholder: 'Enter promo code',
    helperText: 'Apply a promo code for a discount',
    prefix: <span style={{ fontSize: 13, color: '#FF5000', fontWeight: 600 }}>%</span>,
    suffix: <span style={{ fontSize: 12, color: '#999' }}>APPLY</span>,
    clearable: true,
    size: 'lg',
    value: 'SUMMER25',
    success: true,
    onChange: fn(),
  },
};

/* ─── Edge Cases ─── */

export const LongLabel: Story = {
  name: 'Long Label (Overflow)',
  args: {
    label:
      'Please enter your full legal name as it appears on your government-issued identification document',
    placeholder: 'Full legal name...',
    onChange: fn(),
  },
};

export const LongPlaceholder: Story = {
  args: {
    label: 'Search',
    placeholder:
      'Search for products, categories, brands, sellers, and more across the entire marketplace...',
    prefix: <SearchIcon />,
    onChange: fn(),
  },
};

export const LongError: Story = {
  name: 'Long Error Message',
  args: {
    label: 'Tax ID',
    value: '123',
    error:
      'The Tax Identification Number you entered does not match our records. Please verify and try again or contact support at help@geekshop.uz.',
    onChange: fn(),
  },
};

export const NoLabel: Story = {
  name: 'No Label (Inline)',
  args: {
    placeholder: 'Search...',
    prefix: <SearchIcon />,
    clearable: true,
    onChange: fn(),
  },
};

/* ─── Realistic Forms ─── */

export const LoginForm: Story = {
  name: 'Login Form Composition',
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
          prefix={<MailIcon />}
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

export const ShippingAddressForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopInput label="Full Name" placeholder="John Doe" size="md" />
      <DesktopInput label="Street Address" placeholder="123 Main Street, Apt 4B" size="md" />
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <DesktopInput label="City" placeholder="Tashkent" size="md" />
        </div>
        <div style={{ flex: 1 }}>
          <DesktopInput label="Zip Code" placeholder="100000" size="md" />
        </div>
      </div>
      <DesktopInput
        label="Phone"
        placeholder="+998 90 123 45 67"
        prefix={<PhoneIcon />}
        helperText="For delivery notifications"
        size="md"
      />
    </div>
  ),
};

export const AllStatesOverview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopInput label="Default" placeholder="Default state" />
      <DesktopInput label="With Value" value="Filled input" />
      <DesktopInput label="Success" value="Valid data" success helperText="Looks good!" />
      <DesktopInput label="Error" value="Bad input" error="This field has an error" />
      <DesktopInput label="Disabled" value="Cannot edit" disabled />
      <DesktopInput label="Read Only" value="Read-only value" readOnly />
    </div>
  ),
};

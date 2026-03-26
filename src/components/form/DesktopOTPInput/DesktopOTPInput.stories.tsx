import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopOTPInput } from './DesktopOTPInput';

const meta = {
  title: 'Form (Desktop)/DesktopOTPInput',
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
    autoFocus: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopOTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    length: 6,
    autoFocus: true,
    onChange: fn(),
    onComplete: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstDigit = canvas.getByLabelText('Digit 1 of 6');
    await userEvent.type(firstDigit, '1');
    const secondDigit = canvas.getByLabelText('Digit 2 of 6');
    await expect(secondDigit).toHaveFocus();
  },
};

/* ─── Lengths ─── */

export const SixDigits: Story = {
  name: '6 Digits (Default)',
  args: {
    length: 6,
    onChange: fn(),
    onComplete: fn(),
  },
};

export const FourDigits: Story = {
  name: '4 Digits',
  args: {
    length: 4,
    onChange: fn(),
    onComplete: fn(),
  },
};

/* ─── Pre-filled ─── */

export const PreFilled: Story = {
  name: 'Pre-filled Value',
  args: {
    length: 6,
    value: '482901',
    onChange: fn(),
  },
};

export const PartiallyFilled: Story = {
  args: {
    length: 6,
    value: '38',
    onChange: fn(),
    onComplete: fn(),
  },
};

/* ─── Error States ─── */

export const ErrorWithMessage: Story = {
  name: 'Error with Message',
  args: {
    length: 6,
    value: '123456',
    error: true,
    errorMessage: 'Invalid verification code. Please try again.',
    onChange: fn(),
  },
};

export const ErrorNoMessage: Story = {
  name: 'Error (No Message)',
  args: {
    length: 6,
    value: '000000',
    error: true,
    onChange: fn(),
  },
};

export const ErrorFourDigits: Story = {
  name: 'Error (4 Digits)',
  args: {
    length: 4,
    value: '9999',
    error: true,
    errorMessage: 'Code expired. Request a new one.',
    onChange: fn(),
  },
};

/* ─── Masked ─── */

export const Masked: Story = {
  name: 'Masked (Hidden Digits)',
  args: {
    length: 6,
    value: '1234',
    mask: true,
    onChange: fn(),
  },
};

export const MaskedFull: Story = {
  name: 'Masked (All Digits Entered)',
  args: {
    length: 6,
    value: '834721',
    mask: true,
    onChange: fn(),
    onComplete: fn(),
  },
};

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    length: 6,
    value: '123',
    disabled: true,
  },
};

export const DisabledFull: Story = {
  name: 'Disabled (Full)',
  args: {
    length: 6,
    value: '482901',
    disabled: true,
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    length: 6,
    value: '12',
    mask: false,
    error: false,
    errorMessage: '',
    autoFocus: true,
    disabled: false,
    onChange: fn(),
    onComplete: fn(),
  },
};

/* ─── All States Overview ─── */

export const AllStatesOverview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Empty
        </div>
        <DesktopOTPInput length={6} />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Partially filled
        </div>
        <DesktopOTPInput length={6} value="48" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Complete
        </div>
        <DesktopOTPInput length={6} value="482901" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Masked
        </div>
        <DesktopOTPInput length={6} value="482901" mask />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Error
        </div>
        <DesktopOTPInput length={6} value="123456" error errorMessage="Invalid code" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Disabled
        </div>
        <DesktopOTPInput length={6} value="482901" disabled />
      </div>
    </div>
  ),
};

/* ─── Controlled ─── */

export const Controlled: Story = {
  name: 'Controlled with Callback',
  render: () => {
    const [value, setValue] = useState('');
    const [completed, setCompleted] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 14, color: '#1A1A1A' }}>Enter your 6-digit verification code</div>
        <DesktopOTPInput
          length={6}
          value={value}
          onChange={(v) => {
            setValue(v);
            setCompleted(false);
          }}
          onComplete={() => setCompleted(true)}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          Entered: {value || '(empty)'} | Complete: {completed ? 'Yes' : 'No'}
        </div>
      </div>
    );
  },
};

/* ─── Realistic: Verification Flow ─── */

export const VerificationFlow: Story = {
  name: 'Phone Verification Flow',
  render: () => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');

    const handleComplete = (code: string) => {
      setStatus('verifying');
      setTimeout(() => {
        setStatus(code === '123456' ? 'success' : 'error');
      }, 1500);
    };

    return (
      <div style={{ textAlign: 'center', maxWidth: 360, margin: '0 auto' }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>
          Verify your phone
        </div>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
          We sent a 6-digit code to +998 90 *** ** 67
        </div>
        <DesktopOTPInput
          length={6}
          value={value}
          onChange={(v) => {
            setValue(v);
            if (status === 'error') setStatus('idle');
          }}
          onComplete={handleComplete}
          error={status === 'error'}
          errorMessage={status === 'error' ? 'Wrong code. Try 123456.' : undefined}
          disabled={status === 'verifying' || status === 'success'}
        />
        {status === 'verifying' && (
          <div style={{ fontSize: 13, color: '#999', marginTop: 12 }}>Verifying...</div>
        )}
        {status === 'success' && (
          <div style={{ fontSize: 13, color: '#07C160', marginTop: 12, fontWeight: 500 }}>
            Phone verified successfully!
          </div>
        )}
        {status === 'idle' && (
          <div style={{ fontSize: 13, color: '#999', marginTop: 16 }}>
            Didn't receive code? <span style={{ color: '#FF5000', cursor: 'pointer' }}>Resend</span>
          </div>
        )}
      </div>
    );
  },
};

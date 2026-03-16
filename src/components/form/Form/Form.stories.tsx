import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useRef } from 'react';
import { expect, fn, userEvent, within, waitFor } from 'storybook/test';
import { Form, FormItem } from './Form';
import type { FormHandle } from './Form';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

const meta = {
  title: 'Form/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Basic Form ----

export const BasicForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Form
          onSubmit={(values) => setSubmitted(values)}
          initialValues={{ name: '', email: '' }}
        >
          <FormItem name="name" label="Name">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={setName}
            />
          </FormItem>
          <FormItem name="email" label="Email">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
            />
          </FormItem>
          <Button variant="primary" size="lg" block type="submit">
            Submit
          </Button>
        </Form>
        {submitted && (
          <pre style={{ fontSize: 12, background: '#f5f5f5', padding: 8, borderRadius: 8 }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        )}
      </div>
    );
  },
};

// ---- With Validation ----

export const WithValidation: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formRef = useRef<FormHandle>(null);

    const handleSubmit = (values: Record<string, unknown>) => {
      formRef.current?.setFieldValue('name', name);
      formRef.current?.setFieldValue('email', email);
      formRef.current?.setFieldValue('password', password);
      alert(`Form submitted: ${JSON.stringify(values)}`);
    };

    return (
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialValues={{ name: '', email: '', password: '' }}
      >
        <FormItem
          name="name"
          label="Full Name"
          required
          rules={[
            { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input
            placeholder="John Doe"
            value={name}
            onChange={(v) => {
              setName(v);
              formRef.current?.setFieldValue('name', v);
            }}
          />
        </FormItem>

        <FormItem
          name="email"
          label="Email"
          required
          rules={[
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
          ]}
        >
          <Input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(v) => {
              setEmail(v);
              formRef.current?.setFieldValue('email', v);
            }}
          />
        </FormItem>

        <FormItem
          name="password"
          label="Password"
          required
          rules={[
            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
          ]}
          helpText="Minimum 8 characters"
        >
          <Input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(v) => {
              setPassword(v);
              formRef.current?.setFieldValue('password', v);
            }}
          />
        </FormItem>

        <Button variant="primary" size="lg" block type="submit">
          Register
        </Button>
      </Form>
    );
  },
};

// ---- Login Form ----

export const LoginForm: Story = {
  render: () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const formRef = useRef<FormHandle>(null);

    return (
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#1A1A1A' }}>
          Sign In
        </h3>
        <Form
          ref={formRef}
          onSubmit={(values) => alert(`Login: ${JSON.stringify(values)}`)}
          initialValues={{ phone: '', password: '' }}
        >
          <FormItem name="phone" label="Phone Number" required>
            <Input
              placeholder="+998 90 123 45 67"
              type="tel"
              value={phone}
              onChange={(v) => {
                setPhone(v);
                formRef.current?.setFieldValue('phone', v);
              }}
            />
          </FormItem>

          <FormItem name="password" label="Password" required>
            <Input
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(v) => {
                setPassword(v);
                formRef.current?.setFieldValue('password', v);
              }}
            />
          </FormItem>

          <Button variant="primary" size="lg" block type="submit">
            Sign In
          </Button>
          <Button variant="text" size="md" block>
            Forgot Password?
          </Button>
        </Form>
      </div>
    );
  },
};

// ---- Address Form ----

export const AddressForm: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const formRef = useRef<FormHandle>(null);

    const updateField = (fieldName: string, value: string) => {
      formRef.current?.setFieldValue(fieldName, value);
    };

    return (
      <Form
        ref={formRef}
        onSubmit={(values) => alert(`Address saved: ${JSON.stringify(values)}`)}
        initialValues={{
          name: '',
          phone: '',
          street: '',
          apartment: '',
          city: '',
          postalCode: '',
          type: 'home',
        }}
      >
        <FormItem name="name" label="Recipient Name" required>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={(v) => { setName(v); updateField('name', v); }}
          />
        </FormItem>

        <FormItem name="phone" label="Phone Number" required>
          <Input
            placeholder="+998 90 123 45 67"
            type="tel"
            value={phone}
            onChange={(v) => { setPhone(v); updateField('phone', v); }}
          />
        </FormItem>

        <FormItem name="street" label="Street, Building" required>
          <Input
            placeholder="123 Main Street"
            value={street}
            onChange={(v) => { setStreet(v); updateField('street', v); }}
          />
        </FormItem>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormItem name="apartment" label="Apartment">
            <Input
              placeholder="Apt 4"
              value={apartment}
              onChange={(v) => { setApartment(v); updateField('apartment', v); }}
            />
          </FormItem>
          <FormItem name="postalCode" label="Postal Code">
            <Input
              placeholder="100000"
              value={postalCode}
              onChange={(v) => { setPostalCode(v); updateField('postalCode', v); }}
            />
          </FormItem>
        </div>

        <FormItem name="city" label="City" required>
          <Input
            placeholder="Tashkent"
            value={city}
            onChange={(v) => { setCity(v); updateField('city', v); }}
          />
        </FormItem>

        <FormItem name="type" label="Address Type">
          <Select
            options={[
              { value: 'home', label: 'Home' },
              { value: 'work', label: 'Work' },
              { value: 'other', label: 'Other' },
            ]}
            defaultValue="home"
          />
        </FormItem>

        <Button variant="primary" size="lg" block type="submit">
          Save Address
        </Button>
      </Form>
    );
  },
};

// ---- Async Submit ----

export const AsyncSubmit: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const formRef = useRef<FormHandle>(null);

    const handleSubmit = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setSuccess(true);
    };

    if (success) {
      return (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#07C160' }}>
            Successfully subscribed!
          </div>
        </div>
      );
    }

    return (
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialValues={{ email: '' }}
      >
        <FormItem
          name="email"
          label="Email Address"
          required
          rules={[
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
          ]}
          helpText="We will send you exclusive deals"
        >
          <Input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(v) => {
              setEmail(v);
              formRef.current?.setFieldValue('email', v);
            }}
          />
        </FormItem>

        <Button variant="primary" size="lg" block type="submit" loading={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </Form>
    );
  },
};

// ---- Custom Validation ----

export const CustomValidation: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const formRef = useRef<FormHandle>(null);

    return (
      <Form
        ref={formRef}
        onSubmit={(values) => alert(`Password changed: ${JSON.stringify(values)}`)}
        initialValues={{ password: '', confirmPassword: '' }}
      >
        <FormItem
          name="password"
          label="New Password"
          required
          rules={[
            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
            {
              type: 'custom',
              message: 'Password must contain at least one number',
              validator: (val) => typeof val === 'string' && /\d/.test(val),
            },
          ]}
        >
          <Input
            placeholder="Enter new password"
            type="password"
            value={password}
            onChange={(v) => {
              setPassword(v);
              formRef.current?.setFieldValue('password', v);
            }}
          />
        </FormItem>

        <FormItem
          name="confirmPassword"
          label="Confirm Password"
          required
          rules={[
            {
              type: 'custom',
              message: 'Passwords do not match',
              validator: (val) => val === password,
            },
          ]}
        >
          <Input
            placeholder="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(v) => {
              setConfirmPassword(v);
              formRef.current?.setFieldValue('confirmPassword', v);
            }}
          />
        </FormItem>

        <Button variant="primary" size="lg" block type="submit">
          Change Password
        </Button>
      </Form>
    );
  },
};

// ---- Manual Error Override ----

export const ManualErrors: Story = {
  render: () => {
    const [email, setEmail] = useState('admin@geekshop.uz');
    const [serverError, setServerError] = useState('This email is already registered');

    return (
      <Form
        onSubmit={() => {
          // Simulate server-side error
          setServerError('This email is already registered');
        }}
        initialValues={{ email: 'admin@geekshop.uz' }}
      >
        <FormItem
          name="email"
          label="Email"
          error={serverError}
        >
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(v) => {
              setEmail(v);
              setServerError('');
            }}
            error={serverError}
          />
        </FormItem>

        <Button variant="primary" size="lg" block type="submit">
          Register
        </Button>
      </Form>
    );
  },
};

// ---- Horizontal Labels ----

export const HorizontalLabels: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
      <Form initialValues={{ name: '', email: '' }}>
        <FormItem name="name" label="Full Name" labelPosition="left" required>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={setName}
          />
        </FormItem>
        <FormItem name="email" label="Email" labelPosition="left" required>
          <Input
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />
        </FormItem>
        <div style={{ marginLeft: 92 }}>
          <Button variant="primary" size="lg" block type="submit">
            Save
          </Button>
        </div>
      </Form>
    );
  },
};

// ---- With Help Text ----

export const WithHelpText: Story = {
  render: () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    return (
      <Form initialValues={{ username: '', bio: '' }}>
        <FormItem
          name="username"
          label="Username"
          required
          helpText="Only letters, numbers, and underscores"
        >
          <Input
            placeholder="geek_user"
            value={username}
            onChange={setUsername}
          />
        </FormItem>
        <FormItem
          name="bio"
          label="Bio"
          helpText="Tell us about yourself (optional)"
        >
          <Input
            placeholder="I love tech..."
            value={bio}
            onChange={setBio}
          />
        </FormItem>
        <Button variant="primary" size="lg" block type="submit">
          Save Profile
        </Button>
      </Form>
    );
  },
};

// ---- Play function test ----

export const InteractionTest: Story = {
  args: {
    onSubmit: fn(),
    onError: fn(),
    initialValues: { email: '' },
    children: null,
  },
  render: (args) => {
    const [email, setEmail] = useState('');
    const formRef = useRef<FormHandle>(null);

    return (
      <Form
        ref={formRef}
        onSubmit={args.onSubmit}
        onError={args.onError}
        initialValues={args.initialValues}
      >
        <FormItem
          name="email"
          label="Email"
          required
          rules={[
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          ]}
        >
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(v) => {
              setEmail(v);
              formRef.current?.setFieldValue('email', v);
            }}
          />
        </FormItem>
        <Button variant="primary" size="lg" block type="submit" data-testid="submit-btn">
          Submit
        </Button>
      </Form>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByTestId('submit-btn');

    // Submit empty form should trigger validation error
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(canvas.getByRole('alert')).toBeInTheDocument();
    });
    expect(args.onError).toHaveBeenCalled();

    // Type a valid email
    const input = canvas.getByPlaceholderText('Enter email');
    await userEvent.type(input, 'user@example.com');

    // Submit again
    await userEvent.click(submitBtn);
  },
};

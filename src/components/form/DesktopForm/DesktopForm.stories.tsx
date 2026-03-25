import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopForm, DesktopFormItem, DesktopFormDivider } from './DesktopForm';

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 40,
  padding: '0 12px',
  border: '1.5px solid #eee',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: '1.5px solid #FF3B30',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: 'auto',
  padding: 12,
  resize: 'vertical' as const,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'auto' as const,
};

const meta = {
  title: 'Forms (Desktop)/DesktopForm',
  component: DesktopForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    layout: { control: 'radio', options: ['horizontal', 'vertical'] },
    labelWidth: { control: { type: 'number', min: 80, max: 250 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 650, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Layouts ─── */

export const Horizontal: Story = {
  name: 'Horizontal Layout',
  args: {
    layout: 'horizontal',
    labelWidth: 120,
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Full Name" required>
          <input type="text" placeholder="Enter your name" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required>
          <input type="email" placeholder="your@email.com" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Phone" description="We will only use it for order updates">
          <input type="tel" placeholder="+998 90 123 45 67" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

export const Vertical: Story = {
  name: 'Vertical Layout',
  args: {
    layout: 'vertical',
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Product Name" required>
          <input type="text" placeholder="Enter product name" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Description">
          <textarea placeholder="Describe the product..." rows={3} style={textareaStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Price" required>
          <input type="number" placeholder="0" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── With Errors ─── */

export const WithErrors: Story = {
  name: 'Validation Errors',
  args: {
    layout: 'horizontal',
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Username" required error="Username is required">
          <input type="text" style={inputErrorStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Password" required error="Password must be at least 8 characters">
          <input type="password" value="123" readOnly style={inputErrorStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required error="Please enter a valid email address">
          <input type="email" value="invalid@" readOnly style={inputErrorStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── With Dividers ─── */

export const WithDividers: Story = {
  name: 'Section Dividers',
  args: {
    layout: 'horizontal',
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormDivider title="Personal Information" />
        <DesktopFormItem label="Full Name" required>
          <input type="text" placeholder="John Doe" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required>
          <input type="email" placeholder="john@example.com" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormDivider title="Shipping Address" />
        <DesktopFormItem label="Street" required>
          <input type="text" placeholder="123 Main Street" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="City">
          <input type="text" placeholder="Tashkent" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormDivider title="Payment Details" />
        <DesktopFormItem label="Card Number" required>
          <input type="text" placeholder="**** **** **** ****" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Expiry" required>
          <input type="text" placeholder="MM/YY" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── Descriptions ─── */

export const WithDescriptions: Story = {
  name: 'Fields with Descriptions',
  args: {
    layout: 'horizontal',
    labelWidth: 140,
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem
          label="Store Name"
          required
          description="Your public-facing store name. Max 50 characters."
        >
          <input type="text" placeholder="GeekShop" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Store URL" description="geekshop.uz/store/your-slug">
          <input type="text" placeholder="your-slug" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem
          label="Tax ID"
          description="Required for B2B transactions. Contact support if you need help."
        >
          <input type="text" placeholder="123456789" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── Mixed Field Types ─── */

export const MixedFieldTypes: Story = {
  args: {
    layout: 'vertical',
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Product Name" required>
          <input type="text" placeholder="GeekShop Premium Headphones" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Category" required>
          <select style={selectStyle}>
            <option value="">Select category...</option>
            <option value="electronics">Electronics</option>
            <option value="audio">Audio & Headphones</option>
            <option value="gaming">Gaming</option>
          </select>
        </DesktopFormItem>
        <DesktopFormItem label="Description">
          <textarea placeholder="Detailed product description..." rows={4} style={textareaStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Price (UZS)" required>
          <input type="number" placeholder="0" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Stock Quantity">
          <input type="number" placeholder="0" min={0} style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── Custom Label Width ─── */

export const WideLabelWidth: Story = {
  name: 'Wide Labels (200px)',
  args: {
    layout: 'horizontal',
    labelWidth: 200,
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Recipient Full Name" required>
          <input type="text" placeholder="John Doe" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Delivery Phone Number" required>
          <input type="tel" placeholder="+998 90 123 45 67" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Postal / Zip Code">
          <input type="text" placeholder="100000" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

export const NarrowLabelWidth: Story = {
  name: 'Narrow Labels (80px)',
  args: {
    layout: 'horizontal',
    labelWidth: 80,
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Name" required>
          <input type="text" placeholder="John" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required>
          <input type="email" placeholder="john@mail.com" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Phone">
          <input type="tel" placeholder="+998 90 123" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    layout: 'horizontal',
    labelWidth: 150,
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormDivider title="Account Details" />
        <DesktopFormItem label="Email Address" required>
          <input type="email" placeholder="you@example.com" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Display Name" required description="Visible to other users">
          <input type="text" placeholder="YourName" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Password" required error="Must contain at least 8 characters">
          <input type="password" value="short" readOnly style={inputErrorStyle} />
        </DesktopFormItem>
        <DesktopFormDivider title="Profile (Optional)" />
        <DesktopFormItem label="Bio" description="Tell us about yourself. Max 200 chars.">
          <textarea placeholder="I love tech gadgets..." rows={3} style={textareaStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Website">
          <input type="url" placeholder="https://yoursite.com" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── Realistic: Checkout Form ─── */

export const CheckoutForm: Story = {
  args: {
    layout: 'vertical',
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormDivider title="Contact Information" />
        <DesktopFormItem label="Email" required>
          <input type="email" placeholder="your@email.com" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Phone" required description="For delivery updates">
          <input type="tel" placeholder="+998 90 123 45 67" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormDivider title="Shipping Address" />
        <DesktopFormItem label="Full Name" required>
          <input type="text" placeholder="John Doe" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Street Address" required>
          <input type="text" placeholder="123 Main Street, Apt 4B" style={inputStyle} />
        </DesktopFormItem>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <DesktopFormItem label="City" required>
            <input type="text" placeholder="Tashkent" style={inputStyle} />
          </DesktopFormItem>
          <DesktopFormItem label="Zip Code" required>
            <input type="text" placeholder="100000" style={inputStyle} />
          </DesktopFormItem>
        </div>
        <DesktopFormDivider title="Order Notes" />
        <DesktopFormItem
          label="Delivery Instructions"
          description="Any special instructions for the courier"
        >
          <textarea placeholder="Ring the doorbell twice..." rows={2} style={textareaStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

/* ─── Divider Only ─── */

export const DividersOnly: Story = {
  name: 'Divider Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DesktopFormDivider title="With Title" />
      <DesktopFormDivider />
      <DesktopFormDivider title="Another Section" />
    </div>
  ),
};

/* ─── Required vs Optional ─── */

export const RequiredOptionalMix: Story = {
  name: 'Required vs Optional Fields',
  args: {
    layout: 'horizontal',
    labelWidth: 130,
    onSubmit: fn(),
    children: (
      <>
        <DesktopFormItem label="Full Name" required>
          <input type="text" placeholder="Required field" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Nickname">
          <input type="text" placeholder="Optional field" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required>
          <input type="email" placeholder="Required field" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Company">
          <input type="text" placeholder="Optional field" style={inputStyle} />
        </DesktopFormItem>
        <DesktopFormItem label="Phone" required>
          <input type="tel" placeholder="Required field" style={inputStyle} />
        </DesktopFormItem>
      </>
    ),
  },
};

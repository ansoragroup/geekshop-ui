import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopForm, DesktopFormItem, DesktopFormDivider } from './DesktopForm';

const meta = {
  title: 'Forms (Desktop)/DesktopForm',
  component: DesktopForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  name: 'Horizontal Layout',
  args: {
    layout: 'horizontal',
    labelWidth: 120,
    children: (
      <>
        <DesktopFormItem label="Full Name" required>
          <input
            type="text"
            placeholder="Enter your name"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="Phone" description="We will only use it for order updates">
          <input
            type="tel"
            placeholder="+998 90 123 45 67"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
      </>
    ),
  },
};

export const Vertical: Story = {
  name: 'Vertical Layout',
  args: {
    layout: 'vertical',
    children: (
      <>
        <DesktopFormItem label="Product Name" required>
          <input
            type="text"
            placeholder="Enter product name"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="Description">
          <textarea
            placeholder="Describe the product..."
            rows={3}
            style={{
              width: '100%',
              padding: 12,
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="Price" required>
          <input
            type="number"
            placeholder="0"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
      </>
    ),
  },
};

export const WithErrors: Story = {
  name: 'With Validation Errors',
  args: {
    layout: 'horizontal',
    children: (
      <>
        <DesktopFormItem label="Username" required error="Username is required">
          <input
            type="text"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #FF3B30',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="Password" required error="Password must be at least 8 characters">
          <input
            type="password"
            value="123"
            readOnly
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #FF3B30',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
      </>
    ),
  },
};

export const WithDividers: Story = {
  name: 'With Section Dividers',
  args: {
    layout: 'horizontal',
    children: (
      <>
        <DesktopFormDivider title="Personal Information" />
        <DesktopFormItem label="Full Name" required>
          <input
            type="text"
            placeholder="John Doe"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="Email" required>
          <input
            type="email"
            placeholder="john@example.com"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormDivider title="Shipping Address" />
        <DesktopFormItem label="Street" required>
          <input
            type="text"
            placeholder="123 Main Street"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
        <DesktopFormItem label="City">
          <input
            type="text"
            placeholder="Tashkent"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1.5px solid #eee',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </DesktopFormItem>
      </>
    ),
  },
};

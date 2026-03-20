import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopTextArea } from './DesktopTextArea';

const meta = {
  title: 'Forms (Desktop)/DesktopTextArea',
  component: DesktopTextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    autoResize: { control: 'boolean' },
    showCount: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 500, padding: 24, background: '#fff' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Product Review',
    placeholder: 'Tell us what you think about this product...',
    onChange: fn(),
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Write your feedback here...',
    maxLength: 500,
    showCount: true,
    value: 'Great product! Fast delivery and exactly as described. Would definitely buy again.',
    onChange: fn(),
  },
};

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState('Type here and watch the textarea grow automatically as you add more lines of text...');
    return (
      <DesktopTextArea
        label="Auto-resize textarea"
        placeholder="Start typing..."
        value={value}
        onChange={setValue}
        autoResize
        rows={2}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Shipping Address',
    value: '123',
    error: 'Address must be at least 10 characters long.',
    onChange: fn(),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Additional Notes',
    placeholder: 'Any special delivery instructions?',
    helperText: 'Optional. Include any details the courier might need.',
    onChange: fn(),
  },
};

export const NearCharacterLimit: Story = {
  args: {
    label: 'Short Bio',
    maxLength: 100,
    showCount: true,
    value: 'This is a text that is approaching the character limit, so the counter should turn yellow to warn',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Order Notes',
    value: 'Please deliver to the back door. Call before arrival.',
    disabled: true,
  },
};

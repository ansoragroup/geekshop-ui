import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
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
    rows: { control: { type: 'number', min: 1, max: 20 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <DesktopTextArea
        label="Product Review"
        placeholder="Tell us what you think about this product..."
        value={value}
        onChange={setValue}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Tell us what you think about this product...');
    await userEvent.type(textarea, 'Great product, fast delivery!');
    await expect(textarea).toHaveValue('Great product, fast delivery!');
  },
};

/* ─── With Character Count ─── */

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

export const CharacterCountEmpty: Story = {
  name: 'Character Count (Empty)',
  args: {
    label: 'Comment',
    placeholder: 'Add your comment...',
    maxLength: 300,
    showCount: true,
    value: '',
    onChange: fn(),
  },
};

/* ─── Auto-Resize ─── */

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState(
      'Type here and watch the textarea grow automatically as you add more lines of text.\n\nAdd line breaks to see the height increase.'
    );
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

/* ─── Validation States ─── */

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
    helperText: 'Optional. Include details the courier might need.',
    onChange: fn(),
  },
};

export const WithErrorAndCount: Story = {
  name: 'Error + Character Count',
  args: {
    label: 'Return Reason',
    value: 'Bad',
    error: 'Please provide at least 20 characters explaining the return reason.',
    maxLength: 500,
    showCount: true,
    onChange: fn(),
  },
};

/* ─── Near Character Limit ─── */

export const NearCharacterLimit: Story = {
  args: {
    label: 'Short Bio',
    maxLength: 100,
    showCount: true,
    value:
      'This is a text that is approaching the character limit, so the counter should turn yellow to warn',
    onChange: fn(),
  },
};

export const AtCharacterLimit: Story = {
  args: {
    label: 'Tweet',
    maxLength: 50,
    showCount: true,
    value: 'This text is exactly at the character limit now!!',
    onChange: fn(),
  },
};

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    label: 'Order Notes',
    value: 'Please deliver to the back door. Call before arrival.',
    disabled: true,
  },
};

/* ─── Different Row Counts ─── */

export const SmallRows: Story = {
  name: 'Small (2 Rows)',
  args: {
    label: 'Quick Note',
    placeholder: 'Brief note...',
    rows: 2,
    onChange: fn(),
  },
};

export const LargeRows: Story = {
  name: 'Large (8 Rows)',
  args: {
    label: 'Product Description',
    placeholder: 'Write a detailed product description...',
    rows: 8,
    maxLength: 2000,
    showCount: true,
    onChange: fn(),
  },
};

/* ─── No Label ─── */

export const NoLabel: Story = {
  name: 'Without Label',
  args: {
    placeholder: 'Type your message here...',
    rows: 3,
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  render: () => {
    const [value, setValue] = useState(
      'I would like to request a return for order #ORD-2026-00451.'
    );
    return (
      <DesktopTextArea
        label="Return Request Description"
        placeholder="Describe the reason for return..."
        value={value}
        onChange={setValue}
        maxLength={1000}
        showCount
        autoResize
        rows={4}
        helperText="Please be specific about the issue for faster processing"
      />
    );
  },
};

/* ─── All States Overview ─── */

export const AllStatesOverview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DesktopTextArea label="Default" placeholder="Empty textarea" rows={2} />
      <DesktopTextArea label="With Value" value="Some content here" rows={2} />
      <DesktopTextArea
        label="With Helper"
        placeholder="Type here..."
        helperText="This is helper text"
        rows={2}
      />
      <DesktopTextArea label="Error" value="Bad data" error="This field has an error" rows={2} />
      <DesktopTextArea
        label="Near Limit"
        value="Almost at the limit"
        maxLength={25}
        showCount
        rows={2}
      />
      <DesktopTextArea label="Disabled" value="Read-only content" disabled rows={2} />
    </div>
  ),
};

/* ─── Realistic: Product Review ─── */

export const ProductReviewForm: Story = {
  render: () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
      <div
        style={{
          border: '1px solid #eee',
          borderRadius: 12,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>Write a Review</div>
        <DesktopTextArea
          label="Review Title"
          placeholder="Summarize your experience..."
          value={title}
          onChange={setTitle}
          maxLength={100}
          showCount
          rows={1}
          autoResize
        />
        <DesktopTextArea
          label="Your Review"
          placeholder="What did you like or dislike? How did you use this product?"
          value={body}
          onChange={setBody}
          maxLength={2000}
          showCount
          rows={5}
          autoResize
          helperText="Minimum 20 characters. Include details about quality, value, and fit."
        />
        <div style={{ fontSize: 12, color: '#999' }}>
          {body.length < 20 ? `${20 - body.length} more characters needed` : 'Ready to submit'}
        </div>
      </div>
    );
  },
};

/* ─── Edge Cases ─── */

export const LongError: Story = {
  name: 'Long Error Message',
  args: {
    label: 'Description',
    value: 'x',
    error:
      'The product description must contain at least 50 characters, include key features, and not contain any prohibited words or external links.',
    rows: 3,
    onChange: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Shipping Policy',
    value:
      'All items are shipped within 1-3 business days from our Tashkent warehouse. International orders may take 7-14 business days depending on destination.',
    readOnly: true,
    rows: 3,
  },
};

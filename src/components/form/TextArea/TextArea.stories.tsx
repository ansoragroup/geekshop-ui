import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TextArea } from './TextArea';

const meta = {
  title: 'Form/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Sharhingiz',
    placeholder: 'Mahsulot haqida fikringizni yozing...',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await userEvent.type(textarea, 'Ajoyib mahsulot!');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const WithCount: Story = {
  name: 'With Character Count',
  args: {
    label: 'Sharhingiz',
    placeholder: 'Mahsulot haqida fikringizni yozing...',
    maxLength: 500,
    showCount: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextArea {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: 'Izoh',
    value: 'ab',
    error: "Kamida 10 ta belgi bo'lishi kerak",
    maxLength: 500,
    showCount: true,
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Tavsif',
    placeholder: 'Mahsulot tavsifini kiriting...',
    helperText: "Kamida 20 ta belgi yozing",
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Xabar',
    placeholder: "Xabaringizni yozing...",
    autoResize: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextArea {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    label: 'Sharh',
    value: "Bu maydonni o'zgartirib bo'lmaydi.",
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => {
    const [review, setReview] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextArea
          label="Sharh yozing"
          placeholder="Mahsulot haqida fikringiz..."
          value={review}
          onChange={setReview}
          maxLength={500}
          showCount
        />
        <TextArea
          label="Xato bilan"
          value="ab"
          error="Kamida 10 ta belgi bo'lishi kerak"
          maxLength={500}
          showCount
        />
        <TextArea
          label="Yordam matni bilan"
          placeholder="Yozing..."
          helperText="Ixtiyoriy maydon"
        />
        <TextArea
          label="O'chirilgan"
          value="Bu maydonni o'zgartirib bo'lmaydi."
          disabled
        />
      </div>
    );
  },
};

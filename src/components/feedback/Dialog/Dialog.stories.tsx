import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Dialog } from './Dialog';
import { Button } from '../../form/Button';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, width: 390, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    title: "Buyurtmani bekor qilish",
    message: "Haqiqatan ham buyurtmani bekor qilmoqchimisiz?",
    onConfirm: fn(),
    onCancel: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Dialog should be visible
    const dialog = canvas.getByRole('alertdialog');
    await expect(dialog).toBeInTheDocument();

    // Should have confirm and cancel buttons
    await expect(canvas.getByText('Tasdiqlash')).toBeInTheDocument();
    await expect(canvas.getByText('Bekor qilish')).toBeInTheDocument();

    // Click confirm
    await userEvent.click(canvas.getByText('Tasdiqlash'));
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};

export const Danger: Story = {
  name: 'Danger Confirm',
  args: {
    visible: true,
    title: "Manzilni o'chirishni xohlaysizmi?",
    message: "Bu amalni qaytarib bo'lmaydi.",
    confirmText: "O'chirish",
    confirmType: 'danger',
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export const ConfirmOnly: Story = {
  name: 'Confirm Only (No Cancel)',
  args: {
    visible: true,
    title: "Xabar yuborildi",
    message: "Sizning xabaringiz muvaffaqiyatli yuborildi.",
    confirmText: "Tushundim",
    showCancel: false,
    onConfirm: fn(),
  },
};

export const CustomContent: Story = {
  name: 'Custom Body Content',
  args: {
    visible: true,
    title: "Savatni tozalash",
    confirmText: "Tozalash",
    confirmType: 'danger',
    onConfirm: fn(),
    onCancel: fn(),
    children: (
      <div style={{ textAlign: 'center', color: '#666', fontSize: 14 }}>
        <p style={{ margin: '0 0 8px' }}>
          Savatda <strong>3 ta</strong> mahsulot bor.
        </p>
        <p style={{ margin: 0 }}>
          Ularning barchasi olib tashlanadi.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    visible: false,
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setVisible(true)}>
          Hisobni o&apos;chirish
        </Button>
        <Dialog
          visible={visible}
          title="Hisobni o'chirish"
          message="Haqiqatan ham hisobingizni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
          confirmText="O'chirish"
          confirmType="danger"
          onConfirm={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          onClose={() => setVisible(false)}
        />
      </>
    );
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    title: "Test",
  },
};

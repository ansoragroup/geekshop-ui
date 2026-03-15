import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Toast } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'loading'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Muvaffaqiyatli!',
    type: 'success',
    visible: true,
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    message: 'Xatolik yuz berdi',
    type: 'error',
    visible: true,
    duration: 0,
  },
};

export const Info: Story = {
  args: {
    message: 'Savatga qo\'shildi',
    type: 'info',
    visible: true,
    duration: 0,
  },
};

export const Loading: Story = {
  args: {
    message: 'Yuklanmoqda...',
    type: 'loading',
    visible: true,
    duration: 0,
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<'success' | 'error' | 'info' | 'loading'>('success');

    const show = (t: typeof type) => {
      setType(t);
      setVisible(true);
    };

    return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => show('success')} style={{ padding: '8px 16px', background: '#07C160', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
          Muvaffaqiyat
        </button>
        <button onClick={() => show('error')} style={{ padding: '8px 16px', background: '#FF3B30', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
          Xatolik
        </button>
        <button onClick={() => show('info')} style={{ padding: '8px 16px', background: '#1890FF', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
          Ma'lumot
        </button>
        <button onClick={() => show('loading')} style={{ padding: '8px 16px', background: '#666', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
          Yuklanmoqda
        </button>
        <Toast
          message={
            type === 'success' ? 'Muvaffaqiyatli!' :
            type === 'error' ? 'Xatolik yuz berdi' :
            type === 'info' ? 'Savatga qo\'shildi' :
            'Yuklanmoqda...'
          }
          type={type}
          visible={visible}
          duration={type === 'loading' ? 0 : 2000}
          onClose={() => setVisible(false)}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the success button to show toast
    const successBtn = canvas.getByRole('button', { name: /muvaffaqiyat/i });
    await userEvent.click(successBtn);

    // Verify toast alert appears with success message
    const alert = canvas.getByRole('alert');
    await expect(alert).toBeInTheDocument();
    await expect(alert).toHaveTextContent('Muvaffaqiyatli!');
  },
};

export const VisibleToastTest: Story = {
  args: {
    message: 'Test toast message',
    type: 'success',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the toast alert is rendered
    const alert = canvas.getByRole('alert');
    await expect(alert).toBeInTheDocument();
    await expect(alert).toHaveTextContent('Test toast message');

    // Verify aria-live for accessibility
    const status = canvas.getByRole('status');
    await expect(status).toHaveAttribute('aria-live', 'assertive');
  },
};

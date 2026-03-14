import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Popup } from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'Feedback/Popup',
  component: Popup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['center', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const Center: Story = {
  args: {
    visible: true,
    position: 'center',
    title: 'Diqqat',
    closable: true,
    children: (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
          Rostdan ham bu mahsulotni savatdan o'chirmoqchimisiz?
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
          <button style={{ flex: 1, padding: '10px 0', borderRadius: 24, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14 }}>
            Bekor qilish
          </button>
          <button style={{ flex: 1, padding: '10px 0', borderRadius: 24, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            O'chirish
          </button>
        </div>
      </div>
    ),
  },
};

export const Bottom: Story = {
  args: {
    visible: true,
    position: 'bottom',
    title: 'Yetkazib berish usuli',
    closable: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['Kuryer orqali', 'Pochta orqali', 'O\'zim olib ketaman'].map((item) => (
          <div key={item} style={{ padding: '14px 16px', background: '#F5F5F5', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
            {item}
          </div>
        ))}
      </div>
    ),
  },
};

export const NonclosableCenter: Story = {
  name: 'Non-closable Center',
  args: {
    visible: true,
    position: 'center',
    title: 'Yangilanish',
    closable: false,
    children: (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
          Ilovaning yangi versiyasi mavjud. Iltimos, yangilang.
        </p>
        <button style={{ marginTop: 16, padding: '10px 32px', borderRadius: 24, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          Yangilash
        </button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [centerVisible, setCenterVisible] = useState(false);
    const [bottomVisible, setBottomVisible] = useState(false);

    return (
      <div style={{ padding: 16, display: 'flex', gap: 8 }}>
        <button
          onClick={() => setCenterVisible(true)}
          style={{ padding: '10px 20px', background: '#FF5000', color: '#fff', borderRadius: 24, border: 'none', cursor: 'pointer', fontSize: 14 }}
        >
          Markaziy popup
        </button>
        <button
          onClick={() => setBottomVisible(true)}
          style={{ padding: '10px 20px', background: '#1890FF', color: '#fff', borderRadius: 24, border: 'none', cursor: 'pointer', fontSize: 14 }}
        >
          Pastki popup
        </button>

        <Popup visible={centerVisible} position="center" title="Xabar" onClose={() => setCenterVisible(false)}>
          <p style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>Markaziy popup kontenti</p>
        </Popup>

        <Popup visible={bottomVisible} position="bottom" title="Tanlang" onClose={() => setBottomVisible(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
            {['Variant 1', 'Variant 2', 'Variant 3'].map((item) => (
              <div key={item} style={{ padding: '14px 16px', background: '#F5F5F5', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
                {item}
              </div>
            ))}
          </div>
        </Popup>
      </div>
    );
  },
};

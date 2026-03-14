import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Swipe } from './Swipe';

const meta = {
  title: 'Feedback/Swipe',
  component: Swipe,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Swipe>;

export default meta;
type Story = StoryObj<typeof Swipe>;

export const Default: Story = {
  args: {
    rightActions: [
      {
        key: 'delete',
        label: "O'chirish",
        backgroundColor: '#FF3B30',
        onClick: () => alert("O'chirildi!"),
      },
    ],
    children: (
      <div
        style={{
          padding: '16px',
          background: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        <div style={{ fontWeight: 500 }}>Chapga suring o'chirish uchun</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
          O'chirish tugmasini ko'rish uchun chapga suring
        </div>
      </div>
    ),
  },
};

export const LeftAndRight: Story = {
  args: {
    leftActions: [
      {
        key: 'favorite',
        label: 'Sevimli',
        backgroundColor: '#FF5000',
        onClick: () => alert('Sevimlilarga qo\'shildi!'),
      },
    ],
    rightActions: [
      {
        key: 'delete',
        label: "O'chirish",
        backgroundColor: '#FF3B30',
        onClick: () => alert("O'chirildi!"),
      },
    ],
    children: (
      <div
        style={{
          padding: '16px',
          background: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        <div style={{ fontWeight: 500 }}>Ikki tomonlama suring</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
          Chapga — o'chirish, o'ngga — sevimli
        </div>
      </div>
    ),
  },
};

export const CartItemSwipe: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, name: 'NVIDIA GeForce RTX 4090', price: '24 990 000', variant: 'Qora, 24GB' },
      { id: 2, name: 'AMD Ryzen 9 7950X', price: '7 490 000', variant: '16 yadro' },
      { id: 3, name: 'Samsung 990 PRO 2TB', price: '2 890 000', variant: 'NVMe M.2' },
    ]);

    const handleDelete = (id: number) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#f5f5f5' }}>
        {items.map((item) => (
          <Swipe
            key={item.id}
            rightActions={[
              {
                key: 'delete',
                label: "O'chirish",
                backgroundColor: '#FF3B30',
                onClick: () => handleDelete(item.id),
              },
            ]}
          >
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: '12px 16px',
                background: '#fff',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  background: '#f0f0f0',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: '#999',
                }}
              >
                Rasm
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </div>
                <div style={{ color: '#999', fontSize: 12, marginTop: 2 }}>
                  {item.variant}
                </div>
                <div style={{ color: '#FF5000', fontWeight: 600, fontSize: 14, marginTop: 4 }}>
                  {item.price} so'm
                </div>
              </div>
            </div>
          </Swipe>
        ))}
        {items.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: '#999' }}>
            Savat bo'sh
          </div>
        )}
      </div>
    );
  },
};

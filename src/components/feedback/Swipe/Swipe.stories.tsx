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

// ─── 1. Default (Right Action: Delete) ───────────────────────────────────────

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

// ─── 2. Left and Right Actions ───────────────────────────────────────────────

export const LeftAndRight: Story = {
  args: {
    leftActions: [
      {
        key: 'favorite',
        label: 'Sevimli',
        backgroundColor: '#FF5000',
        onClick: () => alert("Sevimlilarga qo'shildi!"),
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

// ─── 3. Cart Item Swipe (Removable list) ─────────────────────────────────────

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
                <div style={{ color: '#999', fontSize: 12, marginTop: 2 }}>{item.variant}</div>
                <div style={{ color: '#FF5000', fontWeight: 600, fontSize: 14, marginTop: 4 }}>
                  {item.price} so'm
                </div>
              </div>
            </div>
          </Swipe>
        ))}
        {items.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: '#999' }}>Savat bo'sh</div>
        )}
      </div>
    );
  },
};

// ─── 4. Multiple Right Actions ───────────────────────────────────────────────

export const MultipleRightActions: Story = {
  args: {
    rightActions: [
      {
        key: 'archive',
        label: 'Arxiv',
        backgroundColor: '#FFA726',
        onClick: () => alert('Arxivlandi!'),
      },
      {
        key: 'delete',
        label: "O'chirish",
        backgroundColor: '#FF3B30',
        onClick: () => alert("O'chirildi!"),
      },
    ],
    children: (
      <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 500 }}>Chapga suring (2 ta amal)</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>Arxivlash va o'chirish</div>
      </div>
    ),
  },
};

// ─── 5. Multiple Left Actions ────────────────────────────────────────────────

export const MultipleLeftActions: Story = {
  args: {
    leftActions: [
      {
        key: 'pin',
        label: 'Pin',
        backgroundColor: '#1890FF',
        onClick: () => alert('Pinned!'),
      },
      {
        key: 'favorite',
        label: 'Sevimli',
        backgroundColor: '#FF5000',
        onClick: () => alert("Sevimlilarga qo'shildi!"),
      },
    ],
    children: (
      <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 500 }}>O'ngga suring (2 ta amal)</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
          Pin va sevimlilarga qo'shish
        </div>
      </div>
    ),
  },
};

// ─── 6. Disabled ─────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    disabled: true,
    rightActions: [
      {
        key: 'delete',
        label: "O'chirish",
        backgroundColor: '#FF3B30',
        onClick: () => {},
      },
    ],
    children: (
      <div
        style={{
          padding: '16px',
          background: '#f9f9f9',
          borderBottom: '1px solid #eee',
          opacity: 0.6,
        }}
      >
        <div style={{ fontWeight: 500, color: '#999' }}>Swipe o'chirilgan</div>
        <div style={{ color: '#ccc', fontSize: 12, marginTop: 4 }}>
          Bu element surish uchun bloklangan
        </div>
      </div>
    ),
  },
};

// ─── 7. Notification List ────────────────────────────────────────────────────

export const NotificationList: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        icon: '\u{1F4E6}',
        title: "Buyurtmangiz yo'lda",
        text: '#GS-2026-0091 yetkazib berilmoqda',
        time: '2 daqiqa oldin',
        unread: true,
      },
      {
        id: 2,
        icon: '\u{1F3F7}',
        title: 'Flash chegirma!',
        text: 'RTX 4070 Super — 30% chegirma',
        time: '15 daqiqa oldin',
        unread: true,
      },
      {
        id: 3,
        icon: '\u2705',
        title: "To'lov tasdiqlandi",
        text: "#GS-2026-0088 uchun to'lov qabul qilindi",
        time: '1 soat oldin',
        unread: false,
      },
      {
        id: 4,
        icon: '\u{1F4AC}',
        title: 'Yangi javob',
        text: 'Sotuvchi savolingizga javob berdi',
        time: '3 soat oldin',
        unread: false,
      },
    ]);

    const handleDelete = (id: number) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleMarkRead = (id: number) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#f5f5f5' }}>
        {notifications.map((n) => (
          <Swipe
            key={n.id}
            leftActions={
              n.unread
                ? [
                    {
                      key: 'read',
                      label: "O'qildi",
                      backgroundColor: '#1890FF',
                      onClick: () => handleMarkRead(n.id),
                    },
                  ]
                : []
            }
            rightActions={[
              {
                key: 'delete',
                label: "O'chirish",
                backgroundColor: '#FF3B30',
                onClick: () => handleDelete(n.id),
              },
            ]}
          >
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: '14px 16px',
                background: n.unread ? '#FFF5F0' : '#fff',
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{n.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: n.unread ? 600 : 400 }}>{n.title}</span>
                  <span style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap' }}>
                    {n.time}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{n.text}</div>
              </div>
              {n.unread && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#FF5000',
                    flexShrink: 0,
                    marginTop: 6,
                  }}
                />
              )}
            </div>
          </Swipe>
        ))}
        {notifications.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: '#999', background: '#fff' }}>
            Bildirishnomalar yo'q
          </div>
        )}
      </div>
    );
  },
};

// ─── 8. Order List ───────────────────────────────────────────────────────────

export const OrderList: Story = {
  name: 'Order History',
  render: () => {
    const orders = [
      {
        id: 'GS-2026-0093',
        date: '25 Mar 2026',
        status: 'Yetkazildi',
        statusColor: '#07C160',
        total: '24 990 000',
      },
      {
        id: 'GS-2026-0088',
        date: '20 Mar 2026',
        status: "Yo'lda",
        statusColor: '#1890FF',
        total: '7 490 000',
      },
      {
        id: 'GS-2026-0075',
        date: '15 Mar 2026',
        status: 'Tayyorlanmoqda',
        statusColor: '#FFA726',
        total: '12 500 000',
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#f5f5f5' }}>
        {orders.map((order) => (
          <Swipe
            key={order.id}
            rightActions={[
              {
                key: 'cancel',
                label: 'Bekor',
                backgroundColor: '#FF3B30',
                onClick: () => alert(`${order.id} bekor qilindi`),
              },
            ]}
            leftActions={[
              {
                key: 'reorder',
                label: 'Qayta',
                backgroundColor: '#07C160',
                onClick: () => alert(`${order.id} qayta buyurtma`),
              },
            ]}
          >
            <div style={{ padding: '14px 16px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>#{order.id}</span>
                <span style={{ fontSize: 12, color: order.statusColor, fontWeight: 500 }}>
                  {order.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#999' }}>{order.date}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#FF0000' }}>
                  {order.total} so'm
                </span>
              </div>
            </div>
          </Swipe>
        ))}
      </div>
    );
  },
};

// ─── 9. Custom Threshold ─────────────────────────────────────────────────────

export const CustomThreshold: Story = {
  name: 'Custom Threshold (40px)',
  args: {
    threshold: 40,
    rightActions: [
      {
        key: 'delete',
        label: "O'chirish",
        backgroundColor: '#FF3B30',
        onClick: () => alert("O'chirildi!"),
      },
    ],
    children: (
      <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 500 }}>Oson ochiladigan swipe</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
          Faqat 40px surish kifoya (standart: 80px)
        </div>
      </div>
    ),
  },
};

// ─── 10. Custom Colors ───────────────────────────────────────────────────────

export const CustomColors: Story = {
  name: 'Custom Action Colors',
  args: {
    leftActions: [
      {
        key: 'share',
        label: 'Ulash',
        backgroundColor: '#6C5CE7',
        color: '#fff',
        onClick: () => alert('Ulashildi!'),
      },
    ],
    rightActions: [
      {
        key: 'edit',
        label: 'Tahrir',
        backgroundColor: '#00B894',
        color: '#fff',
        onClick: () => alert('Tahrirlash!'),
      },
      {
        key: 'delete',
        label: "O'chirish",
        backgroundColor: '#D63031',
        color: '#fff',
        onClick: () => alert("O'chirildi!"),
      },
    ],
    children: (
      <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 500 }}>Maxsus ranglar</div>
        <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
          Chapga — tahrirlash + o'chirish | O'ngga — ulashish
        </div>
      </div>
    ),
  },
};

// ─── 11. Wishlist Items ──────────────────────────────────────────────────────

export const WishlistItems: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, name: 'MacBook Pro 16" M3 Max', price: '52 000 000', inStock: true },
      { id: 2, name: 'Sony WH-1000XM5', price: '4 800 000', inStock: true },
      { id: 3, name: 'DJI Mini 4 Pro', price: '12 500 000', inStock: false },
      { id: 4, name: 'Apple Watch Ultra 2', price: '13 200 000', inStock: true },
    ]);

    const handleRemove = (id: number) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#f5f5f5' }}>
        {items.map((item) => (
          <Swipe
            key={item.id}
            rightActions={[
              {
                key: 'remove',
                label: 'Olib tash.',
                backgroundColor: '#FF3B30',
                onClick: () => handleRemove(item.id),
              },
            ]}
            leftActions={[
              {
                key: 'cart',
                label: 'Savatga',
                backgroundColor: '#FF5000',
                onClick: () => alert(`${item.name} savatga qo'shildi`),
              },
            ]}
          >
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: '14px 16px',
                background: '#fff',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  background: '#f0f0f0',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 6c-2.5-3.5-7-3.5-8.5 0S5.5 15 12 21c6.5-6 8-10 6.5-15S14.5 2.5 12 6z"
                    fill="#FF5000"
                  />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#FF0000' }}>
                    {item.price} so'm
                  </span>
                  <span style={{ fontSize: 12, color: item.inStock ? '#07C160' : '#FF3B30' }}>
                    {item.inStock ? 'Mavjud' : 'Tugagan'}
                  </span>
                </div>
              </div>
            </div>
          </Swipe>
        ))}
        {items.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: '#999', background: '#fff' }}>
            Sevimlilar ro'yxati bo'sh
          </div>
        )}
      </div>
    );
  },
};

// ─── 12. Address Management ──────────────────────────────────────────────────

export const AddressManagement: Story = {
  render: () => {
    const [addresses, setAddresses] = useState([
      {
        id: 1,
        label: 'Uy',
        name: 'Aziz Karimov',
        address: "Amir Temur ko'chasi, 108-uy, 24-xonadon",
        city: 'Toshkent',
        isDefault: true,
      },
      {
        id: 2,
        label: 'Ofis',
        name: 'Aziz Karimov',
        address: "Mustaqillik ko'chasi, 55-uy",
        city: 'Toshkent',
        isDefault: false,
      },
      {
        id: 3,
        label: 'Ota-ona',
        name: 'Sardor Karimov',
        address: "Navoiy ko'chasi, 12-uy",
        city: 'Samarqand',
        isDefault: false,
      },
    ]);

    const handleDelete = (id: number) => {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#f5f5f5' }}>
        {addresses.map((addr) => (
          <Swipe
            key={addr.id}
            rightActions={
              addr.isDefault
                ? []
                : [
                    {
                      key: 'delete',
                      label: "O'chirish",
                      backgroundColor: '#FF3B30',
                      onClick: () => handleDelete(addr.id),
                    },
                  ]
            }
            leftActions={[
              {
                key: 'edit',
                label: 'Tahrir',
                backgroundColor: '#1890FF',
                onClick: () => alert(`${addr.label} tahrirlash`),
              },
            ]}
          >
            <div style={{ padding: '14px 16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{addr.label}</span>
                {addr.isDefault && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: '#FFF5F0',
                      color: '#FF5000',
                      fontWeight: 500,
                    }}
                  >
                    Asosiy
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: '#666' }}>{addr.name}</div>
              <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>
                {addr.address}, {addr.city}
              </div>
            </div>
          </Swipe>
        ))}
      </div>
    );
  },
};

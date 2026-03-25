import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BottomSheet } from './BottomSheet';

const meta = {
  title: 'Feedback/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1. SKU Selector ─────────────────────────────────────────────────────────

export const SkuSelector: Story = {
  name: 'SKU Selector',
  args: {
    visible: true,
    title: 'Variantni tanlang',
    height: '55vh',
    children: (
      <div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, background: '#F5F5F5', borderRadius: 8 }} />
            <div>
              <div style={{ color: '#FF0000', fontSize: 20, fontWeight: 700 }}>4 890 000 so'm</div>
              <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>Omborda: 128 ta</div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Rang</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Qora', 'Oq', 'Kulrang'].map((c) => (
              <span
                key={c}
                style={{
                  padding: '6px 16px',
                  borderRadius: 9999,
                  border: c === 'Qora' ? '2px solid #FF5000' : '1px solid #eee',
                  background: c === 'Qora' ? '#FFF5F0' : '#fff',
                  fontSize: 13,
                  color: c === 'Qora' ? '#FF5000' : '#333',
                  cursor: 'pointer',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Xotira</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['8GB / 256GB', '12GB / 512GB', '16GB / 1TB'].map((m, i) => (
              <span
                key={m}
                style={{
                  padding: '6px 16px',
                  borderRadius: 9999,
                  border: i === 1 ? '2px solid #FF5000' : '1px solid #eee',
                  background: i === 1 ? '#FFF5F0' : '#fff',
                  fontSize: 13,
                  color: i === 1 ? '#FF5000' : '#333',
                  cursor: 'pointer',
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

// ─── 2. Filter Sheet ─────────────────────────────────────────────────────────

export const FilterSheet: Story = {
  args: {
    visible: true,
    title: 'Filtrlar',
    height: '70vh',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Narx oralig'i</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #eee',
                fontSize: 14,
              }}
              placeholder="dan"
            />
            <span style={{ color: '#999' }}>—</span>
            <input
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #eee',
                fontSize: 14,
              }}
              placeholder="gacha"
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Brend</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte'].map((b) => (
              <span
                key={b}
                style={{
                  padding: '6px 16px',
                  borderRadius: 9999,
                  border: '1px solid #eee',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

// ─── 3. Interactive ──────────────────────────────────────────────────────────

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div style={{ padding: 16 }}>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '10px 24px',
            background: '#FF5000',
            color: '#fff',
            borderRadius: 24,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Bottom Sheet ochish
        </button>

        <BottomSheet visible={visible} title="Variantni tanlang" onClose={() => setVisible(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
            {['Variant A', 'Variant B', 'Variant C', 'Variant D'].map((item) => (
              <div
                key={item}
                style={{
                  padding: '14px 16px',
                  background: '#F5F5F5',
                  borderRadius: 8,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// ─── 4. Open/Close Test (play function) ──────────────────────────────────────

export const OpenCloseTest: Story = {
  args: {
    visible: true,
    title: 'Test Bottom Sheet',
    onClose: fn(),
    children: <div style={{ padding: 16 }}>Bottom sheet content</div>,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const dialog = canvas.getByRole('dialog', { name: /test bottom sheet/i });
    await expect(dialog).toBeInTheDocument();

    const closeButton = canvas.getByRole('button', { name: /yopish/i });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);

    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

// ─── 5. No Title ─────────────────────────────────────────────────────────────

export const NoTitle: Story = {
  name: 'Without Title',
  args: {
    visible: true,
    onClose: fn(),
    children: (
      <div style={{ padding: '24px 16px', textAlign: 'center' }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#E8F8EF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M7 14L12 19L21 9"
              stroke="#07C160"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
          Buyurtma qabul qilindi!
        </div>
        <div style={{ fontSize: 13, color: '#666' }}>
          Buyurtma #GS-2026-0092 muvaffaqiyatli rasmiylashtirildi.
        </div>
      </div>
    ),
  },
};

// ─── 6. Custom Height (short) ────────────────────────────────────────────────

export const ShortHeight: Story = {
  name: 'Short Height (30vh)',
  args: {
    visible: true,
    title: 'Yetkazib berish',
    height: '30vh',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: 'Standart yetkazib berish', price: 'Bepul', time: '3-5 kun' },
          { label: 'Tezkor yetkazib berish', price: "25 000 so'm", time: '1-2 kun' },
        ].map((opt) => (
          <div
            key={opt.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              background: '#F5F5F5',
              borderRadius: 8,
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{opt.time}</div>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: opt.price === 'Bepul' ? '#07C160' : '#FF5000',
              }}
            >
              {opt.price}
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

// ─── 7. Full Height (95vh) ───────────────────────────────────────────────────

export const FullHeight: Story = {
  name: 'Full Height (95vh)',
  args: {
    visible: true,
    title: 'Barcha sharhlar',
    height: '95vh',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          {
            name: 'Aziz K.',
            date: '15 Mar 2026',
            rating: 5,
            text: "Juda zo'r mahsulot! Tez yetkazib berildi, sifati a'lo darajada. Tavsiya qilaman.",
          },
          {
            name: 'Madina R.',
            date: '12 Mar 2026',
            rating: 4,
            text: 'Yaxshi mahsulot. Narxiga arziydi. Faqat quti biroz ezilgan edi.',
          },
          {
            name: 'Sardor B.',
            date: '10 Mar 2026',
            rating: 5,
            text: "Kutganimdan ham yaxshiroq chiqdi. O'yin o'ynash uchun zo'r.",
          },
          {
            name: 'Nilufar T.',
            date: '8 Mar 2026',
            rating: 3,
            text: "O'rtacha. Rasm bilan farq qiladi. Lekin ishlaydi.",
          },
          {
            name: 'Jamshid M.',
            date: '5 Mar 2026',
            rating: 5,
            text: 'Mukammal! Ikkinchi marta xarid qilyapman. Sifatga ishonaman.',
          },
          {
            name: 'Dilfuza A.',
            date: '2 Mar 2026',
            rating: 4,
            text: "Yetkazib berish tez bo'ldi, mahsulot sifatli. Rahmat!",
          },
          {
            name: 'Ulugbek S.',
            date: '28 Feb 2026',
            rating: 5,
            text: "Zo'r narx. Boshqa do'konlarda bundan qimmat.",
          },
          {
            name: 'Gulnora P.',
            date: '25 Feb 2026',
            rating: 2,
            text: 'Yetkazib berish juda uzoq davom etdi. Mahsulot yaxshi lekin servis yomon.',
          },
        ].map((review, i) => (
          <div
            key={i}
            style={{ padding: '12px 0', borderBottom: i < 7 ? '1px solid #eee' : 'none' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600 }}>{review.name}</div>
              <div style={{ fontSize: 12, color: '#999' }}>{review.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
              {Array.from({ length: 5 }, (_, j) => (
                <span
                  key={j}
                  style={{ fontSize: 12, color: j < review.rating ? '#FFA726' : '#ddd' }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{review.text}</div>
          </div>
        ))}
      </div>
    ),
  },
};

// ─── 8. With Form Content ────────────────────────────────────────────────────

export const WithFormContent: Story = {
  name: 'Address Form',
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div style={{ padding: 16 }}>
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '10px 24px',
            background: '#FF5000',
            color: '#fff',
            borderRadius: 24,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Manzil qo'shish
        </button>

        <BottomSheet
          visible={visible}
          title="Yangi manzil"
          height="70vh"
          onClose={() => setVisible(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
            <div>
              <label
                htmlFor="bs-fullname"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                To&apos;liq ism
              </label>
              <input
                id="bs-fullname"
                type="text"
                placeholder="Ismingizni kiriting"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="bs-phone"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                Telefon raqam
              </label>
              <input
                id="bs-phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="bs-city"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                Shahar
              </label>
              <select
                id="bs-city"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 14,
                  boxSizing: 'border-box',
                  background: '#fff',
                }}
              >
                <option>Toshkent</option>
                <option>Samarqand</option>
                <option>Buxoro</option>
                <option>Namangan</option>
                <option>Andijon</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="bs-address"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                Manzil
              </label>
              <textarea
                id="bs-address"
                rows={3}
                placeholder="Ko'cha, uy raqami, kvartira"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 14,
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>
            <button
              style={{
                padding: '14px',
                borderRadius: 12,
                border: 'none',
                background: '#FF5000',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Saqlash
            </button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// ─── 9. Empty State ──────────────────────────────────────────────────────────

export const EmptyContent: Story = {
  args: {
    visible: true,
    title: 'Bildirishnomalar',
    children: (
      <div style={{ textAlign: 'center', padding: '40px 16px' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 16 }}>
          <circle cx="24" cy="24" r="20" stroke="#eee" strokeWidth="2" />
          <path d="M24 14v10l7 4" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#333', marginBottom: 6 }}>
          Bildirishnomalar yo'q
        </div>
        <div style={{ fontSize: 13, color: '#999' }}>
          Yangi bildirishnomalar paydo bo'lganda bu yerda ko'rinadi
        </div>
      </div>
    ),
  },
};

// ─── 10. Product Image Gallery ───────────────────────────────────────────────

export const ImageGallery: Story = {
  args: {
    visible: true,
    title: 'Mahsulot rasmlari',
    height: '80vh',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          'https://images.unsplash.com/photo-1587831990691-b10bea7e5e39?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop',
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Mahsulot rasm ${i + 1}`}
            style={{ width: '100%', borderRadius: 8, objectFit: 'cover', aspectRatio: '1/1' }}
          />
        ))}
      </div>
    ),
  },
};

// ─── 11. Sort Options ────────────────────────────────────────────────────────

export const SortOptions: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('popular');

    const options = [
      { key: 'popular', label: 'Mashhur' },
      { key: 'price-asc', label: 'Narx: arzondan qimmatga' },
      { key: 'price-desc', label: 'Narx: qimmatdan arzonga' },
      { key: 'new', label: 'Yangi kelganlar' },
      { key: 'rating', label: "Reyting bo'yicha" },
      { key: 'discount', label: 'Eng katta chegirma' },
    ];

    return (
      <div style={{ padding: 16 }}>
        <button
          onClick={() => setVisible(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: '#fff',
            borderRadius: 20,
            border: '1px solid #eee',
            cursor: 'pointer',
            fontSize: 13,
            color: '#333',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Saralash
        </button>

        <BottomSheet
          visible={visible}
          title="Saralash"
          height="45vh"
          onClose={() => setVisible(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {options.map((opt) => (
              <div
                key={opt.key}
                onClick={() => {
                  setSelected(opt.key);
                  setVisible(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelected(opt.key);
                    setVisible(false);
                  }
                }}
                role="button"
                tabIndex={0}
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid #f5f5f5',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: selected === opt.key ? '#FF5000' : '#333',
                  fontWeight: selected === opt.key ? 600 : 400,
                }}
              >
                {opt.label}
                {selected === opt.key && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l4 4 6-7"
                      stroke="#FF5000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// ─── 12. Very Long Content (Scrollable) ──────────────────────────────────────

export const VeryLongContent: Story = {
  name: 'Very Long Scrollable Content',
  args: {
    visible: true,
    title: 'Mahsulot tavsifi',
    height: '60vh',
    children: (
      <div style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
        <h4 style={{ color: '#333', margin: '0 0 12px' }}>
          NVIDIA GeForce RTX 4090 Founders Edition
        </h4>
        <p style={{ margin: '0 0 12px' }}>
          NVIDIA GeForce RTX 4090 — bu dunyodagi eng kuchli iste'molchi grafik kartasi. Ada Lovelace
          arxitekturasi asosida qurilgan bu karta, avvalgi avlodga nisbatan 2-4 baravar yuqori
          unumdorlikni ta'minlaydi.
        </p>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>Texnik xususiyatlar</h4>
        <table
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 16 }}
        >
          <tbody>
            {[
              ['GPU', 'AD102'],
              ['CUDA yadrolari', '16 384'],
              ['VRAM', '24 GB GDDR6X'],
              ['Xotira interfeysi', '384-bit'],
              ['Bazaviy chastota', '2 235 MHz'],
              ['Boost chastota', '2 520 MHz'],
              ['TDP', '450W'],
              ['Quvvat ulash', '16-pin (12VHPWR)'],
              ['Chiqishlar', '3x DisplayPort 1.4a, 1x HDMI 2.1'],
              ['Uzunlik', '336 mm'],
              ['Eni', '3 slot'],
            ].map(([label, value]) => (
              <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px 0', color: '#999' }}>{label}</td>
                <td
                  style={{ padding: '8px 0', textAlign: 'right', fontWeight: 500, color: '#333' }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>Qutida</h4>
        <ul style={{ paddingLeft: 20, margin: '0 0 16px', color: '#666' }}>
          <li>GeForce RTX 4090 grafik kartasi</li>
          <li>12VHPWR quvvat adapteri</li>
          <li>Tez boshlash qo'llanmasi</li>
          <li>Kafolat varaqasi</li>
        </ul>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>Kafolat</h4>
        <p style={{ margin: 0 }}>
          3 yil ishlab chiqaruvchi kafolati. GeekShop orqali 14 kun ichida qaytarish mumkin.
        </p>
      </div>
    ),
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
              <span key={c} style={{ padding: '6px 16px', borderRadius: 9999, border: c === 'Qora' ? '2px solid #FF5000' : '1px solid #eee', background: c === 'Qora' ? '#FFF5F0' : '#fff', fontSize: 13, color: c === 'Qora' ? '#FF5000' : '#333', cursor: 'pointer' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Xotira</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['8GB / 256GB', '12GB / 512GB', '16GB / 1TB'].map((m, i) => (
              <span key={m} style={{ padding: '6px 16px', borderRadius: 9999, border: i === 1 ? '2px solid #FF5000' : '1px solid #eee', background: i === 1 ? '#FFF5F0' : '#fff', fontSize: 13, color: i === 1 ? '#FF5000' : '#333', cursor: 'pointer' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

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
            <input style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #eee', fontSize: 14 }} placeholder="dan" />
            <span style={{ color: '#999' }}>—</span>
            <input style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #eee', fontSize: 14 }} placeholder="gacha" />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Brend</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte'].map((b) => (
              <span key={b} style={{ padding: '6px 16px', borderRadius: 9999, border: '1px solid #eee', fontSize: 13, cursor: 'pointer' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div style={{ padding: 16 }}>
        <button
          onClick={() => setVisible(true)}
          style={{ padding: '10px 24px', background: '#FF5000', color: '#fff', borderRadius: 24, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
        >
          Bottom Sheet ochish
        </button>

        <BottomSheet visible={visible} title="Variantni tanlang" onClose={() => setVisible(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
            {['Variant A', 'Variant B', 'Variant C', 'Variant D'].map((item) => (
              <div key={item} style={{ padding: '14px 16px', background: '#F5F5F5', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
                {item}
              </div>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

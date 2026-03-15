import type { Meta, StoryObj } from '@storybook/react-vite';
import { Result } from './Result';

const meta = {
  title: 'Feedback/Result',
  component: Result,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, background: '#fff', borderRadius: 12, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Result>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Buyurtma tasdiqlandi!',
    description: "Xaridingiz uchun rahmat! Buyurtmangiz tez orada yetkaziladi.",
    actions: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <button
          style={{
            padding: '12px 24px',
            background: '#FF5000',
            color: '#fff',
            border: 'none',
            borderRadius: 24,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Buyurtmani ko'rish
        </button>
        <button
          style={{
            padding: '12px 24px',
            background: '#F5F5F5',
            color: '#1A1A1A',
            border: 'none',
            borderRadius: 24,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Xaridni davom ettirish
        </button>
      </div>
    ),
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: "To'lov amalga oshmadi",
    description: "Karta ma'lumotlarini tekshiring va qayta urinib ko'ring.",
    actions: (
      <button
        style={{
          padding: '12px 24px',
          background: '#FF3B30',
          color: '#fff',
          border: 'none',
          borderRadius: 24,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Qayta urinish
      </button>
    ),
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Zaxira tugamoqda',
    description: "Bu mahsulot tez orada tugashi mumkin. Hoziroq buyurtma bering!",
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: "Ma'lumot yangilandi",
    description: "Profilingiz muvaffaqiyatli yangilandi.",
  },
};

export const AllStatuses: Story = {
  name: 'All Status Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
      <Result status="success" title="Muvaffaqiyat!" description="Amal bajarildi" />
      <Result status="error" title="Xatolik!" description="Nimadir xato ketdi" />
      <Result status="warning" title="Diqqat!" description="E'tiborli bo'ling" />
      <Result status="info" title="Ma'lumot" description="Yangi xabar bor" />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    status: 'success',
    title: "Mahsulot qo'shildi!",
    description: "Sevimli mahsulotlaringiz ro'yxatiga qo'shildi.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
};

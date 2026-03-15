import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';

const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        time: '15:30',
        title: 'Buyurtma yetkazildi',
        description: 'Toshkent, Chilonzor tumani',
        status: 'completed',
      },
      {
        time: '09:15',
        title: "Kuryer yo'lda",
        description: 'Toshkent shahri',
        status: 'completed',
      },
      {
        time: 'Mar 14',
        title: 'Omborda',
        description: 'Toshkent omborida',
        status: 'active',
      },
      {
        time: 'Mar 13',
        title: 'Yuborildi',
        description: 'Xitoy, Guangzhou',
        status: 'pending',
      },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    items: [
      { time: '16:00', title: 'Buyurtma yetkazildi', status: 'completed' },
      { time: '12:30', title: "Kuryer yo'lda", status: 'completed' },
      { time: '08:00', title: 'Omborda', status: 'completed' },
      { time: 'Mar 12', title: 'Yuborildi', status: 'completed' },
    ],
  },
};

export const AllPending: Story = {
  args: {
    items: [
      { title: 'Yetkazib berish', status: 'pending' },
      { title: 'Omborda tayyorlash', status: 'pending' },
      { title: 'Yuborish', status: 'pending' },
    ],
  },
};

export const Reversed: Story = {
  args: {
    reverse: true,
    items: [
      { time: 'Mar 13', title: 'Yuborildi', description: 'Xitoy, Guangzhou', status: 'completed' },
      { time: 'Mar 14', title: 'Omborda', description: 'Toshkent omborida', status: 'completed' },
      { time: '09:15', title: "Kuryer yo'lda", description: 'Toshkent shahri', status: 'active' },
      { time: '15:30', title: 'Buyurtma yetkazildi', status: 'pending' },
    ],
  },
};

export const WithCustomIcons: Story = {
  args: {
    items: [
      {
        time: '15:30',
        title: 'Buyurtma yetkazildi',
        status: 'completed',
        icon: (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        time: '09:15',
        title: "Kuryer yo'lda",
        status: 'active',
        icon: (
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
          </svg>
        ),
      },
      {
        time: 'Mar 14',
        title: 'Kutilmoqda',
        status: 'pending',
      },
    ],
  },
};

export const RefundTracking: Story = {
  args: {
    items: [
      {
        time: 'Mar 15',
        title: "Pul qaytarildi",
        description: "245,000 so'm UZCARD kartangizga qaytarildi",
        status: 'completed',
      },
      {
        time: 'Mar 14',
        title: "Qaytarish tasdiqlandi",
        description: "Sifat tekshiruvidan o'tdi",
        status: 'completed',
      },
      {
        time: 'Mar 13',
        title: "Mahsulot qabul qilindi",
        description: "Toshkent omborida qabul qilindi",
        status: 'completed',
      },
      {
        time: 'Mar 12',
        title: "Qaytarish so'rovi yuborildi",
        status: 'completed',
      },
    ],
  },
};

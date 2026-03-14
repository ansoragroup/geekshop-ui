import type { Meta, StoryObj } from '@storybook/react-vite';
import { NoticeBar } from './NoticeBar';

const meta = {
  title: 'Content/NoticeBar',
  component: NoticeBar,
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
} satisfies Meta<typeof NoticeBar>;

export default meta;
type Story = StoryObj<typeof NoticeBar>;

export const Default: Story = {
  args: {
    content:
      'Diqqat! Bahorgi aksiya boshlandi — barcha tovarlar uchun 15% chegirma. Kupon kodi: BAHOR2026',
    mode: 'scroll',
    speed: 50,
    delay: 1000,
  },
};

export const Static: Story = {
  args: {
    content: 'Buyurtmalar 24 soat ichida yetkaziladi',
    mode: 'static',
  },
};

export const Closeable: Story = {
  args: {
    content: 'Yangi foydalanuvchilar uchun 10% chegirma!',
    mode: 'closeable',
    onClose: () => console.log('NoticeBar yopildi'),
  },
};

export const CustomColors: Story = {
  args: {
    content:
      'Flash sale! Faqat bugun — barcha elektronika 20% arzonroq!',
    mode: 'scroll',
    color: '#FFFFFF',
    backgroundColor: '#FF5000',
    speed: 60,
  },
};

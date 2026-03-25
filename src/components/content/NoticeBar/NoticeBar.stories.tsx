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

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 7v4M8 5.5V5" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor" />
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1 3h9v7H1zM10 6h2.5L14 8.5V10h-4V6z" />
    <circle cx="4" cy="11.5" r="1.5" />
    <circle cx="12" cy="11.5" r="1.5" />
  </svg>
);

const GiftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="2" y="6" width="12" height="8" rx="1" />
    <rect x="1" y="4" width="14" height="3" rx="1" />
    <path d="M8 4v10M5 4c0-2 3-3 3-1M11 4c0-2-3-3-3-1" />
  </svg>
);

export const CustomIcon: Story = {
  name: 'Custom Icon (Info)',
  args: {
    content: 'Buyurtma berish uchun ro\'yxatdan o\'ting',
    mode: 'static',
    icon: <InfoIcon />,
  },
};

export const DeliveryNotice: Story = {
  name: 'Delivery Notice (Truck Icon)',
  args: {
    content: 'Toshkent bo\'ylab bepul yetkazib berish. 2-3 kun ichida.',
    mode: 'static',
    icon: <TruckIcon />,
    color: '#07C160',
    backgroundColor: '#F0FFF5',
  },
};

export const GiftPromo: Story = {
  name: 'Gift Promotion (Scrolling)',
  args: {
    content: 'Har bir buyurtmaga sovg\'a! 500 000 so\'mdan oshgan buyurtmalarga maxsus aksessuarlar bepul.',
    mode: 'scroll',
    icon: <GiftIcon />,
    color: '#722ED1',
    backgroundColor: '#F9F0FF',
    speed: 40,
  },
};

export const FastScroll: Story = {
  name: 'Fast Scroll Speed (100px — s)',
  args: {
    content: 'Tezkor yetkazib berish xizmati faol — bugun buyurtma bering, ertaga oling!',
    mode: 'scroll',
    speed: 100,
    delay: 500,
  },
};

export const SlowScroll: Story = {
  name: 'Slow Scroll Speed (25px — s)',
  args: {
    content: 'Bahorgi aksiya: barcha kategoriyalarda 10% dan 50% gacha chegirmalar. Kupon kodi: SPRING2026',
    mode: 'scroll',
    speed: 25,
    delay: 2000,
  },
};

export const VeryLongText: Story = {
  name: 'Edge: Very Long Content',
  args: {
    content: 'Diqqat! GeekShop.uz platformasida katta aksiya boshlandi. Barcha noutbuklar, monitorlar, videokartalar, protsessorlar, xotira modullari, SSD disklar, klaviaturalar, sichqonchalar, quloqchinlar va boshqa yuzlab mahsulotlarga 15% dan 70% gacha chegirma. Aksiya muddati cheklangan — faqat 3 kun! Kupon kodi: MEGASALE2026. Ushbu imkoniyatni boy bermang!',
    mode: 'scroll',
    speed: 60,
  },
};

export const ShortText: Story = {
  name: 'Edge: Short Content',
  args: {
    content: 'Yangilik!',
    mode: 'static',
  },
};

export const RussianContent: Story = {
  name: 'Locale: Russian',
  args: {
    content: 'Бесплатная доставка при заказе от 500 000 сум. Только сегодня!',
    mode: 'scroll',
    speed: 50,
    color: '#1890FF',
    backgroundColor: '#E6F7FF',
  },
};

export const DarkTheme: Story = {
  name: 'Dark Theme Colors',
  args: {
    content: 'Premium a\'zolik — barcha buyurtmalarga bepul yetkazib berish',
    mode: 'static',
    color: '#FFFFFF',
    backgroundColor: '#1A1A1A',
  },
};

export const CloseableWithCustomColors: Story = {
  name: 'Closeable + Custom Colors',
  args: {
    content: 'Birinchi buyurtmangizga 20% chegirma! Kupon: WELCOME20',
    mode: 'closeable',
    color: '#FFFFFF',
    backgroundColor: '#07C160',
    onClose: () => {},
  },
  argTypes: {
    onClose: { action: 'closed' },
  },
};

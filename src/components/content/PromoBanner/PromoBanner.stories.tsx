import type { Meta, StoryObj } from '@storybook/react-vite';
import { PromoBanner } from './PromoBanner';

const DiscountIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L20.24 6.24L26 4.64L25.36 10.56L30 14.24L25.76 18.48L27.36 24.24L21.44 23.6L17.76 28.24L14.48 23.04L8.56 24.64L10.16 18.72L4.48 15.04L9.68 11.76L8.08 5.84L14.04 7.44L16 2Z" />
  </svg>
);

const NewIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L19.09 9.26L26 10.27L21 15.14L22.18 22.02L16 18.77L9.82 22.02L11 15.14L6 10.27L12.91 9.26L16 3Z" />
  </svg>
);

const meta = {
  title: 'Content/PromoBanner',
  component: PromoBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '12px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PromoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Aksiya',
        subtitle: '50% gacha chegirma',
        tag: '-50%',
        gradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
        icon: <DiscountIcon />,
      },
      {
        title: 'Yangi kelganlar',
        subtitle: 'Eng so\'nggi mahsulotlar',
        tag: 'NEW',
        gradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
        icon: <NewIcon />,
      },
    ],
  },
};

export const ThreeCards: Story = {
  args: {
    items: [
      {
        title: 'GPU Aksiya',
        subtitle: 'RTX seriyasi',
        tag: '-30%',
        gradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
        icon: <DiscountIcon />,
      },
      {
        title: 'SSD Aksiya',
        subtitle: 'NVMe tezkor',
        tag: '-20%',
        gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
        icon: <DiscountIcon />,
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    items: [
      {
        title: 'Kupon olish',
        subtitle: 'Maxsus chegirmalar',
        tag: 'KUPON',
        gradient: 'linear-gradient(135deg, #F5222D 0%, #FF7875 100%)',
      },
      {
        title: 'Top mahsulotlar',
        subtitle: 'Eng ko\'p sotilgan',
        tag: 'TOP',
        gradient: 'linear-gradient(135deg, #FA8C16 0%, #FFC069 100%)',
      },
    ],
  },
};

const FlashIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2L8 18h6l-2 12 12-16h-6l2-12z" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="24" height="16" rx="2" />
    <rect x="2" y="8" width="28" height="6" rx="2" />
    <path d="M16 8v20M10 8c0-4 6-6 6-2M22 8c0-4-6-6-6-2" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6h18v14H2zM20 12h5l4 5v3h-9V12z" />
    <circle cx="8" cy="23" r="3" />
    <circle cx="24" cy="23" r="3" />
  </svg>
);

const CrownIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 24h24l-3-14-5 6-4-8-4 8-5-6L4 24z" />
    <rect x="4" y="24" width="24" height="4" rx="1" />
  </svg>
);

export const SingleItem: Story = {
  args: {
    items: [
      {
        title: 'Flash Sale',
        subtitle: 'Faqat bugun — 70% gacha chegirma',
        tag: 'FLASH',
        gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
        icon: <FlashIcon />,
      },
    ],
  },
};

export const FourItems: Story = {
  args: {
    items: [
      {
        title: 'Flash Sale',
        subtitle: '70% gacha',
        tag: 'HOT',
        gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
        icon: <FlashIcon />,
      },
      {
        title: 'Sovg\'alar',
        subtitle: 'Bepul sovg\'a',
        tag: 'FREE',
        gradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
        icon: <GiftIcon />,
      },
      {
        title: 'Yetkazish',
        subtitle: 'Bepul dostavka',
        tag: '0 so\'m',
        gradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
        icon: <TruckIcon />,
      },
      {
        title: 'Premium',
        subtitle: 'VIP a\'zolik',
        tag: 'VIP',
        gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
        icon: <CrownIcon />,
      },
    ],
  },
};

export const WithLinks: Story = {
  name: 'Items as Links',
  args: {
    items: [
      {
        title: 'Noutbuklar',
        subtitle: 'Yangi kolleksiya',
        tag: 'NEW',
        gradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
        icon: <NewIcon />,
        href: '#laptops',
        target: '_self',
      },
      {
        title: 'Aksessuarlar',
        subtitle: 'Barcha brendlar',
        tag: '-40%',
        gradient: 'linear-gradient(135deg, #13C2C2 0%, #36CFC9 100%)',
        icon: <DiscountIcon />,
        href: '#accessories',
        target: '_self',
      },
    ],
  },
};

export const LongTitles: Story = {
  name: 'Edge: Long Titles & Subtitles',
  args: {
    items: [
      {
        title: 'Elektron qurilmalar uchun maxsus takliflar',
        subtitle: 'Barcha kategoriyalarda eng yaxshi narxlar va kafolat xizmati',
        tag: '-50%',
        gradient: 'linear-gradient(135deg, #EB2F96 0%, #FF85C0 100%)',
        icon: <DiscountIcon />,
      },
      {
        title: 'Yangi yil bayrami munosabati bilan aksiya',
        subtitle: 'Barcha buyurtmalar uchun bepul yetkazib berish va sovg\'alar',
        tag: 'BAYRAM',
        gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
        icon: <GiftIcon />,
      },
    ],
  },
};

export const WithoutTags: Story = {
  name: 'No Tags',
  args: {
    items: [
      {
        title: 'Kategoriyalar',
        subtitle: 'Barcha tovarlar turlarini ko\'ring',
        gradient: 'linear-gradient(135deg, #2F54EB 0%, #597EF7 100%)',
        icon: <NewIcon />,
      },
      {
        title: 'Brendlar',
        subtitle: 'Apple, Samsung, Lenovo',
        gradient: 'linear-gradient(135deg, #FA541C 0%, #FF7A45 100%)',
        icon: <DiscountIcon />,
      },
    ],
  },
};

export const WithoutSubtitles: Story = {
  name: 'No Subtitles',
  args: {
    items: [
      {
        title: 'Aksiya',
        tag: '-30%',
        gradient: 'linear-gradient(135deg, #FF5000 0%, #FF9A5C 100%)',
        icon: <DiscountIcon />,
      },
      {
        title: 'Yangiliklar',
        tag: 'NEW',
        gradient: 'linear-gradient(135deg, #1890FF 0%, #69C0FF 100%)',
        icon: <NewIcon />,
      },
    ],
  },
};

export const DarkGradients: Story = {
  args: {
    items: [
      {
        title: 'Premium Collection',
        subtitle: 'Exclusive tech deals',
        tag: 'ELITE',
        gradient: 'linear-gradient(135deg, #1A1A1A 0%, #434343 100%)',
        icon: <CrownIcon />,
      },
      {
        title: 'Gaming Zone',
        subtitle: 'PC va konsol o\'yinlari',
        tag: 'GAME',
        gradient: 'linear-gradient(135deg, #0D1B2A 0%, #1B2838 100%)',
        icon: <FlashIcon />,
      },
    ],
  },
};

export const Clickable: Story = {
  name: 'Interactive: Clickable Items',
  args: {
    items: [
      {
        title: 'Kunlik aksiya',
        subtitle: 'Har kuni yangi taklif',
        tag: 'DAILY',
        gradient: 'linear-gradient(135deg, #FA8C16 0%, #FFC069 100%)',
        icon: <FlashIcon />,
        onClick: () => {},
      },
      {
        title: 'Haftalik top',
        subtitle: 'Eng mashhur mahsulotlar',
        tag: 'TOP 10',
        gradient: 'linear-gradient(135deg, #F5222D 0%, #FF7875 100%)',
        icon: <CrownIcon />,
        onClick: () => {},
      },
    ],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopNotificationsPage } from './DesktopNotificationsPage';
import type { Notification } from '../_shared/types';

const meta = {
  title: 'Pages (Desktop)/DesktopNotificationsPage',
  component: DesktopNotificationsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopNotificationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllRead: Story = {
  name: 'All Read',
  args: {
    initialNotifications: [
      {
        id: '1',
        type: 'order' as const,
        title: 'Buyurtma yetkazildi',
        message: 'GS-2026031401 raqamli buyurtmangiz yetkazildi.',
        timestamp: '2 kun oldin',
        read: true,
        avatarName: 'Buyurtma',
        badgeColor: 'success' as const,
      },
      {
        id: '2',
        type: 'promo' as const,
        title: 'Yangi kolleksiya!',
        message: 'RTX 5000 seriyasi endi sotuvda. Birinchilardan bo\'ling!',
        timestamp: '3 kun oldin',
        read: true,
        avatarName: 'GeekShop',
        badgeColor: 'primary' as const,
      },
      {
        id: '3',
        type: 'system' as const,
        title: 'Profil yangilandi',
        message: 'Telefon raqamingiz muvaffaqiyatli o\'zgartirildi.',
        timestamp: '1 hafta oldin',
        read: true,
        avatarName: 'Tizim',
        badgeColor: 'info' as const,
      },
    ] satisfies Notification[],
  },
};

export const Empty: Story = {
  name: 'No Notifications',
  args: {
    initialNotifications: [],
  },
};

export const AllUnread: Story = {
  name: 'All Unread',
  args: {
    initialNotifications: [
      {
        id: '1',
        type: 'order' as const,
        title: 'Buyurtma jo\'natildi',
        message: 'GS-2026032101 raqamli buyurtmangiz ombordan chiqdi. Kuzatish raqami: UZ1234567890',
        timestamp: '5 daqiqa oldin',
        read: false,
        avatarName: 'Buyurtma',
        badgeColor: 'primary' as const,
      },
      {
        id: '2',
        type: 'promo' as const,
        title: 'Flash Sale — Faqat bugun!',
        message: 'Barcha elektronika mahsulotlariga 30% chegirma. Fursatni qo\'ldan boy bermang!',
        timestamp: '1 soat oldin',
        read: false,
        avatarName: 'Aksiya',
        badgeColor: 'error' as const,
      },
      {
        id: '3',
        type: 'order' as const,
        title: 'To\'lov qabul qilindi',
        message: 'GS-2026032005 buyurtma uchun 8,900,000 UZS to\'lov muvaffaqiyatli amalga oshirildi.',
        timestamp: '3 soat oldin',
        read: false,
        avatarName: 'To\'lov',
        badgeColor: 'success' as const,
      },
      {
        id: '4',
        type: 'system' as const,
        title: 'Yangi qurilmadan kirish',
        message: 'Sizning hisobingizga iPhone 15 Pro orqali kirildi. Bu siz bo\'lmasangiz, parolni o\'zgartiring.',
        timestamp: '6 soat oldin',
        read: false,
        avatarName: 'Xavfsizlik',
        badgeColor: 'warning' as const,
      },
    ] satisfies Notification[],
  },
};

export const MixedReadUnread: Story = {
  name: 'Mixed Read — Unread',
  args: {
    initialNotifications: [
      {
        id: '1',
        type: 'order' as const,
        title: 'Buyurtma yetkazildi',
        message: 'GS-2026031901 raqamli buyurtmangiz muvaffaqiyatli yetkazildi.',
        timestamp: '1 soat oldin',
        read: false,
        avatarName: 'Buyurtma',
        badgeColor: 'success' as const,
      },
      {
        id: '2',
        type: 'promo' as const,
        title: 'Haftalik top mahsulotlar',
        message: 'Eng ko\'p sotilgan 10 ta mahsulot bilan tanishing.',
        timestamp: '5 soat oldin',
        read: true,
        avatarName: 'GeekShop',
        badgeColor: 'primary' as const,
      },
      {
        id: '3',
        type: 'system' as const,
        title: 'Parol o\'zgartirildi',
        message: 'Hisobingiz paroli muvaffaqiyatli yangilandi.',
        timestamp: '1 kun oldin',
        read: true,
        avatarName: 'Tizim',
        badgeColor: 'info' as const,
      },
      {
        id: '4',
        type: 'order' as const,
        title: 'Sharh yozing',
        message: 'GS-2026031501 buyurtmangiz bo\'yicha sharh qoldiring va 5000 ball oling!',
        timestamp: '2 kun oldin',
        read: false,
        avatarName: 'Sharh',
        badgeColor: 'warning' as const,
      },
      {
        id: '5',
        type: 'promo' as const,
        title: 'Yangi foydalanuvchi bonusi!',
        message: 'Birinchi buyurtmangizga 50,000 UZS chegirma kodi: WELCOME50',
        timestamp: '3 kun oldin',
        read: true,
        avatarName: 'Bonus',
        badgeColor: 'success' as const,
      },
    ] satisfies Notification[],
  },
};

export const ManyNotifications: Story = {
  name: 'Many Notifications (10+)',
  args: {
    initialNotifications: [
      { id: '1', type: 'order' as const, title: 'Buyurtma jo\'natildi', message: 'GS-2026032301 buyurtmangiz ombordan chiqdi.', timestamp: '10 daqiqa oldin', read: false, avatarName: 'Buyurtma', badgeColor: 'primary' as const },
      { id: '2', type: 'promo' as const, title: 'Bahor aksiyasi boshlandi!', message: 'Barcha kiyim-kechaklarga 40% gacha chegirma.', timestamp: '1 soat oldin', read: false, avatarName: 'Aksiya', badgeColor: 'error' as const },
      { id: '3', type: 'order' as const, title: 'To\'lov kutilmoqda', message: 'GS-2026032205 buyurtma uchun to\'lov 24 soat ichida amalga oshirilishi kerak.', timestamp: '3 soat oldin', read: false, avatarName: 'To\'lov', badgeColor: 'warning' as const },
      { id: '4', type: 'system' as const, title: 'Manzil qo\'shildi', message: 'Yangi yetkazib berish manzili muvaffaqiyatli saqlandi.', timestamp: '6 soat oldin', read: true, avatarName: 'Tizim', badgeColor: 'info' as const },
      { id: '5', type: 'order' as const, title: 'Qaytarish tasdiqlandi', message: 'GS-2026031801 buyurtma bo\'yicha qaytarish arizasi qabul qilindi. Pul 5-7 ish kuni ichida qaytariladi.', timestamp: '1 kun oldin', read: true, avatarName: 'Qaytarish', badgeColor: 'success' as const },
      { id: '6', type: 'promo' as const, title: 'Kupon sovg\'a!', message: 'Sodiq mijozlarimiz uchun: LOYAL20 kodi bilan 20% chegirma', timestamp: '1 kun oldin', read: true, avatarName: 'Sovg\'a', badgeColor: 'primary' as const },
      { id: '7', type: 'order' as const, title: 'Buyurtma yetkazildi', message: 'GS-2026031501 raqamli buyurtmangiz yetkazildi.', timestamp: '2 kun oldin', read: true, avatarName: 'Buyurtma', badgeColor: 'success' as const },
      { id: '8', type: 'system' as const, title: 'Email tasdiqlandi', message: 'alisher@mail.uz elektron pochta muvaffaqiyatli tasdiqlandi.', timestamp: '3 kun oldin', read: true, avatarName: 'Tizim', badgeColor: 'info' as const },
      { id: '9', type: 'promo' as const, title: 'Yangi RTX 5070 seriyasi!', message: 'NVIDIA RTX 5070 videokarta endi oldindan buyurtma qilish mumkin.', timestamp: '4 kun oldin', read: true, avatarName: 'Yangilik', badgeColor: 'primary' as const },
      { id: '10', type: 'order' as const, title: 'Buyurtma bekor qilindi', message: 'GS-2026031001 buyurtma sizning so\'rovingiz bilan bekor qilindi.', timestamp: '5 kun oldin', read: true, avatarName: 'Buyurtma', badgeColor: 'error' as const },
    ] satisfies Notification[],
  },
};

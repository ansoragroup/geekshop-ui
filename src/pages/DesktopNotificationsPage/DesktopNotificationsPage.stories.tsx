import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopNotificationsPage } from './DesktopNotificationsPage';

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
    ],
  },
};

export const Empty: Story = {
  name: 'No Notifications',
  args: {
    initialNotifications: [],
  },
};

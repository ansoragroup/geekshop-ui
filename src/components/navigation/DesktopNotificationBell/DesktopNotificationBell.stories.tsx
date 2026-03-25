import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopNotificationBell } from './DesktopNotificationBell';
import type { DesktopNotification } from './DesktopNotificationBell';

const meta = {
  title: 'Navigation (Desktop)/DesktopNotificationBell',
  component: DesktopNotificationBell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onRead: { action: 'notification read' },
    onMarkAllRead: { action: 'mark all read' },
    onViewAll: { action: 'view all' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420, padding: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopNotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNotifications: DesktopNotification[] = [
  {
    id: '1',
    type: 'order',
    title: "Buyurtma jo'natildi",
    body: "Buyurtma #GS-28431 — Samsung Galaxy S24 Ultra jo'natildi. Yetkazib berish: 2 kun.",
    time: '15 daqiqa oldin',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    title: 'Buyurtma yetkazildi',
    body: 'Buyurtma #GS-28390 muvaffaqiyatli yetkazib berildi.',
    time: '2 soat oldin',
    read: false,
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Bahor aksiyasi — 30% chegirma!',
    body: 'Barcha elektronika mahsulotlarida 30% gacha chegirma. Faqat 3 kunga!',
    time: '5 soat oldin',
    read: false,
  },
  {
    id: '4',
    type: 'promotion',
    title: 'Kupon kodi tayyor',
    body: "SPRING2026 kodi bilan qo'shimcha 10% chegirma oling.",
    time: '1 kun oldin',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: "Parol muvaffaqiyatli o'zgartirildi",
    body: 'Sizning akkaunt parolingiz muvaffaqiyatli yangilandi.',
    time: '2 kun oldin',
    read: true,
  },
];

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
  },
};

export const AllRead: Story = {
  name: "Hammasi o'qilgan",
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
  },
};

export const Empty: Story = {
  name: "Bo'sh",
  args: {
    notifications: [],
  },
};

export const ManyUnread: Story = {
  name: "Ko'p o'qilmagan (99+)",
  args: {
    notifications: sampleNotifications,
    count: 127,
  },
};

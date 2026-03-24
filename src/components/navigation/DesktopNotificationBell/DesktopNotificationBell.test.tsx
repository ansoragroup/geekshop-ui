import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopNotificationBell } from './DesktopNotificationBell';
import type { DesktopNotification } from './DesktopNotificationBell';

const sampleNotifications: DesktopNotification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order shipped',
    body: 'Your order #1234 has been shipped',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'order',
    title: 'Order delivered',
    body: 'Your order #1200 has been delivered',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n3',
    type: 'promotion',
    title: 'Flash Sale!',
    body: 'Up to 50% off on electronics',
    time: '3 hours ago',
    read: false,
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Password changed',
    body: 'Your password was successfully changed',
    time: '5 days ago',
    read: true,
  },
];

describe('DesktopNotificationBell', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<DesktopNotificationBell />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('renders bell button', () => {
    render(<DesktopNotificationBell />);
    const btn = screen.getByLabelText('Notifications');
    expect(btn.tagName).toBe('BUTTON');
  });

  it('dropdown is closed by default', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ─── Badge count ───────────────────────────────────────────────────

  it('shows badge with unread count from notifications', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    // 2 unread notifications (n1, n3)
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows explicit count prop instead of computed unread', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('caps badge at 99+', () => {
    render(<DesktopNotificationBell count={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not show badge when no unread notifications', () => {
    const readNotifs = sampleNotifications.map((n) => ({ ...n, read: true }));
    render(<DesktopNotificationBell notifications={readNotifs} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('bell aria-label includes count when there are unread notifications', () => {
    render(<DesktopNotificationBell count={3} />);
    expect(screen.getByLabelText('Notifications (3 new)')).toBeInTheDocument();
  });

  // ─── Open/close dropdown ────────────────────────────────────────────

  it('opens dropdown on bell click', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByRole('dialog', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('closes dropdown on second bell click', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    const bell = screen.getByLabelText(/Notifications/);
    fireEvent.click(bell);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(bell);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('bell has aria-expanded attribute', () => {
    render(<DesktopNotificationBell />);
    const bell = screen.getByLabelText('Notifications');
    expect(bell).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(bell);
    expect(bell).toHaveAttribute('aria-expanded', 'true');
  });

  it('bell has aria-haspopup attribute', () => {
    render(<DesktopNotificationBell />);
    expect(screen.getByLabelText('Notifications')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('closes on Escape key', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on click outside', () => {
    render(
      <div>
        <DesktopNotificationBell notifications={sampleNotifications} />
        <button data-testid="outside">Outside</button>
      </div>,
    );
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ─── Dropdown content ──────────────────────────────────────────────

  it('shows notification titles in dropdown', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByText('Order shipped')).toBeInTheDocument();
    expect(screen.getByText('Flash Sale!')).toBeInTheDocument();
    expect(screen.getByText('Password changed')).toBeInTheDocument();
  });

  it('shows notification bodies', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByText('Your order #1234 has been shipped')).toBeInTheDocument();
  });

  it('shows notification times', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('groups notifications by type with section headers', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Promotions')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('shows unread dot for unread notifications', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    const dots = screen.getAllByLabelText('Unread');
    expect(dots).toHaveLength(2); // n1 and n3
  });

  it('shows empty state when no notifications', () => {
    render(<DesktopNotificationBell notifications={[]} />);
    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  // ─── Mark all as read ──────────────────────────────────────────────

  it('shows "Mark all as read" button when there are unread', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByText('Mark all as read')).toBeInTheDocument();
  });

  it('does not show "Mark all as read" when all are read', () => {
    const readNotifs = sampleNotifications.map((n) => ({ ...n, read: true }));
    render(<DesktopNotificationBell notifications={readNotifs} />);
    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.queryByText('Mark all as read')).not.toBeInTheDocument();
  });

  it('calls onMarkAllRead when button is clicked', () => {
    const handler = vi.fn();
    render(<DesktopNotificationBell notifications={sampleNotifications} onMarkAllRead={handler} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    fireEvent.click(screen.getByText('Mark all as read'));
    expect(handler).toHaveBeenCalledOnce();
  });

  // ─── Individual notification click ──────────────────────────────────

  it('calls onRead with notification id when clicked', () => {
    const handler = vi.fn();
    render(<DesktopNotificationBell notifications={sampleNotifications} onRead={handler} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    fireEvent.click(screen.getByText('Order shipped').closest('button')!);
    expect(handler).toHaveBeenCalledWith('n1');
  });

  // ─── View all button ───────────────────────────────────────────────

  it('renders "View all notifications" footer button', () => {
    render(<DesktopNotificationBell notifications={sampleNotifications} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    expect(screen.getByText('View all notifications')).toBeInTheDocument();
  });

  it('calls onViewAll and closes dropdown', () => {
    const handler = vi.fn();
    render(<DesktopNotificationBell notifications={sampleNotifications} onViewAll={handler} />);
    fireEvent.click(screen.getByLabelText(/Notifications/));
    fireEvent.click(screen.getByText('View all notifications'));
    expect(handler).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render footer when no notifications', () => {
    render(<DesktopNotificationBell notifications={[]} />);
    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.queryByText('View all notifications')).not.toBeInTheDocument();
  });

  // ─── Labels / i18n ──────────────────────────────────────────────────

  it('applies custom labels', () => {
    render(
      <DesktopNotificationBell
        notifications={sampleNotifications}
        labels={{
          notifications: 'Bildirishnomalar',
          notificationsWithCount: 'Bildirishnomalar ({count} yangi)',
          markAllRead: 'Hammasini oqilgan deb belgilash',
          viewAll: 'Hammasini korish',
          empty: 'Bildirishnomalar yoq',
          sectionOrders: 'Buyurtmalar',
          sectionPromotions: 'Aksiyalar',
          sectionSystem: 'Tizim',
          unread: 'Oqilmagan',
        }}
      />,
    );
    // Bell label uses notificationsWithCount since there are 2 unread items
    fireEvent.click(screen.getByLabelText('Bildirishnomalar (2 yangi)'));
    expect(screen.getByText('Hammasini oqilgan deb belgilash')).toBeInTheDocument();
    expect(screen.getByText('Hammasini korish')).toBeInTheDocument();
    expect(screen.getByText('Buyurtmalar')).toBeInTheDocument();
    expect(screen.getByText('Aksiyalar')).toBeInTheDocument();
    expect(screen.getByText('Tizim')).toBeInTheDocument();
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<DesktopNotificationBell className="custom" />);
    expect(container.firstElementChild?.className).toContain('custom');
  });

  it('spreads rest props', () => {
    render(<DesktopNotificationBell data-testid="notif-bell" />);
    expect(screen.getByTestId('notif-bell')).toBeInTheDocument();
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopNotificationBell.displayName).toBe('DesktopNotificationBell');
  });
});

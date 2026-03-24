'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useEffect, useRef } from 'react';
import styles from './DesktopNotificationBell.module.scss';

export type DesktopNotificationType = 'order' | 'promotion' | 'system';

export interface DesktopNotification {
  id: string;
  type: DesktopNotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface DesktopNotificationBellLabels {
  /** Bell button label (default: "Notifications") */
  notifications?: string;
  /** Bell button label with count (default: "Notifications ({count} new)") */
  notificationsWithCount?: string;
  /** Mark all read button (default: "Mark all as read") */
  markAllRead?: string;
  /** Empty state text (default: "No notifications") */
  empty?: string;
  /** View all button (default: "View all notifications") */
  viewAll?: string;
  /** Unread dot label (default: "Unread") */
  unread?: string;
  /** Section labels by type */
  sectionOrders?: string;
  sectionPromotions?: string;
  sectionSystem?: string;
}

const DEFAULT_LABELS: Required<DesktopNotificationBellLabels> = {
  notifications: 'Notifications',
  notificationsWithCount: 'Notifications ({count} new)',
  markAllRead: 'Mark all as read',
  empty: 'No notifications',
  viewAll: 'View all notifications',
  unread: 'Unread',
  sectionOrders: 'Orders',
  sectionPromotions: 'Promotions',
  sectionSystem: 'System',
};

export interface DesktopNotificationBellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** List of notifications */
  notifications?: DesktopNotification[];
  /** Unread count badge */
  count?: number;
  /** Callback when a notification is marked as read */
  onRead?: (id: string) => void;
  /** Callback when "Mark all as read" is clicked */
  onMarkAllRead?: () => void;
  /** Callback when "View all" is clicked */
  onViewAll?: () => void;
  /** i18n labels override */
  labels?: DesktopNotificationBellLabels;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

function getSectionLabels(l: Required<DesktopNotificationBellLabels>): Record<DesktopNotificationType, string> {
  return {
    order: l.sectionOrders,
    promotion: l.sectionPromotions,
    system: l.sectionSystem,
  };
}

const SECTION_ICONS: Record<DesktopNotificationType, React.FC> = {
  order: PackageIcon,
  promotion: TagIcon,
  system: InfoIcon,
};

function DesktopNotificationBellInner(
  {
    notifications = [],
    count,
    onRead,
    onMarkAllRead,
    onViewAll,
    labels: labelsProp,
    className,
    ...rest
  }: DesktopNotificationBellProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const l = { ...DEFAULT_LABELS, ...labelsProp };
  const SECTION_LABELS = getSectionLabels(l);

  const displayCount = count ?? notifications.filter((n) => !n.read).length;
  const formatBadge = (c: number) => (c > 99 ? '99+' : String(c));

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Group notifications by type
  const grouped: Record<DesktopNotificationType, DesktopNotification[]> = {
    order: [],
    promotion: [],
    system: [],
  };
  for (const n of notifications) {
    grouped[n.type]?.push(n);
  }

  const sections = (['order', 'promotion', 'system'] as DesktopNotificationType[]).filter(
    (type) => grouped[type].length > 0,
  );

  return (
    <div ref={containerRef} className={cn(styles.root, className)} {...rest}>
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={styles.bellBtn}
        onClick={toggleOpen}
        aria-label={displayCount > 0 ? l.notificationsWithCount.replace('{count}', String(displayCount)) : l.notifications}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <BellIcon />
        {displayCount > 0 && (
          <span className={styles.badge}>{formatBadge(displayCount)}</span>
        )}
      </button>

      {open && (
        <div
          className={styles.dropdown}
          role="dialog"
          aria-label={l.notifications}
        >
          {/* Header */}
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownTitle}>{l.notifications}</span>
            {displayCount > 0 && (
              <button
                type="button"
                className={styles.markAllBtn}
                onClick={() => { onMarkAllRead?.(); }}
              >
                {l.markAllRead}
              </button>
            )}
          </div>

          {/* Content */}
          <div className={styles.dropdownBody}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>
                <BellIcon />
                <span>{l.empty}</span>
              </div>
            ) : (
              sections.map((type) => {
                const SectionIcon = SECTION_ICONS[type];
                return (
                  <div key={type} className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <SectionIcon />
                      <span>{SECTION_LABELS[type]}</span>
                    </div>
                    {grouped[type].map((notif) => (
                      <button
                        key={notif.id}
                        type="button"
                        className={cn(styles.notifItem, !notif.read ? styles.unread : '')}
                        onClick={() => onRead?.(notif.id)}
                      >
                        <div className={styles.notifContent}>
                          <span className={styles.notifTitle}>{notif.title}</span>
                          <span className={styles.notifBody}>{notif.body}</span>
                          <span className={styles.notifTime}>{notif.time}</span>
                        </div>
                        {!notif.read && <span className={styles.unreadDot} aria-label={l.unread} />}
                      </button>
                    ))}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className={styles.dropdownFooter}>
              <button
                type="button"
                className={styles.viewAllBtn}
                onClick={() => { onViewAll?.(); setOpen(false); }}
              >
                {l.viewAll}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const DesktopNotificationBell = forwardRef(DesktopNotificationBellInner);
DesktopNotificationBell.displayName = 'DesktopNotificationBell';

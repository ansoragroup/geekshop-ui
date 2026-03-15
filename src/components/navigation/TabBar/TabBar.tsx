import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './TabBar.module.scss';

export interface TabBarItem {
  key: string;
  label: string;
  icon: ReactNode;
  activeIcon: ReactNode;
  badge?: number;
}

export interface TabBarProps extends HTMLAttributes<HTMLElement> {
  /** Currently active tab key */
  activeKey?: string;
  /** Default active tab key for uncontrolled usage */
  defaultActiveKey?: string;
  /** Callback when a tab is tapped */
  onChange?: (key: string) => void;
  /** Custom tab items (defaults to GeekShop standard tabs) */
  items?: TabBarItem[];
}

/* ---------- inline SVG icons ---------- */

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
  </svg>
);

const HomeIconFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 3L3 10.5V19a2 2 0 002 2h4v-6h6v6h4a2 2 0 002-2v-8.5L12 3z" />
  </svg>
);

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const GridIconFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6h12l1.5 14H4.5L6 6z" />
    <path d="M9 6V4a3 3 0 016 0v2" />
  </svg>
);

const BagIconFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 6h12l1.5 14H4.5L6 6z" />
    <path d="M9 6V4a3 3 0 016 0v2" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </svg>
);

const UserIconFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </svg>
);

const DEFAULT_ITEMS: TabBarItem[] = [
  { key: 'home', label: 'Bosh sahifa', icon: <HomeIcon />, activeIcon: <HomeIconFilled /> },
  { key: 'categories', label: 'Kategoriyalar', icon: <GridIcon />, activeIcon: <GridIconFilled /> },
  { key: 'cart', label: 'Savat', icon: <BagIcon />, activeIcon: <BagIconFilled />, badge: 0 },
  { key: 'profile', label: 'Profil', icon: <UserIcon />, activeIcon: <UserIconFilled /> },
];

export const TabBar = forwardRef<HTMLElement, TabBarProps>(
  ({ activeKey: activeKeyProp, defaultActiveKey = '', onChange, items = DEFAULT_ITEMS, className, ...rest }, ref) => {
    const [activeKey, setActiveKey] = useControllableState({
      value: activeKeyProp,
      defaultValue: defaultActiveKey,
      onChange,
    });

    return (
      <nav ref={ref} className={`${styles.tabBar} ${className ?? ''}`} role="tablist" {...rest}>
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabItem} ${isActive ? styles.active : ''}`}
              onClick={() => setActiveKey(item.key)}
            >
              <span className={styles.iconWrap}>
                {isActive ? item.activeIcon : item.icon}
                {item.badge != null && item.badge > 0 && (
                  <span className={styles.badge}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  },
);

TabBar.displayName = 'TabBar';

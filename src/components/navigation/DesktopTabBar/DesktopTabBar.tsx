import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopTabBar.module.scss';

export interface DesktopTabBarItem {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
  /** Optional icon (any ReactNode, e.g. inline SVG) */
  icon?: ReactNode;
  /** Optional badge count */
  badge?: number;
}

export interface DesktopTabBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Tab items to display */
  items: DesktopTabBarItem[];
  /** Currently active tab key (controlled) */
  activeKey?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveKey?: string;
  /** Callback when active tab changes */
  onChange?: (key: string) => void;
  /** Visual size */
  size?: 'sm' | 'md';
}

/* ---------- Default icons ---------- */

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6h12l1.5 14H4.5L6 6z" />
    <path d="M9 6V4a3 3 0 016 0v2" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </svg>
);

const DealsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9 9H2l6 4.5L5.5 21 12 16.5 18.5 21 16 13.5 22 9h-7L12 2z" />
  </svg>
);

const DEFAULT_ITEMS: DesktopTabBarItem[] = [
  { key: 'home', label: 'Home', icon: <HomeIcon /> },
  { key: 'categories', label: 'Categories', icon: <GridIcon /> },
  { key: 'deals', label: 'Deals', icon: <DealsIcon /> },
  { key: 'cart', label: 'Cart', icon: <BagIcon />, badge: 0 },
  { key: 'profile', label: 'Profile', icon: <UserIcon /> },
];

export const DesktopTabBar = forwardRef<HTMLDivElement, DesktopTabBarProps>(
  (
    {
      items = DEFAULT_ITEMS,
      activeKey: activeKeyProp,
      defaultActiveKey,
      onChange,
      size = 'md',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const firstKey = items[0]?.key ?? '';

    const [activeKey, setActiveKey] = useControllableState({
      value: activeKeyProp,
      defaultValue: defaultActiveKey ?? firstKey,
      onChange,
    });

    return (
      <nav
        ref={ref as React.Ref<HTMLDivElement>}
        className={`${styles.root} ${styles[size]} ${className}`}
        {...rest}
      >
        <div className={styles.track} role="tablist" aria-label="Navigation tabs">
          {items.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                onClick={() => setActiveKey(item.key)}
              >
                {item.icon && (
                  <span className={styles.icon}>{item.icon}</span>
                )}
                <span className={styles.label}>{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span className={styles.badge}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                {isActive && <span className={styles.indicator} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </nav>
    );
  },
);

DesktopTabBar.displayName = 'DesktopTabBar';

'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopTabs.module.scss';

export interface DesktopTabItem {
  /** Unique tab key */
  key: string;
  /** Tab label text */
  label: string;
  /** Tab content panel */
  children: ReactNode;
  /** Optional icon displayed before label */
  icon?: ReactNode;
  /** Optional badge number */
  badge?: number;
  /** Disable this tab */
  disabled?: boolean;
}

export type DesktopTabsVariant = 'line' | 'card';

export interface DesktopTabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Tab items to display */
  items: DesktopTabItem[];
  /** Currently active tab key (controlled) */
  activeKey?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveKey?: string;
  /** Callback when active tab changes */
  onChange?: (key: string) => void;
  /** Visual variant */
  variant?: DesktopTabsVariant;
  /** Size */
  size?: 'sm' | 'md';
}

export const DesktopTabs = forwardRef<HTMLDivElement, DesktopTabsProps>(
  (
    {
      items,
      activeKey: activeKeyProp,
      defaultActiveKey,
      onChange,
      variant = 'line',
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

    const tabListRef = useRef<HTMLDivElement>(null);
    const inkRef = useRef<HTMLDivElement>(null);

    // Update ink bar position for line variant
    useEffect(() => {
      if (variant !== 'line' || !tabListRef.current || !inkRef.current) return;

      const activeTab = tabListRef.current.querySelector(
        `[data-key="${activeKey}"]`,
      ) as HTMLElement;
      if (activeTab) {
        inkRef.current.style.width = `${activeTab.offsetWidth}px`;
        inkRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      }
    }, [activeKey, variant, items]);

    const activeItem = items.find((item) => item.key === activeKey);

    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`variant-${variant}`], styles[size], className)}
        {...rest}
      >
        <div className={styles.tabBar} role="tablist" ref={tabListRef}>
          {items.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <button
                key={item.key}
                data-key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : 0}
                className={cn(styles.tab, isActive ? styles.active : '', item.disabled ? styles.disabled : '')}
                onClick={() => {
                  if (!item.disabled) {
                    setActiveKey(item.key);
                  }
                }}
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
              </button>
            );
          })}
          {variant === 'line' && (
            <div ref={inkRef} className={styles.ink} aria-hidden="true" />
          )}
        </div>

        <div
          className={styles.content}
          role="tabpanel"
          aria-label={activeItem?.label}
        >
          {activeItem?.children}
        </div>
      </div>
    );
  },
);

DesktopTabs.displayName = 'DesktopTabs';

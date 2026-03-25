'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { useTabs } from '../../../headless/useTabs';
import styles from './Tabs.module.scss';

export interface TabItem {
  /** Unique tab key */
  key: string;
  /** Tab label text */
  label: string;
  /** Tab content panel */
  children: ReactNode;
  /** Optional badge number */
  badge?: number;
  /** Disable this tab */
  disabled?: boolean;
}

export type TabsVariant = 'line' | 'card';

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Currently active tab key */
  activeKey?: string;
  /** Default active tab key for uncontrolled usage */
  defaultActiveKey?: string;
  /** Callback when active tab changes */
  onChange?: (key: string) => void;
  /** Tab items to display */
  items: TabItem[];
  /** Visual variant */
  variant?: TabsVariant;
  /** Sticky tab bar */
  sticky?: boolean;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      activeKey: activeKeyProp,
      defaultActiveKey,
      onChange,
      items,
      variant = 'line',
      sticky = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const tabKeys = items.map((item) => item.key);
    const disabledKeys = items.filter((item) => item.disabled).map((item) => item.key);

    const { tabListProps, tabProps, panelProps, activeKey } = useTabs({
      activeKey: activeKeyProp,
      defaultActiveKey: defaultActiveKey ?? items[0]?.key ?? '',
      onChange,
      tabs: tabKeys,
      disabledKeys,
    });

    const tabListRef = useRef<HTMLDivElement>(null);
    const inkRef = useRef<HTMLDivElement>(null);

    // Update ink bar position
    useEffect(() => {
      if (variant !== 'line' || !tabListRef.current || !inkRef.current) return;

      const activeTab = tabListRef.current.querySelector(
        `[data-key="${activeKey}"]`
      ) as HTMLElement;
      if (activeTab) {
        inkRef.current.style.width = `${activeTab.offsetWidth}px`;
        inkRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      }
    }, [activeKey, variant, items]);

    const activeItem = items.find((item) => item.key === activeKey);

    return (
      <div ref={ref} className={cn(styles.root, styles[`variant-${variant}`], className)} {...rest}>
        <div
          className={cn(styles.tabBar, sticky ? styles.sticky : '')}
          ref={tabListRef}
          {...tabListProps}
        >
          {items.map((item) => {
            const isActive = item.key === activeKey;
            const tp = tabProps(item.key);
            return (
              <button
                key={item.key}
                data-key={item.key}
                ref={tp.ref as React.Ref<HTMLButtonElement>}
                role={tp.role}
                aria-selected={tp['aria-selected']}
                aria-controls={tp['aria-controls']}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : isActive ? 0 : -1}
                className={cn(
                  styles.tab,
                  isActive ? styles.active : '',
                  item.disabled ? styles.disabled : ''
                )}
                onClick={tp.onClick}
                onKeyDown={tp.onKeyDown}
                type="button"
              >
                <span className={styles.label}>{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span className={styles.badge}>{item.badge > 99 ? '99+' : item.badge}</span>
                )}
              </button>
            );
          })}
          {variant === 'line' && <div ref={inkRef} className={styles.ink} aria-hidden="true" />}
        </div>

        <div className={styles.content} {...panelProps(activeKey)} hidden={false}>
          {activeItem?.children}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

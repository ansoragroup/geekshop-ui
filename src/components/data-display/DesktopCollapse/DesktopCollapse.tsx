import { cn } from '../../../utils/cn';
'use client';
import {
  forwardRef,
  useState,
  useCallback,
  useId,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import styles from './DesktopCollapse.module.scss';

export interface DesktopCollapsePanelProps {
  /** Unique key for this panel */
  panelKey: string;
  /** Panel header title */
  title: string;
  /** Optional extra content in the header (right side) */
  extra?: ReactNode;
  /** Disable interaction */
  disabled?: boolean;
  /** Panel body content */
  children: ReactNode;
}

export interface DesktopCollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently active panel key(s) (controlled) */
  activeKey?: string | string[];
  /** Default active key(s) for uncontrolled usage */
  defaultActiveKey?: string | string[];
  /** Callback when active keys change */
  onChange?: (keys: string[]) => void;
  /** Only allow one panel open at a time */
  accordion?: boolean;
  /** Panels */
  children: ReactNode;
}

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M4.5 6.75l4.5 4.5 4.5-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DesktopCollapsePanel = forwardRef<
  HTMLDivElement,
  DesktopCollapsePanelProps & { _isActive?: boolean; _onToggle?: () => void }
>(
  (
    {
      panelKey: _panelKey,
      title,
      extra,
      disabled = false,
      children,
      _isActive = false,
      _onToggle,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const headerId = `desktop-collapse-header-${id}`;
    const panelId = `desktop-collapse-panel-${id}`;

    const handleClick = useCallback(() => {
      if (!disabled) {
        _onToggle?.();
      }
    }, [disabled, _onToggle]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          _onToggle?.();
        }
      },
      [disabled, _onToggle],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.panel, _isActive ? styles.active : '', disabled ? styles.disabled : '')}
        {...rest}
      >
        <div
          id={headerId}
          className={styles.header}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={_isActive}
          aria-controls={panelId}
          aria-disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.title}>{title}</span>
          <div className={styles.headerRight}>
            {extra && <span className={styles.extra}>{extra}</span>}
            <span className={cn(styles.arrow, _isActive ? styles.arrowExpanded : '')}>
              <ChevronIcon />
            </span>
          </div>
        </div>

        <div
          id={panelId}
          className={cn(styles.body, _isActive ? styles.bodyOpen : '')}
          role="region"
          aria-labelledby={headerId}
          hidden={!_isActive}
        >
          <div className={styles.bodyInner}>
            {children}
          </div>
        </div>
      </div>
    );
  },
);

DesktopCollapsePanel.displayName = 'DesktopCollapsePanel';

const normalizeKeys = (keys: string | string[] | undefined): string[] => {
  if (keys === undefined) return [];
  return Array.isArray(keys) ? keys : [keys];
};

export const DesktopCollapse = forwardRef<HTMLDivElement, DesktopCollapseProps>(
  (
    {
      activeKey,
      defaultActiveKey,
      onChange,
      accordion = false,
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [internalKeys, setInternalKeys] = useState<string[]>(
      normalizeKeys(defaultActiveKey),
    );

    const activeKeys = activeKey !== undefined ? normalizeKeys(activeKey) : internalKeys;

    const handleToggle = useCallback(
      (key: string) => {
        let newKeys: string[];
        if (accordion) {
          newKeys = activeKeys.includes(key) ? [] : [key];
        } else {
          newKeys = activeKeys.includes(key)
            ? activeKeys.filter((k) => k !== key)
            : [...activeKeys, key];
        }

        if (activeKey === undefined) {
          setInternalKeys(newKeys);
        }
        onChange?.(newKeys);
      },
      [accordion, activeKeys, activeKey, onChange],
    );

    const enhancedChildren = (Array.isArray(children) ? children : [children])
      .filter(Boolean)
      .map((child) => {
        if (!child || typeof child !== 'object' || !('props' in child)) return child;
        const panelChild = child as React.ReactElement<
          DesktopCollapsePanelProps & { _isActive?: boolean; _onToggle?: () => void }
        >;
        const key = panelChild.props.panelKey;
        if (!key) return child;

        return {
          ...panelChild,
          key,
          props: {
            ...panelChild.props,
            _isActive: activeKeys.includes(key),
            _onToggle: () => handleToggle(key),
          },
        } as React.ReactElement;
      });

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        {enhancedChildren}
      </div>
    );
  },
);

DesktopCollapse.displayName = 'DesktopCollapse';

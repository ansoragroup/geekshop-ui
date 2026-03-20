'use client';
import { cn } from '../../../utils/cn';
import {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
  useId,
} from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Collapse.module.scss';

export interface CollapsePanelProps {
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

export interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently active panel key(s) */
  activeKey?: string | string[];
  /** Default active key(s) for uncontrolled usage */
  defaultActiveKey?: string | string[];
  /** Callback when active keys change */
  onChange?: (keys: string[]) => void;
  /** Only allow one panel open at a time */
  accordion?: boolean;
  /** CollapsePanel children */
  children: ReactNode;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CollapsePanel = forwardRef<HTMLDivElement, CollapsePanelProps & { _isActive?: boolean; _onToggle?: () => void }>(
  ({ panelKey: _panelKey, title, extra, disabled = false, children, _isActive = false, _onToggle, ...rest }, ref) => {
    const id = useId();
    const headerId = `collapse-header-${id}`;
    const panelId = `collapse-panel-${id}`;

    const handleClick = () => {
      if (!disabled) {
        _onToggle?.();
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        _onToggle?.();
      }
    };

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
          className={styles.body}
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
  }
);

CollapsePanel.displayName = 'CollapsePanel';

const normalizeKeys = (keys: string | string[] | undefined): string[] => {
  if (keys === undefined) return [];
  return Array.isArray(keys) ? keys : [keys];
};

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ activeKey, defaultActiveKey, onChange, accordion = false, children, className = '', ...rest }, ref) => {
    const [activeKeys, setActiveKeys] = useControllableState<string[]>({
      value: activeKey !== undefined ? normalizeKeys(activeKey) : undefined,
      defaultValue: normalizeKeys(defaultActiveKey),
      onChange,
    });

    const handleToggle = (key: string) => {
      if (accordion) {
        setActiveKeys(activeKeys.includes(key) ? [] : [key]);
      } else {
        setActiveKeys(
          activeKeys.includes(key)
            ? activeKeys.filter((k) => k !== key)
            : [...activeKeys, key]
        );
      }
    };

    // Clone children and inject internal props
    const enhancedChildren = (Array.isArray(children) ? children : [children])
      .filter(Boolean)
      .map((child) => {
        if (!child || typeof child !== 'object' || !('props' in child)) return child;
        const panelChild = child as React.ReactElement<CollapsePanelProps & { _isActive?: boolean; _onToggle?: () => void }>;
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
  }
);

Collapse.displayName = 'Collapse';

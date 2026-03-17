import { forwardRef, useState, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopSwipe.module.scss';

export interface DesktopSwipeAction {
  label: string;
  icon?: ReactNode;
  color?: string;
  onClick: () => void;
}

export interface DesktopSwipeProps extends HTMLAttributes<HTMLDivElement> {
  /** Action buttons revealed on hover */
  actions: DesktopSwipeAction[];
  /** Content to display */
  children: ReactNode;
  /** Disable hover actions */
  disabled?: boolean;
}

export const DesktopSwipe = forwardRef<HTMLDivElement, DesktopSwipeProps>(
  ({ actions, children, disabled = false, className = '', ...rest }, ref) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        ref={ref}
        className={`${styles.root} ${disabled ? styles.disabled : ''} ${className}`}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="group"
        aria-roledescription="swipeable item"
        {...rest}
      >
        <div className={styles.content}>{children}</div>

        <div
          className={`${styles.actions} ${hovered && !disabled ? styles.visible : ''}`}
          aria-hidden={!hovered}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              className={styles.actionBtn}
              style={{ backgroundColor: action.color || '#FF3B30' }}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              type="button"
              tabIndex={hovered ? 0 : -1}
              aria-label={action.label}
            >
              {action.icon && <span className={styles.actionIcon}>{action.icon}</span>}
              <span className={styles.actionLabel}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  },
);

DesktopSwipe.displayName = 'DesktopSwipe';

import { forwardRef, useCallback, type ReactNode, type HTMLAttributes, type KeyboardEvent } from 'react';
import styles from './DesktopCell.module.scss';

export interface DesktopCellProps extends HTMLAttributes<HTMLDivElement> {
  /** Cell title (primary text) */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Optional value displayed on the right */
  value?: string | ReactNode;
  /** Optional icon on the left */
  icon?: ReactNode;
  /** Click handler (makes cell interactive) */
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  /** Show chevron right arrow */
  showArrow?: boolean;
  /** Show bottom border divider */
  border?: boolean;
}

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 3L11 8L6 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DesktopCell = forwardRef<HTMLDivElement, DesktopCellProps>(
  (
    {
      title,
      description,
      value,
      icon,
      onClick,
      showArrow = false,
      border = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isInteractive = !!onClick;

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.(e);
        }
        rest.onKeyDown?.(e);
      },
      [isInteractive, onClick, rest],
    );

    return (
      <div
        ref={ref}
        className={`${styles.root} ${isInteractive ? styles.interactive : ''} ${border ? styles.border : ''} ${className}`}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}

        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>

        {value != null && (
          <span className={styles.value}>
            {value}
          </span>
        )}

        {showArrow && (
          <span className={styles.arrow} aria-hidden="true">
            <ChevronRight />
          </span>
        )}
      </div>
    );
  },
);

DesktopCell.displayName = 'DesktopCell';

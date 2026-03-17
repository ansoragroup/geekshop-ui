import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import styles from './DesktopActionSheet.module.scss';

export interface DesktopActionSheetAction {
  /** Display label */
  label: string;
  /** Optional inline SVG icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Danger styling (red text) */
  danger?: boolean;
  /** Disable this action */
  disabled?: boolean;
}

export interface DesktopActionSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the dropdown is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Action items */
  actions: DesktopActionSheetAction[];
  /** Trigger element */
  children: ReactNode;
}

export const DesktopActionSheet = forwardRef<HTMLDivElement, DesktopActionSheetProps>(
  ({ open, onClose, actions, children, className = '', ...rest }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (rootRef.current && !rootRef.current.contains(target)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onClose]);

    // Close on Escape
    useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    const handleActionClick = useCallback(
      (action: DesktopActionSheetAction) => {
        if (action.disabled) return;
        action.onClick?.();
        onClose();
      },
      [onClose],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, action: DesktopActionSheetAction) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActionClick(action);
        }
      },
      [handleActionClick],
    );

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <div ref={mergedRef} className={`${styles.root} ${className}`} {...rest}>
        <div className={styles.trigger}>
          {children}
        </div>

        {open && (
          <div
            className={styles.menu}
            role="menu"
            aria-label="Actions"
          >
            {actions.map((action, index) => (
              <button
                key={index}
                className={`${styles.menuItem} ${action.danger ? styles.danger : ''} ${action.disabled ? styles.disabled : ''}`}
                onClick={() => handleActionClick(action)}
                onKeyDown={(e) => handleKeyDown(e, action)}
                disabled={action.disabled}
                role="menuitem"
                type="button"
              >
                {action.icon && <span className={styles.menuIcon}>{action.icon}</span>}
                <span className={styles.menuLabel}>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

DesktopActionSheet.displayName = 'DesktopActionSheet';

import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './Popup.module.scss';

export type PopupPosition = 'center' | 'bottom';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the popup is visible */
  visible: boolean;
  /** Position of the popup */
  position?: PopupPosition;
  /** Title shown in the header */
  title?: string;
  /** Whether to show close button */
  closable?: boolean;
  /** Callback when popup is closed */
  onClose?: () => void;
  /** Popup content */
  children?: ReactNode;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  ({ visible, position = 'center', title, closable = true, onClose, children, className = '', ...rest }, ref) => {
    const popupRef = useFocusTrap<HTMLDivElement>(visible, {
      onEscape: closable ? onClose : undefined,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        popupRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, popupRef],
    );

    if (!visible) return null;

    const handleOverlayClick = () => {
      onClose?.();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div className={`${styles.overlay} ${className}`} onClick={handleOverlayClick}>
        <div
          ref={mergedRef}
          className={`${styles.popup} ${styles[`position-${position}`]}`}
          onClick={handleContentClick}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Popup'}
          tabIndex={-1}
          {...rest}
        >
          {(title || closable) && (
            <div className={styles.header}>
              <span className={styles.title}>{title}</span>
              {closable && (
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    );
  }
);

Popup.displayName = 'Popup';

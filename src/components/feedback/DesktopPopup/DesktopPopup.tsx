import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './DesktopPopup.module.scss';

export interface DesktopPopupProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the popup is visible */
  open: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Popup content */
  children?: ReactNode;
  /** Whether the popup can be closed (shows X button) */
  closable?: boolean;
  /** Width of the popup (CSS value) */
  width?: string | number;
  /** Optional title */
  title?: string;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DesktopPopup = forwardRef<HTMLDivElement, DesktopPopupProps>(
  ({ open, onClose, children, closable = true, width = 480, title, className = '', ...rest }, ref) => {
    const popupRef = useFocusTrap<HTMLDivElement>(open, {
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

    if (!open) return null;

    const handleOverlayClick = () => {
      if (closable) onClose?.();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const popupWidth = typeof width === 'number' ? `${width}px` : width;

    return (
      <div className={cn(styles.overlay, className)} onClick={handleOverlayClick} role="presentation">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={styles.popup}
          style={{ width: popupWidth }}
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Dialog'}
          tabIndex={-1}
          {...rest}
        >
          {closable && (
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <CloseIcon />
            </button>
          )}

          {title && (
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
            </div>
          )}

          <div className={styles.body}>{children}</div>
        </div>
      </div>
    );
  },
);

DesktopPopup.displayName = 'DesktopPopup';

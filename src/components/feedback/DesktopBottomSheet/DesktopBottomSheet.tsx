'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './DesktopBottomSheet.module.scss';

export interface DesktopBottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Title displayed in the drawer header */
  title?: string;
  /** Drawer body content */
  children?: ReactNode;
  /** Optional sticky footer content */
  footer?: ReactNode;
  /** Width of the drawer panel in pixels */
  width?: number;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DesktopBottomSheet = forwardRef<HTMLDivElement, DesktopBottomSheetProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      footer,
      width = 480,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const trapRef = useFocusTrap<HTMLDivElement>(open, {
      onEscape: onClose,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        trapRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, trapRef],
    );

    if (!open) return null;

    const handleBackdropClick = () => {
      onClose();
    };

    const handlePanelClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div
        className={cn(styles.backdrop, className)}
        onClick={handleBackdropClick}
        role="presentation"
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={styles.panel}
          style={{ width }}
          onClick={handlePanelClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Side panel'}
          tabIndex={-1}
          {...rest}
        >
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className={styles.body}>{children}</div>

          {/* Footer */}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  },
);

DesktopBottomSheet.displayName = 'DesktopBottomSheet';

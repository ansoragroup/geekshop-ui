'use client';
import { createPortal } from 'react-dom';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, useEffect, useId, useState, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './DesktopModal.module.scss';

export interface DesktopModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Title displayed in the modal header */
  title?: string;
  /** Modal body content */
  children: ReactNode;
  /** Optional footer content (e.g. action buttons) */
  footer?: ReactNode;
  /** Width of the modal in pixels */
  width?: number;
  /** Whether the close button is visible */
  closable?: boolean;
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DesktopModal = forwardRef<HTMLDivElement, DesktopModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      footer,
      width = 640,
      closable = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const titleId = useId();
    const [visible, setVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const trapRef = useFocusTrap<HTMLDivElement>(open, {
      onEscape: closable ? handleClose : undefined,
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

    // Track open/close state for exit animation
    useEffect(() => {
      if (open) {
        setVisible(true);
        setIsClosing(false);
      } else if (visible) {
        setIsClosing(true);
        const timer = setTimeout(() => {
          setVisible(false);
          setIsClosing(false);
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    // Body scroll lock
    useEffect(() => {
      if (visible) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = prev;
        };
      }
    }, [visible]);

    function handleClose() {
      if (closable) {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          setVisible(false);
          onClose();
        }, 200);
      }
    }

    const handleBackdropClick = () => {
      handleClose();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    if (!visible) return null;

    const modal = (
      <div
        className={cn(styles.backdrop, isClosing && styles.closing, className)}
        onClick={handleBackdropClick}
        role="presentation"
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={cn(styles.modal, isClosing && styles.closing)}
          style={{ width }}
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-label={title ? undefined : 'Modal'}
          tabIndex={-1}
          {...rest}
        >
          {/* Header */}
          <div className={styles.header}>
            {title && (
              <h2 id={titleId} className={styles.title}>{title}</h2>
            )}
            {closable && (
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label={t('aria.close')}
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {/* Body */}
          <div className={styles.body}>{children}</div>

          {/* Footer */}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );

    if (typeof document === 'undefined') return modal;
    return createPortal(modal, document.body);
  },
);

DesktopModal.displayName = 'DesktopModal';

import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, useId, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './Modal.module.scss';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Title displayed in the modal header */
  title?: string;
  /** Content of the modal body */
  children: ReactNode;
  /** Footer content (e.g. action buttons) */
  footer?: ReactNode;
  /** Width of the modal content (default: 480) */
  width?: number | string;
  /** Whether clicking the backdrop closes the modal (default: true) */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the modal (default: true) */
  closeOnEscape?: boolean;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      footer,
      width = 480,
      closeOnBackdrop = true,
      closeOnEscape = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const titleId = useId();

    const trapRef = useFocusTrap<HTMLDivElement>(open, {
      onEscape: closeOnEscape ? onClose : undefined,
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
      cn(ref, trapRef],
    );

    if (!open) return null;

    const handleBackdropClick = () => {
      if (closeOnBackdrop) {
        onClose();
      }
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const contentStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
    };

    const rootClass = [styles.backdrop, className);

    return (
      <div className={rootClass} onClick={handleBackdropClick} role="presentation">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={styles.content}
          style={contentStyle}
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
          {title && (
            <div className={styles.header}>
              <h2 id={titleId} className={styles.title}>{title}</h2>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* Header without title — just close button */}
          {!title && (
            <div className={styles.headerMinimal}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* Body */}
          <div className={styles.body}>{children}</div>

          {/* Footer */}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';

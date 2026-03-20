import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './DesktopDialog.module.scss';

export type DesktopDialogConfirmType = 'primary' | 'danger';

export interface DesktopDialogProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is visible */
  open: boolean;
  /** Close handler (backdrop click, escape) */
  onClose: () => void;
  /** Dialog title */
  title?: string;
  /** Dialog body content */
  children?: ReactNode;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button click handler */
  onConfirm?: () => void;
  /** Cancel button click handler */
  onCancel?: () => void;
  /** Confirm button variant */
  confirmType?: DesktopDialogConfirmType;
}

export const DesktopDialog = forwardRef<HTMLDivElement, DesktopDialogProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      confirmType = 'primary',
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

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handleCancel = () => {
      onCancel?.();
      onClose();
    };

    const handleConfirm = () => {
      onConfirm?.();
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
          className={styles.dialog}
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="alertdialog"
          aria-modal="true"
          aria-label={title || 'Dialog'}
          tabIndex={-1}
          {...rest}
        >
          {/* Title */}
          {title && <h3 className={styles.title}>{title}</h3>}

          {/* Body */}
          {children && <div className={styles.body}>{children}</div>}

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={cn(styles.confirmBtn, styles[`confirm-${confirmType}`])}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

DesktopDialog.displayName = 'DesktopDialog';

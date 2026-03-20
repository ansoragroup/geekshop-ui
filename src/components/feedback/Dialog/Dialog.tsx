import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './Dialog.module.scss';

export type DialogConfirmType = 'primary' | 'danger';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is visible */
  visible: boolean;
  /** Dialog title */
  title?: string;
  /** Dialog message body */
  message?: string | ReactNode;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button type */
  confirmType?: DialogConfirmType;
  /** Callback when confirm is clicked */
  onConfirm?: () => void;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Callback when dialog is closed (backdrop click or escape) */
  onClose?: () => void;
  /** Whether to show cancel button */
  showCancel?: boolean;
  /** Custom dialog body content */
  children?: ReactNode;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      visible,
      title,
      message,
      confirmText,
      cancelText,
      confirmType = 'primary',
      onConfirm,
      onCancel,
      onClose,
      showCancel = true,
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();

    const handleClose = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const dialogRef = useFocusTrap<HTMLDivElement>(visible, {
      onEscape: handleClose,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        dialogRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, dialogRef],
    );

    if (!visible) return null;

    const handleOverlayClick = () => {
      handleClose();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handleCancel = () => {
      onCancel?.();
    };

    const handleConfirm = () => {
      onConfirm?.();
    };

    const resolvedConfirmText = confirmText ?? t('common.confirm');
    const resolvedCancelText = cancelText ?? t('common.cancel');

    return (
      <div className={cn(styles.overlay, className)} onClick={handleOverlayClick} role="presentation">
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
          {title && <div className={styles.title}>{title}</div>}

          {(message || children) && (
            <div className={styles.body}>
              {message && (
                typeof message === 'string'
                  ? <p className={styles.message}>{message}</p>
                  : message
              )}
              {children}
            </div>
          )}

          <div className={styles.actions}>
            {showCancel && (
              <button
                className={styles.cancelBtn}
                onClick={handleCancel}
                type="button"
              >
                {resolvedCancelText}
              </button>
            )}
            <button
              className={cn(styles.confirmBtn, styles[`confirm-${confirmType}`])}
              onClick={handleConfirm}
              type="button"
            >
              {resolvedConfirmText}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

Dialog.displayName = 'Dialog';

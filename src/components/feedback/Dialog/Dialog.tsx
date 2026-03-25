'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useDialog } from '../../../headless/useDialog';
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
    ref
  ) => {
    const { t } = useGeekShop();

    const handleClose = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const { overlayProps, dialogProps } = useDialog({
      isOpen: visible,
      onOpenChange: (isOpen) => {
        if (!isOpen) handleClose();
      },
      role: 'alertdialog',
      closeOnOverlayClick: true,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        // Assign to the headless hook's ref
        const hookRef = dialogProps.ref as React.MutableRefObject<HTMLElement | null>;
        if (hookRef) {
          hookRef.current = node;
        }
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, dialogProps.ref]
    );

    if (!visible) return null;

    const handleCancel = () => {
      onCancel?.();
    };

    const handleConfirm = () => {
      onConfirm?.();
    };

    const resolvedConfirmText = confirmText ?? t('common.confirm');
    const resolvedCancelText = cancelText ?? t('common.cancel');

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={cn(styles.overlay, className)}
        onClick={overlayProps.onClick}
        role={overlayProps.role}
      >
        <div
          ref={mergedRef}
          className={styles.dialog}
          onClick={dialogProps.onClick}
          onKeyDown={dialogProps.onKeyDown}
          role={dialogProps.role}
          aria-modal={dialogProps['aria-modal']}
          aria-label={title || 'Dialog'}
          tabIndex={dialogProps.tabIndex}
          {...rest}
        >
          {title && <div className={styles.title}>{title}</div>}

          {(message || children) && (
            <div className={styles.body}>
              {message &&
                (typeof message === 'string' ? (
                  <p className={styles.message}>{message}</p>
                ) : (
                  message
                ))}
              {children}
            </div>
          )}

          <div className={styles.actions}>
            {showCancel && (
              <button className={styles.cancelBtn} onClick={handleCancel} type="button">
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
  }
);

Dialog.displayName = 'Dialog';

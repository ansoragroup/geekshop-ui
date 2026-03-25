'use client';
import { createPortal } from 'react-dom';
import { cn } from '../../../utils/cn';
import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
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
    ref
  ) => {
    const [closing, setClosing] = useState(false);
    const visible = open || closing;

    const trapRef = useFocusTrap<HTMLDivElement>(open, {
      onEscape: handleClose,
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
      [ref, trapRef]
    );

    // Handle close animation: when open becomes false, start closing timer
    useEffect(() => {
      if (!open && closing) {
        const timer = setTimeout(() => {
          setClosing(false);
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [open, closing]);

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
      setClosing(true);
      onClose();
    }

    const handleBackdropClick = () => {
      handleClose();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handleCancel = () => {
      onCancel?.();
      handleClose();
    };

    const handleConfirm = () => {
      onConfirm?.();
    };

    if (!visible) return null;

    const dialog = (
      <div
        className={cn(styles.backdrop, closing && styles.closing, className)}
        onClick={handleBackdropClick}
        role="presentation"
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={cn(styles.dialog, closing && styles.closing)}
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
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
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

    if (typeof document === 'undefined') return dialog;
    return createPortal(dialog, document.body);
  }
);

DesktopDialog.displayName = 'DesktopDialog';

import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './BottomSheet.module.scss';

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the bottom sheet is visible */
  visible: boolean;
  /** Title shown in the header */
  title?: string;
  /** Max height of the sheet (CSS value) */
  height?: string;
  /** Callback when sheet is closed */
  onClose?: () => void;
  /** Sheet content */
  children?: ReactNode;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ visible, title, height = '60vh', onClose, children, className = '', ...rest }, ref) => {
    const { t } = useGeekShop();
    const sheetRef = useFocusTrap<HTMLDivElement>(visible, {
      onEscape: onClose,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        sheetRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, sheetRef],
    );

    if (!visible) return null;

    const handleOverlayClick = () => {
      onClose?.();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div className={cn(styles.overlay, className)} onClick={handleOverlayClick} role="presentation">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={styles.sheet}
          style={{ maxHeight: height }}
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Bottom sheet'}
          tabIndex={-1}
          {...rest}
        >
          <div className={styles.dragHandle}>
            <span className={styles.dragBar} />
          </div>

          {(title || onClose) && (
            <div className={styles.header}>
              <span className={styles.title}>{title}</span>
              <button className={styles.closeBtn} onClick={onClose} aria-label={t('common.close')}>
                <CloseIcon />
              </button>
            </div>
          )}

          <div className={styles.body}>{children}</div>
        </div>
      </div>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

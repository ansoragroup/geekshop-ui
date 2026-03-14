import type { ReactNode } from 'react';
import styles from './BottomSheet.module.scss';

export interface BottomSheetProps {
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

export function BottomSheet({
  visible,
  title,
  height = '60vh',
  onClose,
  children,
}: BottomSheetProps) {
  if (!visible) return null;

  const handleOverlayClick = () => {
    onClose?.();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.sheet}
        style={{ maxHeight: height }}
        onClick={handleContentClick}
      >
        <div className={styles.dragHandle}>
          <span className={styles.dragBar} />
        </div>

        {(title || onClose) && (
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
              <CloseIcon />
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default BottomSheet;

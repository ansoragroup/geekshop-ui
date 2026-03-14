import type { ReactNode } from 'react';
import styles from './Popup.module.scss';

export type PopupPosition = 'center' | 'bottom';

export interface PopupProps {
  /** Whether the popup is visible */
  visible: boolean;
  /** Position of the popup */
  position?: PopupPosition;
  /** Title shown in the header */
  title?: string;
  /** Whether to show close button */
  closable?: boolean;
  /** Callback when popup is closed */
  onClose?: () => void;
  /** Popup content */
  children?: ReactNode;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export function Popup({
  visible,
  position = 'center',
  title,
  closable = true,
  onClose,
  children,
}: PopupProps) {
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
        className={`${styles.popup} ${styles[`position-${position}`]}`}
        onClick={handleContentClick}
      >
        {(title || closable) && (
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            {closable && (
              <button className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
                <CloseIcon />
              </button>
            )}
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Popup;

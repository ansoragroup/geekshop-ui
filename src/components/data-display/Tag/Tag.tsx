import styles from './Tag.module.scss';

export type TagVariant = 'filled' | 'outlined' | 'light';
export type TagColor = 'primary' | 'success' | 'warning' | 'error' | 'default';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  /** Text content of the tag */
  text: string;
  /** Visual variant */
  variant?: TagVariant;
  /** Color theme */
  color?: TagColor;
  /** Size */
  size?: TagSize;
  /** Whether the tag can be closed */
  closable?: boolean;
  /** Callback when close icon is clicked */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
}

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);

export function Tag({
  text,
  variant = 'filled',
  color = 'default',
  size = 'md',
  closable = false,
  onClose,
  className = '',
}: TagProps) {
  return (
    <span
      className={`${styles.tag} ${styles[`variant-${variant}`]} ${styles[`color-${color}`]} ${styles[`size-${size}`]} ${className}`}
    >
      <span className={styles.text}>{text}</span>
      {closable && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          aria-label={`Olib tashlash: ${text}`}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
}

export default Tag;

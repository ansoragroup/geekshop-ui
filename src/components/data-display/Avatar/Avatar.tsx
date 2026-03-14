import styles from './Avatar.module.scss';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** User's name (for initials fallback) */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Show online indicator dot */
  showOnline?: boolean;
  /** Additional CSS class */
  className?: string;
}

const SIZES: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getColorFromName(name: string): string {
  const colors = ['#FF5000', '#07C160', '#1890FF', '#FFA726', '#9C27B0', '#00BCD4'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({
  src,
  name = '',
  size = 'md',
  showOnline = false,
  className = '',
}: AvatarProps) {
  const px = SIZES[size];
  const initials = name ? getInitials(name) : '?';
  const bgColor = name ? getColorFromName(name) : '#CCCCCC';

  return (
    <span
      className={`${styles.wrapper} ${styles[`size-${size}`]} ${className}`}
      style={{ width: px, height: px }}
    >
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={styles.image}
          width={px}
          height={px}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              const fallback = parent.querySelector(`.${styles.fallback}`) as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }
          }}
        />
      ) : null}
      <span
        className={styles.fallback}
        style={{
          backgroundColor: bgColor,
          display: src ? 'none' : 'flex',
        }}
      >
        {initials}
      </span>
      {showOnline && <span className={styles.onlineDot} />}
    </span>
  );
}

export default Avatar;

import { forwardRef, useState, useCallback, useRef, useEffect, type HTMLAttributes } from 'react';
import styles from './DesktopAvatarGroup.module.scss';

export type DesktopAvatarGroupSize = 'sm' | 'md' | 'lg';

export interface DesktopAvatarGroupItem {
  /** Image source URL */
  src?: string;
  /** User's full name */
  name: string;
}

export interface DesktopAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of avatar data */
  avatars: DesktopAvatarGroupItem[];
  /** Maximum number of visible avatars before overflow */
  max?: number;
  /** Size of the avatars */
  size?: DesktopAvatarGroupSize;
}

const SIZES: Record<DesktopAvatarGroupSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
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

export const DesktopAvatarGroup = forwardRef<HTMLDivElement, DesktopAvatarGroupProps>(
  ({ avatars, max, size = 'md', className = '', ...rest }, ref) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const px = SIZES[size];
    const total = avatars.length;
    const overflow = max != null && total > max ? total - max : 0;
    const visible = overflow > 0 ? avatars.slice(0, max) : avatars;
    const hidden = overflow > 0 ? avatars.slice(max) : [];

    const handleOverflowEnter = useCallback(() => {
      setShowDropdown(true);
    }, []);

    const handleOverflowLeave = useCallback(() => {
      setShowDropdown(false);
    }, []);

    useEffect(() => {
      if (!showDropdown) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setShowDropdown(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    return (
      <div
        ref={ref}
        className={`${styles.root} ${styles[`size-${size}`]} ${className}`}
        role="group"
        aria-label={`${total} users`}
        {...rest}
      >
        {visible.map((avatar, index) => (
          <div
            key={index}
            className={styles.item}
            style={{ zIndex: total - index }}
          >
            {avatar.src ? (
              <img
                src={avatar.src}
                alt={avatar.name}
                className={styles.avatarImage}
                style={{ width: px, height: px }}
              />
            ) : (
              <span
                className={styles.avatarFallback}
                style={{
                  width: px,
                  height: px,
                  backgroundColor: getColorFromName(avatar.name),
                }}
              >
                {getInitials(avatar.name)}
              </span>
            )}
          </div>
        ))}

        {overflow > 0 && (
          <div
            ref={dropdownRef}
            className={styles.overflowWrapper}
            style={{ zIndex: 0 }}
            onMouseEnter={handleOverflowEnter}
            onMouseLeave={handleOverflowLeave}
          >
            <div
              className={styles.overflow}
              style={{ width: px, height: px }}
              aria-label={`+${overflow} more users`}
            >
              <span className={styles.overflowText}>+{overflow}</span>
            </div>

            {showDropdown && (
              <div className={styles.dropdown}>
                {hidden.map((avatar, index) => (
                  <div key={index} className={styles.dropdownItem}>
                    {avatar.src ? (
                      <img
                        src={avatar.src}
                        alt={avatar.name}
                        className={styles.dropdownAvatar}
                      />
                    ) : (
                      <span
                        className={styles.dropdownAvatarFallback}
                        style={{ backgroundColor: getColorFromName(avatar.name) }}
                      >
                        {getInitials(avatar.name)}
                      </span>
                    )}
                    <span className={styles.dropdownName}>{avatar.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

DesktopAvatarGroup.displayName = 'DesktopAvatarGroup';

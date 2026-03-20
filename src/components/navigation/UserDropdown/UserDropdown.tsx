import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useEffect, useRef, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import styles from './UserDropdown.module.scss';

export interface UserDropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export interface UserDropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** User's display name */
  userName?: string;
  /** User's email address */
  userEmail?: string;
  /** URL for user avatar image */
  userAvatar?: string;
  /** Menu items to display when logged in */
  items?: UserDropdownItemcn(];
  /** Whether the user is logged in */
  isLoggedIn?: boolean;
  /** Callback when sign in is clicked */
  onSignIn?: () => void;
  /** Callback when sign out is clicked */
  onSignOut?: () => void;
}

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0112 0v1" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const UserDropdown = forwardRef<HTMLDivElement, UserDropdownProps>(
  (
    {
      userName,
      userEmail,
      userAvatar,
      items = [],
      isLoggedIn = false,
      onSignIn,
      onSignOut,
      className,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleItemClick = useCallback((item: UserDropdownItem) => {
      item.onClick?.();
      setIsOpen(false);
    }, []);

    const handleSignOut = useCallback(() => {
      onSignOut?.();
      setIsOpen(false);
    }, [onSignOut]);

    const handleSignIn = useCallback(() => {
      onSignIn?.();
      setIsOpen(false);
    }, [onSignIn]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const wrapperClass = [styles.wrapper, className);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={wrapperClass}
        {...rest}
      >
        {/* Trigger */}
        <button
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="User menu"
        >
          {userAvatar ? (
            <img src={userAvatar} alt={userName ?? 'User avatar'} className={styles.avatar} />
          ) : (
            <span className={styles.avatarPlaceholder}>
              <UserIcon />
            </span>
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className={styles.dropdown} role="menu" aria-label="User menu">
            {isLoggedIn ? (
              <>
                {/* User info header */}
                <div className={styles.userHeader}>
                  <div className={styles.headerAvatar}>
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName ?? 'User avatar'} className={styles.headerAvatarImg} />
                    ) : (
                      <span className={styles.headerAvatarPlaceholder}>
                        <UserIcon />
                      </span>
                    )}
                  </div>
                  <div className={styles.headerInfo}>
                    {userName && <div className={styles.headerName}>{userName}</div>}
                    {userEmail && <div className={styles.headerEmail}>{userEmail}</div>}
                  </div>
                </div>

                {/* Menu items */}
                {items.length > 0 && (
                  <div className={styles.menuGroup}>
                    {items.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={cn(styles.menuItem, item.danger ? styles.menuItemDanger : '')}
                        role="menuitem"
                        onClick={() => handleItemClick(item)}
                      >
                        {item.icon && <span className={styles.menuItemIcon}>{item.icon}</span>}
                        <span className={styles.menuItemLabel}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Sign out */}
                <div className={styles.menuGroup}>
                  <button
                    type="button"
                    className={cn(styles.menuItem, styles.menuItemDanger)}
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    <span className={styles.menuItemIcon}><SignOutIcon /></span>
                    <span className={styles.menuItemLabel}>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.guestActions}>
                <button
                  type="button"
                  className={styles.signInBtn}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={styles.registerBtn}
                  onClick={handleClose}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

UserDropdown.displayName = 'UserDropdown';

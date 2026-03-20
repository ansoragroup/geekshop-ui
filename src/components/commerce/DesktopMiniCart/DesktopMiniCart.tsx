import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useEffect, useRef, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import styles from './DesktopMiniCart.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopMiniCartItem {
  /** Unique identifier */
  id: string | number;
  /** Product title */
  title: string;
  /** Product image URL */
  image: string;
  /** Price in UZS */
  price: number;
  /** Quantity in cart */
  quantity: number;
  /** Variant text, e.g. "Black / 256GB" */
  variant?: string;
}

export interface DesktopMiniCartProps extends HTMLAttributes<HTMLDivElement> {
  /** Cart items */
  items?: DesktopMiniCartItem[];
  /** Controlled open state */
  open?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** View cart handler */
  onViewCart?: () => void;
  /** Checkout handler */
  onCheckout?: () => void;
  /** Remove item handler */
  onRemoveItem?: (id: string | number) => void;
  /** Custom trigger element */
  trigger?: ReactNode;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('en-US').replace(/,/g, ' ');
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function EmptyBagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopMiniCart = forwardRef<HTMLDivElement, DesktopMiniCartProps>(
  (
    {
      items = [],
      open: openProp,
      onClose,
      onViewCart,
      onCheckout,
      onRemoveItem,
      trigger,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isControlled = openProp !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = isControlled ? openProp : internalOpen;
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback(() => {
      if (isControlled) {
        if (isOpen) onClose?.();
      } else {
        setInternalOpen((prev) => !prev);
      }
    }, [isControlled, isOpen, onClose]);

    const handleClose = useCallback(() => {
      if (isControlled) {
        onClose?.();
      } else {
        setInternalOpen(false);
      }
    }, [isControlled, onClose]);

    const handleRemoveItem = useCallback(
      (id: string | number) => {
        onRemoveItem?.(id);
      },
      [onRemoveItem],
    );

    const handleViewCart = useCallback(() => {
      onViewCart?.();
      handleClose();
    }, [onViewCart, handleClose]);

    const handleCheckout = useCallback(() => {
      onCheckout?.();
      handleClose();
    }, [onCheckout, handleClose]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, handleClose]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(styles.wrapper, className)}
        {...rest}
      >
        {/* Trigger */}
        {trigger ? (
          <div
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            {trigger}
          </div>
        ) : (
          <button
            type="button"
            className={styles.trigger}
            onClick={handleToggle}
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-label="Shopping cart"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems > 99 ? '99+' : totalItems}</span>
            )}
          </button>
        )}

        {/* Dropdown panel */}
        {isOpen && (
          <div className={styles.dropdown} role="dialog" aria-label="Shopping cart">
            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>
                  <EmptyBagIcon />
                </span>
                <span className={styles.emptyText}>Your cart is empty</span>
                <span className={styles.emptyHint}>Add items to get started</span>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className={styles.header}>
                  <span className={styles.headerTitle}>
                    Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={handleClose}
                    aria-label="Close cart"
                  >
                    <RemoveIcon />
                  </button>
                </div>

                {/* Items list */}
                <div className={styles.itemsList}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.itemImage}
                        loading="lazy"
                      />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        {item.variant && (
                          <span className={styles.itemVariant}>{item.variant}</span>
                        )}
                        <div className={styles.itemBottom}>
                          <span className={styles.itemPrice}>{formatPrice(item.price)} sum</span>
                          <span className={styles.itemQuantity}>x{item.quantity}</span>
                        </div>
                      </div>
                      {onRemoveItem && (
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label={`Remove ${item.title}`}
                        >
                          <RemoveIcon />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                  <div className={styles.subtotal}>
                    <span className={styles.subtotalLabel}>Subtotal</span>
                    <span className={styles.subtotalValue}>{formatPrice(subtotal)} sum</span>
                  </div>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.viewCartBtn}
                      onClick={handleViewCart}
                    >
                      View Cart
                    </button>
                    <button
                      type="button"
                      className={styles.checkoutBtn}
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);

DesktopMiniCart.displayName = 'DesktopMiniCart';

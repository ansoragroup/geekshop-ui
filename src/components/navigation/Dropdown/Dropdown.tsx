'use client';
import { cn } from '../../../utils/cn';
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Menu items */
  items: DropdownItem[];
  /** Currently selected value */
  value?: string;
  /** Trigger element that opens the dropdown */
  trigger: ReactNode;
  /** Callback when an item is selected */
  onSelect?: (value: string) => void;
  /** Dropdown menu placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end';
  /** Width of the dropdown menu */
  width?: number | string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      items,
      value,
      trigger,
      onSelect,
      placement = 'bottom-start',
      width,
      open: openProp,
      onOpenChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: openProp,
      defaultValue: false,
      onChange: onOpenChange,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef<number>(-1);

    // ─── Outside click ─────────────────────────────────────

    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, setIsOpen]);

    // ─── Focus management ──────────────────────────────────

    const focusItem = useCallback((index: number) => {
      const menuEl = menuRef.current;
      if (!menuEl) return;

      const items = menuEl.querySelectorAll<HTMLElement>('[role="option"]');
      if (items[index]) {
        items[index].focus();
        activeIndexRef.current = index;
      }
    }, []);

    const getEnabledItems = useCallback(() => {
      return items.map((item, i) => ({ ...item, index: i })).filter((item) => !item.disabled);
    }, [items]);

    // ─── Toggle handler ────────────────────────────────────

    const handleToggle = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          // Focus first enabled item
          const enabled = getEnabledItems();
          if (enabled.length > 0) {
            focusItem(enabled[0].index);
          }
        }
      },
      [handleToggle, isOpen, setIsOpen, getEnabledItems, focusItem],
    );

    // ─── Item selection ────────────────────────────────────

    const handleItemSelect = useCallback(
      (itemValue: string) => {
        onSelect?.(itemValue);
        setIsOpen(false);
      },
      [onSelect, setIsOpen],
    );

    // ─── Menu keyboard navigation ─────────────────────────

    const handleMenuKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const enabled = getEnabledItems();
        if (enabled.length === 0) return;

        const currentEnabledIndex = enabled.findIndex((item) => item.index === activeIndexRef.current);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentEnabledIndex < enabled.length - 1 ? currentEnabledIndex + 1 : 0;
          focusItem(enabled[nextIndex].index);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabled.length - 1;
          focusItem(enabled[prevIndex].index);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (activeIndexRef.current >= 0 && !items[activeIndexRef.current]?.disabled) {
            handleItemSelect(items[activeIndexRef.current].value);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
        }
      },
      [getEnabledItems, focusItem, items, handleItemSelect, setIsOpen],
    );

    // ─── Merge refs ────────────────────────────────────────

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const rootClass = cn(styles.root, className);

    const menuStyle: React.CSSProperties = {};
    if (width) {
      menuStyle.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (placement === 'bottom-end') {
      menuStyle.right = 0;
    } else {
      menuStyle.left = 0;
    }

    return (
      <div ref={mergedRef} className={rootClass} {...rest}>
        {/* Trigger */}
        <div
          className={styles.trigger}
          onClick={handleToggle}
          onKeyDown={handleTriggerKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'dropdown-listbox' : undefined}
          aria-haspopup="listbox"
          tabIndex={0}
        >
          {trigger}
        </div>

        {/* Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className={styles.menu}
            style={menuStyle}
            role="listbox"
            id="dropdown-listbox"
            tabIndex={-1}
            onKeyDown={handleMenuKeyDown}
          >
            {items.map((item, index) => {
              const isSelected = item.value === value;
              const isDisabled = item.disabled === true;

              const itemClass = cn(styles.item,
                isSelected && styles.itemSelected,
                isDisabled && styles.itemDisabled,);

              return (
                <div
                  key={item.value}
                  className={itemClass}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  tabIndex={isDisabled ? -1 : 0}
                  onClick={() => {
                    if (!isDisabled) {
                      handleItemSelect(item.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                      e.preventDefault();
                      handleItemSelect(item.value);
                    }
                  }}
                  onFocus={() => {
                    activeIndexRef.current = index;
                  }}
                >
                  {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                  <span className={styles.itemLabel}>{item.label}</span>
                  {isSelected && (
                    <span className={styles.checkmark}>
                      <CheckIcon />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

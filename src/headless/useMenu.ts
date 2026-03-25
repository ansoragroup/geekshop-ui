import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useControllableState } from '../hooks/useControllableState';

export interface MenuItem {
  key: string;
  label: string;
  disabled?: boolean;
  /** Whether this item has a submenu */
  hasSubmenu?: boolean;
}

export interface UseMenuOptions {
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback on open change */
  onOpenChange?: (isOpen: boolean) => void;
  /** Menu items */
  items: MenuItem[];
  /** Callback when an item is activated */
  onAction?: (key: string) => void;
  /** Whether this is a submenu */
  isSubmenu?: boolean;
}

export interface UseMenuReturn {
  triggerProps: {
    id: string;
    'aria-haspopup': 'menu';
    'aria-expanded': boolean;
    'aria-controls': string;
    ref: (el: HTMLElement | null) => void;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  menuProps: {
    id: string;
    role: 'menu';
    'aria-labelledby': string;
    'aria-activedescendant': string | undefined;
    ref: (el: HTMLElement | null) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  itemProps: (key: string) => {
    id: string;
    role: 'menuitem';
    'aria-disabled'?: boolean;
    'aria-haspopup'?: 'menu';
    tabIndex: -1;
    onClick: () => void;
    onPointerMove: () => void;
    onPointerLeave: () => void;
  };
  isOpen: boolean;
  activeIndex: number;
  open: () => void;
  close: () => void;
  toggleOpen: () => void;
}

export function useMenu(options: UseMenuOptions): UseMenuReturn {
  const {
    isOpen: controlledOpen,
    defaultOpen,
    onOpenChange,
    items,
    onAction,
    isSubmenu = false,
  } = options;

  const baseId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const open = useCallback(() => {
    setIsOpen(true);
    const firstEnabled = items.findIndex((i) => !i.disabled);
    setActiveIndex(firstEnabled >= 0 ? firstEnabled : 0);
  }, [setIsOpen, items]);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, [setIsOpen]);

  const toggleOpen = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, close, open]);

  const getNextEnabledIndex = useCallback(
    (currentIndex: number, direction: 1 | -1): number => {
      let index = currentIndex;
      const len = items.length;
      for (let i = 0; i < len; i++) {
        index = (index + direction + len) % len;
        if (!items[index].disabled) return index;
      }
      return currentIndex;
    },
    [items]
  );

  const getFirstEnabledIndex = useCallback((): number => {
    return items.findIndex((i) => !i.disabled);
  }, [items]);

  const getLastEnabledIndex = useCallback((): number => {
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].disabled) return i;
    }
    return -1;
  }, [items]);

  const activateItem = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length && !items[index].disabled) {
        onAction?.(items[index].key);
        if (!items[index].hasSubmenu) {
          close();
        }
      }
    },
    [items, onAction, close]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;
  const getItemId = (key: string) => `${baseId}-item-${key}`;

  const activeDescendant =
    isOpen && activeIndex >= 0 && activeIndex < items.length
      ? getItemId(items[activeIndex].key)
      : undefined;

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setActiveIndex((prev) => getNextEnabledIndex(prev, 1));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setActiveIndex((prev) => getNextEnabledIndex(prev, -1));
        break;
      }
      case 'Home': {
        e.preventDefault();
        setActiveIndex(getFirstEnabledIndex());
        break;
      }
      case 'End': {
        e.preventDefault();
        setActiveIndex(getLastEnabledIndex());
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        activateItem(activeIndex);
        break;
      }
      case 'Escape': {
        e.preventDefault();
        close();
        break;
      }
      case 'ArrowRight': {
        // Open submenu
        if (activeIndex >= 0 && items[activeIndex]?.hasSubmenu) {
          e.preventDefault();
          onAction?.(items[activeIndex].key);
        }
        break;
      }
      case 'ArrowLeft': {
        // Close submenu (parent handles this)
        if (isSubmenu) {
          e.preventDefault();
          close();
        }
        break;
      }
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown': {
        e.preventDefault();
        open();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(getLastEnabledIndex());
        break;
      }
    }
  };

  const triggerProps = {
    id: triggerId,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': isOpen,
    'aria-controls': menuId,
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el;
    },
    onClick: toggleOpen,
    onKeyDown: handleTriggerKeyDown,
  };

  const menuProps = {
    id: menuId,
    role: 'menu' as const,
    'aria-labelledby': triggerId,
    'aria-activedescendant': activeDescendant,
    ref: (el: HTMLElement | null) => {
      menuRef.current = el;
    },
    onKeyDown: handleMenuKeyDown,
  };

  const itemProps = (key: string) => {
    const item = items.find((i) => i.key === key);
    const isDisabled = item?.disabled ?? false;
    const hasSubmenu = item?.hasSubmenu ?? false;

    return {
      id: getItemId(key),
      role: 'menuitem' as const,
      ...(isDisabled ? { 'aria-disabled': true as const } : {}),
      ...(hasSubmenu ? { 'aria-haspopup': 'menu' as const } : {}),
      tabIndex: -1 as const,
      onClick: () => {
        if (!isDisabled) {
          activateItem(items.findIndex((i) => i.key === key));
        }
      },
      onPointerMove: () => {
        if (!isDisabled) {
          const idx = items.findIndex((i) => i.key === key);
          setActiveIndex(idx);
        }
      },
      onPointerLeave: () => {
        setActiveIndex(-1);
      },
    };
  };

  return {
    triggerProps,
    menuProps,
    itemProps,
    isOpen,
    activeIndex,
    open,
    close,
    toggleOpen,
  };
}

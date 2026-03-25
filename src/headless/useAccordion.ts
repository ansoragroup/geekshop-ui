import { useCallback, useId, useRef } from 'react';
import { useControllableState } from '../hooks/useControllableState';

export interface UseAccordionOptions {
  /** Keys of items currently expanded (controlled) */
  expandedKeys?: string[];
  /** Keys of items initially expanded (uncontrolled) */
  defaultExpandedKeys?: string[];
  /** Callback when expanded keys change */
  onExpandedKeysChange?: (keys: string[]) => void;
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Item keys */
  items: string[];
  /** Disabled item keys */
  disabledKeys?: string[];
}

export interface AccordionItemTriggerProps {
  id: string;
  role: 'button';
  tabIndex: 0 | -1;
  'aria-expanded': boolean;
  'aria-controls': string;
  'aria-disabled'?: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: (el: HTMLElement | null) => void;
}

export interface AccordionItemPanelProps {
  id: string;
  role: 'region';
  'aria-labelledby': string;
  hidden: boolean;
}

export interface AccordionItemState {
  isOpen: boolean;
  triggerProps: AccordionItemTriggerProps;
  panelProps: AccordionItemPanelProps;
}

export interface UseAccordionReturn {
  items: AccordionItemState[];
  expandItem: (key: string) => void;
  collapseItem: (key: string) => void;
  toggleItem: (key: string) => void;
}

export function useAccordion(options: UseAccordionOptions): UseAccordionReturn {
  const {
    expandedKeys: controlledKeys,
    defaultExpandedKeys,
    onExpandedKeysChange,
    allowMultiple = false,
    items: itemKeys,
    disabledKeys = [],
  } = options;

  const baseId = useId();
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());

  const [expandedKeys, setExpandedKeys] = useControllableState<string[]>({
    value: controlledKeys,
    defaultValue: defaultExpandedKeys ?? [],
    onChange: onExpandedKeysChange,
  });

  const expandItem = useCallback(
    (key: string) => {
      if (disabledKeys.includes(key)) return;
      setExpandedKeys((prev: string[]) => {
        if (prev.includes(key)) return prev;
        return allowMultiple ? [...prev, key] : [key];
      });
    },
    [allowMultiple, disabledKeys, setExpandedKeys]
  );

  const collapseItem = useCallback(
    (key: string) => {
      if (disabledKeys.includes(key)) return;
      setExpandedKeys((prev: string[]) => prev.filter((k) => k !== key));
    },
    [disabledKeys, setExpandedKeys]
  );

  const toggleItem = useCallback(
    (key: string) => {
      if (disabledKeys.includes(key)) return;
      setExpandedKeys((prev: string[]) => {
        if (prev.includes(key)) {
          return prev.filter((k) => k !== key);
        }
        return allowMultiple ? [...prev, key] : [key];
      });
    },
    [allowMultiple, disabledKeys, setExpandedKeys]
  );

  const focusTrigger = useCallback((key: string) => {
    const el = triggerRefs.current.get(key);
    el?.focus();
  }, []);

  const getEnabledKeys = useCallback(() => {
    return itemKeys.filter((k) => !disabledKeys.includes(k));
  }, [itemKeys, disabledKeys]);

  const items: AccordionItemState[] = itemKeys.map((key) => {
    const triggerId = `${baseId}-trigger-${key}`;
    const panelId = `${baseId}-panel-${key}`;
    const isOpen = expandedKeys.includes(key);
    const isDisabled = disabledKeys.includes(key);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledKeys = getEnabledKeys();
      const currentIndex = enabledKeys.indexOf(key);
      if (currentIndex === -1) return;

      switch (e.key) {
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (!isDisabled) toggleItem(key);
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % enabledKeys.length;
          focusTrigger(enabledKeys[nextIndex]);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + enabledKeys.length) % enabledKeys.length;
          focusTrigger(enabledKeys[prevIndex]);
          break;
        }
        case 'Home': {
          e.preventDefault();
          focusTrigger(enabledKeys[0]);
          break;
        }
        case 'End': {
          e.preventDefault();
          focusTrigger(enabledKeys[enabledKeys.length - 1]);
          break;
        }
      }
    };

    return {
      isOpen,
      triggerProps: {
        id: triggerId,
        role: 'button' as const,
        tabIndex: (isDisabled ? -1 : 0) as 0 | -1,
        'aria-expanded': isOpen,
        'aria-controls': panelId,
        ...(isDisabled ? { 'aria-disabled': true as const } : {}),
        onClick: () => {
          if (!isDisabled) toggleItem(key);
        },
        onKeyDown: handleKeyDown,
        ref: (el: HTMLElement | null) => {
          if (el) {
            triggerRefs.current.set(key, el);
          } else {
            triggerRefs.current.delete(key);
          }
        },
      } satisfies AccordionItemTriggerProps,
      panelProps: {
        id: panelId,
        role: 'region' as const,
        'aria-labelledby': triggerId,
        hidden: !isOpen,
      } satisfies AccordionItemPanelProps,
    };
  });

  return {
    items,
    expandItem,
    collapseItem,
    toggleItem,
  };
}

/** Alias for useAccordion */
export const useCollapse = useAccordion;
export type { UseAccordionOptions as UseCollapseOptions };
export type { UseAccordionReturn as UseCollapseReturn };

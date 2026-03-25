import { useCallback, useId, useRef } from 'react';
import { useControllableState } from '../hooks/useControllableState';

export interface UseTabsOptions {
  /** Controlled active tab key */
  activeKey?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveKey?: string;
  /** Callback when active tab changes */
  onChange?: (key: string) => void;
  /** Tab keys in order */
  tabs: string[];
  /** Disabled tab keys */
  disabledKeys?: string[];
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Activate on focus (automatic) or on enter/space (manual) */
  activationMode?: 'automatic' | 'manual';
}

export interface UseTabsReturn {
  tabListProps: {
    role: 'tablist';
    'aria-orientation': 'horizontal' | 'vertical';
  };
  tabProps: (key: string) => {
    id: string;
    role: 'tab';
    'aria-selected': boolean;
    'aria-controls': string;
    'aria-disabled'?: boolean;
    tabIndex: 0 | -1;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    ref: (el: HTMLElement | null) => void;
  };
  panelProps: (key: string) => {
    id: string;
    role: 'tabpanel';
    'aria-labelledby': string;
    hidden: boolean;
    tabIndex: 0;
  };
  activeKey: string;
  setActiveKey: (key: string) => void;
}

export function useTabs(options: UseTabsOptions): UseTabsReturn {
  const {
    activeKey: controlledKey,
    defaultActiveKey,
    onChange,
    tabs,
    disabledKeys = [],
    orientation = 'horizontal',
    activationMode = 'automatic',
  } = options;

  const baseId = useId();
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map());

  const firstEnabledKey = tabs.find((k) => !disabledKeys.includes(k)) ?? tabs[0] ?? '';

  const [activeKey, setActiveKeyState] = useControllableState<string>({
    value: controlledKey,
    defaultValue: defaultActiveKey ?? firstEnabledKey,
    onChange,
  });

  const setActiveKey = useCallback(
    (key: string) => {
      if (!disabledKeys.includes(key)) {
        setActiveKeyState(key);
      }
    },
    [disabledKeys, setActiveKeyState]
  );

  const focusTab = useCallback((key: string) => {
    const el = tabRefs.current.get(key);
    el?.focus();
  }, []);

  const getEnabledTabs = useCallback(() => {
    return tabs.filter((k) => !disabledKeys.includes(k));
  }, [tabs, disabledKeys]);

  const tabListProps = {
    role: 'tablist' as const,
    'aria-orientation': orientation,
  };

  const tabProps = (key: string) => {
    const tabId = `${baseId}-tab-${key}`;
    const panelId = `${baseId}-panel-${key}`;
    const isActive = key === activeKey;
    const isDisabled = disabledKeys.includes(key);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledTabs = getEnabledTabs();
      const currentIndex = enabledTabs.indexOf(key);
      if (currentIndex === -1) return;

      const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

      let targetIndex: number;
      switch (e.key) {
        case nextKey: {
          e.preventDefault();
          targetIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        }
        case prevKey: {
          e.preventDefault();
          targetIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
          break;
        }
        case 'Home': {
          e.preventDefault();
          targetIndex = 0;
          break;
        }
        case 'End': {
          e.preventDefault();
          targetIndex = enabledTabs.length - 1;
          break;
        }
        case 'Enter':
        case ' ': {
          if (activationMode === 'manual') {
            e.preventDefault();
            setActiveKey(key);
          }
          return;
        }
        default:
          return;
      }

      if (targetIndex >= 0) {
        const targetKey = enabledTabs[targetIndex];
        focusTab(targetKey);
        if (activationMode === 'automatic') {
          setActiveKey(targetKey);
        }
      }
    };

    return {
      id: tabId,
      role: 'tab' as const,
      'aria-selected': isActive,
      'aria-controls': panelId,
      ...(isDisabled ? { 'aria-disabled': true as const } : {}),
      tabIndex: (isActive ? 0 : -1) as 0 | -1,
      onClick: () => {
        if (!isDisabled) setActiveKey(key);
      },
      onKeyDown: handleKeyDown,
      ref: (el: HTMLElement | null) => {
        if (el) {
          tabRefs.current.set(key, el);
        } else {
          tabRefs.current.delete(key);
        }
      },
    };
  };

  const panelProps = (key: string) => {
    const tabId = `${baseId}-tab-${key}`;
    const panelId = `${baseId}-panel-${key}`;
    const isActive = key === activeKey;

    return {
      id: panelId,
      role: 'tabpanel' as const,
      'aria-labelledby': tabId,
      hidden: !isActive,
      tabIndex: 0 as const,
    };
  };

  return {
    tabListProps,
    tabProps,
    panelProps,
    activeKey,
    setActiveKey,
  };
}

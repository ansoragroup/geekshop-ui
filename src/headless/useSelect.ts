import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useControllableState } from '../hooks/useControllableState';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface UseSelectOptions {
  /** Controlled selected value */
  selectedValue?: string;
  /** Default selected value (uncontrolled) */
  defaultSelectedValue?: string;
  /** Callback on selection change */
  onSelectionChange?: (value: string) => void;
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback on open change */
  onOpenChange?: (isOpen: boolean) => void;
  /** Available options */
  options: SelectOption[];
}

export interface UseSelectReturn {
  triggerProps: {
    id: string;
    role: 'combobox';
    'aria-haspopup': 'listbox';
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-activedescendant': string | undefined;
    tabIndex: 0;
    ref: (el: HTMLElement | null) => void;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  listboxProps: {
    id: string;
    role: 'listbox';
    'aria-labelledby': string;
  };
  optionProps: (item: SelectOption) => {
    id: string;
    role: 'option';
    'aria-selected': boolean;
    'aria-disabled'?: boolean;
    onClick: () => void;
    onPointerMove: () => void;
  };
  isOpen: boolean;
  selectedValue: string;
  activeIndex: number;
  open: () => void;
  close: () => void;
  selectOption: (value: string) => void;
}

export function useSelect(options: UseSelectOptions): UseSelectReturn {
  const {
    selectedValue: controlledValue,
    defaultSelectedValue,
    onSelectionChange,
    isOpen: controlledOpen,
    defaultOpen,
    onOpenChange,
    options: selectOptions,
  } = options;

  const baseId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  const [selectedValue, setSelectedValue] = useControllableState<string>({
    value: controlledValue,
    defaultValue: defaultSelectedValue ?? '',
    onChange: onSelectionChange,
  });

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const enabledOptions = selectOptions.filter((o) => !o.disabled);

  const open = useCallback(() => {
    setIsOpen(true);
    // Set active index to selected or first enabled
    const selectedIdx = enabledOptions.findIndex((o) => o.value === selectedValue);
    setActiveIndex(selectedIdx >= 0 ? selectOptions.indexOf(enabledOptions[selectedIdx]) : 0);
  }, [setIsOpen, enabledOptions, selectedValue, selectOptions]);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, [setIsOpen]);

  const selectOption = useCallback(
    (value: string) => {
      const opt = selectOptions.find((o) => o.value === value);
      if (opt?.disabled) return;
      setSelectedValue(value);
      close();
    },
    [selectOptions, setSelectedValue, close]
  );

  const getNextEnabledIndex = useCallback(
    (currentIndex: number, direction: 1 | -1): number => {
      let index = currentIndex;
      const len = selectOptions.length;
      for (let i = 0; i < len; i++) {
        index = (index + direction + len) % len;
        if (!selectOptions[index].disabled) return index;
      }
      return currentIndex;
    },
    [selectOptions]
  );

  const getFirstEnabledIndex = useCallback((): number => {
    return selectOptions.findIndex((o) => !o.disabled);
  }, [selectOptions]);

  const getLastEnabledIndex = useCallback((): number => {
    for (let i = selectOptions.length - 1; i >= 0; i--) {
      if (!selectOptions[i].disabled) return i;
    }
    return -1;
  }, [selectOptions]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  const triggerId = `${baseId}-trigger`;
  const listboxId = `${baseId}-listbox`;

  const getOptionId = (value: string) => `${baseId}-option-${value}`;

  const activeDescendant =
    isOpen && activeIndex >= 0 && activeIndex < selectOptions.length
      ? getOptionId(selectOptions[activeIndex].value)
      : undefined;

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (isOpen) {
          if (activeIndex >= 0 && activeIndex < selectOptions.length) {
            selectOption(selectOptions[activeIndex].value);
          }
        } else {
          open();
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (!isOpen) {
          open();
        } else {
          setActiveIndex((prev) => getNextEnabledIndex(prev, 1));
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (!isOpen) {
          open();
        } else {
          setActiveIndex((prev) => getNextEnabledIndex(prev, -1));
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        if (isOpen) {
          setActiveIndex(getFirstEnabledIndex());
        }
        break;
      }
      case 'End': {
        e.preventDefault();
        if (isOpen) {
          setActiveIndex(getLastEnabledIndex());
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        if (isOpen) close();
        break;
      }
    }
  };

  const triggerProps = {
    id: triggerId,
    role: 'combobox' as const,
    'aria-haspopup': 'listbox' as const,
    'aria-expanded': isOpen,
    'aria-controls': listboxId,
    'aria-activedescendant': activeDescendant,
    tabIndex: 0 as const,
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el;
    },
    onClick: () => {
      if (isOpen) close();
      else open();
    },
    onKeyDown: handleTriggerKeyDown,
  };

  const listboxProps = {
    id: listboxId,
    role: 'listbox' as const,
    'aria-labelledby': triggerId,
  };

  const optionProps = (item: SelectOption) => {
    const optId = getOptionId(item.value);
    const isSelected = item.value === selectedValue;
    const idx = selectOptions.indexOf(item);

    return {
      id: optId,
      role: 'option' as const,
      'aria-selected': isSelected,
      ...(item.disabled ? { 'aria-disabled': true as const } : {}),
      onClick: () => {
        if (!item.disabled) selectOption(item.value);
      },
      onPointerMove: () => {
        if (!item.disabled) setActiveIndex(idx);
      },
    };
  };

  return {
    triggerProps,
    listboxProps,
    optionProps,
    isOpen,
    selectedValue,
    activeIndex,
    open,
    close,
    selectOption,
  };
}

// useCombobox - extends useSelect with input filtering
export interface UseComboboxOptions {
  /** Controlled selected value */
  selectedValue?: string;
  /** Default selected value (uncontrolled) */
  defaultSelectedValue?: string;
  /** Callback on selection change */
  onSelectionChange?: (value: string) => void;
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback on open change */
  onOpenChange?: (isOpen: boolean) => void;
  /** Available options */
  options: SelectOption[];
  /** Controlled input value */
  inputValue?: string;
  /** Default input value */
  defaultInputValue?: string;
  /** Callback on input value change */
  onInputValueChange?: (value: string) => void;
  /** Autocomplete type */
  autoComplete?: 'list' | 'both' | 'none';
}

export interface UseComboboxReturn {
  inputProps: {
    id: string;
    role: 'combobox';
    'aria-autocomplete': 'list' | 'both' | 'none';
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-activedescendant': string | undefined;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  listboxProps: {
    id: string;
    role: 'listbox';
    'aria-labelledby': string;
  };
  optionProps: (item: SelectOption) => {
    id: string;
    role: 'option';
    'aria-selected': boolean;
    'aria-disabled'?: boolean;
    onClick: () => void;
    onPointerMove: () => void;
  };
  isOpen: boolean;
  inputValue: string;
  selectedValue: string;
  activeIndex: number;
  open: () => void;
  close: () => void;
  setInputValue: (value: string) => void;
}

export function useCombobox(options: UseComboboxOptions): UseComboboxReturn {
  const {
    selectedValue: controlledSelected,
    defaultSelectedValue,
    onSelectionChange,
    isOpen: controlledOpen,
    defaultOpen,
    onOpenChange,
    options: selectOptions,
    inputValue: controlledInputValue,
    defaultInputValue,
    onInputValueChange,
    autoComplete = 'list',
  } = options;

  const baseId = useId();

  const [selectedValue, setSelectedValue] = useControllableState<string>({
    value: controlledSelected,
    defaultValue: defaultSelectedValue ?? '',
    onChange: onSelectionChange,
  });

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const [inputValue, setInputValue] = useControllableState<string>({
    value: controlledInputValue,
    defaultValue: defaultInputValue ?? '',
    onChange: onInputValueChange,
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, [setIsOpen]);

  const getNextEnabledIndex = useCallback(
    (currentIndex: number, direction: 1 | -1): number => {
      let index = currentIndex;
      const len = selectOptions.length;
      for (let i = 0; i < len; i++) {
        index = (index + direction + len) % len;
        if (!selectOptions[index].disabled) return index;
      }
      return currentIndex;
    },
    [selectOptions]
  );

  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;

  const getOptionId = (value: string) => `${baseId}-option-${value}`;

  const activeDescendant =
    isOpen && activeIndex >= 0 && activeIndex < selectOptions.length
      ? getOptionId(selectOptions[activeIndex].value)
      : undefined;

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!isOpen) {
          open();
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => getNextEnabledIndex(prev, 1));
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (!isOpen) {
          open();
          const lastEnabled = selectOptions.length - 1;
          setActiveIndex(lastEnabled);
        } else {
          setActiveIndex((prev) => getNextEnabledIndex(prev, -1));
        }
        break;
      }
      case 'Enter': {
        e.preventDefault();
        if (isOpen && activeIndex >= 0 && activeIndex < selectOptions.length) {
          const opt = selectOptions[activeIndex];
          if (!opt.disabled) {
            setSelectedValue(opt.value);
            setInputValue(opt.label);
            close();
          }
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          setInputValue('');
        }
        break;
      }
    }
  };

  const inputProps = {
    id: inputId,
    role: 'combobox' as const,
    'aria-autocomplete': autoComplete,
    'aria-expanded': isOpen,
    'aria-controls': listboxId,
    'aria-activedescendant': activeDescendant,
    value: inputValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (!isOpen) open();
      setActiveIndex(-1);
    },
    onKeyDown: handleInputKeyDown,
    onFocus: () => {
      if (selectOptions.length > 0) open();
    },
    onBlur: () => {
      // Delay to allow option click
      setTimeout(() => close(), 150);
    },
  };

  const listboxProps = {
    id: listboxId,
    role: 'listbox' as const,
    'aria-labelledby': inputId,
  };

  const optionProps = (item: SelectOption) => {
    const optId = getOptionId(item.value);
    const isSelected = item.value === selectedValue;
    const idx = selectOptions.indexOf(item);

    return {
      id: optId,
      role: 'option' as const,
      'aria-selected': isSelected,
      ...(item.disabled ? { 'aria-disabled': true as const } : {}),
      onClick: () => {
        if (!item.disabled) {
          setSelectedValue(item.value);
          setInputValue(item.label);
          close();
        }
      },
      onPointerMove: () => {
        if (!item.disabled) setActiveIndex(idx);
      },
    };
  };

  return {
    inputProps,
    listboxProps,
    optionProps,
    isOpen,
    inputValue,
    selectedValue,
    activeIndex,
    open,
    close,
    setInputValue,
  };
}

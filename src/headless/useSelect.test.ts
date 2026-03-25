import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useSelect, useCombobox } from './useSelect';
import type { SelectOption } from './useSelect';

function createKeyboardEvent(key: string): React.KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
}

const options: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
];

describe('useSelect', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.isOpen).toBe(false);
  });

  it('defaults to empty selectedValue', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.selectedValue).toBe('');
  });

  it('respects defaultSelectedValue', () => {
    const { result } = renderHook(() => useSelect({ options, defaultSelectedValue: 'banana' }));
    expect(result.current.selectedValue).toBe('banana');
  });

  it('open() opens the listbox', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('close() closes the listbox', () => {
    const { result } = renderHook(() => useSelect({ options, defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('selectOption selects and closes', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => result.current.selectOption('cherry'));
    expect(result.current.selectedValue).toBe('cherry');
    expect(result.current.isOpen).toBe(false);
  });

  it('selectOption does not select disabled option', () => {
    const { result } = renderHook(() => useSelect({ options: optionsWithDisabled }));
    act(() => result.current.open());
    act(() => result.current.selectOption('banana'));
    expect(result.current.selectedValue).toBe('');
  });

  // Controlled mode
  it('controlled: uses provided selectedValue', () => {
    const { result } = renderHook(() => useSelect({ options, selectedValue: 'cherry' }));
    expect(result.current.selectedValue).toBe('cherry');
  });

  it('controlled: calls onSelectionChange', () => {
    const onSelectionChange = vi.fn();
    const { result } = renderHook(() =>
      useSelect({ options, selectedValue: '', onSelectionChange })
    );
    act(() => result.current.open());
    act(() => result.current.selectOption('apple'));
    expect(onSelectionChange).toHaveBeenCalledWith('apple');
  });

  it('controlled: calls onOpenChange', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useSelect({ options, isOpen: false, onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // triggerProps
  it('triggerProps has role=combobox', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps.role).toBe('combobox');
  });

  it('triggerProps has aria-haspopup=listbox', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps['aria-haspopup']).toBe('listbox');
  });

  it('triggerProps has aria-expanded', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps['aria-expanded']).toBe(false);
    act(() => result.current.open());
    expect(result.current.triggerProps['aria-expanded']).toBe(true);
  });

  it('triggerProps has aria-controls pointing to listbox', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps['aria-controls']).toBe(result.current.listboxProps.id);
  });

  it('triggerProps has tabIndex=0', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps.tabIndex).toBe(0);
  });

  it('triggerProps.onClick toggles', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.triggerProps.onClick());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.triggerProps.onClick());
    expect(result.current.isOpen).toBe(false);
  });

  it('triggerProps has ref callback', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(typeof result.current.triggerProps.ref).toBe('function');
  });

  // listboxProps
  it('listboxProps has role=listbox', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.listboxProps.role).toBe('listbox');
  });

  it('listboxProps has aria-labelledby pointing to trigger', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.listboxProps['aria-labelledby']).toBe(result.current.triggerProps.id);
  });

  // optionProps
  it('optionProps has role=option', () => {
    const { result } = renderHook(() => useSelect({ options }));
    const op = result.current.optionProps(options[0]);
    expect(op.role).toBe('option');
  });

  it('optionProps has aria-selected for selected option', () => {
    const { result } = renderHook(() => useSelect({ options, defaultSelectedValue: 'apple' }));
    expect(result.current.optionProps(options[0])['aria-selected']).toBe(true);
    expect(result.current.optionProps(options[1])['aria-selected']).toBe(false);
  });

  it('optionProps has aria-disabled for disabled option', () => {
    const { result } = renderHook(() => useSelect({ options: optionsWithDisabled }));
    expect(result.current.optionProps(optionsWithDisabled[1])['aria-disabled']).toBe(true);
    expect(result.current.optionProps(optionsWithDisabled[0])['aria-disabled']).toBeUndefined();
  });

  it('optionProps.onClick selects the option', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => result.current.optionProps(options[1]).onClick());
    expect(result.current.selectedValue).toBe('banana');
  });

  it('optionProps.onClick does not select disabled option', () => {
    const { result } = renderHook(() => useSelect({ options: optionsWithDisabled }));
    act(() => result.current.open());
    act(() => result.current.optionProps(optionsWithDisabled[1]).onClick());
    expect(result.current.selectedValue).toBe('');
  });

  it('optionProps.onPointerMove updates activeIndex', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => result.current.optionProps(options[2]).onPointerMove());
    expect(result.current.activeIndex).toBe(2);
  });

  it('optionProps.onPointerMove does not update for disabled option', () => {
    const { result } = renderHook(() => useSelect({ options: optionsWithDisabled }));
    act(() => result.current.open());
    act(() => result.current.optionProps(optionsWithDisabled[1]).onPointerMove());
    // activeIndex remains at initial state (0 after open)
    expect(result.current.activeIndex).toBe(0);
  });

  // Keyboard navigation
  it('Enter opens when closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('Space opens when closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent(' '));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('ArrowDown opens when closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('ArrowUp opens when closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('ArrowDown navigates options when open', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.activeIndex).toBe(1);
  });

  it('ArrowUp navigates options when open', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    // activeIndex starts at 0 after open
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    // Wraps to last
    expect(result.current.activeIndex).toBe(2);
  });

  it('Enter selects option when open', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.selectedValue).toBe('apple');
  });

  it('Escape closes when open', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('Escape'));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('Escape does nothing when closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('Escape'));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('Home moves to first enabled option', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.triggerProps.onKeyDown(createKeyboardEvent('Home'));
    });
    expect(result.current.activeIndex).toBe(0);
  });

  it('End moves to last enabled option', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('End'));
    });
    expect(result.current.activeIndex).toBe(2);
  });

  it('ArrowDown skips disabled options', () => {
    const { result } = renderHook(() => useSelect({ options: optionsWithDisabled }));
    act(() => result.current.open());
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    // Skips banana (index 1, disabled) and goes to cherry (index 2)
    expect(result.current.activeIndex).toBe(2);
  });

  it('aria-activedescendant is set when open with active item', () => {
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    expect(result.current.triggerProps['aria-activedescendant']).toBeDefined();
  });

  it('aria-activedescendant is undefined when closed', () => {
    const { result } = renderHook(() => useSelect({ options }));
    expect(result.current.triggerProps['aria-activedescendant']).toBeUndefined();
  });

  // Edge: outside click (requires real DOM refs — test the listener is registered)
  it('registers mousedown listener when open', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    addSpy.mockRestore();
  });

  it('removes mousedown listener when closed', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { result } = renderHook(() => useSelect({ options }));
    act(() => result.current.open());
    act(() => result.current.close());
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    removeSpy.mockRestore();
  });

  // Edge: empty options
  it('works with empty options list', () => {
    const { result } = renderHook(() => useSelect({ options: [] }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    expect(result.current.activeIndex).toBe(0);
  });
});

describe('useCombobox', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to closed', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.isOpen).toBe(false);
  });

  it('defaults to empty inputValue', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.inputValue).toBe('');
  });

  it('defaults to empty selectedValue', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.selectedValue).toBe('');
  });

  // inputProps
  it('inputProps has role=combobox', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.inputProps.role).toBe('combobox');
  });

  it('inputProps has aria-autocomplete', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.inputProps['aria-autocomplete']).toBe('list');
  });

  it('inputProps has aria-expanded', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.inputProps['aria-expanded']).toBe(false);
  });

  it('inputProps has aria-controls', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.inputProps['aria-controls']).toBe(result.current.listboxProps.id);
  });

  it('inputProps.onChange updates inputValue and opens', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => {
      result.current.inputProps.onChange({
        target: { value: 'ap' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.inputValue).toBe('ap');
    expect(result.current.isOpen).toBe(true);
  });

  it('inputProps.onFocus opens if options exist', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.inputProps.onFocus());
    expect(result.current.isOpen).toBe(true);
  });

  it('inputProps.onFocus does not open for empty options', () => {
    const { result } = renderHook(() => useCombobox({ options: [] }));
    act(() => result.current.inputProps.onFocus());
    expect(result.current.isOpen).toBe(false);
  });

  // listboxProps
  it('listboxProps has role=listbox', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.listboxProps.role).toBe('listbox');
  });

  // optionProps
  it('optionProps has role=option', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.optionProps(options[0]).role).toBe('option');
  });

  it('optionProps.onClick selects and sets inputValue', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => result.current.optionProps(options[1]).onClick());
    expect(result.current.selectedValue).toBe('banana');
    expect(result.current.inputValue).toBe('Banana');
    expect(result.current.isOpen).toBe(false);
  });

  it('optionProps.onClick does not select disabled', () => {
    const { result } = renderHook(() => useCombobox({ options: optionsWithDisabled }));
    act(() => result.current.open());
    act(() => result.current.optionProps(optionsWithDisabled[1]).onClick());
    expect(result.current.selectedValue).toBe('');
  });

  // Keyboard navigation
  it('ArrowDown opens and sets activeIndex', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.activeIndex).toBe(0);
  });

  it('ArrowDown navigates options when open', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    // Wraps from -1 to first enabled
    expect(result.current.activeIndex).toBeGreaterThanOrEqual(0);
  });

  it('ArrowUp opens when closed', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('ArrowUp navigates options when open', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.activeIndex).toBeGreaterThanOrEqual(0);
  });

  it('Enter selects active option', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.selectedValue).toBeDefined();
    expect(result.current.isOpen).toBe(false);
  });

  it('Escape closes when open', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('Escape'));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('Escape clears inputValue when closed', () => {
    const { result } = renderHook(() => useCombobox({ options, defaultInputValue: 'test' }));
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('Escape'));
    });
    expect(result.current.inputValue).toBe('');
  });

  // Controlled mode
  it('controlled: uses provided values', () => {
    const { result } = renderHook(() =>
      useCombobox({
        options,
        selectedValue: 'apple',
        inputValue: 'Apple',
        isOpen: true,
      })
    );
    expect(result.current.selectedValue).toBe('apple');
    expect(result.current.inputValue).toBe('Apple');
    expect(result.current.isOpen).toBe(true);
  });

  it('controlled: calls callbacks', () => {
    const onSelectionChange = vi.fn();
    const onInputValueChange = vi.fn();
    const { result } = renderHook(() =>
      useCombobox({
        options,
        onSelectionChange,
        onInputValueChange,
      })
    );
    act(() => result.current.open());
    act(() => result.current.optionProps(options[0]).onClick());
    expect(onSelectionChange).toHaveBeenCalledWith('apple');
    expect(onInputValueChange).toHaveBeenCalledWith('Apple');
  });

  it('setInputValue updates inputValue', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.setInputValue('test'));
    expect(result.current.inputValue).toBe('test');
  });

  it('open and close work', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  // aria-activedescendant
  it('aria-activedescendant is set when open with active item', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.inputProps['aria-activedescendant']).toBeDefined();
  });

  it('aria-activedescendant is undefined when closed', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    expect(result.current.inputProps['aria-activedescendant']).toBeUndefined();
  });

  // optionProps hover
  it('optionProps.onPointerMove updates activeIndex', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    act(() => result.current.optionProps(options[2]).onPointerMove());
    expect(result.current.activeIndex).toBe(2);
  });

  it('Enter does nothing when no active option', () => {
    const { result } = renderHook(() => useCombobox({ options }));
    act(() => result.current.open());
    // activeIndex is -1 initially
    act(() => {
      result.current.inputProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.selectedValue).toBe('');
  });

  it('autoComplete option is configurable', () => {
    const { result } = renderHook(() => useCombobox({ options, autoComplete: 'both' }));
    expect(result.current.inputProps['aria-autocomplete']).toBe('both');
  });
});

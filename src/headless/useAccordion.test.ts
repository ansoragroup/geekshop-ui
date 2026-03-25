import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAccordion, useCollapse } from './useAccordion';
import type { UseAccordionOptions } from './useAccordion';

function createKeyboardEvent(key: string): React.KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
}

describe('useAccordion', () => {
  const defaultOptions: UseAccordionOptions = {
    items: ['section1', 'section2', 'section3'],
  };

  it('returns items matching provided keys', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    expect(result.current.items).toHaveLength(3);
  });

  it('all items are closed by default', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    result.current.items.forEach((item) => {
      expect(item.isOpen).toBe(false);
    });
  });

  it('respects defaultExpandedKeys', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, defaultExpandedKeys: ['section2'] })
    );
    expect(result.current.items[0].isOpen).toBe(false);
    expect(result.current.items[1].isOpen).toBe(true);
    expect(result.current.items[2].isOpen).toBe(false);
  });

  it('expandItem opens an item', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    act(() => result.current.expandItem('section1'));
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('collapseItem closes an item', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, defaultExpandedKeys: ['section1'] })
    );
    expect(result.current.items[0].isOpen).toBe(true);
    act(() => result.current.collapseItem('section1'));
    expect(result.current.items[0].isOpen).toBe(false);
  });

  it('toggleItem toggles an item', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    act(() => result.current.toggleItem('section1'));
    expect(result.current.items[0].isOpen).toBe(true);
    act(() => result.current.toggleItem('section1'));
    expect(result.current.items[0].isOpen).toBe(false);
  });

  it('single mode: expanding one collapses others', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, defaultExpandedKeys: ['section1'] })
    );
    act(() => result.current.expandItem('section2'));
    expect(result.current.items[0].isOpen).toBe(false);
    expect(result.current.items[1].isOpen).toBe(true);
  });

  it('allowMultiple: expanding one does not collapse others', () => {
    const { result } = renderHook(() =>
      useAccordion({
        ...defaultOptions,
        allowMultiple: true,
        defaultExpandedKeys: ['section1'],
      })
    );
    act(() => result.current.expandItem('section2'));
    expect(result.current.items[0].isOpen).toBe(true);
    expect(result.current.items[1].isOpen).toBe(true);
  });

  it('disabled item cannot be expanded', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, disabledKeys: ['section1'] })
    );
    act(() => result.current.expandItem('section1'));
    expect(result.current.items[0].isOpen).toBe(false);
  });

  it('disabled item cannot be collapsed', () => {
    const { result } = renderHook(() =>
      useAccordion({
        ...defaultOptions,
        defaultExpandedKeys: ['section1'],
        disabledKeys: ['section1'],
      })
    );
    act(() => result.current.collapseItem('section1'));
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('disabled item cannot be toggled', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, disabledKeys: ['section1'] })
    );
    act(() => result.current.toggleItem('section1'));
    expect(result.current.items[0].isOpen).toBe(false);
  });

  // Controlled mode
  it('controlled: uses provided expandedKeys', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, expandedKeys: ['section2'] })
    );
    expect(result.current.items[1].isOpen).toBe(true);
    expect(result.current.items[0].isOpen).toBe(false);
  });

  it('controlled: calls onExpandedKeysChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useAccordion({
        ...defaultOptions,
        expandedKeys: [],
        onExpandedKeysChange: onChange,
      })
    );
    act(() => result.current.toggleItem('section1'));
    expect(onChange).toHaveBeenCalledWith(['section1']);
  });

  // ARIA attributes
  it('triggerProps has correct aria attributes', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const trigger = result.current.items[0].triggerProps;
    expect(trigger.role).toBe('button');
    expect(trigger['aria-expanded']).toBe(false);
    expect(trigger['aria-controls']).toBeDefined();
    expect(trigger.tabIndex).toBe(0);
  });

  it('triggerProps has aria-expanded=true when open', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, defaultExpandedKeys: ['section1'] })
    );
    expect(result.current.items[0].triggerProps['aria-expanded']).toBe(true);
  });

  it('panelProps has correct aria attributes', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const panel = result.current.items[0].panelProps;
    expect(panel.role).toBe('region');
    expect(panel['aria-labelledby']).toBeDefined();
    expect(panel.hidden).toBe(true);
  });

  it('panelProps.id matches triggerProps.aria-controls', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const item = result.current.items[0];
    expect(item.panelProps.id).toBe(item.triggerProps['aria-controls']);
  });

  it('triggerProps.id matches panelProps.aria-labelledby', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const item = result.current.items[0];
    expect(item.triggerProps.id).toBe(item.panelProps['aria-labelledby']);
  });

  it('disabled item triggerProps has aria-disabled', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, disabledKeys: ['section1'] })
    );
    expect(result.current.items[0].triggerProps['aria-disabled']).toBe(true);
    expect(result.current.items[0].triggerProps.tabIndex).toBe(-1);
  });

  // Keyboard navigation
  it('Enter on trigger toggles item', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('Space on trigger toggles item', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(createKeyboardEvent(' '));
    });
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('onClick on trigger toggles item', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    act(() => {
      result.current.items[0].triggerProps.onClick();
    });
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('ArrowDown calls preventDefault', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const event = createKeyboardEvent('ArrowDown');
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(event);
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('ArrowUp calls preventDefault', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const event = createKeyboardEvent('ArrowUp');
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(event);
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('Home calls preventDefault', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const event = createKeyboardEvent('Home');
    act(() => {
      result.current.items[1].triggerProps.onKeyDown(event);
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('End calls preventDefault', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const event = createKeyboardEvent('End');
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(event);
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('unrecognized key does nothing', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    const event = createKeyboardEvent('Tab');
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(event);
    });
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('keyboard on disabled item does not toggle', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, disabledKeys: ['section1'] })
    );
    act(() => {
      result.current.items[0].triggerProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.items[0].isOpen).toBe(false);
  });

  it('click on disabled item does not toggle', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, disabledKeys: ['section1'] })
    );
    act(() => {
      result.current.items[0].triggerProps.onClick();
    });
    expect(result.current.items[0].isOpen).toBe(false);
  });

  // Edge cases
  it('empty items list returns empty array', () => {
    const { result } = renderHook(() => useAccordion({ items: [] }));
    expect(result.current.items).toHaveLength(0);
  });

  it('single item works correctly', () => {
    const { result } = renderHook(() => useAccordion({ items: ['only'] }));
    expect(result.current.items).toHaveLength(1);
    act(() => result.current.toggleItem('only'));
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('expandItem on already expanded is no-op', () => {
    const { result } = renderHook(() =>
      useAccordion({ ...defaultOptions, defaultExpandedKeys: ['section1'] })
    );
    act(() => result.current.expandItem('section1'));
    expect(result.current.items[0].isOpen).toBe(true);
  });

  it('collapseItem on already collapsed is no-op', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    act(() => result.current.collapseItem('section1'));
    expect(result.current.items[0].isOpen).toBe(false);
  });

  it('ref callback is provided on triggerProps', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    expect(typeof result.current.items[0].triggerProps.ref).toBe('function');
  });

  it('ref callback handles null', () => {
    const { result } = renderHook(() => useAccordion(defaultOptions));
    // Should not throw
    result.current.items[0].triggerProps.ref(null);
  });

  // useCollapse alias
  it('useCollapse is an alias for useAccordion', () => {
    expect(useCollapse).toBe(useAccordion);
  });
});

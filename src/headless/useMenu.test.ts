import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useMenu } from './useMenu';
import type { MenuItem } from './useMenu';

function createKeyboardEvent(key: string): React.KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
}

const items: MenuItem[] = [
  { key: 'cut', label: 'Cut' },
  { key: 'copy', label: 'Copy' },
  { key: 'paste', label: 'Paste' },
];

const itemsWithDisabled: MenuItem[] = [
  { key: 'cut', label: 'Cut' },
  { key: 'copy', label: 'Copy', disabled: true },
  { key: 'paste', label: 'Paste' },
];

const itemsWithSubmenu: MenuItem[] = [
  { key: 'file', label: 'File', hasSubmenu: true },
  { key: 'edit', label: 'Edit' },
];

describe('useMenu', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to closed', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.isOpen).toBe(false);
  });

  it('respects defaultOpen', () => {
    const { result } = renderHook(() => useMenu({ items, defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('open() opens the menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('close() closes the menu', () => {
    const { result } = renderHook(() => useMenu({ items, defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggleOpen() toggles the menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.toggleOpen());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggleOpen());
    expect(result.current.isOpen).toBe(false);
  });

  it('open sets activeIndex to first enabled item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    expect(result.current.activeIndex).toBe(0);
  });

  // Controlled mode
  it('controlled: uses provided isOpen', () => {
    const { result } = renderHook(() => useMenu({ items, isOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('controlled: calls onOpenChange', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useMenu({ items, isOpen: false, onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // triggerProps
  it('triggerProps has aria-haspopup=menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.triggerProps['aria-haspopup']).toBe('menu');
  });

  it('triggerProps has aria-expanded', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.triggerProps['aria-expanded']).toBe(false);
    act(() => result.current.open());
    expect(result.current.triggerProps['aria-expanded']).toBe(true);
  });

  it('triggerProps has aria-controls pointing to menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.triggerProps['aria-controls']).toBe(result.current.menuProps.id);
  });

  it('triggerProps.onClick toggles', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.triggerProps.onClick());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.triggerProps.onClick());
    expect(result.current.isOpen).toBe(false);
  });

  it('triggerProps has ref callback', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(typeof result.current.triggerProps.ref).toBe('function');
  });

  // Trigger keyboard
  it('trigger Enter opens menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('trigger Space opens menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent(' '));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('trigger ArrowDown opens menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('trigger ArrowUp opens menu at last item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => {
      result.current.triggerProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.activeIndex).toBe(2);
  });

  // menuProps
  it('menuProps has role=menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.menuProps.role).toBe('menu');
  });

  it('menuProps has aria-labelledby pointing to trigger', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.menuProps['aria-labelledby']).toBe(result.current.triggerProps.id);
  });

  it('menuProps has aria-activedescendant when open with active item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    expect(result.current.menuProps['aria-activedescendant']).toBeDefined();
  });

  it('menuProps has aria-activedescendant=undefined when closed', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.menuProps['aria-activedescendant']).toBeUndefined();
  });

  it('menuProps has ref callback', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(typeof result.current.menuProps.ref).toBe('function');
  });

  // Menu keyboard navigation
  it('ArrowDown navigates to next item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.activeIndex).toBe(1);
  });

  it('ArrowUp navigates to previous item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.activeIndex).toBe(0);
  });

  it('ArrowDown wraps to first', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.activeIndex).toBe(0);
  });

  it('Home goes to first item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
      result.current.menuProps.onKeyDown(createKeyboardEvent('Home'));
    });
    expect(result.current.activeIndex).toBe(0);
  });

  it('End goes to last item', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('End'));
    });
    expect(result.current.activeIndex).toBe(2);
  });

  it('Enter activates item and closes', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items, onAction }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(onAction).toHaveBeenCalledWith('cut');
    expect(result.current.isOpen).toBe(false);
  });

  it('Space activates item and closes', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items, onAction }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent(' '));
    });
    expect(onAction).toHaveBeenCalledWith('cut');
  });

  it('Escape closes menu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('Escape'));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('skips disabled items on navigation', () => {
    const { result } = renderHook(() => useMenu({ items: itemsWithDisabled }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    // Skips copy (disabled) and goes to paste
    expect(result.current.activeIndex).toBe(2);
  });

  // Submenu support
  it('ArrowRight on item with submenu calls onAction', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items: itemsWithSubmenu, onAction }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(onAction).toHaveBeenCalledWith('file');
  });

  it('ArrowRight on item without submenu does nothing', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items: itemsWithSubmenu, onAction }));
    act(() => result.current.open());
    // Move to second item (edit, no submenu)
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    onAction.mockClear();
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(onAction).not.toHaveBeenCalled();
  });

  it('ArrowLeft closes when isSubmenu', () => {
    const { result } = renderHook(() => useMenu({ items, isSubmenu: true }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowLeft'));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('ArrowLeft does nothing when not submenu', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('ArrowLeft'));
    });
    expect(result.current.isOpen).toBe(true);
  });

  // itemProps
  it('itemProps has role=menuitem', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.itemProps('cut').role).toBe('menuitem');
  });

  it('itemProps has tabIndex=-1', () => {
    const { result } = renderHook(() => useMenu({ items }));
    expect(result.current.itemProps('cut').tabIndex).toBe(-1);
  });

  it('itemProps has aria-disabled for disabled items', () => {
    const { result } = renderHook(() => useMenu({ items: itemsWithDisabled }));
    expect(result.current.itemProps('copy')['aria-disabled']).toBe(true);
    expect(result.current.itemProps('cut')['aria-disabled']).toBeUndefined();
  });

  it('itemProps has aria-haspopup for submenu items', () => {
    const { result } = renderHook(() => useMenu({ items: itemsWithSubmenu }));
    expect(result.current.itemProps('file')['aria-haspopup']).toBe('menu');
    expect(result.current.itemProps('edit')['aria-haspopup']).toBeUndefined();
  });

  it('itemProps.onClick activates item', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items, onAction }));
    act(() => result.current.open());
    act(() => result.current.itemProps('copy').onClick());
    expect(onAction).toHaveBeenCalledWith('copy');
  });

  it('itemProps.onClick does not activate disabled item', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items: itemsWithDisabled, onAction }));
    act(() => result.current.open());
    act(() => result.current.itemProps('copy').onClick());
    expect(onAction).not.toHaveBeenCalled();
  });

  it('itemProps.onPointerMove sets activeIndex', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => result.current.itemProps('paste').onPointerMove());
    expect(result.current.activeIndex).toBe(2);
  });

  it('itemProps.onPointerMove does not set for disabled', () => {
    const { result } = renderHook(() => useMenu({ items: itemsWithDisabled }));
    act(() => result.current.open());
    act(() => result.current.itemProps('copy').onPointerMove());
    expect(result.current.activeIndex).toBe(0);
  });

  it('itemProps.onPointerLeave resets activeIndex', () => {
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => result.current.itemProps('cut').onPointerMove());
    expect(result.current.activeIndex).toBe(0);
    act(() => result.current.itemProps('cut').onPointerLeave());
    expect(result.current.activeIndex).toBe(-1);
  });

  // Outside click (requires real DOM refs — test the listener registration)
  it('registers mousedown listener when open', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    addSpy.mockRestore();
  });

  it('removes mousedown listener when closed', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { result } = renderHook(() => useMenu({ items }));
    act(() => result.current.open());
    act(() => result.current.close());
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    removeSpy.mockRestore();
  });

  // Edge: empty items
  it('works with empty items', () => {
    const { result } = renderHook(() => useMenu({ items: [] }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  // Edge: item with hasSubmenu
  it('activating submenu item does not close', () => {
    const onAction = vi.fn();
    const { result } = renderHook(() => useMenu({ items: itemsWithSubmenu, onAction }));
    act(() => result.current.open());
    act(() => {
      result.current.menuProps.onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(onAction).toHaveBeenCalledWith('file');
    expect(result.current.isOpen).toBe(true);
  });
});

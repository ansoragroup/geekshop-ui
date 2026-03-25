import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTabs } from './useTabs';
import type { UseTabsOptions } from './useTabs';

function createKeyboardEvent(key: string): React.KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
}

describe('useTabs', () => {
  const defaultOptions: UseTabsOptions = {
    tabs: ['tab1', 'tab2', 'tab3'],
  };

  it('defaults to first tab', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.activeKey).toBe('tab1');
  });

  it('respects defaultActiveKey', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, defaultActiveKey: 'tab2' }));
    expect(result.current.activeKey).toBe('tab2');
  });

  it('setActiveKey changes active tab', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    act(() => result.current.setActiveKey('tab3'));
    expect(result.current.activeKey).toBe('tab3');
  });

  it('setActiveKey does not change to disabled tab', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, disabledKeys: ['tab2'] }));
    act(() => result.current.setActiveKey('tab2'));
    expect(result.current.activeKey).toBe('tab1');
  });

  // Controlled mode
  it('controlled: uses provided activeKey', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, activeKey: 'tab2' }));
    expect(result.current.activeKey).toBe('tab2');
  });

  it('controlled: calls onChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ ...defaultOptions, activeKey: 'tab1', onChange })
    );
    act(() => result.current.setActiveKey('tab2'));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  // tabListProps
  it('tabListProps has role=tablist', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.tabListProps.role).toBe('tablist');
  });

  it('tabListProps has aria-orientation=horizontal by default', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.tabListProps['aria-orientation']).toBe('horizontal');
  });

  it('tabListProps has aria-orientation=vertical when set', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, orientation: 'vertical' }));
    expect(result.current.tabListProps['aria-orientation']).toBe('vertical');
  });

  // tabProps
  it('tabProps returns role=tab', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    const tp = result.current.tabProps('tab1');
    expect(tp.role).toBe('tab');
  });

  it('tabProps returns aria-selected=true for active tab', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.tabProps('tab1')['aria-selected']).toBe(true);
    expect(result.current.tabProps('tab2')['aria-selected']).toBe(false);
  });

  it('tabProps returns aria-controls pointing to panel id', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    const tp = result.current.tabProps('tab1');
    const pp = result.current.panelProps('tab1');
    expect(tp['aria-controls']).toBe(pp.id);
  });

  it('tabProps returns tabIndex=0 for active, -1 for inactive', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.tabProps('tab1').tabIndex).toBe(0);
    expect(result.current.tabProps('tab2').tabIndex).toBe(-1);
  });

  it('tabProps returns aria-disabled for disabled tabs', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, disabledKeys: ['tab2'] }));
    expect(result.current.tabProps('tab2')['aria-disabled']).toBe(true);
    expect(result.current.tabProps('tab1')['aria-disabled']).toBeUndefined();
  });

  it('tabProps.onClick activates tab', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    act(() => result.current.tabProps('tab2').onClick());
    expect(result.current.activeKey).toBe('tab2');
  });

  it('tabProps.onClick does not activate disabled tab', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, disabledKeys: ['tab2'] }));
    act(() => result.current.tabProps('tab2').onClick());
    expect(result.current.activeKey).toBe('tab1');
  });

  it('tabProps has ref callback', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(typeof result.current.tabProps('tab1').ref).toBe('function');
  });

  it('tabProps ref handles null', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    result.current.tabProps('tab1').ref(null);
  });

  // panelProps
  it('panelProps returns role=tabpanel', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    const pp = result.current.panelProps('tab1');
    expect(pp.role).toBe('tabpanel');
  });

  it('panelProps returns aria-labelledby matching tab id', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    const tp = result.current.tabProps('tab1');
    const pp = result.current.panelProps('tab1');
    expect(pp['aria-labelledby']).toBe(tp.id);
  });

  it('panelProps returns hidden=false for active panel', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.panelProps('tab1').hidden).toBe(false);
  });

  it('panelProps returns hidden=true for inactive panel', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.panelProps('tab2').hidden).toBe(true);
  });

  it('panelProps returns tabIndex=0', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    expect(result.current.panelProps('tab1').tabIndex).toBe(0);
  });

  // Keyboard navigation - horizontal
  it('ArrowRight moves to next tab (automatic)', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(result.current.activeKey).toBe('tab2');
  });

  it('ArrowLeft moves to previous tab', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, defaultActiveKey: 'tab2' }));
    act(() => {
      result.current.tabProps('tab2').onKeyDown(createKeyboardEvent('ArrowLeft'));
    });
    expect(result.current.activeKey).toBe('tab1');
  });

  it('ArrowRight wraps from last to first', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, defaultActiveKey: 'tab3' }));
    act(() => {
      result.current.tabProps('tab3').onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(result.current.activeKey).toBe('tab1');
  });

  it('ArrowLeft wraps from first to last', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('ArrowLeft'));
    });
    expect(result.current.activeKey).toBe('tab3');
  });

  it('Home goes to first tab', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, defaultActiveKey: 'tab3' }));
    act(() => {
      result.current.tabProps('tab3').onKeyDown(createKeyboardEvent('Home'));
    });
    expect(result.current.activeKey).toBe('tab1');
  });

  it('End goes to last tab', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('End'));
    });
    expect(result.current.activeKey).toBe('tab3');
  });

  it('skips disabled tabs on ArrowRight', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, disabledKeys: ['tab2'] }));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(result.current.activeKey).toBe('tab3');
  });

  // Keyboard navigation - vertical
  it('ArrowDown moves to next tab in vertical mode', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, orientation: 'vertical' }));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.activeKey).toBe('tab2');
  });

  it('ArrowUp moves to previous tab in vertical mode', () => {
    const { result } = renderHook(() =>
      useTabs({ ...defaultOptions, orientation: 'vertical', defaultActiveKey: 'tab2' })
    );
    act(() => {
      result.current.tabProps('tab2').onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.activeKey).toBe('tab1');
  });

  // Manual activation mode
  it('manual mode: arrow keys only focus, not activate', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, activationMode: 'manual' }));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    // In manual mode, activeKey should not change from arrow navigation alone
    // The focus moves but activation requires Enter/Space
    expect(result.current.activeKey).toBe('tab1');
  });

  it('manual mode: Enter activates tab', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, activationMode: 'manual' }));
    act(() => {
      result.current.tabProps('tab1').onKeyDown(createKeyboardEvent('Enter'));
    });
    expect(result.current.activeKey).toBe('tab1');
  });

  it('manual mode: Space activates tab', () => {
    const { result } = renderHook(() => useTabs({ ...defaultOptions, activationMode: 'manual' }));
    act(() => {
      result.current.tabProps('tab2').onKeyDown(createKeyboardEvent(' '));
    });
    expect(result.current.activeKey).toBe('tab2');
  });

  // Unrecognized key
  it('unrecognized key does nothing', () => {
    const { result } = renderHook(() => useTabs(defaultOptions));
    const event = createKeyboardEvent('Tab');
    act(() => {
      result.current.tabProps('tab1').onKeyDown(event);
    });
    expect(result.current.activeKey).toBe('tab1');
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  // Edge cases
  it('empty tabs list works', () => {
    const { result } = renderHook(() => useTabs({ tabs: [] }));
    expect(result.current.activeKey).toBe('');
  });

  it('single tab works', () => {
    const { result } = renderHook(() => useTabs({ tabs: ['only'] }));
    expect(result.current.activeKey).toBe('only');
  });

  it('defaults to first enabled tab when first is disabled', () => {
    const { result } = renderHook(() =>
      useTabs({ tabs: ['tab1', 'tab2'], disabledKeys: ['tab1'] })
    );
    expect(result.current.activeKey).toBe('tab2');
  });
});

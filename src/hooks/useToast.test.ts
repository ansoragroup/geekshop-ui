import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with no toasts', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toHaveLength(0)
  })

  it('adds a toast via show()', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.show('Hello')
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Hello')
    expect(result.current.toasts[0].type).toBe('info')
  })

  it('adds a success toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('Done!')
    })

    expect(result.current.toasts[0].type).toBe('success')
    expect(result.current.toasts[0].message).toBe('Done!')
  })

  it('adds an error toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.error('Failed!')
    })

    expect(result.current.toasts[0].type).toBe('error')
  })

  it('adds an info toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.info('Note')
    })

    expect(result.current.toasts[0].type).toBe('info')
  })

  it('adds a loading toast with no auto-dismiss', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.loading('Loading...')
    })

    expect(result.current.toasts[0].type).toBe('loading')
    expect(result.current.toasts[0].duration).toBe(0)

    // Advance time — loading toast should remain
    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(result.current.toasts).toHaveLength(1)
  })

  it('dismisses a specific toast', () => {
    const { result } = renderHook(() => useToast())

    let id: string
    act(() => {
      id = result.current.show('Toast 1')
      result.current.show('Toast 2')
    })

    expect(result.current.toasts).toHaveLength(2)

    act(() => {
      result.current.dismiss(id!)
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Toast 2')
  })

  it('dismisses all toasts', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.show('A')
      result.current.show('B')
      result.current.show('C')
    })

    expect(result.current.toasts).toHaveLength(3)

    act(() => {
      result.current.dismissAll()
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('auto-dismisses after the default duration', () => {
    const { result } = renderHook(() => useToast({ defaultDuration: 2000 }))

    act(() => {
      result.current.show('Temporary')
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('auto-dismisses with a custom duration', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.show('Quick', 'info', 500)
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('respects maxToasts and evicts the oldest', () => {
    const { result } = renderHook(() => useToast({ maxToasts: 2 }))

    act(() => {
      result.current.show('First')
      result.current.show('Second')
      result.current.show('Third')
    })

    expect(result.current.toasts).toHaveLength(2)
    expect(result.current.toasts[0].message).toBe('Second')
    expect(result.current.toasts[1].message).toBe('Third')
  })

  it('returns a unique id from show()', () => {
    const { result } = renderHook(() => useToast())

    let id1: string, id2: string
    act(() => {
      id1 = result.current.show('A')
      id2 = result.current.show('B')
    })

    expect(id1!).toBeTruthy()
    expect(id2!).toBeTruthy()
    expect(id1!).not.toBe(id2!)
  })
})

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useControllableState } from './useControllableState'

describe('useControllableState', () => {
  describe('uncontrolled mode', () => {
    it('uses defaultValue when no value is provided', () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 'hello' }),
      )
      expect(result.current[0]).toBe('hello')
    })

    it('updates internal state when setValue is called', () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 0 }),
      )

      act(() => {
        result.current[1](42)
      })

      expect(result.current[0]).toBe(42)
    })

    it('supports functional updater', () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 10 }),
      )

      act(() => {
        result.current[1]((prev) => prev + 5)
      })

      expect(result.current[0]).toBe(15)
    })

    it('calls onChange when value changes', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 'a', onChange }),
      )

      act(() => {
        result.current[1]('b')
      })

      expect(onChange).toHaveBeenCalledWith('b')
    })
  })

  describe('controlled mode', () => {
    it('uses the provided value', () => {
      const { result } = renderHook(() =>
        useControllableState({ value: 'controlled', defaultValue: 'default' }),
      )
      expect(result.current[0]).toBe('controlled')
    })

    it('does not update internal state when controlled', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useControllableState({
          value: 'controlled',
          defaultValue: 'default',
          onChange,
        }),
      )

      act(() => {
        result.current[1]('new-value')
      })

      // Value stays the same because it's controlled
      expect(result.current[0]).toBe('controlled')
      // But onChange is still called
      expect(onChange).toHaveBeenCalledWith('new-value')
    })

    it('reflects external value changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) =>
          useControllableState({ value, defaultValue: 'default' }),
        { initialProps: { value: 'initial' } },
      )

      expect(result.current[0]).toBe('initial')

      rerender({ value: 'updated' })
      expect(result.current[0]).toBe('updated')
    })
  })
})

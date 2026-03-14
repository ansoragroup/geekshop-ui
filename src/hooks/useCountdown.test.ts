import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCountdown } from './useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calculates days, hours, minutes, seconds for a future date', () => {
    const now = new Date('2026-03-15T00:00:00.000Z').getTime()
    vi.setSystemTime(now)

    // 2 days, 3 hours, 30 minutes, 15 seconds from now
    const target = new Date(now + 2 * 86400000 + 3 * 3600000 + 30 * 60000 + 15 * 1000)

    const { result } = renderHook(() => useCountdown(target))

    expect(result.current.days).toBe(2)
    expect(result.current.hours).toBe(3)
    expect(result.current.minutes).toBe(30)
    expect(result.current.seconds).toBe(15)
    expect(result.current.isExpired).toBe(false)
    expect(result.current.totalMs).toBeGreaterThan(0)
  })

  it('returns zeros and isExpired for a past date', () => {
    const now = new Date('2026-03-15T12:00:00.000Z').getTime()
    vi.setSystemTime(now)

    const target = new Date('2026-03-14T00:00:00.000Z')

    const { result } = renderHook(() => useCountdown(target))

    expect(result.current.days).toBe(0)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(0)
    expect(result.current.totalMs).toBe(0)
    expect(result.current.isExpired).toBe(true)
  })

  it('counts down each second', () => {
    const now = new Date('2026-03-15T00:00:00.000Z').getTime()
    vi.setSystemTime(now)

    const target = new Date(now + 5000) // 5 seconds from now

    const { result } = renderHook(() => useCountdown(target))

    expect(result.current.seconds).toBe(5)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.seconds).toBe(4)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.seconds).toBe(3)
  })

  it('becomes expired when time runs out', () => {
    const now = new Date('2026-03-15T00:00:00.000Z').getTime()
    vi.setSystemTime(now)

    const target = new Date(now + 2000) // 2 seconds from now

    const { result } = renderHook(() => useCountdown(target))

    expect(result.current.isExpired).toBe(false)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.isExpired).toBe(true)
    expect(result.current.totalMs).toBe(0)
  })

  it('accepts a string date', () => {
    const now = new Date('2026-03-15T00:00:00.000Z').getTime()
    vi.setSystemTime(now)

    const { result } = renderHook(() =>
      useCountdown('2026-03-16T00:00:00.000Z'),
    )

    expect(result.current.days).toBe(1)
    expect(result.current.isExpired).toBe(false)
  })

  it('accepts a numeric timestamp', () => {
    const now = new Date('2026-03-15T00:00:00.000Z').getTime()
    vi.setSystemTime(now)

    const target = now + 3600000 // 1 hour from now

    const { result } = renderHook(() => useCountdown(target))

    expect(result.current.hours).toBe(1)
    expect(result.current.minutes).toBe(0)
  })
})

import { useState, useEffect, useMemo } from 'react'

export interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
  isExpired: boolean
}

function calculateTimeLeft(targetDate: Date): CountdownValue {
  const now = Date.now()
  const diff = targetDate.getTime() - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isExpired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    totalMs: diff,
    isExpired: false,
  }
}

export function useCountdown(targetDate: Date | string | number): CountdownValue {
  const target = useMemo(() => new Date(targetDate), [targetDate])
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target))

  useEffect(() => {
    const update = () => {
      const next = calculateTimeLeft(target)
      setTimeLeft(next)
      if (next.isExpired) {
        clearInterval(timer)
      }
    }

    const timer = setInterval(update, 1000)
    update()

    return () => clearInterval(timer)
  }, [target])

  return timeLeft
}

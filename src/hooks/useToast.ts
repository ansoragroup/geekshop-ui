import { useState, useCallback, useRef } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'loading'

export interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration: number
}

export interface UseToastOptions {
  maxToasts?: number
  defaultDuration?: number
}

export interface UseToastReturn {
  toasts: ToastItem[]
  show: (message: string, type?: ToastType, duration?: number) => string
  success: (message: string, duration?: number) => string
  error: (message: string, duration?: number) => string
  info: (message: string, duration?: number) => string
  loading: (message: string) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

let idCounter = 0
function generateId(): string {
  return `toast-${++idCounter}-${Date.now()}`
}

export function useToast(options: UseToastOptions = {}): UseToastReturn {
  const { maxToasts = 3, defaultDuration = 3000 } = options
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current.clear()
    setToasts([])
  }, [])

  const show = useCallback(
    (message: string, type: ToastType = 'info', duration?: number) => {
      const id = generateId()
      const effectiveDuration = duration ?? (type === 'loading' ? 0 : defaultDuration)

      const toast: ToastItem = { id, message, type, duration: effectiveDuration }

      setToasts((prev) => {
        const next = [...prev, toast]
        if (next.length > maxToasts) {
          const removed = next.shift()
          if (removed) {
            const timer = timersRef.current.get(removed.id)
            if (timer) {
              clearTimeout(timer)
              timersRef.current.delete(removed.id)
            }
          }
        }
        return next
      })

      if (effectiveDuration > 0) {
        const timer = setTimeout(() => {
          dismiss(id)
        }, effectiveDuration)
        timersRef.current.set(id, timer)
      }

      return id
    },
    [defaultDuration, maxToasts, dismiss],
  )

  const success = useCallback(
    (message: string, duration?: number) => show(message, 'success', duration),
    [show],
  )

  const error = useCallback(
    (message: string, duration?: number) => show(message, 'error', duration),
    [show],
  )

  const info = useCallback(
    (message: string, duration?: number) => show(message, 'info', duration),
    [show],
  )

  const loading = useCallback(
    (message: string) => show(message, 'loading', 0),
    [show],
  )

  return { toasts, show, success, error, info, loading, dismiss, dismissAll }
}

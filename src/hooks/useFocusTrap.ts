import { useEffect, useRef, useCallback } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export interface UseFocusTrapOptions {
  onEscape?: () => void
  restoreFocus?: boolean
}

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  options: UseFocusTrapOptions = {},
) {
  const { onEscape, restoreFocus = true } = options
  const containerRef = useRef<T>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement

    const timer = requestAnimationFrame(() => {
      const elements = getFocusableElements()
      if (elements.length > 0) {
        elements[0].focus()
      } else {
        containerRef.current?.focus()
      }
    })

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onEscape?.()
        return
      }

      if (e.key !== 'Tab') return

      const elements = getFocusableElements()
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      cancelAnimationFrame(timer)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isOpen, onEscape, restoreFocus, getFocusableElements])

  return containerRef
}

import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders when visible', () => {
    render(<Toast message="Hello" visible />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('does not render when not visible', () => {
    render(<Toast message="Hidden" visible={false} />)
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('has role="alert"', () => {
    const { container } = render(<Toast message="Alert!" visible />)
    const alert = container.querySelector('[role="alert"]')
    expect(alert).toBeInTheDocument()
  })

  it('has role="status" with aria-live="assertive"', () => {
    const { container } = render(<Toast message="Status" visible />)
    const status = container.querySelector('[role="status"]')
    expect(status).toHaveAttribute('aria-live', 'assertive')
  })

  it('renders a success icon for type="success"', () => {
    const { container } = render(<Toast message="Done" type="success" visible />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    const circle = svg?.querySelector('circle')
    expect(circle).toHaveAttribute('fill', '#07C160')
  })

  it('renders an error icon for type="error"', () => {
    const { container } = render(<Toast message="Fail" type="error" visible />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    const circle = svg?.querySelector('circle')
    expect(circle).toHaveAttribute('fill', '#FF3B30')
  })

  it('renders an info icon for type="info"', () => {
    const { container } = render(<Toast message="Info" type="info" visible />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    const circle = svg?.querySelector('circle')
    expect(circle).toHaveAttribute('fill', '#1890FF')
  })

  it('renders a loading spinner for type="loading"', () => {
    const { container } = render(<Toast message="Loading" type="loading" visible />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('calls onClose after the duration', () => {
    const onClose = vi.fn()
    render(<Toast message="Bye" visible duration={2000} onClose={onClose} />)

    expect(onClose).not.toHaveBeenCalled()

    vi.advanceTimersByTime(2000)

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not auto-dismiss when duration is 0', () => {
    const onClose = vi.fn()
    render(<Toast message="Persistent" visible duration={0} onClose={onClose} />)

    vi.advanceTimersByTime(10000)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not auto-dismiss loading type', () => {
    const onClose = vi.fn()
    render(<Toast message="Loading" visible type="loading" duration={2000} onClose={onClose} />)

    vi.advanceTimersByTime(5000)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('clears timer when unmounted', () => {
    const onClose = vi.fn()
    const { unmount } = render(<Toast message="Temp" visible duration={2000} onClose={onClose} />)

    unmount()
    vi.advanceTimersByTime(3000)

    expect(onClose).not.toHaveBeenCalled()
  })
})

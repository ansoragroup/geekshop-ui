import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BottomSheet } from './BottomSheet'

describe('BottomSheet', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders when visible', () => {
    render(
      <BottomSheet visible title="My Sheet">
        <p>Content</p>
      </BottomSheet>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('does not render when not visible', () => {
    render(
      <BottomSheet visible={false} title="Hidden">
        <p>Hidden content</p>
      </BottomSheet>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('has role="dialog" and aria-modal="true"', () => {
    render(<BottomSheet visible title="Dialog" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('has aria-label set to the title', () => {
    render(<BottomSheet visible title="Sheet Title" />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Sheet Title')
  })

  it('falls back to "Bottom sheet" for aria-label when no title', () => {
    render(<BottomSheet visible onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Bottom sheet')
  })

  it('displays the title text', () => {
    render(<BottomSheet visible title="My Title" />)
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<BottomSheet visible title="Closable" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Yopish' }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when the overlay is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    const { container } = render(
      <BottomSheet visible title="Overlay" onClose={onClose}>
        <p>Body</p>
      </BottomSheet>,
    )

    // The overlay is the outermost div rendered by BottomSheet (has onClick={handleOverlayClick})
    // It's the parent element of the dialog
    const overlay = container.firstElementChild as HTMLElement
    await user.click(overlay)

    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when content inside the sheet is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(
      <BottomSheet visible title="No Close" onClose={onClose}>
        <p>Click me</p>
      </BottomSheet>,
    )

    await user.click(screen.getByText('Click me'))

    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders children content', () => {
    render(
      <BottomSheet visible>
        <div data-testid="child">Hello</div>
      </BottomSheet>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

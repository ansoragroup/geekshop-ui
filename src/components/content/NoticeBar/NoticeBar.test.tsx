import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { NoticeBar } from './NoticeBar'

describe('NoticeBar', () => {
  afterEach(cleanup)

  it('renders content text in static mode', () => {
    render(<NoticeBar content="Important notice" mode="static" />)
    expect(screen.getByText('Important notice')).toBeInTheDocument()
  })

  it('renders content text in scroll mode', () => {
    render(<NoticeBar content="Scrolling notice" mode="scroll" />)
    expect(screen.getByText('Scrolling notice')).toBeInTheDocument()
  })

  it('uses scroll mode by default', () => {
    const { container } = render(<NoticeBar content="Default scroll" />)
    expect(container.firstChild).toHaveAttribute('role', 'marquee')
  })

  it('has role="marquee" in scroll mode', () => {
    render(<NoticeBar content="Scroll" mode="scroll" />)
    expect(screen.getByRole('marquee')).toBeInTheDocument()
  })

  it('has role="alert" in static mode', () => {
    render(<NoticeBar content="Static" mode="static" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('has role="alert" in closeable mode', () => {
    render(<NoticeBar content="Closeable" mode="closeable" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('has aria-live="polite" in static mode', () => {
    render(<NoticeBar content="Static" mode="static" />)
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
  })

  it('does not have aria-live in scroll mode', () => {
    render(<NoticeBar content="Scroll" mode="scroll" />)
    expect(screen.getByRole('marquee')).not.toHaveAttribute('aria-live')
  })

  it('renders close button in closeable mode', () => {
    render(<NoticeBar content="Close me" mode="closeable" />)
    expect(screen.getByLabelText('Yopish')).toBeInTheDocument()
  })

  it('does not render close button in static mode', () => {
    render(<NoticeBar content="No close" mode="static" />)
    expect(screen.queryByLabelText('Yopish')).not.toBeInTheDocument()
  })

  it('does not render close button in scroll mode', () => {
    render(<NoticeBar content="No close" mode="scroll" />)
    expect(screen.queryByLabelText('Yopish')).not.toBeInTheDocument()
  })

  it('hides the notice when close button is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<NoticeBar content="Dismiss" mode="closeable" />)
    await user.click(screen.getByLabelText('Yopish'))
    expect(container.innerHTML).toBe('')
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<NoticeBar content="Dismiss" mode="closeable" onClose={onClose} />)
    await user.click(screen.getByLabelText('Yopish'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders custom icon when provided', () => {
    const customIcon = <span data-testid="custom-icon">!</span>
    render(<NoticeBar content="Notice" icon={customIcon} mode="static" />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders default icon when no icon provided', () => {
    const { container } = render(<NoticeBar content="Notice" mode="static" />)
    const iconSpan = container.querySelector('[class*="icon"]')
    expect(iconSpan).toBeInTheDocument()
    expect(iconSpan?.querySelector('svg')).toBeInTheDocument()
  })

  it('applies custom color style', () => {
    const { container } = render(<NoticeBar content="Colored" mode="static" color="#FF0000" />)
    expect(container.firstChild).toHaveStyle({ '--notice-color': '#FF0000' })
  })

  it('applies custom background color', () => {
    const { container } = render(
      <NoticeBar content="BG" mode="static" backgroundColor="#FFFFCC" />,
    )
    expect(container.firstChild).toHaveStyle({ '--notice-bg': '#FFFFCC' })
  })

  it('applies custom className', () => {
    const { container } = render(
      <NoticeBar content="Custom" mode="static" className="my-notice" />,
    )
    expect(container.firstChild).toHaveClass('my-notice')
  })

  it('sets aria-label on scrolling text', () => {
    render(<NoticeBar content="Scroll text" mode="scroll" />)
    const scrollSpan = screen.getByLabelText('Scroll text')
    expect(scrollSpan).toBeInTheDocument()
  })
})

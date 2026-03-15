import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders nothing when not visible', () => {
    render(<Dialog visible={false} title="Test" />)
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('renders with role="alertdialog" when visible', () => {
    render(<Dialog visible title="Test" />)
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('sets aria-modal="true"', () => {
    render(<Dialog visible title="Test" />)
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('displays the title', () => {
    render(<Dialog visible title="Delete item?" />)
    expect(screen.getByText('Delete item?')).toBeInTheDocument()
  })

  it('displays the message', () => {
    render(<Dialog visible message="This action cannot be undone." />)
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
  })

  it('renders default confirm text from i18n', () => {
    render(<Dialog visible />)
    expect(screen.getByText('Tasdiqlash')).toBeInTheDocument()
  })

  it('renders default cancel text from i18n', () => {
    render(<Dialog visible />)
    expect(screen.getByText('Bekor qilish')).toBeInTheDocument()
  })

  it('uses custom confirm text', () => {
    render(<Dialog visible confirmText="Delete" />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('uses custom cancel text', () => {
    render(<Dialog visible cancelText="Go back" />)
    expect(screen.getByText('Go back')).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', async () => {
    const onConfirm = vi.fn()
    const user = userEvent.setup()

    render(<Dialog visible onConfirm={onConfirm} />)
    await user.click(screen.getByText('Tasdiqlash'))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()

    render(<Dialog visible onCancel={onCancel} />)
    await user.click(screen.getByText('Bekor qilish'))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('hides cancel button when showCancel is false', () => {
    render(<Dialog visible showCancel={false} />)
    expect(screen.queryByText('Bekor qilish')).not.toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <Dialog visible>
        <p>Custom content here</p>
      </Dialog>,
    )
    expect(screen.getByText('Custom content here')).toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<Dialog visible onClose={onClose} />)
    // Click the overlay (presentation div)
    const overlay = screen.getByRole('presentation')
    await user.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when dialog content is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<Dialog visible title="Test" onClose={onClose} />)
    await user.click(screen.getByText('Test'))

    expect(onClose).not.toHaveBeenCalled()
  })
})

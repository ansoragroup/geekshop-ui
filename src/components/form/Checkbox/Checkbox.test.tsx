import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with role="checkbox"', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders unchecked by default', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
  })

  it('renders checked when checked prop is true', () => {
    render(<Checkbox checked />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('shows a label when provided', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('calls onChange with toggled value when clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Checkbox checked={false} onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when checked checkbox is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Checkbox checked onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Checkbox disabled onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('sets aria-disabled when disabled', () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true')
  })

  it('shows checkmark SVG only when checked', () => {
    const { container, rerender } = render(<Checkbox checked={false} />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()

    rerender(<Checkbox checked />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

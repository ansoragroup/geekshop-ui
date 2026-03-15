import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with role="switch"', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders unchecked by default', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('renders checked when defaultChecked is true', () => {
    render(<Switch defaultChecked />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('renders checked when checked prop is true', () => {
    render(<Switch checked />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('shows a label when provided', () => {
    render(<Switch label="Notifications" />)
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Switch onChange={onChange} />)
    await user.click(screen.getByRole('switch'))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles off when clicked while checked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Switch defaultChecked onChange={onChange} />)
    await user.click(screen.getByRole('switch'))

    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Switch disabled onChange={onChange} />)
    await user.click(screen.getByRole('switch'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('sets aria-disabled when disabled', () => {
    render(<Switch disabled />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true')
  })

  it('toggles on Space key', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Switch onChange={onChange} />)
    const switchEl = screen.getByRole('switch')
    switchEl.focus()
    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles on Enter key', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Switch onChange={onChange} />)
    const switchEl = screen.getByRole('switch')
    switchEl.focus()
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('associates label with switch via aria-labelledby', () => {
    render(<Switch label="Dark mode" id="dark-switch" />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('aria-labelledby', 'dark-switch-label')
  })

  it('does not render label element when no label prop', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('label')).not.toBeInTheDocument()
  })
})

import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as a <button> element by default', () => {
    render(<Button>Default</Button>)
    const btn = screen.getByRole('button', { name: 'Default' })
    expect(btn.tagName).toBe('BUTTON')
  })

  it('has type="button" by default', () => {
    render(<Button>Btn</Button>)
    expect(screen.getByRole('button', { name: 'Btn' })).toHaveAttribute('type', 'button')
  })

  it('applies variant class', () => {
    const { container } = render(<Button variant="danger">Danger</Button>)
    const btn = container.querySelector('button')
    expect(btn?.className).toMatch(/variant-danger/)
  })

  it('applies size class', () => {
    const { container } = render(<Button size="lg">Large</Button>)
    const btn = container.querySelector('button')
    expect(btn?.className).toMatch(/size-lg/)
  })

  it('shows loading spinner when loading', () => {
    const { container } = render(<Button loading>Save</Button>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('disables the button when loading', () => {
    render(<Button loading>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('disables the button when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={onClick}>Press</Button>)
    await user.click(screen.getByRole('button', { name: 'Press' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<Button disabled onClick={onClick}>No click</Button>)
    await user.click(screen.getByRole('button', { name: 'No click' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('responds to keyboard Enter', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={onClick}>Key</Button>)
    screen.getByRole('button', { name: 'Key' }).focus()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalled()
  })

  it('renders as a different element with the "as" prop', () => {
    const { container } = render(
      <Button as="a" href="https://example.com">Link</Button>,
    )
    const anchor = container.querySelector('a')
    expect(anchor).toBeInTheDocument()
    expect(anchor?.tagName).toBe('A')
    expect(anchor).toHaveAttribute('href', 'https://example.com')
  })

  it('applies block class when block prop is set', () => {
    const { container } = render(<Button block>Full</Button>)
    const btn = container.querySelector('button')
    expect(btn?.className).toMatch(/block/)
  })

  it('merges custom className', () => {
    const { container } = render(<Button className="custom">Custom</Button>)
    const btn = container.querySelector('button')
    expect(btn?.className).toContain('custom')
  })
})

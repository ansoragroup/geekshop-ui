import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders a label and associates it with the input', () => {
    render(<Input label="Email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('shows the placeholder text', () => {
    render(<Input placeholder="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('displays the error message', () => {
    const { container } = render(<Input error="This field is required" />)
    const errorEl = container.querySelector('[role="alert"]')
    expect(errorEl).toHaveTextContent('This field is required')
  })

  it('sets aria-invalid when there is an error', () => {
    render(<Input error="Error" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-describedby to the error element id', () => {
    render(<Input error="Bad input" id="my-input" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'my-input-error')
    const errorEl = document.getElementById('my-input-error')
    expect(errorEl).toBeInTheDocument()
  })

  it('does not set aria-describedby when there is no error', () => {
    render(<Input id="my-input" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby')
  })

  it('calls onChange with the new value', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Input value="" onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'a')

    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('renders the clear button when clearable and has value', () => {
    render(<Input value="hello" clearable onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Tozalash' })).toBeInTheDocument()
  })

  it('does not render clear button when value is empty', () => {
    render(<Input value="" clearable />)
    expect(screen.queryByRole('button', { name: 'Tozalash' })).not.toBeInTheDocument()
  })

  it('does not render clear button when disabled', () => {
    render(<Input value="hello" clearable disabled />)
    expect(screen.queryByRole('button', { name: 'Tozalash' })).not.toBeInTheDocument()
  })

  it('calls onChange with empty string when clear is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<Input value="hello" clearable onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Tozalash' }))

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('disables the input when disabled prop is set', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders a left icon when provided', () => {
    render(<Input leftIcon={<span data-testid="icon">@</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})

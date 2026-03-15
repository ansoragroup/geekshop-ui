import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders a textarea element', () => {
    render(<TextArea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders a label and associates it with the textarea', () => {
    render(<TextArea label="Comment" />)
    const textarea = screen.getByLabelText('Comment')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('shows the placeholder text', () => {
    render(<TextArea placeholder="Write here..." />)
    expect(screen.getByPlaceholderText('Write here...')).toBeInTheDocument()
  })

  it('displays the error message', () => {
    const { container } = render(<TextArea error="This field is required" />)
    const errorEl = container.querySelector('[role="alert"]')
    expect(errorEl).toHaveTextContent('This field is required')
  })

  it('sets aria-invalid when there is an error', () => {
    render(<TextArea error="Error" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-describedby to the error element id', () => {
    render(<TextArea error="Bad input" id="my-textarea" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-describedby', 'my-textarea-error')
  })

  it('sets aria-describedby to the helper text when no error', () => {
    render(<TextArea helperText="Optional field" id="my-textarea" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-describedby', 'my-textarea-helper')
  })

  it('calls onChange with the new value', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<TextArea value="" onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'a')

    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('shows character count when showCount and maxLength are set', () => {
    render(<TextArea value="hello" maxLength={100} showCount />)
    expect(screen.getByText('5/100')).toBeInTheDocument()
  })

  it('shows 0 count when value is empty', () => {
    render(<TextArea value="" maxLength={500} showCount />)
    expect(screen.getByText('0/500')).toBeInTheDocument()
  })

  it('does not show count when showCount is false', () => {
    render(<TextArea value="hello" maxLength={100} />)
    expect(screen.queryByText('5/100')).not.toBeInTheDocument()
  })

  it('disables the textarea when disabled prop is set', () => {
    render(<TextArea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows helper text when provided', () => {
    render(<TextArea helperText="Optional field" />)
    expect(screen.getByText('Optional field')).toBeInTheDocument()
  })

  it('prioritizes error over helper text', () => {
    render(<TextArea error="Required" helperText="Optional" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('Optional')).not.toBeInTheDocument()
  })

  it('enforces maxLength on the textarea element', () => {
    render(<TextArea maxLength={10} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '10')
  })
})

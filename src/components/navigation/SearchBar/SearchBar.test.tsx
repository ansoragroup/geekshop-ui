import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  // Default rendering
  it('renders an input by default', () => {
    render(<SearchBar />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with default placeholder', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Mahsulot qidirish...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Izlash..." />)
    expect(screen.getByPlaceholderText('Izlash...')).toBeInTheDocument()
  })

  it('renders the controlled value', () => {
    render(<SearchBar value="GPU" />)
    expect(screen.getByRole('textbox')).toHaveValue('GPU')
  })

  // Variants & compact
  it('applies default variant class', () => {
    const { container } = render(<SearchBar />)
    expect(container.firstElementChild?.className).toMatch(/default/)
  })

  it('applies filled variant class', () => {
    const { container } = render(<SearchBar variant="filled" />)
    expect(container.firstElementChild?.className).toMatch(/filled/)
  })

  it('applies compact class when compact is true', () => {
    const { container } = render(<SearchBar compact />)
    expect(container.firstElementChild?.className).toMatch(/compact/)
  })

  // onChange
  it('calls onChange when text is typed', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar value="" onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'a')

    expect(onChange).toHaveBeenCalledWith('a')
  })

  // onSearch (Enter key)
  it('calls onSearch with current value on Enter', async () => {
    const onSearch = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar value="RTX 4090" onSearch={onSearch} />)
    const input = screen.getByRole('textbox')
    input.focus()
    await user.keyboard('{Enter}')

    expect(onSearch).toHaveBeenCalledWith('RTX 4090')
  })

  it('does not call onSearch on non-Enter keys', async () => {
    const onSearch = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar value="test" onSearch={onSearch} onChange={vi.fn()} />)
    const input = screen.getByRole('textbox')
    input.focus()
    await user.keyboard('a')

    expect(onSearch).not.toHaveBeenCalled()
  })

  // Camera button
  it('does not render camera button when onCamera is not provided', () => {
    render(<SearchBar />)
    expect(screen.queryByLabelText('Kamera bilan qidirish')).not.toBeInTheDocument()
  })

  it('renders camera button when onCamera is provided', () => {
    render(<SearchBar onCamera={vi.fn()} />)
    expect(screen.getByLabelText('Kamera bilan qidirish')).toBeInTheDocument()
  })

  it('calls onCamera when camera button is clicked', async () => {
    const onCamera = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar onCamera={onCamera} />)
    await user.click(screen.getByLabelText('Kamera bilan qidirish'))

    expect(onCamera).toHaveBeenCalledOnce()
  })

  // Read-only mode
  it('renders as a button in readOnly mode', () => {
    render(<SearchBar readOnly />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows placeholder text in readOnly mode', () => {
    render(<SearchBar readOnly placeholder="Tap to search" />)
    expect(screen.getByText('Tap to search')).toBeInTheDocument()
  })

  it('calls onClick when clicked in readOnly mode', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar readOnly onClick={onClick} />)
    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has tabIndex 0 in readOnly mode', () => {
    render(<SearchBar readOnly />)
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
  })
})

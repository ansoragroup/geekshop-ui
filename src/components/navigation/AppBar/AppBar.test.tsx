import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { AppBar } from './AppBar'

describe('AppBar', () => {
  it('renders as a header element', () => {
    render(<AppBar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the search placeholder text by default', () => {
    render(<AppBar />)
    expect(screen.getByText('Mahsulot qidirish...')).toBeInTheDocument()
  })

  it('uses custom search placeholder', () => {
    render(<AppBar searchPlaceholder="Izlash..." />)
    expect(screen.getByText('Izlash...')).toBeInTheDocument()
  })

  it('applies colored variant class by default', () => {
    const { container } = render(<AppBar />)
    const header = container.querySelector('header')
    expect(header?.className).toMatch(/colored/)
  })

  it('applies transparent variant class', () => {
    const { container } = render(<AppBar variant="transparent" />)
    const header = container.querySelector('header')
    expect(header?.className).toMatch(/transparent/)
  })

  it('applies custom className', () => {
    const { container } = render(<AppBar className="custom-class" />)
    const header = container.querySelector('header')
    expect(header?.className).toContain('custom-class')
  })

  it('applies inline background color style', () => {
    const { container } = render(<AppBar backgroundColor="blue" />)
    const header = container.querySelector('header')
    expect(header?.style.background).toBe('blue')
  })

  // Location button
  it('does not render location button when showLocation is false (default)', () => {
    render(<AppBar />)
    expect(screen.queryByLabelText(/Joylashuv/)).not.toBeInTheDocument()
  })

  it('renders location button when showLocation is true', () => {
    render(<AppBar showLocation />)
    expect(screen.getByLabelText('Joylashuv: Toshkent')).toBeInTheDocument()
  })

  it('renders custom location text', () => {
    render(<AppBar showLocation location="Samarqand" />)
    expect(screen.getByLabelText('Joylashuv: Samarqand')).toBeInTheDocument()
    expect(screen.getByText('Samarqand')).toBeInTheDocument()
  })

  it('calls onLocationClick when location button is clicked', async () => {
    const onLocationClick = vi.fn()
    const user = userEvent.setup()

    render(<AppBar showLocation onLocationClick={onLocationClick} />)
    await user.click(screen.getByLabelText('Joylashuv: Toshkent'))

    expect(onLocationClick).toHaveBeenCalledOnce()
  })

  // Scan button
  it('does not render scan button when showScan is false (default)', () => {
    render(<AppBar />)
    expect(screen.queryByLabelText('Kamera bilan qidirish')).not.toBeInTheDocument()
  })

  it('renders scan button when showScan is true', () => {
    render(<AppBar showScan />)
    expect(screen.getByLabelText('Kamera bilan qidirish')).toBeInTheDocument()
  })

  it('calls onScanClick when scan button is clicked', async () => {
    const onScanClick = vi.fn()
    const user = userEvent.setup()

    render(<AppBar showScan onScanClick={onScanClick} />)
    await user.click(screen.getByLabelText('Kamera bilan qidirish'))

    expect(onScanClick).toHaveBeenCalledOnce()
  })

  // Dark mode button
  it('does not render dark mode button by default', () => {
    render(<AppBar />)
    expect(screen.queryByLabelText('Tungi rejim')).not.toBeInTheDocument()
  })

  it('renders dark mode button when showDarkMode is true', () => {
    render(<AppBar showDarkMode />)
    expect(screen.getByLabelText('Tungi rejim')).toBeInTheDocument()
  })

  it('calls onDarkModeClick when dark mode button is clicked', async () => {
    const onDarkModeClick = vi.fn()
    const user = userEvent.setup()

    render(<AppBar showDarkMode onDarkModeClick={onDarkModeClick} />)
    await user.click(screen.getByLabelText('Tungi rejim'))

    expect(onDarkModeClick).toHaveBeenCalledOnce()
  })

  // Search — read-only mode (no onSearchChange)
  it('renders as read-only (button) when onSearchChange is not provided', () => {
    render(<AppBar />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mahsulot qidirish...' })).toBeInTheDocument()
  })

  it('calls onSearchClick when search wrapper is clicked in read-only mode', async () => {
    const onSearchClick = vi.fn()
    const user = userEvent.setup()

    render(<AppBar onSearchClick={onSearchClick} />)
    await user.click(screen.getByText('Mahsulot qidirish...'))

    expect(onSearchClick).toHaveBeenCalledOnce()
  })

  // Search — editable mode (with onSearchChange)
  it('renders an input when onSearchChange is provided', () => {
    render(<AppBar onSearchChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the controlled search value', () => {
    render(<AppBar onSearchChange={vi.fn()} searchValue="RTX 4090" />)
    expect(screen.getByRole('textbox')).toHaveValue('RTX 4090')
  })

  it('calls onSearchChange when typing', async () => {
    const onSearchChange = vi.fn()
    const user = userEvent.setup()

    render(<AppBar onSearchChange={onSearchChange} searchValue="" />)
    await user.type(screen.getByRole('textbox'), 'a')

    expect(onSearchChange).toHaveBeenCalledWith('a')
  })
})

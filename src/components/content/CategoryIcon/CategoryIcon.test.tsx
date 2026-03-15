import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import CategoryIcon from './CategoryIcon'

const TestIcon = () => <svg data-testid="test-icon" />

describe('CategoryIcon', () => {
  afterEach(cleanup)

  it('renders the label text', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" />)
    expect(screen.getByText('Telefon')).toBeInTheDocument()
  })

  it('renders the icon element', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" />)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('applies default color #FF5000 to the circle background', () => {
    const { container } = render(<CategoryIcon icon={<TestIcon />} label="Telefon" />)
    const circle = container.querySelector('[class*="circle"]')
    expect(circle).toHaveStyle({ background: '#FF500015' })
  })

  it('applies custom color to the circle', () => {
    const { container } = render(
      <CategoryIcon icon={<TestIcon />} label="Telefon" color="#00FF00" />,
    )
    const circle = container.querySelector('[class*="circle"]')
    expect(circle).toHaveStyle({ background: '#00FF0015' })
  })

  it('applies color to the icon wrapper', () => {
    const { container } = render(
      <CategoryIcon icon={<TestIcon />} label="Telefon" color="#0000FF" />,
    )
    const iconWrapper = container.querySelector('[class*="iconWrapper"]')
    expect(iconWrapper).toHaveStyle({ color: '#0000FF' })
  })

  it('has role="button" when onClick is provided', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not have role="button" when onClick is not provided', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has tabIndex=0 when onClick is provided', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
  })

  it('does not have tabIndex when onClick is not provided', () => {
    const { container } = render(<CategoryIcon icon={<TestIcon />} label="Telefon" />)
    expect(container.firstChild).not.toHaveAttribute('tabindex')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Enter key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalled()
  })

  it('calls onClick on Space key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalled()
  })
})

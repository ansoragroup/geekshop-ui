import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { DealCard } from './DealCard'

const baseProps = {
  image: '/deal.jpg',
  title: 'Smartphone X',
  price: 3500000,
  originalPrice: 5000000,
  discount: 30,
}

describe('DealCard', () => {
  afterEach(cleanup)

  it('renders the product image with alt text', () => {
    render(<DealCard {...baseProps} />)
    const img = screen.getByAltText('Smartphone X')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/deal.jpg')
  })

  it('renders the product title', () => {
    render(<DealCard {...baseProps} />)
    expect(screen.getByText('Smartphone X')).toBeInTheDocument()
  })

  it('renders the discount badge', () => {
    render(<DealCard {...baseProps} />)
    expect(screen.getByText('-30%')).toBeInTheDocument()
  })

  it('renders formatted current price', () => {
    render(<DealCard {...baseProps} />)
    expect(screen.getByText(/3.*500.*000/)).toBeInTheDocument()
  })

  it('renders formatted original price', () => {
    render(<DealCard {...baseProps} />)
    expect(screen.getByText(/5.*000.*000 so'm/)).toBeInTheDocument()
  })

  it('renders savings amount', () => {
    render(<DealCard {...baseProps} />)
    // savings = 5000000 - 3500000 = 1500000
    expect(screen.getByText(/Tejash:.*1.*500.*000 so'm/)).toBeInTheDocument()
  })

  it('does not render progress bar when soldPercent is 0', () => {
    const { container } = render(<DealCard {...baseProps} soldPercent={0} />)
    expect(container.querySelector('[class*="progressBar"]')).not.toBeInTheDocument()
  })

  it('does not render progress bar when soldPercent is not provided', () => {
    const { container } = render(<DealCard {...baseProps} />)
    expect(container.querySelector('[class*="progressBar"]')).not.toBeInTheDocument()
  })

  it('renders progress bar when soldPercent > 0', () => {
    render(<DealCard {...baseProps} soldPercent={45} />)
    expect(screen.getByText('45% sotildi')).toBeInTheDocument()
  })

  it('clamps progress fill width at 100%', () => {
    const { container } = render(<DealCard {...baseProps} soldPercent={120} />)
    const fill = container.querySelector('[class*="progressFill"]')
    expect(fill).toHaveStyle({ width: '100%' })
  })

  it('sets correct progress fill width', () => {
    const { container } = render(<DealCard {...baseProps} soldPercent={60} />)
    const fill = container.querySelector('[class*="progressFill"]')
    expect(fill).toHaveStyle({ width: '60%' })
  })

  it('has role="button" when onClick is provided', () => {
    render(<DealCard {...baseProps} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not have role="button" when onClick is not provided', () => {
    render(<DealCard {...baseProps} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has tabIndex=0 when onClick is provided', () => {
    render(<DealCard {...baseProps} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<DealCard {...baseProps} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders prices with currency label "so\'m"', () => {
    render(<DealCard {...baseProps} />)
    // After i18n migration, formatPrice returns the full string with currency included
    // e.g. "3 500 000 so'm" - so we check for text containing "so'm"
    const somElements = screen.getAllByText(/so'm/)
    expect(somElements.length).toBeGreaterThanOrEqual(1)
  })
})

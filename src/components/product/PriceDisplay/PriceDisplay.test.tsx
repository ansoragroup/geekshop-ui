import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PriceDisplay } from './PriceDisplay'
import { formatPrice } from '../../../utils'

describe('formatPrice', () => {
  it('formats numbers with space separators', () => {
    expect(formatPrice(5200000)).toMatch(/5\s200\s000/)
  })

  it('formats small numbers without separators', () => {
    expect(formatPrice(100)).toMatch(/100\sso'm/)
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toMatch(/0\sso'm/)
  })
})

describe('PriceDisplay', () => {
  // Default rendering
  it('renders the formatted price', () => {
    render(<PriceDisplay price={1500000} />)
    expect(screen.getByText(/1\s500\s000/)).toBeInTheDocument()
  })

  it('renders the currency by default', () => {
    render(<PriceDisplay price={1000} />)
    expect(screen.getByText("so'm")).toBeInTheDocument()
  })

  it('renders custom currency', () => {
    render(<PriceDisplay price={1000} currency="$" />)
    expect(screen.getByText('$')).toBeInTheDocument()
  })

  it('hides currency when showCurrency is false', () => {
    render(<PriceDisplay price={1000} showCurrency={false} />)
    expect(screen.queryByText("so'm")).not.toBeInTheDocument()
  })

  // Variants
  it('applies default variant class', () => {
    const { container } = render(<PriceDisplay price={1000} />)
    expect(container.firstElementChild?.className).toMatch(/variant-default/)
  })

  it('applies sale variant class', () => {
    const { container } = render(<PriceDisplay price={1000} variant="sale" originalPrice={1500} />)
    expect(container.firstElementChild?.className).toMatch(/variant-sale/)
  })

  it('applies range variant class', () => {
    const { container } = render(<PriceDisplay price={0} variant="range" minPrice={100} maxPrice={500} />)
    expect(container.firstElementChild?.className).toMatch(/variant-range/)
  })

  // Sizes
  it.each(['sm', 'md', 'lg', 'xl'] as const)('applies size-%s class', (size) => {
    const { container } = render(<PriceDisplay price={1000} size={size} />)
    expect(container.firstElementChild?.className).toMatch(new RegExp(`size-${size}`))
  })

  // Sale variant
  it('renders original price in sale variant', () => {
    render(<PriceDisplay price={900000} originalPrice={1200000} variant="sale" />)
    expect(screen.getByText(/1\s200\s000/)).toBeInTheDocument()
    expect(screen.getByText(/900\s000/)).toBeInTheDocument()
  })

  it('does not render original price without sale variant', () => {
    const { container } = render(<PriceDisplay price={900000} originalPrice={1200000} />)
    const original = container.querySelector('[class*="originalPrice"]')
    expect(original).not.toBeInTheDocument()
  })

  // Range variant
  it('renders min and max prices with tilde separator in range variant', () => {
    render(<PriceDisplay price={0} variant="range" minPrice={100000} maxPrice={500000} />)
    expect(screen.getByText(/100\s000/)).toBeInTheDocument()
    expect(screen.getByText(/500\s000/)).toBeInTheDocument()
    expect(screen.getByText('~')).toBeInTheDocument()
  })

  // Custom color
  it('applies custom color style', () => {
    const { container } = render(<PriceDisplay price={1000} color="red" />)
    // jsdom normalizes color values, so just check the style attribute is set
    expect((container.firstElementChild as HTMLElement).style.color).toBeTruthy()
  })

  // Custom className
  it('merges custom className', () => {
    const { container } = render(<PriceDisplay price={1000} className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })
})
